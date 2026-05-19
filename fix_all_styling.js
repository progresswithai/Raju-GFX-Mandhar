const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'designflash.in');
const masterCssFile = 'wp-content/litespeed/css/7a25a2697ed50647daa872cadc58035840f8.css';

function getRelativePrefix(depth) {
    return '../'.repeat(depth);
}

function processDirectory(dir, depth = 0) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // Exclude system directories
            if (file === 'wp-content' || file === 'wp-includes' || file === 'wp-json' || file === '_https_') {
                return;
            }
            processDirectory(fullPath, depth + 1);
        } else if (file === 'index.html' && depth > 0) {
            // This is a subpage index.html
            fixSubpageStyling(fullPath, depth);
        }
    });
}

function fixSubpageStyling(filePath, depth) {
    console.log(`Processing subpage: ${filePath} (depth: ${depth})`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const prefix = getRelativePrefix(depth);
    const cssPath = `${prefix}${masterCssFile}`;
    const injectTag = `<link rel="stylesheet" href="${cssPath}" data-master-css="true" />`;
    
    // Check if the master CSS is already injected
    if (content.includes('data-master-css="true"')) {
        console.log(`  -> Already injected, skipping.`);
        return;
    }
    
    // Inject right after the <head> tag
    const headIndex = content.indexOf('<head>');
    if (headIndex !== -1) {
        content = content.substring(0, headIndex + 6) + '\n  ' + injectTag + content.substring(headIndex + 6);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  -> Successfully injected Master CSS!`);
    } else {
        console.log(`  -> WARNING: No <head> tag found in ${filePath}`);
    }
}

console.log("=== MASTER STYLING REPAIR SYSTEM ===");
console.log("Locating and fixing all subpage styling paths...");
processDirectory(targetDir);
console.log("\n✅ ALL SUBPAGE STYLING REPAIRS COMPLETE!");
