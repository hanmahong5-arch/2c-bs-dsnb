import type { Metadata } from "next";
import { loadContentSync, loadQuotes } from "@/lib/content";
import { QuotesSection } from "@/components/QuotesSection";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://dsnb.help";
const OG_IMAGE = "/og-image.png";
const LOCALE = "zh" as const;

export function generateMetadata(): Metadata {
  const bundle = loadQuotes(LOCALE);
  const title = `${bundle.headline} · DeepSeek 的故事`;
  const description = bundle.intro.slice(0, 158) + "…";
  const url = `${SITE_URL}/quotes`;
  return {
    title,
    description,
    alternates: {
      canonical: "/quotes",
      languages: {
        "zh-CN": "/quotes",
        en: "/en/quotes",
        "x-default": "/quotes",
      },
    },
    openGraph: {
      type: "article",
      locale: "zh_CN",
      alternateLocale: ["en_US"],
      siteName: "dsnb.help",
      url,
      title,
      description,
      images: [
        { url: OG_IMAGE, width: 1200, height: 630, alt: bundle.headline },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export default function QuotesPageZh() {
  const bundle = loadQuotes(LOCALE);
  const { ui } = loadContentSync(LOCALE);
  return (
    <>
      <QuotesSection bundle={bundle} locale={LOCALE} ui={ui} />
      <Footer locale={LOCALE} ui={ui} />
    </>
  );
}
