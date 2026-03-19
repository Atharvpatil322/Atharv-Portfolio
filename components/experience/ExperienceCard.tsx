"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExperienceSearch, useExperiencePointSearch } from "@/components/experience/ExperienceSearch";
import type { Experience } from "@/data/experience";

type ExperienceCardProps = {
  experience: Experience;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
};

export function ExperienceCard({
  experience,
  isOpen,
  onToggle,
  className,
}: ExperienceCardProps) {
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const filtered = useExperiencePointSearch(experience.points, query);

  return (
    <motion.div layout className={cn(className)}>
      <Card className="transition-shadow hover:shadow-lg hover:shadow-black/5">
        <button
          type="button"
          onClick={onToggle}
          className="block w-full text-left focus:outline-none"
          aria-expanded={isOpen}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <CardTitle className="truncate text-lg">
                  {experience.company}
                </CardTitle>
                <CardDescription className="mt-1">
                  {experience.role} · {experience.period}
                </CardDescription>
              </div>

              <div className="shrink-0 text-xs font-medium tracking-wide text-black/40">
                {isOpen ? "Close" : "Expand"}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-black/70">
              {experience.description}
            </p>
          </CardHeader>
        </button>

        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <CardContent className="pt-0">
                <ExperienceSearch query={query} onQueryChange={setQuery} />

                <motion.ul
                  layout
                  className="mt-6 space-y-3"
                  aria-label="Experience points"
                >
                  <AnimatePresence initial={false}>
                    {filtered.map((point) => (
                      <motion.li
                        key={point}
                        layout
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-black/75"
                      >
                        <span className="mr-2 text-black/40">•</span>
                        {point}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>

                {query.trim() && filtered.length === 0 ? (
                  <p className="mt-6 text-sm text-black/45">
                    No hits. Try simpler words like “cloud”, “rag”, or “chat”.
                  </p>
                ) : null}
              </CardContent>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

