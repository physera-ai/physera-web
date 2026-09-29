"use client";

import { useEffect, useState } from "react";

export type Section = { id: string; label: string; sub?: boolean };
type Group = Section & { num: string; subs: (Section & { num: string })[] };

function groups(sections: Section[]): Group[] {
  const out: Group[] = [];
  for (const s of sections) {
    if (s.sub && out.length) {
      const parent = out[out.length - 1];
      parent.subs.push({ ...s, num: `${parent.num}.${parent.subs.length + 1}` });
    } else {
      out.push({ ...s, num: String(out.length + 1), subs: [] });
    }
  }
  return out;
}

export default function SectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const tree = groups(sections);
  const openGroup = tree.find((g) => g.id === active || g.subs.some((s) => s.id === active))?.id;

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

  const link = (s: Section & { num: string }, cls = "") => (
    <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined} className={`${cls}${active === s.id ? " is-active" : ""}`}>
      <span className="ab-toc-num">{s.num}</span>
      {s.label}
    </a>
  );

  return (
    <nav className="bench-toc ab-toc" aria-label="On this page">
      <span className="bench-mono-label bench-toc-head">Contents</span>
      <ul>
        {tree.map((g) => (
          <li key={g.id} className={`ab-toc-group${openGroup === g.id ? " is-open" : ""}`}>
            {link(g)}
            {g.subs.length > 0 && (
              <div className="ab-toc-subwrap">
                <ul className="ab-toc-subs">
                  {g.subs.map((s) => <li key={s.id} className="sub">{link(s, "ab-toc-sub")}</li>)}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
