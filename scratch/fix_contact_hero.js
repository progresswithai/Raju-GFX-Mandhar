const fs = require('fs');
const path = require('path');

const filepath = path.join('e:', 'Raju wesbite', 'designflash.in', 'contact', 'index.html');

if (!fs.existsSync(filepath)) {
    console.error("File not found: " + filepath);
    process.exit(1);
}

let content = fs.readFileSync(filepath, 'utf8');

// 1. Replace the background image section
const target1 = `    div.et_pb_section.et_pb_section_0 {
      background-blend-mode: overlay;
      background-image: url(/wp-content/uploads/2024/10/Design-process-bg.jpg) !important
    }`;

const replacement1 = `    div.et_pb_section.et_pb_section_0 {
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.65) 50%, rgba(0, 0, 0, 0.9) 100%), url(/wp-content/uploads/2024/10/premium_contact_bg.png) !important;
      background-size: cover !important;
      background-position: center !important;
      background-blend-mode: normal !important;
    }`;

// Normalize CRLF to LF for search
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget1 = target1.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget1)) {
    // Perform replacement keeping line endings
    // We can do it by splitting by target and joining with replacement
    const parts = content.split(/\r?\n/);
    const targetLines = target1.split(/\r?\n/).map(l => l.trim());
    
    let replaced = false;
    for (let i = 0; i <= parts.length - targetLines.length; i++) {
        let match = true;
        for (let j = 0; j < targetLines.length; j++) {
            if (parts[i + j].trim() !== targetLines[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            // Replace the lines
            parts.splice(i, targetLines.length, replacement1);
            replaced = true;
            break;
        }
    }
    
    if (replaced) {
        content = parts.join('\n');
        console.log("Successfully replaced Target 1!");
    } else {
        console.log("Target 1 logic failed to find exact matches.");
    }
} else {
    console.log("Target 1 not found in normalized content.");
}

// 2. Inject custom premium style rules before </style>
const target2 = `      body #page-container .et_pb_section .et_pb_contact_form_0.et_pb_contact_form_container.et_pb_module .et_pb_button:hover:after {
        opacity: 1
      }
    }
  </style>`;

const replacement2 = `      body #page-container .et_pb_section .et_pb_contact_form_0.et_pb_contact_form_container.et_pb_module .et_pb_button:hover:after {
        opacity: 1
      }
    }

    /* Premium Contact Hero Styles */
    .et_pb_section_0.et_pb_section {
      padding-top: 220px !important;
      padding-bottom: 120px !important;
      position: relative;
      overflow: hidden;
    }
    
    .et_pb_section_0.et_pb_section::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 80% 50%, rgba(182, 19, 29, 0.15) 0%, transparent 60%);
      pointer-events: none;
      z-index: 1;
    }

    .et_pb_section_0 .et_pb_row_0 {
      position: relative;
      z-index: 2;
    }

    .dct_m_header {
      border-left: 4px solid #B6131D !important;
      padding-left: 25px !important;
      margin-left: 10px !important;
    }

    .dct_m_header h1 {
      font-size: 64px !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
      letter-spacing: 2px !important;
      color: #ffffff !important;
      margin: 0 0 10px 0 !important;
      line-height: 1.1 !important;
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
      background: linear-gradient(135deg, #ffffff 0%, #dcdcdc 50%, #b3b3b3 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .dct_m_header ul {
      margin: 0 !important;
      padding: 0 !important;
      list-style: none !important;
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
    }

    .dct_m_header ul li {
      font-size: 14px !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      letter-spacing: 2px !important;
      color: #a0a0a0 !important;
      display: flex !important;
      align-items: center !important;
    }

    .dct_m_header ul li a {
      color: #e0e0e0 !important;
      text-decoration: none !important;
      transition: all 0.3s ease !important;
    }

    .dct_m_header ul li a:hover {
      color: #B6131D !important;
    }

    .dct_m_header ul li:not(:last-child)::after {
      content: '/' !important;
      margin-left: 8px !important;
      color: #B6131D !important;
      font-weight: 700 !important;
    }
  </style>`;

const lastStyleIndex = content.lastIndexOf('  </style>');
if (lastStyleIndex !== -1) {
    const pre = content.substring(0, lastStyleIndex);
    const post = content.substring(lastStyleIndex);
    
    // Check if the style is already injected
    if (content.includes('Premium Contact Hero Styles')) {
        console.log("Premium styles already injected.");
    } else {
        const injectStyles = `
    /* Premium Contact Hero Styles */
    .et_pb_section_0.et_pb_section {
      padding-top: 220px !important;
      padding-bottom: 120px !important;
      position: relative;
      overflow: hidden;
    }
    
    .et_pb_section_0.et_pb_section::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 80% 50%, rgba(182, 19, 29, 0.15) 0%, transparent 60%);
      pointer-events: none;
      z-index: 1;
    }

    .et_pb_section_0 .et_pb_row_0 {
      position: relative;
      z-index: 2;
    }

    .dct_m_header {
      border-left: 4px solid #B6131D !important;
      padding-left: 25px !important;
      margin-left: 10px !important;
    }

    .dct_m_header h1 {
      font-size: 64px !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
      letter-spacing: 2px !important;
      color: #ffffff !important;
      margin: 0 0 10px 0 !important;
      line-height: 1.1 !important;
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
      background: linear-gradient(135deg, #ffffff 0%, #dcdcdc 50%, #b3b3b3 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .dct_m_header ul {
      margin: 0 !important;
      padding: 0 !important;
      list-style: none !important;
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
    }

    .dct_m_header ul li {
      font-size: 14px !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      letter-spacing: 2px !important;
      color: #a0a0a0 !important;
      display: flex !important;
      align-items: center !important;
    }

    .dct_m_header ul li a {
      color: #e0e0e0 !important;
      text-decoration: none !important;
      transition: all 0.3s ease !important;
    }

    .dct_m_header ul li a:hover {
      color: #B6131D !important;
    }

    .dct_m_header ul li:not(:last-child)::after {
      content: '/' !important;
      margin-left: 8px !important;
      color: #B6131D !important;
      font-weight: 700 !important;
    }
`;
        content = pre + injectStyles + post;
        console.log("Successfully injected custom premium styles before closing </style>!");
    }
} else {
    console.error("Could not find </style> tag in the file.");
}

fs.writeFileSync(filepath, content, 'utf8');
console.log("File saved successfully!");
