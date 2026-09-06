import { ORG_COLOR, type BenchData, type ModelRow } from "../data";

export function Leaderboard({ models }: { models: ModelRow[] }) {
  return (
    <div className="bench-panel overflow-x-auto">
      <table className="bench-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Org</th>
            <th>Harness</th>
            <th className="num">Solved</th>
            <th>Solve rate</th>
            <th className="num">Checks</th>
            <th className="num">$ / task</th>
            <th className="num">Median min</th>
            <th className="num">One check short</th>
          </tr>
        </thead>
        <tbody>
          {models.map((m) => (
            <tr key={m.key}>
              <td className="whitespace-nowrap">
                <i className="bench-swatch" style={{ background: ORG_COLOR[m.org] }} />
                {m.label.replace(" · Terminus 2", "")}
              </td>
              <td className="muted whitespace-nowrap">{m.org}</td>
              <td className="muted">
                {m.harness}
                {m.errored && m.errored.length > 0 && (
                  <span className="text-[var(--bench-bad-ink)]" title={m.errored.join(", ")}>
                    {" "}
                    ({m.errored.length} unscored)
                  </span>
                )}
              </td>
              <td className="num">{m.solved}/22</td>
              <td>
                <div className="bench-bar">
                  <b style={{ width: `${m.acc}%` }} />
                </div>
              </td>
              <td className="num">{m.checks}%</td>
              <td className="num">${m.cost_per_task.toFixed(2)}</td>
              <td className="num">{m.median_min}</td>
              <td className="num">{m.near_miss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TaskGrid({ data, models }: { data: BenchData; models: ModelRow[] }) {
  const tasks = [...data.tasks].sort((a, b) => {
    const s = (t: string) => models.filter((m) => m.per_task[t].pass_).length;
    return s(b) - s(a) || a.localeCompare(b);
  });
  return (
    <div className="bench-panel overflow-x-auto">
      <table className="bench-table bench-grid">
        <thead>
          <tr>
            <th>Task</th>
            {models.map((m) => (
              <th key={m.key} className="center">
                {m.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t}>
              <td className="whitespace-nowrap">{data.taskShort[t]}</td>
              {models.map((m) => {
                const r = m.per_task[t];
                if (r.error)
                  return (
                    <td key={m.key} className="cell err" title={r.error}>
                      unscored
                    </td>
                  );
                return (
                  <td key={m.key} className={`cell ${r.pass_ ? "pass" : ""}`} title={r.failed.join(", ")}>
                    {r.pass_ ? "PASS" : `${r.passed}/${r.n}`}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bench-legend">
        <span className="bench-legend-item">
          <i style={{ background: "var(--bench-good-fill)" }} />
          all checks pass
        </span>
        <span className="bench-legend-item">n/m = checks passed</span>
        <span className="bench-legend-item">quarkus cells use pre-fail-closed scores</span>
        <span className="bench-legend-item">unscored = trial errored before the verifier</span>
      </div>
    </div>
  );
}

export function ClassTable({ data }: { data: BenchData }) {
  return (
    <div className="bench-panel">
      <div className="bench-panel-head">
        <h3 className="bench-panel-title">Which tasks sit in each class</h3>
      </div>
      <table className="bench-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data.cats).map(([c, ts]) => (
            <tr key={c}>
              <td className="whitespace-nowrap">{c}</td>
              <td className="muted text-[13.5px]">{ts.map((t) => data.taskShort[t]).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
