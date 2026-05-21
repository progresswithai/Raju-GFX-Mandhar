const fs = require('fs');
const path = require('path');
const https = require('https');

const rootDir = __dirname;
console.log('Root Directory:', rootDir);

// Helpers to recursively walk directories
function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const stat = fs.statSync(dirPath);
    if (stat.isDirectory()) {
      if (f === 'node_modules' || f === '.git') return;
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

// Helper to download a file from a URL to a local path
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    // Ensure parent directory exists
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
        'Accept': '*/*',
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
      
      const contentType = response.headers['content-type'] || '';
      if (contentType.includes('text/html')) {
        file.close(() => {
          fs.unlink(destPath, () => {});
          reject(new Error('Returned HTML instead of binary font file'));
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

const FONTS_TO_DOWNLOAD = [
  // ETmodules (Divi Icon Font)
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/modules/all/modules.eot',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/modules/all/modules.eot'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/modules/all/modules.woff',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/modules/all/modules.woff'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/modules/all/modules.ttf',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/modules/all/modules.ttf'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/modules/all/modules.svg',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/modules/all/modules.svg'
  },
  // FontAwesome Regular
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-regular-400.eot',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-regular-400.eot'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-regular-400.woff2',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-regular-400.woff2'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-regular-400.woff',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-regular-400.woff'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-regular-400.ttf',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-regular-400.ttf'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-regular-400.svg',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-regular-400.svg'
  },
  // FontAwesome Solid
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-solid-900.eot',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-solid-900.eot'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-solid-900.woff2',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-solid-900.woff2'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-solid-900.woff',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-solid-900.woff'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-solid-900.ttf',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-solid-900.ttf'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-solid-900.svg',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-solid-900.svg'
  },
  // FontAwesome Brands
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-brands-400.eot',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-brands-400.eot'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-brands-400.woff2',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-brands-400.woff2'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-brands-400.woff',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-brands-400.woff'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-brands-400.ttf',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-brands-400.ttf'
  },
  {
    url: 'https://rajugfx.in/wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-brands-400.svg',
    localPath: 'wp-content/themes/Divi/core/admin/fonts/fontawesome/fa-brands-400.svg'
  }
];

async function run() {
  console.log('Step 1: Downloading all required icon fonts locally...');
  for (const font of FONTS_TO_DOWNLOAD) {
    const fullDestPath = path.join(rootDir, font.localPath);
    console.log(`Downloading ${font.url} to ${font.localPath}...`);
    try {
      await downloadFile(font.url, fullDestPath);
      console.log(`  -> SUCCESS!`);
    } catch (err) {
      console.log(`  -> FAILED: ${err.message}`);
    }
  }

  console.log('\nStep 2: Updating absolute references to designflash.in in all HTML and CSS files...');
  let updatedFilesCount = 0;

  walkDir(rootDir, (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.html' || ext === '.css') {
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        let needsUpdate = false;

        // Patterns to replace to make them local
        // 1. https://rajugfx.in/wp-content -> /wp-content
        // 2. http://rajugfx.in/wp-content -> /wp-content
        // 3. //rajugfx.in/wp-content -> /wp-content
        // 4. https://rajugfx.in/wp-includes -> /wp-includes
        // 5. http://rajugfx.in/wp-includes -> /wp-includes
        // 6. //rajugfx.in/wp-includes -> /wp-includes
        const regexes = [
          /https:\/\/designflash\.in\/wp-content/g,
          /http:\/\/designflash\.in\/wp-content/g,
          /\/\/designflash\.in\/wp-content/g,
          /https:\/\/designflash\.in\/wp-includes/g,
          /http:\/\/designflash\.in\/wp-includes/g,
          /\/\/designflash\.in\/wp-includes/g
        ];

        for (const regex of regexes) {
          if (regex.test(content)) {
            content = content.replace(regex, (match) => {
              needsUpdate = true;
              return match.includes('wp-content') ? '/wp-content' : '/wp-includes';
            });
          }
        }

        if (needsUpdate) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Updated references in: ${path.relative(rootDir, filePath)}`);
          updatedFilesCount++;
        }
      } catch (e) {
        console.log(`Error processing file ${filePath}: ${e.message}`);
      }
    }
  });

  console.log(`\nFinished! Total files updated: ${updatedFilesCount}`);
}

run();
