# SEO / GEO 基线（2026-05-28 状态）

落地页冷启动期 7 项 baseline 现状。已迁 Vercel，原 Caddy / HSTS preload 不再适用。

## 已就位 ☑

- ☑ `<title>` + `<meta description>` — `(zh)/layout.tsx` + `(en)/layout.tsx`，两份本体独立
- ☑ Open Graph + Twitter Card — ZH 静态 PNG，EN dynamic（`(en)/opengraph-image.tsx`），见 `og-image-spec.md`
- ☑ `metadataBase: https://dsnb.help` — 相对 URL 自动绝对化
- ☑ `lang="zh-CN"` + `lang="en"` 双 route group，各自 hreflang alternates
- ☑ Mobile viewport meta（Next.js 默认注入 + 显式 `viewport` export）
- ☑ App Router 默认 SSR / SSG → 100% server-rendered HTML（爬虫友好）
- ☑ `public/robots.txt` — Allow all + sitemap 指向
- ☑ `src/app/sitemap.ts` — home / partner / 15 events × 2 locale，全 hreflang alternates
- ☑ JSON-LD 结构化数据 — `Article` schema 两 layout 各自注入；每个 event 页注入 `NewsArticle`
- ☑ GEO answer-capsule — 15 个 event 页都有 50–60 词的 `lede` 字段（LLM 引用最强 predictor，详见 `strategy-12mo.md` P0/P1）

## 仍要做 ☐

### 1. ☐ 提交搜索引擎（用户动作，不在代码里）

| 引擎 | 入口 |
|------|------|
| Google Search Console | https://search.google.com/search-console |
| Bing Webmaster Tools | https://www.bing.com/webmasters |
| 百度站长 | 需 ICP，`.help` 无 → 跳过 |

直接交 `https://dsnb.help/sitemap.xml`。

### 2. ☐ Vercel Analytics / Speed Insights 仪表盘

代码里已注入 `@vercel/analytics/next` + `@vercel/speed-insights/next`。需要在 Vercel project 控制台开 Analytics tab 才能看到数据流。

### 3. ☐ AI 爬虫显式 allow（可选 GEO 增强）

`robots.txt` 当前 `User-agent: *` 已涵盖所有合规爬虫。如要显式 allow GPTBot / ClaudeBot / PerplexityBot / Google-Extended，加专属段（无功能差别，但向 AI 厂商发出 "我欢迎被引用" 的明确信号）。

## 关键词目标

- 主词：`DeepSeek` `DeepSeek story` `DeepSeek timeline` `DeepSeek 故事`
- 长尾：`DeepSeek V4` `DeepSeek 1.6T` `Liang Wenfeng quant fund` `open-source frontier model` `DeepSeek sovereignty` `DeepSeek API price`

通过 hero / 15 个 lede / intro / closing 自然铺词，不堆砌（详见 `strategy-12mo.md` Anti-roadmap：堆词反扣分，GEO 看结构 + 原创数据）。
