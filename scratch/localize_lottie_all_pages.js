const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Let's generate the new base64 script code programmatically
const originalJS = `(function(){let loaded=!1;function loadLottie(){if(loaded)return;loaded=!0;const script=document.createElement("script");script.type="module";script.src="/wp-content/uploads/lottie/dotlottie-player.mjs";document.body.appendChild(script);script.onload=()=>{const player=document.createElement("dotlottie-player");player.setAttribute("src","/wp-content/uploads/lottie/ZvCwextRST.lottie");player.setAttribute("background","transparent");player.setAttribute("speed","1");player.setAttribute("loop","");player.setAttribute("autoplay","");document.getElementById("lottie-container").appendChild(player)}}["scroll","click","mousemove","touchstart"].forEach(event=>{window.addEventListener(event,loadLottie,{once:!0})})})()`;

const newBase64 = Buffer.from(originalJS).toString('base64');
console.log(`Generated Base64 (length: ${newBase64.length}):`);
console.log(newBase64);

const originalBase64 = "KGZ1bmN0aW9uKCl7bGV0IGxvYWRlZD0hMTtmdW5jdGlvbiBsb2FkTG90dGllKCl7aWYobG9hZGVkKXJldHVybjtsb2FkZWQ9ITA7Y29uc3Qgc2NyaXB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO3NjcmlwdC50eXBlPSJtb2R1bGUiO3NjcmlwdC5zcmM9Imh0dHBzOi8vdW5wa2cuY29tL0Bkb3Rsb3R0aWUvcGxheWVyLWNvbXBvbmVudEAyLjcuMTIvZGlzdC9kb3Rsb3R0aWUtcGxheWVyLm1qcyI7ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO3NjcmlwdC5vbmxvYWQ9KCk9Pntjb25zdCBwbGF5ZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiZG90bG90dGllLXBsYXllciIpO3BsYXllci5zZXRBdHRyaWJ1dGUoInNyYyIsImh0dHBzOi8vbG90dGllLmhvc3QvZTY4NDlkYTktOTE1ZC00MzJjLTg5MGQtNGVmMGFiYjdmYmFkL1p2Q3dleHRSU1QubG90dGllIik7cGxheWVyLnNldEF0dHJpYnV0ZSgiYmFja2dyb3VuZCIsInRyYW5zcGFyZW50Iik7cGxheWVyLnNldEF0dHJpYnV0ZSgic3BlZWQiLCIxIik7cGxheWVyLnNldEF0dHJpYnV0ZSgibG9vcCIsIiIpO3BsYXllci5zZXRBdHRyaWJ1dGUoImF1dG9wbGF5IiwiIik7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImxvdHRpZS1jb250YWluZXIiKS5hcHBlbmRDaGlsZChwbGF5ZXIpfX1bInNjcm9sbCIsImNsaWNrIiwibW91c2Vtb3ZlIiwidG91Y2hzdGFydCJdLmZvckVhY2goZXZlbnQ9Pnt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudCxsb2FkTG90dGllLHtvbmNlOiEwfSl9KX0pKCk=";

// Pages we need to process
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

// Let's modify recreate_dedicated_section.js first
const recreateScriptPath = path.join(rootDir, 'recreate_dedicated_section.js');
if (fs.existsSync(recreateScriptPath)) {
  console.log(`\nLocalizing recreater script: ${recreateScriptPath}`);
  let content = fs.readFileSync(recreateScriptPath, 'utf8');
  content = content.replace(
    'src="https://lottie.host/e6849da9-915d-432c-890d-4ef0abb7fbad/ZvCwextRST.lottie"',
    'src="/wp-content/uploads/lottie/ZvCwextRST.lottie"'
  );
  content = content.replace(
    'player.setAttribute("src","https://lottie.host/e6849da9-915d-432c-890d-4ef0abb7fbad/ZvCwextRST.lottie")',
    'player.setAttribute("src","/wp-content/uploads/lottie/ZvCwextRST.lottie")'
  );
  content = content.replace(
    'script.src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"',
    'script.src="/wp-content/uploads/lottie/dotlottie-player.mjs"'
  );
  content = content.replace(originalBase64, newBase64);
  fs.writeFileSync(recreateScriptPath, content, 'utf8');
  console.log('-> SUCCESS!');
}

// Now modify the HTML pages
for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`\nLocalizing page: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace un-lazy player component
    let modified = false;
    
    if (content.includes('src="https://lottie.host/e6849da9-915d-432c-890d-4ef0abb7fbad/ZvCwextRST.lottie"')) {
      content = content.replace(
        'src="https://lottie.host/e6849da9-915d-432c-890d-4ef0abb7fbad/ZvCwextRST.lottie"',
        'src="/wp-content/uploads/lottie/ZvCwextRST.lottie"'
      );
      modified = true;
    }
    
    if (content.includes(originalBase64)) {
      content = content.replace(originalBase64, newBase64);
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('-> SUCCESS!');
    } else {
      console.log('-> Already localized or lottie tags not found.');
    }
  } else {
    console.log(`\nPage does not exist: ${filePath}`);
  }
}

console.log('\nAll pages updated successfully!');
