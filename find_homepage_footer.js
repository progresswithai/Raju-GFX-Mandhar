const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'designflash.in', 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

const footerStart = content.indexOf('<footer');
const footerEnd = content.indexOf('</footer>');

if (footerStart !== -1 && footerEnd !== -1) {
    console.log("=== HOMEPAGE FOOTER FOUND ===");
    const footerHTML = content.substring(footerStart, footerEnd + 9);
    console.log("Start tag:", content.substring(footerStart, footerStart + 200));
    console.log("\nEnd tag:", content.substring(footerEnd - 200, footerEnd + 9));
    console.log("\nTotal Footer Length:", footerHTML.length);
    
    // Save extracted footer to a temp file to inspect
    fs.writeFileSync(path.join(__dirname, 'extracted_footer.html'), footerHTML, 'utf8');
    console.log("\nSaved to extracted_footer.html");
} else {
    console.log("No <footer tag found! Scanning for id='main-footer' or class='footer'");
    const mainFooterIndex = content.indexOf('id="main-footer"');
    if (mainFooterIndex !== -1) {
        console.log("Found id='main-footer' at index:", mainFooterIndex);
    }
}
