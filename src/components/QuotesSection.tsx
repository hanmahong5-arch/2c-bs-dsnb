import Link from "next/link";
import type { Locale, QuotesBundle, UiText } from "@/lib/content";
import { eventUrl, getEventBySlug, homeUrl } from "@/lib/content";

type Props = {
  bundle: QuotesBundle;
  locale: Locale;
  ui: UiText;
};

export function QuotesSection({ bundle, locale, ui }: Props) {
  return (
    <>
      <header className="border-b border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
          <Link
            href={homeUrl(locale)}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors"
          >
            {ui.eraBackToHome}
          </Link>
          <span className="text-[var(--color-text-muted)] font-mono text-xs">
            dsnb.help
          </span>
        </div>
      </header>

      <article className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow mb-4">{bundle.eyebrow}</p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold headline-tight mb-8 text-gradient-blue">
            {bundle.headline}
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-primary)] leading-relaxed mb-12 pl-4 border-l-2 border-[var(--color-primary)]">
            {bundle.intro}
          </p>

          <ul className="space-y-10">
            {bundle.entries.map((entry) => {
              const event = entry.relatedEventSlug
                ? getEventBySlug(entry.relatedEventSlug, locale)
                : undefined;
              return (
                <li
                  key={entry.id}
                  id={entry.id}
                  className="card p-6 sm:p-8 scroll-mt-24"
                >
                  <blockquote className="text-xl sm:text-2xl font-semibold text-[var(--color-text-primary)] leading-snug mb-5 headline-tight">
                    &ldquo;{entry.quote}&rdquo;
                  </blockquote>

                  <div className="text-sm text-[var(--color-text-secondary)] mb-6">
                    <p className="font-medium text-[var(--color-text-primary)]">
                      {entry.speaker}
                      {entry.speakerRole && (
                        <span className="font-normal text-[var(--color-text-muted)]">
                          {" · "}
                          {entry.speakerRole}
                        </span>
                      )}
                    </p>
                    {entry.date && (
                      <p className="font-mono text-xs text-[var(--color-text-muted)] mt-1">
                        {entry.date}
                      </p>
                    )}
                  </div>

                  <div className="mb-5 pt-4 border-t border-[var(--color-border)]">
                    <p className="eyebrow mb-2">{ui.quotesContextLabel}</p>
                    <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                      {entry.context}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                    {event && (
                      <Link
                        href={eventUrl(event.slug, locale)}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] hover:border-[var(--color-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                      >
                        <span className="text-[var(--color-text-muted)]">
                          {ui.quotesRelatedEventLabel}:
                        </span>
                        <span>{event.headline}</span>
                      </Link>
                    )}
                    {entry.source && (
                      <a
                        href={entry.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] hover:border-[var(--color-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                      >
                        <span className="text-[var(--color-text-muted)]">
                          {ui.quotesSourceLabel}:
                        </span>
                        <span>{entry.sourcePublication ?? entry.source}</span>
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </>
  );
}
