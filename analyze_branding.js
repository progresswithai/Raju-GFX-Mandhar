const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const targetDir = path.join(rootDir, 'designflash.in');

const stats = {
    brandName: 0,       // "Design Flash" / "DesignFlash"
    email: 0,           // "wow@designflash.in" / "info@designflash.in"
    phone: 0,           // "9202542342" or other numbers
    address: 0,         // "Bangalore" / specific old addresses
    filesScanned: 0
};

const uniqueFiles = [
    path.join(targetDir, 'index.html'),
    path.join(targetDir, 'about', 'index.html'),
    path.join(targetDir, 'contact', 'index.html'),
    path.join(targetDir, 'portfolio', 'index.html'),
    path.join(targetDir, 'blog', 'index.html')
];

uniqueFiles.forEach(file => {
    if (fs.existsSync(file)) {
        stats.filesScanned++;
        const content = fs.readFileSync(file, 'utf8');
        
        // Brand name count
        const brandMatches = content.match(/design\s*flash/gi);
        if (brandMatches) stats.brandName += brandMatches.length;

        // Email count
        const emailMatches = content.match(/wow@designflash\.in|info@designflash\.in/gi);
        if (emailMatches) stats.email += emailMatches.length;

        // Location count
        const locationMatches = content.match(/Bangalore/gi);
        if (locationMatches) stats.address += locationMatches.length;
    }
});

console.log("=== BRANDING DISCOVERY REPORT ===");
console.log(`Core Files Scanned: ${stats.filesScanned}`);
console.log(`- Occurrences of "Design Flash" or "DesignFlash": ${stats.brandName}`);
console.log(`- Occurrences of "wow@designflash.in" or other company emails: ${stats.email}`);
console.log(`- Occurrences of "Bangalore" (Location references): ${stats.address}`);
console.log("==================================");
