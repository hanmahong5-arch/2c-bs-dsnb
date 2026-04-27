# SEO 上线检查表

落地页冷启动期，确保 7 项 baseline 到位。L2 已完成大部分，下面 ☐ 标记的是仍要做的。

## 已就绪 ☑

- ☑ `<title>` 与 `<meta description>` —— layout.tsx
- ☑ Open Graph + Twitter Card —— layout.tsx
- ☑ `metadataBase: https://dsnb.help` —— 让相对 URL 自动绝对化
- ☑ `lang="zh-CN"` —— 主语言信号
- ☑ Mobile viewport meta（Next.js 默认注入）
- ☑ Static export → 100% server-rendered HTML（爬虫友好）

## 仍要做 ☐

### 1. ☐ `public/og-image.png`（见 og-image-spec.md）

### 2. ☐ `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://dsnb.help/sitemap.xml
```

### 3. ☐ `src/app/sitemap.ts`（Next.js 自动生成 sitemap）

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dsnb.help",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
```

### 4. ☐ JSON-LD 结构化数据（追加到 layout.tsx 的 `<head>`）

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "DeepSeek 的故事 — 从海底到星空",
      url: "https://dsnb.help",
      description: "DeepSeek 情感叙事时间线 + Switch 一键接入。",
      inLanguage: "zh-CN",
    }),
  }}
/>
```

### 5. ☐ 提交搜索引擎

| 引擎 | 入口 |
|------|------|
| Google Search Console | https://search.google.com/search-console |
| Bing Webmaster Tools | https://www.bing.com/webmasters |
| 百度站长 | https://ziyuan.baidu.com（需 ICP，`.help` 没有 → 跳过） |
| 360/搜狗 | 国内搜索引擎，可选 |

直接交一次 sitemap.xml URL 即可。

### 6. ☐ Cloudflare Web Analytics 或 Plausible（可选，无 cookie）

如果不想用 Google Analytics（隐私），加个无 cookie 的访问统计。Caddy log 也够用，但 Caddy log 不区分 referer。

### 7. ☐ HSTS preload（上线 1 个月稳定后再加）

`Caddyfile` 已有 `Strict-Transport-Security: max-age=31536000; includeSubDomains`。
要加入 HSTS preload list，改成 `max-age=63072000; includeSubDomains; preload` 然后到 https://hstspreload.org 提交。

不急，先观察 1 个月没事再加（HSTS 不可逆，加错很麻烦）。

## 关键词目标

主词：`DeepSeek` `DeepSeek 故事` `DeepSeek 时间线`
长尾：`DeepSeek API 接入` `DeepSeek 桌面工具` `Switch DeepSeek` `DeepSeek 一键导入`

通过 hero / intro / closing 三段文案自然铺词，不堆砌。
