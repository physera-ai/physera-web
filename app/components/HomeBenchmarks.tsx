import Link from "next/link";
import { benchmarks } from "../research/benchmarks";
import { ORG_COLOR } from "../research/cyberbench/data";

export default function HomeBenchmarks() {
  const live = benchmarks.filter((b) => b.live);
  return (
    <div className="home-bench-list">
      {live.map((b, i) => (
        <Link key={b.slug} href={`/research/${b.slug}`} className="home-bench-row">
          <span className="research-num">{String(i + 1).padStart(2, "0")}</span>
          <div className="home-bench-main">
            <span className="research-eyebrow">
              {b.category} · {b.access}
            </span>
            <h3 className="font-serif home-bench-title">{b.name}</h3>
            <p className="home-bench-blurb">{b.blurb}</p>
          </div>
          <div className="home-bench-meta">
            {b.stats.slice(0, 3).map((s) => (
              <span key={s.label}>
                <b>{s.value}</b> {s.label}
              </span>
            ))}
            <span className="home-bench-top">
              <i className="bench-swatch" style={{ background: ORG_COLOR[b.topModel.org] ?? "#888" }} />
              {b.topModel.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
