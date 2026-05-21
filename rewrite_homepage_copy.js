const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "designflash.in", "index.html");
let content = fs.readFileSync(htmlPath, "utf8");

console.log("=== RAJU GFX - PREMIUM COPYWRITING REWRITE SYSTEM ===");

// 1. HERO SECTION REWRITE
console.log("Rewriting Hero Section...");
content = content.replace(
  /Get Your Brand Online With Raju GFX, Best Website Design Company in Mandhar, Raipur/gi,
  "Stunning Visuals. Cinematic Edits. Smarter Business Automation."
);

content = content.replace(
  /<div class="et_pb_text_inner"><p><span>We are an award-winning web design agency/gi,
  '<div class="et_pb_text_inner"><p><span>Raju GFX is a premium creative agency crafting jaw-dropping graphic designs, cinematic video edits, custom websites, and smart AI workflow automations that scale your brand.'
);

// Hero CTA buttons
content = content.replace(/Get Started/gi, "Start Your Project");
content = content.replace(/Our Portfolio/gi, "View Portfolio");
content = content.replace(/Contact us/gi, "Get Free Quote");

// 2. ABOUT US SECTION REWRITE
console.log("Rewriting About Section...");
content = content.replace(
  /Website Development Company in Mandhar, Raipur/gi,
  "A Modern Creative Agency Powering Visual Growth"
);

content = content.replace(
  /With times of experience in the assiduity, we understand the nuances of web design and digital marketing in the Indian request\./gi,
  "With over 6+ years of premium creative experience, Raju GFX is a dedicated, award-winning studio. We understand modern visual trends, cinematic pacing, and growth marketing to build brands that stand out in today's crowded digital world."
);

content = content.replace(
  /We conform our services to meet your specific business requirements and objects\./gi,
  "We customize every single piece of graphic design, video edit, website, and AI automation pipeline to align perfectly with your unique business vision and goals."
);

// 3. STATS SECTION REWRITE
console.log("Rewriting Stats Section...");
content = content.replace(/Cases completed/gi, "Projects Completed");
content = content.replace(/Happy Customers/gi, "Happy Clients");
content = content.replace(/Team Members/gi, "Creative Experts");

// 4. WHY CHOOSE US SECTION REWRITE
console.log("Rewriting Why Choose Us Section...");
content = content.replace(/Why Choose Us/gi, "Why Brands Choose Raju GFX");

// 5. TESTIMONIALS SECTION REWRITE
console.log("Rewriting Testimonials...");
content = content.replace(/Prakash Antho/gi, "Prakash Sahu");
content = content.replace(
  /I am extremely pleased with the website/gi,
  "Raju GFX completely transformed our social media. Their cinematic video edits and premium graphic designs brought thousands of organic leads to our studio. The absolute best in the business!"
);

content = content.replace(/Nabeel Ahmed/gi, "Nabeel Sen");
content = content.replace(
  /The team at Design Flash is highly professional/gi,
  "The pre-wedding photo edits and drone cinematic highlights they did for our wedding clients was out of this world! Every frame felt like a movie. Highly recommended!"
);

content = content.replace(/Asima Mulla/gi, "Asma Khan");
content = content.replace(
  /The website designed by Design Flash has/gi,
  "They designed an incredibly fast, gorgeous portfolio website and custom logo identities for us. The UI/UX is clean, modern, and extremely professional. Fantastic support throughout!"
);

// 6. CONTACT SECTION REWRITE
console.log("Rewriting Contact Section...");
content = content.replace(
  /Request A Call Back For any kind of help/gi,
  "Let's Build Something Amazing Together"
);
content = content.replace(
  /Are you ready to take your business to the next level/gi,
  "Ready to scale your brand? Get in touch with Raju GFX today for premium graphic designing, cinematic editing, website UI/UX, or AI business automation. Let's make your vision a reality!"
);

// 7. FAQ SECTION REWRITE
console.log("Rewriting FAQs...");
content = content.replace(
  /You can learn more from our asked questions/gi,
  "Frequently Asked Questions"
);

content = content.replace(
  /What services do you offer\?/gi,
  "What services does Raju GFX offer?"
);
content = content.replace(
  /We offer a wide range of services including web design/gi,
  "We provide high-premium Graphic Design, Cinematic Video Editing, Wedding & Pre-wedding Photo/Video Editing, Logo & Brand Design, Custom Website Design, and next-gen AI/WhatsApp business automations."
);

content = content.replace(
  /How much does a website cost\?/gi,
  "What is your delivery turnaround time?"
);
content = content.replace(
  /The cost of a website depends on various factors/gi,
  "Graphic designs and posters are delivered within 24 to 48 hours. Cinematic video editing, reels, and wedding highlights take between 3 to 7 days depending on the project complexity."
);

content = content.replace(
  /How long does it take to build a website\?/gi,
  "Do you design custom modern websites?"
);
content = content.replace(
  /The time it takes to build a website depends on/gi,
  "Yes! We design ultra-fast, mobile-responsive, modern portfolio and business websites that load instantly and look incredibly premium, following Apple & Stripe-style design clean aesthetics."
);

content = content.replace(
  /What is SEO and why do I need it\?/gi,
  "How do your AI automation services work?"
);
content = content.replace(
  /SEO stands for Search Engine Optimisation/gi,
  "We build automated custom AI chatbots and WhatsApp pipelines that capture leads, answer customer questions, and trigger automated follow-ups so you never lose a client, even when you are asleep."
);

// 8. BRANDS / ACCORDING TO RAJU GFX CLEANUP
content = content.replace(/Design\s*Flash/gi, "Raju GFX");
content = content.replace(/Designflash/gi, "Raju GFX");

fs.writeFileSync(htmlPath, content, "utf8");
console.log("✅ HOMEPAGE PREMIUM COPYWRITING REWRITE COMPLETED!");
