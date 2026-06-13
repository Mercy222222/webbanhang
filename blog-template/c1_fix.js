const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

let cleanHtml = '';
for (let i = 0; i < html.length; i++) {
    let code = html.charCodeAt(i);
    if (code === 9 || code === 10 || code === 13) {
        cleanHtml += html[i];
    } else if (code >= 32 && code !== 127 && (code < 128 || code > 159)) {
        cleanHtml += html[i];
    }
}

fs.writeFileSync('index-portfolio.html', cleanHtml, 'utf8');
console.log('Stripped C1 control characters.');
