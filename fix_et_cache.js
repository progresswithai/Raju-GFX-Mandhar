const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'designflash.in');

function getRelativePrefix(depth) {
    return '../'.repeat(depth);
}

function processDirectory(dir, depth = 0) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (file === 'wp-content' || file === 'wp-includes' || file === 'wp-json' || file === '_https_') {
                return;
            }
            processDirectory(fullPath, depth + 1);
        } else if (file === 'index.html' && depth > 0) {
            fixPageCache(fullPath, depth);
        }
    });
}

function fixPageCache(filePath, depth) {
    console.log(`Fixing cache for: ${filePath} (depth: ${depth})`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const prefix = getRelativePrefix(depth);
    
    // We want to replace any wp-content/et-cache/XX/... with the homepage cache folder 719
    // Homepage late CSS: wp-content/et-cache/719/et-divi-dynamic-tb-369223-tb-368283-719-late.css
    // Homepage main CSS: wp-content/et-cache/719/et-divi-dynamic-tb-369223-tb-368283-719.css
    
    const regexLate = /wp-content\/et-cache\/\d+\/et-divi-dynamic-tb-369223-tb-368283-\d+-late\.css/gi;
    const regexMain = /wp-content\/et-cache\/\d+\/et-divi-dynamic-tb-369223-tb-368283-\d+\.css/gi;
    
    const newLate = `${prefix}wp-content/et-cache/719/et-divi-dynamic-tb-369223-tb-368283-719-late.css`;
    const newMain = `${prefix}wp-content/et-cache/719/et-divi-dynamic-tb-369223-tb-368283-719.css`;
    
    let modified = false;
    
    if (regexLate.test(content)) {
        content = content.replace(regexLate, newLate);
        modified = true;
    }
    if (regexMain.test(content)) {
        content = content.replace(regexMain, newMain);
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  -> Successfully updated to use the homepage Divi cache!`);
    } else {
        console.log(`  -> No et-cache tags found.`);
    }
}

console.log("=== DIVI CACHE ALIGNMENT SYSTEM ===");
console.log("Aligning all subpage Divi CSS caches to match the homepage cache...");
processDirectory(targetDir);
console.log("\n✅ ALL SUBPAGES SUCCESSFULLY ALIGNED WITH HOMEPAGE CACHE!");
