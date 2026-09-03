"use client";

import { useState } from "react";
import type { ModelRow } from "../data";

const TASK = "session-broker-jwt-defensive";

export default function Outputs({
  models,
  question,
  plans,
}: {
  models: ModelRow[];
  question: string;
  plans: Record<string, string>;
}) {
  const [sel, setSel] = useState(models[0].key);
  const m = models.find((x) => x.key === sel) ?? models[0];
  const r = m.per_task[TASK];

  return (
    <div className="bench-panel">
      <div className="bench-block">
        <div className="bench-mono-label mb-2">Task</div>
        <pre className="bench-pre">{question.replace(/^# Task Instructions\s*/, "")}</pre>
      </div>
      <div className="bench-tabs" role="tablist">
        {models.map((x) => (
          <button
            key={x.key}
            role="tab"
            type="button"
            aria-selected={x.key === sel}
            className="bench-tab"
            onClick={() => setSel(x.key)}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div className="bench-meta">
        <span>
          Outcome{" "}
          <b className={r.pass_ ? "text-[var(--bench-good-ink)]" : "text-[var(--bench-bad-ink)]"}>
            {r.pass_ ? "PASS" : "FAIL"}
          </b>
        </span>
        <span>
          Checks <b>{r.passed}/{r.n}</b>
        </span>
        <span>
          Cost <b>${r.cost}</b>
        </span>
        <span>
          Time <b>{r.min} min</b>
        </span>
        {r.failed.length > 0 && (
          <span>
            Missed <b>{r.failed.join(", ")}</b>
          </span>
        )}
      </div>
      <div className="bench-block">
        <div className="bench-mono-label mb-2">Agent plan.md</div>
        <pre className="bench-pre bench-pre-mono">{plans[m.id]}</pre>
      </div>
    </div>
  );
}
