"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Manifesto", href: "/manifesto" },
  { label: "Research", href: "/research" },
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
    <header className={`site-header ${hidden ? "is-hidden" : ""}`}>
      <div className="site-header-inner">
        <Link href="/" aria-label="Physera AI home" className="flex items-center">
          <Image
            src="/physera-logo.svg"
            alt="Physera AI"
            width={122}
            height={24}
            priority
            unoptimized
            className="h-[22px] w-auto"
          />
        </Link>
        <nav className="site-nav">
          {navLinks.map(({ label, href }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? "page" : undefined}
                className="site-nav-link"
              >
                {label}
              </Link>
            );
          })}
          <Link href="/contact" className="site-nav-cta">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
