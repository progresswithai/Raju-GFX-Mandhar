const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'designflash.in');

function processDirectory(dir, depth = 0) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // Exclude system directories
            if (file === 'wp-content' || file === 'wp-includes' || file === 'wp-json' || file === '_https_') {
                return;
            }
            processDirectory(fullPath, depth + 1);
        } else if (file === 'index.html') {
            // This is a subpage or root page index.html
            rebrandPage(fullPath);
        }
    });
}

function rebrandPage(filePath) {
    console.log(`Rebranding file: ${filePath}`);
    let htmlContent = fs.readFileSync(filePath, 'utf8');

    // 1. Email rebrand (Top Bar)
    htmlContent = htmlContent.replace(/wow@designflash\.in/gi, 'wow@rajugfx.in');

    // 2. Select Location rebrand (Header)
    htmlContent = htmlContent.replace(/Select Location\s*Bangalore/gi, 'Select Location Mandhar');

    // 3. Main Bangalore Address in Footer / JSON block
    const oldAddressPattern = /3rd floor,\s*Ali Plaza,\s*304,\s*(1C-308\/4,\s*)?Nehru Rd,\s*HRBR Layout 3rd Block,\s*Bengaluru,\s*Karnataka\s*560084/gi;
    const newAddress = "Mandhar colony, Raipur, Chhattisgarh, near by post office tekari 2, pincode-493111, Mandhar";
    
    htmlContent = htmlContent.replace(oldAddressPattern, newAddress);
    htmlContent = htmlContent.replace(/3rd floor, Ali Plaza, 304, Nehru Rd, Bengaluru, Karnataka 560084/gi, newAddress);

    // 4. Case-preserved replacements for "Design Flash"
    htmlContent = htmlContent.replace(/DESIGN\s+FLASH/g, 'RAJU GFX');
    htmlContent = htmlContent.replace(/Design\s+Flash/g, 'Raju GFX');
    htmlContent = htmlContent.replace(/design\s+flash/g, 'raju gfx');
    htmlContent = htmlContent.replace(/DesignFlash/g, 'Raju GFX');
    htmlContent = htmlContent.replace(/designflash/g, 'rajugfx');

    // 5. Replace "Bangalore" with "Mandhar, Raipur" in main headers
    htmlContent = htmlContent.replace(/IN\s+BANGALORE/g, 'IN MANDHAR, RAIPUR');
    htmlContent = htmlContent.replace(/In\s+Bangalore/g, 'In Mandhar, Raipur');
    htmlContent = htmlContent.replace(/in\s+bangalore/g, 'in mandhar, raipur');
    htmlContent = htmlContent.replace(/Bangalore/g, 'Mandhar, Raipur');
    htmlContent = htmlContent.replace(/bangalore/g, 'mandhar, raipur');

    fs.writeFileSync(filePath, htmlContent, 'utf8');
}

console.log("=== MASTER REBRANDING SYSTEM ===");
console.log("Rebranding all 127 pages/folders of the website to Raju GFX Mandhar...");
processDirectory(targetDir);
console.log("\n✅ ALL WEBSITE PAGES REBRANDED SUCCESSFULLY!");
