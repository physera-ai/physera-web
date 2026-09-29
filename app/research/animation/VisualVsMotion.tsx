import results from "./data.json";
import ModelLogo from "./ModelLogo";

const MODELS = [
  { id: "gpt-6-astra", name: "GPT-6 Astra", color: "#0f9d6e" },
  { id: "claude-fable-5-1", name: "Claude Fable 5.1", color: "#5170c9" },
  { id: "claude-opus-5-5", name: "Claude Opus 5.5", color: "#ad7545" },
  { id: "gpt-6-sol", name: "GPT-6 Sol", color: "#9b71a3" },
] as const;
type ModelId = (typeof MODELS)[number]["id"];

const W = 360, H = 300, L = 44, R = 14, T = 14, B = 40;
const x = (v: number) => L + v * (W - L - R);
const y = (v: number) => T + (1 - v) * (H - T - B);
const TICKS = [0, 0.25, 0.5, 0.75, 1];

function Panel({ id, name, color }: { id: ModelId; name: string; color: string }) {
  const points = results.tasks.map((t) => ({ task: t.id, v: t.scores[id].visual, m: t.scores[id].motion }));
  const below = points.filter((p) => p.v > p.m).length;
  return (
    <figure className="ab-vvm-panel">
      <figcaption>
        <span className="ab-vvm-name"><ModelLogo model={id} />{name}</span>
        <span className="ab-vvm-count">{below} of {points.length} look better than they move</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${name}: visual similarity against motion consistency for 48 tasks; ${below} of 48 fall below the diagonal.`}>
        {TICKS.map((t) => (
          <g key={t} className="ab-vvm-grid">
            <line x1={x(t)} y1={y(0)} x2={x(t)} y2={y(1)} />
            <line x1={x(0)} y1={y(t)} x2={x(1)} y2={y(t)} />
            <text x={x(t)} y={y(0) + 16} textAnchor="middle">{t.toFixed(2)}</text>
            <text x={x(0) - 8} y={y(t) + 3} textAnchor="end">{t.toFixed(2)}</text>
          </g>
        ))}
        <line className="ab-vvm-diag" x1={x(0)} y1={y(0)} x2={x(1)} y2={y(1)} />
        <text className="ab-vvm-diag-label" x={x(0.86)} y={y(0.92)} textAnchor="end">visual = motion</text>
        <polygon className="ab-vvm-below" points={`${x(0)},${y(0)} ${x(1)},${y(1)} ${x(1)},${y(0)}`} />
        {points.map((p) => (
          <circle key={p.task} cx={x(p.v)} cy={y(p.m)} r="3.4" fill={color} fillOpacity=".82" stroke="#fff" strokeWidth=".8">
            <title>{`${p.task}: visual ${p.v.toFixed(3)}, motion ${p.m.toFixed(3)}`}</title>
          </circle>
        ))}
        <text className="ab-vvm-axis" x={x(0.5)} y={H - 6} textAnchor="middle">visual similarity</text>
        <text className="ab-vvm-axis" transform={`translate(11, ${y(0.5)}) rotate(-90)`} textAnchor="middle">motion consistency</text>
      </svg>
    </figure>
  );
}

export default function VisualVsMotion({ caption }: { caption: string }) {
  return (
    <figure className="bench-fig ab-vvm">
      <div className="ab-vvm-grid-2x2">
        {MODELS.map((m) => <Panel key={m.id} {...m} />)}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
