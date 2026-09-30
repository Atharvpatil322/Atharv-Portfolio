const items = ["AI Engineering", "System Design", "RAG Pipelines", "GPU Orchestration", "Event-Driven Backends", "LLM Failover", "Full-Stack", "Cost Optimisation"];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-line bg-white/[0.02] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-2xl font-semibold uppercase tracking-tight text-foreground/25 sm:text-4xl">
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
