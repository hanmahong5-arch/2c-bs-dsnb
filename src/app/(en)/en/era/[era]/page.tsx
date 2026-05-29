import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ERA_ORDER,
  getEraEvents,
  getEraMeta,
  loadContentSync,
  type Era,
} from "@/lib/content";
import { EraSection } from "@/components/EraSection";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://dsnb.help";
const LOCALE = "en" as const;

export function generateStaticParams() {
  return ERA_ORDER.map((era) => ({ era }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ era: string }>;
}): Promise<Metadata> {
  const { era } = await params;
  const meta = getEraMeta(era as Era, LOCALE);
  if (!meta) return {};

  const title = `${meta.headline} · The DeepSeek Story`;
  const description = meta.editorial;
  const url = `${SITE_URL}/en/era/${era}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/en/era/${era}`,
      languages: {
        "zh-CN": `/era/${era}`,
        en: `/en/era/${era}`,
        "x-default": `/era/${era}`,
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

export default async function EraPageEn({
  params,
}: {
  params: Promise<{ era: string }>;
}) {
  const { era } = await params;
  if (!ERA_ORDER.includes(era as Era)) notFound();
  const eraTyped = era as Era;
  const meta = getEraMeta(eraTyped, LOCALE);
  if (!meta) notFound();

  const events = getEraEvents(eraTyped, LOCALE);
  const { ui } = loadContentSync(LOCALE);

  return (
    <>
      <EraSection
        era={eraTyped}
        meta={meta}
        events={events}
        locale={LOCALE}
        ui={ui}
      />
      <Footer locale={LOCALE} ui={ui} />
    </>
  );
}
