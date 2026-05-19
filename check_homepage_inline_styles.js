const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'designflash.in', 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

const headStart = content.indexOf('<head>');
const headEnd = content.indexOf('</head>');
const headContent = content.substring(headStart, headEnd);

console.log("=== SCANNING INLINE STYLE TAGS FOR FOOTER STYLES ===");
const styleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let count = 0;
while ((match = styleRegex.exec(headContent)) !== null) {
    if (match[1].includes('_tb_footer') || match[1].includes('et_pb_section_0_tb_footer')) {
        count++;
        console.log(`[${count}] Style tag containing footer styles found! Length: ${match[1].length}`);
        console.log("Snippet:", match[0].substring(0, 1000));
        
        // Save the style tag content
        fs.writeFileSync(path.join(__dirname, `footer_style_${count}.css`), match[1], 'utf8');
    }
}
