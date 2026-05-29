import Link from "next/link";
import type {
  Era,
  EraMeta,
  Locale,
  TimelineEntry,
  UiText,
} from "@/lib/content";
import { eventUrl, eraUrl, homeUrl, ERA_ORDER } from "@/lib/content";

const ERA_COLOR: Record<Era, string> = {
  origin: "#6F8AFF",
  breakthrough: "#22D3EE",
  world: "#FBBF24",
  present: "#4D6BFE",
};

type Props = {
  era: Era;
  meta: EraMeta;
  events: TimelineEntry[];
  locale: Locale;
  ui: UiText;
};

export function EraSection({ era, meta, events, locale, ui }: Props) {
  const color = ERA_COLOR[era];
  const otherEras = ERA_ORDER.filter((e) => e !== era);

  return (
    <>
      <header className="border-b border-[var(--color-border)]">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
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
        <div className="max-w-2xl mx-auto">
          <p
            className="eyebrow mb-4"
            style={{ color }}
          >
            {meta.eyebrow}
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold headline-tight mb-8 text-gradient-blue">
            {meta.headline}
          </h1>

          <p
            className="text-base sm:text-lg text-[var(--color-text-primary)] leading-relaxed mb-12 pl-4 border-l-2"
            style={{ borderColor: color }}
          >
            {meta.editorial}
          </p>

          <section className="mt-12 pt-6 border-t border-[var(--color-border)]">
            <p className="eyebrow mb-5">{ui.eraEventsHeading}</p>
            <ul className="space-y-4">
              {events.map((event) => (
                <li key={event.slug}>
                  <Link
                    href={eventUrl(event.slug, locale)}
                    className="card p-4 group block"
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-1 flex-wrap">
                      <span className="text-xs font-mono text-[var(--color-text-muted)]">
                        {event.date}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-primary-light)] transition-colors">
                        {ui.readFull}
                      </span>
                    </div>
                    <p className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors leading-snug mb-2">
                      {event.headline}
                    </p>
                    {event.lede && (
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
                        {event.lede}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <nav className="mt-16 pt-6 border-t border-[var(--color-border)]">
            <p className="eyebrow mb-4">{ui.eraNavHeading}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {otherEras.map((e) => {
                const m = ERA_COLOR[e];
                return (
                  <Link
                    key={e}
                    href={eraUrl(e, locale)}
                    className="card p-4 group"
                  >
                    <p
                      className="text-xs font-mono mb-1"
                      style={{ color: m }}
                    >
                      {ui.eraLabels[e]}
                    </p>
                    <p className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors leading-snug">
                      {ui.eraNavLabel} →
                    </p>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </article>
    </>
  );
}
