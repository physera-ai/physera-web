"use client";

import { useEffect, useRef } from "react";

// A generative flow field: hundreds of "agents" drifting along a smooth
// vector field, most in ink, a minority in emerald. Reads as a simulated
// population in motion. No libraries.
export default function PopulationField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    type P = { x: number; y: number; hot: boolean; sp: number };
    let pts: P[] = [];

    const INK = "13, 13, 13";
    const EMERALD = "15, 157, 110";

    function seed() {
      const density = Math.max(180, Math.min(520, Math.floor((w * h) / 2600)));
      pts = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        hot: Math.random() < 0.16,
        sp: 0.4 + Math.random() * 0.9,
      }));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.fillStyle = "#fcfcfb";
      ctx!.fillRect(0, 0, w, h);
      seed();
    }

    // smooth pseudo-noise vector field
    function angle(x: number, y: number, t: number) {
      const a =
        Math.sin(x * 0.0032 + t * 0.00022) * Math.cos(y * 0.0028 - t * 0.00017) +
        Math.sin((x + y) * 0.0016 + t * 0.00011) * 0.6;
      return a * Math.PI * 1.4;
    }

    function frame(t: number) {
      // fade toward the surface for soft trails
      ctx!.fillStyle = "rgba(252, 252, 251, 0.055)";
      ctx!.fillRect(0, 0, w, h);
      for (const p of pts) {
        const ang = angle(p.x, p.y, t);
        const nx = p.x + Math.cos(ang) * p.sp;
        const ny = p.y + Math.sin(ang) * p.sp;
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(nx, ny);
        ctx!.strokeStyle = p.hot ? `rgba(${EMERALD}, 0.55)` : `rgba(${INK}, 0.16)`;
        ctx!.lineWidth = p.hot ? 1.4 : 1;
        ctx!.stroke();
        p.x = nx;
        p.y = ny;
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4;
        if (p.y > h + 4) p.y = -4;
      }
      raf = requestAnimationFrame(frame);
    }

    function staticFrame() {
      // a single settled still for reduced-motion
      ctx!.fillStyle = "#fcfcfb";
      ctx!.fillRect(0, 0, w, h);
      for (let s = 0; s < 90; s++) {
        for (const p of pts) {
          const ang = angle(p.x, p.y, 0);
          const nx = p.x + Math.cos(ang) * p.sp;
          const ny = p.y + Math.sin(ang) * p.sp;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(nx, ny);
          ctx!.strokeStyle = p.hot ? `rgba(${EMERALD}, 0.5)` : `rgba(${INK}, 0.14)`;
          ctx!.lineWidth = p.hot ? 1.4 : 1;
          ctx!.stroke();
          p.x = nx < 0 || nx > w ? Math.random() * w : nx;
          p.y = ny < 0 || ny > h ? Math.random() * h : ny;
        }
      }
    }

    resize();
    if (reduce) staticFrame();
    else raf = requestAnimationFrame(frame);

    const onResize = () => {
      cancelAnimationFrame(raf);
      resize();
      if (reduce) staticFrame();
      else raf = requestAnimationFrame(frame);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="hp-field-canvas" aria-hidden="true" />;
}
