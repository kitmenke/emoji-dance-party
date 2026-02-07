import Image from "next/image";
import BarChart from "@/components/BarChart";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      {/* Header/Nav */}
      <header className="sticky top-0 z-50 border-b border-black/[0.05] bg-white/80 backdrop-blur-md dark:border-white/[0.05] dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-black dark:bg-white" />
            <span className="text-lg font-bold tracking-tight">Kitboard</span>
          </div>
          <nav className="hidden gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400 sm:flex">
            <a href="#" className="transition-colors hover:text-black dark:hover:text-white">Product</a>
            <a href="#" className="transition-colors hover:text-black dark:hover:text-white">Features</a>
            <a href="#" className="transition-colors hover:text-black dark:hover:text-white">Docs</a>
            <a href="#" className="transition-colors hover:text-black dark:hover:text-white">Pricing</a>
          </nav>
          <button className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95 dark:bg-white dark:text-black">
            Get Started
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Hero Content */}
          <div className="flex flex-col gap-8">
            <div className="inline-flex w-fit items-center rounded-full border border-black/5 bg-black/[0.02] px-3 py-1 text-xs font-semibold text-black dark:border-white/5 dark:bg-white/[0.02] dark:text-white">
              <span className="mr-2 rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] text-white">New</span>
              D3 Visualizations are now live
            </div>
            
            <h1 className="text-5xl font-extrabold tracking-tight text-black dark:text-zinc-50 sm:text-6xl">
              Visualize your data <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                beautifully.
              </span>
            </h1>
            
            <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Build high-performance, interactive visualizations with the power of D3.js integrated directly into your Next.js application.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black px-8 text-base font-semibold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                href="#"
              >
                Documentation
              </a>
              <a
                className="flex h-14 items-center justify-center rounded-2xl border border-black/10 bg-white px-8 text-base font-semibold text-black transition-all hover:bg-zinc-50 dark:border-white/10 dark:bg-transparent dark:text-white dark:hover:bg-white/5"
                href="#"
              >
                View Examples
              </a>
            </div>
          </div>

          {/* Right Column: Visualization */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 blur-3xl" />
            <div className="relative">
              <BarChart />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { title: "Fast Performance", desc: "Optimized SVG rendering for smooth interactions." },
            { title: "Full Control", desc: "Leverage the entire D3 ecosystem for custom charts." },
            { title: "React Ready", desc: "Seamlessly integrate with React hooks and lifecycle." }
          ].map((feature, i) => (
            <div key={i} className="rounded-3xl border border-black/5 bg-white p-8 dark:border-white/5 dark:bg-zinc-900/40">
              <h3 className="text-lg font-bold text-black dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-black/[0.05] py-12 dark:border-white/[0.05]">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-zinc-500">
          <p>© 2026 Kitboard. Powered by D3.js and Next.js.</p>
        </div>
      </footer>
    </div>
  );
}
