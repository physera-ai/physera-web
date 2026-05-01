import { Header3 } from "@/components/Header3";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#ebebee] relative overflow-hidden selection:bg-black selection:text-white">
      {/* Static Noise Background */}
      <div
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
      />

      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <div className="pointer-events-auto">
          <Header3 position="sides" />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-4 mt-32 md:mt-0 pb-16 sm:pb-0 pointer-events-auto cursor-default overflow-hidden">
          <div className="w-full flex flex-col items-center gap-8 sm:gap-6">
            <h1 className="max-w-[800px] mx-auto font-serif font-[350] text-5xl text-black/90 leading-[1.1] tracking-tighter text-center">
              Sigh, we don't have this page yet!
            </h1>

            <div className="font-sans max-w-[550px] text-[16px] sm:text-[17px] text-black/70 flex flex-col items-center gap-5 sm:gap-6 text-center mx-auto">
              <p>
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}