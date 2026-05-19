"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ContentBundle, UiText } from "@/lib/content";
import {
  switchDownloadUrl,
  switchPlatformLabel,
  usePlatform,
} from "@/lib/platform";
import { track } from "@/lib/track";

// Minimal DeepSeek brand mark — 14×14 solid square + wordmark in Fraunces.
function DeepSeekMark() {
  return (
    <div className="flex items-center gap-3 select-none" aria-hidden="true">
      <div
        style={{
          width: 14,
          height: 14,
          background: "var(--color-primary)",
          opacity: 0.85,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 600,
          fontSize: "1.05rem",
          letterSpacing: "-0.01em",
          color: "var(--color-primary)",
          opacity: 0.85,
        }}
      >
        DeepSeek
      </span>
    </div>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

type HeroProps = {
  hero: ContentBundle["hero"];
  locale: "zh" | "en";
  ui: UiText;
};

export function Hero({ hero, locale, ui }: HeroProps) {
  const platform = usePlatform();
  const downloadHref = switchDownloadUrl(platform);
  const platformLabel = switchPlatformLabel(platform, ui);
  const resellerHint = hero.resellerHint;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-mesh grid-bg">
      {/* Ambient glow orbs */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(77,107,254,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[300px] h-[200px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      {/* Brand mark — top-right, subtle. Hidden on small screens. */}
      <motion.div
        className="pointer-events-none absolute top-8 right-8 hidden md:flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease, delay: 0.6 }}
      >
        <DeepSeekMark />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          className="headline-tight headline-balance text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-shimmer-blue"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.22 }}
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto mb-12 headline-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.38 }}
        >
          {hero.subhead}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.54 }}
        >
          <a
            href={downloadHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("cta_download_hero", { platform })}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-base transition-all duration-200"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-deep) 100%)",
              boxShadow: "0 4px 24px rgba(77,107,254,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 6px 32px rgba(77,107,254,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 4px 24px rgba(77,107,254,0.3)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "";
            }}
          >
            <DownloadIcon />
            {hero.cta.primary}
          </a>

          <a
            href="#timeline"
            onClick={() => track("cta_scroll_timeline")}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-base border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-all duration-200"
          >
            {hero.cta.secondary}
            <ChevronDownIcon />
          </a>
        </motion.div>

        {platformLabel ? (
          <motion.p
            className="mt-3 text-xs text-[var(--color-text-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.7 }}
          >
            {platformLabel}
          </motion.p>
        ) : null}

        {resellerHint ? (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.78 }}
          >
            <Link
              href={resellerHint.href}
              onClick={() => track("cta_hero_reseller", { locale })}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors duration-200 underline underline-offset-4 decoration-[var(--color-border)]"
            >
              {resellerHint.label}
            </Link>
          </motion.div>
        ) : null}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[var(--color-border)]" />
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </motion.div>
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

function ChevronDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 5l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
