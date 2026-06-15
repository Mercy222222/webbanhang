const fs = require('fs');

const filePath = 'd:/webbanhang/blog-template/index-portfolio.html';
let html = fs.readFileSync(filePath, 'utf8');

// 1. New CSS for Ultra UI
const ultraCSS = `
    /* --- BEYOND ULTRA UI --- */
    .aurora-mesh-bg {
      position: fixed; inset: -20%;
      z-index: 1; pointer-events: none;
      background-color: #030305;
      background-image: 
        radial-gradient(at 20% 30%, hsla(160, 100%, 15%, 0.4) 0px, transparent 60%),
        radial-gradient(at 80% 20%, hsla(280, 100%, 15%, 0.3) 0px, transparent 60%),
        radial-gradient(at 90% 80%, hsla(190, 100%, 15%, 0.4) 0px, transparent 60%),
        radial-gradient(at 10% 90%, hsla(220, 100%, 15%, 0.3) 0px, transparent 60%);
      animation: mesh-rotate 25s infinite alternate linear;
    }
    @keyframes mesh-rotate {
      0% { filter: hue-rotate(-20deg) blur(60px); transform: scale(1); }
      100% { filter: hue-rotate(40deg) blur(80px); transform: scale(1.1) rotate(5deg); }
    }
    .ultra-glass-card {
      position: relative;
      background: rgba(15, 15, 18, 0.4) !important;
      backdrop-filter: blur(24px) !important;
      -webkit-backdrop-filter: blur(24px) !important;
      border-radius: 1.25rem !important;
      transition: transform 0.15s ease-out, box-shadow 0.3s ease !important;
      z-index: 10;
      transform-style: preserve-3d;
      border: 1px solid rgba(255,255,255,0.03) !important; /* Fallback border */
    }
    .ultra-glass-card::before, .ultra-glass-card::after {
      content: ""; position: absolute; border-radius: inherit;
      opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
    }
    /* Spotlight Border */
    .ultra-glass-card::before {
      inset: -1px;
      background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(16, 185, 129, 0.6), transparent 40%);
      z-index: -1;
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      padding: 1px;
    }
    /* Inner Ambient Core Glow */
    .ultra-glass-card::after {
      inset: 0;
      background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(16, 185, 129, 0.05), transparent 40%);
      z-index: 1;
    }
    .ultra-glass-card:hover::before, .ultra-glass-card:hover::after { opacity: 1; }
    
    .card-glare {
      position: absolute; inset: 0; border-radius: inherit;
      background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.08), transparent 50%);
      opacity: 0; pointer-events: none; z-index: 5; transition: opacity 0.3s;
    }
    .ultra-glass-card:hover .card-glare { opacity: 1; }
    /* Hide scrollbars for cleaner look */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
`;

// Replace old enriched CSS
const startIndexCSS = html.indexOf('/* --- PREMIUM UI ENRICHMENT --- */');
if (startIndexCSS !== -1) {
  const endIndexCSS = html.indexOf('</style>', startIndexCSS);
  html = html.substring(0, startIndexCSS) + ultraCSS + '\n  ' + html.substring(endIndexCSS);
}

// 2. Replace HTML divs
const ambientStart = html.indexOf('<!-- Ambient UI Layers -->');
if (ambientStart !== -1) {
  const ambientEnd = html.indexOf('<div id="three-bg-container"', ambientStart);
  html = html.substring(0, ambientStart) + '<!-- Ultra Aurora Mesh -->\n  <div class="aurora-mesh-bg"></div>\n  <div class="dot-grid"></div>\n  ' + html.substring(ambientEnd);
}

// 3. Upgrade classes
html = html.replace(/premium-glass-card/g, 'ultra-glass-card');

// 4. Inject Javascript
const ultraJS = `
    /* --- BEYOND ULTRA JS (TILT & SPOTLIGHT) --- */
    window.addEventListener('DOMContentLoaded', () => {
      // Append glare divs
      document.querySelectorAll('.ultra-glass-card').forEach(card => {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      });

      // Global Mouse Tracker for Spotlight and Tilt
      document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.ultra-glass-card').forEach(card => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Update CSS vars for Spotlight
          card.style.setProperty('--mouse-x', \`\${x}px\`);
          card.style.setProperty('--mouse-y', \`\${y}px\`);

          // 3D Tilt Math
          const isHover = x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50;
          if (isHover) {
             const centerX = rect.left + rect.width / 2;
             const centerY = rect.top + rect.height / 2;
             const percentX = (e.clientX - centerX) / (rect.width / 2);
             const percentY = -((e.clientY - centerY) / (rect.height / 2));
             
             // Dampen tilt effect to max 6 degrees for elegance
             const rotateX = percentY * 6; 
             const rotateY = percentX * 6;
             card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.02, 1.02, 1.02)\`;
          } else {
             card.style.transform = \`perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)\`;
          }
        });
      });
    });
`;

if (!html.includes('BEYOND ULTRA JS')) {
  html = html.replace('</body>', '  <script>\n' + ultraJS + '\n  </script>\n</body>');
}

fs.writeFileSync(filePath, html);
console.log('Successfully injected Beyond Ultra UI (Spotlight & Tilt).');
