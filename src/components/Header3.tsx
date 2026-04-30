"use client";

import Image from "next/image";
import Link from "next/link";
import { CutoutWrapper } from "./CutoutWrapper";

export function Header3({ position = 'center' }: { position?: 'center' | 'sides' }) {
  const containerClass = position === 'center' 
    ? 'fixed left-0 right-0 top-2 sm:top-4 z-50 flex justify-center items-start gap-[1.5px] pointer-events-none px-2 sm:px-4'
    : 'fixed left-0 right-0 top-2 sm:top-4 z-50 flex justify-between items-start pointer-events-none px-2 sm:px-4';

  return (
    <div className={containerClass}>
      <header className="pointer-events-auto relative h-11 sm:h-8 rounded-[5px] text-black w-max max-w-[calc(100vw-130px)] sm:max-w-none">
        <CutoutWrapper 
          id="header-cutouts" 
          hasSeparator={true} 
          separatorPosition={170} 
        >
          <div className="flex h-full items-center pr-2 sm:pr-4">
            {/* Original Header Part (Logo) */}
            <div className="flex h-full w-[220px] sm:w-[170px] shrink-0 items-center justify-start pl-4 pr-1">
              <Link
                aria-label="Physera AI home"
                className="flex h-full items-center transition-opacity hover:opacity-80"
                href="/"
              >
                <Image
                  src="/physera-logo-full-red-transparent.svg"
                  alt="Physera AI Logo"
                  width={161}
                  height={32}
                  className="h-5 sm:h-6 w-auto brightness-0"
                  priority
                />
              </Link>
            </div>

            {/* Separator Line */}
            <div className="flex h-full items-center justify-center">
              <span className="h-6 w-px bg-black/10" />
            </div>

            {/* Expanded Part */}
            <div className="flex h-full items-center pl-2 sm:pl-4 overflow-y-hidden overflow-x-auto no-scrollbar">
              <nav className="flex items-center gap-1 sm:gap-2">
                <Link
                  href="/blog"
                  className="px-2 sm:px-3 py-1.5 font-display text-[15px] sm:text-[16px] font-medium tracking-[-0.32px] text-black/60 hover:text-black shrink-0"
                >
                  Blog
                </Link>
                <Link
                  href="/research"
                  className="px-2 sm:px-3 py-1.5 font-display text-[15px] sm:text-[16px] font-medium tracking-[-0.32px] text-black/60 hover:text-black shrink-0"
                >
                  Research
                </Link>
                <a
                  aria-label="Physera on X"
                  className="flex items-center px-2 sm:px-3 py-1.5 font-display text-[15px] sm:text-[16px] font-medium text-black/60 hover:text-black shrink-0"
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

      <button className="pointer-events-auto cursor-pointer relative h-11 sm:h-8 rounded-[5px] flex items-center px-4 sm:px-5 transition-opacity hover:opacity-90 shrink-0 group">
        <CutoutWrapper 
          id="waitlist-mask" 
          fill="#fff"
          hoverClass="group-hover:fill-[#ff6542]"
        >
          <span className="font-display text-[14px] sm:text-[15px] font-medium text-[#ff4419] group-hover:text-white tracking-[-0.01em]">
            Join Waitlist
          </span>
        </CutoutWrapper>
      </button>
    </div>
  );
}
