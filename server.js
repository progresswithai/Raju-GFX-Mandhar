const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.eot': 'application/vnd.ms-fontobject',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.xml': 'application/xml',
    '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
    // Log incoming requests
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);

    // Decode URL to handle spaces/special characters
    let safeUrl = decodeURIComponent(req.url);
    
    // Remove query strings or hashes
    const qIndex = safeUrl.indexOf('?');
    if (qIndex !== -1) safeUrl = safeUrl.substring(0, qIndex);
    const hIndex = safeUrl.indexOf('#');
    if (hIndex !== -1) safeUrl = safeUrl.substring(0, hIndex);

    // Resolve file path
    let filePath = path.join(PUBLIC_DIR, safeUrl);

    // If it's a directory, try serving index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    // Check if file exists
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        console.warn(`⚠️ File not found: ${filePath}`);
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>404 Not Found - Raju GFX</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background: #111;
                        color: #eee;
                        text-align: center;
                        padding: 100px 20px;
                        margin: 0;
                    }
                    h1 { color: #ff3366; font-size: 48px; margin-bottom: 10px; }
                    p { font-size: 18px; color: #aaa; margin-bottom: 30px; }
                    a {
                        color: #00ffff;
                        text-decoration: none;
                        border: 1px solid #00ffff;
                        padding: 10px 20px;
                        border-radius: 5px;
                        transition: all 0.3s;
                    }
                    a:hover {
                        background: #00ffff;
                        color: #111;
                        box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
                    }
                </style>
            </head>
            <body>
                <h1>404</h1>
                <p>Oops! The page or resource you are looking for does not exist on Raju GFX.</p>
                <p style="font-size:14px; color:#666;">Requested: ${req.url}</p>
                <a href="/">Go Back Home</a>
            </body>
            </html>
        `);
        return;
    }

    // Get the file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.error(`❌ Error reading file: ${err.message}`);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`Internal Server Error: ${err.code}`);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

// Handle server startup errors (e.g. port in use)
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`⚠️ Port ${PORT} is in use, trying port ${PORT + 1}...`);
        server.listen(PORT + 1);
    } else {
        console.error(`❌ Server error: ${err.message}`);
    }
});

server.listen(PORT, () => {
    const address = server.address();
    const actualPort = address.port;
    
    console.log('\n' + '='.repeat(60));
    console.log(`⚡ Raju GFX Website Server is now running locally!`);
    console.log(`🚀 Access your website at:`);
    console.log(`   👉 http://localhost:${actualPort}`);
    console.log(`   👉 http://127.0.0.1:${actualPort}`);
    console.log('='.repeat(60));
    console.log('Press Ctrl + C to stop the server.\n');
});
