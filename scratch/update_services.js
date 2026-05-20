const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  path.join(__dirname, '../designflash.in/index.html'),
  path.join(__dirname, '../designflash.in/website-designing-company-in-hyderabad/index.html'),
  path.join(__dirname, '../designflash.in/website-designing-company-in-mumbai/index.html')
];

// High-res local images mapping
const images = {
  weddingAlbumDesign: '/images/wedding3.jpg',
  preWeddingPhoto: '/images/wedding2.jpg',
  corporateVideo: '/images/videoediting4.jpg',
  commercialAdvertising: '/images/videoediting2.jpg',
  documentaryWedding: '/images/wedding4.jpg',
  graphicsDesign: '/wp-content/uploads/2024/10/Logo-Design.jpg.webp',
  videoEditing: '/images/videoediting1.jpg',
  photography: '/images/event3.jpg',
  socialMediaWork: '/wp-content/uploads/2024/10/Fb-insta-ads.jpg.webp'
};

// HTML representation of the three inner rows
const newRowsHtml = `<div class="et_pb_row_inner et_pb_row_inner_0 dct_blurb_row_1 et_pb_equal_columns et_pb_gutters2"><div class="et_pb_column et_pb_column_2_9 et_pb_with_border et_pb_column_inner et_pb_column_inner_0"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_0 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/wedding-album-designing-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="${images.weddingAlbumDesign}" alt="" srcset="${images.weddingAlbumDesign} 400w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368311 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description">Wedding Album Design</div></div></div></div></div><div class="et_pb_column et_pb_column_2_9 et_pb_with_border et_pb_column_inner et_pb_column_inner_1"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_1 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/pre-wedding-photo-editing-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="${images.preWeddingPhoto}" alt="" srcset="${images.preWeddingPhoto} 400w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368312 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Pre-Wedding Photo Editing</p></div></div></div></div></div><div class="et_pb_column et_pb_column_2_9 et_pb_with_border et_pb_column_inner et_pb_column_inner_2 et_clickable et-last-child"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_2 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/corporate-video-youtube-video-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="${images.corporateVideo}" alt="" srcset="${images.corporateVideo} 400w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368313 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Corporate Video | YouTube Video</p></div></div></div></div></div></div><div class="et_pb_row_inner et_pb_row_inner_1 et_pb_equal_columns et_pb_gutters2"><div class="et_pb_column et_pb_column_2_9 et_pb_with_border et_pb_column_inner et_pb_column_inner_3"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_3 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/commercial-advertising-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="${images.commercialAdvertising}" alt="" srcset="${images.commercialAdvertising} 400w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368314 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Commercial | Advertising</p></div></div></div></div></div><div class="et_pb_column et_pb_column_2_9 et_pb_with_border et_pb_column_inner et_pb_column_inner_4"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_4 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/documentary-wedding-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="${images.documentaryWedding}" alt="" srcset="${images.documentaryWedding} 400w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368315 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Documentary | Wedding</p></div></div></div></div></div><div class="et_pb_column et_pb_column_2_9 et_pb_with_border et_pb_column_inner et_pb_column_inner_5 et-last-child"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_5 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/graphics-design-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="${images.graphicsDesign}" alt="" srcset="${images.graphicsDesign} 400w, /wp-content/uploads/2024/10/Logo-Design-300x225.jpg.webp 300w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368316 et-animated"></span></a><div class="dct_badge" style="position: absolute; top: -10px; left: 10px; background: #00d26a; color: #fff; padding: 2px 8px; font-size: 11px; font-weight: bold; border-radius: 3px; z-index: 10;">Get 30% Off</div></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Graphics Design</p></div></div></div></div></div></div><div class="et_pb_row_inner et_pb_row_inner_2 et_pb_equal_columns et_pb_gutters2 et_pb_row_1-6_1-6_1-6"><div class="et_pb_column et_pb_column_1_6 et_pb_with_border et_pb_column_inner et_pb_column_inner_6"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_6 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/video-editing-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="${images.videoEditing}" alt="" srcset="${images.videoEditing} 400w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368317 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Video Editing</p></div></div></div></div></div><div class="et_pb_column et_pb_column_1_6 et_pb_with_border et_pb_column_inner et_pb_column_inner_7"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_7 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/photography-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="${images.photography}" alt="" srcset="${images.photography} 400w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368318 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Photography</p></div></div></div></div></div><div class="et_pb_column et_pb_column_1_6 et_pb_with_border et_pb_column_inner et_pb_column_inner_8 et-last-child"><div class="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_8 et_clickable  et_pb_text_align_left  et_pb_blurb_position_top et_pb_bg_layout_light"><div class="et_pb_blurb_content"><div class="et_pb_main_blurb_image"><a href="/social-media-work-services/"><span class="et_pb_image_wrap et_pb_only_image_mode_wrap"><img loading="lazy" decoding="async" width="400" height="300" src="${images.socialMediaWork}" alt="" srcset="${images.socialMediaWork} 400w, /wp-content/uploads/2024/10/Fb-insta-ads-300x225.jpg.webp 300w" sizes="(max-width: 400px) 100vw, 400px" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-368319 et-animated"></span></a></div><div class="et_pb_blurb_container"><div class="et_pb_blurb_description"><p>Social Media Work</p></div></div></div></div></div></div>`;

filesToUpdate.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  console.log(`Processing: ${filePath}`);

  // Find `#dct_intro_v4` section
  const sectionStart = content.indexOf('id="dct_intro_v4"');
  if (sectionStart === -1) {
    console.log('Could not find id="dct_intro_v4" in ' + filePath);
    return;
  }

  // Locate the specialty column inside `dct_intro_v4`
  const specialtyColStart = content.indexOf('et_pb_specialty_column', sectionStart);
  if (specialtyColStart === -1) {
    console.log('Could not find et_pb_specialty_column inside dct_intro_v4');
    return;
  }

  // Find the opening tag start index of specialty column
  const colOpeningTagStart = content.lastIndexOf('<div', specialtyColStart);
  if (colOpeningTagStart === -1) {
    console.log('Could not find specialty column opening tag start');
    return;
  }

  // Find where the specialty column's opening tag ends: `>`
  const colOpeningTagEnd = content.indexOf('>', specialtyColStart);
  if (colOpeningTagEnd === -1) {
    console.log('Could not find end of opening tag for specialty column');
    return;
  }

  // Count open and close divs from the specialty column opening tag to find its exact matching closing tag
  let openDivs = 1;
  let currentPos = colOpeningTagEnd + 1;
  let closingTagIndex = -1;
  
  while (currentPos < content.length && openDivs > 0) {
    const nextOpen = content.indexOf('<div', currentPos);
    const nextClose = content.indexOf('</div', currentPos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      openDivs++;
      currentPos = nextOpen + 4;
    } else {
      openDivs--;
      currentPos = nextClose + 6;
      if (openDivs === 0) {
        closingTagIndex = nextClose;
        break;
      }
    }
  }

  if (closingTagIndex !== -1) {
    const originalInnerHtml = content.substring(colOpeningTagEnd + 1, closingTagIndex);
    content = content.replace(originalInnerHtml, newRowsHtml);
    console.log('Successfully replaced inner specialty column content.');
  } else {
    console.log('Failed to identify closing tag of specialty column.');
    return;
  }

  // Update `et_link_options_data` URL values
  const linkDataStart = content.indexOf('var et_link_options_data=');
  if (linkDataStart !== -1) {
    const linkDataEnd = content.indexOf('</script>', linkDataStart);
    if (linkDataEnd !== -1) {
      let scriptBlock = content.substring(linkDataStart, linkDataEnd);
      
      // Perform replaces using exact split/join to avoid regex syntax compilation issues
      scriptBlock = scriptBlock.split('"url":"https:\\/\\/rajugfx.in\\/web-design-development-services\\/"').join('"url":"https:\\/\\/rajugfx.in\\/wedding-album-designing-services\\/"');
      scriptBlock = scriptBlock.split('"url":"https:\\/\\/rajugfx.in\\/search-engine-optimisation-seo-services\\/"').join('"url":"https:\\/\\/rajugfx.in\\/pre-wedding-photo-editing-services\\/"');
      scriptBlock = scriptBlock.split('"url":"https:\\/\\/rajugfx.in\\/facebook-instagram-ads-services\\/"').join('"url":"https:\\/\\/rajugfx.in\\/corporate-video-youtube-video-services\\/"');
      scriptBlock = scriptBlock.split('"url":"https:\\/\\/rajugfx.in\\/google-youtube-ads-services\\/"').join('"url":"https:\\/\\/rajugfx.in\\/commercial-advertising-services\\/"');
      scriptBlock = scriptBlock.split('"url":"https:\\/\\/rajugfx.in\\/video-reels-editing-services\\/"').join('"url":"https:\\/\\/rajugfx.in\\/documentary-wedding-services\\/"');
      scriptBlock = scriptBlock.split('"url":"https:\\/\\/rajugfx.in\\/package-designing-services\\/"').join('"url":"https:\\/\\/rajugfx.in\\/graphics-design-services\\/"');
      scriptBlock = scriptBlock.split('"url":"https:\\/\\/rajugfx.in\\/e-commerce-web-store-development\\/"').join('"url":"https:\\/\\/rajugfx.in\\/video-editing-services\\/"');
      scriptBlock = scriptBlock.split('"url":"https:\\/\\/rajugfx.in\\/logo-design-creative-design\\/https:\\/\\/rajugfx.in\\/logo-design-creative-design\\/"').join('"url":"https:\\/\\/rajugfx.in\\/photography-services\\/"');
      scriptBlock = scriptBlock.split('"url":"https:\\/\\/rajugfx.in\\/business-cards-letterheads-design\\/"').join('"url":"https:\\/\\/rajugfx.in\\/social-media-work-services\\/"');

      const originalScriptBlock = content.substring(linkDataStart, linkDataEnd);
      content = content.replace(originalScriptBlock, scriptBlock);
      console.log('Successfully updated et_link_options_data link paths.');
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved: ${filePath}\n`);
});
