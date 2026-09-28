"use client";

import { AxisProfile, MODELS, OverallCI } from "./Charts";

const TAKEAWAYS = [
  "GPT-6 Astra leads at 0.594 and its lead over every other model holds under resampling; Sol and Opus 5.5 are statistically tied.",
  "Every model is weakest on motion: visual similarity 0.63–0.71, motion consistency 0.38–0.47. 177 of 192 reconstructions look better than they move.",
  "Timing is barely better than chance. Scored against the right reference the timing term is 0.57; against a different animation's reference it is 0.50.",
  "Cost does not buy score: a ninefold spread in spend ($0.45–$3.89 per task) against a 0.087 spread in score.",
];

export default function Leaderboard() {
  const ranked = [...MODELS].sort((a, b) => b.overall[0] - a.overall[0]);

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

      <div className="overflow-x-auto">
        <table className="bench-table my-6">
          <thead>
            <tr>
              <th className="num">Rank</th>
              <th>Model</th>
              <th>Harness</th>
              <th className="num">Score</th>
              <th className="num">Visual</th>
              <th className="num">Motion</th>
              <th className="num">Layout</th>
              <th className="num">Task wins</th>
              <th className="num">$ / task</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((m, i) => (
              <tr key={m.id} className={i === 0 ? "lead" : ""}>
                <td className="n">{i + 1}</td>
                <td className="whitespace-nowrap">{m.full}</td>
                <td className="whitespace-nowrap">Computer-1</td>
                <td className="n">
                  {m.overall[0].toFixed(3)} <span className="ab-lb-ci-inline">±{m.ciHalf.toFixed(3)}</span>
                </td>
                <td className="n">{m.visual[0].toFixed(3)}</td>
                <td className="n">{m.motion[0].toFixed(3)}</td>
                <td className="n">{m.layout[0].toFixed(3)}</td>
                <td className="n">{m.wins}</td>
                <td className="n">${m.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="ab-note">
        One selected run per model and task. Scores are reproduction scores on a 0–1 scale, not success rates. Two
        tasks (raycast, Squarespace logo hover) keep their 24 September scores; the rest use the corrected 26
        September scoring.
      </p>
    </section>
  );
}
