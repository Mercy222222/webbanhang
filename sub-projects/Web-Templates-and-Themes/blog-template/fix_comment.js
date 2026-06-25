const fs = require('fs');
let html = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

// I accidentally used `/*` to comment out an innerHTML block without closing it!
html = html.replace(
  "/* document.getElementById('page-greeting-header').innerHTML = `", 
  "// Removed document.getElementById('page-greeting-header').innerHTML = \n`"
);

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', html);
