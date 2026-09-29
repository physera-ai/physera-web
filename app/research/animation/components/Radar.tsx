"use client";

import { useState } from "react";
import { DIMS, ORG_COLOR, type ModelRow } from "../data";

const W = 560;
const SIZE = 440;
const CX = W / 2;
const CY = SIZE / 2 + 4;
const R = 140;

const round = (v: number) => Math.round(v * 1000) / 1000;

export default function Radar({ models }: { models: ModelRow[] }) {
  const [on, setOn] = useState<Set<string>>(new Set(models.map((m) => m.key)));
  const [hover, setHover] = useState<string | null>(null);

  const visible = models.filter((m) => on.has(m.key));
  const angle = (i: number) => -Math.PI / 2 + (i / DIMS.length) * Math.PI * 2;
  const pt = (i: number, v: number) => {
    const r = v * R;
    return [round(CX + Math.cos(angle(i)) * r), round(CY + Math.sin(angle(i)) * r)] as const;
  };

  const rings = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <div className="bench-panel">
      <div className="bench-panel-head">
        <h3 className="bench-panel-title">Mean score, by scoring dimension</h3>
        <span className="bench-mono-label">
          {visible.length}/{models.length} models · 0–1 per axis
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${SIZE}`} className="block h-auto w-full" role="img" aria-label="Radar of mean score by scoring dimension">
        {rings.map((v) => (
          <circle key={v} cx={CX} cy={CY} r={v * R} fill="none" stroke="var(--bench-rule)" />
        ))}
        {DIMS.map((d, i) => {
          const [x, y] = pt(i, 1);
          const [lx, ly] = [round(CX + Math.cos(angle(i)) * (R + 22)), round(CY + Math.sin(angle(i)) * (R + 20))];
          const a = angle(i);
          const anchor = Math.abs(Math.cos(a)) < 0.2 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
          return (
            <g key={d.key}>
              <line x1={CX} y1={CY} x2={x} y2={y} stroke="var(--bench-rule)" />
              <text x={lx} y={ly + 4} textAnchor={anchor} className="bench-svg-mono" fill="var(--bench-ink-2)">
                {d.label.toLowerCase()}
              </text>
            </g>
          );
        })}
        {rings.map((v) => (
          <text key={`t${v}`} x={CX + 4} y={round(CY - v * R + 4)} className="bench-svg-mono" fill="var(--bench-ink-3)" fontSize="9">
            {v.toFixed(1)}
          </text>
        ))}
        {visible.map((m) => {
          const c = ORG_COLOR[m.org];
          const poly = DIMS.map((d, i) => pt(i, m.dims[d.key]));
          const dim = hover !== null && hover !== m.key;
          return (
            <g key={m.key} opacity={dim ? 0.25 : 1} onMouseEnter={() => setHover(m.key)} onMouseLeave={() => setHover(null)}>
              <polygon
                points={poly.map(([x, y]) => `${x},${y}`).join(" ")}
                fill={c}
                fillOpacity="0.06"
                stroke={c}
                strokeWidth="1.5"
                strokeDasharray={m.agent === "anthropic-cua-lean" ? "4 3" : undefined}
              />
              {poly.map(([x, y], i) => (
                <rect key={i} x={x - 3} y={y - 3} width="6" height="6" fill={c} />
              ))}
            </g>
          );
        })}
      </svg>

      <div className="bench-legend">
        {models.map((m) => {
          const active = on.has(m.key);
          return (
            <button
              key={m.key}
              type="button"
              aria-pressed={active}
              className={`bench-legend-item ${active ? "" : "opacity-35"}`}
              onClick={() =>
                setOn((s) => {
                  const n = new Set(s);
                  if (n.has(m.key)) n.delete(m.key);
                  else n.add(m.key);
                  return n;
                })
              }
            >
              <i style={{ background: ORG_COLOR[m.org] }} />
              {m.label}
            </button>
          );
        })}
        <span className="bench-legend-item">dashed = native computer-use agent</span>
      </div>
    </div>
  );
}
