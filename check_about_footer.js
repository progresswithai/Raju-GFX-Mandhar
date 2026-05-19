const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, 'designflash.in', 'about', 'index.html');
const content = fs.readFileSync(aboutPath, 'utf8');

const footerStart = content.indexOf('<footer');
const footerEnd = content.indexOf('</footer>', footerStart);

if (footerStart !== -1 && footerEnd !== -1) {
    const footerHTML = content.substring(footerStart, footerEnd + 9);
    console.log("=== ABOUT FOOTER LOGO AREA ===");
    const logoIndex = footerHTML.indexOf('<img');
    if (logoIndex !== -1) {
        console.log(footerHTML.substring(logoIndex - 100, logoIndex + 300));
    } else {
        console.log("No <img> tag found in footer!");
    }
    
    console.log("\n=== ABOUT FOOTER SECTION CLASS ===");
    console.log(footerHTML.substring(0, 500));
} else {
    console.log("No footer found in about/index.html!");
}
