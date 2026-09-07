import type { Metadata } from "next";
import Link from "next/link";
import SectionNav, { type Section } from "./components/SectionNav";

export const metadata: Metadata = {
  title: "CyberLatch",
  description:
    "Seven frontier agents on 20 defensive security tasks under one harness, one attempt each. How much security work can an agent finish well enough for a defender to rely on the result?",
  alternates: { canonical: "/research/cyberbench" },
};

const P = "mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]";

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

const notes = [
  {
    k: "Agent & settings",
    body: "All evaluations used Terminus 2 through the Harbor framework. We ran GPT-5.5 at xhigh effort. Kimi K3, DeepSeek V4 Pro 0813, Claude Opus 5, and GLM-5.3 Flash ran at max. Gemini 3.8 Flash ran at high and Grok 4.6 at xhigh.",
  },
  {
    k: "Reported set",
    body: "The reported set contains one run for every model and task, including the designated reruns. It is a fixed comparison of 140 attempts. Estimating variation between attempts or a production success rate would require repeated trials.",
  },
  {
    k: "Scoring",
    body: "The final deterministic evaluation decides whether a run is solved. Partial scores come from weighted checks within each task and are averaged over a model's 20 attempts. The leaderboard excludes separate judge assessments. The behavioral observations come from verifier output and saved reviews.",
  },
  {
    k: "Scoring caveat",
    body: "One authorization exercise has an unusual scoring record. The final records assign zero to GPT-5.5, Kimi, DeepSeek, and Grok. The underlying test logs show 54%, 68%, 68%, and 68%. We use the final recorded zeros throughout. They lower the partial score averages and leave the solve counts unchanged.",
  },
  {
    k: "Cost & timing",
    body: "Costs include model API usage only. Infrastructure and separate judge calls are excluded. Execution time leaves out environment setup and final verification. A near miss is a run with exactly one failed check. Task names and identifying project labels are omitted.",
  },
];

const sections: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "background", label: "Background" },
  { id: "complete-result", label: "Methodology" },
  { id: "leaderboard", label: "How the models compare" },
  { id: "no-model-wins", label: "No model wins everywhere", sub: true },
  { id: "unsolved", label: "Behaviours in unsolved tasks" },
  { id: "secure-repair", label: "A secure repair must still work", sub: true },
  { id: "final-report", label: "What gets lost in the report", sub: true },
  { id: "near-miss", label: "A near miss is not one thing", sub: true },
  { id: "cost", label: "Cost & speed analysis" },
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
              CyberLatch
            </h1>
            <div className="bench-mono-label">Updated 8 September 2026 · v0.3</div>
            <p className="max-w-[760px] text-[17px] leading-relaxed text-[#3a3a3a]">
              AI agents are starting to take on more security work. In August,{" "}
              <a className="bench-link" href="https://learn.chatgpt.com/docs/whats-new">
                OpenAI expanded Daybreak
              </a>{" "}
              with one track for code review and incident response and another for authorized security
              assessments. That same week, a{" "}
              <a className="bench-link" href="https://huggingface.co/blog/state-of-open-models-summer-2026">
                Hugging Face report on open models
              </a>{" "}
              returned to a July intrusion carried out by an autonomous agent. A second model helped the response
              team reconstruct what happened.
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
                  <div className="bench-mono-label">Attempts</div>
                  <div className="v">140</div>
                  <div className="k">selected model-task attempts</div>
                </div>
                <div>
                  <div className="bench-mono-label">Unsolved</div>
                  <div className="v">5</div>
                  <div className="k">tasks with no complete solution</div>
                </div>
              </div>

              <h2 id="background" className="bench-h2 scroll-mt-24">
                Background
              </h2>
              <p className={P}>
                Security benchmarks already test parts of this process.{" "}
                <a className="bench-link" href="https://github.com/iris-sast/cwe-bench-java">
                  CWE-Bench-Java
                </a>{" "}
                uses real Java vulnerabilities to test models and analysis tools.{" "}
                <a className="bench-link" href="https://www.vals.ai/benchmarks/cyber">
                  CyberBench
                </a>{" "}
                asks agents to reproduce fuzzing crashes or repair the vulnerable code while keeping the software
                working.{" "}
                <a className="bench-link" href="https://github.com/exploitbench/exploitbench">
                  ExploitBench
                </a>{" "}
                measures how far an agent gets through an exploitation chain.
              </p>
              <p className={P}>
                CyberLatch includes 20 defensive security tasks. In some tasks, the agent must investigate an
                unfamiliar system and repair a weakness. In others, it must examine incident evidence, write
                detection logic, or analyze suspicious software. A repair only passes when the issue is fixed and
                the software continues to work. For an investigation, the report must agree with the supplied
                evidence. Required files must also be present.
              </p>
              <p className={P}>
                We wanted to know how much of this work an agent could finish. Seven models attempted every task.
                Opus completed 11, the highest result in the benchmark. Five tasks had no complete solution from
                any model.
              </p>

              <Fig
                src="/cyberlatch/cyberlatch-playback.gif"
                alt="Playback of a defensive repair being evaluated: the agent's fix is checked against the attacks it must stop and the workflows it must preserve."
                caption="One task, played back. An agent's repair is scored on both sides at once: the attack must stop, and the software people depend on must keep working."
              />

              <h2 id="complete-result" className="bench-h2 scroll-mt-24">
                Methodology
              </h2>
              <p className={P}>
                We ran 140 evaluations with Terminus 2 through the Harbor framework. Every model attempted the same
                20 tasks. The reported results contain one selected run for each model and task pair.
              </p>
              <p className={P}>
                We counted a task as solved only when every check in the final evaluation passed. For repair tasks,
                the checks covered the security issue, normal use of the software, and the required files. For
                investigation tasks, the submitted report was checked against the evidence. One failed check meant
                that the run was incomplete.
              </p>
              <p className={P}>
                Partial scores show how much of the task the agent completed. Checks can have different weights
                inside a task. Each task has the same weight in a model&apos;s overall average. Two runs discussed
                below scored 98.73% after leaving a security condition unresolved.
              </p>

              <h2 id="leaderboard" className="bench-h2 scroll-mt-24">
                How the models compare
              </h2>
              <Fig
                src="/cyberlatch/01_leaderboard.png"
                alt="Opus solves 11 of 20 tasks; GPT-5.5 and GLM solve 8; Grok and Kimi solve 7; Gemini solves 6; DeepSeek solves 4. Mean recorded scores range from 80.3 to 96.3 percent."
                caption="Solved tasks and mean deterministic scores across the selected runs."
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
              <p className={P}>
                Claude Opus 5 completed 11 of the 20 tasks. GPT-5.5 and GLM-5.3 Flash completed eight each. Grok
                4.6 and Kimi K3 finished seven. Gemini 3.8 Flash finished six and DeepSeek V4 Pro finished four.
              </p>
              <p className={P}>
                Opus solved the widest range of tasks. Its completed work included memory safety fixes,
                authentication, connection pooling, and malware triage.
              </p>
              <p className={P}>
                GPT-5.5 and GLM both solved eight tasks. Five of those results were shared. GPT-5.5 was the only
                model to complete one incident investigation. GLM was the only model to repair a system that had to
                keep reads consistent during concurrent updates. Gemini alone finished a separate application
                hardening exercise.
              </p>
              <p className={P}>
                Gemini completed six tasks and recorded a mean score of 91.2%, close to GLM at 91.3%. Several
                incomplete Gemini runs passed almost every check.
              </p>

              <h2 id="no-model-wins" className="bench-h2 scroll-mt-24">
                No model wins everywhere
              </h2>
              <p className={P}>
                The ranking hides a more useful question: which model to reach for depends on the kind of work.
                Grouped by the technology under test, a single ranking becomes a map of what each model is suited
                to.
              </p>
              <Fig
                src="/cyberlatch/09_stack.png"
                alt="Solve rate by technology area: systems code, web and API, and no-code analysis."
                caption="Solve rate grouped by the kind of technology. Web and API work is uniform across the field; systems code and analysis are where models separate."
              />
              <p className={P}>
                On web and API work every model lands near half solved: the field has learned to harden a web
                service, and even a cheap model is a reasonable start. The differences between models live almost
                entirely in low-level systems code, where the average falls to about a quarter, and in no-code
                analysis, which is lower still. If the job is auditing a network daemon in C or reasoning over raw
                incident evidence, the choice narrows to one or two names. That is where the ranking turns into
                guidance: not a single winner, but a sense of which model to reach for, and where more training is
                still needed.
              </p>

              <h2 id="unsolved" className="bench-h2 scroll-mt-24">
                Model behaviours in unsolved tasks
              </h2>
              <p className={P}>
                Five tasks remained unsolved by every model. Their average scores ranged from 81.8% to 89.0%, so
                many attempts were close to passing.
              </p>
              <Fig
                src="/cyberlatch/04_unsolved_tasks.png"
                alt="Five exercises remain unsolved across secret handling, request parsing, incident analysis, protocol validation, and session management. Their mean scores are 82.8, 89.0, 81.8, 87.6, and 83.6 percent."
                caption="Mean scores for the five unsolved tasks range from 81.8% to 89.0%."
              />
              <ul className="bench-list">
                <li>
                  GPT-5.5 and Opus both scored 98.73% on a credentials exercise. They mistakenly accepted a target
                  sent in the request body. That input should have been rejected.
                </li>
                <li>
                  Every model ended the current session in an administration workflow. Older session credentials
                  continued to work after logout.
                </li>
                <li>Session invalidation was the only failed check in the GPT-5.5 submission.</li>
                <li>
                  Every repaired parser crashed when a retrieval request repeated valid keys. Six models passed all
                  other checks in that task.
                </li>
                <li>Kimi failed the repeated-key check and two checks for request body length.</li>
                <li>
                  Six models mistakenly accepted a control frame with no terminator. The same models also accepted
                  a cookie tied to a future time slot.
                </li>
                <li>
                  Gemini rejected the bad frame and the future-dated cookie. The run scored 98.32% because its
                  required findings were incomplete.
                </li>
              </ul>

              <h2 id="secure-repair" className="bench-h2 scroll-mt-24">
                A secure repair still has to let people use the software
              </h2>
              <p className={P}>
                One authorization task used access codes that should work once. We tested a valid first request, a
                replay on the same route, a replay through a second route, and a new request with a different code.
              </p>
              <p className={P}>
                GPT-5.5 rejected two independently issued codes on their first use. Its replay tests never reached a
                successful request. Kimi, DeepSeek, and Grok accepted the first request and both replay attempts.
                Opus, GLM, and Gemini accepted the first request and rejected both replays.
              </p>

              <h2 id="final-report" className="bench-h2 scroll-mt-24">
                What gets lost in the final report
              </h2>
              <p className={P}>
                One incident response task asked the agents to triage malware, write a detection rule, and
                reconstruct an intrusion from endpoint, network, identity, and email records. The report had to
                separate staged actions from actions that had completed.
              </p>
              <p className={P}>
                Opus recorded the sequence correctly in its working notes. An archive was created after credentials
                were read. Both attempts to send it out failed. One connection was refused and the other was reset.
                In the final report, Opus mistakenly listed the staged archive as a confirmed indicator.
              </p>
              <p className={P}>
                Opus also wrote a four-stage rule that detected every malicious set of records and ignored every
                normal one. The evaluation checked whether all four stages were needed. Smaller versions with two or
                three stages separated the data on their own. Every model failed these subset checks.
              </p>
              <Fig
                src="/cyberlatch/05_shared_failures.png"
                alt="Seven models fail checks for repeated-key retrieval, session invalidation, and staged evidence; six fail a frame-termination check; five fail a nested-secret check."
                caption="Recurring failures in selected checks. Several failed checks can come from one underlying defect."
              />

              <h2 id="near-miss" className="bench-h2 scroll-mt-24">
                A near miss can leave very different kinds of work
              </h2>
              <p className={P}>
                Fifteen of the 89 unsolved attempts finished one check short. Some needed a small code correction.
                Others had a deeper problem in the way the repair was designed.
              </p>
              <Fig
                src="/cyberlatch/07_near_misses.png"
                alt="Across 140 attempts, 51 are solved and 15 of the 89 unsolved attempts have exactly one failed check. Counts of one-check misses are Opus 3, GPT-5.5 2, GLM 1, Grok 2, Kimi 2, Gemini 4, and DeepSeek 1."
                caption="Fifteen submissions stopped one check short of a complete result."
              />
              <p className={P}>
                One task involved a Go service that wrote events to a log and updated the read side in the
                background. The two views had to stay consistent under load. A checkpoint also had to include every
                committed event when the background process was behind.
              </p>
              <p className={P}>
                Opus and Grok both passed 13 of 14 checks. Opus based its checkpoint on the position of the
                background process. When that process fell behind, the checkpoint could miss events that were
                already committed. Grok fixed that part. Its remaining error was a method that copied a mutex by
                value. GLM passed all 14 checks.
              </p>

              <h2 id="cost" className="bench-h2 scroll-mt-24">
                Cost &amp; speed analysis
              </h2>
              <p className={P}>
                GLM completed eight tasks and spent $3.01 across its 20 runs. GPT-5.5 also completed eight. Opus
                spent $3,326.46 in total. A single protocol hardening run cost $3,214.29. The other 19 Opus runs
                cost $112.17 together.
              </p>
              <Fig
                src="/cyberlatch/10_cost_accuracy.png"
                alt="Cost against accuracy for each model. GLM-5.3 reaches 91% weighted accuracy for about three dollars; Opus buys the top accuracy at roughly thirty times the price; GPT-5.5 sits below the frontier."
                caption="Cost against weighted accuracy across the 20-task suite, with runaway loops excluded. Bubble size is tasks fully solved; the dashed line is the efficient frontier."
              />
              <p className={P}>
                The run lasted about 237 minutes. Opus first reviewed the source. Terminus 2 then rejected its
                response because the command JSON was invalid. This happened 4,577 times in a row and continued for
                more than three hours. Each retry included a larger context, and the run recorded 655.8 million
                input tokens.
              </p>
              <p className={P}>
                After the loop ended, Opus patched four C files and rebuilt the program. It tested normal and
                hostile inputs in about 13 minutes. The terminal stopped showing new output when Opus started
                writing the reports. Opus spent the rest of the run trying to recover the terminal and write the
                files in smaller pieces. The final evaluation passed 31 of 36 checks. Three report files were
                missing and two security checks failed.
              </p>
              <p className={P}>
                Grok, Kimi, and Gemini had median run times of about 12 to 13 minutes. GPT-5.5 took about 15
                minutes, Opus 31, DeepSeek 34, and GLM 65. GLM was the cheapest model and had the longest median
                run time.
              </p>
              <Fig
                src="/cyberlatch/06_effort.png"
                alt="Median agent execution times in minutes are Opus 30.8, GPT-5.5 15.2, GLM 65.1, Grok 12.4, Kimi 12.5, Gemini 12.7, and DeepSeek 34.3."
                caption="Median agent execution time across the 20 selected attempts for each model."
              />
              <p className={P}>
                Three GLM runs and one DeepSeek run reached the agent timeout. The expensive Opus run did not time
                out. Most of its time was spent in the retry loop and the failed terminal recovery.
              </p>

              <h2 id="means" className="bench-h2 scroll-mt-24">
                What this means for defensive work
              </h2>
              <p className={P}>
                Across the 20 tasks, the models found security problems in unfamiliar code, wrote repairs, and
                reviewed incident evidence. They completed 51 of the 140 runs. The incomplete runs often found the
                main problem and then missed a related path, broke normal use, or left out part of the report.
              </p>
              <p className={P}>
                A real incident can produce far more evidence. After an agent escaped an{" "}
                <a className="bench-link" href="https://openai.com/index/hugging-face-model-evaluation-security-incident/">
                  OpenAI evaluation sandbox
                </a>
                , Hugging Face had roughly 17,600 recorded actions to review. The team ran a quantized GLM-5.2 on
                its own infrastructure. It used the model to decode staged payloads and trace exposed credentials.
                This helped the responders piece together what had happened.
              </p>

              <h2 id="notes" className="bench-h2 scroll-mt-24">
                Evaluation notes
              </h2>
              <dl className="bench-notes">
                {notes.map((n) => (
                  <div key={n.k} className="bench-note">
                    <dt>{n.k}</dt>
                    <dd>{n.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
