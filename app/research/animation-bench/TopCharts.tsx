type Model = { id: string; mean: number; visual: number; motion: number; layout: number; cost: number };

const NAME: Record<string, string> = {
  "gpt-6-astra": "GPT-6 Astra",
  "claude-fable-5-1": "Claude Fable 5.1",
  "claude-opus-5-5": "Claude Opus 5.5",
  "gpt-6-sol": "GPT-6 Sol",
};
const COLOR: Record<string, string> = {
  "gpt-6-astra": "#0f9d6e",
  "claude-fable-5-1": "#5170c9",
  "claude-opus-5-5": "#ad7545",
  "gpt-6-sol": "#9b71a3",
};
// 95% bootstrap interval of each model's mean over the 48 tasks (10,000 resamples)
const CI: Record<string, [number, number]> = {
  "gpt-6-astra": [0.551, 0.638],
  "claude-fable-5-1": [0.509, 0.587],
  "gpt-6-sol": [0.485, 0.547],
  "claude-opus-5-5": [0.47, 0.546],
};

const W = 360;
const LABEL_W = 108;

function Overall({ models }: { models: Model[] }) {
  const rowH = 40, top = 8, max = 0.7;
  const x = (v: number) => LABEL_W + (v / max) * (W - LABEL_W - 44);
  const H = top + models.length * rowH + 22;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ab-top-svg" role="img" aria-label="Mean overall score per model with 95% intervals">
      {[0, 0.2, 0.4, 0.6].map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={top} y2={H - 20} stroke="#ecece8" />
          <text x={x(t)} y={H - 6} textAnchor="middle" className="ab-top-tick">{t.toFixed(1)}</text>
        </g>
      ))}
      {models.map((m, i) => {
        const y = top + i * rowH + 8, [lo, hi] = CI[m.id];
        return (
          <g key={m.id}>
            <text x={0} y={y + 14} className="ab-top-lab">{NAME[m.id]}</text>
            <rect x={x(0)} y={y} width={x(m.mean) - x(0)} height={20} rx={2} fill={COLOR[m.id]} />
            <line x1={x(lo)} x2={x(hi)} y1={y + 10} y2={y + 10} stroke="#111" strokeWidth={1.3} />
            <line x1={x(lo)} x2={x(lo)} y1={y + 5} y2={y + 15} stroke="#111" strokeWidth={1.3} />
            <line x1={x(hi)} x2={x(hi)} y1={y + 5} y2={y + 15} stroke="#111" strokeWidth={1.3} />
            <text x={x(hi) + 6} y={y + 14} className="ab-top-val">{m.mean.toFixed(3)}</text>
          </g>
        );
      })}
    </svg>
  );
}

const AXES = [
  { key: "visual" as const, label: "Visual", fill: "#1b1b1b", shape: "circle" },
  { key: "layout" as const, label: "Layout", fill: "#8c8c86", shape: "square" },
  { key: "motion" as const, label: "Motion", fill: "#c2452d", shape: "diamond" },
];

function Axes({ models }: { models: Model[] }) {
  const rowH = 40, top = 26;
  const x = (v: number) => LABEL_W + v * (W - LABEL_W - 14);
  const H = top + models.length * rowH + 22;
  const mark = (shape: string, cx: number, cy: number, fill: string) =>
    shape === "circle" ? <circle cx={cx} cy={cy} r={5.5} fill={fill} />
    : shape === "square" ? <rect x={cx - 5} y={cy - 5} width={10} height={10} fill={fill} />
    : <rect x={cx - 5} y={cy - 5} width={10} height={10} fill={fill} transform={`rotate(45 ${cx} ${cy})`} />;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ab-top-svg" role="img" aria-label="Visual, layout and motion scores per model">
      {AXES.map((a, i) => (
        <g key={a.key}>
          {mark(a.shape, LABEL_W + i * 78 + 6, 10, a.fill)}
          <text x={LABEL_W + i * 78 + 16} y={14} className="ab-top-tick">{a.label}</text>
        </g>
      ))}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={top} y2={H - 20} stroke="#ecece8" />
          <text x={x(t)} y={H - 6} textAnchor="middle" className="ab-top-tick">{t}</text>
        </g>
      ))}
      {models.map((m, i) => {
        const y = top + i * rowH + 18;
        const vals = AXES.map((a) => m[a.key]);
        return (
          <g key={m.id}>
            <text x={0} y={y + 4} className="ab-top-lab">{NAME[m.id]}</text>
            <line x1={x(Math.min(...vals))} x2={x(Math.max(...vals))} y1={y} y2={y} stroke="#cfcfca" strokeWidth={2} />
            {AXES.map((a) => <g key={a.key}>{mark(a.shape, x(m[a.key]), y, a.fill)}</g>)}
          </g>
        );
      })}
    </svg>
  );
}

function Cost({ models }: { models: Model[] }) {
  const H = 206, padL = 34, padB = 34, padT = 12, padR = 16;
  const lx = (c: number) => Math.log10(c);
  const x = (c: number) => padL + ((lx(c) - lx(0.3)) / (lx(6) - lx(0.3))) * (W - padL - padR);
  const y = (v: number) => padT + (1 - (v - 0.48) / (0.62 - 0.48)) * (H - padT - padB);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ab-top-svg" role="img" aria-label="Mean overall score against cost per task">
      {[0.5, 0.55, 0.6].map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="#ecece8" />
          <text x={padL - 6} y={y(t) + 4} textAnchor="end" className="ab-top-tick">{t.toFixed(2)}</text>
        </g>
      ))}
      {[0.5, 1, 2, 4].map((c) => (
        <text key={c} x={x(c)} y={H - padB + 16} textAnchor="middle" className="ab-top-tick">${c}</text>
      ))}
      <text x={(W + padL) / 2} y={H - 4} textAnchor="middle" className="ab-top-tick">cost per task (log scale)</text>
      {models.map((m) => (
        <g key={m.id}>
          <circle cx={x(m.cost)} cy={y(m.mean)} r={7} fill={COLOR[m.id]} />
          <text
            x={x(m.cost) + (m.cost > 3.5 ? -11 : 11)}
            y={y(m.mean) + 4}
            textAnchor={m.cost > 3.5 ? "end" : "start"}
            className="ab-top-lab"
          >
            {NAME[m.id]}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function TopCharts({ models }: { models: Model[] }) {
  const sorted = [...models].sort((a, b) => b.mean - a.mean);
  return (
    <section className="ab-top" aria-label="Results at a glance">
      <figure>
        <div className="bench-mono-label">Overall score</div>
        <Overall models={sorted} />
        <figcaption>Mean over 48 tasks, with 95% intervals.</figcaption>
      </figure>
      <figure>
        <div className="bench-mono-label">By axis</div>
        <Axes models={sorted} />
        <figcaption>Every model is weakest on motion.</figcaption>
      </figure>
      <figure>
        <div className="bench-mono-label">Score vs cost</div>
        <Cost models={sorted} />
        <figcaption>Mean model spend per task.</figcaption>
      </figure>
    </section>
  );
}
