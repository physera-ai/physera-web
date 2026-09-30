# CyberLatch — proposed rewrite

**Scope:** web page (`page.tsx`) prose. Proposed text only — no source files edited, nothing pushed. Applies the two decisions made (hedged saturation; scrub data.ts) and marks the open ones `[OPEN]`. Companion to `cyberlatch-review-arguments.md`.

---

## 1. Lede — add the reliability hook *(Argument 2)*

Current (page.tsx:104–109) stays as-is through "…harder to see in everyday work." Add one closing sentence:

> As we move into the era of RSI, every gain on a benchmark should tell us something concrete about how much useful work a model can do. Scores can remain low for months and then climb close to saturation after a single model release. Even new benchmarks can lose their ability to separate the leading models within a short time. The same pace of change is harder to see in everyday work. **What a model says it did is becoming as important as what it did: one leading model finished six of our 18 tasks and declared its work complete on all twelve of the others.**

That last clause is the Gemini finding (now at page.tsx:316–320). It earns the scroll and names no task.

---

## 2. Discussion — verdict first, then hedged prediction *(Arguments 1 + 5)*

Replace both current paragraphs (page.tsx:472–489) with three. The first imports the blog's verdict (the web currently has no summing-up); the second is the hedged forward look; the third keeps the Hugging Face point but drops the retelling (it already appears in Background, page.tsx:157–171).

> Across the 18 tasks, the models found security problems in unfamiliar code, wrote repairs, and reviewed incident evidence. They completed 89 of the 198 selected runs. The newest models moved the top of the table without changing its shape: DeepSeek V4.1 Flash and GPT-6 Astra finished the same ten tasks — one for $12.17, the other for $81.53 — and neither finished an investigation. Every model still left older administrator sessions alive after logout, and every model still reported a staged archive as a confirmed indicator.
>
> The gap between the solved and the unsolved work is where the forward look lives. The solved tasks may saturate within a release or two — the two newest models already reached the same ten at a sevenfold difference in cost. The investigation work has clear headroom: no model came within one check of the intrusion reconstruction. Capability is arriving first and cheapening fast; the part that lags is the part a defender most needs to trust.
>
> Real incidents already supply this evidence. The Hugging Face review described above is one example, and we expect the number of such incidents to rise. Benchmarking models in real-world situations is the only way forward.

Note what this does: keeps the direction of the original prediction, deletes the date, deletes "particularly impressed / unprecedented / we believe" (×5), deletes the duplicated HF narrative, and ends on stakes rather than self-promotion. The 1–2-month timing is dropped per the hedge decision.

---

## 3. Zero-bar chart — keep, add the contested-gold caption *(Argument 3)*

Keep the zero bar (page.tsx:326–330). Change the caption and add one prose sentence after line 345–347.

Caption alt/caption, currently "…The closest intrusion-reconstruction result passed 63 of 69 checks," becomes:

> "Three tasks have no complete solution. Of 11 models, five finished one check short on secret handling and four on session management; none finished the intrusion reconstruction, where the closest result passed 63 of 69 checks. On the intrusion reconstruction, 0 of 11 solved — either the hardest task in the set or a gold answer the models uniformly dispute; the disagreement is described below."

Prose sentence to add after "…even though both attempts to send it out had failed":

> "That all eleven models made the same call here is a signal about the task as much as about the models: whether a staged-but-not-exfiltrated archive counts as a confirmed indicator is a judgment call, and we note the disagreement rather than present the zero as a clean model failure."

This is the honest caption that converts the methodology critic's #4 attack into a credibility signal. `[OPEN]` — alternative is the fewest-failed-checks chart; keeping the zero bar is my recommendation but it was the morning's open question.

---

## 4. Evaluation notes — restore the rerun disclosure, fix "fixed evaluation" *(Argument 4b, 4c)*

**Add a "Reported set" note** (page.tsx:43–64, after "Task set"), ported from blog:186:

> **Reported set.** The reported set contains one run for every model and task, a fixed comparison of 198 attempts. Four GPT-6 Astra runs were repeated after a Docker build deadlock stopped them before the agent started. Four Claude Fable 5.1 runs that timed out or stalled in retry loops were repeated, and the latest rerun is reported; two of those reruns are solved. No other model's runs were repeated, including three GLM-5.3 Flash runs that reached the agent timeout. Estimating variation between attempts would require repeated trials for every model.

This removes the undisclosed-best-of-n attack surface. The web currently says "one attempt each" while concealing the reruns — the most damaging gap a reviewer could find.

**Fix the Scoring note** (page.tsx:54) — drop "fixed," which is contradicted by the hand-adjudicated zeros:

> ~~A final fixed evaluation determines whether a run is solved.~~ → **An automated checker determines whether a run is solved from recorded artifacts.**

And the Scoring caveats note (page.tsx:58): name the four records and exclude them from check aggregates `[OPEN — requires the data.ts recomputation in §5]`.

---

## 5. data.ts — the approved scrub *(Argument 4a)*

Not prose. The page claims "Task names and project labels are not shown" (page.tsx:62), but `data.ts` ships them verbatim:

- Task IDs: `nightglass-edge-intrusion-defensive`, `rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive` (a real CVE), and 16 more.
- Display names: `"nightglass intrusion (IR)"`, `"CVE-2024-27281 (Ruby SSRF)"` (data.ts:2872, 2879).
- Agent plan dumps, thousands of words (data.ts:2849+).

**Action:** aggregate per-task data server-side; strip task IDs, display names, and plan dumps from the shipped bundle; reference tasks by anonymized label only. This is the one *live* inconsistency — the prose and the shipped artifact currently contradict each other for anyone who opens dev tools. Approved; implement before the prose ships.

---

## 6. Blog/web convergence *(Argument 4d)* `[OPEN]`

The teammate's second pass landed only on the web. The blog still shows percentages the web stripped (98.73% at blog:110/149; solve-rate "61%/56%" at blog:116) and lacks the hedged ending. Two coherent end states:

- **Converge:** port the table, prose, notes, and ending changes into the blog HTML.
- **Split deliberately:** blog = narrative for practitioners, web = reference artifact — but the *data policy* (no partial scores, task names withheld) must be identical in both, or a reader who opens both finds the contradiction.

Either way, the shared walk-away sentence both versions should carry:

> "Frontier agents can do most of a defensive security task, but no model finished the hardest part, and 'almost done' is exactly where defenders get hurt."

---

## What this rewrite deliberately does *not* do

Parked from the arguments doc, not rejected: the full trajectory essay (pre-registering a saturation date, a Goodhart/expiry-date closing, the offense/defense-by-deployment paragraph). That's a bigger, separate piece — this rewrite hedges rather than leans in, per the decision. Cost-comparability and tie-breaker fixes are optional and unaddressed here.

---

## Summary of edits

| # | Where | Change | Decision |
|---|-------|--------|----------|
| 1 | Lede | +1 sentence, Gemini reliability hook | proposed |
| 2 | Discussion | replace 2 paras with 3: verdict → hedged prediction → HF pointer | **hedge decided** |
| 3 | Zero-bar chart | keep, + contested-gold caption + 1 prose sentence | `[OPEN]` |
| 4 | Eval notes | + "Reported set" rerun note; "fixed" → "automated checker" | proposed |
| 5 | data.ts | strip task IDs, display names, plan dumps | **scrub approved** |
| 6 | Blog | converge or split; same data policy either way | `[OPEN]` |
