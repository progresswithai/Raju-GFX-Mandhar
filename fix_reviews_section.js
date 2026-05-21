const fs = require('fs');
const path = require('path');
const https = require('https');

const rootDir = __dirname;
const localHtmlPath = path.join(rootDir, 'index.html');
const liveUrl = 'https://rajugfx.in/';

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        file.close(() => {
          fs.unlink(destPath, () => {});
          reject(new Error(`Status ${response.statusCode}`));
        });
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    }).on('error', (err) => {
      file.close(() => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    });
  });
}

function fetchLivePage() {
  return new Promise((resolve, reject) => {
    https.get(liveUrl, (res) => {
      let html = '';
      res.on('data', chunk => { html += chunk; });
      res.on('end', () => resolve(html));
    }).on('error', reject);
  });
}

async function run() {
  try {
    console.log("Fetching live homepage to extract the 'REVIEWS US ON' section...");
    const liveHtml = await fetchLivePage();
    
    // Find the 'REVIEWS US ON' text
    const searchStr = 'REVIEWS US ON';
    const reviewsIndex = liveHtml.toUpperCase().indexOf(searchStr);
    
    if (reviewsIndex === -1) {
      console.error("Could not find 'REVIEWS US ON' section on live site!");
      return;
    }
    
    // Find the start of the surrounding section (<div class="et_pb_section...)
    // We backtrack from reviewsIndex to find the nearest preceding <div[^>]*class="[^"]*et_pb_section
    const precedingHtml = liveHtml.substring(0, reviewsIndex);
    const sectionStartMatches = [...precedingHtml.matchAll(/<div[^>]*class="[^"]*et_pb_section/gi)];
    if (sectionStartMatches.length === 0) {
      console.error("Could not find start of reviews section!");
      return;
    }
    const sectionStartIdx = sectionStartMatches[sectionStartMatches.length - 1].index;
    
    // Find the end of the section (the start of the next et_pb_section)
    const succeedingHtml = liveHtml.substring(sectionStartIdx + 30);
    const nextSectionMatch = /<div[^>]*class="[^"]*et_pb_section/gi.exec(succeedingHtml);
    if (!nextSectionMatch) {
      console.error("Could not find start of the next section!");
      return;
    }
    const sectionEndIdx = sectionStartIdx + 30 + nextSectionMatch.index;
    
    // Extract the live section HTML
    let liveSectionHTML = liveHtml.substring(sectionStartIdx, sectionEndIdx);
    console.log("Successfully extracted live section HTML!");

    // Let's replace absolute URLs with relative local paths
    liveSectionHTML = liveSectionHTML.replace(/https:\/\/designflash.in\/wp-content/gi, '/wp-content');
    liveSectionHTML = liveSectionHTML.replace(/https:\/\/designflash.in\//gi, '/');
    liveSectionHTML = liveSectionHTML.replace(/\/\/designflash.in\/wp-content/gi, '/wp-content');

    // Read local index.html
    if (!fs.existsSync(localHtmlPath)) {
      console.error("Local index.html not found!");
      return;
    }
    let localHtml = fs.readFileSync(localHtmlPath, 'utf8');

    // Find the local reviews section to replace
    const localReviewsIndex = localHtml.toUpperCase().indexOf(searchStr);
    if (localReviewsIndex === -1) {
      console.error("Could not find 'REVIEWS US ON' section in local index.html!");
      return;
    }

    const localPreceding = localHtml.substring(0, localReviewsIndex);
    const localStartMatches = [...localPreceding.matchAll(/<div[^>]*class="[^"]*et_pb_section/gi)];
    if (localStartMatches.length === 0) {
      console.error("Could not find start of local reviews section!");
      return;
    }
    const localStartIdx = localStartMatches[localStartMatches.length - 1].index;

    const localSucceeding = localHtml.substring(localStartIdx + 30);
    const localNextSectionMatch = /<div[^>]*class="[^"]*et_pb_section/gi.exec(localSucceeding);
    if (!localNextSectionMatch) {
      console.error("Could not find end of local reviews section!");
      return;
    }
    const localEndIdx = localStartIdx + 30 + localNextSectionMatch.index;

    // Replace the local section with the live section
    const newLocalHtml = localHtml.substring(0, localStartIdx) + liveSectionHTML + localHtml.substring(localEndIdx);
    fs.writeFileSync(localHtmlPath, newLocalHtml, 'utf8');
    console.log("Successfully replaced the local reviews section in index.html!");

    // Scan the live section for all images to download them locally
    const imgRegex = /src=["']\/wp-content\/uploads\/([^"']+)["']/gi;
    let match;
    const imagesToDownload = new Set();
    while ((match = imgRegex.exec(liveSectionHTML)) !== null) {
      imagesToDownload.add(match[1]);
    }

    const srcsetRegex = /srcset=["']([^"']+)["']/gi;
    while ((match = srcsetRegex.exec(liveSectionHTML)) !== null) {
      const parts = match[1].split(',');
      for (const part of parts) {
        const cleanUrl = part.trim().split(' ')[0];
        if (cleanUrl.startsWith('/wp-content/uploads/')) {
          imagesToDownload.add(cleanUrl.replace('/wp-content/uploads/', ''));
        }
      }
    }

    console.log(`\nFound ${imagesToDownload.size} images to download for the reviews section:`);
    for (const imgSubPath of imagesToDownload) {
      const cleanSubPath = imgSubPath.split('?')[0];
      const liveImgUrl = `https://rajugfx.in/wp-content/uploads/${cleanSubPath}`;
      const destPath = path.join(rootDir, 'wp-content/uploads', cleanSubPath);
      
      console.log(`Downloading ${liveImgUrl} -> wp-content/uploads/${cleanSubPath}...`);
      try {
        if (fs.existsSync(destPath)) {
          fs.unlinkSync(destPath);
        }
        await downloadFile(liveImgUrl, destPath);
        console.log("  -> SUCCESS!");
      } catch (err) {
        console.log(`  -> FAILED: ${err.message}`);
      }
    }

    console.log("\nReviews section successfully fixed, populated with live HTML, and all local assets downloaded!");

  } catch (err) {
    console.error("Error running fix script:", err.message);
  }
}

run();
