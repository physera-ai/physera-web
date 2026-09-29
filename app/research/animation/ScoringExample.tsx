"use client";

import { useState, type ReactNode } from "react";

export type ScorePanel = {
  key: string;
  label: string;
  value: string;
  head?: string[];
  rows: [string, string, string, string][];
  total: string;
  totalValue: string;
  totalWeight?: string;
  note: ReactNode;
};

export default function ScoringExample({ panels }: { panels: ScorePanel[] }) {
  const [current, setCurrent] = useState(panels[0].key);
  const panel = panels.find((p) => p.key === current) ?? panels[0];
  const head = panel.head ?? ["Sub-score", "Weight", "Score", "Weight × score"];
  return (
    <div className="ab-lb-panel ab-scoring-example">
      <div className="ab-lb-head">
        <div>
          <h4 className="ab-lb-title">{panel.label}: {panel.value}</h4>
        </div>
        <div className="ab-view-switch" role="group" aria-label="Score breakdown">
          {panels.map((p) => (
            <button key={p.key} type="button" aria-pressed={p.key === current} onClick={() => setCurrent(p.key)}>
              {p.label.split(" ")[0]} <b>{p.value}</b>
            </button>
          ))}
        </div>
      </div>
      <div className="ab-scoring-example-body">
        <div className="overflow-x-auto"><table className="bench-table ab-score-table"><thead><tr>{head.map((h, i) => <th key={h} className={i ? "num" : ""}>{h}</th>)}</tr></thead><tbody>
          {panel.rows.map(([name, weight, score, product]) => (
            <tr key={name}><td className="whitespace-nowrap"><strong>{name}</strong></td><td className="n">{weight}</td><td className="n">{score}</td><td className="n">{product}</td></tr>
          ))}
          <tr className="lead"><td className="whitespace-nowrap"><strong>{panel.total}</strong></td><td className="n">{panel.totalWeight ? <strong>{panel.totalWeight}</strong> : ""}</td><td></td><td className="n"><strong>{panel.totalValue}</strong></td></tr>
        </tbody></table></div>
        <div className="ab-scoring-example-note">{panel.note}</div>
      </div>
    </div>
  );
}
