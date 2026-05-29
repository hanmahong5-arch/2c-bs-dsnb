import Link from "next/link";
import type { ConceptsBundle, UiText } from "@/lib/content";
import { conceptUrl, homeUrl } from "@/lib/content";

type Props = {
  bundle: ConceptsBundle;
  ui: UiText;
};

export function ConceptIndex({ bundle, ui }: Props) {
  return (
    <>
      <header className="border-b border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
          <Link
            href={homeUrl("en")}
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

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bundle.entries.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={conceptUrl(entry.slug)}
                  className="card p-5 group block h-full"
                >
                  <p className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors mb-2">
                    {entry.term}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {entry.oneLineDef}
                  </p>
                  <p className="mt-4 text-xs text-[var(--color-primary-light)]">
                    Read &rarr;
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </>
  );
}
