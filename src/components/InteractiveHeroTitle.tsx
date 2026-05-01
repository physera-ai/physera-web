"use client";

import { useRef, useState } from "react";
import type { PointerEvent } from "react";

interface InteractiveHeroTitleProps {
  children: string;
}

export function InteractiveHeroTitle({ children }: InteractiveHeroTitleProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 4;

    setOffset({ x, y });
  };

  return (
    <div
      ref={frameRef}
      className="flex items-center justify-center gap-2 sm:gap-6 md:gap-8 max-w-[960px] mx-auto w-full px-2 sm:px-0"
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      onPointerMove={handlePointerMove}
    >
      <div
        className="hero-bracket font-serif font-[50] text-[70px] sm:text-[100px] md:text-[130px] text-white/20 leading-none select-none -mt-4 sm:-mt-6 transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      >
        [
      </div>
      <h1 className="flex-1 font-serif font-[350] text-3xl sm:text-4xl md:text-5xl text-white/90 leading-[1.1] tracking-tighter text-center px-2">
        {children}
      </h1>
      <div
        className="hero-bracket font-serif font-[50] text-[70px] sm:text-[100px] md:text-[130px] text-white/20 leading-none select-none -mt-4 sm:-mt-6 transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(${-offset.x}px, ${offset.y}px, 0)` }}
      >
        ]
      </div>
    </div>
  );
}
