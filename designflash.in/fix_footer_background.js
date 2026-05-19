const fs = require('fs');
const path = require('path');
const https = require('https');

const rootDir = __dirname;
const targetImageDir = path.join(rootDir, 'wp-content', 'uploads', '2024', '10');
const targetImagePath = path.join(targetImageDir, 'Design-process-bg.jpg');

// Ensure directory exists
if (!fs.existsSync(targetImageDir)) {
  fs.mkdirSync(targetImageDir, { recursive: true });
}

// URLs to try downloading from
const urls = [
  'https://designflash.in/wp-content/uploads/2024/10/Design-process-bg.jpg.webp',
  'https://designflash.in/wp-content/uploads/2024/10/Design-process-bg.jpg'
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    console.log(`Attempting to download background image from: ${url}`);
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: Status ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Successfully downloaded background to ${destPath}`);
          resolve(true);
        });
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function getBackgroundImage() {
  for (const url of urls) {
    try {
      await downloadFile(url, targetImagePath);
      return true;
    } catch (err) {
      console.warn(`Could not download from ${url}: ${err.message}`);
    }
  }
  throw new Error('All background image download attempts failed.');
}

// Recursive directory walk to find HTML files
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      if (f.endsWith('.html')) {
        callback(dirPath);
      }
    }
  });
}

async function main() {
  try {
    // 1. Download background image
    await getBackgroundImage();

    // 2. Process all HTML files
    console.log('Processing HTML files...');
    let processedCount = 0;

    walkDir(rootDir, (filePath) => {
      // Skip node_modules or standard non-project folders if any
      if (filePath.includes('node_modules')) return;

      const fileContent = fs.readFileSync(filePath, 'utf8');

      // Check if this file contains references we want to fix
      const hasHtmlRef = fileContent.includes('Design-process-bg.html');
      const hasJpgRef = fileContent.includes('Design-process-bg.jpg');

      if (hasHtmlRef || hasJpgRef) {
        // Calculate relative path from this file to targetImagePath
        const relativeDir = path.relative(path.dirname(filePath), targetImageDir);
        let relativeUrl = path.join(relativeDir, 'Design-process-bg.jpg').replace(/\\/g, '/');

        // relativeUrl might look like "wp-content/uploads/2024/10/Design-process-bg.jpg"
        // Let's ensure it has correct relative structure
        if (!relativeUrl.startsWith('.') && !relativeUrl.startsWith('wp-content')) {
          // path.relative might return empty if in same dir
        }

        // Replace absolute URL and local broken URL references
        let newContent = fileContent;

        // Pattern 1: Absolute URL to designflash.in (both webp and jpg)
        const absolutePattern = /https:\/\/designflash\.in\/wp-content\/uploads\/2024\/10\/Design-process-bg\.(html|jpg|jpg\.webp)/g;
        newContent = newContent.replace(absolutePattern, relativeUrl);

        // Pattern 2: Relative or root-relative broken html/jpg references
        // e.g. url(wp-content/uploads/2024/10/Design-process-bg.html) or url(../wp-content/...)
        const relativePattern = /(?:\.\.\/)*wp-content\/uploads\/2024\/10\/Design-process-bg\.(html|jpg|jpg\.webp)/g;
        newContent = newContent.replace(relativePattern, relativeUrl);

        if (newContent !== fileContent) {
          fs.writeFileSync(filePath, newContent, 'utf8');
          processedCount++;
        }
      }
    });

    console.log(`Successfully fixed background image paths in ${processedCount} HTML files!`);
  } catch (err) {
    console.error('Error running fix:', err);
  }
}

main();
