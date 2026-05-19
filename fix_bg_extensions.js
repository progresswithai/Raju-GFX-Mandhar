const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'designflash.in');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (file === 'wp-includes' || file === 'wp-json' || file === '_https_') {
                return;
            }
            processDirectory(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.html' || ext === '.css' || ext === '.js') {
                fixFileExtensions(fullPath);
            }
        }
    });
}

function fixFileExtensions(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace any occurrence of Design-process-bg.html with Design-process-bg.jpg.webp
    const target = /Design-process-bg\.html/gi;
    
    if (target.test(content)) {
        console.log(`Fixing image extension in: ${filePath}`);
        content = content.replace(target, 'Design-process-bg.jpg.webp');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  -> Successfully replaced Design-process-bg.html with Design-process-bg.jpg.webp!`);
    }
}

console.log("=== BACKGROUND IMAGE EXTENSION FIXER ===");
console.log("Replacing all broken Design-process-bg.html references with Design-process-bg.jpg.webp...");
processDirectory(targetDir);
console.log("\n✅ ALL BROKEN EXTENSION REFERENCES FIXED PERFECTLY!");
