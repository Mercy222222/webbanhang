const fs = require('fs');

const path = 'd:/webbanhang/blog-template/index-portfolio.html';
let content = fs.readFileSync(path, 'utf8');

content = content.replace('initThreeJS();', 'initBackgroundThree();');
content = content.replace('animateThree();', 'animateBackgroundThree();');

fs.writeFileSync(path, content);
console.log('Fixed function calls in DOMContentLoaded');
