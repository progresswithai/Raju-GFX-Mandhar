const fs = require('fs');
const path = require('path');

function getJpegDimensions(buffer) {
    let i = 0;
    if (buffer[i] !== 0xFF || buffer[i + 1] !== 0xD8) return null; // Not a JPEG
    i += 2;
    while (i < buffer.length) {
        if (buffer[i] !== 0xFF) return null;
        let marker = buffer[i + 1];
        if (marker === 0xD9 || marker === 0xDA) return null; // End of image or Start of scan
        let length = buffer.readUInt16BE(i + 2);
        if (marker >= 0xC0 && marker <= 0xC3) { // SOF0, SOF1, SOF2 markers
            let height = buffer.readUInt16BE(i + 5);
            let width = buffer.readUInt16BE(i + 7);
            return { width, height };
        }
        i += 2 + length;
    }
    return null;
}

function getPngDimensions(buffer) {
    if (buffer.readUInt32BE(0) !== 0x89504E47 || buffer.readUInt32BE(4) !== 0x0D0A1A0A) return null; // Not a PNG
    if (buffer.toString('ascii', 12, 16) === 'IHDR') {
        let width = buffer.readUInt32BE(16);
        let height = buffer.readUInt32BE(20);
        return { width, height };
    }
    return null;
}

const dir = path.join(__dirname, 'images');
const files = fs.readdirSync(dir);

console.log('=== IMAGE DIMENSIONS ===');
files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) return;
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        try {
            const buffer = fs.readFileSync(filePath);
            let dim = null;
            if (ext === '.png') dim = getPngDimensions(buffer);
            else dim = getJpegDimensions(buffer);
            
            if (dim) {
                console.log(`${file}: ${dim.width}x${dim.height} (${(buffer.length/1024).toFixed(1)} KB)`);
            } else {
                console.log(`${file}: Unknown dimensions (${(buffer.length/1024).toFixed(1)} KB)`);
            }
        } catch (e) {
            console.log(`${file}: Error reading - ${e.message}`);
        }
    }
});
