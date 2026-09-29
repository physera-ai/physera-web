import { DIMS, ORG_COLOR, TRIGGERS, type BenchData, type ModelRow } from "../data";

const money = (v: number) => `$${v.toFixed(2)}`;

export function Leaderboard({ models, nTasks }: { models: ModelRow[]; nTasks: number }) {
  return (
    <div className="bench-panel overflow-x-auto">
      <table className="bench-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Org</th>
            <th>Agent</th>
            <th className="num">Mean</th>
            <th>Score</th>
            {DIMS.map((d) => (
              <th key={d.key} className="num">
                {d.short}
              </th>
            ))}
            <th className="num">Tasks won</th>
            <th className="num">$ / task</th>
            <th className="num">Median steps</th>
          </tr>
        </thead>
        <tbody>
          {models.map((m) => (
            <tr key={m.key}>
              <td className="whitespace-nowrap">
                <i className="bench-swatch" style={{ background: ORG_COLOR[m.org] }} />
                {m.label}
              </td>
              <td className="muted whitespace-nowrap">{m.org}</td>
              <td className="muted whitespace-nowrap">{m.agent}</td>
              <td className="num">{m.mean.toFixed(3)}</td>
              <td>
                <div className="bench-bar">
                  <b style={{ width: `${m.mean * 100}%` }} />
                </div>
              </td>
              {DIMS.map((d) => (
                <td key={d.key} className="num">
                  {m.dims[d.key].toFixed(3)}
                </td>
              ))}
              <td className="num">
                {m.wins}/{nTasks}
              </td>
              <td className="num">{money(m.cost_per_task)}</td>
              <td className="num">{m.median_steps}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TaskGrid({ data, models }: { data: BenchData; models: ModelRow[] }) {
  const tasks = [...data.tasks].sort((a, b) => {
    const best = (t: string) => Math.max(...models.map((m) => m.per_task[t].score));
    return best(b.id) - best(a.id) || a.id.localeCompare(b.id);
  });
  const triggerLabel = Object.fromEntries(TRIGGERS.map((t) => [t.key, t.label]));
  return (
    <div className="bench-panel overflow-x-auto">
      <table className="bench-table bench-grid">
        <thead>
          <tr>
            <th>Task</th>
            <th>Trigger</th>
            <th className="num">Frames</th>
            {models.map((m) => (
              <th key={m.key} className="center">
                {m.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => {
            const best = Math.max(...models.map((m) => m.per_task[t.id].score));
            return (
              <tr key={t.id}>
                <td className="whitespace-nowrap" title={t.animation}>
                  {t.short}
                  <span className="muted"> · {t.site}</span>
                </td>
                <td className="muted">{triggerLabel[t.trigger]}</td>
                <td className="num">{t.frames}</td>
                {models.map((m) => {
                  const r = m.per_task[t.id];
                  const title = DIMS.map((d) => `${d.short} ${r.dims[d.key].toFixed(2)}`).join(" · ") + ` · $${r.cost.toFixed(2)} · ${r.steps} steps`;
                  return (
                    <td key={m.key} className={`cell ${r.score === best ? "pass" : ""}`} title={title}>
                      {r.score.toFixed(3)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="bench-legend">
        <span className="bench-legend-item">
          <i style={{ background: "var(--bench-good-fill)" }} />
          best score on the task
        </span>
        <span className="bench-legend-item">hover a cell for the four dimensions, cost and steps</span>
        <span className="bench-legend-item">best clean run per task, fixed scorer</span>
      </div>
    </div>
  );
}

export function WeightsTable({ data }: { data: BenchData }) {
  return (
    <div className="bench-panel overflow-x-auto">
      <div className="bench-panel-head">
        <h3 className="bench-panel-title">Dimension weights, by task</h3>
        <span className="bench-mono-label">Weights sum to 1 per task</span>
      </div>
      <table className="bench-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Trigger</th>
            {DIMS.map((d) => (
              <th key={d.key} className="num">
                {d.short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.tasks.map((t) => (
            <tr key={t.id}>
              <td className="whitespace-nowrap">{t.short}</td>
              <td className="muted">{t.trigger}</td>
              {DIMS.map((d) => (
                <td key={d.key} className="num">
                  {t.weights[d.key].toFixed(2)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
