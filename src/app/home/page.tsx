import { Header3 } from "@/components/Header3";
import { HeroFluidBackground } from "@/components/HeroFluidBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <HeroFluidBackground />
      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <div className="pointer-events-auto">
          <Header3 />
        </div>
        {/* Main Content can go here */}
        <div className="flex-1 flex-col flex items-center justify-center">
          <h1 className="font-display font-medium text-4xl md:text-6xl text-black tracking-tight drop-shadow-sm select-none pointer-events-auto cursor-default">
            Physera is the RL training
          </h1>
          <h1 className="font-display font-medium text-4xl md:text-6xl text-black tracking-tight drop-shadow-sm select-none pointer-events-auto cursor-default">
            Simulation as infrastructure
          </h1>
        </div>
      </div>
    </main>
  );
}
