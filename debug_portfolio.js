const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'designflash.in', 'index.html');
if (!fs.existsSync(htmlPath)) {
    console.error("index.html not found!");
    process.exit(1);
}

const content = fs.readFileSync(htmlPath, 'utf8');
const target = 'Website Portfolio';
const index = content.indexOf(target);

if (index !== -1) {
    const start = Math.max(0, index - 1000);
    const end = Math.min(content.length, index + 10000);
    const slice = content.substring(start, end);
    fs.writeFileSync(path.join(__dirname, 'debug_tabs.txt'), slice, 'utf8');
    console.log("Written 11,000 characters around 'Website Portfolio' to debug_tabs.txt");
} else {
    // Try searching for difl_advancedtab
    const altTarget = 'difl_advancedtab';
    const altIndex = content.indexOf(altTarget);
    if (altIndex !== -1) {
        const start = Math.max(0, altIndex - 1000);
        const end = Math.min(content.length, altIndex + 10000);
        const slice = content.substring(start, end);
        fs.writeFileSync(path.join(__dirname, 'debug_tabs.txt'), slice, 'utf8');
        console.log("Written 11,000 characters around 'difl_advancedtab' to debug_tabs.txt");
    } else {
        console.log("Neither 'Website Portfolio' nor 'difl_advancedtab' was found in index.html!");
    }
}
