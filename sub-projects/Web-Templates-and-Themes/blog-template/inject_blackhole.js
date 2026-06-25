const fs = require('fs');
const path = 'd:/webbanhang/blog-template/index-portfolio.html';
let html = fs.readFileSync(path, 'utf8');

const blackHoleScript = `
  <!-- BLACK HOLE SCRIPT -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const canvas = document.getElementById('blackhole-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      // Xóa scene cũ nếu có
      if (window.blackHoleRenderer) {
          window.blackHoleRenderer.dispose();
      }

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      window.blackHoleRenderer = renderer;

      const geometry = new THREE.PlaneGeometry(2, 2);

      const vertexShader = \`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      \`;

      const fragmentShader = \`
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        varying vec2 vUv;

        float hash(float n) { return fract(sin(n) * 1e4); }
        float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

        float noise(vec2 x) {
            vec2 i = floor(x);
            vec2 f = fract(x);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        float fbm(vec2 x) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100.0);
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
            for (int i = 0; i < 6; ++i) {
                v += a * noise(x);
                x = rot * x * 2.0 + shift;
                a *= 0.5;
            }
            return v;
        }

        void main() {
            vec2 uv = (vUv - 0.5) * 2.0;
            uv.x *= uResolution.x / uResolution.y;
            
            // Parallax chuột
            uv -= uMouse * 0.05;

            // Dịch hố đen sang phải một chút giống ảnh
            uv.x -= 0.2;

            float bhRadius = 0.35;
            float r = length(uv);
            
            // 1. Thấu kính hấp dẫn (Gravitational Lensing) - Bẻ cong không gian
            vec2 warpedUv = uv;
            if (r > bhRadius) {
                float warpAmount = (bhRadius * bhRadius) / (r * r);
                warpedUv = uv * (1.0 - warpAmount);
            }
            
            vec3 color = vec3(0.0);

            // 2. Dải ngân hà nền (Bị bẻ cong)
            float starNoise = hash(warpedUv * 250.0);
            float stars = pow(starNoise, 90.0) * 3.0;
            color += vec3(stars) * vec3(0.6, 0.8, 1.0);

            // 3. Hào quang (Global Glow)
            float glow = exp(-(r - bhRadius) * 4.0);
            color += vec3(0.1, 0.25, 0.6) * glow * 1.5;
            
            // 4. Đĩa bồi tụ (Accretion Disk) - Gargantua Style
            // Tính toán trên không gian đã bị bẻ cong (warpedUv) để tự động tạo hiệu ứng Halo (vòng cung trên/dưới)
            float diskR = length(vec2(warpedUv.x, warpedUv.y * 4.5));
            float diskInner = 0.05;
            float diskOuter = 2.5;
            
            if (diskR > diskInner && diskR < diskOuter && r > bhRadius) {
                float falloff = smoothstep(diskOuter, diskInner, diskR);
                float innerFade = smoothstep(diskInner, diskInner + 0.1, diskR);
                
                // Hiệu ứng Doppler (vật chất quay về phía mắt nhìn sáng hơn)
                float doppler = 1.0 + 0.8 * smoothstep(0.0, -1.5, warpedUv.x);
                
                float angle = atan(warpedUv.y, warpedUv.x);
                vec2 noiseUv = vec2(angle * 3.0 + uTime * 0.8, diskR * 6.0 - uTime * 2.0);
                float n = fbm(noiseUv);
                float n2 = fbm(noiseUv * 2.0 + vec2(uTime));
                
                // Tông màu Xanh/Trắng giống ảnh
                vec3 color1 = vec3(0.02, 0.15, 0.5); // Deep space blue
                vec3 color2 = vec3(0.5, 0.85, 1.0);  // Bright cyan/white
                vec3 diskColor = mix(color1, color2, smoothstep(0.3, 0.7, n + n2 * 0.5));
                
                color += diskColor * (n * 0.8 + n2 * 0.5) * falloff * innerFade * 5.0 * doppler;
            }

            // Điểm sáng lóe lên ở bên trái đĩa (giống ánh sao phản chiếu trong ảnh)
            vec2 starPos = vec2(-0.8, 0.0);
            float starDist = length(warpedUv - starPos);
            float brightStar = smoothstep(0.15, 0.0, starDist);
            color += vec3(0.9, 0.95, 1.0) * pow(brightStar, 2.0) * 3.0 * glow;

            // 5. Photon Ring (Vành đai photon mỏng sát chân trời sự kiện)
            float rim = smoothstep(bhRadius + 0.02, bhRadius, r) * smoothstep(bhRadius - 0.005, bhRadius + 0.005, r);
            color += vec3(0.6, 0.9, 1.0) * rim * 4.0;
            
            // 6. Chân trời sự kiện (Event Horizon - Đen tuyệt đối)
            if (r < bhRadius) {
                color = vec3(0.0);
            }
            
            // Vignette
            float vignette = length(vUv - 0.5);
            color *= 1.0 - vignette * 0.5;

            // Tăng Contrast
            color = pow(color, vec3(1.1));

            gl_FragColor = vec4(color, 1.0);
        }
      \`;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uMouse: { value: new THREE.Vector2(0, 0) }
        },
        transparent: true
      });

      const plane = new THREE.Mesh(geometry, material);
      scene.add(plane);

      let targetMouse = new THREE.Vector2(0, 0);
      document.addEventListener('mousemove', (e) => {
        targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      });

      window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      });

      const clock = new THREE.Clock();

      function animate() {
        requestAnimationFrame(animate);
        material.uniforms.uTime.value = clock.getElapsedTime();
        material.uniforms.uMouse.value.x += (targetMouse.x - material.uniforms.uMouse.value.x) * 0.05;
        material.uniforms.uMouse.value.y += (targetMouse.y - material.uniforms.uMouse.value.y) * 0.05;
        renderer.render(scene, camera);
      }
      animate();
    });
  </script>
`;

html = html.replace(/<!-- BLACK HOLE SCRIPT -->[\s\S]*?<\/script>\s*/, '');
html = html.replace('</body>', blackHoleScript + '\n</body>');

fs.writeFileSync(path, html);
console.log('Successfully updated to Gargantua Lensing Black Hole Shader.');
