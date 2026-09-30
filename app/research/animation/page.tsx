import type { Metadata } from "next";
import Link from "next/link";
import SectionNav, { type Section } from "./SectionNav";
import "./style.css";
import Leaderboard, { ResultsCharts } from "./Leaderboard";
import TaskScores from "./TaskScores";
import CopyBlock from "./CopyBlock";
import AutoVideo from "./AutoVideo";
import Wall from "./Wall";
import Flipbook from "./Flipbook";
import HeroReel from "./HeroReel";
import VisualVsMotion from "./VisualVsMotion";
import CostVsScore from "./CostVsScore";
import ScoringExample from "./ScoringExample";
import Disclosure from "./Disclosure";

export const metadata: Metadata = {
  title: "Animation Bench",
  description:
    "Four frontier models reconstruct 48 real web animations from 12 to 24 frames and a network capture. Animation Bench scores visual similarity, motion consistency, and layout correctness.",
  alternates: { canonical: "/research/animation" },
};

const TASK_META: Record<string, [site: string, trigger: string, difficulty: string, genre: string]> = {
  "adcker-menu-services-hover": ["adcker.com", "hover", "medium", "portfolio"],
  "altitude101-glass-ring-word-swap": ["altitude101.com", "scroll", "hard", "portfolio"],
  "altitude101-words-scroll-rates": ["altitude101.com", "scroll", "hard", "portfolio"],
  "ausify-vibe-canvas-carousel": ["ausify.com.au", "drag / click", "hard", "saas"],
  "basement-studio-graffiti-hero": ["basement.studio", "plays by itself", "hard", "portfolio"],
  "benxrun-skyline-chapter-scroll": ["benxrun.com", "scroll", "hard", "portfolio"],
  "berd-window-morphs-into-app": ["berd.xyz", "plays by itself", "hard", "saas"],
  "charmling-99-charms-flythrough": ["charmling.app", "scroll", "hard", "ecommerce"],
  "ciaoenergy-cans-fan-scroll-spin": ["ciaoenergy.com", "plays by itself", "hard", "ecommerce"],
  "ciaoenergy-cans-sideways-selection": ["ciaoenergy.com", "scroll", "hard", "ecommerce"],
  "ciaoenergy-text-dancing-scroll": ["ciaoenergy.com", "scroll", "hard", "ecommerce"],
  "cipher-loader-stills-ring": ["cipher.tv", "plays by itself", "hard", "portfolio"],
  "dialkit-dials-shape-headline": ["dialkit.dev", "drag / click", "hard", "app-ui"],
  "driftime-2025-pinned-scroll-morph": ["2025.driftime.com", "scroll", "hard", "brand"],
  "gufram-zero-gravity-collage-hero": ["gufram.it", "plays by itself", "hard", "ecommerce"],
  "kavieng-cards-fly-to-grid-drag": ["kaviengcreative.com", "drag / click", "hard", "portfolio"],
  "maxima-splash-curtain-whale-part2": ["maximatherapy.com", "plays by itself", "hard", "brand"],
  "maxima-splash-curtain-whale-scene": ["maximatherapy.com", "plays by itself", "medium", "brand"],
  "monopo-london-webgl-sections": ["monopo.london", "hover", "hard", "portfolio"],
  "motion-dev-animation": ["examples.motion.dev", "drag / click", "easy", "app-ui"],
  "neutomni-preloader-cut-along-line": ["neutomni.com", "plays by itself", "hard", "portfolio"],
  "neutomni-process-rolling-shape": ["neutomni.com", "scroll", "hard", "portfolio"],
  "otsuka-zeroz-intro-reveal": ["otsuka-air.jp", "plays by itself", "hard", "ecommerce"],
  "oxigen-voxel-palm-pinned": ["oxigen.sa", "scroll", "hard", "brand"],
  "palmo-coconut-crack-scroll": ["palmo.co.in", "scroll", "hard", "ecommerce"],
  "palmo-pure-fresh-clean-words": ["palmo.co.in", "scroll", "medium", "ecommerce"],
  "papertiger-card-stack-to-fullbleed": ["papertiger.com", "scroll", "hard", "portfolio"],
  "papumba-play-explore-ipad-transition": ["papumba.com", "opens / changes", "medium", "saas"],
  "pixel-melbourne-crafty-bunch-scroll": ["pixel.melbourne", "scroll", "medium", "portfolio"],
  "pixel-melbourne-menu-directors-hover": ["pixel.melbourne", "hover", "hard", "portfolio"],
  "pudding-essential-words-pinned-cloud": ["pudding.cool", "scroll", "hard", "editorial"],
  "rapidkert-soil-dive-pinned": ["rapidkert.com", "scroll", "hard", "brand"],
  "raycast-animation": ["raycast.com", "plays by itself", "hard", "saas"],
  "rebelliously-optimistic-four-commitments": ["rebelliously-optimistic.com", "scroll", "hard", "brand"],
  "rebelliously-optimistic-pinned-hero": ["rebelliously-optimistic.com", "scroll", "hard", "brand"],
  "slowdown-featured-work-view-work-cursor": ["slowdowncreative.com", "cursor-follow", "medium", "portfolio"],
  "slowdown-footer-services-rolling-labels": ["slowdowncreative.com", "scroll", "medium", "portfolio"],
  "slowdown-footer-slow-down-reveal": ["slowdowncreative.com", "scroll", "medium", "portfolio"],
  "slowdown-nav-hover-bullets": ["slowdowncreative.com", "hover", "easy", "portfolio"],
  "slowdown-process-experience-reveal": ["slowdowncreative.com", "hover", "easy", "portfolio"],
  "squarespace-brand-logo-hover-reveal": ["brand.squarespace.com", "hover", "medium", "brand"],
  "truus-letters-scatter-along-path": ["truus.co", "scroll", "hard", "portfolio"],
  "victor-furuya-core-values-scroll": ["victorfuruya.com", "scroll", "medium", "portfolio"],
  "victor-furuya-make-it-matter-collapse": ["victorfuruya.com", "opens / changes", "medium", "portfolio"],
  "victor-furuya-manifesto-text": ["victorfuruya.com", "plays by itself", "medium", "portfolio"],
  "victor-furuya-work-index-transition": ["victorfuruya.com", "opens / changes", "medium", "portfolio"],
  "wisprflow-dictation-notetaker-toggle": ["wisprflow.ai", "opens / changes", "medium", "saas"],
  "wisprflow-hero-text-ribbons": ["wisprflow.ai", "plays by itself", "hard", "saas"],
};
const sections: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "background", label: "Background" },
  { id: "design", label: "Design philosophy" },
  { id: "methodology", label: "Methodology" },
  { id: "task", label: "Tasks" },
  { id: "scoring", label: "Scoring" },
  { id: "visual", label: "Visual similarity", sub: true },
  { id: "motion", label: "Motion consistency", sub: true },
  { id: "layout", label: "Layout correctness", sub: true },
  { id: "overall", label: "Overall score", sub: true },
  { id: "example", label: "Scoring example", sub: true },
  { id: "results", label: "Results" },
  { id: "failures", label: "Where reconstructions fail" },
  { id: "timeline", label: "Motion timing breaks down", sub: true },
  { id: "under", label: "Motion is incomplete", sub: true },
  { id: "hero", label: "Complex visuals are approximated", sub: true },
  { id: "framing", label: "Page structure and text drift", sub: true },
  { id: "flipbook", label: "Screenshot replay", sub: true },
  { id: "conclusion", label: "Conclusion" },
  { id: "implications", label: "Implications", sub: true },
  { id: "final", label: "Final thoughts", sub: true },
  { id: "tasks", label: "Appendix: Tasks" },
  { id: "citation", label: "Citation" },
  { id: "partner", label: "Partner with us" },
];
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
      <AutoVideo src={src} label={label} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

const RUN_STEPS = [
  { k: "Input", v: "12–24 frames", s: "+ the page’s network capture" },
  { k: "Agent", v: "Computer-1", s: "run through Harbor · max reasoning" },
  { k: "Sandbox", v: "1280×720", s: "desktop + bash shell" },
  { k: "Output", v: "index.html", s: "one self-contained file" },
  { k: "Scored", v: "3 axes", s: "visual · motion · layout" },
];

function RunPipeline() {
  return (
    <figure className="ab-run" aria-label="Run configuration">
      <ol>
        {RUN_STEPS.map((step, i) => (
          <li key={step.k} style={{ ["--i" as string]: i }}>
            <span className="bench-mono-label">{step.k}</span>
            <b>{step.v}</b>
            <small>{step.s}</small>
          </li>
        ))}
      </ol>
      <figcaption className="bench-mono-label">4 models × 48 tasks = 192 runs · one selected run per pair</figcaption>
    </figure>
  );
}

function SubTable({ rows }: { rows: [string, string, string, string][] }) {
  return (
    <div className="overflow-x-auto"><table className="bench-table my-6 max-w-[760px]"><thead><tr><th>Sub-score</th><th className="num">Weight</th><th>How it is computed</th><th>What it catches</th></tr></thead><tbody>
      {rows.map(([name, weight, how, what]) => (
        <tr key={name}><td className="whitespace-nowrap"><strong>{name}</strong></td><td className="n">{weight}</td><td>{how}</td><td>{what}</td></tr>
      ))}
    </tbody></table></div>
  );
}

const CITATION = `@misc{physera2026animationbench,
  title        = {Animation Bench: Evaluating Frontier Models on Web Animation Reconstruction},
  author       = {Ashwarya Maratha and Tim Cvetko and Himanshu Dubey and Soham Parekh},
  year         = {2026},
  month        = sep,
  howpublished = {Physera},
  url          = {https://physera.ai/research/animation}
}`;

export default function AnimationBenchPage() {
  return (
    <main className="bench ab-editorial flex w-full max-w-[1640px] flex-1 flex-col px-3 py-1 sm:px-4">
      <article className="ab-article bg-white">
        <div className="ab-inner mx-auto flex flex-col">
          <Link
            href="/research"
            className="w-fit text-[15px] font-medium tracking-[-0.01em] text-[#1e2025] no-underline transition-colors hover:text-[#3457d5]"
          >
            ← Research
          </Link>
          <header id="overview" className="ab-hero scroll-mt-24">
            <h1 className="ab-hero-title">
              Animation Bench
            </h1>
            <div className="bench-mono-label">30 September 2026 · v1.0</div>
            <p className="max-w-[760px] text-[17px] leading-relaxed text-[#3a3a3a]">
              Frontier multimodal coding agents can already recreate visually plausible web animations, but current
              evaluation methods fail to discriminate between screenshot parity and shippable frontend reconstruction.
            </p>
            <HeroReel />
          </header>

          <div className="bench-article ab-body mt-10">
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

              <Leaderboard />
              <Wall />

              <h2 id="background" className="bench-h2 scroll-mt-24">Background</h2>
                <p className={P}>Frontend generation is a common commercial use case for coding agents. Current agents can reproduce much of a page&rsquo;s visual palette, typography, and static layout. A production page, however, is not a single frame. It also contains transitions and interactions triggered by scrolling, hovering, clicking, dragging, and cursor movement. Can frontier models reconstruct those behaviours as well as the static appearance?</p>
                <p className={P}>We built <strong>Animation Bench</strong> to answer that question and tested four frontier models on 48 tasks from real websites. Each model ran in its own sandbox with the same task inputs and had to deliver a self-contained HTML file. Across the four models, mean visual similarity ranges from 0.63 to 0.71, while mean motion consistency ranges from 0.38 to 0.47.</p>
                <p className={P}>As we enter the era of recursive self-improvement (RSI), we need to pay more attention to the verifiers used to measure progress. Left unchecked, model performance may saturate on tasks in domains with easily verifiable outcomes. Animation Bench applies this scrutiny to web animation.</p>

              <h2 id="design" className="bench-h2 scroll-mt-24">Design philosophy</h2>
                <p className={P}>We set out to measure end-to-end animation reconstruction. The benchmark follows five design principles:</p>
                <ol className="bench-list list-decimal">
                  <li><strong>Reproduction &gt; generation.</strong> Each task’s score is measured directly and objectively against the real animation.</li>
                  <li><strong>Frames in, motion out:</strong> Each model received between 12 and 24 frames, depending on the task, and a network capture of the page. It did not receive the site&rsquo;s source code or a description of the timing.</li>
                  <li><strong>Real sites selected for animation coverage:</strong>
                    <ol className="bench-list list-[lower-alpha]">
                      <li>We sourced animations from commercial sites spanning editorial, portfolio, e-commerce, product, and brand work.</li>
                      <li>The 48 animations cover the common trigger types: autoplay, scroll, hover, cursor-follow, click, drag, and state change.</li>
                    </ol>
                  </li>
                  <li><strong>Separate scoring axes.</strong> Three axes measure complementary aspects of reconstruction quality: <strong>visual similarity</strong>, <strong>motion consistency</strong>, and <strong>layout correctness</strong>. A reconstruction can match the layout while missing the motion, which a single undifferentiated score would obscure.</li>
                  <li><strong>Test the running artifact.</strong> We open each reconstruction in a real browser, drive it as a user would, and record it frame by frame.</li>
                </ol>

              <h2 id="methodology" className="bench-h2 scroll-mt-24">Methodology</h2>
                <p className={P}>We used <a className="bench-link" href="https://github.com/harbor-framework/harbor/tree/main/src/harbor/agents/computer_1">Computer-1</a> through the <a className="bench-link" href="https://www.harborframework.com/">Harbor framework</a> to run 192 evaluations: four models on the same 48 tasks, all at maximum reasoning effort. Each model ran in its own sandbox with a 1280×720 desktop, a shell, the task&apos;s reference frames, and the page&apos;s network capture. The required output was one self-contained HTML file. The reported results contain one selected run for each model and task pair.</p>
                <RunPipeline />

              <h2 id="task" className="bench-h2 scroll-mt-24">Tasks</h2>
                <p className={P}>Each task is one precise animation on a production website with a fixed start and end state.</p>
                <p className={P}><strong>Input.</strong> The model receives 12 to 24 still frames sampled across the animation, with capture timestamps where available, and a HAR capture containing the HTML, CSS, JavaScript, fonts, and images loaded by the live page. It does not receive the site&rsquo;s source project, a video, or any timing description beyond the frames and their timestamps.</p>
                <p className={P}><strong>Output.</strong> The required output is one self-contained <code>index.html</code> file with inline CSS and JavaScript and no external requests.</p>
                <p className={P}><strong>Evaluation.</strong> We open the file in a headless browser at 1280×720, drive it with the task’s trigger (wait, scroll, hover, drag, click), capture it frame by frame the same way we captured the original, and compare the two captures.</p>
                <p className={P}>The 48 tasks come from 32 sites and were selected to cover different triggers and animation properties. Each task is tagged by trigger, animated property, timing pattern, spatial extent, and site category.</p>
                <div className="overflow-x-auto"><table className="bench-table my-6 max-w-[760px]"><thead><tr><th>Trigger</th><th className="num">Tasks</th><th>What the model has to recover</th></tr></thead><tbody>
                  <tr><td className="whitespace-nowrap">Scroll</td><td className="n">21</td><td>Progress tied to scroll position: pinned sequences, scroll-driven text, scroll-linked transforms</td></tr>
                  <tr><td className="whitespace-nowrap">Plays by itself</td><td className="n">12</td><td>Load-in entrances, ambient loops, auto-cycling scenes</td></tr>
                  <tr><td className="whitespace-nowrap">Hover</td><td className="n">6</td><td>Reveals and state changes on pointer enter, and their reversal on leave</td></tr>
                  <tr><td className="whitespace-nowrap">Click / drag / key</td><td className="n">4</td><td>Drag carousels, dial scrubbing, spring physics</td></tr>
                  <tr><td className="whitespace-nowrap">Opens or changes</td><td className="n">4</td><td>Page transitions, view switches, expand-collapse</td></tr>
                  <tr><td className="whitespace-nowrap">Cursor-follow</td><td className="n">1</td><td>A contextual cursor that changes over specific elements</td></tr>
                </tbody></table></div>

              <h2 id="scoring" className="bench-h2 scroll-mt-24">Scoring</h2>
                <p className={P}>Each result is compared with the original recording frame by frame. We score three axes, each composed of sub-scores that measure different failure modes.</p>
                <Disclosure title={<h3 id="visual" className="bench-h3 scroll-mt-24">Visual similarity: does it look right at a given moment?</h3>}>
                <p className={P}>Each reconstruction frame is compared with the reference frame at the same moment. Five sub-scores are averaged with fixed weights:</p>
                <SubTable rows={[
                  ["MS-SSIM", "0.32", "Structural similarity of each frame pair, at several scales", "Shapes in the wrong places; layout drift"],
                  ["LPIPS", "0.32", "1 − perceptual distance between each frame pair (a learned metric)", "Whether a person would say the frames look alike"],
                  ["Colour", "0.13", "Overlap of the two foreground colour histograms", "Wrong palette"],
                  ["Edges", "0.08", "F1 of the two frames’ edge maps", "Right colour, wrong geometry"],
                  ["Coverage", "0.15", "Ratio of foreground fill: min(fR, fC) / max(fR, fC)", "Missing or extra blocks; blank or letterboxed pages"],
                ]} />
                </Disclosure>
                <Disclosure title={<h3 id="motion" className="bench-h3 scroll-mt-24">Motion consistency: does it move right over time?</h3>}>
                <p className={P}>The motion score compares how the two recordings change over time. Three sub-scores describe the pattern of motion; two penalties then scale the result down when the amount or the placement of that motion is wrong:</p>
                <SubTable rows={[
                  ["Energy", "0.50", "½ timing + ½ burstiness of the frame-to-frame pixel-change curve. Timing is the correlation of the two normalised curves; burstiness is the ratio of their coefficients of variation", "Motion at the wrong moments; a smooth fade where the original snaps, or the reverse"],
                  ["Flow", "0.20", "The same two terms on the optical-flow magnitude curve", "Real movement vs fades and flicker"],
                  ["Trajectory", "0.30", "1 − RMS distance between the normalised cumulative paths of the moving region’s centroid", "Wrong direction or order of movement"],
                  ["G_amount", "penalty", "min(r, 1/r)^0.35, where r is the ratio of the reconstruction's total motion to the reference's", "Too little or too much motion overall"],
                  ["G_placement", "penalty", "(fill ratio)^0.35: the reconstruction's occupied screen area relative to the original", "Content in a corner, letterboxed, or missing"],
                ]} />
                </Disclosure>
                <Disclosure title={<h3 id="layout" className="bench-h3 scroll-mt-24">Layout correctness: is it built like the original?</h3>}>
                <p className={P}>The layout score runs OCR on both recordings and compares the words it finds, frame by frame:</p>
                <SubTable rows={[
                  ["Presence", "0.35", "F1 of OCR words matched between the two frames (a match allows up to 30% character error)", "Words missing or invented"],
                  ["Accuracy", "0.25", "1 − character error rate over the matched words", "Misspelt copy"],
                  ["Order", "0.15", "1 − 2 · inversions / n(n − 1) of the matched words, top to bottom", "Wrong reading order"],
                  ["Alignment", "0.25", "Σ IoU of matched word boxes / (matched + unmatched)", "Words in the wrong positions"],
                ]} />
                </Disclosure>
                <Disclosure title={<h3 id="overall" className="bench-h3 scroll-mt-24">Overall score</h3>}>
                <p className={P}>The overall score is a weighted mean of the three axes. The weights depend on what triggers the animation. Interaction is scored separately and held out, so the three weights are renormalised. Canvas-heavy tasks set the layout weight to 0.05, since OCR cannot see into a canvas.</p>
                <div className="overflow-x-auto"><table className="bench-table my-6 max-w-[760px]"><thead><tr><th>Trigger</th><th className="num">Visual</th><th className="num">Motion</th><th className="num">Layout</th><th className="num">Interaction (held out)</th></tr></thead><tbody>
                  {[["autoplay", "0.35", "0.35", "0.20", "0.10"], ["scroll", "0.30", "0.35", "0.20", "0.15"], ["hover", "0.30", "0.20", "0.20", "0.30"], ["cursor", "0.30", "0.20", "0.15", "0.35"], ["gesture", "0.30", "0.20", "0.20", "0.30"], ["state-change", "0.30", "0.25", "0.20", "0.25"]].map(([t, v, m, l, i]) => (
                    <tr key={t}><td className="whitespace-nowrap"><strong>{t}</strong></td><td className="n">{v}</td><td className="n">{m}</td><td className="n">{l}</td><td className="n">{i}</td></tr>
                  ))}
                </tbody></table></div>
                <p className={P}>All scores are reproduction scores on a 0–1 scale. The code also applies a nominal 0.99 ceiling to the overall score; it never binds (the highest score in the set is 0.888).</p>
                </Disclosure>

                <h3 id="example" className="bench-h3 scroll-mt-24">Scoring example: oxigen-voxel-palm-pinned</h3>
                <p className={P}>The following reconstruction from <a className="bench-link" href="http://oxigen.sa">oxigen.sa</a> shows how the scoring system works end to end. In the original, a palm tree made of glowing voxels grows over a voxel landscape while the section remains pinned and the copy changes during scrolling. Opus 5.5 produced a recognisable but substantially different result.</p>
                <Vid src="/animation-bench/ab-scoring-example-oxigen.mp4" label="oxigen.sa voxel palm: the reference beside Claude Opus 5.5’s reconstruction" caption="The original's palm assembles, grows and fills the frame as you scroll. Opus 5.5 draws a cyan fountain that barely changes, and its copy scrolls up under the logo instead of staying pinned." />
                <ScoringExample panels={[
                  { key: "visual", label: "Visual similarity", value: "0.453", total: "Visual similarity", totalValue: "0.453",
                    rows: [["MS-SSIM", "0.32", "0.42", "0.134"], ["LPIPS", "0.32", "0.34", "0.109"], ["Colour", "0.13", "0.77", "0.100"], ["Edges", "0.08", "0.29", "0.023"], ["Coverage", "0.15", "0.58", "0.087"]],
                    note: <p className={P}>The palette is close and the screen is filled in roughly the right places, but nobody would call that fountain a palm tree, and the perceptual score (LPIPS 0.34) agrees.</p> },
                  { key: "motion", label: "Motion consistency", value: "0.362", total: "Motion consistency", totalValue: "0.644 × 0.68 × 0.83 = 0.362",
                    rows: [["Energy", "0.50", "0.57", "0.285"], ["Flow", "0.20", "0.52", "0.104"], ["Trajectory", "0.30", "0.85", "0.255"], ["Motion pattern", "", "", "0.644"], ["Amount penalty", "×", "0.68", ""], ["Placement penalty", "×", "0.83", ""]],
                    note: <p className={P}>The page moves in roughly the right part of the screen, which keeps it well off zero. But the fountain stays put while the original&apos;s tree is being built, so only about half of the frame-to-frame motion matches.</p> },
                  { key: "layout", label: "Layout correctness", value: "0.283", total: "Layout correctness", totalValue: "0.283",
                    rows: [["Presence", "0.35", "0.11", "0.037"], ["Accuracy", "0.25", "0.35", "0.089"], ["Order", "0.15", "1.00", "0.150"], ["Alignment", "0.25", "0.03", "0.007"]],
                    note: <p className={P}>The copy exists on the page, but at most moments it&apos;s somewhere else: scrolled away, or stacked under the logo. Barely a tenth of the reference&apos;s text is on screen when it should be, and almost none of it in the right place.</p> },
                  { key: "overall", label: "Overall", value: "0.395", head: ["Axis", "Weight", "Score", "Weight × score"], total: "Overall", totalWeight: "0.70", totalValue: "0.277 / 0.70 = 0.395",
                    rows: [["Visual similarity", "0.30", "0.453", "0.136"], ["Motion consistency", "0.35", "0.362", "0.127"], ["Layout correctness", "0.05", "0.283", "0.014"]],
                    note: <p className={P}>The weights are the scroll-trigger weights, with layout at 0.05 because the palm is drawn on a canvas. Interaction is held out, so the sum is divided by 0.70 rather than 1.</p> },
                ]} />

              <h2 id="results" className="bench-h2 scroll-mt-24">Results</h2>
                <ResultsCharts />
                <p className={P}><strong>Across all four models, mean visual similarity exceeds mean motion consistency.</strong> At the task level, visual exceeds motion in 177 of 192 reconstructions. The average gap is 0.24, and the two are only moderately correlated (r = 0.44). A page with high visual similarity is only somewhat more likely to have high motion consistency.</p>
                <VisualVsMotion caption="Each dot is one page a model built. Dots below the diagonal look better than they move: 177 of 192 do." />
                <p className={P}><strong>Within this sample, cost has little association with score.</strong> Mean spend per task ranges from $0.45 for GPT-6 Sol to $3.89 for Fable 5.1, an 8.6-fold difference, while mean overall score spans 0.087. Per-model Spearman correlations between spend and score range from −0.24 to +0.24.</p>
                <CostVsScore caption="Each model’s 48 tasks split at its median spend. The hollow dot is the mean overall score of the cheaper half, the filled dot the pricier half. Two models did slightly better on the tasks they spent more on, two did slightly worse; none moved by more than 0.09." />

              <h2 id="failures" className="bench-h2 scroll-mt-24">Where animation reconstructions fail</h2>
                <p className={P}>The final results indicate that motion is the gap. We deeply investigated all 192 generated pages and replayed a subset side by side with the reference. Each failure below is observable in the output, countable across the set, and has a named example to follow along.</p>

                <section className="ab-case">
                <h3 id="timeline" className="bench-h3 scroll-mt-24">Motion timing and sequencing break down</h3>
                  <p className={P}>Models do well at capturing motion location (the location gate averages 0.88). However, across the 183 reconstructions in which motion was captured, the timing term averages 0.57, compared with 0.50 when each reconstruction is paired with the reference from a different task. The models often identify which parts of the page should move but reproduce the timing only weakly.</p>
                  <p className={P}>Instead, the motion tends to arrive all at once. In a typical reconstruction the single biggest change between two frames accounts for 29% of all its movement; in the original it is 19%.</p>
                  <p className={P}>Nine of the 32 intros that should play once were implemented as loops that restart indefinitely. On one eight-second sequence, three of the four models completed the full sequence within about one second.</p>
                  <Flipbook task="neutomni-process-rolling-shape" rows={["ref", "astra", "sol"]} caption="neutomni.com. As you scroll, a white outline rolls along a track above four red cards, turning from a square into a pentagon and then a circle. GPT-6 Astra keeps pace with the reference (motion 0.56). GPT-6 Sol builds the same shape inside a narrow column, rolls it ahead of the scroll and runs out of page before the end (motion 0.39)." />
                </section>

                <section className="ab-case ab-case-detail ab-wispr-case">
                  <span className="ab-case-study-kicker">Case study · Wispr Flow</span>
                <h4 id="wispr" className="ab-case-subhead scroll-mt-24">Reconstructing a timed UI sequence</h4>
                  <p className={P}>On <a className="bench-link" href="http://wisprflow.ai">wisprflow.ai</a>, a two-option pill (<em>Dictation | Notetaker</em>) runs one sequence:</p>
                  <ol className="bench-list list-decimal">
                    <li>The white thumb sits on “<em>Dictation</em>”.</li>
                    <li>Sliding to “<em>Notetaker</em>” stretches to the width of the label.</li>
                    <li>As it lands, the letters of “<em>Notetaker</em>” ripple: each lifts and drops in turn, left to right.</li>
                    <li>Easing back to “<em>Dictation</em>”, the letters stay still.</li>
                  </ol>
                  <p className={P}>Every model recognised the component and reproduced its appearance (visual 0.90–0.97, layout ≈ 0.95 for all four). Two models also recognised the ripple and implemented a suitable mechanism: Claude Opus 5.5 used a per-letter @keyframes wave with a 70 ms stagger, while Claude Fable 5.1 used a per-character transform sequence. Each model reconstructed a different part of the interaction:</p>
                  <div className="overflow-x-auto"><table className="bench-table my-6 max-w-[760px]"><thead><tr><th></th><th>Slide on time (f1)</th><th>Ripple after slide</th><th>Returns on time (f10)</th></tr></thead><tbody>
                    <tr><td className="whitespace-nowrap">Claude Opus 5.5</td><td>✅</td><td>fires immediately</td><td>never returns</td></tr>
                    <tr><td className="whitespace-nowrap">Claude Fable 5.1</td><td>starts already switched</td><td>short faint</td><td>✅</td></tr>
                    <tr><td className="whitespace-nowrap">GPT-6 Sol</td><td>2 frames late</td><td>none</td><td>1 frame late</td></tr>
                    <tr><td className="whitespace-nowrap">GPT-6 Astra</td><td>7 frames late</td><td>barely</td><td>never returns</td></tr>
                  </tbody></table></div>
                  <p className={P}><strong>What makes this case so hard?</strong> The pill is small, and each letter of the ripple lifts by only a few pixels. The stills are unevenly spaced: the first is taken almost seven seconds into the recording, a full second passes before the slide, eight quick frames about 150 ms apart catch the ripple, and a second and a half passes before the return. To rebuild it, a model has to read the timestamps as well as the pictures, and turn a few pixels of difference into a sequence with an order, a pause and a return. No single frame shows any of that.</p>
                  <p className={P}><strong>GPT-6 Sol shows what happens when that reading fails.</strong> Its page slides the thumb 0.9 seconds after load, then flips it back and forth every 3.3 seconds, indefinitely. There is no ripple at all: the letters are never split apart, so they cannot move one at a time. Every frame of it looks right (visual 0.94, layout 0.95), and it scores 0.36 on motion.</p>
                  <Flipbook task="wisprflow-dictation-notetaker-toggle" cols={3} caption="Wispr Flow toggle, the reference and all four models. Opus 5.5 slides on time and never returns (motion 0.62); Fable 5.1 starts already switched and returns on time (0.51); Sol and Astra slide late, and neither ripples as the original does (0.36, 0.42)." />
                </section>

                <section className="ab-case">
                <h3 id="under" className="bench-h3 scroll-mt-24">Motion is incomplete or missing</h3>
                  <p className={P}>Reconstructions more often move too little than too much. The median reconstruction carries 0.63 of the reference’s motion, and 38% carry less than half; 10 of 192 overshoot by more than double. GPT-6 Sol is the most restrained, at a median of 0.56. Combined with the timeline finding above, the typical rebuild is a correct-looking page that moves less, and in fewer, larger steps.</p>
                  <Flipbook task="ciaoenergy-cans-sideways-selection" rows={["ref", "sol"]} caption="ciaoenergy.com. As the page scrolls, the reference steps the can and its copy through five flavours and ends on a full-screen “ZERO BULLSHIT” frame. GPT-6 Sol reproduces the flavour sequence but lags behind the reference and never reaches the final frame (overall 0.521, visual 0.610, motion 0.451)." />
                </section>

                <section className="ab-case ab-case-detail">
                <h4 id="stagger" className="ab-case-subhead scroll-mt-24">Staggered sequences collapse into simultaneous motion</h4>
                  <p className={P}>Staggered choreography, in which elements enter one after another, is the most common timing pattern in the set (32 tasks). In 34 of 128 reconstructions of staggered tasks, we found no delay or stagger construct: every element starts together. GPT-6 Sol accounts for 16 of the 34. Under the current scoring, the within-task penalty is small (0.02 on motion), so this is more evident in the code than in the aggregate score.</p>
                  <Vid src="/animation-bench/ab-stagger-wispr-sol.mp4" label="Wispr Flow toggle: the reference beside GPT-6 Sol" caption="The same Wispr toggle, rebuilt by GPT-6 Sol. The thumb slides, but the letters of Notetaker change as one block, with no ripple (motion 0.36)." />
                </section>

                <section className="ab-case">
                <h3 id="hero" className="bench-h3 scroll-mt-24">Complex visual assets are approximated</h3>
                  <p className={P}>The most expensive element of a commercial animation is often its hero asset: a WebGL scene, a 3D product, or a photographic sequence. Fifteen of the 16 canvas tasks come from sites that use WebGL or three.js. GPT-6 Astra used WebGL on 5 of the 16 tasks by inlining the site&rsquo;s captured three.js code; the other models rebuilt these scenes with Canvas2D.</p>
                  <Flipbook task="ciaoenergy-cans-fan-scroll-spin" rows={["ref", "astra", "fable"]} caption="ciaoenergy.com. The reference forms a diagonal sweep of cans. GPT-6 Astra preserves some details of the original renders but scores 0.338 overall (visual 0.534, motion 0.101). Claude Fable 5.1 shows six cans that do not form the reference arrangement and scores 0.498 overall (visual 0.675, motion 0.291)." />
                  <p className={P}>None of the four reconstructions reproduces the full sweep. Claude Opus 5.5 has the highest overall score at 0.537, followed by Fable 5.1 at 0.498, GPT-6 Sol at 0.486, and GPT-6 Astra at 0.338. Sol has the highest visual score (0.708), while Opus has the highest motion score (0.408).</p>
                </section>

                <section className="ab-case">
                <h3 id="framing" className="bench-h3 scroll-mt-24">Page structure, behaviour, and text drift from the reference</h3>
                  <p className={P}>Eleven of the 52 reconstructions we inspected visually added dark side bars that do not appear in the reference. These pages are letterboxed into a fixed-aspect column instead of filling the viewport (Sol 6, Opus 5.5 3, Fable 5.1 2). On <a className="bench-link" href="https://pudding.cool">pudding.cool</a> (pinned word cloud), Astra and Fable 5.1 are close to the reference; Opus 5.5 adds fixed black bars on both sides, while GPT-6 Sol runs ahead of the scroll inside a letterbox.</p>
                  <Vid src="/animation-bench/ab-framing-pudding.mp4" label="pudding.cool word cloud: the reference beside Claude Fable 5.1 and GPT-6 Sol" caption="pudding.cool. Claude Fable 5.1 fills the page like the original (visual 0.90); GPT-6 Sol squeezes it into a column between dark side bars (visual 0.53, coverage 0.30)." />
                </section>

                <section className="ab-case ab-case-detail">
                <h4 id="edges" className="ab-case-subhead scroll-mt-24">Secondary interactions and states are omitted</h4>
                  <p className={P}>Several reconstructions implement the headline behaviour and drop what surrounds it:</p>
                  <ul className="bench-list list-disc">
                    <li><strong>Pinned sections that do not pin.</strong> The content scrolls past instead of holding while the animation plays (3 of 52 inspected). On the slowdown footer, Astra holds the block while the icons rotate; Sol and Fable 5.1 let it scroll away.</li>
                    <li><strong>Incomplete dragging effect.</strong> On <a className="bench-link" href="http://kaviengcreative.com">kaviengcreative.com</a>, dragging the cards should fly them into a grid. Astra assembles the grid; Fable 5.1 brings the cards forward but never settles them into it; GPT-6 Sol fades the title but the cards never assemble; Opus 5.5 does nothing on drag.</li>
                  </ul>
                  <Fig src="/animation-bench/slowdown-footer-services-rolling-labels.webp" alt="Slowdown footer: reference row and four model rows; pinned block with rotating icons." caption="Slowdown footer: pinned block with rotating icons" />
                  <Vid src="/animation-bench/ab-drag-kavieng.mp4" label="kaviengcreative.com drag: the reference beside GPT-6 Astra and Claude Opus 5.5" caption="kaviengcreative.com. Dragging should fly the cards into a grid. GPT-6 Astra assembles it (overall 0.57); Claude Opus 5.5 leaves the page still under the drag (overall 0.38)." />
                </section>

                <section className="ab-case ab-case-detail">
                <h4 id="text" className="ab-case-subhead scroll-mt-24">Text is present but misplaced</h4>
                  <p className={P}>The models did not invent new copy, and none of the reconstructions contains placeholder text. The visible text comes from the captured page, but it is often displayed at the wrong time or position. Across the sampled frames, roughly 41% of the reference text labels never appear on screen in the reconstruction, and 13% are misspelled. Of the text that a reconstruction does display, 38% has no counterpart in the corresponding reference frame. Bounding-box alignment, which measures whether words occupy the same positions, averages 0.21, the lowest term on any axis.</p>
                  <p className={P}>The visual axis shows the same split between palette and geometry. Colour agreement averages 0.85; edge agreement (whether outlines and borders line up) averages 0.26 and is the weakest visual term in 184 of 192 reconstructions. The models get the palette but don’t get shapes.</p>
                  <Vid src="/animation-bench/ab-layout-dialkit.mp4" label="dialkit.dev headline: the reference beside Claude Fable 5.1 and Claude Opus 5.5" caption="dialkit.dev. Claude Fable 5.1 sets the headline at the original’s size and position (layout 0.91); Claude Opus 5.5 has the same words, smaller and lighter, so they no longer sit where the original’s do (layout 0.62, box alignment 0.00)." />
                </section>

                <section className="ab-case">
                <h3 id="flipbook" className="bench-h3 scroll-mt-24">Screenshot replay replaces real reconstruction</h3>
                  <p className={P}>Fourteen reconstructions solved the task by embedding the reference frames themselves as images and stepping through them on a timer, on scroll, or on hover (Sol 10, Astra 3, Opus 5.5 1). It is the purest form of screenshot mimicry: correct at twelve instants by construction, and wrong everywhere between them. Within the same task, flipbooks score 0.08 lower on motion than reconstructions that rebuild the animation, and slightly lower overall.</p>
                  <Vid src="/animation-bench/ab-flipbook-squarespace.mp4" label="brand.squarespace.com hover: the reference beside GPT-6 Sol and GPT-6 Astra" caption="brand.squarespace.com. GPT-6 Sol’s page is sixteen stored screenshots swapped on a timer (motion 0.48); GPT-6 Astra animates the reveal itself (motion 0.78)." />
                </section>

              <h2 id="conclusion" className="bench-h2 scroll-mt-24">Conclusion</h2>
                <h3 id="implications" className="bench-h3 scroll-mt-24">Implications</h3>
                <p className={P}><strong>For model labs.</strong> The bottleneck to full webpage reproduction is neither perception nor code generation. Frontier models frequently select an appropriate implementation technique but fail to reproduce the complete animation sequence. They misjudge timing, overlap, and duration.</p>
                <p className={P}><strong>For benchmarks &amp; RL environments.</strong> Current benchmarks often grade reconstructed webpages primarily by static visual similarity. Animation benchmarks should also evaluate whether models preserve temporal structure, including duration, overlap, pauses, and event order. A mechanical three-axis scoring system could support a training environment for these behaviours.</p>

              <h3 id="final" className="bench-h3 scroll-mt-24">Final thoughts</h3>
                <p className={P}>Can frontier models rebuild a web animation rather than only its first frame? Not yet. They reproduce much of its palette, typography, and layout, and they often identify an appropriate implementation technique. What they fail to recover is time: event order, pauses, movement duration, and whether the page returns to its initial state. Every model scored lower on motion than on visual similarity. Screenshot-based evaluation does not capture this temporal gap, but users notice it within seconds.</p>

              <h2 id="tasks" className="bench-h2 scroll-mt-24">Appendix: Tasks</h2>
                <p className={P}>All 48 tasks with each model’s overall score, site, trigger and difficulty. One selected generation per task and model, scored against one reference capture; the best score on each task is in bold.</p>
                <TaskScores metadata={TASK_META} />

              <h2 id="citation" className="bench-h2 scroll-mt-24">Citation</h2>
                <p className={P}>If you use Animation Bench, cite this post as:</p>
                <CopyBlock text={CITATION} />

              <h2 id="partner" className="bench-h2 scroll-mt-24">Partner with us</h2>
                <p className={P}>
                  Animation Bench is the first body of work to come from Physera that attempts to bridge the gap for the
                  next succession of frontier models, so that they can improve on the axes people actually perceive. If
                  you are working on frontend generation, or environments for agents that build software, we&rsquo;d love
                  to hear from you. Reach us at{" "}
                  <a className="bench-link" href="mailto:hello@physera.ai">hello@physera.ai</a>.
                </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
