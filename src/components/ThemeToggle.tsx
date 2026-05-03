"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { CutoutWrapper } from "./CutoutWrapper";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="pointer-events-auto relative h-8 rounded-[5px] w-8 shrink-0 group select-none invisible">
        <CutoutWrapper id="theme-toggle-skeleton" hasSeparator={false}>
          <div className="flex h-full items-center justify-center" />
        </CutoutWrapper>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="pointer-events-auto cursor-pointer relative h-8 rounded-[5px] text-(--island-fg) transition-opacity hover:opacity-90 shrink-0 group select-none focus-visible:outline-none"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <CutoutWrapper
        id="theme-toggle-mask"
        hoverClass="group-hover:fill-(--island-bg-hover)"
        hasSeparator={false}
      >
        <div className="flex h-full w-[38px] shrink-0 items-center justify-center text-(--island-fg-muted) group-hover:text-(--island-fg) transition-colors duration-200">
          {isDark ? (
            <Sun className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110" />
          ) : (
            <Moon className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110" />
          )}
        </div>
      </CutoutWrapper>
    </button>
  );
}