const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'designflash.in', 'wp-content', 'litespeed', 'css', '7a25a2697ed50647daa872cadc58035840f8.css');

if (!fs.existsSync(cssPath)) {
    console.error("LiteSpeed CSS not found!");
    process.exit(1);
}

const content = fs.readFileSync(cssPath, 'utf8');

console.log("=== SCANNING LITESPEED CSS FOR FOOTER BACKGROUNDS ===");
// Search for background-image url() near _tb_footer or main-footer
const regex = /\.et_pb_section_1_tb_footer\b[^{]*\{[^}]*background-image:[^}]*url\(([^)]+)\)/gi;
let match = regex.exec(content);
if (match) {
    console.log("Found background URL for section_1_tb_footer:", match[1]);
} else {
    console.log("No specific class regex match. Finding ALL background image URLs containing 'uploads':");
    const regexAll = /url\(([^)]+)\)/gi;
    let urlMatch;
    let count = 0;
    while ((urlMatch = regexAll.exec(content)) !== null) {
        const url = urlMatch[1].replace(/['"]/g, '');
        if (url.includes('uploads') && (url.includes('bg') || url.includes('footer') || url.includes('pattern') || url.includes('honeycomb'))) {
            count++;
            console.log(`[${count}] Found upload background: ${url}`);
        }
    }
}
