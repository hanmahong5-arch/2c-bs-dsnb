import type { Metadata } from "next";
import { loadConcepts, loadContentSync } from "@/lib/content";
import { ConceptIndex } from "@/components/ConceptIndex";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://dsnb.help";

export function generateMetadata(): Metadata {
  const bundle = loadConcepts();
  const title = `${bundle.headline} · The DeepSeek Story`;
  const description = bundle.intro.slice(0, 158) + "…";
  const url = `${SITE_URL}/en/concepts`;
  return {
    title,
    description,
    alternates: {
      canonical: "/en/concepts",
      languages: {
        en: "/en/concepts",
        "x-default": "/en/concepts",
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

export default function ConceptsIndexPage() {
  const bundle = loadConcepts();
  const { ui } = loadContentSync("en");
  return (
    <>
      <ConceptIndex bundle={bundle} ui={ui} />
      <Footer locale="en" ui={ui} />
    </>
  );
}
