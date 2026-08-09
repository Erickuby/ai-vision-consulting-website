---
slug: ai-hallucination-and-rag
title: "Why AI Makes Things Up, and How to Ground It in Your Own Documents"
meta_title: "Why AI Makes Things Up and How Grounding Fixes It"
meta_description: "Understand why AI tools invent confident answers, the habits that keep everyday use safe, and how retrieval grounds a model in your own trusted documents."
excerpt: "A plain-English guide to why AI invents answers, how to work safely with that, and what retrieval augmented generation really changes."
category: "Responsible AI"
image: "https://aivisionconsulting.co.uk/images/blog/ai-hallucination-and-rag.png"
image_alt: "An answer with three source citations beside an ungrounded guess marked with a warning."
read_time: "11 min read"
published_at: "2026-08-09"
updated_at: "2026-08-09"
primary_cta_label: "Discuss a document-trained chatbot"
primary_cta_href: "https://www.fiverr.com/kubblicious/build-an-ai-chatbot-trained-on-your-documents-and-website"
secondary_cta_label: "Explore AI training in Newcastle"
secondary_cta_href: "/ai-training-newcastle/"
---

# Why AI Makes Things Up, and How to Ground It in Your Own Documents

An AI assistant will sometimes give you a fluent, well-structured, completely wrong answer. It will invent a policy clause, a price, a case reference or a statistic, and present it with the same calm confidence it uses for things it has right. This is not a bug someone forgot to fix. It follows from how the tools work. Once you understand that, two things become obvious: which habits keep everyday use safe, and why grounding a model in your own documents changes the picture without solving everything.

## Quick answer

A language model predicts likely text. It does not look up facts unless you connect it to something that can. When it has no solid basis for an answer, it still produces one, because producing text is the only thing it does. That invented output is usually called a hallucination.

Two defences work together:

1. **Habits.** Never let an unverified AI answer become a decision, a published claim or a customer promise. Check anything specific: numbers, names, dates, quotes, legal and clinical points.
2. **Grounding.** Retrieval augmented generation, usually shortened to RAG, retrieves relevant passages from your own documents and asks the model to answer using them, with citations you can click.

RAG sharply reduces invention on questions your documents cover. It does not eliminate it, and it cannot rescue documents that are out of date, contradictory or missing.

## Key takeaways

- Models generate plausible text, so confidence tells you nothing about accuracy.
- Hallucination risk rises with specificity, obscurity and anything recent.
- Verify every number, name, date, quotation and legal or clinical statement.
- RAG grounds answers in your own material and gives you citations to check.
- RAG inherits the quality of your documents, so tidy the source first.
- An assistant that says it does not know is more valuable than one that always answers.
- A named person must own accuracy, escalation and the decision to publish.

## Why a language model makes things up

### It predicts, it does not look things up

A language model has learned statistical patterns across enormous quantities of text. When you ask a question, it produces a likely continuation, token by token. Nothing in that process consults a database, checks a source or verifies a claim, unless a tool has been explicitly connected to it.

When the pattern is strong, for example the capital of France or the structure of a formal letter, the likely continuation is also the true one. When the pattern is weak, the model still produces its best continuation. It has no mechanism for silence.

### Confidence is a writing style, not a signal

People read hedging as uncertainty and directness as knowledge. A model writes in whatever register the pattern suggests, and formal business prose is confident by default. So the wrong answer arrives in the same tone as the right one. Treat fluency as a property of the writing and nothing more.

### Gaps get filled rather than flagged

Ask for six examples when only four exist and you will often get six. Ask for a citation and you may get a real-sounding author, journal and year that do not correspond to any real paper. The request itself creates pressure to produce, and the model resolves that pressure by generating something shaped correctly.

### Where the risk concentrates

Invention is not evenly distributed. It clusters around:

- specific figures, dates, prices and percentages
- names of people, products, clauses, standards and case law
- anything that changed recently
- narrow or specialist subjects with little published material
- your own internal policies, which the model has never seen
- long chains of reasoning, where one wrong step quietly carries forward

## Where hallucination actually costs you

| Task | Risk if wrong | Sensible control |
| --- | --- | --- |
| Drafting a first version of an email | Low, you read it before sending | Read it properly, do not skim |
| Summarising a document you have | Medium, detail can drift | Check the summary against the source |
| Quoting a price or lead time | High, it becomes a promise | Only from your own approved list |
| Explaining a policy to a customer | High, creates obligations | Ground in the policy, cite the clause |
| Legal, tax, medical or safety points | Severe | Qualified human, always |
| Research citations and statistics | High, damages credibility | Open every source before using it |
| Code touching payments or data | High | Review, test, never paste blind |

The pattern is simple. The more a wrong answer would cost, and the harder it is to reverse, the less the tool should be trusted on its own.

## Seven habits for safe everyday use

**1. Decide the check before you ask.** Know how you will verify the answer before you request it. If you cannot describe the check, you are not ready to use the output.

**2. Ask for sources, then actually open them.** An unopened citation is worse than none, because it looks like diligence. If a link does not resolve or does not say what was claimed, discard the whole answer and start again.

**3. Give it your material rather than asking from memory.** Pasting the real policy, the real job advert or the real invoice moves the task from recall to reading, which is far more reliable.

**4. Never paste what you would not email to a stranger.** Customer records, staff data, health information, credentials and confidential contracts do not belong in tools you have not assessed. The Information Commissioner's Office publishes guidance on AI and data protection, and special category data carries extra obligations.

**5. Ask it to argue against itself.** A short follow-up such as "what would make this answer wrong, and what have you assumed?" surfaces weak points more often than people expect.

**6. Keep the specifics human.** Let the tool structure, draft and summarise. You supply the numbers, names, dates and commitments.

**7. Say when it was used, where that matters.** Application processes, academic work, journalism and regulated advice have their own expectations. Being open costs nothing when the work is genuinely yours.

## What retrieval augmented generation actually is

RAG is less clever than it sounds, which is exactly why it works.

1. Your documents are split into passages and stored in a searchable index.
2. A question arrives.
3. The system searches that index and pulls back the handful of passages most likely to be relevant.
4. Those passages are placed in front of the model along with the question and an instruction to answer from them.
5. The answer comes back with references to the passages used.

The model is no longer answering from vague memory. It is reading a short, relevant extract of your own material and reporting what it says. That is why a well-built RAG assistant can quote your refund window correctly while a general chatbot guesses.

The clickable citation matters as much as the answer. It converts a claim you must trust into a claim you can check in seconds.

## What RAG fixes, and what it does not

**It genuinely helps with:**

- questions your documents actually answer
- keeping answers current, because you update documents rather than retrain anything
- traceability, since every answer points at a source
- scope control, because the assistant can be told to refuse anything outside the index

**It does not fix:**

- **Bad source material.** Contradictory, outdated or half-written documents produce contradictory, outdated answers, now with the authority of a citation.
- **Retrieval misses.** If the search pulls the wrong passages, the model answers confidently from the wrong context.
- **Questions requiring judgement.** Suitability, eligibility, exceptions and anything sensitive still need a person.
- **Invention entirely.** A model given three passages can still stitch them into a claim none of them makes. Reduced is not eliminated.
- **Security by itself.** Content pulled in from untrusted sources can carry instructions aimed at the model. The National Cyber Security Centre publishes guidance on developing AI systems securely, and it is worth reading before you connect anything to live systems.

## Building a RAG assistant that earns trust

### 1. Start from the questions, not the technology

Collect the fifty questions people actually ask, from your inbox, your phone notes and your support log. If your documents do not answer them today, an assistant will not either. This step usually reveals that the real problem is missing documentation.

### 2. Fix the source material first

This is most of the work and it is unglamorous. Remove superseded versions. Resolve documents that contradict each other. Date everything. Give each document a clear owner. A tidy set of twenty pages beats a chaotic drive of four hundred.

### 3. Split documents sensibly

Passages need to be small enough to be precise and large enough to keep meaning. Splitting mid-sentence or mid-table destroys context, and tables, forms and scanned PDFs usually need attention before they are usable.

### 4. Make citations non-negotiable

Every answer should name its source and, where possible, link to the exact section. If the interface cannot show that, do not deploy it. Citations are what let a non-expert catch an error.

### 5. Teach it to refuse

Write the refusal behaviour explicitly: when the retrieved passages do not answer the question, say so and offer a human. Test this deliberately with questions your documents do not cover. An assistant that answers everything is telling you it will invent things.

### 6. Design the human handoff before launch

Decide who receives escalations, within what hours, and what the assistant says when nobody is available. Complaints, vulnerability, money and anything unusual should route to a person immediately. Our guide on [whether your website needs an AI chatbot](/blog/ai-chatbot-for-your-website) covers that decision in more detail.

### 7. Keep it alive

Documents change. Someone must own re-indexing, reviewing logged questions, and spotting the ones answered badly. Treat it as a service with an owner, not a project that finished.

## Testing before you trust it

Build a small evaluation set. Thirty to fifty real questions with agreed correct answers is enough to be useful.

Run it and record, for each question, whether the answer was correct, whether the citation supported it, and whether a wrong answer would have caused harm. Then deliberately try to break it:

- questions your documents genuinely do not cover, to confirm it refuses
- questions phrased badly, with typos or missing context
- questions spanning two documents that disagree
- questions about a version you have withdrawn
- the same question asked five ways, checking the answers agree

Re-run the set after every meaningful change to the documents or configuration. Without a baseline you cannot tell whether a change helped.

## What to keep out of the index

Indexing everything is tempting and usually wrong. Ask, for each source:

- Does anyone need an answer from this?
- Is it current, and who confirms that?
- Does it contain personal or special category data?
- Would it matter if the assistant quoted it to the wrong person?
- Is there a withdrawn version that must not surface?

Personal data in a retrieval index carries the same obligations as personal data anywhere else, including access, correction and retention. Where an answer could materially affect someone, keep a person in the decision.

## Frequently asked questions

### Why does AI invent sources that look completely real?

Because it is producing the most likely shape of a reference rather than retrieving one. A plausible author, journal and year fit the pattern of a citation, so they get generated. Always open a citation before relying on it, and prefer tools that link to documents you can inspect.

### Does retrieval augmented generation stop hallucination?

No, it reduces it. Grounding answers in retrieved passages removes most invention on questions your documents cover, but the model can still misread a passage, combine two badly or answer from the wrong retrieved context. Citations plus a refusal path are what make the remaining errors catchable.

### Is RAG the same as training or fine-tuning a model on my data?

No. RAG leaves the model unchanged and shows it relevant extracts at question time, so updating a document updates the answers immediately. Fine-tuning adjusts the model itself, costs more, and is a poor fit for facts that change.

### How many documents do I need before RAG is worth it?

Fewer than people assume. Twenty well-maintained pages that answer real repeated questions are more useful than a large disorganised archive. Volume without ownership makes the assistant less reliable, not more.

### Is it safe to put customer information into an AI tool?

Not by default. Assess the tool, understand where data goes and how long it is kept, limit what is shared to what the task needs, and follow the ICO guidance on AI and data protection. When in doubt, remove identifying details before you paste anything.

## Author note

Written for AI Vision Consulting, a practical AI training and automation company based in Newcastle upon Tyne and serving UK organisations. The approach here favours checkable answers, honest refusals and a named person responsible for anything that matters.

## Sources

- [Information Commissioner's Office: Guidance on AI and data protection](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/)
- [National Cyber Security Centre: Guidelines for secure AI system development](https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development)
- [GOV.UK: AI Playbook for the UK Government](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government)
