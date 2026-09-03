import Figure from "./Figure";

const W = 920;
const H = 380;

type Box = { x: number; w: number; label: string; lines: string[]; tone?: "physera" | "frozen" };

const ROW_Y = 96;
const ROW_H = 118;

const boxes: Box[] = [
  { x: 24, w: 190, label: "REAL WORLD", lines: ["Transactions, claims,", "purchases, engagement.", "Ground truth, continuous."] },
  { x: 258, w: 210, label: "OBSERVER · PHYSERA", tone: "physera", lines: ["A smaller model learns what", "the actor needs to know about", "each person, and keeps it current."] },
  { x: 512, w: 200, label: "ACTOR · FROZEN", tone: "frozen", lines: ["Frontier model. Not trained", "by us. Sets the ceiling;", "the cheapest within it runs."] },
  { x: 756, w: 140, label: "OUTPUT", lines: ["Prediction,", "confidence,", "horizon."] },
];

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g stroke="var(--bench-ink-2)" fill="var(--bench-ink-2)">
      <line x1={x1} x2={x2 - 6} y1={y} y2={y} strokeWidth="1.5" />
      <path d={`M${x2},${y} l-8,-4.5 v9 z`} stroke="none" />
    </g>
  );
}

export default function CalibrationLoop() {
  const mid = ROW_Y + ROW_H / 2;
  const loopY = 300;
  const observer = boxes[1];
  const output = boxes[3];
  const real = boxes[0];
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
        <text x={24} y={40} className="bench-svg-mono" fill="var(--bench-ink-3)">THE CALIBRATION LOOP</text>
        <text x={24} y={60} className="bench-svg-mono" fill="var(--bench-ink)">EVERY SIMULATED PERSON IS BUILT FROM A REAL PERSON&apos;S OWN BEHAVIOR AND SCORED AGAINST WHAT THEY LATER DID</text>

        {boxes.map((b) => {
          const stroke = b.tone === "physera" ? "var(--bench-good-ink)" : b.tone === "frozen" ? "var(--bench-rule-2)" : "var(--bench-ink-2)";
          const fill = b.tone === "physera" ? "var(--bench-good-fill)" : "var(--bench-panel)";
          return (
            <g key={b.label}>
              <rect x={b.x} y={ROW_Y} width={b.w} height={ROW_H} fill={fill} stroke={stroke} strokeWidth={b.tone === "physera" ? 1.5 : 1} strokeDasharray={b.tone === "frozen" ? "4 3" : undefined} />
              <text x={b.x + 14} y={ROW_Y + 22} className="bench-svg-mono" fill={b.tone === "physera" ? "var(--bench-good-ink)" : "var(--bench-ink-3)"}>
                {b.label}
              </text>
              {b.lines.map((l, i) => (
                <text key={l} x={b.x + 14} y={ROW_Y + 50 + i * 18} fontSize="13" fill="var(--bench-ink)">
                  {l}
                </text>
              ))}
            </g>
          );
        })}

        {boxes.slice(0, -1).map((b, i) => (
          <Arrow key={b.label} x1={b.x + b.w} x2={boxes[i + 1].x} y={mid} />
        ))}
        <text x={(boxes[0].x + boxes[0].w + boxes[1].x) / 2} y={mid - 10} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-3)">WHAT THEY DID</text>
        <text x={(boxes[1].x + boxes[1].w + boxes[2].x) / 2} y={mid - 10} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-3)">CONDITIONS</text>
        <text x={(boxes[2].x + boxes[2].w + boxes[3].x) / 2} y={mid - 10} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-ink-3)">SAMPLES</text>

        {/* feedback loop */}
        <g fill="none" stroke="var(--bench-good-ink)" strokeWidth="1.5">
          <path d={`M${output.x + output.w / 2},${ROW_Y + ROW_H} V${loopY} H${observer.x + observer.w / 2} V${ROW_Y + ROW_H + 8}`} />
          <path d={`M${real.x + real.w / 2},${ROW_Y + ROW_H} V${loopY}`} strokeDasharray="4 3" />
        </g>
        <path d={`M${observer.x + observer.w / 2},${ROW_Y + ROW_H} l-4.5,8 h9 z`} fill="var(--bench-good-ink)" />
        <circle cx={real.x + real.w / 2} cy={loopY} r="3" fill="var(--bench-good-ink)" />

        <rect x={observer.x + observer.w / 2 + 40} y={loopY - 24} width={boxes[2].x + boxes[2].w - observer.x - observer.w / 2 - 80} height={48} fill="var(--bench-panel)" stroke="var(--bench-good-ink)" />
        <text x={(observer.x + observer.w / 2 + boxes[2].x + boxes[2].w) / 2 - 20} y={loopY - 5} textAnchor="middle" className="bench-svg-mono" fill="var(--bench-good-ink)">SCORE</text>
        <text x={(observer.x + observer.w / 2 + boxes[2].x + boxes[2].w) / 2 - 20} y={loopY + 12} textAnchor="middle" fontSize="12.5" fill="var(--bench-ink)">
          Did held-out real people do what the simulation said they would?
        </text>
        <text x={real.x + real.w / 2 + 10} y={loopY + 30} className="bench-svg-mono" fill="var(--bench-ink-3)">WHAT THEY LATER DID</text>
        <text x={output.x + output.w / 2 - 10} y={loopY + 30} textAnchor="end" className="bench-svg-mono" fill="var(--bench-ink-3)">ABSTAIN WHEN CONFIDENCE IS LOW</text>
      </svg>
    </Figure>
  );
}
