# Voice agent source

Everything the ElevenLabs voice agent knows and does, kept in the repo so it is reviewable
and reproducible instead of living only in a dashboard.

## Layout

| Path | What it is |
|------|-----------|
| `avc-agent-prompt.md` | The agent's system prompt. Behaviour and guardrails only. Contains no prices or course details on purpose. |
| `knowledge/*.md` | Generated knowledge base documents. Uploaded to ElevenLabs as RAG sources. Never edit these by hand. |

## Why the split

If prices live in the prompt they drift the moment the website changes, and the agent
starts quoting figures the site does not show. So the prompt holds only rules, and every
fact comes from `knowledge/`, which is generated from `src/data/*.ts`. One edit updates the
website and the agent together.

## Regenerating the knowledge base

Run after any change to `src/data/services.ts`, `src/data/training.ts` or the FAQs in
`src/data/routes.ts`:

```bash
node scripts/build-agent-knowledge.mjs
```

Then re upload the changed files to the agent's knowledge base in ElevenLabs. The agent
does not pick up changes on its own.

## Single source of truth for prices

`src/data/training.ts` is the only price list. It is what `PricingPage.tsx` renders, what
the published FAQ answers quote, and what the generator reads.

A second file, `src/data/courses.ts`, used to export a conflicting list (90 minute sessions
at £125, bundles at £330, £600 and £1,080). Nothing imported it and Eric confirmed the
60 minute £75 pricing in `training.ts` is the current one, so `courses.ts` was deleted.
Do not reintroduce a second list.
