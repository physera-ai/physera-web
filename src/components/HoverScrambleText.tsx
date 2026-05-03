"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface HoverScrambleTextProps {
  text: string;
  className?: string;
  durationMode?: "dynamic" | "fixed";
  durationMs?: number;
}

const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=;:<>,";

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

export function HoverScrambleText({
  text,
  className = "",
  durationMode = "dynamic",
  durationMs = 380,
}: HoverScrambleTextProps) {
  const originalChars = useMemo(() => Array.from(text), [text]);
  const [chars, setChars] = useState(originalChars);
  const rootRef = useRef<HTMLSpanElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const updateChar = (index: number, value: string) => {
    setChars((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
  };

  const animate = useCallback(() => {
    clearTimers();
    setChars(originalChars);

    const animatableIndexes = originalChars
      .map((char, index) => (char.trim() === "" ? -1 : index))
      .filter((index) => index >= 0);
    const lastAnimatableIndex = Math.max(animatableIndexes.length - 1, 1);
    const restoreDelay = 132;

    originalChars.forEach((char, index) => {
      if (char.trim() === "") return;

      const animatablePosition = animatableIndexes.indexOf(index);
      const stagger =
        durationMode === "fixed"
          ? (animatablePosition / lastAnimatableIndex) * Math.max(durationMs - restoreDelay, 0)
          : index * 22;

      [0, 1].forEach((step) => {
        timersRef.current.push(
          setTimeout(() => updateChar(index, randomChar()), stagger + step * 42)
        );
      });

      timersRef.current.push(
        setTimeout(() => updateChar(index, char), stagger + restoreDelay)
      );
    });
  }, [clearTimers, durationMode, durationMs, originalChars]);

  useEffect(() => {
    const root = rootRef.current;
    const trigger = root?.closest<HTMLElement>("[data-scramble-trigger]") ?? root;

    if (!trigger) return;

    trigger.addEventListener("focusin", animate);
    trigger.addEventListener("focusout", animate);
    trigger.addEventListener("pointerenter", animate);
    trigger.addEventListener("pointerleave", animate);

    return () => {
      trigger.removeEventListener("focusin", animate);
      trigger.removeEventListener("focusout", animate);
      trigger.removeEventListener("pointerenter", animate);
      trigger.removeEventListener("pointerleave", animate);
      clearTimers();
    };
  }, [animate, clearTimers]);

  return (
    <span
      ref={rootRef}
      className={`scramble-text relative inline-block whitespace-pre align-baseline leading-[1.15] ${className}`}
    >
      <span aria-hidden="true" className="invisible whitespace-pre leading-[inherit]">
        {text}
      </span>
      <span aria-hidden="true" className="absolute left-0 top-1/2 inline-flex -translate-y-1/2 whitespace-pre leading-[inherit]">
        {chars.map((char, index) => (
          <span className="scramble-char" key={`${text}-${index}`}>
            {char}
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
