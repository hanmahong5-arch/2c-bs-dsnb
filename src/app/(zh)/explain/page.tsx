import type { Metadata } from "next";
import {
  loadContentSync,
  loadExplainIndex,
  loadExplainTopics,
} from "@/lib/content";
import { ExplainIndex } from "@/components/ExplainIndex";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://dsnb.help";
const OG_IMAGE = "/og-image.png";
const LOCALE = "zh" as const;

export function generateMetadata(): Metadata {
  const bundle = loadExplainIndex(LOCALE);
  const title = `${bundle.headline} · DeepSeek 的故事`;
  const description = bundle.intro.slice(0, 158) + "…";
  const url = `${SITE_URL}/explain`;
  return {
    title,
    description,
    alternates: {
      canonical: "/explain",
      languages: {
        "zh-CN": "/explain",
        en: "/en/explain",
        "x-default": "/explain",
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

export default function ExplainIndexPageZh() {
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
