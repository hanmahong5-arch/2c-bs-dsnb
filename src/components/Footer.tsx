import Link from "next/link";
import type { Locale, UiText } from "@/lib/content";

type FooterProps = {
  locale: Locale;
  ui: UiText;
};

export function Footer({ locale, ui }: FooterProps) {
  const otherLocale: Locale = locale === "zh" ? "en" : "zh";
  const otherHref = otherLocale === "en" ? "/en" : "/zh";
  const rssHref = locale === "en" ? "/en/rss.xml" : "/rss.xml";
  const eraHref = locale === "en" ? "/en/era/origin" : "/era/origin";
  const readingListHref = locale === "en" ? "/en/reading-list" : "/reading-list";
  const conceptsHref = "/en/concepts";

  return (
    <footer className="border-t border-[var(--color-border)] py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-[var(--color-text-muted)]">
        <div className="text-center sm:text-left">
          <p className="font-medium text-[var(--color-text-secondary)] mb-1">
            dsnb.help
          </p>
          <p>
            {ui.footerTagline} ·{" "}
            <a
              href="https://github.com/hanmahong5-arch/lurus-switch"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-primary-light)] transition-colors duration-150"
            >
              Switch Desktop
            </a>
            {ui.footerBy ? ` ${ui.footerBy}` : ""}
          </p>
        </div>

        <div className="flex flex-col items-center sm:items-end gap-2 text-xs text-[var(--color-text-muted)]">
          <div className="flex gap-4 flex-wrap justify-center sm:justify-end">
            <Link href={eraHref} className="hover:text-[var(--color-primary-light)] transition-colors duration-150">{ui.eraNavLabel}</Link>
            <Link href={readingListHref} className="hover:text-[var(--color-primary-light)] transition-colors duration-150">{ui.readingListLabel}</Link>
            {locale === "en" && (
              <Link href={conceptsHref} className="hover:text-[var(--color-primary-light)] transition-colors duration-150">{ui.conceptsLabel}</Link>
            )}
            <a href="/terms" className="hover:text-[var(--color-primary-light)] transition-colors duration-150">Terms of Service</a>
            <a href="/privacy" className="hover:text-[var(--color-primary-light)] transition-colors duration-150">Privacy Policy</a>
            <a href="/security" className="hover:text-[var(--color-primary-light)] transition-colors duration-150">Security &amp; DPA</a>
          </div>
          <p>We use cookies per our Privacy Policy.</p>
          <p>© {new Date().getFullYear()} LurusTech. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href={otherHref}
            hrefLang={otherLocale}
            className="hover:text-[var(--color-primary-light)] transition-colors duration-150 flex items-center gap-1"
            aria-label={`Switch language to ${ui.languageSwitch}`}
          >
            <GlobeIcon />
            {ui.languageSwitch}
          </Link>
          <a
            href={rssHref}
            className="hover:text-[var(--color-primary-light)] transition-colors duration-150 flex items-center gap-1"
            aria-label={ui.rssLabel}
            title={ui.rssLabel}
          >
            <RssIcon />
            RSS
          </a>
          <a
            href="mailto:marvin.uu@gmail.com"
            className="hover:text-[var(--color-primary-light)] transition-colors duration-150"
          >
            {ui.footerEmail}
          </a>
          <a
            href="https://github.com/hanmahong5-arch/2c-bs-dsnb"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-primary-light)] transition-colors duration-150 flex items-center gap-1"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M1.5 7h11M7 1.5c1.6 2 1.6 9 0 11M7 1.5c-1.6 2-1.6 9 0 11"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

function RssIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 11.5a1 1 0 100-2 1 1 0 000 2zM2 5.5a6.5 6.5 0 016.5 6.5M2 2a10 10 0 0110 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
