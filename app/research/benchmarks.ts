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
  thumb?: { task: string };
};

export const CATEGORIES = [
  "Agents",
] as const;

export const benchmarks: Benchmark[] = [
  {
    slug: "animation",
    name: "Animation Bench",
    category: "Agents",
    access: "Open",
    updated: "Sep 2026",
    blurb:
      "Animation Bench evaluates four frontier coding agents across 48 production web-animation reconstruction tasks. Given 12–24 timestamped frames and a HAR capture, each agent produces a self-contained HTML artifact scored frame by frame for visual similarity, motion consistency, and layout correctness.",
    tags: ["Agents", "Coding agents", "Animation", "Visual evaluation"],
    stats: [
      { label: "Models", value: "4" },
      { label: "Tasks", value: "48" },
      { label: "Sites", value: "32" },
      { label: "Reconstructions", value: "192" },
      { label: "Top mean", value: "0.594" },
    ],
    topModel: { org: "OpenAI", name: "GPT-6 Astra" },
    // [recorded 48-task generation cost normalized to $3.9, 48-task reproduction score]
    spark: [[0.78, 0.594], [1.0, 0.548], [0.29, 0.507], [0.12, 0.516]],
    thumb: { task: "neutomni-process-rolling-shape" },
    live: true,
  },
];

export const ALL_TAGS = Array.from(
  new Set(benchmarks.flatMap((b) => b.tags)),
).sort();
