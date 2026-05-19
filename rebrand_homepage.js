const fs = require('fs');
const path = require('path');

const htmlFilePath = path.join(__dirname, 'designflash.in', 'index.html');

function run() {
    if (!fs.existsSync(htmlFilePath)) {
        console.error("Error: designflash.in/index.html not found!");
        process.exit(1);
    }

    console.log("Reading index.html...");
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    console.log("Performing brand replacements...");

    // 1. Email rebrand (Top Bar)
    htmlContent = htmlContent.replace(/wow@designflash\.in/gi, 'wow@rajugfx.in');

    // 2. Select Location rebrand (Header)
    htmlContent = htmlContent.replace(/Select Location\s*Bangalore/gi, 'Select Location Mandhar');

    // 3. Main Bangalore Address in Footer / JSON block
    const oldAddressPattern = /3rd floor,\s*Ali Plaza,\s*304,\s*(1C-308\/4,\s*)?Nehru Rd,\s*HRBR Layout 3rd Block,\s*Bengaluru,\s*Karnataka\s*560084/gi;
    const newAddress = "Mandhar colony, Raipur, Chhattisgarh, near by post office tekari 2, pincode-493111, Mandhar";
    
    htmlContent = htmlContent.replace(oldAddressPattern, newAddress);
    
    // Also catch any partial mentions of Nehru Rd / Ali Plaza
    htmlContent = htmlContent.replace(/3rd floor, Ali Plaza, 304, Nehru Rd, Bengaluru, Karnataka 560084/gi, newAddress);

    // 4. Case-preserved replacements for "Design Flash"
    // DESIGN FLASH -> RAJU GFX
    htmlContent = htmlContent.replace(/DESIGN\s+FLASH/g, 'RAJU GFX');
    // Design Flash -> Raju GFX
    htmlContent = htmlContent.replace(/Design\s+Flash/g, 'Raju GFX');
    // design flash -> raju gfx
    htmlContent = htmlContent.replace(/design\s+flash/g, 'raju gfx');
    // DesignFlash -> Raju GFX
    htmlContent = htmlContent.replace(/DesignFlash/g, 'Raju GFX');
    // designflash -> rajugfx
    htmlContent = htmlContent.replace(/designflash/g, 'rajugfx');

    // 5. Replace "Bangalore" with "Mandhar, Raipur" in main headers
    // "BEST WEBSITE DESIGN COMPANY IN BANGALORE" -> "BEST WEBSITE DESIGN COMPANY IN MANDHAR, RAIPUR"
    htmlContent = htmlContent.replace(/IN\s+BANGALORE/g, 'IN MANDHAR, RAIPUR');
    htmlContent = htmlContent.replace(/In\s+Bangalore/g, 'In Mandhar, Raipur');
    htmlContent = htmlContent.replace(/in\s+bangalore/g, 'in mandhar, raipur');

    // "Website Design Company In Bangalore" -> "Website Design Company In Mandhar, Raipur"
    htmlContent = htmlContent.replace(/Bangalore/g, 'Mandhar, Raipur');
    htmlContent = htmlContent.replace(/bangalore/g, 'mandhar, raipur');

    // 6. Save modified file
    fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
    console.log("✅ SUCCESS: Homepage rebranded successfully to Raju GFX and relocated to Mandhar colony, Raipur, Chhattisgarh!");
}

run();
