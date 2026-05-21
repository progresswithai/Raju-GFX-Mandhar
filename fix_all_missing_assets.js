const fs = require('fs');
const path = require('path');
const https = require('https');

const rootDir = __dirname;
const wpContentDir = path.join(rootDir, 'wp-content');

// Helper to recursively walk a directory and call callback for each file
function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const stat = fs.statSync(dirPath);
    if (stat.isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

// Helper to download a file from a URL to a local destination path
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    
    // Parse URL to use options object with headers
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
        'Referer': 'https://rajugfx.in/',
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
      
      // Check content-type to ensure it's not a text/html 404 page
      const contentType = response.headers['content-type'] || '';
      if (contentType.includes('text/html')) {
        file.close(() => {
          fs.unlink(destPath, () => {});
          reject(new Error('Returned HTML instead of binary'));
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

// Extensions to try probing
const EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg', 'svg', 'gif', 'pdf'];

const MAPPING = {
  'wp-content/uploads/2024/05/Design-Flash-Client-Sanchvi': 'https://rajugfx.in/wp-content/uploads/2025/01/Afifa_Logo-removebg-preview-300x300-1.webp',
  'wp-content/uploads/2024/10/Bdwc-logo': 'https://rajugfx.in/wp-content/uploads/2025/04/bdwc-200_150.png.webp',
  'wp-content/uploads/2024/10/Bouncenbuild-logo': 'https://rajugfx.in/wp-content/uploads/2025/04/BouncenBuild-200_150.png.webp',
  'wp-content/uploads/2024/10/Design-Flash-Client-N-1-1': 'https://rajugfx.in/wp-content/uploads/2025/04/Airmaster-logo-200_150.png.webp',
  'wp-content/uploads/2024/10/manifest-logo': 'https://rajugfx.in/wp-content/uploads/2025/04/Manifest-200_150.png.webp',
  'wp-content/uploads/2024/10/Rst-bangalore-logo': 'https://rajugfx.in/wp-content/uploads/2025/04/Rs-traders-200_150.png.webp',
  'wp-content/uploads/2024/10/Shafiq-signature-white-logo': 'https://rajugfx.in/wp-content/uploads/2025/04/Shafiq-Signature-200_150.png.webp',
  'wp-content/uploads/2024/10/Skynet-logo-scaled-1': 'https://rajugfx.in/wp-content/uploads/2025/04/Skynet-200_150.png.webp',
  'wp-content/uploads/2024/10/The-Baklava-Company-1': 'https://rajugfx.in/wp-content/uploads/2025/04/The-baklava-200_150.png.webp',
  'wp-content/uploads/2024/10/zil-group-logo': 'https://rajugfx.in/wp-content/uploads/2025/04/Airmaster-logo-200_150.png.webp'
};

async function main() {
  console.log('Scanning wp-content for broken .html assets...');
  const brokenFiles = [];

  walkDir(wpContentDir, (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.html') {
      try {
        const header = fs.readFileSync(filePath, 'utf8').substring(0, 500);
        if (header.includes('<!DOCTYPE') || header.includes('<html') || header.includes('Page Not Found') || header.includes('404')) {
          brokenFiles.push(filePath);
        }
      } catch (e) {
        // Ignored
      }
    }
  });

  console.log(`Found ${brokenFiles.length} broken .html assets to restore!`);

  let restoredCount = 0;
  let skippedCount = 0;
  const replacements = [];

  for (const filePath of brokenFiles) {
    const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
    const relativeDir = path.dirname(relativePath).replace(/\\/g, '/');
    const ext = path.extname(filePath);
    const baseName = path.basename(filePath, ext);
    const relPathNoExt = `${relativeDir}/${baseName}`;

    console.log(`\nRestoring: ${relPathNoExt}...`);

    let found = false;
    let foundExt = '';

    // Check if we have a direct mapping for this broken asset due to 2025 site restructuring
    if (MAPPING[relPathNoExt]) {
      const liveUrl = MAPPING[relPathNoExt];
      // Extract correct extension from mapped URL (usually webp)
      const mappedExt = path.extname(new URL(liveUrl).pathname).replace('.', '');
      // If the mapped URL ends in something like "png.webp", let's save it as "webp"
      const finalExt = mappedExt || 'webp';
      const tempDest = path.join(path.dirname(filePath), `${baseName}.${finalExt}`);

      console.log(`  [Map Found] Downloading from live URL: ${liveUrl}`);
      try {
        await downloadFile(liveUrl, tempDest);
        console.log(`  -> SUCCESS: Restored mapped asset as .${finalExt}`);
        found = true;
        foundExt = finalExt;
      } catch (err) {
        console.log(`  -> FAILED to download mapped URL: ${err.message}`);
      }
    }

    // Fallback: If not mapped or download failed, probe normally
    if (!found) {
      console.log(`  No mapping or map download failed. Probing live website...`);
      for (const testExt of EXTENSIONS) {
        const liveUrl = `https://rajugfx.in/${relativeDir}/${baseName}.${testExt}`;
        const tempDest = path.join(path.dirname(filePath), `${baseName}.${testExt}`);
        
        try {
          await downloadFile(liveUrl, tempDest);
          console.log(`  -> SUCCESS: Probed and downloaded as .${testExt}`);
          found = true;
          foundExt = testExt;
          break;
        } catch (err) {
          console.log(`     x Try .${testExt} failed: ${err.message}`);
        }
      }
    }

    if (found) {
      restoredCount++;
      fs.unlinkSync(filePath);
      console.log(`  -> Deleted broken file: ${relativePath}`);
      replacements.push({
        relPathNoExt,
        correctExt: foundExt
      });
    } else {
      skippedCount++;
      console.log(`  -> FAILED: Could not restore ${baseName} with any extension.`);
    }
  }

  console.log(`\nRestoration and downloads complete!`);
  console.log(`Restored: ${restoredCount}, Failed/Skipped: ${skippedCount}`);

  if (replacements.length > 0) {
    console.log('\nUpdating references in all HTML files...');
    let filesUpdated = 0;

    const htmlFiles = [];
    function findHtmlFiles(dir) {
      fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        if (f === 'node_modules') return;
        const stat = fs.statSync(dirPath);
        if (stat.isDirectory()) {
          findHtmlFiles(dirPath);
        } else {
          if (f.endsWith('.html')) {
            htmlFiles.push(dirPath);
          }
        }
      });
    }

    findHtmlFiles(rootDir);

    for (const htmlFile of htmlFiles) {
      let content = fs.readFileSync(htmlFile, 'utf8');
      let originalContent = content;

      for (const rep of replacements) {
        const escapedPath = rep.relPathNoExt.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`${escapedPath}\\.(html|webp|jpg|jpeg|png|gif|svg|pdf)`, 'gi');
        content = content.replace(regex, `${rep.relPathNoExt}.${rep.correctExt}`);
      }

      if (content !== originalContent) {
        fs.writeFileSync(htmlFile, content, 'utf8');
        filesUpdated++;
      }
    }

    console.log(`Successfully updated image references in ${filesUpdated} HTML files!`);
  }
}

main().catch(err => console.error('Fatal error in script:', err));
