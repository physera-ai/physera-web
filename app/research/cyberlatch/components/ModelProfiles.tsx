"use client";

import { useState } from "react";
import { ORG_COLOR, type BenchData, type ModelRow } from "../data";
import { profiles, type Profile } from "../profiles";

const CAT_SHORT: Record<string, string> = {
  "Systems & memory safety": "Systems & memory",
  "AuthN / authz / sessions": "AuthN / sessions",
  "Injection & untrusted input": "Injection",
  "Access control & data exposure": "Access control",
  "Detection & incident response": "Detection & IR",
};

function money(v: number): string {
  return `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function ProfileCard({
  model,
  profile,
  rank,
  total,
  cats,
  nTasks,
}: {
  model: ModelRow;
  profile: Profile;
  rank: number;
  total: number;
  cats: string[];
  nTasks: number;
}) {
  const color = ORG_COLOR[model.org] ?? "#888";
  return (
    <div className="bench-profile">
      <div className="bench-profile-head">
        <i className="bench-swatch" style={{ background: color }} />
        <h3 className="bench-profile-name">
          {model.label} <span className="bench-profile-effort">({profile.effort})</span>
        </h3>
      </div>
      <p className="bench-profile-tagline">{profile.tagline}</p>

      <div className="bench-profile-grid">
        <dl className="bench-profile-facts">
          <div>
            <dt>Harness</dt>
            <dd>{model.harness}</dd>
          </div>
          <div>
            <dt>Solved</dt>
            <dd>
              {model.solved}/{nTasks} · rank {rank} of {total}
            </dd>
          </div>
          <div>
            <dt>API cost</dt>
            <dd>{money(model.cost_total)}</dd>
          </div>
          <div>
            <dt>Median run</dt>
            <dd>{model.median_min.toFixed(0)} min</dd>
          </div>
        </dl>

        <div className="bench-profile-bars" role="list" aria-label="Tasks solved by task category">
          {cats.map((c) => {
            const solved = model.radar_solved[c] ?? "0/0";
            const [done, of] = solved.split("/").map(Number);
            const width = of > 0 ? (100 * done) / of : 0;
            return (
              <div key={c} className="bench-profile-bar" role="listitem">
                <span className="bench-profile-bar-label">{CAT_SHORT[c] ?? c}</span>
                <span className="bench-profile-bar-track">
                  <span className="bench-profile-bar-fill" style={{ width: `${width}%`, background: color }} />
                </span>
                <span className="bench-profile-bar-value">{solved}</span>
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
  const cats = Object.keys(bench.cats);

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
              {model.label} <span className="bench-profile-effort">({profile.effort})</span>
            </button>
          );
        })}
      </div>
      <ProfileCard
        model={current.model}
        profile={current.profile}
        rank={bench.models.findIndex((m) => m.key === current.model.key) + 1}
        total={bench.models.length}
        cats={cats}
        nTasks={bench.tasks.length}
      />
    </div>
  );
}
