"use client";

import { useState, useEffect } from "react";

interface InteractiveHeroTitleProps {
  children: string;
}

export function InteractiveHeroTitle({ children }: InteractiveHeroTitleProps) {
  const [isInitialBlink, setIsInitialBlink] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Stop the initial blink after 1.6s (2 blinks)
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialBlink(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  const shouldBlink = isInitialBlink || isHovered;

  return (
    <div
      className="flex gap-2 max-w-3xl mx-auto w-max px-2 sm:px-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`hero-bracket font-serif font-[50] text-7xl text-white/20 leading-none select-none -mt-4 sm:-mt-6 ${shouldBlink ? 'animate-bracket-blink' : ''}`}
      >
        [
      </div>
      <h1 className="flex-1 font-serif font-[350] text-3xl sm:text-[44px] text-white/90 leading-[1.1] tracking-tighter text-center px-2">
        {children}
      </h1>
      <div
        className={`hero-bracket font-serif font-[50] text-7xl text-white/20 leading-none select-none -mt-4 sm:-mt-6 ${shouldBlink ? 'animate-bracket-blink' : ''}`}
      >
        ]
      </div>
    </div>
  );
}
