const fs = require('fs');
const path = 'd:/webbanhang/blog-template/index-portfolio.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Inject EffectComposer & BloomPass CDNs in HEAD
if (!html.includes('EffectComposer.js')) {
  html = html.replace(
    '<!-- GSAP & ScrollTrigger -->',
    `<!-- Three.js Post-Processing (Bloom) -->
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/EffectComposer.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/RenderPass.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/ShaderPass.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/CopyShader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/LuminosityHighPassShader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/UnrealBloomPass.js"></script>
  
  <!-- GSAP & ScrollTrigger -->`
  );
}

// 2. Add Glare CSS
const glareCSS = `
    /* Beyond Ultra: Glare Effect */
    .securify-card {
      position: relative;
      overflow: hidden; /* Contain glare */
    }
    .securify-card .glare {
      position: absolute;
      top: 0; left: 0; width: 200%; height: 200%;
      background: linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.1) 25%, transparent 30%);
      pointer-events: none;
      transform: translate(-100%, -100%);
      transition: transform 0.1s linear;
      z-index: 20;
    }
    .securify-card:hover {
      box-shadow: 0 30px 60px -15px rgba(6, 182, 212, 0.25), 0 0 20px 2px rgba(6, 182, 212, 0.1) inset;
    }
`;

if (!html.includes('Beyond Ultra: Glare Effect')) {
  html = html.replace('/* --- SECURIFY BENTO UI --- */', glareCSS + '\n    /* --- SECURIFY BENTO UI --- */');
}

// Inject `<div class="glare"></div>` into all `.securify-card`s if not already present
html = html.replace(/<div class="(.*?securify-card.*?)">/g, (match, classes) => {
  if (match.includes('glare')) return match;
  return `<div class="${classes}">\n          <div class="glare"></div>`;
});

// 3. Rewrite GSAP Script for Cinematic 3D Reveal & Tilt
const oldGsapRegex = /<!-- --- GSAP & 3D INTERACTION SCRIPT --- -->[\s\S]*?(?=<\/script>\s*<\/body>)/;
const newGsapScript = `<!-- --- GSAP & 3D INTERACTION SCRIPT --- -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Beyond Ultra Text Scrub (3D Flip & Blur)
      const splitText = document.getElementById('about-scrub');
      if (splitText) {
        const words = splitText.innerText.split(' ');
        splitText.innerHTML = '';
        words.forEach(word => {
          const span = document.createElement('span');
          span.innerText = word + ' ';
          span.style.display = 'inline-block'; // Required for transform
          splitText.appendChild(span);
        });

        gsap.fromTo('#about-scrub span', 
          { opacity: 0, rotationX: -90, z: -100, filter: 'blur(10px)', y: 20 },
          {
            scrollTrigger: {
              trigger: '#about-scrub',
              start: 'top 85%',
              end: 'bottom 40%',
              scrub: 1.5,
            },
            opacity: 1, rotationX: 0, z: 0, filter: 'blur(0px)', y: 0,
            stagger: 0.05, ease: 'back.out(1.7)'
          }
        );
      }

      // 2. Work Experience Pinned Scroll
      const workPinned = document.getElementById('work-pinned');
      const workScroll = document.getElementById('work-scroll');
      if (workPinned && workScroll && window.innerWidth >= 1024) {
        ScrollTrigger.create({
          trigger: '#workExp',
          start: 'top 20%',
          end: 'bottom bottom',
          pin: '#work-pinned',
          pinSpacing: false,
        });
      }

      // 3. Origami Fold-Out Reveals
      gsap.utils.toArray('.gs-reveal-up').forEach(elem => {
        gsap.fromTo(elem, 
          { y: 100, opacity: 0, rotationX: 30, scale: 0.9 }, 
          {
            scrollTrigger: { trigger: elem, start: 'top 90%', toggleActions: 'play none none reverse' },
            y: 0, opacity: 1, rotationX: 0, scale: 1,
            duration: 1.2, ease: 'elastic.out(1, 0.7)'
          }
        );
      });

      gsap.utils.toArray('.gs-reveal-right').forEach((elem, i) => {
        gsap.fromTo(elem, 
          { x: -100, opacity: 0, rotationY: -30, scale: 0.9 }, 
          {
            scrollTrigger: { trigger: elem, start: 'top 85%', toggleActions: 'play none none reverse' },
            x: 0, opacity: 1, rotationY: 0, scale: 1,
            duration: 1.2, ease: 'elastic.out(1, 0.7)', delay: i * 0.15
          }
        );
      });

      // 4. Extreme Spring Physics Hover + Glare
      const cards = document.querySelectorAll('.securify-card');
      cards.forEach(card => {
        const glare = card.querySelector('.glare');
        card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          card.style.setProperty('--mouse-x', \`\${x}px\`);
          card.style.setProperty('--mouse-y', \`\${y}px\`);
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          // Deeper tilt
          const tiltX = ((y - centerY) / centerY) * -12; 
          const tiltY = ((x - centerX) / centerX) * 12;
          
          card.style.transform = \`perspective(1000px) rotateX(\${tiltX}deg) rotateY(\${tiltY}deg) scale3d(1.05, 1.05, 1.05)\`;
          
          // Glare movement
          if (glare) {
            const percentageX = (x / rect.width) * 100;
            const percentageY = (y / rect.height) * 100;
            glare.style.transform = \`translate(\${percentageX - 100}%, \${percentageY - 100}%)\`;
          }
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = \`perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)\`;
          if (glare) glare.style.transform = \`translate(-100%, -100%)\`;
        });
      });
    });
  `;

html = html.replace(oldGsapRegex, newGsapScript);

// 4. Rewrite GLOBAL 3D PLEXUS SCRIPT
const oldPlexusRegex = /<!-- GLOBAL 3D PLEXUS SCRIPT -->[\s\S]*?(?=<!-- --- GSAP & 3D INTERACTION SCRIPT --- -->)/;
const newPlexusScript = `<!-- GLOBAL 3D PLEXUS SCRIPT -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const canvas = document.getElementById('global-3d-bg');
      if (!canvas || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0b1121, 0.0015);

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
      camera.position.z = 300;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Unreal Bloom Setup
      let composer;
      if (typeof THREE.EffectComposer !== 'undefined') {
        const renderScene = new THREE.RenderPass(scene, camera);
        const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0;
        bloomPass.strength = 2.0; // Intense neon glow
        bloomPass.radius = 0.5;

        composer = new THREE.EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
      }

      // 1. Particles (Plexus)
      const particleCount = 250;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = [];
      const basePositions = [];

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 1200;
        const y = (Math.random() - 0.5) * 1200;
        const z = (Math.random() - 0.5) * 800;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        basePositions.push({ x, y, z });
        velocities.push({ x: 0, y: 0, z: 0 });
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const pMaterial = new THREE.PointsMaterial({
        color: 0x06b6d4, size: 4, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending
      });
      const particles = new THREE.Points(geometry, pMaterial);
      scene.add(particles);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x10b981, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending
      });
      const lineGeometry = new THREE.BufferGeometry();
      const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(linesMesh);

      // 2. Floating Icosahedrons (Giant wireframe objects)
      const icoGroup = new THREE.Group();
      const icoGeo = new THREE.IcosahedronGeometry(80, 0);
      const icoMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.15 });
      for (let i=0; i<5; i++) {
        const mesh = new THREE.Mesh(icoGeo, icoMat);
        mesh.position.set((Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1000 - 300);
        mesh.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
        icoGroup.add(mesh);
      }
      scene.add(icoGroup);

      // Mouse & Raycaster for Repulsion
      let mouse = new THREE.Vector2();
      let targetCamera = { x: 0, y: 0 };
      const raycaster = new THREE.Raycaster();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      let pointOfIntersection = new THREE.Vector3();

      document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        targetCamera.x = mouse.x * 100;
        targetCamera.y = mouse.y * 100;
      });

      let scrollY = 0;
      window.addEventListener('scroll', () => { scrollY = window.scrollY; });

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if(composer) composer.setSize(window.innerWidth, window.innerHeight);
      });

      function animate() {
        requestAnimationFrame(animate);

        // Repulsion Physics
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, pointOfIntersection);

        const posAttribute = geometry.attributes.position;
        const array = posAttribute.array;
        let linePositions = [];

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          let px = array[i3], py = array[i3+1], pz = array[i3+2];
          let bx = basePositions[i].x, by = basePositions[i].y, bz = basePositions[i].z;

          // Push away from mouse intersection
          const dx = px - pointOfIntersection.x;
          const dy = py - pointOfIntersection.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const force = Math.max(0, 250 - dist) * 0.05;

          if (dist < 250) {
            velocities[i].x += (dx / dist) * force;
            velocities[i].y += (dy / dist) * force;
          }

          // Spring back to base position
          velocities[i].x += (bx - px) * 0.02;
          velocities[i].y += (by - py) * 0.02;
          velocities[i].z += (bz - pz) * 0.02;

          // Dampening
          velocities[i].x *= 0.9;
          velocities[i].y *= 0.9;
          velocities[i].z *= 0.9;

          array[i3] += velocities[i].x;
          array[i3+1] += velocities[i].y;
          array[i3+2] += velocities[i].z;

          // Lines
          for (let j = i + 1; j < particleCount; j++) {
            const j3 = j * 3;
            const dpx = array[i3] - array[j3];
            const dpy = array[i3 + 1] - array[j3 + 1];
            const dpz = array[i3 + 2] - array[j3 + 2];
            if (dpx*dpx + dpy*dpy + dpz*dpz < 20000) {
              linePositions.push(array[i3], array[i3 + 1], array[i3 + 2], array[j3], array[j3 + 1], array[j3 + 2]);
            }
          }
        }
        posAttribute.needsUpdate = true;
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        // Group Rotations
        particles.rotation.y += 0.0005;
        linesMesh.rotation.y = particles.rotation.y;
        
        icoGroup.children.forEach(mesh => {
          mesh.rotation.x += 0.001;
          mesh.rotation.y += 0.002;
        });
        icoGroup.rotation.y -= 0.0005;

        // Camera Smooth Movement
        camera.position.x += (targetCamera.x - camera.position.x) * 0.02;
        camera.position.y += (targetCamera.y - camera.position.y) * 0.02;
        camera.position.z = 300 - (scrollY * 0.08);
        camera.lookAt(scene.position);

        if (composer) composer.render();
        else renderer.render(scene, camera);
      }
      animate();
    });
  </script>
`;

html = html.replace(oldPlexusRegex, newPlexusScript);

fs.writeFileSync(path, html);
console.log('Beyond Ultra scripts successfully applied!');
