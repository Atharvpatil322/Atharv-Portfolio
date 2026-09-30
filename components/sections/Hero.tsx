"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LuArrowDownRight, LuArrowUpRight, LuMapPin } from "react-icons/lu";
import { Magnetic } from "@/components/ui/Magnetic";
import { roles } from "@/data/site";

function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i];
    const delay = deleting ? 35 : text === word ? 1600 : 75;
    const t = setTimeout(() => {
      if (!deleting && text === word) return setDeleting(true);
      if (deleting && text === "") {
        setDeleting(false);
        return setI((n) => (n + 1) % words.length);
      }
      setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <span className="text-gradient">
      {text}
      <span className="ml-0.5 inline-block animate-blink text-accent">|</span>
    </span>
  );
}

const floaters = [
  { label: "RAG", className: "left-[-8%] top-[14%]", delay: "0s" },
  { label: "GPU", className: "right-[-10%] top-[8%]", delay: "-2s" },
  { label: "Kafka", className: "left-[-14%] bottom-[24%]", delay: "-4s" },
  { label: "LLMs", className: "right-[-8%] bottom-[16%]", delay: "-1s" },
];

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28 sm:px-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
            Open to interesting problems
            <span className="mx-1 h-3 w-px bg-line" />
            <LuMapPin className="h-3 w-3" aria-hidden /> India
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mt-6 text-[clamp(3.2rem,9vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
          >
            Hi, I&apos;m
            <br />
            <span className="relative inline-block">
              Atharv
              <svg viewBox="0 0 300 16" aria-hidden className="absolute -bottom-2 left-0 w-full text-accent">
                <motion.path
                  d="M2 11 C 60 2, 120 15, 180 6 S 270 4, 298 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.9, ease: "easeInOut" }}
                />
              </svg>
            </span>
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 h-9 text-2xl font-medium sm:text-3xl"
          >
            <Typewriter words={roles} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            I blend AI, backend engineering and system design into products where solid architecture quietly powers
            simple experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-black shadow-[0_0_40px_-8px_var(--accent)] transition hover:shadow-[0_0_60px_-4px_var(--accent)]"
              >
                See my work
                <LuArrowDownRight className="h-4 w-4 transition group-hover:translate-y-0.5" aria-hidden />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#connect"
                className="glass group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition hover:border-accent/50"
              >
                Let&apos;s talk
                <LuArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="relative mx-auto w-full max-w-sm [perspective:1000px] lg:max-w-none"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onMouseLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          <div className="absolute inset-[-12%] animate-spin-slow rounded-full border border-dashed border-line" aria-hidden />
          <div className="absolute inset-[-4%] rounded-full bg-[conic-gradient(from_0deg,var(--accent),var(--cyan),var(--violet),var(--accent))] opacity-30 blur-3xl" aria-hidden />

          <motion.div style={{ rotateX, rotateY }} className="relative [transform-style:preserve-3d]">
            <div className="rounded-[2.5rem] bg-gradient-to-br from-accent via-cyan to-violet p-[2px]">
              <div className="relative overflow-hidden rounded-[calc(2.5rem-2px)] bg-[radial-gradient(ellipse_at_50%_35%,rgba(139,92,246,0.3),rgba(34,211,238,0.06)_55%,#0b0b12_85%)]">
                <Image
                  src="https://res.cloudinary.com/dipgnc23n/image/upload/v1773908427/pfp_bhqjkb.png"
                  alt="Portrait of Atharv"
                  width={640}
                  height={780}
                  priority
                  className="aspect-square w-full object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-transparent to-transparent" />
                <div className="glass absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl px-4 py-3 text-xs">
                  <span className="font-mono text-muted">status</span>
                  <span className="flex items-center gap-2 font-medium">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> Building @ Strategy
                  </span>
                </div>
              </div>
            </div>

            {floaters.map((f) => (
              <span
                key={f.label}
                style={{ animationDelay: f.delay, transform: "translateZ(60px)" }}
                className={`glass absolute hidden animate-float rounded-full px-3.5 py-1.5 font-mono text-xs text-accent shadow-lg shadow-black/40 sm:block ${f.className}`}
              >
                {f.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted lg:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-accent"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </a>
    </section>
  );
}
