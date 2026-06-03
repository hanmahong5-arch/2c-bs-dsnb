# OG / 分享卡图片规范

落地页 `layout.tsx` 声明 `images: ["/og-image.png"]` → 文件放 `public/og-image.png`。

## 规范
- 尺寸 **1200×630 px**（1.91:1，Twitter/OG 通用）；大小 ≤ 200 KB（PNG/JPG）；四周安全区各留 60 px。

## 视觉
```
eyebrow:  DSNB · DeepSeek 牛逼          (色 #4D6BFE)
headline: 深海鲸鱼，怎么飞上星空        (大字, DeepSeek 蓝 #4D6BFE 主色)
subhead:  一个由 DeepSeek 自己讲述的情感叙事时间线
🐋 dsnb.help
背景: linear-gradient 135deg #0A0E27 → #1E40AF → #0A0E27 (深 navy → DeepSeek 蓝)
配饰: 右下角简笔鲸鱼 SVG（与站点 hero 同款）
字体: 思源黑体 Heavy(中) + Inter Bold(英)；标题 #FFFFFF / 副标题 #94A3B8 / eyebrow #4D6BFE
```

## ZH OG（静态 PNG）— 生成方式（任选）

**A. Figma/Sketch 手作（推荐）** — 用上面的模板字段导出 `public/og-image.png`。

**B. Next.js OG Image API（动态）** — 建 `src/app/api/og/route.tsx`（`runtime="edge"`，返回 `ImageResponse`，1200×630），layout.tsx 改 `images: ["/api/og"]`。适合频繁改文案。

**C. Playwright 截图（最简单）**:
```bash
bun add -D playwright
bun run build && bun run start &
sleep 3
bunx playwright screenshot --viewport-size=1200,630 \
  --full-page http://localhost:3000 public/og-image.png
```

> ZH 路由仍用静态 PNG（主权/国运叙事对 ZH 受众仍 work，见 `strategy-12mo.md` Anti-roadmap，不要因 EN 改了就推到 ZH）。改 ZH 文案走 Figma/Playwright → 导出 `public/og-image.png`。

## EN OG（dynamic）— `src/app/(en)/opengraph-image.tsx`

2026-05-28 起 EN 路由（`/en`、`/en/e/[slug]`、`/en/partner`）全部由 `next/og` `ImageResponse` 动态渲染。统一标题 "Done Following."，subhead 抽自 `(en)/layout.tsx` 的 DESCRIPTION 字符串（代码 = single source of truth，无 EN PNG）。改 EN 文案：直接改该 `.tsx` 的 JSX → push → Vercel 自动 redeploy（无需 design tool / PNG 同步）。

## 验证（部署后）
- Twitter Card Validator: https://cards-dev.twitter.com/validator（对 `dsnb.help` 和 `dsnb.help/en` 各跑一次）
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- 首次有缓存，加 `?v=N` query 强刷。
