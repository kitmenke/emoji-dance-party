import FractalViz from "@/components/FractalViz";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black">
      <FractalViz />
      
      {/* Overlay UI */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-12">
        <header className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-white blur-[2px]" />
            <span className="text-xl font-black tracking-tighter text-white uppercase">Kitboard</span>
          </div>
          <nav className="flex gap-8 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <a href="#" className="transition-colors hover:text-white">Generative</a>
            <a href="#" className="transition-colors hover:text-white">Recursive</a>
            <a href="#" className="transition-colors hover:text-white">D3.js</a>
          </nav>
        </header>

        <footer className="flex items-end justify-between pointer-events-auto">
          <div className="max-w-xs">
            <p className="text-[10px] leading-relaxed text-zinc-500 font-medium uppercase tracking-wider">
              System: D3 Recursion Engine 0.1<br />
              Status: Active rendering<br />
              Interaction: Mouse mapped to θ
            </p>
          </div>
          <div className="flex gap-4">
            <button className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-[10px] font-bold text-white uppercase tracking-widest backdrop-blur-sm transition-all hover:bg-white/10">
              Refresh Seed
            </button>
            <button className="rounded-full bg-white px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest transition-transform hover:scale-105 active:scale-95">
              Launch App
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
