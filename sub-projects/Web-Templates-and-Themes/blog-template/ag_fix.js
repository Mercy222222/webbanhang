const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

// Aggressive cleanup of control chars:
let cleanHtml = '';
for (let i = 0; i < html.length; i++) {
    let code = html.charCodeAt(i);
    // Allow standard ASCII, standard extended ASCII (accents), and safe newlines
    if (code === 9 || code === 10 || code === 13) {
        cleanHtml += html[i];
    } else if (code >= 32 && code !== 127 && (code < 128 || code > 159)) {
        cleanHtml += html[i];
    }
}

// Ensure literal newlines inside strings in JS don't break Vite by replacing literal \n with \\n
// But wait, if they are already \n in the source code as string literals, they are just "\n" (two chars: \ and n).
// Ah! If it's literally a backslash followed by n, that's fine.
// If it's a real newline, it's char 10.
// Let's replace any "Career\nChronicles." (literal newline) with "Career\\nChronicles."
cleanHtml = cleanHtml.replace(/"Career\r?\nChronicles\."/g, '"Career\\\\nChronicles."');
cleanHtml = cleanHtml.replace(/"protect\r?\nyour data\r?\nwith securify"/g, '"protect\\\\nyour data\\\\nwith securify"');

fs.writeFileSync('index-portfolio.html', cleanHtml, 'utf8');
console.log('Aggressive byte cleanup finished.');
