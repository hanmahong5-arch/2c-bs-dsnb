import type { Locale } from "./content";
import { eventUrl, homeUrl, loadContentSync, slugDate } from "./content";

const SITE = "https://dsnb.help";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(d: Date): string {
  return d.toUTCString();
}

const FEED_PATH: Record<Locale, string> = {
  zh: "/rss.xml",
  en: "/en/rss.xml",
};

const LANG_TAG: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
};

export function buildRssXml(locale: Locale): string {
  const content = loadContentSync(locale);
  const feedUrl = `${SITE}${FEED_PATH[locale]}`;
  const channelLink = `${SITE}${homeUrl(locale)}`;

  // Newest first.
  const sorted = [...content.timeline].sort(
    (a, b) => slugDate(b.slug).getTime() - slugDate(a.slug).getTime(),
  );

  const items = sorted
    .map((event) => {
      const link = `${SITE}${eventUrl(event.slug, locale)}`;
      const pubDate = rfc822(slugDate(event.slug));
      const description = event.body.length > 320
        ? event.body.slice(0, 318) + "…"
        : event.body;
      return [
        "    <item>",
        `      <title>${escapeXml(event.headline)}</title>`,
        `      <link>${link}</link>`,
        `      <description>${escapeXml(description)}</description>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(content.meta.title)}</title>`,
    `    <link>${channelLink}</link>`,
    `    <description>${escapeXml(content.meta.description)}</description>`,
    `    <language>${LANG_TAG[locale]}</language>`,
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    `    <lastBuildDate>${rfc822(new Date())}</lastBuildDate>`,
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");
}
