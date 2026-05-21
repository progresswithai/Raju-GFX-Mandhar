const fs = require('fs');
const path = require('path');

const targetFilePath = path.join(__dirname, '..', 'designflash.in', 'about', 'index.html');

console.log('Target file path:', targetFilePath);

if (!fs.existsSync(targetFilePath)) {
    console.error('Error: File does not exist at ' + targetFilePath);
    process.exit(1);
}

let content = fs.readFileSync(targetFilePath, 'utf8').replace(/\r\n/g, '\n');

let startMarker = '                <div class="et_builder_inner_content et_pb_gutters3">';
let startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    startMarker = '                <div class="et_builder_inner_content et_pb_gutters3 about-recreated-body">';
    startIndex = content.indexOf(startMarker);
}
if (startIndex === -1) {
    console.error('Error: Start marker not found!');
    process.exit(1);
}

const endMarker = '              </div>\n            </div>\n          </article>\n        </div>\n        <footer class="et-l et-l--footer">';
const endIndex = content.indexOf(endMarker);
if (endIndex === -1) {
    console.error('Error: End marker not found!');
    process.exit(1);
}

console.log('Start marker found at index:', startIndex);
console.log('End marker found at index:', endIndex);

// We want to replace everything from startIndex up to the end of the matching div corresponding to startMarker.
// Since the startMarker is line 9464 and is closed at line 10102 right before the endMarker block,
// we can find the text just before endMarker, which should be '\n                </div>\n'
const blockToReplace = content.substring(startIndex, endIndex);

console.log('Length of block to replace:', blockToReplace.length);

const newHTML = `                <div class="et_builder_inner_content et_pb_gutters3 about-recreated-body">
                  <!-- CSS Stylesheet -->
                  <style>
                    .about-recreated-body {
                      font-family: 'Poppins', sans-serif !important;
                      color: #333333;
                      background-color: #ffffff;
                      line-height: 1.6;
                    }
                    
                    /* 1. Hero Section */
                    .about-hero {
                      position: relative;
                      background: linear-gradient(rgba(10, 10, 12, 0.88), rgba(10, 10, 12, 0.88)), url('../images/Design-process-bg.jpg') no-repeat center center/cover;
                      padding: 130px 20px;
                      text-align: center;
                      color: #ffffff;
                      overflow: hidden;
                    }
                    .about-hero-subtitle {
                      font-size: 14px;
                      text-transform: uppercase;
                      color: #B6131D;
                      letter-spacing: 3px;
                      margin-bottom: 12px;
                      font-weight: 700;
                    }
                    .about-hero-title {
                      font-size: clamp(34px, 5vw, 54px);
                      font-weight: 800;
                      margin-bottom: 24px;
                      letter-spacing: 1px;
                      line-height: 1.2;
                    }
                    .about-hero-title span {
                      color: #B6131D;
                    }
                    .about-hero-desc {
                      max-width: 820px;
                      margin: 0 auto;
                      font-size: clamp(15px, 2vw, 17px);
                      color: #d1d1d6;
                      line-height: 1.7;
                      font-family: 'Montserrat', sans-serif !important;
                    }
                    
                    /* 2. About Company */
                    .about-company {
                      padding: 100px 20px;
                      background-color: #ffffff;
                      overflow: hidden;
                    }
                    .about-company-container {
                      max-width: 1200px;
                      margin: 0 auto;
                      display: grid;
                      grid-template-columns: 1.2fr 1fr;
                      gap: 60px;
                      align-items: center;
                    }
                    .about-company-left {
                      text-align: left;
                    }
                    .about-company-subtitle {
                      font-size: 13px;
                      text-transform: uppercase;
                      color: #B6131D;
                      font-weight: 700;
                      letter-spacing: 2px;
                      margin-bottom: 12px;
                    }
                    .about-company-title {
                      font-size: clamp(28px, 4vw, 42px);
                      font-weight: 800;
                      color: #1a1a1a;
                      line-height: 1.2;
                      margin-bottom: 24px;
                    }
                    .about-company-title span {
                      color: #B6131D;
                    }
                    .about-company-desc {
                      font-size: 15px;
                      line-height: 1.7;
                      color: #555555;
                      margin-bottom: 35px;
                      font-family: 'Montserrat', sans-serif !important;
                    }
                    .about-company-btn {
                      display: inline-block;
                      background-color: #B6131D;
                      color: #ffffff !important;
                      font-weight: 700;
                      text-transform: uppercase;
                      font-size: 14px;
                      letter-spacing: 1.5px;
                      padding: 15px 36px;
                      border-radius: 4px;
                      transition: all 0.3s ease;
                      box-shadow: 0 4px 15px rgba(182, 19, 29, 0.3);
                      text-decoration: none;
                    }
                    .about-company-btn:hover {
                      background-color: #900f16;
                      transform: translateY(-2px);
                      box-shadow: 0 6px 20px rgba(182, 19, 29, 0.4);
                    }
                    .about-company-right {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }
                    .about-company-mockup {
                      background: linear-gradient(135deg, #1c1c22 0%, #0d0d10 100%);
                      border: 1px solid rgba(255, 255, 255, 0.08);
                      border-radius: 20px;
                      padding: 40px;
                      width: 100%;
                      aspect-ratio: 1.6 / 1;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      position: relative;
                      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.3);
                      overflow: hidden;
                    }
                    .about-company-mockup::before {
                      content: '';
                      position: absolute;
                      top: -50%;
                      left: -50%;
                      width: 200%;
                      height: 200%;
                      background: radial-gradient(circle, rgba(182, 19, 29, 0.15) 0%, transparent 60%);
                      pointer-events: none;
                      z-index: 1;
                    }
                    .about-company-mockup img {
                      max-width: 75%;
                      max-height: 75%;
                      object-fit: contain;
                      filter: drop-shadow(0 0 20px rgba(182, 19, 29, 0.6));
                      z-index: 2;
                      animation: logoGlowFloat 4s ease-in-out infinite alternate;
                    }
                    
                    @keyframes logoGlowFloat {
                      0% {
                        transform: translateY(0);
                        filter: drop-shadow(0 0 15px rgba(182, 19, 29, 0.4));
                      }
                      100% {
                        transform: translateY(-8px);
                        filter: drop-shadow(0 0 25px rgba(182, 19, 29, 0.8));
                      }
                    }
                    
                    /* 3. Why Choose Us */
                    .about-wcu {
                      padding: 100px 20px;
                      background-color: #ffffff;
                      text-align: center;
                      overflow: hidden;
                    }
                    .about-wcu-header {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 15px;
                      margin-bottom: 60px;
                    }
                    .about-wcu-line {
                      height: 2px;
                      width: 40px;
                      background-color: #B6131D;
                    }
                    .about-wcu-heading {
                      font-size: 15px;
                      text-transform: uppercase;
                      color: #B6131D;
                      font-weight: 700;
                      letter-spacing: 3px;
                    }
                    .about-wcu-grid {
                      max-width: 1200px;
                      margin: 0 auto;
                      display: grid;
                      grid-template-columns: repeat(3, 1fr);
                      gap: 30px;
                    }
                    .about-wcu-card {
                      background-color: #ffffff;
                      border-radius: 12px;
                      padding: 40px 30px;
                      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.03);
                      border: 1.5px solid rgba(182, 19, 29, 0.06);
                      transition: all 0.3s ease;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                    }
                    .about-wcu-card:hover {
                      transform: translateY(-6px);
                      box-shadow: 0 15px 35px rgba(182, 19, 29, 0.08);
                      border-color: rgba(182, 19, 29, 0.25);
                    }
                    .about-wcu-icon-wrap {
                      width: 76px;
                      height: 76px;
                      border-radius: 50%;
                      background-color: rgba(182, 19, 29, 0.05);
                      border: 1.5px solid rgba(182, 19, 29, 0.12);
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      margin-bottom: 25px;
                      color: #B6131D;
                      transition: all 0.3s ease;
                    }
                    .about-wcu-card:hover .about-wcu-icon-wrap {
                      background-color: #B6131D;
                      color: #ffffff;
                      transform: scale(1.05);
                      box-shadow: 0 4px 15px rgba(182, 19, 29, 0.2);
                    }
                    .about-wcu-icon-wrap svg {
                      width: 32px;
                      height: 32px;
                    }
                    .about-wcu-card-title {
                      font-size: 19px;
                      font-weight: 700;
                      color: #1a1a1a;
                      margin-bottom: 12px;
                    }
                    .about-wcu-card-desc {
                      font-size: 14px;
                      line-height: 1.6;
                      color: #666666;
                      font-family: 'Montserrat', sans-serif !important;
                    }
                    
                    /* 4. Mission & Vision */
                    .about-mv {
                      padding: 100px 20px;
                      background: linear-gradient(rgba(10, 10, 12, 0.96), rgba(10, 10, 12, 0.96)), url('../images/Design-process-bg.jpg') no-repeat center center/cover;
                      color: #ffffff;
                      overflow: hidden;
                    }
                    .about-mv-container {
                      max-width: 1200px;
                      margin: 0 auto;
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                      gap: 40px;
                    }
                    .about-mv-card {
                      background: rgba(255, 255, 255, 0.02);
                      border: 1px solid rgba(255, 255, 255, 0.05);
                      border-radius: 16px;
                      padding: 45px 40px;
                      display: flex;
                      gap: 25px;
                      align-items: flex-start;
                      backdrop-filter: blur(10px);
                      -webkit-backdrop-filter: blur(10px);
                      transition: all 0.3s ease;
                    }
                    .about-mv-card:hover {
                      background: rgba(255, 255, 255, 0.04);
                      border-color: rgba(182, 19, 29, 0.4);
                      transform: translateY(-3px);
                      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                    }
                    .about-mv-icon-wrap {
                      width: 64px;
                      height: 64px;
                      border-radius: 50%;
                      background-color: #B6131D;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      flex-shrink: 0;
                      color: #ffffff;
                      box-shadow: 0 4px 15px rgba(182, 19, 29, 0.4);
                    }
                    .about-mv-icon-wrap svg {
                      width: 28px;
                      height: 28px;
                    }
                    .about-mv-content {
                      text-align: left;
                    }
                    .about-mv-subtitle {
                      font-size: 13px;
                      text-transform: uppercase;
                      color: #B6131D;
                      font-weight: 700;
                      letter-spacing: 2px;
                      margin-bottom: 6px;
                    }
                    .about-mv-title {
                      font-size: 26px;
                      font-weight: 800;
                      color: #ffffff;
                      margin-bottom: 16px;
                    }
                    .about-mv-desc {
                      font-size: 14px;
                      line-height: 1.6;
                      color: #b4b4b8;
                      font-family: 'Montserrat', sans-serif !important;
                    }
                    
                    /* 5. Stats Strip */
                    .about-stats {
                      padding: 60px 20px;
                      background-color: #ffffff;
                      border-top: 1px solid rgba(0, 0, 0, 0.08);
                      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
                      overflow: hidden;
                    }
                    .about-stats-container {
                      max-width: 1200px;
                      margin: 0 auto;
                      display: grid;
                      grid-template-columns: repeat(4, 1fr);
                      gap: 30px;
                    }
                    .about-stats-item {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 20px;
                    }
                    .about-stats-icon {
                      color: #B6131D;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    }
                    .about-stats-icon svg {
                      width: 38px;
                      height: 38px;
                    }
                    .about-stats-text {
                      text-align: left;
                    }
                    .about-stats-num {
                      font-size: clamp(26px, 3.5vw, 36px);
                      font-weight: 800;
                      color: #1a1a1a;
                      line-height: 1.1;
                      margin-bottom: 4px;
                    }
                    .about-stats-label {
                      font-size: 13px;
                      color: #555555;
                      font-family: 'Montserrat', sans-serif !important;
                      font-weight: 500;
                    }
                    
                    /* 6. Meet Our Founder */
                    .about-founder {
                      padding: 100px 20px;
                      background-color: #f8f9fa;
                      overflow: hidden;
                    }
                    .about-founder-container {
                      max-width: 1100px;
                      margin: 0 auto;
                      display: grid;
                      grid-template-columns: 1fr 1.3fr;
                      gap: 60px;
                      align-items: center;
                    }
                    .about-founder-left {
                      position: relative;
                    }
                    .about-founder-img-wrap {
                      width: 100%;
                      max-width: 380px;
                      margin: 0 auto;
                      aspect-ratio: 1 / 1.1;
                      border-radius: 20px;
                      overflow: hidden;
                      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
                      border: 6px solid #ffffff;
                    }
                    .about-founder-img-wrap img {
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                    }
                    .about-founder-right {
                      text-align: left;
                    }
                    .about-founder-subtitle {
                      font-size: 13px;
                      text-transform: uppercase;
                      color: #B6131D;
                      font-weight: 700;
                      letter-spacing: 2px;
                      margin-bottom: 10px;
                    }
                    .about-founder-title {
                      font-size: 38px;
                      font-weight: 800;
                      color: #1a1a1a;
                      margin-bottom: 20px;
                    }
                    .about-founder-bio {
                      font-size: 15px;
                      line-height: 1.8;
                      color: #555555;
                      margin-bottom: 35px;
                      font-family: 'Montserrat', sans-serif !important;
                    }
                    .about-founder-socials {
                      display: flex;
                      gap: 15px;
                    }
                    .about-founder-social {
                      width: 44px;
                      height: 44px;
                      border-radius: 50%;
                      background-color: #ffffff;
                      border: 1.5px solid rgba(0, 0, 0, 0.08);
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      color: #333333;
                      transition: all 0.3s ease;
                    }
                    .about-founder-social:hover {
                      background-color: #B6131D;
                      color: #ffffff;
                      border-color: #B6131D;
                      transform: translateY(-3px);
                      box-shadow: 0 4px 12px rgba(182, 19, 29, 0.3);
                    }
                    .about-founder-social svg {
                      width: 20px;
                      height: 20px;
                      fill: currentColor;
                    }
                    
                    /* Responsive Media Queries */
                    @media (max-width: 991px) {
                      .about-company-container {
                        grid-template-columns: 1fr;
                        gap: 40px;
                      }
                      .about-company-left {
                        text-align: center;
                      }
                      .about-wcu-grid {
                        grid-template-columns: repeat(2, 1fr);
                      }
                      .about-mv-container {
                        grid-template-columns: 1fr;
                        gap: 25px;
                      }
                      .about-stats-container {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 30px 20px;
                      }
                      .about-founder-container {
                        grid-template-columns: 1fr;
                        gap: 40px;
                      }
                      .about-founder-right {
                        text-align: center;
                      }
                      .about-founder-socials {
                        justify-content: center;
                      }
                    }
                    
                    @media (max-width: 768px) {
                      .about-hero {
                        padding: 90px 20px;
                      }
                      .about-company {
                        padding: 60px 20px;
                      }
                      .about-wcu {
                        padding: 60px 20px;
                      }
                      .about-wcu-grid {
                        grid-template-columns: 1fr;
                      }
                      .about-mv {
                        padding: 60px 20px;
                      }
                      .about-mv-card {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        padding: 35px 25px;
                      }
                      .about-mv-content {
                        text-align: center;
                      }
                      .about-stats {
                        padding: 40px 20px;
                      }
                      .about-stats-container {
                        grid-template-columns: 1fr;
                        gap: 25px;
                      }
                      .about-stats-item {
                        flex-direction: column;
                        text-align: center;
                      }
                      .about-stats-text {
                        text-align: center;
                      }
                      .about-founder {
                        padding: 60px 20px;
                      }
                    }

                    /* Premium Scroll-Reveal Animations */
                    .reveal {
                      opacity: 0;
                      transform: translateY(30px);
                      transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    .reveal.active {
                      opacity: 1;
                      transform: translateY(0);
                    }
                    .reveal-left {
                      opacity: 0;
                      transform: translateX(-40px);
                      transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    .reveal-left.active {
                      opacity: 1;
                      transform: translateX(0);
                    }
                    .reveal-right {
                      opacity: 0;
                      transform: translateX(40px);
                      transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    .reveal-right.active {
                      opacity: 1;
                      transform: translateX(0);
                    }
                    
                    /* Staggered Delays */
                    .delay-100 { transition-delay: 100ms; }
                    .delay-200 { transition-delay: 200ms; }
                    .delay-300 { transition-delay: 300ms; }
                    .delay-400 { transition-delay: 400ms; }
                    .delay-500 { transition-delay: 500ms; }
                    .delay-600 { transition-delay: 600ms; }
                  </style>

                  <!-- 1. Hero Section -->
                  <section class="about-hero">
                    <div class="about-hero-subtitle reveal">Who We Are</div>
                    <h1 class="about-hero-title reveal delay-100">ABOUT <span>RAJU GFX</span></h1>
                    <p class="about-hero-desc reveal delay-200">We are a passionate team of designers, developers and digital strategists helping businesses grow with stunning websites, creative designs and powerful digital solutions.</p>
                  </section>

                  <!-- 2. About Company Section -->
                  <section class="about-company">
                    <div class="about-company-container">
                      <div class="about-company-left reveal-left">
                        <div class="about-company-subtitle">About Company</div>
                        <h2 class="about-company-title">We Design Experiences That <span>Drive Results</span></h2>
                        <p class="about-company-desc">Raju GFX is a leading Website Design Company in Mandhar, Raipur. We create modern, responsive and high performing websites that help businesses establish a strong digital presence. Our goal is to deliver creativity, innovation and quality in every project.</p>
                        <a href="../contact/index.html" class="about-company-btn">Contact Us</a>
                      </div>
                      <div class="about-company-right reveal-right">
                        <div class="about-company-mockup">
                          <img src="../images/raju_gfx_mandhar_logo.webp" onerror="this.onerror=null; this.src='../images/raju_gfx_mandhar_logo.png'" alt="Raju GFX Mandhar" />
                        </div>
                      </div>
                    </div>
                  </section>

                  <!-- 3. Why Choose Us Section -->
                  <section class="about-wcu">
                    <div class="about-wcu-header reveal">
                      <div class="about-wcu-line"></div>
                      <div class="about-wcu-heading">Why Choose Us</div>
                      <div class="about-wcu-line"></div>
                    </div>
                    <div class="about-wcu-grid">
                      <!-- Card 1: Creative Design -->
                      <div class="about-wcu-card reveal delay-100">
                        <div class="about-wcu-icon-wrap">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12c0 2.2 .7 4.2 2 5.8L3 21l3.2-1c1.6 1.3 3.6 2 5.8 2z"/>
                            <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor"/>
                            <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor"/>
                            <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor"/>
                            <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor"/>
                          </svg>
                        </div>
                        <h3 class="about-wcu-card-title">Creative Design</h3>
                        <p class="about-wcu-card-desc">Unique and modern designs that reflect your brand identity.</p>
                      </div>

                      <!-- Card 2: Responsive Websites -->
                      <div class="about-wcu-card reveal delay-200">
                        <div class="about-wcu-icon-wrap">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                            <line x1="8" y1="21" x2="16" y2="21"/>
                            <line x1="12" y1="17" x2="12" y2="21"/>
                            <rect x="14" y="9" width="6" height="10" rx="1" ry="1" fill="#fff" stroke="currentColor" stroke-width="1.5"/>
                          </svg>
                        </div>
                        <h3 class="about-wcu-card-title">Responsive Websites</h3>
                        <p class="about-wcu-card-desc">Mobile-friendly websites that look perfect on all devices.</p>
                      </div>

                      <!-- Card 3: SEO Friendly -->
                      <div class="about-wcu-card reveal delay-300">
                        <div class="about-wcu-icon-wrap">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="20" x2="18" y2="10"/>
                            <line x1="12" y1="20" x2="12" y2="4"/>
                            <line x1="6" y1="20" x2="6" y2="14"/>
                          </svg>
                        </div>
                        <h3 class="about-wcu-card-title">SEO Friendly</h3>
                        <p class="about-wcu-card-desc">Optimized websites to help you rank higher on search engines.</p>
                      </div>

                      <!-- Card 4: Fast Performance -->
                      <div class="about-wcu-card reveal delay-400">
                        <div class="about-wcu-icon-wrap">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                          </svg>
                        </div>
                        <h3 class="about-wcu-card-title">Fast Performance</h3>
                        <p class="about-wcu-card-desc">High-performance websites for a smooth user experience.</p>
                      </div>

                      <!-- Card 5: Affordable Pricing -->
                      <div class="about-wcu-card reveal delay-500">
                        <div class="about-wcu-icon-wrap">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                            <line x1="7" y1="7" x2="7.01" y2="7"/>
                          </svg>
                        </div>
                        <h3 class="about-wcu-card-title">Affordable Pricing</h3>
                        <p class="about-wcu-card-desc">Quality solutions at competitive and transparent prices.</p>
                      </div>

                      <!-- Card 6: Support & Maintenance -->
                      <div class="about-wcu-card reveal delay-600">
                        <div class="about-wcu-icon-wrap">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                          </svg>
                        </div>
                        <h3 class="about-wcu-card-title">Support & Maintenance</h3>
                        <p class="about-wcu-card-desc">We provide continuous support and maintenance for your website.</p>
                      </div>
                    </div>
                  </section>

                  <!-- 4. Our Mission & Our Vision Section -->
                  <section class="about-mv">
                    <div class="about-mv-container">
                      <!-- Mission Card -->
                      <div class="about-mv-card reveal-left">
                        <div class="about-mv-icon-wrap">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <circle cx="12" cy="12" r="6"/>
                            <circle cx="12" cy="12" r="2"/>
                          </svg>
                        </div>
                        <div class="about-mv-content">
                          <div class="about-mv-subtitle">Our Mission</div>
                          <h3 class="about-mv-title">Our Mission</h3>
                          <p class="about-mv-desc">Our mission is to help businesses grow online by delivering creative, innovative and result-driven digital solutions that create real impact.</p>
                        </div>
                      </div>

                      <!-- Vision Card -->
                      <div class="about-mv-card reveal-right">
                        <div class="about-mv-icon-wrap">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </div>
                        <div class="about-mv-content">
                          <div class="about-mv-subtitle">Our Vision</div>
                          <h3 class="about-mv-title">Our Vision</h3>
                          <p class="about-mv-desc">Our vision is to be a trusted digital partner for businesses worldwide and empower them to achieve digital excellence.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <!-- 5. Stats Strip Section -->
                  <section class="about-stats">
                    <div class="about-stats-container">
                      <!-- Stat 1 -->
                      <div class="about-stats-item reveal delay-100">
                        <div class="about-stats-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                          </svg>
                        </div>
                        <div class="about-stats-text">
                          <div class="about-stats-num">150+</div>
                          <div class="about-stats-label">Projects completed</div>
                        </div>
                      </div>

                      <!-- Stat 2 -->
                      <div class="about-stats-item reveal delay-200">
                        <div class="about-stats-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                          </svg>
                        </div>
                        <div class="about-stats-text">
                          <div class="about-stats-num">100+</div>
                          <div class="about-stats-label">Happy Clients</div>
                        </div>
                      </div>

                      <!-- Stat 3 -->
                      <div class="about-stats-item reveal delay-300">
                        <div class="about-stats-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <div class="about-stats-text">
                          <div class="about-stats-num">5+</div>
                          <div class="about-stats-label">Years of Experience</div>
                        </div>
                      </div>

                      <!-- Stat 4 -->
                      <div class="about-stats-item reveal delay-400">
                        <div class="about-stats-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                          </svg>
                        </div>
                        <div class="about-stats-text">
                          <div class="about-stats-num">50+</div>
                          <div class="about-stats-label">Positive Reviews</div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <!-- 6. Meet Our Founder Section -->
                  <section class="about-founder">
                    <div class="about-founder-container">
                      <div class="about-founder-left reveal-left">
                        <div class="about-founder-img-wrap">
                          <img src="../images/wedding5.jpg" alt="Raju GFX Founder" />
                        </div>
                      </div>
                      <div class="about-founder-right reveal-right">
                        <div class="about-founder-subtitle">Meet Our Founder</div>
                        <h2 class="about-founder-title">Raju GFX</h2>
                        <p class="about-founder-bio">A passionate designer and developer with a vision to help businesses grow through digital creativity. With years of experience, he leads Raju GFX with dedication, innovation and commitment.</p>
                        <div class="about-founder-socials">
                          <!-- Facebook -->
                          <a href="https://www.facebook.com/Raju GFX.in" target="_blank" class="about-founder-social">
                            <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                          </a>
                          <!-- Instagram -->
                          <a href="https://www.instagram.com/rajugfx.ae/" target="_blank" class="about-founder-social">
                            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                          </a>
                          <!-- WhatsApp -->
                          <a href="https://api.whatsapp.com/message/XHAQM2L2VQDKH1?autoload=1&amp;app_absent=0" target="_blank" class="about-founder-social">
                            <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.847.001-2.63-1.019-5.101-2.871-6.956C16.612 1.947 14.135.932 11.512.932c-5.441 0-9.867 4.415-9.87 9.851-.001 1.637.427 3.239 1.242 4.646L1.87 20.893l5.59-1.465c-.822.483-1.636.726-2.585.831zm14.159-9.19c-.3-.15-1.771-.873-2.046-.973-.275-.101-.475-.15-.675.15-.2.3-.775.973-.95 1.173-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.492-.893-.797-1.496-1.78-1.671-2.08-.175-.3-.019-.462.13-.611.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.492-.51-.675-.519-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8 1.05-.275.975-1.05 3.075-1.15 3.275-.1.2-.2.375-.425.575-.925.875-1.85 1.775-2.675 2.75-.825.975-.825 1.95-.5 3 .325 1.05.65 1.625 1.15 2.25 1.775 2.15 3.975 3.275 6.55 3.275 1.575 0 2.925-.375 3.925-1.075 1-.7 1.65-1.65 1.875-2.25.225-.6.3-1.15.225-1.25-.075-.1-.275-.2-.575-.35z"/></svg>
                          </a>
                          <!-- LinkedIn -->
                          <a href="https://www.linkedin.com/company/rajugfx/" target="_blank" class="about-founder-social">
                            <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>

                  <!-- Scroll Reveal Animation Engine -->
                  <script>
                    (function() {
                      function initScrollReveal() {
                        const observerOptions = {
                          root: null,
                          rootMargin: '0px',
                          threshold: 0.05
                        };

                        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
                        
                        const observer = new IntersectionObserver((entries, obs) => {
                          entries.forEach(entry => {
                            if (entry.isIntersecting) {
                              entry.target.classList.add('active');
                              obs.unobserve(entry.target);
                            }
                          });
                        }, observerOptions);

                        revealElements.forEach(el => {
                          observer.observe(el);
                        });
                      }

                      if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', initScrollReveal);
                      } else {
                        initScrollReveal();
                      }
                    })();
                  </script>
                </div>`;

const modifiedContent = content.substring(0, startIndex) + newHTML + content.substring(endIndex);

fs.writeFileSync(targetFilePath, modifiedContent.replace(/\n/g, '\r\n'), 'utf8');

console.log('Successfully updated e:\\\\Raju wesbite\\\\designflash.in\\\\about\\\\index.html with smooth scroll-reveal animations!');
