"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { skillGroups } from "@/data/site";

export function Skills() {
  return (
    <section id="skills" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Toolbox"
          title={
            <>
              Sharp tools, <span className="text-gradient">well kept.</span>
            </>
          }
          aside="Hover the chips. They like attention."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.07}>
              <SpotlightCard className="h-full p-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{g.title}</h3>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: g.color, boxShadow: `0 0 16px ${g.color}` }} />
                </div>
                <p className="mt-1 text-sm text-muted">{g.blurb}</p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {g.skills.map(({ name, icon: Icon }) => (
                    <motion.li
                      key={name}
                      whileHover={{ y: -4, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className="flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-2 text-sm"
                      style={{ ["--c" as string]: g.color }}
                    >
                      <Icon className="h-4 w-4" style={{ color: g.color }} aria-hidden />
                      {name}
                    </motion.li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
