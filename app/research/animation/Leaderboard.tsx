"use client";

import { useEffect, useRef, useState } from "react";
import ModelLogo from "./ModelLogo";

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

  // Pull on an edge and it bows toward the pointer like a bowstring; vertices stay anchored and it springs back on release.
  const [bow, setBow] = useState({ x: 0, y: 0, ox: cx, oy: cy, live: false });
  const drag = useRef<{ x: number; y: number; scale: number; ox: number; oy: number } | null>(null);
  const spring = useRef<{ raf: number; vx: number; vy: number } | null>(null);
  const resist = (v: number) => (v * 0.7) / (1 + Math.abs(v) / 260);
  const toSvg = (e: React.PointerEvent<SVGSVGElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const scale = 1000 / box.width;
    return { x: (e.clientX - box.left) * scale, y: (e.clientY - box.top) * scale, scale };
  };
  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (spring.current) { cancelAnimationFrame(spring.current.raf); spring.current = null; }
    const pt = toSvg(e);
    drag.current = { x: e.clientX, y: e.clientY, scale: pt.scale, ox: pt.x, oy: pt.y };
    e.currentTarget.setPointerCapture(e.pointerId);
    setBow({ x: 0, y: 0, ox: pt.x, oy: pt.y, live: true });
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d) return;
    setBow({ x: resist((e.clientX - d.x) * d.scale), y: resist((e.clientY - d.y) * d.scale), ox: d.ox, oy: d.oy, live: true });
  };
  const release = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag.current) return;
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    setBow((b) => ({ ...b, live: false }));
  };
  useEffect(() => {
    if (bow.live || (bow.x === 0 && bow.y === 0)) return;
    let { x, y } = bow;
    let vx = 0, vy = 0, last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000); last = now;
      const k = 180, c = 7;
      vx += (-k * x - c * vx) * dt; vy += (-k * y - c * vy) * dt;
      x += vx * dt; y += vy * dt;
      if (Math.abs(x) < 0.05 && Math.abs(y) < 0.05 && Math.abs(vx) < 1 && Math.abs(vy) < 1) {
        spring.current = null;
        setBow((b) => ({ ...b, x: 0, y: 0 }));
        return;
      }
      setBow((b) => ({ ...b, x, y }));
      spring.current = { raf: requestAnimationFrame(step), vx, vy };
    };
    spring.current = { raf: requestAnimationFrame(step), vx: 0, vy: 0 };
    return () => { if (spring.current) cancelAnimationFrame(spring.current.raf); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bow.live]);
  const bowedPath = (pts: number[][]) => {
    const seg = (a: number[], b: number[]) => {
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      const dx = b[0] - a[0], dy = b[1] - a[1], len2 = dx * dx + dy * dy || 1;
      const t = Math.max(0, Math.min(1, ((bow.ox - a[0]) * dx + (bow.oy - a[1]) * dy) / len2));
      const nx = a[0] + t * dx, ny = a[1] + t * dy;
      const dist = Math.hypot(bow.ox - nx, (bow.oy - ny) * 1.6);
      const w = Math.exp(-(dist * dist) / (2 * 70 * 70));
      return `Q ${round(mx + 2 * w * bow.x)} ${round(my + 2 * w * bow.y)} ${round(b[0])} ${round(b[1])}`;
    };
    return `M ${round(pts[0][0])} ${round(pts[0][1])} ${seg(pts[0], pts[1])} ${seg(pts[1], pts[2])} ${seg(pts[2], pts[0])} Z`;
  };

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
        <svg className={`ab-radial${bow.live ? " is-dragging" : ""}`} viewBox="0 0 1000 450" role="group" aria-label="Model reproduction scores across visual similarity, motion consistency, and layout correctness. Each spoke uses the same zero to one scale."
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
          <g className="ab-radial-shapes">
          {MODELS.map((m) => {
            const shown = visible.has(m.id);
            const highlighted = selected?.id === m.id;
            return <g key={m.id} className={`ab-radial-model${highlighted ? " is-highlighted" : ""}${selected && !highlighted ? " is-muted" : ""}${shown ? "" : " is-hidden"}`}
              style={{ color: m.color }} aria-hidden={!shown}>
              <path d={bowedPath(DIMENSIONS.map((d) => point(d.angle, m[d.key][0])))} fill="currentColor" stroke="currentColor" />
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

export function ResultsCharts() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section className="ab-results-charts" aria-label="Model scores across the three dimensions">
      <div className="ab-lb-panel scroll-mt-24">
        <div className="ab-lb-head">
          <div>
            <h3 className="ab-lb-title">Dimensions</h3>
          </div>
        </div>
        <Dimensions active={active} onActive={setActive} />
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
