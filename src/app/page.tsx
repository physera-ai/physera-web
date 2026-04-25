import { AnimatedLink } from "@/components/AnimatedLink";
import { Logo } from "@/components/Logo";
import Link from "next/link";

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.942v5.664H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.371 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.114 20.452H3.559V9h3.555v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[1040px] flex-col px-6 md:justify-center md:px-10">
      <div className="flex flex-col md:flex-row md:items-stretch">

        {/* ── Header / Sidebar ── */}
        <aside className="flex shrink-0 items-center justify-between border-b border-rule/70 py-6 md:w-[170px] md:flex-col md:items-start md:justify-between md:border-b-0 md:border-r md:py-12">
          <Link href="/" className="inline-block">
            <Logo />
          </Link>

          {/* nav: hidden on mobile */}
          <nav className="hidden flex-col gap-2 font-display text-lg font-medium leading-none tracking-tight text-muted md:flex">
            <Link className="transition-colors duration-300 ease-out hover:text-ink" href="#research">
              Research
            </Link>
            <Link className="transition-colors duration-300 ease-out hover:text-ink" href="#about">
              About
            </Link>
            <Link className="transition-colors duration-300 ease-out hover:text-ink" href="mailto:hello@physera.ai">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              aria-label="Physera on X"
              className="text-muted transition-colors duration-300 ease-out hover:text-ink"
              href="https://x.com/PhyseraAI"
              rel="noopener noreferrer"
              target="_blank"
            >
              <XIcon />
            </a>
            <a
              aria-label="Physera on LinkedIn"
              className="text-muted transition-colors duration-300 ease-out hover:text-ink"
              href="https://www.linkedin.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedInIcon />
            </a>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex flex-1 py-12 md:py-0 md:pl-20 lg:pl-24">
          <section id="research" className="w-full max-w-[620px]">
            <h1 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl">
              We&apos;re shaping simulation as infrastructure for intelligence.
            </h1>

            <div id="about" className="mt-6 space-y-4 text-[15px] leading-7 text-ink/80 md:mt-8 md:max-w-lg md:text-base">
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

            <div className="mt-10 flex flex-col gap-2 text-[15px] leading-7 md:mt-12 md:flex-row md:items-center md:gap-2 md:text-base">
              <p className="text-muted">Building specialized AI?</p>
              <AnimatedLink href="mailto:hello@physera.ai" text="hello@physera.ai" />
            </div>
          </section>
        </main>

      </div>
    </div>
  );
}
