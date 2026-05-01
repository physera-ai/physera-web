import { Header3 } from "@/components/Header3";
import { SmoothCircleLoop } from "@/components/SmoothCircleLoop";
import { CutoutWrapper } from "@/components/CutoutWrapper";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { HoverScrambleText } from "@/components/HoverScrambleText";
import { InteractiveHeroTitle } from "@/components/InteractiveHeroTitle";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-(--site-bg) relative overflow-hidden selection:bg-white selection:text-black">
      {/* Background Grid */}
      <BackgroundGrid />

      {/* Static Noise Background */}
      <div
        className="fixed z-0 pointer-events-none opacity-[0.03] mix-blend-hard-light animate-noise"
        style={{
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          backgroundImage: `url('/noise.png')`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <div className="pointer-events-auto">
          <Header3 position="sides" />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-4 mt-32 md:mt-0 pb-16 sm:pb-0 pointer-events-auto cursor-default overflow-hidden">
          <div className="w-full flex flex-col items-center gap-8 sm:gap-6">
            <div className="w-full max-w-7xl mx-auto pb-2">
              <SmoothCircleLoop />
            </div>

            <InteractiveHeroTitle>
              Building systems that perceive, reason and decide as humans do, under the constraints humans face.
            </InteractiveHeroTitle>

            <div className="font-sans max-w-[550px] text-[16px] sm:text-[17px] text-white/70 flex flex-col items-center gap-5 sm:gap-6 text-center mx-auto">
              <p>
              Physera is a research and product lab rethinking applied intelligence. We work at the intersection of model efficiency and behavioural simulations while building environments that are multimodal.              </p>
            </div>

            <div className="mt-4">
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
    </main>
  );
}
