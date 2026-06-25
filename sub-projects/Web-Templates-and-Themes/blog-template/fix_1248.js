const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

// The Vite error is complaining about line 1248. Let's just fix the exact line using split.
let lines = html.split('\n');

for (let i = 0; i < lines.length; i++) {
    // If the line contains the start of W2, the comment is likely right above it.
    if (lines[i].includes('(VI/EN)')) {
        lines[i] = '    /* MULTILINGUAL DATA (VI/EN) */';
    }
}

html = lines.join('\n');
fs.writeFileSync('index-portfolio.html', html, 'utf8');
console.log('Fixed line 1248 explicitly.');
