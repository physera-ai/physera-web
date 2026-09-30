"use client";

import { useState } from "react";
import { DIMS, ORG_COLOR, type BenchData } from "../data";

// Figures live in public/animation-bench/: <task>-compare.png (reference + all three models) for the
// showcase tasks in COMPARE, <task>-opus-strip.png (reference + Opus) for the rest. See README.md there.
const COMPARE = new Set([
  "berd-window-morphs-into-app",
  "benxrun-skyline-chapter-scroll",
  "maxima-splash-curtain-whale-part2",
  "kavieng-cards-fly-to-grid-drag",
  "cipher-loader-stills-ring",
  "ciaoenergy-cans-fan-scroll-spin",
]);
// (reference frames on top, one candidate row per model).
export default function Outputs({ bench }: { bench: BenchData }) {
  const [sel, setSel] = useState(bench.tasks[0].id);
  const task = bench.tasks.find((t) => t.id === sel) ?? bench.tasks[0];

  return (
    <div className="bench-panel">
      <div className="bench-tabs" role="tablist" aria-label="Task">
        {bench.tasks.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={t.id === sel}
            className="bench-tab"
            onClick={() => setSel(t.id)}
          >
            {t.short}
          </button>
        ))}
      </div>
      <div className="bench-meta">
        <span>
          Site <b>{task.site}</b>
        </span>
        <span>
          Trigger <b>{task.trigger}</b>
        </span>
        <span>
          Frames <b>{task.frames}</b>
        </span>
        <span>
          Window <b>{task.animation}</b>
        </span>
      </div>
      <figure className="bench-fig" style={{ margin: "16px 20px 20px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/animation-bench/${task.id}-${COMPARE.has(task.id) ? "compare" : "opus-strip"}.png`}
          alt={`Reference frames for ${task.short} against each model's reproduction.`}
        />
        <figcaption>
                {COMPARE.has(task.id)
                  ? "Reference frames (top) against each model's reproduction, sampled at the same points."
                  : "Reference frames (top) against Opus 5's reproduction, sampled at the same points."}
              </figcaption>
      </figure>
      <div className="overflow-x-auto">
        <table className="bench-table">
          <thead>
            <tr>
              <th>Model</th>
              <th className="num">Score</th>
              {DIMS.map((d) => (
                <th key={d.key} className="num">
                  {d.short}
                </th>
              ))}
              <th className="num">Cost</th>
              <th className="num">Steps</th>
            </tr>
          </thead>
          <tbody>
            {bench.models.map((m) => {
              const r = m.per_task[task.id];
              return (
                <tr key={m.key}>
                  <td className="whitespace-nowrap">
                    <i className="bench-swatch" style={{ background: ORG_COLOR[m.org] }} />
                    {m.label}
                  </td>
                  <td className="num">{r.score.toFixed(3)}</td>
                  {DIMS.map((d) => (
                    <td key={d.key} className="num">
                      {r.dims[d.key].toFixed(3)}
                    </td>
                  ))}
                  <td className="num">
                    ${r.cost.toFixed(2)}
                    {r.cost_estimated && <span className="muted">*</span>}
                  </td>
                  <td className="num">{r.steps}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
