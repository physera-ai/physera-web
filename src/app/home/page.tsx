import { Header } from "@/components/Header";
import { HeroFluidBackground } from "@/components/HeroFluidBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <HeroFluidBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        {/* Main Content can go here */}
        <div className="flex-1 flex items-center justify-center pointer-events-none">
          <h1 className="font-display font-medium text-4xl md:text-7xl text-black tracking-tight drop-shadow-sm select-none">
            Simulation as infrastructure
          </h1>
        </div>
      </div>
    </main>
  );
}
