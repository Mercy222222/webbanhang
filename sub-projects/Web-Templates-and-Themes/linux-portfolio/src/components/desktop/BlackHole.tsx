"use client"
import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const BlackHoleShader = {
  uniforms: {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2() },
    mouse: { value: new THREE.Vector2(0.5, 0.5) }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    varying vec2 vUv;

    // A simplified Gargantua black hole shader
    // Features: event horizon, accretion disk, space dust
    
    // Noise function
    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                   mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
    }

    void main() {
      vec2 uv = (vUv - 0.5) * 2.0;
      uv.x *= resolution.x / resolution.y;
      
      // Add slight mouse parallax
      vec2 parallax = (mouse - 0.5) * 0.1;
      uv += parallax;

      // Base rotation and polar coords
      float angle = atan(uv.y, uv.x);
      float radius = length(uv);

      // Event Horizon
      float eventHorizon = smoothstep(0.3, 0.35, radius);
      
      // Gravitational lensing (warping space around the hole)
      vec2 warpedUv = uv;
      if (radius > 0.3) {
         float warp = 0.3 / radius;
         warpedUv = uv * (1.0 - warp * warp * 0.5);
      }

      // Accretion disk (the glowing ring)
      // The disk is squashed to look 3D (inclination)
      vec2 diskUv = uv;
      diskUv.y *= 4.0; // squash y
      float diskRadius = length(diskUv);
      
      // Disk glow and swirl
      float diskAngle = atan(diskUv.y, diskUv.x);
      float swirl = sin(diskAngle * 3.0 - time * 2.0) * 0.1;
      
      // Create rings
      float diskIntensity = smoothstep(0.8, 0.3, diskRadius) * smoothstep(0.3, 0.4, diskRadius);
      diskIntensity += smoothstep(1.5, 0.5, diskRadius) * 0.2; // outer glow
      
      // Add noise texture to disk
      float n = noise(diskUv * 5.0 - time * 0.5);
      diskIntensity *= (0.5 + 0.5 * n);
      
      // Doppler beaming: one side of the disk is brighter because it's moving towards us
      float doppler = 1.0 + 0.8 * cos(diskAngle);
      diskIntensity *= doppler;

      // Colors (Peach / Orange / Cyan matching the theme)
      vec3 diskColor = mix(vec3(0.98, 0.7, 0.53), vec3(0.13, 0.83, 0.93), radius * 0.5); // mix of peach and cyan
      vec3 finalColor = diskColor * diskIntensity * 2.0;

      // Add background stars with gravitational lensing warp
      float starNoise = noise(warpedUv * 50.0);
      float stars = pow(starNoise, 15.0) * 5.0;
      finalColor += vec3(stars) * eventHorizon;

      // Ensure center is pitch black
      finalColor *= eventHorizon;
      
      // Central glow/corona right at the edge
      float corona = smoothstep(0.4, 0.3, radius) * smoothstep(0.25, 0.3, radius);
      finalColor += vec3(0.98, 0.7, 0.53) * corona;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
}

function BlackHolePlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size, viewport } = useThree()
  
  // Track mouse for parallax
  const mouse = useRef(new THREE.Vector2(0.5, 0.5))
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth
      mouse.current.y = 1.0 - (e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(size.width, size.height) },
    mouse: { value: mouse.current }
  }), [size])

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.time.value = state.clock.elapsedTime
      material.uniforms.resolution.value.set(size.width, size.height)
      // Smooth mouse interpolation
      material.uniforms.mouse.value.lerp(mouse.current, 0.05)
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={BlackHoleShader.vertexShader}
        fragmentShader={BlackHoleShader.fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  )
}

import { useEffect } from 'react'

export default function BlackHole() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-[#050508]">
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <BlackHolePlane />
      </Canvas>
    </div>
  )
}
