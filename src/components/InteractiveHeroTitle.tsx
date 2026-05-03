"use client";

import { useState, useEffect } from "react";

interface InteractiveHeroTitleProps {
  children: string;
}

export function InteractiveHeroTitle({ children }: InteractiveHeroTitleProps) {

  return (
    <div className="flex gap-2 max-w-3xl w-full px-0">
      <h1 className="flex-1 font-serif italic font-normal text-5xl sm:text-[52px] text-(--site-fg) leading-[1.1] tracking-tighter text-left transition-colors duration-300">
        {children}
      </h1>
    </div>
  );
}
