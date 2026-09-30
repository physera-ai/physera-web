import Link from "next/link";
import BenchThumb from "./BenchThumb";
import type { Benchmark } from "../benchmarks";
import { ORG_COLOR } from "../cyberlatch/data";

function Motif({ points, org }: { points: [number, number][]; org: string }) {
  const c = ORG_COLOR[org] ?? "#1d3b2e";
  const W = 96;
  const H = 96;
  const pad = 12;
  const px = (x: number) => pad + x * (W - 2 * pad);
  const py = (y: number) => H - pad - y * (H - 2 * pad);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="research-motif" aria-hidden="true">
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={`h${g}`} x1={pad} x2={W - pad} y1={py(g)} y2={py(g)} className="research-motif-grid" />
      ))}
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={`v${g}`} x1={px(g)} x2={px(g)} y1={pad} y2={H - pad} className="research-motif-grid" />
      ))}
      <line x1={pad} x2={W - pad} y1={H - pad} y2={H - pad} className="research-motif-axis" />
      <line x1={pad} x2={pad} y1={pad} y2={H - pad} className="research-motif-axis" />
      {points.map(([x, y], i) => (
        <rect key={i} x={px(x) - 2.5} y={py(y) - 2.5} width="5" height="5" fill={c} />
      ))}
    </svg>
  );
}

export default function ResearchBrowser({
  benchmarks,
}: {
  benchmarks: Benchmark[];
}) {
  return (
    <div className="research-browser">
      <ol className="research-list">
        {benchmarks.map((b, i) => {
          const inner = (
            <>
              <div className="research-row-index">
                <span className="research-num">{String(i + 1).padStart(2, "0")}</span>
                {b.thumb ? <BenchThumb task={b.thumb.task} /> : <Motif points={b.spark} org={b.topModel.org} />}
              </div>

              <div className="research-row-main">
                <h3 className="font-serif text-[clamp(2.2rem,5.5vw,3.25rem)] leading-tight tracking-[-0.04em] text-[#0d0d0d]">
                  {b.name}
                </h3>
                <p className="max-w-[720px] text-[18px] font-[450] leading-normal tracking-[-0.36px] text-[#656565]">
                  {b.blurb}
                </p>
                <div className="research-stats">
                  {b.stats.map((s) => (
                    <span key={s.label} className="research-stat">
                      <b>{s.value}</b> {s.label}
                    </span>
                  ))}
                </div>
                {b.live && <span className="research-cta">View benchmark →</span>}
              </div>

            </>
          );
          return b.live ? (
            <li key={b.slug} className="research-row">
              <Link href={`/research/${b.slug}`} className="research-row-link" aria-label={`${b.name} benchmark`}>
                {inner}
              </Link>
            </li>
          ) : (
            <li key={b.slug} className="research-row is-soon">
              {inner}
            </li>
          );
        })}

      </ol>
    </div>
  );
}
