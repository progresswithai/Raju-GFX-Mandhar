const fs = require('fs');
const path = require('path');

const aboutPagePath = path.join(__dirname, '../designflash.in/about/index.html');

if (!fs.existsSync(aboutPagePath)) {
    console.error(`❌ Error: Could not find about page at: ${aboutPagePath}`);
    process.exit(1);
}

let content = fs.readFileSync(aboutPagePath, 'utf8');

// Find the start of the team section by searching backwards from a unique team member's name
const teamMemberKeyword = 'SHAFIQ AKIF AHAMED';
const teamMemberIndex = content.indexOf(teamMemberKeyword);

if (teamMemberIndex === -1) {
    console.error(`❌ Error: Could not find team member "${teamMemberKeyword}" in about page.`);
    process.exit(1);
}

// Find the opening section div that immediately precedes the team member
const sectionKeyword = '<div class="et_pb_section et_pb_section_2';
const sectionStart = content.lastIndexOf(sectionKeyword, teamMemberIndex);

if (sectionStart === -1) {
    console.error(`❌ Error: Could not find opening "${sectionKeyword}" before the team member.`);
    process.exit(1);
}

// Find the end of the opening tag: ">"
const openingTagEnd = content.indexOf('>', sectionStart);
if (openingTagEnd === -1) {
    console.error(`❌ Error: Could not find closing ">" of opening div tag.`);
    process.exit(1);
}

// Count open and close divs to find the matching </div> closing tag for et_pb_section_2
let openDivs = 1;
let currentPos = openingTagEnd + 1;
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

if (closingTagIndex === -1) {
    console.error(`❌ Error: Could not identify matching closing "</div>" for the team section.`);
    process.exit(1);
}

const originalSection = content.substring(sectionStart, closingTagIndex + 6);
console.log(`\nFound target team section (starts at index ${sectionStart}, ends at ${closingTagIndex + 6}).`);

// Prepare the replacement HTML block
const newServicesSectionHtml = `<div class="et_pb_section et_pb_section_2 et_pb_with_background et_section_regular" id="gfx-services-section">
                    
                    <!-- Premium Inline Styles for 7 GFX Services Grid -->
                    <style>
                      #gfx-services-section {
                        background-color: rgba(10, 10, 12, 0.95) !important;
                        padding: 80px 0 !important;
                        position: relative;
                        overflow: hidden;
                      }
                      
                      .services-header-row {
                        max-width: 1200px;
                        margin: 0 auto 50px auto;
                        padding: 0 20px;
                        text-align: left;
                      }
                      
                      .services-header-row h4 {
                        font-family: 'Poppins', sans-serif !important;
                        font-size: 16px !important;
                        font-weight: 700 !important;
                        color: #B6131D !important;
                        text-transform: uppercase !important;
                        letter-spacing: 2px !important;
                        margin-bottom: 8px !important;
                        position: relative;
                        display: inline-block;
                      }
                      
                      .services-header-row h2 {
                        font-family: 'Poppins', sans-serif !important;
                        font-size: 42px !important;
                        font-weight: 800 !important;
                        color: #ffffff !important;
                        line-height: 1.2 !important;
                        margin: 0 !important;
                      }
                      
                      .services-header-row h2 span {
                        color: #B6131D !important;
                      }
                      
                      .gfx-grid-container {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 0 20px;
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
                        gap: 30px;
                      }
                      
                      .gfx-card {
                        background: rgba(22, 22, 26, 0.85);
                        border: 1px solid rgba(255, 255, 255, 0.05);
                        border-radius: 16px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                        position: relative;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                      }
                      
                      .gfx-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 3px;
                        background: #B6131D;
                        transform: scaleX(0);
                        transform-origin: left;
                        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                        z-index: 5;
                      }
                      
                      .gfx-card:hover::before {
                        transform: scaleX(1);
                      }
                      
                      .gfx-card:hover {
                        transform: translateY(-8px);
                        border-color: rgba(182, 19, 29, 0.4);
                        box-shadow: 0 20px 40px rgba(182, 19, 29, 0.12), 0 0 0 1px rgba(182, 19, 29, 0.2);
                      }
                      
                      .gfx-card-img-wrap {
                        position: relative;
                        height: 220px;
                        overflow: hidden;
                      }
                      
                      .gfx-card-img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                      }
                      
                      .gfx-card:hover .gfx-card-img {
                        transform: scale(1.08);
                      }
                      
                      .gfx-card-overlay {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(to top, rgba(10, 10, 12, 0.95) 0%, rgba(10, 10, 12, 0.3) 60%, rgba(10, 10, 12, 0.1) 100%);
                        z-index: 1;
                      }
                      
                      .gfx-card-badge {
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        background: rgba(182, 19, 29, 0.9);
                        color: #ffffff;
                        padding: 4px 10px;
                        font-size: 10px;
                        font-weight: 700;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        border-radius: 4px;
                        z-index: 2;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                      }
                      
                      .gfx-card-body {
                        padding: 25px;
                        flex-grow: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        position: relative;
                        z-index: 2;
                      }
                      
                      .gfx-card-title {
                        font-family: 'Poppins', sans-serif !important;
                        font-size: 20px !important;
                        font-weight: 700 !important;
                        color: #ffffff !important;
                        margin: 0 0 10px 0 !important;
                        line-height: 1.3 !important;
                      }
                      
                      .gfx-card-desc {
                        font-family: 'Montserrat', sans-serif !important;
                        font-size: 14px !important;
                        color: #b4b4b8 !important;
                        line-height: 1.6 !important;
                        margin: 0 0 20px 0 !important;
                        flex-grow: 1;
                      }
                      
                      .gfx-card-btn {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        color: #B6131D !important;
                        text-decoration: none;
                        font-weight: 700;
                        font-size: 14px;
                        transition: all 0.3s ease;
                        margin-top: auto;
                        border: none;
                        background: transparent;
                        padding: 0;
                        cursor: pointer;
                        width: fit-content;
                      }
                      
                      .gfx-card-btn svg {
                        transition: transform 0.3s ease;
                      }
                      
                      .gfx-card:hover .gfx-card-btn {
                        color: #ffffff !important;
                        text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
                      }
                      
                      .gfx-card:hover .gfx-card-btn svg {
                        transform: translateX(5px);
                      }
                      
                      @media (max-width: 768px) {
                        #gfx-services-section {
                          padding: 60px 0 !important;
                        }
                        .services-header-row h2 {
                          font-size: 32px !important;
                        }
                        .gfx-grid-container {
                          grid-template-columns: 1fr;
                          gap: 20px;
                        }
                      }
                    </style>
                    
                    <!-- Section Title Block -->
                    <div class="services-header-row">
                      <h4>Let’s help you!</h4>
                      <h2>We are dedicated to <span>support your vision</span></h2>
                    </div>
                    
                    <!-- Services Grid Container -->
                    <div class="gfx-grid-container">
                      
                      <!-- Card 1: Wedding Album Design -->
                      <div class="gfx-card">
                        <div class="gfx-card-img-wrap">
                          <span class="gfx-card-badge">Studio</span>
                          <img class="gfx-card-img" src="/images/wedding3.jpg" alt="Wedding Album Design" />
                          <div class="gfx-card-overlay"></div>
                        </div>
                        <div class="gfx-card-body">
                          <div>
                            <h3 class="gfx-card-title">Wedding Album Design</h3>
                            <p class="gfx-card-desc">Impeccable layouts for traditional & modern wedding album sheets. We blend emotion with layout theory to construct breathtaking memories.</p>
                          </div>
                          <a href="/wedding-album-designing-services/" class="gfx-card-btn">
                            Explore Service 
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </a>
                        </div>
                      </div>
                      
                      <!-- Card 2: Pre-Wedding Photo Editing -->
                      <div class="gfx-card">
                        <div class="gfx-card-img-wrap">
                          <span class="gfx-card-badge">Premium</span>
                          <img class="gfx-card-img" src="/images/wedding2.jpg" alt="Pre-Wedding Photo Editing" />
                          <div class="gfx-card-overlay"></div>
                        </div>
                        <div class="gfx-card-body">
                          <div>
                            <h3 class="gfx-card-title">Pre-Wedding Photo Editing</h3>
                            <p class="gfx-card-desc">Editorial-grade color grading, atmospheric correction, skin retouching, and premium filter applications to elevate raw outdoor captures into portraits.</p>
                          </div>
                          <a href="/pre-wedding-photo-editing-services/" class="gfx-card-btn">
                            Explore Service 
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </a>
                        </div>
                      </div>
                      
                      <!-- Card 3: Cinematic Video Editing -->
                      <div class="gfx-card">
                        <div class="gfx-card-img-wrap">
                          <span class="gfx-card-badge">Cinema</span>
                          <img class="gfx-card-img" src="/images/videoediting4.jpg" alt="Cinematic Video Editing" />
                          <div class="gfx-card-overlay"></div>
                        </div>
                        <div class="gfx-card-body">
                          <div>
                            <h3 class="gfx-card-title">Cinematic Video Editing</h3>
                            <p class="gfx-card-desc">Breathtaking transitions, professional color grading (LUT application), multi-track sound engineering, and flawless dynamic pacing to craft summaries.</p>
                          </div>
                          <a href="/corporate-video-youtube-video-services/" class="gfx-card-btn">
                            Explore Service 
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </a>
                        </div>
                      </div>
                      
                      <!-- Card 4: Traditional Video Editing -->
                      <div class="gfx-card">
                        <div class="gfx-card-img-wrap">
                          <span class="gfx-card-badge">Editing</span>
                          <img class="gfx-card-img" src="/images/videoediting1.jpg" alt="Traditional Video Editing" />
                          <div class="gfx-card-overlay"></div>
                        </div>
                        <div class="gfx-card-body">
                          <div>
                            <h3 class="gfx-card-title">Traditional Video Editing</h3>
                            <p class="gfx-card-desc">Full-length ceremony & event video processing. Clean title overlays, smooth audio blending, and high-fidelity rendering for families.</p>
                          </div>
                          <a href="/video-editing-services/" class="gfx-card-btn">
                            Explore Service 
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </a>
                        </div>
                      </div>
                      
                      <!-- Card 5: Poster & Logo Design -->
                      <div class="gfx-card">
                        <div class="gfx-card-img-wrap">
                          <span class="gfx-card-badge">Design</span>
                          <img class="gfx-card-img" src="/wp-content/uploads/2024/10/Logo-Design.jpg.webp" alt="Poster & Logo Design" />
                          <div class="gfx-card-overlay"></div>
                        </div>
                        <div class="gfx-card-body">
                          <div>
                            <h3 class="gfx-card-title">Poster & Logo Design</h3>
                            <p class="gfx-card-desc">Premium vector branding layouts, typography guidelines, and highly engaging social media promotional posters engineered for maximum engagement.</p>
                          </div>
                          <a href="/graphics-design-services/" class="gfx-card-btn">
                            Explore Service 
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </a>
                        </div>
                      </div>
                      
                      <!-- Card 6: Teaser / Highlights -->
                      <div class="gfx-card">
                        <div class="gfx-card-img-wrap">
                          <span class="gfx-card-badge">Viral</span>
                          <img class="gfx-card-img" src="/images/wedding4.jpg" alt="Teaser / Highlights" />
                          <div class="gfx-card-overlay"></div>
                        </div>
                        <div class="gfx-card-body">
                          <div>
                            <h3 class="gfx-card-title">Teaser / Highlights</h3>
                            <p class="gfx-card-desc">Ultra-premium 1-2 minute highlight reels. Perfectly synced music drops, impactful sound design, and speed ramping optimized for social media feeds.</p>
                          </div>
                          <a href="/documentary-wedding-services/" class="gfx-card-btn">
                            Explore Service 
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </a>
                        </div>
                      </div>
                      
                      <!-- Card 7: Drone Operating -->
                      <div class="gfx-card">
                        <div class="gfx-card-img-wrap">
                          <span class="gfx-card-badge">Aerial</span>
                          <img class="gfx-card-img" src="/images/event3.jpg" alt="Drone Operating" />
                          <div class="gfx-card-overlay"></div>
                        </div>
                        <div class="gfx-card-body">
                          <div>
                            <h3 class="gfx-card-title">Drone Operating</h3>
                            <p class="gfx-card-desc">Expert drone operations and stunning aerial visuals. Breathtaking overhead flyovers that add epic scale and dramatic angles to events and films.</p>
                          </div>
                          <a href="/photography-services/" class="gfx-card-btn">
                            Explore Service 
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </a>
                        </div>
                      </div>
                      
                    </div>
                  </div>`;

// Replace in content
content = content.replace(originalSection, newServicesSectionHtml);

// Save back
fs.writeFileSync(aboutPagePath, content, 'utf8');

console.log('✅ Success! Replaced legacy Expert Team section with the beautiful Raju GFX 7 Services Grid!');
