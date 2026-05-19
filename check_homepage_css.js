const fs = require('fs');
const path = require('path');

const homepagePath = path.join(__dirname, 'designflash.in', 'index.html');
const content = fs.readFileSync(homepagePath, 'utf8');

const headStart = content.indexOf('<head>');
const headEnd = content.indexOf('</head>');
const headContent = content.substring(headStart, headEnd);

console.log("=== HOMEPAGE LINK TAGS ===");
const linkRegex = /<link\b[^>]*>/gi;
let match;
let count = 0;
while ((match = linkRegex.exec(headContent)) !== null) {
    if (match[0].includes('css') || match[0].includes('stylesheet') || match[0].includes('et-cache')) {
        count++;
        console.log(`[${count}] ${match[0]}`);
    }
}
