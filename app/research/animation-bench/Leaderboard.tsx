"use client";

import { useState } from "react";
import { AxisProfile, MODELS, OverallCI } from "./Charts";
import usage from "./models.json";

const TAKEAWAYS = [
  "GPT-6 Astra leads at 0.594 and its lead over every other model holds under resampling; Sol and Opus 5.5 are statistically tied.",
  "Every model is weakest on motion: visual similarity 0.63–0.71, motion consistency 0.38–0.47. 177 of 192 reconstructions look better than they move.",
  "Timing is barely better than chance. Scored against the right reference the timing term is 0.57; against a different animation's reference it is 0.50.",
  "Cost does not buy score: a ninefold spread in spend ($0.45–$3.89 per task) against a 0.087 spread in score.",
];

type Axis = "overall" | "visual" | "motion" | "layout";
type SortKey = Axis | "wins" | "cost" | "price" | "tokens" | "duration";
type Sort = { key: SortKey; dir: 1 | -1 };

const AXES: Axis[] = ["overall", "visual", "motion", "layout"];
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

const ROWS = MODELS.map((m) => {
  const u = usage[m.id as keyof typeof usage];
  return {
    ...m,
    vendor: m.id.startsWith("claude") ? ("anthropic" as const) : ("openai" as const),
    priceIn: u.price_in,
    priceOut: u.price_out,
    tokIn: u.in_tokens_per_task,
    tokOut: u.out_tokens_per_task,
    sec: u.sec_per_task,
  };
});
type Row = (typeof ROWS)[number];

const SORT_VALUE: Record<SortKey, (r: Row) => number> = {
  overall: (r) => r.overall[0],
  visual: (r) => r.visual[0],
  motion: (r) => r.motion[0],
  layout: (r) => r.layout[0],
  wins: (r) => r.wins,
  cost: (r) => r.cost,
  price: (r) => r.priceIn,
  tokens: (r) => r.tokIn,
  duration: (r) => r.sec,
};

const fmtTok = (t: number) => (t >= 1e5 ? `${(t / 1e6).toFixed(2)}M` : `${(t / 1e3).toFixed(1)}k`);
const fmtDur = (sec: number) => {
  const s = Math.round(sec);
  return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
};

function VendorMark({ vendor }: { vendor: Row["vendor"] }) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" className="ab-lt-mark" aria-hidden>
      {vendor === "anthropic" ? (
        <text x={7} y={11} textAnchor="middle">{"A\\"}</text>
      ) : (
        <polygon points="7,1 12.2,4 12.2,10 7,13 1.8,10 1.8,4" />
      )}
    </svg>
  );
}

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "overall", label: "Overall" },
  { key: "visual", label: "Visual" },
  { key: "motion", label: "Motion" },
  { key: "layout", label: "Layout" },
  { key: "wins", label: "Task wins" },
  { key: "cost", label: "Cost / task" },
  { key: "price", label: "In / out price" },
  { key: "tokens", label: "In / out tokens" },
  { key: "duration", label: "Duration" },
];

function cell(r: Row, key: SortKey) {
  switch (key) {
    case "overall":
      return <>{r.overall[0].toFixed(3)} <span className="ab-lb-ci-inline">±{r.ciHalf.toFixed(3)}</span></>;
    case "visual":
    case "motion":
    case "layout":
      return r[key][0].toFixed(3);
    case "wins":
      return r.wins;
    case "cost":
      return `$${r.cost.toFixed(2)}`;
    case "price":
      return `$${r.priceIn}/$${r.priceOut}`;
    case "tokens":
      return `${fmtTok(r.tokIn)} / ${fmtTok(r.tokOut)}`;
    case "duration":
      return fmtDur(r.sec);
  }
}

function LeaderboardTable() {
  const [view, setView] = useState<Axis>("overall");
  const [sort, setSort] = useState<Sort>({ key: "overall", dir: -1 });
  const rank = new Map([...ROWS].sort((a, b) => b[view][0] - a[view][0]).map((r, i) => [r.id, i + 1]));
  const rows = [...ROWS].sort((a, b) => sort.dir * (SORT_VALUE[sort.key](a) - SORT_VALUE[sort.key](b)));

  const onView = (a: Axis) => {
    setView(a);
    setSort({ key: a, dir: -1 });
  };
  const onSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: AXES.includes(key as Axis) || key === "wins" ? -1 : 1 }));

  return (
    <div className="ab-lt">
      <label className="bench-select ab-lt-view">
        View:
        <select value={view} onChange={(e) => onView(e.target.value as Axis)} aria-label="Rank by axis">
          {AXES.map((a) => (
            <option key={a} value={a}>{cap(a)}</option>
          ))}
        </select>
        <span className="bench-select-caret" aria-hidden>▼</span>
      </label>
      <div className="ab-lt-scroll">
        <table className="bench-table ab-lt-table">
          <thead>
            <tr>
              <th className="num ab-lt-rank">Rank</th>
              <th className="ab-lt-model">Model</th>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  className={`num${c.key === view ? " is-view" : ""}`}
                  aria-sort={sort.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
                >
                  <button type="button" onClick={() => onSort(c.key)}>
                    {c.label}
                    <span className={sort.key === c.key ? "ab-lt-arrow is-on" : "ab-lt-arrow"} aria-hidden>
                      {sort.key === c.key && sort.dir === 1 ? "↑" : "↓"}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className={rank.get(r.id) === 1 ? "lead" : ""}>
                <td className="n ab-lt-rank">{rank.get(r.id)}</td>
                <td className="ab-lt-model">
                  <VendorMark vendor={r.vendor} />
                  {r.full}
                </td>
                {COLUMNS.map((c) => (
                  <td key={c.key} className={`n${c.key === view ? " is-view" : ""}`}>{cell(r, c.key)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="ab-note ab-lt-note">
        Cost, tokens and duration are per task, averaged over the 48 tasks; tokens include cache reads. Prices are list
        prices at run time.
      </p>
    </div>
  );
}

export default function Leaderboard() {
  return (
    <section className="ab-lb" aria-label="Leaderboard">
      <div id="leaderboard" className="ab-lb-panel scroll-mt-24">
        <div className="ab-lb-head">
          <div>
            <h2 className="ab-lb-title">Animation Bench</h2>
            <div className="bench-mono-label ab-lb-subtitle">Reproduction score · 4 models × 48 tasks</div>
          </div>
        </div>
        <div className="ab-ch-grid">
          <OverallCI />
          <AxisProfile />
        </div>
      </div>

      <h2 className="bench-h2">Key takeaways</h2>
      <ul className="bench-list list-disc">
        {TAKEAWAYS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <LeaderboardTable />
      <p className="ab-note">
        One selected run per model and task. Scores are reproduction scores on a 0–1 scale, not success rates. Two
        tasks (raycast, Squarespace logo hover) keep their 24 September scores; the rest use the corrected 26
        September scoring.
      </p>
    </section>
  );
}
