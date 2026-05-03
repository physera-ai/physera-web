"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface ParticleLogoProps {
  className?: string;
}

export function ParticleLogo({ className = "" }: ParticleLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 400;
    const height = rect.height || 400;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const isLight = resolvedTheme === "light";
    // Monochromatic shades for a unified, clean look
    // Dark mode: light grey/white shades
    const colorsDark = ["255, 255, 255", "230, 230, 230", "200, 200, 200"];
    // Light mode: very dark grey/black shades
    const colorsLight = ["26, 26, 26", "45, 45, 45", "65, 65, 65"];
    const colors = isLight ? colorsLight : colorsDark;

    let animationFrameId: number;
    const particles: { x: number; y: number; baseX: number; baseY: number; offset: number; size: number; color: string }[] = [];
    let time = 0;

    const img = new Image();
    img.src = "/physera-icon-white.svg";
    
    img.onload = () => {
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const octx = offscreen.getContext("2d");
      if (!octx) return;

      // Draw the image centered
      const imgAspect = img.width / img.height;
      const targetWidth = width * 0.75; // Fill 75% of the canvas width

      const targetHeight = targetWidth / imgAspect;
      
      const x = (width - targetWidth) / 2;
      const y = (height - targetHeight) / 2;

      octx.drawImage(img, x, y, targetWidth, targetHeight);

      const imageData = octx.getImageData(0, 0, width, height);
      const data = imageData.data;

      const step = 3; // Pixel sampling step

      for (let py = 0; py < height; py += step) {
        for (let px = 0; px < width; px += step) {
          const index = (py * width + px) * 4;
          const alpha = data[index + 3];

          if (alpha > 100) {
            // Spawn multiple particles per valid pixel for the stacked effect
            for (let i = 0; i < 3; i++) {
              particles.push({
                x: px + (Math.random() - 0.5) * 4,
                y: py + (Math.random() - 0.5) * 4,
                baseX: px,
                baseY: py,
                offset: Math.random() * Math.PI * 2,
                size: Math.random() * 2 + 1.5,
                color: colors[Math.floor(Math.random() * colors.length)],
              });
            }
          }
        }
      }

      const render = () => {
        time += 0.03;
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p) => {
          const moveX = Math.sin(time + p.offset) * 1.5;
          const moveY = Math.cos(time * 0.8 + p.offset) * 1.5;

          p.x = p.baseX + moveX;
          p.y = p.baseY + moveY;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, 0.18)`;
          ctx.fill();
        });

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
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
