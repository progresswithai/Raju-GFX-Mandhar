const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'designflash.in');

function processDirectory(dir, results = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (file === 'wp-content' || file === 'wp-includes' || file === 'wp-json' || file === '_https_') {
                return;
            }
            processDirectory(fullPath, results);
        } else if (file === 'index.html') {
            const content = fs.readFileSync(fullPath, 'utf8');
            const headerStart = content.indexOf('<header class="new-header">');
            if (headerStart !== -1) {
                const headerEnd = content.indexOf('</header>', headerStart);
                if (headerEnd !== -1) {
                    const headerBlock = content.substring(headerStart, headerEnd + 9);
                    
                    const navStart = headerBlock.indexOf('<nav class="navbar">');
                    const navEnd = headerBlock.indexOf('</nav>', navStart);
                    
                    if (navStart !== -1 && navEnd !== -1) {
                        const navBlock = headerBlock.substring(navStart, navEnd + 6);
                        const hasHamburger = navBlock.includes('hamburger-menu') || navBlock.includes('hamburger-btn');
                        const hasMobileMenu = navBlock.includes('mobile-nav-menu');
                        results.push({
                            file: fullPath.replace(__dirname, ''),
                            hasHamburger,
                            hasMobileMenu
                        });
                    } else {
                        results.push({
                            file: fullPath.replace(__dirname, ''),
                            error: 'Missing <nav class="navbar">'
                        });
                    }
                } else {
                    results.push({
                        file: fullPath.replace(__dirname, ''),
                        error: 'Malformed <header class="new-header">'
                    });
                }
            }
        }
    });
    return results;
}

const navbarStatuses = processDirectory(targetDir);
console.log("Navbar check results (precise):");
let missingCount = 0;
navbarStatuses.forEach(status => {
    if (status.error) {
        console.log(`❌ ${status.file} - Error: ${status.error}`);
        missingCount++;
    } else if (!status.hasHamburger || !status.hasMobileMenu) {
        console.log(`❌ ${status.file} - Hamburger: ${status.hasHamburger}, MobileMenu: ${status.hasMobileMenu}`);
        missingCount++;
    } else {
        console.log(`✅ ${status.file}`);
    }
});
console.log(`\nTotal pages missing elements: ${missingCount}`);
