const fs = require('fs');
const path = 'd:/webbanhang/blog-template/index-portfolio.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Fix Translation Overwrites
html = html.replace('id="page-greeting-header"', '');
html = html.replace('id="hero-greeting"', '');
// Also comment out the innerHTML lines just to be safe
html = html.replace("document.getElementById('page-greeting-header').innerHTML = `", "/* document.getElementById('page-greeting-header').innerHTML = `");
html = html.replace("document.getElementById('hero-greeting').textContent = t('greeting');", "// document.getElementById('hero-greeting').textContent = t('greeting');");

// 2. Fix 3D Binding (Rewrite initHeroThree to bind to three-bg-container)
const newHero3D = `
    function initHeroThree() {
      const container = document.getElementById('three-bg-container');
      if (!container) return;
      container.innerHTML = '';

      const width = container.clientWidth;
      const height = container.clientHeight;

      heroScene = new THREE.Scene();
      // Transparent background so the card gradient shows through
      heroScene.background = null;

      heroCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      heroCamera.position.z = 12; // Bring it closer to fit the card

      heroRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      heroRenderer.setSize(width, height);
      heroRenderer.setClearColor(0x000000, 0);

      if (typeof THREE.AsciiEffect !== 'undefined') {
        heroEffect = new THREE.AsciiEffect(heroRenderer, ' .:-+*=%@#', { invert: true, color: false, resolution: 0.2 });
        heroEffect.setSize(width, height);
        heroEffect.domElement.style.color = '#06b6d4'; // Cyan color
        heroEffect.domElement.style.backgroundColor = 'transparent';
        heroEffect.domElement.style.fontFamily = '"Fira Code", monospace';
        heroEffect.domElement.style.lineHeight = '1em';
        container.appendChild(heroEffect.domElement);
      } else {
        container.appendChild(heroRenderer.domElement);
        heroEffect = heroRenderer;
      }

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      heroScene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x06b6d4, 1.5);
      pointLight1.position.set(10, 10, 10);
      heroScene.add(pointLight1);
      
      const pointLight2 = new THREE.PointLight(0x10b981, 1);
      pointLight2.position.set(-10, -10, -10);
      heroScene.add(pointLight2);

      const geometry = new THREE.TorusKnotGeometry(3, 0.8, 100, 16);
      const material = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.9
      });
      
      heroMesh = new THREE.Mesh(geometry, material);
      heroScene.add(heroMesh);

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        heroCamera.aspect = w / h;
        heroCamera.updateProjectionMatrix();
        if (heroEffect) heroEffect.setSize(w, h);
        else heroRenderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // Track mouse within the card for interactive rotation
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        hTargetX = (x / rect.width) * 2 - 1;
        hTargetY = -(y / rect.height) * 2 + 1;
      });

      container.addEventListener('mouseleave', () => {
        hTargetX = 0;
        hTargetY = 0;
      });
      
      if (container.style) {
        container.style.mixBlendMode = 'screen';
      }
    }
`;

// Find initHeroThree and replace it
const startIdx = html.indexOf('function initHeroThree() {');
const endIdx = html.indexOf('function animateHeroThree(', startIdx);
if(startIdx !== -1 && endIdx !== -1) {
  html = html.substring(0, startIdx) + newHero3D + html.substring(endIdx);
}

// 3. Add CSS Keyframes and Classes for animations
const newCSS = `
    /* --- SECURIFY ANIMATIONS --- */
    @keyframes spin-gradient {
      from { --gradient-angle: 0deg; }
      to { --gradient-angle: 360deg; }
    }
    @property --gradient-angle {
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
    }
    .securify-card {
      background: rgba(15, 23, 42, 0.7) !important;
      border: 1px solid rgba(255, 255, 255, 0.05) !important;
    }
    /* Animated Border Glow */
    .securify-card::before {
      content: ""; position: absolute; inset: -2px; border-radius: inherit;
      background: conic-gradient(from var(--gradient-angle), transparent 70%, #06b6d4, #10b981);
      z-index: -1; animation: spin-gradient 4s linear infinite;
      opacity: 0.3; transition: opacity 0.3s;
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor; mask-composite: exclude;
      padding: 2px;
    }
    .securify-card:hover::before { opacity: 1; }

    /* Entrance Animations */
    .fade-up-enter {
      opacity: 0; transform: translateY(30px);
      animation: fadeUpAnim 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes fadeUpAnim {
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* Hide old visual code boxes */
    .visual-code-box, .code-symbols-container { display: none !important; }
`;

html = html.replace('/* --- SECURIFY BENTO UI --- */', newCSS + '\n    /* --- SECURIFY BENTO UI --- */');

// Add fade-up class to Hero elements
html = html.replace('<div class="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pr-8">', '<div class="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pr-8 fade-up-enter" style="animation-delay: 0.1s">');
html = html.replace('<div class="lg:col-span-5 relative h-[400px] lg:h-[500px] securify-card flex items-center justify-center p-8 group">', '<div class="lg:col-span-5 relative h-[400px] lg:h-[500px] securify-card flex items-center justify-center p-8 group fade-up-enter" style="animation-delay: 0.3s">');
html = html.replace('<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">', '<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 fade-up-enter" style="animation-delay: 0.5s">');

fs.writeFileSync(path, html);
console.log('Successfully injected Full Animations and Fixed 3D Torus.');
