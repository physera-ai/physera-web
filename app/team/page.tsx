import type { Metadata } from "next";

const TEAM_MEMBERS = [
  {
    name: "Himanshu Dubey",
    href: "https://x.com/himanshustwts",
    handle: "@himanshustwts",
  },
  {
    name: "Soham Parekh",
    href: "https://x.com/realsohamparekh",
    handle: "@realsohamparekh",
  },
  {
    name: "Ashwarya Maratha",
    href: "https://x.com/AshwaryaMaratha",
    handle: "@AshwaryaMaratha",
  },
  {
    name: "Tim Cvetko",
    href: "https://x.com/cvetko_tim",
    handle: "@cvetko_tim",
  },
];

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the Physera team building the next generation of applied intelligence.",
  alternates: { canonical: "/team" },
};

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25h6.83l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function TeamPage() {
  return (
    <main className="flex w-full max-w-[1320px] flex-1 flex-col px-3 py-1 sm:px-4">
      <section className="rounded bg-[var(--bench-panel)] px-5 py-16 sm:px-16 sm:py-24">
        <div className="mx-auto flex max-w-[620px] flex-col gap-8">
          <div>
            <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] leading-tight tracking-[-0.04em] text-[var(--bench-ink)]">
              Team
            </h1>
            <p className="mt-3 text-[17px] leading-relaxed text-[var(--bench-ink-2)]">
              We’re a remote team based in India and the United States.
            </p>
          </div>

          <ul className="flex flex-col divide-y divide-[#ececec]">
            {TEAM_MEMBERS.map((member) => (
              <li key={member.href} className="py-4 first:pt-0 last:pb-0">
                <a
                  href={member.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="text-[20px] font-medium tracking-[-0.03em] text-[var(--bench-ink)] underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">
                    {member.name}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[16px] text-[var(--bench-ink-2)] transition-colors group-hover:text-[var(--bench-ink)]">
                    <XIcon />
                    {member.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
