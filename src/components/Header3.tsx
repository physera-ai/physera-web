"use client";

import Link from "next/link";
import { useState } from "react";
import { CutoutWrapper } from "./CutoutWrapper";
import { HoverScrambleText } from "./HoverScrambleText";
import { PhyseraLogo, type PhyseraLogoTone } from "./PhyseraLogo";
import { PlusIcon } from "lucide-react";

export function Header3({
  position = "center",
  logoTone = "white",
}: {
  position?: "center" | "sides";
  logoTone?: PhyseraLogoTone;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const desktopContainerClass = position === 'center'
    ? 'hidden sm:flex fixed left-0 right-0 top-4 z-50 justify-center items-start gap-[1.5px] pointer-events-none px-4'
    : 'hidden sm:flex fixed left-0 right-0 top-4 z-50 justify-between items-start pointer-events-none px-4';

  return (
    <>
      {/* --- DESKTOP VIEW --- */}
      <div className={desktopContainerClass}>
        
        {/* Main Header Island */}
        <header className="pointer-events-auto relative h-8 rounded-[5px] w-max select-none">
          <CutoutWrapper 
            id="header-cutouts-desktop" 
            hasSeparator={true} 
            separatorPosition={170} 
          >
            <div className="flex h-full items-center pr-4">
              {/* Logo */}
              <div className="flex h-full w-[170px] shrink-0 items-center justify-start pl-4 pr-1">
                <Link
                  aria-label="Physera AI home"
                  className="flex h-full items-center transition-opacity hover:opacity-80"
                  href="/"
                >
                  <PhyseraLogo tone={logoTone} className="h-6 w-auto" priority />
                </Link>
              </div>

              {/* Separator Line */}
              <div className="flex h-full items-center justify-center">
                <span className="h-4.5 w-[1.5px] bg-(--island-rule)" />
              </div>

              {/* Nav */}
              <div className="flex h-full items-center pl-4 overflow-y-hidden overflow-x-auto no-scrollbar">
                <nav className="flex items-center gap-2">
                  <Link
                    href="/blog"
                    data-scramble-trigger
                    className="px-3 pb-px font-display text-[16px] font-medium tracking-[-0.32px] text-(--island-fg-muted) hover:text-(--island-fg) shrink-0"
                  >
                    <HoverScrambleText text="Blog" durationMode="fixed" />
                  </Link>
                  <Link
                    href="/team"
                    data-scramble-trigger
                    className="px-3 pb-px font-display text-[16px] font-medium tracking-[-0.32px] text-(--island-fg-muted) hover:text-(--island-fg) shrink-0"
                  >
                    <HoverScrambleText text="Team" durationMode="fixed" />
                  </Link>
                  <a
                    aria-label="Physera on X"
                    className="flex items-center px-3 py-1.5 font-display text-[16px] font-medium text-(--island-fg-muted) hover:text-(--island-fg) shrink-0"
                    href="https://x.com/PhyseraAI"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg className="h-[14px] w-[14px] fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H5.85088C6.35055 0.60609 6.90242 1.38164 7.38621 2.0224L10.6806 6.36824C11.3434 5.63969 11.9981 4.90373 12.6446 4.16055L14.4687 2.09959L15.7777 0.625043C15.9102 0.47399 16.2099 0.153141 16.3215 0H19.7418C19.1364 0.646123 18.491 1.41252 17.9011 2.08338L14.2431 6.24803L12.9313 7.74445C12.7807 7.91658 12.4294 8.3392 12.2829 8.47531C12.4511 8.68475 12.6138 8.91596 12.7786 9.13119L14.3072 11.1497L18.2919 16.4172C18.8294 17.1254 19.4461 17.9933 20 18.6698V20H14.2169C14.0088 19.8369 13.7266 19.4262 13.5526 19.1968L12.7081 18.0869C11.417 16.3991 10.1233 14.6774 8.81488 13.0056C8.6423 13.1638 8.3391 13.5297 8.17367 13.7202L7.18977 14.8436L3.93797 18.5564L3.22971 19.3699C3.06574 19.5594 2.82744 19.8629 2.63004 20H0V19.185C0.24193 18.8682 0.633959 18.4348 0.902926 18.1305C1.25253 17.7329 1.60007 17.3334 1.94555 16.9322L5.9684 12.3071C6.10814 12.1463 7.13287 10.9982 7.16229 10.9007C6.97152 10.5973 6.58148 10.1177 6.35437 9.81953L4.76379 7.73715L0 1.50134V0ZM15.1583 17.9859C15.7609 18.023 16.4215 17.9658 17.0076 18.0061C16.9864 17.8899 15.1382 15.4919 14.9006 15.1772L8.05893 6.13609L5.94637 3.34385L5.32969 2.52793C5.19377 2.34689 5.06307 2.15393 4.9068 1.98984C4.8016 1.87941 3.17141 1.96537 2.87443 1.91568C2.95848 2.08359 3.36795 2.59861 3.50189 2.7724L4.64678 4.26367L9.13379 10.1247L13.2677 15.5245L14.5854 17.2424C14.7098 17.4043 15.0419 17.8693 15.1583 17.9859Z" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </CutoutWrapper>
        </header>

        {/* Join Waitlist Button Island */}
        <Link href="/contact" data-scramble-trigger className="pointer-events-auto cursor-pointer relative h-8 rounded-[5px] text-(--island-fg) transition-opacity hover:opacity-90 shrink-0 group select-none">
          <CutoutWrapper
            id="waitlist-mask-desktop"
            hoverClass="group-hover:fill-(--island-bg-hover)"
            hasSeparator={true}
            separatorPosition={38}
          >
            <div className="flex h-full items-center transition-colors duration-200">
              <div className="flex h-full w-[38px] shrink-0 items-center justify-center text-(--island-fg-muted) group-hover:text-(--island-fg) transition-colors duration-200">
                <PlusIcon
                  className="h-4 w-4 shrink-0 stroke-2 transition-transform duration-200 ease-out group-hover:rotate-90"
                  aria-hidden
                />
              </div>
              <div className="flex h-full items-center justify-center">
                <span className="h-5 w-px bg-(--island-rule) group-hover:bg-(--island-rule-hover) transition-colors duration-200" />
              </div>
              <span className="flex min-h-full flex-1 items-center justify-center px-3 font-display text-[15px] font-medium tracking-[-0.01em] text-(--island-fg-muted) group-hover:text-(--island-fg) transition-colors duration-200">
                <HoverScrambleText text="Contact" />
              </span>
            </div>
          </CutoutWrapper>
        </Link>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="flex sm:hidden fixed left-0 right-0 top-2 z-100 justify-between items-start pointer-events-none px-2">
        
        {/* Left Island: Logo */}
        <header className="pointer-events-auto relative h-[36px] rounded-[5px] text-(--island-fg) select-none">
          <CutoutWrapper id="mobile-logo-cutouts" hasSeparator={false}>
            <div className="flex h-full items-center pl-2.5 pr-4">
              <Link
                aria-label="Physera AI home"
                className="flex h-full items-center transition-opacity hover:opacity-80 relative z-20"
                href="/"
              >
                <PhyseraLogo tone={logoTone} className="h-[20px] w-auto" priority />
              </Link>
            </div>
          </CutoutWrapper>
        </header>

        {/* Right Side: Button/Menu Bar + Dropdown Island */}
        <div className="flex flex-col items-end gap-2 pointer-events-none">
          
          {/* Top Right Island: Join Waitlist + Menu Toggle */}
          <div className="pointer-events-auto relative rounded-[5px] text-(--island-fg) w-[155px] h-[36px] select-none">
            <CutoutWrapper id="mobile-right-cutouts" hasSeparator={true} separatorPosition={110}>
              <div className="relative z-20 flex h-[36px] items-center w-[155px]">
                {/* Contact */}
                <Link href="/contact" data-scramble-trigger className="flex h-full items-center px-3">
                  <span className="font-display text-[14px] font-medium text-(--island-fg-muted) w-[86px] text-center">
                    <HoverScrambleText text="Contact" />
                  </span>
                </Link>
                
                {/* Separator Line */}
                <div className="flex h-full items-center justify-center">
                  <span className="h-5 w-px bg-(--island-rule)" />
                </div>

                {/* Hamburger Menu / Cross */}
                <button
                  aria-expanded={isOpen}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  className="flex h-full flex-1 items-center justify-center focus-visible:outline-none cursor-pointer relative z-30"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen((current) => !current);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen((current) => !current);
                  }}
                  type="button"
                >
                  <span className="relative h-[12px] w-[18px] transition-opacity duration-300">
                    <span className={`absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-(--island-fg) transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-y-[5.25px] rotate-45" : ""}`} />
                    <span className={`absolute left-0 top-[5.25px] h-[1.5px] w-full rounded-full bg-(--island-fg) transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "scale-x-0 opacity-0" : ""}`} />
                    <span className={`absolute left-0 top-[10.5px] h-[1.5px] w-full rounded-full bg-(--island-fg) transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-y-[-5.25px] -rotate-45" : ""}`} />
                  </span>
                </button>
              </div>
            </CutoutWrapper>
          </div>

          {/* Menu Content Island (Dropdown) */}
          <div 
            className={`pointer-events-auto relative rounded-[5px] text-(--island-fg) w-[155px] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
              isOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
            }`}
          >
            <CutoutWrapper id="mobile-menu-dropdown-cutouts" hasSeparator={false}>
              <div className="px-2 py-2">
                <nav className="flex flex-col gap-3">
                  <Link
                    href="/blog"
                    data-scramble-trigger
                    className="font-display px-3 py-1.5 text-[16px] font-medium text-(--island-fg-muted) hover:text-(--island-fg) transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <HoverScrambleText text="Blog" durationMode="fixed" />
                  </Link>
                  <Link
                    href="/team"
                    data-scramble-trigger
                    className="font-display px-3 py-1.5 text-[16px] font-medium text-(--island-fg-muted) hover:text-(--island-fg) transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <HoverScrambleText text="Team" durationMode="fixed" />
                  </Link>
                </nav>
              </div>
            </CutoutWrapper>
          </div>
        </div>
      </div>
    </>
  );
}