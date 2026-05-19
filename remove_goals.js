const fs = require('fs');
const path = require('path');

const htmlFilePath = path.join(__dirname, 'designflash.in', 'index.html');

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

function run() {
    if (!fs.existsSync(htmlFilePath)) {
        console.error("Error: designflash.in/index.html not found!");
        process.exit(1);
    }

    console.log("Reading index.html...");
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Search for "COMMITTED TO HELP CLIENTS TO REACH THE GOALS" case-insensitively
    const searchPattern = /committed\s+to\s+help\s+clients\s+to\s+reach\s+(the\s+)?goals/i;
    const match = searchPattern.exec(htmlContent);

    if (!match) {
        // Try searching for just "reach the goals" or "reach the goal"
        const fallbackPattern = /reach\s+(the\s+)?goals?/i;
        const matchFallback = fallbackPattern.exec(htmlContent);
        if (!matchFallback) {
            console.error("❌ ERROR: Could not find the text 'COMMITTED TO HELP CLIENTS TO REACH THE GOALS' inside index.html!");
            process.exit(1);
        }
        performReplacement(matchFallback.index);
    } else {
        performReplacement(match.index);
    }

    function performReplacement(textIndex) {
        console.log(`Found target text at index ${textIndex}. Finding the enclosing section...`);

        // Find the nearest opening et_pb_section before this text
        const beforeString = htmlContent.substring(0, textIndex);
        const sectionStartIndex = beforeString.lastIndexOf('<div class="et_pb_section');

        if (sectionStartIndex === -1) {
            console.error("❌ ERROR: Could not find the beginning of the section enclosing the text!");
            process.exit(1);
        }

        console.log(`Found start of section at index ${sectionStartIndex}. Finding closing tag...`);
        const sectionEndIndex = findClosingDivIndex(htmlContent, sectionStartIndex);

        if (sectionEndIndex === -1) {
            console.error("❌ ERROR: Could not find the end of the section!");
            process.exit(1);
        }

        console.log(`Replacing enclosing section (from index ${sectionStartIndex} to ${sectionEndIndex})...`);
        
        // Remove the section entirely
        htmlContent = htmlContent.substring(0, sectionStartIndex) + htmlContent.substring(sectionEndIndex);

        fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
        console.log("✅ SUCCESS: Enclosing section successfully removed from index.html!");
    }
}

run();
