import Link from "next/link";
import type {
  ExplainIndexBundle,
  ExplainTopic,
  Locale,
  UiText,
} from "@/lib/content";
import {
  conceptUrl,
  eventUrl,
  explainUrl,
  getConceptBySlug,
  getEventBySlug,
} from "@/lib/content";
import { ExplainLevelTabs } from "@/components/ExplainLevelTabs";

type Props = {
  topic: ExplainTopic;
  others: ExplainTopic[];
  indexBundle: ExplainIndexBundle;
  locale: Locale;
  ui: UiText;
};

export function ExplainTopicSection({
  topic,
  others,
  indexBundle,
  locale,
  ui,
}: Props) {
  return (
    <>
      <header className="border-b border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
          <Link
            href={explainUrl(undefined, locale)}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors"
          >
            {ui.explainBackToIndex}
          </Link>
          <span className="text-[var(--color-text-muted)] font-mono text-xs">
            dsnb.help
          </span>
        </div>
      </header>

      <article className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow mb-4">{ui.explainLabel}</p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold headline-tight mb-6 text-gradient-blue">
            {topic.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-primary)] leading-relaxed mb-10 pl-4 border-l-2 border-[var(--color-primary)]">
            {topic.oneLine}
          </p>

          <section
            className="rounded-2xl border border-[var(--color-border)] p-5 sm:p-6 mb-12"
            style={{ background: "rgba(77,107,254,0.06)" }}
          >
            <p className="eyebrow mb-2">
              {ui.explainFromDsPerspectiveLabel}
            </p>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
              {topic.fromDeepSeekPerspective}
            </p>
          </section>

          <ExplainLevelTabs
            topic={topic}
            levelLabels={indexBundle.levelLabels}
            levelDescriptions={indexBundle.levelDescriptions}
            ui={ui}
            locale={locale}
          />

          {topic.relatedConceptSlugs &&
            topic.relatedConceptSlugs.length > 0 &&
            locale === "en" && (
              <section className="mt-12 pt-6 border-t border-[var(--color-border)]">
                <p className="eyebrow mb-3">
                  {ui.explainRelatedConceptsLabel}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {topic.relatedConceptSlugs.map((slug) => {
                    const concept = getConceptBySlug(slug);
                    if (!concept) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={conceptUrl(slug)}
                          className="inline-block text-sm px-3 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] hover:border-[var(--color-primary)] transition-colors"
                        >
                          {concept.term}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

          {topic.relatedEventSlugs && topic.relatedEventSlugs.length > 0 && (
            <section className="mt-12 pt-6 border-t border-[var(--color-border)]">
              <p className="eyebrow mb-3">
                {ui.explainRelatedEventsLabel}
              </p>
              <ul className="flex flex-wrap gap-2">
                {topic.relatedEventSlugs.map((slug) => {
                  const event = getEventBySlug(slug, locale);
                  if (!event) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={eventUrl(slug, locale)}
                        className="inline-block text-sm px-3 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] hover:border-[var(--color-primary)] transition-colors"
                      >
                        {event.headline}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {others.length > 0 && (
            <nav className="mt-16 pt-6 border-t border-[var(--color-border)]">
              <p className="eyebrow mb-4">{ui.explainContinueLabel}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={explainUrl(o.slug, locale)}
                    className="card p-4 group"
                  >
                    <p className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors mb-1">
                      {o.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] leading-snug line-clamp-2">
                      {o.oneLine}
                    </p>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </article>
    </>
  );
}
