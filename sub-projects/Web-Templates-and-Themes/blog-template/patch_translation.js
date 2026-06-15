const fs = require('fs');
const path = 'd:/webbanhang/blog-template/index-portfolio.html';
let html = fs.readFileSync(path, 'utf8');

// A function to safely set textContent if element exists
const safeSetText = `
    function safeSetText(id, text) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    }
`;

if (!html.includes('function safeSetText(')) {
  html = html.replace('function updateLanguageUI() {', safeSetText + '\n    function updateLanguageUI() {');
}

// Replace all risky getElementById assignments inside updateLanguageUI with safeSetText
html = html.replace(/document\.getElementById\('([^']+)'\)\.textContent\s*=\s*t\('([^']+)'\);/g, "safeSetText('$1', t('$2'));");

fs.writeFileSync(path, html);
console.log('Successfully patched updateLanguageUI to be null-safe.');
