import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllEventSlugs,
  getEventBySlug,
  getAdjacentEvents,
  loadContentSync,
} from "@/lib/content";
import { EventPageContent } from "@/components/EventPageContent";

const SITE_URL = "https://dsnb.help";
const OG_IMAGE = "/og-image.png";
const LOCALE = "en" as const;

export function generateStaticParams() {
  return getAllEventSlugs(LOCALE).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug, LOCALE);
  if (!event) return {};

  const title = `${event.headline} · The DeepSeek Story`;
  const description =
    event.body.length > 160 ? event.body.slice(0, 158) + "…" : event.body;
  const url = `${SITE_URL}/en/e/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/en/e/${slug}`,
      languages: {
        "zh-CN": `/e/${slug}`,
        en: `/en/e/${slug}`,
        "x-default": `/e/${slug}`,
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
      images: [
        { url: OG_IMAGE, width: 1200, height: 630, alt: event.headline },
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

export default async function EventPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug, LOCALE);
  if (!event) notFound();

  const { prev, next } = getAdjacentEvents(slug, LOCALE);
  const { ui } = loadContentSync(LOCALE);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: event.headline,
    description: event.body.slice(0, 200),
    datePublished: event.date,
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/en/e/${slug}`,
    },
    isPartOf: {
      "@type": "Article",
      "@id": `${SITE_URL}/en`,
      name: "The DeepSeek Story: Done Following",
    },
  };

  return (
    <>
      <EventPageContent
        event={event}
        prev={prev}
        next={next}
        locale={LOCALE}
        ui={ui}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
