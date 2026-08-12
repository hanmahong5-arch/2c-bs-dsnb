"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  eventUrl,
  getEventBySlug,
  homeUrl,
  type Locale,
  type UiText,
} from "@/lib/content";
import { track } from "@/lib/track";

// Hand-picked highest-traction events. Slugs are stable across locales.
const POPULAR_SLUGS = [
  "2025-01-27-app-store-nvidia",
  "2025-01-20-r1",
  "2024-12-26-v3",
  "2026-04-24-v4-preview",
];

type NotFoundContentProps = {
  locale: Locale;
  ui: UiText;
};

export function NotFoundContent({ locale, ui }: NotFoundContentProps) {
  useEffect(() => {
    const attempted =
      typeof window !== "undefined" ? window.location.pathname : "";
    track("not_found_viewed", { locale, attempted });
  }, [locale]);

  const popular = POPULAR_SLUGS.map((slug) => {
    const entry = getEventBySlug(slug, locale);
    return entry ? { slug, headline: entry.headline, date: entry.date } : null;
  }).filter((x): x is { slug: string; headline: string; date: string } => x !== null);

  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <p className="eyebrow mb-3">dsnb.help</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          {ui.notFoundHeadline}
        </h1>
        <p className="text-base text-[var(--color-text-secondary)] mb-10">
          {ui.notFoundSubtitle}
        </p>

        {popular.length > 0 ? (
          <div className="mb-10 text-left">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-4 text-center">
              {ui.notFoundPopularLabel}
            </p>
            <ul className="flex flex-col gap-2">
              {popular.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={eventUrl(item.slug, locale)}
                    className="block px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    <span className="block text-sm text-[var(--color-text-primary)] font-medium">
                      {item.headline}
                    </span>
                    <span className="block text-xs text-[var(--color-text-muted)] mt-0.5">
                      {item.date}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Link
          href={homeUrl(locale)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-deep)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          {ui.notFoundBackHome}
        </Link>
      </div>
    </section>
  );
}
