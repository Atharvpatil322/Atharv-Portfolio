"use client";

import type { HTMLAttributes, MouseEvent } from "react";
import { cn } from "@/lib/utils";

/** A glass card with a cursor-following lime spotlight. */
export function SpotlightCard({ className, onMouseMove, ...props }: HTMLAttributes<HTMLDivElement>) {
  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
    onMouseMove?.(e);
  }
  return <div onMouseMove={handleMove} className={cn("spotlight glass rounded-3xl", className)} {...props} />;
}
