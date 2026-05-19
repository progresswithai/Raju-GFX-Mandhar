
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find the index of REVIEWS US ON
const index = content.toUpperCase().indexOf('REVIEWS US ON');
if (index === -1) {
  console.log("Could not find 'REVIEWS US ON' inside index.html!");
  process.exit(0);
}

console.log("Found 'REVIEWS US ON' at char index:", index);
console.log("==========================================");
// Print the surrounding 3000 characters
console.log(content.substring(index - 500, index + 3500));
