const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const htmlFilePath = path.join(rootDir, 'designflash.in', 'index.html');

console.log("======================================================");
console.log("             SYSTEM INTEGRITY & STATUS CHECK");
console.log("======================================================");

if (!fs.existsSync(htmlFilePath)) {
    console.log("❌ ERROR: index.html does not exist!");
    process.exit(1);
}

const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
const isReplaced = htmlContent.includes('custom-portfolio-section');

if (isReplaced) {
    console.log("✅ HTML File: Successfully updated with custom portfolio section!");
} else {
    console.log("❌ HTML File: Still using the old, broken Divi section!");
}

console.log("\n--- Checking Image Assets ---");
const images = [
    // Portfolio
    { path: "wp-content/uploads/2025/01/RST.png.webp", desc: "RS Traders" },
    { path: "wp-content/uploads/2024/07/Group-378.png.webp", desc: "Skynet Automation" },
    // Services
    { path: "wp-content/uploads/2024/10/web-design-1.jpg.webp", desc: "Web Designing" },
    { path: "wp-content/uploads/2024/10/Branding.jpg.webp", desc: "Branding" },
    // Blog
    { path: "wp-content/uploads/2025/10/image1-400x250.webp", desc: "Blog AI Impact" },
    { path: "wp-content/uploads/2025/10/68590421-400x250.jpg.webp", desc: "Blog Social Media" }
];

let missingCount = 0;
images.forEach(img => {
    const fullPath = path.join(rootDir, 'designflash.in', img.path);
    const exists = fs.existsSync(fullPath);
    if (exists) {
        const size = fs.statSync(fullPath).size;
        if (size > 100) {
            console.log(`✅ [${img.desc}] Image exists! (${size} bytes)`);
        } else {
            console.log(`⚠️ [${img.desc}] Image file exists but is corrupted/empty (0 bytes)!`);
            missingCount++;
        }
    } else {
        console.log(`❌ [${img.desc}] Image is missing completely from local folder!`);
        missingCount++;
    }
});

if (missingCount === 0) {
    console.log("\n🎉 All check passes successfully! Everything is configured correctly.");
} else {
    console.log(`\n⚠️ Status: ${missingCount} images are missing or empty.`);
}
console.log("======================================================");
