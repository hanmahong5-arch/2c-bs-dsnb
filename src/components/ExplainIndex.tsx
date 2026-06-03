import Link from "next/link";
import type {
  ExplainIndexBundle,
  ExplainTopic,
  Locale,
  UiText,
} from "@/lib/content";
import { EXPLAIN_LEVEL_ORDER, explainUrl, homeUrl } from "@/lib/content";

const LEVEL_COLOR = {
  kid: "#FBBF24",
  student: "#22D3EE",
  engineer: "#6F8AFF",
  researcher: "#4D6BFE",
} as const;

type Props = {
  bundle: ExplainIndexBundle;
  topics: ExplainTopic[];
  locale: Locale;
  ui: UiText;
};

export function ExplainIndex({ bundle, topics, locale, ui }: Props) {
  const topicBySlug = new Map(topics.map((t) => [t.slug, t]));

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

          <p className="text-base sm:text-lg text-[var(--color-text-primary)] leading-relaxed mb-8 pl-4 border-l-2 border-[var(--color-primary)]">
            {bundle.intro}
          </p>

          <section
            className="rounded-2xl border border-[var(--color-border)] p-5 sm:p-6 mb-12"
            style={{ background: "rgba(77,107,254,0.06)" }}
          >
            <p className="eyebrow mb-2">
              {ui.explainFromDsPerspectiveLabel}
            </p>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
              {bundle.fromDeepSeekPerspective}
            </p>
          </section>

          <section className="mb-12">
            <p className="eyebrow mb-4">{ui.explainPickLevelLabel}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXPLAIN_LEVEL_ORDER.map((lvl) => {
                const color = LEVEL_COLOR[lvl];
                return (
                  <div
                    key={lvl}
                    className="card p-4"
                    style={{ borderColor: `${color}40` }}
                  >
                    <p
                      className="text-xs font-mono uppercase tracking-wider mb-1"
                      style={{ color }}
                    >
                      {bundle.levelLabels[lvl]}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-snug">
                      {bundle.levelDescriptions[lvl]}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-12 pt-6 border-t border-[var(--color-border)]">
            <p className="eyebrow mb-5">{ui.explainDifficultyJumpLabel}</p>
            <ul className="space-y-4">
              {bundle.startHere.map((summary) => {
                const topic = topicBySlug.get(summary.slug);
                if (!topic) return null;
                const color = LEVEL_COLOR[summary.difficulty];
                return (
                  <li key={summary.slug}>
                    <Link
                      href={explainUrl(summary.slug, locale)}
                      className="card p-5 group block"
                    >
                      <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                        <span
                          className="text-xs font-mono uppercase tracking-wider"
                          style={{ color }}
                        >
                          {bundle.difficultyLabel}: {bundle.levelLabels[summary.difficulty]}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-primary-light)] transition-colors">
                          {ui.readFull}
                        </span>
                      </div>
                      <p className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors leading-snug mb-2">
                        {summary.title}
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {summary.oneLine}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
