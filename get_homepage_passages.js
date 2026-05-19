const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'designflash.in', 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

console.log("=== HOMEPAGE SECTIONS, TITLES, & PASSAGES ===");

const cleanText = (str) => {
    if (!str) return '';
    return str.replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' ');
};

const sections = content.split('class="et_pb_section');
let sectionCount = 0;

sections.forEach((sectionHtml) => {
    // Find all tags of interest: h1, h2, h3, h4, p, span
    const tagRegex = /<(h1|h2|h3|h4|p|span)[^>]*>([\s\S]*?)<\/\1>/gi;
    let match;
    const items = [];
    
    while ((match = tagRegex.exec(sectionHtml)) !== null) {
        const tag = match[1].toUpperCase();
        const text = cleanText(match[2]);
        
        // Filter out layout strings, scripts, styles, etc.
        if (text.length > 20 && !text.includes('{') && !text.includes('var') && !text.includes('function') && !text.includes('rgba')) {
            items.push({ tag, text });
        }
    }
    
    if (items.length > 0) {
        sectionCount++;
        console.log(`\n========================================`);
        console.log(` SECTION ${sectionCount}`);
        console.log(`========================================`);
        
        items.forEach((item) => {
            if (item.tag.startsWith('H')) {
                console.log(`\n [${item.tag}] ${item.text}`);
            } else {
                console.log(`   -> "${item.text}"`);
            }
        });
    }
});
