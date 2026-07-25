# Social AI Poster

> [!CAUTION]
> This repository is a living snapshot of software under ongoing development. The public source code is updated as the work evolves and matures.
>
> It may contain incomplete features, known limitations, bugs, or security vulnerabilities. Do not deploy this snapshot to production or use it with real user data, payments, credentials, or other sensitive information without an independent security review.

**Frontend demo** for a multi-agent social content pipeline — React + Vite SPA with **sanitized Acme Coffee fixtures**. The CrewAI backend is **not included** in this public repo.

**Live demo:** [social-ruddy.vercel.app](https://social-ruddy.vercel.app)

> **Demo-only credentials:** log in with `admin` / `admin`. This gate exists purely to demonstrate the login UI on a public demo deployment — it is not a real auth system and must never be reused for anything handling real data.

---

## What's in this repo

| Included | Not included |
|----------|----------------|
| Operator dashboard UI (login, campaign form, execution log) | CrewAI crew definitions or agent code |
| Acme Coffee demo fixtures (`src/fixtures/`) | Gemini / LLM calls |
| Fixture fallback when `/api/generate-post` is unavailable | Instagram / LinkedIn publish adapters |
| `VITE_API_URL` hook for an external backend | Automated backend deployment |

Without `VITE_API_URL`, the dashboard runs in **demo mode** and replays fixture output after a failed fetch. Set `VITE_API_URL` to point at a running backend for live agent execution.

For the intended agent roles and pipeline diagram, see [`AGENTS.md`](AGENTS.md).

---

## What the full product does

In production, operators enter a campaign brief (topic + hashtags). A CrewAI crew runs three Gemini-powered agents:

1. **Research** — trend and audience fit  
2. **Draft** — platform-ready caption  
3. **Review** — brand voice and compliance pass  

Approved copy lands in the execution log and publish queue. That orchestration lives in a **separate private backend** — this repo ships the dashboard shell and demo data only.

---

## Quick start

```bash
npm install
cp .env.example .env   # optional — only needed when connecting a backend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173), sign in with `admin` / `admin`, and explore the Acme Coffee demo campaign.

```bash
npm run lint     # ESLint
npm run test     # Vitest smoke tests
npm run build    # production bundle
npm run preview  # serve dist locally
```

---

## Backend API contract

When `VITE_API_URL` is set, the dashboard calls:

**`POST {VITE_API_URL}/api/generate-post`**

Request body:

```json
{
  "topic": "Introducing Ethiopian Yirgacheffe — bright citrus, floral finish",
  "hashtags": "#AcmeCoffee #SingleOrigin #PourOver",
  "brand": "Acme Coffee",
  "campaign": "acme-spring-launch"
}
```

Success response (`200`):

```json
{
  "success": true,
  "result": "Formatted caption and metadata string for the execution log"
}
```

Error response (`4xx` / `5xx`):

```json
{
  "detail": "Human-readable error message"
}
```

If the request fails or no backend is reachable, demo mode replays matching Acme Coffee fixtures locally.

---

## Environment variables

| Variable | Scope | Description |
|----------|-------|-------------|
| `VITE_API_URL` | Frontend | Backend origin for `/api/generate-post` (omit for demo-only mode) |
| `CREWAI_API_KEY` | Backend | CrewAI orchestration (not used in this repo) |
| `CREWAI_BASE_URL` | Backend | Optional CrewAI API base |
| `GEMINI_API_KEY` | Backend | Google Gemini for agent LLM calls |

Copy [`.env.example`](.env.example) and never commit real keys.

---

## Tech stack

- React 19 + TypeScript + Vite 8  
- Tailwind CSS 4  
- React Router 7  
- Lucide icons  
- Vitest (smoke tests)  
- GitHub Actions (lint + test + build)  
- Deployed on Vercel (SPA rewrites via `vercel.json`)

---

## Project structure

```text
src/
  fixtures/acmeCoffeeCampaign.ts   # Demo brand + 2 sample posts
  lib/auth.ts                      # Demo session helpers
  lib/generatePost.ts              # API call + fixture fallback
  pages/
    Login.tsx                      # Demo auth gate
    Dashboard.tsx                  # Campaign UI + execution log
  App.tsx                          # Routes + session check
```

---

## Portfolio context

Built to explore **agentic content ops** for small businesses: one dashboard, multiple specialized agents, human approval before anything goes live. This public extract demonstrates the **frontend operator UI**; the CrewAI backend is maintained separately.

---

## License

MIT — see [LICENSE](./LICENSE). Demo content only — no real client data included.
