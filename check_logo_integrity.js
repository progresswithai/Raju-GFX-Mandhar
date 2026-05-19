const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'designflash.in', 'wp-content', 'uploads', '2025', '04');

console.log("=== LOGO FILE INTEGRITY CHECK ===");

const filesToCheck = [
    'Logo-black-500_250.webp',
    'logo.png',
    'whitethemlogo.png'
];

filesToCheck.forEach(file => {
    const fullPath = path.join(baseDir, file);
    const exists = fs.existsSync(fullPath);
    console.log(`File: ${file}`);
    console.log(`  -> Exists: ${exists}`);
    if (exists) {
        const stat = fs.statSync(fullPath);
        console.log(`  -> Size: ${stat.size} bytes`);
    }
    console.log("-----------------------------------");
});
