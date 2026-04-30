import { Header3 } from "@/components/Header3";
import { ArrowRight } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#e4e4e4] relative overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <div className="pointer-events-auto">
          <Header3 position="sides" />
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center pointer-events-auto cursor-default px-4 mt-24 md:mt-0">
          <div className="max-w-2xl w-full flex flex-col items-start gap-6">
            <h1 className="font-serif text-[38px] text-black/90 leading-tight tracking-tighter text-left">
              We are building systems that perceive, reason and decide as humans do, under the constraints humans face.
            </h1>
            
            <div className="font-sans text-[17px] text-black/70 flex flex-col items-start gap-6 text-left">
              <p>
                Physera is a research and product lab rethinking Applied Intelligence. We work at the intersection of model efficiency and behavioural simulations by building environments that are multimodal.
              </p>
              <p>
                We have made extraordinary progress in understanding model internals. However, we are yet to translate that understanding into predictable efficiency gains, measurable commercial returns, or faithful modelling of human behaviour at scale.
              </p>
              <p className="font-medium text-black/80">
                We are rethinking each layer of AI stack from first principles.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ArrowRight className="size-4 mt-1.5 text-black opacity-30 shrink-0" />
                  <span>
                    How models are deployed under hard cost and latency constraints by establishing a new class of commercially meaningful benchmarks and token efficient architectures.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="size-4 mt-1.5 text-black opacity-30 shrink-0" />
                  <span>
                    How do we simulate human decision-making by building high fidelity, multimodal, multi-agent systems that are falsifiable and improvable.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
