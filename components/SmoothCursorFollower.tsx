"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, input, textarea, select, [data-cursor='hover']";

export default function SmoothCursorFollower() {
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 45, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 45, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 160, damping: 20, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 160, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHovering(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden mix-blend-difference [@media(hover:hover)_and_(pointer:fine)]:block">
      <motion.div
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-white"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-white"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovering ? 56 : 32, height: hovering ? 56 : 32, scale: pressed ? 0.8 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </div>
  );
}
