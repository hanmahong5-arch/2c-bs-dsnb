import type { MetadataRoute } from "next";
import { getAllEventSlugs } from "@/lib/content";

const SITE = "https://dsnb.help";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const root: MetadataRoute.Sitemap[number] = {
    url: SITE,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  };

  const events: MetadataRoute.Sitemap = getAllEventSlugs().map((slug) => ({
    url: `${SITE}/e/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [root, ...events];
}
