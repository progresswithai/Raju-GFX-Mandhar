const fs = require('fs');
const path = require('path');

const srcPath = `E:\\Raju wesbite\\designflash.in\\wp-content\\themes\\Divi\\includes\\builder\\styles\\images\\whitethemelogo.png`;
const baseDir = `E:\\Raju wesbite\\designflash.in\\wp-content\\uploads`;

try {
  if (!fs.existsSync(srcPath)) {
    console.error(`Source logo file not found at: ${srcPath}`);
    process.exit(1);
  }

  function walkAndReplace(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkAndReplace(fullPath);
      } else {
        const lowerFile = file.toLowerCase();
        // Target any files that look like the header logo
        if (
          lowerFile.startsWith('logo-black') || 
          lowerFile.startsWith('logo-white') ||
          lowerFile.startsWith('cropped-df')
        ) {
          fs.copyFileSync(srcPath, fullPath);
          console.log(`Replaced logo asset: ${fullPath}`);
        }
      }
    });
  }

  console.log('Searching and replacing all logo assets recursively inside wp-content/uploads with White Theme Logo...');
  walkAndReplace(baseDir);

  // Also replace logo.png in the uploads folder just in case
  const destDir = path.join(baseDir, '2025', '04');
  if (fs.existsSync(destDir)) {
    fs.copyFileSync(srcPath, path.join(destDir, 'logo.png'));
    fs.copyFileSync(srcPath, path.join(destDir, 'whitethemlogo.png'));
    console.log(`Saved copy to: ${path.join(destDir, 'logo.png')}`);
    console.log(`Saved copy to: ${path.join(destDir, 'whitethemlogo.png')}`);
  }

  console.log('\nLogo replacement complete! Please run a hard refresh (Ctrl + F5 or Cmd + Shift + R) on http://127.0.0.1:3000/ to view the new White Theme Logo.');
} catch (err) {
  console.error('Error replacing logo:', err);
}
