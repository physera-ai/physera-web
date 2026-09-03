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
      "Frontier coding agents patch vulnerable services under one harness, one attempt each. Legitimate workflows must survive; the attacks must not.",
    tags: ["Cyber", "Coding agents", "Defensive", "Deterministic verifier"],
    stats: [
      { label: "Models", value: "5" },
      { label: "Tasks", value: "14" },
      { label: "Checks", value: "567" },
      { label: "Harnesses", value: "2" },
    ],
    topModel: { org: "OpenAI", name: "GPT-5.5" },
    // [cost 0-1, solve 0-1] per model
    spark: [
      [0.21, 0.57],
      [0.71, 0.57],
      [0.06, 0.57],
      [0.03, 0.29],
      [0.17, 0.29],
      [0.06, 0.21],
    ],
    live: true,
  },
];

export const ALL_TAGS = Array.from(
  new Set(benchmarks.flatMap((b) => b.tags)),
).sort();
