"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuGraduationCap, LuRocket, LuSparkles } from "react-icons/lu";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Counter } from "@/components/ui/Counter";
import { education, journey, stats } from "@/data/site";

function JourneyStepper() {
  const [active, setActive] = useState(journey.length - 2);
  const step = journey[active];

  return (
    <div>
      <div className="relative mt-6">
        <div className="absolute left-0 right-0 top-[15px] h-px bg-line" aria-hidden />
        <motion.div
          className="absolute left-0 top-[15px] h-px bg-accent"
          animate={{ width: `${(active / (journey.length - 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 180, damping: 26 }}
          aria-hidden
        />
        <ol className="relative flex justify-between">
          {journey.map((s, i) => (
            <li key={s.year}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${s.year}: ${s.title}`}
                aria-current={i === active}
                className="group flex flex-col items-center gap-2"
              >
                <span
                  className={`h-[31px] w-[31px] rounded-full border-2 transition-all ${
                    i <= active ? "border-accent bg-accent/20" : "border-line bg-background"
                  } ${i === active ? "scale-110 shadow-[0_0_20px_var(--accent)]" : "group-hover:border-accent/60"}`}
                />
                <span className={`hidden font-mono text-[10px] sm:block ${i === active ? "text-accent" : "text-muted"}`}>{s.year}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-6 min-h-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <p className="font-mono text-xs text-accent">{step.year}</p>
            <h4 className="mt-1 text-xl font-semibold">{step.title}</h4>
            <p className="mt-1 text-sm text-muted">{step.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              Messy problems in.
              <br />
              <span className="text-gradient">Quiet systems out.</span>
            </>
          }
          aside="GPU costs spiraling, pipelines held together by hope — I turn them into systems that just work."
        />

        <div className="grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <SpotlightCard className="h-full p-7 sm:p-9">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <LuRocket aria-hidden /> Journey into tech
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/85 sm:text-xl">
                From wiring an Arduino in 11th grade to orchestrating cloud GPUs — every step was curiosity outrunning
                comfort. Tap a milestone to follow the path.
              </p>
              <JourneyStepper />
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2">
            <SpotlightCard className="flex h-full flex-col p-7">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan">
                <LuGraduationCap aria-hidden /> Education
              </p>
              <ul className="mt-5 flex flex-1 flex-col justify-between gap-4">
                {education.map((e) => (
                  <li key={e.label} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <p className="text-3xl font-semibold tracking-tight">{e.value}</p>
                    <p className="mt-1 text-sm text-muted">{e.label}</p>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>

          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.05 * i} className="md:col-span-3">
              <SpotlightCard className="flex h-full items-center justify-between p-7">
                <div>
                  <p className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-muted">{s.label}</p>
                </div>
                <LuSparkles className="h-6 w-6 text-accent/60" aria-hidden />
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
