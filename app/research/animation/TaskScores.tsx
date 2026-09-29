"use client";

import { useState } from "react";
import results from "./data.json";
import ModelLogo from "./ModelLogo";
import Flipbook, { hasFlipbook } from "./Flipbook";

type Axis = "score" | "visual" | "motion" | "layout";
type Meta = Record<string, [site: string, trigger: string, difficulty: string, genre: string]>;
type ModelId = keyof (typeof results.tasks)[number]["scores"];

const AXES: { key: Axis; label: string }[] = [
  { key: "score", label: "Overall" },
  { key: "visual", label: "Visual" },
  { key: "motion", label: "Motion" },
  { key: "layout", label: "Layout" },
];
const LABEL: Record<string, string> = {
  "gpt-6-astra": "GPT-6 Astra",
  "claude-fable-5-1": "Claude Fable 5.1",
  "claude-opus-5-5": "Claude Opus 5.5",
  "gpt-6-sol": "GPT-6 Sol",
};
const SHORT: Record<string, string> = {
  "gpt-6-astra": "Astra", "claude-fable-5-1": "Fable", "claude-opus-5-5": "Opus", "gpt-6-sol": "Sol",
};
const fmt = (v: number) => v.toFixed(3);

export default function TaskScores({ metadata }: { metadata: Meta }) {
  const [axis, setAxis] = useState<Axis>("score");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const models = ["gpt-6-astra", "claude-fable-5-1", "claude-opus-5-5", "gpt-6-sol"] as ModelId[];

  const toggle = (id: string) => setOpen((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  return (
    <div className="ab-taskscores">
      <div className="ab-taskscores-bar">
        <div className="ab-lb-toggle" role="group" aria-label="Score axis">
          {AXES.map((a) => (
            <button key={a.key} type="button" className={axis === a.key ? "is-active" : ""} aria-pressed={axis === a.key} onClick={() => setAxis(a.key)}>{a.label}</button>
          ))}
        </div>
        <span className="ab-taskscores-tools">
          <a className="ab-taskscores-all" href="/animation-bench/results.json">JSON</a>
          <button type="button" className="ab-taskscores-all" onClick={() => setOpen(open.size === results.tasks.length ? new Set() : new Set(results.tasks.map((t) => t.id)))}>
            {open.size === results.tasks.length ? "Collapse all" : "Expand all"}
          </button>
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="bench-table bench-grid ab-taskscores-table my-6">
          <thead>
            <tr>
              <th>Task</th>
              {models.map((id) => (
                <th key={id} className="center" title={LABEL[id]}><span className="ab-taskscores-th"><ModelLogo model={id} />{SHORT[id]}</span></th>
              ))}
              <th>Site</th>
              <th>Genre</th>
              <th>Trigger</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {results.tasks.map((t) => {
              const best = Math.max(...models.map((id) => t.scores[id][axis]));
              const [site, trigger, difficulty, genre] = metadata[t.id] ?? ["", "", "", ""];
              const isOpen = open.has(t.id);
              return [
                <tr key={t.id} className={isOpen ? "is-open" : ""}>
                  <td className="whitespace-nowrap">
                    <button type="button" className="ab-taskscores-row" aria-expanded={isOpen} aria-controls={`ts-${t.id}`} onClick={() => toggle(t.id)}>
                      <span className="ab-taskscores-caret" aria-hidden="true">{isOpen ? "▾" : "▸"}</span>{t.id}
                    </button>
                  </td>
                  {models.map((id) => {
                    const v = t.scores[id][axis];
                    return <td key={id} className={v === best ? "cell pass" : "cell"}>{fmt(v)}</td>;
                  })}
                  <td className="whitespace-nowrap">{site}</td>
                  <td>{genre}</td>
                  <td>{trigger}</td>
                  <td>{difficulty}</td>
                </tr>,
                isOpen && (
                  <tr key={`${t.id}-detail`} id={`ts-${t.id}`} className="ab-taskscores-detail">
                    <td colSpan={models.length + 5}>
                      {hasFlipbook(t.id) && <Flipbook task={t.id} compact />}
                      <div className="ab-taskscores-grid">
                        {models.map((id) => {
                          const r = t.scores[id];
                          return (
                            <div key={id} className="ab-taskscores-card">
                              <span className="ab-taskscores-model"><ModelLogo model={id} />{LABEL[id]}</span>
                              {AXES.map((a) => {
                                const axisBest = Math.max(...models.map((m) => t.scores[m][a.key]));
                                return (
                                  <span key={a.key} className={r[a.key] === axisBest ? "is-best" : ""}>
                                    <em>{a.label}</em><b>{fmt(r[a.key])}</b>
                                  </span>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ),
              ];
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
