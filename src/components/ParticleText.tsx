"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface ParticleTextProps {
  text: string;
  className?: string;
}

export function ParticleText({ text, className = "" }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    // We will set the CSS width/height via Tailwind, but let's fix internal resolution
    const rect = canvas.getBoundingClientRect();
    // Default fallback if rect is 0
    const width = rect.width || 800;
    const height = rect.height || 300;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 1. Draw text on an offscreen canvas to get pixel data
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext("2d");
    if (!octx) return;

    // Use a nice thick font for the particle effect
    octx.font = "900 140px 'Arial Black', sans-serif";
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillStyle = "white"; // color doesn't matter for data reading
    octx.fillText(text, width / 2, height / 2);

    const imageData = octx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // 2. Create particles from pixels
    const particles: { x: number; y: number; baseX: number; baseY: number; offset: number; size: number; color: string }[] = [];
    const step = 4; // Check every Nth pixel for performance

    const isLight = resolvedTheme === "light";
    // We'll assign random colors from a palette to match the humans& vibe
    const colorsDark = ["120, 150, 100", "150, 100, 120", "160, 130, 100", "100, 120, 150"];
    const colorsLight = ["80, 110, 60", "110, 60, 80", "120, 90, 60", "60, 80, 110"];
    const colors = isLight ? colorsLight : colorsDark;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];

        if (alpha > 128) {
          // Pixel is not transparent
          // Create multiple overlapping particles for the "stacked" effect
          for (let i = 0; i < 3; i++) {
            particles.push({
              x: x + (Math.random() - 0.5) * 4,
              y: y + (Math.random() - 0.5) * 4,
              baseX: x,
              baseY: y,
              offset: Math.random() * Math.PI * 2, // Random starting phase
              size: Math.random() * 3 + 2, // Sizes between 2 and 5
              color: colors[Math.floor(Math.random() * colors.length)],
            });
          }
        }
      }
    }

    // 3. Animate particles
    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.03;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Calculate gentle motion
        const moveX = Math.sin(time + p.offset) * 2;
        const moveY = Math.cos(time * 0.8 + p.offset) * 2;

        p.x = p.baseX + moveX;
        p.y = p.baseY + moveY;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Extremely low opacity, stacked for strength
        ctx.fillStyle = `rgba(${p.color}, 0.15)`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full max-w-[800px] max-h-[300px] ${className}`}
      style={{ display: "block", margin: "0 auto" }}
    />
  );
}
