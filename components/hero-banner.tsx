export function HeroBanner() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-xl border border-border/50 px-8 py-10 md:px-12 md:py-12">
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
      />
      <h1 className="relative mb-4 font-serif text-2xl md:!text-4xl font-normal tracking-tight dark:text-white md:mb-5 md:text-5xl lg:text-6xl">
        SubQ speech-to-text documentation
      </h1>
      <p className="relative mx-auto max-w-4xl font-mono font-normal text-base dark:text-white/80">
        Fast, accurate speech-to-text API that is fully compatible with Deepgram
      </p>
    </div>
  );
}
