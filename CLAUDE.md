# dsnb.help (2c-bs-dsnb)

"DeepSeek 的故事 — 从海底到星空" 情感叙事单页营销站，推 Switch 桌面应用作为一键接入工具。Lurus Web 产品组 (P2)。domain `dsnb.help`（`.help` 无 ICP，**不上 CN IDC**，Vercel 托管，push main 自动部署）。Next.js 16 / React 19 / Tailwind 4 / Bun。

## Commands

```bash
bun install
bun run dev / build / lint

./scripts/ship.sh "feat(dsnb): xxx"            # lint + build + safe-stage + commit + push
bunx vercel --prod                             # 手动 redeploy (一般 push 即可)
bunx vercel domains add <subdomain>.dsnb.help  # 绑子域 (再去 aliyun-dns 加 A 记录 76.76.21.21)
```

> 真源/细节: `timeline.json` 是内容真源(改文案改 JSON 勿写死组件) · Switch 仓 = `LurusTech/lurus-switch`(旧 owner 勿用) · 营销文案克制勿堆民族主义 · `/vercel-deploy` `/cn-idc-icp` `/aliyun-dns` `/gh-release` skill。
