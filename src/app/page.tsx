import { Header3 } from "@/components/Header3";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#e9e9e9] relative overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <div className="pointer-events-auto">
          <Header3 position="sides"/>
        </div>
        {/* Main Content can go here */}
        <div className="flex-1 flex-col flex items-center justify-center">
          <h1 className="font-mono text-4xl uppercase md:text-5xl text-black/80 tracking-tight drop-shadow-sm select-none pointer-events-auto cursor-default">
            Physera is the RL training
          </h1>
          <h1 className="font-mono text-4xl uppercase md:text-5xl text-black/80 tracking-tight drop-shadow-sm select-none pointer-events-auto cursor-default">
            Simulation as infrastructure
          </h1>
        </div>
      </div>
    </main>
  );
}
