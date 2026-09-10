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
  // Where the hero 'View pricing' button goes. Defaults to /pricing/, which is the course
  // catalogue. A service that publishes its own figures on the page should point at that
  // section instead, or the button sends a buyer to prices for a different product.
  pricingHref?: string;
  faqs?: FaqItem[];
  noindex?: boolean;
};

const routes = [
  {
    path: '/', kind: 'home',
    // Aimed at local and branded intent, not the generic "ai consulting" term. On that
    // query the results page is four paid ads, an AI Overview citing McKinsey and EY, and
    // big brands above us at position seven; no title wins that. On the "near me" searches
    // we already rank one to two, so the job of these tags is to be the obvious local
    // choice for someone who has decided to hire somebody nearby.
    title: 'AI Consultant Newcastle | AI and Copilot Training for Teams',
    description: 'Newcastle based AI consultant. Practical AI and Microsoft 365 Copilot training for teams, plus automation that saves hours. Book a free discovery call.',
    eyebrow: 'Newcastle-based · Serving organisations across the UK',
    h1: 'Practical AI training and automation for Newcastle organisations and UK businesses',
    intro: 'Build useful AI capability, identify sensible automation opportunities and give your people the confidence to use modern tools responsibly.',
    sections: [],
  },
  {
    path: '/ai-training-newcastle/', kind: 'service', eyebrow: 'Local, practical AI learning',
    title: 'AI Training Newcastle | Practical Workshops for Your Team',
    description: 'In person and online AI training for Newcastle teams. Practical sessions on AI tools, prompting and safe adoption. Team workshops from £995.',
    h1: 'Practical AI training for Newcastle teams and organisations',
    intro: 'AI training should connect directly to the work people already do. Sessions are designed around useful tasks, clear explanations and guided practice rather than technical jargon.',
    sections: [
      { heading: 'Training built around real work', paragraphs: ['Workshops can focus on everyday uses such as research, drafting, meeting preparation, document summarisation and process improvement. The aim is to help participants understand where AI is useful, where it is unreliable and how to review outputs with human judgement.', 'Content is scoped to the audience, existing confidence level and organisational context. Newcastle delivery can be discussed alongside remote options for teams elsewhere in the UK.'] },
      { heading: 'What a session can cover', paragraphs: ['A discovery conversation identifies the tasks and questions that matter to your group. From there, training can combine demonstrations, guided exercises and reusable working practices. Individuals can choose from twelve Practical AI topics in one-hour sessions, or a separate Microsoft 365 Copilot for Work route, while organisations can select a focused workshop or a multi-session team programme.'], bullets: ['Choosing and using AI assistants effectively', 'Writing clearer prompts and providing useful context', 'Research, video, image and app-creation tools', 'AI agents, content systems, digital products and freelance services'] },
      { heading: 'Who this training is for', paragraphs: ['Training is suitable for businesses, public-facing teams, charities, community organisations and professionals who want a grounded introduction or a more focused practical session.', 'If your requirement spans several teams, the programme can be scoped in stages so that the material reflects different roles without cloning the same session for everyone.'] },
    ],
    faqs: [
      { question: 'Can AI training be delivered in Newcastle?', answer: 'Yes. In-person delivery in Newcastle can be discussed, alongside remote delivery for organisations elsewhere in the UK.' },
      { question: 'Do participants need technical experience?', answer: 'No. Sessions can start with the fundamentals and are scoped around the participants’ current confidence and work.' },
      { question: 'How much does AI training cost?', answer: 'A personal one-hour session is £75. Two sessions are £140 and three are £195. Private small-group sessions start at £325, and corporate team workshops start at £995. Multi-session bundles are also available.' },
    ],
  },
  {
    path: '/ai-automation-consultant-newcastle/', kind: 'service', eyebrow: 'Workflow-first automation advice',
    title: 'AI Automation Consultant Newcastle | Save Your Team Hours',
    description: 'Newcastle based AI automation consultant. We map where your team loses hours, then build workflows that hold up. Free 20 minute discovery call.',
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
    title: 'Corporate AI Training UK | Team Workshops from £995',
    description: 'Corporate AI and Microsoft 365 Copilot training for UK teams. Half day, full day and multi workshop programmes, scoped to your objectives.',
    h1: 'Corporate AI training for UK teams',
    intro: 'Give colleagues a shared, practical understanding of AI while keeping the training relevant to their roles, responsibilities and organisational policies.',
    sections: [
      { heading: 'From awareness to useful practice', paragraphs: ['Corporate sessions can begin with a common foundation and move into examples that reflect the work of the people in the room. Participants learn how to give AI useful context, review results and recognise tasks where it should not be relied upon.', 'The content can support an initial awareness session or a more focused programme for particular functions.'] },
      { heading: 'Topics shaped around your organisation', paragraphs: ['A scoping conversation establishes the audience, available tools and internal expectations. Training can then address relevant workflows without asking staff to share confidential information in unsuitable systems.'], bullets: ['Generative AI foundations in plain English', 'Prompting and structured review', 'Responsible use, privacy and human oversight', 'Role-specific exercises and reusable workflows'] },
      { heading: 'Delivery, formats and starting prices', paragraphs: ['Sessions can be delivered remotely across the UK, with in-person delivery discussed where suitable. A 90-minute team workshop starts at £995, a half-day workshop at £1,250 and a full-day workshop at £2,000.', 'Three-workshop team programmes start at £2,100 and six-workshop capability programmes at £3,900. Final pricing reflects group size, preparation, location, additional cohorts and any custom requirements.'] },
    ],
  },
  {
    path: '/ai-voice-assistant/', kind: 'service', eyebrow: 'Working example on this page',
    pricingHref: '#what-it-costs',
    title: 'AI Voice Assistant for Your Website | AI Vision Consulting',
    description: 'An AI assistant that answers customer questions in your words and books real appointments. Try the live one on this page. From £1,200 setup, £150 a month.',
    h1: 'AI voice assistants that answer questions and book appointments',
    intro: 'Most websites sit there. A visitor arrives, reads a page, leaves, and you never know they came. An AI assistant answers their question in your own words, and books them in while they are still interested.',
    sections: [
      {
        heading: 'Try it before you decide anything',
        paragraphs: [
          'There is an assistant in the corner of this page. It is not a demo video or a mock-up. It answers questions about this business using the prices published on this site, checks a real calendar, and books a real appointment.',
          'Speak to it, ask what a session costs, then ask it to book you in. Whatever it does for AI Vision Consulting is what it can do for your organisation.',
        ],
      },
      {
        heading: 'What it does',
        paragraphs: [
          'The assistant is built from your existing material: your services, your prices, your opening hours and your frequently asked questions. It answers in your own words rather than generic marketing language.',
          'When someone is ready, it collects their details, checks live availability and creates the booking. If they are interested but not ready, it captures the enquiry so nothing is lost.',
        ],
        bullets: [
          'Answers questions about your services and prices',
          'Checks live calendar availability',
          'Books appointments and confirms by email',
          'Captures enquiries when someone is not ready to book',
          'Hands over to a person when asked',
        ],
      },
      {
        heading: 'What it will not do',
        paragraphs: [
          'This matters more than the feature list. An assistant that invents a price or promises an appointment that does not exist costs you more than having no assistant at all.',
          'Yours is built to refuse. It states only prices you have published. It never quotes a starting price as if it were final. It never claims availability without checking the calendar. When it does not know, it says so and offers a human instead of guessing.',
          'It also identifies itself as an AI on every conversation. Callers are told plainly that they are not speaking to a person.',
        ],
      },
      {
        heading: 'Where it can run',
        paragraphs: [
          'The website is the usual starting point, because visitors are already there and already interested. The same assistant can also answer on WhatsApp, or on a phone line, using your existing business number.',
          'Each channel is scoped separately, because WhatsApp and telephony involve verification steps and per-message costs that a website widget does not.',
        ],
      },
      {
        heading: 'What it costs',
        paragraphs: [
          'Setup starts at £1,200 and covers scoping, building the assistant from your own content, connecting your calendar, testing it against real booking scenarios and putting it live on your site.',
          'Ongoing support is £150 per month and covers hosting the assistant, monitoring conversations, keeping its knowledge in step with your prices and services, and adjusting how it answers as you learn what customers actually ask.',
          'These are starting prices. The final figure depends on how many services you offer, which systems it connects to and how many channels you want it on. Third-party usage charges, for example voice minutes and messaging fees, are billed at cost and are separate.',
        ],
        bullets: [
          'Setup from £1,200, one-off',
          'Support and hosting £150 per month',
          'Voice and messaging usage billed at cost',
          'Additional channels quoted separately',
        ],
      },
      {
        heading: 'How the work runs',
        paragraphs: [
          'A discovery call establishes what your customers actually ask and what a useful outcome looks like. The assistant is then built from your published material and tested against real scenarios, including the awkward ones, before it goes anywhere near your visitors.',
          'You see it working and approve it before it goes live. Nothing is switched on without you hearing it first.',
        ],
      },
    ],
    faqs: [
      { question: 'Can I try it before committing?', answer: 'Yes. The assistant on this page is a working example, not a recording. Ask it about prices or ask it to book you a discovery call.' },
      { question: 'Will it make up prices or promise appointments it cannot honour?', answer: 'No. It states only prices you have published, and it cannot confirm a booking until your calendar has accepted it. Where it does not know something, it says so and offers to pass the question to a person.' },
      { question: 'Does it replace my staff?', answer: 'No. It handles the repetitive questions that arrive outside working hours or while your team is busy, and it hands over to a person whenever someone asks.' },
      { question: 'What happens when it is wrong?', answer: 'It is built to decline rather than guess, and conversations are reviewable so anything it handles badly can be corrected. That is part of the monthly support.' },
      { question: 'Do my customers know they are talking to an AI?', answer: 'Yes, and it says so at the start of every conversation. Anything else would be misleading, and it breaks trust the moment somebody works it out.' },
      { question: 'Can it work on WhatsApp or a phone line as well?', answer: 'Yes. The same assistant can answer on WhatsApp or a phone number. Those channels involve verification and per-message costs, so they are scoped and quoted separately.' },
      { question: 'How long does it take to build?', answer: 'A straightforward website assistant is usually ready to review within a couple of weeks of the discovery call, depending on how quickly your content and calendar access are available.' },
    ],
  },
  {
    path: '/small-business-ai-automation/', kind: 'service', eyebrow: 'Simple systems for busy teams',
    title: 'Small Business AI Automation | Practical Help in the UK',
    description: 'Practical AI automation for UK small businesses. Cut repetitive admin, enquiry handling and follow up without adding complexity. Free discovery call.',
    h1: 'Practical AI automation for small businesses',
    intro: 'Small businesses need automation that is understandable, maintainable and connected to a real operational need. The work begins by identifying where time is spent and which steps are safe to streamline.',
    sections: [
      { heading: 'Focus on useful, repeatable tasks', paragraphs: ['Common starting points include enquiry handling, internal notifications, document preparation, information capture and routine follow-up. Each process needs to be reviewed for exceptions, data sensitivity and points where a person should remain in control.', 'AI can support judgement-heavy steps, while conventional automation can handle predictable actions.'] },
      { heading: 'Keep the system manageable', paragraphs: ['A useful workflow should be documented so the business understands what triggers it, what data it uses and how to intervene. Tool choices should reflect the team’s capacity rather than add unnecessary complexity.'], bullets: ['Current-process mapping', 'Opportunity and risk assessment', 'Pilot workflow design', 'Testing, documentation and handover'] },
      { heading: 'Scoped around your business', paragraphs: ['No two small businesses share exactly the same systems or priorities. A discovery call is used to understand your current workflow before any recommendation is made.', 'A tailored one-hour personal AI or Microsoft 365 Copilot training session is £75. Consulting, automation discovery and implementation are separate services and are quoted according to the workflow, systems and support required.'] },
    ],
  },
  {
    path: '/community-employability-ai-training/', kind: 'service', eyebrow: 'Accessible learning for communities',
    title: 'Community & Employability AI Training | UK Programmes',
    description: 'Accessible AI training for community groups, charities and employability programmes. Practical skills, responsible use, scoped around available funding.',
    h1: 'Community and employability AI training',
    intro: 'Accessible sessions help people understand how AI can support job searching, learning and everyday work without presenting it as a shortcut or a replacement for personal judgement.',
    sections: [
      { heading: 'Plain English, guided practice', paragraphs: ['Training can introduce AI from the beginning, explain common limitations and give participants a safe way to practise. Exercises can cover researching roles, understanding job descriptions, preparing application material and planning interview practice.', 'Participants are encouraged to check every output, protect personal data and keep applications truthful.'] },
      { heading: 'Designed with delivery partners', paragraphs: ['Community organisations and employability providers can discuss participant needs, accessibility, session length and available devices before a programme is agreed.'], bullets: ['AI foundations and confidence building', 'Job-search research and application support', 'Prompting with clear context', 'Accuracy, privacy and honest use'] },
      { heading: 'A wider route into AI skills', paragraphs: ['The same practical foundation can also support people who want to use AI at work, explore a small business idea or continue learning independently.', 'Delivery can be scoped for Newcastle groups and for partners elsewhere in the UK.'] },
    ],
  },
  {
    path: '/about-eric-nwankwo/', kind: 'company', eyebrow: 'Founder of AI Vision Consulting',
    title: 'About Eric Nwankwo | AI Vision Consulting',
    description: 'Meet Eric Nwankwo, founder of Newcastle-based AI Vision Consulting, providing practical AI training and automation support.',
    h1: 'About Eric Nwankwo and AI Vision Consulting',
    intro: 'Eric Nwankwo runs AI Vision Consulting to make practical AI learning and workflow support easier to understand for organisations, professionals and communities.',
    sections: [
      { heading: 'A practical approach to AI', paragraphs: ['The focus is not on hype or abstract demonstrations. It is on helping people understand what a tool can do, apply it to a real task and keep the human judgement needed to review the result.', 'That approach connects training with process improvement: teams learn the foundations, then identify where a repeatable workflow may be worth documenting or automating.'] },
      { heading: 'Based in Newcastle, working across the UK', paragraphs: ['AI Vision Consulting is Newcastle-based and supports wider UK audiences through remote delivery. Local in-person work can be discussed according to the engagement.', 'Audiences include businesses, corporate teams, professionals, jobseekers and community or employability organisations.'] },
      { heading: 'Start with a conversation', paragraphs: ['A discovery call is a chance to explain your audience, workflow or training requirement. If there is a suitable next step, the work can then be scoped around the real requirement.', 'You can also explore the service pages to compare team training, automation consulting and community-focused delivery.'] },
    ],
  },
  {
    path: '/case-studies/', kind: 'company', eyebrow: 'How practical engagements are structured',
    title: 'AI Training & Automation Case Studies | AI Vision Consulting',
    description: 'Explore the types of AI training and automation work AI Vision Consulting supports. Named client case studies will only be published with permission.',
    h1: 'AI training and automation engagement examples',
    intro: 'A look at delivered training and the practical questions that shape our work. Client names, recordings and measured results are only shared with permission.',
    sections: [
      { heading: 'Delivered: Microsoft 365 Copilot workshop in Leeds', paragraphs: ['In September 2026, Eric delivered a workplace AI session covering Microsoft 365 Copilot. The session combined live demonstrations, guided exercises and reusable prompt resources.', 'Topics included giving Copilot useful context, working with source material, and exploring agents and notebooks. The closing discussion returned to accuracy, safe information sharing and human review.', 'This is a summary of training delivered, not a claim of measured business impact. The client and participants are not identified.'], bullets: ['Clear briefs: task, context, sources and output format', 'Practical exploration of prompts, agents and notebooks', 'Participant prompt resources and follow-along materials', 'Checking outputs against source information and organisational policy'] },
      { heading: 'Delivered: nine weeks of live AI training for the AI Vision Community', paragraphs: ['Eric delivered a nine-week live AI training programme through his WhatsApp community of over 100 people.', 'The programme brought practical AI learning into a community setting, alongside Eric’s individual and corporate training. The community size is not a claim that every member attended every session.'], bullets: ['Nine-week live AI training programme', 'WhatsApp community of over 100 people', 'Community-led learning alongside individual and corporate training'] },
      { heading: 'Team AI training', paragraphs: ['A team-training engagement begins by understanding participant roles, current tool access and the tasks people want to improve. The session can then combine shared foundations with role-relevant practice.', 'Useful evidence from the engagement may include the agreed agenda, exercises delivered and questions identified for follow-up. Outcomes are not assumed in advance.'] },
      { heading: 'Workflow and automation review', paragraphs: ['An automation review maps a current process before tools are recommended. The review can identify repetitive steps, information dependencies, exceptions and points where a human approval should remain.', 'The resulting scope may recommend a small pilot, further discovery or no automation where the risks outweigh the benefit.'] },
      { heading: 'Community and employability delivery', paragraphs: ['Community-focused training can be shaped around confidence, accessibility and practical tasks such as job research or application preparation. Responsible use and truthful representation remain part of the session.', 'Named case studies, results or partner details will be added only where publication has been authorised.'] },
    ],
  },
  {
    path: '/pricing/', kind: 'pricing', eyebrow: 'Clear packages · Sensible scope',
    title: 'AI & Copilot Courses and Prices | AI Vision Consulting',
    description: 'Fixed prices for 1-to-1 AI training, with clear starting prices for private groups, corporate workshops and team programmes.',
    h1: 'AI and Copilot courses, with clear prices',
    intro: 'Choose Practical AI or Microsoft 365 Copilot for Work. Individual sessions last one hour and start at £75, with discounted bundles, while corporate training starts at £995. Fixed individual prices and clear team starting points make it easier to identify the right level.',
    sections: [
      { heading: 'Personalised AI training', paragraphs: ['A focused one-hour session is £75. Two sessions are £140, three are £195, six are £360 and twelve are £720. Mix Practical AI and Microsoft 365 Copilot topics to suit your goals.', 'Each option is shaped around a defined learning goal and includes guided practice and relevant follow-up notes or resources.'] },
      { heading: 'Private groups and corporate teams', paragraphs: ['A private 90-minute small-group session for up to six people starts at £325. Corporate workshops start at £995 for 90 minutes, £1,250 for a half day and £2,000 for a full day.', 'Three-workshop corporate programmes start at £2,100 and six-workshop programmes start at £3,900.'] },
      { heading: 'Automation and implementation', paragraphs: ['Automation work depends on the current process, systems, integrations, testing and documentation required. Discovery and implementation may be scoped as separate stages.', 'A free discovery call can establish whether a focused consultation or a wider scope is the sensible next step.'] },
    ],
    faqs: [
      { question: 'Can I mix Practical AI and Copilot topics?', answer: 'Yes. Individual bundles can combine either route. Each session lasts one hour and covers one agreed focus. We check your goals and tool access before confirming the plan.' },
      { question: 'Do I need to book all twelve topics?', answer: 'No. Start with one session for £75, two for £140 or three for £195. Six sessions are £360 and twelve are £720. You can repeat a topic for more practice rather than covering something new every time.' },
      { question: 'Are software subscriptions included?', answer: 'No. Any paid AI tools, Microsoft licences or agent usage charges are separate. We check what you can access before agreeing the training. Use only tools and data approved by your employer.' },
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
    path: '/privacy-policy/', kind: 'legal', eyebrow: 'Your data', title: 'Privacy Policy | AI Vision Consulting', description: 'Privacy policy for AI Vision Consulting, including personal data use, retention and data protection rights.', h1: 'Privacy Policy', intro: '', sections: []
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
