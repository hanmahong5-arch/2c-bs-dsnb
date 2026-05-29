import type { MetadataRoute } from "next";
import { ERA_ORDER, getAllEventSlugs } from "@/lib/content";

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

  const eras: MetadataRoute.Sitemap = ERA_ORDER.flatMap((era) => {
    const eraAlternates = {
      languages: {
        "zh-CN": `${SITE}/era/${era}`,
        en: `${SITE}/en/era/${era}`,
        "x-default": `${SITE}/era/${era}`,
      },
    };
    return [
      {
        url: `${SITE}/era/${era}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: eraAlternates,
      },
      {
        url: `${SITE}/en/era/${era}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: eraAlternates,
      },
    ];
  });

  const readingListAlternates = {
    languages: {
      "zh-CN": `${SITE}/reading-list`,
      en: `${SITE}/en/reading-list`,
      "x-default": `${SITE}/reading-list`,
    },
  };

  const readingList: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/reading-list`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: readingListAlternates,
    },
    {
      url: `${SITE}/en/reading-list`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: readingListAlternates,
    },
  ];

  return [...home, ...partner, ...eras, ...readingList, ...events];
}
