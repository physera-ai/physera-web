import type { Metadata } from "next";
import { ALL_TAGS, benchmarks } from "./benchmarks";
import ResearchBrowser from "./components/ResearchBrowser";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Physera builds commercially meaningful benchmarks for applied intelligence: agentic performance under the cost and reliability constraints that decide whether the work ships.",
  alternates: { canonical: "/research" },
};

export default function ResearchIndex() {
  return (
    <main className="bench flex w-full max-w-[1320px] flex-1 flex-col px-3 py-1 sm:px-4">
      <section className="rounded bg-white px-5 py-14 sm:px-14 sm:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="research-hero">
            <div>
              <span className="research-eyebrow research-eyebrow-lg">Physera Research</span>
              <h1 className="mt-4 font-serif text-[clamp(2.4rem,5.5vw,3.7rem)] leading-[1.02] tracking-[-0.04em] text-[#0d0d0d]">
                Benchmarks for
                <br />
                work that ships.
              </h1>
            </div>
            <p className="research-hero-note">
              Frontier models are capable enough. What is missing is measurement. We build verifiable task
              environments, score them deterministically, and report per model and per dollar.
            </p>
          </div>

          <ResearchBrowser benchmarks={benchmarks} tags={ALL_TAGS} />
        </div>
      </section>
    </main>
  );
}
