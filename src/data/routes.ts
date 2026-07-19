export const SITE_URL = 'https://aivisionconsulting.co.uk';

export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type FaqItem = { question: string; answer: string };

export type RouteKind = 'home' | 'service' | 'company' | 'pricing' | 'contact' | 'legal' | 'not-found';

export type SiteRoute = {
  path: string;
  kind: RouteKind;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: ContentSection[];
  faqs?: FaqItem[];
  noindex?: boolean;
};

const routes = [
  {
    path: '/', kind: 'home',
    title: 'AI Training & Automation Newcastle | AI Vision Consulting',
    description: 'Practical AI training and automation consulting for Newcastle organisations and UK businesses, with support for professionals, jobseekers and community groups.',
    eyebrow: 'Newcastle-based · Serving organisations across the UK',
    h1: 'Practical AI training and automation for Newcastle organisations and UK businesses',
    intro: 'Build useful AI capability, identify sensible automation opportunities and give your people the confidence to use modern tools responsibly.',
    sections: [],
  },
  {
    path: '/ai-training-newcastle/', kind: 'service', eyebrow: 'Local, practical AI learning',
    title: 'AI Training Newcastle | Practical Workshops for Teams',
    description: 'Practical AI training in Newcastle for businesses, teams and community organisations. Learn useful workflows, prompting and responsible adoption.',
    h1: 'Practical AI training for Newcastle teams and organisations',
    intro: 'AI training should connect directly to the work people already do. Sessions are designed around useful tasks, clear explanations and guided practice rather than technical jargon.',
    sections: [
      { heading: 'Training built around real work', paragraphs: ['Workshops can focus on everyday uses such as research, drafting, meeting preparation, document summarisation and process improvement. The aim is to help participants understand where AI is useful, where it is unreliable and how to review outputs with human judgement.', 'Content is scoped to the audience, existing confidence level and organisational context. Newcastle delivery can be discussed alongside remote options for teams elsewhere in the UK.'] },
      { heading: 'What a session can cover', paragraphs: ['A discovery conversation identifies the tasks and questions that matter to your group. From there, training can combine demonstrations, guided exercises and reusable working practices. Individuals can choose from twelve 90-minute topics, while organisations can select a focused workshop or a multi-session team programme.'], bullets: ['Choosing and using AI assistants effectively', 'Writing clearer prompts and providing useful context', 'Research, video, image and app-creation tools', 'AI agents, content systems, digital products and freelance services'] },
      { heading: 'Who this training is for', paragraphs: ['Training is suitable for businesses, public-facing teams, charities, community organisations and professionals who want a grounded introduction or a more focused practical session.', 'If your requirement spans several teams, the programme can be scoped in stages so that the material reflects different roles without cloning the same session for everyone.'] },
    ],
    faqs: [
      { question: 'Can AI training be delivered in Newcastle?', answer: 'Yes. In-person delivery in Newcastle can be discussed, alongside remote delivery for organisations elsewhere in the UK.' },
      { question: 'Do participants need technical experience?', answer: 'No. Sessions can start with the fundamentals and are scoped around the participants’ current confidence and work.' },
      { question: 'How much does AI training cost?', answer: 'A personal 90-minute session is £125. Private small-group sessions start at £325, and corporate team workshops start at £750. Multi-session bundles are also available.' },
    ],
  },
  {
    path: '/ai-automation-consultant-newcastle/', kind: 'service', eyebrow: 'Workflow-first automation advice',
    title: 'AI Automation Consultant Newcastle | Workflow Advice',
    description: 'AI automation consulting in Newcastle for organisations that want to map processes, assess opportunities and implement sensible workflows.',
    h1: 'AI automation consulting for Newcastle organisations',
    intro: 'Good automation starts with a clear process, not a fashionable tool. Consulting helps you understand repetitive work, information hand-offs and practical opportunities before deciding what to build.',
    sections: [
      { heading: 'Start with the workflow', paragraphs: ['The first step is to map how a task works today: who starts it, what information is needed, where decisions happen and what can go wrong. This makes it easier to distinguish a genuine automation opportunity from a task that still needs human attention.', 'Recommendations can cover simple rule-based automation, AI-assisted steps or a combination of both.'] },
      { heading: 'A measured route to implementation', paragraphs: ['Small, testable improvements are usually easier to review than a large system introduced all at once. A scoped engagement can document requirements, identify risks and define a pilot before further implementation.'], bullets: ['Process and bottleneck review', 'Data, privacy and human-approval considerations', 'Tool and integration options', 'Pilot scope and practical handover documentation'] },
      { heading: 'Local discussion, UK-wide support', paragraphs: ['Newcastle organisations can discuss local requirements and in-person working where appropriate. Remote consulting is also available for UK businesses.', 'Every project is scoped to the systems and constraints already in place. No outcome is assumed before the process has been reviewed.'] },
    ],
  },
  {
    path: '/corporate-ai-training-uk/', kind: 'service', eyebrow: 'Practical capability for UK teams',
    title: 'Corporate AI Training UK | Responsible, Practical Workshops',
    description: 'Corporate AI training for UK teams, covering practical use, prompting, responsible adoption and role-relevant workflows.',
    h1: 'Corporate AI training for UK teams',
    intro: 'Give colleagues a shared, practical understanding of AI while keeping the training relevant to their roles, responsibilities and organisational policies.',
    sections: [
      { heading: 'From awareness to useful practice', paragraphs: ['Corporate sessions can begin with a common foundation and move into examples that reflect the work of the people in the room. Participants learn how to give AI useful context, review results and recognise tasks where it should not be relied upon.', 'The content can support an initial awareness session or a more focused programme for particular functions.'] },
      { heading: 'Topics shaped around your organisation', paragraphs: ['A scoping conversation establishes the audience, available tools and internal expectations. Training can then address relevant workflows without asking staff to share confidential information in unsuitable systems.'], bullets: ['Generative AI foundations in plain English', 'Prompting and structured review', 'Responsible use, privacy and human oversight', 'Role-specific exercises and reusable workflows'] },
      { heading: 'Delivery, formats and starting prices', paragraphs: ['Sessions can be delivered remotely across the UK, with in-person delivery discussed where suitable. A 90-minute team workshop starts at £750, a half-day workshop at £1,250 and a full-day workshop at £2,000.', 'Three-workshop team programmes start at £2,100 and six-workshop capability programmes at £3,900. Final pricing reflects group size, preparation, location, additional cohorts and any custom requirements.'] },
    ],
  },
  {
    path: '/small-business-ai-automation/', kind: 'service', eyebrow: 'Simple systems for busy teams',
    title: 'Small Business AI Automation | Practical UK Support',
    description: 'Practical AI automation support for UK small businesses: review repetitive admin, map workflows and choose manageable tools.',
    h1: 'Practical AI automation for small businesses',
    intro: 'Small businesses need automation that is understandable, maintainable and connected to a real operational need. The work begins by identifying where time is spent and which steps are safe to streamline.',
    sections: [
      { heading: 'Focus on useful, repeatable tasks', paragraphs: ['Common starting points include enquiry handling, internal notifications, document preparation, information capture and routine follow-up. Each process needs to be reviewed for exceptions, data sensitivity and points where a person should remain in control.', 'AI can support judgement-heavy steps, while conventional automation can handle predictable actions.'] },
      { heading: 'Keep the system manageable', paragraphs: ['A useful workflow should be documented so the business understands what triggers it, what data it uses and how to intervene. Tool choices should reflect the team’s capacity rather than add unnecessary complexity.'], bullets: ['Current-process mapping', 'Opportunity and risk assessment', 'Pilot workflow design', 'Testing, documentation and handover'] },
      { heading: 'Scoped around your business', paragraphs: ['No two small businesses share exactly the same systems or priorities. A discovery call is used to understand your current workflow before any recommendation is made.', 'A tailored 90-minute personal AI training session is £125. Consulting, automation discovery and implementation are separate services and are quoted according to the workflow, systems and support required.'] },
    ],
  },
  {
    path: '/community-employability-ai-training/', kind: 'service', eyebrow: 'Accessible learning for communities',
    title: 'Community & Employability AI Training | UK Programmes',
    description: 'Accessible AI training for community groups, employability programmes and jobseekers, focused on practical skills and responsible use.',
    h1: 'Community and employability AI training',
    intro: 'Accessible sessions help people understand how AI can support job searching, learning and everyday work without presenting it as a shortcut or a replacement for personal judgement.',
    sections: [
      { heading: 'Plain English, guided practice', paragraphs: ['Training can introduce AI from the beginning, explain common limitations and give participants a safe way to practise. Exercises can cover researching roles, understanding job descriptions, preparing application material and planning interview practice.', 'Participants are encouraged to check every output, protect personal data and keep applications truthful.'] },
      { heading: 'Designed with delivery partners', paragraphs: ['Community organisations and employability providers can discuss participant needs, accessibility, session length and available devices before a programme is agreed.'], bullets: ['AI foundations and confidence building', 'Job-search research and application support', 'Prompting with clear context', 'Accuracy, privacy and honest use'] },
      { heading: 'A wider route into AI skills', paragraphs: ['The same practical foundation can also support people who want to use AI at work, explore a small business idea or continue learning independently.', 'Delivery can be scoped for Newcastle groups and for partners elsewhere in the UK.'] },
    ],
  },
  {
    path: '/about-eric-nwankwo/', kind: 'company', eyebrow: 'Founder of AI Vision Consulting Ltd',
    title: 'About Eric Nwankwo | AI Vision Consulting',
    description: 'Meet Eric Nwankwo, founder of Newcastle-based AI Vision Consulting Ltd, providing practical AI training and automation support.',
    h1: 'About Eric Nwankwo and AI Vision Consulting',
    intro: 'Eric Nwankwo founded AI Vision Consulting Ltd to make practical AI learning and workflow support easier to understand for organisations, professionals and communities.',
    sections: [
      { heading: 'A practical approach to AI', paragraphs: ['The focus is not on hype or abstract demonstrations. It is on helping people understand what a tool can do, apply it to a real task and keep the human judgement needed to review the result.', 'That approach connects training with process improvement: teams learn the foundations, then identify where a repeatable workflow may be worth documenting or automating.'] },
      { heading: 'Based in Newcastle, working across the UK', paragraphs: ['AI Vision Consulting Ltd is Newcastle-based and supports wider UK audiences through remote delivery. Local in-person work can be discussed according to the engagement.', 'Audiences include businesses, corporate teams, professionals, jobseekers and community or employability organisations.'] },
      { heading: 'Start with a conversation', paragraphs: ['A discovery call is a chance to explain your audience, workflow or training requirement. If there is a suitable next step, the work can then be scoped around the real requirement.', 'You can also explore the service pages to compare team training, automation consulting and community-focused delivery.'] },
    ],
  },
  {
    path: '/case-studies/', kind: 'company', eyebrow: 'How practical engagements are structured',
    title: 'AI Training & Automation Case Studies | AI Vision Consulting',
    description: 'Explore the types of AI training and automation work AI Vision Consulting supports. Named client case studies will only be published with permission.',
    h1: 'AI training and automation engagement examples',
    intro: 'This page explains the kinds of problems an engagement can address. It does not attribute work to unnamed clients or claim outcomes that have not been approved for publication.',
    sections: [
      { heading: 'Team AI training', paragraphs: ['A team-training engagement begins by understanding participant roles, current tool access and the tasks people want to improve. The session can then combine shared foundations with role-relevant practice.', 'Useful evidence from the engagement may include the agreed agenda, exercises delivered and questions identified for follow-up. Outcomes are not assumed in advance.'] },
      { heading: 'Workflow and automation review', paragraphs: ['An automation review maps a current process before tools are recommended. The review can identify repetitive steps, information dependencies, exceptions and points where a human approval should remain.', 'The resulting scope may recommend a small pilot, further discovery or no automation where the risks outweigh the benefit.'] },
      { heading: 'Community and employability delivery', paragraphs: ['Community-focused training can be shaped around confidence, accessibility and practical tasks such as job research or application preparation. Responsible use and truthful representation remain part of the session.', 'Named case studies, results or partner details will be added only where publication has been authorised.'] },
    ],
  },
  {
    path: '/pricing/', kind: 'pricing', eyebrow: 'Clear packages · Sensible scope',
    title: 'AI Training Prices & Corporate Packages | AI Vision Consulting',
    description: 'Fixed prices for 1-to-1 AI training, with clear starting prices for private groups, corporate workshops and team programmes.',
    h1: 'AI training prices for individuals and teams',
    intro: 'Choose a focused 90-minute session, build a personalised learning bundle or commission practical team training. Fixed individual prices and clear team starting points make it easier to identify the right level.',
    sections: [
      { heading: 'Personalised AI training', paragraphs: ['A focused 90-minute session is £125. Three-session bundles are £330, six-session bundles are £600 and the complete twelve-session programme is £1,080.', 'Each option is shaped around a defined learning goal and includes guided practice and relevant follow-up notes or resources.'] },
      { heading: 'Private groups and corporate teams', paragraphs: ['A private 90-minute small-group session for up to six people starts at £325. Corporate workshops start at £750 for 90 minutes, £1,250 for a half day and £2,000 for a full day.', 'Three-workshop corporate programmes start at £2,100 and six-workshop programmes start at £3,900.'] },
      { heading: 'Automation and implementation', paragraphs: ['Automation work depends on the current process, systems, integrations, testing and documentation required. Discovery and implementation may be scoped as separate stages.', 'A free discovery call can establish whether a focused consultation or a wider scope is the sensible next step.'] },
    ],
    faqs: [
      { question: 'Can I choose any training topic?', answer: 'Yes. A focused session can cover one of the twelve published topics. Bundles are combined into a personalised learning plan after a short goal check.' },
      { question: 'Why do corporate prices say “from”?', answer: 'The starting prices cover the stated group size, scoping, tailored delivery and participant resources. Travel, extra cohorts, venue hire, third-party software and custom development are quoted separately.' },
      { question: 'Can a small group book without a corporate package?', answer: 'Yes. A private 90-minute group session starts at £325 for up to six people working towards one shared outcome.' },
      { question: 'Are community and employability programmes available?', answer: 'Yes. These programmes are scoped around the cohort, accessibility needs, delivery format and available funding.' },
    ],
  },
  {
    path: '/contact/', kind: 'contact', eyebrow: 'Talk through your requirement',
    title: 'Contact AI Vision Consulting | Newcastle & UK',
    description: 'Contact AI Vision Consulting about practical AI training, automation consulting or community and employability programmes.',
    h1: 'Discuss your AI training or automation requirement',
    intro: 'Tell us about your team, workflow or learning goal. You can send a message, email, WhatsApp or book a free discovery call through Cal.com.',
    sections: [
      { heading: 'What to include', paragraphs: ['A useful enquiry explains who the work is for, the task or challenge you want to address, your preferred timing and whether delivery is in Newcastle or remote elsewhere in the UK.', 'If you are asking about automation, describe the current process and systems without sending confidential information through the form.'] },
    ],
  },
  {
    path: '/privacy-policy/', kind: 'legal', eyebrow: 'Your data', title: 'Privacy Policy | AI Vision Consulting', description: 'Privacy policy for AI Vision Consulting Ltd, including personal data use, retention and data protection rights.', h1: 'Privacy Policy', intro: '', sections: []
  },
  {
    path: '/terms-of-service/', kind: 'legal', eyebrow: 'Legal agreement', title: 'Terms of Service | AI Vision Consulting', description: 'Terms governing use of the AI Vision Consulting website, enquiries, bookings and the delivery of agreed training or consulting services.', h1: 'Terms of Service', intro: '', sections: []
  },
  {
    path: '/cookie-policy/', kind: 'legal', eyebrow: 'Tracking and storage', title: 'Cookie Policy | AI Vision Consulting', description: 'Cookie policy explaining the cookies and related technologies used by the AI Vision Consulting website, including analytics and preferences.', h1: 'Cookie Policy', intro: '', sections: []
  },
  {
    path: '/404.html', kind: 'not-found', eyebrow: '404 error', title: 'Page Not Found | AI Vision Consulting', description: 'The requested page could not be found.', h1: 'Page not found', intro: 'The page may have moved or the address may be incorrect. Use the links below to return to practical AI training and automation resources.', sections: [], noindex: true
  },
] as const satisfies readonly SiteRoute[];

export const siteRoutes: readonly SiteRoute[] = routes;
export const prerenderRoutes = siteRoutes.map((route) => route.path);

export function normalizeRoutePath(pathname: string) {
  const withoutQuery = pathname.split(/[?#]/)[0].toLowerCase();
  if (withoutQuery === '/' || withoutQuery === '/index.html') return '/';
  if (withoutQuery === '/404.html') return '/404.html';
  return `/${withoutQuery.replace(/^\/+|\/+$/g, '')}/`;
}

export function getSiteRoute(pathname: string): SiteRoute {
  const path = normalizeRoutePath(pathname);
  return siteRoutes.find((route) => route.path === path) ?? siteRoutes.find((route) => route.path === '/404.html')!;
}

export function routeCanonical(route: SiteRoute) {
  return `${SITE_URL}${route.path}`;
}
