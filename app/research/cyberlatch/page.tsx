import type { Metadata } from "next";
import Link from "next/link";
import SectionNav, { type Section } from "./components/SectionNav";
import { ModelProfiles } from "./components/ModelProfiles";
import { bench } from "./data";

export const metadata: Metadata = {
  title: "CyberLatch",
  description:
    "Eleven frontier agents on 18 defensive security tasks under one harness, one attempt each. How much security work can an agent finish well enough for a defender to rely on the result?",
  alternates: { canonical: "/research/cyberlatch" },
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
  { model: "Claude Opus 5", solved: "11/18", rate: "61%", score: "97.1%", cost: "$97.53", lead: true },
  { model: "DeepSeek V4.1 Flash", solved: "10/18", rate: "56%", score: "93.0%", cost: "$12.17" },
  { model: "GPT-6 Astra", solved: "10/18", rate: "56%", score: "89.5%", cost: "$81.53" },
  { model: "Claude Fable 5.1", solved: "9/18", rate: "50%", score: "96.6%", cost: "$217.58" },
  { model: "GPT-5.6 Sol", solved: "9/18", rate: "50%", score: "94.6%", cost: "$27.30" },
  { model: "GLM-5.3 Flash", solved: "8/18", rate: "44%", score: "91.4%", cost: "$2.72" },
  { model: "GPT-5.5", solved: "8/18", rate: "44%", score: "81.4%", cost: "$74.43" },
  { model: "Grok 4.6", solved: "7/18", rate: "39%", score: "87.2%", cost: "$22.91" },
  { model: "Kimi K3", solved: "7/18", rate: "39%", score: "85.9%", cost: "$30.05" },
  { model: "Gemini 3.8 Flash", solved: "6/18", rate: "33%", score: "90.8%", cost: "$24.47" },
  { model: "DeepSeek V4 Pro", solved: "4/18", rate: "22%", score: "79.7%", cost: "$14.79" },
];

const notes = [
  {
    k: "Agent & settings",
    body: "All evaluations used Terminus 2 through the Harbor framework with models served through OpenRouter. Claude Opus 5, Claude Fable 5.1, GPT-6 Astra, GPT-5.6 Sol, DeepSeek V4.1 Flash, DeepSeek V4 Pro 0813, Kimi K3, and GLM-5.3 Flash ran at max effort. GPT-5.5 and Grok 4.6 ran at xhigh. Gemini 3.8 Flash ran at high.",
  },
  {
    k: "Task set",
    body: "This release reports 18 tasks. Two tasks from the previous 20-task set, a memcached request parser and an OpenVPN control-plane exercise, were withdrawn from the reported set. The remaining tasks and their selected runs are unchanged.",
  },
  {
    k: "Reported set",
    body: "The reported set contains one run for every model and task, a fixed comparison of 198 attempts. Four GPT-6 Astra runs were repeated after a Docker build deadlock stopped them before the agent started. Four Claude Fable 5.1 runs that timed out or stalled in retry loops were repeated, and the latest rerun is reported; two of those reruns are solved. No other model's runs were repeated, including three GLM-5.3 Flash runs that reached the agent timeout. Estimating variation between attempts or a production success rate would require repeated trials for every model.",
  },
  {
    k: "Scoring",
    body: "The final deterministic evaluation decides whether a run is solved. Partial scores come from weighted checks within each task and are averaged over a model's 18 attempts. The leaderboard excludes separate judge assessments. The behavioral observations come from verifier output and saved reviews.",
  },
  {
    k: "Scoring caveats",
    body: "One authorization exercise has an unusual scoring record. Four final records contain zeros, while the underlying test logs show 54%, 68%, 68%, and 68%. One GPT-6 Astra run was zeroed by a preflight check after the agent left its own test file inside the workspace; its repair was never evaluated. We use the final recorded values throughout. They lower the partial score averages and leave the solve counts unchanged.",
  },
  {
    k: "Cost & timing",
    body: "Costs include model API usage only. Infrastructure and separate judge calls are excluded. Execution time leaves out environment setup and final verification. A near miss is a run with exactly one failed check. Task names and identifying project labels are omitted.",
  },
];

const sections: Section[] = [
  { id: "overview", label: "Key takeaways" },
  { id: "background", label: "Background" },
  { id: "methodology", label: "Methodology" },
  { id: "tasks", label: "Tasks", sub: true },
  { id: "results", label: "Results" },
  { id: "gemini", label: "The case of Gemini 3.8 Flash", sub: true },
  { id: "unsolved", label: "Behaviours in unsolved tasks", sub: true },
  { id: "secure-repair", label: "A secure repair must still work", sub: true },
  { id: "final-report", label: "What gets lost in the report", sub: true },
  { id: "near-miss", label: "A near miss is not one thing", sub: true },
  { id: "cost", label: "Where time and money went", sub: true },
  { id: "profiles", label: "Model profiles" },
  { id: "discussion", label: "Discussion" },
  { id: "notes", label: "Evaluation notes" },
];

const CAT_BLURB: Record<string, string> = {
  "Systems & memory safety": "C parsers and interpolation, a Go event store, a connection pooler",
  "AuthN / authz / sessions": "Java authorization, gateway integrity, an admin workflow, a Rust passkey broker",
  "Injection & untrusted input": "XML import, Ruby SSRF, Python request boundaries, PHP remediation",
  "Access control & data exposure": "CORS on a partner portal, a provenance gateway, write-only secrets",
  "Detection & incident response": "token theft in identity logs, malware sideload triage, an edge intrusion",
};

const catRows = Object.entries(bench.cats).map(([cat, tasks]) => {
  const attempts = tasks.length * bench.models.length;
  const solved = bench.models.reduce((n, m) => n + tasks.filter((t) => m.per_task[t]?.pass_).length, 0);
  const best = bench.models
    .map((m) => ({ label: m.label, n: tasks.filter((t) => m.per_task[t]?.pass_).length }))
    .sort((a, b) => b.n - a.n)[0];
  return { cat, n: tasks.length, blurb: CAT_BLURB[cat] ?? "", solved, attempts, best };
});

export default function CyberLatchPage() {
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
            <div className="bench-mono-label">Updated 11 September 2026 · v0.5</div>
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
                  <div className="v">11</div>
                  <div className="k">evaluated with Terminus 2</div>
                </div>
                <div>
                  <div className="bench-mono-label">Tasks</div>
                  <div className="v">18</div>
                  <div className="k">defensive security tasks</div>
                </div>
                <div>
                  <div className="bench-mono-label">Attempts</div>
                  <div className="v">198</div>
                  <div className="k">selected model-task attempts</div>
                </div>
                <div>
                  <div className="bench-mono-label">Unsolved</div>
                  <div className="v">3</div>
                  <div className="k">tasks with no complete solution</div>
                </div>
              </div>

              <ul className="bench-list bench-takeaways">
                <li>
                  Claude Opus 5 leads with 11 of 18 tasks solved and a 97.1% mean score, and it failed only three
                  functional checks across all 18 runs.
                </li>
                <li>
                  The two newest entrants, DeepSeek V4.1 Flash and GPT-6 Astra, tie at 10 of 18 with an identical
                  solved set. DeepSeek did it for $12.17; neither finished an investigation task.
                </li>
                <li>
                  Three tasks have no complete solution. All eleven models leave older administrator sessions valid
                  after logout and report a staged archive as a confirmed indicator.
                </li>
                <li>
                  89 of 198 attempts are complete. Of the 109 misses, 26 stopped one check short, and the recorded
                  cost span between the cheapest and dearest model is 80 times.
                </li>
              </ul>

              <h2 id="background" className="bench-h2 scroll-mt-24">
                Background
              </h2>
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

              <h3 className="bench-h3">Design philosophy</h3>
              <p className={P}>
                We chose to evaluate source-audit, remediation, and incident-analysis work. Across the 18 tasks,
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

              <h2 id="methodology" className="bench-h2 scroll-mt-24">
                Methodology
              </h2>
              <p className={P}>
                We ran 198 evaluations with Terminus 2 through the Harbor framework. Every model attempted the same
                18 tasks. The reported results contain one selected run for each model and task pair.
              </p>
              <p className={P}>
                We counted a task as solved only when every check in the final evaluation passed. For repair tasks,
                the checks covered the security issue, normal use of the software, and the required files. For
                investigation tasks, the submitted report was checked against the evidence. One failed check meant
                that the run was incomplete.
              </p>
              <p className={P}>
                Partial scores show how much of the task the agent completed. Checks can have different weights
                inside a task. Each task has the same weight in a model&apos;s overall average. Five runs discussed
                below scored 98.73% after leaving a security condition unresolved.
              </p>

              <h3 id="tasks" className="bench-h3 scroll-mt-24">
                Tasks
              </h3>
              <p className={P}>
                The 18 tasks fall into five groups. Each task ships with its own deterministic verifier, and the
                table shows how often the field completed tasks in each group.
              </p>
              <div className="overflow-x-auto">
                <table className="bench-table my-6 max-w-[880px]">
                  <thead>
                    <tr>
                      <th>Group</th>
                      <th className="n">Tasks</th>
                      <th>What the agents worked on</th>
                      <th className="n">Solved</th>
                      <th>Best model</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catRows.map((r) => (
                      <tr key={r.cat}>
                        <td className="whitespace-nowrap">{r.cat}</td>
                        <td className="n">{r.n}</td>
                        <td className="muted">{r.blurb}</td>
                        <td className="n">
                          {r.solved}/{r.attempts}
                        </td>
                        <td className="whitespace-nowrap">
                          {r.best.label} ({r.best.n}/{r.n})
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="results" className="bench-h2 scroll-mt-24">
                Results
              </h2>
              <Fig
                src="/cyberlatch/01_leaderboard.png"
                alt="Opus solves 11 of 18 tasks. DeepSeek V4.1 Flash and GPT-6 Astra solve 10. Fable and GPT-5.6 Sol solve 9. GLM and GPT-5.5 solve 8. Grok and Kimi solve 7. Gemini solves 6 and DeepSeek V4 Pro solves 4. Mean recorded scores range from 79.7 to 97.1 percent."
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
                Claude Opus 5 completed 11 of the 18 tasks. DeepSeek V4.1 Flash and GPT-6 Astra completed ten each.
                Claude Fable 5.1 and GPT-5.6 Sol finished nine. GLM-5.3 Flash and GPT-5.5 finished eight. Grok 4.6
                and Kimi K3 finished seven. Gemini 3.8 Flash finished six and DeepSeek V4 Pro finished four.
              </p>
              <p className={P}>
                Opus solved the widest range of tasks and recorded the highest mean score, 97.1%. Its completed work
                included memory safety fixes, authentication, connection pooling, and malware triage.
              </p>
              <p className={P}>
                DeepSeek V4.1 Flash and GPT-6 Astra solved exactly the same ten tasks: two C repairs, a concurrent
                event store, a passkey broker, a connection pooler, four web services, and a single-use
                authorization scheme. Neither completed any of the three investigation tasks. DeepSeek V4.1 Flash
                did this for $12.17 across its 18 runs, and its mean score of 93.0% sits above Astra&apos;s 89.5%.
                Astra&apos;s average carries one zero: on a Python hardening task it left its own test file inside
                the workspace, and a preflight check rejected the submission before its repair was evaluated.
              </p>
              <p className={P}>
                Fable and Sol both completed nine tasks. Fable&apos;s mean of 96.6% is the second highest in the
                set, and four of its nine incomplete runs missed only one check. Sol averaged 94.6% and also had
                four one-check misses. Its successful repairs covered memory safety, concurrent updates, passkeys,
                and authorization.
              </p>
              <p className={P}>
                GLM completed eight tasks for $2.72. Gemini completed six and recorded a mean score of 90.8%, close
                to GLM at 91.4%. Several incomplete Gemini runs passed almost every check.
              </p>

              <h3 id="gemini" className="bench-h3 scroll-mt-24">
                The case of Gemini 3.8 Flash
              </h3>
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
                Gemini completed six of our 18 tasks and averaged 90.8% across all of them. Three incomplete runs
                missed a single check. Its successful work covered memory safety, XML imports, access control,
                passkeys, outbound request validation in a threat-intelligence service, and single-use
                authorization. It was the only model to finish that threat-intelligence repair.
              </p>
              <p className={P}>
                The difference between its CyberBench patch score and its 33% solve rate here comes from what each
                evaluation asks the model to finish. Our checks continue beyond the main patch. Connected routes,
                saved state, existing workflows, required files, and final reports can all decide the result. One
                Gemini repair passed 85 of 86 checks while still allowing project policy to override vault
                ownership. Another passed 8 of 9 after leaving a shared session service multiplexed across clients.
                Other runs left old administrator sessions active or made claims that the incident evidence did not
                support.
              </p>
              <p className={P}>
                Gemini also sounded more certain than its results justified. All 12 incomplete runs ended with a
                claim that the work was complete or fully verified. Its own checks often covered the main repair and
                missed the condition that later failed. That pattern helps explain how the model could average 90.8%
                while completing six tasks.
              </p>

              <h3 id="unsolved" className="bench-h3 scroll-mt-24">
                Model behaviours in unsolved tasks
              </h3>
              <p className={P}>
                Three tasks remained unsolved by every model. Their average scores ranged from 83.3% to 87.2%.
              </p>
              <Fig
                src="/cyberlatch/04_unsolved_tasks.png"
                alt="Three exercises remain unsolved across secret handling, session management, and incident analysis. Their mean scores are 87.2, 86.4, and 83.3 percent."
                caption="Mean scores for the three unsolved tasks across all 11 models."
              />
              <ul className="bench-list">
                <li>
                  Opus, Astra, Fable, Sol, and GPT-5.5 each scored 98.73% on a credentials exercise. All five
                  mistakenly accepted a target sent in the request body. Six models exposed nested provider
                  secrets in detail views, exports, or diagnostics.
                </li>
                <li>
                  All eleven models ended the current session in an administration workflow. Older session
                  credentials continued to work after logout. For Astra, DeepSeek V4.1 Flash, Fable, and GPT-5.5,
                  that was the only failed check.
                </li>
                <li>
                  In the intrusion analysis, every model listed a staged archive among confirmed indicators even
                  though both attempts to send it out had failed. Nine of the eleven also submitted detection rules
                  with stages that were not needed to separate the malicious records from normal ones.
                </li>
                <li>
                  Two further tasks were solved by exactly one model. GPT-5.5 alone completed the token-theft
                  investigation. Gemini alone completed the threat-intelligence service repair, where seven models
                  broke a trusted mirror&apos;s same-host redirects while blocking the SSRF path.
                </li>
              </ul>

              <h3 id="secure-repair" className="bench-h3 scroll-mt-24">
                A secure repair still has to let people use the software
              </h3>
              <p className={P}>
                One authorization task used access codes that should work once. We tested a valid first request, a
                replay on the same route, a replay through a second route, and a new request with a different code.
              </p>
              <p className={P}>
                Opus, Astra, DeepSeek V4.1 Flash, Fable, Sol, GLM, and Gemini accepted both newly issued codes and
                rejected attempts to reuse them on either route. Kimi, DeepSeek V4 Pro, and Grok allowed the first
                request, then accepted both replay attempts. GPT-5.5 rejected the freshly issued codes on their
                first use, so its replay tests never reached a successful request.
              </p>
              <p className={P}>
                The same trade-off decided a provenance gateway task. Kimi and Grok completed it. Sol passed 85 of
                86 checks after its repair stopped an existing publishing workflow from working. Opus and Gemini
                passed 85 of 86 while still letting a project policy override vault ownership. Four other models
                broke legitimate publishing for at least one tenant while still accepting a staging credential for
                publish.
              </p>

              <h3 id="final-report" className="bench-h3 scroll-mt-24">
                What gets lost in the final report
              </h3>
              <p className={P}>
                One incident response task asked the agents to identify a stolen-token campaign, write a detection
                rule, and reconstruct the sequence from the supplied identity records. Fable connected the victim,
                the application, and the attacker&apos;s address. It also proposed actions to revoke tokens, remove
                the OAuth grant, and disable the application.
              </p>
              <p className={P}>
                The submission passed 41 of 47 checks. Its account of the campaign left out two ATT&amp;CK
                techniques and some of the evidence links needed to support them. The final sequence covered only
                part of the activity in the records, leaving the report incomplete. Ten of the eleven models missed
                the same ATT&amp;CK mapping check. GPT-5.5 was the only model to pass every check on this task.
              </p>
              <Fig
                src="/cyberlatch/05_shared_failures.png"
                alt="Eleven models fail session invalidation and report staged evidence as confirmed. Ten fail an ATT&CK mapping check. Nine submit detection rules with redundant stages. Eight accept a target from the request body. Seven let project policy override vault ownership. Six expose a nested secret."
                caption="Recurring failures in selected checks across the 11 models."
              />

              <h3 id="near-miss" className="bench-h3 scroll-mt-24">
                A near miss can leave very different kinds of work
              </h3>
              <p className={P}>
                Twenty-six of the 109 unsolved attempts finished one check short. Four each came from Fable and Sol.
                Some needed a small code correction. Others had a deeper problem in the way the repair was designed.
              </p>
              <Fig
                src="/cyberlatch/07_near_misses.png"
                alt="Across 198 attempts, 89 are solved and 26 of the 109 unsolved attempts have exactly one failed check. Counts of one-check misses are Opus 3, DeepSeek V4.1 Flash 2, Astra 2, Fable 4, Sol 4, GLM 1, GPT-5.5 2, Grok 2, Kimi 2, Gemini 3, and DeepSeek V4 Pro 1."
                caption="Twenty-six submissions stopped one check short of a complete result."
              />
              <p className={P}>
                Five of the 26 were the credentials exercise, where the repair was otherwise complete and one
                request path was still trusted. Four were the administration workflow, where everything except
                session invalidation held. Three others were missing or malformed findings files after a working
                repair: GLM on a C parser, Fable on the connection pooler, and DeepSeek V4.1 Flash on the
                threat-intelligence service.
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
                value. Astra, DeepSeek V4.1 Flash, Fable, Sol, and GLM passed all 14 checks.
              </p>

              <h3 id="cost" className="bench-h3 scroll-mt-24">
                Where the time and money went
              </h3>
              <p className={P}>
                GLM completed eight tasks and spent $2.72 across its 18 runs. DeepSeek V4.1 Flash completed ten for
                $12.17. Fable completed nine for $217.58, the most of any model and 80 times GLM&apos;s total. No
                single run in the reported set cost more than $40.40.
              </p>
              <Fig
                src="/cyberlatch/02_cost.png"
                alt="Total recorded API cost per model. Fable $217.58, Opus $97.53, Astra $81.53, GPT-5.5 $74.43, Kimi $30.05, Sol $27.30, Gemini $24.47, Grok $22.91, DeepSeek V4 Pro $14.79, DeepSeek V4.1 Flash $12.17, GLM $2.72."
                caption="Recorded API cost per model over the 18 selected runs."
              />
              <p className={P}>
                Fable&apos;s most expensive run was the memory-safety repair of a C JSON library. It took 1,024 agent
                turns over 82 minutes and cost $40.40, and it passed every check. Astra&apos;s longest run was the
                same task: 140 minutes and $30.25, also solved. GPT-5.5 spent 93 minutes and $15.18 on it and
                recorded a score of 30%.
              </p>
              <p className={P}>
                Kimi, Grok, and Gemini had median run times of about 11 to 13 minutes. GPT-5.5 took 13 and Astra 15.
                Sol took 20, DeepSeek V4.1 Flash 23, Opus 27, DeepSeek V4 Pro 34, Fable 36, and GLM 65. GLM was the
                cheapest model and had the longest median run time. Three of its runs reached the agent timeout, as
                did one DeepSeek V4 Pro run.
              </p>
              <Fig
                src="/cyberlatch/06_effort.png"
                alt="Median agent execution times in minutes are Opus 26.7, DeepSeek V4.1 Flash 23.5, Astra 14.7, Fable 36.0, Sol 20.0, GLM 65.1, GPT-5.5 13.5, Grok 11.0, Kimi 10.6, Gemini 12.5, and DeepSeek V4 Pro 34.3."
                caption="Median agent execution time across the 18 selected attempts for each model."
              />

              <h2 id="profiles" className="bench-h2 scroll-mt-24">
                Model profiles
              </h2>
              <p className={P}>
                A solve count says little about how a model works. The profiles below summarise each model&apos;s
                recurring patterns across its 18 runs: what it finishes, where it stops, and what it costs. Bars
                show the mean recorded score by task group, with the solved count for that group alongside.
              </p>
              <ModelProfiles bench={bench} />

              <h2 id="discussion" className="bench-h2 scroll-mt-24">
                Discussion
              </h2>
              <p className={P}>
                Across the 18 tasks, the models found security problems in unfamiliar code, wrote repairs, and
                reviewed incident evidence. They completed 89 of the 198 runs. The newest models moved the top of
                the table without changing its shape: DeepSeek V4.1 Flash and GPT-6 Astra finished the same ten
                repairs, and neither finished an investigation. Every model still left older administrator sessions
                alive after logout, and every model still reported a staged archive as a confirmed indicator.
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
