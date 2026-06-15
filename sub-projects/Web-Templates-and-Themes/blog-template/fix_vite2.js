const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

// The line is exactly right before "const W2 = {"
// Let's replace any comment block before "const W2" completely
html = html.replace(/\/\*[\s\S]*?\*\/\s*const W2 = \{/g, '/* --- MULTILINGUAL DATA (VI/EN) --- */\n    const W2 = {');

// Remove ANY \uFFFD characters or other unprintable chars globally
html = html.replace(/\uFFFD/g, '');
html = html.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');

fs.writeFileSync('index-portfolio.html', html, 'utf8');
console.log('Fixed Vite control characters forcefully.');
