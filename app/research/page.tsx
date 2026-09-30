import type { Metadata } from "next";
import { benchmarks } from "./benchmarks";
import ResearchBrowser from "./components/ResearchBrowser";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Physera builds commercially meaningful benchmarks for applied intelligence: agentic performance under the cost and reliability constraints that decide whether the work ships.",
  alternates: { canonical: "/research" },
};

export default function ResearchIndex() {
  return (
    <main className="bench flex w-full max-w-[1320px] flex-1 flex-col px-6 py-1 sm:px-10">
      <section className="rounded bg-white py-14 sm:py-20">
        <div className="mx-auto">
          <header className="research-index-head">
            <h1 className="font-serif text-[clamp(2.2rem,5.5vw,3.25rem)] leading-tight tracking-[-0.04em] text-[#0d0d0d]">
              Research
            </h1>
          </header>
          <ResearchBrowser benchmarks={benchmarks} />
        </div>
      </section>
    </main>
  );
}
