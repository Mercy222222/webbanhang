const fs = require('fs');

const path = 'd:/webbanhang/blog-template/index-portfolio.html';
let content = fs.readFileSync(path, 'utf8');

// Fix the ID
content = content.replace("getElementById('three-container')", "getElementById('three-bg-container')");

// Add safeguards to animation loops
const bgAnimFind = "function animateBackgroundThree(time = 0) {";
const bgAnimReplace = "function animateBackgroundThree(time = 0) {\n      if (!camera || !renderer || !scene) return;\n";
content = content.replace(bgAnimFind, bgAnimReplace);

const heroAnimFind = "function animateHeroThree(time = 0) {";
const heroAnimReplace = "function animateHeroThree(time = 0) {\n      if (!heroCamera || !heroRenderer || !heroScene) return;\n";
content = content.replace(heroAnimFind, heroAnimReplace);

fs.writeFileSync(path, content);
console.log('Fixed undefined camera errors and container IDs');
