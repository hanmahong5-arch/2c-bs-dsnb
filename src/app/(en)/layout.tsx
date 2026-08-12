import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LangSwitch } from "@/components/LangSwitch";
import "../globals.css";

// Self-hosted via next/font — no runtime request to fonts.googleapis.com,
// avoids the render-blocking cross-origin hop the raw @import used to cost.
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://dsnb.help";
const TITLE = "The DeepSeek Story — Done Following";
const DESCRIPTION =
  "A bilingual emotional timeline of DeepSeek, from a Hangzhou quant fund to a 1.6T-parameter open-weight frontier model. 15 events, primary sources, ZH + EN.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/en",
    languages: {
      "zh-CN": "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "dsnb.help",
    url: `${SITE_URL}/en`,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  keywords: [
    "DeepSeek",
    "open-source AI",
    "Liang Wenfeng",
    "DeepSeek-R1",
    "DeepSeek-V3",
    "DeepSeek-V4",
    "AI narrative",
    "reasoning models",
    "open-source LLM",
    "China AI",
    "Switch desktop app",
  ],
  authors: [{ name: "LurusTech" }],
  category: "technology",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060818",
  width: "device-width",
  initialScale: 1,
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  image: `${SITE_URL}/opengraph-image`,
  datePublished: "2026-04-30",
  dateModified: "2026-05-20",
  inLanguage: "en",
  author: {
    "@type": "Organization",
    name: "LurusTech",
    url: "https://lurus.cn",
  },
  publisher: {
    "@type": "Organization",
    name: "LurusTech",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/opengraph-image`,
    },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/en` },
  about: {
    "@type": "Organization",
    name: "DeepSeek",
    url: "https://www.deepseek.com",
  },
};

export default function RootLayoutEn({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased">
      <body
        className={`${interTight.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]`}
      >
        <MotionConfig reducedMotion="user">
          <LangSwitch />
          <main className="flex-1">{children}</main>
        </MotionConfig>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
