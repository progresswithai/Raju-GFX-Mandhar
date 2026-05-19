const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'designflash.in', 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

console.log("=== SCANNING FOR ALL LOGO IMAGES ===");
const imgRegex = /<img[^>]+>/gi;
let match;
let count = 0;
while ((match = imgRegex.exec(content)) !== null) {
    const tag = match[0];
    if (tag.toLowerCase().includes('logo') || tag.toLowerCase().includes('cropped') || tag.toLowerCase().includes('wp-content')) {
        count++;
        console.log(`[${count}] Found tag:`, tag);
        console.log("Index:", match.index);
        console.log("---------------------------------------");
    }
}
