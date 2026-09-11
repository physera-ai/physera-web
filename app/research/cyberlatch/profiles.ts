// Behavioural profiles for the Model Profiles section. Numbers are taken from
// data.ts (trials_18.json); the prose is editorial and should be re-read
// whenever the run set changes.

export type Profile = {
  key: string;
  effort: string;
  tagline: string;
  body: string[];
};

export const profiles: Profile[] = [
  {
    key: "claude-opus-5",
    effort: "max",
    tagline: "Finishes the widest range of repairs and rarely breaks what it touches.",
    body: [
      "Opus completed 11 of 18 tasks and recorded the highest mean score in the set. Its solved work spans a C JSON parser, a C interpolation bug, a Rust passkey broker, a connection pooler, a Java authorization service, four web services, and the malware triage. Across all 18 runs it failed only three functional checks, tied with GPT-5.5 for the fewest: when Opus hardens a route, the legitimate traffic on that route keeps working.",
      "Its misses are narrow. The credentials exercise passed 78 of 79 checks, the provenance gateway 85 of 86, the event store 13 of 14, and the administration workflow 18 of 20. The event-store miss is typical: Opus anchored its checkpoint to the background projector's position, so a checkpoint taken while the projector lagged could omit events that were already committed. Its lowest score, 88.4% on the intrusion analysis, came from a detection rule with stages that were not needed and a staged archive listed as a confirmed indicator.",
      "Opus is not fast. Its median run took 27 minutes and its longest 78, and the pooler repair alone cost $14.35. But no run looped or timed out, and the $97.53 total buys the most complete work in the table.",
    ],
  },
  {
    key: "deepseek-v4.1-flash",
    effort: "max",
    tagline: "Matches Astra's solved set at a seventh of the cost.",
    body: [
      "DeepSeek V4.1 Flash solved exactly the ten tasks GPT-6 Astra solved, for $12.17 in total, or $0.68 per task. It finished every systems task, including a 120-minute pooler repair that ran to 223 turns and 26 million input tokens, and it passed every check on the event store, the passkey broker, and the single-use authorization service. It was also the most verbose model in the set, producing 6.8 million output tokens over 18 runs.",
      "Its 93.0% mean is the fourth highest, and its two one-check misses were paperwork rather than code: the threat-intelligence service passed 27 of 28 with only the findings-and-plan contract failing, and the administration workflow missed only session invalidation.",
      "Investigation is the weak side. It solved none of the three analysis tasks and averaged 77% on them. On the intrusion analysis it misidentified the malware category, objective, and role in the first phase, and on the malware triage its phase-one evidence and phase-three remediation sections were incomplete. On the credentials exercise it also left nested provider secrets visible in detail views, exports, and diagnostics.",
    ],
  },
  {
    key: "gpt-6-astra",
    effort: "max",
    tagline: "Fast and decisive on systems code; careless with the workspace.",
    body: [
      "Astra completed ten tasks with a median run time of 15 minutes, the fastest of the top five. It was the only model besides DeepSeek V4.1 Flash to finish all four systems tasks, including the C JSON parser, which took it 140 minutes and $30.25, its longest and most expensive run.",
      "Its 89.5% mean is pulled down by a single zero. On the Python hardening task the agent wrote its own regression tests into the workspace and left them there; a preflight hygiene check rejected the submission before any of the 65 real checks ran. The run's rubric score, recorded separately, was 91%. Astra's other large miss was the provenance gateway, where it passed 65 of 86: the repair stopped both tenants' legitimate publishing while still accepting a staging credential for publish.",
      "Like DeepSeek V4.1 Flash it solved no investigation task. It passed 43 of 47 on the token-theft analysis and 62 of 69 on the intrusion analysis, missing the same ATT&CK mapping and staged-evidence checks as most of the field. Four of its runs were repeated after a Docker build deadlock stopped them before the agent started.",
    ],
  },
  {
    key: "claude-fable-5.1",
    effort: "max",
    tagline: "High partial scores everywhere; the most expensive route to nine.",
    body: [
      "Fable completed nine tasks and its 96.6% mean is the second highest in the set. Every one of its nine incomplete runs scored at least 87%, and four of them missed a single check: an access-control mechanism check on the PHP remediation, the request-body target on the credentials exercise, the findings schema on the pooler, and session invalidation on the administration workflow.",
      "It was one of three models, with Opus and GPT-5.5, to finish both the Python injection exercise and the malware triage. On the token-theft investigation it connected the victim, the application, and the attacker's address and proposed the right revocations, but left out two ATT&CK techniques and part of the sequence, passing 41 of 47.",
      "Fable was also the most expensive model at $217.58, and the most expensive run in the reported set is its C JSON repair: 1,024 turns over 82 minutes for $40.40, which passed every check. Its provenance gateway run cost $26.67 and 97 minutes, passed the behavioural checks, and then failed the findings-file checks because the phase files were missing. Four Fable runs that timed out or stalled were repeated; the reported set uses the latest rerun.",
    ],
  },
  {
    key: "gpt-5.6-sol",
    effort: "max",
    tagline: "Strong repairs, weak paperwork.",
    body: [
      "Sol completed nine tasks for $27.30, with a 94.6% mean and no run longer than 47 minutes. Its solved set covers the C JSON parser, the C interpolation bug, the event store, the passkey broker, the single-use authorization service, and four web services. It passed all 14 event-store checks where Opus and Grok passed 13.",
      "Four of its nine misses were one check short, and three of those were functional rather than security failures: on the provenance gateway its repair stopped an existing publishing workflow, on the Python task an audit receipt no longer replayed, and on the pooler the session service was still multiplexed. Sol recorded ten functional-check failures in total, the most among the five leading models, which is the signature of a repair that over-tightens.",
      "The other recurring gap is the report. On the administration workflow the code passed but the findings file failed three checks for coverage, schema, and CWE identifiers, leaving the run at 16 of 20. On the malware triage the run stopped at 8 of 10 with the evidence and remediation sections incomplete.",
    ],
  },
  {
    key: "glm-5.3-flash",
    effort: "max",
    tagline: "Cheapest by far, and pays for it in wall-clock time.",
    body: [
      "GLM completed eight tasks for $2.72, or 15 cents per task, and its 91.4% mean is above Astra's. It was one of five models to finish the event store and one of five to repair the pooler, and it averaged 99% on the systems category.",
      "It is also the slowest model in the set. Its median run took 65 minutes, three runs reached the agent timeout, and the passkey repair ran for 220 minutes before finishing at 55 of 57. Two of the timeouts cost it complete results: the C JSON repair passed 14 of 15 with only the findings file missing, and the PHP remediation stopped at 12 of 16 because no findings.json had been written when the clock ran out.",
      "GLM recorded 14 functional-check failures, the most in the set. On the provenance gateway its repair broke legitimate publishing for both tenants while still accepting a staging credential for publish, and on the threat-intelligence service it broke both the trusted mirror's redirects and a rollup manifest snapshot.",
    ],
  },
  {
    key: "gpt-5.5",
    effort: "xhigh",
    tagline: "The only model to finish the token-theft investigation; brittle on systems code.",
    body: [
      "GPT-5.5 completed eight tasks and was alone in passing every check on the token-theft investigation. Its detection-and-response category is the best in the field at two of three solved, and it also finished the Python injection exercise and three web services.",
      "Systems code is where it falls over. It solved one of four systems tasks and averaged 61% on them. The C JSON repair took 93 minutes and $15.18 and passed 9 of 15, still crashing on unterminated strings, long numbers, and deep nesting. The event store passed 9 of 14 and the pooler 6 of 9.",
      "Its 81.4% mean also carries a recorded zero on the single-use authorization service. The verifier failed closed on that run; the underlying logs show 54%, with the agent rejecting freshly issued codes on their first use so that no replay test ever reached a successful request. Elsewhere its misses were small: 78 of 79 on the credentials exercise and 19 of 20 on the administration workflow.",
    ],
  },
  {
    key: "grok-4.6",
    effort: "xhigh",
    tagline: "Quick, cheap, and one of two models to finish the provenance gateway.",
    body: [
      "Grok completed seven tasks for $22.91 and never ran longer than 44 minutes. With Kimi it was one of only two models to pass all 86 checks on the provenance gateway, and it also repaired the pooler, the C JSON parser, the Python injection exercise, and three web services.",
      "Its near misses were code-level. The event store passed 13 of 14 with a method that copied a mutex by value, and the XML import passed 105 of 106 after a benign transform stopped working. On the threat-intelligence service it broke the trusted mirror's same-host redirects while closing the SSRF path.",
      "Authorization and investigation were weaker. The single-use authorization run is recorded as zero after the verifier failed closed; the logs show 68%, with the first request allowed and both replays accepted. It solved none of the three investigation tasks, passing 7 of 10 on the malware triage with incomplete evidence and remediation sections.",
    ],
  },
  {
    key: "kimi-k3",
    effort: "max",
    tagline: "The fastest model in the set, and the other one to finish the provenance gateway.",
    body: [
      "Kimi completed seven tasks with a median run of under 11 minutes, the shortest in the field. It was one of two models to pass all 86 provenance-gateway checks, and its access-control category is tied with Grok's for the strongest at two of three solved. It also finished the C JSON parser, the PHP remediation, the malware triage, and two more web services.",
      "Its one-check misses were both about the submission rather than the fix: the Python task passed 64 of 65 with a required artifact missing, and the threat-intelligence service passed 27 of 28 with a batch gate that trusted claimed metadata instead of the actual payload size.",
      "Authentication is the weak category at 65%. The single-use authorization run is recorded as zero after the verifier failed closed, with the logs showing both replays accepted. The administration workflow passed 15 of 20, leaving unsafe YAML, a symlink escape, and stale sessions unaddressed. The pooler was its most expensive run, $17.47 over 83 minutes and 326 turns, and still finished at 7 of 9.",
    ],
  },
  {
    key: "gemini-3.8-flash",
    effort: "high",
    tagline: "Nearly everything passes; something always remains.",
    body: [
      "Gemini completed six tasks and averaged 90.8%, close to GLM's mean with two fewer solves. No run took longer than 24 minutes, and it took the most steps per run of any model, with a median of 97 turns. It was the only model to finish the threat-intelligence service repair, and it also solved the C JSON parser, the XML import, the passkey broker, the single-use authorization service, and the partner portal.",
      "Three runs missed a single check: the PHP remediation lacked an access-control mechanism the verifier looked for, the provenance gateway still let project policy override vault ownership, and the pooler's session service stayed multiplexed. It was also the only model to miss the gateway integrity task, at 24 of 26.",
      "All 12 of its incomplete runs ended with a claim that the work was complete or fully verified. Its own checks tended to cover the main repair and skip the condition that later failed. Investigation was the weakest category at 79%, with the malware triage its lowest score at 64%.",
    ],
  },
  {
    key: "deepseek-v4-pro-0813",
    effort: "max",
    tagline: "Finds the main issue and leaves the rest of the surface open.",
    body: [
      "DeepSeek V4 Pro completed four tasks, all of them web services: the PHP remediation, the gateway integrity task, the XML import, and the partner portal. It solved none of the four systems tasks and none of the three investigations.",
      "It recorded 76 failed security checks across its 18 runs, the most in the set and well ahead of the next model at 47. The pattern is a repair that closes the reported path and misses adjacent ones. On the credentials exercise it timed out at 60 minutes with 40 of 79 checks passed, leaving the component-profile apply flag and reader mutations open. On the provenance gateway it passed 76 of 86, with the eight failures clustered around clone and cross-tenant publish attacks.",
      "Its single near miss was the malware triage at 9 of 10, where only the phase-one schema failed. The single-use authorization run is recorded as zero after the verifier failed closed; the logs show 68%, with both replay attempts accepted.",
    ],
  },
];
