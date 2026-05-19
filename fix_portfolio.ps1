$htmlPath = Join-Path $PSScriptRoot "designflash.in\index.html"

if (-not (Test-Path $htmlPath)) {
    Write-Error "Error: designflash.in\index.html not found! Please make sure this script is in the root directory."
    Exit
}

Write-Host "Reading index.html..."
$htmlContent = [System.IO.File]::ReadAllText($htmlPath)

# Custom HTML, CSS, and JS to replace the broken portfolio section
$customPortfolioHTML = @"
<!-- ==================== CUSTOM PORTFOLIO SECTION ==================== -->
<div id="custom-portfolio-section" class="et_pb_section et_pb_section_7 et_pb_with_background et_section_regular" style="background-color: #f7f7f7; padding: 60px 0;">
    <style>
        .custom-portfolio-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            font-family: 'Poppins', 'Montserrat', sans-serif;
        }
        .custom-portfolio-header {
            margin-bottom: 40px;
            text-align: left;
        }
        .custom-portfolio-header h2 {
            font-size: 32px;
            font-weight: 800;
            color: #000000;
            margin-bottom: 15px;
            text-transform: uppercase;
        }
        .custom-portfolio-header p {
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
            max-width: 1000px;
        }
        .custom-portfolio-wrapper {
            display: flex;
            background-color: #ffffff;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            border-radius: 4px;
            overflow: hidden;
        }
        .custom-portfolio-tabs {
            flex: 0 0 280px;
            background-color: #000000;
            display: flex;
            flex-direction: column;
        }
        .custom-tab-btn {
            background-color: transparent;
            color: #ffffff;
            border: none;
            text-align: left;
            padding: 22px 25px;
            font-size: 15px;
            font-weight: 700;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .custom-tab-btn:last-child {
            border-bottom: none;
        }
        .custom-tab-btn:hover {
            background-color: #1a1a1a;
        }
        .custom-tab-btn.active {
            background-color: #c1121f !important;
            color: #ffffff !important;
            position: relative;
        }
        .custom-tab-btn.active::after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid #ffffff;
        }
        .custom-portfolio-content-area {
            flex: 1;
            background-color: #ffffff;
            min-height: 500px;
        }
        .custom-tab-content {
            display: none;
            animation: customFadeIn 0.5s ease-in-out;
        }
        .custom-tab-content.active {
            display: block;
        }
        .custom-tab-content img {
            width: 100%;
            height: auto;
            display: block;
        }
        .custom-tab-details {
            padding: 40px;
        }
        .custom-tab-title {
            font-size: 24px;
            font-weight: 800;
            color: #000000;
            margin-bottom: 15px;
        }
        .custom-tab-desc {
            font-size: 16px;
            line-height: 1.7;
            color: #555555;
            margin-bottom: 30px;
        }
        .custom-visit-btn {
            display: inline-block;
            background-color: #c1121f;
            color: #ffffff !important;
            text-decoration: none !important;
            padding: 12px 30px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 4px;
            transition: background-color 0.3s ease;
        }
        .custom-visit-btn:hover {
            background-color: #a00f1a;
        }
        @keyframes customFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
            .custom-portfolio-wrapper {
                flex-direction: column;
            }
            .custom-portfolio-tabs {
                flex: none;
                width: 100%;
            }
            .custom-tab-btn.active::after {
                display: none;
            }
        }
    </style>

    <div class="custom-portfolio-container">
        <div class="custom-portfolio-header">
            <h2>Website Portfolio</h2>
            <p>At Design Flash, we pride ourselves on delivering high-quality, innovative web solutions tailored to meet the unique needs of our clients. Our portfolio showcases diverse projects highlighting our clients' unique needs, our expertise, creativity, and commitment to excellence. Here are some of our notable works:</p>
        </div>

        <div class="custom-portfolio-wrapper">
            <div class="custom-portfolio-tabs">
                <button class="custom-tab-btn active" onclick="switchCustomTab(event, 'custom-tab-0')">Rs Traders</button>
                <button class="custom-tab-btn" onclick="switchCustomTab(event, 'custom-tab-1')">Skynet Automation</button>
                <button class="custom-tab-btn" onclick="switchCustomTab(event, 'custom-tab-2')">Manifest Realty</button>
                <button class="custom-tab-btn" onclick="switchCustomTab(event, 'custom-tab-3')">The Baklava Company</button>
                <button class="custom-tab-btn" onclick="switchCustomTab(event, 'custom-tab-4')">Bounce ‘n’ Build</button>
                <button class="custom-tab-btn" onclick="switchCustomTab(event, 'custom-tab-5')">Shafiq Signature</button>
                <button class="custom-tab-btn" onclick="switchCustomTab(event, 'custom-tab-6')">BDWC</button>
                <button class="custom-tab-btn" onclick="switchCustomTab(event, 'custom-tab-7')">Afifa Foundation</button>
                <button class="custom-tab-btn" onclick="switchCustomTab(event, 'custom-tab-8')">Airmaster</button>
            </div>

            <div class="custom-portfolio-content-area">
                <!-- Tab 0 -->
                <div class="custom-tab-content active" id="custom-tab-0">
                    <img src="wp-content/uploads/2025/01/RST.png.webp" alt="RS Traders">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">RS Traders</p>
                        <p class="custom-tab-desc">Design Flash elevates RS Traders’ online presence with a dynamic website design tailored for the metal and rod trading industry. Our design showcases RS Traders’ extensive catalog of high-quality metals and rods, emphasizing reliability and precision in every transaction. With intuitive navigation and impactful visuals, Design Flash ensures that RS Traders’ commitment to excellence and customer satisfaction shines through, making the website a vital asset in connecting with stakeholders and expanding market reach.</p>
                        <a href="https://rstbangalore.com/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 1 -->
                <div class="custom-tab-content" id="custom-tab-1">
                    <img src="wp-content/uploads/2024/07/Group-378.png.webp" alt="Skynet Automation">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">Skynet Automation</p>
                        <p class="custom-tab-desc">Design Flash elevates Sky Net Automation’s online presence with a cutting-edge website design tailored for the automation industry. Our design showcases Sky Net Automation’s innovative solutions and extensive expertise, emphasizing their commitment to technological excellence and customer satisfaction. With intuitive navigation and impactful visuals, Design Flash ensures that Sky Net Automation’s capabilities and achievements are highlighted, providing potential clients with an engaging and informative online experience that reflects their leadership in the automation sector.</p>
                        <a href="https://skynetautomation.com/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 2 -->
                <div class="custom-tab-content" id="custom-tab-2">
                    <img src="wp-content/uploads/2024/07/Group-379.png.webp" alt="Manifest Realty">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">Manifest Realty</p>
                        <p class="custom-tab-desc">Design Flash brings Manifest Reality’s vision for exceptional real estate and construction projects to life through a captivating website design. Our design showcases Manifest Reality’s diverse portfolio, highlighting their commitment to quality and innovation. With intuitive navigation and stunning visuals, Design Flash ensures that Manifest Reality’s expertise and dedication shine through, providing potential clients with a compelling online experience that reflects their leadership in the industry.</p>
                        <a href="https://manifestrealty.in/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 3 -->
                <div class="custom-tab-content" id="custom-tab-3">
                    <img src="wp-content/uploads/2024/10/Baklava-Mockup.png.webp" alt="The Baklava Company">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">The Baklava Company</p>
                        <p class="custom-tab-desc">Design Flash brings the delectable world of The Baklava Company to life through a visually stunning and user-friendly website design. Our design showcases The Baklava Company’s exquisite range of traditional and innovative baklava creations, highlighting their dedication to quality and craftsmanship. With rich visuals and intuitive navigation, Design Flash ensures that every visitor can easily explore the variety of flavors and offerings, providing an enticing and enjoyable online experience that reflects The Baklava Company’s passion for delivering sweet perfection.</p>
                        <a href="https://thebaklavacompany.com/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 4 -->
                <div class="custom-tab-content" id="custom-tab-4">
                    <img src="wp-content/uploads/2025/01/BNB-MC.png.webp" alt="Bounce 'n' Build">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">Bounce ‘n’ Build</p>
                        <p class="custom-tab-desc">Design Flash elevates the Bounce n Build brand with a dynamic and engaging website that captures the essence of fun and creativity. Our design integrates bold visuals and intuitive navigation, allowing visitors to easily explore Bounce n Build’s offerings. Whether users are looking to book a service or learn more about the company, Design Flash ensures a seamless and enjoyable experience that reflects Bounce n Build’s commitment to providing a safe and entertaining environment for children.</p>
                        <a href="https://bouncenbuild.com/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 5 -->
                <div class="custom-tab-content" id="custom-tab-5">
                    <img src="wp-content/uploads/2024/10/shifiq-Mockup.png.webp" alt="Shafiq Signature">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">Shafiq Signature</p>
                        <p class="custom-tab-desc">Design Flash creates a sophisticated online presence for Shafiq Signature, embodying the brand’s elegance and luxury in every detail. Our design features a clean, modern layout with intuitive navigation, allowing visitors to effortlessly explore the exclusive range of high-end clothing and accessories. With a focus on rich imagery and sleek design elements, Design Flash ensures that the Shafiq Signature website reflects the brand’s commitment to style, quality, and luxury, offering a premium online experience for discerning customers.</p>
                        <a href="https://shafiqsignature.com/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 6 -->
                <div class="custom-tab-content" id="custom-tab-6">
                    <img src="wp-content/uploads/2025/01/Group-441.png.webp" alt="BDWC">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">BDWC</p>
                        <p class="custom-tab-desc">Design Flash crafts a professional and user-centric online platform for BDWC, specializing in unsecured loans and financial solutions. Our design emphasizes clarity and accessibility, enabling visitors to easily navigate through services such as loan assistance, credit card information, and personal finance tips. With a modern aesthetic and engaging visuals, Design Flash ensures that BDWC’s commitment to empowering individuals through financial education and support is clearly communicated, providing users with a seamless and informative online experience.</p>
                        <a href="https://bdwc.in/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 7 -->
                <div class="custom-tab-content" id="custom-tab-7">
                    <img src="wp-content/uploads/2025/01/Group-441-2.png.webp" alt="Afifa Foundation">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">Afifa Foundation</p>
                        <p class="custom-tab-desc">Design Flash develops a compassionate and informative online presence for Afifa Healthcare Development Foundation, dedicated to improving healthcare access in underserved communities. Our design prioritizes user experience and accessibility, allowing visitors to easily navigate through vital programs such as health screenings, telemedicine, and community outreach initiatives. Featuring warm imagery and a clear layout, Design Flash effectively communicates Afifa’s mission to promote equitable healthcare solutions, fostering a sense of trust and community engagement while ensuring that users have a seamless and informative online experience.</p>
                        <a href="https://afifafoundation.com/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 8 -->
                <div class="custom-tab-content" id="custom-tab-8">
                    <img src="wp-content/uploads/2024/11/Airmaster-Mock-up.png.webp" alt="Airmaster">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">Airmaster</p>
                        <p class="custom-tab-desc">Design Flash transforms Airmaster’s digital presence with a sleek, functional website crafted for the HVAC industry. The design highlights Airmaster’s wide range of air distribution products and services, emphasizing innovation and precision. With user-friendly navigation and engaging visuals, Design Flash ensures that Airmaster’s commitment to quality and performance resonates with its audience, making the website a cornerstone for building trust and driving business growth.</p>
                        <a href="https://airmaster.co.in/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function switchCustomTab(evt, tabId) {
            const tabContents = document.querySelectorAll('.custom-tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            const tabButtons = document.querySelectorAll('.custom-tab-btn');
            tabButtons.forEach(button => {
                button.classList.remove('active');
            });

            document.getElementById(tabId).classList.add('active');
            evt.currentTarget.classList.add('active');
        }
    </script>
</div>
<!-- ==================== END CUSTOM PORTFOLIO SECTION ==================== -->
"@

Write-Host "Finding the broken Website Portfolio section inside index.html..."
$target = "difl_advancedtab"
$index = $htmlContent.IndexOf($target)

if ($index -eq -1) {
    if ($htmlContent.Contains("custom-portfolio-section")) {
        Write-Host "Portfolio already replaced! Updating it..."
        $htmlContent = $htmlContent -replace '(?s)<!-- ==================== CUSTOM PORTFOLIO SECTION ==================== -->.*?<!-- ==================== END CUSTOM PORTFOLIO SECTION ==================== -->', $customPortfolioHTML
        [System.IO.File]::WriteAllText($htmlPath, $htmlContent)
        Write-Host "Update successful!"
    } else {
        Write-Error "Could not find 'difl_advancedtab' block in index.html!"
        Exit
    }
} else {
    # Find the starting section element
    $beforeString = $htmlContent.Substring(0, $index)
    $sectionStartIndex = $beforeString.LastIndexOf('<div class="et_pb_section')

    if ($sectionStartIndex -eq -1) {
        Write-Error "Could not find the beginning of the section!"
        Exit
    }

    # Find the end of this Divi section
    $afterString = $htmlContent.Substring($index)
    $sectionEndRelativeIndex = $afterString.IndexOf('<!-- .et_pb_section -->')
    
    if ($sectionEndRelativeIndex -ne -1) {
        $sectionEndIndex = $index + $sectionEndRelativeIndex + '<!-- .et_pb_section -->'.Length
    } else {
        $divCloseRelativeIndex = $afterString.IndexOf("</div>`r`n</div>`r`n</div>")
        if ($divCloseRelativeIndex -eq -1) {
            $divCloseRelativeIndex = $afterString.IndexOf("</div>`n</div>`n</div>")
        }
        
        if ($divCloseRelativeIndex -ne -1) {
            $sectionEndIndex = $index + $divCloseRelativeIndex + "</div>`n</div>`n</div>".Length
        } else {
            Write-Error "Could not find the end of the section!"
            Exit
        }
    }

    Write-Host "Replacing the section..."
    $original = $htmlContent.Substring($sectionStartIndex, ($sectionEndIndex - $sectionStartIndex))
    
    $htmlContent = $htmlContent.Substring(0, $sectionStartIndex) + $customPortfolioHTML + $htmlContent.Substring($sectionEndIndex)
    [System.IO.File]::WriteAllText($htmlPath, $htmlContent)
    Write-Host "Successfully replaced the broken Divi tabs with a premium custom responsive layout!"
}

# Image Downloading
$images = @(
    @{ url = "https://designflash.in/wp-content/uploads/2025/01/RST.png.webp"; dest = "wp-content\uploads\2025\01\RST.png.webp" },
    @{ url = "https://designflash.in/wp-content/uploads/2024/07/Group-378.png.webp"; dest = "wp-content\uploads\2024\07\Group-378.png.webp" },
    @{ url = "https://designflash.in/wp-content/uploads/2024/07/Group-379.png.webp"; dest = "wp-content\uploads\2024\07\Group-379.png.webp" },
    @{ url = "https://designflash.in/wp-content/uploads/2024/10/Baklava-Mockup.png.webp"; dest = "wp-content\uploads\2024\10\Baklava-Mockup.png.webp" },
    @{ url = "https://designflash.in/wp-content/uploads/2025/01/BNB-MC.png.webp"; dest = "wp-content\uploads\2025\01\BNB-MC.png.webp" },
    @{ url = "https://designflash.in/wp-content/uploads/2024/10/shifiq-Mockup.png.webp"; dest = "wp-content\uploads\2024\10\shifiq-Mockup.png.webp" },
    @{ url = "https://designflash.in/wp-content/uploads/2025/01/Group-441.png.webp"; dest = "wp-content\uploads\2025\01\Group-441.png.webp" },
    @{ url = "https://designflash.in/wp-content/uploads/2025/01/Group-441-2.png.webp"; dest = "wp-content\uploads\2025\01\Group-441-2.png.webp" },
    @{ url = "https://designflash.in/wp-content/uploads/2024/11/Airmaster-Mock-up.png.webp"; dest = "wp-content\uploads\2024\11\Airmaster-Mock-up.png.webp" }
)

Write-Host "`nDownloading 9 high-quality mockup images locally..."
$baseDir = Join-Path $PSScriptRoot "designflash.in"

for ($i = 0; $i -lt $images.Count; $i++) {
    $img = $images[$i]
    $dest = Join-Path $baseDir $img.dest
    $parent = Split-Path $dest
    
    if (-not (Test-Path $parent)) {
        New-Item -ItemType Directory -Force -Path $parent | Out-Null
    }

    Write-Host ("[" + ($i+1) + "/9] Downloading: " + $img.url)
    
    try {
        if (Test-Path $dest) {
            Remove-Item $dest -Force
        }
        Invoke-WebRequest -Uri $img.url -OutFile $dest -TimeoutSec 30
        Write-Host "  -> SUCCESS!" -ForegroundColor Green
    } catch {
        Write-Host "  -> FAILED: $_" -ForegroundColor Red
    }
}

Write-Host "`nPortfolio fix completed! Open designflash.in\index.html in your web browser." -ForegroundColor Green
