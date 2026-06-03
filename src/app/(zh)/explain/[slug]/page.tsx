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
const OG_IMAGE = "/og-image.png";
const LOCALE = "zh" as const;

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
  const title = `${topic.title} · DeepSeek 讲清楚`;
  const description = topic.oneLine;
  const url = `${SITE_URL}/explain/${slug}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/explain/${slug}`,
      languages: {
        "zh-CN": `/explain/${slug}`,
        en: `/en/explain/${slug}`,
        "x-default": `/explain/${slug}`,
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
        { url: OG_IMAGE, width: 1200, height: 630, alt: topic.title },
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

export default async function ExplainTopicPageZh({
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
