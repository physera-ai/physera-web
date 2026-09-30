// Animation Bench, first 15 tasks, three models (Sept 2026).
// Source of truth (animation-bench repo, read-only):
//   - docs/reviews/2026-09-14-overnight-status.md, sections "Update 2026-09-15 00:20" (costs)
//     and "Final — 2026-09-15 10:00" (best clean run per task, fixed scorer).
//   - results/scores/<task>__<model>__<agent>__<trial>.json (dimensions.*.score, weights, frame_count).
//   - results/runs/<run>/result.json (steps, cost_usd). Opus is priced from tokens at $5/$25 per M;
//     DeepSeek and Kimi costs are OpenRouter-reported. Three Opus runs (ciaoenergy text dancing,
//     kavieng, maxima part 2) ran on Harbor's stock agent and are priced at the lean agent's measured
//     $0.195/step (cost_estimated: true), which is how the status doc arrives at ~$26/task.
//   - docs/reviews/2026-09-13-task-selection.md section A rows 1-15 (site, animation start→end);
//     trigger from harbor_tasks/<task>/task.toml tags.
// Regenerate by re-running the extraction against those files — do not hand-edit numbers.

export type Dim = "visual_similarity" | "motion_consistency" | "interaction_fidelity" | "layout_correctness";

export const DIMS: { key: Dim; label: string; short: string }[] = [
  { key: "visual_similarity", label: "Visual similarity", short: "Visual" },
  { key: "motion_consistency", label: "Motion consistency", short: "Motion" },
  { key: "interaction_fidelity", label: "Interaction fidelity", short: "Interaction" },
  { key: "layout_correctness", label: "Layout correctness", short: "Layout" },
];

export type Trigger = "autoplay" | "scroll" | "gesture";

export const TRIGGERS: { key: Trigger; label: string }[] = [
  { key: "autoplay", label: "Autoplay" },
  { key: "scroll", label: "Scroll" },
  { key: "gesture", label: "Gesture" },
];

export type Task = {
  id: string;
  site: string;
  short: string;
  animation: string;
  trigger: Trigger;
  frames: number;
  weights: Record<Dim, number>;
};

export type TaskResult = {
  score: number;
  dims: Record<Dim, number>;
  cost: number;
  cost_estimated?: boolean;
  steps: number;
};

export type ModelRow = {
  key: string;
  label: string;
  org: string;
  agent: "anthropic-cua-lean" | "generic-cua";
  agent_label: string;
  step_cap: number;
  effort: string;
  mean: number;
  wins: number;
  cost_total: number;
  cost_per_task: number;
  median_steps: number;
  dims: Record<Dim, number>;
  by_trigger: Record<Trigger, number>;
  per_task: Record<string, TaskResult>;
};

export type BenchData = {
  models: ModelRow[];
  tasks: Task[];
};

export const bench: BenchData = {
 "models": [
  {
   "key": "claude-opus-5",
   "label": "Claude Opus 5",
   "org": "Anthropic",
   "agent": "anthropic-cua-lean",
   "agent_label": "Anthropic native computer use",
   "step_cap": 300,
   "effort": "no extended thinking",
   "mean": 0.727,
   "wins": 13,
   "cost_total": 391.94,
   "cost_per_task": 26.13,
   "median_steps": 127,
   "dims": {
    "visual_similarity": 0.821,
    "motion_consistency": 0.707,
    "interaction_fidelity": 0.597,
    "layout_correctness": 0.763
   },
   "by_trigger": {
    "autoplay": 0.802,
    "scroll": 0.611,
    "gesture": 0.813
   },
   "per_task": {
    "altitude101-loading-to-tubes": {
     "score": 0.9,
     "dims": {
      "visual_similarity": 0.839,
      "motion_consistency": 0.955,
      "interaction_fidelity": 0.994,
      "layout_correctness": 0.75
     },
     "cost": 42.02,
     "steps": 167
    },
    "altitude101-words-scroll-rates": {
     "score": 0.48,
     "dims": {
      "visual_similarity": 0.708,
      "motion_consistency": 0.413,
      "interaction_fidelity": 0.16,
      "layout_correctness": 0.548
     },
     "cost": 23.29,
     "steps": 115
    },
    "basement-studio-graffiti-hero": {
     "score": 0.627,
     "dims": {
      "visual_similarity": 0.633,
      "motion_consistency": 0.662,
      "interaction_fidelity": 0.38,
      "layout_correctness": 0.831
     },
     "cost": 49.88,
     "steps": 140
    },
    "berd-window-morphs-into-app": {
     "score": 0.925,
     "dims": {
      "visual_similarity": 0.957,
      "motion_consistency": 0.978,
      "interaction_fidelity": 0.97,
      "layout_correctness": 0.75
     },
     "cost": 3.24,
     "steps": 60
    },
    "benxrun-skyline-chapter-scroll": {
     "score": 0.812,
     "dims": {
      "visual_similarity": 0.985,
      "motion_consistency": 0.799,
      "interaction_fidelity": 0.435,
      "layout_correctness": 1.0
     },
     "cost": 5.06,
     "steps": 56
    },
    "charmling-99-charms-flythrough": {
     "score": 0.523,
     "dims": {
      "visual_similarity": 0.613,
      "motion_consistency": 0.612,
      "interaction_fidelity": 0.101,
      "layout_correctness": 0.63
     },
     "cost": 6.99,
     "steps": 68
    },
    "ciaoenergy-cans-fan-scroll-spin": {
     "score": 0.739,
     "dims": {
      "visual_similarity": 0.854,
      "motion_consistency": 0.568,
      "interaction_fidelity": 0.88,
      "layout_correctness": 0.851
     },
     "cost": 62.58,
     "steps": 266
    },
    "ciaoenergy-cans-sideways-selection": {
     "score": 0.775,
     "dims": {
      "visual_similarity": 0.834,
      "motion_consistency": 0.726,
      "interaction_fidelity": 0.725,
      "layout_correctness": 0.923
     },
     "cost": 15.7,
     "steps": 127
    },
    "ciaoenergy-text-dancing-scroll": {
     "score": 0.483,
     "dims": {
      "visual_similarity": 0.818,
      "motion_consistency": 0.34,
      "interaction_fidelity": 0.131,
      "layout_correctness": 0.533
     },
     "cost": 48.16,
     "steps": 247,
     "cost_estimated": true
    },
    "cipher-loader-stills-ring": {
     "score": 0.785,
     "dims": {
      "visual_similarity": 0.853,
      "motion_consistency": 0.631,
      "interaction_fidelity": 0.976,
      "layout_correctness": 0.999
     },
     "cost": 13.26,
     "steps": 79
    },
    "dialkit-dials-shape-headline": {
     "score": 0.838,
     "dims": {
      "visual_similarity": 0.956,
      "motion_consistency": 0.807,
      "interaction_fidelity": 0.693,
      "layout_correctness": 0.912
     },
     "cost": 27.26,
     "steps": 141
    },
    "driftime-2025-pinned-scroll-morph": {
     "score": 0.593,
     "dims": {
      "visual_similarity": 0.776,
      "motion_consistency": 0.577,
      "interaction_fidelity": 0.28,
      "layout_correctness": 0.546
     },
     "cost": 23.18,
     "steps": 152
    },
    "kavieng-cards-fly-to-grid-drag": {
     "score": 0.788,
     "dims": {
      "visual_similarity": 0.764,
      "motion_consistency": 0.797,
      "interaction_fidelity": 0.838,
      "layout_correctness": 0.742
     },
     "cost": 13.85,
     "steps": 71,
     "cost_estimated": true
    },
    "maxima-splash-curtain-whale-scene": {
     "score": 0.853,
     "dims": {
      "visual_similarity": 0.965,
      "motion_consistency": 0.97,
      "interaction_fidelity": 0.405,
      "layout_correctness": 0.677
     },
     "cost": 6.18,
     "steps": 71
    },
    "maxima-splash-curtain-whale-part2": {
     "score": 0.783,
     "dims": {
      "visual_similarity": 0.756,
      "motion_consistency": 0.765,
      "interaction_fidelity": 0.99,
      "layout_correctness": 0.759
     },
     "cost": 51.29,
     "steps": 263,
     "cost_estimated": true
    }
   }
  },
  {
   "key": "deepseek-v4.1-flash",
   "label": "DeepSeek V4.1 Flash",
   "org": "DeepSeek",
   "agent": "generic-cua",
   "agent_label": "Generic computer use via OpenRouter",
   "step_cap": 300,
   "effort": "high",
   "mean": 0.509,
   "wins": 1,
   "cost_total": 30.68,
   "cost_per_task": 2.05,
   "median_steps": 294,
   "dims": {
    "visual_similarity": 0.628,
    "motion_consistency": 0.465,
    "interaction_fidelity": 0.33,
    "layout_correctness": 0.594
   },
   "by_trigger": {
    "autoplay": 0.514,
    "scroll": 0.435,
    "gesture": 0.711
   },
   "per_task": {
    "altitude101-loading-to-tubes": {
     "score": 0.788,
     "dims": {
      "visual_similarity": 0.675,
      "motion_consistency": 0.88,
      "interaction_fidelity": 0.918,
      "layout_correctness": 0.669
     },
     "cost": 2.42,
     "steps": 300
    },
    "altitude101-words-scroll-rates": {
     "score": 0.395,
     "dims": {
      "visual_similarity": 0.706,
      "motion_consistency": 0.239,
      "interaction_fidelity": 0.033,
      "layout_correctness": 0.703
     },
     "cost": 2.12,
     "steps": 300
    },
    "basement-studio-graffiti-hero": {
     "score": 0.413,
     "dims": {
      "visual_similarity": 0.431,
      "motion_consistency": 0.335,
      "interaction_fidelity": 0.457,
      "layout_correctness": 0.751
     },
     "cost": 2.47,
     "steps": 251
    },
    "berd-window-morphs-into-app": {
     "score": 0.904,
     "dims": {
      "visual_similarity": 0.942,
      "motion_consistency": 0.942,
      "interaction_fidelity": 0.947,
      "layout_correctness": 0.75
     },
     "cost": 1.09,
     "steps": 220
    },
    "benxrun-skyline-chapter-scroll": {
     "score": 0.791,
     "dims": {
      "visual_similarity": 0.963,
      "motion_consistency": 0.792,
      "interaction_fidelity": 0.388,
      "layout_correctness": 0.957
     },
     "cost": 1.6,
     "steps": 283
    },
    "charmling-99-charms-flythrough": {
     "score": 0.525,
     "dims": {
      "visual_similarity": 0.61,
      "motion_consistency": 0.635,
      "interaction_fidelity": 0.114,
      "layout_correctness": 0.483
     },
     "cost": 1.69,
     "steps": 300
    },
    "ciaoenergy-cans-fan-scroll-spin": {
     "score": 0.409,
     "dims": {
      "visual_similarity": 0.485,
      "motion_consistency": 0.385,
      "interaction_fidelity": 0.204,
      "layout_correctness": 0.455
     },
     "cost": 2.28,
     "steps": 289
    },
    "ciaoenergy-cans-sideways-selection": {
     "score": 0.363,
     "dims": {
      "visual_similarity": 0.444,
      "motion_consistency": 0.394,
      "interaction_fidelity": 0.1,
      "layout_correctness": 0.459
     },
     "cost": 2.02,
     "steps": 300
    },
    "ciaoenergy-text-dancing-scroll": {
     "score": 0.387,
     "dims": {
      "visual_similarity": 0.557,
      "motion_consistency": 0.384,
      "interaction_fidelity": 0.043,
      "layout_correctness": 0.419
     },
     "cost": 2.38,
     "steps": 300
    },
    "cipher-loader-stills-ring": {
     "score": 0.239,
     "dims": {
      "visual_similarity": 0.489,
      "motion_consistency": 0.0,
      "interaction_fidelity": 0.0,
      "layout_correctness": 0.65
     },
     "cost": 2.41,
     "steps": 294
    },
    "dialkit-dials-shape-headline": {
     "score": 0.685,
     "dims": {
      "visual_similarity": 0.861,
      "motion_consistency": 0.655,
      "interaction_fidelity": 0.392,
      "layout_correctness": 0.891
     },
     "cost": 1.83,
     "steps": 300
    },
    "driftime-2025-pinned-scroll-morph": {
     "score": 0.152,
     "dims": {
      "visual_similarity": 0.329,
      "motion_consistency": 0.053,
      "interaction_fidelity": 0.0,
      "layout_correctness": 0.233
     },
     "cost": 1.22,
     "steps": 148
    },
    "kavieng-cards-fly-to-grid-drag": {
     "score": 0.736,
     "dims": {
      "visual_similarity": 0.726,
      "motion_consistency": 0.663,
      "interaction_fidelity": 0.788,
      "layout_correctness": 0.747
     },
     "cost": 1.25,
     "steps": 216
    },
    "maxima-splash-curtain-whale-scene": {
     "score": 0.692,
     "dims": {
      "visual_similarity": 0.85,
      "motion_consistency": 0.625,
      "interaction_fidelity": 0.569,
      "layout_correctness": 0.592
     },
     "cost": 3.23,
     "steps": 290
    },
    "maxima-splash-curtain-whale-part2": {
     "score": 0.154,
     "dims": {
      "visual_similarity": 0.355,
      "motion_consistency": 0.0,
      "interaction_fidelity": 0.0,
      "layout_correctness": 0.15
     },
     "cost": 2.67,
     "steps": 300
    }
   }
  },
  {
   "key": "kimi-k3",
   "label": "Kimi K3",
   "org": "Moonshot AI",
   "agent": "generic-cua",
   "agent_label": "Generic computer use via OpenRouter",
   "step_cap": 200,
   "effort": "high",
   "mean": 0.483,
   "wins": 1,
   "cost_total": 114.59,
   "cost_per_task": 7.64,
   "median_steps": 107,
   "dims": {
    "visual_similarity": 0.611,
    "motion_consistency": 0.453,
    "interaction_fidelity": 0.288,
    "layout_correctness": 0.574
   },
   "by_trigger": {
    "autoplay": 0.495,
    "scroll": 0.452,
    "gesture": 0.528
   },
   "per_task": {
    "altitude101-loading-to-tubes": {
     "score": 0.499,
     "dims": {
      "visual_similarity": 0.665,
      "motion_consistency": 0.331,
      "interaction_fidelity": 0.54,
      "layout_correctness": 0.426
     },
     "cost": 8.82,
     "steps": 200
    },
    "altitude101-words-scroll-rates": {
     "score": 0.346,
     "dims": {
      "visual_similarity": 0.592,
      "motion_consistency": 0.258,
      "interaction_fidelity": 0.032,
      "layout_correctness": 0.419
     },
     "cost": 3.56,
     "steps": 95
    },
    "basement-studio-graffiti-hero": {
     "score": 0.386,
     "dims": {
      "visual_similarity": 0.491,
      "motion_consistency": 0.303,
      "interaction_fidelity": 0.105,
      "layout_correctness": 0.789
     },
     "cost": 2.88,
     "steps": 44
    },
    "berd-window-morphs-into-app": {
     "score": 0.745,
     "dims": {
      "visual_similarity": 0.865,
      "motion_consistency": 0.613,
      "interaction_fidelity": 0.784,
      "layout_correctness": 0.75
     },
     "cost": 6.89,
     "steps": 107
    },
    "benxrun-skyline-chapter-scroll": {
     "score": 0.899,
     "dims": {
      "visual_similarity": 0.959,
      "motion_consistency": 0.837,
      "interaction_fidelity": 0.923,
      "layout_correctness": 0.903
     },
     "cost": 4.38,
     "steps": 59
    },
    "charmling-99-charms-flythrough": {
     "score": 0.187,
     "dims": {
      "visual_similarity": 0.406,
      "motion_consistency": 0.041,
      "interaction_fidelity": 0.013,
      "layout_correctness": 0.419
     },
     "cost": 3.52,
     "steps": 89
    },
    "ciaoenergy-cans-fan-scroll-spin": {
     "score": 0.399,
     "dims": {
      "visual_similarity": 0.415,
      "motion_consistency": 0.374,
      "interaction_fidelity": 0.291,
      "layout_correctness": 0.682
     },
     "cost": 5.12,
     "steps": 67
    },
    "ciaoenergy-cans-sideways-selection": {
     "score": 0.496,
     "dims": {
      "visual_similarity": 0.544,
      "motion_consistency": 0.512,
      "interaction_fidelity": 0.329,
      "layout_correctness": 0.593
     },
     "cost": 12.62,
     "steps": 200
    },
    "ciaoenergy-text-dancing-scroll": {
     "score": 0.402,
     "dims": {
      "visual_similarity": 0.61,
      "motion_consistency": 0.337,
      "interaction_fidelity": 0.136,
      "layout_correctness": 0.398
     },
     "cost": 7.15,
     "steps": 133
    },
    "cipher-loader-stills-ring": {
     "score": 0.467,
     "dims": {
      "visual_similarity": 0.558,
      "motion_consistency": 0.43,
      "interaction_fidelity": 0.131,
      "layout_correctness": 0.773
     },
     "cost": 8.02,
     "steps": 170
    },
    "dialkit-dials-shape-headline": {
     "score": 0.57,
     "dims": {
      "visual_similarity": 0.758,
      "motion_consistency": 0.828,
      "interaction_fidelity": 0.07,
      "layout_correctness": 0.778
     },
     "cost": 5.06,
     "steps": 75
    },
    "driftime-2025-pinned-scroll-morph": {
     "score": 0.384,
     "dims": {
      "visual_similarity": 0.455,
      "motion_consistency": 0.423,
      "interaction_fidelity": 0.177,
      "layout_correctness": 0.312
     },
     "cost": 11.53,
     "steps": 174
    },
    "kavieng-cards-fly-to-grid-drag": {
     "score": 0.487,
     "dims": {
      "visual_similarity": 0.632,
      "motion_consistency": 0.522,
      "interaction_fidelity": 0.209,
      "layout_correctness": 0.649
     },
     "cost": 2.79,
     "steps": 91
    },
    "maxima-splash-curtain-whale-scene": {
     "score": 0.567,
     "dims": {
      "visual_similarity": 0.7,
      "motion_consistency": 0.712,
      "interaction_fidelity": 0.21,
      "layout_correctness": 0.259
     },
     "cost": 8.16,
     "steps": 138
    },
    "maxima-splash-curtain-whale-part2": {
     "score": 0.405,
     "dims": {
      "visual_similarity": 0.513,
      "motion_consistency": 0.281,
      "interaction_fidelity": 0.363,
      "layout_correctness": 0.454
     },
     "cost": 24.09,
     "steps": 255
    }
   }
  }
 ],
 "tasks": [
  {
   "id": "altitude101-loading-to-tubes",
   "site": "altitude101.com",
   "short": "altitude101 loading",
   "animation": "Page load → the instant before the bars and blue circles begin dancing.",
   "trigger": "autoplay",
   "frames": 14,
   "weights": {
    "visual_similarity": 0.412,
    "motion_consistency": 0.412,
    "interaction_fidelity": 0.118,
    "layout_correctness": 0.059
   }
  },
  {
   "id": "altitude101-words-scroll-rates",
   "site": "altitude101.com",
   "short": "altitude101 words at rates",
   "animation": "Three words (IMMERSIVE → WHAT / WHERE / HOW) and the lower copy animate at different rates while scrolling.",
   "trigger": "scroll",
   "frames": 16,
   "weights": {
    "visual_similarity": 0.353,
    "motion_consistency": 0.412,
    "interaction_fidelity": 0.176,
    "layout_correctness": 0.059
   }
  },
  {
   "id": "basement-studio-graffiti-hero",
   "site": "basement.studio",
   "short": "basement graffiti hero",
   "animation": "WebGL 3D graffiti office: black → wireframe draws → lit room, stair movement.",
   "trigger": "autoplay",
   "frames": 24,
   "weights": {
    "visual_similarity": 0.412,
    "motion_consistency": 0.412,
    "interaction_fidelity": 0.118,
    "layout_correctness": 0.059
   }
  },
  {
   "id": "berd-window-morphs-into-app",
   "site": "berd.xyz",
   "short": "berd less chatting",
   "animation": "Opening text sequence from load → the line \"Less chatting, more doing.\"",
   "trigger": "autoplay",
   "frames": 14,
   "weights": {
    "visual_similarity": 0.35,
    "motion_consistency": 0.35,
    "interaction_fidelity": 0.1,
    "layout_correctness": 0.2
   }
  },
  {
   "id": "benxrun-skyline-chapter-scroll",
   "site": "benxrun.com",
   "short": "benxrun laptop to quote",
   "animation": "Laptop closes and darkens → the first two sentences of the quote.",
   "trigger": "scroll",
   "frames": 16,
   "weights": {
    "visual_similarity": 0.353,
    "motion_consistency": 0.412,
    "interaction_fidelity": 0.176,
    "layout_correctness": 0.059
   }
  },
  {
   "id": "charmling-99-charms-flythrough",
   "site": "charmling.app",
   "short": "charmling 99 charms",
   "animation": "Charms fly through the scene with the counter 0→99 → resolved fan and closing line.",
   "trigger": "scroll",
   "frames": 20,
   "weights": {
    "visual_similarity": 0.353,
    "motion_consistency": 0.412,
    "interaction_fidelity": 0.176,
    "layout_correctness": 0.059
   }
  },
  {
   "id": "ciaoenergy-cans-fan-scroll-spin",
   "site": "ciaoenergy.com",
   "short": "ciao bottle settles",
   "animation": "Page load → the can's starting position → the can settles in the centre of the screen.",
   "trigger": "autoplay",
   "frames": 14,
   "weights": {
    "visual_similarity": 0.412,
    "motion_consistency": 0.412,
    "interaction_fidelity": 0.118,
    "layout_correctness": 0.059
   }
  },
  {
   "id": "ciaoenergy-cans-sideways-selection",
   "site": "ciaoenergy.com",
   "short": "ciao cans sideways",
   "animation": "Product-selection section: cans move sideways as the flavour changes.",
   "trigger": "scroll",
   "frames": 12,
   "weights": {
    "visual_similarity": 0.353,
    "motion_consistency": 0.412,
    "interaction_fidelity": 0.176,
    "layout_correctness": 0.059
   }
  },
  {
   "id": "ciaoenergy-text-dancing-scroll",
   "site": "ciaoenergy.com",
   "short": "ciao text dancing",
   "animation": "Four text changes moving left and right while scrolling down.",
   "trigger": "scroll",
   "frames": 16,
   "weights": {
    "visual_similarity": 0.353,
    "motion_consistency": 0.412,
    "interaction_fidelity": 0.176,
    "layout_correctness": 0.059
   }
  },
  {
   "id": "cipher-loader-stills-ring",
   "site": "cipher.tv",
   "short": "cipher stills ring",
   "animation": "The rotating image carousel (stills in a ring), not the dot-grid loader.",
   "trigger": "autoplay",
   "frames": 20,
   "weights": {
    "visual_similarity": 0.412,
    "motion_consistency": 0.412,
    "interaction_fidelity": 0.118,
    "layout_correctness": 0.059
   }
  },
  {
   "id": "dialkit-dials-shape-headline",
   "site": "dialkit.dev",
   "short": "dialkit dials",
   "animation": "Click, hold and drag on the dials; the headline's weight and style change through the interaction.",
   "trigger": "gesture",
   "frames": 16,
   "weights": {
    "visual_similarity": 0.3,
    "motion_consistency": 0.2,
    "interaction_fidelity": 0.3,
    "layout_correctness": 0.2
   }
  },
  {
   "id": "driftime-2025-pinned-scroll-morph",
   "site": "2025.driftime.com",
   "short": "driftime white card",
   "animation": "From the moment the white card appears → the end of its transition.",
   "trigger": "scroll",
   "frames": 16,
   "weights": {
    "visual_similarity": 0.353,
    "motion_consistency": 0.412,
    "interaction_fidelity": 0.176,
    "layout_correctness": 0.059
   }
  },
  {
   "id": "kavieng-cards-fly-to-grid-drag",
   "site": "kaviengcreative.com",
   "short": "kavieng cards to grid",
   "animation": "Photos assemble into a grid on load.",
   "trigger": "gesture",
   "frames": 15,
   "weights": {
    "visual_similarity": 0.3,
    "motion_consistency": 0.2,
    "interaction_fidelity": 0.3,
    "layout_correctness": 0.2
   }
  },
  {
   "id": "maxima-splash-curtain-whale-scene",
   "site": "maximatherapy.com",
   "short": "maxima splash, part 1",
   "animation": "Tilted headline rotates level and the figures drop.",
   "trigger": "autoplay",
   "frames": 8,
   "weights": {
    "visual_similarity": 0.35,
    "motion_consistency": 0.35,
    "interaction_fidelity": 0.1,
    "layout_correctness": 0.2
   }
  },
  {
   "id": "maxima-splash-curtain-whale-part2",
   "site": "maximatherapy.com",
   "short": "maxima splash, part 2",
   "animation": "Blue curtain opens → whale scene with the kid bouncing.",
   "trigger": "autoplay",
   "frames": 16,
   "weights": {
    "visual_similarity": 0.35,
    "motion_consistency": 0.35,
    "interaction_fidelity": 0.1,
    "layout_correctness": 0.2
   }
  }
 ]
};

export const ORG_COLOR: Record<string, string> = {
  Anthropic: "#DA7756",
  DeepSeek: "#2F6FDB",
  "Moonshot AI": "#7B3FB8",
};
