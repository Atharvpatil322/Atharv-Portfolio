"use client";

import { useEffect, useState } from "react";
import { NavBar } from "@/components/NavBar";
import { CommandPalette } from "@/components/CommandPalette";

/** Owns the command-palette state and the global ⌘K / Ctrl+K shortcut. */
export function SiteShell() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <NavBar onOpenPalette={() => setOpen(true)} />
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}
