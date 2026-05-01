import { Header3 } from "@/components/Header3";
import { SmoothCircleLoop } from "@/components/SmoothCircleLoop";
import { CutoutWrapper } from "@/components/CutoutWrapper";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#ebebee] relative overflow-hidden selection:bg-black selection:text-white">
      {/* Static Noise Background */}
      {/* <div
        className="fixed z-0 pointer-events-none opacity-[0.035] mix-blend-multiply animate-noise"
        style={{
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          backgroundImage: `url('/noise.png')`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
        }}
      /> */}

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

            <div className="flex items-center justify-center gap-2 sm:gap-6 md:gap-8 max-w-[960px] mx-auto w-full px-2 sm:px-0">
              <div className="font-serif font-[50] text-[70px] sm:text-[100px] md:text-[130px] text-black/20 leading-none select-none -mt-4 sm:-mt-6">
                [
              </div>
              <h1 className="flex-1 font-serif font-[350] text-3xl sm:text-4xl md:text-5xl text-black/90 leading-[1.1] tracking-tighter text-center px-2">
                Building systems that perceive, reason and decide as humans do, under the constraints humans face.
              </h1>
              <div className="font-serif font-[50] text-[70px] sm:text-[100px] md:text-[130px] text-black/20 leading-none select-none -mt-4 sm:-mt-6">
                ]
              </div>
            </div>

            <div className="font-sans max-w-[550px] text-[16px] sm:text-[17px] text-black/70 flex flex-col items-center gap-5 sm:gap-6 text-center mx-auto">
              <p>
              Physera is a research and product lab rethinking applied intelligence. We work at the intersection of model efficiency and behavioural simulations while building environments that are multimodal.              </p>
            </div>

            <div className="mt-4">
              <Link href="/contact" className="pointer-events-auto cursor-pointer relative h-8 rounded-[5px] text-black shrink-0 group select-none inline-flex">
                <CutoutWrapper
                  id="get-in-touch-mask"
                  fill="#fff"
                  hasSeparator={true}
                  separatorPosition={38}
                >
                  <div className="flex h-full items-center transition-colors duration-200">
                    <div className="flex h-full w-[38px] shrink-0 items-center justify-center text-black group-hover:text-[#ff4419]">
                      <PlusIcon
                        className="h-4 w-4 shrink-0 stroke-2 transition-transform duration-200 ease-out group-hover:rotate-90"
                        aria-hidden
                      />
                    </div>
                    <div className="flex h-full items-center justify-center">
                      <span className="h-5 w-px bg-black/10" />
                    </div>
                    <span className="flex min-h-full flex-1 items-center justify-center px-4 font-display text-[15px] font-medium tracking-[-0.01em] text-black group-hover:text-[#ff4419]">
                      Get in touch
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
