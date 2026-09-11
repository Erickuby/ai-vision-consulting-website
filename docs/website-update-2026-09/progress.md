# Website brief: September 2026

Source: Eric's `claude-website-update-brief.pdf`, 14 pages, prepared 10 September 2026.
Working branch: `codex/website-brief-2026-09` in this source repository.
The parent repository publishes generated files to SiteGround. No publication has taken place.

## Review checkpoint: P0

Implemented locally:

- Audited current source, static blog content, metadata, SVG text, JSON/YAML, agent knowledge and the parent deploy repository for Sora, Sora 2, Sora 2 Pro and OpenAI video. No references found in 129 source/support text files or 53 deploy text files. Dependency directories, Git internals, generated build duplicates and this audit folder were excluded. No PDF rate card or other PDF resource exists in either repository.
- Refreshed the AI video topic and added practical guidance on Veo 3.1, Runway Gen-4.5, Kling 3.0 and Seedance 2.0, with subscription, usage-limit and commercial-rights checks.
- Added a shared VAT policy and visible notices to prices, cards, selection totals, booking enquiry text, service copy and price-bearing metadata. Removed the price from the corporate page title. Default remains the brief's non-registered wording.
- Added the full free-training comparison immediately after individual pricing, plus a condensed version in the catalogue. There are no individual course detail pages yet; P1/P2 must create them and reuse this component.
- Labelled existing multi-workshop rates as committed programmes pending P1 repricing.
- Replaced the stale structured-data offer (GBP125 for 90 minutes) with all 11 currently displayed packages, including currency, VAT description, starting-price qualification and effective date.
- Regenerated local voice-agent knowledge from the same site data. External agents have not been synchronised.
- Preserved the pre-existing sitemap edit in `sitemap-before.xml` before regenerating it.

### Files changed for P0

- `src/data/pricingPolicy.ts`: VAT default and publication confirmation flag.
- `src/components/PricingContext.tsx`: shared VAT notice and free-training comparisons.
- `src/components/PricingPage.tsx`: section placement, price notices and committed-rate explanation.
- `src/components/TrainingCatalogue.tsx`: topic/shortlist/enquiry VAT and current video guidance.
- `src/components/CoursesUpgraded.tsx`: homepage VAT notice.
- `src/components/SeoLandingPage.tsx`: service-page VAT notice.
- `src/data/routes.ts`: VAT-aware route content, metadata title and committed-programme qualification.
- `src/data/training.ts`: video topic and programme format wording.
- `src/entry-server.tsx`: exports shared pricing data for prerendering.
- `scripts/prerender.mjs`: accurate package offers and VAT treatment.
- `scripts/build-agent-knowledge.mjs`: shared VAT policy and travel area.
- `agent/knowledge/03-pricing.md`, `04-course-topics.md`, `05-faq.md`: generated local knowledge.
- `public/sitemap.xml`: regenerated sitemap; original user edit backed up.

### Verification

- TypeScript check passed.
- Client build, server build and static generation passed for 15 application routes; 33 HTML pages include the static blog content.
- All 11 pricing cards matched their structured offers by name and numeric price, with GBP currency and VAT descriptions. Starting prices are explicitly qualified. Team essentials remains exactly `From £995`.
- Full free-training section is the next section after individual pricing.
- Every rendered page containing numeric pound prices has visible VAT wording. Price-bearing individual cards, catalogue rows, shortlist and route text were checked separately.
- Browser check confirmed course selection updates the total, VAT remains visible, and the encoded booking enquiry includes the total and VAT. No booking or enquiry was submitted.
- Visual check confirmed the existing dark/cyan style and readable shortlist. Existing assistant bubble can overlap the sticky selection area at narrow widths; review this during P2 quality checks.
- `git diff --check` passed. Existing Vite large-chunk warnings remain; performance redesign is outside the PDF scope.

### Fact-check decisions

- Free training: the government programme is available to UK adults; selected courses meet the Skills England benchmark and carry the badge. The text does not imply that every hub course is accredited.
- Video: omitted the unverified blanket claims that all free tiers are evaluation-only and Seedance is the highest-quality model. Commercial permission depends on the actual provider, plan, source material and use.
- Primary sources: https://deepmind.google/models/veo/ ; https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5 ; https://seed.bytedance.com/en/seedance2_0 ; https://aiskillshub.org.uk/ ; https://www.gov.uk/government/news/free-ai-training-for-all-as-government-and-industry-programme-expands-to-provide-10-million-workers-with-key-ai-skills-by-2030

## Required before publication

- PLACEHOLDER: Eric must confirm VAT registration status. Asked; no answer recorded. `pricingPolicy.vatConfirmed` is false. Do not publish the draft default as a confirmed business fact.
- P0 is a review checkpoint required by page 1 of the brief. Full objective remains active; P1 and P2 are not complete.

## P1 implementation checklist (completed in the local draft)

- Replace the price ladder everywhere: individual GBP95; 3 sessions GBP270; 6 GBP510; 12 GBP900; private group From GBP395; Team essentials From GBP995 unchanged; half day From GBP1450; full day From GBP2450; six-workshop programme From GBP4800. Update calculation, savings, bundle names and twelve-month validity.
- Remove the old two-session and three-workshop options from the public ladder to resolve the conflict with the requested final table.
- Add the corporate pricing explanation, inclusions and separately quoted travel outside Tyne and Wear/software. Verify any competitor comparison before publishing it.
- Add Copilot Cowork/Agent Mode, cost/credits, corporate-only Agent 365 governance and MCP/tools/skills topics. Rename Claude Code for non-coders to Build a working tool without writing code; improve tool-choice training.
- Add actual course detail pages, links from bookable cards, practical deliverables and scope limits. Keep Agent 365 out of individual selection totals.
- Add AI policy/governance From GBP1750 and workflow audit From GBP950 service pages, navigation, home and pricing entries. Audit credit applies to workshop/programme bookings within 60 days.

## Remaining scope: P2

- Case-study template plus three clearly marked drafts; no invented client facts, results or quotes. Include the honest limitation and all requested measurement fields.
- Course/service review metadata and quarterly maintenance guidance; CPD accreditation false unless genuinely awarded.
- North East homepage context and `/free-ai-training-north-east/`, with verified official links and eligibility caveats.
- Course/Offer and new Service schemas, FAQs and matching FAQPage, reciprocal relevant blog links, changed metadata and sitemap.
- Review required dates, claims, available tools, sentence case and limitations against the remaining PDF pages before implementation.
- Full final audit and report: changed files grouped by tier, all old/new prices including GBP995 unchanged, Sora results, placeholders and conflicts resolved.
- Publish and sync external agents only after the required business confirmation and final review gates are satisfied.

## Review checkpoint: P1

The new ladder, six course detail pages and two service pages are implemented locally. The catalogue now has 13 Practical AI topics and 11 Copilot topics; one Copilot topic is corporate-only, leaving 23 individual choices. The new pages use the existing landing-page template and artwork. Both new services appear under Services in the main/mobile navigation, on the homepage and on pricing. No existing course URL was renamed: the previous catalogue had no detail URLs for these topics.

### Price changes

All AI Vision Consulting amounts below currently use the unconfirmed non-VAT-registered draft treatment. The competitor comparison explicitly labels that provider's prices + VAT.

| Offer | Previous | Draft |
| --- | --- | --- |
| Focused hour | £75 | £95 |
| Starter, three hours | £195 | £270; £90/session; save £15, about 5% |
| Momentum, six hours | £360 | £510; £85/session; save £60, about 11% |
| Complete, twelve hours | £720 | £900; £75/session; save £240, about 21% |
| Private group, 90 minutes, up to six | From £325 | From £395 |
| Team essentials, 90 minutes, up to 15 | From £995 | From £995, unchanged |
| Half day, up to 3.5 hours, up to 20 | From £1,250 | From £1,450 |
| Full day, up to seven hours, up to 20 | From £2,000 | From £2,450 |
| Six 90-minute workshops, up to 15 | From £3,900 | From £4,800; £800/workshop |
| AI policy and governance | New | From £1,750 |
| AI readiness and workflow audit | New | From £950; full credit against a workshop/programme booked within 60 days of the audit |

The old £140 two-session package and From £2,100 three-workshop package were removed to match the brief's final ladder. Two individual hours now cost £190. Published bundle prices drive the selection calculator. Every bundle includes a learning plan, notes, a work-specific prompt library and twelve-month validity. The voice-assistant setup/support prices were not changed because the brief supplies no replacement for them.

### Files added or changed in P1

- Added `src/data/trainingDetails.ts`, `courseRoutes.ts`, `serviceOffers.ts`: six detailed topics, their routes and two consultancy offers/routes.
- Updated `src/data/training.ts`, `trainingSelection.ts`: ladder, names, savings, validity, catalogue entries and calculation from shared rates.
- Updated `src/data/routes.ts`, `services.ts`: current copy, route integration and assistant service facts.
- Updated `src/components/PricingPage.tsx`, `TrainingCatalogue.tsx`, `CoursesUpgraded.tsx`: prices, comparisons, links and booking behaviour; Agent 365 has no individual checkbox.
- Updated `src/components/SeoLandingPage.tsx`: course pricing, scoped booking enquiry, prerequisites, limits, deliverables and related reading.
- Updated `src/components/Nav.tsx`, `Services.tsx`, `Footer.tsx`, `PageHeroArtwork.tsx`, `src/index.css`: service navigation, homepage offers, accurate topic label and existing-style page presentation.
- Updated `src/entry-server.tsx`, `scripts/prerender.mjs`: consultancy offers match the pricing page's structured offer catalogue.
- Updated `scripts/build-agent-knowledge.mjs`, generated `agent/knowledge/02-services.md` through `05-faq.md`, `agent/avc-agent-prompt.md`, `agent/whatsapp-prompt.md`, `agent/README.md`: current prices, catalogue counts, consultancy and corporate-only restrictions. External agents have not been synced.
- Regenerated `public/sitemap.xml`: 40 indexable URLs at this checkpoint.

### P1 checks

- TypeScript, client build, server build, prerendering and local assistant-knowledge generation passed. There are 23 application routes and 41 HTML pages including the static blog pages.
- All 11 displayed offer cards matched their expected new prices and structured offers. GBP currency, VAT descriptions and the exact From £995 invariant passed.
- Calculator checks passed for 0, 1, 2, 3, 4, 6, 9, 12, 13 and 23 hours, plus invalid input. Browser selection of a mixed three-topic plan produced £270 and a £15 saving, with the same amount in booking notes.
- All eight new pages have one H1, metadata and working internal links. Course pages include deliverables. The five new individual detail pages carry the free-training comparison; the Agent 365 page uses corporate scope and contains no £95 individual offer.
- Browser review confirmed the Agent 365 page, mobile Services navigation and the £950 audit/60-day credit.
- Scanned all 41 rendered pages: no obsolete package prices or missing page-level VAT notices; no broken pound-sign encoding. Whitespace check passed.
- P2 still needs Course/Offer schemas, expanded FAQs, remaining course metadata/limitations, reciprocal blog links, case-study drafts, regional content and final responsive/a11y review. Large existing JS chunks remain a known build warning.

### Additional fact-check decisions

- The Oxford AI School's £1,499 half day is virtual (£1,599 in person); its £2,499 full day is a policy workshop (£2,599 in person), capped at ten. The comparison now identifies the provider, format and difference in programme instead of claiming a uniform market rate. Source: https://www.theoxfordaischool.com/ai-training-north-east
- Cowork /cost reports approximate usage already incurred, not an advance quote. Spending-limit enforcement is asynchronous and should not be described as a real-time access gate. Sources: https://learn.microsoft.com/en-us/microsoft-365/copilot/ubb-cost-skill and https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-access
- Agent 365 supports registry, identity/access and lifecycle governance; access/licensing and approved change processes must be checked. Source: https://learn.microsoft.com/en-us/microsoft-agent-365/overview
- MCP description checked against https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro
- The UK government confirmed it would not publish AIME or make it a procurement requirement. Source: https://www.gov.uk/government/consultations/ai-management-essentials-tool/outcome/guidance-for-using-the-ai-management-essentials-tool-government-response
- The brief's EU AI literacy wording is outdated: Commission guidance reflects July 2026 amendments and no longer mandates a particular sufficient level. The site describes practical support and directs the organisation to confirm legal scope. Source: https://digital-strategy.ec.europa.eu/en/policies/ai-talent-skills-and-literacy
- Omitted unsupported ISO certification counts/audit-fee estimates, SME adoption percentages and fixed lower-tier subscription estimates. These are not needed to explain the offers and should not be presented as established facts without evidence.

P1 is ready for the PDF's review checkpoint. Publication remains pending VAT confirmation and the remaining P2 work. The full goal is not complete.

## Parallel laptop cleanup request

Eric requested safe cleanup and explicitly asked to close Brave, Opera, CapCut and Chrome. Python's own cache purge removed 2495 installation-cache files (4874.5 MB); installed software and projects were not removed. There was about 181 GB free storage before cleanup but only about 0.4 GB free RAM. Normal, non-forced close signals were sent to the four named applications. Processes remained at the following check; user was told to respond to any exit/save prompts. Do not force-close unsaved work without resolving this. Docker/n8n remain running and local n8n health returned HTTP200. Other browsers/apps, personal documents, downloads and n8n backups were not cleaned.

## Review checkpoint: P2

Implemented on 11 September 2026. See `final-review.md` for the consolidated all-tier report, exact changed-file inventory, price table, factual corrections and remaining inputs.

- All 24 catalogue topics now have detail pages, specific limitations, prerequisites, tangible final deliverables and a supporting article. Agent 365 remains corporate-only, so there are 23 individual choices.
- Added Course/Offer structured data for every course and correctly priced Service offers for both new consultancy pages. Pricing and service FAQs match their visible answers.
- Added per-page review metadata and footer dates for all courses/services. All 24 CPD flags are false. Provider name and HTTPS award evidence are required before showing a badge. A browser-only intercepted response proved updates without rebuilding and was removed in `finally`; no test award was written into site files.
- Added three clearly marked case-study templates with all requested fields, including an honest limitation and permission checks. No client result or quotation has been invented.
- Added North East homepage context and the free/funded guide, using official sources and explicit eligibility/availability limits. A stale Bootcamp URL redirected to a department homepage and was replaced.
- Added relevant course links to four Copilot/employee articles. Corrected Cowork billing/access promises and removed the unsupported forty-to-four-minute Excel claim.
- Fixed article metadata drift: Markdown frontmatter now generates metadata used by React cards and the sitemap. Fallback catalogue records also match the source. Other generated blog changes are related-article cards.
- Added a publication gate for unconfirmed VAT. Tested refusal before any file copy; parent deployment repository stayed clean.
- Fixed the floating shortlist/assistant overlap, preserved existing design and removed forced title case from course-family headings.

Verification: TypeScript and complete builds pass. `scripts/verify-website-brief.py` passed 3,437 checks across 60 HTML files, 24 course pages and 59 sitemap entries, with no errors. Eight representative pages were checked at 375px and 1440px with no page overflow. A three-course shortlist displayed GBP270 and the same total in booking notes. Screenshots are saved alongside this report. The apparent pre-existing FAQ mismatch was only the accessibility label on an external link, so the visible FAQ was not changed.

P2 is ready for the PDF's review checkpoint. The entire requested outcome is not yet published: VAT confirmation remains pending, case-study facts and CPD decisions remain the requested placeholders, and Eric must review funded-training eligibility before publication. No live-agent sync or customer submission occurred. The active goal must not be marked complete while these publication requirements remain unresolved.

Laptop closing update: Opera was confirmed closed. Brave, Chrome and CapCut persisted after normal close requests. Force-closing still needs the user to confirm saved work; no forced termination was performed.
