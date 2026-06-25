const fs = require('fs');
let html = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

// 1. REMOVE CRT SCANLINES AND SPOTLIGHT TO STOP EYE STRAIN
html = html.replace(/<div class="singularity-crt"><\/div>/g, '');
html = html.replace(/<div class="singularity-spotlight"><\/div>/g, '');
html = html.replace(/\.singularity-crt\s*\{[\s\S]*?\}/g, '');
html = html.replace(/\.singularity-spotlight\s*\{[\s\S]*?\}/g, '');
html = html.replace(/\.singularity-flash\s*\{[\s\S]*?\}/g, '');
html = html.replace(/@keyframes global-flash\s*\{[\s\S]*?\}/g, '');

// Remove JS Logic for Spotlight and Flash
html = html.replace(/\/\/ Spotlight logic - Optimized with rAF[\s\S]*?\}\);/g, '');
const scrollGlitchRegex = /\/\/ Scroll Section Glitch[\s\S]*?\}\);[\s]*\}\);/g;
html = html.replace(scrollGlitchRegex, '');

// 2. REMOVE NAUSEATING VELOCITY SKEW
const velocitySkewRegex = /\/\/ --- OMNIVERSE VELOCITY SKEW ---[\s\S]*?\}\);/g;
html = html.replace(velocitySkewRegex, '');

// 3. REMOVE SVG LIQUID FILTER & HEAVY GLITCH ON TITLES
html = html.replace(/<!-- OMNIVERSE LIQUID FILTER -->[\s\S]*?<\/svg>/g, '');
html = html.replace(/omniverse-liquid/g, 'smooth-hover');
html = html.replace(/omniverse-glitch/g, ''); // Remove glitch from titles

const smoothHoverCSS = `
    /* PREMIUM SMOOTH HOVER INSTEAD OF GLITCH */
    .smooth-hover {
      transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), filter 0.5s;
    }
    .smooth-hover:hover {
      transform: scale(1.05);
      filter: brightness(1.1);
    }
`;
html = html.replace('/* OMNIVERSE TIER CSS */', smoothHoverCSS + '\n    /* OMNIVERSE TIER CSS */');

// Remove massive glitch CSS
html = html.replace(/\.omniverse-liquid\s*\{[\s\S]*?\}/g, '');
html = html.replace(/\.omniverse-liquid:hover\s*\{[\s\S]*?\}/g, '');
html = html.replace(/\.omniverse-glitch\s*\{[\s\S]*?\}/g, '');
html = html.replace(/\.omniverse-glitch:hover::before, \.omniverse-glitch:hover::after\s*\{[\s\S]*?\}/g, '');
html = html.replace(/\.omniverse-glitch:hover::before\s*\{[\s\S]*?\}/g, '');
html = html.replace(/\.omniverse-glitch:hover::after\s*\{[\s\S]*?\}/g, '');
html = html.replace(/@keyframes glitch-anim\s*\{[\s\S]*?\}/g, '');
html = html.replace(/@keyframes glitch-anim2\s*\{[\s\S]*?\}/g, '');

// Write changes
fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', html);
console.log('Successfully removed eye-strain effects.');
