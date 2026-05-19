const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
if (!fs.existsSync(filePath)) {
  console.error("index.html not found!");
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');

// Find all divs or sections that look like major blocks
// Let's search for class="et_pb_section or id="...
const regex = /(<div\s+[^>]*class="[^"]*et_pb_section[^"]*"[^>]*>)/gi;
let match;
const sections = [];

// Also let's extract h1, h2, h3 within sections to understand what they are
const sectionRegex = /<div\s+[^>]*class="[^"]*et_pb_section[^"]*"[^>]*>([\s\S]*?)(?=<div\s+[^>]*class="[^"]*et_pb_section|$)/gi;

let index = 0;
while ((match = sectionRegex.exec(content)) !== null) {
  const fullTag = match[0].substring(0, 300);
  const sectionContent = match[1];
  
  // Find any headers in this section
  const hRegex = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi;
  const headers = [];
  let hMatch;
  while ((hMatch = hRegex.exec(sectionContent)) !== null) {
    headers.push(hMatch[1].replace(/<[^>]+>/g, '').trim());
  }

  sections.push({
    index: index++,
    tag: fullTag,
    headers: headers,
    length: sectionContent.length
  });
}

const reportPath = path.join(__dirname, 'homepage_sections.txt');
let report = "Homepage Sections Summary:\n==========================\n\n";
sections.forEach(s => {
  report += `Section #${s.index}\n`;
  report += `Tag: ${s.tag}\n`;
  report += `Headers: ${s.headers.join(' | ') || '(No headers)'}\n`;
  report += `Content Length: ${s.length} characters\n`;
  report += `--------------------------------------------------\n\n`;
});

fs.writeFileSync(reportPath, report, 'utf8');
console.log(`Saved section report to: ${reportPath}`);
