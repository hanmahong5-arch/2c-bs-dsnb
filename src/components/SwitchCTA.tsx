"use client";

import Link from "next/link";
import type { Locale, UiText } from "@/lib/content";
import { switchDownloadUrl, usePlatform } from "@/lib/platform";
import { track } from "@/lib/track";

type SwitchCTAProps = {
  locale: Locale;
  ui: UiText;
};

export function SwitchCTA({ locale, ui }: SwitchCTAProps) {
  const partnerHref = locale === "en" ? "/en/partner" : "/partner";
  const platform = usePlatform();
  const downloadHref = switchDownloadUrl(platform);

  return (
    <section className="py-16 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-[var(--color-text-primary)]">
          {ui.resellerHeadline}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
          {ui.resellerSubhead}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href={partnerHref}
            onClick={() => track("cta_reseller_partner", { locale })}
            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-[var(--color-primary-deep)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            {ui.resellerCtaPartner}
          </Link>
          <a
            href={downloadHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("cta_reseller_download", { locale })}
            className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg font-semibold hover:border-[var(--color-border-hover)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            {ui.resellerCtaDownload}
          </a>
        </div>
      </div>
    </section>
  );
}
