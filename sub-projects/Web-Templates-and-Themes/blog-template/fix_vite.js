const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

// Fix any control characters that break Vite
html = html.replace(/\/\* â”€â”€â”€ Dá»® LIá»†U Ä A NGÃ”N NGá»®.*?â”€â”€â”€ \*\//, '/* DỮ LIỆU ĐA NGÔN NGỮ (VI/EN) */');
html = html.replace(/â”€â”€â”€/g, '---');
html = html.replace(/â€¢/g, '•');

// Clean up any remaining control characters just in case
html = html.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

fs.writeFileSync('index-portfolio.html', html, 'utf8');
console.log('Fixed control characters and Vite parsing issues.');
