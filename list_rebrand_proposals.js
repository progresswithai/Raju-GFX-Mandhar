const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const htmlFilePath = path.join(rootDir, 'designflash.in', 'index.html');

if (!fs.existsSync(htmlFilePath)) {
    console.error("Error: index.html not found!");
    process.exit(1);
}

const content = fs.readFileSync(htmlFilePath, 'utf8');

console.log("======================================================");
console.log("          RAJU GFX BRANDING REPLACEMENT PLAN");
console.log("======================================================");
console.log("Here are the exact things we discovered in the website");
console.log("that we need to update to convert it fully to Raju GFX:\n");

// 1. Scan for Brand Name
const brandCount = (content.match(/design\s*flash/gi) || []).length;
console.log(`1️⃣ BRAND NAME:`);
console.log(`   - Found "${brandCount}" occurrences of "Design Flash" or "DesignFlash" on the homepage.`);
console.log(`   - Proposed: Replace all with "Raju GFX" or "Raju GFX Mandhar".`);
console.log(`------------------------------------------------------`);

// 2. Scan for Emails
const emails = new Set(content.match(/[a-zA-Z0-9._%+-]+@designflash\.[a-z.]{2,6}/gi) || []);
console.log(`2️⃣ COMPANY EMAILS:`);
if (emails.size > 0) {
    emails.forEach(email => {
        console.log(`   - Found email: "${email}"`);
    });
    console.log(`   - Proposed: Replace all with a custom email (e.g. "rajugfxmandhar@gmail.com" or similar).`);
} else {
    console.log(`   - No raw @designflash.in emails found on the homepage (already customized!).`);
}
console.log(`------------------------------------------------------`);

// 3. Scan for Phone Numbers
const phones = new Set(content.match(/\+?\d{10,12}/g) || []);
console.log(`3️⃣ CONTACT PHONE NUMBER:`);
// Let's check for specific phone numbers
const specificPhone = content.match(/\+?9202542342/gi);
if (specificPhone) {
    console.log(`   - Found phone: "+9202542342" in the header.`);
    console.log(`   - Proposed: Keep as "+9202542342" (or specify if you want a different one).`);
} else {
    console.log(`   - No phone numbers found matching "+9202542342".`);
}
console.log(`------------------------------------------------------`);

// 4. Scan for Addresses
console.log(`4️⃣ COMPANY ADDRESS & LOCATION:`);
const addressMatch = content.includes("Ali Plaza") || content.includes("Nehru Rd");
if (addressMatch) {
    console.log(`   - Found old Bangalore Address in the footer/JSON:`);
    console.log(`     "3rd floor, Ali Plaza, 304, Nehru Rd, Bengaluru, Karnataka 560084"`);
    console.log(`   - Proposed: Replace with your new address:`);
    console.log(`     "Mandhar colony, raipur, chhattisgarh, near by post office tekari 2, pincode-493111, mandhar"`);
} else {
    console.log(`   - Old address is already replaced or removed on the homepage!`);
}

// 5. Scan for city references
const cityCount = (content.match(/Bangalore/gi) || []).length;
console.log(`   - Found "${cityCount}" references to the city "Bangalore" (e.g. "Website Designing in Bangalore").`);
console.log(`   - Proposed: Replace all with your local city "Raipur" or "Mandhar" to fit your market!`);
console.log("======================================================");
