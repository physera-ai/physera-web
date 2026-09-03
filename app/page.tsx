import Link from "next/link";

const stats = [
  { v: "02", k: "Live benchmarks" },
  { v: "12", k: "Systems measured" },
  { v: "38", k: "Scored dimensions" },
  { v: "Open", k: "Public leaderboards" },
];

const work = [
  {
    href: "/research/cyberbench",
    name: "CyberBench",
    line: "Coding agents patch vulnerable services, scored per model and per dollar.",
  },
  {
    href: "/research/voice-arena",
    name: "Voice Arena",
    line: "Conversational voice systems scored on empathy, quality, and latency.",
  },
];

function Corners() {
  return (
    <>
      <span className="hp-x hp-x-tl" aria-hidden="true" />
      <span className="hp-x hp-x-tr" aria-hidden="true" />
      <span className="hp-x hp-x-bl" aria-hidden="true" />
      <span className="hp-x hp-x-br" aria-hidden="true" />
    </>
  );
}

export default function Home() {
  return (
    <main className="hp">
      {/* Hero — centered, clean */}
      <section className="hp-hero">
        <span className="hp-eyebrow">Applied research lab · India &amp; United States</span>
        <h1 className="hp-title font-serif">
          The first <span className="hp-bracket">[calibrated]</span> instrument for human
          decision-making.
        </h1>
        <p className="hp-sub">
          Physera works where model efficiency meets faithful behavioural simulation, and publishes the
          benchmarks that prove it.
        </p>
        <div className="hp-cta">
          <Link href="/manifesto" className="bench-btn bench-btn-dark">
            Read the Manifesto
          </Link>
          <Link href="/research" className="bench-btn bench-btn-ghost">
            See the Research
          </Link>
        </div>
      </section>

      {/* Stat band with crosshair corners */}
      <section className="hp-stats-wrap">
        <div className="hp-stats">
          <Corners />
          {stats.map((s) => (
            <div key={s.k} className="hp-stat">
              <span className="hp-stat-v font-serif">{s.v}</span>
              <span className="hp-stat-k">{s.k}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Research — minimal */}
      <section className="hp-research">
        <div className="hp-research-head">
          <span className="hp-eyebrow hp-eyebrow-sm">Research</span>
          <Link href="/research" className="bench-mono-label bench-link">
            All benchmarks →
          </Link>
        </div>
        <ul className="hp-work">
          {work.map((w) => (
            <li key={w.href}>
              <Link href={w.href} className="hp-work-row">
                <span className="hp-work-name font-serif">{w.name}</span>
                <span className="hp-work-line">{w.line}</span>
                <span className="hp-work-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
