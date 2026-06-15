const fs = require('fs');
const path = require('path');

const filePath = 'd:/webbanhang/blog-template/index-portfolio.html';
const html = fs.readFileSync(filePath, 'utf8');

const lines = html.split('\n');

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('/* ─── DYNAMIC 3D: TACTICAL TELEMETRY')) {
    startIndex = i;
  }
  if (lines[i].includes('/* ─── INTERACTIVE 3D PARALLAX TILT ─── */')) {
    endIndex = i;
  }
}

if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
  console.error("Markers not found");
  process.exit(1);
}

const new3DLogic = `
    /* ─── ULTRA-PREMIUM 3D: OBSIDIAN LIQUID CORE & FLUID AURORA ─── */
    
    // ==========================================
    // 1. FLUID AURORA (BACKGROUND)
    // ==========================================
    let bgScene, bgCamera, bgRenderer, bgUniforms;
    let bgMouseX = 0, bgMouseY = 0;

    // FBM Noise GLSL
    const fbmGLSL = \`
      #define NUM_OCTAVES 5
      float rand(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
      }
      float noise(vec2 p){
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);
        float res = mix(
          mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
          mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
        return res*res;
      }
      float fbm(vec2 x) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
          v += a * noise(x);
          x = rot * x * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }
    \`;

    function initBackgroundThree() {
      const container = document.getElementById('three-bg-container');
      if (!container) return;
      container.innerHTML = '';

      bgScene = new THREE.Scene();
      bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      bgRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      bgRenderer.setSize(width, height);
      bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(bgRenderer.domElement);

      bgUniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2(width, height) },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
      };

      const material = new THREE.ShaderMaterial({
        uniforms: bgUniforms,
        vertexShader: \`
          void main() {
            gl_Position = vec4(position, 1.0);
          }
        \`,
        fragmentShader: \`
          uniform vec2 u_resolution;
          uniform float u_time;
          uniform vec2 u_mouse;
          \${fbmGLSL}
          void main() {
            vec2 st = gl_FragCoord.xy/u_resolution.xy;
            st.x *= u_resolution.x/u_resolution.y;

            vec2 mouse = u_mouse / u_resolution;
            float dist = distance(st, mouse);
            
            vec2 q = vec2(0.);
            q.x = fbm(st + 0.00 * u_time);
            q.y = fbm(st + vec2(1.0));

            vec2 r = vec2(0.);
            r.x = fbm(st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
            r.y = fbm(st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

            float f = fbm(st+r);

            // Zinc 950 base: rgb(9, 9, 11)
            // Emerald 900: rgb(6, 78, 59)
            // Emerald 500: rgb(16, 185, 129)
            vec3 color = mix(vec3(0.035, 0.035, 0.043),
                             vec3(0.023, 0.305, 0.231),
                             clamp((f*f)*4.0,0.0,1.0));
                             
            color = mix(color,
                        vec3(0.062, 0.725, 0.505),
                        clamp(length(q),0.0,1.0));

            color = mix(color,
                        vec3(0.035, 0.035, 0.043),
                        clamp(length(r.x),0.0,1.0));
                        
            // Darken around edges
            float vignette = smoothstep(0.8, 0.2, length(st - vec2(0.5)));
            
            // Mouse push
            float push = smoothstep(0.4, 0.0, dist);
            color += push * vec3(0.05, 0.1, 0.08);

            gl_FragColor = vec4(color * vignette * 0.4, 1.0); // very subtle
          }
        \`,
        depthWrite: false,
        depthTest: false
      });

      const plane = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(plane, material);
      bgScene.add(mesh);

      window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        bgRenderer.setSize(w, h);
        bgUniforms.u_resolution.value.x = w;
        bgUniforms.u_resolution.value.y = h;
      });

      document.addEventListener('mousemove', (e) => {
        bgMouseX = e.clientX;
        bgMouseY = window.innerHeight - e.clientY; // Invert Y for GLSL
      });
    }

    function animateBackgroundThree(time = 0) {
      if (!bgCamera || !bgRenderer || !bgScene) return;
      requestAnimationFrame(animateBackgroundThree);
      
      bgUniforms.u_time.value += 0.01;
      
      // Smooth mouse interpolation
      bgUniforms.u_mouse.value.x += (bgMouseX - bgUniforms.u_mouse.value.x) * 0.05;
      bgUniforms.u_mouse.value.y += (bgMouseY - bgUniforms.u_mouse.value.y) * 0.05;

      bgRenderer.render(bgScene, bgCamera);
    }


    // ==========================================
    // 2. OBSIDIAN LIQUID CORE (HERO)
    // ==========================================
    let heroScene, heroCamera, heroRenderer, heroMesh;
    let heroUniforms;
    let light1, light2;
    let hMouseX = 0, hMouseY = 0, hTargetX = 0, hTargetY = 0;

    function initHeroThree() {
      const container = document.getElementById('hero-three-container');
      const box = document.getElementById('hero-3d-box');
      if (!container || !box) return;
      container.innerHTML = '';

      const width = container.clientWidth || 350;
      const height = container.clientHeight || 220;

      heroScene = new THREE.Scene();
      
      heroCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      heroCamera.position.z = 4.5;

      heroRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      heroRenderer.setSize(width, height);
      heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      heroRenderer.physicallyCorrectLights = true;
      heroRenderer.toneMapping = THREE.ACESFilmicToneMapping;
      container.appendChild(heroRenderer.domElement);

      // Environment Light (simulated via Hemisphere and Ambient)
      const ambient = new THREE.AmbientLight(0xffffff, 0.5);
      heroScene.add(ambient);
      
      // Dynamic Lights that refract inside the glass
      light1 = new THREE.PointLight(0x10b981, 10, 50); // Emerald
      light1.position.set(2, 2, 2);
      heroScene.add(light1);

      light2 = new THREE.PointLight(0x06b6d4, 10, 50); // Cyan tint
      light2.position.set(-2, -2, -2);
      heroScene.add(light2);

      // High-res geometry for smooth liquid displacement
      const geometry = new THREE.IcosahedronGeometry(1.2, 64);

      // Hyper-realistic Glass/Obsidian Material
      const material = new THREE.MeshPhysicalMaterial({
        color: 0x09090b,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.9, // glass-like
        ior: 1.5,
        thickness: 2.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 1.0
      });

      // Inject custom vertex shader for FBM displacement
      heroUniforms = {
        uTime: { value: 0 },
        uHover: { value: 0 },
        uMouseRadius: { value: 0 }
      };

      material.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = heroUniforms.uTime;
        shader.uniforms.uHover = heroUniforms.uHover;
        shader.uniforms.uMouseRadius = heroUniforms.uMouseRadius;

        shader.vertexShader = \`
          uniform float uTime;
          uniform float uHover;
          uniform float uMouseRadius;
          
          // Classic 3D Perlin Noise (simplified)
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
          vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
          float cnoise(vec3 P) {
            vec3 Pi0 = floor(P);
            vec3 Pi1 = Pi0 + vec3(1.0);
            Pi0 = mod289(Pi0);
            Pi1 = mod289(Pi1);
            vec3 Pf0 = fract(P);
            vec3 Pf1 = Pf0 - vec3(1.0);
            vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
            vec4 iy = vec4(Pi0.yy, Pi1.yy);
            vec4 iz0 = Pi0.zzzz;
            vec4 iz1 = Pi1.zzzz;
            vec4 ixy = permute(permute(ix) + iy);
            vec4 ixy0 = permute(ixy + iz0);
            vec4 ixy1 = permute(ixy + iz1);
            vec4 gx0 = ixy0 * (1.0 / 7.0);
            vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
            gx0 = fract(gx0);
            vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
            vec4 sz0 = step(gz0, vec4(0.0));
            gx0 -= sz0 * (step(0.0, gx0) - 0.5);
            gy0 -= sz0 * (step(0.0, gy0) - 0.5);
            vec4 gx1 = ixy1 * (1.0 / 7.0);
            vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
            gx1 = fract(gx1);
            vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
            vec4 sz1 = step(gz1, vec4(0.0));
            gx1 -= sz1 * (step(0.0, gx1) - 0.5);
            gy1 -= sz1 * (step(0.0, gy1) - 0.5);
            vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
            vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
            vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
            vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
            vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
            vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
            vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
            vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
            vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
            g000 *= norm0.x;
            g010 *= norm0.y;
            g100 *= norm0.z;
            g110 *= norm0.w;
            vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
            g001 *= norm1.x;
            g011 *= norm1.y;
            g101 *= norm1.z;
            g111 *= norm1.w;
            float n000 = dot(g000, Pf0);
            float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
            float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
            float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
            float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
            float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
            float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
            float n111 = dot(g111, Pf1);
            vec3 fade_xyz = fade(Pf0);
            vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
            vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
            float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
            return 2.2 * n_xyz;
          }

        \` + shader.vertexShader;

        shader.vertexShader = shader.vertexShader.replace(
          \`#include <begin_vertex>\`,
          \`
          vec3 p = position;
          // Organic FBM noise displacement
          float noise = cnoise(p * 1.5 + uTime * 0.4) * 0.3;
          float noise2 = cnoise(p * 3.0 - uTime * 0.6) * 0.15;
          
          // Reaction to hover state
          float finalNoise = (noise + noise2) * (1.0 + uHover * 1.5) + (uMouseRadius * 0.5);
          
          vec3 transformed = p + normal * finalNoise;
          \`
        );
      };

      heroMesh = new THREE.Mesh(geometry, material);
      heroScene.add(heroMesh);

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || 350;
        const h = container.clientHeight || 220;
        heroCamera.aspect = w / h;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(w, h);
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
        heroUniforms.uHover.value = THREE.MathUtils.lerp(heroUniforms.uHover.value, 1.0, 0.1);
      });

      box.addEventListener('mouseleave', () => {
        hTargetX = 0;
        hTargetY = 0;
        heroUniforms.uHover.value = THREE.MathUtils.lerp(heroUniforms.uHover.value, 0.0, 0.1);
      });
    }

    function animateHeroThree(time = 0) {
      if (!heroCamera || !heroRenderer || !heroScene) return;
      requestAnimationFrame(animateHeroThree);

      // Fluid time evolution
      if (heroUniforms) {
        heroUniforms.uTime.value = time * 0.001;
      }

      // Smooth inertia mouse tracking
      hMouseX += (hTargetX - hMouseX) * 0.05;
      hMouseY += (hTargetY - hMouseY) * 0.05;

      // Rotate the liquid core based on mouse
      if (heroMesh) {
        heroMesh.rotation.y += 0.005 + (hMouseX * 0.02);
        heroMesh.rotation.x += 0.002 - (hMouseY * 0.02);
      }

      // Orbiting lights
      if (light1 && light2) {
        light1.position.x = Math.sin(time * 0.001) * 3;
        light1.position.z = Math.cos(time * 0.001) * 3;
        light1.position.y = Math.sin(time * 0.002) * 2;

        light2.position.x = Math.cos(time * 0.0015) * -3;
        light2.position.z = Math.sin(time * 0.0015) * -3;
        light2.position.y = Math.cos(time * 0.0025) * 2;
      }

      heroRenderer.render(heroScene, heroCamera);
    }
`;

lines.splice(startIndex, endIndex - startIndex, new3DLogic);

fs.writeFileSync(filePath, lines.join('\n'));
console.log('Successfully injected Obsidian Liquid Core 3D Logic.');
