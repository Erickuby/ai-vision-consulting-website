# Completed training update

Eric requested removal of unfinished case-study content and authorised naming FDQ, using its logo and consulting the FDQ training folder in Downloads. The page now contains only FDQ's completed Microsoft 365 Copilot workshop and the completed 12-week AI Vision Community course confirmed by Eric.

## FDQ evidence

- Company: FDQ Limited. Companies House records the Leeds address and the former name Food and Drink Qualifications Limited: https://find-and-update.company-information.service.gov.uk/company/05508318
- Public brand and activity: Food and Drink Qualifications; an awarding and end-point assessment organisation for the food and drink industry: https://www.fdq.org.uk/
- Workshop deck: `C:/Users/ericc/Downloads/FDQ Training/fdq-workshop-v3/2 ON THE DAY/FDQ_Practical_AI_Workshop_v4.pdf`. Its title page identifies Leeds, 3 September 2026 and a 90-minute session, “Practical AI for Everyday FDQ Work”. Core slides cover prompting, custom instructions, a prompt-writing agent, Outlook, Teams, notebooks and safe data handling.
- Supporting participant resources: `4 HANDOUTS (already sent)/FDQ_Follow_Along_Pack.pdf`, the participant prompt pack and prompt-builder guide in the same training folder.
- Logo copied unchanged from `fdq-workshop-v3/_archive/assets/fdq-logo.png`, matching the blue FDQ logo on the official website. Published at `/images/clients/fdq-logo.png`, with descriptive alt text and an official-site link.
- No participant numbers, productivity metrics, employee details or testimonials have been inferred from demonstration data. Optional annex exercises are not presented as separate completed training engagements. No private training files or recordings were uploaded.

## Changes

Removed the three empty case-study templates, prospective engagement descriptions and the old nine-week wording. Updated the homepage and case-study page with FDQ Limited's full name, Leeds location and logo. Added the workshop date, scope and resource summary. Preserved the completed 12-week community course and confirmed non-VAT-registered prices.

## Release and verification

The first completed-training release was `51536b7dfea227264523603eb0c24036628b1b0a`; SiteGround run 34622079914 succeeded. The final release is `6d4301fd24f21fd2bcd39213afa37be3d400b063`, deployed successfully in SiteGround run 34622613083: https://github.com/Erickuby/aivision-website/actions/runs/34622613083

TypeScript, client and SSR builds, 42 prerendered routes and 3,432 rendered checks passed. A text scan of all 60 HTML pages found no unfinished training entries. The live case-study page shows exactly two completed entries, FDQ Limited's full name, Leeds, 3 September 2026, the 90-minute session and a successfully loaded logo. The live homepage also contains the name and logo. Mobile verification at 390 pixels found no horizontal overflow; the reviewed screenshot is `fdq-training-mobile.png`.

Rollback if needed: review intervening deployment commits, revert `6d4301fd24f21fd2bcd39213afa37be3d400b063`, push the revert to main, wait for SiteGround and verify. This restores the first completed-training version, not the old empty templates.
