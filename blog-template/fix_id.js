const fs = require('fs');
const path = 'd:/webbanhang/blog-template/index-portfolio.html';
let html = fs.readFileSync(path, 'utf8');

html = html.replace('<h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">', '<h1 id="page-greeting-header" class="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">');

fs.writeFileSync(path, html);
