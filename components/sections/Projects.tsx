"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowUpRight, LuCheck } from "react-icons/lu";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { projects, type Project } from "@/data/site";

const filters = ["All", "Project", "Freelance"] as const;

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const Wrapper = p.url ? "a" : "div";
  const linkProps = p.url ? { href: p.url, target: "_blank", rel: "noreferrer", "data-cursor": "hover" } : {};
  const featured = i === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className={featured ? "md:col-span-2" : ""}
    >
      <Wrapper {...linkProps} className="group block h-full">
        <SpotlightCard className="relative flex h-full flex-col overflow-hidden p-7 transition duration-300 group-hover:-translate-y-1 group-hover:border-accent/40 sm:p-8">
          <div aria-hidden className={`absolute inset-0 bg-gradient-to-br opacity-60 transition group-hover:opacity-100 ${p.gradient}`} />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-6 right-4 select-none text-[9rem] font-bold leading-none tracking-tighter text-white/[0.05] sm:text-[12rem]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="relative flex flex-1 flex-col">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                {String(i + 1).padStart(2, "0")} / {p.kind}
              </span>
              {p.url ? (
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                  <LuArrowUpRight className="h-4 w-4 transition group-hover:rotate-12" aria-hidden />
                </span>
              ) : null}
            </div>
            <h3 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">{p.name}</h3>
            <p className="mt-2 text-lg text-accent">{p.tagline}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/70">{p.description}</p>
            <ul className="mt-5 space-y-2 text-sm text-foreground/75">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-2.5">
                  <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {pt}
                </li>
              ))}
            </ul>
            <ul className="mt-auto flex flex-wrap gap-2 pt-7">
              {p.tags.map((t) => (
                <li key={t} className="rounded-full border border-line bg-black/20 px-3 py-1 font-mono text-[11px] text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </SpotlightCard>
      </Wrapper>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = projects.filter((p) => filter === "All" || p.kind === filter);

  return (
    <section id="projects" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Selected work"
          title={
            <>
              Things that <span className="text-gradient">somehow worked.</span>
            </>
          }
          aside="Side projects, plus freelance work with real users and real problems."
        />

        <Reveal className="mb-8 flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f ? "text-black" : "border border-line text-muted hover:text-foreground"
              }`}
            >
              {filter === f ? (
                <motion.span layoutId="proj-filter" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              ) : null}
              <span className="relative">{f}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <ProjectCard key={p.name} p={p} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
