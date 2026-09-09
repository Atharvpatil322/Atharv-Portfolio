"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  { href: "#intro", label: "Intro" },
  { href: "#experience", label: "Experience" },
  { href: "#connect", label: "Connect" },
];

export function NavBar() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-accent"
        style={{ scaleX: progress }}
      />
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 sm:px-10 ${
          visible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <a
          href="#"
          className="flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-xs font-medium tracking-wide text-black/80 backdrop-blur transition hover:border-black/25"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Atharv
        </a>

        <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/80 p-1 backdrop-blur">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-black/70 transition hover:bg-accent hover:text-black"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
