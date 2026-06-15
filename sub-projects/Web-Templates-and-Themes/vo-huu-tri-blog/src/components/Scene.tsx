"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Lightformer } from "@react-three/drei";
import * as THREE from "three";

function GlassShape({ position, scale, geometry, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={meshRef} scale={scale}>
        {geometry}
        <meshPhysicalMaterial 
          color={color}
          transmission={0.9}
          opacity={1}
          metalness={0.1}
          roughness={0.1}
          ior={1.5}
          thickness={2}
          specularIntensity={1}
          clearcoat={1}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -2, pointerEvents: "none", background: "#050505" }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#199386" />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
        
        {/* Main Center Object */}
        <GlassShape 
          position={[0, 0, 0]} 
          scale={2.5} 
          geometry={<torusKnotGeometry args={[1, 0.3, 128, 32]} />} 
          color="#ffffff" 
        />
        
        {/* Floating background objects */}
        <GlassShape 
          position={[-4, 3, -4]} 
          scale={1.5} 
          geometry={<icosahedronGeometry args={[1, 0]} />} 
          color="#199386" 
        />
        <GlassShape 
          position={[4, -3, -2]} 
          scale={1} 
          geometry={<octahedronGeometry args={[1, 0]} />} 
          color="#29d1c0" 
        />
        <GlassShape 
          position={[-5, -2, -6]} 
          scale={2} 
          geometry={<sphereGeometry args={[1, 32, 32]} />} 
          color="#ffffff" 
        />
        
        {/* Apple HIG soft shadow */}
        <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={4} />
        
        {/* Environment reflections */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[5, -1, -1]} scale={[10, 2, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
          </group>
        </Environment>

      </Canvas>
    </div>
  );
}
