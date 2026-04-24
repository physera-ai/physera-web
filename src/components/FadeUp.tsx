"use client";

import { useEffect, useRef, useState } from "react";

export function FadeUp({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(node);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      observer.unobserve(node);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
