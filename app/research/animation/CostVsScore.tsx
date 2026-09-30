import results from "./data.json";
import ModelLogo from "./ModelLogo";

const MODELS = [
  { id: "gpt-6-astra", name: "GPT-6 Astra", color: "#0f9d6e" },
  { id: "claude-fable-5-1", name: "Claude Fable 5.1", color: "#5170c9" },
  { id: "claude-opus-5-5", name: "Claude Opus 5.5", color: "#ad7545" },
  { id: "gpt-6-sol", name: "GPT-6 Sol", color: "#9b71a3" },
] as const;

const SMIN = 0.4, SMAX = 0.65;
const pos = (v: number) => `${((v - SMIN) / (SMAX - SMIN)) * 100}%`;
const mean = (v: number[]) => v.reduce((a, b) => a + b, 0) / v.length;

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
  const ma = mean(ra), mb = mean(rb);
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) { num += (ra[i] - ma) * (rb[i] - mb); da += (ra[i] - ma) ** 2; db += (rb[i] - mb) ** 2; }
  return num / Math.sqrt(da * db);
}
const signed = (v: number, digits = 3) => `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(digits)}`;

export default function CostVsScore({ caption }: { caption: string }) {
  const rows = MODELS.map((m) => {
    const pts = results.tasks.map((t) => ({ c: t.scores[m.id].cost, s: t.scores[m.id].score })).sort((a, b) => a.c - b.c);
    const half = pts.length / 2;
    const cheap = pts.slice(0, half), pricey = pts.slice(half);
    const cheapCost = mean(cheap.map((p) => p.c)), priceyCost = mean(pricey.map((p) => p.c));
    const cheapScore = mean(cheap.map((p) => p.s)), priceyScore = mean(pricey.map((p) => p.s));
    return { ...m, cheapCost, priceyCost, cheapScore, priceyScore, delta: priceyScore - cheapScore, ratio: priceyCost / cheapCost, rho: spearman(pts.map((p) => p.c), pts.map((p) => p.s)) };
  });
  const maxAbs = Math.max(...rows.map((r) => Math.abs(r.delta)));
  const minRatio = Math.min(...rows.map((r) => r.ratio)), maxRatio = Math.max(...rows.map((r) => r.ratio));
  return (
    <figure className="bench-fig ab-cvs2">
      <div className="ab-cvs2-head">
        <span className="ab-cvs2-kicker">Same model, cheap tasks vs expensive tasks</span>
        <h4>Spending {minRatio.toFixed(1)}–{maxRatio.toFixed(1)}× more on a task moved the score by at most {maxAbs.toFixed(2)}, and not in one direction.</h4>
      </div>
      <div className="ab-cvs2-grid">
        <div className="ab-cvs2-row ab-cvs2-headrow">
          <span>Model</span>
          <span className="ab-cvs2-axis" aria-hidden="true">
            {[0.4, 0.45, 0.5, 0.55, 0.6, 0.65].map((t) => <em key={t} style={{ left: pos(t) }}>{t.toFixed(2)}</em>)}
          </span>
          <span className="n">Δ score</span>
        </div>
        {rows.map((r) => (
          <div key={r.id} className="ab-cvs2-row" style={{ ["--c" as string]: r.color }}>
            <span className="ab-cvs2-model">
              <b><ModelLogo model={r.id} />{r.name}</b>
              <small>${r.cheapCost.toFixed(2)} → ${r.priceyCost.toFixed(2)} per task · ρ {signed(r.rho, 2)}</small>
            </span>
            <span className="ab-cvs2-track">
              <i className="ab-cvs2-line" style={{ left: pos(Math.min(r.cheapScore, r.priceyScore)), width: `calc(${pos(Math.max(r.cheapScore, r.priceyScore))} - ${pos(Math.min(r.cheapScore, r.priceyScore))})` }} />
              <i className="ab-cvs2-dot is-cheap" style={{ left: pos(r.cheapScore) }} title={`Cheaper half: mean $${r.cheapCost.toFixed(2)}, score ${r.cheapScore.toFixed(3)}`} />
              <i className="ab-cvs2-dot is-pricey" style={{ left: pos(r.priceyScore) }} title={`Pricier half: mean $${r.priceyCost.toFixed(2)}, score ${r.priceyScore.toFixed(3)}`} />
            </span>
            <span className={`n ab-cvs2-delta${r.delta >= 0 ? " is-up" : " is-down"}`}>{signed(r.delta)}</span>
          </div>
        ))}
      </div>
      <div className="ab-cvs2-legend"><span><i className="ab-cvs2-dot is-cheap" />cheaper half of the model&apos;s 48 tasks</span><span><i className="ab-cvs2-dot is-pricey" />pricier half</span><span>axis: mean overall score</span></div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
