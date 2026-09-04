import Link from "next/link";

const research = [
  { label: "CyberBench", href: "/research/cyberbench" },
  { label: "Voice Arena", href: "/research/voice-arena" },
  { label: "All benchmarks", href: "/research" },
];

const company = [
  { label: "Manifesto", href: "/manifesto" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const connect = [
  { label: "X / Twitter", href: "https://x.com/PhyseraAI", ext: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/physera-ai/", ext: true },
  { label: "GitHub", href: "https://github.com/physera-ai/", ext: true },
  { label: "hello@physera.ai", href: "mailto:hello@physera.ai", ext: true },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-cta">
          <div>
            <span className="site-footer-kicker">Work with us</span>
            <p className="site-footer-head">Let&apos;s measure what your models really do.</p>
          </div>
          <Link href="/contact" className="bench-btn bench-btn-onlight">
            Get in touch
          </Link>
        </div>

        <div className="site-footer-cols">
          <div className="site-footer-brand">
            <span className="site-footer-wordmark">Physera</span>
            <p>
              An applied research lab working on model efficiency and behavioural simulation, and the
              benchmarks that prove them.
            </p>
          </div>

          <div className="site-footer-col">
            <h4>Research</h4>
            <ul>
              {research.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer-col">
            <h4>Company</h4>
            <ul>
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer-col">
            <h4>Connect</h4>
            <ul>
              {connect.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target={l.ext ? "_blank" : undefined} rel={l.ext ? "noreferrer" : undefined}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer-bottom">
          <span>© {new Date().getFullYear()} Physera</span>
          <span>Rethinking applied intelligence · India &amp; United States</span>
        </div>
      </div>
    </footer>
  );
}
