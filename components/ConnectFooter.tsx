"use client";

import { useState } from "react";

export function ConnectFooter() {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  return (
    <section className="bg-white px-6 pb-20 pt-2 text-black sm:px-10 sm:pb-28 sm:pt-4">
      <div className="mx-auto w-full max-w-6xl rounded-2xl border border-black/10 bg-white p-6 text-center sm:p-8">
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-black/75 sm:text-base">
          If you made it this far, either you&apos;re curious, bored, or actually interested... I&apos;ll
          take it 😄
        </p>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-black/60 sm:text-base">
          If you&apos;re looking to connect, these little icons below know where to find me.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="mailto:atharvpatil322@gmail.com"
            aria-label="Email Atharv"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black/70 transition hover:border-black/35 hover:text-black"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setShowPhoneNumber((prev) => !prev)}
            aria-label="Call Atharv"
            className={`relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full border text-black/70 transition-all duration-300 ease-out hover:border-black/35 hover:text-black ${
              showPhoneNumber
                ? "w-36 border-black/35 bg-black/5 px-3"
                : "w-10 border-black/15"
            }`}
          >
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                showPhoneNumber ? "opacity-0 scale-75" : "opacity-100 scale-100"
              }`}
            >
              <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.87 19.87 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.87 19.87 0 0 1 2.12 3.18 2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72c.12.9.33 1.78.64 2.62a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.46-1.21a2 2 0 0 1 2.11-.45c.84.31 1.72.52 2.62.64A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span
              className={`text-sm font-medium tracking-wide transition-all duration-300 ${
                showPhoneNumber ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
            >
              9325654085
            </span>
          </button>

          <a
            href="https://github.com/Atharvpatil322"
            target="_blank"
            rel="noreferrer"
            aria-label="Atharv on GitHub"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black/70 transition hover:border-black/35 hover:text-black"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="currentColor">
              <path d="M12 .5a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.42-4.04-1.42-.54-1.39-1.33-1.76-1.33-1.76-1.08-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.06 1.83 2.79 1.3 3.47.99.11-.78.42-1.3.76-1.6-2.67-.31-5.47-1.35-5.47-5.98 0-1.32.47-2.4 1.23-3.24-.12-.31-.53-1.56.12-3.25 0 0 1.01-.33 3.3 1.24a11.5 11.5 0 0 1 6 0c2.28-1.57 3.29-1.24 3.29-1.24.66 1.69.25 2.94.12 3.25.77.84 1.23 1.92 1.23 3.24 0 4.65-2.8 5.66-5.48 5.97.43.38.81 1.11.81 2.25v3.33c0 .32.22.7.82.58A12 12 0 0 0 12 .5Z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/atharv-patil-b305231ab/"
            target="_blank"
            rel="noreferrer"
            aria-label="Atharv on LinkedIn"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black/70 transition hover:border-black/35 hover:text-black"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43A2.07 2.07 0 1 1 5.34 3.3a2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

