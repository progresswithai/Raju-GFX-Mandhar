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
        } else if (file === 'index.html') {
            refineHeaderLinks(fullPath, depth);
        }
    });
}

function refineHeaderLinks(filePath, depth) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const headerStart = content.indexOf('<header class="new-header">');
    if (headerStart === -1) {
        return; // Skip pages without the custom header
    }
    
    const headerEnd = content.indexOf('</header>', headerStart);
    if (headerEnd === -1) {
        console.warn(`Warning: Malformed header in ${filePath}`);
        return;
    }
    
    let headerBlock = content.substring(headerStart, headerEnd + 9);
    const prefix = getRelativePrefix(depth);
    
    // Define the new clean links with standard formatting matching the existing markup
    const cleanNavLinks = `<div class="nav-links">
                          <a href="${prefix}index.html">HOME</a>
                          <a href="${prefix}about/index.html">ABOUT</a>
                          <a href="${prefix}contact/index.html">CONTACT</a>
                          <a href="${prefix}service/index.html">SERVICE</a>
                          <a href="${prefix}portfolio/index.html">PORTFOLIO</a>
                      </div>`;
                      
    const cleanMobileMenu = `<div class="mobile-nav-menu" id="mobile-menu">
                          <a href="${prefix}index.html">HOME</a>
                          <a href="${prefix}about/index.html">ABOUT</a>
                          <a href="${prefix}contact/index.html">CONTACT</a>
                          <a href="${prefix}service/index.html">SERVICE</a>
                          <a href="${prefix}portfolio/index.html">PORTFOLIO</a>
                      </div>`;
                      
    // Replace <div class="nav-links">...</div>
    const navLinksStart = headerBlock.indexOf('<div class="nav-links">');
    const navLinksEnd = headerBlock.indexOf('</div>', navLinksStart);
    
    if (navLinksStart !== -1 && navLinksEnd !== -1) {
        const originalLinks = headerBlock.substring(navLinksStart, navLinksEnd + 6);
        headerBlock = headerBlock.replace(originalLinks, cleanNavLinks);
    } else {
        console.warn(`Warning: Could not find <div class="nav-links"> in ${filePath}`);
    }
    
    // Replace <div class="mobile-nav-menu" id="mobile-menu">...</div>
    const mobileMenuStart = headerBlock.indexOf('<div class="mobile-nav-menu" id="mobile-menu">');
    const mobileMenuStartAlt = mobileMenuStart !== -1 ? mobileMenuStart : headerBlock.indexOf('<div class="mobile-nav-menu"');
    
    if (mobileMenuStartAlt !== -1) {
        const mobileMenuEnd = headerBlock.indexOf('</div>', mobileMenuStartAlt);
        if (mobileMenuEnd !== -1) {
            const originalMobileLinks = headerBlock.substring(mobileMenuStartAlt, mobileMenuEnd + 6);
            headerBlock = headerBlock.replace(originalMobileLinks, cleanMobileMenu);
        } else {
            console.warn(`Warning: Could not find closing </div> for mobile menu in ${filePath}`);
        }
    } else {
        console.warn(`Warning: Could not find <div class="mobile-nav-menu"> in ${filePath}`);
    }
    
    // Write back the updated content
    const updatedContent = content.substring(0, headerStart) + headerBlock + content.substring(headerEnd + 9);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Successfully refined header links for: ${filePath}`);
}

console.log("=== HEADER LINKS REFINE SYSTEM ===");
processDirectory(targetDir);
console.log("✅ HEADER LINKS REFINE COMPLETED SUCCESSFULLY!");
