const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

// 1. Adjust grid columns
html = html.replace(
  '<div class="lg:col-span-8 flex flex-col justify-center space-y-6 lg:pr-8 fade-up-enter" style="animation-delay: 0.1s">',
  '<div class="lg:col-span-9 flex flex-col justify-center space-y-6 lg:pr-12 fade-up-enter" style="animation-delay: 0.1s">'
);

// 2. Adjust Card size
html = html.replace(
  '<div class="lg:col-span-4 relative h-[300px] lg:h-[350px] securify-card flex items-center justify-center p-8 group fade-up-enter" style="animation-delay: 0.3s">',
  '<div class="lg:col-span-3 relative h-[200px] lg:h-[260px] securify-card flex items-center justify-center p-6 group fade-up-enter" style="animation-delay: 0.3s">'
);

// 3. Make the 3D geometry smaller inside the canvas (camera z-index)
html = html.replace(
  'heroCamera.position.z = 12; // Bring it closer to fit the card',
  'heroCamera.position.z = 16; // Push it back to make it smaller'
);

// Optional: Reduce the text opacity of the ASCII effect to blend better
html = html.replace(
  "heroEffect.domElement.style.color = 'rgba(6, 182, 212, 0.6)'; // Cyan color",
  "heroEffect.domElement.style.color = 'rgba(6, 182, 212, 0.45)'; // Softer Cyan color"
);

fs.writeFileSync('index-portfolio.html', html, 'utf8');
console.log('Hero section shrunk and blended!');
