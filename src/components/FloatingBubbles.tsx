"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const SHELL_RADIUS = 1.15;
const NODE_SCALE = 0.13;

const BLOB_POSITIONS: [number, number, number][] = [
  [0, SHELL_RADIUS, 0],
  [0, -SHELL_RADIUS, 0],
  [SHELL_RADIUS, 0, 0],
  [-SHELL_RADIUS, 0, 0],
  [0, 0, SHELL_RADIUS],
  [0, 0, -SHELL_RADIUS],
  [0.72, 0.72, 0.52],
  [-0.72, 0.72, 0.52],
  [0.72, -0.72, 0.52],
  [-0.72, -0.72, 0.52],
  [0.78, 0.42, -0.74],
  [-0.78, 0.42, -0.74],
  [0.56, -0.88, -0.48],
  [-0.56, -0.88, -0.48],
];

const SURFACE_EDGES: [number, number][] = [
  [0, 6],
  [0, 7],
  [0, 10],
  [0, 11],
  [1, 8],
  [1, 9],
  [1, 12],
  [1, 13],
  [2, 6],
  [2, 8],
  [2, 10],
  [2, 12],
  [3, 7],
  [3, 9],
  [3, 11],
  [3, 13],
  [4, 6],
  [4, 7],
  [4, 8],
  [4, 9],
  [5, 10],
  [5, 11],
  [5, 12],
  [5, 13],
];

function normalizeToShell(position: [number, number, number]) {
  return new THREE.Vector3(...position).normalize().multiplyScalar(SHELL_RADIUS);
}

function makeSurfaceCurve(from: [number, number, number], to: [number, number, number]) {
  const start = normalizeToShell(from);
  const end = normalizeToShell(to);
  const points = Array.from({ length: 24 }, (_, index) => {
    const t = index / 23;
    return start.clone().lerp(end, t).normalize().multiplyScalar(SHELL_RADIUS);
  });

  return new THREE.CatmullRomCurve3(points);
}

function TubeLine({
  curve,
  color,
  opacity,
  radius = 0.005,
  isLight = false,
}: {
  curve: THREE.Curve<THREE.Vector3>;
  color: string;
  opacity: number;
  radius?: number;
  isLight?: boolean;
}) {
  return (
    <mesh>
      <tubeGeometry args={[curve, 64, radius, 8, false]} />
      <meshBasicMaterial color={color} opacity={isLight ? opacity * 1.5 : opacity} transparent />
    </mesh>
  );
}

function SurfaceEdge({
  from,
  to,
  color = "#50d6ff",
  isLight = false,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color?: string;
  isLight?: boolean;
}) {
  const curve = useMemo(() => makeSurfaceCurve(from, to), [from, to]);

  return (
    <TubeLine curve={curve} color={color} opacity={0.28} radius={0.0045} isLight={isLight} />
  );
}

function DashedConnector({ to, isLight = false }: { to: [number, number, number], isLight?: boolean }) {
  const segments = useMemo(() => {
    const end = new THREE.Vector3(...to).multiplyScalar(0.86);
    const segmentCount = 8;

    return Array.from({ length: segmentCount }, (_, index) => {
      const startT = index / segmentCount;
      const endT = startT + 0.055;
      return new THREE.LineCurve3(
        end.clone().multiplyScalar(startT),
        end.clone().multiplyScalar(endT)
      );
    });
  }, [to]);

  return (
    <>
      {segments.map((curve, index) => (
        <TubeLine
          key={`dash-${to.join("-")}-${index}`}
          curve={curve}
          color={isLight ? "#4d7350" : "#ffffff"}
          opacity={isLight ? 0.3 : 0.12}
          radius={isLight ? 0.0045 : 0.0035}
        />
      ))}
    </>
  );
}

function OrbitRing({
  rotation,
  color,
  opacity,
  isLight = false,
}: {
  rotation: [number, number, number];
  color: string;
  opacity: number;
  isLight?: boolean;
}) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[SHELL_RADIUS, 0.0055, 8, 160]} />
      <meshBasicMaterial color={color} opacity={isLight ? opacity * 1.5 : opacity} transparent />
    </mesh>
  );
}

function Bubble({ position, isLight = false }: { position: [number, number, number], isLight?: boolean }) {
  return (
    <Float speed={0.55} rotationIntensity={0.08} floatIntensity={0.08} position={position}>
      <mesh scale={NODE_SCALE}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={isLight ? "#f4ede1" : "#ffffff"}
          distort={0.12}
          speed={0.8}
          roughness={isLight ? 0.2 : 0.42}
          metalness={isLight ? 0.8 : 0}
          envMapIntensity={isLight ? 1 : 0}
          emissive={isLight ? "#749b77" : "#102f2a"}
          emissiveIntensity={isLight ? 0.4 : 0.45}
        />
      </mesh>
    </Float>
  );
}

function BubbleSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const isLight = false;

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.55,
      0.06
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.34,
      0.06
    );
  });

  return (
    <group ref={groupRef}>
      <OrbitRing rotation={[0, 0, 0]} color={isLight ? "#5eb3a5" : "#70d7c8"} opacity={0.42} isLight={isLight} />
      <OrbitRing rotation={[Math.PI / 2, 0, 0]} color={isLight ? "#2a9dc9" : "#38c6ff"} opacity={0.32} isLight={isLight} />
      <OrbitRing rotation={[0, Math.PI / 2, 0]} color={isLight ? "#5e6bc9" : "#7485ff"} opacity={0.26} isLight={isLight} />
      <OrbitRing rotation={[Math.PI / 4, Math.PI / 6, 0]} color={isLight ? "#b84792" : "#e65bb9"} opacity={0.28} isLight={isLight} />
      <OrbitRing rotation={[Math.PI / 4, -Math.PI / 5, Math.PI / 2]} color={isLight ? "#45a7cc" : "#59d0ff"} opacity={0.24} isLight={isLight} />
      <mesh>
        <torusGeometry args={[0.22, 0.012, 12, 80]} />
        <meshBasicMaterial color={isLight ? "#74c9be" : "#9bf0e4"} opacity={isLight ? 0.8 : 0.54} transparent />
      </mesh>
      {SURFACE_EDGES.map(([fromIndex, toIndex], index) => (
        <SurfaceEdge
          color={index % 3 === 0 ? (isLight ? "#63c2b1" : "#7ee7d4") : index % 3 === 1 ? (isLight ? "#38abc9" : "#4dccff") : (isLight ? "#5f65cc" : "#777dff")}
          from={BLOB_POSITIONS[fromIndex]}
          key={`edge-${fromIndex}-${toIndex}`}
          to={BLOB_POSITIONS[toIndex]}
          isLight={isLight}
        />
      ))}
      {BLOB_POSITIONS.map((position) => (
        <DashedConnector key={`connector-${position.join("-")}`} to={position} isLight={isLight} />
      ))}
      {BLOB_POSITIONS.map((position) => (
        <Bubble key={`bubble-${position.join("-")}`} position={position} isLight={isLight} />
      ))}
    </group>
  );
}

export function FloatingBubbles() {
  const isLight = false;

  return (
    <div className="w-full h-full relative overflow-hidden transition-colors duration-300">
      <Canvas camera={{ position: [0, 0, 3.35], fov: 42 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={isLight ? 0.9 : 0.72} />
        <hemisphereLight args={isLight ? ["#ffffff", "#dffaf4", 1.2] : ["#dffaf4", "#0a1110", 0.9]} />
        <directionalLight position={[5, 5, 5]} intensity={isLight ? 1.2 : 0.95} />
        <pointLight color={isLight ? "#ffffff" : "#8ff6e4"} intensity={isLight ? 0.4 : 0.65} position={[0, 0, 2.2]} />
        <directionalLight position={[-5, -5, -5]} intensity={isLight ? 0.4 : 0.24} />
        <Suspense fallback={null}>
          <BubbleSystem />
        </Suspense>
      </Canvas>
    </div>
  );
}