"use client";

import { useState } from "react";
import { ORG_COLOR, TRIGGERS, type BenchData, type ModelRow } from "../data";
import { profiles, type Profile } from "../profiles";

function money(v: number): string {
  return `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function ProfileCard({
  model,
  profile,
  rank,
  total,
  nTasks,
  taskCount,
}: {
  model: ModelRow;
  profile: Profile;
  rank: number;
  total: number;
  nTasks: number;
  taskCount: Record<string, number>;
}) {
  const color = ORG_COLOR[model.org] ?? "#888";
  return (
    <div className="bench-profile">
      <div className="bench-profile-head">
        <i className="bench-swatch" style={{ background: color }} />
        <h3 className="bench-profile-name">
          {model.label} <span className="bench-profile-effort">({model.effort})</span>
        </h3>
      </div>
      <p className="bench-profile-tagline">{profile.tagline}</p>

      <div className="bench-profile-grid">
        <dl className="bench-profile-facts">
          <div>
            <dt>Agent</dt>
            <dd>
              {model.agent} · cap {model.step_cap}
            </dd>
          </div>
          <div>
            <dt>Mean score</dt>
            <dd>
              {model.mean.toFixed(3)} · rank {rank} of {total}
            </dd>
          </div>
          <div>
            <dt>Tasks won</dt>
            <dd>
              {model.wins}/{nTasks}
            </dd>
          </div>
          <div>
            <dt>API cost</dt>
            <dd>
              {money(model.cost_total)} · {money(model.cost_per_task)}/task
            </dd>
          </div>
          <div>
            <dt>Median steps</dt>
            <dd>{model.median_steps}</dd>
          </div>
        </dl>

        <div className="bench-profile-bars" role="list" aria-label="Mean score by trigger type">
          {TRIGGERS.map((t) => {
            const v = model.by_trigger[t.key];
            return (
              <div key={t.key} className="bench-profile-bar" role="listitem">
                <span className="bench-profile-bar-label">
                  {t.label} ({taskCount[t.key] ?? 0})
                </span>
                <span className="bench-profile-bar-track">
                  <span className="bench-profile-bar-fill" style={{ width: `${v * 100}%`, background: color }} />
                </span>
                <span className="bench-profile-bar-value">{v.toFixed(3)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bench-profile-body">
        {profile.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}

export function ModelProfiles({ bench }: { bench: BenchData }): React.JSX.Element {
  const ordered = profiles
    .map((p) => ({ profile: p, model: bench.models.find((m) => m.key === p.key) }))
    .filter((x): x is { profile: Profile; model: ModelRow } => Boolean(x.model));
  const [active, setActive] = useState(ordered[0]?.profile.key ?? "");
  const current = ordered.find((x) => x.profile.key === active) ?? ordered[0];
  const taskCount: Record<string, number> = {};
  for (const t of bench.tasks) taskCount[t.trigger] = (taskCount[t.trigger] ?? 0) + 1;

  if (!current) return <></>;

  return (
    <div className="bench-profiles">
      <div className="bench-profile-tabs" role="tablist" aria-label="Model">
        {ordered.map(({ profile, model }) => {
          const selected = profile.key === active;
          return (
            <button
              key={profile.key}
              role="tab"
              type="button"
              aria-selected={selected}
              className={`bench-profile-tab${selected ? " is-active" : ""}`}
              onClick={() => setActive(profile.key)}
            >
              <i className="bench-swatch" style={{ background: ORG_COLOR[model.org] ?? "#888" }} />
              {model.label} <span className="bench-profile-effort">({model.effort})</span>
            </button>
          );
        })}
      </div>
      <ProfileCard
        model={current.model}
        profile={current.profile}
        rank={bench.models.findIndex((m) => m.key === current.model.key) + 1}
        total={bench.models.length}
        nTasks={bench.tasks.length}
        taskCount={taskCount}
      />
    </div>
  );
}
