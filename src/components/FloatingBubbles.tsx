"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, useTexture, MeshDistortMaterial, Environment } from "@react-three/drei";

function Bubble({ position, scale, speed, distort }: { position: [number, number, number], scale: number, speed: number, distort: number }) {
  const texture = useTexture("/nature-sim.png");
  
  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5} position={position}>
      <mesh scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          map={texture}
          distort={distort}
          speed={0.5}
          roughness={0.5}
          metalness={0.2}
          envMapIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

export function FloatingBubbles() {
  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <Suspense fallback={null}>
          {/* Main bubble */}
          <Bubble position={[-0.2, 0.1, 0]} scale={0.5} speed={1.5} distort={0.15} />
          {/* Smaller floating bubbles - pulled closer */}
          <Bubble position={[0.6, -0.4, -0.5]} scale={0.25} speed={2} distort={0.2} />
          <Bubble position={[-0.7, -0.6, -1]} scale={0.3} speed={1} distort={0.15} />
          <Bubble position={[0.4, 0.8, -0.8]} scale={0.15} speed={1.8} distort={0.25} />
          <Bubble position={[-0.5, 0.7, -0.5]} scale={0.2} speed={1.2} distort={0.2} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}