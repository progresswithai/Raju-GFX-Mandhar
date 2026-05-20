const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'designflash.in', 'index.html');

if (!fs.existsSync(filePath)) {
    console.error("❌ Error: index.html does not exist!");
    process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
    { target: /\.ai-section\s*\{/g, replacement: '.ai-section, .gfx-section {' },
    { target: /\.ai-header\s*\{/g, replacement: '.ai-header, .gfx-header {' },
    { target: /\.ai-header h2\s*\{/g, replacement: '.ai-header h2, .gfx-header h2 {' },
    { target: /\.ai-header h2 span\s*\{/g, replacement: '.ai-header h2 span, .gfx-header h2 span {' },
    { target: /\.ai-header p\s*\{/g, replacement: '.ai-header p, .gfx-header p {' },
    { target: /\.ai-grid\s*\{/g, replacement: '.ai-grid, .gfx-grid {' },
    { target: /\.ai-card\s*\{/g, replacement: '.ai-card, .gfx-card {' },
    { target: /\.ai-card:hover\s*\{/g, replacement: '.ai-card:hover, .gfx-card:hover {' },
    { target: /\.ai-icon\s*\{/g, replacement: '.ai-icon, .gfx-icon {' },
    { target: /\.ai-icon i\s*\{/g, replacement: '.ai-icon i, .gfx-icon i {' },
    { target: /\.ai-card:hover \.ai-icon\s*\{/g, replacement: '.ai-card:hover .ai-icon, .gfx-card:hover .gfx-icon {' },
    { target: /\.ai-card:hover \.ai-icon i\s*\{/g, replacement: '.ai-card:hover .ai-icon i, .gfx-card:hover .gfx-icon i {' },
    { target: /\.ai-card h3\s*\{/g, replacement: '.ai-card h3, .gfx-card h3 {' },
    { target: /\.ai-card p\s*\{/g, replacement: '.ai-card p, .gfx-card p {' },
    { target: /\.ai-card a\s*\{/g, replacement: '.ai-card a, .gfx-card a {' },
    { target: /\.ai-card a:hover\s*\{/g, replacement: '.ai-card a:hover, .gfx-card a:hover {' }
];

console.log("Replacing styles in index.html...");

let replacedCount = 0;
replacements.forEach(({ target, replacement }) => {
    const originalLength = content.length;
    content = content.replace(target, replacement);
    if (content.length !== originalLength || content.includes(replacement)) {
        replacedCount++;
    }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`✅ Success! Style rules updated successfully. Replaced ${replacedCount} rules.`);
