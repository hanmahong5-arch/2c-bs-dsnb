[中文](./README.zh-CN.md)

# dsnb.help

A bilingual (Chinese/English) narrative site telling the origin story of an open-weight AI lab, funneling readers into Lurus's desktop LLM client, Switch.

## What it is

`dsnb.help` is a content-driven marketing site: a scroll-length origin story (timeline across four eras), a progressive four-level explainer surface (kid → student → engineer → researcher) for the underlying technical concepts, a curated reading list and quote index, and a newsletter/reseller-partner funnel. Every page exists in a Chinese and an English version behind separate Next.js route groups. The site's own conversion goal is to get the reader to download **Switch**, Lurus's desktop LLM gateway client, and — for returning visitors who already have it installed — to one-click import a pre-configured provider preset pointing at Lurus's own gateway via a `switch://` deep link.

It is a live, shipped product (own domain, RSS feeds, OG image generation, analytics), not a prototype. It carries no test suite (`package.json` defines only `dev`/`build`/`start`/`lint`); `bun run lint && bun run build` is the pre-ship gate (see `scripts/ship.sh`).

**Deployment note:** the platform's service registry (`lurus.yaml`) records the current production home as Vercel, auto-deployed on push to `main`, having been migrated off a self-hosted setup in June 2026 (ICP restrictions on the `.help` TLD forced the move). This repo still carries the pre-migration self-hosted recipe (`Dockerfile`, `.github/workflows/build-and-push.yml` pushing to GHCR, `deploy/docker-compose.yml` + `deploy/nginx-dsnb.conf`) — treat it as a documented fallback/legacy path, not the current primary one.

## Core capabilities

- **Locale routing** — `/` redirects to `/zh` or `/en` based on the `Accept-Language` header; each locale lives in its own Next.js route group (`src/middleware.ts`; `src/app/(zh)/`, `src/app/(en)/en/`).
- **Content-as-data narrative timeline** — four eras of story entries with per-event dynamic OG images and RSS feeds, loaded from bilingual JSON, never hardcoded into components (`src/content/timeline.{zh,en}.json`; `src/lib/content.ts`; `src/app/(zh)/e/[slug]/opengraph-image.tsx`; `src/app/(zh)/rss.xml/route.ts`, `src/app/(en)/en/rss.xml/route.ts`).
- **Four-level progressive explainers** — kid/student/engineer/researcher tabs per topic, four topics covering the underlying architecture and business narrative (`src/content/explain-topics.{zh,en}.json`; `src/components/ExplainLevelTabs.tsx`; level order/colors in `src/lib/content.ts:188-209`).
- **Concept glossary, quotes, reading list** — five stub concept pages (English only — no `concepts.zh.json` exists), eight bilingual pull-quotes, eighteen annotated bibliography entries (`src/content/concepts.en.json`, `src/content/quotes.*.json`, `src/content/reading-list.*.json`; `src/components/ConceptIndex.tsx`, `QuotesSection.tsx`, `ReadingListSection.tsx`).
- **Switch funnel** — OS-aware download link plus a `switch://import` deep link that hands the desktop app a base64-encoded provider preset (`baseUrl` pointing at Lurus's own `newapi.lurus.cn` gateway), with a fallback prompt if the deep link doesn't resolve (`src/lib/platform.ts`; `src/components/SwitchCTA.tsx`, `ClosingCTA.tsx:13-19`).
- **Newsletter + partner intake** — two API routes backed by Resend contacts/audiences, both fail closed with a typed error (`invalid`/`config`/`upstream`) and neither crashes the build when env vars are unset (`src/app/api/subscribe/route.ts`; `src/app/api/partner-apply/route.ts`).

## Quick start

```bash
bun install

cp .env.example .env.local   # optional: fill RESEND_* to exercise the forms locally

bun run dev                  # http://localhost:3000
bun run lint
bun run build
bun run start
```

There is no automated test command in this repo; `lint` + `build` (as run by `scripts/ship.sh`) is the verification gate before shipping.

## Architecture

```
src/
├─ middleware.ts         # "/" -> /zh or /en by Accept-Language
├─ app/
│  ├─ (zh)/              # Chinese route group: home, explain, era, event, quotes, reading-list, partner, rss.xml
│  ├─ (en)/en/           # English route group: mirrors (zh), plus /en/concepts (EN-only glossary)
│  └─ api/
│     ├─ subscribe/      # POST — newsletter signup (Resend)
│     └─ partner-apply/  # POST — reseller lead + operator email notify
├─ components/           # Hero, Timeline, ExplainLevelTabs, SwitchCTA, ClosingCTA, PartnerApplicationForm, ...
├─ content/               # narrative content-as-data: timeline / quotes / reading-list / explain-topics (bilingual JSON pairs); concepts (EN only)
└─ lib/
   ├─ content.ts         # typed bilingual content loader (build fails loudly on malformed JSON)
   ├─ platform.ts        # OS sniff -> Switch download URL
   ├─ rss.ts             # RSS feed builder
   └─ track.ts           # Vercel Analytics event names — authoritative funnel event list
deploy/                  # legacy self-hosted docker-compose + nginx recipe (R6)
scripts/ship.sh          # lint + build + safe-stage (skips .env*/credentials/*.pem/*.key) + commit + push
```

## Configuration

All variables come from `.env.example`; none are required for `bun run build` to succeed — they only gate the two API routes at request time.

| Variable | Required | Default | Description |
|---|---|---|---|
| `RESEND_API_KEY` | No | — | Resend API key. Unset → both API routes return a `config` error instead of failing the build (`route.ts` graceful-degrade path). |
| `RESEND_AUDIENCE_ID_ZH` | No | — | Resend audience for Chinese-locale newsletter signups. |
| `RESEND_AUDIENCE_ID_EN` | No | — | Resend audience for English-locale newsletter signups. |
| `RESEND_AUDIENCE_ID_PARTNER` | No | — | Resend audience for partner/reseller leads; also triggers a hardcoded-in-source operator notification email on successful submit. |

## Routes

| Path (zh) | Path (en) | Content |
|---|---|---|
| `/zh` | `/en` | Home — hero, timeline, product mentions, Switch CTA |
| `/explain`, `/explain/[slug]` | `/en/explain`, `/en/explain/[slug]` | Four-level explainer topics |
| `/era/[era]` | `/en/era/[era]` | Per-era timeline index (4 eras) |
| `/e/[slug]` | `/en/e/[slug]` | Single timeline event, with dynamic OG image |
| — | `/en/concepts`, `/en/concepts/[slug]` | Concept glossary (English only) |
| `/quotes` | `/en/quotes` | Pull-quote index |
| `/reading-list` | `/en/reading-list` | Annotated bibliography |
| `/partner` | `/en/partner` | Reseller/partner application landing |
| `/rss.xml` | `/en/rss.xml` | RSS feed of timeline entries |
| `POST /api/subscribe` | | Newsletter signup |
| `POST /api/partner-apply` | | Partner/reseller lead |

## Development conventions

Pulled from this repo's own development-convention doc and code comments — no separate `CONTRIBUTING` file exists:

- Copy changes go into the bilingual JSON files under `src/content/`, not hardcoded into components (`src/lib/content.ts:1-3`).
- Marketing copy tone is deliberately restrained; avoid nationalistic framing.
- Switch's upstream repo is `LurusTech/lurus-switch`; an older repo owner is deprecated and should not be referenced.
- `scripts/ship.sh "commit message"` is the canonical ship path: git status check → `bun run lint && bun run build` → stage tracked+untracked (excluding `.env*`/credentials/`*.pem`/`*.key`) → commit → push. Vercel auto-deploys roughly 30 seconds after push.

## Related projects

- **`2c-gui-switch`** (`LurusTech/lurus-switch`) — Lurus's desktop LLM gateway client. This site's primary conversion action downloads its latest GitHub release and, for existing installs, can deep-link a pre-configured provider preset straight into it (`src/lib/platform.ts:6-13`; `src/components/ClosingCTA.tsx:13-19`).
- **`newapi.lurus.cn`** — Lurus's own LLM gateway/proxy. The `switch://import` deep link's base64 payload sets the imported provider's `baseUrl` to this host (`src/components/ClosingCTA.tsx:13-16`).
- **Resend** and **Vercel Analytics / Speed Insights** — third-party services, not Lurus-internal, used for the newsletter/partner forms and funnel tracking respectively (`package.json` dependencies; `src/lib/track.ts`).
