"use client";

import { useState } from "react";
import Figure from "./Figure";

const W = 920;
const H = 250;
const PAD = { l: 250, r: 90, t: 22, b: 40 };

const rows = [
  { key: "ads", label: "Global ad spend · 2026", value: 1300, note: "Growing 9% a year; roughly 80% bought on predicted response", emphasis: false },
  { key: "insights", label: "Insights ecosystem", value: 160, note: "The wider market for behavioral insight. All of it samples.", emphasis: false },
  { key: "mr2030", label: "Market & financial research · 2030", value: 116, note: "Projected. 71% of researchers expect most research to be synthetic within three years.", emphasis: true },
  { key: "mr2025", label: "Market & financial research · 2025", value: 93, note: "Answered today by sampling. Physera supplies the calibration layer.", emphasis: true },
];

export default function SpendChart() {
  const [hover, setHover] = useState<string | null>(null);
  const xmax = 1400;
  const sx = (v: number) => PAD.l + (v / xmax) * (W - PAD.l - PAD.r);
  const rowH = (H - PAD.t - PAD.b) / rows.length;
  const barH = 18;
  const active = rows.find((r) => r.key === hover);

  return (
    <Figure
      title="Spend on predicting what people will do"
      note="USD billions per year"
      caption={
        <>
          <span className="bench-legend-item">
            <i style={{ background: "var(--bench-good-ink)" }} />
            Where Physera enters first
          </span>
          <span className="bench-legend-item">
            <i style={{ background: "var(--bench-ink-2)" }} />
            Adjacent spend bought on predicted behavior
          </span>
          <span className="bench-legend-item" style={{ marginLeft: "auto", textTransform: "none", letterSpacing: 0 }}>
            {active ? active.note : "Hover a bar for context"}
          </span>
        </>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Horizontal bars: global ad spend 1.3 trillion, insights ecosystem 160 billion, market research 93 billion in 2025 and 116 billion by 2030">
        {[0, 250, 500, 750, 1000, 1250].map((t) => (
          <g key={t}>
            <line x1={sx(t)} x2={sx(t)} y1={PAD.t} y2={H - PAD.b} stroke="var(--bench-rule)" />
            <text x={sx(t)} y={H - PAD.b + 18} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">
              {t === 0 ? "0" : t >= 1000 ? `${(t / 1000).toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}T` : `${t}B`}
            </text>
          </g>
        ))}
        {rows.map((r, i) => {
          const y = PAD.t + i * rowH + (rowH - barH) / 2;
          const on = hover === null || hover === r.key;
          const color = r.emphasis ? "var(--bench-good-ink)" : "var(--bench-ink-2)";
          return (
            <g key={r.key} opacity={on ? 1 : 0.4} onMouseEnter={() => setHover(r.key)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
              <rect x={0} y={PAD.t + i * rowH} width={W} height={rowH} fill="transparent" />
              <text x={PAD.l - 14} y={y + barH / 2 + 4} textAnchor="end" fontSize="13" fill="var(--bench-ink)">
                {r.label}
              </text>
              <rect x={sx(0)} y={y} width={Math.max(sx(r.value) - sx(0), 2)} height={barH} fill={color} rx="0" />
              <text x={sx(r.value) + 10} y={y + barH / 2 + 4} className="bench-svg-mono" fill="var(--bench-ink)">
                {r.value >= 1000 ? `$${(r.value / 1000).toFixed(1)}T` : `$${r.value}B`}
              </text>
            </g>
          );
        })}
        <line x1={sx(0)} x2={sx(0)} y1={PAD.t} y2={H - PAD.b} stroke="var(--bench-rule-2)" />
      </svg>
    </Figure>
  );
}
