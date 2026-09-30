// Behavioural profiles for the Model Profiles section. Numbers are taken from
// data.ts; the prose is editorial (trajectory audit in
// animation-bench/docs/reviews/2026-09-14-overnight-status.md) and should be
// re-read whenever the run set changes. TODO: final prose pass once the thesis is written.

export type Profile = {
  key: string;
  tagline: string;
  body: string[];
};

export const profiles: Profile[] = [
  {
    key: "claude-opus-5",
    tagline: "Wins 13 of 15. Strongest on autoplay entrances and the two gesture tasks; scroll-linked motion is where it drops.",
    body: [
      "Opus scored a mean of 0.727 across the 15 tasks and produced the best reproduction on 13 of them. Five tasks scored above 0.8: berd (0.925), altitude101 loading (0.900), maxima part 1 (0.853), dialkit (0.838) and benxrun (0.812). Visual similarity is its strongest dimension at 0.821; interaction fidelity is its weakest at 0.597.",
      "Its four lowest scores are scroll-driven windows: altitude101 words (0.480), ciao text dancing (0.483), charmling (0.523) and driftime (0.593). On those the page looks right but the motion does not track the scroll position the way the reference does. The fifth, basement (0.627), is a WebGL scene.",
      "It ran on the lean native computer-use agent with a 300-step cap and a median of 127 steps per task. Total cost was $391.94, or $26.13 per task, priced from tokens at $5/$25 per million. Three runs on Harbor's stock agent are priced at the lean agent's measured $0.195 per step.",
    ],
  },
  {
    key: "deepseek-v4.1-flash",
    tagline: "One-thirteenth of Opus's cost. Reaches the step cap on most tasks and sometimes never writes a page.",
    body: [
      "DeepSeek V4.1 Flash scored a mean of 0.509 for $30.68 in total, or $2.05 per task, on the generic build-first agent at a 300-step cap. It edged Opus on charmling (0.525 vs 0.523) and came within 0.03 of it on berd and benxrun.",
      "It hit or approached the 300-step cap on 12 of 15 tasks, with a median of 294 steps. At effort high it still emits very long reasoning replies; on maxima part 2 it took one screenshot in 300 steps and re-analysed frames instead of building, scoring 0.154. Driftime (0.152) and cipher (0.239) also collapsed, with motion and interaction at zero.",
      "Its layout correctness (0.594) and visual similarity (0.628) hold up better than its motion (0.465) and interaction (0.330) scores, which is the pattern of a model that reproduces the still frame but not the animation.",
    ],
  },
  {
    key: "kimi-k3",
    tagline: "Fastest to finish and the only open-model win, but it accepts timing drift and its interaction fidelity is the lowest of the three.",
    body: [
      "Kimi K3 scored a mean of 0.483 at $7.64 per task on the same generic agent, capped at 200 steps. It produced the single best result on benxrun (0.899, ahead of both other models) and was second on cipher, ciao sideways and driftime.",
      "Its benxrun win is the one run in the set that verified with real scroll gestures against named reference frames (0.92 interaction, the highest any model reached on a scroll task). Elsewhere it verified through devtools about as often as the other two models did and accepted timing drift it had itself diagnosed ('the logo phase timing varies with headless load latency'); interaction fidelity is its weakest dimension at 0.288.",
      "It used the fewest steps of the three, a median of 107, but its cost per step is higher than DeepSeek's. Its most expensive run was maxima part 2 at $24.09 over 255 steps for a 0.405.",
    ],
  },
];
