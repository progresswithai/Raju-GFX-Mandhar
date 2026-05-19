const fs = require('fs');
const path = require('path');

const htmlFilePath = path.join(__dirname, 'designflash.in', 'index.html');

function run() {
    if (!fs.existsSync(htmlFilePath)) {
        console.error("Error: designflash.in/index.html not found!");
        process.exit(1);
    }

    console.log("Reading index.html...");
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Locate the exact image tag with class wp-image-370061
    const footerLogoRegex = /<img\s+src="wp-content\/uploads\/2025\/04\/Logo-black-500_250\.webp"\s+decoding="async"\s+loading="lazy"\s+width="1365"\s+height="632"[^>]*class="[^"]*wp-image-370061[^"]*"[^>]*>/i;
    
    if (footerLogoRegex.test(htmlContent)) {
        console.log("Found the exact footer logo tag! Replacing it with logo.png...");
        
        // Replace with the new local logo.png path
        // We also add inline styling max-height: 80px to keep it sleek and beautifully aligned in the footer
        const replacement = `<img src="wp-content/uploads/2025/04/logo.png" decoding="async" loading="lazy" alt="Best Website Designing and Development Company" title="Best Website Designing and Development Company" class="wp-image-370061" style="max-height: 70px; width: auto;" />`;
        
        htmlContent = htmlContent.replace(footerLogoRegex, replacement);
        
        fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
        console.log("✅ SUCCESS: Footer logo replaced successfully!");
    } else {
        // Fallback: search for just the src inside the class wp-image-370061
        const fallbackRegex = /src="wp-content\/uploads\/2025\/04\/Logo-black-500_250\.webp"\s+([^>]*class="[^"]*wp-image-370061[^"]*")/gi;
        
        if (fallbackRegex.test(htmlContent)) {
            console.log("Found footer logo via fallback regex! Replacing...");
            htmlContent = htmlContent.replace(fallbackRegex, 'src="wp-content/uploads/2025/04/logo.png" style="max-height: 70px; width: auto;" $1');
            fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
            console.log("✅ SUCCESS: Footer logo replaced successfully via fallback!");
        } else {
            console.error("❌ ERROR: Could not locate the footer logo tag inside index.html!");
            process.exit(1);
        }
    }
}

run();
