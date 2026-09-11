export type DetailedTopic = {
  title: string;
  description: string;
  coursePath: string;
  family: string;
  audience: string;
  practice: string[];
  prerequisites: string;
  limitation: string;
  outcomes: string[];
  blog: { href: string; label: string };
  corporateOnly?: boolean;
};

export const detailedTopics: Record<string, DetailedTopic> = {
  'choosing-ai-tools': {
    title: 'Choosing the right AI tools',
    description: 'Test AI tools against your own tasks, privacy needs and budget. Compare paid subscriptions, lower-cost tiers and open-weight models before choosing what to pay for.',
    coursePath: '/courses/choosing-ai-tools/', family: 'AI foundations',
    audience: 'Professionals, jobseekers and business owners choosing a first subscription or reviewing tools they already pay for.',
    practice: ['We score a shortlist such as ChatGPT, Claude, Gemini and Microsoft Copilot against the same approved task. We compare the quality of the answer, the work needed to correct it and the features your actual account includes.', 'We also consider lower-cost plans such as ChatGPT Go and Google AI Plus where available. For Qwen and DeepSeek, we check the specific model licence, hosting arrangement and data handling: open-weight does not mean unrestricted use.'],
    prerequisites: 'Bring one or two representative tasks, your current subscriptions and your budget. Use public, fictional or approved anonymised material.',
    limitation: 'A focused hour produces a useful shortlist, not an exhaustive benchmark. Prices and features change, and a cheaper plan is only a recommendation when it meets your needs.',
    outcomes: ['A scored comparison against your own tasks', 'A subscription recommendation with the reasons and current costs recorded', 'A clear rule for information that must never go into a public tool'],
    blog: { href: '/blog/what-is-ai.html', label: 'A plain-English introduction to AI' },
  },
  'build-working-tool': {
    title: 'Build a working tool without writing code',
    description: 'Build and publish one tightly scoped tool, such as a calculator or checklist, with AI. Compare Claude Code, Lovable, Replit, Bolt and Base44 for the job.',
    coursePath: '/courses/build-working-tool/', family: 'AI foundations',
    audience: 'Non-technical professionals, freelancers and small-business owners with one practical problem to solve.',
    practice: ['We agree a small build before the session: for example, a single-page calculator, a checklist or a landing page. You describe the behaviour, review what the tool creates and test it with ordinary and awkward inputs.', 'We compare Claude Code for work involving local files and repeatable tasks with hosted builders such as Lovable, Replit, Bolt and Base44. The choice depends on access, hosting, portability and ongoing cost. We deploy the agreed small tool to an account you control and retain its prompts and available project files.'],
    prerequisites: 'Bring a scoped problem, sample inputs and an account on the agreed platform. Any hosting or platform subscription is separate from training.',
    limitation: 'One hour is suitable for a small, pre-agreed tool with accounts ready. It does not cover a production database, payment system, security audit or complex integration. Platform terms and export options affect what you can move elsewhere.',
    outcomes: ['A working small tool deployed to your agreed account', 'The prompts and available project files used to build it', 'A platform-choice and running-cost note, plus a basic test checklist'],
    blog: { href: '/blog/how-to-start-an-ai-side-hustle.html', label: 'Build a useful AI-assisted service' },
  },
  'connecting-ai-tools': {
    title: 'Connecting AI to your other tools',
    description: 'Connect one approved system through the Model Context Protocol and create a reusable skill file for a recurring task, with clear access and security checks.',
    coursePath: '/courses/connecting-ai-tools/', family: 'AI foundations · Advanced',
    audience: 'Confident AI users ready to connect a tool to a real system and repeat a process consistently.',
    practice: ['The Model Context Protocol, or MCP, lets a compatible AI application use tools or information supplied by another system. We configure one agreed connection with the minimum useful access and test what it can read or change.', 'We then turn one recurring process into a reusable skill file containing your instructions and review steps. We check the source of the connector, credentials, data destination and the actions that require your approval.'],
    prerequisites: 'A compatible AI application, an approved connector and permission to use the chosen system. Agree the connection before booking; start with a test account or low-risk data.',
    limitation: 'A focused hour covers one supported connection and one small skill. Custom connector development, organisation-wide deployment and security certification are separate work.',
    outcomes: ['One working connection to the agreed system', 'One reusable skill file for your recurring process', 'A security checklist for future connections'],
    blog: { href: '/blog/what-to-automate-first-small-business.html', label: 'Choose what to automate first' },
  },
  'copilot-cowork-agent-mode': {
    title: 'Copilot Cowork and Agent Mode in practice',
    description: 'Run one multi-step workplace task with Copilot Cowork and practise editing in supported Microsoft 365 apps. Build in checkpoints before anyone uses the output.',
    coursePath: '/courses/copilot-cowork-agent-mode/', family: 'Microsoft 365 Copilot for Work',
    audience: 'Professionals working with email, meetings, documents, spreadsheets or presentations. Also available within any corporate workshop tier.',
    practice: ['We compare in-app Agent Mode with Cowork: working on a document or workbook, then delegating a bounded task across approved sources. App support and access vary, so we check what your account actually provides.', 'You define an outcome, review the proposed steps, inspect intermediate results and correct the final output. We identify the points that need your judgement before anything is shared with a customer, colleague or committee.'],
    prerequisites: 'An eligible work account, enabled Cowork access and the required credit policy, plus suitable access to the Microsoft 365 apps used. Bring approved or anonymised examples; we check availability during the discovery call.',
    limitation: 'One hour covers one agreed task. It does not automate an entire role or remove the need to check facts, permissions and recipients. Software licences and usage credits are separate.',
    outcomes: ['A tested Cowork task using your approved material', 'A checkpoint checklist for reviewing intermediate and final output', 'A shortlist of recurring jobs that are suitable, and those to keep manual'],
    blog: { href: '/blog/copilot-agent-mode-word-excel-powerpoint.html', label: 'How Agent Mode works in Microsoft 365 apps' },
  },
  'copilot-costs': {
    title: 'What Copilot actually costs to run',
    description: 'Estimate monthly Copilot Credit usage for your team, separate licence charges from usage charges and set practical spending and review rules.',
    coursePath: '/courses/copilot-costs/', family: 'Microsoft 365 Copilot for Work · Leadership and finance',
    audience: 'The person approving AI spend, team leaders and finance colleagues. Book an individual hour or add this topic to a Copilot workshop.',
    practice: ['We map likely tasks, how often they run and who uses them. Cowork consumption depends on the work performed, so we use observed examples and the current licensing terms to build a range of monthly scenarios.', 'We distinguish approximate task usage from authoritative billing records. Cowork’s /cost command helps review usage already incurred; it is not an advance quote. We agree an owner, review frequency and escalation rules alongside available spending controls.'],
    prerequisites: 'Your actual licences and billing arrangement, the team size, a shortlist of recurring tasks and any available usage records. A finance or administration colleague may need to provide these.',
    limitation: 'The estimate is a planning model, not a guaranteed bill. Credit reporting and enforcement may be delayed, and a spending limit is not a substitute for controlling who can access a service.',
    outcomes: ['An estimated monthly credit-consumption model with assumptions', 'Internal usage and spending-review guidelines', 'A short finance briefing explaining the options and uncertainties'],
    blog: { href: '/blog/copilot-cowork-and-credits.html', label: 'Understand Cowork and Copilot Credits' },
  },
  'agent-365-governance': {
    title: 'Governing AI agents with Agent 365',
    description: 'Review the agents in your organisation, their permissions and accountable owners. Draft an approval and review process with your IT and information-governance team.',
    coursePath: '/courses/agent-365-governance/', family: 'Microsoft 365 Copilot for Work · Corporate only', corporateOnly: true,
    audience: 'IT, information governance and senior information risk owners (SIROs). This is an organisational workshop, not an individual beginner session.',
    practice: ['Using authorised tenant information, we review the agent registry, identities, permissions, ownership and lifecycle controls. We identify which agents can reach sensitive systems and which need further investigation.', 'We draft the approval, review and retirement process, assign accountable roles and record risks that require a decision. Any configuration changes follow your own change-approval process.'],
    prerequisites: 'Relevant administration access, suitable licensing and participation from the people responsible for IT, information governance and business ownership. Scope is agreed before the workshop.',
    limitation: 'A scoped workshop covers the agreed tenant and available evidence. It is not a complete security audit, certification or automatic approval of every agent; gaps and follow-up actions are recorded.',
    outcomes: ['An inventory of the agents reviewed and any coverage gaps', 'A draft agent approval, review and retirement process', 'A risk register distinguishing accepted risks from decisions still awaiting an owner'],
    blog: { href: '/blog/copilot-oversharing-data-readiness.html', label: 'Review data access before expanding Copilot' },
  },
};
