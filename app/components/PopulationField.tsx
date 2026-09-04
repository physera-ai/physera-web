"use client";

import { useEffect, useRef } from "react";

// A crisp dot matrix: a regular grid of points on pure white. A slow
// emerald wave sweeps diagonally, and dots swell toward the cursor.
// Reads as a measured field of agents. No libraries.
export default function PopulationField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 30;
    const R = 150; // cursor influence radius
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols: number[] = [];
    let rows: number[] = [];
    const pointer = { x: -9999, y: -9999, on: false };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const ox = (w % GAP) / 2;
      const oy = (h % GAP) / 2;
      cols = [];
      rows = [];
      for (let x = ox; x <= w; x += GAP) cols.push(x);
      for (let y = oy; y <= h; y += GAP) rows.push(y);
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      for (const y of rows) {
        for (const x of cols) {
          // concentric ripple expanding from centre
          const d = Math.hypot(x - cx, y - cy);
          const wave = Math.sin(d * 0.017 - t * 0.0021);
          const crest = Math.max(0, wave) ** 1.5;
          // cursor swell
          let near = 0;
          if (pointer.on) {
            const pd = Math.hypot(x - pointer.x, y - pointer.y);
            if (pd < R) near = (1 - pd / R) ** 1.4;
          }
          const r = 1 + crest * 1.7 + near * 3;
          const emerald = Math.min(1, crest * 0.9 + near);
          ctx!.beginPath();
          ctx!.arc(x, y, r, 0, Math.PI * 2);
          if (emerald > 0.02) {
            ctx!.fillStyle = `rgba(15, 157, 110, ${0.12 + emerald * 0.55})`;
          } else {
            ctx!.fillStyle = "rgba(13, 13, 13, 0.1)";
          }
          ctx!.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    if (reduce) draw(0);
    else raf = requestAnimationFrame(draw);

    const onMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.on = true;
    };
    const onLeave = () => {
      pointer.on = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onResize = () => {
      cancelAnimationFrame(raf);
      resize();
      if (reduce) draw(0);
      else raf = requestAnimationFrame(draw);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onMove);
    window.addEventListener("blur", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="hp-field-canvas" aria-hidden="true" />;
}
