const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

const start = html.indexOf('function initHeroThree()');
const end = html.indexOf('/* ─── INTERACTIVE 3D PARALLAX TILT ─── */');

if (start !== -1 && end !== -1) {
  const newCode = `function initHeroThree() {
      const container = document.getElementById('three-bg-container');
      if (!container) return;
      container.innerHTML = '';

      const width = container.clientWidth;
      const height = container.clientHeight;

      heroScene = new THREE.Scene();
      heroScene.background = null;

      heroCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      heroCamera.position.z = 18; 

      heroRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      heroRenderer.setSize(width, height);
      heroRenderer.setClearColor(0x000000, 0);
      heroRenderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(heroRenderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      heroScene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x06b6d4, 2);
      pointLight1.position.set(10, 10, 10);
      heroScene.add(pointLight1);
      
      const pointLight2 = new THREE.PointLight(0x10b981, 1.5);
      pointLight2.position.set(-10, -10, -10);
      heroScene.add(pointLight2);

      heroMesh = new THREE.Group();

      // 1. Inner Core (Solid Glowing)
      const coreGeo = new THREE.IcosahedronGeometry(2.5, 1);
      const coreMat = new THREE.MeshStandardMaterial({ 
        color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.5,
        roughness: 0.2, metalness: 0.8, wireframe: false, transparent: true, opacity: 0.9
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      heroMesh.add(coreMesh);

      // 2. Outer Wireframe Shield
      const shieldGeo = new THREE.IcosahedronGeometry(3.5, 2);
      const shieldMat = new THREE.MeshBasicMaterial({
        color: 0x10b981, wireframe: true, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending
      });
      const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
      heroMesh.add(shieldMesh);

      // 3. Scanner Rings
      const ringGeo1 = new THREE.TorusGeometry(4.5, 0.05, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat);
      ring1.rotation.x = Math.PI / 2;
      heroMesh.add(ring1);

      const ringGeo2 = new THREE.TorusGeometry(5.2, 0.03, 16, 100);
      const ring2 = new THREE.Mesh(ringGeo2, ringMat);
      ring2.rotation.y = Math.PI / 2;
      heroMesh.add(ring2);

      // 4. Data Particles
      const pGeo = new THREE.BufferGeometry();
      const pCount = 200;
      const pPos = new Float32Array(pCount * 3);
      for(let i=0; i<pCount; i++){
        pPos[i*3] = (Math.random() - 0.5) * 12;
        pPos[i*3+1] = (Math.random() - 0.5) * 12;
        pPos[i*3+2] = (Math.random() - 0.5) * 12;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ color: 0x10b981, size: 0.1, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
      const particles = new THREE.Points(pGeo, pMat);
      heroMesh.add(particles);

      // Store references for animation
      heroMesh.userData = { coreMesh, shieldMesh, ring1, ring2, particles };
      heroScene.add(heroMesh);

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        heroCamera.aspect = w / h;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

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

    function animateHeroThree(time = 0) {
      if (!heroCamera || !heroRenderer || !heroScene) return;
      requestAnimationFrame(animateHeroThree);

      hMouseX += (hTargetX - hMouseX) * 0.05;
      hMouseY += (hTargetY - hMouseY) * 0.05;

      if (heroMesh) {
        // Group interactive rotation
        heroMesh.rotation.x = hMouseY * 0.5;
        heroMesh.rotation.y = hMouseX * 0.5;

        // Internal component animation
        const { coreMesh, shieldMesh, ring1, ring2, particles } = heroMesh.userData;
        
        coreMesh.rotation.y = time * 0.0005;
        coreMesh.rotation.x = time * 0.0003;
        
        shieldMesh.rotation.y = -time * 0.0002;
        shieldMesh.rotation.z = time * 0.0004;

        ring1.rotation.x = Math.PI / 2 + Math.sin(time * 0.001) * 0.2;
        ring1.rotation.y = time * 0.001;

        ring2.rotation.y = Math.PI / 2 + Math.cos(time * 0.0008) * 0.2;
        ring2.rotation.x = -time * 0.0012;

        particles.rotation.y = time * 0.0001;
      }

      heroRenderer.render(heroScene, heroCamera);
    }

    `;

  html = html.substring(0, start) + newCode + html.substring(end);
  fs.writeFileSync('index-portfolio.html', html, 'utf8');
  console.log('Replaced ASCII Torus with Holographic Data Core');
} else {
  console.log('Could not find target boundaries for replacement.');
}
