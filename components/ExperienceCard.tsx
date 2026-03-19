"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ExperienceCardProps = {
  company: string;
  role: string;
  description: string;
  href?: string;
  className?: string;
};

export function ExperienceCard({
  company,
  role,
  description,
  href = "#",
  className,
}: ExperienceCardProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("block focus:outline-none", className)}
      aria-label={`${company} — ${role}`}
    >
      <Card className="h-full transition-shadow hover:shadow-lg hover:shadow-black/5">
        <CardHeader className="pb-2">
          <CardTitle className="truncate">{company}</CardTitle>
          <CardDescription className="text-black/60">{role}</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm leading-relaxed text-black/70">{description}</p>
        </CardContent>
      </Card>
    </motion.a>
  );
}

