"use client";

import { useRef, useState } from "react";
import ModelLogo from "./ModelLogo";

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

const W = 1000, H = 390, padL = 58, padR = 142, padT = 48, padB = 54;
const Y_MIN = 0.3, Y_MAX = 0.8;
const COST_MIN = 0.3, COST_MAX = 6;
const Y_TICKS = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
const COST_TICKS = [0.5, 1, 2, 4];

function median(vals: number[]) {
  const s = [...vals].sort((a, b) => a - b);
  const mid = s.length / 2;
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[mid - 1] + s[mid]) / 2;
}

function Chart({ axis, active, onActive }: {
  axis: Axis; active: string | null; onActive: (id: string | null) => void;
}) {
  const x = (c: number) => padL + ((Math.log10(c) - Math.log10(COST_MIN)) / (Math.log10(COST_MAX) - Math.log10(COST_MIN))) * (W - padL - padR);
  const y = (v: number) => padT + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * (H - padT - padB);
  const xMed = x(median(MODELS.map((m) => m.cost)));
  const yMed = y(median(MODELS.map((m) => m[axis][0])));

  return (
    <div className="ab-chart-scroll" role="region" aria-label="Interactive score versus cost chart" tabIndex={0}>
      <svg viewBox={`0 0 ${W} ${H}`} className="ab-lb-svg" role="group" aria-label={`Reproduction score vs cost per task, ${axis} axis`}>
        <defs>
          <pattern id="ab-chart-dots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".7" fill="#3457d5" opacity=".16" />
          </pattern>
        </defs>
        <rect x={padL} y={padT} width={xMed - padL} height={yMed - padT} fill="#f3f9f6" className="ab-chart-zone" />
        <rect x={padL} y={padT} width={xMed - padL} height={yMed - padT} fill="url(#ab-chart-dots)" className="ab-chart-zone" />
        {Y_TICKS.map((t) => (
          <g key={t}>
            <line x1={padL} y1={y(t)} x2={W - padR} y2={y(t)} className="ab-lb-grid" />
            <text x={padL - 16} y={y(t) + 4} textAnchor="end" className="ab-lb-tick">{t.toFixed(1)}</text>
          </g>
        ))}
        {COST_TICKS.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={padT} x2={x(t)} y2={H - padB} className="ab-lb-grid vertical" />
            <text x={x(t)} y={H - padB + 24} textAnchor="middle" className="ab-lb-tick">${t.toFixed(t < 1 ? 2 : 0)}</text>
          </g>
        ))}
        <line x1={xMed} y1={padT} x2={xMed} y2={H - padB} className="ab-chart-median" />
        <line x1={padL} y1={yMed} x2={W - padR} y2={yMed} className="ab-chart-median" />
        <text x={padL} y={22} className="ab-lb-axis-label">REPRODUCTION SCORE ↑</text>
        <text x={padL + 14} y={padT + 23} className="ab-lb-corner good">BETTER + CHEAPER</text>
        <text x={W - padR} y={H - 5} textAnchor="end" className="ab-lb-axis-label">COST / TASK · USD · LOG SCALE →</text>
        {MODELS.map((m) => {
          const [mean, lo, hi] = m[axis];
          const selected = active === m.id;
          // Adjacent models get opposite label anchors; no data is displaced.
          const left = m.id === "gpt-6-astra" || m.id === "claude-opus-5-5";
          return (
            <g key={m.id} className={`ab-lb-chip-g${selected ? " is-selected" : ""}${active && !selected ? " is-muted" : ""}`}
              style={{ transform: `translate(${x(m.cost)}px, ${y(mean)}px)`, color: m.color }}
              tabIndex={0} role="button" aria-pressed={selected}
              aria-label={`${m.full}: ${mean.toFixed(3)} ${axis}, 95% confidence interval ${lo.toFixed(3)} to ${hi.toFixed(3)}, $${m.cost.toFixed(2)} per task`}
              onMouseEnter={() => onActive(m.id)} onMouseLeave={() => onActive(null)}
              onFocus={() => onActive(m.id)} onBlur={() => onActive(null)}
              onClick={() => onActive(selected ? null : m.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActive(selected ? null : m.id); } if (e.key === "Escape") onActive(null); }}>
              <title>{`${m.full}: ${mean.toFixed(3)} · 95% CI ${lo.toFixed(3)}–${hi.toFixed(3)} · $${m.cost.toFixed(2)}/task`}</title>
              <rect x={left ? -133 : -20} y={-27} width="153" height="54" fill="transparent" />
              <line x1={0} x2={0} y1={y(hi) - y(mean)} y2={y(lo) - y(mean)} className="ab-lb-ci" />
              {[lo, hi].map((v) => <line key={v} x1={-5} x2={5} y1={y(v) - y(mean)} y2={y(v) - y(mean)} className="ab-lb-ci" />)}
              <circle r="17" fill="currentColor" className="ab-point-halo" />
              <circle r="6" fill="currentColor" stroke="white" strokeWidth="2" />
              <text x={left ? -17 : 17} y={-6} textAnchor={left ? "end" : "start"} className="ab-lb-chip-label">{m.short}</text>
              <text x={left ? -17 : 17} y={13} textAnchor={left ? "end" : "start"} className="ab-point-value">{mean.toFixed(3)}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const DIMENSIONS = [
  { key: "visual", label: "Visual similarity", angle: -Math.PI / 2 },
  { key: "motion", label: "Motion consistency", angle: Math.PI / 6 },
  { key: "layout", label: "Layout correctness", angle: Math.PI * 5 / 6 },
] as const;

function Dimensions({ active, onActive }: { active: string | null; onActive: (id: string | null) => void }) {
  const [visible, setVisible] = useState(() => new Set(MODELS.map((m) => m.id)));
  const cx = 500, cy = 222, rx = 370, ry = 156;
  const point = (angle: number, value: number) => [cx + Math.cos(angle) * rx * value, cy + Math.sin(angle) * ry * value];
  const round = (value: number) => Math.round(value * 1000) / 1000;
  const selected = MODELS.find((m) => m.id === active && visible.has(m.id));

  // The shapes can be tugged with the pointer, resist, and spring back on release.
  const [pull, setPull] = useState({ x: 0, y: 0, live: false });
  const dragStart = useRef<{ x: number; y: number; scale: number } | null>(null);
  const resist = (v: number) => (v * 0.55) / (1 + Math.abs(v) / 220);
  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    dragStart.current = { x: e.clientX, y: e.clientY, scale: 1000 / box.width };
    e.currentTarget.setPointerCapture(e.pointerId);
    setPull({ x: 0, y: 0, live: true });
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const start = dragStart.current;
    if (!start) return;
    setPull({ x: resist((e.clientX - start.x) * start.scale), y: resist((e.clientY - start.y) * start.scale), live: true });
  };
  const release = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragStart.current) return;
    dragStart.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    setPull({ x: 0, y: 0, live: false });
  };
  const stretch = 1 + Math.hypot(pull.x, pull.y) / 700;

  return (
    <div className="ab-dimensions">
      <div className="ab-model-switches" role="group" aria-label="Models shown in dimensions chart">
        {MODELS.map((m) => (
          <button key={m.id} type="button" aria-pressed={visible.has(m.id)}
            style={{ "--model-color": m.color } as React.CSSProperties}
            onMouseEnter={() => onActive(m.id)} onMouseLeave={() => onActive(null)}
            onFocus={() => onActive(m.id)} onBlur={() => onActive(null)}
            onClick={() => setVisible((previous) => {
              const next = new Set(previous);
              if (next.has(m.id)) next.delete(m.id); else next.add(m.id);
              return next;
            })}>
            <ModelLogo model={m.id} /><span>{m.full}</span><b>{m.overall[0].toFixed(3)}</b>
          </button>
        ))}
      </div>
      <div className="ab-radial-stage">
        <svg className={`ab-radial${pull.live ? " is-dragging" : ""}`} viewBox="0 0 1000 450" role="group" aria-label="Model reproduction scores across visual similarity, motion consistency, and layout correctness. Each spoke uses the same zero to one scale."
          onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release}>
          <defs>
            <pattern id="ab-radial-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="#99aaa3" opacity=".26" /></pattern>
          </defs>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#ab-radial-dots)" />
          {[.2, .4, .6, .8, 1].map((v) => <g key={v} className="ab-radial-ring">
            <ellipse cx={cx} cy={cy} rx={rx * v} ry={ry * v} />
            <text x={cx + rx * v + 5} y={cy - 7}>{v.toFixed(1)}</text>
          </g>)}
          {DIMENSIONS.map((d) => {
            const [x, y] = point(d.angle, 1);
            return <g key={d.key} className="ab-radial-spoke">
              <line x1={cx} y1={cy} x2={round(x)} y2={round(y)} />
              <circle cx={round(x)} cy={round(y)} r="3" />
            </g>;
          })}
          <g className="ab-radial-shapes" style={{ transform: `translate(${pull.x}px, ${pull.y}px) scale(${stretch})`, transformOrigin: `${cx}px ${cy}px`, transition: pull.live ? "none" : "transform .75s cubic-bezier(.18, 1.9, .3, 1)" }}>
          {MODELS.map((m) => {
            const shown = visible.has(m.id);
            const highlighted = selected?.id === m.id;
            return <g key={m.id} className={`ab-radial-model${highlighted ? " is-highlighted" : ""}${selected && !highlighted ? " is-muted" : ""}${shown ? "" : " is-hidden"}`}
              style={{ color: m.color }} aria-hidden={!shown}>
              <polygon points={DIMENSIONS.map((d) => point(d.angle, m[d.key][0]).map(round).join(",")).join(" ")}
                fill="currentColor" stroke="currentColor" />
              {DIMENSIONS.map((d) => {
                const [x, y] = point(d.angle, m[d.key][0]);
                return <circle key={d.key} cx={round(x)} cy={round(y)} r={highlighted ? 5 : 3.5} fill="currentColor" stroke="white" strokeWidth="1.5" />;
              })}
            </g>;
          })}
          </g>
          <circle cx={cx} cy={cy} r="2.5" fill="#85958d" />
          {DIMENSIONS.map((d, i) => {
            const [x, y] = i === 0 ? [500, 32] : i === 1 ? [830, 345] : [170, 345];
            return <g key={d.key} className="ab-radial-label" transform={`translate(${round(x)}, ${round(y)})`}>
              <text textAnchor="middle">{d.label}</text>
              <text className="ab-radial-label-value" y="23" textAnchor="middle">
                {selected ? selected[d.key][0].toFixed(3) : "0–1"}
              </text>
            </g>;
          })}
          {visible.size === 0 && <text x="500" y="420" textAnchor="middle" className="ab-radial-empty">Select a model to compare</text>}
        </svg>
      </div>
      <div className="ab-dimension-readouts" aria-label="Dimension scores">
        {DIMENSIONS.map((d) => <div key={d.key} className="ab-dimension-readout">
          <span className="ab-dimension-name">{d.label}</span>
          <div className="ab-dimension-bars">
            {MODELS.map((m) => <div key={m.id} className={`ab-dimension-bar${visible.has(m.id) ? "" : " is-hidden"}${selected && selected.id !== m.id ? " is-muted" : ""}`}
              aria-label={`${m.full}, ${d.label}: ${m[d.key][0].toFixed(3)}`}>
              <span className="ab-mini-track"><i style={{ width: `${m[d.key][0] * 100}%`, background: m.color }} /></span>
              <span>{m[d.key][0].toFixed(3)}</span>
            </div>)}
          </div>
        </div>)}
      </div>
      <div className="ab-radial-footer"><span>0–1 scale · 48 tasks per model</span><span>Toggle models to compare · focus to inspect</span></div>
    </div>
  );
}

function Toggle({ axis, onChange }: { axis: Axis; onChange: (a: Axis) => void }) {
  return (
    <div className="ab-lb-toggle" role="group" aria-label="Score axis">
      {AXES.map((a) => (
        <button
          key={a.key}
          type="button"
          aria-pressed={axis === a.key}
          className={axis === a.key ? "is-active" : ""}
          onClick={() => onChange(a.key)}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}

export function ResultsCharts() {
  const [axis, setAxis] = useState<Axis>("overall");
  const [view, setView] = useState<"dimensions" | "cost">("dimensions");
  const [active, setActive] = useState<string | null>(null);
  const inspected = MODELS.find((m) => m.id === active);
  return (
    <section className="ab-results-charts" aria-label="Model dimensions and cost comparison">
      <div className="ab-lb-panel scroll-mt-24">
        <div className="ab-lb-head">
          <div>
            <h3 className="ab-lb-title">Dimensions</h3>

          </div>
          <div className="ab-view-switch" role="group" aria-label="Chart view">
            <button type="button" aria-pressed={view === "dimensions"} onClick={() => { setView("dimensions"); setActive(null); }}>Dimensions</button>
            <button type="button" aria-pressed={view === "cost"} onClick={() => { setView("cost"); setActive(null); }}>Reproduction score vs cost per task</button>
          </div>
        </div>
        {view === "dimensions" ? <Dimensions active={active} onActive={setActive} /> : <div className="ab-lb-chart">
          <div className="ab-cost-controls"><Toggle axis={axis} onChange={setAxis} /></div>
          <Chart axis={axis} active={active} onActive={setActive} />
        <div className="ab-chart-inspector" aria-live="polite" aria-atomic="true">
          {inspected ? <>
            <span className="ab-inspector-name"><i style={{ background: inspected.color }} />{inspected.full}</span>
            <span><b>{inspected[axis][0].toFixed(3)}</b> {axis}</span>
            <span>95% CI <b>{inspected[axis][1].toFixed(3)}–{inspected[axis][2].toFixed(3)}</b></span>
            <span><b>${inspected.cost.toFixed(2)}</b> / task</span>
          </> : <><span>Hover or focus a model to inspect</span><span>↕ 95% confidence interval</span></>}
        </div>
        </div>}
      </div>
    </section>
  );
}

export default function Leaderboard() {
  const ranked = [...MODELS].sort((a, b) => b.overall[0] - a.overall[0]);
  return (
    <section id="leaderboard" className="ab-lb ab-centerfold scroll-mt-24" aria-label="Leaderboard">
      <div className="ab-centerfold-head">
        <div><span className="bench-mono-label">Leaderboard</span><h2 className="ab-lb-title">Animation Bench</h2></div>
        <span className="ab-centerfold-meta">4 models · 48 tasks · 192 reconstructions</span>
      </div>
      <div className="ab-lb-tablewrap overflow-x-auto">
        <table className="bench-table ab-lb-table">
          <thead>
            <tr>
              <th className="num">Rank</th>
              <th>Model</th>
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
                <td className="whitespace-nowrap"><span className="ab-lb-model"><ModelLogo model={m.id} />{m.full}</span></td>
                <td className="n overall">
                  <span className="ab-score-number">{m.overall[0].toFixed(3)}</span> <span className="ab-lb-ci-inline">±{m.ciHalf.toFixed(3)}</span>
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
        One selected run per model and task. Scores are reproduction scores on a 0–1 scale, not success rates.
      </p>
    </section>
  );
}
