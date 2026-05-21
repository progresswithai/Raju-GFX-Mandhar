const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find the main-content wrapper
const mainContentIndex = content.indexOf('id="main-content"');
if (mainContentIndex === -1) {
  console.log("Could not find main-content!");
  process.exit(1);
}

console.log("Found 'id=\"main-content\"' at character index:", mainContentIndex);
console.log("Showing surrounding 2000 characters:\n");
console.log(content.substring(mainContentIndex, mainContentIndex + 2000));
