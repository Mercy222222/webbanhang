const fs = require('fs');
let html = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

// 1. Inject Canvas
if (!html.includes('id="global-3d-bg"')) {
  html = html.replace(/<body[^>]*>/, '$&\n  <!-- GLOBAL 3D BACKGROUND -->\n  <canvas id="global-3d-bg" class="fixed inset-0 w-full h-full pointer-events-none z-[-1] opacity-60"></canvas>');
}

// 2. Inject Script
const add_global_js = fs.readFileSync('d:/webbanhang/blog-template/add_global_3d.js', 'utf8');
const scriptMatch = add_global_js.match(/<!-- GLOBAL 3D PLEXUS SCRIPT -->[\s\S]*<\/script>/);

if (scriptMatch && !html.includes('GLOBAL 3D PLEXUS SCRIPT')) {
  html = html.replace('<!-- --- GSAP & 3D INTERACTION SCRIPT --- -->', scriptMatch[0] + '\n  <!-- --- GSAP & 3D INTERACTION SCRIPT --- -->');
}

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', html);
console.log('Successfully injected Global 3D Plexus Background via script.');
