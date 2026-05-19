const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'designflash.in', 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

console.log("=== MAIN HEADINGS ON THE HOMEPAGE ===");

// Find all occurrences of <h1>, <h2>, <h3> tags and print their contents
const headingRegex = /<(h1|h2|h3|h4)[^>]*>([\s\S]*?)<\/\1>/gi;
let match;
let count = 0;

while ((match = headingRegex.exec(content)) !== null) {
    count++;
    const tag = match[1].toUpperCase();
    const text = match[2].replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' ');
    if (text.length > 0) {
        console.log(`${count}. [${tag}] ${text}`);
    }
}
