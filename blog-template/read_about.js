const fs = require('fs');
let html = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');
let m = html.match(/<section id="about"[\s\S]*?<\/section>/);
if(m) console.log(m[0]);
