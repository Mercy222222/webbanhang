const fs = require('fs');
const path = require('path');

const filePath = 'd:/webbanhang/blog-template/index-portfolio.html';
const html = fs.readFileSync(filePath, 'utf8');

const lines = html.split('\n');

let startIndex = -1;
let endIndex = -1;
let threeScriptIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('/* ─── ULTRA-PREMIUM 3D:')) {
    startIndex = i;
  }
  if (lines[i].includes('/* ─── INTERACTIVE 3D PARALLAX TILT ─── */')) {
    endIndex = i;
  }
  if (lines[i].includes('ajax/libs/three.js/r128/three.min.js')) {
    threeScriptIndex = i;
  }
}

if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
  console.error("Markers not found");
  process.exit(1);
}

// 1. Inject AsciiEffect
if (threeScriptIndex !== -1 && !html.includes('AsciiEffect.js')) {
  lines.splice(threeScriptIndex + 1, 0, '  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/effects/AsciiEffect.js"></script>');
  // Adjust indexes after splice
  startIndex++;
  endIndex++;
}

// 2. The Brutalist ASCII Logic
const new3DLogic = `
    /* ─── BRUTALIST 3D: ASCII TORUS & TERMINAL VOID ─── */
    
    // ==========================================
    // 1. TERMINAL VOID (BACKGROUND)
    // ==========================================
    let bgScene, bgCamera, bgRenderer, bgGrid;
    let bgMouseX = 0, bgMouseY = 0;

    function initBackgroundThree() {
      const container = document.getElementById('three-bg-container');
      if (!container) return;
      container.innerHTML = '';

      bgScene = new THREE.Scene();
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      bgCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
      bgCamera.position.y = 40;
      bgCamera.position.z = 100;
      bgCamera.lookAt(0, 0, 0);

      bgRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      bgRenderer.setSize(width, height);
      bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(bgRenderer.domElement);

      // Raw Hacker Grid
      bgGrid = new THREE.GridHelper(300, 60, 0x10b981, 0x09090b);
      bgGrid.material.opacity = 0.15;
      bgGrid.material.transparent = true;
      bgScene.add(bgGrid);

      window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        bgCamera.aspect = w / h;
        bgCamera.updateProjectionMatrix();
        bgRenderer.setSize(w, h);
      });

      document.addEventListener('mousemove', (e) => {
        bgMouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        bgMouseY = (e.clientY - window.innerHeight / 2) * 0.05;
      });
    }

    function animateBackgroundThree(time = 0) {
      if (!bgCamera || !bgRenderer || !bgScene) return;
      requestAnimationFrame(animateBackgroundThree);
      
      // Infinite scroll effect on grid
      if (bgGrid) {
        bgGrid.position.z = (time * 0.02) % 5;
      }

      // Parallax camera
      bgCamera.position.x += (bgMouseX - bgCamera.position.x) * 0.05;
      bgCamera.lookAt(0, 0, 0);

      bgRenderer.render(bgScene, bgCamera);
    }

    // ==========================================
    // 2. ASCII TORUS KNOT (HERO)
    // ==========================================
    let heroScene, heroCamera, heroRenderer, heroEffect, heroMesh;
    let hMouseX = 0, hMouseY = 0, hTargetX = 0, hTargetY = 0;

    function initHeroThree() {
      const container = document.getElementById('hero-three-container');
      const box = document.getElementById('hero-3d-box');
      if (!container || !box) return;
      container.innerHTML = '';

      const width = container.clientWidth || 350;
      const height = container.clientHeight || 220;

      heroScene = new THREE.Scene();
      // Black background for the ASCII characters to rest on
      heroScene.background = new THREE.Color(0x000000);

      heroCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      heroCamera.position.z = 18;

      // Base renderer
      heroRenderer = new THREE.WebGLRenderer({ antialias: false });
      heroRenderer.setSize(width, height);

      // ASCII Effect Wrapper
      if (typeof THREE.AsciiEffect !== 'undefined') {
        heroEffect = new THREE.AsciiEffect(heroRenderer, ' .:-+*=%@#', { invert: true, color: false, resolution: 0.18 });
        heroEffect.setSize(width, height);
        // Force the text color to Emerald and font to Monospace
        heroEffect.domElement.style.color = '#10b981';
        heroEffect.domElement.style.backgroundColor = 'transparent';
        heroEffect.domElement.style.fontFamily = '"Fira Code", monospace';
        heroEffect.domElement.style.lineHeight = '1em';
        container.appendChild(heroEffect.domElement);
      } else {
        // Fallback if CDN fails
        container.appendChild(heroRenderer.domElement);
        heroEffect = heroRenderer;
      }

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      heroScene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0xffffff, 1);
      pointLight1.position.set(10, 10, 10);
      heroScene.add(pointLight1);
      
      const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
      pointLight2.position.set(-10, -10, -10);
      heroScene.add(pointLight2);

      // Complex Mathematical Geometry (Torus Knot)
      const geometry = new THREE.TorusKnotGeometry(4, 1.2, 100, 16);
      
      // Standard material to interact with light and create luminance for ASCII
      const material = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        roughness: 0.4,
        metalness: 0.8
      });
      
      heroMesh = new THREE.Mesh(geometry, material);
      heroScene.add(heroMesh);

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || 350;
        const h = container.clientHeight || 220;
        heroCamera.aspect = w / h;
        heroCamera.updateProjectionMatrix();
        if (heroEffect) heroEffect.setSize(w, h);
        else heroRenderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // Interactive Mouse tracking
      const boxRect = box.getBoundingClientRect();
      box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        hTargetX = (x / rect.width) * 2 - 1;
        hTargetY = -(y / rect.height) * 2 + 1;
      });

      box.addEventListener('mouseleave', () => {
        hTargetX = 0;
        hTargetY = 0;
      });
      
      // Force mix-blend-mode to make black background of ASCII transparent relative to parent
      if (container.style) {
        container.style.mixBlendMode = 'screen';
      }
    }

    function animateHeroThree(time = 0) {
      if (!heroCamera || !heroRenderer || !heroScene) return;
      requestAnimationFrame(animateHeroThree);

      // Smooth inertia mouse tracking
      hMouseX += (hTargetX - hMouseX) * 0.05;
      hMouseY += (hTargetY - hMouseY) * 0.05;

      // Rotate the ASCII Torus
      if (heroMesh) {
        heroMesh.rotation.x = time * 0.0005 + hMouseY * 0.5;
        heroMesh.rotation.y = time * 0.001 + hMouseX * 0.5;
      }

      if (heroEffect) {
        heroEffect.render(heroScene, heroCamera);
      } else {
        heroRenderer.render(heroScene, heroCamera);
      }
    }
`;

lines.splice(startIndex, endIndex - startIndex, new3DLogic);

fs.writeFileSync(filePath, lines.join('\n'));
console.log('Successfully injected Brutalist ASCII Torus Logic.');
