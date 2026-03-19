"use client";

import { motion } from "framer-motion";
import { ExperienceCard } from "@/components/ExperienceCard";

const items = [
  {
    company: "AI Content Platform",
    role: "Builder",
    description: "Turning prompts into polished content—fast, clean, scalable.",
  },
  {
    company: "RAG Education Startup",
    role: "Developer",
    description: "Making learning search smarter (and a bit magical).",
  },
  {
    company: "Distributed Video Generation System",
    role: "Engineer",
    description: "Pipelines, queues, and frames—at scale.",
  },
  {
    company: "Personal AI Experiments",
    role: "Tinkerer",
    description: "Small prototypes, big curiosity, lots of iterations.",
  },
];

export function ExperienceGrid() {
  return (
    <section className="bg-white px-6 pb-24 text-black sm:px-10 sm:pb-32">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs font-medium tracking-wide text-black/50">
              Experience Preview
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Things I like building
            </h2>
          </div>
          <div className="hidden text-sm text-black/50 sm:block">
            Click to explore →
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.05 }}
            >
              <ExperienceCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

