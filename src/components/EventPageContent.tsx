import Link from "next/link";
import type {
  TimelineEntry,
  UiText,
  Locale,
} from "@/lib/content";
import {
  eventUrl,
  homeUrl,
  readingTimeMinutes,
  ERA_COLOR,
} from "@/lib/content";
import { Footer } from "@/components/Footer";
import { ReadingProgress } from "@/components/ReadingProgress";

type Props = {
  event: TimelineEntry;
  prev?: TimelineEntry;
  next?: TimelineEntry;
  locale: Locale;
  ui: UiText;
};

export function EventPageContent({ event, prev, next, locale, ui }: Props) {
  const eraColor = ERA_COLOR[event.era];
  const minutes = readingTimeMinutes(event.body, locale);

  return (
    <>
      <ReadingProgress />
      <header className="border-b border-[var(--color-border)]">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
          <Link
            href={homeUrl(locale)}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors"
          >
            {ui.backToTimeline}
          </Link>
          <span className="text-[var(--color-text-muted)] font-mono text-xs">
            dsnb.help
          </span>
        </div>
      </header>

      <article className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-sm font-mono text-[var(--color-text-muted)]">
              {event.date}
            </span>
            <span
              className="text-xs px-3 py-1 rounded-full border"
              style={{
                borderColor: `${eraColor}50`,
                background: `${eraColor}15`,
                color: eraColor,
              }}
            >
              {ui.eraLabels[event.era]}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {minutes} {ui.readingTimeUnit}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold headline-tight mb-8 text-gradient-blue">
            {event.headline}
          </h1>

          {event.lede && (
            <p
              className="text-base sm:text-lg text-[var(--color-text-primary)] leading-relaxed mb-6 pl-4 border-l-2"
              style={{ borderColor: eraColor }}
            >
              {event.lede}
            </p>
          )}

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
            {event.body}
          </p>

          {event.product && (
            <div
              className="mt-10 p-5 rounded-2xl border border-[var(--color-border)]"
              style={{ background: "var(--color-primary-tint-06)" }}
            >
              <p className="eyebrow mb-2">{ui.relatedProduct}</p>
              {event.product.url ? (
                <a
                  href={event.product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <p className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors mb-1">
                    {event.product.name}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {event.product.tagline}{" "}
                    <span className="text-[var(--color-primary-light)]">→</span>
                  </p>
                </a>
              ) : (
                <>
                  <p className="font-semibold text-[var(--color-text-primary)] mb-1">
                    {event.product.name}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {event.product.tagline}
                  </p>
                </>
              )}
            </div>
          )}

          {event.sources.length > 0 && (
            <section className="mt-12 pt-6 border-t border-[var(--color-border)]">
              <p className="eyebrow mb-3">{ui.sources}</p>
              <ul className="space-y-2 text-sm">
                {event.sources.map((src, i) => (
                  <li key={`${src}-${i}`} className="leading-snug">
                    <a
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] underline underline-offset-2 decoration-[var(--color-border)] hover:decoration-[var(--color-primary)] transition-colors break-all"
                    >
                      {src}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prev ? (
              <Link
                href={eventUrl(prev.slug, locale)}
                className="card p-4 group"
                aria-label={`${ui.prev}: ${prev.headline}`}
              >
                <p className="text-xs text-[var(--color-text-muted)] mb-1">
                  ← {ui.prev}
                </p>
                <p className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors leading-snug">
                  {prev.headline}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={eventUrl(next.slug, locale)}
                className="card p-4 group sm:text-right"
                aria-label={`${ui.next}: ${next.headline}`}
              >
                <p className="text-xs text-[var(--color-text-muted)] mb-1">
                  {ui.next} →
                </p>
                <p className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors leading-snug">
                  {next.headline}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </nav>

          <div className="mt-12 text-center">
            <Link
              href={`${homeUrl(locale)}#timeline`}
              className="inline-flex items-center gap-2 text-sm text-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors underline underline-offset-4"
            >
              {ui.viewFullStory}
            </Link>
          </div>
        </div>
      </article>

      <Footer locale={locale} ui={ui} />
    </>
  );
}
