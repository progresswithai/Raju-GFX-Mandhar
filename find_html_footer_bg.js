const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'designflash.in', 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

const footerStart = content.indexOf('<footer');
const footerEnd = content.indexOf('</footer>', footerStart);

if (footerStart !== -1 && footerEnd !== -1) {
    const footerHTML = content.substring(footerStart, footerEnd + 9);
    console.log("=== SCANNING HOMEPAGE FOOTER HTML FOR BACKGROUNDS ===");
    
    // Find all background or style attributes
    const regexStyle = /(style|background)="([^"]+)"/gi;
    let match;
    let count = 0;
    while ((match = regexStyle.exec(footerHTML)) !== null) {
        count++;
        console.log(`[${count}] Found style/background: ${match[0]}`);
    }
    
    // Search for any url(...) in the footer HTML
    const regexUrl = /url\(([^)]+)\)/gi;
    while ((match = regexUrl.exec(footerHTML)) !== null) {
        console.log(`Found URL in HTML: ${match[1]}`);
    }
} else {
    console.log("No footer found in index.html!");
}
