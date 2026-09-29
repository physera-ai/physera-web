import results from "./data.json";
import ModelLogo from "./ModelLogo";

const MODELS = [
  { id: "gpt-6-astra", name: "GPT-6 Astra", color: "#0f9d6e" },
  { id: "claude-fable-5-1", name: "Claude Fable 5.1", color: "#5170c9" },
  { id: "claude-opus-5-5", name: "Claude Opus 5.5", color: "#ad7545" },
  { id: "gpt-6-sol", name: "GPT-6 Sol", color: "#9b71a3" },
] as const;

const W = 1000, H = 420, L = 56, R = 20, T = 18, B = 48;
const YMIN = 0.1;
const XMIN = 0.2, XMAX = 8;
const x = (v: number) => L + (Math.log(v / XMIN) / Math.log(XMAX / XMIN)) * (W - L - R);
const y = (v: number) => T + (1 - (v - YMIN) / (1 - YMIN)) * (H - T - B);
const XT = [0.25, 0.5, 1, 2, 4, 8];
const YT = [0.25, 0.5, 0.75, 1];

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
const signed = (v: number) => `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(2)}`;

export default function CostVsScore({ caption }: { caption: string }) {
  const series = MODELS.map((m) => {
    const pts = results.tasks.map((t) => ({ task: t.id, c: t.scores[m.id].cost, s: t.scores[m.id].score }));
    const meanC = pts.reduce((a, p) => a + p.c, 0) / pts.length;
    const meanS = pts.reduce((a, p) => a + p.s, 0) / pts.length;
    return { ...m, pts, meanC, meanS, rho: spearman(pts.map((p) => p.c), pts.map((p) => p.s)) };
  });
  return (
    <figure className="bench-fig ab-vvm ab-cvs">
      <div className="ab-cvs-legend" aria-label="Models">
        {series.map((m) => (
          <span key={m.id} className="ab-cvs-key" style={{ ["--c" as string]: m.color }}>
            <i /><ModelLogo model={m.id} />{m.name}
            <small>mean ${m.meanC.toFixed(2)} · ρ {signed(m.rho)}</small>
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="ab-cvs-svg" role="img" aria-label="Cost per task against overall score for all four models, 192 tasks, cost on a log scale.">
        {XT.map((t) => (
          <g key={t} className="ab-vvm-grid">
            <line x1={x(t)} y1={y(YMIN)} x2={x(t)} y2={y(1)} />
            <text x={x(t)} y={y(YMIN) + 18} textAnchor="middle">${t < 1 ? t.toFixed(2) : t}</text>
          </g>
        ))}
        {YT.map((t) => (
          <g key={t} className="ab-vvm-grid">
            <line x1={x(XMIN)} y1={y(t)} x2={x(XMAX)} y2={y(t)} />
            <text x={x(XMIN) - 10} y={y(t) + 3} textAnchor="end">{t.toFixed(2)}</text>
          </g>
        ))}
        {series.map((m) => m.pts.map((p) => (
          <circle key={`${m.id}-${p.task}`} cx={x(Math.min(Math.max(p.c, XMIN), XMAX))} cy={y(Math.max(p.s, YMIN))} r="4" fill={m.color} fillOpacity=".62" stroke="#fff" strokeWidth=".8">
            <title>{`${m.name} · ${p.task}: $${p.c.toFixed(2)}, overall ${p.s.toFixed(3)}`}</title>
          </circle>
        )))}
        {series.map((m) => (
          <g key={`${m.id}-mean`} className="ab-cvs-mean" style={{ color: m.color }}>
            <circle cx={x(m.meanC)} cy={y(m.meanS)} r="9" fill="#fff" stroke="currentColor" strokeWidth="2.2" />
            <circle cx={x(m.meanC)} cy={y(m.meanS)} r="3" fill="currentColor" />
            <title>{`${m.name} mean: $${m.meanC.toFixed(2)}, overall ${m.meanS.toFixed(3)}`}</title>
          </g>
        ))}
        <text className="ab-vvm-axis" x={(x(XMIN) + x(XMAX)) / 2} y={H - 8} textAnchor="middle">cost per task (USD, log scale)</text>
        <text className="ab-vvm-axis" transform={`translate(14, ${y(0.5)}) rotate(-90)`} textAnchor="middle">overall score</text>
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
