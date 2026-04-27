"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ContentBundle } from "@/lib/content";

// One-click import: DeepSeek (via Lurus newapi.lurus.cn) provider preset.
// Decoded payload: { id, name, baseUrl, icon, iconColor, category, models, ... }
const SWITCH_IMPORT_URL =
  "switch://import?type=provider&data=eyJpZCI6Imx1cnVzLW5ld2FwaS1kZWVwc2VlayIsIm5hbWUiOiJEZWVwU2VlayDCtyBMdXJ1cyDkuK3ovawiLCJiYXNlVXJsIjoiaHR0cHM6Ly9uZXdhcGkubHVydXMuY24iLCJpY29uIjoiZGVlcHNlZWsiLCJpY29uQ29sb3IiOiIjNEQ2QkZFIiwiY2F0ZWdvcnkiOiJwcm94eSIsImtleUZvcm1hdCI6InNrLS4uLiIsIm1vZGVscyI6ImRlZXBzZWVrLXY0LXBybyxkZWVwc2Vlay12NC1mbGFzaCxkZWVwc2Vlay1yZWFzb25lciIsImRlc2NyaXB0aW9uIjoiRGVlcFNlZWsg5YWo57O75YiXIMK3IOmAmui_hyBMdXJ1cyDkuK3ovawgwrcg5Zu95YaF55u06L-e5YWN5Luj55CGIiwiZG9jc1VybCI6Imh0dHBzOi8vZHNuYi5oZWxwIiwiZnJlZVRpZXIiOmZhbHNlLCJuZWVkc1Byb3h5IjpmYWxzZX0";

const SWITCH_RELEASE_URL =
  "https://github.com/lurus-dev/lurus-switch/releases/latest";

type ClosingCTAProps = {
  closing: ContentBundle["closing"];
};

export function ClosingCTA({ closing }: ClosingCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="w-[600px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(77,107,254,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Divider */}
      <div className="section-divider mb-20 max-w-4xl mx-auto" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold headline-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {closing.headline}
        </motion.h2>

        <motion.p
          className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-10 headline-balance"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {closing.body}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Primary CTA — download Switch */}
          <a
            href={SWITCH_RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-base transition-all duration-200"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-deep) 100%)",
              boxShadow: "0 4px 24px rgba(77,107,254,0.3)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = "0 6px 32px rgba(77,107,254,0.5)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = "0 4px 24px rgba(77,107,254,0.3)";
              el.style.transform = "";
            }}
          >
            <DownloadIcon />
            {closing.ctaPrimary}
          </a>

          {/* Secondary CTA — deeplink import */}
          <a
            href={SWITCH_IMPORT_URL}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-base border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-all duration-200"
          >
            <ImportIcon />
            {closing.ctaSecondary}
          </a>
        </motion.div>

        {/* Tertiary text link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <a
            href="#timeline"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors duration-200 underline underline-offset-4 decoration-[var(--color-border)]"
          >
            故事的一部分用 DeepSeek 自己写的 →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 2v8M5 7l3 3 3-3M3 12h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ImportIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M10 5l3 3-3 3M1 3h4M1 13h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
