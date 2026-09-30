"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowRight, LuCornerDownLeft, LuSearch } from "react-icons/lu";
import { socials } from "@/data/site";

type Cmd = { id: string; label: string; hint: string; run: () => void };

export const OPEN_CHAT_EVENT = "portfolio:open-chat";

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open ? <PaletteBody onClose={onClose} /> : null}</AnimatePresence>;
}

function PaletteBody({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Cmd[]>(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const ext = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
    return [
      { id: "home", label: "Go to Home", hint: "Navigate", run: go("top") },
      { id: "about", label: "Go to About", hint: "Navigate", run: go("about") },
      { id: "skills", label: "Go to Skills", hint: "Navigate", run: go("skills") },
      { id: "exp", label: "Go to Experience", hint: "Navigate", run: go("experience") },
      { id: "proj", label: "Go to Projects", hint: "Navigate", run: go("projects") },
      { id: "connect", label: "Go to Connect", hint: "Navigate", run: go("connect") },
      { id: "chat", label: "Ask the AI about Atharv", hint: "Action", run: () => window.dispatchEvent(new Event(OPEN_CHAT_EVENT)) },
      {
        id: "copy",
        label: "Copy email address",
        hint: "Action",
        run: () => {
          void navigator.clipboard?.writeText(socials.email);
        },
      },
      { id: "gh", label: "Open GitHub", hint: "Link", run: ext(socials.github) },
      { id: "li", label: "Open LinkedIn", hint: "Link", run: ext(socials.linkedin) },
    ];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, []);

  function run(cmd?: Cmd) {
    if (!cmd) return;
    onClose();
    setTimeout(cmd.run, 120);
  }

  return (
    <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-[16vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-lg overflow-hidden rounded-2xl bg-[#0d0d14]/95 shadow-2xl shadow-black/60"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <LuSearch className="h-4 w-4 text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setIndex((i) => Math.min(i + 1, results.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setIndex((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter") {
                    run(results[index]);
                  }
                }}
                placeholder="Type a command or jump to a section…"
                className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {results.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => run(c)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      i === index ? "bg-accent text-black" : "text-foreground/80"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <LuArrowRight className="h-3.5 w-3.5" aria-hidden />
                      {c.label}
                    </span>
                    <span className={`font-mono text-[10px] uppercase tracking-wider ${i === index ? "text-black/60" : "text-muted"}`}>
                      {c.hint}
                    </span>
                  </button>
                </li>
              ))}
              {results.length === 0 ? <li className="px-3 py-6 text-center text-sm text-muted">Nothing matches “{query}”.</li> : null}
            </ul>
            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-muted">
              <span>↑↓ navigate</span>
              <span className="flex items-center gap-1">
                <LuCornerDownLeft aria-hidden /> select
              </span>
            </div>
          </motion.div>
        </motion.div>
  );
}
