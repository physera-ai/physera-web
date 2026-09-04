import Link from "next/link";
import BenchmarkRows from "./components/BenchmarkRows";
import PopulationField from "./components/PopulationField";

export default function Home() {
  return (
    <main className="hp">
      {/* Hero — centered over a dot-matrix graphic */}
      <section className="hp-hero">
        <div className="hp-field" aria-hidden="true">
          <PopulationField />
        </div>
        <div className="hp-hero-copy">
          <span className="hp-eyebrow">Physera · Applied research lab</span>
          <h1 className="hp-title font-serif">
            We simulate people.
            <br />
            We <span className="hp-em">measure</span> models.
          </h1>
          <p className="hp-sub">
            An applied research lab at the intersection of behavioural simulation and model efficiency,
            and the benchmarks that keep both honest.
          </p>
          <div className="hp-cta">
            <Link href="/research" className="bench-btn bench-btn-primary">
              See the Research
            </Link>
            <Link href="/manifesto" className="bench-btn bench-btn-ghost">
              Read the Manifesto
            </Link>
          </div>
        </div>
      </section>

      {/* Benchmarks — same rows as the Research index */}
      <section className="hp-research">
        <div className="hp-research-head">
          <span className="hp-eyebrow hp-eyebrow-sm">Research</span>
          <Link href="/research" className="bench-mono-label bench-link">
            All benchmarks →
          </Link>
        </div>
        <BenchmarkRows />
      </section>
    </main>
  );
}
