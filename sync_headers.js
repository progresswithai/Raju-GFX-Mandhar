const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'designflash.in');

function getRelativePrefix(depth) {
    return '../'.repeat(depth);
}

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
            syncHeaderForPage(fullPath, depth);
        }
    });
}

function syncHeaderForPage(filePath, depth) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const headerStart = content.indexOf('<header class="new-header">');
    if (headerStart === -1) {
        return; // Skip pages without the custom header
    }
    
    const headerEnd = content.indexOf('</header>', headerStart);
    if (headerEnd === -1) {
        console.warn(`Warning: Malformed header in ${filePath}`);
        return;
    }
    
    let headerBlock = content.substring(headerStart, headerEnd + 9);
    const prefix = getRelativePrefix(depth);
    
    // Reconstruct <nav class="navbar">...</nav> completely and uniformly
    const reconstructedNavbar = `
                  <!-- Navbar -->
                  <nav class="navbar">
                      <!-- Hamburger Menu Icon -->
                      <div class="hamburger-menu" id="hamburger-btn" aria-label="Toggle navigation">
                          <span></span>
                          <span></span>
                          <span></span>
                      </div>
                      
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
              `;

    // Locate the <nav class="navbar"> block and replace it
    const navStart = headerBlock.indexOf('<nav class="navbar">');
    const navEnd = headerBlock.indexOf('</nav>', navStart);
    
    if (navStart !== -1 && navEnd !== -1) {
        const originalNavbar = headerBlock.substring(navStart, navEnd + 6);
        headerBlock = headerBlock.replace(originalNavbar, reconstructedNavbar.trim());
    } else {
        // If navbar block is missing, append it inside header block before </header>
        console.log(`  -> Injecting reconstructed navbar block into ${filePath}`);
        headerBlock = headerBlock.replace('</header>', `${reconstructedNavbar}\n              </header>`);
    }
    
    // Now verify the <script> block immediately following </header>
    let afterHeaderIndex = headerEnd + 9;
    let postHeaderContent = content.substring(afterHeaderIndex);
    
    // We want the script tag:
    const scriptTag = `
              <script>
                document.addEventListener('DOMContentLoaded', () => {
                    const hamburgerBtn = document.getElementById('hamburger-btn');
                    const mobileMenu = document.getElementById('mobile-menu');
                    
                    if (hamburgerBtn && mobileMenu) {
                        hamburgerBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            hamburgerBtn.classList.toggle('active');
                            mobileMenu.classList.toggle('active');
                        });
                        
                        // Close menu when clicking outside
                        document.addEventListener('click', (e) => {
                            if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                                hamburgerBtn.classList.remove('active');
                                mobileMenu.classList.remove('active');
                            }
                        });
                        
                        // Close menu when clicking any nav link
                        const mobileLinks = mobileMenu.querySelectorAll('a');
                        mobileLinks.forEach(link => {
                            link.addEventListener('click', () => {
                                hamburgerBtn.classList.remove('active');
                                mobileMenu.classList.remove('active');
                            });
                        });
                    }
                });
              </script>`;
              
    // Check if the script block exists within the next 500 characters of the page content
    const sampleText = postHeaderContent.substring(0, 500);
    const hasScript = sampleText.includes('hamburger-btn') && sampleText.includes('mobile-menu') && sampleText.includes('addEventListener');
    
    let updatedContent;
    if (!hasScript) {
        console.log(`  -> Injecting DOM toggler script into ${filePath}`);
        updatedContent = content.substring(0, headerStart) + headerBlock + "\n" + scriptTag.trim() + "\n" + postHeaderContent;
    } else {
        updatedContent = content.substring(0, headerStart) + headerBlock + postHeaderContent;
    }
    
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Successfully synced and refined header + script for: ${filePath}`);
}

console.log("=== COMPREHENSIVE HEADER & RESPONSIVE SCRIPT SYNC SYSTEM ===");
processDirectory(targetDir);
console.log("✅ ALL PAGE HEADERS AND SCRIPTS SYNCED PERFECTLY!");
