import type { Metadata } from "next";
import { loadContentSync, loadReadingList } from "@/lib/content";
import { ReadingListSection } from "@/components/ReadingListSection";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://dsnb.help";
const LOCALE = "en" as const;

export function generateMetadata(): Metadata {
  const bundle = loadReadingList(LOCALE);
  const title = `${bundle.headline} · The DeepSeek Story`;
  const description = bundle.intro.slice(0, 158) + "…";
  const url = `${SITE_URL}/en/reading-list`;
  return {
    title,
    description,
    alternates: {
      canonical: "/en/reading-list",
      languages: {
        "zh-CN": "/reading-list",
        en: "/en/reading-list",
        "x-default": "/reading-list",
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

export default function ReadingListPageEn() {
  const bundle = loadReadingList(LOCALE);
  const { ui } = loadContentSync(LOCALE);
  return (
    <>
      <ReadingListSection bundle={bundle} locale={LOCALE} ui={ui} />
      <Footer locale={LOCALE} ui={ui} />
    </>
  );
}
