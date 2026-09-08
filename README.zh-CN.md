[English](./README.md)

# dsnb.help

一个中英双语的叙事型网站，讲述一家开源大模型公司的崛起故事，并把读者导流到 Lurus 的桌面大模型网关客户端 Switch。

## 这是什么

`dsnb.help` 是一个以内容为核心的营销站：一条跨越四个「时代」的长篇叙事时间线、一套面向不同读者深度（小学生 → 中学生 → 工程师 → 研究者）的四级递进技术讲解、精选书单与引述索引，外加订阅与分销合作伙伴招募漏斗。每个页面都有独立的中文版与英文版，分别位于两个 Next.js 路由组下。站点自身的转化目标是让读者下载 **Switch**——Lurus 的桌面大模型网关客户端；对已装机的回访用户，还能通过 `switch://` 深链一键导入一个预配置好的服务商预设。

这是一个已上线、真实交付的产品（有独立域名、RSS 订阅、动态 OG 图生成、访问分析），不是原型。仓内没有自动化测试（`package.json` 只定义了 `dev`/`build`/`start`/`lint` 四个脚本）；`bun run lint && bun run build` 是发布前的验证闸（见 `scripts/ship.sh`）。

**部署说明**：平台服务台账（`lurus.yaml`）记载当前生产落点是 Vercel，push `main` 自动部署，且已于 2026 年 6 月从自托管迁出（`.help` 顶级域受 ICP 限制，无法落 CN IDC）。本仓依然保留着迁移前的自托管部署配方（`Dockerfile`、推 GHCR 的 `.github/workflows/build-and-push.yml`、`deploy/docker-compose.yml` + `deploy/nginx-dsnb.conf`）——应视为已记录在案的备用/历史路径，而非当前主路径。

## 核心能力

- **语言路由** — `/` 按 `Accept-Language` 请求头重定向到 `/zh` 或 `/en`，两种语言各自位于独立的 Next.js 路由组（`src/middleware.ts`；`src/app/(zh)/`、`src/app/(en)/en/`）。
- **内容即数据的叙事时间线** — 四个时代的故事条目，逐条事件有动态 OG 图与 RSS 订阅，全部从双语 JSON 加载，从不写死在组件里（`src/content/timeline.{zh,en}.json`；`src/lib/content.ts`；`src/app/(zh)/e/[slug]/opengraph-image.tsx`；`src/app/(zh)/rss.xml/route.ts`、`src/app/(en)/en/rss.xml/route.ts`）。
- **四级递进讲解** — 每个主题都有小学生/中学生/工程师/研究者四个分页，共 4 个主题覆盖底层架构与商业叙事（`src/content/explain-topics.{zh,en}.json`；`src/components/ExplainLevelTabs.tsx`；层级顺序与配色定义在 `src/lib/content.ts:188-209`）。
- **术语表、引述、书单** — 5 个概念条目（仅英文，仓内没有 `concepts.zh.json`）、8 条双语精选引述、18 条带注释的书目（`src/content/concepts.en.json`、`src/content/quotes.*.json`、`src/content/reading-list.*.json`；`src/components/ConceptIndex.tsx`、`QuotesSection.tsx`、`ReadingListSection.tsx`）。
- **Switch 转化漏斗** — 按操作系统给出下载链接，并提供 `switch://import` 深链，把一份 base64 编码的服务商预设（`baseUrl` 指向 Lurus 自家 `newapi.lurus.cn` 网关）直接递给桌面客户端，深链未响应时有兜底提示（`src/lib/platform.ts`；`src/components/SwitchCTA.tsx`、`ClosingCTA.tsx:13-19`）。
- **订阅 + 合作伙伴报名** — 两个由 Resend 联系人/受众支撑的 API 路由，均以带类型的错误（`invalid`/`config`/`upstream`）优雅失败，环境变量缺失时不会导致构建失败（`src/app/api/subscribe/route.ts`；`src/app/api/partner-apply/route.ts`）。

## 快速开始

```bash
bun install

cp .env.example .env.local   # 可选：填 RESEND_* 以在本地真实跑通表单

bun run dev                  # http://localhost:3000
bun run lint
bun run build
bun run start
```

仓内没有自动化测试命令；`lint` + `build`（即 `scripts/ship.sh` 所跑的两步）是发布前的验证闸。

## 架构

```
src/
├─ middleware.ts         # "/" 按 Accept-Language 重定向到 /zh 或 /en
├─ app/
│  ├─ (zh)/              # 中文路由组：首页、explain、era、event、quotes、reading-list、partner、rss.xml
│  ├─ (en)/en/           # 英文路由组：镜像 (zh)，外加 /en/concepts（仅英文的术语表）
│  └─ api/
│     ├─ subscribe/      # POST — 订阅（Resend）
│     └─ partner-apply/  # POST — 合作伙伴报名 + 运营人邮件通知
├─ components/           # Hero、Timeline、ExplainLevelTabs、SwitchCTA、ClosingCTA、PartnerApplicationForm 等
├─ content/               # 内容即数据：timeline / quotes / reading-list / explain-topics（双语 JSON 对）；concepts（仅英文）
└─ lib/
   ├─ content.ts         # 带类型的双语内容加载器（JSON 格式有误时构建直接报错）
   ├─ platform.ts        # 操作系统探测 -> Switch 下载链接
   ├─ rss.ts             # RSS 订阅生成
   └─ track.ts           # Vercel Analytics 事件名 — 转化漏斗的唯一真源
deploy/                  # 历史自托管部署配方：docker-compose + nginx（R6）
scripts/ship.sh          # lint + build + 安全 stage（跳过 .env*/credentials/*.pem/*.key）+ commit + push
```

## 配置

以下变量均来自 `.env.example`；`bun run build` 不依赖任何一个 —— 它们只在请求时门控两个 API 路由。

| 变量 | 是否必填 | 默认值 | 说明 |
|---|---|---|---|
| `RESEND_API_KEY` | 否 | — | Resend API key；缺失时两个 API 路由都返回 `config` 错误而非构建失败（`route.ts` 内的优雅降级路径）。 |
| `RESEND_AUDIENCE_ID_ZH` | 否 | — | 中文站订阅所用的 Resend 受众。 |
| `RESEND_AUDIENCE_ID_EN` | 否 | — | 英文站订阅所用的 Resend 受众。 |
| `RESEND_AUDIENCE_ID_PARTNER` | 否 | — | 合作伙伴报名所用的 Resend 受众；提交成功后还会触发一封写死在源码里的运营人通知邮件。 |

## 路由

| 路径（中文） | 路径（英文） | 内容 |
|---|---|---|
| `/zh` | `/en` | 首页 — hero、时间线、产品提及、Switch CTA |
| `/explain`、`/explain/[slug]` | `/en/explain`、`/en/explain/[slug]` | 四级深度讲解主题 |
| `/era/[era]` | `/en/era/[era]` | 分时代时间线索引（共 4 个时代）|
| `/e/[slug]` | `/en/e/[slug]` | 单条时间线事件详情，带动态 OG 图 |
| — | `/en/concepts`、`/en/concepts/[slug]` | 术语表（仅英文）|
| `/quotes` | `/en/quotes` | 引述索引 |
| `/reading-list` | `/en/reading-list` | 带注释的推荐书单 |
| `/partner` | `/en/partner` | 分销合作伙伴申请落地页 |
| `/rss.xml` | `/en/rss.xml` | 时间线的 RSS 订阅 |
| `POST /api/subscribe` | | 订阅 |
| `POST /api/partner-apply` | | 合作伙伴报名 |

## 开发约定

以下摘自本仓自己的开发约定文档与代码注释——仓内没有单独的 `CONTRIBUTING` 文件：

- 改文案改 `src/content/` 下的双语 JSON，不要写死进组件（`src/lib/content.ts:1-3`）。
- 营销文案风格刻意克制，避免民族主义式表达。
- Switch 的上游仓是 `LurusTech/lurus-switch`；旧仓 owner 已作废，不要再引用。
- `scripts/ship.sh "commit message"` 是标准发布路径：先看 git 状态 → `bun run lint && bun run build` → 逐路径安全 stage（跳过 `.env*`/credentials/`*.pem`/`*.key`）→ commit → push。push 后约 30 秒 Vercel 自动部署完成。

## 相关项目

- **`2c-gui-switch`**（`LurusTech/lurus-switch`）— Lurus 的桌面大模型网关客户端。本站最核心的转化动作就是下载它的最新 GitHub Release；对已安装用户，还能通过深链把一份预配置的服务商预设直接导入进去（`src/lib/platform.ts:6-13`；`src/components/ClosingCTA.tsx:13-19`）。
- **`newapi.lurus.cn`** — Lurus 自家的大模型网关/代理服务。`switch://import` 深链的 base64 payload 把所导入服务商的 `baseUrl` 设为这个域名（`src/components/ClosingCTA.tsx:13-16`）。
- **Resend**、**Vercel Analytics / Speed Insights** — 均为第三方服务，非 Lurus 内部服务，分别支撑订阅/合作伙伴表单与漏斗埋点（见 `package.json` 依赖、`src/lib/track.ts`）。
