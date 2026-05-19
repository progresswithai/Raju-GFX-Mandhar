const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'designflash.in');

function findLogos(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            findLogos(fullPath);
        } else {
            const lowerFile = file.toLowerCase();
            if (lowerFile.includes('logo') && (lowerFile.endsWith('.png') || lowerFile.endsWith('.webp') || lowerFile.endsWith('.jpg') || lowerFile.endsWith('.jpeg'))) {
                console.log(`Found logo: ${fullPath} (Size: ${stat.size} bytes)`);
            }
        }
    });
}

console.log("=== SCANNING FOR ALL LOGO IMAGES IN THE WORKSPACE ===");
findLogos(targetDir);
