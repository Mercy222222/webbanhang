const fs = require('fs');

const path = 'd:/webbanhang/blog-template/index-portfolio.html';
let content = fs.readFileSync(path, 'utf8');

const startMarker = "    /* ─── DYNAMIC 3D THREE.JS";
const endMarker = "    /* ─── INTERACTIVE 3D PARALLAX TILT ─── */";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if(startIndex === -1 || endIndex === -1) {
    console.error("Markers not found.");
    process.exit(1);
}

const newCode = `    /* ─── DYNAMIC 3D: TACTICAL TELEMETRY GRID & QUANTUM TESSERACT ─── */
    let scene, camera, renderer, grid;
    let particles, geometry, shaderMaterial;
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    const PARTICLE_COUNT = 100000;
    
    // Morphing Targets
    let positionsTarget1 = new Float32Array(PARTICLE_COUNT * 3); // Sphere
    let positionsTarget2 = new Float32Array(PARTICLE_COUNT * 3); // Cube
    let positionsTarget3 = new Float32Array(PARTICLE_COUNT * 3); // DNA / Cylinder
    let morphTime = 0.0;
    let targetMorphState = 0; // 0: Sphere, 1: Cube, 2: DNA
    let currentMorphState = 0;

    // Tactical Analog Overlay
    function initAnalogDegradation() {
      if(!document.getElementById('tactical-analog-overlay')){
        const style = document.createElement('style');
        style.innerHTML = \`
          #tactical-analog-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none;
            z-index: 40;
            background: repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.05) 2px,
              rgba(0, 0, 0, 0.05) 4px
            );
          }
          #tactical-film-grain {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none;
            z-index: 41;
            opacity: 0.04;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }
        \`;
        document.head.appendChild(style);
        
        const scanlines = document.createElement('div');
        scanlines.id = 'tactical-analog-overlay';
        document.body.appendChild(scanlines);
        
        const grain = document.createElement('div');
        grain.id = 'tactical-film-grain';
        document.body.appendChild(grain);
      }
    }

    function initBackgroundThree() {
      initAnalogDegradation();
      const container = document.getElementById('three-container');
      if (!container) return;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x09090b, 0.0035); // Zinc-950 depth fade

      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 250;
      camera.position.y = 80;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for perf
      container.appendChild(renderer.domElement);

      /* --- Tactical Telemetry Grid --- */
      const gridHelper = new THREE.GridHelper(2000, 100, 0x10b981, 0x27272a); // Emerald center, Zinc-800 lines
      gridHelper.position.y = -100;
      scene.add(gridHelper);
      
      const gridHelper2 = new THREE.GridHelper(2000, 100, 0x10b981, 0x27272a);
      gridHelper2.position.y = 200;
      scene.add(gridHelper2);

      // We don't animate particles globally in the background, we let the Hero Tesseract do the heavy lifting.
      // But we will add a slow pan to the camera for the background.
      
      document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX - window.innerWidth / 2) * 0.15;
        targetY = (e.clientY - window.innerHeight / 2) * 0.15;
      });

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }

    function animateBackgroundThree(time = 0) {
      requestAnimationFrame(animateBackgroundThree);
      
      mouseX += (targetX - mouseX) * 0.05; // Soft-Skill Spring inertia
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX;
      camera.position.y = 80 - mouseY;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    /* ─── DYNAMIC 3D HERO: QUANTUM TESSERACT (100k Point Cloud) ─── */
    let heroScene, heroCamera, heroRenderer;
    let heroParticles, heroParticleGeo, heroShaderMat;
    let heroMouseX = 0, heroMouseY = 0, heroTargetX = 0, heroTargetY = 0;
    
    // Shader Uniforms
    const heroUniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0x10b981) }, // Emerald
      uMorph: { value: 0.0 }, // 0 to 2
      uHover: { value: 0.0 }
    };

    const qvs = \`
      uniform float uTime;
      uniform float uMorph;
      uniform float uHover;
      
      attribute vec3 target1;
      attribute vec3 target2;
      attribute vec3 target3;
      attribute float pSize;
      
      varying float vZ;

      void main() {
        // Interpolate between shapes based on uMorph (0 to 2)
        vec3 pos = position;
        if(uMorph < 1.0) {
          pos = mix(target1, target2, uMorph);
        } else {
          pos = mix(target2, target3, uMorph - 1.0);
        }

        // Add ambient fluid motion (Soft-Skill)
        float wave = sin(pos.x * 0.05 + uTime) * cos(pos.z * 0.05 + uTime) * (1.0 + uHover * 5.0);
        pos.y += wave * 2.0;
        
        // Spin the whole cluster
        float s = sin(uTime * 0.2);
        float c = cos(uTime * 0.2);
        mat2 rotMat = mat2(c, -s, s, c);
        pos.xz = rotMat * pos.xz;
        
        // Tilt
        float s2 = sin(uTime * 0.1);
        float c2 = cos(uTime * 0.1);
        mat2 rotMat2 = mat2(c2, -s2, s2, c2);
        pos.xy = rotMat2 * pos.xy;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Perspective size
        gl_PointSize = pSize * (300.0 / -mvPosition.z) * (1.0 + uHover * 0.5);
        vZ = mvPosition.z;
      }
    \`;

    const qfs = \`
      uniform vec3 uColor;
      varying float vZ;
      void main() {
        // Circular point
        vec2 coord = gl_PointCoord - vec2(0.5);
        if(length(coord) > 0.5) discard;
        
        // Depth fade
        float depthAlpha = smoothstep(-300.0, 0.0, vZ);
        
        // Bright center, soft edge
        float glow = 1.0 - (length(coord) * 2.0);
        gl_FragColor = vec4(uColor, glow * depthAlpha * 0.8);
      }
    \`;

    let heroHoverVal = 0.0, heroHoverTarget = 0.0;
    
    function initHeroThree() {
      const container = document.getElementById('hero-three-container');
      const box = document.getElementById('hero-3d-box');
      if (!container || !box) return;

      const width = container.clientWidth || 350;
      const height = container.clientHeight || 220;

      heroScene = new THREE.Scene();
      heroCamera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
      heroCamera.position.z = 100;

      heroParticleGeo = new THREE.BufferGeometry();
      
      const posBase = new Float32Array(PARTICLE_COUNT * 3);
      const posT1 = new Float32Array(PARTICLE_COUNT * 3);
      const posT2 = new Float32Array(PARTICLE_COUNT * 3);
      const posT3 = new Float32Array(PARTICLE_COUNT * 3);
      const pSizes = new Float32Array(PARTICLE_COUNT);

      for(let i=0; i<PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        // Target 1: Sphere
        const r = 30;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        posT1[i3] = r * Math.sin(phi) * Math.cos(theta);
        posT1[i3+1] = r * Math.sin(phi) * Math.sin(theta);
        posT1[i3+2] = r * Math.cos(phi);

        // Target 2: Cube
        const s = 40;
        posT2[i3] = (Math.random() - 0.5) * s;
        posT2[i3+1] = (Math.random() - 0.5) * s;
        posT2[i3+2] = (Math.random() - 0.5) * s;
        // Push to edges to make it a hollow cube wireframe
        const edge = Math.floor(Math.random() * 3);
        if(edge===0) posT2[i3] = (Math.random() > 0.5 ? 0.5 : -0.5) * s;
        if(edge===1) posT2[i3+1] = (Math.random() > 0.5 ? 0.5 : -0.5) * s;
        if(edge===2) posT2[i3+2] = (Math.random() > 0.5 ? 0.5 : -0.5) * s;

        // Target 3: DNA Helix / Cylinder
        const h = 80;
        const rad = 15;
        const y = (Math.random() - 0.5) * h;
        const angle = y * 0.2 + (Math.random() > 0.5 ? 0 : Math.PI);
        posT3[i3] = Math.cos(angle) * rad + (Math.random()-0.5)*2;
        posT3[i3+1] = y;
        posT3[i3+2] = Math.sin(angle) * rad + (Math.random()-0.5)*2;

        pSizes[i] = Math.random() * 1.5 + 0.5;
      }

      heroParticleGeo.setAttribute('position', new THREE.BufferAttribute(posT1, 3)); // Start at T1
      heroParticleGeo.setAttribute('target1', new THREE.BufferAttribute(posT1, 3));
      heroParticleGeo.setAttribute('target2', new THREE.BufferAttribute(posT2, 3));
      heroParticleGeo.setAttribute('target3', new THREE.BufferAttribute(posT3, 3));
      heroParticleGeo.setAttribute('pSize', new THREE.BufferAttribute(pSizes, 1));

      heroShaderMat = new THREE.ShaderMaterial({
        vertexShader: qvs,
        fragmentShader: qfs,
        uniforms: heroUniforms,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      heroParticles = new THREE.Points(heroParticleGeo, heroShaderMat);
      heroScene.add(heroParticles);

      heroRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      heroRenderer.setSize(width, height);
      heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(heroRenderer.domElement);

      // Automatic morphing cycle
      setInterval(() => {
        targetMorphState = (targetMorphState + 1) % 3;
      }, 5000); // Change shape every 5 seconds

      // Mouse Physics (Spring)
      box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 2 - 1;
        const y = -(e.clientY - rect.top) / rect.height * 2 + 1;
        heroTargetX = x * 20;
        heroTargetY = y * 20;
      });

      box.addEventListener('mouseenter', () => {
        heroHoverTarget = 1.0;
      });

      box.addEventListener('mouseleave', () => {
        heroHoverTarget = 0.0;
        heroTargetX = 0;
        heroTargetY = 0;
      });

      window.addEventListener('resize', () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        heroCamera.aspect = w / h;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(w, h);
      });
      
      const hudStatuses = [
        "SYS.CORE // ACTIVE",
        "GEOM: QUANTUM_TESSERACT",
        "PARTICLES: 100,000",
        "RENDER: WebGL 2.0 (Instanced)",
        "CORE_TEMP: 32°C // OK",
        "SHADERS: GLSL_MORPH",
        "FPS: 60.0 // AUTO",
        "HUD-3D // STATUS_OK"
      ];
      let hudIndex = 0;
      setInterval(() => {
        const el = document.getElementById('hero-hud-status');
        if (el) {
          hudIndex = (hudIndex + 1) % hudStatuses.length;
          el.textContent = hudStatuses[hudIndex];
        }
      }, 3000);
    }

    function animateHeroThree(time = 0) {
      requestAnimationFrame(animateHeroThree);
      const timeSec = time * 0.001;
      
      heroMouseX += (heroTargetX - heroMouseX) * 0.08;
      heroMouseY += (heroTargetY - heroMouseY) * 0.08;
      heroHoverVal += (heroHoverTarget - heroHoverVal) * 0.1;

      // Smoothly interpolate morph state
      currentMorphState += (targetMorphState - currentMorphState) * 0.02;

      heroUniforms.uTime.value = timeSec;
      heroUniforms.uMorph.value = currentMorphState;
      heroUniforms.uHover.value = heroHoverVal;

      if(typeof currentC1 !== 'undefined') {
        heroUniforms.uColor.value.copy(currentC1); // Sync color with scroll
      }

      heroCamera.position.x = heroMouseX;
      heroCamera.position.y = heroMouseY;
      heroCamera.lookAt(0, 0, 0);

      heroRenderer.render(heroScene, heroCamera);
    }

`;

const finalContent = content.substring(0, startIndex) + newCode + content.substring(endIndex);
fs.writeFileSync(path, finalContent);
console.log('Ultimate 3D Quantum Tesseract successfully injected.');
