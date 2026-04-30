# dsnb.help (2c-bs-dsnb)

"DeepSeek 的故事 — 从海底到星空" 情感叙事单页营销站，推 Switch 桌面应用作为 DeepSeek 一键接入工具。Lurus Web 产品组 (P2)。

- Domain: `dsnb.help`（独立品牌站，与 lurus.cn 体系并行）
- Repo: `https://github.com/hanmahong5-arch/2c-bs-dsnb` (public)
- Hosting: **Vercel** (project `2c-bs-dsnb`, scope `hanmahong5-2845s-projects`)
- Auto-deploy: push to `main` → Vercel 自动 production 部署
- DNS: 阿里云解析，`@` + `www` → `76.76.21.21` (Vercel anycast)
- TLS: Vercel 自动签 LE 证（DNS 生效后 1-5 分钟）

> **历史决策**：项目最初部署在三丰云 R6 上，但 `.help` TLD 不能 ICP 备案，三丰云 SNI 拦截导致 dsnb.help 无法对外服务。已彻底迁出 R6 改 Vercel。详见 `cn-idc-icp` skill。

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router, `output: standalone`) |
| Runtime | Bun (本地) / Vercel runtime (生产) |
| UI | React 19 + Tailwind 4 + `@heroicons/react` |
| Animation | `framer-motion` 12 |
| Experimental | `viewTransition` 已启用 |
| SEO | `sitemap.ts` + `robots.txt` + `og-image.png` (Playwright 实拍) |

## Directory

```
src/
├── app/{layout,page,sitemap}.tsx + globals.css
├── components/{Hero,IntroSection,Timeline,ProductGallery,ClosingCTA,Footer}.tsx
├── content/timeline.json    # 15 timeline events + 8 products
└── lib/content.ts
public/{og-image.png, robots.txt}
promotion/{og-image-spec, seo-checklist, social-templates}.md
deploy/                       # 历史 R6 部署残留（已弃用，保留供学习参考）
```

## Commands

```bash
bun install
bun run dev                          # localhost:3000
bun run build && bun run start       # production
bun run lint

# 手动 redeploy 到 Vercel（一般不需要，push 即可）
bunx vercel --prod
```

## Deploy

主路径：**push to main** → GitHub Actions（如有）+ Vercel auto-deploy 双轨。

```bash
# 改完代码
git add . && git commit -m "..." && git push
# Vercel 大约 30 秒后 production 生效
```

监控部署状态：
```bash
bunx vercel ls --prod | head -5
```

域名管理（绑新子域）：
```bash
bunx vercel domains add <subdomain>.dsnb.help
# 然后到 aliyun-dns 加 A 记录指 76.76.21.21
```

## Switch 集成（用户漏斗的下一跳）

落地页 CTA 按钮：
- "下载 Switch" → `https://github.com/hanmahong5-arch/lurus-switch/releases/latest`
- "已有 Switch？一键导入" → `switch://import?type=provider&data=<base64url(preset)>` 协议唤起

deeplink data 形状对齐 `2c-gui-switch/internal/provider/preset.go` 的 `Preset` struct，base64url 编码后嵌在 `ClosingCTA.tsx` 的 `SWITCH_IMPORT_URL` 常量。

## Gotchas

- 占位 URL `lurus-dev/lurus-switch` 是错的，**必须**用 `hanmahong5-arch/lurus-switch`
- 营销文案不要堆民族主义口号（"国之骄傲"、"打败 X"等），保持自信但克制
- `timeline.json` 是数据真源，改文案改 JSON，**不要**写死在组件里
- Vercel hobby tier 流量上限 100GB/月，目前用量极低，到顶前会有邮件通知

## 关联 skill

- `vercel-deploy` — 部署相关问题排查
- `cn-idc-icp` — 为什么不能用 CN IDC（原因记录）
- `aliyun-dns` — DNS 改记录的具体命令
- `gh-release` — Switch 二进制发版（落地页下载链接的来源）

## BMAD

| Resource | Path |
|----------|------|
| Promotion specs | `./promotion/{og-image-spec,seo-checklist,social-templates}.md` |
| Deploy artifacts | `./deploy/README.md`（历史，已迁 Vercel） |
