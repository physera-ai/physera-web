import Figure from "./Figure";

const W = 920;

function gauss(x: number, mu: number, sigma: number) {
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}

function path(xs: number[], ys: number[], sx: (v: number) => number, sy: (v: number) => number) {
  return xs.map((x, i) => `${i === 0 ? "M" : "L"}${sx(x).toFixed(1)},${sy(ys[i]).toFixed(1)}`).join(" ");
}

function range(a: number, b: number, n: number) {
  return Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1));
}

export function VarianceCollapse() {
  const H = 320;
  const PAD = { l: 36, r: 28, t: 30, b: 46 };
  const xs = range(-4, 4, 161);
  const real = xs.map(
    (x) => 0.5 * gauss(x, 0, 1.5) + 0.22 * gauss(x, 2.7, 0.55) + 0.18 * gauss(x, -2.5, 0.6) + 0.1 * gauss(x, 0.8, 0.35),
  );
  const sim = xs.map((x) => gauss(x, 0.25, 0.42));
  const ymax = Math.max(...sim) * 1.08;
  const sx = (v: number) => PAD.l + ((v + 4) / 8) * (W - PAD.l - PAD.r);
  const sy = (v: number) => PAD.t + (1 - v / ymax) * (H - PAD.t - PAD.b);
  const base = sy(0);
  const tail = 2.1;

  return (
    <Figure
      title="Variance collapse"
      note="Illustrative densities"
      caption={
        <>
          <span className="bench-legend-item">
            <i style={{ background: "var(--bench-ink)" }} />
            Real population
          </span>
          <span className="bench-legend-item">
            <i style={{ background: "var(--bench-bad-ink)" }} />
            Simulated population
          </span>
          <span className="bench-legend-item">
            <i style={{ background: "var(--bench-good-fill)" }} />
            Tails, where the interesting decisions live
          </span>
        </>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="A wide, heavy-tailed real population against a narrow simulated one">
        <rect x={sx(-4)} y={PAD.t} width={sx(-tail) - sx(-4)} height={base - PAD.t} fill="var(--bench-good-fill)" opacity="0.55" />
        <rect x={sx(tail)} y={PAD.t} width={sx(4) - sx(tail)} height={base - PAD.t} fill="var(--bench-good-fill)" opacity="0.55" />
        <text x={sx(-4) + 8} y={PAD.t + 14} className="bench-svg-mono" fill="var(--bench-good-ink)">TAIL</text>
        <text x={sx(4) - 8} y={PAD.t + 14} textAnchor="end" className="bench-svg-mono" fill="var(--bench-good-ink)">TAIL</text>

        <path d={`${path(xs, sim, sx, sy)} L${sx(4)},${base} L${sx(-4)},${base} Z`} fill="var(--bench-bad-fill)" opacity="0.7" />
        <path d={path(xs, sim, sx, sy)} fill="none" stroke="var(--bench-bad-ink)" strokeWidth="2" strokeDasharray="6 4" />
        <path d={path(xs, real, sx, sy)} fill="none" stroke="var(--bench-ink)" strokeWidth="2" />

        <line x1={sx(-4)} x2={sx(4)} y1={base} y2={base} stroke="var(--bench-rule-2)" />
        <text x={sx(-4)} y={base + 18} className="bench-svg-mono" fill="var(--bench-ink-2)">CONTRARIAN</text>
        <text x={sx(0)} y={base + 18} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">MODERATE</text>
        <text x={sx(4)} y={base + 18} textAnchor="end" className="bench-svg-mono" fill="var(--bench-ink-2)">CONTRARIAN</text>
        <text x={(sx(-4) + sx(4)) / 2} y={H - 10} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-3)">
          What a thousand people decide
        </text>

        <text x={sx(0.25) + 14} y={sy(Math.max(...sim)) + 4} className="bench-svg-mono" fill="var(--bench-bad-ink)">
          SIMULATED · a thousand variations on one person
        </text>
        <text x={sx(2.7)} y={sy(real[xs.findIndex((x) => x >= 2.7)]) - 12} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink)">
          REAL · heavy-tailed, contradictory
        </text>
      </svg>
    </Figure>
  );
}

export function SufficiencyThreshold() {
  const H = 320;
  const PAD = { l: 44, r: 40, t: 30, b: 46 };
  const xs = range(80, 100, 81);
  const bounded = xs.map((x) => 1 - Math.exp(-(x - 80) / 4.2));
  const unbounded = xs.map((x) => 0.05 + ((x - 80) / 20) * 1.15);
  const ymax = 1.3;
  const sx = (v: number) => PAD.l + ((v - 80) / 20) * (W - PAD.l - PAD.r);
  const sy = (v: number) => PAD.t + (1 - v / ymax) * (H - PAD.t - PAD.b);
  const base = sy(0);
  const thr = 99;

  return (
    <Figure
      title="The sufficiency threshold"
      note="Bet 04"
      caption={
        <>
          <span className="bench-legend-item">
            <i style={{ background: "var(--bench-ink-2)" }} />
            Bounded domain · document parsing
          </span>
          <span className="bench-legend-item">
            <i style={{ background: "var(--bench-good-ink)" }} />
            Unbounded domain · finance, insurance, risk
          </span>
        </>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Value plateaus for bounded domains and keeps rising for unbounded ones">
        <rect x={sx(thr)} y={PAD.t} width={sx(100) - sx(thr)} height={base - PAD.t} fill="var(--bench-bad-fill)" opacity="0.45" />
        <line x1={sx(thr)} x2={sx(thr)} y1={PAD.t} y2={base} stroke="var(--bench-ink-3)" strokeDasharray="2 3" />
        <text x={sx(thr) - 8} y={PAD.t + 14} textAnchor="end" className="bench-svg-mono" fill="var(--bench-bad-ink)">
          SUFFICIENCY THRESHOLD · THE END OF THE MARKET
        </text>

        <path d={path(xs, bounded, sx, sy)} fill="none" stroke="var(--bench-ink-2)" strokeWidth="2" strokeDasharray="6 4" />
        <path d={path(xs, unbounded, sx, sy)} fill="none" stroke="var(--bench-good-ink)" strokeWidth="2" />

        <line x1={sx(80)} x2={sx(100)} y1={base} y2={base} stroke="var(--bench-rule-2)" />
        <line x1={sx(80)} x2={sx(80)} y1={base} y2={PAD.t} stroke="var(--bench-rule-2)" />
        {[80, 85, 90, 95, 100].map((t) => (
          <text key={t} x={sx(t)} y={base + 18} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">
            {t}%
          </text>
        ))}
        <text x={(sx(80) + sx(100)) / 2} y={H - 10} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-3)">
          Model accuracy
        </text>
        <text transform={`translate(14 ${(base + PAD.t) / 2}) rotate(-90)`} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-3)">
          What buyers pay for one more point
        </text>

        <text x={sx(93)} y={sy(bounded[xs.findIndex((x) => x >= 93)]) - 12} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">
          BOUNDED · GOOD ENOUGH, THEN COMMODITIZED
        </text>
        <text x={sx(97.5)} y={sy(unbounded[xs.findIndex((x) => x >= 97.5)]) - 12} textAnchor="end" className="bench-svg-mono" fill="var(--bench-good-ink)">
          UNBOUNDED · EACH POINT IS WORTH MONEY
        </text>
      </svg>
    </Figure>
  );
}

export function CompoundingMoat() {
  const H = 300;
  const PAD = { l: 44, r: 40, t: 30, b: 46 };
  const xs = range(0, 8, 81);
  const loop = xs.map((x) => 0.06 + 0.012 * x * x * 1.05);
  const access = xs.map((x) => 0.22 + 0.015 * Math.min(x, 2));
  const ymax = 1.0;
  const sx = (v: number) => PAD.l + (v / 8) * (W - PAD.l - PAD.r);
  const sy = (v: number) => PAD.t + (1 - v / ymax) * (H - PAD.t - PAD.b);
  const base = sy(0);
  const rounds = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Figure
      title="The advantage compounds with time"
      note="Data strategy"
      caption={
        <>
          <span className="bench-legend-item">
            <i style={{ background: "var(--bench-good-ink)" }} />
            Longitudinal data + calibration loop
          </span>
          <span className="bench-legend-item">
            <i style={{ background: "var(--bench-ink-2)" }} />
            Model access alone
          </span>
        </>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Advantage from calibrated longitudinal data compounds; advantage from model access stays flat">
        {rounds.map((r) => (
          <line key={r} x1={sx(r)} x2={sx(r)} y1={base} y2={base - 6} stroke="var(--bench-rule-2)" />
        ))}
        <path d={path(xs, access, sx, sy)} fill="none" stroke="var(--bench-ink-2)" strokeWidth="2" strokeDasharray="6 4" />
        <path d={path(xs, loop, sx, sy)} fill="none" stroke="var(--bench-good-ink)" strokeWidth="2" />
        {rounds.map((r) => (
          <circle key={r} cx={sx(r)} cy={sy(loop[xs.findIndex((x) => x >= r)])} r="4" fill="var(--bench-panel)" stroke="var(--bench-good-ink)" strokeWidth="2" />
        ))}

        <line x1={sx(0)} x2={sx(8)} y1={base} y2={base} stroke="var(--bench-rule-2)" />
        <line x1={sx(0)} x2={sx(0)} y1={base} y2={PAD.t} stroke="var(--bench-rule-2)" />
        <text x={(sx(0) + sx(8)) / 2} y={H - 10} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-3)">
          Partnerships and calibration rounds
        </text>
        <text transform={`translate(14 ${(base + PAD.t) / 2}) rotate(-90)`} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-3)">
          Advantage over a competitor
        </text>

        <text x={sx(4)} y={sy(access[xs.findIndex((x) => x >= 4)]) - 10} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-2)">
          MODEL ACCESS · EVERYONE GETS THE SAME MODEL
        </text>
        <text x={sx(6.2)} y={sy(loop[xs.findIndex((x) => x >= 6.2)]) - 14} textAnchor="end" className="bench-svg-mono" fill="var(--bench-good-ink)">
          EACH ROUND: MORE GROUND TRUTH, CHEAPER AND MORE ACCURATE
        </text>
      </svg>
    </Figure>
  );
}
