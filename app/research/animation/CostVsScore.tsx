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
const XMAX = 8;
const x = (v: number) => L + (v / XMAX) * (W - L - R);
const y = (v: number) => T + (1 - v) * (H - T - B);

function rank(v: number[]) {
  const order = v.map((_, i) => i).sort((a, b) => v[a] - v[b]);
  const r = new Array<number>(v.length);
  for (let i = 0; i < order.length;) {
    let j = i;
    while (j + 1 < order.length && v[order[j + 1]] === v[order[i]]) j++;
    for (let k = i; k <= j; k++) r[order[k]] = (i + j) / 2 + 1;
    i = j + 1;
  }
  return r;
}
function spearman(a: number[], b: number[]) {
  const ra = rank(a), rb = rank(b), n = a.length;
  const ma = ra.reduce((s, v) => s + v, 0) / n, mb = rb.reduce((s, v) => s + v, 0) / n;
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) { num += (ra[i] - ma) * (rb[i] - mb); da += (ra[i] - ma) ** 2; db += (rb[i] - mb) ** 2; }
  return num / Math.sqrt(da * db);
}

function Panel({ id, name, color }: { id: ModelId; name: string; color: string }) {
  const pts = results.tasks.map((t) => ({ task: t.id, c: t.scores[id].cost, s: t.scores[id].score }));
  const rho = spearman(pts.map((p) => p.c), pts.map((p) => p.s));
  const mean = pts.reduce((s, p) => s + p.c, 0) / pts.length;
  return (
    <figure className="ab-vvm-panel">
      <figcaption>
        <span className="ab-vvm-name"><ModelLogo model={id} />{name}</span>
        <span className="ab-vvm-count">mean ${mean.toFixed(2)} per task · Spearman ρ {rho >= 0 ? "+" : "−"}{Math.abs(rho).toFixed(2)}</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${name}: cost per task against overall score for 48 tasks; Spearman correlation ${rho.toFixed(2)}.`}>
        {[0, 2, 4, 6, 8].map((t) => (
          <g key={t} className="ab-vvm-grid">
            <line x1={x(t)} y1={y(0)} x2={x(t)} y2={y(1)} />
            <text x={x(t)} y={y(0) + 16} textAnchor="middle">${t}</text>
          </g>
        ))}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t} className="ab-vvm-grid">
            <line x1={x(0)} y1={y(t)} x2={x(XMAX)} y2={y(t)} />
            <text x={x(0) - 8} y={y(t) + 3} textAnchor="end">{t.toFixed(2)}</text>
          </g>
        ))}
        <line className="ab-vvm-mean" x1={x(mean)} y1={y(0)} x2={x(mean)} y2={y(1)} stroke={color} />
        {pts.map((p) => (
          <circle key={p.task} cx={x(Math.min(p.c, XMAX))} cy={y(p.s)} r="3.4" fill={color} fillOpacity=".82" stroke="#fff" strokeWidth=".8">
            <title>{`${p.task}: $${p.c.toFixed(2)}, overall ${p.s.toFixed(3)}`}</title>
          </circle>
        ))}
        <text className="ab-vvm-axis" x={x(XMAX / 2)} y={H - 6} textAnchor="middle">cost per task (USD)</text>
        <text className="ab-vvm-axis" transform={`translate(11, ${y(0.5)}) rotate(-90)`} textAnchor="middle">overall score</text>
      </svg>
    </figure>
  );
}

export default function CostVsScore({ caption }: { caption: string }) {
  return (
    <figure className="bench-fig ab-vvm">
      <div className="ab-vvm-grid-2x2">
        {MODELS.map((m) => <Panel key={m.id} {...m} />)}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
