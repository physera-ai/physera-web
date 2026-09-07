import type { Metadata } from "next";
import Link from "next/link";
import SectionNav, { type Section } from "./components/SectionNav";

export const metadata: Metadata = {
  title: "CyberLatch",
  description:
    "Seven frontier agents remediate vulnerable services under one harness, one attempt each. How much security work can an agent finish well enough for a defender to rely on the result?",
  alternates: { canonical: "/research/cyberbench" },
};

function Fig({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="bench-fig">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

const leaderboard = [
  { model: "Claude Opus 5", solved: "11/20", rate: "55%", score: "96.3%", cost: "$3,326.46", lead: true },
  { model: "GPT-5.5", solved: "8/20", rate: "40%", score: "81.9%", cost: "$86.81" },
  { model: "GLM-5.3 Flash", solved: "8/20", rate: "40%", score: "91.3%", cost: "$3.01" },
  { model: "Grok 4.6", solved: "7/20", rate: "35%", score: "87.6%", cost: "$27.39" },
  { model: "Kimi K3", solved: "7/20", rate: "35%", score: "85.2%", cost: "$32.72" },
  { model: "Gemini 3.8 Flash", solved: "6/20", rate: "30%", score: "91.2%", cost: "$34.77" },
  { model: "DeepSeek V4 Pro", solved: "4/20", rate: "20%", score: "80.3%", cost: "$17.58" },
];

const sections: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "methodology", label: "Methodology" },
  { id: "leaderboard", label: "How the models compare" },
  { id: "no-model-wins", label: "No model wins everywhere", sub: true },
  { id: "fell-short", label: "Where they fall short" },
  { id: "secure-repair", label: "Fixing without breaking", sub: true },
  { id: "final-report", label: "When the report overstates", sub: true },
  { id: "near-miss", label: "Not all near misses are equal", sub: true },
  { id: "cost", label: "Cost & speed" },
  { id: "means", label: "What this means" },
  { id: "notes", label: "Evaluation notes" },
];

export default function CyberBenchPage() {
  return (
    <main className="bench flex w-full max-w-[1320px] flex-1 flex-col px-3 py-1 sm:px-4">
      <article className="rounded bg-white px-5 py-14 sm:px-12 sm:py-16">
        <div className="mx-auto flex max-w-[1180px] flex-col">
          <Link href="/research" className="bench-mono-label bench-link w-fit">
            ← Research
          </Link>

          <header id="overview" className="mt-6 flex scroll-mt-24 flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="bench-pill bench-pill-tag">
                <i />
                Defensive set
              </span>
            </div>
            <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] leading-[1.05] tracking-[-0.03em] text-[#0d0d0d]">
              CyberLatch: evaluating AI agents on defensive security work
            </h1>
            <div className="bench-mono-label">Updated 8 September 2026 · v0.3</div>
            <p className="max-w-[760px] text-[17px] leading-relaxed text-[#3a3a3a]">
              AI agents are beginning to take on security work that reaches well beyond flagging suspicious code.
              In August,{" "}
              <a className="bench-link" href="https://learn.chatgpt.com/docs/whats-new">
                OpenAI expanded Daybreak
              </a>
              , its program for approved security researchers, to cover defensive work such as secure code review
              and incident response as well as authorized offensive assessments. Later that week, a{" "}
              <a className="bench-link" href="https://huggingface.co/blog/state-of-open-models-summer-2026">
                Hugging Face report on open models
              </a>{" "}
              revisited an incident from earlier in the year: an autonomous agent ran a sustained intrusion, and
              defenders used a second model to reconstruct what it did. These are very different uses of the same
              broad capability. They also raise a practical question. How much security work can an agent finish
              well enough for a defender to rely on the result?
            </p>
          </header>

          <div className="bench-article mt-10">
            <SectionNav sections={sections} />
            <div className="bench-article-body">
          <div className="bench-stats">
            <div>
              <div className="bench-mono-label">Models</div>
              <div className="v">7</div>
              <div className="k">evaluated with Terminus 2</div>
            </div>
            <div>
              <div className="bench-mono-label">Tasks</div>
              <div className="v">20</div>
              <div className="k">defensive security tasks</div>
            </div>
            <div>
              <div className="bench-mono-label">Partial credit</div>
              <div className="v">≥80%</div>
              <div className="k">of weighted checks passed by all seven models</div>
            </div>
            <div>
              <div className="bench-mono-label">Unsolved</div>
              <div className="v">5</div>
              <div className="k">tasks with no complete solution</div>
            </div>
          </div>
          <Fig
            src="/cyberlatch/cyberlatch-playback.gif"
            alt="Playback of a defensive repair being evaluated: the agent's fix is checked against the attacks it must stop and the workflows it must preserve."
            caption="One task, played back. An agent's repair is scored on both sides at once: the attack must stop, and the software people depend on must keep working."
          />
          <h2 id="methodology" className="bench-h2 scroll-mt-24">Methodology</h2>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            CyberLatch brings together 20 defensive security tasks to study a wider working process. Some begin
            with a scoped system that the agent must investigate and repair. Others ask it to make sense of
            incident evidence, write detection logic, or examine suspicious software. A patch must close the
            weakness without breaking the behavior people depend on. An investigation must lead to conclusions
            that the evidence can support. We evaluate the security result, the working software, and the required
            report or artifact together because a defender needs all of them before the work is complete.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            We ran seven models on all 20 tasks. The strongest model completed 11, just over half of the
            benchmark, while other models solved work that it missed. Five tasks had no complete solution from any
            model. The results show real progress, but the ranking is only the beginning of the story. The
            unfinished attempts reveal where an agent can recognize the right problem, make a plausible change, and
            still stop short of a result that a security team could use with confidence.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            All 140 evaluations were run using the harbor framework and Terminus 2 as the agent. Each of the seven
            models attempted the same 20 tasks. We used one fixed run for every model and task so that the
            comparison did not favor models with more attempts.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            We marked a task as solved only when the final deterministic evaluation passed in full. For code
            fixes, the tests checked whether the security issue was addressed without breaking expected behavior
            and whether the required outputs were present. For investigations, the submitted analysis was also
            checked against the evidence. This is why a run could make substantial progress and still be counted
            as incomplete.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            Partial scores show how much of an incomplete task the agent finished. Checks within a task can carry
            different weights, while each of the 20 tasks contributes equally to a model&apos;s overall average. A
            high partial score means that most checks passed. It does not mean the remaining failure is harmless.
          </p>
          <h2 id="leaderboard" className="bench-h2 scroll-mt-24">How the models compare</h2>
          <Fig
            src="/cyberlatch/01_leaderboard.png"
            alt="Opus solves 11 of 20 tasks; GPT-5.5 and GLM solve 8; Grok and Kimi solve 7; Gemini solves 6; DeepSeek solves 4. Mean recorded scores range from 80.3 to 96.3 percent."
            caption="Strict solves and mean recorded deterministic scores across the selected 20 tasks. The two measures answer different questions."
          />
          <div className="overflow-x-auto">
            <table className="bench-table my-6 max-w-[760px]">
              <thead>
                <tr>
                  <th>Model</th>
                  <th className="n">Solved</th>
                  <th className="n">Solve rate</th>
                  <th className="n">Mean recorded score</th>
                  <th className="n">Recorded API cost</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((r) => (
                  <tr key={r.model} className={r.lead ? "lead" : ""}>
                    <td className="whitespace-nowrap">{r.model}</td>
                    <td className="n">{r.solved}</td>
                    <td className="n">{r.rate}</td>
                    <td className="n">{r.score}</td>
                    <td className="n">{r.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            Claude Opus 5 completed 11 of the 20 tasks, three more than GPT-5.5 and GLM-5.3 Flash. Grok 4.6 and
            Kimi K3 completed seven each, followed by Gemini 3.8 Flash with six and DeepSeek V4 Pro with four.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            Opus led because of the range of work it completed. Its successful runs included memory-safety fixes,
            authentication, connection pooling, and malware triage. It also finished a difficult passkey
            implementation that only Gemini completed alongside it. Nine Opus runs still missed at least one
            required check, so even the leading model was inconsistent across the benchmark.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            The middle of the table is less orderly than the ranking suggests. GPT-5.5 and GLM both finished eight
            tasks, but only five of those successes were shared. Gemini completed fewer tasks than either of them,
            yet its mean partial score of 91.2% was almost identical to GLM&apos;s 91.3%. In several incomplete
            runs, Gemini passed most checks without reaching the strict threshold for a solve.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            Some of the clearest differences appeared on tasks that only one model finished. GPT-5.5 was the sole
            model to complete one incident investigation. GLM alone repaired a system that had to preserve
            consistent reads during concurrent updates. Gemini alone completed a separate application-hardening
            task. A single ranking misses those differences.
          </p>
          <h2 id="no-model-wins" className="bench-h2 scroll-mt-24">No model wins everywhere</h2>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            The leaderboard ranks the models, but it hides the more useful question: which model to reach for
            depends on the kind of work. Sorting the tasks into capability areas turns a single ranking into a map
            of what each model is suited to. Five areas produced three different leaders. Opus leads native and
            memory-safety work, access control, and authentication. Grok leads injection and untrusted input, the
            area the whole field handles best. GPT-5.5 leads detection and incident response. No single model
            covers the benchmark, and the spread suggests where each was trained hardest and where reinforcement
            is still needed. The areas are small buckets of three to five tasks each, so the leaders read as a
            signal of specialisation rather than a firm ranking. The leaders are stable across scoring choices; a
            few individual cells shift by one task depending on how borderline runs are counted.
          </p>
          <Fig
            src="/cyberlatch/08_category_leaders.png"
            alt="Tasks solved per capability area for each model, with the leader in each area outlined."
            caption="Tasks solved per capability area. The outlined cell is the leader in that area."
          />
          <Fig
            src="/cyberlatch/09_stack.png"
            alt="Solve rate by technology area: systems code, web and API, and no-code analysis."
            caption="Solve rate grouped by the kind of technology. Web and API work is uniform across the field; systems code and analysis are where models separate."
          />
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            Grouped by technology, the pattern sharpens. On web and API work every model lands near half solved:
            the field has genuinely learned to harden a web service. The differences between models live almost
            entirely in low-level systems code, where the average falls to about a quarter, and in no-code
            analysis, which is lower still. If the job is hardening a web app, the field is close and even a cheap
            model is a reasonable start. If it is auditing a network daemon in C, the choice narrows to one or two
            names.
          </p>
          <h2 id="fell-short" className="bench-h2 scroll-mt-24">Where they fall short</h2>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            Across the runs, agents often found the central flaw and produced a plausible patch, but applied the
            fix too narrowly. Secrets disappeared from one response and remained exposed through exports,
            diagnostics, or nested fields. Authorization checks covered the obvious endpoint but missed another
            route, while session changes fixed the current request but left older credentials valid. The problem
            was often not finding the weakness, but following it through the rest of the system.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            The investigation tasks showed a similar gap. Some reports treated evidence of preparation as proof
            that an action had succeeded. Some detection rules matched the activity without fully explaining why
            it was suspicious. The first interpretation could be reasonable while the final answer was still too
            imprecise to support an incident response.
          </p>
          <h2 id="secure-repair" className="bench-h2 scroll-mt-24">
            Fixing without breaking the app
          </h2>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            The same test logs exposed another problem with reading scores on their own. In one authorization
            workflow, a code had to grant access once and only once. We checked the first use, reuse on the same
            route, reuse on a second route, and a fresh attempt with a separately issued code. This showed whether
            a repair had closed the replay path without breaking legitimate access.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            The failures fell on opposite sides of that requirement. GPT-5.5 rejected every valid first use,
            including attempts made with two independently issued codes. Its replay checks stopped at the first
            request because there had been no successful use to replay. Kimi, DeepSeek, and Grok kept the initial
            flow working, but accepted the same code again on both routes. Opus, GLM, and Gemini were the only
            models to preserve the intended flow and enforce single use.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            These results would be easy to misread if we recorded only which replay checks failed. For GPT-5.5,
            the failure was a functional regression. For Kimi, DeepSeek, and Grok, it meant the replay weakness
            was still present. The verifier output gave us that distinction and made the scores more useful.
          </p>
          <h2 id="final-report" className="bench-h2 scroll-mt-24">When the report overstates the work</h2>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            The same gap between intermediate work and the final result appeared in an incident-response task. The
            agents had to triage a malware sample, write a behavioral detection rule, and reconstruct an intrusion
            from endpoint, network, identity, and email records. Much of the malicious activity was easy to spot.
            The harder question was which actions had actually completed.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            Opus provides the clearest example. Its working notes correctly recorded that an archive had been
            created locally after credentials were read. They also recorded that both attempts to send it out had
            failed. One was refused and the other was reset. The final report still listed the staged archive as a
            confirmed indicator.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            The detection rule exposed a second gap. Opus wrote a four-stage rule that caught every malicious
            bundle and ignored every benign one. Yet two or three of its selections could separate the corpus on
            their own. All seven models made the same mistake. Their rules looked multi-stage, but not every stage
            was doing necessary work.
          </p>
          <Fig
            src="/cyberlatch/05_shared_failures.png"
            alt="Seven models fail checks for repeated-key retrieval, session invalidation, and staged evidence; six fail a frame-termination check; five fail a nested-secret check."
            caption="Recurring failures in selected checks. A count of failed checks is not a count of independent vulnerabilities; several checks may exercise the same underlying defect."
          />
          <h2 id="near-miss" className="bench-h2 scroll-mt-24">
            Not all near misses are equal
          </h2>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            Fifteen of the 89 unsolved attempts missed exactly one final check. We call them near misses, but the
            count hides how different the remaining work can be.
          </p>
          <Fig
            src="/cyberlatch/07_near_misses.png"
            alt="Across 140 attempts, 51 are solved and 15 of the 89 unsolved attempts have exactly one failed check. Counts of one-check misses are Opus 3, GPT-5.5 2, GLM 1, Grok 2, Kimi 2, Gemini 4, and DeepSeek 1."
            caption="Fifteen submissions stopped one check short of a complete result."
          />
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            A repair to a Go event-processing service makes this clear. Writes were committed to a log while a
            background projector updated the read side. The repaired service had to keep both views consistent
            under load. Its checkpoints also had to cover every committed event, even when the projector was
            behind.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            Opus and Grok each passed 13 of the 14 checks, but for different reasons. Opus left the checkpoint tied
            to the lagging projection cursor, so it could omit events that were already committed. Grok fixed that
            path but retained a method that copied a mutex by value. GLM passed all 14 checks.
          </p>
          <h2 id="cost" className="bench-h2 scroll-mt-24">Cost &amp; speed analysis</h2>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            The near misses varied in cost as much as they did in the work left behind. GLM spent $3.01 across its
            20 selected attempts and matched GPT-5.5 with eight complete solutions. Opus recorded $3,326.46.
            Almost all of that came from one protocol-hardening run, which cost $3,214.29. The other 19 Opus
            attempts together cost $112.17.
          </p>
          <Fig
            src="/cyberlatch/10_cost_accuracy.png"
            alt="Cost against accuracy for each model. GLM-5.3 reaches 91% weighted accuracy for about three dollars; Opus buys the top accuracy at roughly thirty times the price; GPT-5.5 sits below the frontier."
            caption="Cost against weighted accuracy across the 20-task suite, with runaway loops excluded. Bubble size is tasks fully solved; the dashed line is the efficient frontier."
          />
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            One run showed how badly this can go. On a task it never solved, Claude Opus 5 spent close to four
            hours stuck in a single failure loop, retrying thousands of times and running up hundreds of millions
            of tokens before it broke free. Once unstuck, the actual repair, patch the files, rebuild, test
            against normal and hostile inputs, took about thirteen minutes. The lesson is not about one model. Any
            capable agent with no sense of when to quit will burn a lot of time and money on a task it cannot
            finish, so a budget ceiling is not optional.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            The other timing results were less extreme. Grok, Kimi, and Gemini had median execution times of about
            12 to 13 minutes. GPT-5.5 was near 15 minutes, Opus 31, DeepSeek 34, and GLM 65. GLM was the least
            expensive model here, but also the slowest by median execution time.
          </p>
          <Fig
            src="/cyberlatch/06_effort.png"
            alt="Median agent execution times in minutes are Opus 30.8, GPT-5.5 15.2, GLM 65.1, Grok 12.4, Kimi 12.5, Gemini 12.7, and DeepSeek 34.3."
            caption="Median agent execution time across the 20 selected attempts for each model."
          />
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            Four attempts reached the agent timeout, including three GLM runs and one DeepSeek run. The expensive
            Opus run did not. Its time and cost came from the retry loop and the failed terminal recovery rather
            than a recorded timeout.
          </p>
          <h2 id="means" className="bench-h2 scroll-mt-24">What this means for defenders</h2>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            Security work often leaves a team with more code, logs, and artifacts than people can review
            comfortably by hand. Across our 20 tasks, agents helped narrow that material by finding weaknesses,
            proposing repairs, and assembling incident evidence. This kind of assistance is already appearing in
            response work. After an agent escaped an{" "}
            <a className="bench-link" href="https://openai.com/index/hugging-face-model-evaluation-security-incident/">
              OpenAI evaluation sandbox
            </a>
            , Hugging Face ran a quantized GLM-5.2 locally to help decode staged payloads and trace exposed
            credentials across roughly 17,600 recorded actions. The model did not discover the original
            vulnerabilities or stop the intrusion, but it made a large body of evidence easier for the response
            team to examine.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            The 140 attempts also show why this work still needs verification. Agents completed 51 runs, while
            several incomplete runs found the central issue or made most of the required repair. Others missed
            connected paths, broke legitimate behavior, or turned a sound observation into a conclusion the
            evidence could not support. A model can help a team cover more ground, but its patch or report still
            has to stand on its own.
          </p>
          <p className="mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]">
            We would use these results to guide model selection and to decide where to spend review effort. Opus
            completes the most tasks here, while other models finish work it does not. None provides complete
            coverage of the benchmark. CyberLatch records both the completed work and the requirements left
            unresolved, so a team can judge the assistance it is getting against the defensive job it needs done.
          </p>
          <h2 id="notes" className="bench-h2 scroll-mt-24">Evaluation notes</h2>
          <dl className="bench-notes">
            <div className="bench-note">
              <dt>Agent &amp; settings</dt>
              <dd>
                We ran the evaluations with Terminus 2 as the agent and using the Harbor framework. The model
                settings were GPT-5.5 at xhigh effort, Kimi K3 at max, DeepSeek V4 Pro 0813 at max, Claude Opus 5
                at max, GLM-5.3 Flash at max, Gemini 3.8 Flash at high, and Grok 4.6 at xhigh.
              </dd>
            </div>
            <div className="bench-note">
              <dt>Reported set</dt>
              <dd>
                The reported set contains one run for every model and task, including designated reruns where
                applicable. These 140 attempts form a fixed comparison. Repeated trials would be needed to estimate
                variation between runs or production success rates.
              </dd>
            </div>
            <div className="bench-note">
              <dt>Scoring</dt>
              <dd>
                A run counts as solved only when its final deterministic evaluation passes in full. Partial scores
                come from the weighted checks within each task and are averaged across a model&apos;s 20 attempts.
                Separate judge assessments do not affect the leaderboard. Observations about model behavior come
                from verifier output and saved reviews.
              </dd>
            </div>
            <div className="bench-note">
              <dt>Scoring caveat</dt>
              <dd>
                One authorization exercise needs an extra note. Its final records assign zero to GPT-5.5, Kimi,
                DeepSeek, and Grok, while the underlying test logs show weighted results of 54%, 68%, 68%, and 68%.
                We use the recorded final zeros in the leaderboard and cost figures; the capability-area breakdown
                is computed from the full per-check logs. They lower the affected models&apos; partial-score
                averages but do not change their solve counts.
              </dd>
            </div>
            <div className="bench-note">
              <dt>Cost &amp; timing</dt>
              <dd>
                Costs cover model API usage only. They exclude infrastructure and separate judge calls. Execution
                times exclude environment setup and final verification. A near miss means exactly one failed check
                in the final deterministic record. Task names and identifying project labels are omitted, the
                model-overlap figure reports shared complete solutions without listing individual names of tasks.
              </dd>
            </div>
          </dl>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
