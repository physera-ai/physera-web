"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture, MeshDistortMaterial, Environment } from "@react-three/drei";
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
}: {
  curve: THREE.Curve<THREE.Vector3>;
  color: string;
  opacity: number;
  radius?: number;
}) {
  return (
    <mesh>
      <tubeGeometry args={[curve, 64, radius, 8, false]} />
      <meshBasicMaterial color={color} opacity={opacity} transparent />
    </mesh>
  );
}

function SurfaceEdge({
  from,
  to,
  color = "#50d6ff",
}: {
  from: [number, number, number];
  to: [number, number, number];
  color?: string;
}) {
  const curve = useMemo(() => makeSurfaceCurve(from, to), [from, to]);

  return (
    <TubeLine curve={curve} color={color} opacity={0.28} radius={0.0045} />
  );
}

function DashedConnector({ to }: { to: [number, number, number] }) {
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
          color="#ffffff"
          opacity={0.12}
          radius={0.0035}
        />
      ))}
    </>
  );
}

function OrbitRing({
  rotation,
  color,
  opacity,
}: {
  rotation: [number, number, number];
  color: string;
  opacity: number;
}) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[SHELL_RADIUS, 0.0055, 8, 160]} />
      <meshBasicMaterial color={color} opacity={opacity} transparent />
    </mesh>
  );
}

function Bubble({ position }: { position: [number, number, number] }) {
  const texture = useTexture("/nature-sim.png");

  return (
    <Float speed={0.55} rotationIntensity={0.08} floatIntensity={0.08} position={position}>
      <mesh scale={NODE_SCALE}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          map={texture}
          color="#8fe2de"
          distort={0.018}
          speed={0.14}
          roughness={0.72}
          metalness={0.04}
          envMapIntensity={0.16}
          opacity={0.82}
          transparent
        />
      </mesh>
    </Float>
  );
}

function BubbleSystem() {
  const groupRef = useRef<THREE.Group>(null);

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
      <OrbitRing rotation={[0, 0, 0]} color="#70d7c8" opacity={0.42} />
      <OrbitRing rotation={[Math.PI / 2, 0, 0]} color="#38c6ff" opacity={0.32} />
      <OrbitRing rotation={[0, Math.PI / 2, 0]} color="#7485ff" opacity={0.26} />
      <OrbitRing rotation={[Math.PI / 4, Math.PI / 6, 0]} color="#e65bb9" opacity={0.28} />
      <OrbitRing rotation={[Math.PI / 4, -Math.PI / 5, Math.PI / 2]} color="#59d0ff" opacity={0.24} />
      <mesh>
        <torusGeometry args={[0.22, 0.012, 12, 80]} />
        <meshBasicMaterial color="#9bf0e4" opacity={0.54} transparent />
      </mesh>
      {SURFACE_EDGES.map(([fromIndex, toIndex], index) => (
        <SurfaceEdge
          color={index % 3 === 0 ? "#7ee7d4" : index % 3 === 1 ? "#4dccff" : "#777dff"}
          from={BLOB_POSITIONS[fromIndex]}
          key={`edge-${fromIndex}-${toIndex}`}
          to={BLOB_POSITIONS[toIndex]}
        />
      ))}
      {BLOB_POSITIONS.map((position) => (
        <DashedConnector key={`connector-${position.join("-")}`} to={position} />
      ))}
      {BLOB_POSITIONS.map((position) => (
        <Bubble key={`bubble-${position.join("-")}`} position={position} />
      ))}
    </group>
  );
}

export function FloatingBubbles() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3.35], fov: 42 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.22} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.16} />
        <Suspense fallback={null}>
          <BubbleSystem />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}