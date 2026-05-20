const fs = require('fs');
const path = require('path');

const servicePagePath = path.join(__dirname, 'designflash.in', 'service', 'index.html');

if (!fs.existsSync(servicePagePath)) {
    console.error("❌ Error: service/index.html does not exist! Please run create_service_page.js first.");
    process.exit(1);
}

let content = fs.readFileSync(servicePagePath, 'utf8');

// Define the gorgeous styles and HTML for the Event Showcase section
const eventShowcaseSectionHtml = `
              <!-- Event Showcase Section -->
              <style>
                .event-showcase {
                  background: #09090b;
                  padding: 80px 20px;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                  position: relative;
                }
                .event-showcase .container {
                  max-width: 1200px;
                  margin: 0 auto;
                }
                .event-showcase .section-title {
                  text-align: center;
                  margin-bottom: 40px;
                }
                .event-showcase .section-title h2 {
                  font-size: 38px;
                  font-weight: 800;
                  color: #ffffff;
                  margin-bottom: 15px;
                  letter-spacing: -0.5px;
                }
                .event-showcase .section-title p {
                  font-size: 16px;
                  color: #94a3b8;
                  max-width: 600px;
                  margin: 0 auto;
                  line-height: 1.6;
                }
                .event-showcase .filter-controls {
                  display: flex;
                  justify-content: center;
                  gap: 12px;
                  margin-bottom: 40px;
                  flex-wrap: wrap;
                }
                .event-showcase .filter-controls button {
                  background: rgba(255, 255, 255, 0.03);
                  border: 1px solid rgba(255, 255, 255, 0.08);
                  color: #94a3b8;
                  padding: 10px 24px;
                  border-radius: 30px;
                  font-weight: 600;
                  font-size: 14px;
                  cursor: pointer;
                  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .event-showcase .filter-controls button:hover {
                  background: rgba(255, 255, 255, 0.08);
                  color: #ffffff;
                  border-color: rgba(255, 255, 255, 0.15);
                }
                .event-showcase .filter-controls button.active {
                  background: #a5b4fc;
                  border-color: #a5b4fc;
                  color: #09090b;
                  box-shadow: 0 4px 14px rgba(165, 180, 252, 0.3);
                }
                .event-showcase .gallery-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                  gap: 24px;
                }
                .event-showcase .gallery-item {
                  position: relative;
                  height: 240px;
                  border-radius: 16px;
                  overflow: hidden;
                  border: 1px solid rgba(255, 255, 255, 0.05);
                  background: linear-gradient(135deg, #14141a 0%, #0d0d11 100%);
                  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                /* Layout state logic for smooth filtering animations */
                .event-showcase .gallery-item.hidden-item {
                  display: none;
                  opacity: 0;
                  transform: scale(0.9);
                }
                .event-showcase .gallery-item.visible-item {
                  display: block;
                  animation: fadeInScale 0.4s forwards cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                @keyframes fadeInScale {
                  from { opacity: 0; transform: scale(0.9); }
                  to { opacity: 1; transform: scale(1); }
                }
                
                .event-showcase .gallery-item img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                  position: relative;
                  z-index: 1;
                }
                
                /* Premium background placeholder styled elegantly if the image fails or is missing */
                .event-showcase .gallery-item::after {
                  content: '📷 Image Pending';
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 13px;
                  font-weight: 600;
                  color: rgba(255, 255, 255, 0.15);
                  background: linear-gradient(135deg, #161622 0%, #0a0a0f 100%);
                  z-index: 0;
                  border-radius: 16px;
                }
                
                .event-showcase .gallery-item:hover img {
                  transform: scale(1.08);
                }
                
                .event-showcase .gallery-item-overlay {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(to top, rgba(9, 9, 11, 0.95) 0%, rgba(9, 9, 11, 0.4) 60%, transparent 100%);
                  padding: 24px;
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  z-index: 2;
                  transition: all 0.3s;
                }
                .event-showcase .gallery-item-overlay h5 {
                  font-size: 16px;
                  font-weight: 700;
                  color: #ffffff;
                  margin: 0 0 6px 0;
                  line-height: 1.3;
                  transition: transform 0.3s;
                }
                .event-showcase .gallery-item-overlay p {
                  font-size: 12px;
                  color: #a5b4fc;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  margin: 0;
                }
                .event-showcase .gallery-item:hover .gallery-item-overlay h5 {
                  transform: translateY(-2px);
                  color: #a5b4fc;
                }
              </style>

              <section class="event-showcase">
                <div class="container">
                  <div class="section-title">
                    <h2>Work Showcase</h2>
                    <p>Explore our diverse portfolio of premium creative work. From pixel-perfect graphics and cinematic videos to stunning photography and viral social campaigns, we bring visions to life.</p>
                  </div>
                  <div class="filter-controls">
                    <button type="button" class="active" data-filter="all">All</button>
                    <button type="button" data-filter="graphics-design">Graphics Design</button>
                    <button type="button" data-filter="video-editing">Video Editing</button>
                    <button type="button" data-filter="photography">Photography</button>
                    <button type="button" data-filter="social-media">Social Media Work</button>
                  </div>
                  
                  <div class="photo-gallery">
                    <div class="gallery-grid" id="event-gallery-grid">
                      
                      <!-- Graphics Design Category -->
                      <div class="gallery-item visible-item" data-category="graphics-design">
                        <img src="../images/event1.jpg" alt="Wedding Album Design" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Wedding Album Design</h5>
                          <p>Graphics Design</p>
                        </div>
                      </div>
                      
                      <div class="gallery-item visible-item" data-category="graphics-design">
                        <img src="../images/event2.jpg" alt="Poster &amp; Logo Design" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Poster &amp; Logo Design</h5>
                          <p>Graphics Design</p>
                        </div>
                      </div>
                      
                      <div class="gallery-item visible-item" data-category="graphics-design">
                        <img src="../images/event3.jpg" alt="Pre Wedding Photo Editing" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Pre Wedding Photo Editing</h5>
                          <p>Graphics Design</p>
                        </div>
                      </div>
                      
                      <!-- Video Editing Category -->
                      <div class="gallery-item visible-item" data-category="video-editing">
                        <img src="../images/videoediting1.jpg" alt="Cinematic Video Editing" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Cinematic Video Editing</h5>
                          <p>Video Editing</p>
                        </div>
                      </div>
                      
                      <div class="gallery-item visible-item" data-category="video-editing">
                        <img src="../images/videoediting2.jpg" alt="Traditional Video Editing" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Traditional Video Editing</h5>
                          <p>Video Editing</p>
                        </div>
                      </div>
                      
                      <div class="gallery-item visible-item" data-category="video-editing">
                        <img src="../images/videoediting3.jpg" alt="Teaser &amp; Highlights" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Teaser / Highlights</h5>
                          <p>Video Editing</p>
                        </div>
                      </div>
                      
                      <div class="gallery-item visible-item" data-category="video-editing">
                        <img src="../images/videoediting4.jpg" alt="Music Video" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Music Video</h5>
                          <p>Video Editing</p>
                        </div>
                      </div>
                      
                      <div class="gallery-item visible-item" data-category="video-editing">
                        <img src="../images/videoediting5.jpg" alt="Corporate Video" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Corporate Video</h5>
                          <p>Video Editing</p>
                        </div>
                      </div>
                      
                      <div class="gallery-item visible-item" data-category="video-editing">
                        <img src="../images/videoediting6.jpg" alt="YouTube Video" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>YouTube Video</h5>
                          <p>Video Editing</p>
                        </div>
                      </div>
                      
                      <div class="gallery-item visible-item" data-category="video-editing">
                        <img src="../images/videoediting1.jpg" alt="Short Film Event" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Short Film Event</h5>
                          <p>Video Editing</p>
                        </div>
                      </div>

                      <!-- Photography Category -->
                      <div class="gallery-item visible-item" data-category="photography">
                        <img src="../images/wedding1.jpg" alt="Drone Operating" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Drone Operating</h5>
                          <p>Photography</p>
                        </div>
                      </div>
                      
                      <div class="gallery-item visible-item" data-category="photography">
                        <img src="../images/wedding2.jpg" alt="Documentary Wedding" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Documentary Wedding</h5>
                          <p>Photography</p>
                        </div>
                      </div>
                      
                      <div class="gallery-item visible-item" data-category="photography">
                        <img src="../images/wedding3.jpg" alt="Travel Video" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Travel Video</h5>
                          <p>Photography</p>
                        </div>
                      </div>

                      <!-- Social Media Work Category -->
                      <div class="gallery-item visible-item" data-category="social-media">
                        <img src="../images/wedding4.jpg" alt="Short Reels" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Short Reels</h5>
                          <p>Social Media Work</p>
                        </div>
                      </div>
                      
                      <div class="gallery-item visible-item" data-category="social-media">
                        <img src="../images/wedding5.jpg" alt="Commercial Advertising" onerror="this.style.opacity='0';">
                        <div class="gallery-item-overlay">
                          <h5>Commercial Advertising</h5>
                          <p>Social Media Work</p>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </section>

              <!-- Gallery Interactive Filter Script -->
              <script>
                document.addEventListener('DOMContentLoaded', function() {
                  const filterButtons = document.querySelectorAll('.event-showcase .filter-controls button');
                  const galleryItems = document.querySelectorAll('.event-showcase .gallery-item');
                  
                  filterButtons.forEach(button => {
                    button.addEventListener('click', function() {
                      // Toggle active button class
                      filterButtons.forEach(btn => btn.classList.remove('active'));
                      this.classList.add('active');
                      
                      const filterValue = this.getAttribute('data-filter');
                      
                      galleryItems.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');
                        
                        if (filterValue === 'all' || itemCategory === filterValue) {
                          item.classList.remove('hidden-item');
                          item.classList.add('visible-item');
                        } else {
                          item.classList.remove('visible-item');
                          item.classList.add('hidden-item');
                        }
                      });
                    });
                  });
                });
              </script>
`;

// Insert the Event Showcase section right below the Hero Section
const heroSectionEndString = '</section>\n              \n              <!-- Services Catalog -->';
const heroSectionEndStringFallback = '</section>';

let targetIndex = content.indexOf(heroSectionEndString);
let splitLength = heroSectionEndString.length;

if (targetIndex === -1) {
    // Try single line search
    const servicesCatalogComment = '<!-- Services Catalog -->';
    targetIndex = content.indexOf(servicesCatalogComment);
    splitLength = 0;
}

if (targetIndex === -1) {
    console.error("❌ Could not locate insertion point in service/index.html");
    process.exit(1);
}

const beforeContent = content.substring(0, targetIndex + splitLength);
const afterContent = content.substring(targetIndex + splitLength);

const updatedContent = beforeContent + '\n' + eventShowcaseSectionHtml + '\n' + afterContent;

fs.writeFileSync(servicePagePath, updatedContent, 'utf8');
console.log("✅ Successfully inserted the Event Showcase section below the Hero Section!");
