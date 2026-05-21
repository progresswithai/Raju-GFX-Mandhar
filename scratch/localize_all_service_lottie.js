const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const htmlFiles = [
  'best-digital-marketing-services-company-in-bangalore-india/index.html',
  'best-ui-ux-design-company-in-bangalore-india/index.html',
  'digital-marketing-and-advertising-agency/index.html',
  'ecommerce-seo-services-company-in-bangalore/index.html',
  'graphic-designing-company/index.html',
  'index.html',
  'logo-design-services-in-bangalore/index.html',
  'orm-services-company-in-bangalore/index.html',
  'seo-services-in-bangalore/index.html',
  'smo-services-company-in-bangalore/index.html',
  'social-media-marketing-agency/index.html',
  'website-designing-and-development-company/index.html',
  'website-designing-company-in-hyderabad/index.html',
  'website-designing-company-in-mumbai/index.html'
];

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`\nProcessing page: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace player CDN URL
    if (content.includes('src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"')) {
      content = content.replace(
        'src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"',
        'src="/wp-content/uploads/lottie/dotlottie-player.mjs"'
      );
      modified = true;
    }
    
    // Replace json CDN URL
    if (content.includes('src="https://lottie.host/943e8f24-3ebc-41b2-88e7-d7673cf474ae/PWFFiFb377.json"')) {
      content = content.replace(
        'src="https://lottie.host/943e8f24-3ebc-41b2-88e7-d7673cf474ae/PWFFiFb377.json"',
        'src="/wp-content/uploads/lottie/PWFFiFb377.json"'
      );
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('-> SUCCESS!');
    } else {
      console.log('-> No replacements needed.');
    }
  } else {
    console.log(`\nPage does not exist: ${filePath}`);
  }
}

console.log('\nAll service page lottie references localized successfully!');
