"use client";

import { useState } from "react";

type Axis = "overall" | "visual" | "motion" | "layout";
type Triple = [mean: number, lo: number, hi: number];

type ModelRow = {
  id: string;
  short: string;
  full: string;
  color: string;
  cost: number;
  wins: number;
  ciHalf: number;
  overall: Triple;
  visual: Triple;
  motion: Triple;
  layout: Triple;
};

const MODELS: ModelRow[] = [
  {
    id: "gpt-6-astra", short: "Astra", full: "GPT-6 Astra", color: "#0f9d6e",
    cost: 3.04, wins: 27, ciHalf: 0.045,
    overall: [0.594, 0.549, 0.640], visual: [0.710, 0.664, 0.755],
    motion: [0.473, 0.411, 0.533], layout: [0.628, 0.563, 0.693],
  },
  {
    id: "claude-fable-5-1", short: "Fable 5.1", full: "Claude Fable 5.1", color: "#5170c9",
    cost: 3.89, wins: 7, ciHalf: 0.039,
    overall: [0.548, 0.509, 0.588], visual: [0.662, 0.620, 0.705],
    motion: [0.430, 0.380, 0.477], layout: [0.565, 0.504, 0.627],
  },
  {
    id: "gpt-6-sol", short: "Sol", full: "GPT-6 Sol", color: "#9b71a3",
    cost: 0.45, wins: 8, ciHalf: 0.032,
    overall: [0.516, 0.484, 0.548], visual: [0.640, 0.601, 0.680],
    motion: [0.381, 0.337, 0.428], layout: [0.539, 0.486, 0.593],
  },
  {
    id: "claude-opus-5-5", short: "Opus 5.5", full: "Claude Opus 5.5", color: "#ad7545",
    cost: 1.12, wins: 6, ciHalf: 0.038,
    overall: [0.507, 0.470, 0.547], visual: [0.631, 0.592, 0.669],
    motion: [0.383, 0.335, 0.430], layout: [0.517, 0.459, 0.577],
  },
];

const AXES: { key: Axis; label: string }[] = [
  { key: "overall", label: "Overall" },
  { key: "visual", label: "Visual" },
  { key: "motion", label: "Motion" },
  { key: "layout", label: "Layout" },
];

const TAKEAWAYS = [
  "GPT-6 Astra leads at 0.594 and its lead over every other model holds under resampling; Sol and Opus 5.5 are statistically tied.",
  "Every model is weakest on motion: visual similarity 0.63–0.71, motion consistency 0.38–0.47. 177 of 192 reconstructions look better than they move.",
  "Timing is barely better than chance. Scored against the right reference the timing term is 0.57; against a different animation's reference it is 0.50.",
  "Cost does not buy score: a ninefold spread in spend ($0.45–$3.89 per task) against a 0.087 spread in score.",
];

const W = 1140, H = 380, padL = 64, padR = 170, padT = 30, padB = 40;
const Y_MIN = 0.3, Y_MAX = 0.8;
const COST_MIN = 0.3, COST_MAX = 6;
const Y_TICKS = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
const COST_TICKS = [0.5, 1, 2, 4];

function median(vals: number[]) {
  const s = [...vals].sort((a, b) => a - b);
  const mid = s.length / 2;
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[mid - 1] + s[mid]) / 2;
}

function fmtCost(c: number) {
  return c < 1 ? `$${c.toFixed(2)}` : `$${c}`;
}

function Chart({ axis }: { axis: Axis }) {
  const x = (c: number) =>
    padL + ((Math.log10(c) - Math.log10(COST_MIN)) / (Math.log10(COST_MAX) - Math.log10(COST_MIN))) * (W - padL - padR);
  const y = (v: number) => padT + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * (H - padT - padB);

  const medianCost = median(MODELS.map((m) => m.cost));
  const medianScore = median(MODELS.map((m) => m[axis][0]));
  const xMed = x(medianCost);
  const yMed = y(medianScore);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="ab-lb-svg"
      role="img"
      aria-label={`Reproduction score vs cost per task, ${axis} axis`}
    >
      <rect x={padL} y={padT} width={xMed - padL} height={yMed - padT} fill="rgba(15,157,110,0.06)" />
      <rect x={xMed} y={yMed} width={W - padR - xMed} height={H - padB - yMed} fill="rgba(194,69,45,0.05)" />

      {Y_TICKS.map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} className="ab-lb-grid" />
          <text x={padL - 8} y={y(t) + 4} textAnchor="end" className="ab-lb-tick">{t.toFixed(1)}</text>
        </g>
      ))}
      {COST_TICKS.map((c) => (
        <text key={c} x={x(c)} y={H - padB + 20} textAnchor="middle" className="ab-lb-tick">{fmtCost(c)}</text>
      ))}
      <text x={(padL + W - padR) / 2} y={H - 8} textAnchor="middle" className="ab-lb-axis-label">
        cost per task (log scale)
      </text>

      <text x={padL + 6} y={padT + 14} className="ab-lb-corner good">EFFICIENT</text>
      <text x={W - padR - 6} y={H - padB - 8} textAnchor="end" className="ab-lb-corner bad">INEFFICIENT</text>

      {MODELS.map((m) => {
        const [mean, lo, hi] = m[axis];
        const cx = x(m.cost);
        const cy = y(mean);
        return (
          <g
            key={m.id}
            className="ab-lb-chip-g"
            style={{ transform: `translate(${cx}px, ${cy}px)` }}
          >
            <title>{m.full}</title>
            <line x1={0} x2={0} y1={y(lo) - cy} y2={y(hi) - cy} className="ab-lb-ci" />
            <rect x={-11} y={-11} width={22} height={22} rx={4} fill={m.color} />
            <text x={17} y={4} className="ab-lb-chip-label">{m.short}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Toggle({ axis, onChange }: { axis: Axis; onChange: (a: Axis) => void }) {
  return (
    <div className="ab-lb-toggle" role="tablist" aria-label="Score axis">
      {AXES.map((a) => (
        <button
          key={a.key}
          type="button"
          role="tab"
          aria-selected={axis === a.key}
          className={axis === a.key ? "is-active" : ""}
          onClick={() => onChange(a.key)}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}

export default function Leaderboard() {
  const [axis, setAxis] = useState<Axis>("overall");
  const ranked = [...MODELS].sort((a, b) => b.overall[0] - a.overall[0]);

  return (
    <section className="ab-lb" aria-label="Leaderboard">
      <div id="leaderboard" className="ab-lb-panel scroll-mt-24">
        <div className="ab-lb-head">
          <div>
            <h2 className="ab-lb-title">Animation Bench</h2>
            <div className="bench-mono-label ab-lb-subtitle">Reproduction score vs cost per task</div>
          </div>
          <Toggle axis={axis} onChange={setAxis} />
        </div>
        <div className="ab-lb-chart">
          <Chart axis={axis} />
        </div>
      </div>

      <h2 className="bench-h2">Key takeaways</h2>
      <ul className="bench-list list-disc">
        {TAKEAWAYS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div className="overflow-x-auto">
        <table className="bench-table my-6">
          <thead>
            <tr>
              <th className="num">Rank</th>
              <th>Model</th>
              <th>Harness</th>
              <th className="num">Score</th>
              <th className="num">Visual</th>
              <th className="num">Motion</th>
              <th className="num">Layout</th>
              <th className="num">Task wins</th>
              <th className="num">$ / task</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((m, i) => (
              <tr key={m.id} className={i === 0 ? "lead" : ""}>
                <td className="n">{i + 1}</td>
                <td className="whitespace-nowrap">{m.full}</td>
                <td className="whitespace-nowrap">Computer-1</td>
                <td className="n">
                  {m.overall[0].toFixed(3)} <span className="ab-lb-ci-inline">±{m.ciHalf.toFixed(3)}</span>
                </td>
                <td className="n">{m.visual[0].toFixed(3)}</td>
                <td className="n">{m.motion[0].toFixed(3)}</td>
                <td className="n">{m.layout[0].toFixed(3)}</td>
                <td className="n">{m.wins}</td>
                <td className="n">${m.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="ab-note">
        One selected run per model and task. Scores are reproduction scores on a 0–1 scale, not success rates. Two
        tasks (raycast, Squarespace logo hover) keep their 24 September scores; the rest use the corrected 26
        September scoring.
      </p>
    </section>
  );
}
