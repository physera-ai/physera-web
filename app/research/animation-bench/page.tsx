import type { Metadata } from "next";
import Link from "next/link";
import SectionNav, { type Section } from "../cyberlatch/components/SectionNav";
import results from "./data.json";
import "./style.css";

export const metadata: Metadata = {
  title: "Animation Bench",
  description:
    "Four frontier models rebuild 48 real web animations from 12 to 24 frames and a network capture. Appearance is close to solved; the timeline is not. What models get wrong, observable and counted.",
  alternates: { canonical: "/research/animation-bench" },
};

const LABEL: Record<string, string> = {
  "gpt-6-astra": "GPT-6 Astra",
  "claude-fable-5-1": "Claude Fable 5.1",
  "claude-opus-5-5": "Claude Opus 5.5",
  "gpt-6-sol": "GPT-6 Sol",
};
const SHORT: Record<string, string> = {
  "gpt-6-astra": "Astra", "claude-fable-5-1": "Fable", "claude-opus-5-5": "Opus", "gpt-6-sol": "Sol",
};
const COLOR: Record<string, string> = {
  "gpt-6-astra": "#0f9d6e", "claude-fable-5-1": "#5170c9", "claude-opus-5-5": "#ad7545", "gpt-6-sol": "#9b71a3",
};
const TASK_META: Record<string, [site: string, trigger: string, difficulty: string]> = {
  "adcker-menu-services-hover": ["adcker.com", "hover", "medium"],
  "altitude101-glass-ring-word-swap": ["altitude101.com", "scroll", "hard"],
  "altitude101-words-scroll-rates": ["altitude101.com", "scroll", "hard"],
  "ausify-vibe-canvas-carousel": ["ausify.com.au", "drag / click", "hard"],
  "basement-studio-graffiti-hero": ["basement.studio", "plays by itself", "hard"],
  "benxrun-skyline-chapter-scroll": ["benxrun.com", "scroll", "hard"],
  "berd-window-morphs-into-app": ["berd.xyz", "plays by itself", "hard"],
  "charmling-99-charms-flythrough": ["charmling.app", "scroll", "hard"],
  "ciaoenergy-cans-fan-scroll-spin": ["ciaoenergy.com", "plays by itself", "hard"],
  "ciaoenergy-cans-sideways-selection": ["ciaoenergy.com", "scroll", "hard"],
  "ciaoenergy-text-dancing-scroll": ["ciaoenergy.com", "scroll", "hard"],
  "cipher-loader-stills-ring": ["cipher.tv", "plays by itself", "hard"],
  "dialkit-dials-shape-headline": ["dialkit.dev", "drag / click", "hard"],
  "driftime-2025-pinned-scroll-morph": ["2025.driftime.com", "scroll", "hard"],
  "gufram-zero-gravity-collage-hero": ["gufram.it", "plays by itself", "hard"],
  "kavieng-cards-fly-to-grid-drag": ["kaviengcreative.com", "drag / click", "hard"],
  "maxima-splash-curtain-whale-part2": ["maximatherapy.com", "plays by itself", "hard"],
  "maxima-splash-curtain-whale-scene": ["maximatherapy.com", "plays by itself", "medium"],
  "monopo-london-webgl-sections": ["monopo.london", "hover", "hard"],
  "motion-dev-animation": ["examples.motion.dev", "drag / click", "easy"],
  "neutomni-preloader-cut-along-line": ["neutomni.com", "plays by itself", "hard"],
  "neutomni-process-rolling-shape": ["neutomni.com", "scroll", "hard"],
  "otsuka-zeroz-intro-reveal": ["otsuka-air.jp", "plays by itself", "hard"],
  "oxigen-voxel-palm-pinned": ["oxigen.sa", "scroll", "hard"],
  "palmo-coconut-crack-scroll": ["palmo.co.in", "scroll", "hard"],
  "palmo-pure-fresh-clean-words": ["palmo.co.in", "scroll", "medium"],
  "papertiger-card-stack-to-fullbleed": ["papertiger.com", "scroll", "hard"],
  "papumba-play-explore-ipad-transition": ["papumba.com", "opens / changes", "medium"],
  "pixel-melbourne-crafty-bunch-scroll": ["pixel.melbourne", "scroll", "medium"],
  "pixel-melbourne-menu-directors-hover": ["pixel.melbourne", "hover", "hard"],
  "pudding-essential-words-pinned-cloud": ["pudding.cool", "scroll", "hard"],
  "rapidkert-soil-dive-pinned": ["rapidkert.com", "scroll", "hard"],
  "raycast-animation": ["raycast.com", "plays by itself", "hard"],
  "rebelliously-optimistic-four-commitments": ["rebelliously-optimistic.com", "scroll", "hard"],
  "rebelliously-optimistic-pinned-hero": ["rebelliously-optimistic.com", "scroll", "hard"],
  "slowdown-featured-work-view-work-cursor": ["slowdowncreative.com", "cursor-follow", "medium"],
  "slowdown-footer-services-rolling-labels": ["slowdowncreative.com", "scroll", "medium"],
  "slowdown-footer-slow-down-reveal": ["slowdowncreative.com", "scroll", "medium"],
  "slowdown-nav-hover-bullets": ["slowdowncreative.com", "hover", "easy"],
  "slowdown-process-experience-reveal": ["slowdowncreative.com", "hover", "easy"],
  "squarespace-brand-logo-hover-reveal": ["brand.squarespace.com", "hover", "medium"],
  "truus-letters-scatter-along-path": ["truus.co", "scroll", "hard"],
  "victor-furuya-core-values-scroll": ["victorfuruya.com", "scroll", "medium"],
  "victor-furuya-make-it-matter-collapse": ["victorfuruya.com", "opens / changes", "medium"],
  "victor-furuya-manifesto-text": ["victorfuruya.com", "plays by itself", "medium"],
  "victor-furuya-work-index-transition": ["victorfuruya.com", "opens / changes", "medium"],
  "wisprflow-dictation-notetaker-toggle": ["wisprflow.ai", "opens / changes", "medium"],
  "wisprflow-hero-text-ribbons": ["wisprflow.ai", "plays by itself", "hard"],
};
const sections: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "background", label: "Background" },
  { id: "design", label: "Design philosophy" },
  { id: "methodology", label: "Methodology" },
  { id: "task", label: "Tasks" },
  { id: "scoring", label: "Scoring" },
  { id: "example", label: "A scored example", sub: true },
  { id: "results", label: "Results" },
  { id: "failures", label: "What models get wrong" },
  { id: "timeline", label: "The timeline", sub: true },
  { id: "wispr", label: "Worked example", sub: true },
  { id: "under", label: "Under-animation", sub: true },
  { id: "stagger", label: "Stagger flattened", sub: true },
  { id: "hero", label: "Hero visuals", sub: true },
  { id: "framing", label: "Invented framing", sub: true },
  { id: "edges", label: "Dropped behaviour", sub: true },
  { id: "text", label: "Right words, wrong places", sub: true },
  { id: "flipbook", label: "Screenshot flipbook", sub: true },
  { id: "conclusion", label: "Conclusion" },
  { id: "implications", label: "What this implies", sub: true },
  { id: "final", label: "Final thoughts" },
  { id: "tasks", label: "All 48 tasks" },
];
const fmt = (v: number) => v.toFixed(3);
const P = "mb-7 max-w-[760px] text-[16px] leading-[1.72] text-[#3a3a3a]";

function Fig({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="bench-fig">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Vid({ src, label, caption }: { src: string; label: string; caption: string }) {
  return (
    <figure className="bench-fig">
      <video src={src} aria-label={label} autoPlay loop muted playsInline preload="metadata" className="ab-video" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function AnimationBenchPage() {
  return (
    <main className="bench flex w-full max-w-[1320px] flex-1 flex-col px-3 py-1 sm:px-4">
      <article className="rounded bg-white px-5 py-14 sm:px-12 sm:py-16">
        <div className="mx-auto flex max-w-[1180px] flex-col">
          <Link href="/research" className="bench-mono-label bench-link w-fit">← Research</Link>
          <header id="overview" className="mt-6 flex scroll-mt-24 flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="bench-pill bench-pill-tag">
                <i />
                Model evaluation
              </span>
            </div>
            <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] leading-[1.05] tracking-[-0.03em] text-[#0d0d0d]">
              Animation Bench
            </h1>
            <div className="bench-mono-label">Physera · Updated 25 September 2026, Tim C · v0.1</div>
            <p className="max-w-[760px] text-[17px] leading-relaxed text-[#3a3a3a]">
              Frontier multimodal coding agents can already recreate visually plausible web animations, but current
              evaluation methods fail to discriminate between screenshot parity and shippable frontend reconstruction.
            </p>
          </header>

          <div className="bench-article mt-10">
            <SectionNav sections={sections} />
            <div className="bench-article-body">
              <div className="bench-stats mb-10">
                <div>
                  <div className="bench-mono-label">Models</div>
                  <div className="v">4</div>
                  <div className="k">frontier models, same harness</div>
                </div>
                <div>
                  <div className="bench-mono-label">Tasks</div>
                  <div className="v">48</div>
                  <div className="k">real web animations</div>
                </div>
                <div>
                  <div className="bench-mono-label">Reconstructions</div>
                  <div className="v">192</div>
                  <div className="k">one per model and task</div>
                </div>
                <div>
                  <div className="bench-mono-label">Sites</div>
                  <div className="v">32</div>
                  <div className="k">live commercial websites</div>
                </div>
              </div>

              <h2 id="background" className="bench-h2 scroll-mt-24">Background</h2>
                <p className={P}>Frontend generation is one of the most sought-after commercial coding agent use cases. Current design-to-code agents will happily take a picture of a page and fully reproduce its visual palette, typography, and layout. But a production page is not merely a single frame. It is a sequence of highly-versatile frames, state transitions, and numerous user interactions: hovers, scrolls, clicks, drags. Are models capable of rebuilding the full animation, not just the first frame?</p>
                <p className={P}>We have built Animation Bench to answer that question and tested the strongest 4 frontier models on 48 tasks sourced from real websites. Each model worked in its own sandbox, using the same set of reference frames (12–24), and had to deliver a self-contained HTML file. Our results show models predominantly score highly on visual cues (0.61–0.86), yet quite low on metrics capturing motion and temporal consistency (0.27–0.38).</p>
                <p className={P}>Entering the era of recursive self-improvement (RSI) means we need to put even more attention into how we shape the verifiers that ultimately decide how we measure progress. Left unchecked, frontier model capabilities will saturate on tasks in domains with easily-verifiable outcomes. Animation Bench is that check for web animation.</p>

              <h2 id="design" className="bench-h2 scroll-mt-24">Design philosophy</h2>
                <p className={P}>We set out to measure how good models truly are in actual end-to-end reconstruction of a given animation. These are our key design tenets:</p>
                <ol className="bench-list list-decimal">
                  <li><strong>Reproduction &gt; generation.</strong> Each task’s score is measured directly and objectively against the real animation.</li>
                  <li><strong>Frames in, motion out.</strong> Each model was given between 12 and 24 frames, depending on the task, and the page’s network capture. It does not, however, get any of the site’s source code, a video, or a description of the timing.</li>
                  <li><strong>Real sites, chosen to maximally represent true web animation coverage.</strong>
                    <ul className="bench-list list-disc">
                      <li>We have sourced animations from various commercial sites across editorial / portfolio work, e-commerce, product and brand.</li>
                      <li>The 48 animations capture every common trigger: plays by itself, scroll, hover, cursor-follow, click and drag, and state changes.</li>
                    </ul>
                  </li>
                  <li><strong>Separate scoring axes.</strong> We have decided on 3 key scoring axes that we feel are representative of the true objective success of the given animation reproduction, namely: visual similarity, motion consistency, layout correctness. The result can win on layout, yet lose on motion, and a single number would fail to aptly describe where models fall short.</li>
                  <li><strong>We test the running artifact.</strong> Each result is opened in a real browser, driven the way a user would, and recorded frame by frame.</li>
                </ol>

              <h2 id="methodology" className="bench-h2 scroll-mt-24">Methodology</h2>
                <p className={P}>We ran 192 evaluations with Computer-1 through the Harbor framework, four models on the same 48 tasks, all at maximum reasoning effort. Each model worked in its own sandbox with a 1280×720 desktop, a shell, the task’s reference frames and the page’s network capture, and had to deliver a single self-contained HTML file. The reported results contain one selected run for each model and task pair.</p>
                <ul className="bench-list list-disc">
                  <li><strong>Agent:</strong> Computer-1, run through Harbor</li>
                  <li><strong>Reasoning effort:</strong> max</li>
                  <li><strong>Viewport:</strong> a 1280×720 desktop</li>
                  <li><strong>Tools:</strong> a shell (bash) alongside the computer-use tools</li>
                </ul>

              <h2 id="task" className="bench-h2 scroll-mt-24">Tasks</h2>
                <p className={P}>Each task is one precise animation on one real, deployed page, with a fixed start and end state.</p>
                <p className={P}><strong>Input.</strong> The model receives 12 to 24 reference frames sampled across the animation (with capture timestamps where available) and a HAR capture of the page: the HTML, CSS, JavaScript, fonts, images and video the live site loaded. It does not receive the site’s source as a project, a video, or any description of the timing beyond the frames themselves.</p>
                <p className={P}><strong>Output.</strong> Exactly one file, <code>index.html</code>, self-contained, with inline CSS and JavaScript. No external requests.</p>
                <p className={P}><strong>Evaluation.</strong> We open the file in a headless browser at 1280×720, drive it with the task’s trigger (wait, scroll, hover, drag, click), capture it frame by frame the same way we captured the original, and compare the two captures.</p>
                <p className={P}>The 48 tasks come from 32 sites and are chosen for coverage, not spectacle. Every task is tagged by what triggers it, what property changes, how it is timed, how much of the page moves, and what kind of site it comes from:</p>
                <div className="overflow-x-auto"><table className="bench-table my-6 max-w-[760px]"><thead><tr><th>Trigger</th><th className="num">Tasks</th><th>What the model has to recover</th></tr></thead><tbody>
                  <tr><td className="whitespace-nowrap">Scroll</td><td className="n">21</td><td>Progress tied to scroll position: pinned sequences, scroll-driven text, scroll-linked transforms</td></tr>
                  <tr><td className="whitespace-nowrap">Plays by itself</td><td className="n">12</td><td>Load-in entrances, ambient loops, auto-cycling scenes</td></tr>
                  <tr><td className="whitespace-nowrap">Hover</td><td className="n">6</td><td>Reveals and state changes on pointer enter, and their reversal on leave</td></tr>
                  <tr><td className="whitespace-nowrap">Click / drag / key</td><td className="n">4</td><td>Drag carousels, dial scrubbing, spring physics</td></tr>
                  <tr><td className="whitespace-nowrap">Opens or changes</td><td className="n">4</td><td>Page transitions, view switches, expand-collapse</td></tr>
                  <tr><td className="whitespace-nowrap">Cursor-follow</td><td className="n">1</td><td>A contextual cursor that changes over specific elements</td></tr>
                </tbody></table></div>
                <p className={P}>31 tasks are hard (physics, canvas, interruptible, or whole-page), 14 medium, 3 easy. 32 are staggered, 25 one-shot, 20 scroll-linked; 16 involve canvas or WebGL. 44 of 48 come from sites unlikely to be memorised from training data. The full list is at the end of the page.</p>

              <h2 id="scoring" className="bench-h2 scroll-mt-24">Scoring</h2>
                <p className={P}>Each result is compared with the original recording frame by frame. We score 3 axes, and each is built from several sub-scores that catch different kinds of mistakes.</p>
                <div className="overflow-x-auto"><table className="bench-table my-6 max-w-[760px]"><thead><tr><th>Axis</th><th>Question</th><th>Measured by</th></tr></thead><tbody>
                  <tr><td className="whitespace-nowrap"><strong>Visual similarity</strong></td><td>Does it look right at a sampled moment?</td><td>MS-SSIM, LPIPS, foreground colour histogram, Canny edge F1, coverage</td></tr>
                  <tr><td className="whitespace-nowrap"><strong>Motion consistency</strong></td><td>Does it move right over time?</td><td>Per-frame motion energy, optical flow, and moving-region trajectory, gated by the <em>amount</em> and <em>location</em> of motion</td></tr>
                  <tr><td className="whitespace-nowrap"><strong>Layout correctness</strong></td><td>Is it built like the original?</td><td>OCR: text presence, spelling, reading order, and bounding-box alignment</td></tr>
                </tbody></table></div>
                <h3 className="bench-h3">Visual similarity: does it look right at a given moment?</h3>
                <ul className="bench-list list-disc">
                  <li><strong>Coverage:</strong> are the same parts of the screen filled? Catches missing or extra blocks of content.</li>
                  <li><strong>MS-SSIM:</strong> are the same shapes in the same places, compared at several zoom levels? Catches layout drift that colour alone would miss.</li>
                  <li><strong>LPIPS:</strong> would a person say the two frames look alike? A learned perceptual measure, useful where pixel comparisons are too strict.</li>
                  <li><strong>Colour:</strong> do the foreground colours match? A hue histogram, so the palette counts without dominating.</li>
                  <li><strong>Edges:</strong> do outlines and borders line up? Catches shapes that are the right colour but the wrong geometry.</li>
                </ul>
                <h3 className="bench-h3">Motion consistency: does it move right over time?</h3>
                <ul className="bench-list list-disc">
                  <li><strong>Energy:</strong> how much does the screen change from frame to frame? Catches pages that barely move, or move too much.</li>
                  <li><strong>Flow:</strong> how far do pixels actually travel? Optical flow separates real movement from simple fades or flicker.</li>
                  <li><strong>Trajectory:</strong> does the main moving element follow the same path, in the same direction and order?</li>
                </ul>
                <p className={P}>Motion is also gated by how much moves and where. A page that sits still, or moves in the wrong part of the screen, can’t earn motion credit elsewhere.</p>
                <h3 className="bench-h3">Layout correctness: is it built like the original?</h3>
                <ul className="bench-list list-disc">
                  <li><strong>Text presence:</strong> do the same words appear?</li>
                  <li><strong>Text accuracy:</strong> are they spelled the same?</li>
                  <li><strong>Box alignment:</strong> do the words sit in the same positions?</li>
                  <li><strong>Reading order:</strong> do they appear in the same top-to-bottom order?</li>
                </ul>
                <p className={P}>Text is the most reliable anchor for structure. A page can match in colour and shape and still put the headline in the wrong place or drop half the copy.</p>
                <p className={P}>The overall score combines visual, motion and layout with trigger-aware weights (a scroll task, for example, weights motion more heavily). All scores are reproduction scores on a 0–1 scale, not success rates.</p>

                <h3 id="example" className="bench-h3 scroll-mt-24">Example: how one reconstruction is scored</h3>
                <p className={P}>Here is one reconstruction scored end to end: Claude Opus 5.5’s rebuild of the pinned hero on oxigen.sa. In the original, a palm tree made of glowing voxels grows over a voxel landscape while the section stays pinned and the copy changes as you scroll. Opus 5.5 built something recognisable, and very different.</p>
                <Vid src="/animation-bench/ab-scoring-example-oxigen.mp4" label="oxigen.sa voxel palm: the reference beside Claude Opus 5.5’s reconstruction" caption="The original’s palm assembles, grows and fills the frame as you scroll. Opus 5.5 draws a cyan fountain that barely changes, and its copy scrolls up under the logo instead of staying pinned." />
                <p className={P}><strong>Visual similarity: 0.475</strong></p>
                <ul className="bench-list list-disc">
                  <li>MS-SSIM 0.41 (weight 0.32) · LPIPS 0.33 (0.32) · colour 0.78 (0.13) · edges 0.34 (0.08) · coverage 0.73 (0.15)</li>
                </ul>
                <p className={P}>Right mood, wrong object. The palette is close and the screen is filled in roughly the right places, but nobody would call that fountain a palm tree, and the perceptual score (LPIPS 0.33) agrees.</p>
                <p className={P}><strong>Motion consistency: 0.384</strong></p>
                <ul className="bench-list list-disc">
                  <li>Profile: energy 0.50 (weight 0.5) · flow 0.46 (0.2) · trajectory 0.81 (0.3) = 0.59</li>
                  <li>Gates: amount 0.73 · structure 0.90</li>
                  <li>Score: 0.59 × 0.73 × 0.90 ≈ 0.38</li>
                </ul>
                <p className={P}>The page moves in roughly the right part of the screen, which keeps it well off zero. But the fountain stays put while the original’s tree is being built, so only about half of the frame-to-frame motion matches.</p>
                <p className={P}><strong>Layout correctness: 0.391</strong></p>
                <ul className="bench-list list-disc">
                  <li>Text presence 0.32 (weight 0.35) · spelling 0.49 (0.25) · reading order 1.00 (0.15) · box alignment 0.03 (0.25)</li>
                </ul>
                <p className={P}>The copy exists in the page, but at most moments it’s somewhere else: scrolled away, or stacked under the logo. Only a third of the reference’s text is on screen when it should be, and almost none of it in the right place.</p>
                <p className={P}><strong>Overall: 0.423</strong> = (0.353 × 0.475 + 0.412 × 0.384 + 0.059 × 0.391) / 0.824. Weights depend on the task: this one is mostly a 3D scene, so layout counts for little, and interaction’s 0.18 is held out and the rest rescaled.</p>

              <h2 id="results" className="bench-h2 scroll-mt-24">Results</h2>
                <div className="overflow-x-auto">
                <table className="bench-table my-6">
                  <thead>
                    <tr>
                      <th>Model</th>
                      <th className="w-full">Mean overall, 48 tasks</th>
                      <th className="num">Overall</th>
                      <th className="num">Visual</th>
                      <th className="num">Motion</th>
                      <th className="num">Layout</th>
                      <th className="num">Task wins</th>
                      <th className="num">$ / task</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.models.map((m, i) => (
                      <tr key={m.id} className={i === 0 ? "lead" : ""}>
                        <td className="whitespace-nowrap">{LABEL[m.id]}</td>
                        <td>
                          <div className="bench-bar">
                            <b style={{ width: `${m.mean * 100}%`, background: COLOR[m.id] }} />
                          </div>
                        </td>
                        <td className="n">{fmt(m.mean)}</td>
                        <td className="n">{fmt(m.visual)}</td>
                        <td className="n">{fmt(m.motion)}</td>
                        <td className="n">{fmt(m.layout)}</td>
                        <td className="n">{m.wins}</td>
                        <td className="n">${m.cost.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
                <p className={P}>The four models are, on the whole, closer together than a leaderboard makes them look.</p>
                <p className={P}><strong>The field is close.</strong> GPT-6 Astra leads with a mean of 0.550 and GPT-6 Sol trails at 0.470, a spread of 0.079 across 48 tasks. Resampling the tasks (10,000 paired draws, 95% intervals), only two of the six pairwise differences hold: Astra over Sol (+0.079; +0.045 to +0.115) and Astra over Opus 5.5 (+0.051; +0.020 to +0.086). Astra’s margin over Fable 5.1 sits at the edge (+0.001 to +0.060); the rest cannot be told apart. The models also largely agree on which tasks are hard (Kendall τ 0.42–0.62 between any two), which suggests the tasks, more than the models, set the ceiling.</p>
                <p className={P}><strong>Every model is weakest on motion.</strong> Each reproduces how a page looks far better than how it moves: visual similarity lies between 0.61 and 0.68, motion consistency between 0.27 and 0.38. Visual exceeds motion in 174 of the 192 reconstructions, by 0.30 on average, and the two are only loosely related (r = 0.30). A page that looks right is scarcely more likely to move right.</p>
                <Fig src="/animation-bench/ab-visual-vs-motion.webp" alt="Four small scatter plots, one per model, of visual similarity against motion consistency; most points fall below the diagonal." caption="Each dot is one reconstruction. Points below the grey line look better than they move. Ticks along each axis mark every value, and the axes span only the range the data covers." />
                <p className={P}><strong>Money does not settle it.</strong> Mean spend per task runs from $0.45 for Sol to $3.89 for Fable 5.1, close to a ninefold difference, against a spread in score of 0.079. Astra, at $3.04, is both the strongest and the second most expensive. Within each model, the tasks it spent more on did not score higher (Spearman ρ from −0.41 to +0.09).</p>

              <h2 id="failures" className="bench-h2 scroll-mt-24">What frontier models get wrong</h2>
                <p className={P}>The axis means say <em>that</em> motion is the gap. The reconstructions themselves say <em>what</em> the gap is made of. We read all 192 generated pages and replayed a subset side by side with the reference. Each failure below is observable in the output, countable across the set, and has a named example.</p>

                <h3 id="timeline" className="bench-h3 scroll-mt-24">The timeline: parts right, schedule wrong</h3>
                  <p className={P}>This is the central finding. Decompose the motion score and the models do well on <em>where</em> motion happens — the location gate averages 0.87 — and at chance on <em>when</em> it happens. For the 160 reconstructions that move at all, the timing term averages 0.53, a per-step correlation with the reference of r ≈ 0.05. Pair every reconstruction with the reference from a different task and the same term scores 0.51. The model’s schedule carries almost no information about the original’s schedule.</p>
                  <p className={P}>What models produce instead is a compressed version: motion bunched into one burst. The single largest step holds a median 30% of a reconstruction’s motion, against 16% in the reference (paired n = 144, Wilcoxon p ≈ 3×10⁻¹⁷). When the timing is off, it is more often early than late (34 vs 16).</p>
                  <p className={P}>The same pattern shows up in the code. Nine of 32 one-shot intros were written as infinite loops (<code>(now - t0) % CYCLE</code>): the model saw an entrance and shipped a screensaver. On one long autoplay sequence (8.4 s in the reference), three of four models finished all visible change within about one second.</p>
                  <Vid src="/animation-bench/ab-timeline-berd.mp4" label="berd.xyz intro: the reference beside Claude Opus 5.5" caption="berd.xyz. The reference morphs a small window into the app, then types “Less chatting, more doing.” over its final seconds. Claude Opus 5.5 starts typing early and finishes well ahead of it (motion 0.40)." />

                <h3 id="wispr" className="bench-h3 scroll-mt-24">Worked example: the Wispr Flow toggle</h3>
                  <p className={P}>The clearest single case is small. On wisprflow.ai, a two-option pill — <em>Dictation | Notetaker</em> — runs one sequence:</p>
                  <ul className="bench-list list-disc">
                    <li>The white thumb sits on <em>Dictation</em>.</li>
                    <li>At about 8.0 s it slides to <em>Notetaker</em>.</li>
                    <li>From about 8.2 s to 9.3 s the letters of <em>Notetaker</em> ripple: each lifts and drops in turn, left to right.</li>
                    <li>By about 10.7 s the thumb slides back to <em>Dictation</em>.</li>
                  </ul>
                  <Vid src="/animation-bench/ab-wispr-opus-fable.mp4" label="Wispr Flow toggle: the reference beside Claude Opus 5.5 and Claude Fable 5.1" caption="Wispr Flow toggle. Claude Opus 5.5 slides on time and never returns (motion 0.53); Claude Fable 5.1 starts already switched and returns on time (motion 0.46)." />
                  <p className={P}>Every model recognised the component and reproduced its appearance (visual 0.80–0.85, layout ≈ 0.96 for all four). Two models also recognised the ripple and wrote the right mechanism for it: Claude Opus 5.5 a per-letter <code>@keyframes wave</code> with a 70 ms stagger; Claude Fable 5.1 a per-character transform sequence. Perception and mechanism were not the problem.</p>
                  <p className={P}>The schedule was. Each model reconstructed a different fragment of it:</p>
                  <div className="overflow-x-auto"><table className="bench-table my-6 max-w-[760px]"><thead><tr><th>Model</th><th>Slide on time (f1)</th><th>Ripple after slide</th><th>Returns on time (f10)</th></tr></thead><tbody>
                    <tr><td className="whitespace-nowrap">Claude Opus 5.5</td><td>✓</td><td>fires immediately, short</td><td>never returns</td></tr>
                    <tr><td className="whitespace-nowrap">Claude Fable 5.1</td><td>starts already switched</td><td>faint</td><td>✓</td></tr>
                    <tr><td className="whitespace-nowrap">GPT-6 Sol</td><td>2 frames late</td><td>none</td><td>1 frame late</td></tr>
                    <tr><td className="whitespace-nowrap">GPT-6 Astra</td><td>7 frames late</td><td>barely</td><td>never returns</td></tr>
                  </tbody></table></div>
                  <p className={P}>Opus 5.5 scores 0.753 and Fable 5.1 0.746. The numbers call it a tie. The pages are two different half-answers. That is the failure in miniature: the models can see each part of an animation and know how to build it, but they do not recover the timeline that connects the parts — the order, the delay before the ripple, the duration, the return.</p>

                <h3 id="under" className="bench-h3 scroll-mt-24">Under-animation</h3>
                  <p className={P}>Reconstructions move less than the originals, almost never more. Only 3 of 192 carry more than twice the reference’s motion energy. Sol is the most conservative: its median reconstruction carries about a third of the reference’s motion. Even Astra, the most animated, sits below the reference at the median. Combined with the timeline finding above, the typical reconstruction is a correct-looking page with less motion, delivered faster.</p>
                  <Vid src="/animation-bench/ab-under-animation-manifesto.mp4" label="victorfuruya.com manifesto: the reference beside Claude Opus 5.5" caption="victorfuruya.com manifesto. The reference reveals the paragraph word by word; Claude Opus 5.5 has it on screen almost at once, with a fifth of the reference’s motion (motion 0.14)." />

                <h3 id="stagger" className="bench-h3 scroll-mt-24">Stagger flattened</h3>
                  <p className={P}>Staggered choreography — elements entering one after another — is the most common timing pattern in the set (32 tasks). In 34 of 128 reconstructions of staggered tasks we found no delay or stagger construct at all: every element starts together. Sol accounts for 16 of the 34. Within the same task, those pages score 0.07 lower on motion.</p>
                  <Vid src="/animation-bench/ab-stagger-wispr-sol.mp4" label="Wispr Flow toggle: the reference beside GPT-6 Sol" caption="The same Wispr toggle, rebuilt by GPT-6 Sol. The thumb slides, but the letters of Notetaker change as one block, with no ripple (motion 0.27)." />

                <h3 id="hero" className="bench-h3 scroll-mt-24">Hero visuals approximated</h3>
                  <p className={P}>The expensive part of a commercial animation is often its hero asset: a WebGL scene, a 3D product, a photographic sequence. Fifteen of the 16 canvas tasks come from sites that ship WebGL or three.js. Only GPT-6 Astra used WebGL, on 5 of 16, by inlining the site’s own three.js from the capture; the other models rebuilt these scenes in Canvas2D. The results are recognisable and wrong.</p>
                  <Vid src="/animation-bench/ab-hero-oxigen.mp4" label="oxigen.sa voxel palm: the reference beside GPT-6 Astra and Claude Opus 5.5" caption="oxigen.sa. GPT-6 Astra rebuilt the voxel palm in WebGL (visual 0.62, overall 0.68); Claude Opus 5.5 drew a cyan fountain on a 2D canvas (visual 0.48, overall 0.42)." />
                  <p className={P}>On oxigen.sa, the reference is a voxel palm tree assembling while the section stays pinned. Astra reproduces it closely frame for frame (0.68). Opus 5.5 draws a cyan fountain and lets the text scroll away under the header (0.42). Fable 5.1 builds the palm out of oversized cubes inside dark side bars (0.43). Sol’s sequence lags behind the scroll and its text overprints the tree (0.37). Elsewhere, photographic cards became flat coloured placeholders.</p>

                <h3 id="framing" className="bench-h3 scroll-mt-24">Invented framing</h3>
                  <p className={P}>Eleven of the 52 reconstructions we inspected visually added dark side bars that the reference does not have: the page is letterboxed into a fixed-aspect column instead of filling the viewport (Sol 6, Opus 5.5 3, Fable 5.1 2). It is a small thing to see and a real thing to ship: the page no longer behaves like a page. On pudding.cool’s pinned word cloud, Astra and Fable 5.1 are close to the reference; Opus 5.5 adds fixed black bars on both sides and Sol runs ahead of the scroll inside a letterbox.</p>
                  <Vid src="/animation-bench/ab-framing-pudding.mp4" label="pudding.cool word cloud: the reference beside Claude Fable 5.1 and GPT-6 Sol" caption="pudding.cool. Claude Fable 5.1 fills the page like the original (visual 0.74); GPT-6 Sol squeezes it into a column between dark side bars (visual 0.50, coverage 0.31)." />

                <h3 id="edges" className="bench-h3 scroll-mt-24">Behaviour dropped at the edges</h3>
                  <p className={P}>Several reconstructions implement the headline behaviour and drop what surrounds it:</p>
                  <ul className="bench-list list-disc">
                    <li><strong>Pinned sections that do not pin.</strong> The content scrolls past instead of holding while the animation plays (3 of 52 inspected). On the slowdown footer, Astra holds the block while the icons rotate; Sol and Fable 5.1 let it scroll away.</li>
                    <li><strong>Drag not wired.</strong> On kaviengcreative.com, cards should fly into a grid under drag. Astra and Fable 5.1 assemble the grid; Sol fades the title but the cards never assemble; Opus 5.5 does nothing on drag.</li>
                  </ul>
                  <Fig src="/animation-bench/slowdown-footer-services-rolling-labels.webp" alt="Slowdown footer: reference row and four model rows; pinned block with rotating icons." caption="Slowdown footer: pinned block with rotating icons" />
                  <Vid src="/animation-bench/ab-drag-kavieng.mp4" label="kaviengcreative.com drag: the reference beside GPT-6 Astra and Claude Opus 5.5" caption="kaviengcreative.com. Dragging should fly the cards into a grid. GPT-6 Astra assembles it (motion 0.73); Claude Opus 5.5 leaves the page still under the drag (motion 0.19)." />

                <h3 id="text" className="bench-h3 scroll-mt-24">Right words, wrong places</h3>
                  <p className={P}>The models do not invent copy. Every reconstruction’s visible text comes from the capture; none contains placeholder text. But the text is frequently not where it should be. Across the sampled frames, roughly 35–40% of the reference’s text labels never appear on screen in the reconstruction and 13% are misspelled; 30% of the text a reconstruction <em>does</em> show has no counterpart in the reference. Bounding-box alignment — whether the words occupy the same positions — averages 0.21, the lowest term on any axis.</p>
                  <p className={P}>The visual axis shows the same split between palette and geometry. Colour agreement averages 0.86; edge agreement (whether outlines and borders line up) averages 0.29 and is the weakest visual term in 165 of 192 reconstructions. The models get the palette. They do not get the shapes.</p>
                  <Vid src="/animation-bench/ab-layout-dialkit.mp4" label="dialkit.dev headline: the reference beside Claude Fable 5.1 and Claude Opus 5.5" caption="dialkit.dev. Claude Fable 5.1 sets the headline at the original’s size and position (layout 0.94); Claude Opus 5.5 has the same words, smaller and lighter, so they no longer sit where the original’s do (layout 0.63, box alignment 0.02)." />

                <h3 id="flipbook" className="bench-h3 scroll-mt-24">The screenshot flipbook</h3>
                  <p className={P}>Fourteen reconstructions solved the task by embedding the reference frames themselves as images and stepping through them on a timer, on scroll, or on hover (Sol 10, Astra 3, Opus 5.5 1). It is the purest form of screenshot mimicry: correct at every stored frame by construction, and wrong everywhere between them. It does not pay. Within the same task, flipbooks score 0.07 lower on motion than reconstructions that rebuild the animation, and slightly lower overall.</p>
                  <Vid src="/animation-bench/ab-flipbook-squarespace.mp4" label="brand.squarespace.com hover: the reference beside GPT-6 Sol and GPT-6 Astra" caption="brand.squarespace.com. GPT-6 Sol’s page is sixteen stored screenshots swapped on a timer (motion 0.48); GPT-6 Astra animates the reveal itself (motion 0.78)." />

              <h2 id="conclusion" className="bench-h2 scroll-mt-24">Conclusion</h2>
                <h3 id="implications" className="bench-h3 scroll-mt-24">What this implies</h3>
                <p className={P}><strong>For model builders.</strong> The shortfall is not in seeing the page or writing the code. It lies in turning a handful of stills into a schedule: order, delay, duration, overlap, return. That is a narrow, nameable failure of temporal reasoning, and a narrow failure can be trained against.</p>
                <p className={P}><strong>For benchmarks.</strong> Similarity scores tell you how far a page is from the original, not what went wrong. The natural next unit is the event: “thumb slides at t₁ ✓, ripple follows the slide ✗, thumb returns at t₂ ✓”. A list of events is something an engineer can act on and a training loop can reward.</p>
                <p className={P}><strong>For environments.</strong> Every failure described above can be checked in a browser without a person in the loop. Does the section pin? Does the intro stop? Does the drag move the cards? Does the thumb come back? That makes frontend reconstruction an unusually clean domain in which to train agents that build, run and revise their own work.</p>

              <h2 id="final" className="bench-h2 scroll-mt-24">Final thoughts</h2>
                <p className={P}>So, can frontier models rebuild a web animation, not just its first frame? Not yet. They reproduce its palette, its typography and its layout, and they usually recognise what kind of component they are looking at. More often than not they reach for the right technique. What they do not recover is time: the order in which things happen, the pause before the next thing, how long each movement lasts, and whether the page returns to where it began. Every model scored lower on motion than on appearance, and the pages they built were, for the most part, right at a glance and wrong over the following few seconds. That is precisely the gap a screenshot cannot see, and precisely the part a user notices first.</p>
                <p className={P}>Animation Bench is the first body of work to come from Physera that attempts to bridge the gap for the next succession of frontier models, so that they can improve on the axes people actually perceive: motion, timing, and layout. If you are working on frontend generation, or environments for agents that build software, we’d love to hear from you.</p>

              <h2 id="tasks" className="bench-h2 scroll-mt-24">Every task, every model</h2>
                <p className={P}>All 48 tasks with their site, trigger and difficulty, and each model’s overall score. One selected generation per task and model, scored against one reference capture. Differences under ~0.02 should not be read as capability differences.</p>
                <div className="overflow-x-auto">
                <table className="bench-table bench-grid my-6">
                  <thead>
                    <tr>
                      <th>Task</th>
                      {results.models.map((m) => (
                        <th key={m.id} className="center" title={LABEL[m.id]}>
                          {SHORT[m.id]}
                        </th>
                      ))}
                      <th>Site</th>
                      <th>Trigger</th>
                      <th>Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.tasks.map((t) => {
                      const best = Math.max(...results.models.map((m) => t.scores[m.id as keyof typeof t.scores].score));
                      const [site, trigger, difficulty] = TASK_META[t.id] ?? ["", "", ""];
                      return (
                        <tr key={t.id}>
                          <td className="whitespace-nowrap">{t.id}</td>
                          {results.models.map((m) => {
                            const r = t.scores[m.id as keyof typeof t.scores];
                            return (
                              <td key={m.id} className={r.score === best ? "cell pass" : "cell"}>
                                {fmt(r.score)}
                              </td>
                            );
                          })}
                          <td className="muted whitespace-nowrap">{site}</td>
                          <td className="muted whitespace-nowrap">{trigger}</td>
                          <td className="muted">{difficulty}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className={P}>
                The best score on each task is highlighted. Download{" "}
                <a className="bench-link" href="/animation-bench/results.json">
                  all 48 task scores (JSON)
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
