export function HeroBanner() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-xl border border-border/50 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/70 px-8 py-10 text-center dark:from-slate-900 dark:via-slate-800 dark:to-slate-950 md:px-12 md:py-12">
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <h1 className="relative mb-4 font-serif text-4xl font-normal tracking-tight text-white dark:text-white md:mb-5 md:text-5xl lg:text-6xl">
        SubQ speech-to-text documentation
      </h1>
      <p className="relative mx-auto max-w-2xl font-mono font-normal text-base text-white/80 dark:text-white/80 md:text-lg">
        Fast, accurate speech-to-text API that is fully compatible with Deepgram
      </p>
    </div>
  );
}
