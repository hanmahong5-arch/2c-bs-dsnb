"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ContentBundle, Era, EmotionalBeat } from "@/lib/content";

// Era color map — stays within the DeepSeek blue palette
const ERA_COLORS: Record<Era, { dot: string; label: string; bg: string }> = {
  origin: {
    dot: "#6F8AFF",
    label: "起源",
    bg: "rgba(77,107,254,0.08)",
  },
  breakthrough: {
    dot: "#22D3EE",
    label: "突破",
    bg: "rgba(34,211,238,0.06)",
  },
  world: {
    dot: "#FBBF24",
    label: "震荡世界",
    bg: "rgba(251,191,36,0.06)",
  },
  present: {
    dot: "#4D6BFE",
    label: "现在",
    bg: "rgba(77,107,254,0.1)",
  },
};

// Emotional beat icons — minimal SVG marks
const BEAT_ICONS: Record<EmotionalBeat, React.ReactNode> = {
  spark: (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
      <path
        d="M11 3L5 11h5l-1 6 6-8h-5l1-6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  struggle: (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
      <path
        d="M10 4v6M10 14v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  triumph: (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
      <path
        d="M4 10l4 4 8-8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  humility: (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
      <circle
        cx="10"
        cy="10"
        r="6"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M10 7v3l2 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  turning: (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
      <path
        d="M4 10h12M13 7l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

type TimelineEntryProps = {
  entry: ContentBundle["timeline"][number];
  index: number;
};

function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const era = ERA_COLORS[entry.era];

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 sm:gap-10"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index * 0.06, 0.3),
      }}
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <div
          className="w-3 h-3 rounded-full mt-1.5"
          style={{
            background: era.dot,
            boxShadow: `0 0 12px ${era.dot}60, 0 0 0 2px var(--background), 0 0 0 3px ${era.dot}80`,
          }}
        />
        {/* Connector line */}
        <div className="w-px flex-1 mt-3 min-h-8" style={{ background: `linear-gradient(to bottom, ${era.dot}30, transparent)` }} />
      </div>

      {/* Card */}
      <div
        className="flex-1 pb-10 sm:pb-14"
      >
        <div
          className="rounded-2xl border border-[var(--color-border)] p-5 sm:p-6 transition-all duration-300 hover:border-[var(--color-border-hover)]"
          style={{ background: era.bg }}
        >
          {/* Meta row */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              {entry.date}
            </span>
            <span
              className="pill text-xs py-0.5"
              style={{
                borderColor: `${era.dot}40`,
                background: `${era.dot}10`,
                color: era.dot,
              }}
            >
              {era.label}
            </span>
            <span
              className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]"
              style={{ color: era.dot }}
            >
              {BEAT_ICONS[entry.emotionalBeat]}
            </span>
          </div>

          {/* Headline */}
          <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mb-2 leading-snug">
            {entry.headline}
          </h3>

          {/* Body */}
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
            {entry.body}
          </p>

          {/* Product chip */}
          {entry.product && (
            <div className="mt-4 flex items-center gap-3">
              {entry.product.url ? (
                <a
                  href={entry.product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-primary-light)] hover:border-[var(--color-primary)] transition-colors duration-200"
                  style={{ background: "rgba(77,107,254,0.06)" }}
                >
                  <span className="font-medium">{entry.product.name}</span>
                  <span className="text-[var(--color-text-muted)]">—</span>
                  <span className="text-[var(--color-text-secondary)]">{entry.product.tagline}</span>
                  <ExternalLinkIcon />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-primary-light)]" style={{ background: "rgba(77,107,254,0.06)" }}>
                  <span className="font-medium">{entry.product.name}</span>
                  <span className="text-[var(--color-text-muted)]">—</span>
                  <span className="text-[var(--color-text-secondary)]">{entry.product.tagline}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

type TimelineProps = {
  entries: ContentBundle["timeline"];
};

export function Timeline({ entries }: TimelineProps) {
  return (
    <section id="timeline" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="eyebrow mb-3">完整历程</p>
          <h2 className="text-3xl sm:text-4xl font-bold headline-tight">
            时间线
          </h2>
        </div>

        {/* Era legend */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {(Object.entries(ERA_COLORS) as [Era, typeof ERA_COLORS[Era]][]).map(([era, cfg]) => (
            <span
              key={era}
              className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]"
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: cfg.dot }}
              />
              {cfg.label}
            </span>
          ))}
        </div>

        {/* Entries */}
        <div>
          {entries.map((entry, i) => (
            <TimelineEntry key={`${entry.date}-${i}`} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8L8 2M5 2h3v3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
