import type { CSSProperties } from "react";

type IlloProps = { accent: string };

// Efficient Architectures — many inputs distilled into one compact module
function ArchitecturesIllo({ accent }: IlloProps) {
  const inputs = [24, 36, 48, 60, 72];
  return (
    <svg viewBox="0 0 160 96" fill="none" className="h-full w-auto">
      {/* static base edges */}
      {inputs.map((y, i) => (
        <line key={`b${i}`} x1="44" y1={y} x2="104" y2="48" stroke="#0d0d0d" strokeWidth="1.5" opacity="0.12" />
      ))}
      {/* animated overlay edges */}
      {inputs.map((y, i) => (
        <line
          key={`e${i}`}
          x1="44"
          y1={y}
          x2="104"
          y2="48"
          stroke="#0d0d0d"
          strokeWidth="1.5"
          opacity="0.55"
          pathLength={1}
          className="illo-trace"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
      {inputs.map((y, i) => (
        <rect key={`n${i}`} x="34" y={y - 4} width="8" height="8" rx="2" fill="#ffffff" stroke="#0d0d0d" strokeWidth="2" />
      ))}
      <rect x="104" y="36" width="24" height="24" rx="7" fill={accent} stroke="#0d0d0d" strokeWidth="2" className="illo-pulse" />
    </svg>
  );
}

// Multimodal Benchmarks — a rising score chart
function BenchmarksIllo({ accent }: IlloProps) {
  const pts = [
    [50, 62],
    [68, 52],
    [86, 56],
    [104, 42],
    [122, 30],
  ];
  const line = "50,62 68,52 86,56 104,42 122,30";
  return (
    <svg viewBox="0 0 160 96" fill="none" className="h-full w-auto">
      <line x1="40" y1="40" x2="126" y2="40" stroke="#0d0d0d" strokeWidth="1" opacity="0.12" />
      <line x1="40" y1="58" x2="126" y2="58" stroke="#0d0d0d" strokeWidth="1" opacity="0.12" />
      <polygon points="50,62 68,52 86,56 104,42 122,30 122,76 50,76" fill={accent} opacity="0.18" />
      <polyline points="40,20 40,76 126,76" fill="none" stroke="#0d0d0d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* static base + animated overlay */}
      <polyline points={line} fill="none" stroke="#0d0d0d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.12" />
      <polyline
        points={line}
        fill="none"
        stroke="#0d0d0d"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="illo-trace"
      />
      {pts.slice(0, 4).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#ffffff" stroke="#0d0d0d" strokeWidth="1.5" />
      ))}
      <circle cx="122" cy="30" r="4.5" fill={accent} stroke="#0d0d0d" strokeWidth="1.5" className="illo-pulse" />
    </svg>
  );
}

// Behavioural Simulation — a multi-agent network
function SimulationIllo({ accent }: IlloProps) {
  const nodes: [number, number, boolean][] = [
    [46, 42, false],
    [63, 26, true],
    [82, 40, false],
    [70, 58, false],
    [98, 30, false],
    [112, 48, true],
    [94, 66, false],
    [54, 66, false],
  ];
  const edges = [
    [46, 42, 63, 26],
    [63, 26, 82, 40],
    [82, 40, 98, 30],
    [98, 30, 112, 48],
    [82, 40, 70, 58],
    [70, 58, 94, 66],
    [112, 48, 94, 66],
    [46, 42, 54, 66],
    [54, 66, 70, 58],
    [70, 58, 98, 30],
  ];
  return (
    <svg viewBox="0 0 160 96" fill="none" className="h-full w-auto">
      {/* static base edges */}
      {edges.map(([x1, y1, x2, y2], i) => (
        <line key={`b${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0d0d0d" strokeWidth="1.5" opacity="0.12" />
      ))}
      {/* animated overlay edges */}
      {edges.map(([x1, y1, x2, y2], i) => (
        <line
          key={`e${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#0d0d0d"
          strokeWidth="1.5"
          opacity="0.5"
          pathLength={1}
          className="illo-trace"
          style={{ animationDelay: `${i * 0.14}s` }}
        />
      ))}
      {/* drifting nodes (drift < node radius so edges stay visually attached) */}
      {nodes.map(([cx, cy, on], i) => (
        <g key={i} className="illo-drift" style={{ animationDelay: `${-i * 0.9}s` } as CSSProperties}>
          <circle
            cx={cx}
            cy={cy}
            r="5"
            fill={on ? accent : "#ffffff"}
            stroke="#0d0d0d"
            strokeWidth="2"
            className={on ? "illo-pulse" : undefined}
            style={on ? ({ animationDelay: `${i * 0.4}s` } as CSSProperties) : undefined}
          />
        </g>
      ))}
    </svg>
  );
}

// RL Environments — a trajectory that lights up the visited grid cells in a loop
function EnvironmentsIllo({ accent }: IlloProps) {
  const cell = (r: number, c: number) => ({ x: 44 + c * 20, y: 20 + r * 22 });
  const grid = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const { x, y } = cell(r, c);
      grid.push(
        <rect key={`${r}-${c}`} x={x} y={y} width="14" height="14" rx="2.5" stroke="#0d0d0d" strokeWidth="1.5" opacity="0.3" />
      );
    }
  }
  const pathCells: [number, number][] = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 2],
    [2, 2],
    [2, 3],
  ];
  const line = "51,27 71,27 71,49 91,49 91,71 111,71";
  return (
    <svg viewBox="0 0 160 96" fill="none" className="h-full w-auto">
      {grid}
      {/* faint static route */}
      <polyline points={line} fill="none" stroke="#0d0d0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" strokeDasharray="2 3" />
      
      {/* visited cells light up in sequence as the path touches them */}
      {pathCells.map(([r, c], i) => {
        const { x, y } = cell(r, c);
        return (
          <rect
            key={`p${i}`}
            x={x}
            y={y}
            width="14"
            height="14"
            rx="2.5"
            fill={accent}
            className="illo-step"
            style={{ animationDelay: `${i * 0.14}s` } as CSSProperties}
          />
        );
      })}

      {/* solid animated overlay trajectory matching the blocks lighting up */}
      <polyline
        points={line}
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="illo-trace"
      />
      
      <circle cx="51" cy="27" r="3.5" fill="#0d0d0d" />
      <circle cx="111" cy="71" r="3.5" fill={accent} stroke="#0d0d0d" strokeWidth="1.5" className="illo-pulse" />
    </svg>
  );
}

const pillars = [
  {
    title: "RL Envs",
    body: "Specialized reinforcement-learning environments built for complex domain-specific tasks.",
    tint: "#e9f7f1",
    accent: "#aee5d2",
    Illo: EnvironmentsIllo,
  },
  {
    title: "Behavioral Simulations",
    body: "High-fidelity multi-agent systems that simulate human decision-making by pairing LLMs with predictive modelling.",
    tint: "#fbeaf0",
    accent: "#f4b8c7",
    Illo: SimulationIllo,
  },
  {
    title: "Multimodal Benchmarks",
    body: "A new class of commercially meaningful, taste-based benchmarks across hard tasks like UI, animation, and voice.",
    tint: "#eaf3fb",
    accent: "#abd4f2",
    Illo: BenchmarksIllo,
  },
  {
    title: "Efficient Architectures",
    body: "Token and compute-efficient research architectures, built for deployment under hard cost and latency constraints.",
    tint: "#f9f3df",
    accent: "#f2e6a6",
    Illo: ArchitecturesIllo,
  },
];

export default function CardsSection() {
  return (
    <section
      id="work"
      className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {pillars.map(({ title, body, tint, accent, Illo }) => (
        <article key={title} className="flex flex-col rounded bg-white p-2">
          <div
            className="flex h-[152px] items-center justify-center rounded p-4"
            style={{ backgroundColor: tint }}
          >
            <Illo accent={accent} />
          </div>
          <div className="mt-5 flex flex-1 flex-col gap-2 px-4 py-1 pb-6">
            <h3 className="text-[18px] font-medium leading-snug tracking-[-0.02em] text-[#0d0d0d]">
              {title}
            </h3>
            <p className="text-[14px] leading-relaxed text-[#656565]">{body}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
