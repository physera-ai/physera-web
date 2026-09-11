"use client";

import { useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";
const ORDER: Theme[] = ["system", "light", "dark"];
const STORAGE_KEY = "physera-theme";
const listeners = new Set<() => void>();

function readTheme(): Theme {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "light" || t === "dark" ? t : "system";
}

function writeTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
  try {
    if (theme === "system") window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // storage unavailable: theme still applies for this page
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const GLYPH: Record<Theme, string> = { system: "◐", light: "☼", dark: "☾" };

export function ThemeToggle(): React.JSX.Element {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "system" as Theme);
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
  const label = `Theme: ${theme}. Switch to ${next}.`;

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => writeTheme(next)}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{GLYPH[theme]}</span>
    </button>
  );
}
