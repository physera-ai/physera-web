"use client";

import { useEffect, useState } from "react";
import wallData from "./wall.json";
import { MODEL_NAME, useSpriteFrame, type Entry, type Row } from "./Flipbook";

const WALL = wallData as Record<string, Entry>;
type Model = Exclude<Row, "ref">;
const PICKS: [task: string, model: Model][] = [
  ["gufram-zero-gravity-collage-hero", "astra"],
  ["neutomni-process-rolling-shape", "sol"],
  ["wisprflow-dictation-notetaker-toggle", "opus"],
  ["pudding-essential-words-pinned-cloud", "fable"],
  ["ciaoenergy-cans-sideways-selection", "sol"],
  ["kavieng-cards-fly-to-grid-drag", "astra"],
].filter(([t]) => t in WALL) as [string, Model][];
const WIPE_MS = 4200;

function Tile({ task, model, active, offset }: { task: string; model: Model; active: boolean; offset: number }) {
  const entry = WALL[task];
  const frame = useSpriteFrame(entry, offset);
  const size = `${entry.n * 100}% 100%`;
  const pos = `${(frame / (entry.n - 1)) * 100}% 0`;
  const score = entry.scores[model];
  return (
    <div className={`ab-reel-tile${active ? " is-active" : ""}`} style={{ ["--wipe-ms" as string]: `${WIPE_MS}ms` }}>
      <div className="ab-reel-frame" style={{ backgroundImage: `url(/animation-bench/wall/${task}/ref.webp)`, backgroundSize: size, backgroundPosition: pos }} />
      <div className="ab-reel-frame ab-reel-model" style={{ backgroundImage: `url(/animation-bench/wall/${task}/${model}.webp)`, backgroundSize: size, backgroundPosition: pos }} />
      <span className="ab-reel-divider" aria-hidden="true" />
      <span className="ab-reel-tag">{active ? `${MODEL_NAME[model]} · motion ${score.motion_consistency.toFixed(2)}` : entry.label}</span>
    </div>
  );
}

/** Six reference recordings playing frame-locked; every few seconds one wipes to a model's reconstruction so the drift is visible. */
export default function HeroReel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = window.setInterval(() => { i = (i + 1) % PICKS.length; setActive(i); }, WIPE_MS + 900);
    return () => window.clearInterval(id);
  }, []);
  if (!PICKS.length) return null;
  return (
    <div className="ab-hero-reel" aria-hidden="true">
      {PICKS.map(([task, model], i) => (
        <Tile key={task} task={task} model={model} active={active === i} offset={i * 260} />
      ))}
    </div>
  );
}
