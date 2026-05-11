import { BackgroundGrid } from "@/components/BackgroundGrid";
import { MorphingParticles } from "@/components/MorphingParticles";
import { SiteHeader } from "@/components/SiteHeader";
import { ContactInlineActions } from "@/components/ContactInlineActions";
import { WigglyUnderline } from "@/components/WigglyUnderline";

export default function Page() {
  return (
    <main className="min-h-screen bg-(--site-bg) text-(--site-fg) relative transition-colors duration-300">
      {/* Background Grid */}
      <BackgroundGrid />

      {/* Static Noise Background */}
      <div
        className="fixed z-0 pointer-events-none opacity-4 mix-blend-hard-light"
        style={{
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          backgroundImage: `url('/assets/noise.png')`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">

        {/* Faded background for header */}
        <div
          className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-40 bg-linear-to-b from-(--site-bg) from-20% to-transparent transition-colors duration-300"
        />

        <SiteHeader />

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center px-5 sm:px-4 pt-20 sm:pt-24 lg:pt-24 pointer-events-auto cursor-default">
          <div className="w-full flex flex-col items-center gap-8">

            {/* Content Grid */}
            <div className="w-full max-w-[1260px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-12 lg:gap-24 mt-4 sm:mt-8 px-0 sm:px-4 relative">

              {/* WebGL Graphic Left Wrapper */}
              <div className="relative w-full lg:w-[400px] flex justify-center sm:justify-start lg:sticky lg:top-32 self-start z-10 shrink-0">
                <div className="w-full max-w-[280px] sm:max-w-[400px] aspect-square flex items-center justify-center transition-colors duration-300 p-0 sm:p-4 lg:p-8">
                  <MorphingParticles />
                </div>
              </div>

              {/* Essay Section Right */}
              <div className="w-full max-w-[700px] font-sans font-regular text-[16px] sm:text-[18px] text-(--site-fg) opacity-90 leading-relaxed flex flex-col items-start gap-5 md:gap-7 text-left pb-16 lg:pt-4 lg:pb-40">
                <div className="mb-2 flex justify-start">
                  <h1 className="flex-1 font-serif font-normal text-5xl sm:text-[52px] text-(--site-fg) leading-[1.1] tracking-tighter text-left transition-colors duration-300">
                    Rethinking Applied Intelligence
                  </h1>
                </div>
                <div className="contents">
                  <p>
                    Physera is a research and product lab rethinking applied intelligence. We work at the intersection of <span className="bg-(--highlight-bg) px-1 rounded-md">model efficiency</span> and <span className="bg-(--highlight-bg) px-1 rounded-md">behavioural simulations</span> while building environments that are <span className="bg-(--highlight-bg) px-1 rounded-md">multimodal</span>.
                  </p>

                  <p>
                    We have made extraordinary progress in understanding model internals. However, we are yet to translate that understanding into predictable efficiency gains, measurable commercial returns, or faithful modelling of <WigglyUnderline colorClass="text-orange-400">human behaviour at scale</WigglyUnderline>.
                  </p>

                  <div>
                    <p>
                      We are rethinking each layer of AI stack from <span className="bg-(--highlight-bg) px-1 rounded-md">first principles</span>.
                    </p>
                    <ul className="list-disc pl-5 mt-6 space-y-4 marker:text-(--island-rule-hover)">
                      <li className="pl-2">
                        How models are deployed under hard cost and latency constraints — establishing a new class of commercially meaningful benchmarks and <span className="bg-(--highlight-bg) px-1 rounded-md">token efficient architectures</span>.
                      </li>
                      <li className="pl-2">
                        How do we simulate <span className="bg-(--highlight-bg) px-1 rounded-md">human decision-making</span> — building high fidelity, multimodal, multi-agent systems that are falsifiable and improvable.
                      </li>
                    </ul>
                  </div>

                  <p>
                    We are a team of applied researchers and engineers who believe that the most important problems in AI today are not about capability but making that capability reliably useful across multimodality. We are heads down building systems that perceive, reason, and decide as humans do, under the constraints humans face.
                  </p>

                  <p className="leading-[1.8]">
                    Reach out at <ContactInlineActions />
                  </p>
                </div>

                <footer className="pt-8 text-sm text-white/40">
                  © 2026 Physera AI.
                </footer>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
