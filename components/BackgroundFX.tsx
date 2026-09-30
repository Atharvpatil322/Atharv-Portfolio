"use client";

import { useEffect, useRef } from "react";

/** Fixed aurora blobs + an interactive particle constellation. */
export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 16000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 140) {
          p.x += (dxm / dm) * 0.8;
          p.y += (dym / dm) * 0.8;
        }

        ctx.fillStyle = "rgba(205,250,76,0.55)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(160,170,255,${(1 - d / 120) * 0.16})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        if (dm < 160) {
          ctx.strokeStyle = `rgba(205,250,76,${(1 - dm / 160) * 0.35})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute -left-40 -top-40 h-[42rem] w-[42rem] animate-blob rounded-full bg-violet/25 blur-[120px]" />
      <div className="absolute -right-40 top-1/4 h-[36rem] w-[36rem] animate-blob rounded-full bg-cyan/15 blur-[120px] [animation-delay:-6s]" />
      <div className="absolute bottom-[-12rem] left-1/3 h-[34rem] w-[34rem] animate-blob rounded-full bg-accent/10 blur-[130px] [animation-delay:-12s]" />
      <div className="grid-bg absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
