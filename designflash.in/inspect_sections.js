const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

// Match all Divi sections on the homepage
const sectionRegex = /<div\s+[^>]*class="[^"]*et_pb_section[^"]*"[^>]*>/gi;
let match;
let count = 0;

console.log("Listing all et_pb_section elements on the homepage:");
console.log("==================================================");

while ((match = sectionRegex.exec(content)) !== null) {
  const fullTag = match[0];
  const charIndex = match.index;
  // Get surrounding text
  const surrounding = content.substring(charIndex, charIndex + 500);
  
  // Extract ID if any
  const idMatch = /id="([^"]*)"/i.exec(fullTag);
  const id = idMatch ? idMatch[1] : "(No ID)";
  
  // Extract class list
  const classMatch = /class="([^"]*)"/i.exec(fullTag);
  const classes = classMatch ? classMatch[1] : "";
  
  // Try to find the first H2/H3 header in the next 1000 characters
  const nextContent = content.substring(charIndex, charIndex + 2000);
  const headerMatch = /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi.exec(nextContent);
  const headerText = headerMatch ? headerMatch[1].replace(/<[^>]+>/g, '').trim() : "(No header)";

  console.log(`\nSection #${count++} (character index: ${charIndex})`);
  console.log(`- ID: ${id}`);
  console.log(`- Classes: ${classes}`);
  console.log(`- First Header Found: "${headerText}"`);
}
