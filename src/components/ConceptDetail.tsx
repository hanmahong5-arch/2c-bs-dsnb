import Link from "next/link";
import type { ConceptEntry, UiText } from "@/lib/content";
import { conceptUrl, eventUrl, getEventBySlug } from "@/lib/content";

type Props = {
  concept: ConceptEntry;
  others: ConceptEntry[];
  ui: UiText;
};

export function ConceptDetail({ concept, others, ui }: Props) {
  return (
    <>
      <header className="border-b border-[var(--color-border)]">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
          <Link
            href={conceptUrl()}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors"
          >
            {ui.conceptsBackToIndex}
          </Link>
          <span className="text-[var(--color-text-muted)] font-mono text-xs">
            dsnb.help
          </span>
        </div>
      </header>

      <article className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow mb-4">{ui.conceptsLabel}</p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold headline-tight mb-8 text-gradient-blue">
            {concept.term}
          </h1>

          <section className="mb-10">
            <p className="eyebrow mb-3">{ui.conceptsOneLineLabel}</p>
            <p className="text-base sm:text-lg text-[var(--color-text-primary)] leading-relaxed pl-4 border-l-2 border-[var(--color-primary)]">
              {concept.oneLineDef}
            </p>
          </section>

          <section className="mb-10">
            <p className="eyebrow mb-3">{ui.conceptsExplainerLabel}</p>
            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
              {concept.fullExplainer}
            </p>
          </section>

          {concept.relatedEventSlugs.length > 0 && (
            <section className="mt-12 pt-6 border-t border-[var(--color-border)]">
              <p className="eyebrow mb-3">
                {ui.conceptsRelatedEventsLabel}
              </p>
              <ul className="flex flex-wrap gap-2">
                {concept.relatedEventSlugs.map((slug) => {
                  const event = getEventBySlug(slug, "en");
                  if (!event) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={eventUrl(slug, "en")}
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

          {concept.relatedSources && concept.relatedSources.length > 0 && (
            <section className="mt-12 pt-6 border-t border-[var(--color-border)]">
              <p className="eyebrow mb-3">
                {ui.conceptsRelatedSourcesLabel}
              </p>
              <ul className="space-y-2 text-sm">
                {concept.relatedSources.map((src) => (
                  <li key={src} className="leading-snug">
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

          {others.length > 0 && (
            <nav className="mt-16 pt-6 border-t border-[var(--color-border)]">
              <p className="eyebrow mb-4">{ui.conceptsContinueLabel}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={conceptUrl(o.slug)}
                    className="card p-4 group"
                  >
                    <p className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors mb-1">
                      {o.term}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] leading-snug line-clamp-2">
                      {o.oneLineDef}
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
