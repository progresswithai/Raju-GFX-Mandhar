const fs = require('fs');
const path = require('path');

const srcPath = `C:\\Users\\KALYANI\\.gemini\\antigravity\\brain\\24e9bedb-8818-4fc5-ac03-0e50660203be\\media__1779178932350.png`;
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

  console.log('Searching and replacing all logo assets recursively inside wp-content/uploads...');
  walkAndReplace(baseDir);

  console.log('\nLogo replacement complete! Please run a hard refresh (Ctrl + F5 or Cmd + Shift + R) on http://127.0.0.1:3000/ to view the new logo.');
} catch (err) {
  console.error('Error replacing logo:', err);
}
