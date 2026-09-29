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
  const weights = panel.rows.map((r) => parseFloat(r[1])).filter((v) => !Number.isNaN(v));
  const maxWeight = Math.max(0.5, ...weights);
  const contributions = panel.rows.filter((r) => !Number.isNaN(parseFloat(r[1])) && !Number.isNaN(parseFloat(r[3]))).map((r) => parseFloat(r[3]));
  const finalValue = parseFloat(panel.value);
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
        <div className="ab-se-table">
          <div className="ab-se-row ab-se-headrow">
            <span>{head[0]}</span><span className="n">{head[1]}</span><span className="n">{head[2]}</span><span className="n">{head[3]}</span><span className="ab-se-barhead">contribution</span>
          </div>
          {panel.rows.map(([name, weight, score, product]) => {
            const w = parseFloat(weight), sc = parseFloat(score), pr = parseFloat(product);
            const isFactor = weight === "×";
            const isSubtotal = !isFactor && Number.isNaN(w) && !Number.isNaN(pr);
            return (
              <div key={name} className={`ab-se-row${isFactor ? " is-factor" : ""}${isSubtotal ? " is-subtotal" : ""}`}>
                <span className="ab-se-name">{name}</span>
                <span className="n">{weight}</span>
                <span className="n">{score}</span>
                <span className="n">{product}</span>
                <span className="ab-se-bar">
                  {!Number.isNaN(w) && !Number.isNaN(sc) && (
                    <span className="ab-se-track" style={{ width: `${Math.min(100, (w / maxWeight) * 100)}%` }}><i style={{ width: `${sc * 100}%` }} /></span>
                  )}
                  {isFactor && <span className="ab-se-factor">× {score}</span>}
                  {isSubtotal && <span className="ab-se-track is-sum" style={{ width: `${pr * 100}%` }}><i style={{ width: "100%" }} /></span>}
                </span>
              </div>
            );
          })}
          <div className="ab-se-row ab-se-total">
            <span className="ab-se-name">{panel.total}</span>
            <span className="n">{panel.totalWeight ?? ""}</span>
            <span className="n"></span>
            <span className="n">{panel.totalValue}</span>
            <span className="ab-se-bar">
              <span className="ab-se-stack">
                {contributions.map((c, i) => <i key={i} style={{ width: `${c * 100}%`, opacity: 1 - i * 0.14 }} />)}
              </span>
              <span className="ab-se-total-mark" style={{ left: `${finalValue * 100}%` }}>{finalValue.toFixed(3)}</span>
            </span>
          </div>
        </div>
        <aside className="ab-se-aside">
          <span className="ab-se-big">{panel.value}</span>
          <span className="ab-se-big-label">{panel.label}</span>
          <div className="ab-scoring-example-note">{panel.note}</div>
        </aside>
      </div>
    </div>
  );
}
