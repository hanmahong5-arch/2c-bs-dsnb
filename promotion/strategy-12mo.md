# dsnb.help — 12-month commercial strategy

写于 2026-05-20。基于三路 web research(市场叙事 / 转化模式 / 流量获取)
+ 三轮 ship(round 1 commercial CTA、round 2 partner funnel、round 3 narrative refresh)
后的收敛判断。**这份文档不是计划,是判断 —— 每次回到这个项目前先读一遍,避免短视决策。**

---

## 核心判断:这是一份出版物,不是落地页

dsnb.help 当前架构是"narrative landing page",底层逻辑:
访客读故事 → 爱上 DeepSeek → 下载 Switch / 申请 reseller。

这个逻辑表面顺畅,实质有缺陷:

- 看 DeepSeek 故事的人 ≠ Switch 桌面客户端的买家
- Switch 的独特价值(主权数据路由)瞄向合规焦虑的 EU SMB,**不是**故事读者
- Reseller 项目要先有 reseller、reseller 要先有买家 —— 鸡生蛋问题

**真正的远见框架**:把 dsnb.help 当**出版物**经营。
- 唯一英文世界深度叙事 DeepSeek 的 primary-source 站点 → 长期 SEO / GEO / 引用资产
- 订阅者(newsletter)是真正复利的资产,不是 Switch 下载量
- Switch 与 reseller 是**变现的下游**,不是站点存在的目的

成功画面(12 个月后):
- 5–10k newsletter 订阅者
- DeepSeek 相关英文 LLM 引用中 dsnb.help 出现在 top-10
- 资产可以多种方式变现 —— Switch 只是其中之一,可能不是最大的那种

---

## 已经做完的(2026-05-20 状态)

| Round | Ship | 内容 |
|-------|------|------|
| 1 (6562fe6) | reseller CTA + Resend newsletter + 404 | 商业漏斗的桥梁 |
| 2 (399cc16) | /partner landing + Hero hint + bilingual OG + platform-detect download | 漏斗闭环 |
| 3 (3ea76f5) | scripts/ship.sh 一键发车 | 流程固化 |
| 4 (15d5074) | V4 event + sovereignty positioning + 30 lede capsules | 叙事刷新 + GEO 结构 |
| 5 (6ccdeb2) | promotion/hn-launch.md | 发车 playbook |
| 6 (本次) | dynamic EN OG + 正确的 EN metadata + 本文档 | launch-ready |

**站点本体功能已经够了。下一步不是加 feature,是加内容 + 验证假设。**

---

## 12 个月 bet,按优先级

### 立刻可做(P0 · 本周 / 下周)

1. **发车 HN + Reddit + X**
   按 `promotion/hn-launch.md` 操作。这是验证假设的第一手数据 ——
   "narrative + bilingual + sovereignty + V4 timing" 这套组合
   到底能不能换回流量。**没有这个数据,后续所有 bet 都是猜测。**

2. **EN OG validator 强刷**
   发车前用 Twitter Card Validator + Facebook Debugger 验证 EN OG 已变。
   `?v=2` 强刷缓存。

### 短期(P1 · 1–2 个月)

3. **Newsletter 高质量周更/双周更**
   一旦发车后有订阅者,**必须**有内容跟上。否则订阅者死寂。
   建议节奏:DeepSeek 大动作就发,无大动作每两周写一篇深度。
   形式:200–500 字 + 一个观察 + 一个数据 + 一个链接。
   工具:Resend(已就位)+ 静态写在 `src/content/newsletter/` 或 Substack 转 RSS。

4. **每个 DeepSeek 大动作 24h 内更新 timeline**
   这是 dsnb.help 成为权威源的唯一路径 —— **比维基百科快、比 ChinaTalk 详细、比官方更有叙事**。
   每次更新都触发 RSS,自动推送订阅者。
   ship 流程已固化:加事件 → `./scripts/ship.sh "feat(dsnb): event 2026-XX"`。

### 中期(P2 · 3–6 个月)

5. **程序化 SEO 页 `/en/model/[name]`**
   每个 DeepSeek 模型一页:Coder / V2 / V3 / R1 / V3.1 / V4。
   内容:技术 spec + 训练成本 + 性能对比 + 何时该用 + 历史背景链接 timeline event。
   目标关键词:"DeepSeek V3 specs"、"DeepSeek R1 vs o1" 等高 intent 词。
   预期:每个 model 页可吃 100–1000 月独立 UV(看 SEO 速度)。

6. **"DeepSeek vs X" 对比页**
   `/en/vs/openai`、`/en/vs/claude`、`/en/vs/llama`。
   高 intent search 词。承担 funnel 中段的"我在考虑用谁"决策点。
   注意:此处可以光明正大引荐 Switch 作为"试一下不同模型的工具"。

7. **付费 newsletter tier (Resend / Substack 都可)**
   一旦免费订阅破 1k,加付费层($5/月或 $50/年):
   - 实时 DeepSeek 模型权重对比表
   - 独家访谈 / 深度 essay
   - 早期访问新 timeline event
   验证读者愿意付钱才能确认这是出版物。

### 长期(P3 · 6–12 个月)

8. **横向扩展到其他 AI 实验室**
   一旦"DeepSeek 叙事权威"地位坐实,扩展到:
   - `/lab/anthropic` —— Anthropic 的 Claude 演进史
   - `/lab/openai` —— OpenAI 从非营利到 IPO
   - `/lab/mistral` —— 欧洲开源故事
   每个 lab 是 dsnb.help 的扩展,**不**另开域名(SEO 集中)。
   品牌进化:`dsnb.help` → "Done Following" → 把它从 DeepSeek slug 变成
   抽象的"AI lab narrative" 子品牌。

9. **Switch 作为读者社区工具**
   到此为止 Switch 的角色:**不是变现主力,而是社区的"开发者套件"**。
   订阅者中下载 Switch 的人 = 真用户 = reseller / 大客户 / 投资 lead 池。
   把 Switch 重新定位成"dsnb.help 读者的工具",不是反过来用 dsnb 卖 Switch。

10. **LurusTech 品牌母舰**
    一旦 dsnb 站点流量起来,把它作为 LurusTech 集团旗下"内容品牌"明确定位:
    LurusTech = (Switch 产品)+ (dsnb 内容)+ (Lurus.cn 母站)
    这个组合让单独任何一个 product 都拥有不公平优势 —— 内容流量给产品,
    产品故事填内容,故事变现支持内容。

---

## 明确不做的(Anti-roadmap)

- **不**做 "Why Switch" 加 section —— Agent B 数据:"Multiple simultaneous CTAs (3+): -260% conversion"。当前 4 个 CTA 已经在上限。
- **不**做 in-page interactive demo —— 4–6 周开发 vs 间接 ROI,优先级低于内容。
- **不**做 Mac/Linux Switch 二进制 —— 由 lurus-switch 团队决定,不是 dsnb 范围。
- **不**改 ZH 叙事的"国运"框架 —— Agent A 数据:对 ZH 受众该框架未死,只对 EN 受众失效;EN 已切到 sovereignty/efficiency。**不要因为 EN 改了就推到 ZH**。
- **不**多语种(JP/KO)—— 等 EN 列表破 1k 再考虑。
- **不**为了 SEO 关键词密度堆词 —— GEO 优化看结构(answer capsule)和原创数据,关键词无用。
- **不**做付费广告 —— 出版物的杠杆是 organic,广告破坏信任。

---

## 监控的信号(每月看一次)

| 指标 | 工具 | 目标 1 个月 | 目标 6 个月 | 目标 12 个月 |
|------|------|------------|------------|--------------|
| Newsletter 订阅 | Resend dashboard | 50 | 500 | 5000 |
| 月独立 UV | Vercel Analytics | 500 | 5000 | 50000 |
| LLM 引用(自查) | ChatGPT / Claude / Perplexity 搜"DeepSeek story" | 偶现 | 经常 | top-10 命中 |
| Switch 下载 | GitHub release downloads | 50 | 500 | 5000 |
| Reseller 申请 | `/api/partner-apply` Resend audience #3 | 5 | 50 | 500 |
| Timeline event 数 | git ls timeline.json | 16 | 22 | 30 |

**每个数字达不到都要诚实检查为什么** —— 假设错了就改假设,不要硬上 vanity metric。

---

## 决策框架(下次回来这个项目时用)

每次要做新东西前,问自己:

1. **这是给出版物加内容,还是给 funnel 加 CTA?** 出版物 → 做。CTA → 拒绝(已饱和)。
2. **6 个月后这个还在产生价值吗?** 是 → 做。否 → 看是不是冲流量,是就做、不是就拒绝。
3. **它增加还是减少 dsnb.help 的"权威感"?** 增加 → 做。减少 → 拒绝。
4. **不做它,品牌还能 work 吗?** 能 → 优先级 P2 以下。不能 → P0/P1。

---

## 关联文档

- `promotion/hn-launch.md` — 发车手册(P0 立即可执行)
- `promotion/og-image-spec.md` — OG 卡规范(EN 现已动态,ZH 仍静态)
- `promotion/seo-checklist.md` — SEO 与 GEO 检查
- `promotion/social-templates.md` — 社交分发模板
- `CLAUDE.md` — 项目级 dev 规则
- `lurus.yaml` — Lurus 体系架构 SoT
- `scripts/ship.sh` — 一键发车脚本

下次任何 session 接手 dsnb.help 时,**先读本文档**,再决定做什么。
