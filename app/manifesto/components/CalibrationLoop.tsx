import Figure from "./Figure";

const W = 920;
const H = 356;
const PAD = 16;
const BOX_W = 162;
const GAP = 80;
const ROW_Y = 92;
const ROW_H = 130;
const LOOP_Y = ROW_Y + ROW_H + 72;

type Box = { label: string; lines: string[]; tone?: "physera" | "frozen" };

const boxes: Box[] = [
  { label: "REAL WORLD", lines: ["Transactions, claims,", "purchases, engagement.", "Ground truth,", "continuous and free."] },
  { label: "OBSERVER · PHYSERA", tone: "physera", lines: ["A smaller model learns", "what the actor needs", "to know about each", "person. Kept current."] },
  { label: "ACTOR · FROZEN", tone: "frozen", lines: ["Frontier model, not", "trained by us. Sets", "the ceiling; cheapest", "within it runs."] },
  { label: "OUTPUT", lines: ["Prediction, plus", "confidence and a", "predictive horizon.", "Abstains when low."] },
];

const flow = ["BEHAVIOR", "CONDITIONS", "SAMPLES"];

const bx = (i: number) => PAD + i * (BOX_W + GAP);
const cx = (i: number) => bx(i) + BOX_W / 2;

export default function CalibrationLoop() {
  const mid = ROW_Y + ROW_H / 2;
  const bottom = ROW_Y + ROW_H;
  const scoreW = 380;
  const scoreH = 64;
  const scoreX = (cx(1) + cx(3)) / 2 - scoreW / 2;
  const scoreY = LOOP_Y - scoreH / 2;

  return (
    <Figure
      title="How Physera comes in"
      note="Labs optimize the actor. Physera optimizes the observer."
      caption={
        <>
          <span className="bench-legend-item">
            <i style={{ background: "var(--bench-good-ink)" }} />
            Built and scored by Physera
          </span>
          <span className="bench-legend-item">
            <i style={{ background: "var(--bench-rule-2)" }} />
            Frontier model, kept frozen
          </span>
          <span className="bench-legend-item">
            <i style={{ background: "var(--bench-ink-2)" }} />
            Data flow
          </span>
        </>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Real-world behavior feeds an observer model, which conditions a frozen frontier model; predictions are scored against what real people later did and the score feeds back into the observer">
        <text x={PAD} y={36} className="bench-svg-mono" fill="var(--bench-ink-3)">THE CALIBRATION LOOP</text>
        <text x={PAD} y={58} fontSize="13" fill="var(--bench-ink)">
          Every simulated person is built from a real person&apos;s own behavior and scored against what that person later did.
        </text>

        {boxes.map((b, i) => {
          const physera = b.tone === "physera";
          const frozen = b.tone === "frozen";
          return (
            <g key={b.label}>
              <rect
                x={bx(i)}
                y={ROW_Y}
                width={BOX_W}
                height={ROW_H}
                fill={physera ? "var(--bench-good-fill)" : "var(--bench-panel)"}
                stroke={physera ? "var(--bench-good-ink)" : frozen ? "var(--bench-rule-2)" : "var(--bench-ink-2)"}
                strokeWidth={physera ? 1.5 : 1}
                strokeDasharray={frozen ? "4 3" : undefined}
              />
              <text x={bx(i) + 12} y={ROW_Y + 22} className="bench-svg-mono" fill={physera ? "var(--bench-good-ink)" : "var(--bench-ink-3)"}>
                {b.label}
              </text>
              {b.lines.map((l, j) => (
                <text key={l} x={bx(i) + 12} y={ROW_Y + 48 + j * 18} fontSize="12" fill="var(--bench-ink)">
                  {l}
                </text>
              ))}
            </g>
          );
        })}

        {flow.map((label, i) => {
          const x1 = bx(i) + BOX_W;
          const x2 = bx(i + 1);
          return (
            <g key={label}>
              <line x1={x1} x2={x2 - 7} y1={mid} y2={mid} stroke="var(--bench-ink-2)" strokeWidth="1.5" />
              <path d={`M${x2},${mid} l-8,-4.5 v9 z`} fill="var(--bench-ink-2)" />
              <text x={(x1 + x2) / 2} y={mid - 10} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-3)">
                {label}
              </text>
            </g>
          );
        })}

        <path d={`M${cx(0)},${bottom} V${LOOP_Y} H${cx(1)}`} fill="none" stroke="var(--bench-good-ink)" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={(cx(0) + cx(1)) / 2} y={LOOP_Y + 20} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-3)">
          WHAT THEY LATER DID
        </text>

        <path d={`M${cx(3)},${bottom} V${LOOP_Y} H${cx(1)} V${bottom + 9}`} fill="none" stroke="var(--bench-good-ink)" strokeWidth="1.5" />
        <path d={`M${cx(1)},${bottom} l-4.5,9 h9 z`} fill="var(--bench-good-ink)" />
        <text x={cx(3) + 10} y={(bottom + LOOP_Y) / 2 + 4} className="bench-svg-mono" fill="var(--bench-ink-3)">
          PREDICTED
        </text>

        <rect x={scoreX} y={scoreY} width={scoreW} height={scoreH} fill="var(--bench-panel)" stroke="var(--bench-good-ink)" strokeWidth="1.5" />
        <text x={scoreX + scoreW / 2} y={scoreY + 20} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-good-ink)">
          SCORE
        </text>
        <text x={scoreX + scoreW / 2} y={scoreY + 38} textAnchor="middle" fontSize="12" fill="var(--bench-ink)">
          Did held-out real people do what
        </text>
        <text x={scoreX + scoreW / 2} y={scoreY + 54} textAnchor="middle" fontSize="12" fill="var(--bench-ink)">
          the simulation said they would?
        </text>
        <text x={cx(1) - 10} y={(bottom + LOOP_Y) / 2 + 4} textAnchor="end" className="bench-svg-mono" fill="var(--bench-good-ink)">
          CORRECTS THE OBSERVER
        </text>
      </svg>
    </Figure>
  );
}
