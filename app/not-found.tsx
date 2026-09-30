import type { Metadata } from "next";
import PillLink from "./components/PillLink";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <main className="flex w-full max-w-[1320px] flex-1 flex-col px-3 py-1 sm:px-4">
      <article className="flex flex-1 items-center justify-center rounded bg-white px-5 py-24 sm:px-16 sm:py-32">
        <div className="mx-auto flex max-w-[560px] flex-col items-center gap-6 text-center">
          <p className="font-serif text-[clamp(3.5rem,9vw,5.5rem)] leading-none tracking-[-0.04em] text-[#0d0d0d]">
            404
          </p>

          <h1 className="font-serif text-[clamp(1.6rem,4vw,2.25rem)] leading-tight tracking-[-0.03em] text-[#0d0d0d]">
            This page doesn&apos;t exist
          </h1>

          <p className="max-w-[440px] text-[18px] leading-relaxed text-[#656565]">
            The page you&apos;re looking for may have been moved or never
            existed. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <PillLink href="/" variant="primary">
              Back to home
            </PillLink>
            <PillLink href="/contact">Get in touch</PillLink>
          </div>
        </div>
      </article>
    </main>
  );
}
