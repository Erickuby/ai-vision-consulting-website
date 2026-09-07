# Voice agent source

Everything the ElevenLabs voice agent knows and does, kept in the repo so it is reviewable
and reproducible instead of living only in a dashboard.

## Two agents, one set of facts

There are two agents on two channels, running on different engines:

| Channel | Engine | Prompt |
|---------|--------|--------|
| Website widget, live voice | ElevenLabs Agents | `avc-agent-prompt.md` |
| WhatsApp, text and voice notes | n8n + GREEN API | `whatsapp-prompt.md` |

WhatsApp cannot run on ElevenLabs: their WhatsApp channel needs the official Meta Business
API, which needs business verification and a spare phone number. GREEN API reaches WhatsApp
on an existing number with no Meta process, but cannot do live calls. Hence two engines.

Two agents is a drift risk, and this project has already been bitten by exactly that:
`src/data/courses.ts` quoted £125 while `src/data/training.ts` quoted £75. So neither
prompt contains a price. Both get their facts from the same generated `knowledge/*.md`.

```
src/data/training.ts, services.ts, routes.ts
   └─ npm run agent:knowledge  ->  agent/knowledge/*.md
        ├─ npm run agent:web       ->  ElevenLabs   (website voice agent)
        └─ npm run agent:whatsapp  ->  n8n          (WhatsApp agent)
```

**After changing any price, run `npm run agent:sync`.** It regenerates the knowledge and
pushes both agents. One command, no hand copying.

## Layout

| Path | What it is |
|------|-----------|
| `avc-agent-prompt.md` | Website voice agent system prompt. Behaviour and guardrails only, no prices. |
| `whatsapp-prompt.md` | WhatsApp agent system prompt. Behaviour only. Kept separate because the voice prompt bans lists and links, which are the most useful things you can send in a chat. |
| `knowledge/*.md` | Generated knowledge documents, shared by both agents. Never edit by hand. |
| `agent-ids.json` | ElevenLabs agent, knowledge and tool ids, so re-runs update rather than duplicate. |

## Why the split

If prices live in the prompt they drift the moment the website changes, and the agent
starts quoting figures the site does not show. So the prompt holds only rules, and every
fact comes from `knowledge/`, which is generated from `src/data/*.ts`. One edit updates the
website and the agent together.

## Commands

```bash
npm run agent:sync        # regenerate knowledge, then push BOTH agents
npm run agent:knowledge   # regenerate agent/knowledge/*.md only
npm run agent:web         # push the ElevenLabs website agent
npm run agent:whatsapp    # push the n8n WhatsApp agent
```

`agent:whatsapp` also takes `--dry-run`, which assembles the full system message, writes it
to `agent/.whatsapp-system-prompt.txt` for review, and pushes nothing.

Neither agent picks up changes on its own, so nothing is live until you run the sync.

## What each script needs in `.env`

| Variable | Used by | Notes |
|----------|---------|-------|
| `ELEVENLABS_API_KEY` | `agent:web` | Secret. Server side only, never reaches the browser. |
| `VITE_ELEVENLABS_AGENT_ID` | the website build | Not a secret. Written by `agent:web`. |
| `N8N_BASE_URL` | `agent:whatsapp` | e.g. `https://n8n.indoorgrowguides.com` |
| `N8N_API_KEY` | `agent:whatsapp` | Secret. n8n > Settings > API. |

The Cal.com API key is deliberately absent. The website agent keeps it in the ElevenLabs
secrets manager, and the WhatsApp agent keeps it in an n8n credential. It never belongs in
this repo.

## Single source of truth for prices

`src/data/training.ts` is the only price list. It is what `PricingPage.tsx` renders, what
the published FAQ answers quote, and what the generator reads.

A second file, `src/data/courses.ts`, used to export a conflicting list (90 minute sessions
at £125, bundles at £330, £600 and £1,080). Nothing imported it and Eric confirmed the
60 minute £75 pricing in `training.ts` is the current one, so `courses.ts` was deleted.
Do not reintroduce a second list.
