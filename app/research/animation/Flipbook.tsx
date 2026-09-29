"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import wallData from "./wall.json";
import ModelLogo from "./ModelLogo";

export type Row = "ref" | "astra" | "fable" | "opus" | "sol";
export type Entry = { label: string; n: number; times_ms: number[]; scores: Record<Exclude<Row, "ref">, { overall: number; motion_consistency: number }> };
export const MODEL_NAME: Record<Exclude<Row, "ref">, string> = { astra: "GPT-6 Astra", fable: "Claude Fable 5.1", opus: "Claude Opus 5.5", sol: "GPT-6 Sol" };

const WALL = wallData as Record<string, Entry>;
const NAME: Record<Row, string> = { ref: "Reference", ...MODEL_NAME };
const ALL: Row[] = ["ref", "astra", "fable", "opus", "sol"];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function hasFlipbook(task: string) {
  return task in WALL;
}

export function useSpriteFrame(entry: { n: number; times_ms: number[] } | undefined, offsetMs = 0) {
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (!entry || reduced) return;
    let idx = 0;
    let timer = 0;
    const tick = (delay: number) => {
      timer = window.setTimeout(() => {
        const last = idx === entry.n - 1;
        idx = last ? 0 : idx + 1;
        setFrame(idx);
        const next = idx === entry.n - 1 ? 1100 : clamp((entry.times_ms[idx + 1] - entry.times_ms[idx]) * 0.6, 140, 700);
        tick(next);
      }, delay);
    };
    tick(offsetMs + clamp((entry.times_ms[1] - entry.times_ms[0]) * 0.6, 140, 700));
    return () => window.clearTimeout(timer);
  }, [entry, reduced, offsetMs]);
  return frame;
}

export default function Flipbook({ task, rows = ALL, caption, compact, cols }: { task: string; rows?: Row[]; caption?: string; compact?: boolean; cols?: number }) {
  const entry = WALL[task];
  const frame = useSpriteFrame(entry);
  if (!entry) return null;
  const bgSize = `${entry.n * 100}% 100%`;
  const bgPos = `${(frame / (entry.n - 1)) * 100}% 0`;
  const columns = cols ?? rows.length;
  const spare = columns * Math.ceil(rows.length / columns) - rows.length;
  const captionInGrid = Boolean(caption) && spare > 0;
  const body = (
    <div className={`ab-flip${compact ? " ab-flip-compact" : ""}`} style={{ ["--cols" as string]: columns }}>
      {rows.map((row) => {
        const s = row === "ref" ? null : entry.scores[row];
        return (
          <div key={row} className="ab-flip-tile">
            <div className="ab-flip-frame" style={{ backgroundImage: `url(/animation-bench/wall/${task}/${row}.webp)`, backgroundSize: bgSize, backgroundPosition: bgPos }} />
            <div className="ab-flip-label">
              <span>{row !== "ref" && <ModelLogo model={row} />}{NAME[row]}</span>
              {s && <span className="ab-flip-score">overall {s.overall.toFixed(3)} · motion {s.motion_consistency.toFixed(2)}</span>}
            </div>
          </div>
        );
      })}
      {captionInGrid && <figcaption className="ab-flip-note" style={{ gridColumn: `span ${spare}` }}>{caption}</figcaption>}
    </div>
  );
  if (!caption) return body;
  return (
    <figure className="bench-fig ab-flip-fig">
      {body}
      {!captionInGrid && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
