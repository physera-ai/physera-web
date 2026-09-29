# CyberLatch — the case for and against each change

**Status:** arguments only. Decisions so far: saturation **hedged** (direction stays, date goes); **scrub data.ts** approved. All other prose decisions open. Nothing pushed.

**Sources read in full:** blog `cybersec-report.html` (lines 85–193), web `page.tsx` (84–508), `data.ts`, `profiles.ts`.

---

## The one thing three independent critics agreed on

The piece opens with its strongest claim and never cashes it out. The lede (blog:86, page.tsx:104–109):

> "As we move into the era of RSI… Scores can remain low for months and then climb close to saturation after a single model release. Even new benchmarks can lose their ability to separate the leading models within a short time."

Then both versions become a leaderboard writeup. The trajectory argument — the superintelligence point — is set up and abandoned. Every change below either cashes it out, or stops the piece getting destroyed for trying.

---

## Argument 1 — The saturation claim: hedge it down *(decided)*

**Current (web only, page.tsx:472–478):**
> "Our team was particularly impressed by the latest model from DeepSeek… The pace of model improvement is unprecedented, and we believe models released in the next 1-2 months may be able to saturate our benchmark. Our team is actively working towards creating difficult problems and more benchmarks for future releases."

The blog has **no** saturation claim at all — its closing section (179–181) never mentions timing.

**For keeping a version of it.** It's the most essay-worthy fact in the piece: a public, dated prediction from a benchmarking shop. It's also already true in the data — the two newest models solved the *identical ten tasks*, one for $12.17, the other for $81.53. That's "capability arrives, then cost collapses" in one table row.

**Against the current wording.** Three independent problems:
- *Methodology:* it's contradicted by the page itself. Top model is 11/18; detection/incident-response is 0/3 for both top models; one task family has zero solutions. A reviewer kills "saturate in 1–2 months" in one tweet.
- *Editorial:* after ~4,000 words of hedged, evidence-first prose, this is vendor-deck voice — "particularly impressed," "unprecedented," three "we believe" in five sentences. Register break.
- *Strategic:* "our benchmark may saturate soon" tells the reader the thing they're reading is nearly disposable, right after the piece argued dependability matters. Self-defeating.

**Resolution (decided: hedge).** Keep the direction, drop the date, ground it in the piece's own data. Sketch:

> "DeepSeek V4.1 Flash matched GPT-6 Astra's ten tasks at one-seventh the cost — but the ten tasks, and the three investigations nobody finished, did not change. The solved tasks may saturate within a release or two. The investigation work has clear headroom, and that is the part a defender most needs to trust."

---

## Argument 2 — Promote the Gemini overconfidence finding

**Current:** buried as an H3 two-thirds down (blog:138–143; page.tsx:316–320).

**The finding:** all 12 of Gemini 3.8 Flash's incomplete runs ended with a claim that the work was complete or fully verified.

**For promoting it to both intros.** The most publishable sentence in either document — a named model whose self-reported confidence is perfectly anticorrelated with its result. It's the alignment hook: capability scaling faster than self-assessment, and "the agent says it's done" is exactly the failure mode that breaks delegation at higher autonomy. It also answers the "you stripped task descriptions for safety" critique — a *reliability* result, not tradecraft. Survives the safety-stripping because it names no task.

**Against.** Singles out one model by name in the lede, which reads pointed. And it's a behavioral claim resting on verifier output — a hostile reviewer asks "how was 'claimed complete' coded?" (Covered by the scoring note: "descriptions are based on checker output and saved reviews.")

**Sketch (one sentence after the design-philosophy block in each):**
> "One leading model finished six of our 18 tasks and declared its work complete on all twelve of the others."

---

## Argument 3 — The zero-bar chart and the 11/11 shared failures cut both ways

**Current:** intrusion reconstruction shows a zero bar; prose (page.tsx:345–347) says every model listed a staged archive among confirmed indicators even though both attempts to send it out had failed.

**The methodology warning.** When 11/11 frontier agents make the *identical* mistake, that's evidence about the **task's gold answer**, not the models. "Staged but not exfiltrated ⇒ not a confirmed IOC" is one side of a judgment call. A zero bar over a contested gold is an attack surface — the checker encodes a contested judgment presented as model failure.

**Option A — keep the zero bar with a caption.** Honest, and the most striking visual in the piece. Caption: *"0/11 solved — either the hardest task or a mis-specified gold; the disagreement is described below."* Converts a liability into a credibility signal; report inter-model agreement on the specific failed check as a task-validity signal.

**Option B — fewest-failed-checks (the alternative).** Sidesteps the contested-gold problem, but loses the punch and discards real information (nobody finished it).

**Recommendation:** keep the zero bar, add the caption. Resolves the carry-over question.

---

## Argument 4 — The credibility asymmetries (the approved scrub, plus two stowaways)

**(a) data.ts ships what the prose says it doesn't — APPROVED.** The page claims "Task names and project labels are not shown" (page.tsx:62). But `data.ts` ships verbatim task IDs — `nightglass-edge-intrusion-defensive`, `rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive` (a real CVE) — and multi-thousand-word agent plan dumps (data.ts:2849+). Opening dev tools defeats the confidentiality claim. **Fix:** aggregate per-task data server-side, strip task IDs and plan dumps from the shipped bundle. Code/data change, not prose.

**(b) The rerun disclosure exists only in the blog.** Blog note "Reported set" (blog:186) discloses: four Astra runs repeated after a Docker deadlock, four Fable runs repeated, latest rerun reported, two of those reruns solved. The web notes (page.tsx:43–64) **omit this**. Meanwhile the web says "one attempt each / 198 evaluations… one selected run for each model-task pair." An undisclosed best-of-n is the most damaging thing a reviewer can surface. **Fix:** port the "Reported set" note into the web notes, state the selection rule verbatim.

**(c) "Fixed evaluation" contradicts the hand-adjudicated zeros.** Scoring note (page.tsx:54): "A final fixed evaluation determines whether a run is solved." Scoring caveats (page.tsx:58) then admits four final records are zero though test logs show checks passed — and data.ts shows those zero records carry `n:1` denominators that don't match the task's real check count (n=65). Those poison the check aggregates feeding radar/profiles. **Fix:** drop "fixed," name the four records, recompute check aggregates excluding preflight-zero artifacts.

**(d) Blog/web convergence (carry-over).** The teammate's second pass landed only on the web. The blog still shows percentages the web stripped (98.73% at blog:110/149; solve-rate column "61%/56%" at blog:116) and keeps the rerun note the web lacks. The two versions now contradict each other's data policy. Decide: converge, or deliberately split audiences (blog = narrative for practitioners, web = reference artifact) — but the *data policy* must be identical across both.

---

## Argument 5 — The "moved the top without changing its shape" verdict is the web's missing thesis

**Current:** the blog ends on a verdict (blog:180) — 89/198 completed, "the newest models moved the top of the table without changing its shape," two universal failures named. The web has **no summing-up at all** — it jumps cost analysis → profiles → the prediction.

**For importing the blog's verdict into the web as the Discussion's first paragraph.** The web's walk-away sentence is currently the weaker, self-defeating one (a prediction). The blog's is a verdict. The web should end verdict → prediction, not prediction alone. With Argument 1's hedge, that's exactly the structure.

**Against.** Slight redundancy with the unsolved-tasks bullets already on the web. Manageable — the verdict paragraph *names* the two universal failures, the bullets *detail* them.

**Shared walk-away sentence (both versions):**
> "Frontier agents can do most of a defensive security task, but no model finished the hardest part, and 'almost done' is exactly where defenders get hurt."

Today only the blog says it.

---

## Deferred (not decided)

1. **Rewrite execution** — arguments ratified first; prose pass to follow on approval.
2. **Cost-comparability** — effort tiers differ per model; GLM's $2.72 partly reflects timeouts. Optional: cost-per-solved with timeout counts, or a one-line caveat.
3. **Solved-count tie-breakers** — DeepSeek/Astra tie at 10/18 with different check quality; publish near-miss counts as tie-breakers. Optional.
4. **The bigger trajectory essay** (pre-registration, Goodhart/expiry-date closing, offense/defense-by-deployment paragraph) — larger than the chosen hedge. Parked, not rejected; possibly a separate longer piece this post points to.
