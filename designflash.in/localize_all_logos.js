const fs = require('fs');
const path = require('path');

const rootDir = `E:\\Raju wesbite\\designflash.in`;

// Helper to calculate relative prefix based on depth of the file
function getRelativePrefix(filePath) {
  const relativePath = path.relative(rootDir, filePath);
  const depth = relativePath.split(path.sep).length - 1;
  if (depth <= 0) return '';
  return '../'.repeat(depth);
}

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  const prefix = getRelativePrefix(filePath);
  
  // Define our new local logo source paths
  const localBlackLogo = `${prefix}wp-content/uploads/2025/04/Logo-black-500_250.webp`;
  const localWhiteLogo = `${prefix}wp-content/uploads/2025/04/Logo-black-500_250.webp`; // use black logo for consistent styling if white isn't supplied, or use same new logo

  // Regular expression to find any <img> tags with Logo-black or Logo-white
  // We want to replace their src with local relative path and REMOVE srcset/sizes so the browser is forced to load the local file.
  const imgRegex = /<img([^>]+)>/g;

  content = content.replace(imgRegex, (match, attributes) => {
    // Check if this img tag is a logo
    const hasLogo = attributes.toLowerCase().includes('logo-black') || 
                    attributes.toLowerCase().includes('logo-white') || 
                    attributes.toLowerCase().includes('cropped-df') ||
                    attributes.includes('wp-image-371096');

    if (hasLogo) {
      modified = true;
      
      // Determine if it was a white logo or black logo
      const isWhite = attributes.toLowerCase().includes('logo-white');
      const targetSrc = isWhite ? localWhiteLogo : localBlackLogo;

      // Reconstruct attributes: remove existing src, srcset, and sizes
      let cleanAttrs = attributes
        .replace(/\bsrc=["']([^"']+)["']/gi, '')
        .replace(/\bsrcset=["']([^"']+)["']/gi, '')
        .replace(/\bsizes=["']([^"']+)["']/gi, '')
        .replace(/\bdecode=["']([^"']+)["']/gi, '')
        .replace(/\bdecoding=["']([^"']+)["']/gi, '');

      // Add clean local src and decoding options
      return `<img src="${targetSrc}" decoding="async"${cleanAttrs}>`;
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Localised logo in: ${filePath}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip cache and logs
      if (file !== 'wp-content/cache' && file !== 'et-cache' && file !== 'litespeed') {
        walk(fullPath);
      }
    } else if (file.endsWith('.html')) {
      processHtmlFile(fullPath);
    }
  });
}

try {
  console.log('Localising all logo image tags in HTML pages website-wide...');
  walk(rootDir);
  console.log('\nWebsite-wide logo HTML localisation complete!');
} catch (err) {
  console.error('Error localising logos in HTML files:', err);
}
