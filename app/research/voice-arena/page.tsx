import type { Metadata } from "next";
import Link from "next/link";
import { voice } from "./data";
import VoiceScatter from "./components/VoiceScatter";
import VoiceRadar from "./components/VoiceRadar";
import { Decomposition, VoiceLeaderboard } from "./components/VoiceTables";
import SectionNav, { type Section } from "../cyberlatch/components/SectionNav";

export const metadata: Metadata = {
  title: "Voice Arena",
  description:
    "Conversational voice systems scored on empathy, response quality, and latency across cascade and native architectures, with a delivery-versus-content decomposition.",
  alternates: { canonical: "/research/voice-arena" },
};

const rows = voice.rows;
const sections: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "results", label: "Latency vs empathy" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "decomposition", label: "Cascade vs native" },
  { id: "profile", label: "Axis profile" },
  { id: "findings", label: "Findings" },
  { id: "method", label: "Method" },
];

export default function VoiceArenaPage() {
  const cascade = voice.decomp.find((d) => d.tier === "cascade");
  const native = voice.decomp.find((d) => d.tier === "native");
  const contentGap =
    cascade && native ? (cascade.content - native.content).toFixed(3) : "—";
  const deliveryGap =
    cascade && native ? (cascade.delivery - native.delivery).toFixed(3) : "—";
  const gapRatio =
    cascade && native
      ? Math.round(
          (cascade.content - native.content) / (cascade.delivery - native.delivery),
        )
      : null;

  return (
    <main className="bench flex w-full max-w-[1320px] flex-1 flex-col px-3 py-1 sm:px-4">
      <article className="rounded bg-[var(--bench-panel)] px-5 py-14 sm:px-12 sm:py-16">
        <div className="mx-auto flex max-w-[1180px] flex-col">
          <Link href="/research" className="bench-mono-label bench-link w-fit">
            ← Research
          </Link>

          <header id="overview" className="mt-6 flex scroll-mt-24 flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="bench-pill bench-pill-tag">
                <i />
                Open benchmark
              </span>
            </div>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.04em] text-[var(--bench-ink)]">
              Voice Arena
            </h1>
            <div className="bench-mono-label">Voice Arena V1.2 · Updated May 2026</div>
            <p className="max-w-[720px] font-serif text-[22px] leading-[1.35] text-[var(--bench-ink)]">
              Do voice systems sound human, or just say the right thing?
            </p>
            <p className="max-w-[720px] text-[17px] leading-relaxed text-[var(--bench-ink-2)]">
              Seven conversational voice systems answer the same emotional dialogue, scored on empathy,
              response quality, and latency across 24 signal, prosody, and semantic axes. We split every
              score into how a system sounds and what it says, so the two never hide behind one number.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Empathy", "Naturalness", "Prosody", "Latency", "Cascade vs native"].map((t) => (
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
                  <div className="bench-mono-label">Systems</div>
                  <div className="v">7</div>
                  <div className="k">Cascade and native, across ElevenLabs, Cartesia, Google, OpenAI</div>
                </div>
                <div>
                  <div className="bench-mono-label">Axes</div>
                  <div className="v">36</div>
                  <div className="k">Signal quality, prosody, semantics, latency</div>
                </div>
                <div>
                  <div className="bench-mono-label">Top empathy</div>
                  <div className="v">0.895</div>
                  <div className="k">Gemini TTS, cascade with Claude Sonnet 4.6</div>
                </div>
                <div>
                  <div className="bench-mono-label">Content gap</div>
                  <div className="v">+{contentGap}</div>
                  <div className="k">Cascade over native on what is said, vs {deliveryGap} on how it sounds</div>
                </div>
              </div>

              <span className="bench-kicker">The result</span>
              <h2 id="results" className="bench-h2 scroll-mt-24">
                Latency vs empathy
              </h2>
              <VoiceScatter rows={rows} />

              <span className="bench-kicker">Standings</span>
              <h2 id="leaderboard" className="bench-h2 scroll-mt-24">
                Leaderboard
              </h2>
              <VoiceLeaderboard rows={rows} />

              <span className="bench-kicker">Decomposition</span>
              <h2 id="decomposition" className="bench-h2 scroll-mt-24">
                Cascade vs native
              </h2>
              <p className="mb-4 max-w-[720px] text-[16px] leading-relaxed text-[var(--bench-ink-2)]">
                A cascade routes a text model into a text-to-speech voice; a native model takes audio in and
                emits audio out. The interesting question is whether the cascade lead is about sounding better
                or answering better.
              </p>
              <blockquote className="bench-quote">
                <p>
                  The delivery gap is {deliveryGap}. The content gap is {contentGap} — {gapRatio} times
                  larger. Cascades win on the words, not the voice.
                </p>
              </blockquote>
              <Decomposition decomp={voice.decomp} />

              <span className="bench-kicker">Coverage</span>
              <h2 id="profile" className="bench-h2 scroll-mt-24">
                Axis profile
              </h2>
              <VoiceRadar rows={rows} dims={voice.radarDims} />

              <span className="bench-kicker">What we saw</span>
              <h2 id="findings" className="bench-h2 scroll-mt-24">
                Findings
              </h2>
              <div className="bench-findings">
                <div>
                  <h3>What holds up</h3>
                  <ol>
                    <li>
                      <b>The top three are tied.</b> Gemini TTS, ElevenLabs, and Cartesia Sonic 3.5 sit
                      within 0.006 empathy of each other — smaller than the {voice.noiseFloor.toFixed(3)}{" "}
                      the judges disagree by on word-for-word identical text. The ordering between them is
                      not a result.
                      <span className="bench-tag good">0.895 – 0.889</span>
                    </li>
                    <li>
                      <b>Native delivery is already competitive.</b> Native vocal delivery trails the
                      cascade average by just {deliveryGap} — itself inside the noise floor. The voice is
                      not the problem.
                    </li>
                    <li>
                      <b>Latency and quality are decoupled.</b> ElevenLabs matches the empathy leader at
                      2.2s while Gemini TTS takes 13.1s, so the fast option is not the weak option.
                    </li>
                  </ol>
                </div>
                <div>
                  <h3>Where it breaks</h3>
                  <ol>
                    <li>
                      <b>Content is the real gap.</b> The cascade beats native by {contentGap} on what is
                      said, driving nearly the whole empathy lead.
                      <span className="bench-tag bad">+{contentGap} content</span>
                    </li>
                    <li>
                      <b>End-to-end audio still trails on words.</b> Native models answer less empathically
                      even when they sound fine, so the text layer is doing the heavy lifting.
                    </li>
                    <li>
                      <b>One system collapses.</b> Moshi scores 0.050 empathy at 37.4s latency, a reminder
                      that open native audio has a long way to go on this task.
                      <span className="bench-tag bad">0.050</span>
                    </li>
                  </ol>
                </div>
              </div>

              <span className="bench-kicker">Method</span>
              <h2 id="method" className="bench-h2 scroll-mt-24">
                Method
              </h2>
              <div className="bench-manifesto">
                <div>
                  <h3>Paired stimuli</h3>
                  <p>100 emotional dialogue turns — 61 from recorded interviews, 39 from the MELD corpus — the same stimulus to every system.</p>
                </div>
                <div>
                  <h3>Sound and words, apart</h3>
                  <p>Every empathy score splits into a delivery judge on the audio and a content judge on the transcript.</p>
                </div>
                <div>
                  <h3>Multi-judge, cross-checked</h3>
                  <p>Claude, GPT-4, and Gemini judges score in parallel; inter-judge agreement is reported, not hidden.</p>
                </div>
                <div>
                  <h3>Bootstrapped intervals</h3>
                  <p>10,000 bootstrap resamples give a 95% confidence interval on every headline number.</p>
                </div>
              </div>

              <p className="bench-foot">
                Judge agreement (Spearman rank): empathy Claude–GPT-4 {voice.judge.empathy_claude_gpt4?.toFixed(2)},
                Claude–Gemini {voice.judge.empathy_claude_gemini?.toFixed(2)}. Response-quality judges agree less
                (Claude–Gemini {voice.judge.rq_claude_gemini?.toFixed(2)}), so response-quality figures are read as
                directional, not exact.
                <br />
                Source: physera-ai/voice-evals, Voice Arena V1.2, evaluated {voice.evaluated}.
                Three pure-TTS baselines without a conversational layer are omitted from the empathy board.
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
