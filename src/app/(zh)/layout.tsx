import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

const SITE_URL = "https://dsnb.help";
const OG_IMAGE = "/og-image.png";
const TITLE = "DeepSeek 的故事 — 从海底到星空";
const DESCRIPTION =
  "一个关于 DeepSeek 的情感叙事时间线。从幻方量化的 AI 实验到撼动硅谷的开源突破，用 Switch 桌面应用一键接入 DeepSeek。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "article",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    siteName: "dsnb.help",
    url: SITE_URL,
    images: [
      { url: OG_IMAGE, width: 1200, height: 630, alt: TITLE },
    ],
    title: TITLE,
    description:
      "情感叙事时间线：DeepSeek 如何在质疑声中崛起，以最小成本挑战最强模型。",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "情感叙事时间线：DeepSeek 如何以最小成本挑战最强模型。",
    images: [OG_IMAGE],
  },
  keywords: [
    "DeepSeek",
    "AI",
    "大语言模型",
    "开源",
    "Switch",
    "桌面应用",
    "梁文锋",
    "幻方量化",
    "DeepSeek-R1",
    "DeepSeek-V3",
    "DeepSeek-V4",
  ],
  authors: [{ name: "Lurus" }],
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
  image: `${SITE_URL}${OG_IMAGE}`,
  datePublished: "2026-04-30",
  dateModified: "2026-05-05",
  inLanguage: "zh-CN",
  author: {
    "@type": "Organization",
    name: "Lurus",
    url: "https://lurus.cn",
  },
  publisher: {
    "@type": "Organization",
    name: "Lurus",
    logo: { "@type": "ImageObject", url: `${SITE_URL}${OG_IMAGE}` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/` },
  about: {
    "@type": "Organization",
    name: "DeepSeek",
    url: "https://www.deepseek.com",
  },
};

export default function RootLayoutZh({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="antialiased">
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <main className="flex-1">{children}</main>
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
