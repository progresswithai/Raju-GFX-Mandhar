const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'designflash.in', 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

// Search for 'Digital Marketing | UI/UX Design' or 'EXPLORE'
const regex = /Digital Marketing/gi;
let match;
while ((match = regex.exec(content)) !== null) {
    console.log("Found at index:", match.index);
    const start = Math.max(0, match.index - 800);
    const end = Math.min(content.length, match.index + 800);
    console.log(content.substring(start, end));
    console.log("-------------------------------------------\n");
}
