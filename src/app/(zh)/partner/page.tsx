import type { Metadata } from "next";
import { loadContentSync } from "@/lib/content";
import { PartnerSection } from "@/components/PartnerSection";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://dsnb.help";
const OG_IMAGE = "/og-image.png";
const LOCALE = "zh" as const;

export function generateMetadata(): Metadata {
  const { partner } = loadContentSync(LOCALE);
  const url = `${SITE_URL}/partner`;
  return {
    title: partner.metaTitle,
    description: partner.metaDescription,
    alternates: {
      canonical: "/partner",
      languages: {
        "zh-CN": "/partner",
        en: "/en/partner",
        "x-default": "/partner",
      },
    },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      alternateLocale: ["en_US"],
      siteName: "dsnb.help",
      url,
      title: partner.metaTitle,
      description: partner.metaDescription,
      images: [
        { url: OG_IMAGE, width: 1200, height: 630, alt: partner.headline },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: partner.metaTitle,
      description: partner.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

export default function PartnerPageZh() {
  const content = loadContentSync(LOCALE);
  return (
    <>
      <PartnerSection locale={LOCALE} partner={content.partner} />
      <Footer locale={LOCALE} ui={content.ui} />
    </>
  );
}
