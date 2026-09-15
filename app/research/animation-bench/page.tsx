import type { Metadata } from "next";
import Link from "next/link";
import SectionNav, { type Section } from "../cyberlatch/components/SectionNav";
import { ModelProfiles } from "./components/ModelProfiles";
import Scatter from "./components/Scatter";
import Radar from "./components/Radar";
import Outputs from "./components/Outputs";
import { Leaderboard, TaskGrid, WeightsTable } from "./components/Tables";
import { bench } from "./data";

export const metadata: Metadata = {
  title: "Animation Bench",
  description:
    "Frontier computer-use agents reproduce real-website animations from reference frames and a HAR, scored mechanically on visual similarity, motion consistency, interaction fidelity and layout correctness.",
  alternates: { canonical: "/research/animation-bench" },
};

const P = "mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]";

const models = bench.models;
const nTasks = bench.tasks.length;
const lead = models[0];
const cheapest = [...models].sort((a, b) => a.cost_per_task - b.cost_per_task)[0];
const costSpan = Math.round(lead.cost_per_task / cheapest.cost_per_task);

const notes = [
  {
    k: "Agents & settings",
    body: "Claude Opus 5 ran on Anthropic's native computer-use agent (lean variant, 300-step cap). DeepSeek V4.1 Flash and Kimi K3 ran on a generic computer-use agent through OpenRouter at reasoning effort high, with a build-first harness that nudges the model to write a first page early. DeepSeek was capped at 300 steps, Kimi at 200.",
  },
  {
    k: "Task set",
    body: "This release covers the first 15 of 30 selected tasks: eight autoplay entrances, five scroll-linked windows and two gesture-driven interactions, captured from live sites as reference frames plus a HAR of the page's assets.",
  },
  {
    k: "Scoring",
    body: "Each candidate page is driven the same way the reference was captured and sampled at the same points. Four mechanical scores are combined with per-task weights that sum to one: visual similarity, motion consistency, interaction fidelity and layout correctness. The reported number is the best clean run per task and model under the fixed scorer.",
  },
  {
    k: "Cost",
    body: "DeepSeek and Kimi costs are as reported by OpenRouter. Opus is priced from tokens at $5 per million input and $25 per million output, with cache reads at $0.50. Three Opus runs happened on Harbor's stock agent, which resent uncached history every step; those are priced at the lean agent's measured $0.195 per step and marked with an asterisk.",
  },
];

const sections: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "background", label: "Background" },
  { id: "methodology", label: "Methodology" },
  { id: "results", label: "Results" },
  { id: "dimensions", label: "By dimension", sub: true },
  { id: "cost", label: "Cost vs score", sub: true },
  { id: "tasks", label: "Per task", sub: true },
  { id: "strips", label: "Reference vs candidate", sub: true },
  { id: "profiles", label: "Model profiles" },
  { id: "discussion", label: "Discussion" },
  { id: "notes", label: "Evaluation notes" },
];

export default function AnimationBenchPage() {
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
                Web animation set
              </span>
            </div>
            <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] leading-[1.05] tracking-[-0.03em] text-[#0d0d0d]">
              Animation Bench
            </h1>
            <div className="bench-mono-label">Updated 15 September 2026 · v0.1 · first 15 tasks</div>
            <p className="max-w-[760px] text-[17px] leading-relaxed text-[#3a3a3a]">
              Every benchmark we have for coding agents asks a text question and checks a text answer. Almost
              none of the front-end work agencies ship is like that. We gave three computer-use agents the
              reference frames and network capture of fifteen real website animations and asked each to rebuild
              the animation as a self-contained page, then drove every reproduction the way the original was
              captured and scored it mechanically. Claude Opus 5 wins 13 of 15. The number that stayed with us
              is smaller: the lowest score in the set is a page that never ran, because in 300 steps the model
              never once looked at it. On this task, model size sets the ceiling and looking sets the floor.
            </p>
          </header>

          <div className="bench-article mt-10">
            <SectionNav sections={sections} />
            <div className="bench-article-body">
              <div className="bench-stats mb-10">
                <div>
                  <div className="bench-mono-label">Models</div>
                  <div className="v">{models.length}</div>
                  <div className="k">computer-use agents</div>
                </div>
                <div>
                  <div className="bench-mono-label">Tasks</div>
                  <div className="v">{nTasks}</div>
                  <div className="k">real-website animations</div>
                </div>
                <div>
                  <div className="bench-mono-label">Best mean</div>
                  <div className="v">{lead.mean.toFixed(3)}</div>
                  <div className="k">{lead.label}, best on {lead.wins} of {nTasks}</div>
                </div>
                <div>
                  <div className="bench-mono-label">Cost span</div>
                  <div className="v">{costSpan}×</div>
                  <div className="k">
                    ${lead.cost_per_task.toFixed(2)} vs ${cheapest.cost_per_task.toFixed(2)} per task
                  </div>
                </div>
              </div>

              <h2 id="background" className="bench-h2 scroll-mt-24">
                Background
              </h2>
              <p className={P}>
                Animation is where web work is hardest to specify and easiest to judge. A designer can say
                &ldquo;the cards fly into a grid on load&rdquo; and every developer will picture something
                different; the only real spec is the site itself. That makes reproduction a natural benchmark
                shape. The reference is a recording of a live site: a fixed viewport, a scripted trigger, frames
                sampled along the way, and the HAR of everything the page fetched. The candidate is a single HTML
                file. It can be driven with the same trigger and sampled at the same points, so the comparison
                needs no judge. The thirty animations were chosen by hand from 2025&ndash;2026 agency and brand
                sites and trimmed to the minimal window that contains the animation; this release covers the
                first fifteen.
              </p>

              <h2 id="methodology" className="bench-h2 scroll-mt-24">
                Methodology
              </h2>
              <p className={P}>
                Each task is one animation window on a live site: an autoplay entrance, a scroll-linked sequence or
                a pointer gesture. The agent receives the sampled reference frames, the HAR of the page&apos;s
                assets and a short description of the window, and must write a self-contained page under{" "}
                <code>/app/output</code>. The verifier replays the same trigger against the candidate, samples it at
                the same points and scores it on four dimensions with per-task weights.
              </p>
              <WeightsTable data={bench} />
              <p className={`${P} mt-7`}>
                Visual similarity compares the sampled frames. Motion consistency compares how the frames change
                over the window. Interaction fidelity checks that the page responds to the real trigger, wheel
                events and pointer drags, rather than to scripted state; a page that only animates when its own
                JavaScript is called from devtools scores near zero here, and that is intended, since the site
                being reproduced does not have that property either. Layout correctness checks the placement of
                the moving elements. No vision-language judge is used anywhere.
              </p>

              <h2 id="results" className="bench-h2 scroll-mt-24">
                Results
              </h2>
              <Leaderboard models={models} nTasks={nTasks} />
              <p className={`${P} mt-7`}>
                {lead.label} scored a mean of {lead.mean.toFixed(3)} and produced the best reproduction on{" "}
                {lead.wins} of {nTasks} tasks. {models[1].label} ({models[1].mean.toFixed(3)}) and{" "}
                {models[2].label} ({models[2].mean.toFixed(3)}) trail by {(lead.mean - models[1].mean).toFixed(2)} and{" "}
                {(lead.mean - models[2].mean).toFixed(2)}, at{" "}
                {Math.round(lead.cost_per_task / models[1].cost_per_task)}× and{" "}
                {Math.round(lead.cost_per_task / models[2].cost_per_task)}× lower cost per task. DeepSeek edged
                Opus on charmling; Kimi beat both on benxrun.
              </p>

              <h3 id="dimensions" className="bench-h3 scroll-mt-24">
                By dimension
              </h3>
              <Radar models={models} />
              <p className={`${P} mt-7`}>
                Interaction fidelity is the widest gap and the lowest score for every model. Visual similarity is
                the highest for every model. The two cheaper models reproduce the still frame far better than they
                reproduce the motion.
              </p>

              <h3 id="cost" className="bench-h3 scroll-mt-24">
                Cost vs score
              </h3>
              <Scatter models={models} />

              <h3 id="tasks" className="bench-h3 scroll-mt-24">
                Per task
              </h3>
              <TaskGrid data={bench} models={models} />

              <h3 id="strips" className="bench-h3 scroll-mt-24">
                Reference vs candidate
              </h3>
              <p className={P}>
                Pick a task to see the reference frames against each model&apos;s reproduction, sampled at the
                same points, with the per-dimension scores, cost and step count underneath.
              </p>
              <Outputs bench={bench} />

              <h2 id="profiles" className="bench-h2 scroll-mt-24">
                Model profiles
              </h2>
              <p className={P}>
                A mean score says little about how a model works. The profiles below summarise each model&apos;s
                recurring patterns across its {nTasks} runs. Bars show its mean score by trigger type.
              </p>
              <ModelProfiles bench={bench} />

              <h2 id="discussion" className="bench-h2 scroll-mt-24">
                Discussion
              </h2>
              <p className={P}>
                The frontier lead is real. Opus is more sample-efficient at every step (135 steps per task against
                273 for DeepSeek, 5 page writes against 58), it handles the WebGL and 3D references the others
                cannot, and it never shipped a dead page. But the between-model gap is the same size as the
                swings we produced by changing what the agent could see and when it was told to build. Giving
                DeepSeek a file-reading tool moved one task from 0.206 to 0.639, more than the 0.218 mean gap to
                Opus; repairing two scorer defects moved Opus&apos;s own mean from 0.651 to 0.727.
                </p>
                <p className={`${P} mt-5`}>
                Three of the 45 shipped pages never run: no motion on load, no response to scroll. All three are
                DeepSeek&apos;s and they are its three lowest scores. One dies on a duplicate-variable error after
                300 steps, 65 rewrites and a single screenshot. Set those aside and DeepSeek reaches 81% of Opus
                on the remaining twelve rather than 70%. The one open-model win, Kimi K3 on benxrun, is the only
                run that verified with real scroll gestures; Opus checked the same page through devtools and
                scored 0.43 on interaction despite 0.99 on visual. What separates a good score from a bad one on
                this benchmark is whether the agent looks at what it built and whether the page actually runs,
                and both are properties a smaller model can be made to satisfy.
                </p>
                <p className={`${P} mt-5`}>
                The animations themselves are far from solved: no model reached 0.5 on the WebGL word-swap, and
                the canvas-heavy half of the set averages 0.67 even for Opus. The remaining fifteen tasks,
                hover-driven and mouse-tracked, follow in the next release, with verification behaviour logged as
                a first-class result.
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
