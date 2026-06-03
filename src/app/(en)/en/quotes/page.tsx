import type { Metadata } from "next";
import { loadContentSync, loadQuotes } from "@/lib/content";
import { QuotesSection } from "@/components/QuotesSection";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://dsnb.help";
const LOCALE = "en" as const;

export function generateMetadata(): Metadata {
  const bundle = loadQuotes(LOCALE);
  const title = `${bundle.headline} · The DeepSeek Story`;
  const description = bundle.intro.slice(0, 158) + "…";
  const url = `${SITE_URL}/en/quotes`;
  return {
    title,
    description,
    alternates: {
      canonical: "/en/quotes",
      languages: {
        "zh-CN": "/quotes",
        en: "/en/quotes",
        "x-default": "/quotes",
      },
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      alternateLocale: ["zh_CN"],
      siteName: "dsnb.help",
      url,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function QuotesPageEn() {
  const bundle = loadQuotes(LOCALE);
  const { ui } = loadContentSync(LOCALE);
  return (
    <>
      <QuotesSection bundle={bundle} locale={LOCALE} ui={ui} />
      <Footer locale={LOCALE} ui={ui} />
    </>
  );
}
