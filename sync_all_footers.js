const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'designflash.in');
const homepagePath = path.join(targetDir, 'index.html');

function extractHomepageFooter() {
    if (!fs.existsSync(homepagePath)) {
        console.error("Error: Homepage index.html not found!");
        process.exit(1);
    }
    
    const content = fs.readFileSync(homepagePath, 'utf8');
    const footerStart = content.indexOf('<footer class="et-l et-l--footer">');
    const footerEnd = content.indexOf('</footer>', footerStart);
    
    if (footerStart === -1 || footerEnd === -1) {
        console.error("Error: Could not locate the footer block on the homepage!");
        process.exit(1);
    }
    
    return content.substring(footerStart, footerEnd + 9);
}

function getRelativePrefix(depth) {
    return '../'.repeat(depth);
}

function adjustFooterPaths(footerHtml, depth) {
    if (depth === 0) return footerHtml;
    const prefix = getRelativePrefix(depth);
    
    let adjusted = footerHtml;
    
    // Adjust all local file paths in the footer to match the subfolder depth
    adjusted = adjusted.replace(/(src|href)="wp-content\//gi, `$1="${prefix}wp-content/`);
    adjusted = adjusted.replace(/href="index\.html/gi, `href="${prefix}index.html`);
    adjusted = adjusted.replace(/href="about\//gi, `href="${prefix}about/`);
    adjusted = adjusted.replace(/href="contact\//gi, `href="${prefix}contact/`);
    adjusted = adjusted.replace(/href="portfolio\//gi, `href="${prefix}portfolio/`);
    adjusted = adjusted.replace(/href="digital-marketing-blog\//gi, `href="${prefix}digital-marketing-blog/`);
    adjusted = adjusted.replace(/href="digital-marketing-services-company-in-mandhar,\s*raipur\//gi, `href="${prefix}digital-marketing-services-company-in-mandhar, raipur/`);
    
    return adjusted;
}

function processDirectory(dir, homepageFooterHTML, depth = 0) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (file === 'wp-content' || file === 'wp-includes' || file === 'wp-json' || file === '_https_') {
                return;
            }
            processDirectory(fullPath, homepageFooterHTML, depth + 1);
        } else if (file === 'index.html' && depth > 0) {
            // This is a subpage index.html
            syncFooterForSubpage(fullPath, homepageFooterHTML, depth);
        }
    });
}

function syncFooterForSubpage(filePath, homepageFooterHTML, depth) {
    console.log(`Syncing footer for: ${filePath} (depth: ${depth})`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the subpage's current footer block
    const footerStart = content.indexOf('<footer');
    const footerEnd = content.indexOf('</footer>', footerStart);
    
    if (footerStart !== -1 && footerEnd !== -1) {
        const adjustedFooter = adjustFooterPaths(homepageFooterHTML, depth);
        
        content = content.substring(0, footerStart) + adjustedFooter + content.substring(footerEnd + 9);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  -> Successfully synced and path-adjusted the footer!`);
    } else {
        console.log(`  -> WARNING: No <footer> tag found, skipping.`);
    }
}

function run() {
    console.log("=== FOOTER SYNCHRONIZATION SYSTEM ===");
    console.log("Extracting customized footer from homepage...");
    const homepageFooter = extractHomepageFooter();
    console.log(`Homepage footer extracted successfully (${homepageFooter.length} characters).`);
    
    console.log("\nCloning and adapting footer across all subpages recursively...");
    processDirectory(targetDir, homepageFooter);
    console.log("\n✅ ALL SUBPAGE FOOTERS SYNCED PERFECTLY!");
}

run();
