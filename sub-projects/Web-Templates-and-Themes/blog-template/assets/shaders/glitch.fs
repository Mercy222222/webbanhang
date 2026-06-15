// Simple glitch fragment shader placeholder
// This shader will create a subtle distortion effect.

precision mediump float;

uniform sampler2D tDiffuse;
uniform float time;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    // Slight wobble based on time
    uv.x += sin(uv.y * 10.0 + time) * 0.005;
    uv.y += cos(uv.x * 10.0 + time) * 0.005;
    gl_FragColor = texture2D(tDiffuse, uv);
}
