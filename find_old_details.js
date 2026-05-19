const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'designflash.in', 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

let output = '';

// Search for 'HRBR Layout' or 'Ali Plaza' or 'Nehru Rd'
const regexAddress = /HRBR Layout|Ali Plaza|Nehru Rd|560084/gi;
let match;
while ((match = regexAddress.exec(content)) !== null) {
    output += `Found Address at index ${match.index}:\n`;
    output += content.substring(Math.max(0, match.index - 300), Math.min(content.length, match.index + 500));
    output += "\n------------------------------------------------------\n\n";
}

// Search for email addresses
const regexEmail = /[a-zA-Z0-9._%+-]+@designflash\.in/gi;
while ((match = regexEmail.exec(content)) !== null) {
    output += `Found Email at index ${match.index}:\n`;
    output += content.substring(Math.max(0, match.index - 100), Math.min(content.length, match.index + 200));
    output += "\n------------------------------------------------------\n\n";
}

// Search for phone numbers
const regexPhone = /\+91\s*\d{10}|\+9202542342/gi;
while ((match = regexPhone.exec(content)) !== null) {
    output += `Found Phone at index ${match.index}:\n`;
    output += content.substring(Math.max(0, match.index - 100), Math.min(content.length, match.index + 200));
    output += "\n------------------------------------------------------\n\n";
}

fs.writeFileSync(path.join(__dirname, 'extracted_address.txt'), output, 'utf8');
console.log("Done!");
