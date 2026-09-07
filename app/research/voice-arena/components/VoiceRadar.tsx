"use client";

import { useState } from "react";
import { TIER_COLOR, type VoiceRow } from "../data";

const W = 560;
const SIZE = 440;
const CX = W / 2;
const CY = SIZE / 2 + 4;
const R = 140;

export default function VoiceRadar({ rows, dims }: { rows: VoiceRow[]; dims: string[] }) {
  const ranked = rows.filter((r) => dims.every((d) => r.radar[d] != null));
  const [on, setOn] = useState<Set<string>>(new Set(ranked.slice(0, 3).map((r) => r.id)));
  const [hover, setHover] = useState<string | null>(null);
  const visible = ranked.filter((r) => on.has(r.id));

  const angle = (i: number) => -Math.PI / 2 + (i / dims.length) * Math.PI * 2;
  // See VoiceScatter: unrounded floats trigger a React hydration mismatch.
  const round = (v: number) => Math.round(v * 1000) / 1000;
  const pt = (i: number, v: number) => {
    const r = (v / 100) * R;
    return [round(CX + Math.cos(angle(i)) * r), round(CY + Math.sin(angle(i)) * r)] as const;
  };
  const rings = [25, 50, 75, 100];

  return (
    <div className="bench-panel">
      <div className="bench-panel-head">
        <h3 className="bench-panel-title">Profile across axes</h3>
        <span className="bench-mono-label">Normalized 0–100 per axis</span>
      </div>
      <svg viewBox={`0 0 ${W} ${SIZE}`} className="block h-auto w-full" role="img" aria-label="Radar across voice axes">
        {rings.map((v) => (
          <circle key={v} cx={CX} cy={CY} r={(v / 100) * R} fill="none" stroke="var(--bench-rule)" />
        ))}
        {dims.map((c, i) => {
          const [x, y] = pt(i, 100);
          const [lx2, ly2] = [round(CX + Math.cos(angle(i)) * (R + 22)), round(CY + Math.sin(angle(i)) * (R + 20))];
          const a = angle(i);
          const anchor = Math.abs(Math.cos(a)) < 0.2 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
          return (
            <g key={c}>
              <line x1={CX} y1={CY} x2={x} y2={y} stroke="var(--bench-rule)" />
              <text x={lx2} y={ly2 + 4} textAnchor={anchor} className="bench-svg-mono" fill="var(--bench-ink-2)">
                {c.toLowerCase()}
              </text>
            </g>
          );
        })}
        {visible.map((r) => {
          const c = TIER_COLOR[r.tier];
          const poly = dims.map((d, i) => pt(i, r.radar[d] ?? 0));
          const dim = hover !== null && hover !== r.id;
          return (
            <g key={r.id} opacity={dim ? 0.25 : 1} onMouseEnter={() => setHover(r.id)} onMouseLeave={() => setHover(null)}>
              <polygon points={poly.map(([x, y]) => `${x},${y}`).join(" ")} fill={c} fillOpacity="0.06" stroke={c} strokeWidth="1.5" />
              {poly.map(([x, y], i) => (
                <rect key={i} x={x - 3} y={y - 3} width="6" height="6" fill={c} />
              ))}
            </g>
          );
        })}
      </svg>
      <div className="bench-legend">
        {ranked.map((r) => {
          const active = on.has(r.id);
          return (
            <button
              key={r.id}
              type="button"
              aria-pressed={active}
              className={`bench-legend-item ${active ? "" : "opacity-35"}`}
              onClick={() =>
                setOn((s) => {
                  const n = new Set(s);
                  if (n.has(r.id)) n.delete(r.id);
                  else n.add(r.id);
                  return n;
                })
              }
            >
              <i style={{ background: TIER_COLOR[r.tier] }} />
              {r.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
