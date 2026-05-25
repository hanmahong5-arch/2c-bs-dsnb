import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "The DeepSeek Story — Done Following";

const FONT_BOLD_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.5/files/inter-latin-700-normal.woff";
const FONT_REG_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.5/files/inter-latin-400-normal.woff";

const boldPromise = fetch(FONT_BOLD_URL).then((r) => r.arrayBuffer());
const regPromise = fetch(FONT_REG_URL).then((r) => r.arrayBuffer());

export default async function OG() {
  const [bold, reg] = await Promise.all([boldPromise, regPromise]);

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
            "linear-gradient(135deg, #060818 0%, #0D1130 55%, #1A2060 100%)",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#6F8AFF", fontWeight: 700, fontSize: 28 }}>
            dsnb.help
          </span>
          <span style={{ color: "#4A5280", fontSize: 20 }}>
            DSNB · The DeepSeek Story
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Done Following.
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#94A3CC",
              lineHeight: 1.4,
              maxWidth: 920,
            }}
          >
            $5.6M trained the model that toppled Nvidia. Open weights, your jurisdiction, one-tenth the API price.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 4,
              background: "linear-gradient(90deg, #4D6BFE, #22D3EE)",
              borderRadius: 2,
            }}
          />
          <span style={{ fontSize: 20, color: "#4A5280" }}>
            Bilingual narrative · 15 events · primary sources
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: reg, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
