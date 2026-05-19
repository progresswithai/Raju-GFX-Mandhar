const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'designflash.in', 'wp-content', 'et-cache', '719', 'et-divi-dynamic-tb-369223-tb-368283-719.css');

if (!fs.existsSync(cssPath)) {
    console.error("Homepage CSS cache not found!");
    process.exit(1);
}

const content = fs.readFileSync(cssPath, 'utf8');

console.log("=== SCANNING FOR BACKGROUND IMAGES IN FOOTER CSS ===");
// Find any url(...) references near tb_footer or footer class
const regexUrl = /url\(([^)]+)\)/gi;
let match;
let count = 0;
while ((match = regexUrl.exec(content)) !== null) {
    count++;
    console.log(`[${count}] Found background URL: ${match[1]}`);
}
