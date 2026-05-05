// Content loader. Imports the canonical bundle from src/content/timeline.json,
// produced by the L1 agent and reviewed by hand. No runtime fallback — if the
// JSON is missing or malformed, the build should fail loudly.

import contentJson from "../content/timeline.json";

export type Era = "origin" | "breakthrough" | "world" | "present";
export type EmotionalBeat = "spark" | "struggle" | "triumph" | "humility" | "turning";

export type TimelineEntry = {
  date: string;
  slug: string;
  era: Era;
  headline: string;
  body: string;
  product?: { name: string; tagline: string; url?: string };
  emotionalBeat: EmotionalBeat;
  sources: string[];
};

export type ContentBundle = {
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    cta: { primary: string; secondary: string };
  };
  intro: { headline: string; body: string };
  timeline: TimelineEntry[];
  products: Array<{
    name: string;
    year: string;
    bullet: string;
    impact: string;
    url?: string;
  }>;
  closing: {
    headline: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  meta: { title: string; description: string; keywords: string[] };
};

const CONTENT_BUNDLE = contentJson as ContentBundle;

export async function loadContent(): Promise<ContentBundle> {
  return CONTENT_BUNDLE;
}

export function loadContentSync(): ContentBundle {
  return CONTENT_BUNDLE;
}

export function getEventBySlug(slug: string): TimelineEntry | undefined {
  return CONTENT_BUNDLE.timeline.find((e) => e.slug === slug);
}

export function getAllEventSlugs(): string[] {
  return CONTENT_BUNDLE.timeline.map((e) => e.slug);
}

export function getAdjacentEvents(slug: string): {
  prev?: TimelineEntry;
  next?: TimelineEntry;
} {
  const idx = CONTENT_BUNDLE.timeline.findIndex((e) => e.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? CONTENT_BUNDLE.timeline[idx - 1] : undefined,
    next:
      idx < CONTENT_BUNDLE.timeline.length - 1
        ? CONTENT_BUNDLE.timeline[idx + 1]
        : undefined,
  };
}
