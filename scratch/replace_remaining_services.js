const fs = require('fs');
const path = require('path');

const targetDir = 'e:/Raju wesbite/designflash.in';

// 1. Direct word and menu replacements
const replacements = [
    // Header category mega-menus
    { search: /Branding\s+(?:&#038;|&)\s*Logo/gi, replace: 'Graphic & Logo Design' },
    { search: /Web\s+Development/gi, replace: 'Wedding Album & Photo Design' },
    { search: /Website\s+Designing/gi, replace: 'Wedding Album & Photo Design' },
    { search: /Digital\s+Marketing/gi, replace: 'Cinematic Video Editing' },
    { search: /Software\s+(?:&#038;|&)\s*Solutions/gi, replace: 'Specialized Drone Operations' },

    // Mega menu sub-items
    { search: /Shopify\s+website\s+design/gi, replace: 'Pre-Wedding Photo Editing' },
    { search: /Website\s+Development\s+Services/gi, replace: 'Traditional Video Editing' },
    { search: /Logo\s+Design\s+Services/gi, replace: 'Poster & Logo Design' },
    { search: /UI\/UX\s+Design\s+Services/gi, replace: 'Cinematic Film Editing' },
    { search: /Website\s+Design\s+Services/gi, replace: 'Wedding Album Design' },
    { search: /Website\s+Redesign\s+Services/gi, replace: 'Teaser & Highlights Editing' },
    { search: /Online\s+Advertising\s+Services/gi, replace: 'YouTube Video Editing' },
    { search: /SEO\s+Services/gi, replace: 'Short Reels & Videos' },
    { search: /SMM\s+Services/gi, replace: 'Drone Operating & Photos' },
    { search: /Ecommerce\s+SEO\s+Services/gi, replace: 'Event Video Editing' },
    { search: /Start\s+Up\s+Solutions\s+Services/gi, replace: 'Travel Video Editing' },
    { search: /SMO\s+Services/gi, replace: 'Music Video Editing' },
    { search: /ORM\s+Services/gi, replace: 'Corporate Video Editing' },
    { search: /Django\s+Web\s+Development/gi, replace: 'Wedding Films Production' },
    { search: /Ecommerce\s+website\s+design/gi, replace: 'Commercial & Ad Videos' },
    { search: /Mobile\s+App\s+Development/gi, replace: 'Short Films Production' },
    { search: /Python\s+Development/gi, replace: 'Documentary Films' },

    // Alt text images
    { search: /alt="Best Website Designing and Development Company"/gi, replace: 'alt="Best Cinematic Video Editing and Wedding Album Design Studio | Raju GFX"' },
    { search: /alt="Best Website Designing &amp; Development Company"/gi, replace: 'alt="Best Cinematic Video Editing and Wedding Album Design Studio | Raju GFX"' },
    { search: /alt="Website Designing Course in Mandhar, Raipur"/gi, replace: 'alt="Cinematic Video Editing & Wedding Album Design Studio | Raju GFX"' },
    { search: /alt="Website design company\s+in mandhar,\s*raipur"/gi, replace: 'alt="Cinematic Video Editing & Wedding Album Design Studio | Raju GFX"' },

    // Landing page headings
    {
        search: /We Offer Premium\s+Website Designing\s*,\s*UI\/UX Design\s*,\s*<span>Digital Marketing\s*<\/span>\s*Company/gi,
        replace: 'We Offer Premium Wedding Album Design, Poster & Logo Design, <span>Cinematic Video Editing</span> Services'
    },
    {
        search: /We Offer Premium\s+Website Designing\s*,\s*UI\/UX Design\s*,\s*Digital Marketing\s*Company/gi,
        replace: 'We Offer Premium Wedding Album Design, Poster & Logo Design, Cinematic Video Editing Services'
    },
    {
        search: /Best Website Designing And Development Company/gi,
        replace: 'Best Cinematic Video Editing & Wedding Album Design Studio'
    },
    {
        search: /Best Digital Marketing Services Company/gi,
        replace: 'Best Cinematic Video Editing & Album Design Studio'
    },
    {
        search: /Digital Marketing Agency In Mandhar, Raipur/gi,
        replace: 'Cinematic Video Editing & Album Design Studio In Mandhar, Raipur'
    },
    {
        search: /Digital Marketing Company in Mandhar, Raipur/gi,
        replace: 'Cinematic Video Editing & Album Design Studio in Mandhar, Raipur'
    },
    {
        search: /Website designing Company in Mandhar, Raipur/gi,
        replace: 'Professional Wedding Album Design & Cinematic Video Editing Studio in Mandhar, Raipur'
    },

    // Descriptions in landing pages
    {
        search: /At Raju GFX, we deliver premium 360° digital marketing solutions designed to redefine your online identity and drive real business growth\./gi,
        replace: 'At Raju GFX, we deliver premium cinematic video production and custom graphic design solutions designed to redefine your visual presence and capture your precious moments.'
    },
    {
        search: /we use cutting-edge strategies and a data-driven approach to ensure every aspect of your marketing aligns with your business goals\. From SEO and social media to content marketing and paid campaigns, our expert team focuses on delivering measurable results that boost your visibility and accelerate success in the digital world\./gi,
        replace: 'we use cutting-edge creative editing techniques and a highly artistic approach to ensure every frame of your video and photo album aligns with your dreams. From cinematic wedding films and event highlights to high-end drone footage and customized album layouts, our expert team focuses on delivering spectacular visual results that elevate your memories in the digital world.'
    },

    // FAQs
    { search: /Do you offer support with digital marketing/gi, replace: 'Do you offer support with cinematic video editing' },
    { search: /Absolutely! We offer comprehensive digital marketing services/gi, replace: 'Absolutely! We offer comprehensive cinematic video editing services' },
    { search: /Why should I choose a website design company/gi, replace: 'Why should I choose Raju GFX studio' },
    { search: /A website design company offers a professional team of developers who/gi, replace: 'Raju GFX offers a professional team of video editors, photographers, and graphic designers who' },

    // Generic Website Design occurrences in descriptions/texts
    { search: /Website designing Company in Mandhar, Raipur/gi, replace: 'Professional Wedding Album Design & Cinematic Video Editing Studio in Mandhar, Raipur' },
    { search: /Website design company in Mandhar, Raipur/gi, replace: 'Wedding Album Design & Cinematic Video Editing Studio in Mandhar, Raipur' },
    { search: /Website designing and development company in Mandhar, Raipur/gi, replace: 'Wedding Album Design & Cinematic Video Editing Studio in Mandhar, Raipur' },
    
    // Remaining generic titles and phrases
    { search: /Raju GFX conquers the digital jungle with effective strategies to grow yo/gi, replace: 'Raju GFX captures breathtaking wedding frames and edits cinematic films that make your memories shine.' },
    { search: /What is website design and development\?/gi, replace: 'What is cinematic video editing and album design?' },
    { search: /Website design and development, executed by/gi, replace: 'Cinematic video editing and wedding album design, executed by' },
    { search: /Hiring a dynamic website designer/gi, replace: 'Hiring a professional album designer & video editor' },
    { search: /website design and development/gi, replace: 'wedding album design & photo editing' },
    { search: /responsive website design/gi, replace: 'professional pre-wedding photo editing' },
    { search: /Hiring a dynamic website designer not only enhances your/gi, replace: 'Hiring a professional album designer and editor not only enhances your' },
    { search: /Best Website Design Company/gi, replace: 'Best Wedding Album Design & Cinematic Editing Studio' },
    { search: /Trying to Find the Best Website Design Company in/gi, replace: 'Trying to Find the Best Wedding Album Design & Cinematic Editing Studio in' },
    { search: /top website design company/gi, replace: 'top wedding album design & cinematic editing studio' },
    { search: /custom website design/gi, replace: 'custom album design' },
    { search: /custom dynamic website design/gi, replace: 'custom pre-wedding album design' },
    { search: /professional website design company/gi, replace: 'professional wedding album design & cinematic editing studio' },
    { search: /E-commerce Website Design/gi, replace: 'Cinematic Video Highlights' },
    { search: /Portfolio Website Design/gi, replace: 'Portfolio Album & Photo Design' },
    { search: /Hire Website Designer/gi, replace: 'Hire Professional Album Designer & Editor' },
    { search: /Website Design<\/button>/gi, replace: 'Wedding Album Design</button>' },
    { search: /visually striking website designed by/gi, replace: 'visually striking album designed by' },
    { search: /Step Into the Digital World with the Best Website Design/gi, replace: 'Step Into the Cinematic World with the Best Album Design' },
    { search: /Build a custom website design that makes/gi, replace: 'Build a custom album design that makes' },
    { search: /website design/gi, replace: 'wedding album design' }
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    replacements.forEach(r => {
        if (r.search.test(content)) {
            r.search.lastIndex = 0;
            content = content.replace(r.search, r.replace);
        }
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

function processDirectory(dir) {
    let count = 0;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (file === 'wp-content' || file === 'wp-includes' || file === 'wp-json' || file === '_https_') {
                return;
            }
            count += processDirectory(fullPath);
        } else if (file === 'index.html' || file.endsWith('.html') || file === 'index.xml' || file.endsWith('.xml')) {
            if (processFile(fullPath)) {
                count++;
            }
        }
    });
    return count;
}

console.log("Starting bulk services rebranding in HTML/XML files...");
const updatedFiles = processDirectory(targetDir);
console.log(`Rebranding complete! Total files updated: ${updatedFiles}`);
