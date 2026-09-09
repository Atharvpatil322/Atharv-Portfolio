"use client";

import { motion } from "framer-motion";

export function Intro() {
  return (
    <section
      id="intro"
      className="bg-white px-6 py-20 text-black sm:px-10 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-black/40"
        >
          <span className="text-accent-dark">( 01 )</span> Intro
        </motion.p>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl font-medium leading-[1.15] tracking-tight text-black sm:text-4xl"
          >
            Blending <span className="bg-accent px-1.5">AI</span>, backend
            engineering, and{" "}
            <span className="bg-accent px-1.5">system design</span> into
            products where solid architecture quietly powers simple user
            experiences.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="flex flex-col justify-between gap-6"
          >
            <p className="text-sm leading-relaxed text-black/60 sm:text-base">
              I like taking messy, ambitious problems — GPU costs spiraling,
              pipelines held together by hope — and turning them into systems
              that just work, quietly, in the background.
            </p>

            <a
              href="#experience"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-medium text-black/80 transition hover:border-accent-dark hover:bg-accent hover:text-black"
            >
              More about me{" "}
              <span aria-hidden className="transition group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

