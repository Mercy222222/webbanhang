const fs = require('fs');
let html = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

// 1. Optimize CSS Blend Modes and Hardware Acceleration
const optimizeCSS = `
    /* PERFORMANCE OPTIMIZATIONS */
    .securify-card, .skill-card, .project-card, .bento-grid, #terminal-hud, .omniverse-liquid {
      will-change: transform;
      transform-style: flat;
      -webkit-font-smoothing: antialiased;
      backface-visibility: hidden;
    }
    
    .god-cursor {
      will-change: transform, width, height;
      transform: translateZ(0); /* Force GPU */
    }

    .singularity-spotlight {
      /* Remove mix-blend-mode for huge performance boost on full-screen fixed elements */
      mix-blend-mode: normal !important;
      background: radial-gradient(circle 600px at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.04), transparent 60%) !important;
      will-change: background;
    }
    
    .singularity-crt {
      /* Use hardware acceleration */
      transform: translateZ(0);
      will-change: opacity;
    }
`;

if (!html.includes('PERFORMANCE OPTIMIZATIONS')) {
  html = html.replace('</style>', optimizeCSS + '\n  </style>');
}

// 2. Fix the Spotlight Mouse Move logic to use RequestAnimationFrame
const oldSpotlightLogic = `      // Spotlight logic
      document.addEventListener('mousemove', (e) => {
        spotlight.style.setProperty('--mouse-x', e.clientX + 'px');
        spotlight.style.setProperty('--mouse-y', e.clientY + 'px');
      });`;

const newSpotlightLogic = `      // Spotlight logic - Optimized with rAF
      let spotX = 0, spotY = 0;
      let isSpotRunning = false;
      document.addEventListener('mousemove', (e) => {
        spotX = e.clientX;
        spotY = e.clientY;
        if(!isSpotRunning) {
          isSpotRunning = true;
          requestAnimationFrame(() => {
            spotlight.style.setProperty('--mouse-x', spotX + 'px');
            spotlight.style.setProperty('--mouse-y', spotY + 'px');
            isSpotRunning = false;
          });
        }
      });`;

html = html.replace(oldSpotlightLogic, newSpotlightLogic);

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', html);
console.log('Successfully injected Performance Optimizations.');
