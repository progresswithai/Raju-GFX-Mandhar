const fs = require('fs');
const path = require('path');
const https = require('https');

const lottieUrl = 'https://lottie.host/e6849da9-915d-432c-890d-4ef0abb7fbad/ZvCwextRST.lottie';
const destDir = path.join(__dirname, '..', 'wp-content', 'uploads', 'lottie');
const destPath = path.join(destDir, 'ZvCwextRST.lottie');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

console.log(`Downloading ${lottieUrl} to ${destPath}...`);

const file = fs.createWriteStream(destPath);
https.get(lottieUrl, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download: Status code ${response.statusCode}`);
    file.close();
    fs.unlinkSync(destPath);
    return;
  }
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download complete successfully!');
    const stats = fs.statSync(destPath);
    console.log(`File size: ${stats.size} bytes`);
  });
}).on('error', (err) => {
  console.error(`Error: ${err.message}`);
  file.close();
  if (fs.existsSync(destPath)) {
    fs.unlinkSync(destPath);
  }
});
