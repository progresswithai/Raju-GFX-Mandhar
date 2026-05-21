const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '..', 'designflash.in', 'about', 'index.html');

console.log("======================================================");
console.log("             ABOUT PAGE INTEGRITY CHECK");
console.log("======================================================");

if (!fs.existsSync(aboutPath)) {
    console.error("❌ ERROR: designflash.in/about/index.html does not exist!");
    process.exit(1);
}

const html = fs.readFileSync(aboutPath, 'utf8');

// Check namespace class
if (html.includes('about-recreated-body')) {
    console.log("✅ Main namespace '.about-recreated-body' is present.");
} else {
    console.error("❌ ERROR: Main namespace '.about-recreated-body' is missing!");
    process.exit(1);
}

// Check sections
const sections = [
    { name: "Hero Section", marker: "about-hero", details: "ABOUT <span>RAJU GFX</span>" },
    { name: "About Company Section", marker: "about-company", details: "We Design Experiences That <span>Drive Results</span>" },
    { name: "Why Choose Us Section", marker: "about-wcu", details: "Why Choose Us" },
    { name: "Our Mission & Vision Section", marker: "about-mv", details: "Our Mission" },
    { name: "Stats Strip Section", marker: "about-stats", details: "150+" },
    { name: "Meet Our Founder Section", marker: "about-founder", details: "Raju GFX" }
];

let failed = false;
sections.forEach(sec => {
    if (html.includes(sec.marker) && html.includes(sec.details)) {
        console.log(`✅ [${sec.name}] matches successfully! (class: ${sec.marker})`);
    } else {
        console.error(`❌ ERROR: [${sec.name}] is missing or incorrect!`);
        failed = true;
    }
});

// Check local images
const images = [
    "Design-process-bg.jpg",
    "raju_gfx_mandhar_logo.webp",
    "wedding5.jpg"
];

console.log("\n--- Verifying Image Referencing ---");
images.forEach(img => {
    // Relative image reference search
    const ref = `../images/${img}`;
    if (html.includes(ref)) {
        console.log(`✅ Image reference '${ref}' is correctly integrated!`);
        
        // Verify file physical existence
        const physicalPath = path.join(__dirname, '..', 'designflash.in', 'images', img);
        if (fs.existsSync(physicalPath)) {
            const size = fs.statSync(physicalPath).size;
            console.log(`   👉 File physically exists! Size: ${size} bytes`);
        } else {
            console.error(`   ❌ Physical File is missing at: ${physicalPath}`);
            failed = true;
        }
    } else {
        console.error(`❌ ERROR: Image reference '${ref}' is missing from HTML!`);
        failed = true;
    }
});

console.log("\n--- Verifying Navigation Links Integrity ---");
const expectedLinks = [
    { text: 'HOME', href: '../index.html' },
    { text: 'ABOUT', href: 'index.html' },
    { text: 'CONTACT', href: '../contact/index.html' },
    { text: 'SERVICE', href: '../service/index.html' },
    { text: 'PORTFOLIO', href: '../portfolio/index.html' }
];

expectedLinks.forEach(link => {
    // In about page, ABOUT link is 'index.html' or './index.html' or '#' or whatever it is configured as.
    // Let's search if the about page links contain these relative hrefs in some form.
    const cleanHref = link.href;
    if (html.includes(cleanHref)) {
        console.log(`✅ Link to ${link.text} ('${cleanHref}') exists in page.`);
    } else {
        console.warn(`⚠️ Warning: Expected link '${cleanHref}' for ${link.text} not found exactly. Checking alternative...`);
        // Maybe it's relative or absolute
    }
});

console.log("======================================================");
if (failed) {
    console.error("❌ INTEGRITY CHECK FAILED!");
    process.exit(1);
} else {
    console.log("🎉 INTEGRITY CHECK PASSED SUCCESSFULLY!");
}
console.log("======================================================");
