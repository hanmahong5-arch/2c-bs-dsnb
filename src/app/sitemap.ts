import type { MetadataRoute } from "next";
import { getAllEventSlugs } from "@/lib/content";

const SITE = "https://dsnb.help";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Slugs are identical across locales — same event, different rendering.
  const slugs = getAllEventSlugs("zh");

  const homeAlternates = {
    languages: {
      "zh-CN": SITE,
      en: `${SITE}/en`,
      "x-default": SITE,
    },
  };

  const home: MetadataRoute.Sitemap = [
    {
      url: SITE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: homeAlternates,
    },
    {
      url: `${SITE}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: homeAlternates,
    },
  ];

  const partnerAlternates = {
    languages: {
      "zh-CN": `${SITE}/partner`,
      en: `${SITE}/en/partner`,
      "x-default": `${SITE}/partner`,
    },
  };

  const partner: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/partner`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: partnerAlternates,
    },
    {
      url: `${SITE}/en/partner`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: partnerAlternates,
    },
  ];

  const events: MetadataRoute.Sitemap = slugs.flatMap((slug) => {
    const eventAlternates = {
      languages: {
        "zh-CN": `${SITE}/e/${slug}`,
        en: `${SITE}/en/e/${slug}`,
        "x-default": `${SITE}/e/${slug}`,
      },
    };
    return [
      {
        url: `${SITE}/e/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: eventAlternates,
      },
      {
        url: `${SITE}/en/e/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.65,
        alternates: eventAlternates,
      },
    ];
  });

  return [...home, ...partner, ...events];
}
