# OG / 分享卡图片规范

落地页 `layout.tsx` 已声明 `images: ["/og-image.png"]` —— 文件需放到 `public/og-image.png`。

## 规范

- **尺寸**：1200×630 px（Twitter / Open Graph 通用）
- **比例**：1.91:1
- **大小**：≤ 200 KB（PNG/JPG，越小越好）
- **安全区**：四周各留 60 px，避免被各平台边框裁切

## 视觉

```
┌────────────────────────────────────────────┐
│                                            │
│   eyebrow:  DSNB · DeepSeek 牛逼          │
│                                            │
│   headline:  深海鲸鱼，怎么飞上星空        │
│   (大字，DeepSeek 蓝 #4D6BFE 主色)         │
│                                            │
│   subhead:   一个由 DeepSeek 自己讲述的    │
│              情感叙事时间线                │
│                                            │
│   ─────────────────────                   │
│                                            │
│   🐋 dsnb.help                            │
│                                            │
└────────────────────────────────────────────┘
背景：深 navy (#0A0E27) → DeepSeek 蓝渐变
配饰：右下角一个简笔鲸鱼 SVG（与站点 hero 同款）
```

## 生成方式（任选一种）

### A. Figma / Sketch 手作（推荐）

模板字段：
- 字体：思源黑体 Heavy（中）+ Inter Bold（英）
- 文字颜色：标题 `#FFFFFF`，副标题 `#94A3B8`，eyebrow `#4D6BFE`
- 背景：linear-gradient 135deg `#0A0E27` → `#1E40AF` → `#0A0E27`

### B. Next.js OG Image API（自动生成）

如果想动态化，建 `src/app/api/og/route.tsx`：
```tsx
import { ImageResponse } from "next/og";
export const runtime = "edge";
export async function GET() {
  return new ImageResponse(
    <div style={{ width: 1200, height: 630, ... }}>...</div>,
    { width: 1200, height: 630 }
  );
}
```
然后 layout.tsx 改 `images: ["/api/og"]`。
（标准 Next.js 套路，适合后续频繁改文案的情况。）

### C. Playwright 截图（最简单）

直接在本地跑站点，截 hero 区域：
```bash
bun run build && bun run start &
sleep 3
bunx playwright screenshot --viewport-size=1200,630 \
  --full-page http://localhost:3000 \
  public/og-image.png
```
（需要先 `bun add -D playwright`）

## 验证

发布后用 Twitter Card Validator + Facebook Sharing Debugger 测：
- https://cards-dev.twitter.com/validator
- https://developers.facebook.com/tools/debug/

第一次会有缓存，加 `?v=2` query 强刷。

## EN 变体 — `src/app/(en)/opengraph-image.tsx`（dynamic）

2026-05-28 起，EN 路由(`/en`、`/en/e/[slug]`、`/en/partner`)全部由 `next/og` `ImageResponse` 动态渲染。统一标题 "Done Following."，subhead 抽自 `(en)/layout.tsx` 的 DESCRIPTION 字符串 —— 代码 = single source of truth，不再有 EN PNG。

ZH 路由仍用静态 `public/og-image.png`（主权/国运叙事对 ZH 受众仍 work，见 `strategy-12mo.md` Anti-roadmap，不要因 EN 改了就推到 ZH）。

### 改 EN OG 文案

直接改 `src/app/(en)/opengraph-image.tsx` 里的 JSX，push → Vercel 自动 redeploy。无需 design tool，无需 PNG 同步。

### 改 ZH OG 文案

走 Figma / Playwright 截图，导出到 `public/og-image.png`，Twitter Card Validator + Facebook Debugger 带 `?v=N` 强刷。

### 验证

部署后:
- https://cards-dev.twitter.com/validator（对 `dsnb.help/en` 和 `dsnb.help` 各跑一次）
- https://developers.facebook.com/tools/debug/
- `?v=N` 强刷缓存
