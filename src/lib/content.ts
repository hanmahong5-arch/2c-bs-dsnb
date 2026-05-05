// Bilingual content loader. Each locale's full bundle lives in its own
// JSON file; the build fails loudly if either is malformed.

import zhContent from "../content/timeline.zh.json";
import enContent from "../content/timeline.en.json";

export type Locale = "zh" | "en";

export type Era = "origin" | "breakthrough" | "world" | "present";
export type EmotionalBeat =
  | "spark"
  | "struggle"
  | "triumph"
  | "humility"
  | "turning";

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

export type UiText = {
  eraLabels: Record<Era, string>;
  timelineEyebrow: string;
  timelineHeading: string;
  productsEyebrow: string;
  productsHeading: string;
  sources: string;
  copied: string;
  share: string;
  prev: string;
  next: string;
  viewProject: string;
  impactLabel: string;
  relatedProduct: string;
  backToTimeline: string;
  viewFullStory: string;
  switchNotStarted: string;
  downloadSwitchInline: string;
  writtenWithDeepseek: string;
  footerTagline: string;
  footerBy: string;
  footerEmail: string;
  footerIcpNote: string;
  languageSwitch: string;
  ogSubtitle: string;
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
  ui: UiText;
};

const BUNDLES: Record<Locale, ContentBundle> = {
  zh: zhContent as ContentBundle,
  en: enContent as ContentBundle,
};

export const DEFAULT_LOCALE: Locale = "zh";

export async function loadContent(
  locale: Locale = DEFAULT_LOCALE,
): Promise<ContentBundle> {
  return BUNDLES[locale];
}

export function loadContentSync(
  locale: Locale = DEFAULT_LOCALE,
): ContentBundle {
  return BUNDLES[locale];
}

export function getEventBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): TimelineEntry | undefined {
  return BUNDLES[locale].timeline.find((e) => e.slug === slug);
}

// Slugs are stable across locales — the same URL-safe identifier maps to
// the same event regardless of language.
export function getAllEventSlugs(
  locale: Locale = DEFAULT_LOCALE,
): string[] {
  return BUNDLES[locale].timeline.map((e) => e.slug);
}

export function getAdjacentEvents(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): { prev?: TimelineEntry; next?: TimelineEntry } {
  const entries = BUNDLES[locale].timeline;
  const idx = entries.findIndex((e) => e.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? entries[idx - 1] : undefined,
    next:
      idx < entries.length - 1 ? entries[idx + 1] : undefined,
  };
}

// Build the localized URL for an event page.
export function eventUrl(slug: string, locale: Locale): string {
  return locale === "en" ? `/en/e/${slug}` : `/e/${slug}`;
}

export function homeUrl(locale: Locale): string {
  return locale === "en" ? "/en" : "/";
}
