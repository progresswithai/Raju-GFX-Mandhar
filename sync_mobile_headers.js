const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const newMobileCSS = `
                /* Hide mobile utility bar and mobile dual-action bar on desktop */
                .new-header .mobile-utility-bar {
                    display: none;
                }
                .new-header .mobile-dual-bar {
                    display: none;
                }

                @media (max-width: 768px) {
                    .new-header {
                        position: sticky;
                        top: 0;
                        z-index: 10000;
                    }
                    
                    /* Hide desktop top-bar */
                    .new-header .top-bar {
                        display: none !important;
                    }
                    
                    /* Make middle header dynamic horizontal row */
                    .new-header .middle-header {
                        display: flex !important;
                        flex-direction: row !important;
                        justify-content: space-between !important;
                        align-items: center !important;
                        padding: 10px 15px !important;
                        gap: 0 !important;
                        background-color: #fff !important;
                        border-bottom: 1px solid #eee !important;
                        height: 70px !important;
                    }
                    
                    .new-header .logo img {
                        height: 48px !important;
                        object-fit: contain !important;
                    }
                    
                    /* Hide original desktop elements */
                    .new-header .middle-right {
                        display: none !important;
                    }
                    
                    /* Show mobile utility bar */
                    .new-header .mobile-utility-bar {
                        display: flex !important;
                        flex-direction: row !important;
                        align-items: center !important;
                        gap: 0 !important;
                        width: auto !important;
                    }
                    
                    /* Mobile Location Indicator styling */
                    .new-header .location-mobile {
                        display: flex !important;
                        align-items: center !important;
                        gap: 4px !important;
                        font-size: 13px !important;
                        font-weight: 500 !important;
                        color: #4a4a4a !important;
                        text-decoration: none !important;
                    }
                    
                    .new-header .location-mobile .loc-icon-red {
                        color: #bd1a21 !important;
                        font-size: 14px !important;
                    }
                    
                    .new-header .location-mobile .loc-name {
                        font-family: 'Inter', sans-serif !important;
                    }
                    
                    .new-header .location-mobile .loc-dropdown-arrow {
                        color: #bd1a21 !important;
                        font-family: 'ETmodules', sans-serif !important;
                        font-weight: 700 !important;
                        margin-left: 2px !important;
                        font-size: 10px !important;
                    }
                    
                    /* Mobile Dividers */
                    .new-header .mobile-divider {
                        width: 1px !important;
                        height: 25px !important;
                        background-color: #e0e0e0 !important;
                        margin: 0 10px !important;
                        display: block !important;
                    }
                    
                    /* Call Button */
                    .new-header .mobile-call-btn {
                        background-color: #bd1a21 !important;
                        color: #fff !important;
                        width: 36px !important;
                        height: 36px !important;
                        border-radius: 6px !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        text-decoration: none !important;
                        transition: background-color 0.2s ease !important;
                    }
                    
                    .new-header .mobile-call-btn:hover {
                        background-color: #9e151a !important;
                    }
                    
                    .new-header .mobile-call-btn i {
                        font-size: 16px !important;
                    }
                    
                    /* Mobile Hamburger Button */
                    .new-header .hamburger-menu {
                        display: flex !important;
                        flex-direction: column !important;
                        justify-content: space-between !important;
                        width: 24px !important;
                        height: 16px !important;
                        cursor: pointer !important;
                        z-index: 10001 !important;
                        margin-right: 0 !important;
                    }
                    
                    .new-header .hamburger-menu span {
                        background-color: #000 !important; /* Sleek black lines */
                        height: 2px !important;
                        width: 100% !important;
                        display: block !important;
                        border-radius: 1px !important;
                        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
                    }
                    
                    /* Hamburger toggle active animations */
                    .new-header .hamburger-menu.active span:nth-child(1) {
                        transform: translateY(7px) rotate(45deg) !important;
                    }
                    
                    .new-header .hamburger-menu.active span:nth-child(2) {
                        opacity: 0 !important;
                        transform: scaleX(0) !important;
                    }
                    
                    .new-header .hamburger-menu.active span:nth-child(3) {
                        transform: translateY(-7px) rotate(-45deg) !important;
                    }
                    
                    /* Hide navbar container row spacing on mobile */
                    .new-header .navbar {
                        height: 0 !important;
                        min-height: 0 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        border: none !important;
                        background: transparent !important;
                    }
                    
                    /* Mobile Dual Action slant button bar styling */
                    .new-header .mobile-dual-bar {
                        display: flex !important;
                        height: 44px !important;
                        width: 100% !important;
                        background-color: #000 !important;
                        overflow: hidden !important;
                    }
                    
                    .new-header .mobile-dual-left {
                        background-color: #bd1a21 !important;
                        color: #fff !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        gap: 8px !important;
                        font-size: 13px !important;
                        font-weight: 600 !important;
                        text-decoration: none !important;
                        width: 58% !important;
                        height: 100% !important;
                        clip-path: polygon(0 0, 100% 0, calc(100% - 15px) 100%, 0 100%) !important;
                        z-index: 2 !important;
                        padding-right: 10px !important;
                        font-family: 'Inter', sans-serif !important;
                    }
                    
                    .new-header .mobile-dual-left i {
                        font-size: 14px !important;
                    }
                    
                    .new-header .mobile-dual-right {
                        background-color: #000 !important;
                        color: #fff !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        gap: 8px !important;
                        font-size: 13px !important;
                        font-weight: 700 !important;
                        letter-spacing: 0.5px !important;
                        text-transform: uppercase !important;
                        text-decoration: none !important;
                        width: 42% !important;
                        height: 100% !important;
                        margin-left: -15px !important;
                        padding-left: 20px !important;
                        z-index: 1 !important;
                        font-family: 'Montserrat', sans-serif !important;
                    }
                    
                    .new-header .mobile-dual-right i {
                        color: #25d366 !important; /* WhatsApp brand green */
                        font-size: 16px !important;
                    }
                }
`;

function getRelativePrefix(filePath) {
    const relPath = path.relative(rootDir, filePath);
    const parts = relPath.split(path.sep);
    const depth = parts.length - 1;
    return depth > 0 ? '../'.repeat(depth) : '';
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Locate the header block
    const headerStart = content.indexOf('<header class="new-header">');
    if (headerStart === -1) {
        return; // Skip if no header
    }

    const headerEnd = content.indexOf('</header>', headerStart);
    if (headerEnd === -1) {
        console.error(`Error: Malformed header block in ${filePath}`);
        return;
    }

    console.log(`Processing: ${filePath}`);

    // Calculate Prefix for depth
    const prefix = getRelativePrefix(filePath);

    // Extract dynamic location
    const locHighlightMatch = content.match(/<span class="loc-highlight">([\s\S]*?)<\/span>/);
    let locationName = "Mandhar";
    if (locHighlightMatch) {
        locationName = locHighlightMatch[1].trim();
    }
    console.log(`  -> Extracted location: "${locationName}"`);

    // 2. Generate the new header markup
    const newHeaderHTML = `
              <header class="new-header">
                  <!-- Top Bar -->
                  <div class="top-bar">
                      <div class="top-bar-left">
                          <i class="fa-regular fa-envelope"></i> wow@rajuGFX
                      </div>
                      <div class="top-bar-right">
                          <i class="fa-solid fa-phone"></i> +9202542342
                      </div>
                  </div>
          
                  <!-- Middle Header -->
                  <div class="middle-header">
                      <div class="logo">
                          <img 
                            src="${prefix}wp-content/uploads/2025/05/raju_gfx_mandhar_logo.png" 
                            onerror="this.onerror=null; this.src='${prefix}images/whitethemelogo.png';" 
                            alt="Raju GFX Mandhar"
                          >
                      </div>
                      <div class="middle-right">
                          <div class="book-meeting-top">
                              <i class="fa-regular fa-calendar-alt calendar-icon"></i>
                              <button class="btn-book-meeting">Contact us</button>
                          </div>
                          <div class="location">
                               <span class="loc-highlight">${locationName}  </span> <i class="fa-solid fa-location-dot loc-icon"></i>
                          </div>
                      </div>
                      
                      <!-- Mobile Utility Bar -->
                      <div class="mobile-utility-bar">
                          <div class="location-mobile">
                              <i class="fa-solid fa-location-dot loc-icon-red"></i>
                              <span class="loc-name">${locationName}</span>
                              <span class="loc-dropdown-arrow">3</span>
                          </div>
                          <div class="mobile-divider"></div>
                          <a href="tel:+9202542342" class="mobile-call-btn">
                              <i class="fa-solid fa-phone"></i>
                          </a>
                          <div class="mobile-divider"></div>
                          <div class="hamburger-menu" id="hamburger-btn" aria-label="Toggle navigation">
                              <span></span>
                              <span></span>
                              <span></span>
                          </div>
                      </div>
                  </div>

                  <!-- Mobile Dual Action Slanted Button Bar -->
                  <div class="mobile-dual-bar">
                      <a href="${prefix}contact/index.html" class="mobile-dual-left">
                          <i class="fa-regular fa-calendar-alt"></i> Book Meeting
                      </a>
                      <a href="https://wa.me/919202542342" class="mobile-dual-right" target="_blank">
                          <i class="fa-brands fa-whatsapp"></i> WHATSAPP
                      </a>
                  </div>
          
                  <!-- Navbar -->
                  <nav class="navbar">
                      <div class="nav-links">
                          <a href="${prefix}index.html">HOME</a>
                          <a href="${prefix}about/index.html">ABOUT</a>
                          <a href="${prefix}contact/index.html">CONTACT</a>
                          <a href="${prefix}service/index.html">SERVICE</a>
                          <a href="${prefix}portfolio/index.html">PORTFOLIO</a>
                      </div>
                      <div class="nav-whatsapp">
                          <a href="https://wa.me/919202542342">WHATSAPP</a>
                      </div>
                      
                      <!-- Mobile Nav Menu Overlay -->
                      <div class="mobile-nav-menu" id="mobile-menu">
                          <a href="${prefix}index.html">HOME</a>
                          <a href="${prefix}about/index.html">ABOUT</a>
                          <a href="${prefix}contact/index.html">CONTACT</a>
                          <a href="${prefix}service/index.html">SERVICE</a>
                          <a href="${prefix}portfolio/index.html">PORTFOLIO</a>
                      </div>
                  </nav>
              </header>`;

    // 3. Locate the style block preceding this header
    const precedingStyleStart = content.lastIndexOf('<style>', headerStart);
    if (precedingStyleStart !== -1) {
        const precedingStyleEnd = content.indexOf('</style>', precedingStyleStart);
        if (precedingStyleEnd !== -1 && precedingStyleEnd < headerStart) {
            let styleContent = content.substring(precedingStyleStart, precedingStyleEnd + 8);
            
            // Check if our desktop hiding styles are already in there
            if (!styleContent.includes('.new-header .mobile-utility-bar {')) {
                // We will replace the `@media (max-width: 768px)` media query inside this style block
                const mediaQueryRegex = /@media\s*\(max-width:\s*768px\)\s*\{[\s\S]*?\}\s*<\/style>/;
                if (mediaQueryRegex.test(styleContent)) {
                    styleContent = styleContent.replace(mediaQueryRegex, `${newMobileCSS.trim()}\n              </style>`);
                    
                    // Replace the old style block in the main content
                    content = content.substring(0, precedingStyleStart) + styleContent + content.substring(precedingStyleEnd + 8);
                } else {
                    console.log(`  -> Warning: Preceding style tag found but no @media (max-width: 768px) layout inside.`);
                }
            }
        }
    }

    // Now update the header markup
    // Recalculate headerStart in case styles replacement changed offsets
    const finalHeaderStart = content.indexOf('<header class="new-header">');
    const finalHeaderEnd = content.indexOf('</header>', finalHeaderStart);
    if (finalHeaderStart !== -1 && finalHeaderEnd !== -1) {
        content = content.substring(0, finalHeaderStart) + newHeaderHTML.trim() + content.substring(finalHeaderEnd + 9);
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  -> Successfully updated!`);
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file === '.git' || file === 'wp-content' || file === 'wp-includes' || file === 'wp-json' || file === '_https_' || file === 'node_modules') {
                continue;
            }
            walk(fullPath);
        } else if (file === 'index.html') {
            processFile(fullPath);
        }
    }
}

console.log("Starting Mobile Header synchronization...");
walk(rootDir);
console.log("Synchronization complete!");
