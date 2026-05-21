const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'designflash.in');

console.log('Project Root:', rootDir);
console.log('Source Subdirectory:', srcDir);

// Check if source subdirectory exists
if (!fs.existsSync(srcDir)) {
  console.error('Error: Source subdirectory "designflash.in" does not exist!');
  process.exit(1);
}

// Step 1: Delete legacy portfolio files in root to avoid conflict/redundancy
const legacyFiles = [
  path.join(rootDir, 'portfolio.html'),
  path.join(rootDir, 'portfolio.css'),
  path.join(rootDir, 'portfolio.js')
];

legacyFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`Deleting legacy file in root: ${path.basename(file)}`);
    fs.unlinkSync(file);
  }
});

// Helper function to recursively copy and move files
function moveRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const files = fs.readdirSync(src);
    for (const file of files) {
      moveRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    // Copy and overwrite, then delete source file
    fs.copyFileSync(src, dest);
    fs.unlinkSync(src);
  }
}

console.log('--- Moving files and folders to project root ---');
const contents = fs.readdirSync(srcDir);
for (const item of contents) {
  const srcPath = path.join(srcDir, item);
  const destPath = path.join(rootDir, item);
  console.log(`Moving: designflash.in/${item} -> ${item}`);
  moveRecursive(srcPath, destPath);
}

// Delete the empty source directory
console.log('Deleting empty "designflash.in" directory...');
fs.rmSync(srcDir, { recursive: true, force: true });
console.log('Subdirectory "designflash.in" successfully removed.');

// Step 2: Recursively update paths and links in all text files
console.log('--- Scanning files to update paths and links ---');

const textExtensions = ['.html', '.css', '.js', '.xml', '.json', '.txt'];
let scannedCount = 0;
let updatedCount = 0;

function scanAndReplace(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip systemic directories
      if (item === '.git' || item === 'node_modules' || item === 'hts-cache' || item === 'scratch') {
        continue;
      }
      scanAndReplace(fullPath);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (textExtensions.includes(ext)) {
        scannedCount++;
        let content = fs.readFileSync(fullPath, 'utf8');
        let originalContent = content;

        // Apply path and domain replacements
        // 1. Vercel domain subdirectory references
        content = content.replace(/https:\/\/raju-gfx-mandhar-nxny\.vercel\.app\/designflash\.in\//g, 'https://raju-gfx-mandhar-nxny.vercel.app/');
        content = content.replace(/https:\/\/raju-gfx-mandhar-nxny\.vercel\.app\/designflash\.in/g, 'https://raju-gfx-mandhar-nxny.vercel.app/');
        
        // 2. Standard URL protocol domain references
        content = content.replace(/https:\/\/www\.designflash\.in/g, 'https://www.rajugfx.in');
        content = content.replace(/http:\/\/www\.designflash\.in/g, 'http://www.rajugfx.in');
        content = content.replace(/https:\/\/designflash\.in/g, 'https://rajugfx.in');
        content = content.replace(/http:\/\/designflash\.in/g, 'http://rajugfx.in');
        content = content.replace(/\/\/www\.designflash\.in/g, '//www.rajugfx.in');
        content = content.replace(/\/\/designflash\.in/g, '//rajugfx.in');
        
        // 3. Path-based subfolder prefix cleanups
        content = content.replace(/\/designflash\.in\//g, '/');
        content = content.replace(/designflash\.in\//g, '');

        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, 'utf8');
          updatedCount++;
          console.log(`Updated paths in: ${path.relative(rootDir, fullPath)}`);
        }
      }
    }
  }
}

scanAndReplace(rootDir);

console.log('--- Restructuring & Sanitization Complete ---');
console.log(`Total files scanned: ${scannedCount}`);
console.log(`Total files updated: ${updatedCount}`);
