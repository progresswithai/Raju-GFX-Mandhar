const fs = require('fs');
const path = require('path');
const https = require('https');

const url = 'https://designflash.in/';

console.log("Fetching live homepage from designflash.in to inspect REVIEWS US ON section...");

https.get(url, (response) => {
  let data = '';
  response.on('data', (chunk) => {
    data += chunk;
  });
  response.on('end', () => {
    console.log("Successfully fetched live homepage!");
    const index = data.toUpperCase().indexOf('REVIEWS US ON');
    if (index === -1) {
      console.log("Could not find 'REVIEWS US ON' on live site!");
      return;
    }
    
    // Find the enclosing section or surrounding elements
    // Let's grab 4000 characters around this text
    const context = data.substring(index - 500, index + 3500);
    fs.writeFileSync(path.join(__dirname, 'live_reviews_html.txt'), context, 'utf8');
    console.log("Saved live reviews section to: live_reviews_html.txt");
    console.log("\n--- SNEAK PEEK ---");
    console.log(context.substring(0, 1500));
  });
}).on('error', (err) => {
  console.error("Error fetching live page:", err.message);
});
