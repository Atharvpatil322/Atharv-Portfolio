"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { LuCheck, LuCopy, LuPhone } from "react-icons/lu";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { socials } from "@/data/site";

export function Connect() {
  const [copied, setCopied] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      toast.success("Email copied — go say hi.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(`Couldn't copy. It's ${socials.email}`);
    }
  }

  return (
    <section id="connect" className="px-6 pb-10 pt-24 sm:px-10 sm:pt-32">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-white/[0.07] to-white/[0.01] px-6 py-16 text-center sm:px-12 sm:py-24">
            <div aria-hidden className="absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
            <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />

            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">05 — Connect</p>
              <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
                Let&apos;s build something <span className="text-gradient">worth breaking.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-muted sm:text-lg">
                If you made it this far, either you&apos;re curious, bored, or actually interested — I&apos;ll take it 😄
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Magnetic>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-black shadow-[0_0_50px_-8px_var(--accent)]"
                  >
                    {socials.email}
                    {copied ? <LuCheck className="h-4 w-4" aria-hidden /> : <LuCopy className="h-4 w-4" aria-hidden />}
                  </button>
                </Magnetic>
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => setShowPhone((s) => !s)}
                    aria-label="Reveal phone number"
                    className="glass inline-flex h-[54px] items-center gap-2 rounded-full px-5 text-sm font-medium transition hover:border-accent/50"
                  >
                    <LuPhone className="h-4 w-4" aria-hidden />
                    <motion.span
                      initial={false}
                      animate={{ width: showPhone ? "auto" : 0, opacity: showPhone ? 1 : 0 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {socials.phone}
                    </motion.span>
                  </button>
                </Magnetic>
                {[
                  { href: socials.github, label: "GitHub", Icon: FaGithub },
                  { href: socials.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
                ].map(({ href, label, Icon }) => (
                  <Magnetic key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Atharv on ${label}`}
                      className="glass flex h-[54px] w-[54px] items-center justify-center rounded-full transition hover:border-accent hover:bg-accent hover:text-black"
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <footer className="flex flex-col items-center justify-between gap-3 py-10 font-mono text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Atharv Patil — built with Next.js, Tailwind &amp; too much coffee.</p>
          <p>
            Press <kbd className="rounded border border-line px-1.5 py-0.5">⌘</kbd> <kbd className="rounded border border-line px-1.5 py-0.5">K</kbd> to jump anywhere
          </p>
        </footer>
      </div>
    </section>
  );
}
