import type { Metadata } from "next";
import PillLink from "../components/PillLink";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Physera is always looking for curious, high-agency people to help rethink applied intelligence. Write to us.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <main className="flex w-full max-w-[1320px] flex-1 flex-col px-3 py-1 sm:px-4">
      <article className="rounded bg-white px-5 py-16 sm:px-16 sm:py-24">
        <div className="mx-auto flex max-w-[720px] flex-col gap-6">
          <h1 className="font-serif text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05] tracking-[-0.04em] text-[#0d0d0d]">
            Come build with us
          </h1>

          <div className="mt-2 flex flex-col gap-5 text-[18px] leading-relaxed text-[#3a3a3a]">
            <p>
              We do not keep a long list of open roles. We hire for curiosity,
              taste, and the ability to take an ambiguous problem and ship
              something real.
            </p>
            <p>
              If this resonates, send us an email about yourself and the work
              you have done. Tell us what kinds of problems you want to spend
              your time on. We read every message.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <a
              href="mailto:hello@physera.ai?subject=Joining Physera"
              className="inline-flex h-8 items-center rounded-full bg-[#0d0d0d] px-3.5 text-[16px] font-medium tracking-[-0.32px] text-white transition-colors hover:bg-[#2a2a2a]"
            >
              Email us
            </a>
            <PillLink href="/thesis">Read the thesis</PillLink>
          </div>
        </div>
      </article>
    </main>
  );
}
