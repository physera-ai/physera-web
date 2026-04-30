"use client";

import { ReactNode } from "react";

interface CutoutWrapperProps {
  children: ReactNode;
  className?: string;
  fill?: string;
  hoverClass?: string;
  id?: string;
  hasLeftCutouts?: boolean;
  hasRightCutouts?: boolean;
  hasSeparator?: boolean;
  separatorPosition?: number;
}

export function CutoutWrapper({
  children,
  className = "",
  fill = "white",
  hoverClass = "",
  id = "cutout-mask",
  hasLeftCutouts = true,
  hasRightCutouts = true,
  hasSeparator = false,
  separatorPosition = 240, // desktop separator position in px
}: CutoutWrapperProps) {
  return (
    <>
      <svg className="absolute inset-0 -z-10 h-full w-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <mask id={id}>
            <rect width="100%" height="100%" fill="white" />

            {/* Left cutouts */}
            {hasLeftCutouts && (
              <>
                <svg x="-4" y="-8" width="16" height="16" overflow="visible">
                  <path d="M 0 8 A 4 4 0 0 0 8 8 A 4 4 0 0 0 0 8 Z" fill="black" />
                </svg>
                <svg x="-4" y="calc(100% - 8px)" width="16" height="16" overflow="visible">
                  <path d="M 0 8 A 4 4 0 0 1 8 8 A 4 4 0 0 1 0 8 Z" fill="black" />
                </svg>
              </>
            )}

            {/* Right cutouts */}
            {hasRightCutouts && (
              <>
                <svg x="calc(100% - 4px)" y="-8" width="16" height="16" overflow="visible">
                  <path d="M 0 8 A 4 4 0 0 0 8 8 A 4 4 0 0 0 0 8 Z" fill="black" />
                </svg>
                <svg x="calc(100% - 4px)" y="calc(100% - 8px)" width="16" height="16" overflow="visible">
                  <path d="M 0 8 A 4 4 0 0 1 8 8 A 4 4 0 0 1 0 8 Z" fill="black" />
                </svg>
              </>
            )}

            {/* Separator cutouts */}
            {hasSeparator && (
              <>
                {/* Top separator */}
                <svg x={`calc(${separatorPosition}px - 4px)`} y="-8" width="16" height="16" overflow="visible" className="hidden sm:block">
                  <path d="M 0 8 A 4 4 0 0 0 8 8 A 4 4 0 0 0 0 8 Z" fill="black" />
                </svg>
                <svg x={`calc(${separatorPosition - 20}px - 4px)`} y="-8" width="16" height="16" overflow="visible" className="block sm:hidden">
                  <path d="M 0 8 A 4 4 0 0 0 8 8 A 4 4 0 0 0 0 8 Z" fill="black" />
                </svg>

                {/* Bottom separator */}
                <svg x={`calc(${separatorPosition}px - 4px)`} y="calc(100% - 8px)" width="16" height="16" overflow="visible" className="hidden sm:block">
                  <path d="M 0 8 A 4 4 0 0 1 8 8 A 4 4 0 0 1 0 8 Z" fill="black" />
                </svg>
                <svg x={`calc(${separatorPosition - 20}px - 4px)`} y="calc(100% - 8px)" width="16" height="16" overflow="visible" className="block sm:hidden">
                  <path d="M 0 8 A 4 4 0 0 1 8 8 A 4 4 0 0 1 0 8 Z" fill="black" />
                </svg>
              </>
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={fill}
          mask={`url(#${id})`}
          className={`transition-colors duration-300 ${hoverClass}`}
        />
      </svg>
      {children}
    </>
  );
}
