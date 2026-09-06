export type Benchmark = {
  slug: string;
  name: string;
  category: string;
  access: "Proprietary" | "Open";
  updated: string;
  blurb: string;
  tags: string[];
  stats: { label: string; value: string }[];
  topModel: { org: string; name: string };
  spark: [number, number][];
  live: boolean;
};

export const CATEGORIES = [
  "Cyber",
  "Agents",
  "Efficiency",
  "Voice",
  "Simulation",
] as const;

export const benchmarks: Benchmark[] = [
  {
    slug: "cyberbench",
    name: "CyberBench",
    category: "Cyber",
    access: "Proprietary",
    updated: "Sep 2026",
    blurb:
      "Seven frontier agents remediate vulnerable services under one harness, one attempt each. Legitimate workflows must survive; the attacks must not.",
    tags: ["Cyber", "Coding agents", "Defensive", "Deterministic verifier"],
    stats: [
      { label: "Models", value: "7" },
      { label: "Tasks", value: "22" },
      { label: "Best solve", value: "55%" },
      { label: "Cost span", value: "40×" },
    ],
    topModel: { org: "Anthropic", name: "Claude Opus 5" },
    // [cost 0-1, solve 0-1] per model
    spark: [
      [0.96, 0.55],
      [0.94, 0.45],
      [0.02, 0.41],
      [0.31, 0.41],
      [0.26, 0.41],
      [0.34, 0.32],
      [0.19, 0.18],
    ],
    live: true,
  },
  {
    slug: "voice-arena",
    name: "Voice Arena",
    category: "Voice",
    access: "Open",
    updated: "May 2026",
    blurb:
      "Conversational voice systems scored on empathy, response quality, and latency across cascade and native architectures, with a delivery-versus-content decomposition.",
    tags: ["Voice", "Audio", "Empathy", "Cascade vs native"],
    stats: [
      { label: "Systems", value: "7" },
      { label: "Axes", value: "24" },
      { label: "Stimuli", value: "~100" },
      { label: "Tiers", value: "2" },
    ],
    topModel: { org: "Google", name: "Gemini TTS" },
    spark: [
      [0.55, 0.98],
      [0.09, 0.95],
      [0.10, 0.94],
      [0.20, 0.90],
      [0.20, 0.83],
      [0.95, 0.82],
      [1.0, 0.02],
    ],
    live: true,
  },
];

export const ALL_TAGS = Array.from(
  new Set(benchmarks.flatMap((b) => b.tags)),
).sort();
