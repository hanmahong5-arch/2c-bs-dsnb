import type { Metadata } from "next";
import {
  loadContentSync,
  loadExplainIndex,
  loadExplainTopics,
} from "@/lib/content";
import { ExplainIndex } from "@/components/ExplainIndex";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://dsnb.help";
const LOCALE = "en" as const;

export function generateMetadata(): Metadata {
  const bundle = loadExplainIndex(LOCALE);
  const title = `${bundle.headline} · The DeepSeek Story`;
  const description = bundle.intro.slice(0, 158) + "…";
  const url = `${SITE_URL}/en/explain`;
  return {
    title,
    description,
    alternates: {
      canonical: "/en/explain",
      languages: {
        "zh-CN": "/explain",
        en: "/en/explain",
        "x-default": "/explain",
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

export default function ExplainIndexPageEn() {
  const bundle = loadExplainIndex(LOCALE);
  const topics = loadExplainTopics(LOCALE);
  const { ui } = loadContentSync(LOCALE);
  return (
    <>
      <ExplainIndex
        bundle={bundle}
        topics={topics}
        locale={LOCALE}
        ui={ui}
      />
      <Footer locale={LOCALE} ui={ui} />
    </>
  );
}
