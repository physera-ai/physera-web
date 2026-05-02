import { Header3 } from "@/components/Header3";
import { SmoothCircleLoop } from "@/components/SmoothCircleLoop";
import { CutoutWrapper } from "@/components/CutoutWrapper";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { HoverScrambleText } from "@/components/HoverScrambleText";
import { InteractiveHeroTitle } from "@/components/InteractiveHeroTitle";
import { FloatingBubbles } from "@/components/FloatingBubbles";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-(--site-bg) relative selection:bg-white selection:text-black">
      {/* Background Grid */}
      <BackgroundGrid />

      {/* Static Noise Background */}
      <div
        className="fixed z-0 pointer-events-none opacity-[0.03]"
        style={{
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          backgroundImage: `url('/noise.png')`,
          backgroundRepeat: "repeat",
          backgroundSize: "64px",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <div className="pointer-events-auto">
          <Header3 position="sides" />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center px-5 sm:px-4 pt-12 pointer-events-auto cursor-default">
          <div className="w-full flex flex-col items-center gap-8">

            {/* Top section: loop and title */}
            <div className="hidden">
              <SmoothCircleLoop />
            </div>

            {/* Content Grid */}
            <div className="w-full max-w-[1260px] mx-auto flex flex-row justify-between gap-12 mt-4 sm:mt-8 pr-4 relative">

              {/* WebGL Graphic Left Wrapper */}
              <div className="relative">
                <div className="w-full h-[360px] max-h-[500px] lg:h-[400px] aspect-square xl:sticky xl:top-40 flex items-center justify-center">
                  <FloatingBubbles />
                </div>
              </div>

              {/* Essay Section Right */}
              <div className="w-full max-w-[700px] font-sans text-[16px] sm:text-[18px] text-white/80 leading-relaxed flex flex-col items-start gap-8 text-left lg:pt-20 lg:pb-40">
                <div className="mb-4 flex justify-start lg:-ml-4">
                  <InteractiveHeroTitle>
                    Rethinking Applied Intelligence
                  </InteractiveHeroTitle>
                </div>
                <p>
                  Physera is a research and product lab rethinking applied intelligence. We work at the intersection of model efficiency and behavioural simulations while building environments that are multimodal.
                </p>

                <p>
                  We have made extraordinary progress in understanding model internals. However, we are yet to translate that understanding into predictable efficiency gains, measurable commercial returns, or faithful modelling of human behaviour at scale.
                </p>

                <div>
                  <p>
                    We are rethinking each layer of AI stack from first principles.
                  </p>
                  <ul className="list-disc pl-5 mt-6 space-y-4 marker:text-white/40">
                    <li className="pl-2">
                      How models are deployed under hard cost and latency constraints — establishing a new class of commercially meaningful benchmarks and token efficient architectures.
                    </li>
                    <li className="pl-2">
                      How do we simulate human decision-making — building high fidelity, multimodal, multi-agent systems that are falsifiable and improvable.
                    </li>
                  </ul>
                </div>

                <p>
                  We are a small team of researchers and engineers who believe the important and most valuable problems in AI today are not about capability but about making that capability reliably useful across multimodality. We are heads down building for that future. Stay tuned.
                </p>

                <p>
                  We&apos;re looking for collaborators to help shape this vision. Reach out at <a href="mailto:himanshu@physera.ai" className="text-white hover:text-white/70 transition-colors">himanshu@physera.ai</a> and follow our work at <a href="https://x.com/PhyseraAI" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">@PhyseraAI</a> for updates.
                </p>

                <div className="mt-4 sm:mt-8">
                  <Link href="/contact" data-scramble-trigger className="pointer-events-auto cursor-pointer relative h-8 rounded-[5px] text-(--island-fg) shrink-0 group select-none inline-flex">
                    <CutoutWrapper
                      id="get-in-touch-mask"
                      hoverClass="group-hover:fill-(--island-bg-hover)"
                      hasSeparator={true}
                      separatorPosition={38}
                    >
                      <div className="flex h-full items-center transition-colors duration-200">
                        <div className="flex h-full w-[38px] shrink-0 items-center justify-center text-(--island-fg-muted) group-hover:text-(--island-fg)">
                          <PlusIcon
                            className="h-4 w-4 shrink-0 stroke-2 transition-transform duration-200 ease-out group-hover:rotate-90"
                            aria-hidden
                          />
                        </div>
                        <div className="flex h-full items-center justify-center">
                          <span className="h-5 w-px bg-(--island-rule)" />
                        </div>
                        <span className="flex min-h-full flex-1 items-center justify-center px-4 font-display text-[15px] font-medium tracking-[-0.01em] text-(--island-fg-muted) group-hover:text-(--island-fg)">
                          <HoverScrambleText text="Get in touch" />
                        </span>
                      </div>
                    </CutoutWrapper>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
