"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Native disclosure: content remains server-rendered, searchable, and linkable. */
export default function Disclosure({ title, children, className = "" }: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const revealHash = () => {
      const details = ref.current;
      if (!details || !window.location.hash) return;
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target || !details.contains(target)) return;
      details.open = true;
      requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    };
    revealHash();
    window.addEventListener("hashchange", revealHash);
    return () => window.removeEventListener("hashchange", revealHash);
  }, []);

  return (
    <details ref={ref} className={`ab-disclosure ${className}`}>
      <summary>{title}<span className="ab-disclosure-icon" aria-hidden="true" /></summary>
      <div className="ab-disclosure-content">{children}</div>
    </details>
  );
}
