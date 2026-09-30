"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { LuCommand } from "react-icons/lu";

const links = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "connect", label: "Connect" },
];

export function NavBar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [active, setActive] = useState("top");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-gradient-to-r from-accent via-cyan to-violet"
        style={{ scaleX: progress }}
      />
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
      >
        <nav className="glass flex items-center gap-1 rounded-full p-1.5 shadow-2xl shadow-black/40">
          <a href="#top" className="mr-1 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="hidden sm:inline">Atharv</span>
          </a>
          <div className="hidden items-center md:flex">
            {links.slice(1).map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active === l.id ? "text-black" : "text-muted hover:text-foreground"
                }`}
              >
                {active === l.id ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{l.label}</span>
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="ml-1 flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition hover:border-accent/50 hover:text-foreground"
          >
            <LuCommand className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden font-mono sm:inline">K</span>
            <span className="sm:hidden">Menu</span>
          </button>
        </nav>
      </motion.header>
    </>
  );
}
