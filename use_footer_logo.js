const fs = require('fs');
const path = require('path');

const htmlFilePath = path.join(__dirname, 'designflash.in', 'index.html');

function run() {
    if (!fs.existsSync(htmlFilePath)) {
        console.error("Error: index.html not found!");
        process.exit(1);
    }

    console.log("Reading index.html...");
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Locate the image tag with class wp-image-370061 (the footer logo)
    // We will search for any src inside class wp-image-370061 and replace it with the new path
    const footerLogoRegex = /<img\s+src="[^"]*"\s+[^>]*class="[^"]*wp-image-370061[^"]*"[^>]*>/i;
    
    // Let's do a wider search in case the tag was already modified to use logo.png
    const modifiedFooterLogoRegex = /<img\s+src="[^"]*"\s+[^>]*class="[^"]*wp-image-370061[^"]*"[^>]*>/i;

    const targetMatch = htmlContent.match(/class="[^"]*wp-image-370061[^"]*"/i);
    
    if (targetMatch) {
        console.log("Found the footer logo container! Replacing it with the correct logo.png path...");
        
        // Let's find the full <img> tag enclosing this class
        const classIndex = targetMatch.index;
        const tagStart = htmlContent.lastIndexOf('<img', classIndex);
        const tagEnd = htmlContent.indexOf('>', classIndex) + 1;
        
        if (tagStart !== -1 && tagEnd !== -1) {
            const originalTag = htmlContent.substring(tagStart, tagEnd);
            console.log("Original Tag:", originalTag);
            
            // Build the clean, beautiful new <img> tag pointing to the theme logo.png path
            const newTag = `<img src="wp-content/themes/Divi/includes/builder/styles/images/logo.png" decoding="async" loading="lazy" alt="Best Website Designing and Development Company" title="Best Website Designing and Development Company" class="wp-image-370061" style="max-height: 75px; width: auto;" />`;
            
            htmlContent = htmlContent.substring(0, tagStart) + newTag + htmlContent.substring(tagEnd);
            
            fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
            console.log("✅ SUCCESS: Footer logo updated to wp-content/themes/Divi/includes/builder/styles/images/logo.png!");
        } else {
            console.error("❌ ERROR: Could not parse the full image tag around the footer class!");
        }
    } else {
        console.error("❌ ERROR: Could not locate the footer logo tag (class wp-image-370061) inside index.html!");
    }
}

run();
