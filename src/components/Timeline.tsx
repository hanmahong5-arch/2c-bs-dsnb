"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import type {
  ContentBundle,
  Era,
  EmotionalBeat,
  Locale,
  UiText,
} from "@/lib/content";
import { eventUrl } from "@/lib/content";
import { track } from "@/lib/track";

const SITE_URL = "https://dsnb.help";

const ERA_DOT: Record<Era, string> = {
  origin: "#6F8AFF",
  breakthrough: "#22D3EE",
  world: "#FBBF24",
  present: "#4D6BFE",
};

const ERA_BG: Record<Era, string> = {
  origin: "rgba(77,107,254,0.08)",
  breakthrough: "rgba(34,211,238,0.06)",
  world: "rgba(251,191,36,0.06)",
  present: "rgba(77,107,254,0.1)",
};

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

function safeHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

type ShareButtonProps = {
  slug: string;
  headline: string;
  locale: Locale;
  ui: UiText;
};

function ShareButton({ slug, headline, locale, ui }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${SITE_URL}${eventUrl(slug, locale)}`;
    track("share_event", { slug, locale });

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: headline, url });
        return;
      } catch {
        // user cancelled or share unavailable; fall through to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // give up silently — analytics already fired
    }
  };

  return (
    <button
      onClick={handle}
      className="ml-auto flex items-center gap-1 text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors px-1.5 py-1 rounded-md"
      aria-label={`${ui.share}: ${headline}`}
      title={copied ? ui.copied : ui.share}
    >
      {copied ? (
        <span className="text-[var(--color-primary-light)]">{ui.copied}</span>
      ) : (
        <>
          <ShareIcon />
          <span className="sr-only sm:not-sr-only">{ui.share}</span>
        </>
      )}
    </button>
  );
}

function ShareIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 4l-3-3-3 3M6 1v7M2 8v2a1 1 0 001 1h6a1 1 0 001-1V8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type TimelineEntryProps = {
  entry: ContentBundle["timeline"][number];
  index: number;
  locale: Locale;
  ui: UiText;
};

function TimelineEntry({ entry, index, locale, ui }: TimelineEntryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const dot = ERA_DOT[entry.era];

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
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-3 h-3 rounded-full mt-1.5"
          style={{
            background: dot,
            boxShadow: `0 0 12px ${dot}60, 0 0 0 2px var(--background), 0 0 0 3px ${dot}80`,
          }}
        />
        <div
          className="w-px flex-1 mt-3 min-h-8"
          style={{
            background: `linear-gradient(to bottom, ${dot}30, transparent)`,
          }}
        />
      </div>

      <div className="flex-1 pb-10 sm:pb-14">
        <div
          className="rounded-2xl border border-[var(--color-border)] p-5 sm:p-6 transition-all duration-300 hover:border-[var(--color-border-hover)]"
          style={{ background: ERA_BG[entry.era] }}
        >
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              {entry.date}
            </span>
            <span
              className="pill text-xs py-0.5"
              style={{
                borderColor: `${dot}40`,
                background: `${dot}10`,
                color: dot,
              }}
            >
              {ui.eraLabels[entry.era]}
            </span>
            <span
              className="flex items-center gap-1 text-xs"
              style={{ color: dot }}
            >
              {BEAT_ICONS[entry.emotionalBeat]}
            </span>
            <ShareButton
              slug={entry.slug}
              headline={entry.headline}
              locale={locale}
              ui={ui}
            />
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mb-2 leading-snug">
            {entry.headline}
          </h3>

          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
            {entry.body}
          </p>

          {entry.product && (
            <div className="mt-4 flex items-center gap-3">
              {entry.product.url ? (
                <a
                  href={entry.product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("outbound_product", {
                      name: entry.product!.name,
                      from: "timeline",
                    })
                  }
                  className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-primary-light)] hover:border-[var(--color-primary)] transition-colors duration-200"
                  style={{ background: "rgba(77,107,254,0.06)" }}
                >
                  <span className="font-medium">{entry.product.name}</span>
                  <span className="text-[var(--color-text-muted)]">—</span>
                  <span className="text-[var(--color-text-secondary)]">
                    {entry.product.tagline}
                  </span>
                  <ExternalLinkIcon />
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-primary-light)]"
                  style={{ background: "rgba(77,107,254,0.06)" }}
                >
                  <span className="font-medium">{entry.product.name}</span>
                  <span className="text-[var(--color-text-muted)]">—</span>
                  <span className="text-[var(--color-text-secondary)]">
                    {entry.product.tagline}
                  </span>
                </span>
              )}
            </div>
          )}

          {entry.sources.length > 0 && (
            <details className="mt-4 group">
              <summary className="text-xs text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-primary-light)] transition-colors list-none flex items-center gap-1.5 select-none">
                <svg
                  className="w-3 h-3 transition-transform duration-200 group-open:rotate-90"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 3l4 3-4 3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {ui.sources} · {entry.sources.length}
              </summary>
              <ul className="mt-2 ml-4 space-y-1.5 text-xs">
                {entry.sources.map((src, i) => (
                  <li key={`${src}-${i}`} className="leading-snug">
                    <a
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        track("outbound_source", { host: safeHostname(src) })
                      }
                      className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] underline underline-offset-2 decoration-[var(--color-border)] hover:decoration-[var(--color-primary)] transition-colors break-all"
                    >
                      {safeHostname(src)}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </div>
    </motion.div>
  );
}

type TimelineProps = {
  entries: ContentBundle["timeline"];
  locale: Locale;
  ui: UiText;
};

export function Timeline({ entries, locale, ui }: TimelineProps) {
  const eraOrder: Era[] = ["origin", "breakthrough", "world", "present"];

  return (
    <section id="timeline" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-3">{ui.timelineEyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold headline-tight">
            {ui.timelineHeading}
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {eraOrder.map((era) => (
            <span
              key={era}
              className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]"
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: ERA_DOT[era] }}
              />
              {ui.eraLabels[era]}
            </span>
          ))}
        </div>

        <div>
          {entries.map((entry, i) => (
            <TimelineEntry
              key={`${entry.slug}-${i}`}
              entry={entry}
              index={i}
              locale={locale}
              ui={ui}
            />
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
