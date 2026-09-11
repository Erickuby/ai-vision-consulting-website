import type { SiteRoute } from './routes';

export const consultancyOffers = [
  {
    name: 'AI policy and governance package', price: 'From £1,750',
    href: '/services/ai-policy-and-governance/',
    format: 'Scoped package · typically three to four weeks',
    description: 'Give a small organisation clear rules for AI use, an inventory of tools and risks, and practical staff training.',
    features: ['Plain-English policy and staff data note', 'Tool inventory, risk register and sign-off route', 'Role-based literacy training and final pack'],
  },
  {
    name: 'AI readiness and workflow audit', price: 'From £950',
    href: '/services/ai-workflow-audit/',
    format: 'Half-day discovery on site or online, followed by a written report',
    description: 'Map where time goes and choose the first workflow to improve using a scored shortlist and costed options.',
    features: ['Task inventory and estimated weekly time costs', 'Shortlist scored by time, risk and effort', 'Audit fee credited in full against a workshop or programme booked within 60 days'],
  },
];

export const consultancyRoutes: SiteRoute[] = [
  {
    path: consultancyOffers[0].href, kind: 'service',
    title: 'AI Policy and Governance for Small Organisations | AI Vision',
    description: 'Practical AI policy, tool inventory, risk register and staff training for small organisations. A scoped package from £1,750.',
    eyebrow: 'Practical governance for small organisations',
    h1: 'AI policy and governance for small organisations',
    intro: 'Give staff clear rules about which AI tools they can use, what information they can enter and who approves the result. Build a short policy people can use, backed by training and accountable owners.',
    lastReviewed: '2026-09-10', pricingHref: '#price-and-scope', serviceOffer: consultancyOffers[0],
    sections: [
      { heading: 'Start with what people are actually doing', paragraphs: ['A useful policy reflects the tools, tasks and information in your organisation. We review current practice with you, identify the decisions that need an owner and explain the rules in everyday language.', 'This package suits smaller businesses, charities and small public bodies that need an agreed starting point for responsible AI use. Formal certification and specialist legal advice are separate services.'] },
      { heading: 'Why a practical starting point matters', paragraphs: ['In February 2026, the UK government confirmed it would not publish the proposed AI Management Essentials tool or make it a government procurement requirement. A small organisation still needs to decide its own rules, responsibilities and review process.', 'For organisations within the scope of the EU AI Act, AI literacy duties remain relevant. Current European Commission guidance reflects amendments made in July 2026 and no longer describes a mandated sufficient level. We help record practical training and decisions; your legal adviser should confirm which obligations apply to your organisation.'] },
      { heading: 'What you get', paragraphs: ['We agree the scope before work starts and assemble a practical pack your staff and managers can use.'], bullets: ['An AI use policy, typically three to four pages, in plain English', 'A tool inventory recording owners, users, data entered and whether provider terms allow training on that data', 'A staff data note explaining what can and cannot be entered into each tool', 'A risk register distinguishing identified risks, agreed mitigations and explicitly accepted risks', 'Role-based AI literacy training with a record of participation and material covered', 'A sign-off route for new tools, policy reviews and unresolved questions'] },
      { heading: 'How it works', paragraphs: ['We start with a discovery conversation, review your existing practices and prepare a draft for comment. We then deliver the agreed training session and finalise the pack with named owners and review dates.', 'A typical engagement takes three to four weeks, depending on access to the relevant people and feedback.'] },
      { heading: 'Price and scope', paragraphs: ['From £1,750. Once the scope is agreed, we provide a fixed fee for the package. Larger or multi-site organisations, ISO 42001 alignment and work involving EU AI Act obligations are quoted individually.', 'This is practical governance support, not certification, a legal opinion or a guarantee of compliance. Your organisation remains responsible for approving the policy, implementing controls and obtaining specialist advice where needed. Travel outside Tyne and Wear and any software licences are quoted separately.'] },
    ],
    faqs: [
      { question: 'Do small businesses need an AI policy?', answer: 'If staff use AI for work, an agreed policy can clarify approved tools, permitted data, review duties and accountability. The necessary controls depend on your organisation and use cases; this package is scoped around those facts.' },
      { question: 'What does an AI policy package cost?', answer: 'The package starts at £1,750. We agree a fixed fee after discovery. Larger organisations and specialist regulatory or certification-alignment work need an individual quote.' },
      { question: 'Does this include certification?', answer: 'No. You receive a policy, supporting registers, staff guidance, role-based training and a sign-off process. This is not ISO certification or a guarantee of legal compliance.' },
    ],
    relatedLinks: [
      { href: '/blog/copilot-oversharing-data-readiness.html', label: 'Check data access before expanding AI use' },
      { href: 'https://www.gov.uk/government/consultations/ai-management-essentials-tool/outcome/guidance-for-using-the-ai-management-essentials-tool-government-response', label: 'Government response on AI Management Essentials' },
      { href: 'https://digital-strategy.ec.europa.eu/en/policies/ai-talent-skills-and-literacy', label: 'European Commission guidance on AI literacy' },
    ],
  },
  {
    path: consultancyOffers[1].href, kind: 'service',
    title: 'AI Readiness and Workflow Audit | AI Vision Consulting',
    description: 'Choose what to automate first with a half-day workflow review, scored shortlist and costed report. AI readiness audits start at £950.',
    eyebrow: 'Choose the first useful improvement',
    h1: 'AI readiness and workflow audit',
    intro: 'Find out where repetitive work costs your team time, which changes are worth testing and which tasks should stay with people. Leave with a prioritised plan before committing to a build.',
    lastReviewed: '2026-09-10', pricingHref: '#price-and-audit-credit', serviceOffer: consultancyOffers[1],
    sections: [
      { heading: 'Map the work before buying more tools', paragraphs: ['We work with the people doing the task to understand the steps, handovers, delays and exceptions. Estimates are recorded as estimates; we do not present unmeasured savings as achieved results.', 'This is focused consultancy. It helps you decide what to improve and in what order, with realistic assumptions about implementation and ongoing costs.'] },
      { heading: 'What you get', paragraphs: ['The engagement includes discovery and a written report, with the scope agreed in advance.'], bullets: ['Half a day on site or online with the people doing the work', 'An inventory of repetitive tasks with estimated weekly time costs', 'A shortlist scored by potential time saved, error risk and implementation effort', 'A recommended first workflow with human checkpoints marked', 'A written report with costed options, assumptions and a realistic sequence'] },
      { heading: 'Price and audit credit', paragraphs: ['From £950. The audit fee is credited in full against any workshop or programme booked within 60 days of the audit. The quote records the eligible credit and booking deadline.', 'Software licences and travel outside Tyne and Wear are quoted separately. Building or deploying the recommended workflow is separate work, with its own agreed scope and price.'] },
      { heading: 'A clear limit to the promise', paragraphs: ['The audit does not guarantee savings or implement every recommendation. It identifies candidates to test; measured results come from an agreed pilot using your actual baseline and review criteria.'] },
    ],
    faqs: [
      { question: 'How much does an AI workflow audit cost?', answer: 'The audit starts at £950 and includes a half-day review and written recommendations. Scope, travel outside Tyne and Wear and any extra requirements are agreed before booking.' },
      { question: 'How does the audit credit work?', answer: 'The audit fee is credited in full against any workshop or programme booked within 60 days of the audit. The quote records the credit and deadline so you can compare the total cost before committing.' },
      { question: 'Does the audit include building an automation?', answer: 'No. It provides a task inventory, scored shortlist, recommended workflow and costed options. Implementation is quoted separately after you choose what to proceed with.' },
      { question: 'Should we try free AI training before paying for an audit?', answer: 'Free courses are a useful start for general skills. An audit answers a different practical question: which of your actual workflows is worth changing, given its time cost, risks and implementation effort. We check whether that work is needed during the discovery call.' },
    ],
    relatedLinks: [{ href: '/blog/what-to-automate-first-small-business.html', label: 'How to choose your first automation' }],
  },
];
