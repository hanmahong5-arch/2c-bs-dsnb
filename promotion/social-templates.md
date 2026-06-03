# dsnb.help 推广文案模板

> 三平台格式与字数限制不同，每条已校对实际限制。不替你发。所有 link 用 `https://dsnb.help`。
> **HN / Reddit 发车走 `hn-launch.md`（canonical playbook）**，本文只覆盖中文社交平台。

---

## 1. 小红书（图文）

**标题**（≤ 20 字，关键词靠前）: `我用 DeepSeek 给 DeepSeek 写了个故事`

**正文**（500-1000 字效果最佳，自加 emoji 间隔）:
```
最近做了一个有意思的小项目。
想给 DeepSeek 写一个故事——从 2023 年幻方量化的内部立项，到 2025 年那场让英伟达单日蒸发 5890 亿美元的 R1 时刻。
但写着写着我意识到——为什么不让 DeepSeek 自己写？
于是这个站的内容，一大半是 DeepSeek-V4-Pro 写的。它讲自己的故事，比我讲得更好。
dsnb.help · 一个情感叙事时间线
里面有一个一键按钮，把 DeepSeek 接入我自己写的桌面工具 Switch，不用复制配置，不用改 endpoint，点一下就能用。
我把这个工具叫 Switch——因为它就是个 AI 模型的开关。本地、开源、免费。
这条鱼，还在游。
```
**标签**: `#DeepSeek` `#AI工具` `#开源` `#程序员日常` `#技术故事` `#AI 模型` `#桌面工具`
**封面图**: dsnb.help hero 截图（DeepSeek 蓝渐变 + whale SVG）+ 大字"深海鲸鱼，怎么飞上星空"。

---

## 2. B 站

**短视频脚本**（60-90 秒，竖屏）:
```
[Hook 0-3s] "如果让 DeepSeek 给自己写一个故事，会是什么样？"（画面：dsnb.help 首页滚动）
[Body 3-50s] "这个站，一半内容是 DeepSeek-V4-Pro 写的。
  2023 年 7 月 幻方量化内部立项。
  2024 年 5 月 DeepSeek-V2 发布，推理成本降 93%。
  2024 年 12 月 V3 用 557 万美金训出，超过 GPT-4o。
  2025 年 1 月 R1 那一晚，英伟达蒸发 5890 亿美元。"（时间线滚动 + 数据 highlight）
[CTA 50-90s] "我做了个桌面工具 Switch，可以一键接入 DeepSeek。点开 dsnb.help 按那个按钮就行。开源，免费，链接在简介。"（deeplink 按钮特写 → 跳转 Switch）
```
**动态文案**（≤ 233 字）:
```
让 DeepSeek 自己写自己的故事——一个用 V4-Pro 生成情感叙事的实验。
时间线、产品、转折点全部一站式呈现，配套一个一键接入的桌面工具。
地址：dsnb.help
故事的一部分，是模型自己写的。这是我能想到的最好的 dogfooding。
```

---

## 3. Twitter / X（中英双发，各 ≤ 280 字符）

中文:
```
让 DeepSeek 给自己写故事，会是什么效果？
dsnb.help —— 一个用 DeepSeek-V4-Pro 生成的中文叙事时间线，从幻方量化内部立项到 R1 撼动硅谷。
附带一键 deeplink，把 DeepSeek 接入开源桌面工具 Switch。
代码全开源。这条鱼，还在游。
#DeepSeek #OpenSource
```
English:
```
What happens when DeepSeek writes its own story?
dsnb.help — an emotional timeline of DeepSeek's rise, narrated by DeepSeek V4-Pro itself.
One-click deeplink installs the model into Switch, our open-source desktop AI gateway.
The whale that flew. 🐋
#DeepSeek #OpenSource #AI
```

---

## 4. 微信朋友圈（极短，配 1-3 张产品截图）
```
让 DeepSeek 给自己写一个故事——dsnb.help
一半内容是它自己写的。
这条鱼还在游。
```

---

## 发布节奏

| Day | 平台 | 重点 |
|-----|------|------|
| D0 | 朋友圈 | 暖场，自己人先看 |
| D0 | Twitter 中英双发 | 第一波技术圈触达 |
| D1 | 小红书 | 主战场，争 24h 内 100 赞触发推荐 |
| D1 | B 站动态 + 短视频 | 流量长尾 |
| D2 | Hacker News + Reddit | 走 `hn-launch.md` |
| D7 | 复盘数据 → 二次内容 | 用引流数据本身做素材 |

## 监测
- dsnb.help 访问 IP / referer（Vercel Analytics）
- Switch 下载量（GitHub Releases 计数）
- deeplink 唤起成功率（Switch 后端可加埋点，目前未接）
- 关键词排名：「DeepSeek 故事」「DeepSeek 时间线」「DeepSeek 桌面工具」

## 风险提示
- 不用「国之光」「打败美国」这类民族主义词（会挡掉不同立场用户）。
- 不把 dsnb（DeepSeek 牛逼）显式拆成口号——做会心一笑的彩蛋。
- HN 不用过于煽情的中文翻译（对营销味敏感）。
