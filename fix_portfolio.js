const fs = require('fs');
const path = require('path');
const https = require('https');

const rootDir = __dirname;
const htmlFilePath = path.join(rootDir, 'designflash.in', 'index.html');

// Custom HTML, CSS, and JS to replace the broken portfolio section
const customPortfolioHTML = `
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
            max-height: 480px;
            object-fit: cover;
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
                    <img src="wp-content/uploads/2025/01/RST.png.webp" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&auto=format&fit=crop&q=80';" alt="RS Traders">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">RS Traders</p>
                        <p class="custom-tab-desc">Design Flash elevates RS Traders’ online presence with a dynamic website design tailored for the metal and rod trading industry. Our design showcases RS Traders’ extensive catalog of high-quality metals and rods, emphasizing reliability and precision in every transaction. With intuitive navigation and impactful visuals, Design Flash ensures that RS Traders’ commitment to excellence and customer satisfaction shines through, making the website a vital asset in connecting with stakeholders and expanding market reach.</p>
                        <a href="https://rstbangalore.com/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 1 -->
                <div class="custom-tab-content" id="custom-tab-1">
                    <img src="wp-content/uploads/2024/07/Group-378.png.webp" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80';" alt="Skynet Automation">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">Skynet Automation</p>
                        <p class="custom-tab-desc">Design Flash elevates Sky Net Automation’s online presence with a cutting-edge website design tailored for the automation industry. Our design showcases Sky Net Automation’s innovative solutions and extensive expertise, emphasizing their commitment to technological excellence and customer satisfaction. With intuitive navigation and impactful visuals, Design Flash ensures that Sky Net Automation’s capabilities and achievements are highlighted, providing potential clients with an engaging and informative online experience that reflects their leadership in the automation sector.</p>
                        <a href="https://skynetautomation.com/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 2 -->
                <div class="custom-tab-content" id="custom-tab-2">
                    <img src="wp-content/uploads/2024/07/Group-379.png.webp" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&auto=format&fit=crop&q=80';" alt="Manifest Realty">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">Manifest Realty</p>
                        <p class="custom-tab-desc">Design Flash brings Manifest Reality’s vision for exceptional real estate and construction projects to life through a captivating website design. Our design showcases Manifest Reality’s diverse portfolio, highlighting their commitment to quality and innovation. With intuitive navigation and stunning visuals, Design Flash ensures that Manifest Reality’s expertise and dedication shine through, providing potential clients with a compelling online experience that reflects their leadership in the industry.</p>
                        <a href="https://manifestrealty.in/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 3 -->
                <div class="custom-tab-content" id="custom-tab-3">
                    <img src="wp-content/uploads/2024/10/Baklava-Mockup.png.webp" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop&q=80';" alt="The Baklava Company">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">The Baklava Company</p>
                        <p class="custom-tab-desc">Design Flash brings the delectable world of The Baklava Company to life through a visually stunning and user-friendly website design. Our design showcases The Baklava Company’s exquisite range of traditional and innovative baklava creations, highlighting their dedication to quality and craftsmanship. With rich visuals and intuitive navigation, Design Flash ensures that every visitor can easily explore the variety of flavors and offerings, providing an enticing and enjoyable online experience that reflects The Baklava Company’s passion for delivering sweet perfection.</p>
                        <a href="https://thebaklavacompany.com/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 4 -->
                <div class="custom-tab-content" id="custom-tab-4">
                    <img src="wp-content/uploads/2025/01/BNB-MC.png.webp" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=1000&auto=format&fit=crop&q=80';" alt="Bounce 'n' Build">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">Bounce ‘n’ Build</p>
                        <p class="custom-tab-desc">Design Flash elevates the Bounce n Build brand with a dynamic and engaging website that captures the essence of fun and creativity. Our design integrates bold visuals and intuitive navigation, allowing visitors to easily explore Bounce n Build’s offerings. Whether users are looking to book a service or learn more about the company, Design Flash ensures a seamless and enjoyable experience that reflects Bounce n Build’s commitment to providing a safe and entertaining environment for children.</p>
                        <a href="https://bouncenbuild.com/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 5 -->
                <div class="custom-tab-content" id="custom-tab-5">
                    <img src="wp-content/uploads/2024/10/shifiq-Mockup.png.webp" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=80';" alt="Shafiq Signature">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">Shafiq Signature</p>
                        <p class="custom-tab-desc">Design Flash creates a sophisticated online presence for Shafiq Signature, embodying the brand’s elegance and luxury in every detail. Our design features a clean, modern layout with intuitive navigation, allowing visitors to effortlessly explore the exclusive range of high-end clothing and accessories. With a focus on rich imagery and sleek design elements, Design Flash ensures that the Shafiq Signature website reflects the brand’s commitment to style, quality, and luxury, offering a premium online experience for discerning customers.</p>
                        <a href="https://shafiqsignature.com/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 6 -->
                <div class="custom-tab-content" id="custom-tab-6">
                    <img src="wp-content/uploads/2025/01/Group-441.png.webp" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1000&auto=format&fit=crop&q=80';" alt="BDWC">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">BDWC</p>
                        <p class="custom-tab-desc">Design Flash crafts a professional and user-centric online platform for BDWC, specializing in unsecured loans and financial solutions. Our design emphasizes clarity and accessibility, enabling visitors to easily navigate through services such as loan assistance, credit card information, and personal finance tips. With a modern aesthetic and engaging visuals, Design Flash ensures that BDWC’s commitment to empowering individuals through financial education and support is clearly communicated, providing users with a seamless and informative online experience.</p>
                        <a href="https://bdwc.in/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 7 -->
                <div class="custom-tab-content" id="custom-tab-7">
                    <img src="wp-content/uploads/2025/01/Group-441-2.png.webp" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&auto=format&fit=crop&q=80';" alt="Afifa Foundation">
                    <div class="custom-tab-details">
                        <p class="custom-tab-title">Afifa Foundation</p>
                        <p class="custom-tab-desc">Design Flash develops a compassionate and informative online presence for Afifa Healthcare Development Foundation, dedicated to improving healthcare access in underserved communities. Our design prioritizes user experience and accessibility, allowing visitors to easily navigate through vital programs such as health screenings, telemedicine, and community outreach initiatives. Featuring warm imagery and a clear layout, Design Flash effectively communicates Afifa’s mission to promote equitable healthcare solutions, fostering a sense of trust and community engagement while ensuring that users have a seamless and informative online experience.</p>
                        <a href="https://afifafoundation.com/" target="_blank" class="custom-visit-btn">Visit Website</a>
                    </div>
                </div>

                <!-- Tab 8 -->
                <div class="custom-tab-content" id="custom-tab-8">
                    <img src="wp-content/uploads/2024/11/Airmaster-Mock-up.png.webp" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1000&auto=format&fit=crop&q=80';" alt="Airmaster">
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
`;

const imagesToDownload = [
    // 9 Portfolio Mockup Images
    { url: "https://designflash.in/wp-content/uploads/2025/01/RST.png.webp", dest: "wp-content/uploads/2025/01/RST.png.webp" },
    { url: "https://designflash.in/wp-content/uploads/2024/07/Group-378.png.webp", dest: "wp-content/uploads/2024/07/Group-378.png.webp" },
    { url: "https://designflash.in/wp-content/uploads/2024/07/Group-379.png.webp", dest: "wp-content/uploads/2024/07/Group-379.png.webp" },
    { url: "https://designflash.in/wp-content/uploads/2024/10/Baklava-Mockup.png.webp", dest: "wp-content/uploads/2024/10/Baklava-Mockup.png.webp" },
    { url: "https://designflash.in/wp-content/uploads/2025/01/BNB-MC.png.webp", dest: "wp-content/uploads/2025/01/BNB-MC.png.webp" },
    { url: "https://designflash.in/wp-content/uploads/2024/10/shifiq-Mockup.png.webp", dest: "wp-content/uploads/2024/10/shifiq-Mockup.png.webp" },
    { url: "https://designflash.in/wp-content/uploads/2025/01/Group-441.png.webp", dest: "wp-content/uploads/2025/01/Group-441.png.webp" },
    { url: "https://designflash.in/wp-content/uploads/2025/01/Group-441-2.png.webp", dest: "wp-content/uploads/2025/01/Group-441-2.png.webp" },
    { url: "https://designflash.in/wp-content/uploads/2024/11/Airmaster-Mock-up.png.webp", dest: "wp-content/uploads/2024/11/Airmaster-Mock-up.png.webp" },
    
    // 6 Services Images ("We’re ready to share our advice...")
    { url: "https://designflash.in/wp-content/uploads/2024/10/web-design-1.jpg.webp", dest: "wp-content/uploads/2024/10/web-design-1.jpg.webp" },
    { url: "https://designflash.in/wp-content/uploads/2024/10/Branding.jpg.webp", dest: "wp-content/uploads/2024/10/Branding.jpg.webp" },
    { url: "https://designflash.in/wp-content/uploads/2024/10/Online-ad.jpg.webp", dest: "wp-content/uploads/2024/10/Online-ad.jpg.webp" },
    { url: "https://designflash.in/wp-content/uploads/2024/10/seo-1.jpg.webp", dest: "wp-content/uploads/2024/10/seo-1.jpg.webp" },
    { url: "https://designflash.in/wp-content/uploads/2024/10/social-media.jpg.webp", dest: "wp-content/uploads/2024/10/social-media.jpg.webp" },
    { url: "https://designflash.in/wp-content/uploads/2024/10/ui_ux-designing.jpg.webp", dest: "wp-content/uploads/2024/10/ui_ux-designing.jpg.webp" }
];

function downloadFile(url, destPath) {
    return new Promise((resolve, reject) => {
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        const file = fs.createWriteStream(destPath);
        
        // Add a User-Agent header so the server doesn't reject us as a bot
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };

        https.get(url, options, (response) => {
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

function findClosingDivIndex(html, startIndex) {
    let depth = 1;
    const regex = /<\/?div\b[^>]*>/gi;
    
    const tagMatch = /<div\b[^>]*>/i.exec(html.substring(startIndex));
    if (!tagMatch) return -1;
    
    regex.lastIndex = startIndex + tagMatch.index + tagMatch[0].length;
    
    let match;
    while ((match = regex.exec(html)) !== null) {
        const tag = match[0];
        if (tag.startsWith('</')) {
            depth--;
            if (depth === 0) {
                return match.index + tag.length;
            }
        } else if (!tag.endsWith('/>')) { // Opening tag
            depth++;
        }
    }
    return -1;
}

async function run() {
    if (!fs.existsSync(htmlFilePath)) {
        console.error("index.html not found at " + htmlFilePath);
        process.exit(1);
    }

    console.log("Reading index.html...");
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // ==================== PART 1: REPLACE PORTFOLIO SECTION ====================
    const sectionStartRegex = /<div[^>]*class="[^"]*et_pb_section_7[^"]*"/i;
    const match = sectionStartRegex.exec(htmlContent);

    if (!match) {
        console.log("Could not find et_pb_section_7. Checking if custom section is already there...");
        if (htmlContent.includes('id="custom-portfolio-section"')) {
            console.log("Already replaced! Updating it...");
            htmlContent = htmlContent.replace(/<!-- ==================== CUSTOM PORTFOLIO SECTION ==================== -->[\s\S]*?<!-- ==================== END CUSTOM PORTFOLIO SECTION ==================== -->/, customPortfolioHTML);
            fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
            console.log("Successfully updated the custom portfolio section!");
        } else {
            console.warn("Warning: Could not find the Website Portfolio section in index.html");
        }
    } else {
        const startIndex = match.index;
        console.log("Found start of Portfolio section at index:", startIndex);

        const endIndex = findClosingDivIndex(htmlContent, startIndex);
        
        if (endIndex === -1) {
            console.error("Error: Could not find the matching closing tag of the portfolio section!");
            process.exit(1);
        }

        console.log("Found matching end of Portfolio section at index:", endIndex);
        
        console.log("Replacing broken Divi portfolio section with custom responsive tabs...");
        htmlContent = htmlContent.substring(0, startIndex) + customPortfolioHTML + htmlContent.substring(endIndex);
    }

    // ==================== PART 2: FIX SERVICES IMAGE PATHS ====================
    console.log("\nFixing image path references in Services Section...");
    const servicesImages = [
        "web-design-1",
        "Branding",
        "Online-ad",
        "seo-1",
        "social-media",
        "ui_ux-designing"
    ];

    servicesImages.forEach(imgName => {
        // Find any occurrences of the image with .html or remote URL and change to the local .jpg.webp
        const srcPattern = new RegExp(`src="[^"]*${imgName}[^"]*"`, 'gi');
        htmlContent = htmlContent.replace(srcPattern, `src="wp-content/uploads/2024/10/${imgName}.jpg.webp" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80';"`);

        const srcsetPattern = new RegExp(`srcset="[^"]*${imgName}[^"]*"`, 'gi');
        htmlContent = htmlContent.replace(srcsetPattern, `srcset="wp-content/uploads/2024/10/${imgName}.jpg.webp"`);
    });

    fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
    console.log("HTML file successfully modified!");

    // ==================== PART 3: DOWNLOAD IMAGES ====================
    console.log("\nDownloading all portfolio and service images directly into mirrored folders...");
    const destDirBase = path.join(rootDir, 'designflash.in');
    
    for (let i = 0; i < imagesToDownload.length; i++) {
        const img = imagesToDownload[i];
        const localDestPath = path.join(destDirBase, img.dest);
        console.log(`[${i+1}/${imagesToDownload.length}] Downloading: ${img.url} -> ${img.dest}`);
        try {
            if (fs.existsSync(localDestPath)) {
                // Keep the file if it's already there and not corrupted (size > 100 bytes)
                const stat = fs.statSync(localDestPath);
                if (stat.size > 100) {
                    console.log("  -> ALREADY EXISTS (SKIPPING)");
                    continue;
                }
                fs.unlinkSync(localDestPath);
            }
            await downloadFile(img.url, localDestPath);
            console.log("  -> SUCCESS!");
        } catch (e) {
            console.log(`  -> FAILED: ${e.message}`);
        }
    }

    console.log("\nAll operations completed successfully! Refresh your browser to verify.");
}

run();
