// premium.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { Lensflare, LensflareElement } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/objects/Lensflare.js';

// Reflective (environment‑mapped) sphere
export function addReflectiveObject(scene) {
  const geometry = new THREE.SphereGeometry(1, 64, 64);
  // Simple placeholder env map – using a solid color if images missing
  const envMap = new THREE.CubeTextureLoader()
    .setPath('assets/env/')
    .load([
      'px.jpg','nx.jpg','py.jpg','ny.jpg','pz.jpg','nz.jpg'
    ], () => {}, undefined, () => {
      console.warn('Env map images missing – using default color');
    });
  const material = new THREE.MeshStandardMaterial({ envMap, metalness: 1, roughness: 0.1, color: 0xffffff });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(0, 0, 0);
  scene.add(sphere);
  // expose for potential animation
  scene.userData.reflective = sphere;
}

// Fog (exp exponential)
export function addFog(scene) {
  scene.fog = new THREE.FogExp2(0x0a0a0a, 0.02);
}

// Starfield / galaxy background
export function addStarfield(scene) {
  const starCount = 2000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const radius = 50 * Math.random();
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    const brightness = Math.random();
    colors[i * 3] = brightness;
    colors[i * 3 + 1] = brightness;
    colors[i * 3 + 2] = brightness;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({ size: 0.1, vertexColors: true });
  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
  scene.userData.stars = stars;
}

// Lens flare (simple)
export function addLensFlare(scene) {
  const textureFlare = new THREE.TextureLoader().load('assets/lensflare0.png');
  const lensflare = new Lensflare();
  lensflare.addElement(new LensflareElement(textureFlare, 200, 0, new THREE.Color(0xffffff)));
  const light = new THREE.PointLight(0xffffff, 1.5, 2000);
  light.position.set(0, 5, 5);
  light.add(lensflare);
  scene.add(light);
  scene.userData.lensFlareLight = light;
}

// Terrain wave plane
export function addTerrainWave(scene) {
  const geometry = new THREE.PlaneGeometry(30, 30, 128, 128);
  const material = new THREE.MeshStandardMaterial({ color: 0x112244, side: THREE.DoubleSide, flatShading: true });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -2;
  scene.add(plane);
  scene.userData.terrain = plane;
}

// Animate premium objects (terrain wave, time uniforms for shaders)
export function updatePremiumAnimations(composer, delta) {
  // Terrain wave animation – vertex displacement
  if (composer.terrain) {
    const geo = composer.terrain.geometry;
    const pos = geo.attributes.position;
    const time = performance.now() * 0.001;
    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3;
      const x = pos.array[ix];
      const y = pos.array[ix + 1];
      const z = pos.array[ix + 2];
      const wave = Math.sin(x * 2 + time) * 0.2 + Math.cos(z * 2 + time) * 0.2;
      pos.array[ix + 1] = y + wave * delta;
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  }
  // Pass uniform time updates (if present)
  if (composer.glitchPass) composer.glitchPass.uniforms.time.value += delta;
  if (composer.wavePass) composer.wavePass.uniforms.time.value += delta;
  if (composer.plasmaPass) composer.plasmaPass.uniforms.time.value += delta;
}
