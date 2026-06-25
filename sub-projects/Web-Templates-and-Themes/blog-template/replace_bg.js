const fs = require('fs');
let content = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

const startMarker = "    // Flow field particle structures";
const endMarker = "    /* ─── DYNAMIC 3D HERO VISUAL BOX";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if(startIndex === -1 || endIndex === -1) {
    console.error("Markers not found");
    process.exit(1);
}

const newCode = `    // Terrain Cybernetic Mesh Structures
    let terrainGeometry, terrainMaterial, terrainMesh;
    let clock = new THREE.Clock();

    const terrainVertexShader = \`
      uniform float uTime;
      uniform float uSpeed;
      varying vec2 vUv;
      varying float vElevation;

      // Simplex 2D noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Dynamic flowing noise
        float noiseFreq = 0.003;
        float noiseAmp = 120.0;
        vec2 noisePos = vec2(pos.x * noiseFreq, pos.y * noiseFreq - uTime * uSpeed);
        
        float elevation = snoise(noisePos) * noiseAmp;
        
        // Add secondary detail noise
        elevation += snoise(noisePos * 2.5) * (noiseAmp * 0.2);
        
        // Deepen valleys for dramatic peaks
        elevation = sign(elevation) * pow(abs(elevation), 1.05);

        pos.z += elevation;
        vElevation = elevation;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    \`;

    const terrainFragmentShader = \`
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform float uOpacity;
      varying float vElevation;

      void main() {
        // Map elevation (-150 to +150) to 0.0 - 1.0
        float mixRatio = clamp((vElevation + 100.0) / 200.0, 0.0, 1.0);
        vec3 finalColor = mix(uColor2, uColor1, mixRatio);
        
        // Add brightness to peaks
        float glow = clamp(vElevation / 80.0, 0.0, 1.0) * 0.4;

        gl_FragColor = vec4(finalColor + vec3(glow), uOpacity);
      }
    \`;

    function initThreeJS() {
      const container = document.getElementById('three-bg-container');
      if (!container) return;

      scene = new THREE.Scene();
      
      // FogExp2 to fade terrain into the deep zinc background (#09090b is zinc-950)
      scene.fog = new THREE.FogExp2(0x09090b, 0.0022);

      camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 3000);
      camera.position.set(0, 150, 400);
      camera.lookAt(0, 0, -200);

      // Create massive terrain plane
      terrainGeometry = new THREE.PlaneGeometry(3000, 3000, 140, 140);
      
      terrainMaterial = new THREE.ShaderMaterial({
        vertexShader: terrainVertexShader,
        fragmentShader: terrainFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: 0.8 },
          uColor1: { value: currentC1 },
          uColor2: { value: currentC2 },
          uOpacity: { value: 0.8 }
        },
        transparent: true,
        wireframe: true,
        blending: THREE.AdditiveBlending
      });

      terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
      // Rotate plane to lie flat
      terrainMesh.rotation.x = -Math.PI / 2;
      terrainMesh.position.y = -100;
      scene.add(terrainMesh);

      // Minimal floating data particles to complement the terrain
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 300;
      const starPositions = new Float32Array(starsCount * 3);
      for (let i = 0; i < starsCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 2000;
        starPositions[i + 1] = Math.random() * 800; // Above the terrain
        starPositions[i + 2] = (Math.random() - 0.5) * 2000;
      }
      starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      
      const starCanvas = document.createElement('canvas');
      starCanvas.width = 8;
      starCanvas.height = 8;
      const starCtx = starCanvas.getContext('2d');
      const starGrad = starCtx.createRadialGradient(4, 4, 0, 4, 4, 4);
      starGrad.addColorStop(0, 'rgba(16, 185, 129, 0.9)'); // Emerald star glow
      starGrad.addColorStop(1, 'rgba(0,0,0,0)');
      starCtx.fillStyle = starGrad;
      starCtx.fillRect(0, 0, 8, 8);
      const starTexture = new THREE.CanvasTexture(starCanvas);

      const starsMaterial = new THREE.PointsMaterial({
        size: 6,
        map: starTexture,
        transparent: true,
        opacity: currentTheme === 'dark' ? 0.6 : 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      starField = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(starField);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      document.addEventListener('mousemove', onThreeMouseMove);
      window.addEventListener('resize', onThreeWindowResize);
    }

    function onThreeMouseMove(event) {
      rawMouseX = event.clientX;
      rawMouseY = event.clientY;
      targetX = (event.clientX - windowHalfX) * 0.15;
      targetY = (event.clientY - windowHalfY) * 0.15;
    }

    function onThreeWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    let lastTime = 0;
    const colorLerpTarget = new THREE.Color();

    function animateThree(time = 0) {
      requestAnimationFrame(animateThree);
      
      const elapsedTime = clock.getElapsedTime();

      // Color interpolation based on activeSectionName
      const targetColors = sectionColors[activeSectionName] || sectionColors.home;
      const tColor1 = new THREE.Color(targetColors.c1);
      const tColor2 = new THREE.Color(targetColors.c2);
      
      currentC1.lerp(tColor1, 0.02);
      currentC2.lerp(tColor2, 0.02);

      if (terrainMaterial) {
        terrainMaterial.uniforms.uTime.value = elapsedTime;
        terrainMaterial.uniforms.uColor1.value.copy(currentC1);
        terrainMaterial.uniforms.uColor2.value.copy(currentC2);
        terrainMaterial.uniforms.uOpacity.value = currentTheme === 'dark' ? 0.85 : 0.4;
        
        // Speed up the terrain flow when scrolling to different sections
        let targetSpeed = 0.8;
        if (activeSectionName === 'workExp') targetSpeed = 2.5;
        if (activeSectionName === 'projects') targetSpeed = 3.5;
        terrainMaterial.uniforms.uSpeed.value += (targetSpeed - terrainMaterial.uniforms.uSpeed.value) * 0.02;
      }

      if (starField) {
        starField.rotation.y = elapsedTime * 0.015;
        starField.rotation.z = elapsedTime * 0.005;
        starField.material.opacity = currentTheme === 'dark' ? 0.6 : 0.2;
      }

      // Cinematic Parallax effect on camera
      const targetCamX = targetX * 1.5;
      const targetCamY = 150 - targetY * 0.8;
      
      camera.position.x += (targetCamX - camera.position.x) * 0.03;
      camera.position.y += (targetCamY - camera.position.y) * 0.03;
      camera.lookAt(0, -50, -300);

      renderer.render(scene, camera);
    }

`;

const finalContent = content.substring(0, startIndex) + newCode + content.substring(endIndex);
fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', finalContent);
console.log('Terrain replacement successful');
