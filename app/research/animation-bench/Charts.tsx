"use client";

import { useCallback, useState, useSyncExternalStore, type ReactNode } from "react";
import data from "./charts.json";

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

export const MODELS: ModelRow[] = [
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

const RANKED = [...MODELS].sort((a, b) => b.overall[0] - a.overall[0]);
const BY_ID = Object.fromEntries(MODELS.map((m) => [m.id, m]));
const SITE = Object.fromEntries(data.tasks.map((t) => [t.id, t.site]));
const TRIGGER = Object.fromEntries(data.tasks.map((t) => [t.id, t.trigger]));
const PAIRS = data.pairs;

const mean = (v: number[]) => v.reduce((s, x) => s + x, 0) / v.length;
function median(vals: number[]) {
  const s = [...vals].sort((a, b) => a - b);
  const mid = s.length / 2;
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[mid - 1] + s[mid]) / 2;
}
const nonNull = (v: (number | null)[]) => v.filter((x): x is number => x !== null);
const f2 = (v: number) => v.toFixed(2);
const f3 = (v: number) => v.toFixed(3);

const PROFILE = RANKED.map((m) => {
  const own = PAIRS.filter((p) => p.model === m.id);
  return { m, v: [mean(own.map((p) => p.visual)), mean(own.map((p) => p.motion)), mean(own.map((p) => p.layout))] };
});

const BELOW_DIAGONAL = PAIRS.filter((p) => p.motion < p.visual).length;

const STRIPS = RANKED.map((m) => {
  const own = PAIRS.filter((p) => p.model === m.id);
  return { m, own, med: median(own.map((p) => p.overall)) };
});

const TRIGGERS = Object.entries(
  data.tasks.reduce<Record<string, number>>((acc, t) => ({ ...acc, [t.trigger]: (acc[t.trigger] ?? 0) + 1 }), {}),
)
  .sort((a, b) => b[1] - a[1])
  .map(([trigger, n]) => ({
    trigger,
    n,
    means: RANKED.map((m) => ({
      m,
      v: mean(PAIRS.filter((p) => p.model === m.id && TRIGGER[p.task] === trigger).map((p) => p.overall)),
    })),
  }));

const TIMING = nonNull(PAIRS.map((p) => p.timing));
const TIMING_WRONG = nonNull(PAIRS.map((p) => p.timing_wrong_task));
const STEP_REF = nonNull(PAIRS.map((p) => p.top_step_ref));
const STEP_CAND = nonNull(PAIRS.map((p) => p.top_step_cand));
const PLACEMENT = mean(nonNull(PAIRS.map((p) => p.mot.structure_gate)));
const BURSTIER = PAIRS.filter((p) => p.top_step_ref !== null && p.top_step_cand !== null && p.top_step_cand > p.top_step_ref).length;

const CHART_STATS = {
  belowDiagonal: BELOW_DIAGONAL,
  timingMean: mean(TIMING),
  timingWrongMean: mean(TIMING_WRONG),
  stepRefMedian: median(STEP_REF),
  stepCandMedian: median(STEP_CAND),
  placement: PLACEMENT,
};

function bins(values: number[], step: number) {
  const counts = new Array(Math.round(1 / step)).fill(0);
  for (const v of values) counts[Math.min(counts.length - 1, Math.floor(v / step))]++;
  return counts as number[];
}

function useWidth(fallback: number) {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const subscribe = useCallback(
    (cb: () => void) => {
      if (!el) return () => {};
      const ro = new ResizeObserver(cb);
      ro.observe(el);
      return () => ro.disconnect();
    },
    [el],
  );
  const width = useSyncExternalStore(subscribe, () => el?.clientWidth || fallback, () => fallback);
  return [setEl, width] as const;
}

type Tip = { x: number; y: number; text: string } | null;

function useTip() {
  const [tip, setTip] = useState<Tip>(null);
  const bind = (x: number, y: number, text: string) => ({
    onPointerEnter: () => setTip({ x, y, text }),
    onPointerLeave: () => setTip(null),
  });
  return { tip, bind };
}

function Frame({
  fallback,
  height,
  label,
  tip,
  children,
}: {
  fallback: number;
  height: number | ((w: number) => number);
  label: string;
  tip?: Tip;
  children: (w: number) => ReactNode;
}) {
  const [ref, w] = useWidth(fallback);
  return (
    <div ref={ref} className="ab-ch-frame">
      <svg width={w} height={typeof height === "number" ? height : height(w)} className="ab-ch-svg" role="img" aria-label={label}>
        {children(w)}
      </svg>
      {tip && (
        <div className="ab-ch-tip" style={{ left: Math.min(Math.max(tip.x, 110), w - 110), top: tip.y }}>
          {tip.text}
        </div>
      )}
    </div>
  );
}

function Key() {
  return (
    <div className="bench-legend ab-ch-key">
      {RANKED.map((m) => (
        <span key={m.id} className="bench-legend-item">
          <i style={{ background: m.color, borderRadius: "50%" }} />
          {m.short}
        </span>
      ))}
    </div>
  );
}

export function OverallCI() {
  const X0 = 0.4, X1 = 0.7, rowH = 38, top = 6;
  const h = top + RANKED.length * rowH + 24;
  return (
    <figure className="ab-ch">
      <div className="bench-mono-label ab-ch-title">Overall score · bootstrap 95% CI</div>
      <Frame fallback={380} height={h} label="Mean overall score per model with 95% confidence intervals, ranked">
        {(w) => {
          const l = 74, r = w - 88;
          const x = (v: number) => l + ((v - X0) / (X1 - X0)) * (r - l);
          const base = top + RANKED.length * rowH;
          return (
            <g>
              {[0.4, 0.5, 0.6, 0.7].map((t) => (
                <g key={t}>
                  <line x1={x(t)} x2={x(t)} y1={top} y2={base} className="ab-ch-rule" />
                  <text x={x(t)} y={base + 16} textAnchor="middle" className="ab-ch-t">{f2(t)}</text>
                </g>
              ))}
              {RANKED.map((m, i) => {
                const y = top + i * rowH + rowH / 2 + 5;
                const [v, lo, hi] = m.overall;
                return (
                  <g key={m.id}>
                    <text x={0} y={y + 4} className="ab-ch-l">{m.short}</text>
                    <line x1={x(lo)} x2={x(hi)} y1={y} y2={y} stroke={m.color} strokeWidth={1.5} />
                    <circle cx={x(v)} cy={y} r={5} fill={m.color} />
                    <text x={x(v)} y={y - 9} textAnchor="middle" className="ab-ch-v">{f3(v)}</text>
                    <text x={w} y={y + 4} textAnchor="end" className="ab-ch-t">${m.cost.toFixed(2)} / task</text>
                  </g>
                );
              })}
            </g>
          );
        }}
      </Frame>
      <figcaption className="ab-ch-cap">
        Astra’s interval clears Sol’s and Opus 5.5’s; Sol and Opus 5.5 are indistinguishable.
      </figcaption>
    </figure>
  );
}

const AXIS_NAMES = ["Visual", "Motion", "Layout"];

export function AxisProfile() {
  const Y0 = 0.3, Y1 = 0.8, top = 8, bottom = 28;
  const h = 240;
  const drops = PROFILE.map((p) => p.v[0] - p.v[1]);
  return (
    <figure className="ab-ch">
      <div className="bench-mono-label ab-ch-title">Axis profile · mean per axis</div>
      <Frame fallback={380} height={h} label="Slope chart of mean visual, motion and layout score per model">
        {(w) => {
          const l = 32, r = w - 104;
          const cols = [l + 10, (l + 10 + r) / 2, r];
          const y = (v: number) => top + (1 - (v - Y0) / (Y1 - Y0)) * (h - top - bottom);
          const labelY = PROFILE.map((p) => ({ id: p.m.id, y: y(p.v[2]) })).sort((a, b) => a.y - b.y);
          for (let i = 1; i < labelY.length; i++) labelY[i].y = Math.max(labelY[i].y, labelY[i - 1].y + 13);
          const ly = Object.fromEntries(labelY.map((d) => [d.id, d.y]));
          return (
            <g>
              {[0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((t) => (
                <g key={t}>
                  <line x1={l} x2={r} y1={y(t)} y2={y(t)} className="ab-ch-rule" />
                  <text x={l - 6} y={y(t) + 4} textAnchor="end" className="ab-ch-t">{f2(t)}</text>
                </g>
              ))}
              {cols.map((cx, i) => (
                <text key={cx} x={cx} y={h - 8} textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"} className="ab-ch-t ab-ch-caps">
                  {AXIS_NAMES[i]}
                </text>
              ))}
              {PROFILE.map(({ m, v }) => (
                <g key={m.id}>
                  <polyline points={v.map((s, i) => `${cols[i]},${y(s)}`).join(" ")} fill="none" stroke={m.color} strokeWidth={1.75} />
                  {v.map((s, i) => (
                    <circle key={i} cx={cols[i]} cy={y(s)} r={3} fill={m.color} />
                  ))}
                  <text x={r + 8} y={ly[m.id] + 4} className="ab-ch-l">
                    <tspan fill={m.color}>{f3(v[2])}</tspan> {m.short}
                  </text>
                </g>
              ))}
            </g>
          );
        }}
      </Frame>
      <figcaption className="ab-ch-cap">
        Every model loses {f2(Math.min(...drops))}–{f2(Math.max(...drops))} between visual and motion, about a quarter
        of the scale.
      </figcaption>
    </figure>
  );
}

export function VisualMotionScatter() {
  const { tip, bind } = useTip();
  return (
    <figure className="bench-fig ab-ch-fig">
      <div className="ab-ch-body">
        <div className="bench-mono-label ab-ch-title">Visual vs motion · 192 reconstructions</div>
        <Frame fallback={380} height={(w) => Math.min(w, 420)} tip={tip} label={`Scatter of visual against motion score; ${BELOW_DIAGONAL} of 192 fall below the diagonal`}>
          {(w) => {
            const s = Math.min(w, 420), l = 30, b = 26, t = 6;
            const x = (v: number) => l + v * (s - l - 6);
            const y = (v: number) => t + (1 - v) * (s - t - b);
            return (
              <g>
                {[0, 0.5, 1].map((v) => (
                  <g key={v}>
                    <line x1={x(v)} x2={x(v)} y1={y(0)} y2={y(1)} className="ab-ch-rule" />
                    <line x1={x(0)} x2={x(1)} y1={y(v)} y2={y(v)} className="ab-ch-rule" />
                    <text x={x(v)} y={y(0) + 16} textAnchor="middle" className="ab-ch-t">{v === 0.5 ? "0.5" : v}</text>
                    <text x={l - 6} y={y(v) + 4} textAnchor="end" className="ab-ch-t">{v === 0.5 ? "0.5" : v}</text>
                  </g>
                ))}
                <line x1={x(0)} y1={y(0)} x2={x(1)} y2={y(1)} className="ab-ch-diag" />
                <text x={x(0.03)} y={y(0.95)} className="ab-ch-t ab-ch-caps">↑ motion</text>
                <text x={x(0.75)} y={y(0) + 16} textAnchor="middle" className="ab-ch-t ab-ch-caps">visual →</text>
                {PAIRS.map((p) => {
                  const m = BY_ID[p.model];
                  const cx = x(p.visual), cy = y(p.motion);
                  return (
                    <circle
                      key={`${p.task}-${p.model}`}
                      cx={cx}
                      cy={cy}
                      r={3.2}
                      fill={m.color}
                      className="ab-ch-dot"
                      {...bind(cx, cy, `${SITE[p.task]} · ${m.short} · V ${f2(p.visual)} / M ${f2(p.motion)}`)}
                    />
                  );
                })}
              </g>
            );
          }}
        </Frame>
      </div>
      <Key />
      <figcaption>Each dot is one page a model built. {BELOW_DIAGONAL} of 192 sit below the diagonal: they look better than they move.</figcaption>
    </figure>
  );
}

export function TaskStrips() {
  const { tip, bind } = useTip();
  const h = 330, t = 8, b = 26, l = 30;
  const y = (v: number) => t + (1 - v) * (h - t - b);
  return (
    <figure className="bench-fig ab-ch-fig">
      <div className="ab-ch-body">
        <div className="bench-mono-label ab-ch-title">Overall per task · heavy tick = median</div>
        <Frame fallback={380} height={h} tip={tip} label="Strip plot of the 48 per-task overall scores for each model with medians">
          {(w) => {
            const colW = (w - l) / STRIPS.length;
            return (
              <g>
                {[0, 0.25, 0.5, 0.75, 1].map((v) => (
                  <g key={v}>
                    <line x1={l} x2={w} y1={y(v)} y2={y(v)} className="ab-ch-rule" />
                    <text x={l - 6} y={y(v) + 4} textAnchor="end" className="ab-ch-t">{v}</text>
                  </g>
                ))}
                {STRIPS.map(({ m, own, med }, i) => {
                  const cx = l + colW * (i + 0.5);
                  return (
                    <g key={m.id}>
                      {own.map((p, j) => {
                        const px = cx + (((j * 29) % 48) / 47 - 0.5) * colW * 0.5;
                        const py = y(p.overall);
                        return (
                          <circle
                            key={p.task}
                            cx={px}
                            cy={py}
                            r={2.6}
                            fill={m.color}
                            className="ab-ch-dot"
                            {...bind(px, py, `${SITE[p.task]} · ${m.short} · ${f3(p.overall)}`)}
                          />
                        );
                      })}
                      <line x1={cx - colW * 0.34} x2={cx + colW * 0.34} y1={y(med)} y2={y(med)} className="ab-ch-median" />
                      <text x={cx} y={y(med) - 6} textAnchor="middle" className="ab-ch-v ab-ch-halo">{f3(med)}</text>
                      <text x={cx} y={h - 8} textAnchor="middle" className="ab-ch-l">{m.short}</text>
                    </g>
                  );
                })}
              </g>
            );
          }}
        </Frame>
      </div>
      <figcaption>Astra’s lead is a shift of the whole distribution, not a few tasks: its median and both quartiles sit above every other model’s.</figcaption>
    </figure>
  );
}

export function ByTrigger() {
  const { tip, bind } = useTip();
  const rowH = 30, top = 4, X0 = 0.4, X1 = 0.7;
  const h = top + TRIGGERS.length * rowH + 24;
  return (
    <figure className="bench-fig ab-ch-fig">
      <div className="ab-ch-body">
        <div className="bench-mono-label ab-ch-title">Mean overall by trigger · n = tasks</div>
        <Frame fallback={640} height={h} tip={tip} label="Mean overall score per model for each trigger type">
          {(w) => {
            const l = 128, r = w - 8;
            const x = (v: number) => l + ((v - X0) / (X1 - X0)) * (r - l);
            const base = top + TRIGGERS.length * rowH;
            return (
              <g>
                {[0.4, 0.5, 0.6, 0.7].map((v) => (
                  <g key={v}>
                    <line x1={x(v)} x2={x(v)} y1={top} y2={base} className="ab-ch-rule" />
                    <text x={x(v)} y={base + 16} textAnchor="middle" className="ab-ch-t">{f2(v)}</text>
                  </g>
                ))}
                {TRIGGERS.map(({ trigger, n, means }, i) => {
                  const cy = top + i * rowH + rowH / 2;
                  return (
                    <g key={trigger}>
                      <text x={0} y={cy + 4} className="ab-ch-l">{trigger}</text>
                      <text x={l - 12} y={cy + 4} textAnchor="end" className="ab-ch-t">n={n}</text>
                      <line x1={x(X0)} x2={x(X1)} y1={cy} y2={cy} className="ab-ch-rule" />
                      {means.map(({ m, v }) => (
                        <circle
                          key={m.id}
                          cx={x(v)}
                          cy={cy}
                          r={4.5}
                          fill={m.color}
                          className="ab-ch-dot ab-ch-dot-ring"
                          {...bind(x(v), cy, `${trigger} · ${m.short} · ${f3(v)}`)}
                        />
                      ))}
                    </g>
                  );
                })}
              </g>
            );
          }}
        </Frame>
      </div>
      <Key />
      <figcaption>Astra leads on scroll, autoplay, hover and gesture (43 of 48 tasks); state-change (Fable by 0.005) and the single cursor task are too small to rank.</figcaption>
    </figure>
  );
}

const TIMING_BINS = bins(TIMING, 0.05);
const TIMING_WRONG_BINS = bins(TIMING_WRONG, 0.05);
const STEP_REF_BINS = bins(STEP_REF, 0.05);
const STEP_CAND_BINS = bins(STEP_CAND, 0.05);

function Hist({
  w, y0, hgt, counts, max, filled,
}: { w: number; y0: number; hgt: number; counts: number[]; max: number; filled: boolean }) {
  const bw = w / counts.length;
  const y = (c: number) => y0 + hgt - (c / max) * hgt;
  if (filled) {
    return (
      <g>
        {counts.map((c, i) => c > 0 && (
          <rect key={i} x={i * bw + 0.5} y={y(c)} width={bw - 1} height={y0 + hgt - y(c)} className="ab-ch-bar" />
        ))}
      </g>
    );
  }
  const d = counts.map((c, i) => `L${i * bw},${y(c)}L${(i + 1) * bw},${y(c)}`).join("");
  return <path d={`M0,${y0 + hgt}${d}L${w},${y0 + hgt}`} className="ab-ch-step" />;
}

function MeanLine({ x, y1, y2, label, anchor, dashed }: { x: number; y1: number; y2: number; label: string; anchor: "start" | "end"; dashed?: boolean }) {
  return (
    <g>
      <line x1={x} x2={x} y1={y1} y2={y2} className={dashed ? "ab-ch-mean ab-ch-dashed" : "ab-ch-mean"} />
      <text x={anchor === "start" ? x + 5 : x - 5} y={y1 + 10} textAnchor={anchor} className="ab-ch-v">{label}</text>
    </g>
  );
}

function XAxis({ w, y, l }: { w: number; y: number; l: number }) {
  return (
    <g>
      <line x1={l} x2={w} y1={y} y2={y} className="ab-ch-axis" />
      {[0, 0.25, 0.5, 0.75, 1].map((v) => (
        <text key={v} x={l + v * (w - l)} y={y + 16} textAnchor={v === 0 ? "start" : v === 1 ? "end" : "middle"} className="ab-ch-t">{v}</text>
      ))}
    </g>
  );
}

function TimingPanel() {
  const h = 200, top = 6, plotH = h - top - 26;
  const max = Math.max(...TIMING_BINS, ...TIMING_WRONG_BINS);
  const mT = CHART_STATS.timingMean, mW = CHART_STATS.timingWrongMean;
  return (
    <div className="ab-ch">
      <div className="bench-mono-label ab-ch-title">Timing term · {TIMING.length} reconstructions that move</div>
      <Frame fallback={360} height={h} label={`Histograms of the timing term: same task mean ${f2(mT)}, different-task baseline mean ${f2(mW)}`}>
        {(w) => (
          <g>
            <Hist w={w} y0={top} hgt={plotH} counts={TIMING_BINS} max={max} filled />
            <Hist w={w} y0={top} hgt={plotH} counts={TIMING_WRONG_BINS} max={max} filled={false} />
            <MeanLine x={mT * w} y1={top} y2={top + plotH} label={`${f2(mT)} same task`} anchor="start" />
            <MeanLine x={mW * w} y1={top + 14} y2={top + plotH} label={`${f2(mW)} other task`} anchor="end" dashed />
            <XAxis w={w} y={top + plotH} l={0} />
          </g>
        )}
      </Frame>
      <p className="ab-ch-note">Grey bars: scored against its own reference. Outline: against a different task’s reference.</p>
    </div>
  );
}

function StepPanel() {
  const h = 200, top = 6, gap = 14, rowH = (h - top - 26 - gap) / 2;
  const max = Math.max(...STEP_REF_BINS, ...STEP_CAND_BINS);
  const mR = CHART_STATS.stepRefMedian, mC = CHART_STATS.stepCandMedian;
  return (
    <div className="ab-ch">
      <div className="bench-mono-label ab-ch-title">Largest frame-to-frame step · share of all motion</div>
      <Frame fallback={360} height={h} label={`Histograms of the largest-step share: original median ${f2(mR)}, reconstruction median ${f2(mC)}`}>
        {(w) => (
          <g>
            <Hist w={w} y0={top} hgt={rowH} counts={STEP_REF_BINS} max={max} filled={false} />
            <line x1={0} x2={w} y1={top + rowH} y2={top + rowH} className="ab-ch-rule" />
            <MeanLine x={mR * w} y1={top} y2={top + rowH} label={`original, median ${f2(mR)}`} anchor="start" />
            <Hist w={w} y0={top + rowH + gap} hgt={rowH} counts={STEP_CAND_BINS} max={max} filled />
            <MeanLine x={mC * w} y1={top + rowH + gap} y2={top + 2 * rowH + gap} label={`reconstruction, median ${f2(mC)}`} anchor="start" />
            <XAxis w={w} y={top + 2 * rowH + gap} l={0} />
          </g>
        )}
      </Frame>
      <p className="ab-ch-note">The reconstruction’s largest step is the bigger share in {BURSTIER} of {STEP_CAND.length} pairs.</p>
    </div>
  );
}

export function TimingFigure() {
  return (
    <figure className="bench-fig ab-ch-fig">
      <div className="ab-ch-body ab-ch-grid">
        <TimingPanel />
        <StepPanel />
      </div>
      <figcaption>
        The models know where motion happens (placement {f2(PLACEMENT)}) and barely when: timing {f2(CHART_STATS.timingMean)} against{" "}
        {f2(CHART_STATS.timingWrongMean)} by chance, and the motion lands in one big step.
      </figcaption>
    </figure>
  );
}
