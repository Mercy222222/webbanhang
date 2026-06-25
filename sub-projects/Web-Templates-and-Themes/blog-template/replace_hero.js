const fs = require('fs');
let content = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

const startMarker = "    /* ─── DYNAMIC 3D HERO VISUAL BOX";
const endMarker = "    /* ─── INTERACTIVE 3D PARALLAX TILT ─── */";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if(startIndex === -1 || endIndex === -1) {
    console.error("Markers not found");
    process.exit(1);
}

const newCode = `    /* ─── DYNAMIC 3D HERO VISUAL BOX (Holographic Monolith) ─── */
    let heroScene, heroCamera, heroRenderer;
    let heroCore, heroGlass, heroWireframe, heroDust;
    let heroMouseX = 0, heroMouseY = 0;
    let heroTargetMouseX = 0, heroTargetMouseY = 0;
    let heroCamTheta = 0, heroCamPhi = Math.PI / 2;
    let heroHoverVal = 0.0, heroHoverTarget = 0.0;
    let heroCurrentSpeed = 0.005, heroTargetSpeed = 0.005;

    function initHeroThree() {
      const container = document.getElementById('hero-three-container');
      const box = document.getElementById('hero-3d-box');
      if (!container || !box) return;

      const width = container.clientWidth || 350;
      const height = container.clientHeight || 220;

      heroScene = new THREE.Scene();
      heroCamera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
      heroCamera.position.z = 45;

      // Add elegant studio lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      heroScene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(10, 20, 15);
      heroScene.add(dirLight);

      const pointLight = new THREE.PointLight(0x10b981, 2.5, 50); // Emerald internal glow
      pointLight.position.set(0, 0, 0);
      heroScene.add(pointLight);

      // Core Icosahedron (Solid Zinc)
      const coreGeo = new THREE.IcosahedronGeometry(6.0, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x18181b, // Zinc-900
        roughness: 0.7,
        metalness: 0.3,
        flatShading: true
      });
      heroCore = new THREE.Mesh(coreGeo, coreMat);
      heroScene.add(heroCore);

      // Glass Outer Shell (MeshPhysicalMaterial)
      const glassGeo = new THREE.IcosahedronGeometry(8.0, 1);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.15,
        transmission: 1.0, // Glass effect
        thickness: 2.0,
        ior: 1.5,
        transparent: true,
        opacity: 0.8,
        flatShading: true
      });
      heroGlass = new THREE.Mesh(glassGeo, glassMat);
      heroScene.add(heroGlass);

      // Wireframe Holographic Overlay
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x10b981, // Emerald
        wireframe: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
      });
      heroWireframe = new THREE.Mesh(glassGeo, wireMat);
      // Scale slightly up to prevent z-fighting with glass
      heroWireframe.scale.set(1.02, 1.02, 1.02);
      heroScene.add(heroWireframe);

      // Floating dust particles
      const dustCount = 80;
      const dustGeo = new THREE.BufferGeometry();
      const dustPos = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        const r = 10.0 + Math.random() * 15.0;
        const theta = Math.random() * Math.PI * 2.0;
        const phi = Math.acos((Math.random() * 2.0) - 1.0);
        dustPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        dustPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        dustPos[i * 3 + 2] = r * Math.cos(phi);
      }
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
      
      const dustMat = new THREE.PointsMaterial({
        size: 0.2,
        color: 0x10b981,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      heroDust = new THREE.Points(dustGeo, dustMat);
      heroScene.add(heroDust);

      heroRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      heroRenderer.setSize(width, height);
      heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(heroRenderer.domElement);

      // Hover and mouse interactions
      box.addEventListener('mouseenter', () => {
        heroTargetSpeed = 0.02;
        heroHoverTarget = 1.0;
        pointLight.intensity = 5.0; // Glow intensifies
      });

      box.addEventListener('mouseleave', () => {
        heroTargetSpeed = 0.005;
        heroHoverTarget = 0.0;
        heroTargetMouseX = 0;
        heroTargetMouseY = 0;
        pointLight.intensity = 2.5;
      });

      box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        heroTargetMouseX = (x / rect.width) * 2 - 1;
        heroTargetMouseY = (y / rect.height) * -2 + 1;
      });

      window.addEventListener('resize', () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        heroCamera.aspect = w / h;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(w, h);
      });

      // Status HUD log rotator
      const hudStatuses = [
        "SYS.CORE // ACTIVE",
        "GEOM: MONOLITH_V2",
        "RENDER: WebGL 2.0",
        "CORE_TEMP: 32°C // OK",
        "SHADERS: PBR_GLASS",
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

      if (heroCore && heroGlass) {
        heroCurrentSpeed += (heroTargetSpeed - heroCurrentSpeed) * 0.08;
        heroHoverVal += (heroHoverTarget - heroHoverVal) * 0.08;
        heroMouseX += (heroTargetMouseX - heroMouseX) * 0.1;
        heroMouseY += (heroTargetMouseY - heroMouseY) * 0.1;

        const scrollOffset = window.scrollY;

        // Core rotates steadily
        heroCore.rotation.y = timeSec * 0.2 + scrollOffset * 0.001;
        heroCore.rotation.x = timeSec * 0.1 + scrollOffset * 0.0005;

        // Glass shell rotates opposite and scales slightly on hover
        heroGlass.rotation.y = -timeSec * 0.15 - scrollOffset * 0.0012;
        heroGlass.rotation.z = timeSec * 0.1;
        
        // Expansion pulse
        const pulse = 1.0 + Math.sin(timeSec * 2.0) * 0.03 + (heroHoverVal * 0.08);
        heroGlass.scale.set(pulse, pulse, pulse);
        
        // Wireframe matches glass
        heroWireframe.rotation.copy(heroGlass.rotation);
        heroWireframe.scale.copy(heroGlass.scale).multiplyScalar(1.02);

        // Dust particle rotation
        if (heroDust) {
          heroDust.rotation.y = timeSec * 0.05;
          heroDust.rotation.x = timeSec * 0.02;
        }

        // Spherical camera orbit with mouse inertia
        const radius = 45;
        const targetTheta = heroMouseX * 0.4;
        const targetPhi = Math.PI / 2 + heroMouseY * 0.3;
        
        heroCamTheta += (targetTheta - heroCamTheta) * 0.05;
        heroCamPhi += (targetPhi - heroCamPhi) * 0.05;
        
        heroCamera.position.x = radius * Math.sin(heroCamPhi) * Math.sin(heroCamTheta);
        heroCamera.position.y = radius * Math.cos(heroCamPhi);
        heroCamera.position.z = radius * Math.sin(heroCamPhi) * Math.cos(heroCamTheta);
        heroCamera.lookAt(0, 0, 0);

        // Match wireframe color to current section color (from background script)
        if(typeof currentC1 !== 'undefined') {
          heroWireframe.material.color.copy(currentC1);
          heroDust.material.color.copy(currentC1);
        }
        if(currentTheme === 'dark') {
            heroWireframe.material.opacity = 0.4 + heroHoverVal * 0.3;
        } else {
            heroWireframe.material.opacity = 0.2 + heroHoverVal * 0.2;
        }
      }

      if (heroRenderer && heroScene && heroCamera) {
        heroRenderer.render(heroScene, heroCamera);
      }
    }

`;

const finalContent = content.substring(0, startIndex) + newCode + content.substring(endIndex);
fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', finalContent);
console.log('Hero Monolith replacement successful');
