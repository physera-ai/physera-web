"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface MorphingParticlesProps {
  className?: string;
}

export function MorphingParticles({ className = "" }: MorphingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 400;
    const height = rect.height || 400;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const isLight = resolvedTheme === "light";

    // Define unique color palettes for each of the 4 shapes
    // Format: [[R, G, B], [R, G, B], gradientType]
    // gradientType: 0 = Vertical, 1 = Horizontal, 2 = Radial
    const applyLightMode = (c: number[]) => isLight ? [Math.max(0, c[0] - 80), Math.max(0, c[1] - 80), Math.max(0, c[2] - 80)] : c;

    const palettes = [
      // Shape 0: Double Helix (Vertical: Cyan to Deep Blue)
      [
        applyLightMode([0, 242, 254]), 
        applyLightMode([20, 80, 255]), 
        0
      ],
      // Shape 1: Grid (Radial: Magenta to Peach)
      [
        applyLightMode([255, 8, 68]), 
        applyLightMode([255, 177, 153]), 
        2
      ],
      // Shape 2: Flower (Radial: Yellow center to Red/Pink edges)
      [
        applyLightMode([255, 230, 0]), 
        applyLightMode([255, 0, 100]), 
        2
      ],
      // Shape 3: Lissajous Knot (Horizontal: Emerald to Mint)
      [
        applyLightMode([0, 200, 100]), 
        applyLightMode([100, 255, 200]), 
        1
      ]
    ];

    let animationFrameId: number;
    let particles: { 
      x: number; 
      y: number; 
      offset: number; 
      size: number; 
      glow: number;
    }[] = [];
    
    const targetSets: {x: number, y: number}[][] = [];
    let time = 0;

    let pointer = { x: -1000, y: -1000 };
    let pointerIsActive = false;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      pointer.x = (clientX - rect.left) * dpr;
      pointer.y = (clientY - rect.top) * dpr;
      pointerIsActive = true;
    };
    
    const handlePointerLeave = () => {
      pointerIsActive = false;
      pointer = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove);
    canvas.addEventListener('mouseleave', handlePointerLeave);
    canvas.addEventListener('touchend', handlePointerLeave);

    const numParticles = 3000;
    const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);

    // Shape 0: Double Helix / Waveform
    let helixPoints = [];
    const radiusX = width * 0.45; // Fill full width
    for(let i = 0; i < numParticles; i++) {
      const t = i / numParticles;
      const angle = t * Math.PI * 8; // 4 turns
      const strand = i % 2 === 0 ? 1 : -1;
      const yOffset = (t - 0.5) * height * 0.96; // Full height
      const r = radiusX + (Math.random() - 0.5) * 20;
      helixPoints.push({
        x: width / 2 + Math.cos(angle) * r * strand,
        y: height / 2 + yOffset
      });
    }
    targetSets.push(shuffle(helixPoints));

    // Shape 1: 8x8 Grid
    let gridPoints = [];
    const gridSize = 8;
    const spacingX = (width * 0.96) / (gridSize - 1);
    const spacingY = (height * 0.96) / (gridSize - 1);
    const startX = width * 0.02;
    const startY = height * 0.02;

    for(let i = 0; i < numParticles; i++) {
      const gx = Math.floor(Math.random() * gridSize);
      const gy = Math.floor(Math.random() * gridSize);
      const scatterR = Math.random() * 12;
      const scatterTheta = Math.random() * Math.PI * 2;
      gridPoints.push({
        x: startX + gx * spacingX + Math.cos(scatterTheta) * scatterR,
        y: startY + gy * spacingY + Math.sin(scatterTheta) * scatterR
      });
    }
    targetSets.push(shuffle(gridPoints));

    // Shape 2: Flower (Rose Curve)
    let flowerPoints = [];
    const petalCount = 6;
    for(let i = 0; i < numParticles; i++) {
      const theta = Math.random() * Math.PI * 2;
      const petalLength = Math.min(width, height) * 0.49; // Reach absolute edge
      const maxR = petalLength * Math.abs(Math.sin((petalCount / 2) * theta));
      const r = Math.pow(Math.random(), 0.5) * maxR + (Math.random() - 0.5) * 8;
      flowerPoints.push({
        x: width / 2 + Math.cos(theta) * r,
        y: height / 2 + Math.sin(theta) * r
      });
    }
    targetSets.push(shuffle(flowerPoints));

    // Shape 3: Lissajous Curve (Complex figure-8/knot)
    let knotPoints = [];
    for(let i = 0; i < numParticles; i++) {
      const t = Math.random() * Math.PI * 2;
      const a = width * 0.48; // Edge to edge
      const b = height * 0.48; // Edge to edge
      const x = a * Math.sin(3 * t) + (Math.random() - 0.5) * 15;
      const y = b * Math.sin(2 * t) + (Math.random() - 0.5) * 15;
      knotPoints.push({
        x: width / 2 + x,
        y: height / 2 + y
      });
    }
    targetSets.push(shuffle(knotPoints));

    // Initialize particles at Shape 0 (Helix)
    targetSets[0].forEach(pt => {
      particles.push({
        x: pt.x,
        y: pt.y,
        offset: Math.random() * Math.PI * 2,
        size: Math.random() * 2 + 1.5,
        glow: 0,
      });
    });

    let currentTargetIndex = 0;
    let lastSwitchTime = Date.now();
    
    // State for smooth palette transitioning
    let currentColor1 = [...palettes[0][0]] as number[];
    let currentColor2 = [...palettes[0][1]] as number[];
    let currentGradType = palettes[0][2] as number;

    const render = () => {
      time += 0.03;
      const now = Date.now();
      
      // Switch targets every 5 seconds
      if (now - lastSwitchTime > 5000) {
        currentTargetIndex = (currentTargetIndex + 1) % targetSets.length;
        lastSwitchTime = now;
      }

      const targetPalette = palettes[currentTargetIndex];
      const tColor1 = targetPalette[0] as number[];
      const tColor2 = targetPalette[1] as number[];
      const targetGradType = targetPalette[2] as number;

      // Smoothly interpolate the global gradient colors to the new shape's palette
      currentColor1 = currentColor1.map((c, i) => c + (tColor1[i] - c) * 0.05);
      currentColor2 = currentColor2.map((c, i) => c + (tColor2[i] - c) * 0.05);
      
      // Snap the gradient type halfway through the color transition
      if (Math.abs(currentColor1[0] - tColor1[0]) < 20) {
        currentGradType = targetGradType;
      }

      const activeTargets = targetSets[currentTargetIndex];

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        const target = activeTargets[i];
        
        // Idle wiggle motion
        const moveX = Math.sin(time + p.offset) * 1.5;
        const moveY = Math.cos(time * 0.8 + p.offset) * 1.5;

        let targetX = target.x + moveX;
        let targetY = target.y + moveY;

        // Interaction Logic: Color Glow Only
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120 * dpr;

        if (pointerIsActive && dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.glow = Math.min(1, p.glow + 0.05 * force);
        } else {
          p.glow = Math.max(0, p.glow - 0.03);
        }

        // Smooth easing towards the calculated target
        // Slightly faster snap back so it feels springy
        p.x += (targetX - p.x) * 0.06;
        p.y += (targetY - p.y) * 0.06;

        // Calculate gradient factor 't' based on the particle's current screen position
        let gradT = 0;
        if (currentGradType === 0) { // Vertical Gradient
          gradT = p.y / height;
        } else if (currentGradType === 1) { // Horizontal Gradient
          gradT = p.x / width;
        } else if (currentGradType === 2) { // Radial Gradient
          const cx = p.x - width / 2;
          const cy = p.y - height / 2;
          const radialDist = Math.sqrt(cx * cx + cy * cy);
          gradT = radialDist / (Math.min(width, height) / 1.5);
        }
        
        // Clamp between 0 and 1
        gradT = Math.max(0, Math.min(1, gradT));

        let r = Math.round(currentColor1[0] + (currentColor2[0] - currentColor1[0]) * gradT);
        let g = Math.round(currentColor1[1] + (currentColor2[1] - currentColor1[1]) * gradT);
        let b = Math.round(currentColor1[2] + (currentColor2[2] - currentColor1[2]) * gradT);

        // Apply glow
        if (p.glow > 0) {
          // Push color towards bright white, but minimize it to keep it subtle
          r = Math.round(r + (255 - r) * p.glow * 0.5);
          g = Math.round(g + (255 - g) * p.glow * 0.5);
          b = Math.round(b + (255 - b) * p.glow * 0.5);
        }

        const dynamicSize = p.size + p.glow * 1.5 * dpr;
        const dynamicOpacity = 0.22 + p.glow * 0.4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, dynamicSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dynamicOpacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('mouseleave', handlePointerLeave);
      canvas.removeEventListener('touchend', handlePointerLeave);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full object-contain ${className}`}
      style={{ display: "block", margin: "0 auto" }}
    />
  );
}
