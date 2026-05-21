const fs = require('fs');
const path = require('path');
const https = require('https');

const rootDir = __dirname;
const htmlFilePath = path.join(rootDir, 'index.html');

const elementHTML = `<div id="dct_intro_v4" class="et_pb_section et_pb_section_3 et_pb_equal_columns et_pb_with_background et_section_specialty"><div class="et_pb_row"><div class="et_pb_column et_pb_column_1_2 et_pb_column_3 et_pb_css_mix_blend_mode_passthrough et_pb_column_single"><div class="et_pb_module et_pb_text et_pb_text_3 dct_title_v3  et_pb_text_align_left et_pb_bg_layout_light"><div class="et_pb_text_inner"><h2>We are dedicated to support you</h2></div></div><div class="et_pb_module et_pb_code et_pb_code_0  et_pb_text_align_center"><div class="et_pb_code_inner"><div id="lottie-container"><dotlottie-player src="/wp-content/uploads/lottie/ZvCwextRST.lottie" background="transparent" speed="1" loop="" autoplay=""></dotlottie-player></div> <script src="data:text/javascript;base64,KGZ1bmN0aW9uKCl7bGV0IGxvYWRlZD0hMTtmdW5jdGlvbiBsb2FkTG90dGllKCl7aWYobG9hZGVkKXJldHVybjtsb2FkZWQ9ITA7Y29uc3Qgc2NyaXB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO3NjcmlwdC50eXBlPSJtb2R1bGUiO3NjcmlwdC5zcmM9Ii93cC1jb250ZW50L3VwbG9hZHMvbG90dGllL2RvdGxvdHRpZS1wbGF5ZXIubWpzIjtkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7c2NyaXB0Lm9ubG9hZD0oKT0+e2NvbnN0IHBsYXllcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJkb3Rsb3R0aWUtcGxheWVyIik7cGxheWVyLnNldEF0dHJpYnV0ZSgic3JjIiwiL3dwLWNvbnRlbnQvdXBsb2Fkcy9sb3R0aWUvWnZDd2V4dFJTVC5sb3R0aWUiKTtwbGF5ZXIuc2V0QXR0cmlidXRlKCJiYWNrZ3JvdW5kIiwidHJhbnNwYXJlbnQiKTtwbGF5ZXIuc2V0QXR0cmlidXRlKCJzcGVlZCIsIjEiKTtwbGF5ZXIuc2V0QXR0cmlidXRlKCJsb29wIiwiIik7cGxheWVyLnNldEF0dHJpYnV0ZSgiYXV0b3BsYXkiLCIiKTtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibG90dGllLWNvbnRhaW5lciIpLmFwcGVuZENoaWxkKHBsYXllcil9fVsic2Nyb2xsIiwiY2xpY2siLCJtb3VzZW1vdmUiLCJ0b3VjaHN0YXJ0Il0uZm9yRWFjaChldmVudD0+e3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LGxvYWRMb3R0aWUse29uY2U6ITB9KX0pfSkoKQ==" defer=""></script> </div></div></div><div class="et_pb_column et_pb_column_1_2 et_pb_column_4   et_pb_specialty_column  et_pb_css_mix_blend_mode_passthrough et-last-child"><div class="et_pb_row_inner et_pb_row_inner_0 dct_blurb_row_1 et_pb_equal_columns et_pb_gutters2"><div class="et_pb_column et_pb_column_2_9 et_pb_with_border et_pb_column_inner et_pb_column_inner_0"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_0 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/web-design-development-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="/wp-content/uploads/2024/10/Web-design-development.jpg.webp" alt="" srcset="/wp-content/uploads/2024/10/Web-design-development.jpg.webp 400w, /wp-content/uploads/2024/10/Web-design-development-300x225.jpg.webp 300w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368311 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description">Web Design &amp; Development</div></div></div></div></div><div class="et_pb_column et_pb_column_2_9 et_pb_with_border et_pb_column_inner et_pb_column_inner_1"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_1 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/search-engine-optimisation-seo-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="/wp-content/uploads/2024/10/Search-engine-Optimisation.jpg.webp" alt="" srcset="/wp-content/uploads/2024/10/Search-engine-Optimisation.jpg.webp 400w, /wp-content/uploads/2024/10/Search-engine-Optimisation-300x225.jpg.webp 300w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368312 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Search Engine Optimisation</p></div></div></div></div></div><div class="et_pb_column et_pb_column_2_9 et_pb_with_border et_pb_column_inner et_pb_column_inner_2 et_clickable et-last-child"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_2 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/facebook-instagram-ads-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="/wp-content/uploads/2024/10/Fb-insta-ads.jpg.webp" alt="" srcset="/wp-content/uploads/2024/10/Fb-insta-ads.jpg.webp 400w, /wp-content/uploads/2024/10/Fb-insta-ads-300x225.jpg.webp 300w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368313 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Facebook &amp; Instagram Ads</p></div></div></div></div></div></div><div class="et_pb_row_inner et_pb_row_inner_1 et_pb_equal_columns et_pb_gutters2"><div class="et_pb_column et_pb_column_2_9 et_pb_with_border et_pb_column_inner et_pb_column_inner_3"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_3 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/google-youtube-ads-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="/wp-content/uploads/2024/10/youtube-google-ads.jpg.webp" alt="" srcset="/wp-content/uploads/2024/10/youtube-google-ads.jpg.webp 400w, /wp-content/uploads/2024/10/youtube-google-ads-300x225.jpg.webp 300w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368314 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Google &amp; Youtube Ads</p></div></div></div></div></div><div class="et_pb_column et_pb_column_2_9 et_pb_with_border et_pb_column_inner et_pb_column_inner_4"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_4 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/video-reels-editing-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="/wp-content/uploads/2024/10/Video-editing.jpg.webp" alt="" srcset="/wp-content/uploads/2024/10/Video-editing.jpg.webp 400w, /wp-content/uploads/2024/10/Video-editing-300x225.jpg.webp 300w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368315 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Video &amp; Reels Editing</p></div></div></div></div></div><div class="et_pb_column et_pb_column_2_9 et_pb_with_border et_pb_column_inner et_pb_column_inner_5 et-last-child"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_5 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/package-designing-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="/wp-content/uploads/2024/10/Package-Designing.jpg.webp" alt="" srcset="/wp-content/uploads/2024/10/Package-Designing.jpg.webp 400w, /wp-content/uploads/2024/10/Package-Designing-300x225.jpg.webp 300w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368316 et-animated"></span></a><div class="dct_badge" style="position: absolute; top: -10px; left: 10px; background: #00d26a; color: #fff; padding: 2px 8px; font-size: 11px; font-weight: bold; border-radius: 3px; z-index: 10;">Get 30% Off</div></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Package Designing</p></div></div></div></div></div></div><div class="et_pb_row_inner et_pb_row_inner_2 et_pb_equal_columns et_pb_gutters2 et_pb_row_1-6_1-6_1-6"><div class="et_pb_column et_pb_column_1_6 et_pb_with_border et_pb_column_inner et_pb_column_inner_6"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_6 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/e-commerce-web-store-development/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="/wp-content/uploads/2024/10/Ecommerce.jpg.webp" alt="" srcset="/wp-content/uploads/2024/10/Ecommerce.jpg.webp 400w, /wp-content/uploads/2024/10/Ecommerce-300x225.jpg.webp 300w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368317 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>E-commerce Web Store</p></div></div></div></div></div><div class="et_pb_column et_pb_column_1_6 et_pb_with_border et_pb_column_inner et_pb_column_inner_7"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_7 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/logo-design-creative-design/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="/wp-content/uploads/2024/10/Logo-Design.jpg.webp" alt="" srcset="/wp-content/uploads/2024/10/Logo-Design.jpg.webp 400w, /wp-content/uploads/2024/10/Logo-Design-300x225.jpg.webp 300w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368318 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Logo Design &amp; Creative Design</p></div></div></div></div></div><div class="et_pb_column et_pb_column_1_6 et_pb_with_border et_pb_column_inner et_pb_column_inner_8 et-last-child"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_8 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/business-cards-letterheads-design/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="/wp-content/uploads/2024/10/Business-card.jpg.webp" alt="" srcset="/wp-content/uploads/2024/10/Business-card.jpg.webp 400w, /wp-content/uploads/2024/10/Business-card-300x225.jpg.webp 300w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368319 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Business Cards &amp; Letter Heads</p></div></div></div></div></div></div></div></div></div>`;

const imagesToDownload = [
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Web-design-development.jpg.webp', dest: 'wp-content/uploads/2024/10/Web-design-development.jpg.webp' },
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Web-design-development-300x225.jpg.webp', dest: 'wp-content/uploads/2024/10/Web-design-development-300x225.jpg.webp' },
  
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Search-engine-Optimisation.jpg.webp', dest: 'wp-content/uploads/2024/10/Search-engine-Optimisation.jpg.webp' },
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Search-engine-Optimisation-300x225.jpg.webp', dest: 'wp-content/uploads/2024/10/Search-engine-Optimisation-300x225.jpg.webp' },
  
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Fb-insta-ads.jpg.webp', dest: 'wp-content/uploads/2024/10/Fb-insta-ads.jpg.webp' },
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Fb-insta-ads-300x225.jpg.webp', dest: 'wp-content/uploads/2024/10/Fb-insta-ads-300x225.jpg.webp' },
  
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/youtube-google-ads.jpg.webp', dest: 'wp-content/uploads/2024/10/youtube-google-ads.jpg.webp' },
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/youtube-google-ads-300x225.jpg.webp', dest: 'wp-content/uploads/2024/10/youtube-google-ads-300x225.jpg.webp' },
  
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Video-editing.jpg.webp', dest: 'wp-content/uploads/2024/10/Video-editing.jpg.webp' },
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Video-editing-300x225.jpg.webp', dest: 'wp-content/uploads/2024/10/Video-editing-300x225.jpg.webp' },
  
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Package-Designing.jpg.webp', dest: 'wp-content/uploads/2024/10/Package-Designing.jpg.webp' },
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Package-Designing-300x225.jpg.webp', dest: 'wp-content/uploads/2024/10/Package-Designing-300x225.jpg.webp' },
  
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Ecommerce.jpg.webp', dest: 'wp-content/uploads/2024/10/Ecommerce.jpg.webp' },
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Ecommerce-300x225.jpg.webp', dest: 'wp-content/uploads/2024/10/Ecommerce-300x225.jpg.webp' },
  
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Logo-Design.jpg.webp', dest: 'wp-content/uploads/2024/10/Logo-Design.jpg.webp' },
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Logo-Design-300x225.jpg.webp', dest: 'wp-content/uploads/2024/10/Logo-Design-300x225.jpg.webp' },
  
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Business-card.jpg.webp', dest: 'wp-content/uploads/2024/10/Business-card.jpg.webp' },
  { url: 'https://rajugfx.in/wp-content/uploads/2024/10/Business-card-300x225.jpg.webp', dest: 'wp-content/uploads/2024/10/Business-card-300x225.jpg.webp' }
];

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

async function run() {
  if (!fs.existsSync(htmlFilePath)) {
    console.error("index.html not found!");
    process.exit(1);
  }

  let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

  // Let's check if dct_intro_v4 already exists
  if (htmlContent.includes('id="dct_intro_v4"') || htmlContent.includes('dct_intro_v4')) {
    console.log("Section id='dct_intro_v4' already exists! Replacing it to ensure fresh recreation...");
    // Let's replace the existing section starting with id="dct_intro_v4"
    const startIdx = htmlContent.indexOf('id="dct_intro_v4"');
    // Find the enclosing div. Because it's a section, we search backwards for '<div' and forwards for the matching end '</div>'
    // Let's do a more robust regex replace
    const regex = /<div[^>]*id="dct_intro_v4"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/i;
    // Wait, Divi specialties have standard closing structures: </div></div></div></div>
    // Let's find the section block
    const sectionBlockRegex = /<div[^>]*id="dct_intro_v4"[\s\S]*?<\/div>\s*(?=<!--\s*\.et_pb_section\s*-->|<\/div>\s*<div[^>]*class="[^"]*et_pb_section)/i;
    if (sectionBlockRegex.test(htmlContent)) {
      htmlContent = htmlContent.replace(sectionBlockRegex, elementHTML + '\n');
    } else {
      // Fallback simple replacement
      const simpleRegex = /<div[^>]*id="dct_intro_v4"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i;
      htmlContent = htmlContent.replace(simpleRegex, elementHTML + '\n');
    }
  } else {
    // It doesn't exist, let's insert it immediately after et_pb_section_2
    console.log("Section 'dct_intro_v4' does not exist. Inserting it after et_pb_section_2...");
    
    // We can search for class="et_pb_section et_pb_section_2" or similar
    const section2Regex = /(<div[^>]*class="[^"]*et_pb_section et_pb_section_2[^"]*"[\s\S]*?)(?=<!--\s*\.et_pb_section\s*-->|<\/div>\s*<div[^>]*class="[^"]*et_pb_section)/i;
    
    if (section2Regex.test(htmlContent)) {
      htmlContent = htmlContent.replace(section2Regex, (match) => {
        return match + '\n\n' + elementHTML + '\n';
      });
    } else {
      // Try class="et_pb_section et_pb_section_1"
      console.log("et_pb_section_2 not found. Trying et_pb_section_1...");
      const section1Regex = /(<div[^>]*class="[^"]*et_pb_section et_pb_section_1[^"]*"[\s\S]*?)(?=<!--\s*\.et_pb_section\s*-->|<\/div>\s*<div[^>]*class="[^"]*et_pb_section)/i;
      if (section1Regex.test(htmlContent)) {
        htmlContent = htmlContent.replace(section1Regex, (match) => {
          return match + '\n\n' + elementHTML + '\n';
        });
      } else {
        // Fallback: search for first et_pb_section and put it after it
        console.log("et_pb_section_1 not found. Putting it after the first section...");
        const firstSectionRegex = /(<div[^>]*class="[^"]*et_pb_section[^"]*"[\s\S]*?)(?=<!--\s*\.et_pb_section\s*-->|<\/div>\s*<div[^>]*class="[^"]*et_pb_section)/i;
        htmlContent = htmlContent.replace(firstSectionRegex, (match) => {
          return match + '\n\n' + elementHTML + '\n';
        });
      }
    }
  }

  // Save the updated html
  fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
  console.log("Successfully recreated and updated index.html!");

  // Now, download all the required images
  console.log("\nDownloading service card images...");
  for (const img of imagesToDownload) {
    const localPath = path.join(rootDir, img.dest);
    console.log(`Downloading ${img.url} -> ${img.dest}...`);
    try {
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath); // delete existing/corrupt
      }
      await downloadFile(img.url, localPath);
      console.log(`  -> SUCCESS!`);
    } catch (e) {
      console.log(`  -> FAILED: ${e.message}`);
    }
  }

  console.log("\nRecreation and restoration process complete!");
}

run();
