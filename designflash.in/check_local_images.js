const fs = require('fs');
const path = require('path');
const https = require('https');

const rootDir = __dirname;
const htmlFilePath = path.join(rootDir, 'index.html');

// Helper to download a file
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const file = fs.createWriteStream(destPath);
    let urlParsed;
    try {
      urlParsed = new URL(url);
    } catch (e) {
      reject(new Error(`Invalid URL: ${url}`));
      return;
    }

    const options = {
      hostname: urlParsed.hostname,
      path: urlParsed.pathname + urlParsed.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': 'https://designflash.in/',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    };

    https.get(options, (response) => {
      if (response.statusCode !== 200) {
        file.close(() => {
          fs.unlink(destPath, () => {});
          reject(new Error(`Status ${response.statusCode}`));
        });
        return;
      }
      
      const contentType = response.headers['content-type'] || '';
      if (contentType.includes('text/html')) {
        file.close(() => {
          fs.unlink(destPath, () => {});
          reject(new Error('Returned HTML instead of image'));
        });
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          resolve(true);
        });
      });
    }).on('error', (err) => {
      file.close(() => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    });
  });
}

// Find all image references in index.html
function findImages() {
  if (!fs.existsSync(htmlFilePath)) {
    console.log('Error: index.html not found in root directory!');
    return [];
  }

  const content = fs.readFileSync(htmlFilePath, 'utf8');
  const imageUrls = new Set();

  // 1. Match img src
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    imageUrls.add(match[1]);
  }

  // 2. Match background images in styles
  const bgRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/gi;
  while ((match = bgRegex.exec(content)) !== null) {
    imageUrls.add(match[1]);
  }

  // 3. Match generic url(/wp-content/...)
  const urlRegex = /url\(["']?(\/wp-content\/uploads\/[^"')]+)["']?\)/gi;
  while ((match = urlRegex.exec(content)) !== null) {
    imageUrls.add(match[1]);
  }

  return Array.from(imageUrls);
}

async function run() {
  const images = findImages();
  console.log(`Found ${images.length} unique image references in index.html.`);

  const brokenImages = [];
  const missingImages = [];

  for (const imgUrl of images) {
    // If it's a external image that is not ours, skip
    if (imgUrl.startsWith('http') && !imgUrl.includes('designflash.in') && !imgUrl.startsWith('/')) {
      continue;
    }

    // Resolve local path
    let localSubPath = imgUrl;
    if (imgUrl.startsWith('https://designflash.in')) {
      localSubPath = imgUrl.replace('https://designflash.in', '');
    } else if (imgUrl.startsWith('http://designflash.in')) {
      localSubPath = imgUrl.replace('http://designflash.in', '');
    } else if (imgUrl.startsWith('//designflash.in')) {
      localSubPath = imgUrl.replace('//designflash.in', '');
    }

    // Clean up query parameters if any (like ?ver=...)
    localSubPath = localSubPath.split('?')[0];

    const localFilePath = path.join(rootDir, localSubPath);

    let isBroken = false;
    let isMissing = !fs.existsSync(localFilePath);

    if (!isMissing) {
      // Check if it's a fake image (actually an HTML 404 page)
      try {
        const stats = fs.statSync(localFilePath);
        if (stats.size < 500) {
          const fileHead = fs.readFileSync(localFilePath, 'utf8').substring(0, 100);
          if (fileHead.includes('<!DOCTYPE') || fileHead.includes('<html') || fileHead.includes('404')) {
            isBroken = true;
          }
        }
      } catch (e) {
        // Ignored
      }
    }

    if (isMissing) {
      missingImages.push({ url: imgUrl, localPath: localFilePath, subPath: localSubPath });
    } else if (isBroken) {
      brokenImages.push({ url: imgUrl, localPath: localFilePath, subPath: localSubPath });
    }
  }

  console.log(`\nLocal Status:`);
  console.log(`- Missing: ${missingImages.length}`);
  console.log(`- Broken (HTML 404s): ${brokenImages.length}`);

  const toRestore = [...missingImages, ...brokenImages];

  if (toRestore.length === 0) {
    console.log('\nAll referenced images in index.html are present and valid!');
    return;
  }

  console.log(`\nAttempting to download ${toRestore.length} images...`);

  let successCount = 0;
  for (const item of toRestore) {
    const liveUrl = `https://designflash.in${item.subPath}`;
    console.log(`Downloading ${liveUrl}...`);
    try {
      // Delete broken file first if it exists
      if (fs.existsSync(item.localPath)) {
        fs.unlinkSync(item.localPath);
      }
      await downloadFile(liveUrl, item.localPath);
      console.log(`  -> SUCCESS!`);
      successCount++;
    } catch (err) {
      console.log(`  -> FAILED: ${err.message}`);
    }
  }

  console.log(`\nRestore complete! Successfully restored ${successCount} / ${toRestore.length} images.`);
}

run();
