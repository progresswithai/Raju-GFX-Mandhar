const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'designflash.in', 'index.html');
if (!fs.existsSync(htmlPath)) {
    console.error("index.html not found!");
    process.exit(1);
}

const content = fs.readFileSync(htmlPath, 'utf8');
const searchStr = 'goals';
// Let's do a case-insensitive search
const regex = /committed/gi;
let match;
let found = false;

while ((match = regex.exec(content)) !== null) {
    found = true;
    console.log(`Found 'committed' at index ${match.index}:`);
    const start = Math.max(0, match.index - 300);
    const end = Math.min(content.length, match.index + 500);
    console.log(content.substring(start, end));
    console.log("-------------------------------------------\n");
}

if (!found) {
    // Search for just 'goals'
    const regex2 = /goals/gi;
    while ((match = regex2.exec(content)) !== null) {
        console.log(`Found 'goals' at index ${match.index}:`);
        const start = Math.max(0, match.index - 300);
        const end = Math.min(content.length, match.index + 500);
        console.log(content.substring(start, end));
        console.log("-------------------------------------------\n");
    }
}
