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
    "Seven frontier agents remediate vulnerable services under one harness, one attempt each. Solve rates, cost per task, capability categories, failure modes, and every model's own output.",
  alternates: { canonical: "/research/cyberbench" },
};

const models = [...bench.models].sort((a, b) => b.solved - a.solved || b.checks - a.checks);
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
            <div className="bench-mono-label">Updated 5 September 2026 · v0.2</div>
            <p className="max-w-[720px] font-serif text-[22px] leading-[1.35] text-[#1f1f1f]">
              Seven agents, twenty-two security tickets, one attempt each.
            </p>
            <p className="max-w-[720px] text-[17px] leading-relaxed text-[#3a3a3a]">
              Most cybersecurity benchmarks ask whether a model can break in. We ask the operational question:
              can it close the hole and keep the service running? Frontier models remediate vulnerable services
              under one agent harness, scored by a deterministic verifier — legitimate workflows must keep
              working, the attacks must stop. A task counts as solved only when every check passes.
            </p>
            <blockquote className="bench-quote">
              <p>A fix that closes nine of ten doors is a fix that leaves a door open. Security is a last-check discipline, so the benchmark is too.</p>
            </blockquote>
            <div className="flex flex-wrap gap-2">
              {["C", "Rust", "Go", "Python", "Java", "Ruby", "PHP", "Node", "Incident response"].map((t) => (
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
              <div className="v">7</div>
              <div className="k">Opus 5, GPT-5.5, Grok 4.6, Kimi K3, GLM-5.3, Gemini 3.8, DeepSeek V4 Pro</div>
            </div>
            <div>
              <div className="bench-mono-label">Tasks</div>
              <div className="v">22</div>
              <div className="k">10–106 verifier checks each · 177 expert-hours of work</div>
            </div>
            <div>
              <div className="bench-mono-label">Best solve rate</div>
              <div className="v">54.5%</div>
              <div className="k">Claude Opus 5 — 12 of 22</div>
            </div>
            <div>
              <div className="bench-mono-label">Cost spread</div>
              <div className="v">40×</div>
              <div className="k">$0.12 to $4.79 per task</div>
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
                  <b>Web-app hardening is close to solved.</b> On the twelve web and API tasks every model lands
                  near 50% solved. CORS allowlists, header bypasses, <code>alg=none</code>, <code>kid</code>{" "}
                  traversal — the field has genuinely converged here.
                  <span className="bench-tag good">50% web solved</span>
                </li>
                <li>
                  <b>The primary bug is almost never missed.</b> Every model clears 80% or more of weighted
                  checks. When they fail, it is on the second instance or the last check, not the headline
                  vulnerability.
                </li>
                <li>
                  <b>Injection is the field&apos;s best category.</b> 95% weighted, 15 of 28 solved; Grok 4.6
                  leads it. Input-validation and untrusted-parsing work is broadly within reach.
                  <span className="bench-tag good">95% weighted</span>
                </li>
                <li>
                  <b>Real leverage when they finish.</b> Opus solved twelve tasks — about 102 hours of expert
                  remediation — in under seven agent-hours for roughly a hundred dollars. GPT-5.5 compressed 70
                  expert-hours into two and a half.
                </li>
                <li>
                  <b>Cheap models get most of the way.</b> GLM-5.3 solves 9 for three dollars total and leads
                  the concurrency category; Grok solves 9 as the fastest model in the field.
                </li>
              </ol>
            </div>
            <div>
              <h3>Where they fall down</h3>
              <ol>
                <li>
                  <b>Finding is not fixing.</b> Six of seven models fail by under-fixing — leaving an attack
                  working. Opus is the lone over-hardener, breaking legitimate workflows instead. Its failures
                  are the safe kind a human catches; the others fail silent.
                  <span className="bench-tag bad">99 attacks left open · DeepSeek</span>
                </li>
                <li>
                  <b>Systems and analysis are the wall.</b> On C, Rust, and Go the field solves about a quarter;
                  on no-code detection and incident-response work, less. Only Opus breaks 3 of 5 in native code.
                  <span className="bench-tag bad">27% systems</span>
                </li>
                <li>
                  <b>Shared blind spots.</b> On the five tasks nobody solved, the same check defeats nearly
                  every model: amplification denial-of-service, genuinely multi-stage detection rules,
                  protocol state-machine edges, and session-lifecycle invariants.
                  <span className="bench-tag bad">7/7 miss</span>
                </li>
                <li>
                  <b>The second instance of the same bug.</b> A third of failures were one or two checks short —
                  usually a nested field or a sibling endpoint of a bug already fixed once.
                </li>
                <li>
                  <b>Unbounded persistence.</b> Run unattended, a capable model can spiral. Opus burned 4,628
                  steps over four hours and $3,214 on one task it never solved.
                  <span className="bench-tag bad">$3,214, no solve</span>
                </li>
              </ol>
            </div>
          </div>
          <div className="bench-pair">
            <div>
              <div className="bench-mono-label">Category leaders</div>
              <p>
                <b>No model wins everywhere.</b> Six categories, five leaders: Opus takes three, Grok, GLM, and
                GPT-5.5 each own one.
              </p>
            </div>
            <div>
              <div className="bench-mono-label">Safest failure mode</div>
              <p>
                <b>Opus over-hardens.</b> When it fails it breaks the deploy, not the defense — the failure a
                human notices in minutes.
              </p>
            </div>
            <div>
              <div className="bench-mono-label">Best value</div>
              <p>
                <b>GLM-5.3 at $3.</b> Nine solves and the concurrency lead for the price of a coffee; the catch
                is a 66-minute median run.
              </p>
            </div>
          </div>

          <span className="bench-kicker">Coverage</span>
          <h2 id="coverage" className="bench-h2 scroll-mt-24">Coverage by capability category</h2>
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
          <Outputs models={models} question={bench.question} plans={bench.plans} />

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
              <h3>Infra errors are excluded</h3>
              <p>Trials that die before the verifier runs are dropped, not scored against the model. Timeouts that still produced a score are kept.</p>
            </div>
            <div>
              <h3>Verifiers get audited too</h3>
              <p>Every score is read from each trial&apos;s raw log, not the summary — a fail-close bug there zeroes real partial scores. Four trials were corrected this way.</p>
            </div>
          </div>

          <p className="bench-foot">
            Caveats: one attempt per task, so variance and capability are not yet separated. The quarkus verifier
            fail-closes a broken service to a zero; those cells use the pre-fail-closed scores from the raw log.
            The five unsolved tasks are read as half capability gap, half task calibration.
            <br />
            Terminus 2 via OpenRouter, Docker sandboxes · runs of September 2026 · 22 defensive tasks × 7 models =
            154 trials.
          </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
