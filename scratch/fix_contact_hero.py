import os

filepath = r"e:\Raju wesbite\designflash.in\contact\index.html"

with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# 1. Replace the background image section
target1 = """    div.et_pb_section.et_pb_section_0 {
      background-blend-mode: overlay;
      background-image: url(/wp-content/uploads/2024/10/Design-process-bg.jpg) !important
    }"""

replacement1 = """    div.et_pb_section.et_pb_section_0 {
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.65) 50%, rgba(0, 0, 0, 0.9) 100%), url(/wp-content/uploads/2024/10/premium_contact_bg.png) !important;
      background-size: cover !important;
      background-position: center !important;
      background-blend-mode: normal !important;
    }"""

# Try replacing target1 with both CRLF and LF forms
if target1 in content:
    content = content.replace(target1, replacement1)
    print("Found and replaced Target 1 (exact)")
else:
    # Try normalizing line endings to check
    normalized_target1 = target1.replace('\r\n', '\n').replace('\n', '\r\n')
    if normalized_target1 in content:
        content = content.replace(normalized_target1, replacement1)
        print("Found and replaced Target 1 (normalized CRLF)")
    else:
        normalized_target1_lf = target1.replace('\r\n', '\n')
        if normalized_target1_lf in content:
            content = content.replace(normalized_target1_lf, replacement1)
            print("Found and replaced Target 1 (normalized LF)")
        else:
            print("Target 1 NOT found!")

# 2. Inject custom premium style rules before </style>
target2 = """      body #page-container .et_pb_section .et_pb_contact_form_0.et_pb_contact_form_container.et_pb_module .et_pb_button:hover:after {
        opacity: 1
      }
    }
  </style>"""

replacement2 = """      body #page-container .et_pb_section .et_pb_contact_form_0.et_pb_contact_form_container.et_pb_module .et_pb_button:hover:after {
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
  </style>"""

if target2 in content:
    content = content.replace(target2, replacement2)
    print("Found and replaced Target 2 (exact)")
else:
    normalized_target2 = target2.replace('\r\n', '\n').replace('\n', '\r\n')
    if normalized_target2 in content:
        content = content.replace(normalized_target2, replacement2)
        print("Found and replaced Target 2 (normalized CRLF)")
    else:
        normalized_target2_lf = target2.replace('\r\n', '\n')
        if normalized_target2_lf in content:
            content = content.replace(normalized_target2_lf, replacement2)
            print("Found and replaced Target 2 (normalized LF)")
        else:
            # Fallback search: just search for </style> near the very end
            idx = content.rfind('  </style>')
            if idx != -1:
                content = content[:idx] + replacement2.replace(target2, '  </style>') + content[idx + len('  </style>'):]
                print("Applied Target 2 fallback replacement near the end of file")
            else:
                print("Target 2 NOT found!")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Modification complete!")
