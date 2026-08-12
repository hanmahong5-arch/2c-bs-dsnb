// Bilingual content loader. Each locale's full bundle lives in its own
// JSON file; the build fails loudly if either is malformed.

import zhContent from "../content/timeline.zh.json";
import enContent from "../content/timeline.en.json";
import zhReading from "../content/reading-list.zh.json";
import enReading from "../content/reading-list.en.json";
import enConcepts from "../content/concepts.en.json";
import zhQuotes from "../content/quotes.zh.json";
import enQuotes from "../content/quotes.en.json";
import zhExplainIndex from "../content/explain-index.zh.json";
import enExplainIndex from "../content/explain-index.en.json";
import zhExplainTopics from "../content/explain-topics.zh.json";
import enExplainTopics from "../content/explain-topics.en.json";

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
  lede?: string;
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
  footerCopyrightSuffix: string;
  languageSwitch: string;
  ogSubtitle: string;
  readFull: string;
  readingTimeUnit: string;
  rssLabel: string;
  resellerHeadline: string;
  resellerSubhead: string;
  resellerCtaPartner: string;
  resellerCtaDownload: string;
  newsletterEyebrow: string;
  newsletterHeading: string;
  newsletterBody: string;
  newsletterPlaceholder: string;
  newsletterSubmit: string;
  newsletterSubmitting: string;
  newsletterSuccess: string;
  newsletterErrorInvalid: string;
  newsletterErrorGeneric: string;
  notFoundHeadline: string;
  notFoundSubtitle: string;
  notFoundPopularLabel: string;
  notFoundBackHome: string;
  downloadForWindows: string;
  downloadComingSoonMac: string;
  downloadGeneric: string;
  eraIntroLabel: string;
  eraEventsHeading: string;
  eraNavHeading: string;
  eraNavLabel: string;
  eraBackToHome: string;
  readingListLabel: string;
  readingListRelatedHeading: string;
  readingListCategoryHeading: string;
  conceptsLabel: string;
  conceptsBackToIndex: string;
  conceptsOneLineLabel: string;
  conceptsExplainerLabel: string;
  conceptsRelatedEventsLabel: string;
  conceptsRelatedSourcesLabel: string;
  conceptsContinueLabel: string;
  quotesLabel: string;
  quotesContextLabel: string;
  quotesSourceLabel: string;
  quotesRelatedEventLabel: string;
  explainLabel: string;
  explainBackToIndex: string;
  explainFromDsPerspectiveLabel: string;
  explainPickLevelLabel: string;
  explainAnalogyLabel: string;
  explainTechRefsLabel: string;
  explainRelatedEventsLabel: string;
  explainRelatedConceptsLabel: string;
  explainContinueLabel: string;
  explainDifficultyJumpLabel: string;
};

export type EraMeta = {
  eyebrow: string;
  headline: string;
  editorial: string;
};

export type ReadingListCategory =
  | "official"
  | "academic"
  | "commentary"
  | "longform"
  | "data";

export type ReadingListEntry = {
  title: string;
  url: string;
  author?: string;
  publication?: string;
  year?: string;
  category: ReadingListCategory;
  annotation?: string;
  relatedEventSlugs?: string[];
};

export type ReadingListBundle = {
  eyebrow: string;
  headline: string;
  intro: string;
  categories: Record<
    ReadingListCategory,
    { label: string; description: string }
  >;
  entries: ReadingListEntry[];
};

export type ConceptEntry = {
  slug: string;
  term: string;
  oneLineDef: string;
  fullExplainer: string;
  relatedEventSlugs: string[];
  relatedSources?: string[];
};

export type ConceptsBundle = {
  eyebrow: string;
  headline: string;
  intro: string;
  entries: ConceptEntry[];
};

export type QuoteEntry = {
  id: string;
  quote: string;
  speaker: string;
  speakerRole?: string;
  context: string;
  date?: string;
  relatedEventSlug?: string;
  source?: string;
  sourcePublication?: string;
};

export type QuotesBundle = {
  eyebrow: string;
  headline: string;
  intro: string;
  entries: QuoteEntry[];
};

export type ExplainLevel =
  | "kid"
  | "student"
  | "engineer"
  | "researcher";

export const EXPLAIN_LEVEL_ORDER: ExplainLevel[] = [
  "kid",
  "student",
  "engineer",
  "researcher",
];

// Single source of truth for explain-level → accent color. ExplainIndex and
// ExplainLevelTabs used to keep separate copies of this map; consolidated
// here so a palette change only needs one edit.
export const LEVEL_COLOR: Record<ExplainLevel, string> = {
  kid: "#FBBF24",
  student: "#22D3EE",
  engineer: "#6F8AFF",
  researcher: "#4D6BFE",
};

export type ExplainLevelContent = {
  oneLine: string;
  body: string;
  analogy?: string;
  technicalRefs?: string[];
};

export type ExplainTopic = {
  slug: string;
  title: string;
  oneLine: string;
  fromDeepSeekPerspective: string;
  levels: Record<ExplainLevel, ExplainLevelContent>;
  relatedEventSlugs?: string[];
  relatedConceptSlugs?: string[];
};

export type ExplainTopicSummary = {
  slug: string;
  title: string;
  oneLine: string;
  difficulty: ExplainLevel;
};

export type ExplainIndexBundle = {
  eyebrow: string;
  headline: string;
  intro: string;
  fromDeepSeekPerspective: string;
  levelLabels: Record<ExplainLevel, string>;
  levelDescriptions: Record<ExplainLevel, string>;
  difficultyLabel: string;
  startHere: ExplainTopicSummary[];
};

export type ExplainTopicsBundle = {
  topics: ExplainTopic[];
};

export type PartnerSection = {
  eyebrow: string;
  headline: string;
  body: string;
  benefits: Array<{ title: string; body: string }>;
  faq: Array<{ q: string; a: string }>;
  formHeading: string;
  formNameLabel: string;
  formCompanyLabel: string;
  formRegionLabel: string;
  formMessageLabel: string;
  formEmailLabel: string;
  formSubmit: string;
  formSubmitting: string;
  formSuccess: string;
  formErrorInvalid: string;
  formErrorGeneric: string;
  metaTitle: string;
  metaDescription: string;
};

export type ContentBundle = {
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    cta: { primary: string; secondary: string };
    resellerHint?: { label: string; href: string };
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
  partner: PartnerSection;
  eras: Record<Era, EraMeta>;
  ui: UiText;
};

const BUNDLES: Record<Locale, ContentBundle> = {
  zh: zhContent as ContentBundle,
  en: enContent as ContentBundle,
};

const READING_LIST_BUNDLES: Record<Locale, ReadingListBundle> = {
  zh: zhReading as ReadingListBundle,
  en: enReading as ReadingListBundle,
};

export function loadReadingList(
  locale: Locale = DEFAULT_LOCALE,
): ReadingListBundle {
  return READING_LIST_BUNDLES[locale];
}

export const READING_LIST_CATEGORY_ORDER: ReadingListCategory[] = [
  "official",
  "academic",
  "commentary",
  "longform",
  "data",
];

export function readingListUrl(locale: Locale): string {
  return locale === "en" ? "/en/reading-list" : "/reading-list";
}

// Concepts is EN-only for now (see plan: ZH backport gated on LLM citation signal).
const CONCEPTS_EN: ConceptsBundle = enConcepts as ConceptsBundle;

export function loadConcepts(): ConceptsBundle {
  return CONCEPTS_EN;
}

export function getAllConceptSlugs(): string[] {
  return CONCEPTS_EN.entries.map((c) => c.slug);
}

export function getConceptBySlug(slug: string): ConceptEntry | undefined {
  return CONCEPTS_EN.entries.find((c) => c.slug === slug);
}

export function conceptUrl(slug?: string): string {
  return slug ? `/en/concepts/${slug}` : "/en/concepts";
}

const QUOTES_BUNDLES: Record<Locale, QuotesBundle> = {
  zh: zhQuotes as QuotesBundle,
  en: enQuotes as QuotesBundle,
};

export function loadQuotes(locale: Locale = DEFAULT_LOCALE): QuotesBundle {
  return QUOTES_BUNDLES[locale];
}

export function quotesUrl(locale: Locale): string {
  return locale === "en" ? "/en/quotes" : "/quotes";
}

const EXPLAIN_INDEX_BUNDLES: Record<Locale, ExplainIndexBundle> = {
  zh: zhExplainIndex as ExplainIndexBundle,
  en: enExplainIndex as ExplainIndexBundle,
};

const EXPLAIN_TOPIC_BUNDLES: Record<Locale, ExplainTopicsBundle> = {
  zh: zhExplainTopics as ExplainTopicsBundle,
  en: enExplainTopics as ExplainTopicsBundle,
};

export function loadExplainIndex(
  locale: Locale = DEFAULT_LOCALE,
): ExplainIndexBundle {
  return EXPLAIN_INDEX_BUNDLES[locale];
}

export function loadExplainTopics(
  locale: Locale = DEFAULT_LOCALE,
): ExplainTopic[] {
  return EXPLAIN_TOPIC_BUNDLES[locale].topics;
}

export function getAllExplainSlugs(
  locale: Locale = DEFAULT_LOCALE,
): string[] {
  return EXPLAIN_TOPIC_BUNDLES[locale].topics.map((t) => t.slug);
}

export function getExplainTopicBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): ExplainTopic | undefined {
  return EXPLAIN_TOPIC_BUNDLES[locale].topics.find((t) => t.slug === slug);
}

export function explainUrl(slug: string | undefined, locale: Locale): string {
  const prefix = locale === "en" ? "/en/explain" : "/explain";
  return slug ? `${prefix}/${slug}` : prefix;
}

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

export const ERA_ORDER: Era[] = [
  "origin",
  "breakthrough",
  "world",
  "present",
];

// Single source of truth for era → accent color. Timeline, EraSection and
// EventPageContent all render era chips/dots and used to keep separate
// copies of this map; consolidated here so a palette change only needs
// one edit.
export const ERA_COLOR: Record<Era, string> = {
  origin: "#6F8AFF",
  breakthrough: "#22D3EE",
  world: "#FBBF24",
  present: "#4D6BFE",
};

export const ERA_BG: Record<Era, string> = {
  origin: "rgba(77,107,254,0.08)",
  breakthrough: "rgba(34,211,238,0.06)",
  world: "rgba(251,191,36,0.06)",
  present: "rgba(77,107,254,0.1)",
};

export function getEraMeta(
  era: Era,
  locale: Locale = DEFAULT_LOCALE,
): EraMeta | undefined {
  return BUNDLES[locale].eras?.[era];
}

export function getEraEvents(
  era: Era,
  locale: Locale = DEFAULT_LOCALE,
): TimelineEntry[] {
  return BUNDLES[locale].timeline.filter((e) => e.era === era);
}

export function eraUrl(era: Era, locale: Locale): string {
  return locale === "en" ? `/en/era/${era}` : `/era/${era}`;
}

export function getAdjacentEras(era: Era): { prev?: Era; next?: Era } {
  const idx = ERA_ORDER.indexOf(era);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? ERA_ORDER[idx - 1] : undefined,
    next: idx < ERA_ORDER.length - 1 ? ERA_ORDER[idx + 1] : undefined,
  };
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

// Estimate reading time in minutes. Chinese: ~300 chars/min; English: ~225 wpm.
export function readingTimeMinutes(body: string, locale: Locale): number {
  if (locale === "en") {
    const words = body.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 225));
  }
  return Math.max(1, Math.ceil(body.length / 300));
}

// Derive a publication-style Date from an event slug. Slugs always start
// with a 4-digit year, optionally followed by zero-padded MM and DD.
export function slugDate(slug: string): Date {
  const parts = slug.split("-");
  const year = Number.parseInt(parts[0] ?? "1970", 10);
  const month = /^\d{2}$/.test(parts[1] ?? "")
    ? Number.parseInt(parts[1]!, 10) - 1
    : 0;
  const day = /^\d{2}$/.test(parts[2] ?? "")
    ? Number.parseInt(parts[2]!, 10)
    : 1;
  return new Date(Date.UTC(year, month, day));
}
