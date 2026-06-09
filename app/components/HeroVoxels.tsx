"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * "Population" — a wide, loosely spherical cloud of small faceted octahedra,
 * each drifting and tumbling on its own. Many independent units (agents)
 * floating in soft harmony. It doesn't spin; it floats, and parts gently around
 * the cursor. Pastel-on-cream, edges and vertices intact.
 */

const PALETTE = [
  "#f4b8c7", // pink
  "#c9bcf0", // lavender
  "#aee5d2", // mint
  "#fbd3a7", // peach
  "#abd4f2", // sky
  "#f2e6a6", // butter
  "#e2c2ec", // lilac
];

export default function HeroVoxels() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // No WebGL — skip gracefully
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Mobile screens are near-square, so a wide ellipsoid collapses into a thin
    // band. Use a rounder, fuller cloud there; keep the wide spread on desktop.
    const isMobile = window.matchMedia("(max-width: 639px)").matches;

    const count = 300;
    const rx = isMobile ? 1.9 : 3.5;
    const ry = isMobile ? 1.55 : 1.05;
    const rz = 1.6;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    // Soft, bright lighting so the pastels stay light; flat shading keeps facets
    scene.add(new THREE.AmbientLight(0xffffff, 0.82));
    const key = new THREE.DirectionalLight(0xffffff, 0.7);
    key.position.set(1, 1.6, 1.2);
    scene.add(key);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xefe7d6, 0.5));

    const geometry = new THREE.OctahedronGeometry(0.15, 0);
    const material = new THREE.MeshLambertMaterial({ flatShading: true });
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.frustumCulled = false;
    scene.add(mesh);

    type Particle = {
      base: THREE.Vector3;
      axis: THREE.Vector3;
      spin: number;
      phase: number;
      amp: THREE.Vector3;
      dphase: THREE.Vector3;
      scale: number;
    };

    const particles: Particle[] = [];
    const tmp = new THREE.Color();
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      );
      if (dir.lengthSq() < 1e-4) dir.set(0, 1, 0);
      dir.normalize();
      const r = Math.pow(Math.random(), 0.6); // center-biased fill
      const base = new THREE.Vector3(dir.x * rx * r, dir.y * ry * r, dir.z * rz * r);

      const axis = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();

      particles.push({
        base,
        axis,
        spin: (0.15 + Math.random() * 0.35) * (Math.random() < 0.5 ? -1 : 1),
        phase: Math.random() * Math.PI * 2,
        amp: new THREE.Vector3(
          0.07 + Math.random() * 0.1,
          0.09 + Math.random() * 0.12,
          0.07 + Math.random() * 0.1
        ),
        dphase: new THREE.Vector3(
          Math.random() * 6.28,
          Math.random() * 6.28,
          Math.random() * 6.28
        ),
        scale: (0.55 + Math.random() * 0.75) * (0.7 + 0.3 * (1 - r)),
      });

      const c = new THREE.Color(PALETTE[(Math.random() * PALETTE.length) | 0]);
      c.lerp(white, Math.random() * 0.18);
      mesh.setColorAt(i, c);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    const dummy = new THREE.Object3D();

    // Pointer state: parallax tilt + cursor that parts the cloud
    const ndc = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const pointerWorld = new THREE.Vector3();
    let active = 0;
    let activeTarget = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      ndc.set(nx, -ny);
      activeTarget = 1;
    };
    const onPointerLeave = () => {
      activeTarget = 0;
    };
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    const vfovTan = Math.tan((32 * Math.PI) / 180 / 2);
    const fit = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect;
      const reqH = ry + 0.7;
      const reqW = rx + 0.6;
      const dist = Math.max(reqH / vfovTan, reqW / aspect / vfovTan);
      camera.position.set(0, dist * 0.08, dist);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(container);

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(container);

    const update = (t: number) => {
      active += (activeTarget - active) * 0.07;

      if (active > 0.001) {
        raycaster.setFromCamera(ndc, camera);
        raycaster.ray.intersectPlane(plane, pointerWorld);
      }

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        let px = p.base.x + Math.sin(t * 0.6 + p.dphase.x) * p.amp.x;
        let py = p.base.y + Math.sin(t * 0.5 + p.dphase.y) * p.amp.y;
        const pz = p.base.z + Math.sin(t * 0.55 + p.dphase.z) * p.amp.z;

        // Cursor parts the cloud (repel in the xy plane)
        if (active > 0.001) {
          const ddx = px - pointerWorld.x;
          const ddy = py - pointerWorld.y;
          const d2 = ddx * ddx + ddy * ddy;
          const f = Math.exp(-d2 * 0.55) * 0.85 * active;
          const inv = 1 / Math.sqrt(d2 + 1e-3);
          px += ddx * inv * f;
          py += ddy * inv * f;
        }

        dummy.position.set(px, py, pz);
        dummy.quaternion.setFromAxisAngle(p.axis, t * p.spin + p.phase);
        dummy.scale.setScalar(p.scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    const start = performance.now();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      update((performance.now() - start) / 1000);
    };

    if (prefersReduced) {
      fit();
      update(0);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="h-[300px] w-full max-w-[940px] touch-none sm:h-[300px]"
    />
  );
}
