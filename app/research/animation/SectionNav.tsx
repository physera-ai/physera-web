"use client";

import { useEffect, useState } from "react";

export type Section = { id: string; label: string; sub?: boolean };

function numbered(sections: Section[]): (Section & { num: string })[] {
  let major = 0;
  let minor = 0;
  return sections.map((s) => {
    if (s.sub) {
      minor += 1;
      return { ...s, num: `${major}.${minor}` };
    }
    major += 1;
    minor = 0;
    return { ...s, num: String(major) };
  });
}

export default function SectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -64% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="bench-toc ab-toc" aria-label="On this page">
      <span className="bench-mono-label bench-toc-head">Contents</span>
      <ul>
        {numbered(sections).map((s) => (
          <li key={s.id} className={s.sub ? "sub" : ""}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={active === s.id ? "is-active" : ""}
            >
              <span className="ab-toc-num">{s.num}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
