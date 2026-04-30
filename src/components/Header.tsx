"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`fixed left-1/2 top-2 sm:top-4 z-50 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] -translate-x-1/2 overflow-hidden rounded-[2px] text-black transition-[max-width] duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.2)] ${
        isOpen ? "max-w-[460px]" : "max-w-[440px]"
      }`}
    >
      <svg className="absolute inset-0 -z-10 h-full w-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <mask id="header-mask">
            <rect width="100%" height="100%" fill="white" />
            <svg x="0" y="44" width="8" height="24" overflow="visible">
              <path
                d="M 0 0 V 5 A 2 2 0 0 0 2 7 A 5 5 0 0 1 2 17 A 2 2 0 0 0 0 19 V 24 H -1 V 0 Z"
                fill="black"
                style={{ transformOrigin: '0px 12px' }}
                className={`transition-transform duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.2)] ${
                  isOpen ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </svg>
            <svg x="calc(100% - 8px)" y="44" width="8" height="24" overflow="visible">
              <path
                d="M 8 0 V 5 A 2 2 0 0 1 6 7 A 5 5 0 0 0 6 17 A 2 2 0 0 1 8 19 V 24 H 9 V 0 Z"
                fill="black"
                style={{ transformOrigin: '8px 12px' }}
                className={`transition-transform duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.2)] ${
                  isOpen ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </svg>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="white" mask="url(#header-mask)" />
      </svg>
      <div className={`relative flex items-center select-none justify-between pl-4 transition-[height] duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.2)] ${isOpen ? "h-12" : "h-11"}`}>
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
            className={`w-auto brightness-0 transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.2)] ${isOpen ? "h-6 sm:h-8" : "h-6 sm:h-[30px]"}`}
            priority
          />
        </Link>

        <div className="flex h-full items-center gap-1 sm:gap-2 pr-1">
          <button
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="group flex h-full w-12 sm:w-14 items-center justify-center focus-visible:outline-none cursor-pointer"
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            <span className="relative h-[14px] w-[22px] transition-opacity duration-300">
              <span
                className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-black transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.2)] ${
                  isOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[2px] w-full rounded-full bg-black transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.2)] ${
                  isOpen ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] h-[2px] w-full rounded-full bg-black transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.2)] ${
                  isOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`relative grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.2)] ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-3 pt-2">
            <span className="mx-4 block h-px rounded-full bg-black/10" />
          </div>
          <div className="px-4 sm:px-6 pb-3 pt-4 sm:pt-5">
            <p className="max-w-[410px] text-[14px] sm:text-[15px] font-medium leading-5 tracking-[-0.01em] text-black/80">
              Physera builds trainable worlds: configurable, high-fidelity environments
              designed for intelligence to navigate.
            </p>
          </div>
          <nav className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-1 sm:gap-2 px-2 sm:px-3 pb-3 pt-1">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <Link
                href="/blog"
                className="px-2 sm:px-3 py-1.5 font-display text-[15px] sm:text-[16px] font-medium tracking-[-0.32px] text-black/80 hover:text-black"
              >
                Blog
              </Link>
              <Link
                href="/research"
                className="px-2 sm:px-3 py-1.5 font-display text-[15px] sm:text-[16px] font-medium tracking-[-0.32px] text-black/80 hover:text-black"
              >
                Research
              </Link>
              <a
                aria-label="Physera on X"
                className="flex items-center px-2 sm:px-3 py-1.5 font-display text-[15px] sm:text-[16px] font-medium text-black/80 hover:text-black"
                href="https://x.com/PhyseraAI"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg className="h-[14px] w-[14px] fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0H5.85088C6.35055 0.60609 6.90242 1.38164 7.38621 2.0224L10.6806 6.36824C11.3434 5.63969 11.9981 4.90373 12.6446 4.16055L14.4687 2.09959L15.7777 0.625043C15.9102 0.47399 16.2099 0.153141 16.3215 0H19.7418C19.1364 0.646123 18.491 1.41252 17.9011 2.08338L14.2431 6.24803L12.9313 7.74445C12.7807 7.91658 12.4294 8.3392 12.2829 8.47531C12.4511 8.68475 12.6138 8.91596 12.7786 9.13119L14.3072 11.1497L18.2919 16.4172C18.8294 17.1254 19.4461 17.9933 20 18.6698V20H14.2169C14.0088 19.8369 13.7266 19.4262 13.5526 19.1968L12.7081 18.0869C11.417 16.3991 10.1233 14.6774 8.81488 13.0056C8.6423 13.1638 8.3391 13.5297 8.17367 13.7202L7.18977 14.8436L3.93797 18.5564L3.22971 19.3699C3.06574 19.5594 2.82744 19.8629 2.63004 20H0V19.185C0.24193 18.8682 0.633959 18.4348 0.902926 18.1305C1.25253 17.7329 1.60007 17.3334 1.94555 16.9322L5.9684 12.3071C6.10814 12.1463 7.13287 10.9982 7.16229 10.9007C6.97152 10.5973 6.58148 10.1177 6.35437 9.81953L4.76379 7.73715L0 1.50134V0ZM15.1583 17.9859C15.7609 18.023 16.4215 17.9658 17.0076 18.0061C16.9864 17.8899 15.1382 15.4919 14.9006 15.1772L8.05893 6.13609L5.94637 3.34385L5.32969 2.52793C5.19377 2.34689 5.06307 2.15393 4.9068 1.98984C4.8016 1.87941 3.17141 1.96537 2.87443 1.91568C2.95848 2.08359 3.36795 2.59861 3.50189 2.7724L4.64678 4.26367L9.13379 10.1247L13.2677 15.5245L14.5854 17.2424C14.7098 17.4043 15.0419 17.8693 15.1583 17.9859Z" />
                </svg>
              </a>
            </div>
            <a
              className="ml-2 sm:ml-auto flex items-center gap-2 px-2 sm:px-3 py-1.5 font-display text-[15px] sm:text-[16px] font-medium tracking-[-0.32px] text-black/70 transition-colors hover:text-black"
              href="mailto:hello@physera.ai"
            >
              <svg className="h-[16px] w-[16px] fill-current opacity-80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z" />
              </svg>
              <span>hello@physera.ai</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
