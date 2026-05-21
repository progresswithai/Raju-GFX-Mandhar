const fs = require('fs');
const path = require('path');
const https = require('https');

const playerUrl = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
const destDir = path.join(__dirname, '..', 'wp-content', 'uploads', 'lottie');
const destPath = path.join(destDir, 'dotlottie-player.mjs');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

console.log(`Downloading ${playerUrl} to ${destPath}...`);

const file = fs.createWriteStream(destPath);
https.get(playerUrl, (response) => {
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
