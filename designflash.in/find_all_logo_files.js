const fs = require('fs');
const path = require('path');

const baseDir = `E:\\Raju wesbite\\designflash.in\\wp-content\\uploads`;

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else {
      const lower = file.toLowerCase();
      if (lower.includes('logo') || lower.includes('df') || lower.includes('cropped')) {
        console.log(fullPath, stat.size, 'bytes');
      }
    }
  });
}

try {
  console.log('--- ALL LOGO ASSETS IN UPLOADS ---');
  walk(baseDir);
} catch (err) {
  console.error(err);
}
