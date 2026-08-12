"use client";

import { useRef, useState } from "react";
import type {
  ExplainLevel,
  ExplainLevelContent,
  ExplainTopic,
  Locale,
  UiText,
} from "@/lib/content";
import { EXPLAIN_LEVEL_ORDER, LEVEL_COLOR } from "@/lib/content";

type Props = {
  topic: ExplainTopic;
  levelLabels: Record<ExplainLevel, string>;
  levelDescriptions: Record<ExplainLevel, string>;
  ui: UiText;
  locale: Locale;
  initialLevel?: ExplainLevel;
};

export function ExplainLevelTabs({
  topic,
  levelLabels,
  levelDescriptions,
  ui,
  initialLevel,
}: Props) {
  const [active, setActive] = useState<ExplainLevel>(initialLevel ?? "kid");
  const content: ExplainLevelContent = topic.levels[active];
  const accent = LEVEL_COLOR[active];
  const tabRefs = useRef<Partial<Record<ExplainLevel, HTMLButtonElement>>>({});

  function focusLevel(lvl: ExplainLevel) {
    setActive(lvl);
    tabRefs.current[lvl]?.focus();
  }

  function handleTablistKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const idx = EXPLAIN_LEVEL_ORDER.indexOf(active);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusLevel(EXPLAIN_LEVEL_ORDER[(idx + 1) % EXPLAIN_LEVEL_ORDER.length]);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusLevel(
        EXPLAIN_LEVEL_ORDER[
          (idx - 1 + EXPLAIN_LEVEL_ORDER.length) % EXPLAIN_LEVEL_ORDER.length
        ],
      );
    }
  }

  return (
    <div>
      <p className="eyebrow mb-3">{ui.explainPickLevelLabel}</p>
      <div
        role="tablist"
        aria-label={ui.explainPickLevelLabel}
        onKeyDown={handleTablistKeyDown}
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8"
      >
        {EXPLAIN_LEVEL_ORDER.map((lvl) => {
          const isActive = lvl === active;
          const color = LEVEL_COLOR[lvl];
          return (
            <button
              key={lvl}
              ref={(el) => {
                tabRefs.current[lvl] = el ?? undefined;
              }}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              type="button"
              onClick={() => setActive(lvl)}
              className="card px-3 py-3 text-left transition-all"
              style={{
                borderColor: isActive ? color : undefined,
                background: isActive ? `${color}15` : undefined,
              }}
            >
              <p
                className="text-xs font-mono uppercase tracking-wider mb-1"
                style={{ color: isActive ? color : "var(--color-text-muted)" }}
              >
                {levelLabels[lvl]}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] leading-snug line-clamp-2">
                {levelDescriptions[lvl]}
              </p>
            </button>
          );
        })}
      </div>

      <section
        role="tabpanel"
        aria-label={levelLabels[active]}
        className="border-l-2 pl-5 sm:pl-6"
        style={{ borderColor: accent }}
      >
        <p
          className="eyebrow mb-3"
          style={{ color: accent }}
        >
          {levelLabels[active]}
        </p>

        <p className="text-base sm:text-lg font-medium text-[var(--color-text-primary)] leading-relaxed mb-6">
          {content.oneLine}
        </p>

        <p className="text-base text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line mb-6">
          {content.body}
        </p>

        {content.analogy && (
          <div
            className="rounded-2xl border border-[var(--color-border)] p-5 mt-6"
            style={{ background: `${accent}08` }}
          >
            <p
              className="eyebrow mb-2"
              style={{ color: accent }}
            >
              {ui.explainAnalogyLabel}
            </p>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed italic">
              {content.analogy}
            </p>
          </div>
        )}

        {content.technicalRefs && content.technicalRefs.length > 0 && (
          <div className="mt-8 pt-5 border-t border-[var(--color-border)]">
            <p
              className="eyebrow mb-3"
              style={{ color: accent }}
            >
              {ui.explainTechRefsLabel}
            </p>
            <ul className="space-y-2 text-sm">
              {content.technicalRefs.map((ref) => (
                <li key={ref} className="leading-snug">
                  <a
                    href={ref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] underline underline-offset-2 decoration-[var(--color-border)] hover:decoration-[var(--color-primary)] transition-colors break-all"
                  >
                    {ref}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
