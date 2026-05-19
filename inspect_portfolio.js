const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'designflash.in', 'index.html');
if (!fs.existsSync(htmlPath)) {
    console.error("index.html not found!");
    process.exit(1);
}

const content = fs.readFileSync(htmlPath, 'utf8');
console.log("File length:", content.length);

const target = 'difl_advancedtab';
const index = content.indexOf(target);
console.log("Found at index:", index);

if (index !== -1) {
    const start = Math.max(0, index - 500);
    const end = Math.min(content.length, index + 2500);
    const context = content.substring(start, end);
    fs.writeFileSync(path.join(__dirname, 'inspect_result.txt'), context, 'utf8');
    console.log("Written surrounding content to inspect_result.txt");
} else {
    console.log("Not found!");
}
