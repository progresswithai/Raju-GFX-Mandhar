const fs = require('fs');
const path = require('path');

const aboutHtmlPath = path.join(__dirname, 'designflash.in', 'about', 'index.html');
const content = fs.readFileSync(aboutHtmlPath, 'utf8');

// Find the <head> block and print the first 1500 characters inside it
const headStart = content.indexOf('<head>');
const headEnd = content.indexOf('</head>');

if (headStart !== -1 && headEnd !== -1) {
    console.log("=== HEAD CONTENT ===");
    console.log(content.substring(headStart, headStart + 3500));
} else {
    console.log("No <head> block found! Printing first 2000 chars:");
    console.log(content.substring(0, 2000));
}
