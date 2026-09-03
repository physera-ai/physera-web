import Link from "next/link";
import HeroVoxels from "./components/HeroVoxels";
import HomeBenchmarks from "./components/HomeBenchmarks";
import PillLink from "./components/PillLink";

const capabilities = [
  {
    title: "RL environments",
    body: "Long-horizon, domain-specific environments that make hard tasks verifiable and trainable.",
  },
  {
    title: "Behavioral simulation",
    body: "Multi-agent systems that model human decision-making by pairing language models with predictive modelling.",
  },
  {
    title: "Commercial benchmarks",
    body: "A new class of taste-based benchmarks on hard work: cyber, voice, UI, and animation.",
  },
  {
    title: "Efficient architectures",
    body: "Token- and compute-efficient research built for deployment under real cost and latency limits.",
  },
];

export default function Home() {
  return (
    <main className="bench flex w-full max-w-[1320px] flex-1 flex-col gap-2.5 px-3 py-1 sm:px-4">
      <section className="home-hero rounded bg-white px-5 pb-14 pt-6 sm:px-6 sm:pb-16">
        <HeroVoxels />
        <span className="bench-kicker home-hero-kicker">Physera · Applied research lab</span>
        <h1 className="home-hero-title font-serif">
          Building the first <em>calibrated instrument</em> for human decision-making.
        </h1>
        <p className="home-hero-sub">
          We work where model efficiency meets faithful behavioural simulation, building multimodal
          environments and the benchmarks that prove they hold.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <PillLink href="/manifesto" variant="primary">
            Read the Manifesto
          </PillLink>
          <PillLink href="/research">See the Research</PillLink>
        </div>
      </section>

      <section className="rounded bg-white px-5 py-12 sm:px-12 sm:py-16">
        <div className="mx-auto max-w-[1120px]">
          <span className="bench-kicker">What we build</span>
          <div className="home-caps">
            {capabilities.map((c, i) => (
              <article key={c.title} className="home-cap">
                <span className="research-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="home-cap-title font-serif">{c.title}</h3>
                <p className="home-cap-body">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded bg-white px-5 py-12 sm:px-12 sm:py-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="home-strip-head">
            <span className="bench-kicker">Selected research</span>
            <Link href="/research" className="bench-mono-label bench-link">
              All benchmarks →
            </Link>
          </div>
          <HomeBenchmarks />
        </div>
      </section>

      <section className="rounded bg-white px-5 py-14 sm:px-12 sm:py-20">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="home-close font-serif">
            A four-person team of applied researchers, funded by the work — we build and sell verifiable
            task environments and human-fidelity data to top frontier labs.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <PillLink href="/manifesto">The thesis</PillLink>
            <PillLink href="/contact" variant="primary">
              Get in touch
            </PillLink>
          </div>
        </div>
      </section>
    </main>
  );
}
