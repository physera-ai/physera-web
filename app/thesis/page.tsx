import type { Metadata } from "next";
import PillLink from "../components/PillLink";

export const metadata: Metadata = {
  title: "Thesis",
  description:
    "Physera is rethinking each layer of the AI stack from first principles: model efficiency and faithful behavioural simulation.",
  alternates: { canonical: "/thesis" },
};

export default function ThesisPage() {
  return (
    <main className="flex w-full max-w-[1320px] flex-1 flex-col px-3 py-1 sm:px-4">
      <article className="rounded bg-white px-5 py-16 sm:px-16 sm:py-24">
        <div className="mx-auto flex max-w-[720px] flex-col gap-6">
          <h1 className="font-serif text-[clamp(2rem,4.4vw,2.9rem)] leading-[1.08] tracking-[-0.04em] text-[#0d0d0d]">
            Rethinking Applied Intelligence
          </h1>

          <div className="mt-2 flex flex-col gap-5 text-[18px] leading-relaxed text-[#3a3a3a]">
            <p>
              Physera is a research and product lab rethinking applied
              intelligence. We work at the intersection of model efficiency and
              behavioural simulations while building environments that are
              multimodal.
            </p>
            <p>
              We have made extraordinary progress in understanding model
              internals. However, we are yet to translate that understanding
              into predictable efficiency gains, measurable commercial returns,
              or faithful modelling of human behaviour at scale.
            </p>
            <p className="text-[#0d0d0d]">
              We are rethinking each layer of the AI stack from first
              principles, along two lines of work.
            </p>

            <ul className="flex list-disc flex-col gap-3 pl-5 marker:text-black/30">
              <li className="pl-1">
                How models are deployed under hard cost and latency constraints,
                establishing a new class of commercially meaningful benchmarks
                and token-efficient architectures.
              </li>
              <li className="pl-1">
                How we simulate human decision-making, building high-fidelity,
                multimodal, multi-agent systems that are falsifiable and
                improvable.
              </li>
            </ul>

            <p>
              We are a team of applied researchers and engineers who believe
              that the most important problems in AI today are not about
              capability but making that capability reliably useful across
              multimodality. We are heads down building systems that perceive,
              reason, and decide as humans do, under the constraints humans face.
            </p>

            <p>
              Reach out at{" "}
              <a
                href="mailto:hello@physera.ai"
                className="text-[#0d0d0d] underline underline-offset-4"
              >
                hello@physera.ai
              </a>{" "}
              and follow us on{" "}
              <a
                href="https://x.com/PhyseraAI"
                target="_blank"
                rel="noreferrer"
                className="text-[#0d0d0d] underline underline-offset-4"
              >
                @PhyseraAI
              </a>{" "}
              for updates.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <PillLink href="/contact" variant="primary">
              Get in touch
            </PillLink>
            <PillLink href="/careers">Careers</PillLink>
          </div>
        </div>
      </article>
    </main>
  );
}
