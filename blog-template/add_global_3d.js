const fs = require('fs');
const path = 'd:/webbanhang/blog-template/index-portfolio.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Inject Canvas right after <body>
if (!html.includes('id="global-3d-bg"')) {
  html = html.replace(
    '<body class="bg-[#0b1121] text-zinc-300 font-sans antialiased relative selection:bg-cyan-500 selection:text-white">',
    `<body class="bg-[#0b1121] text-zinc-300 font-sans antialiased relative selection:bg-cyan-500 selection:text-white">
  <!-- GLOBAL 3D BACKGROUND -->
  <canvas id="global-3d-bg" class="fixed inset-0 w-full h-full pointer-events-none z-[-1] opacity-60"></canvas>`
  );
}

// 2. Inject Three.js Plexus logic at the end before </body>
const threeJSGlobalScript = `
  <!-- GLOBAL 3D PLEXUS SCRIPT -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const canvas = document.getElementById('global-3d-bg');
      if (!canvas || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      // Add subtle fog to blend points into the distance
      scene.fog = new THREE.FogExp2(0x0b1121, 0.002);

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 200;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Create Particles
      const particleCount = 200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = [];

      for (let i = 0; i < particleCount; i++) {
        // Spread particles in a wide 3D space
        positions[i * 3] = (Math.random() - 0.5) * 800; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 800; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 500; // z
        
        velocities.push({
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
          z: (Math.random() - 0.5) * 0.5
        });
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Point Material
      const pMaterial = new THREE.PointsMaterial({
        color: 0x06b6d4, // Cyan
        size: 3,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, pMaterial);
      scene.add(particles);

      // Lines (Plexus effect)
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x10b981, // Emerald
        transparent: true,
        opacity: 0.15
      });
      
      // We will update line geometry in the animation loop
      const lineGeometry = new THREE.BufferGeometry();
      const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(linesMesh);

      // Mouse interaction
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;

      document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
      });

      // Scroll interaction
      let scrollY = 0;
      window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
      });

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      // Animation Loop
      function animate() {
        requestAnimationFrame(animate);

        // Slowly ease target mouse
        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;

        // Move group based on scroll and mouse
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        linesMesh.rotation.x = particles.rotation.x;
        linesMesh.rotation.y = particles.rotation.y;

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        // Shift camera Z slightly on scroll
        camera.position.z = 200 - (scrollY * 0.05);
        camera.lookAt(scene.position);

        // Update particle positions
        const posAttribute = geometry.attributes.position;
        const array = posAttribute.array;
        
        let linePositions = [];

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          array[i3] += velocities[i].x;
          array[i3 + 1] += velocities[i].y;
          array[i3 + 2] += velocities[i].z;

          // Bounce off boundaries
          if (array[i3] < -400 || array[i3] > 400) velocities[i].x *= -1;
          if (array[i3 + 1] < -400 || array[i3 + 1] > 400) velocities[i].y *= -1;
          if (array[i3 + 2] < -250 || array[i3 + 2] > 250) velocities[i].z *= -1;

          // Connect nearby particles with lines
          for (let j = i + 1; j < particleCount; j++) {
            const j3 = j * 3;
            const dx = array[i3] - array[j3];
            const dy = array[i3 + 1] - array[j3 + 1];
            const dz = array[i3 + 2] - array[j3 + 2];
            const distSq = dx*dx + dy*dy + dz*dz;

            // If close enough, draw a line
            if (distSq < 10000) {
              linePositions.push(
                array[i3], array[i3 + 1], array[i3 + 2],
                array[j3], array[j3 + 1], array[j3 + 2]
              );
            }
          }
        }
        posAttribute.needsUpdate = true;

        // Update lines
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        renderer.render(scene, camera);
      }

      animate();
    });
  </script>
`;

if (!html.includes('id="global-3d-bg"')) {
    console.log("Could not find the target to inject 3D bg");
} else {
    html = html.replace('<!-- --- GSAP & 3D INTERACTION SCRIPT --- -->', threeJSGlobalScript + '\n  <!-- --- GSAP & 3D INTERACTION SCRIPT --- -->');
    fs.writeFileSync(path, html);
    console.log('Successfully injected Global 3D Plexus Background.');
}
