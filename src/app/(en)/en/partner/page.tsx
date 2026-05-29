import type { Metadata } from "next";
import { loadContentSync } from "@/lib/content";
import { PartnerSection } from "@/components/PartnerSection";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://dsnb.help";
const LOCALE = "en" as const;

export function generateMetadata(): Metadata {
  const { partner } = loadContentSync(LOCALE);
  const url = `${SITE_URL}/en/partner`;
  return {
    title: partner.metaTitle,
    description: partner.metaDescription,
    alternates: {
      canonical: "/en/partner",
      languages: {
        "zh-CN": "/partner",
        en: "/en/partner",
        "x-default": "/partner",
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["zh_CN"],
      siteName: "dsnb.help",
      url,
      title: partner.metaTitle,
      description: partner.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: partner.metaTitle,
      description: partner.metaDescription,
    },
  };
}

export default function PartnerPageEn() {
  const content = loadContentSync(LOCALE);
  return (
    <>
      <PartnerSection locale={LOCALE} partner={content.partner} />
      <Footer locale={LOCALE} ui={content.ui} />
    </>
  );
}
