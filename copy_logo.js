const fs = require('fs');
const path = require('path');

const srcPath = `C:\\Users\\KALYANI\\.gemini\\antigravity\\brain\\24e9bedb-8818-4fc5-ac03-0e50660203be\\media__1779178932350.png`;
const destDir = `E:\\Raju wesbite\\designflash.in\\wp-content\\uploads\\2025\\04`;

const targets = [
  'Logo-black-500_250.webp',
  'Logo-black-500_250-480x240.webp'
];

try {
  if (!fs.existsSync(srcPath)) {
    console.error(`Source logo file not found at: ${srcPath}`);
    process.exit(1);
  }

  targets.forEach(target => {
    const destPath = path.join(destDir, target);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Successfully replaced logo file: ${destPath}`);
  });

  // Also save it as logo.png in the uploads folder
  const pngPath = path.join(destDir, 'logo.png');
  fs.copyFileSync(srcPath, pngPath);
  console.log(`Successfully saved copy as: ${pngPath}`);

  console.log('\nLogo replacement complete! Please refresh http://127.0.0.1:3000/ to view the new logo.');
} catch (err) {
  console.error('Error replacing logo:', err);
}
