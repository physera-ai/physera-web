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
    tagline: "Completes the widest range of repairs and usually keeps normal use working.",
    body: [
      "Opus completed 11 of 18 tasks, more than any other model. It solved three of four tasks in the systems group. It did the same in authentication and injection. Across 18 runs, it failed only three checks of normal operation. GPT-5.5 was the only model to match that result.",
      "Three of its seven incomplete runs stopped one check short. Another stopped two checks short. In one systems task, a checkpoint relied on a background process that could fall behind. In incident response, the detection rule included stages it did not need. The report also listed a staged archive as a confirmed sign of attack.",
      "Its median run took 27 minutes, and its longest took 78. One systems repair alone cost $14.35. No run looped or timed out. Its 18 runs cost $97.53 in total and completed more tasks than any other model.",
    ],
  },
  {
    key: "deepseek-v4.1-flash",
    effort: "max",
    tagline: "Completed the same ten tasks as Astra for one-seventh of the cost.",
    body: [
      "DeepSeek V4.1 Flash solved the same ten tasks as GPT-6 Astra. Its 18 runs cost $12.17 in total, or 68 cents per attempted task. It finished every systems and memory safety task. One of those repairs took 120 minutes, 223 turns and 26 million input tokens. It produced 6.8 million output tokens across all 18 runs, more than any other model.",
      "One injection repair passed every behavior check but failed the required findings format. One session run left older sessions active after logout and passed everything else.",
      "It solved none of the three detection and incident response tasks. In one analysis, it identified the wrong malware category and objective in the first phase. On an access control task, it also exposed nested provider secrets in detail views and exports.",
    ],
  },
  {
    key: "gpt-6-astra",
    effort: "max",
    tagline: "Fast on systems code. Careless with workspace files.",
    body: [
      "Astra completed ten tasks with a median run time of 15 minutes. That was the fastest time among the top five models. Only Astra and DeepSeek V4.1 Flash finished all four systems and memory safety tasks. Astra's longest and most expensive run was one of those. It took 140 minutes and cost $30.25.",
      "Astra did not solve any investigation tasks. Like most models, it missed checks on attack classification and staged evidence. Four runs were repeated because Docker builds froze before the agent started.",
    ],
  },
  {
    key: "claude-fable-5.1",
    effort: "max",
    tagline: "Four narrow misses, with the highest total cost.",
    body: [
      "Fable completed nine tasks. Four of its nine incomplete runs missed only one check. One injection repair lacked an access control safeguard. An access control repair trusted a target sent in the request body. A systems repair used the wrong findings format. An authentication run failed to close older sessions.",
      "Fable was one of three models to finish both a particular injection exercise and a particular malware investigation. Opus and GPT-5.5 were the other two. In a second investigation, Fable identified the victim, the application and the attacker's address. It also proposed the right ways to revoke access. The report left out two attack methods and part of the timeline.",
      "Fable was the most expensive model at $217.58. One of its systems repairs was the most expensive run in the set. It took 1,024 turns and 82 minutes, cost $40.40 and passed every check. An access control run took 97 minutes and cost $26.67. It passed the behavior checks but failed because the required findings files were missing. Four runs that timed out or stalled were repeated. The results use the latest rerun.",
    ],
  },
  {
    key: "gpt-5.6-sol",
    effort: "max",
    tagline: "Strong repairs. Reports remain a weak point.",
    body: [
      "Sol completed nine tasks for $27.30. No run took longer than 47 minutes. It solved three of four systems and memory safety tasks. It also solved three of four authentication tasks. On one repair involving simultaneous updates, Sol passed all 14 checks while Opus and Grok passed 13.",
      "Four of its nine misses were one check short. Three failed during normal use rather than on security. One access control repair stopped an existing publishing workflow. One injection repair produced an audit receipt that could no longer be replayed. One systems repair still shared a session service across clients. Sol failed ten checks of normal operation in total, the most among the five leading models.",
      "On one authentication task, the code passed but the findings file failed three checks. It lacked coverage, used the wrong format and omitted vulnerability codes. One investigation ended with incomplete evidence and recommended actions.",
    ],
  },
  {
    key: "glm-5.3-flash",
    effort: "max",
    tagline: "Lowest cost by far. Longest typical run time.",
    body: [
      "GLM completed eight tasks for $2.72, or 15 cents per task. It solved three of four systems and memory safety tasks. Two of those repairs were completed by only five models.",
      "GLM was also the slowest model in the set. Its median run took 65 minutes, and three runs reached the time limit. One authentication repair ran for 220 minutes before finishing two checks short. Two timeouts prevented otherwise complete results. One systems repair passed every check except for a missing findings file. An injection repair ran out of time before writing any findings file.",
      "GLM failed 14 checks of normal operation, the most in the set. One access control repair broke normal publishing for both tenants and still accepted a staging credential. One injection repair closed the reported path but broke redirects from a trusted mirror and a saved copy of the manifest.",
    ],
  },
  {
    key: "gpt-5.5",
    effort: "xhigh",
    tagline: "Best investigation results. Unreliable on systems code.",
    body: [
      "GPT-5.5 completed eight tasks. It was the only model to pass every check on one of the three investigations. It solved two of the three detection and incident response tasks, the best result in the set. It also finished three of four injection tasks.",
      "It solved one of four systems and memory safety tasks. Its longest systems run took 93 minutes and cost $15.18, yet it still crashed on malformed input. The other two systems misses each failed about one-third of their checks.",
      "The scoring system recorded one authentication task as zero. GPT-5.5 rejected new codes on their first use, so the checks for reused codes never reached a successful request. Two runs stopped one check short.",
    ],
  },
  {
    key: "grok-4.6",
    effort: "xhigh",
    tagline: "Quick and inexpensive, with one of the two best access control results.",
    body: [
      "Grok completed seven tasks for $22.91. No run took longer than 44 minutes. Grok and Kimi were the only models to pass all 86 checks on the largest access control task. Grok also solved two of four systems and memory safety tasks.",
      "One repair involving simultaneous updates passed 13 of 14 checks because a method copied a lock instead of sharing it. One injection repair passed 105 of 106 checks after a harmless data conversion stopped working. Another closed an unsafe server-request route but broke same-host redirects from a trusted mirror.",
      "The scoring system recorded one authentication run as zero. The first request worked, but Grok accepted both attempts to reuse it. It solved none of the three investigations. In one report, the evidence and recommended actions were incomplete.",
    ],
  },
  {
    key: "kimi-k3",
    effort: "max",
    tagline: "Fastest in the set. Tied with Grok on access control.",
    body: [
      "Kimi completed seven tasks with a median run of under 11 minutes, the shortest in the set. It was one of two models to pass all 86 checks on the largest access control task. Its access control result tied Grok for the best record at two of three solved. It also solved one systems task and two injection tasks.",
      "One injection run passed 64 of 65 checks but omitted a required file. Another passed 27 of 28 because a batch check trusted reported metadata instead of measuring the real payload size.",
      "Kimi solved one of four authentication tasks. The scoring system recorded one run as zero. Logs showed that both attempts to reuse a request were accepted. Another run passed 15 of 20 checks. It left unsafe configuration parsing, a linked path that could escape its folder and old sessions unaddressed. Its most expensive run was a systems repair. It cost $17.47 and took 83 minutes across 326 turns, yet still finished two checks short.",
    ],
  },
  {
    key: "gemini-3.8-flash",
    effort: "high",
    tagline: "Most checks pass, but every incomplete run leaves something unresolved.",
    body: [
      "Gemini completed six tasks. No run took longer than 24 minutes. It also used more agent turns per run than any other model, with a median of 97. Gemini was the only model to finish one injection repair that most models broke. It also solved two of four authentication tasks.",
      "Three runs missed one check. One injection repair lacked an access control safeguard that the checker expected. One access control repair still let a project policy overrule who owned the vault. One systems repair still shared a session service across clients. Gemini was also the only model to miss an authentication task that every other model solved. It finished that task two checks short.",
      "All 12 incomplete runs ended with a claim that the work was complete or fully checked. Gemini solved none of the three investigation tasks. A malware analysis was its lowest-scoring run.",
    ],
  },
  {
    key: "deepseek-v4-pro-0813",
    effort: "max",
    tagline: "Finds the main issue but misses related paths.",
    body: [
      "DeepSeek V4 Pro completed four tasks, all of them web services. It solved two injection tasks. It also solved one authentication task and one access control task. It solved none of the four systems and memory safety tasks or the three investigations.",
      "It failed 76 security checks across 18 runs, the most in the set. The next model failed 47. On one access control task, it reached the 60-minute limit with about half the checks passed. Several ways to change data were still open. On another task, it passed 76 of 86 checks. The remaining failures involved copying data and publishing across tenants.",
      "Its only near miss was an investigation that passed 9 of 10 checks. It failed only a format check in the first phase. The scoring system recorded one authentication run as zero. Both attempts to reuse a request were accepted.",
    ],
  },
];
