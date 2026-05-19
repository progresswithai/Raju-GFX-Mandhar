const fs = require('fs');
const path = require('path');

const aboutHtmlPath = path.join(__dirname, 'designflash.in', 'about', 'index.html');
const content = fs.readFileSync(aboutHtmlPath, 'utf8');

const headStart = content.indexOf('<head>');
const headEnd = content.indexOf('</head>');
const headContent = content.substring(headStart, headEnd);

console.log("=== SCANNING ALL LINK TAGS IN HEAD ===");
const linkRegex = /<link\b[^>]*>/gi;
let match;
let count = 0;
while ((match = linkRegex.exec(headContent)) !== null) {
    count++;
    console.log(`[${count}] ${match[0]}`);
}
