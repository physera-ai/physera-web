import { TIER_COLOR, TIER_LABEL, type VoiceData, type VoiceRow } from "../data";

export function VoiceLeaderboard({ rows }: { rows: VoiceRow[] }) {
  const maxEmp = Math.max(...rows.map((r) => r.empathy));
  return (
    <div className="bench-panel overflow-x-auto">
      <table className="bench-table">
        <thead>
          <tr>
            <th className="num">Rank</th>
            <th>System</th>
            <th>Tier</th>
            <th className="num">Empathy</th>
            <th>95% CI</th>
            <th className="num">Response quality</th>
            <th className="num">Latency</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id}>
              <td className="num">{i + 1}</td>
              <td className="whitespace-nowrap">
                <i className="bench-swatch" style={{ background: TIER_COLOR[r.tier] }} />
                {r.name}
                {r.subtitle && <span className="muted"> · {r.subtitle}</span>}
              </td>
              <td className="muted whitespace-nowrap">{TIER_LABEL[r.tier]}</td>
              <td className="num">{r.empathy.toFixed(3)}</td>
              <td>
                <div className="bench-bar">
                  <b style={{ width: `${(r.empathy / maxEmp) * 100}%` }} />
                </div>
              </td>
              <td className="num">{r.rq != null ? r.rq.toFixed(3) : "—"}</td>
              <td className="num">{r.latency_s != null ? `${r.latency_s}s` : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Decomposition({ decomp }: { decomp: VoiceData["decomp"] }) {
  const cascade = decomp.find((d) => d.tier === "cascade");
  const native = decomp.find((d) => d.tier === "native");
  const bar = (v: number) => `${Math.min(100, v * 100)}%`;
  return (
    <div className="bench-panel">
      <div className="bench-panel-head">
        <h3 className="bench-panel-title">Where the cascade lead comes from</h3>
        <span className="bench-mono-label">Delivery vs content, averaged per tier</span>
      </div>
      <div className="voice-decomp">
        {[
          { key: "delivery", label: "Vocal delivery", note: "How it sounds (Gemini audio judge)" },
          { key: "content", label: "Response content", note: "What it says (Claude text judge)" },
        ].map((row) => {
          const c = cascade?.[row.key as "delivery" | "content"] ?? 0;
          const n = native?.[row.key as "delivery" | "content"] ?? 0;
          return (
            <div key={row.key} className="voice-decomp-row">
              <div className="voice-decomp-label">
                <span>{row.label}</span>
                <span className="bench-mono-label">{row.note}</span>
              </div>
              <div className="voice-decomp-bars">
                <div className="voice-decomp-bar">
                  <span className="t">Cascade</span>
                  <div className="track">
                    <b style={{ width: bar(c), background: TIER_COLOR.cascade }} />
                  </div>
                  <span className="v">{c.toFixed(3)}</span>
                </div>
                <div className="voice-decomp-bar">
                  <span className="t">Native</span>
                  <div className="track">
                    <b style={{ width: bar(n), background: TIER_COLOR.native }} />
                  </div>
                  <span className="v">{n.toFixed(3)}</span>
                </div>
              </div>
              <div className="voice-decomp-gap">
                Δ {(c - n >= 0 ? "+" : "") + (c - n).toFixed(3)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="bench-legend">
        <span className="bench-legend-item">
          The delivery gap is small; the content gap is large. Cascades win because the text model writes better replies, not because they sound better.
        </span>
      </div>
    </div>
  );
}
