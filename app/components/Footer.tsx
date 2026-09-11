import Link from "next/link";

const groups = [
  {
    title: "Research",
    links: [
      { label: "CyberLatch", href: "/research/cyberlatch" },
      { label: "Voice Arena", href: "/research/voice-arena" },
      { label: "All benchmarks", href: "/research" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Manifesto", href: "/manifesto" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "X / Twitter", href: "https://x.com/PhyseraAI", ext: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/physera-ai/", ext: true },
      { label: "GitHub", href: "https://github.com/physera-ai/", ext: true },
      { label: "hello@physera.ai", href: "mailto:hello@physera.ai", ext: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <Link href="/" className="site-footer-wordmark">
              Physera
            </Link>
            <p>
              An applied research lab working on model efficiency and behavioural simulation, and the
              benchmarks that prove them.
            </p>
            <Link href="/contact" className="site-footer-cta">
              Measure what your models really do <span aria-hidden="true">→</span>
            </Link>
          </div>

          {groups.map((g) => (
            <div key={g.title} className="site-footer-col">
              <h4>{g.title}</h4>
              <ul>
                {g.links.map((l) =>
                  "ext" in l && l.ext ? (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="site-footer-bottom">
          <span>© {new Date().getFullYear()} Physera</span>
          <span>Rethinking applied intelligence · India &amp; United States</span>
        </div>
      </div>
    </footer>
  );
}
