# Social AI Poster — Agent Architecture

> **Status:** Portfolio demo (sanitized fixtures)  
> **Live demo:** [social-ruddy.vercel.app](https://social-ruddy.vercel.app)  
> **Demo brand:** Acme Coffee (fictional)

This project showcases a **multi-agent social content pipeline**: autonomous CrewAI agents research trends, draft captions, and pass output through a human-in-the-loop review step before publishing.

---

## Pipeline overview

```text
User brief (topic + hashtags)
        │
        ▼
┌───────────────────┐
│  Research Agent   │  Trend scan, competitor tone, audience fit (Gemini)
└─────────┬─────────┘
          ▼
┌───────────────────┐
│   Draft Agent     │  Caption + CTA + hashtag refinement (Gemini)
└─────────┬─────────┘
          ▼
┌───────────────────┐
│  Review Agent     │  Brand voice, compliance, length checks (Gemini)
└─────────┬─────────┘
          ▼
   Human approval (Dashboard)
          ▼
   Publish queue (Instagram / LinkedIn adapters)
```

---

## Agent roles

| Agent | Responsibility | Tools / inputs |
|-------|----------------|----------------|
| **Research** | Validates topic relevance, surfaces angle and proof points | Web search, brand voice doc, campaign objective |
| **Draft** | Writes platform-specific caption variants | Research brief, hashtag seed, character limits |
| **Review** | Scores draft against brand rubric; flags risky claims | Brand guidelines, compliance checklist |
| **Orchestrator** | CrewAI crew — sequences agents, retries, structured JSON output | `CREWAI_API_KEY`, task definitions |

All LLM calls in production use **Google Gemini** via `GEMINI_API_KEY`. Keys live in `.env` only — never in the frontend bundle.

---

## Repository layout

| Path | Purpose |
|------|---------|
| `src/pages/Dashboard.tsx` | Campaign UI, execution log, demo generate flow |
| `src/pages/Login.tsx` | Demo auth gate (`admin` / `admin`) |
| `src/fixtures/acmeCoffeeCampaign.ts` | Sanitized Acme Coffee campaign + 2 sample posts |
| `.env.example` | Placeholders for CrewAI, Gemini, optional OAuth |

The Vite SPA calls `POST /api/generate-post` when a backend is connected (`VITE_API_URL`). Without a backend, the dashboard falls back to **fixture-based demo output**.

---

## Working with agents (local)

1. Copy `.env.example` → `.env` and fill `GEMINI_API_KEY` + `CREWAI_API_KEY`.
2. Run the CrewAI backend (not included in this public frontend repo).
3. Set `VITE_API_URL` to the backend origin and start the SPA: `npm run dev`.
4. Log in with demo credentials and submit a topic — agents run server-side; results render in the execution log.

---

## Sanitization note

This public export contains **no real API keys, OAuth tokens, or client drafts**. Campaign content uses the fictional **Acme Coffee** brand and two demo posts in `src/fixtures/acmeCoffeeCampaign.ts`.
