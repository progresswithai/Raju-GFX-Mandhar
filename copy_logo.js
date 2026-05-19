const fs = require('fs');
const path = require('path');

// Pointing to the new whitethemlogo.png file
const srcPath = `C:\\Users\\KALYANI\\.gemini\\antigravity\\brain\\24e9bedb-8818-4fc5-ac03-0e50660203be\\media__1779180262127.png`;
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

  console.log('Replacing all logo assets with the new White Theme Logo...');
  walkAndReplace(baseDir);

  // Also save it as logo.png and whitethemlogo.png in the uploads folder
  const destDir = path.join(baseDir, '2025', '04');
  if (fs.existsSync(destDir)) {
    fs.copyFileSync(srcPath, path.join(destDir, 'logo.png'));
    fs.copyFileSync(srcPath, path.join(destDir, 'whitethemlogo.png'));
    console.log('Saved local copies in uploads folder.');
  }

  console.log('\nLogo replacement complete! Please refresh http://127.0.0.1:3000/ to view the new White Theme Logo.');
} catch (err) {
  console.error('Error replacing logo:', err);
}
