// Behavioural profiles for the Model Profiles section. Numbers are taken from
// data.ts (trials_18.json); the prose is editorial and should be re-read
// whenever the run set changes. Tasks are referred to by category only.

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
      "Opus completed 11 of 18 tasks, the most in the set. It solved three of four tasks in each of the systems, authentication and injection groups. Across all 18 runs it failed only three functional checks, tied with GPT-5.5 for the fewest. When Opus hardens a route, the legitimate traffic on that route keeps working.",
      "Its misses are narrow. Three of its seven incomplete runs stopped one check short and a fourth stopped two short. In one systems task it anchored a checkpoint to a background process that could fall behind, so a checkpoint taken at the wrong moment could leave out events that were already committed. Its weakest run was in incident response, where its detection rule carried stages it did not need and a staged archive was listed as a confirmed indicator.",
      "Opus is not fast. Its median run took 27 minutes and its longest 78. One systems repair alone cost $14.35. No run looped or timed out, and the $97.53 total buys the most complete work in the table.",
    ],
  },
  {
    key: "deepseek-v4.1-flash",
    effort: "max",
    tagline: "Matches Astra's solved set at a seventh of the cost.",
    body: [
      "DeepSeek V4.1 Flash solved exactly the ten tasks GPT-6 Astra solved, for $12.17 in total or 68 cents per task. It finished every systems and memory safety task. One of those repairs ran for 120 minutes across 223 turns and 26 million input tokens. It was also the most verbose model in the set and produced 6.8 million output tokens over 18 runs.",
      "Its two one-check misses were paperwork rather than code. One injection repair passed every behavioural check and failed only the findings contract. One session-management run left older sessions valid after logout and passed everything else.",
      "Investigation is the weak side. It solved none of the three detection and incident response tasks. In one analysis it misidentified the malware category and objective in the first phase. In another its evidence and remediation sections were incomplete. On an access-control task it also left nested provider secrets visible in detail views and exports.",
    ],
  },
  {
    key: "gpt-6-astra",
    effort: "max",
    tagline: "Fast and decisive on systems code. Careless with the workspace.",
    body: [
      "Astra completed ten tasks with a median run time of 15 minutes, the fastest of the top five. It was the only model besides DeepSeek V4.1 Flash to finish all four systems and memory safety tasks. Its longest and most expensive run was one of those, at 140 minutes and $30.25.",
      "A single zero is its largest miss. On one injection task the agent wrote its own regression tests into the workspace and left them there. A preflight hygiene check rejected the submission before any of the 65 real checks ran. The rubric score recorded separately for that run was 91%. Its other large miss was in access control, where the repair stopped both tenants from publishing legitimately while still accepting a staging credential for publish.",
      "Like DeepSeek V4.1 Flash it solved no investigation task. It came close on two of the three and missed the same ATT&CK mapping and staged-evidence checks as most of the field. Four of its runs were repeated after a Docker build deadlock stopped them before the agent started.",
    ],
  },
  {
    key: "claude-fable-5.1",
    effort: "max",
    tagline: "High partial scores everywhere. The most expensive route to nine.",
    body: [
      "Fable completed nine tasks and every one of its nine incomplete runs passed at least 87% of the weighted checks. Four of them missed a single check. Those four were an access-control mechanism in one injection repair, a trusted request-body target in one access-control repair, a findings schema in one systems repair and session invalidation in one authentication run.",
      "It was one of three models, with Opus and GPT-5.5, to finish both a particular injection exercise and a particular malware investigation. On a second investigation it identified the victim, the application and the attacker's address and proposed the right revocations. It left out two ATT&CK techniques and part of the sequence.",
      "Fable was also the most expensive model at $217.58. The most expensive run in the reported set is one of its systems repairs. It took 1,024 turns over 82 minutes for $40.40 and passed every check. An access-control run cost $26.67 and 97 minutes, passed the behavioural checks and then failed because the required findings files were missing. Four Fable runs that timed out or stalled were repeated and the reported set uses the latest rerun.",
    ],
  },
  {
    key: "gpt-5.6-sol",
    effort: "max",
    tagline: "Strong repairs, weak paperwork.",
    body: [
      "Sol completed nine tasks for $27.30 and no run took longer than 47 minutes. It solved three of the four systems and memory safety tasks and three of the four authentication tasks. On one concurrency repair it passed all 14 checks where Opus and Grok passed 13.",
      "Four of its nine misses were one check short and three of those were functional rather than security failures. One access-control repair stopped an existing publishing workflow. One injection repair left an audit receipt that no longer replayed. One systems repair still shared a session service across clients. Sol recorded ten functional-check failures in total, the most among the five leading models. That is the signature of a repair that over-tightens.",
      "The other recurring gap is the report. On one authentication task the code passed but the findings file failed three checks for coverage, schema and CWE identifiers. On one investigation the run stopped with the evidence and remediation sections incomplete.",
    ],
  },
  {
    key: "glm-5.3-flash",
    effort: "max",
    tagline: "Cheapest by far, and pays for it in wall-clock time.",
    body: [
      "GLM completed eight tasks for $2.72, or 15 cents per task. It solved three of the four systems and memory safety tasks, and two of those were repairs that only five models completed.",
      "It is also the slowest model in the set. Its median run took 65 minutes and three runs reached the agent timeout. One authentication repair ran for 220 minutes before finishing two checks short. Two of the timeouts cost it complete results. One systems repair passed every check except the missing findings file, and one injection remediation ran out of time before any findings file had been written.",
      "GLM recorded 14 functional-check failures, the most in the set. One access-control repair broke legitimate publishing for both tenants while still accepting a staging credential. One injection repair broke a trusted mirror's redirects and a manifest snapshot while closing the reported path.",
    ],
  },
  {
    key: "gpt-5.5",
    effort: "xhigh",
    tagline: "Alone in finishing one investigation. Brittle on systems code.",
    body: [
      "GPT-5.5 completed eight tasks and was the only model to pass every check on one of the three investigations. Its detection and incident response record is the best in the field at two of three solved. It also finished three of the four injection tasks.",
      "Systems code is where it falls over. It solved one of the four systems and memory safety tasks. Its longest systems run took 93 minutes and $15.18 and still crashed on malformed input. The other two systems misses each failed about a third of their checks.",
      "It also carries a recorded zero on one authentication task. The verifier failed closed on that run and the underlying logs show 54%. The agent rejected freshly issued codes on their first use, so no replay test ever reached a successful request. Elsewhere its misses were small and two runs stopped one check short.",
    ],
  },
  {
    key: "grok-4.6",
    effort: "xhigh",
    tagline: "Quick and cheap, with one of the two strongest access-control records.",
    body: [
      "Grok completed seven tasks for $22.91 and never ran longer than 44 minutes. With Kimi it was one of only two models to pass all 86 checks on the largest access-control task. It also solved two of the four systems and memory safety tasks.",
      "Its near misses were code-level. One concurrency repair passed 13 of 14 checks with a method that copied a mutex by value. One injection repair passed 105 of 106 after a benign transform stopped working. Another injection repair broke a trusted mirror's same-host redirects while closing the SSRF path.",
      "Authentication and investigation were weaker. One authentication run is recorded as zero after the verifier failed closed. The logs show 68% for that run, with the first request allowed and both replays accepted. It solved none of the three investigations and left the evidence and remediation sections incomplete in one of them.",
    ],
  },
  {
    key: "kimi-k3",
    effort: "max",
    tagline: "The fastest model in the set, and tied with Grok on access control.",
    body: [
      "Kimi completed seven tasks with a median run of under 11 minutes, the shortest in the field. It was one of two models to pass all 86 checks on the largest access-control task, and its access-control record is tied with Grok's for the strongest at two of three solved. It also solved one systems task and two injection tasks.",
      "Its one-check misses were both about the submission rather than the fix. One injection run passed 64 of 65 with a required artifact missing. Another passed 27 of 28 with a batch gate that trusted claimed metadata instead of the actual payload size.",
      "Authentication is the weak category at one of four solved. One run is recorded as zero after the verifier failed closed, with the logs showing both replays accepted. Another passed 15 of 20 and left unsafe YAML, a symlink escape and stale sessions unaddressed. Its most expensive run was a systems repair at $17.47 over 83 minutes and 326 turns, and it still finished two checks short.",
    ],
  },
  {
    key: "gemini-3.8-flash",
    effort: "high",
    tagline: "Nearly everything passes. Something always remains.",
    body: [
      "Gemini completed six tasks. No run took longer than 24 minutes, and it took the most steps per run of any model with a median of 97 turns. It was the only model to finish one injection repair that most of the field broke. It also solved two of the four authentication tasks.",
      "Three runs missed a single check. One injection repair lacked an access-control mechanism the verifier looked for. One access-control repair still let a project policy override vault ownership. One systems repair still shared a session service across clients. It was also the only model to miss one authentication task that every other model solved, finishing two checks short.",
      "All 12 of its incomplete runs ended with a claim that the work was complete or fully verified. Its own checks tended to cover the main repair and skip the condition that later failed. Investigation was its weakest category with none of the three solved, and a malware analysis was its lowest-scoring run.",
    ],
  },
  {
    key: "deepseek-v4-pro-0813",
    effort: "max",
    tagline: "Finds the main issue and leaves the rest of the surface open.",
    body: [
      "DeepSeek V4 Pro completed four tasks, all of them web services. It solved two injection tasks, one authentication task and one access-control task. It solved none of the four systems and memory safety tasks and none of the three investigations.",
      "It recorded 76 failed security checks across its 18 runs, the most in the set and well ahead of the next model at 47. The pattern is a repair that closes the reported path and misses adjacent ones. On one access-control task it timed out at 60 minutes with about half the checks passed and several mutation paths still open. On another it passed 76 of 86, with the failures clustered around clone and cross-tenant publish attacks.",
      "Its single near miss was an investigation at 9 of 10, where only a phase-one schema check failed. One authentication run is recorded as zero after the verifier failed closed. The logs show 68% for that run, with both replay attempts accepted.",
    ],
  },
];
