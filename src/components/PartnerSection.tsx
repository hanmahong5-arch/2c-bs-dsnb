import type { Locale, PartnerSection as PartnerContent } from "@/lib/content";
import { PartnerApplicationForm } from "./PartnerApplicationForm";

type PartnerSectionProps = {
  locale: Locale;
  partner: PartnerContent;
};

export function PartnerSection({ locale, partner }: PartnerSectionProps) {
  return (
    <article className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="eyebrow mb-4">{partner.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl font-bold headline-tight mb-6 text-[var(--color-text-primary)]">
          {partner.headline}
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
          {partner.body}
        </p>
      </div>

      <section className="mt-20 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {partner.benefits.map((b) => (
          <div
            key={b.title}
            className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
              {b.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {b.body}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-[var(--color-text-primary)]">
          FAQ
        </h2>
        <div className="space-y-6">
          {partner.faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <summary className="cursor-pointer text-base font-medium text-[var(--color-text-primary)] list-none flex items-start justify-between gap-4">
                <span>{item.q}</span>
                <span
                  className="text-[var(--color-text-muted)] transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section
        id="apply"
        className="mt-20 max-w-3xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-[var(--color-text-primary)]">
          {partner.formHeading}
        </h2>
        <PartnerApplicationForm locale={locale} partner={partner} />
      </section>
    </article>
  );
}
