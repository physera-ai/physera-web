"use client";

import { useState } from "react";
import results from "./data.json";
import ModelLogo from "./ModelLogo";
import Flipbook, { hasFlipbook, type Row } from "./Flipbook";

type Axis = "score" | "visual" | "motion" | "layout";
type Meta = Record<string, [site: string, trigger: string, difficulty: string, genre: string]>;
type ModelId = keyof (typeof results.tasks)[number]["scores"];
type TaskResult = (typeof results.tasks)[number];

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
const MODELS = ["gpt-6-astra", "claude-fable-5-1", "claude-opus-5-5", "gpt-6-sol"] as ModelId[];
const PREVIEW_ROWS: { key: Row; label: string }[] = [
  { key: "ref", label: "Reference" },
  { key: "astra", label: "Astra" },
  { key: "fable", label: "Fable" },
  { key: "opus", label: "Opus" },
  { key: "sol", label: "Sol" },
];
const fmt = (v: number) => v.toFixed(3);

function TaskScoreCards({ task, mobile = false }: { task: TaskResult; mobile?: boolean }) {
  return (
    <div className={`ab-taskscores-grid${mobile ? " ab-taskscores-mobile-grid" : ""}`}>
      {MODELS.map((id) => {
        const scores = task.scores[id];
        return (
          <div key={id} className="ab-taskscores-card">
            <span className="ab-taskscores-model"><ModelLogo model={id} />{mobile ? SHORT[id] : LABEL[id]}</span>
            {AXES.map((scoreAxis) => {
              const axisBest = Math.max(...MODELS.map((model) => task.scores[model][scoreAxis.key]));
              return (
                <span key={scoreAxis.key} className={scores[scoreAxis.key] === axisBest ? "is-best" : ""}>
                  <em>{scoreAxis.label}</em><b>{fmt(scores[scoreAxis.key])}</b>
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function MobileTaskPreview({ task }: { task: string }) {
  const [preview, setPreview] = useState<Row>("ref");
  return (
    <div className="ab-taskscores-mobile-preview">
      <div className="ab-taskscores-preview-tabs" role="group" aria-label="Preview source">
        {PREVIEW_ROWS.map((row) => (
          <button key={row.key} type="button" aria-pressed={preview === row.key} onClick={() => setPreview(row.key)}>
            {row.label}
          </button>
        ))}
      </div>
      <Flipbook task={task} rows={[preview]} compact cols={1} />
    </div>
  );
}

export default function TaskScores({ metadata }: { metadata: Meta }) {
  const [axis, setAxis] = useState<Axis>("score");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

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
          <button type="button" className="ab-taskscores-all" onClick={() => setOpen(open.size === results.tasks.length ? new Set() : new Set(results.tasks.map((t) => t.id)))}>
            {open.size === results.tasks.length ? "Collapse all" : "Expand all"}
          </button>
        </span>
      </div>
      <div className="ab-taskscores-desktop overflow-x-auto">
        <table className="bench-table bench-grid ab-taskscores-table my-6">
          <thead>
            <tr>
              <th>Task</th>
              {MODELS.map((id) => (
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
              const best = Math.max(...MODELS.map((id) => t.scores[id][axis]));
              const [site, trigger, difficulty, genre] = metadata[t.id] ?? ["", "", "", ""];
              const isOpen = open.has(t.id);
              return [
                <tr key={t.id} className={isOpen ? "is-open" : ""}>
                  <td className="whitespace-nowrap">
                    <button type="button" className="ab-taskscores-row" aria-expanded={isOpen} aria-controls={`ts-${t.id}`} onClick={() => toggle(t.id)}>
                      <span className="ab-taskscores-caret" aria-hidden="true">{isOpen ? "▾" : "▸"}</span>{t.id}
                    </button>
                  </td>
                  {MODELS.map((id) => {
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
                    <td colSpan={MODELS.length + 5}>
                      {hasFlipbook(t.id) && <Flipbook task={t.id} compact />}
                      <TaskScoreCards task={t} />
                    </td>
                  </tr>
                ),
              ];
            })}
          </tbody>
        </table>
      </div>
      <div className="ab-taskscores-mobile">
        {results.tasks.map((task) => {
          const [site, trigger, difficulty, genre] = metadata[task.id] ?? ["", "", "", ""];
          const best = Math.max(...MODELS.map((id) => task.scores[id][axis]));
          const isOpen = mobileOpen === task.id;
          return (
            <article key={task.id} className={`ab-mobile-task${isOpen ? " is-open" : ""}`}>
              <button
                type="button"
                className="ab-mobile-task-summary"
                aria-expanded={isOpen}
                aria-controls={`ts-mobile-${task.id}`}
                onClick={() => setMobileOpen(isOpen ? null : task.id)}
              >
                <span className="ab-mobile-task-title">
                  <span className="ab-taskscores-caret" aria-hidden="true">{isOpen ? "▾" : "▸"}</span>
                  <span>{task.id}</span>
                </span>
                <span className="ab-mobile-task-meta">
                  {[site, genre, trigger, difficulty].filter(Boolean).map((value) => <span key={value}>{value}</span>)}
                </span>
                <span className="ab-mobile-task-scores">
                  {MODELS.map((id) => {
                    const value = task.scores[id][axis];
                    return (
                      <span key={id} className={value === best ? "is-best" : ""}>
                        <span><ModelLogo model={id} />{SHORT[id]}</span><b>{fmt(value)}</b>
                      </span>
                    );
                  })}
                </span>
              </button>
              {isOpen ? (
                <div id={`ts-mobile-${task.id}`} className="ab-mobile-task-detail">
                  {hasFlipbook(task.id) ? <MobileTaskPreview task={task.id} /> : null}
                  <TaskScoreCards task={task} mobile />
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
