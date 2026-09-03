import Link from "next/link";
import HomeBenchmarks from "./components/HomeBenchmarks";

const readout = [
  { k: "Benchmarks live", v: "02" },
  { k: "Systems measured", v: "12" },
  { k: "Scored dimensions", v: "38" },
  { k: "Public leaderboards", v: "02" },
];

const lines = [
  {
    n: "01",
    label: "Efficiency",
    title: "Measure the models nobody else prices.",
    body: "Commercially meaningful benchmarks and token-efficient architectures, scored under the cost and latency limits that decide whether the work ships. We report per model and per dollar.",
    foot: "Cyber · Voice · UI · Animation",
    href: "/research",
    cta: "Browse the benchmarks",
  },
  {
    n: "02",
    label: "Simulation",
    title: "Model the person, not the population.",
    body: "High-fidelity multi-agent systems that simulate human decision-making, built to be falsified against real behaviour and improved. A calibrated instrument, not a plausible story.",
    foot: "Multimodal · Multi-agent · Falsifiable",
    href: "/manifesto",
    cta: "Read the thesis",
  },
];

export default function Home() {
  return (
    <main className="bench flex w-full max-w-[1320px] flex-1 flex-col gap-2.5 px-3 py-1 sm:px-4">
      {/* Hero — split: thesis left, instrument readout right */}
      <section className="rounded bg-white px-5 pt-16 pb-6 sm:px-12 sm:pt-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="home-split">
            <div>
              <span className="bench-kicker">Physera · Applied research lab</span>
              <h1 className="home-lede font-serif">
                We build the instrument.
                <br />
                And we publish the <em>readings</em>.
              </h1>
              <div className="home-hero-cta">
                <Link href="/research" className="bench-btn bench-btn-primary">
                  See the Research
                </Link>
                <Link href="/manifesto" className="bench-btn bench-btn-ghost">
                  Read the Manifesto
                </Link>
                <Link href="/contact" className="bench-mono-label bench-link home-hero-link">
                  Work with us →
                </Link>
              </div>
            </div>
            <div className="home-readout" aria-label="Lab readout">
              <div className="home-readout-head">
                <span className="bench-mono-label">Readout</span>
                <span className="home-readout-live">● live</span>
              </div>
              <dl>
                {readout.map((r) => (
                  <div key={r.k}>
                    <dt>{r.k}</dt>
                    <dd>{r.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="home-readout-note">
                Applied research on model efficiency and behavioural simulation, sold to the labs that
                train the frontier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calibration axis */}
      <section className="rounded bg-white px-5 py-2 sm:px-12">
        <div className="mx-auto max-w-[1180px]">
          <div className="home-axis">
            <span className="home-axis-end">Model efficiency</span>
            <div className="home-axis-track" aria-hidden="true">
              {Array.from({ length: 41 }).map((_, i) => (
                <span key={i} className={i % 10 === 0 ? "tick major" : "tick"} />
              ))}
              <span className="home-axis-dot" />
            </div>
            <span className="home-axis-end right">Behavioral simulation</span>
          </div>
        </div>
      </section>

      {/* Two lines of work */}
      <section className="rounded bg-white px-5 py-12 sm:px-12 sm:py-16">
        <div className="mx-auto max-w-[1180px]">
          <span className="bench-kicker">Two lines of work</span>
          <div className="home-work">
            {lines.map((l) => (
              <article key={l.n} className="home-work-panel">
                <div className="home-work-top">
                  <span className="research-num">{l.n}</span>
                  <span className="bench-mono-label">{l.label}</span>
                </div>
                <h2 className="home-work-title font-serif">{l.title}</h2>
                <p className="home-work-body">{l.body}</p>
                <div className="home-work-foot-row">
                  <span className="home-work-foot bench-mono-label">{l.foot}</span>
                  <Link href={l.href} className="home-work-cta bench-mono-label">
                    {l.cta} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Research track record */}
      <section className="rounded bg-white px-5 py-12 sm:px-12 sm:py-16">
        <div className="mx-auto max-w-[1180px]">
          <div className="home-strip-head">
            <span className="bench-kicker">Research track record</span>
            <Link href="/research" className="bench-mono-label bench-link">
              All benchmarks →
            </Link>
          </div>
          <HomeBenchmarks />
        </div>
      </section>

      {/* Manifesto quote band */}
      <section className="rounded bg-white px-5 py-16 sm:px-12 sm:py-24">
        <div className="mx-auto max-w-[980px]">
          <blockquote className="home-quote">
            <p className="font-serif">
              A learned distribution becomes a scientific instrument the moment its boundaries are mapped
              — where it agrees with real humans, where it diverges, and by how much.
            </p>
            <footer>
              <Link href="/manifesto" className="bench-mono-label bench-link">
                From the Manifesto →
              </Link>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Close */}
      <section className="rounded bg-white px-5 py-14 sm:px-12 sm:py-20">
        <div className="mx-auto max-w-[860px]">
          <div className="home-close-grid">
            <p className="home-close font-serif">
              A four-person team of applied researchers, funded by the work.
            </p>
            <div className="home-close-cta">
              <Link href="/manifesto" className="bench-btn bench-btn-dark">
                Read the Manifesto
              </Link>
              <Link href="/contact" className="bench-btn bench-btn-ghost">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
