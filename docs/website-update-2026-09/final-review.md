# September 2026 website update: review draft

## Completed-training update, 11 September 2026

Eric requested removal of all unfinished case-study content and confirmed FDQ Microsoft 365 Copilot training and the completed 12-week AI Vision Community course for publication. The site now contains only those two completed training entries. The three empty templates, prospective engagement descriptions and former nine-week wording have been removed. The homepage now names FDQ. No statistics or quotations have been invented. TypeScript, production builds and 3,432 rendered checks passed. Deployment commit: `51536b7`. The earlier review below is a historical record; references there to empty case-study templates are superseded by this update.

The P0, P1 and P2 implementation passed local review checks. On 11 September 2026 Eric confirmed that AI Vision Consulting is not VAT registered and explicitly authorised publication. Displayed prices are final with no VAT added. Publication verification is recorded below when complete. External assistants have not been synchronised. The case-study entries deliberately contain placeholders, as requested; they do not contain invented results.

## What changed

- Updated the complete individual, group and corporate price ladder, with explicit draft VAT treatment and a free discovery call. Team essentials remains **From £995**.
- Added the free-government-training comparison immediately after individual prices, plus a shorter version on all 23 individual course pages.
- Added the six requested detailed topics and extended the same course template to all 24 catalogue topics. Every course has scope limits, prerequisites, a supporting article, a review footer and a final tangible “You will leave with” list. Agent 365 remains corporate-only.
- Added both consultancy pages to Services navigation, homepage offers and pricing. The workflow audit includes full credit against a workshop or programme booked within 60 days of the audit.
- Added three case-study templates, the North East homepage section and the free/funded training guide.
- Added Course/Offer information for all courses, Service offers for both consultancy pages, and buyer FAQs with matching FAQPage information.
- Connected relevant Copilot articles to courses. Corrected unsupported Cowork cost and completion claims and the unsupported “forty minutes to four” claim in the Agent Mode article.
- Made article cards and sitemap dates use Markdown metadata, so the homepage cannot keep an old excerpt or update date when an article changes.
- Added maintainable review/accreditation metadata. Accreditation remains false on every course. A browser-only test confirmed that a date and badge can update from the metadata file without rebuilding; test values were removed and never written into the site files.
- Kept the existing colours, fonts, page templates and component style. Corrected the assistant/shortlist overlap on mobile and desktop.

## Every price found and its treatment

AI Vision Consulting figures use Eric's **confirmed non-VAT-registered** treatment. Competitor prices explicitly retain their own “+ VAT” basis.

| Offer | Previous | Updated draft |
| --- | --- | --- |
| Discovery call | Free | Free |
| Focused individual hour | £75 | £95 |
| Starter: three hours | £195 | £270; £90 per hour; save £15, approximately 5% |
| Momentum: six hours | £360 | £510; £85 per hour; save £60, approximately 11% |
| Complete: twelve hours | £720 | £900; £75 per hour; save £240, approximately 21% |
| Private group: 90 minutes, up to six | From £325 | From £395 |
| Team essentials: 90 minutes, up to 15 | From £995 | **From £995, unchanged** |
| Half day: up to 3.5 hours, up to 20 | From £1,250 | From £1,450 |
| Full day: up to seven hours, up to 20 | From £2,000 | From £2,450 |
| Six 90-minute workshops, up to 15 | From £3,900 | From £4,800; £800 per workshop; save £1,170 against six separate £995 workshops |
| Two-hour option | £140 package | Removed; two focused hours total £190 |
| Three-workshop option | From £2,100 | Removed to match the final requested ladder |
| AI workflow audit | New | From £950; full eligible booking credit within 60 days |
| AI policy and governance | New | From £1,750 |
| Voice-assistant setup | From £1,200 | Unchanged; VAT clarified |
| Voice-assistant support | From £150 per month | Unchanged; VAT clarified |
| Legacy structured offer | £125 for 90 minutes | Replaced by the actual displayed offer catalogue |

The £0 shortlist state means no sessions selected. The £75 figure that remains is the correct twelve-session per-hour rate, not the former single-hour price. Historical price examples in the internal agent README are explanatory history, not public offers.

The corporate comparison now identifies The Oxford AI School: half day £1,499 + VAT virtually or £1,599 + VAT in person; full-day policy workshop £2,499 + VAT virtually or £2,599 + VAT in person, up to ten people. These are different formats and programmes, so the copy asks buyers to compare the actual scope and final quote. [Provider source](https://www.theoxfordaischool.com/ai-training-north-east).

The £30 billion figure on the homepage is explicitly potential regional investment, not a service price. Unverified subscription estimates and ISO audit-fee estimates from the brief were not introduced as established prices.

## Sora and downloadable resources

The P0 audit found **no Sora, Sora 2, Sora 2 Pro or OpenAI video references** in 129 source/support text files and 53 deploy text files. The final source scan also found none in site content. Therefore no historical Sora callout or per-reference removal was required. The audit notes themselves mention the search terms.

The current video section uses Veo 3.1, Runway Gen-4.5, Kling 3.0 and Seedance 2.0, with access, credit and rights checks. The unsupported “highest benchmark quality”, blanket free-tier restrictions and fixed subscription estimate were omitted. No rate-card PDF or other PDF resource was found in either website repository, so there was no existing PDF to regenerate.

## Remaining inputs

1. **VAT status resolved:** Eric confirmed non-registration and authorised publication on 11 September 2026. `vatConfirmed` is true. The earlier refusal with unconfirmed status verified the publication guard.
2. **Three case studies:** for each, supply sector, organisation size, delivery month/year, two problem sentences, three delivery sentences, measured task, before/after minutes, number trained, task frequency, approximate monthly hours returned and the measurement method. Also supply one honest “what did not work” sentence, a quotation and permission to publish. No estimates or client claims have been invented.
3. **Funded-training maintenance:** the official links were checked and Eric authorised publication of the reviewed draft. The guide links current provider pages and makes changing availability explicit; eligibility must be checked with the provider when someone applies.
4. **CPD decision:** decide whether to pursue accreditation. All 24 booleans remain false. A badge requires an actual course award, provider name and evidence URL; no accreditation claim is displayed.
5. **Final review and publication authorised:** Eric requested publication on 11 September 2026. No live-agent sync, booking, contact-form submission or customer message is included in website deployment.

## Contradictions and factual corrections

| Area | Resolution |
| --- | --- |
| Government training | Selected courses meet the Skills England benchmark; the site does not claim all hub courses are accredited. |
| Corporate market comparison | Replaced a generic market-rate claim with one named provider and its actual virtual/in-person prices and different workshop scope. |
| Copilot access | Retained licence, app, permission and organisation-setting caveats. Training does not grant access. |
| Cowork costs | Removed unsupported light/heavy dollar examples and predictable-cost claims. `/cost` reports approximate usage already incurred, not an advance quote or invoice. Credit-limit enforcement can lag. |
| Agent Mode results | Removed the unsupported claim that forty minutes of spreadsheet work becomes four. Buyers are told to measure total effort, including review. |
| Small tool build | Kept the deployed-tool outcome with a tightly agreed one-hour scope and ready accounts. A production database, payments and security audit are separate. |
| AI Management Essentials | The policy page records the government's decision not to publish AIME or make it a procurement requirement. |
| EU AI literacy | Replaced the brief's outdated “sufficient level” wording with the current Commission context and an instruction to confirm organisational legal scope. |
| ISO/adoption claims | Omitted unsupported certification counts, audit-fee estimates and SME adoption percentages. |
| North East growth | Identified the 2025 jobs/investment numbers as launch projections. The youth pilot is planned for early 2027, not already accepting every learner. |
| Skills Bootcamps | Interview wording applies to eligible learners seeking new employment on successful completion; it is not a guaranteed job. Employer contributions and course eligibility can differ. |
| Old Bootcamp link | A former GOV.UK guidance URL redirected to a department homepage; replaced it with the current Skills for Careers page. |
| Article metadata | Fixed stale card excerpts and sitemap dates by connecting Markdown frontmatter to generated catalogue metadata. The apparent FAQ mismatch was only the accessibility “opens in a new tab” text; no public FAQ answer was changed. |
| Claude Code redirect | No old individual detail URL existed, so no URL was renamed and no 301 was needed. |

Primary references: [Cowork access](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-access), [credit usage](https://learn.microsoft.com/en-us/microsoft-365/copilot/usage-based-billing-copilot-credits-cost), [AIME response](https://www.gov.uk/government/consultations/ai-management-essentials-tool/outcome/guidance-for-using-the-ai-management-essentials-tool-government-response), [Commission AI literacy guidance](https://digital-strategy.ec.europa.eu/en/policies/ai-talent-skills-and-literacy), [Growth Zone announcement](https://www.gov.uk/government/news/north-east-england-set-for-billions-in-investment-and-thousands-of-jobs-as-uk-and-us-ink-tech-partnership), [youth pilot](https://www.gov.uk/government/news/entry-level-jobs-support-ai-bootcamps-and-tech-training-as-government-supports-young-people-into-the-jobs-of-the-future), [Bootcamps](https://www.skillsforcareers.education.gov.uk/pages/training-choice/skills-bootcamp).

## Verification

- TypeScript, client build, server build, static page generation and local agent-knowledge generation passed.
- The rendered audit passed **3,437 checks** across **60 HTML pages**, including **24 courses** and **59 sitemap URLs**. It checks internal destinations and anchors, required page structure, prices, schema/visible FAQ agreement, review footers, all course links and draft case-study conditions. It is not proof of the client facts still awaiting input.
- All eleven priced packages matched the requested ladder; every individual course Offer is GBP95 and corporate-only Agent 365 starts at GBP995. Both consultancy pages have their matching Service offers and FAQs.
- All 24 catalogue links resolve; only 23 topics are selectable individually. Every course ends with tangible deliverables and has a supporting blog link.
- The four relevant Copilot/employee articles link to course topics. Their sitemap dates use 11 September 2026, matching the actual content update.
- Tested eight representative pages at 375px and 1440px: no page-level horizontal overflow and one H1 each. Reviewed mobile/desktop screenshots of the shortlist. Three selected courses produce £270, save £15, and carry the same amount and VAT wording into booking notes.
- Browser-only metadata interception confirmed a review date and CPD badge can change without a rebuild. The interception was removed in `finally`; real metadata remains unaccredited.
- Browser console showed no application errors during these checks. Analytics correctly ignored localhost. Existing Vite warnings about large JavaScript chunks remain; no performance redesign was attempted.
- Publishing with unconfirmed VAT was refused before any copy. The parent deployment repository was clean at the review checkpoint. The original user sitemap edit is preserved in `sitemap-before.xml`.

## Changed files by priority

Files used in several tiers are listed under the first tier that changed them; their later role is covered above. Paths are relative to the source repository. Generated `dist` files are untracked build output; no generated files have been copied into the parent deployment repository.

### P0

- src/data/pricingPolicy.ts
- src/components/PricingContext.tsx
- src/components/PricingPage.tsx
- src/components/TrainingCatalogue.tsx
- src/components/CoursesUpgraded.tsx
- src/components/SeoLandingPage.tsx
- src/data/routes.ts
- src/data/training.ts
- src/entry-server.tsx
- scripts/prerender.mjs
- scripts/build-agent-knowledge.mjs
- agent/knowledge/03-pricing.md
- agent/knowledge/04-course-topics.md
- agent/knowledge/05-faq.md
- public/sitemap.xml

### P1

- src/data/trainingDetails.ts
- src/data/courseRoutes.ts
- src/data/serviceOffers.ts
- src/data/trainingSelection.ts
- src/data/services.ts
- src/components/Nav.tsx
- src/components/Services.tsx
- src/components/Footer.tsx
- src/components/PageHeroArtwork.tsx
- src/index.css
- agent/knowledge/02-services.md
- agent/avc-agent-prompt.md
- agent/whatsapp-prompt.md
- agent/README.md

### P2

- README.md
- public/content-metadata.json
- src/App.tsx
- src/components/CaseStudies.tsx
- src/components/ContentReview.tsx
- src/components/NorthEastContext.tsx
- src/components/VoiceAgent.tsx
- src/data/buyerFaqs.ts
- src/data/caseStudies.ts
- src/data/contentMetadata.ts
- src/data/courseContent.ts
- src/data/regional.ts
- src/data/blog.ts
- src/data/generatedBlogMetadata.json
- scripts/generate-sitemap.mjs
- scripts/generate-static-blog.py
- scripts/publish-to-site-root.mjs
- scripts/verify-website-brief.py
- content/blog/ai-training-for-employees.md
- content/blog/copilot-agent-mode-word-excel-powerpoint.md
- content/blog/copilot-cowork-and-credits.md
- content/blog/copilot-researcher-and-analyst-agents.md
- public/blog/8-ai-prompts-every-job-seeker-needs-right-now.html
- public/blog/ai-training-for-employees.html
- public/blog/copilot-agent-mode-word-excel-powerpoint.html
- public/blog/copilot-cowork-and-credits.html
- public/blog/copilot-notebooks-and-memory.html
- public/blog/copilot-researcher-and-analyst-agents.html
- public/blog/get-found-in-ai-search-local-business.html
- public/blog/how-to-start-an-ai-side-hustle.html
- public/blog/north-east-ai-growth-zone-small-business.html

The extra generated blog files changed only because their related-article cards now use the corrected titles/excerpts.

## Publication record

- Eric confirmed non-registration for VAT and explicitly authorised publication on 11 September 2026.
- The confirmed build passed TypeScript, client/SSR builds, prerendering and 3,437 rendered checks with no errors.
- Deployment repository: `Erickuby/aivision-website`, branch `main`.
- Release commit: `f01f32cb96608bc128a931e9385c48505dc8f0ce`.
- Deployment run: https://github.com/Erickuby/aivision-website/actions/runs/34620309566
- Previous release: `3c1351b86e475e6fa07de8927d6818b7fa2858c7`.
- Rollback, if needed: in the deployment repository, review the current branch for intervening changes, revert release commit `f01f32cb96608bc128a931e9385c48505dc8f0ce`, push the revert to `main`, wait for the SiteGround workflow and recheck the public pages. Do not reset or force-push the branch.
- SiteGround deployment succeeded. All 60 public HTML pages, four build assets, content metadata and sitemap returned HTTP 200 and matched the approved build after newline normalisation: 66/66 checks passed. Five initial network timeouts passed on retry; direct command-line requests were rejected by hosting, so verification used the browser. Results are saved in `live-audit.json`.
- The rendered live pricing page shows all 11 correct offers, the confirmed non-VAT-registered statement, 23 individual selectors and 24 course links. There were no application console errors; the existing Three.js clock deprecation warning remains.

### Review records spanning all tiers

- docs/website-update-2026-09/progress.md
- docs/website-update-2026-09/final-review.md
- docs/website-update-2026-09/rendered-audit.json
- docs/website-update-2026-09/sitemap-before.xml
- docs/website-update-2026-09/pricing-mobile.png
- docs/website-update-2026-09/pricing-desktop.png
