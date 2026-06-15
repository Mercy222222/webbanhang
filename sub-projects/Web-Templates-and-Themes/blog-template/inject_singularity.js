const fs = require('fs');
let html = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

// 1. PURGE OLD MATRIX (Cursor Trail Canvas & Script)
html = html.replace(/<canvas id="cursor-trail-canvas"[\s\S]*?<\/canvas>/, '');
const oldScriptRegex = /\/\/ --- INTERACTIVE PARTICLE CURSOR TRAIL ---[\s\S]*?<\/script>/;
html = html.replace(oldScriptRegex, '</script>');

// 2. INJECT SINGULARITY CSS
const singularityCSS = `
    /* SINGULARITY TIER CSS */
    .singularity-crt {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
      background-size: 100% 4px, 6px 100%;
      z-index: 99998;
      pointer-events: none;
      opacity: 0.4;
    }
    
    .singularity-spotlight {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: 99997;
      background: radial-gradient(circle 600px at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.05), transparent 80%);
      mix-blend-mode: overlay;
    }

    .singularity-flash {
      animation: global-flash 0.3s ease-out forwards;
    }
    @keyframes global-flash {
      0% { filter: invert(1) hue-rotate(180deg) brightness(2); transform: skewX(10deg); }
      50% { filter: invert(0.5) hue-rotate(90deg) brightness(1.5); transform: skewX(-5deg); }
      100% { filter: invert(0) hue-rotate(0deg) brightness(1); transform: skewX(0deg); }
    }

    /* Terminal Upgrade */
    #terminal-hud {
      background: rgba(10, 15, 25, 0.4) !important;
      backdrop-filter: blur(15px) saturate(150%);
      -webkit-backdrop-filter: blur(15px) saturate(150%);
      border: 1px solid rgba(0, 255, 255, 0.2);
      box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(0, 255, 255, 0.1) inset;
      transform-style: preserve-3d;
      perspective: 1000px;
    }
    #terminal-body {
      background: transparent !important;
    }
    .glitch-typing {
      position: relative;
    }
    .glitch-typing::before {
      content: attr(data-text);
      position: absolute;
      left: -2px;
      text-shadow: 2px 0 red;
      animation: glitch-anim-1 2s infinite linear alternate-reverse;
    }
`;

if (!html.includes('SINGULARITY TIER CSS')) {
  html = html.replace('</style>', singularityCSS + '\n  </style>');
}

// 3. INJECT HTML ELEMENTS
const singularityElements = `
  <div class="singularity-crt"></div>
  <div class="singularity-spotlight"></div>
`;
if (!html.includes('singularity-crt')) {
  html = html.replace('<div class="god-cursor"></div>', '<div class="god-cursor"></div>\n' + singularityElements);
}

// 4. INJECT SINGULARITY JS
const singularityJS = `
      // --- SINGULARITY TIER ENGINE ---
      const bodyEl = document.body;
      const spotlight = document.querySelector('.singularity-spotlight');
      
      // Spotlight logic
      document.addEventListener('mousemove', (e) => {
        spotlight.style.setProperty('--mouse-x', e.clientX + 'px');
        spotlight.style.setProperty('--mouse-y', e.clientY + 'px');
      });

      // Terminal 3D Tilt
      const terminal = document.getElementById('terminal-hud');
      if (terminal) {
        const xToTerm = gsap.quickTo(terminal, "rotationY", {duration: 0.5, ease: "power3"});
        const yToTerm = gsap.quickTo(terminal, "rotationX", {duration: 0.5, ease: "power3"});
        
        terminal.addEventListener('mousemove', (e) => {
          const rect = terminal.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          xToTerm((e.clientX - cx) * 0.05);
          yToTerm(-(e.clientY - cy) * 0.05);
        });
        terminal.addEventListener('mouseleave', () => {
          xToTerm(0);
          yToTerm(0);
        });
      }

      // Scroll Section Glitch
      const sections = document.querySelectorAll('section');
      sections.forEach(sec => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 50%",
          onEnter: () => {
            bodyEl.classList.add('singularity-flash');
            setTimeout(() => bodyEl.classList.remove('singularity-flash'), 300);
          },
          onEnterBack: () => {
            bodyEl.classList.add('singularity-flash');
            setTimeout(() => bodyEl.classList.remove('singularity-flash'), 300);
          }
        });
      });
`;

if (!html.includes('SINGULARITY TIER ENGINE')) {
  html = html.replace('// --- OMNIVERSE VELOCITY SKEW ---', singularityJS + '\n      // --- OMNIVERSE VELOCITY SKEW ---');
}

// Ensure old typing has data-text if possible, we'll just add it via JS
const typingPatch = `
      // Add data-text to typing line for glitch
      const typingLines = document.querySelectorAll('#terminal-body p');
      typingLines.forEach(p => {
        p.setAttribute('data-text', p.innerText);
        p.classList.add('glitch-typing');
      });
`;
if (!html.includes('Add data-text to typing line')) {
    html = html.replace('// Scroll Section Glitch', typingPatch + '\n      // Scroll Section Glitch');
}


fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', html);
console.log('Successfully injected Singularity Tier effects and purged old matrix.');
