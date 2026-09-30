import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  aside,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          <span className="text-accent">{index}</span>
          <span className="h-px w-10 bg-line" />
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          {title}
        </h2>
      </div>
      {aside ? <div className="max-w-xs text-sm text-muted">{aside}</div> : null}
    </Reveal>
  );
}
