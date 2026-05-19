const fs = require('fs');
const path = require('path');

const aboutHtmlPath = path.join(__dirname, 'designflash.in', 'about', 'index.html');

if (!fs.existsSync(aboutHtmlPath)) {
    console.error("about/index.html not found!");
    process.exit(1);
}

const content = fs.readFileSync(aboutHtmlPath, 'utf8');

console.log("=== CHECKING CSS LINKS IN ABOUT/INDEX.HTML ===");
const linkRegex = /<link[^>]+href="([^"]+)"[^>]*>/gi;
let match;
let count = 0;
while ((match = linkRegex.exec(content)) !== null) {
    if (match[1].includes('css') || match[1].includes('style')) {
        count++;
        console.log(`[${count}] ${match[0]}`);
        if (count >= 10) break;
    }
}
