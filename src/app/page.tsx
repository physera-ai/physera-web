import { displaySerif } from "./fonts";
import { Logo } from "@/components/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[1120px] flex-col px-6 md:flex-row md:px-10 lg:px-14">
      <aside className="flex shrink-0 items-center justify-between border-rule/70 py-8 md:h-svh md:w-[210px] md:flex-col md:items-start md:border-r md:py-24">
        <div className="flex items-center gap-10 md:flex-col md:items-start">
          <Link href="/" className="inline-block">
            <Logo />
          </Link>

          <nav className="hidden flex-col gap-2 text-[13px] leading-5 text-muted md:flex">
            <Link className="text-ink transition-opacity hover:opacity-60" href="/">
              Work
            </Link>
            <Link className="transition-opacity hover:opacity-60" href="mailto:hello@physera.ai">
              Contact
            </Link>
          </nav>
        </div>

        <p className="hidden text-[12px] text-muted md:block">© 2026</p>
      </aside>

      <main className="flex flex-1 items-center py-14 md:py-24 md:pl-20 lg:pl-28">
        <section className="w-full max-w-[620px]">
          <h1 className={`${displaySerif.className} max-w-[500px] text-[clamp(2rem,3.8vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink`}>
            Simulation as infrastructure for intelligence.
          </h1>

          <div className="mt-8 max-w-[500px] space-y-4 text-[15px] leading-6 text-ink/80">
            <p>
              Specialized AI doesn&apos;t become capable in the abstract. It becomes
              capable inside environments — ones with dynamics, feedback, and
              consequence.
            </p>
            <p>
              Physera is the operating layer between models and the real world.
              We build trainable worlds: configurable, high-fidelity, designed
              for the systems intelligence will eventually have to navigate.
            </p>
            <p>Not datasets. Not benchmarks. Worlds.</p>
          </div>

          <div className="mt-12 flex flex-col gap-3 text-[15px] leading-6 sm:flex-row sm:items-center sm:gap-2">
            <p className="text-muted">Physera is in active development —</p>
            <a
              className="w-fit border-b border-ink pb-0.5 text-ink transition-opacity hover:opacity-60"
              href="mailto:hello@physera.ai"
            >
              hello@physera.ai
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
