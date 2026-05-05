import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllEventSlugs,
  getEventBySlug,
  getAdjacentEvents,
} from "@/lib/content";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://dsnb.help";
const OG_IMAGE = "/og-image.png";

const ERA_LABEL: Record<string, string> = {
  origin: "起源",
  breakthrough: "突破",
  world: "震荡世界",
  present: "现在",
};

const ERA_COLOR: Record<string, string> = {
  origin: "#6F8AFF",
  breakthrough: "#22D3EE",
  world: "#FBBF24",
  present: "#4D6BFE",
};

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  const title = `${event.headline} · DeepSeek 的故事`;
  const description =
    event.body.length > 160 ? event.body.slice(0, 158) + "…" : event.body;
  const url = `${SITE_URL}/e/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/e/${slug}` },
    openGraph: {
      type: "article",
      locale: "zh_CN",
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

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const { prev, next } = getAdjacentEvents(slug);
  const eraColor = ERA_COLOR[event.era];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: event.headline,
    description: event.body.slice(0, 200),
    datePublished: event.date,
    inLanguage: "zh-CN",
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
      "@id": `${SITE_URL}/e/${slug}`,
    },
    isPartOf: {
      "@type": "Article",
      "@id": SITE_URL,
      name: "DeepSeek 的故事 — 从海底到星空",
    },
  };

  return (
    <>
      <header className="border-b border-[var(--color-border)]">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
          <Link
            href="/"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors"
          >
            ← 完整时间线
          </Link>
          <span className="text-[var(--color-text-muted)] font-mono text-xs">
            dsnb.help
          </span>
        </div>
      </header>

      <article className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-sm font-mono text-[var(--color-text-muted)]">
              {event.date}
            </span>
            <span
              className="text-xs px-3 py-1 rounded-full border"
              style={{
                borderColor: `${eraColor}50`,
                background: `${eraColor}15`,
                color: eraColor,
              }}
            >
              {ERA_LABEL[event.era]}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold headline-tight mb-8 text-gradient-blue">
            {event.headline}
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
            {event.body}
          </p>

          {event.product && (
            <div
              className="mt-10 p-5 rounded-2xl border border-[var(--color-border)]"
              style={{ background: "rgba(77,107,254,0.06)" }}
            >
              <p className="eyebrow mb-2">关联产品</p>
              {event.product.url ? (
                <a
                  href={event.product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <p className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors mb-1">
                    {event.product.name}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {event.product.tagline}{" "}
                    <span className="text-[var(--color-primary-light)]">→</span>
                  </p>
                </a>
              ) : (
                <>
                  <p className="font-semibold text-[var(--color-text-primary)] mb-1">
                    {event.product.name}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {event.product.tagline}
                  </p>
                </>
              )}
            </div>
          )}

          {event.sources.length > 0 && (
            <section className="mt-12 pt-6 border-t border-[var(--color-border)]">
              <p className="eyebrow mb-3">参考来源</p>
              <ul className="space-y-2 text-sm">
                {event.sources.map((src, i) => (
                  <li key={`${src}-${i}`} className="leading-snug">
                    <a
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] underline underline-offset-2 decoration-[var(--color-border)] hover:decoration-[var(--color-primary)] transition-colors break-all"
                    >
                      {src}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prev ? (
              <Link
                href={`/e/${prev.slug}`}
                className="card p-4 group"
                aria-label={`上一节: ${prev.headline}`}
              >
                <p className="text-xs text-[var(--color-text-muted)] mb-1">
                  ← 上一节
                </p>
                <p className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors leading-snug">
                  {prev.headline}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/e/${next.slug}`}
                className="card p-4 group sm:text-right"
                aria-label={`下一节: ${next.headline}`}
              >
                <p className="text-xs text-[var(--color-text-muted)] mb-1">
                  下一节 →
                </p>
                <p className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors leading-snug">
                  {next.headline}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </nav>

          <div className="mt-12 text-center">
            <Link
              href="/#timeline"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors underline underline-offset-4"
            >
              查看完整 DeepSeek 故事 →
            </Link>
          </div>
        </div>
      </article>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
