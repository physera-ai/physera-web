"use client";

import { useMemo, useState } from "react";
import { TIER_COLOR, TIER_LABEL, type VoiceRow } from "../data";

const W = 920;
const H = 470;
const PAD = { l: 62, r: 28, t: 26, b: 54 };

// log-scale latency axis: 1s .. 40s
const XMIN = 1;
const XMAX = 40;
const YMIN = 0;
const YMAX = 1;

export default function VoiceScatter({ rows }: { rows: VoiceRow[] }) {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [hover, setHover] = useState<string | null>(null);

  const pts = useMemo(
    () => rows.filter((r) => r.latency_s != null && !hidden.has(r.tier)),
    [rows, hidden],
  );
  const tiers = Array.from(new Set(rows.map((r) => r.tier)));

  const lx = (v: number) =>
    PAD.l + ((Math.log10(Math.max(XMIN, v)) - Math.log10(XMIN)) / (Math.log10(XMAX) - Math.log10(XMIN))) * (W - PAD.l - PAD.r);
  const sy = (v: number) => PAD.t + (1 - (v - YMIN) / (YMAX - YMIN)) * (H - PAD.t - PAD.b);

  const xTicks = [1, 2, 5, 10, 20, 40];
  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="bench-panel">
      <div className="bench-panel-head">
        <h3 className="bench-panel-title">Latency vs empathy</h3>
        <span className="bench-mono-label">Lower-left is fast; upper is more empathic</span>
      </div>
      <div className="bench-dots">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Latency versus empathy scatter">
          <line x1={lx(XMIN)} x2={lx(XMAX)} y1={sy(YMIN)} y2={sy(YMIN)} stroke="var(--bench-rule-2)" />
          <line x1={lx(XMIN)} x2={lx(XMIN)} y1={sy(YMIN)} y2={sy(YMAX)} stroke="var(--bench-rule-2)" />
          {xTicks.map((t) => (
            <text key={t} x={lx(t)} y={sy(YMIN) + 18} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">
              {t}s
            </text>
          ))}
          {yTicks.map((t) => (
            <text key={t} x={lx(XMIN) - 10} y={sy(t) + 4} textAnchor="end" className="bench-svg-mono" fill="var(--bench-ink-2)">
              {t.toFixed(2)}
            </text>
          ))}
          <text x={(lx(XMIN) + lx(XMAX)) / 2} y={H - 12} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">
            Latency (s, log scale)
          </text>
          <text transform={`translate(15 ${(sy(YMIN) + sy(YMAX)) / 2}) rotate(-90)`} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">
            Empathy score
          </text>

          {pts.map((r) => {
            const x = lx(r.latency_s as number);
            const y = sy(r.empathy);
            const c = TIER_COLOR[r.tier];
            const right = x < W - 200;
            const on = hover === null || hover === r.id;
            return (
              <g key={r.id} opacity={on ? 1 : 0.3} onMouseEnter={() => setHover(r.id)} onMouseLeave={() => setHover(null)}>
                <line x1={x} x2={x} y1={sy(r.emp_lo)} y2={sy(r.emp_hi)} stroke={c} strokeWidth="1.5" opacity="0.55" />
                <circle cx={x} cy={y} r="5.5" fill={c} stroke="var(--bench-panel)" strokeWidth="1.5" />
                <text x={right ? x + 10 : x - 10} y={y - 8} textAnchor={right ? "start" : "end"} className="bench-svg-mono" fill="var(--bench-ink)">
                  {r.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="bench-legend">
        {tiers.map((t) => {
          const off = hidden.has(t);
          return (
            <button
              key={t}
              type="button"
              aria-pressed={!off}
              className={`bench-legend-item ${off ? "opacity-35" : ""}`}
              onClick={() =>
                setHidden((s) => {
                  const n = new Set(s);
                  if (n.has(t)) n.delete(t);
                  else n.add(t);
                  return n;
                })
              }
            >
              <i style={{ background: TIER_COLOR[t] }} />
              {TIER_LABEL[t]}
            </button>
          );
        })}
        <span className="bench-legend-item">whisker = 95% CI</span>
      </div>
    </div>
  );
}
