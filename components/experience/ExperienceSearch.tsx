"use client";

import * as React from "react";
import Fuse from "fuse.js";
import { cn } from "@/lib/utils";

const synonymMap: Record<string, string[]> = {
  cloud: ["gpu", "aws", "infrastructure"],
  ai: ["llm", "rag", "model"],
  chat: ["messaging", "conversation"],
  mobile: ["react native"],
};

type ExperienceSearchProps = {
  query: string;
  onQueryChange: (value: string) => void;
  className?: string;
};

/**
 * Search logic notes:
 * - We do fuzzy matching via Fuse.js on the experience point text.
 * - We also expand the user's query with a small synonym map so searches like
 *   "cloud" can match points mentioning "gpu" or "aws".
 */
export function ExperienceSearch({
  query,
  onQueryChange,
  className,
}: ExperienceSearchProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-xs font-medium tracking-wide text-black/50">
        Search
      </label>
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search anything… try 'cloud', 'rag', 'gpu', 'react', etc."
        className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none transition focus:border-black/25"
      />
    </div>
  );
}

export function useExperiencePointSearch(points: string[], query: string) {
  const fuse = React.useMemo(() => {
    return new Fuse(points.map((text, idx) => ({ id: idx, text })), {
      keys: ["text"],
      includeScore: true,
      threshold: 0.35,
      distance: 120,
      ignoreLocation: true,
    });
  }, [points]);

  const expandedQuery = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const tokens = q.split(/\s+/).filter(Boolean);
    const expanded = new Set<string>(tokens);

    for (const token of tokens) {
      const synonyms = synonymMap[token];
      if (synonyms) synonyms.forEach((s) => expanded.add(s));
    }

    // Also let "react native" search count as "mobile"
    if (q.includes("react") && q.includes("native")) {
      expanded.add("mobile");
      synonymMap.mobile.forEach((s) => expanded.add(s));
    }

    return Array.from(expanded);
  }, [query]);

  return React.useMemo(() => {
    if (!query.trim()) return points;

    // Fuse doesn't support "OR across multiple queries" directly, so we do
    // a single search per expanded token and merge results by best score.
    const bestScoreById = new Map<number, number>();

    for (const token of expandedQuery) {
      for (const result of fuse.search(token)) {
        const prev = bestScoreById.get(result.item.id);
        const score = result.score ?? 0;
        if (prev === undefined || score < prev) bestScoreById.set(result.item.id, score);
      }
    }

    const hits = Array.from(bestScoreById.entries())
      .sort((a, b) => a[1] - b[1])
      .map(([id]) => points[id]);

    // If we got nothing via fuzzy matching, fall back to a plain contains check.
    if (hits.length > 0) return hits;

    const q = query.trim().toLowerCase();
    return points.filter((p) => p.toLowerCase().includes(q));
  }, [expandedQuery, fuse, points, query]);
}

