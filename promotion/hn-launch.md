# HN / Reddit launch — dsnb.help

发车手册。来源:2026-05 三路 web research(市场叙事 / 转化 / 分发)收敛结论 ——
零流量站点最高 ROI 是 Show HN + Reddit,前提是 narrative refresh 已 ship(commit `15d5074`)。

## Why this artifact works on HN

- 双语 + primary-source 情感叙事,HN 没见过这个具体形态(不是 benchmark 对比)。
- front-page HN 帖 48h 内会被 tech blog 反链 → 给零 DA 的新域名加权。
- HN 内容被 Perplexity / Claude 重度索引引用 → 长尾 GEO 价值,不只是一波流量。

---

## Show HN

**Title**(HN 上限 80 字符):
```
Show HN: The DeepSeek Story — bilingual emotional timeline, 15 events
```

**URL**: `https://dsnb.help/en`

**Submit**: https://news.ycombinator.com/submit

**First comment**(发完 30 分钟内贴,解释 craft,不要在标题里推产品):
```
I built dsnb.help as a primary-source emotional timeline of DeepSeek's
history — from Liang Wenfeng's quant fund in 2015 to V4 Preview in
April 2026. Fifteen events, each with a 60-word lede + a 150-word
narrative + source links. Fully bilingual (ZH + EN), per-event OG
images, RSS feeds for both locales.

The craft choice I made: most coverage of DeepSeek treats it as a
benchmark race. That misses the part that actually rewires the
industry — a hedge fund that bought 10,000 A100s for trading, then
spun out an AGI lab, then said "we have no KPIs" and started giving
the weights away. So I tried to write it as a story instead of a
spec sheet, but with hard citations on every event.

The bilingual angle matters because the source material is split:
the human story (Liang interviews, founding letters, 36Kr coverage)
mostly exists in Chinese; the global reaction (Nvidia $600B day,
arXiv discussion, EU compliance debates) mostly in English. I wanted
one artifact that didn't force readers to pick a language.

Tech: Next.js 16 + Tailwind + bilingual route groups, hosted on Vercel.
Sources are all in the public domain — Wikipedia, arXiv, Bloomberg,
CNBC, Fortune, ChinaTalk, 36Kr. No paywalled material.

(I also make a desktop client called Switch that bundles DeepSeek
access — that's mentioned at the bottom of the page. Not the point
of this post, but happy to answer questions if anyone's curious.)
```

---

## Reddit(同周,二级动作)

**Subs**: r/LocalLLaMA, r/MachineLearning

**Title**:
```
I built a primary-source bilingual timeline of DeepSeek's history —
curious what you think about the narrative arc
```

**Body**: 复用 first comment 的前两段,去掉 Switch 括号(Reddit 对自推更敏感)。
末尾加一句 "Source links on every event, no paywall — would love corrections
if I got any dates/numbers wrong."

> Reddit 是 LLM 引用第一大域名 —— 即使流量不爆,也是 durable 的 citation surface。

---

## 时机 & 监控

| 项 | 值 |
|---|---|
| 日期 | 周二 / 周三 |
| 时间 | US Eastern 9–11am(= 北京 22:00–00:00) |
| 监控 | https://news.ycombinator.com/show |
| 判定 | 发后 30 min 没破 front page → 这次大概过了,**别开二号刷**(HN 反 vote ring,封域名) |

---

## 发车前自查

- [ ] `dsnb.help/en` 线上是新 hero copy(`$5.6M trained the model that toppled Nvidia…`)
- [ ] 随便点一个 event(如 `/en/e/2024-12-26-v3`)能看到左边框的 lede capsule
- [ ] `/en` OG 卡 = `og-image-en.png`(注:目前仍是 ZH 复制,见 `og-image-spec.md`;
      若赶在 EN OG 设计 pass 前发车,分享卡会显示中文 —— 可接受但非理想)
- [ ] HN 账号 karma 不为 0(全新账号发 Show HN 易被 auto-dead)

> ⚠️ OG 卡是当前唯一短板。要么先补 EN OG 渲染,要么接受首发分享卡是中文。
