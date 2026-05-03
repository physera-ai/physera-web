"use client";

import { CutoutWrapper } from "@/components/CutoutWrapper";
import { HoverScrambleText } from "@/components/HoverScrambleText";

export function HeaderContactButton() {
  return (
    <div data-scramble-trigger className="relative h-8 rounded-[5px] text-(--island-fg) shrink-0 group select-none inline-flex bg-(--island-bg)">
      <CutoutWrapper
        id="header-email-btn-mask"
        hoverClass="group-hover:fill-(--island-bg-hover)"
        hasSeparator={false}
      >
        <div className="flex h-full items-center transition-colors duration-200">
          <a 
            href="mailto:himanshu@physera.ai"
            className="flex min-h-full flex-1 items-center justify-center px-4 font-display text-[15px] font-medium tracking-[-0.01em] text-(--island-fg-muted) group-hover:text-(--island-fg) cursor-pointer"
          >
            <HoverScrambleText text="Get in touch" />
          </a>
        </div>
      </CutoutWrapper>
    </div>
  );
}
