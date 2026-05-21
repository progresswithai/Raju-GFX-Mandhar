const fs = require('fs');
const path = require('path');

const filePath = 'E:\\Raju wesbite\\designflash.in\\index.html';

try {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log('Homepage File Size:', content.length, 'bytes');

  // Find all image sources
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
  let match;
  console.log('\n--- IMG Tags found: ---');
  while ((match = imgRegex.exec(content)) !== null) {
    if (match[1].toLowerCase().includes('logo') || match[1].toLowerCase().includes('df') || match[1].toLowerCase().includes('uploads')) {
      console.log(match[0]);
    }
  }

  // Find any logo/Logo mentions in the file
  console.log('\n--- Mentions of Logo in paths: ---');
  const pathRegex = /[\w-\/]+\.(png|jpg|jpeg|gif|svg|webp)/gi;
  const matches = content.match(pathRegex) || [];
  const uniquePaths = [...new Set(matches)];
  uniquePaths.forEach(p => {
    if (p.toLowerCase().includes('logo') || p.toLowerCase().includes('cropped') || p.toLowerCase().includes('df-')) {
      console.log(p);
    }
  });

} catch (err) {
  console.error('Error reading index.html:', err);
}
