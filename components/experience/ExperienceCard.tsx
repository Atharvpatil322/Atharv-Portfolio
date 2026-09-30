"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { ExperienceSearch, useExperiencePointSearch } from "@/components/experience/ExperienceSearch";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Experience } from "@/data/experience";

type Props = {
  experience: Experience;
  isOpen: boolean;
  onToggle: () => void;
  current?: boolean;
};

export function ExperienceCard({ experience, isOpen, onToggle, current }: Props) {
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const filtered = useExperiencePointSearch(experience.points, query);

  return (
    <SpotlightCard className={cn("overflow-hidden transition-colors", isOpen && "border-accent/40")}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="block w-full p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{experience.company}</h3>
              {current ? (
                <span className="flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> Current
                </span>
              ) : null}
            </div>
            <p className="mt-1.5 font-mono text-xs text-muted">
              {experience.role} · {experience.period}
            </p>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line transition-colors",
              isOpen && "border-accent bg-accent text-black",
            )}
          >
            <LuChevronDown className="h-4 w-4" aria-hidden />
          </motion.span>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base">{experience.description}</p>
        {!isOpen ? (
          <p className="mt-4 font-mono text-[11px] text-muted">{experience.points.length} highlights · click to expand</p>
        ) : null}
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 sm:px-8 sm:pb-8">
              <ExperienceSearch query={query} onQueryChange={setQuery} />
              <ul className="mt-5 space-y-2.5" aria-label="Experience highlights">
                <AnimatePresence initial={false}>
                  {filtered.map((point) => (
                    <motion.li
                      key={point}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex gap-3 rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-foreground/75 transition-colors hover:border-accent/40 hover:bg-accent/[0.06]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {point}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              {query.trim() && filtered.length === 0 ? (
                <p className="mt-5 text-sm text-muted">No hits. Try simpler words like “cloud”, “rag”, or “chat”.</p>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SpotlightCard>
  );
}
