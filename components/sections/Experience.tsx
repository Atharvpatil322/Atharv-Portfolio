"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experiences } from "@/data/experience";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  const [open, setOpen] = React.useState<string | null>(experiences[0]?.company ?? null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title={
            <>
              War stories, <span className="text-gradient">made readable.</span>
            </>
          }
          aside="Open a card, then search its highlights — try “gpu”, “kafka” or “rag”."
        />

        <div ref={listRef} className="relative pl-8 sm:pl-14">
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-line sm:left-[19px]" aria-hidden />
          <motion.div
            className="absolute left-[11px] top-0 w-px origin-top bg-gradient-to-b from-accent via-cyan to-violet sm:left-[19px]"
            style={{ scaleY: fill, height: "100%" }}
            aria-hidden
          />
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <Reveal key={exp.company} delay={0.05} className="relative">
                <span
                  className={`absolute -left-[29px] top-9 h-[13px] w-[13px] rounded-full border-2 transition sm:-left-[47px] sm:h-[17px] sm:w-[17px] ${
                    open === exp.company ? "border-accent bg-accent shadow-[0_0_18px_var(--accent)]" : "border-line bg-background"
                  }`}
                  aria-hidden
                />
                <ExperienceCard
                  experience={exp}
                  current={i === 0}
                  isOpen={open === exp.company}
                  onToggle={() => setOpen((c) => (c === exp.company ? null : exp.company))}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
