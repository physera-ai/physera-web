import type { Metadata } from "next";
import Link from "next/link";
import SectionNav, { type Section } from "./components/SectionNav";

export const metadata: Metadata = {
  title: "CyberLatch",
  description:
    "Nine frontier agents on 20 defensive security tasks under one harness, one attempt each. How much security work can an agent finish well enough for a defender to rely on the result?",
  alternates: { canonical: "/research/cyberbench" },
};

const P = "mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]";

const HF_INCIDENT = "https://openai.com/index/hugging-face-model-evaluation-security-incident/";
const CYBERBENCH = "https://www.vals.ai/benchmarks/cyber";

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
  { model: "GPT-5.6 Sol", solved: "9/20", rate: "45%", score: "94.4%", cost: "$28.77" },
  { model: "GPT-5.5", solved: "8/20", rate: "40%", score: "81.9%", cost: "$86.81" },
  { model: "GLM-5.3 Flash", solved: "8/20", rate: "40%", score: "91.3%", cost: "$3.01" },
  { model: "Grok 4.6", solved: "7/20", rate: "35%", score: "87.6%", cost: "$27.39" },
  { model: "Kimi K3", solved: "7/20", rate: "35%", score: "85.2%", cost: "$32.72" },
  { model: "Claude Fable 5.1", solved: "7/20", rate: "35%", score: "80.9%", cost: "$24,897.16" },
  { model: "Gemini 3.8 Flash", solved: "6/20", rate: "30%", score: "91.2%", cost: "$34.77" },
  { model: "DeepSeek V4 Pro", solved: "4/20", rate: "20%", score: "80.3%", cost: "$17.58" },
];

const notes = [
  {
    k: "Agent & settings",
    body: "All evaluations used Terminus 2 through the Harbor framework. Kimi K3, DeepSeek V4 Pro 0813, Claude Opus 5, Claude Fable 5.1, GPT-5.6 Sol, and GLM-5.3 Flash ran at max effort. GPT-5.5 and Grok 4.6 ran at xhigh. Gemini 3.8 Flash ran at high.",
  },
  {
    k: "Reported set",
    body: "The reported set contains one run for every model and task, including the designated reruns. It is a fixed comparison of 180 attempts. Estimating variation between attempts or a production success rate would require repeated trials. GPT-5.6 Sol's 20 selected runs follow the same selection and final evaluation rules used for every model.",
  },
  {
    k: "Scoring",
    body: "The final deterministic evaluation decides whether a run is solved. Partial scores come from weighted checks within each task and are averaged over a model's 20 attempts. The leaderboard excludes separate judge assessments. The behavioral observations come from verifier output and saved reviews.",
  },
  {
    k: "Scoring caveat",
    body: "One authorization exercise has an unusual scoring record. Four final records contain zeros, while the underlying test logs show 54%, 68%, 68%, and 68%. We use the final recorded values throughout. They lower the partial score averages and leave the solve counts unchanged.",
  },
  {
    k: "Fable records",
    body: "All 20 Claude Fable 5.1 attempts have final result records. One has no deterministic score. It counts as incomplete and contributes zero to Fable's 20-task average. Protocol figures that compare individual checks use the eight available model results.",
  },
  {
    k: "Cost & timing",
    body: "Costs include model API usage only. Infrastructure and separate judge calls are excluded. Execution time leaves out environment setup and final verification. A near miss is a run with exactly one failed check. Task names and identifying project labels are omitted.",
  },
];

const sections: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "design-philosophy", label: "Design philosophy" },
  { id: "complete-result", label: "What counts as complete" },
  { id: "leaderboard", label: "How the models compare" },
  { id: "gemini", label: "The case of Gemini 3.8 Flash", sub: true },
  { id: "unsolved", label: "Behaviours in unsolved tasks" },
  { id: "secure-repair", label: "A secure repair must still work", sub: true },
  { id: "final-report", label: "What gets lost in the report", sub: true },
  { id: "near-miss", label: "A near miss is not one thing", sub: true },
  { id: "cost", label: "Where time and money went" },
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
            <div className="bench-mono-label">Updated 9 September 2026 · v0.4</div>
            <p className="max-w-[760px] text-[17px] leading-relaxed text-[#3a3a3a]">
              As we move into the era of RSI, every gain on a benchmark should tell us something concrete about how
              much useful work a model can do. Scores can remain low for months and then climb close to saturation
              after a single model release. Even new benchmarks can lose their ability to separate the leading
              models within a short time. The same pace of change is harder to see in everyday work.
            </p>
          </header>

          <div className="bench-article mt-10">
            <SectionNav sections={sections} />
            <div className="bench-article-body">
              <div className="bench-stats mb-10">
                <div>
                  <div className="bench-mono-label">Models</div>
                  <div className="v">9</div>
                  <div className="k">evaluated with Terminus 2</div>
                </div>
                <div>
                  <div className="bench-mono-label">Tasks</div>
                  <div className="v">20</div>
                  <div className="k">defensive security tasks</div>
                </div>
                <div>
                  <div className="bench-mono-label">Attempts</div>
                  <div className="v">180</div>
                  <div className="k">selected model-task attempts</div>
                </div>
                <div>
                  <div className="bench-mono-label">Unsolved</div>
                  <div className="v">5</div>
                  <div className="k">tasks with no complete solution</div>
                </div>
              </div>

              <p className={P}>
                Many people who use these systems daily have not felt an improvement of comparable size. Some of
                that gap may come from them working in fixed domains, where gains elsewhere are less visible. It is
                still worth asking whether the leaderboard is measuring progress that will reach the workplace.
              </p>
              <p className={P}>
                There are two useful directions for new benchmarks. One is to create problems that even highly
                skilled people find difficult. The other is to measure &ldquo;slow penetration of AI&rdquo; into the
                economy by testing how well models perform real commercial work which may not have reflected in
                publicly available benchmarks. This is our first release. We chose to evaluate end-to-end defensive
                security work because it reflects work that companies already need. Agents must inspect unfamiliar
                systems, repair weaknesses without breaking normal use, or investigate incidents and support their
                conclusions with evidence. Other benchmarks already cover CTFs, vulnerability discovery,
                exploitation, and penetration testing. Our focus is whether better model performance leads to
                dependable work that security and engineering teams can use.
              </p>
              <p className={P}>
                The{" "}
                <a className="bench-link" href={HF_INCIDENT}>
                  Hugging Face incident
                </a>{" "}
                offers a glimpse of the defensive role models may play. After an agent escaped an OpenAI evaluation
                sandbox, Hugging Face reviewed roughly 17,600 recorded actions. The team ran a quantized GLM-5.2 on
                its own infrastructure to help decode staged payloads and trace exposed credentials.
              </p>
              <p className={P}>
                Future attacks may involve large numbers of agents probing the same application at once. Defenders
                will need agents that can inspect unfamiliar systems, strengthen weak boundaries, handle difficult
                edge cases, and keep the software working. Measuring this kind of defensive work will become
                increasingly important as offensive capabilities scale.
              </p>

              <h2 id="design-philosophy" className="bench-h2 scroll-mt-24">
                Design philosophy
              </h2>
              <p className={P}>
                We chose to evaluate source-audit, remediation, and incident-analysis work. Across the 20 tasks,
                agents worked with parsers, web services, authentication systems, concurrent software, malware
                evidence, and cloud identity records. They had to investigate the supplied material, find the root
                cause, make the repair, preserve expected behavior, and submit the required findings. The
                investigation tasks also checked whether detection rules and final reports agreed with the evidence.
              </p>
              <p className={P}>
                We did not include CTF challenges, open-ended white-hat research, or full penetration tests.
                Benchmarks such as Cybench,{" "}
                <a className="bench-link" href="https://github.com/iris-sast/cwe-bench-java">
                  CWE-Bench-Java
                </a>
                ,{" "}
                <a className="bench-link" href={CYBERBENCH}>
                  CyberBench
                </a>
                ,{" "}
                <a className="bench-link" href="https://github.com/exploitbench/exploitbench">
                  ExploitBench
                </a>
                , and AutoPenBench already examine parts of that work. Those evaluations can show whether an agent
                finds a vulnerability, reproduces a crash, captures a flag, or completes an exploitation path.
              </p>
              <p className={P}>
                Our evaluation follows the defensive job further. Finding the issue earns little if the repair
                breaks an existing workflow or leaves another route exposed. A run only passes when the security
                checks, normal behavior, and required reports all succeed. This makes the benchmark better suited to
                measuring whether an agent can deliver finished defensive work rather than stop after identifying
                the problem.
              </p>

              <Fig
                src="/cyberlatch/cyberlatch-playback.gif"
                alt="Playback of a defensive repair being evaluated: the agent's fix is checked against the attacks it must stop and the workflows it must preserve."
                caption="One task, played back. An agent's repair is scored on both sides at once: the attack must stop, and the software people depend on must keep working."
              />

              <h2 id="complete-result" className="bench-h2 scroll-mt-24">
                What counts as a complete result
              </h2>
              <p className={P}>
                We ran 180 evaluations with Terminus 2 through the Harbor framework. Every model attempted the same
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
                inside a task. Each task has the same weight in a model&apos;s overall average. Four runs discussed
                below scored 98.73% after leaving a security condition unresolved.
              </p>

              <h2 id="leaderboard" className="bench-h2 scroll-mt-24">
                How the models compare
              </h2>
              <Fig
                src="/cyberlatch/01_leaderboard.png"
                alt="Opus solves 11 of 20 tasks. GPT-5.6 Sol solves 9. GPT-5.5 and GLM solve 8. Grok, Kimi, and Fable solve 7. Gemini solves 6 and DeepSeek solves 4. Mean recorded scores range from 80.3 to 96.3 percent."
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
                Claude Opus 5 completed 11 of the 20 tasks. GPT-5.6 Sol completed nine. GPT-5.5 and GLM-5.3 Flash
                completed eight each. Grok 4.6, Kimi K3, and Claude Fable 5.1 finished seven. Gemini 3.8 Flash
                finished six and DeepSeek V4 Pro finished four.
              </p>
              <p className={P}>
                Opus solved the widest range of tasks. Its completed work included memory safety fixes,
                authentication, connection pooling, and malware triage.
              </p>
              <p className={P}>
                GPT-5.6 Sol completed nine tasks and averaged 94.4% across all 20 runs. Its successful repairs
                covered memory safety, concurrent updates, passkeys, and authorization. Five of its eleven
                incomplete runs missed only one check.
              </p>
              <p className={P}>
                GLM completed eight tasks. Gemini completed six and recorded a mean score of 91.2%, close to GLM at
                91.3%. Several incomplete Gemini runs passed almost every check.
              </p>

              <h2 id="gemini" className="bench-h2 scroll-mt-24">
                The case of Gemini 3.8 Flash
              </h2>
              <p className={P}>
                Of the public benchmarks named in this article,{" "}
                <a className="bench-link" href={CYBERBENCH}>
                  CyberBench
                </a>{" "}
                is the only one that reports a result for Gemini 3.8 Flash itself. Gemini leads its patch table with
                a score of 87.5%. It passed 49 of the 56 patch cases that could be measured. Its proof-of-concept
                score is 0%, which leaves its overall CyberBench score at 43.75%.
              </p>
              <p className={P}>
                The other benchmarks used different Gemini models. Cybench tested Gemini 1.5 Pro. AutoPenBench
                tested Gemini 1.5 Flash, and ExploitBench reports Gemini 3.1 Pro Preview. CWE-Bench-Java does not
                publish a result for Gemini 3.8 Flash. We have kept those scores separate rather than treating every
                Gemini release as the same model.
              </p>
              <p className={P}>
                Gemini completed six of our 20 tasks and averaged 91.2% across all of them. Four incomplete runs
                missed a single check. Its successful work covered memory safety, XML imports, access control,
                passkeys, detection engineering, and single-use authorization.
              </p>
              <p className={P}>
                The difference between its CyberBench patch score and its 30% solve rate here comes from what each
                evaluation asks the model to finish. Our checks continue beyond the main patch. Connected routes,
                saved state, existing workflows, required files, and final reports can all decide the result. One
                Gemini repair passed 85 of 86 checks while still allowing project policy to override vault
                ownership. Another passed 35 of 36 but saved the required findings in the wrong locations. Other
                runs left old administrator sessions active or made claims that the incident evidence did not
                support.
              </p>
              <p className={P}>
                Gemini also sounded more certain than its results justified. All 14 incomplete runs ended with a
                claim that the work was complete or fully verified. Its own checks often covered the main repair and
                missed the condition that later failed. That pattern helps explain how the model could average 91.2%
                while completing six tasks.
              </p>

              <h2 id="unsolved" className="bench-h2 scroll-mt-24">
                Model behaviours in unsolved tasks
              </h2>
              <p className={P}>
                Five tasks remained unsolved by every model. Their average scores ranged from 76.6% to 88.0%.
              </p>
              <Fig
                src="/cyberlatch/04_unsolved_tasks.png"
                alt="Five exercises remain unsolved across secret handling, request parsing, incident analysis, protocol validation, and session management. Their mean scores are 86.3, 85.9, 76.6, 88.0, and 84.4 percent."
                caption="Mean scores for the five unsolved tasks. The protocol average uses the eight available evaluations."
              />
              <ul className="bench-list">
                <li>
                  GPT-5.6 Sol, Opus, and Fable each scored 98.73% on a credentials exercise. All three mistakenly
                  accepted a target sent in the request body.
                </li>
                <li>
                  All nine models ended the current session in an administration workflow. Older session credentials
                  continued to work after logout.
                </li>
                <li>
                  Eight repaired parsers still crashed when a retrieval request repeated valid keys. Fable also
                  mishandled several requests where the declared body length did not match the data sent. Sol fixed
                  the parsing behavior but did not submit the required findings file.
                </li>
                <li>Kimi failed the repeated-key check and two checks for request body length.</li>
                <li>
                  Six models mistakenly accepted a control frame with no terminator. Sol rejected that frame. It
                  still accepted a cookie tied to a future time slot, as did six other models.
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
                GPT-5.6 Sol accepted both newly issued codes and rejected attempts to reuse them on either route.
                Opus, GLM, and Gemini did the same. Kimi, DeepSeek, and Grok allowed the first request, then
                accepted both replay attempts.
              </p>

              <h2 id="final-report" className="bench-h2 scroll-mt-24">
                What gets lost in the final report
              </h2>
              <p className={P}>
                One incident response task asked the agents to identify a stolen-token campaign, write a detection
                rule, and reconstruct the sequence from the supplied identity records. Fable connected the victim,
                the application, and the attacker&apos;s address. It also proposed actions to revoke tokens, remove
                the OAuth grant, and disable the application.
              </p>
              <p className={P}>
                The submission passed 41 of 47 checks. Its account of the campaign left out two ATT&amp;CK
                techniques and some of the evidence links needed to support them. The final sequence covered only
                part of the activity in the records, leaving the report incomplete.
              </p>
              <Fig
                src="/cyberlatch/05_shared_failures.png"
                alt="Nine models fail session invalidation. Eight fail staged evidence and repeated-key retrieval checks. Six of eight evaluated models fail frame termination. Five fail a nested-secret check."
                caption="Recurring failures in selected checks. The frame count uses the eight available evaluations."
              />

              <h2 id="near-miss" className="bench-h2 scroll-mt-24">
                A near miss can leave very different kinds of work
              </h2>
              <p className={P}>
                Twenty-four of the 113 unsolved attempts finished one check short. Five of them came from Sol and
                four came from Fable. Some needed a small code correction. Others had a deeper problem in the way
                the repair was designed.
              </p>
              <Fig
                src="/cyberlatch/07_near_misses.png"
                alt="Across 180 attempts, 67 are solved and 24 of the 113 unsolved attempts have exactly one failed check. Counts of one-check misses are Opus 3, Sol 5, GPT-5.5 2, GLM 1, Grok 2, Kimi 2, Fable 4, Gemini 4, and DeepSeek 1."
                caption="Twenty-four submissions stopped one check short of a complete result."
              />
              <p className={P}>
                One Sol repair passed all 19 behavioral checks for request parsing. It remained incomplete because
                the findings file was missing. In another run, Sol passed 85 of 86 checks after its repair stopped
                an existing publishing workflow from working.
              </p>
              <p className={P}>
                Fable had four one-check misses. One passed 78 of 79 checks and still trusted a target sent in the
                request body. Another fixed the connection-pooling behavior. Its findings file gave a source
                location where the required field expected a file path.
              </p>
              <p className={P}>
                One task involved a service that wrote events to a log and updated the read side in the background.
                The two views had to stay consistent under load. A checkpoint also had to include every committed
                event when the background process was behind.
              </p>
              <p className={P}>
                Opus and Grok both passed 13 of 14 checks. Opus based its checkpoint on the position of the
                background process. When that process fell behind, the checkpoint could miss events that were
                already committed. Grok fixed that part. Its remaining error was a method that copied a mutex by
                value. GLM and Sol passed all 14 checks.
              </p>

              <h2 id="cost" className="bench-h2 scroll-mt-24">
                Where the time and money went
              </h2>
              <p className={P}>
                GLM completed eight tasks and spent $3.01 across its 20 runs. GPT-5.6 Sol completed nine for $28.77.
                For Opus, one run cost $3,214.29 and the other 19 cost $112.17. For Fable, five runs together cost
                $24,679.86 and the other 15 cost $217.30.
              </p>
              <Fig
                src="/cyberlatch/02_cost.png"
                alt="Recorded API costs divided between runs below $1,000 and runs costing at least $1,000. One Opus run cost $3,214.29 and the remaining 19 cost $112.17. Five Fable runs together cost $24,679.86 and the remaining 15 cost $217.30. No other model had a run costing $1,000."
                caption="Recorded API costs split at $1,000 per run. Adding both panels gives the total cost for each model."
              />
              <p className={P}>
                Fable&apos;s most expensive run outside the protocol exercise cost $8,118.67 and lasted six hours.
                It read the service protocol and worked through the Rust modules one by one. After building the
                unchanged service once, it stopped producing usable command batches. The same recovery request then
                repeated thousands of times while the context kept growing. No patch or report was written.
              </p>
              <p className={P}>
                The Opus run lasted about 237 minutes. Opus first reviewed the source. Terminus 2 then rejected its
                response because the command JSON was invalid. This happened 4,577 times in a row and continued for
                multiple hours. Each retry included a larger context, and the run recorded 655.8 million input
                tokens.
              </p>
              <p className={P}>
                After the loop ended, Opus patched four C files and rebuilt the program. It tested normal and
                hostile inputs in about 13 minutes. The terminal stopped showing new output when Opus started
                writing the reports. Opus spent the rest of the run trying to recover the terminal and write the
                files in smaller pieces. The final evaluation passed 31 of 36 checks. Three report files were
                missing and two security checks failed.
              </p>
              <p className={P}>
                Grok, Kimi, and Gemini had median run times of about 12 to 13 minutes. Sol took 22 minutes. Opus
                took 31, DeepSeek 34, Fable 58, and GLM 65. GLM was the cheapest model and had the longest median
                run time.
              </p>
              <Fig
                src="/cyberlatch/06_effort.png"
                alt="Median agent execution times in minutes are Opus 30.8, Sol 22.1, GPT-5.5 15.2, GLM 65.1, Grok 12.4, Kimi 12.5, Fable 58.4, Gemini 12.7, and DeepSeek 34.3."
                caption="Median agent execution time across the 20 selected attempts for each model."
              />

              <h2 id="means" className="bench-h2 scroll-mt-24">
                What this means for defensive work
              </h2>
              <p className={P}>
                Across the 20 tasks, the models found security problems in unfamiliar code, wrote repairs, and
                reviewed incident evidence. They completed 67 of the 180 runs. GPT-5.6 Sol finished difficult
                repairs involving memory safety, concurrent updates, passkeys, and authorization. Its incident work
                was less complete. In one run, the detection rule passed the required checks, but the report
                mistakenly described a staged archive as confirmed.
              </p>
              <p className={P}>
                A real incident can produce far more evidence. After an agent escaped an{" "}
                <a className="bench-link" href={HF_INCIDENT}>
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
