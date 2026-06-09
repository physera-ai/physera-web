"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Thesis", href: "/thesis" },
  { label: "Careers", href: "/careers" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (y < 80) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex h-14 w-full max-w-[1320px] items-center justify-between bg-background px-4 py-2.5 backdrop-blur-md transition-transform duration-300 ease-out sm:px-6 ${
        hidden ? "-translate-y-[150%]" : "translate-y-0"
      }`}
    >
      <Link href="/" aria-label="Physera AI home" className="flex items-center">
        <Image
          src="/physera-logo.svg"
          alt="Physera AI"
          width={122}
          height={24}
          priority
          unoptimized
          className="h-[20px] w-auto sm:h-6"
        />
      </Link>
      <nav className="flex items-center gap-4 text-[15px] font-medium tracking-[-0.32px] text-[#111] sm:gap-6 sm:text-[16px]">
        {navLinks.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`relative transition-opacity hover:opacity-70 ${
                active
                  ? "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-[#111]"
                  : ""
              }`}
            >
              {label}
            </Link>
          );
        })}
        <Link
          href="/contact"
          className="inline-flex h-8 items-center rounded-full bg-[#e8e8e8] px-3 text-[#232323] transition-colors hover:bg-[#dcdcdc] sm:px-3.5"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
