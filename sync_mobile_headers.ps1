# PowerShell Header and Style Sync Script for Raju GFX mobile header recreation
$rootDir = Get-Item .

function Get-RelativePrefix($file) {
    $relPath = Resolve-Path -Path $file -Relative
    # Clean leading ".\"
    $cleanPath = $relPath -replace '^\.\\', ''
    $parts = $cleanPath -split '\\'
    $depth = $parts.Length - 1
    if ($depth -gt 0) {
        return "../" * $depth
    } else {
        return ""
    }
}

function Process-HTMLFile($file) {
    Write-Host "Processing: $file"
    $content = [System.IO.File]::ReadAllText($file)
    
    $headerStart = $content.IndexOf('<header class="new-header">')
    if ($headerStart -eq -1) {
        Write-Host "  -> Skipping: No custom header found."
        return
    }

    $headerEnd = $content.IndexOf('</header>', $headerStart)
    if ($headerEnd -eq -1) {
        Write-Warning "  -> Error: Malformed header block."
        return
    }

    # 1. Determine Relative Prefix
    $prefix = Get-RelativePrefix($file)
    Write-Host "  -> Depth prefix: '$prefix'"

    # 2. Extract Location name
    $locMatch = [regex]::Match($content, '<span class="loc-highlight">([\s\S]*?)</span>')
    $locationName = "Mandhar"
    if ($locMatch.Success) {
        $locationName = $locMatch.Groups[1].Value.Trim()
    }
    Write-Host "  -> Location: '$locationName'"

    # 3. Define Mobile Styles
    $newMobileCSS = @"
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
              </style>
"@

    # 4. Generate New Header HTML
    $newHeaderHTML = @"
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
              </header>
"@

    # 5. Process CSS update
    $headerIndex = $content.IndexOf('<header class="new-header">')
    $precedingStyleStart = $content.LastIndexOf('<style>', $headerIndex)
    if ($precedingStyleStart -ne -1) {
        $precedingStyleEnd = $content.IndexOf('</style>', $precedingStyleStart)
        if ($precedingStyleEnd -ne -1 -and $precedingStyleEnd -lt $headerIndex) {
            $styleBlock = $content.Substring($precedingStyleStart, $precedingStyleEnd - $precedingStyleStart + 8)
            
            if (-not $styleBlock.Contains('.new-header .mobile-utility-bar {')) {
                $mediaQueryRegex = [regex]'@media\s*\(max-width:\s*768px\)\s*\{[\s\S]*?\}\s*</style>'
                if ($mediaQueryRegex.IsMatch($styleBlock)) {
                    $newStyleBlock = $mediaQueryRegex.Replace($styleBlock, $newMobileCSS)
                    $content = $content.Substring(0, $precedingStyleStart) + $newStyleBlock + $content.Substring($precedingStyleEnd + 8)
                    Write-Host "  -> Preceding inline styles updated!"
                } else {
                    Write-Host "  -> Preceding style tag found but no @media (max-width: 768px) section inside."
                }
            } else {
                Write-Host "  -> Mobile styles already present in stylesheet."
            }
        }
    }

    # 6. Process Header HTML update
    # Recalculate headerIndex in case stylesheet replacement modified indices
    $finalHeaderStart = $content.IndexOf('<header class="new-header">')
    $finalHeaderEnd = $content.IndexOf('</header>', $finalHeaderStart)
    if ($finalHeaderStart -ne -1 -and $finalHeaderEnd -ne -1) {
        $content = $content.Substring(0, $finalHeaderStart) + $newHeaderHTML.Trim() + $content.Substring($finalHeaderEnd + 9)
        Write-Host "  -> Header markup replaced!"
    }

    [System.IO.File]::WriteAllText($file, $content)
    Write-Host "  -> File written successfully!"
}

# Recursively walk pages
$files = Get-ChildItem -Path . -Filter "index.html" -Recurse
foreach ($file in $files) {
    $filePath = $file.FullName
    
    # Exclude directories
    if ($filePath -like "*\.git\*" -or $filePath -like "*\wp-content\*" -or $filePath -like "*\wp-includes\*" -or $filePath -like "*\wp-json\*" -or $filePath -like "*\_https_\*" -or $filePath -like "*\node_modules\*") {
        continue
    }
    
    # Skip if file size is 0 (empty subpage placeholders)
    if ($file.Length -eq 0) {
        Write-Host "Skipping empty file: $filePath"
        continue
    }

    Process-HTMLFile -file $filePath
}

Write-Host "Synchronization finished!"
