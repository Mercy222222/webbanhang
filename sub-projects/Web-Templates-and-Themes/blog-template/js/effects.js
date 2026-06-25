import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/postprocessing/BokehPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GlitchPass } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/postprocessing/GlitchPass.js';

/**
 * Configures post‑processing composer with DOF, Bloom and Glitch effects.
 * Returns the composer ready to be rendered each frame.
 */
export function addEffects(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);

  // Render the scene first
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Depth of Field using BokehPass
  const bokehPass = new BokehPass(scene, camera, {
    focus: 1.0,
    aperture: 0.025,
    maxblur: 0.01,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  composer.addPass(bokehPass);

  // Bloom effect for neon glow
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, // strength
    0.4, // radius
    0.85 // threshold
  );
  composer.addPass(bloomPass);

  // Glitch effect – occasional distortion for visual interest
  const glitchPass = new GlitchPass();
  glitchPass.goWilder = false; // subtle glitch
  composer.addPass(glitchPass);

  // Resize handling for passes that need dimensions
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    bokehPass.setSize(w, h);
    bloomPass.setSize(w, h);
    composer.setSize(w, h);
  });

  return composer;
}
