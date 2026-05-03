"use client";

import React from "react";

interface WigglyUnderlineProps {
  children: React.ReactNode;
  colorClass?: string;
}

export function WigglyUnderline({ children, colorClass = "text-orange-500" }: WigglyUnderlineProps) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <svg
        className={`absolute left-0 w-full h-[0.5em] bottom-[-0.1em] pointer-events-none z-0 ${colorClass}`}
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main thicker stroke */}
        <path
          d="M1,12 Q25,17 50,11 T99,13"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        {/* Lighter, offset stroke to simulate crayon/marker texture */}
        <path
          d="M2,14 Q25,19 48,13 T98,15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </svg>
    </span>
  );
}
