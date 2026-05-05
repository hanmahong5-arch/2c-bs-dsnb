import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

const SITE_URL = "https://dsnb.help";
const OG_IMAGE = "/og-image.png";
const TITLE = "The DeepSeek Story: Done Following";
const DESCRIPTION =
  "An emotional narrative timeline of DeepSeek — from a Hangzhou quant fund's GPU cluster to open-sourcing a 1.6T-parameter model. One-click access via the Switch desktop app.";

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
    type: "article",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    siteName: "dsnb.help",
    url: `${SITE_URL}/en`,
    images: [
      { url: OG_IMAGE, width: 1200, height: 630, alt: TITLE },
    ],
    title: TITLE,
    description:
      "From a quant fund to a global AI phenomenon: DeepSeek's open-source narrative, told plainly.",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "From a quant fund to a global AI phenomenon. The DeepSeek story.",
    images: [OG_IMAGE],
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
  inLanguage: "en",
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
