"use client";

import wallData from "../animation/wall.json";
import { useSpriteFrame, type Entry } from "../animation/Flipbook";

const WALL = wallData as Record<string, Entry>;

/** A reference recording playing frame-locked, as the benchmark card's thumbnail. */
export default function BenchThumb({ task }: { task: string }) {
  const entry = WALL[task];
  const frame = useSpriteFrame(entry);
  if (!entry) return null;
  return (
    <span
      className="research-thumb"
      aria-hidden="true"
      style={{ backgroundImage: `url(/animation-bench/wall/${task}/ref.webp)`, backgroundSize: `${entry.n * 100}% 100%`, backgroundPosition: `${(frame / (entry.n - 1)) * 100}% 0` }}
    />
  );
}
