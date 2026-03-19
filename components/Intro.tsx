"use client";

import { motion } from "framer-motion";

export function Intro() {
  return (
    <section
      id="intro"
      className="bg-white px-6 py-20 text-black sm:px-10 sm:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-lg leading-relaxed tracking-tight text-black/80 sm:text-xl"
        >
Blending AI, backend engineering, and system design, I enjoy creating products where solid architecture quietly powers simple user experiences.        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="space-y-5"
        >
          <p className="text-sm leading-relaxed text-black/60">
          Blending AI, backend engineering, and system design, I enjoy creating products where solid architecture quietly powers simple user experiences.
          </p>

          <a
            href="#experience"
            className="inline-flex items-center gap-2 text-sm font-medium text-black/80 transition hover:text-black"
          >
            More about me <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

