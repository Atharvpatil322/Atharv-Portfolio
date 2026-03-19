"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end justify-center overflow-hidden bg-zinc-100 pb-4 sm:pb-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl" />
      </div>

      <div className="absolute inset-x-6 top-6 z-20 flex flex-col gap-2 sm:inset-x-10 sm:top-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-xs tracking-wide text-black/70">© Code by Atharv</div>
        <div className="max-w-[22rem] text-xs leading-relaxed text-black/60 sm:max-w-sm sm:text-right">
          Passionate creative developer building products and solving problems
          through modern technologies.
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10"
      >
        <div className="relative flex items-center justify-center">
          <div className="pointer-events-none absolute inset-x-0 -top-10 flex justify-center sm:-top-16">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
              className="select-none text-center text-[clamp(3.8rem,12vw,9.5rem)] font-semibold tracking-[-0.09em] text-black/10 uppercase"
            >
              Developer &amp; Builder
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <Image
              src="https://res.cloudinary.com/dipgnc23n/image/upload/v1773908427/pfp_bhqjkb.png"
              alt="Portrait of Atharv"
              width={640}
              height={780}
              priority
              className="h-[80vh] w-auto max-w-[95vw] object-cover grayscale sm:h-[88vh]"
            />
          </motion.div>

          <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 sm:block">
            <a
              href="#intro"
              aria-label="Scroll to intro section"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white/70 backdrop-blur transition hover:bg-white"
            >
              <motion.span
                initial={{ y: 0 }}
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="text-black/70 transition group-hover:text-black"
              >
                ↓
              </motion.span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

