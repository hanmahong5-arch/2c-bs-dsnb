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

## EN 变体 — `public/og-image-en.png`

`(en)/layout.tsx` 与 `(en)/en/e/[slug]/page.tsx` 已切到 `/og-image-en.png`，给海外社交分享一张英文卡。两份 PNG 都是 `public/` 下的静态资源。

### 文案

```
┌────────────────────────────────────────────┐
│                                            │
│   eyebrow:  DSNB · LurusTech              │
│                                            │
│   headline:  The DeepSeek Story            │
│   (大字，DeepSeek 蓝 #4D6BFE 主色)         │
│                                            │
│   subhead:   From hedge fund to            │
│              open-source frontier          │
│                                            │
│   ─────────────────────                   │
│                                            │
│   🐋 dsnb.help                            │
│                                            │
└────────────────────────────────────────────┘
```

视觉规范与中文版一致（背景渐变、安全区、字体颜色），只替换文字。

### ⚠️ 当前状态

EN PNG **目前是 ZH 版本的复制**——只为避免 EN 路由 OG 404、CI 保持绿色。海外社交分享卡现在仍显示中文。下一次设计 pass：

- Figma：复用同一模板，仅替换中文文字为上面英文版
- 或 Playwright：单独建一个 EN-only 的 hero 截图源页（注入英文文案后截图）

替换后此条警告删掉。

### 再生工作流（两份 PNG 同步更新）

文案改动时：
1. 改 Figma 模板里两个 artboard（中/英）
2. 各导出 1200×630 PNG 到 `public/og-image.png` 和 `public/og-image-en.png`
3. 跑 Twitter / Facebook validator（带 `?v=N` 强刷）

如果改 Playwright 截图路线，需要为 EN 单独跑一次，参数指向 `?locale=en` 之类的预览页。

### 未来方向（已 defer）

迁到 `next/og` `ImageResponse` 可以让 OG 跟着 content JSON 动态变；当前流量未到那一步，先 ship 两张静态卡。
