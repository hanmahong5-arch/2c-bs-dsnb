import Link from "next/link";
import type {
  Locale,
  ReadingListBundle,
  ReadingListCategory,
  ReadingListEntry,
  UiText,
} from "@/lib/content";
import {
  READING_LIST_CATEGORY_ORDER,
  eventUrl,
  getEventBySlug,
  homeUrl,
} from "@/lib/content";

const CATEGORY_COLOR: Record<ReadingListCategory, string> = {
  official: "#22D3EE",
  academic: "#6F8AFF",
  commentary: "#FBBF24",
  longform: "#4D6BFE",
  data: "#94A3CC",
};

type Props = {
  bundle: ReadingListBundle;
  locale: Locale;
  ui: UiText;
};

export function ReadingListSection({ bundle, locale, ui }: Props) {
  const grouped: Record<ReadingListCategory, ReadingListEntry[]> = {
    official: [],
    academic: [],
    commentary: [],
    longform: [],
    data: [],
  };
  for (const entry of bundle.entries) {
    grouped[entry.category].push(entry);
  }

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

          {READING_LIST_CATEGORY_ORDER.map((cat) => {
            const entries = grouped[cat];
            if (entries.length === 0) return null;
            const meta = bundle.categories[cat];
            const color = CATEGORY_COLOR[cat];
            return (
              <section
                key={cat}
                className="mt-12 pt-6 border-t border-[var(--color-border)]"
              >
                <div className="mb-6">
                  <p
                    className="eyebrow mb-2"
                    style={{ color }}
                  >
                    {meta.label}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {meta.description}
                  </p>
                </div>

                <ul className="space-y-5">
                  {entries.map((entry) => (
                    <li key={entry.url} className="card p-5">
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <p className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors leading-snug mb-1">
                          {entry.title}
                        </p>
                        <p className="text-xs font-mono text-[var(--color-text-muted)] mb-3 break-all">
                          {[
                            entry.author,
                            entry.publication,
                            entry.year,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </a>

                      {entry.annotation && (
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">
                          {entry.annotation}
                        </p>
                      )}

                      {entry.relatedEventSlugs &&
                        entry.relatedEventSlugs.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                            <p className="text-xs text-[var(--color-text-muted)] mb-2">
                              {ui.readingListRelatedHeading}
                            </p>
                            <ul className="flex flex-wrap gap-2">
                              {entry.relatedEventSlugs.map((slug) => {
                                const event = getEventBySlug(slug, locale);
                                if (!event) return null;
                                return (
                                  <li key={slug}>
                                    <Link
                                      href={eventUrl(slug, locale)}
                                      className="inline-block text-xs px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] hover:border-[var(--color-primary)] transition-colors"
                                    >
                                      {event.headline}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </article>
    </>
  );
}
