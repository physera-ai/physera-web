"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Benchmark } from "../benchmarks";
import { ORG_COLOR } from "../cyberbench/data";

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
  tags,
}: {
  benchmarks: Benchmark[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return benchmarks.filter((b) => {
      const tagOk = !active || b.tags.includes(active);
      const textOk =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.blurb.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q)) ||
        b.category.toLowerCase().includes(q);
      return tagOk && textOk;
    });
  }, [benchmarks, query, active]);

  return (
    <div className="research-browser">
      <div className="research-controls">
        <div className="research-search">
          <svg viewBox="0 0 16 16" aria-hidden="true" className="research-search-icon">
            <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search benchmarks"
            aria-label="Search benchmarks"
          />
        </div>
        <div className="research-tags" role="group" aria-label="Filter by tag">
          <button
            type="button"
            aria-pressed={active === null}
            className={`research-chip ${active === null ? "is-on" : ""}`}
            onClick={() => setActive(null)}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={active === t}
              className={`research-chip ${active === t ? "is-on" : ""}`}
              onClick={() => setActive((cur) => (cur === t ? null : t))}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <ol className="research-list">
        {filtered.map((b, i) => {
          const inner = (
            <>
              <div className="research-row-index">
                <span className="research-num">{String(i + 1).padStart(2, "0")}</span>
                <Motif points={b.spark} org={b.topModel.org} />
              </div>

              <div className="research-row-main">
                <div className="research-row-head">
                  <span className="research-eyebrow">
                    {b.category} · {b.access}
                  </span>
                  {b.live ? (
                    <span className="research-status is-live">Live</span>
                  ) : (
                    <span className="research-status">Soon</span>
                  )}
                </div>
                <h3 className="research-title font-serif">{b.name}</h3>
                <p className="research-blurb">{b.blurb}</p>
                <div className="research-stats">
                  {b.stats.map((s) => (
                    <span key={s.label} className="research-stat">
                      <b>{s.value}</b> {s.label}
                    </span>
                  ))}
                </div>
                {b.live && <span className="research-cta">View benchmark →</span>}
              </div>

              <div className="research-row-tags">
                {b.tags.map((t) => (
                  <span key={t} className="research-tag">
                    {t}
                  </span>
                ))}
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

        {filtered.length === 0 && (
          <li className="research-empty">
            No benchmarks match that filter yet.{" "}
            <a href="mailto:hello@physera.ai">Request a domain →</a>
          </li>
        )}
      </ol>
    </div>
  );
}
