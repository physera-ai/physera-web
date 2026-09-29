"use client";

import { useMemo, useState } from "react";
import { DIMS, ORG_COLOR, type Dim, type ModelRow } from "../data";
import Select from "../../cyberlatch/components/Select";

type XKey = "cost_per_task" | "median_steps";
type YKey = "mean" | Dim;

const W = 920;
const H = 480;
const PAD = { l: 58, r: 28, t: 26, b: 54 };

const round = (v: number) => Math.round(v * 1000) / 1000;

function yOf(m: ModelRow, yk: YKey): number {
  return yk === "mean" ? m.mean : m.dims[yk];
}

export default function Scatter({ models }: { models: ModelRow[] }) {
  const [xk, setXk] = useState<XKey>("cost_per_task");
  const [yk, setYk] = useState<YKey>("mean");
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [hover, setHover] = useState<string | null>(null);

  const xmax = xk === "cost_per_task" ? 30 : 300;
  const xsplit = xk === "cost_per_task" ? 10 : 150;
  const ymin = 0;
  const ymax = 1;
  const ysplit = 0.6;

  const pts = useMemo(() => models.filter((m) => !hidden.has(m.org)), [models, hidden]);
  const best = Math.max(...pts.map((m) => yOf(m, yk)), ymin);

  const sx = (v: number) => round(PAD.l + (v / xmax) * (W - PAD.l - PAD.r));
  const sy = (v: number) => round(PAD.t + (1 - (v - ymin) / (ymax - ymin)) * (H - PAD.t - PAD.b));

  const frontier = useMemo(() => {
    const sorted = [...pts].sort((a, b) => a[xk] - b[xk]);
    const out: ModelRow[] = [];
    let top = -1;
    for (const m of sorted) {
      if (yOf(m, yk) > top) {
        out.push(m);
        top = yOf(m, yk);
      }
    }
    return out;
  }, [pts, xk, yk]);

  const xTicks = xk === "cost_per_task" ? [0, 5, 10, 15, 20, 25, 30] : [0, 50, 100, 150, 200, 250, 300];
  const yTicks = [0, 0.2, 0.4, 0.6, 0.8, 1];
  const orgs = Array.from(new Set(models.map((m) => m.org)));
  const yLabel = yk === "mean" ? "Mean score" : DIMS.find((d) => d.key === yk)?.label ?? yk;

  return (
    <div className="bench-panel">
      <div className="bench-panel-head">
        <h3 className="bench-panel-title">Animation Bench · Cost vs score</h3>
        <div className="flex flex-wrap gap-2">
          <Select
            glyph="↔"
            label={xk === "cost_per_task" ? "Cost / task" : "Median steps"}
            value={xk}
            onChange={(v) => setXk(v as XKey)}
            options={[
              { value: "cost_per_task", label: "Cost / task" },
              { value: "median_steps", label: "Median steps" },
            ]}
          />
          <Select
            glyph="↕"
            label={yLabel}
            value={yk}
            onChange={(v) => setYk(v as YKey)}
            options={[{ value: "mean", label: "Mean score" }, ...DIMS.map((d) => ({ value: d.key, label: d.label }))]}
          />
        </div>
      </div>

      <div className="bench-dots">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Cost versus score scatter">
          <rect x={sx(0)} y={sy(ymax)} width={sx(xsplit) - sx(0)} height={sy(ysplit) - sy(ymax)} fill="var(--bench-good-fill)" opacity="0.55" />
          <rect x={sx(xsplit)} y={sy(ysplit)} width={sx(xmax) - sx(xsplit)} height={sy(ymin) - sy(ysplit)} fill="var(--bench-bad-fill)" opacity="0.55" />
          <text x={sx(xsplit) - 8} y={sy(ymax) + 14} textAnchor="end" className="bench-svg-mono" fill="var(--bench-good-ink)">EFFICIENT</text>
          <text x={sx(xsplit) + 8} y={sy(ymin) - 8} className="bench-svg-mono" fill="var(--bench-bad-ink)">INEFFICIENT</text>

          <line x1={sx(0)} x2={sx(xmax)} y1={sy(best)} y2={sy(best)} stroke="var(--bench-ink-3)" strokeDasharray="2 3" />
          <text x={sx(0) + 6} y={sy(best) - 5} className="bench-svg-mono" fill="var(--bench-ink-3)" fontSize="9">BEST_PERFORMANCE</text>

          <line x1={sx(0)} x2={sx(xmax)} y1={sy(ymin)} y2={sy(ymin)} stroke="var(--bench-rule-2)" />
          <line x1={sx(0)} x2={sx(0)} y1={sy(ymin)} y2={sy(ymax)} stroke="var(--bench-rule-2)" />
          {xTicks.map((t) => (
            <text key={t} x={sx(t)} y={sy(ymin) + 18} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">{t}</text>
          ))}
          {yTicks.map((t) => (
            <text key={t} x={sx(0) - 8} y={sy(t) + 4} textAnchor="end" className="bench-svg-mono" fill="var(--bench-ink-2)">{t.toFixed(1)}</text>
          ))}
          <text x={(sx(0) + sx(xmax)) / 2} y={H - 12} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">
            {xk === "cost_per_task" ? "Cost / task (USD)" : "Median agent steps / task"}
          </text>
          <text transform={`translate(14 ${(sy(ymin) + sy(ymax)) / 2}) rotate(-90)`} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">
            {yLabel} (0–1)
          </text>

          {frontier.length > 1 && (
            <polyline
              points={frontier.map((m) => `${sx(m[xk])},${sy(yOf(m, yk))}`).join(" ")}
              fill="none"
              stroke="var(--bench-good-ink)"
              strokeWidth="1.25"
            />
          )}

          {pts.map((m) => {
            const x = sx(m[xk]);
            const y = sy(yOf(m, yk));
            const c = ORG_COLOR[m.org];
            const right = m[xk] <= xmax * 0.7;
            const native = m.agent === "anthropic-cua-lean";
            const on = hover === null || hover === m.key;
            return (
              <g
                key={m.key}
                opacity={on ? 1 : 0.35}
                onMouseEnter={() => setHover(m.key)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "default" }}
              >
                {native ? (
                  <rect x={x - 5.5} y={y - 5.5} width="11" height="11" transform={`rotate(45 ${x} ${y})`} fill="var(--bench-panel)" stroke={c} strokeWidth="2" />
                ) : (
                  <rect x={x - 5} y={y - 5} width="10" height="10" fill={c} />
                )}
                <text x={right ? x + 11 : x - 11} y={y + 4} textAnchor={right ? "start" : "end"} className="bench-svg-mono" fill="var(--bench-ink)">
                  {m.label}
                </text>
                {hover === m.key && (
                  <g transform={`translate(${right ? x + 11 : x - 191} ${y + 12})`}>
                    <rect width="180" height="58" fill="var(--bench-panel)" stroke="var(--bench-rule-2)" />
                    <text x="8" y="16" className="bench-svg-mono" fill="var(--bench-ink)">
                      {m.agent} · mean {m.mean.toFixed(3)}
                    </text>
                    <text x="8" y="32" className="bench-svg-mono" fill="var(--bench-ink-2)">
                      {m.wins}/15 tasks won · ${m.cost_per_task.toFixed(2)}/task
                    </text>
                    <text x="8" y="48" className="bench-svg-mono" fill="var(--bench-ink-2)">
                      median {m.median_steps} steps
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="bench-legend">
        {orgs.map((o) => {
          const off = hidden.has(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={!off}
              onClick={() =>
                setHidden((s) => {
                  const n = new Set(s);
                  if (n.has(o)) n.delete(o);
                  else n.add(o);
                  return n;
                })
              }
              className={`bench-legend-item ${off ? "opacity-35" : ""}`}
            >
              <i style={{ background: ORG_COLOR[o] }} />
              {o}
            </button>
          );
        })}
        <span className="bench-legend-item">
          <i className="bench-diamond" />
          Native computer-use agent
        </span>
      </div>
    </div>
  );
}
