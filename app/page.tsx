import Link from "next/link";
import CardsSection from "./components/CardsSection";
import HeroVoxels from "./components/HeroVoxels";
import PillLink from "./components/PillLink";

export default function Home() {
  return (
    <main className="flex w-full max-w-[1320px] flex-1 flex-col gap-2.5 px-3 py-1 sm:px-4">
      <section className="flex flex-col items-center justify-center gap-6 overflow-hidden rounded bg-white px-5 pb-14 pt-0 text-center sm:px-6 sm:pb-16 sm:pt-4">
        <HeroVoxels />

        <h1 className="-mt-4 font-serif text-[clamp(2.2rem,5.5vw,3.25rem)] leading-tight tracking-[-0.04em] text-[#0d0d0d]">
          Rethinking Applied Intelligence
        </h1>

        <p className="max-w-[556px] text-[18px] font-[450] leading-normal tracking-[-0.36px] text-[#656565]">
          Physera is a research and product lab rethinking applied intelligence.
          We work at the intersection of{" "}
          <span className="rounded-md bg-[#f4f4f4] px-1 text-[#111]">
            model efficiency
          </span>{" "}
          and{" "}
          <span className="rounded-md bg-[#f4f4f4] px-1 text-[#111]">
            behavioural simulations
          </span>{" "}
          while building environments that are{" "}
          <span className="rounded-md bg-[#f4f4f4] px-1 text-[#111]">
            multimodal
          </span>
          .
        </p>

        <div className="flex gap-3 pt-4">
          <PillLink href="/thesis">Read Thesis</PillLink>
          <PillLink href="/contact" variant="primary">
            Get in touch
          </PillLink>
        </div>
      </section>

      <CardsSection />

      <section className="rounded bg-white px-6 py-14 text-center sm:px-10 sm:py-16">
        <p className="mx-auto max-w-[680px] text-[17px] font-[450] leading-relaxed tracking-[-0.02em] text-[#656565] sm:text-[20px]">
          We’re a remote{" "}
          <Link
            href="/team"
            className="rounded-md bg-[#f4f4f4] px-1 text-[#111] underline underline-offset-4 transition-colors hover:bg-[#e8e8e8]"
          >
            team
          </Link>{" "}
          based in India and the United States. We partner with frontier labs
          and enterprises to build the next generation of applied
          intelligence.
        </p>
      </section>
    </main>
  );
}
