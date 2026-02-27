import Link from "next/link";

// SVG icon components for the landing cards
function QuickstartIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground/60"
    >
      <path
        d="M44 18L30 44h12l-4 18 18-28H44l4-16z"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  );
}

function ConceptsIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground/60"
    >
      <circle cx="40" cy="36" r="14" fill="currentColor" opacity="0.25" />
      <path
        d="M33 50v4a7 7 0 0014 0v-4"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.45"
      />
      <line x1="40" y1="56" x2="40" y2="62" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <line x1="36" y1="59" x2="44" y2="59" stroke="currentColor" strokeWidth="2" opacity="0.35" />
    </svg>
  );
}

function IntegrationIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground/60"
    >
      <rect x="16" y="28" width="18" height="24" rx="3" fill="currentColor" opacity="0.3" />
      <rect x="46" y="28" width="18" height="24" rx="3" fill="currentColor" opacity="0.3" />
      <line x1="34" y1="40" x2="46" y2="40" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <polyline points="42,36 46,40 42,44" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.45" />
    </svg>
  );
}

function NativeSDKIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground/60"
    >
      <rect x="28" y="16" width="24" height="48" rx="4" fill="currentColor" opacity="0.25" />
      <rect x="32" y="22" width="16" height="30" rx="1" fill="currentColor" opacity="0.15" />
      <circle cx="40" cy="58" r="2.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function APIReferenceIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground/60"
    >
      <rect x="18" y="24" width="44" height="32" rx="4" fill="currentColor" opacity="0.2" />
      <text x="24" y="38" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.5">GET</text>
      <rect x="24" y="42" width="32" height="3" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="24" y="48" width="24" height="3" rx="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function GuidesIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground/60"
    >
      <path
        d="M22 20h14c2 0 4 2 4 4v32c0 2-2 4-4 4H22c-2 0-4-2-4-4V24c0-2 2-4 4-4z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M58 20H44c-2 0-4 2-4 4v32c0 2 2 4 4 4h14c2 0 4-2 4-4V24c0-2-2-4-4-4z"
        fill="currentColor"
        opacity="0.25"
      />
      <path d="M40 24v32" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <div className="mx-auto w-full max-w-6xl px-4 my-15 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12">
        <div className="relative mb-10 overflow-hidden rounded-xl border border-border/50 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/70 px-8 py-10 text-center dark:from-slate-900 dark:via-slate-800 dark:to-slate-950 md:px-12 md:py-12">
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <h1 className="relative mb-4 text-4xl font-bold tracking-tight text-white dark:text-white md:mb-5 md:text-5xl lg:text-6xl">
            Aldea speech-to-text documentation
          </h1>
          <p className="relative mx-auto max-w-2xl text-base text-white/80 dark:text-white/80 md:text-lg">
            Fast, accurate speech-to-text API. Deepgram-compatible: migrate
            with a two-line code change or start fresh with our native SDKs.
          </p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {/* Quickstart */}
          <Link
            href="/docs/getting-started/quickstart"
            className="group rounded-lg border border-border/50 bg-slate-50/50 p-5 transition-all hover:border-border hover:bg-slate-100/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/70 md:p-6"
          >
            <div className="mb-3 flex h-20 items-center justify-center md:mb-4">
              <QuickstartIcon />
            </div>
            <h3 className="mb-1.5 text-lg font-semibold">Quickstart</h3>
            <p className="text-sm text-muted-foreground">
              Get your first transcription in under 5 minutes with any
              language.
            </p>
          </Link>

          {/* Concepts */}
          <Link
            href="/docs/concepts/how-aldea-works"
            className="group rounded-lg border border-border/50 bg-slate-50/50 p-5 transition-all hover:border-border hover:bg-slate-100/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/70 md:p-6"
          >
            <div className="mb-3 flex h-20 items-center justify-center md:mb-4">
              <ConceptsIcon />
            </div>
            <h3 className="mb-1.5 text-lg font-semibold">Concepts</h3>
            <p className="text-sm text-muted-foreground">
              Pre-recorded vs streaming, diarization, smart formatting, and
              more.
            </p>
          </Link>

          {/* Integration Examples */}
          <Link
            href="/docs/integration/overview"
            className="group rounded-lg border border-border/50 bg-slate-50/50 p-5 transition-all hover:border-border hover:bg-slate-100/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/70 md:p-6"
          >
            <div className="mb-3 flex h-20 items-center justify-center md:mb-4">
              <IntegrationIcon />
            </div>
            <h3 className="mb-1.5 text-lg font-semibold">
              Integration examples
            </h3>
            <p className="text-sm text-muted-foreground">
              Python, Node.js, Go, Rust, and browser: with Deepgram SDK or
              raw HTTP.
            </p>
          </Link>

          {/* Native SDKs */}
          <Link
            href="/docs/integration/native-sdks/ios/installation"
            className="group rounded-lg border border-border/50 bg-slate-50/50 p-5 transition-all hover:border-border hover:bg-slate-100/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/70 md:p-6"
          >
            <div className="mb-3 flex h-20 items-center justify-center md:mb-4">
              <NativeSDKIcon />
            </div>
            <h3 className="mb-1.5 text-lg font-semibold">Native SDKs</h3>
            <p className="text-sm text-muted-foreground">
              First-party iOS (Swift) and Android (Kotlin) SDKs for mobile
              apps.
            </p>
          </Link>

          {/* API Reference */}
          <Link
            href="/docs/api-reference/api-overview"
            className="group rounded-lg border border-border/50 bg-slate-50/50 p-5 transition-all hover:border-border hover:bg-slate-100/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/70 md:p-6"
          >
            <div className="mb-3 flex h-20 items-center justify-center md:mb-4">
              <APIReferenceIcon />
            </div>
            <h3 className="mb-1.5 text-lg font-semibold">API reference</h3>
            <p className="text-sm text-muted-foreground">
              Pre-recorded and streaming endpoints, parameters, and error
              codes.
            </p>
          </Link>

          {/* Guides */}
          <Link
            href="/docs/guides/best-practices"
            className="group rounded-lg border border-border/50 bg-slate-50/50 p-5 transition-all hover:border-border hover:bg-slate-100/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/70 md:p-6"
          >
            <div className="mb-3 flex h-20 items-center justify-center md:mb-4">
              <GuidesIcon />
            </div>
            <h3 className="mb-1.5 text-lg font-semibold">Guides</h3>
            <p className="text-sm text-muted-foreground">
              Best practices, audio quality tips, latency optimization, and
              troubleshooting.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
