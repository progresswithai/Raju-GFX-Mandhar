const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'designflash.in');
const aboutPagePath = path.join(rootDir, 'about', 'index.html');
const serviceDir = path.join(rootDir, 'service');
const servicePagePath = path.join(serviceDir, 'index.html');

// Create service directory if it doesn't exist
if (!fs.existsSync(serviceDir)) {
    fs.mkdirSync(serviceDir, { recursive: true });
}

// 1. Read about/index.html to copy the perfect depth 1 header and footer structures
console.log("Reading about/index.html layout...");
const aboutHtml = fs.readFileSync(aboutPagePath, 'utf8');

// Find split points
const headerEndIndex = aboutHtml.indexOf('</header>');
const footerStartIndex = aboutHtml.indexOf('<footer');

if (headerEndIndex === -1 || footerStartIndex === -1) {
    console.error("❌ Error: Could not find header or footer tags in about/index.html");
    process.exit(1);
}

// Extract components
const headerHtml = aboutHtml.substring(0, headerEndIndex + 9);
const footerHtml = aboutHtml.substring(footerStartIndex);

// Design the premium services body content
const servicesContentHtml = `
      <div id="et-main-area">
        <div id="main-content">
          <article class="page type-page status-publish hentry">
            <div class="entry-content">
              
              <!-- Custom Premium Styles for Services Page -->
              <style>
                .services-hero {
                  background: linear-gradient(135deg, #0d0d11 0%, #151522 100%);
                  padding: 100px 20px 80px 20px;
                  text-align: center;
                  position: relative;
                  overflow: hidden;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .services-hero::before {
                  content: '';
                  position: absolute;
                  top: -50%;
                  left: -50%;
                  width: 200%;
                  height: 200%;
                  background: radial-gradient(circle, rgba(165, 180, 252, 0.05) 0%, transparent 60%);
                  animation: spin 30s linear infinite;
                }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                
                .services-hero-content {
                  position: relative;
                  z-index: 2;
                  max-width: 800px;
                  margin: 0 auto;
                }
                .services-hero h1 {
                  font-size: 56px;
                  font-weight: 800;
                  background: linear-gradient(90deg, #ffffff 0%, #a5b4fc 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  margin-bottom: 20px;
                  letter-spacing: -1px;
                  line-height: 1.1;
                }
                .services-hero p {
                  font-size: 20px;
                  color: #94a3b8;
                  line-height: 1.6;
                  margin-bottom: 30px;
                }
                .breadcrumbs {
                  display: inline-flex;
                  gap: 10px;
                  background: rgba(255, 255, 255, 0.03);
                  padding: 8px 16px;
                  border-radius: 30px;
                  border: 1px solid rgba(255, 255, 255, 0.08);
                  font-size: 14px;
                }
                .breadcrumbs a {
                  color: #a5b4fc;
                  text-decoration: none;
                  transition: color 0.3s;
                }
                .breadcrumbs a:hover {
                  color: #ffffff;
                }
                .breadcrumbs span {
                  color: #64748b;
                }
                
                .services-container {
                  background: #09090b;
                  padding: 100px 20px;
                  position: relative;
                }
                .services-grid {
                  max-width: 1200px;
                  margin: 0 auto;
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
                  gap: 30px;
                }
                
                .service-card {
                  background: rgba(20, 20, 25, 0.6);
                  border: 1px solid rgba(255, 255, 255, 0.05);
                  border-radius: 20px;
                  padding: 40px 30px;
                  position: relative;
                  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                  display: flex;
                  flex-direction: column;
                  overflow: hidden;
                  backdrop-filter: blur(10px);
                }
                .service-card::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(135deg, rgba(165, 180, 252, 0.05) 0%, transparent 100%);
                  opacity: 0;
                  transition: opacity 0.4s;
                }
                .service-card:hover {
                  transform: translateY(-8px);
                  border-color: rgba(165, 180, 252, 0.3);
                  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(165, 180, 252, 0.05);
                }
                .service-card:hover::before {
                  opacity: 1;
                }
                
                .service-icon {
                  width: 60px;
                  height: 60px;
                  border-radius: 16px;
                  background: rgba(165, 180, 252, 0.1);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-bottom: 25px;
                  color: #a5b4fc;
                  position: relative;
                  z-index: 2;
                  transition: all 0.3s;
                }
                .service-card:hover .service-icon {
                  background: #a5b4fc;
                  color: #0f0f13;
                  box-shadow: 0 0 15px rgba(165, 180, 252, 0.4);
                }
                
                .service-title {
                  font-size: 22px;
                  font-weight: 700;
                  color: #ffffff;
                  margin-bottom: 15px;
                  position: relative;
                  z-index: 2;
                }
                
                .service-description {
                  font-size: 15px;
                  color: #94a3b8;
                  line-height: 1.6;
                  margin-bottom: 25px;
                  flex-grow: 1;
                  position: relative;
                  z-index: 2;
                }
                
                .service-btn {
                  display: inline-flex;
                  align-items: center;
                  gap: 8px;
                  color: #a5b4fc;
                  text-decoration: none;
                  font-weight: 600;
                  font-size: 15px;
                  transition: all 0.3s;
                  position: relative;
                  z-index: 2;
                  margin-top: auto;
                }
                .service-btn svg {
                  transition: transform 0.3s;
                }
                .service-btn:hover {
                  color: #ffffff;
                }
                .service-btn:hover svg {
                  transform: translateX(4px);
                }
                
                .services-cta {
                  background: linear-gradient(180deg, #09090b 0%, #0d0d11 100%);
                  padding: 80px 20px 120px 20px;
                  text-align: center;
                  border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
                .cta-box {
                  max-width: 700px;
                  margin: 0 auto;
                  background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%);
                  border: 1px solid rgba(255, 255, 255, 0.05);
                  padding: 60px 40px;
                  border-radius: 24px;
                  position: relative;
                }
                .cta-box h2 {
                  font-size: 38px;
                  font-weight: 800;
                  color: #ffffff;
                  margin-bottom: 20px;
                }
                .cta-box p {
                  font-size: 16px;
                  color: #94a3b8;
                  margin-bottom: 35px;
                  line-height: 1.6;
                }
                .cta-buttons {
                  display: flex;
                  gap: 15px;
                  justify-content: center;
                  flex-wrap: wrap;
                }
                .btn-primary {
                  background: #a5b4fc;
                  color: #09090b;
                  padding: 14px 28px;
                  border-radius: 12px;
                  font-weight: 700;
                  text-decoration: none;
                  transition: all 0.3s;
                  box-shadow: 0 4px 14px rgba(165, 180, 252, 0.2);
                }
                .btn-primary:hover {
                  background: #ffffff;
                  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.25);
                  transform: translateY(-2px);
                }
                .btn-secondary {
                  background: transparent;
                  color: #ffffff;
                  padding: 14px 28px;
                  border-radius: 12px;
                  font-weight: 700;
                  text-decoration: none;
                  border: 1px solid rgba(255, 255, 255, 0.15);
                  transition: all 0.3s;
                }
                .btn-secondary:hover {
                  background: rgba(255, 255, 255, 0.05);
                  border-color: rgba(255, 255, 255, 0.25);
                  transform: translateY(-2px);
                }
              </style>
              
              <!-- Hero Section -->
              <section class="services-hero">
                <div class="services-hero-content">
                  <div class="breadcrumbs">
                    <a href="../index.html">Home</a>
                    <span>/</span>
                    <span style="color: #ffffff;">Services</span>
                  </div>
                  <h1 style="margin-top: 20px;">Our Premium Services</h1>
                  <p>Elevate your brand with world-class digital production, high-impact photo & video editing, custom web design, and cutting-edge visual systems engineered to drive growth.</p>
                </div>
              </section>
              
              <!-- Services Catalog -->
              <section class="services-container">
                <div class="services-grid">
                  
                  <!-- Wedding Album Design -->
                  <div class="service-card">
                    <div class="service-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>
                    <h3 class="service-title">Wedding Album Design</h3>
                    <p class="service-description">Impeccable layouts for traditional & modern wedding sheets. We blend emotion with layout theory to construct breathtaking physical and digital memories with premium color tones.</p>
                    <a href="https://wa.me/919632112657" class="service-btn" target="_blank">
                      Book Now 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                  </div>
                  
                  <!-- Pre-Wedding Photo Editing -->
                  <div class="service-card">
                    <div class="service-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    </div>
                    <h3 class="service-title">Pre-Wedding Photo Editing</h3>
                    <p class="service-description">Editorial-grade color grading, atmospheric correction, skin retouching, and premium filter applications designed to elevate raw outdoor shoots into cinematic portraits.</p>
                    <a href="https://wa.me/919632112657" class="service-btn" target="_blank">
                      Book Now 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                  </div>
                  
                  <!-- Cinematic Video Editing -->
                  <div class="service-card">
                    <div class="service-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                    </div>
                    <h3 class="service-title">Cinematic Video Editing</h3>
                    <p class="service-description">Breathtaking transitions, professional color grading (LUT application), multi-track sound engineering, and flawless dynamic pacing to craft theatrical event summaries.</p>
                    <a href="https://wa.me/919632112657" class="service-btn" target="_blank">
                      Book Now 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                  </div>
                  
                  <!-- Traditional Video Editing -->
                  <div class="service-card">
                    <div class="service-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
                    </div>
                    <h3 class="service-title">Traditional Video Editing</h3>
                    <p class="service-description">Full-length ceremony & event video processing. Clean title overlays, smooth audio blending, and high-fidelity rendering to deliver timeless keepsakes for families.</p>
                    <a href="https://wa.me/919632112657" class="service-btn" target="_blank">
                      Book Now 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                  </div>
                  
                  <!-- Poster & Logo Design -->
                  <div class="service-card">
                    <div class="service-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    </div>
                    <h3 class="service-title">Poster & Logo Design</h3>
                    <p class="service-description">Premium vector branding layouts, typography guidelines, and highly engaging social media promotional posters engineered for maximum engagement and print-readiness.</p>
                    <a href="https://wa.me/919632112657" class="service-btn" target="_blank">
                      Book Now 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                  </div>
                  
                  <!-- Teaser & Highlights -->
                  <div class="service-card">
                    <div class="service-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                    <h3 class="service-title">Teaser & Highlights Editing</h3>
                    <p class="service-description">Ultra-premium 1-2 minute highlight reels. Perfectly synced music drops, impactful sound design, and speed ramping optimized for social media feeds.</p>
                    <a href="https://wa.me/919632112657" class="service-btn" target="_blank">
                      Book Now 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                  </div>
                  
                  <!-- Drone Operating & Aerial Shoots -->
                  <div class="service-card">
                    <div class="service-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                    </div>
                    <h3 class="service-title">Drone Operating & Aerials</h3>
                    <p class="service-description">Expert drone operations and stunning aerial visuals. We choreograph dynamic sweeping overhead flyovers to add epic scale to outdoor events and corporate captures.</p>
                    <a href="https://wa.me/919632112657" class="service-btn" target="_blank">
                      Book Now 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                  </div>
                  
                  <!-- Corporate & YouTube Videos -->
                  <div class="service-card">
                    <div class="service-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                    </div>
                    <h3 class="service-title">Corporate & YouTube Video</h3>
                    <p class="service-description">Professional corporate overviews, product walkthroughs, and optimized creator cuts. Multi-cam syncing, dynamic subtitles, and viewer engagement elements.</p>
                    <a href="https://wa.me/919632112657" class="service-btn" target="_blank">
                      Book Now 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                  </div>
                  
                  <!-- Short Film & Reels Editing -->
                  <div class="service-card">
                    <div class="service-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                    </div>
                    <h3 class="service-title">Short Film & Reels Editing</h3>
                    <p class="service-description">Viral-style pacing for Instagram Reels & YouTube Shorts. Highly interactive typographic subtitles, sound effects, motion graphics, and hook-focused retention layouts.</p>
                    <a href="https://wa.me/919632112657" class="service-btn" target="_blank">
                      Book Now 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                  </div>
                  
                </div>
              </section>
              
              <!-- Call to Action Section -->
              <section class="services-cta">
                <div class="cta-box">
                  <h2>Have a Specific Project in Mind?</h2>
                  <p>Let's collaborate! Whether you need premium album layouts, a viral reel edit, or custom brand vectors, Raju GFX has the technology and creative mastery to turn your concept into gold.</p>
                  <div class="cta-buttons">
                    <a href="https://wa.me/919632112657" class="btn-primary" target="_blank">Discuss on WhatsApp</a>
                    <a href="tel:+919164546655" class="btn-secondary">Call Our Director</a>
                  </div>
                </div>
              </section>
              
            </div>
          </article>
        </div>
      </div>
`;

// Merge and save the new page
const finalServiceHtml = headerHtml + servicesContentHtml + footerHtml;
fs.writeFileSync(servicePagePath, finalServiceHtml, 'utf8');
console.log("✅ Successfully created service/index.html!");

// 2. We must rewrite the navigation links globally so "Service" in the header points to our new clean page!
console.log("Syncing global navigation menu links for Service page...");

function processDirectory(dir, depth = 0) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (file === 'wp-content' || file === 'wp-includes' || file === 'wp-json' || file === '_https_') {
                return;
            }
            processDirectory(fullPath, depth + 1);
        } else if (file === 'index.html') {
            updateServiceNavigationLinks(fullPath, depth);
        }
    });
}

function updateServiceNavigationLinks(filePath, depth) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const rootRelativeServicePath = depth === 0 ? 'service/index.html' : '../service/index.html';
    
    // Replace different legacy variations of the service link
    const oldLinkPattern1 = /href="[^"]*best-digital-marketing-services-company-in-mandhar,\s*raipur-india\/index\.html"/g;
    const oldLinkPattern2 = /href="[^"]*best-digital-marketing-services-company-in-bangalore-india\/index\.html"/g;
    const oldLinkPattern3 = /href="[^"]*best-digital-marketing-services-company-in-mandhar,\s*raipur\/index\.html"/g;
    
    let hasChanges = false;
    
    if (oldLinkPattern1.test(content)) {
        content = content.replace(oldLinkPattern1, `href="${rootRelativeServicePath}"`);
        hasChanges = true;
    }
    if (oldLinkPattern2.test(content)) {
        content = content.replace(oldLinkPattern2, `href="${rootRelativeServicePath}"`);
        hasChanges = true;
    }
    if (oldLinkPattern3.test(content)) {
        content = content.replace(oldLinkPattern3, `href="${rootRelativeServicePath}"`);
        hasChanges = true;
    }

    if (hasChanges) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  -> Updated navigation link in: ${filePath}`);
    }
}

processDirectory(rootDir);

// 3. Now let's run sync_all_footers.js to ensure the new service/index.html has the perfect homepage footer injected
console.log("Running sync_all_footers.js to sync the newly created service page footer...");
try {
    const { execSync } = require('child_process');
    execSync('node sync_all_footers.js', { cwd: __dirname, stdio: 'inherit' });
    console.log("✅ Footers synced successfully!");
} catch (e) {
    console.error("❌ Error running sync_all_footers.js:", e.message);
}

console.log("\n====================================================");
console.log(" 🎉 SERVICE PAGE CREATED AND INTEGRATED SUCCESSFULLY! 🎉");
console.log("====================================================");
