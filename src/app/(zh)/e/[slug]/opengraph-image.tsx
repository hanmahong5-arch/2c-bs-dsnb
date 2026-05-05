import { ImageResponse } from "next/og";
import { getEventBySlug } from "@/lib/content";
import type { Era } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "DeepSeek 的故事";

const ERA_LABEL: Record<Era, string> = {
  origin: "起源",
  breakthrough: "突破",
  world: "震荡世界",
  present: "现在",
};

const ERA_COLOR: Record<Era, string> = {
  origin: "#6F8AFF",
  breakthrough: "#22D3EE",
  world: "#FBBF24",
  present: "#4D6BFE",
};

// Noto Sans SC subset for CJK glyphs. fontsource ships pre-subsetted woff
// files that drop CJK font weight from ~10MB to ~3MB per weight.
const FONT_BOLD_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc@5.0.5/files/noto-sans-sc-chinese-simplified-700-normal.woff";
const FONT_REG_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc@5.0.5/files/noto-sans-sc-chinese-simplified-400-normal.woff";

// Module-level promises share font bytes across all 15 slug builds.
const boldPromise = fetch(FONT_BOLD_URL).then((r) => r.arrayBuffer());
const regPromise = fetch(FONT_REG_URL).then((r) => r.arrayBuffer());

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug, "zh");
  if (!event) {
    return new Response("Not found", { status: 404 });
  }

  const [bold, reg] = await Promise.all([boldPromise, regPromise]);
  const eraColor = ERA_COLOR[event.era];
  const headlineFontSize = event.headline.length > 18 ? 56 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #060818 0%, #0D1130 60%, #1A2060 100%)",
          fontFamily: "Noto Sans SC",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{ color: "#6F8AFF", fontWeight: 700, fontSize: 24 }}
          >
            dsnb.help
          </span>
          <span style={{ color: "#4A5280", fontSize: 18 }}>
            DeepSeek 的故事
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 22, color: "#8892C8" }}>{event.date}</span>
            <span
              style={{
                padding: "6px 18px",
                borderRadius: 9999,
                border: `1px solid ${eraColor}50`,
                background: `${eraColor}15`,
                color: eraColor,
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {ERA_LABEL[event.era]}
            </span>
          </div>

          <div
            style={{
              fontSize: headlineFontSize,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
            }}
          >
            {event.headline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 48,
              height: 4,
              background: "linear-gradient(90deg, #4D6BFE, #22D3EE)",
              borderRadius: 2,
            }}
          />
          <span style={{ fontSize: 18, color: "#4A5280" }}>
            读完整故事 →
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans SC", data: reg, weight: 400, style: "normal" },
        { name: "Noto Sans SC", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
