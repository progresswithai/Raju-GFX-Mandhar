const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'designflash.in', 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

// Find all <img> tags in the bottom 20,000 characters of index.html
const bottomContent = content.substring(content.length - 35000);
const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
let match;
console.log("=== IMAGES FOUND IN THE FOOTER AREA ===");
while ((match = imgRegex.exec(bottomContent)) !== null) {
    console.log("Full Tag:", match[0]);
    console.log("Src:", match[1]);
    console.log("---------------------------------------");
}
