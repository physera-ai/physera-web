"use client";

import { useState } from "react";
import { ORG_COLOR, type ModelRow } from "../data";

const W = 560;
const SIZE = 440;
const CX = W / 2;
const CY = SIZE / 2 + 4;
const R = 140;
const MIN = 50;
const MAX = 100;

export default function Radar({
  models,
  cats,
}: {
  models: ModelRow[];
  cats: string[];
}) {
  const [showAll, setShowAll] = useState(false);
  const [on, setOn] = useState<Set<string>>(new Set(models.slice(0, 3).map((m) => m.key)));
  const [hover, setHover] = useState<string | null>(null);

  const visible = models.filter((m) => on.has(m.key));
  const angle = (i: number) => -Math.PI / 2 + (i / cats.length) * Math.PI * 2;
  const pt = (i: number, v: number) => {
    const r = ((Math.max(MIN, v) - MIN) / (MAX - MIN)) * R;
    return [CX + Math.cos(angle(i)) * r, CY + Math.sin(angle(i)) * r] as const;
  };

  const rings = [60, 70, 80, 90, 100];

  return (
    <div className="bench-panel">
      <div className="bench-panel-head">
        <h3 className="bench-panel-title">Checks passed, by vulnerability class</h3>
        <div className="flex items-center gap-4">
          <span className="bench-mono-label">
            {visible.length}/{models.length} models
          </span>
          <button type="button" className="bench-mono-label bench-link" onClick={() => setShowAll((s) => !s)}>
            {showAll ? "Show fewer" : "Show all models"}
          </button>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${SIZE}`} className="block h-auto w-full" role="img" aria-label="Radar of check pass rate by vulnerability class">
        {rings.map((v) => (
          <circle key={v} cx={CX} cy={CY} r={((v - MIN) / (MAX - MIN)) * R} fill="none" stroke="var(--bench-rule)" />
        ))}
        {cats.map((c, i) => {
          const [x, y] = pt(i, MAX);
          const [lx, ly] = [CX + Math.cos(angle(i)) * (R + 22), CY + Math.sin(angle(i)) * (R + 20)];
          const a = angle(i);
          const anchor = Math.abs(Math.cos(a)) < 0.2 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
          return (
            <g key={c}>
              <line x1={CX} y1={CY} x2={x} y2={y} stroke="var(--bench-rule)" />
              <text x={lx} y={ly + 4} textAnchor={anchor} className="bench-svg-mono" fill="var(--bench-ink-2)">
                {c.toLowerCase()}
              </text>
            </g>
          );
        })}
        {rings.map((v) => (
          <text key={`t${v}`} x={CX + 4} y={CY - ((v - MIN) / (MAX - MIN)) * R + 4} className="bench-svg-mono" fill="var(--bench-ink-3)" fontSize="9">
            {v}
          </text>
        ))}
        {visible.map((m) => {
          const c = ORG_COLOR[m.org];
          const poly = cats.map((cat, i) => pt(i, m.radar[cat] ?? MIN));
          const dim = hover !== null && hover !== m.key;
          return (
            <g key={m.key} opacity={dim ? 0.25 : 1} onMouseEnter={() => setHover(m.key)} onMouseLeave={() => setHover(null)}>
              <polygon
                points={poly.map(([x, y]) => `${x},${y}`).join(" ")}
                fill={c}
                fillOpacity="0.06"
                stroke={c}
                strokeWidth="1.5"
                strokeDasharray={m.harness === "Terminus 2" ? "4 3" : undefined}
              />
              {poly.map(([x, y], i) => (
                <rect key={i} x={x - 3} y={y - 3} width="6" height="6" fill={c} />
              ))}
            </g>
          );
        })}
      </svg>

      <div className="bench-legend">
        {(showAll ? models : models.slice(0, 3)).map((m) => {
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
      </div>
    </div>
  );
}
