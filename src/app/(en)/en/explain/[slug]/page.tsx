import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllExplainSlugs,
  getExplainTopicBySlug,
  loadContentSync,
  loadExplainIndex,
  loadExplainTopics,
} from "@/lib/content";
import { ExplainTopicSection } from "@/components/ExplainTopicSection";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://dsnb.help";
const LOCALE = "en" as const;

export function generateStaticParams() {
  return getAllExplainSlugs(LOCALE).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getExplainTopicBySlug(slug, LOCALE);
  if (!topic) return {};
  const title = `${topic.title} · DeepSeek explained`;
  const description = topic.oneLine;
  const url = `${SITE_URL}/en/explain/${slug}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/en/explain/${slug}`,
      languages: {
        "zh-CN": `/explain/${slug}`,
        en: `/en/explain/${slug}`,
        "x-default": `/explain/${slug}`,
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

export default async function ExplainTopicPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getExplainTopicBySlug(slug, LOCALE);
  if (!topic) notFound();

  const all = loadExplainTopics(LOCALE);
  const others = all.filter((t) => t.slug !== slug);
  const indexBundle = loadExplainIndex(LOCALE);
  const { ui } = loadContentSync(LOCALE);

  return (
    <>
      <ExplainTopicSection
        topic={topic}
        others={others}
        indexBundle={indexBundle}
        locale={LOCALE}
        ui={ui}
      />
      <Footer locale={LOCALE} ui={ui} />
    </>
  );
}
