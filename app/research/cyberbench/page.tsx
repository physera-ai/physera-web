import type { Metadata } from "next";
import Link from "next/link";
import { bench } from "./data";
import Scatter from "./components/Scatter";
import Radar from "./components/Radar";
import Outputs from "./components/Outputs";
import { ClassTable, Leaderboard, TaskGrid } from "./components/Tables";
import SectionNav, { type Section } from "./components/SectionNav";

export const metadata: Metadata = {
  title: "CyberBench",
  description:
    "Frontier coding agents patch vulnerable services under one harness, one attempt each. Solve rates, cost per task, failure families, and every model's own output.",
  alternates: { canonical: "/research/cyberbench" },
};

const models = [...bench.models].sort((a, b) => b.acc - a.acc || b.checks - a.checks);
const oc = models.filter((m) => m.harness === "OpenCode");
const cats = Object.keys(bench.cats);

const sections: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "results", label: "Results" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "findings", label: "Findings" },
  { id: "coverage", label: "Coverage by class" },
  { id: "task-grid", label: "Task grid" },
  { id: "outputs", label: "Model outputs" },
  { id: "scoring", label: "How we score" },
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
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.04em] text-[#0d0d0d]">
              CyberBench
            </h1>
            <div className="bench-mono-label">Updated 4 September 2026 · v0.1</div>
            <p className="max-w-[720px] font-serif text-[22px] leading-[1.35] text-[#1f1f1f]">
              Five agents, fourteen security tickets, one attempt each.
            </p>
            <p className="max-w-[720px] text-[17px] leading-relaxed text-[#3a3a3a]">
              Frontier models patch vulnerable services under one agent harness. Every task is scored by a
              deterministic verifier: legitimate workflows must keep working, the attacks must stop. A task
              counts as solved only when every check passes.
            </p>
            <blockquote className="bench-quote">
              <p>A fix that closes nine of ten doors is a fix that leaves a door open. Security is a last-check discipline, so the benchmark is too.</p>
            </blockquote>
            <div className="flex flex-wrap gap-2">
              {["PHP", "Python", "Java", "Go", "C", "Node", "Incident response"].map((t) => (
                <span key={t} className="bench-pill">
                  {t}
                </span>
              ))}
            </div>
          </header>

          <div className="bench-article mt-10">
            <SectionNav sections={sections} />
            <div className="bench-article-body">
          <div className="bench-stats">
            <div>
              <div className="bench-mono-label">Models</div>
              <div className="v">5</div>
              <div className="k">GPT-5.5, Claude Opus 5, DeepSeek V4 Pro, Kimi K3, GLM-5.3 Flash</div>
            </div>
            <div>
              <div className="bench-mono-label">Tasks</div>
              <div className="v">14</div>
              <div className="k">567 verifier checks per model</div>
            </div>
            <div>
              <div className="bench-mono-label">Best solve rate</div>
              <div className="v">57.1%</div>
              <div className="k">GPT-5.5, Claude Opus 5, and Kimi K3 on Terminus 2</div>
            </div>
            <div>
              <div className="bench-mono-label">Cost spread</div>
              <div className="v">118×</div>
              <div className="k">$0.06 to $7.08 per task</div>
            </div>
          </div>

          <span className="bench-kicker">The result</span>
          <h2 id="results" className="bench-h2 scroll-mt-24">Results</h2>
          <Scatter models={models} />

          <span className="bench-kicker">Standings</span>
          <h2 id="leaderboard" className="bench-h2 scroll-mt-24">Leaderboard</h2>
          <Leaderboard models={models} />

          <span className="bench-kicker">What we saw</span>
          <h2 id="findings" className="bench-h2 scroll-mt-24">Findings</h2>
          <div className="bench-findings">
            <div>
              <h3>Where frontier models do well</h3>
              <ol>
                <li>
                  <b>Textbook web hardening is solved.</b> CORS allowlists, header-based admin bypasses,{" "}
                  <code>alg=none</code>, <code>kid</code> traversal. All five passed every CORS check; the JWT
                  and cookie tasks were lost on one or two checks, never on the headline bug.
                  <span className="bench-tag good">14/14 CORS</span>
                </li>
                <li>
                  <b>The primary bug is almost never missed.</b> In 27 of 43 failures the model fixed at least
                  one instance of the right vulnerability class. Check-level pass rates run 89% to 96% for
                  every model.
                </li>
                <li>
                  <b>Memory and concurrency are not the wall.</b> GPT-5.5 scored 100% on the C memory-safety
                  task and the Go event store; Claude 96%.
                  <span className="bench-tag good">2/2 GPT-5.5</span>
                </li>
                <li>
                  <b>The scaffold moves the number.</b> Kimi K3 rerun under Terminus 2 solved 8 of 14 against
                  4 under OpenCode, at $0.63 per task instead of $1.71. Every new pass was a one-check miss
                  under OpenCode.
                  <span className="bench-tag good">4 → 8</span>
                </li>
                <li>
                  <b>Cheap models get most of the way.</b> DeepSeek at $0.29 per task and GLM at $0.06 per
                  task cleared 93% and 89% of checks.
                </li>
              </ol>
            </div>
            <div>
              <h3>Where they fall down</h3>
              <ol>
                <li>
                  <b>The second instance of the same bug.</b> Four models fixed the JWT service and left one
                  endpoint unauthenticated. Three fixed the C injection at one print site and left the same{" "}
                  <code>printf</code> a few lines up. A completeness problem, not a knowledge problem.
                  <span className="bench-tag bad">27 of 43 failures</span>
                </li>
                <li>
                  <b>Over-hardening.</b> Eight trials passed every security check and broke a real workflow: a
                  redaction regex that ate legitimate XML, a bearer-token demand on an endpoint where the code
                  is the credential, secrets stripped from the admin endpoint that exists to return them.
                  <span className="bench-tag bad">8 of 43</span>
                </li>
                <li>
                  <b>Taxonomy precision.</b> All five mapped an OAuth persistence grant to the wrong ATT&amp;CK
                  sub-technique. Right family, wrong four-digit ID, five different answers.
                  <span className="bench-tag bad">0/5 IR</span>
                </li>
                <li>
                  <b>Resource-exhaustion architecture.</b> All five added a body-size cap on DocVault; none
                  moved off the single-threaded server. One stalled client still starves <code>/health</code>.
                </li>
                <li>
                  <b>Less famous bug classes.</b> Only GPT-5.5 caught the duplicate-key JSON parser
                  differential. Four left the parsing path byte-for-byte unchanged.
                </li>
                <li>
                  <b>Silent no-ops on cheaper models.</b> DeepSeek and GLM each read the full cJSON task,
                  emitted about a hundred tokens, and edited nothing.
                </li>
              </ol>
            </div>
          </div>
          <div className="bench-pair">
            <div>
              <div className="bench-mono-label">Frontier pair, solves</div>
              <p>
                <b>8/14 each.</b> GPT-5.5 was 3.3× cheaper and 3.5× faster.
              </p>
            </div>
            <div>
              <div className="bench-mono-label">Frontier pair, completeness</div>
              <p>
                <b>Claude leaves fewer loose ends.</b> 96% vs 93% of checks on tasks where incomplete fixes
                occurred; only model to clear the C CVE.
              </p>
            </div>
            <div>
              <div className="bench-mono-label">Frontier pair, unique solves</div>
              <p>
                <b>GPT-5.5</b> alone cleared the Go event store and the JWT broker. <b>Claude</b> alone cleared
                CVE-2023-30623. The task decides.
              </p>
            </div>
          </div>

          <span className="bench-kicker">Coverage</span>
          <h2 id="coverage" className="bench-h2 scroll-mt-24">Coverage by vulnerability class</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <Radar models={models} cats={cats} />
            <ClassTable data={bench} />
          </div>

          <span className="bench-kicker">Every cell</span>
          <h2 id="task-grid" className="bench-h2 scroll-mt-24">Task grid</h2>
          <TaskGrid data={bench} models={models} />

          <span className="bench-kicker">In their words</span>
          <h2 id="outputs" className="bench-h2 scroll-mt-24">Model output examples</h2>
          <p className="mb-4 max-w-[720px] text-[16px] leading-relaxed text-[#3a3a3a]">
            Each agent&apos;s own remediation plan for one representative task, the JWT session broker. Switch
            tabs to compare how each model scoped the audit. Ordered by overall solve rate.
          </p>
          <Outputs models={oc} question={bench.question} plans={bench.plans} />

          <span className="bench-kicker">Method</span>
          <h2 id="scoring" className="bench-h2 scroll-mt-24">How we score</h2>
          <div className="bench-manifesto">
            <div>
              <h3>Binary or nothing</h3>
              <p>A task is solved only when every deterministic check passes. Partial credit is reported, never ranked on.</p>
            </div>
            <div>
              <h3>Both sides of the fix</h3>
              <p>Every verifier pairs security checks with functional checks. A patch that blocks the attack and breaks the login fails.</p>
            </div>
            <div>
              <h3>One attempt, same scaffold</h3>
              <p>Every model runs once, in the same harness, with the same prompt, tools, and network allowlist. No retries.</p>
            </div>
            <div>
              <h3>Cost sits next to score</h3>
              <p>Every point on the results chart is a solve rate and a dollar figure. Efficiency is a first-class axis.</p>
            </div>
            <div>
              <h3>Infra errors are excluded, and counted</h3>
              <p>Trials that die before the verifier runs are reported separately and never scored against the model.</p>
            </div>
            <div>
              <h3>Verifiers get audited too</h3>
              <p>Every failed trial is read by hand. Scoring defects are published alongside model results and corrected in the data.</p>
            </div>
          </div>

          <p className="bench-foot">
            Terminus 2 runs: Kimi K3 scored on 12 of 14 (DocVault produced no reward file; the event store
            crashed in the harness before the agent started). GPT-5.5&apos;s Terminus 2 run hit provider credit
            limits on 13 of 14 trials and is excluded. Caveats: one attempt per task, so variance and capability
            are not yet separated; three of fourteen verifiers have known defects (quarkus fail-closed scoring,
            DocVault SSRF mock, cJSON judge unavailable), corrected in this data and on the fix list.
            <br />
            OpenCode 1.18.25 and Terminus 2 via OpenRouter · runs of 28–29 August and 3 September 2026 · 14
            defensive tasks × 5 models.
          </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
