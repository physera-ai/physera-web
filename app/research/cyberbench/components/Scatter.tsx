"use client";

import { useMemo, useState } from "react";
import { ORG_COLOR, type ModelRow } from "../data";
import Select from "./Select";

type XKey = "cost_per_task" | "median_min";
type YKey = "acc" | "checks";

const W = 920;
const H = 480;
const PAD = { l: 58, r: 28, t: 26, b: 54 };

export default function Scatter({ models }: { models: ModelRow[] }) {
  const [xk, setXk] = useState<XKey>("cost_per_task");
  const [yk, setYk] = useState<YKey>("acc");
  const [harness, setHarness] = useState<"both" | "OpenCode" | "Terminus 2">("both");
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [hover, setHover] = useState<string | null>(null);

  const xmax = xk === "cost_per_task" ? 10 : 35;
  const xsplit = xk === "cost_per_task" ? 3 : 15;
  const ymin = yk === "acc" ? 0 : 80;
  const ymax = 100;
  const ysplit = yk === "acc" ? 40 : 90;

  const pts = useMemo(
    () =>
      models.filter(
        (m) => !hidden.has(m.org) && (harness === "both" || m.harness === harness),
      ),
    [models, hidden, harness],
  );
  const best = Math.max(...pts.map((m) => m[yk]), ymin);

  const sx = (v: number) => PAD.l + (v / xmax) * (W - PAD.l - PAD.r);
  const sy = (v: number) => PAD.t + (1 - (v - ymin) / (ymax - ymin)) * (H - PAD.t - PAD.b);

  const frontier = useMemo(() => {
    const sorted = [...pts].sort((a, b) => a[xk] - b[xk]);
    const out: ModelRow[] = [];
    let top = -1;
    for (const m of sorted) {
      if (m[yk] > top) {
        out.push(m);
        top = m[yk];
      }
    }
    return out;
  }, [pts, xk, yk]);

  const xTicks = xk === "cost_per_task" ? [0, 2, 4, 6, 8, 10] : [0, 5, 10, 15, 20, 25, 30, 35];
  const yTicks = yk === "acc" ? [0, 20, 40, 60, 80, 100] : [80, 85, 90, 95, 100];
  const orgs = Array.from(new Set(models.map((m) => m.org)));

  return (
    <div className="bench-panel">
      <div className="bench-panel-head">
        <h3 className="bench-panel-title">CyberBench · Defensive</h3>
        <div className="flex flex-wrap gap-2">
          <Select
            glyph="↔"
            label={xk === "cost_per_task" ? "Cost / task" : "Minutes / task"}
            value={xk}
            onChange={(v) => setXk(v as XKey)}
            options={[
              { value: "cost_per_task", label: "Cost / task" },
              { value: "median_min", label: "Minutes / task" },
            ]}
          />
          <Select
            glyph="⌂"
            label={harness === "both" ? "Both harnesses" : harness}
            value={harness}
            onChange={(v) => setHarness(v as typeof harness)}
            options={[
              { value: "both", label: "Both harnesses" },
              { value: "OpenCode", label: "OpenCode" },
              { value: "Terminus 2", label: "Terminus 2" },
            ]}
          />
          <Select
            glyph="↕"
            label={yk === "acc" ? "Tasks solved" : "Checks passed"}
            value={yk}
            onChange={(v) => setYk(v as YKey)}
            options={[
              { value: "acc", label: "Tasks solved" },
              { value: "checks", label: "Checks passed" },
            ]}
          />
        </div>
      </div>

      <div className="bench-dots">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Cost versus accuracy scatter">
          {/* quadrants */}
          <rect x={sx(0)} y={sy(ymax)} width={sx(xsplit) - sx(0)} height={sy(ysplit) - sy(ymax)} fill="var(--bench-good-fill)" opacity="0.55" />
          <rect x={sx(xsplit)} y={sy(ysplit)} width={sx(xmax) - sx(xsplit)} height={sy(ymin) - sy(ysplit)} fill="var(--bench-bad-fill)" opacity="0.55" />
          <text x={sx(xsplit) - 8} y={sy(ymax) + 14} textAnchor="end" className="bench-svg-mono" fill="var(--bench-good-ink)">EFFICIENT</text>
          <text x={sx(xsplit) + 8} y={sy(ymin) - 8} className="bench-svg-mono" fill="var(--bench-bad-ink)">INEFFICIENT</text>

          {/* best line */}
          <line x1={sx(0)} x2={sx(xmax)} y1={sy(best)} y2={sy(best)} stroke="var(--bench-ink-3)" strokeDasharray="2 3" />
          <text x={sx(0) + 6} y={sy(best) - 5} className="bench-svg-mono" fill="var(--bench-ink-3)" fontSize="9">BEST_PERFORMANCE</text>

          {/* axes */}
          <line x1={sx(0)} x2={sx(xmax)} y1={sy(ymin)} y2={sy(ymin)} stroke="var(--bench-rule-2)" />
          <line x1={sx(0)} x2={sx(0)} y1={sy(ymin)} y2={sy(ymax)} stroke="var(--bench-rule-2)" />
          {xTicks.map((t) => (
            <text key={t} x={sx(t)} y={sy(ymin) + 18} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">{t}</text>
          ))}
          {yTicks.map((t) => (
            <text key={t} x={sx(0) - 8} y={sy(t) + 4} textAnchor="end" className="bench-svg-mono" fill="var(--bench-ink-2)">{t}</text>
          ))}
          <text x={(sx(0) + sx(xmax)) / 2} y={H - 12} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">
            {xk === "cost_per_task" ? "Cost / task (USD)" : "Median minutes / task"}
          </text>
          <text transform={`translate(14 ${(sy(ymin) + sy(ymax)) / 2}) rotate(-90)`} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">
            {yk === "acc" ? "Tasks solved (%)" : "Checks passed (%)"}
          </text>

          {/* frontier */}
          {frontier.length > 1 && (
            <polyline
              points={frontier.map((m) => `${sx(m[xk])},${sy(m[yk])}`).join(" ")}
              fill="none"
              stroke="var(--bench-good-ink)"
              strokeWidth="1.25"
            />
          )}

          {/* points */}
          {pts.map((m) => {
            const x = sx(m[xk]);
            const y = sy(m[yk]);
            const c = ORG_COLOR[m.org];
            const right = m[xk] <= xmax * 0.7;
            const t2 = m.harness === "Terminus 2";
            const nearTwin = pts.some(
              (o) => o.key !== m.key && Math.abs(sx(o[xk]) - x) < 150 && Math.abs(sy(o[yk]) - y) < 16,
            );
            const below = t2 && nearTwin;
            const ly = below ? y + 20 : y + 4;
            const on = hover === null || hover === m.key;
            return (
              <g
                key={m.key}
                opacity={on ? 1 : 0.35}
                onMouseEnter={() => setHover(m.key)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "default" }}
              >
                {t2 ? (
                  <rect x={x - 5.5} y={y - 5.5} width="11" height="11" transform={`rotate(45 ${x} ${y})`} fill="var(--bench-panel)" stroke={c} strokeWidth="2" />
                ) : (
                  <rect x={x - 5} y={y - 5} width="10" height="10" fill={c} />
                )}
                <text
                  x={below ? x : right ? x + 11 : x - 11}
                  y={ly}
                  textAnchor={below ? "middle" : right ? "start" : "end"}
                  className="bench-svg-mono"
                  fill="var(--bench-ink)"
                >
                  {m.label}
                </text>
                {hover === m.key && (
                  <g transform={`translate(${right ? x + 11 : x - 191} ${y + 12})`}>
                    <rect width="180" height="58" fill="var(--bench-panel)" stroke="var(--bench-rule-2)" />
                    <text x="8" y="16" className="bench-svg-mono" fill="var(--bench-ink)">
                      {m.harness} · {m.solved}/14 solved
                    </text>
                    <text x="8" y="32" className="bench-svg-mono" fill="var(--bench-ink-2)">
                      {m.checks}% checks · ${m.cost_per_task.toFixed(2)}/task
                    </text>
                    <text x="8" y="48" className="bench-svg-mono" fill="var(--bench-ink-2)">
                      median {m.median_min} min
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
          Terminus 2 run
        </span>
      </div>
    </div>
  );
}
