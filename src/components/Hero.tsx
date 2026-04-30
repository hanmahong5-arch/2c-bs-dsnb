"use client";

import { motion } from "framer-motion";
import type { ContentBundle } from "@/lib/content";

// Simple geometric whale silhouette — SVG, no external assets.
function WhaleSVG() {
  return (
    <svg
      viewBox="0 0 320 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Body */}
      <ellipse
        cx="145"
        cy="100"
        rx="110"
        ry="50"
        fill="currentColor"
        opacity="0.15"
      />
      <ellipse
        cx="148"
        cy="98"
        rx="108"
        ry="47"
        fill="currentColor"
        opacity="0.08"
      />
      {/* Rostrum */}
      <path
        d="M 35 102 Q 10 100 8 108 Q 20 116 38 112 Z"
        fill="currentColor"
        opacity="0.2"
      />
      {/* Flukes (tail) */}
      <path
        d="M 248 95 Q 280 72 295 62 Q 288 82 290 92 Q 276 88 265 100 Q 280 108 288 128 Q 272 118 255 108 Z"
        fill="currentColor"
        opacity="0.2"
      />
      {/* Dorsal fin */}
      <path
        d="M 160 52 Q 172 40 185 50 Q 178 60 165 63 Z"
        fill="currentColor"
        opacity="0.25"
      />
      {/* Pectoral fin */}
      <path
        d="M 110 110 Q 95 135 105 148 Q 118 138 128 118 Z"
        fill="currentColor"
        opacity="0.18"
      />
      {/* Eye */}
      <circle cx="65" cy="96" r="4" fill="currentColor" opacity="0.5" />
      {/* Water ripple lines */}
      <path
        d="M 20 155 Q 80 148 140 155 Q 200 162 260 155"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.12"
        strokeLinecap="round"
      />
      <path
        d="M 40 168 Q 100 161 160 168 Q 220 175 280 168"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.07"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

type HeroProps = {
  hero: ContentBundle["hero"];
};

export function Hero({ hero }: HeroProps) {
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

      {/* Whale — positioned top-right, subtle */}
      <motion.div
        className="pointer-events-none absolute top-10 right-0 w-[480px] h-[270px] text-[var(--color-primary)]"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.8, ease, delay: 0.6 }}
        style={{
          filter: "blur(0.5px)",
        }}
      >
        <WhaleSVG />
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
            href="https://github.com/hanmahong5-arch/lurus-switch/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
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
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-base border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-all duration-200"
          >
            {hero.cta.secondary}
            <ChevronDownIcon />
          </a>
        </motion.div>
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
