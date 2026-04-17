import Image from "next/image";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: "https://github.com/subquadratic-ai",
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold">
          <Image
            src="/subq-logo-light.png"
            alt="SubQ"
            width={64}
            height={32}
            className="rounded dark:hidden"
          />
          <Image
            src="/subq-logo-dark.png"
            alt="SubQ"
            width={64}
            height={32}
            className="hidden rounded dark:block"
          />
        </span>
      ),
      url: "/docs",
    },
    links: [
      {
        type: "button",
        text: (
          <span className="inline-flex items-center gap-1.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Dashboard
          </span>
        ),
        url: "https://speech.subq.ai/dashboard",
        external: true,
        secondary: false,
      },
    ],
  };
}
