import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllConceptSlugs,
  getConceptBySlug,
  loadConcepts,
  loadContentSync,
} from "@/lib/content";
import { ConceptDetail } from "@/components/ConceptDetail";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://dsnb.help";

export function generateStaticParams() {
  return getAllConceptSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) return {};
  const title = `${concept.term} · DeepSeek concepts`;
  const description = concept.oneLineDef;
  const url = `${SITE_URL}/en/concepts/${slug}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/en/concepts/${slug}`,
      languages: {
        en: `/en/concepts/${slug}`,
        "x-default": `/en/concepts/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      locale: "en_US",
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

export default async function ConceptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) notFound();

  const all = loadConcepts().entries;
  const others = all.filter((c) => c.slug !== slug);
  const { ui } = loadContentSync("en");

  return (
    <>
      <ConceptDetail concept={concept} others={others} ui={ui} />
      <Footer locale="en" ui={ui} />
    </>
  );
}
