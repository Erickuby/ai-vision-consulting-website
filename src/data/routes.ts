import { clarifyVat } from './pricingPolicy';
import { courseRoutes } from './courseRoutes';
import { consultancyRoutes } from './serviceOffers';
import { contentMetadata } from './contentMetadata';
import { freeTrainingRoute } from './regional';
import { buyerFaqs } from './buyerFaqs';

export const SITE_URL = 'https://aivisionconsulting.co.uk';

export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  links?: { href: string; label: string }[];
  // Artwork shown beside the copy, such as a book cover. Width and height are the
  // real pixel dimensions so the browser reserves the space and the page does not
  // jump while the image loads.
  image?: { src: string; alt: string; width: number; height: number };
};

export type FaqItem = { question: string; answer: string };

export type RouteKind = 'home' | 'service' | 'course' | 'company' | 'pricing' | 'contact' | 'legal' | 'not-found';

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
  lastReviewed?: string;
  course?: { corporateOnly: boolean; price?: number };
  relatedLinks?: { href: string; label: string }[];
  serviceOffer?: { name: string; price: string; href: string };
  // Clips filmed at completed training only. Each clip needs a poster and an ISO 8601 duration
  // because the prerenderer turns them into VideoObject structured data.
  videos?: RouteVideo[];
  videosHeading?: string;
  // Books published, or being written, by AI Vision Consulting. The prerenderer turns these
  // into Book structured data. Only add url, isbn, datePublished and numberOfPages once the
  // book is actually live on Amazon, or the page claims something that is not true yet.
  books?: RouteBook[];
};

export type RouteBook = {
  slug: string;
  image?: string;
  name: string;
  subtitle?: string;
  description: string;
  about: string[];
  series?: string;
  url?: string;
  isbn?: string;
  datePublished?: string;
  bookFormat?: BookFormat;
  numberOfPages?: number;
  // One entry per edition that is on sale, each with its own Amazon page. The prerenderer
  // emits these as workExample with an Offer, so only add an edition once it is live.
  editions?: RouteBookEdition[];
};

type BookFormat = 'https://schema.org/EBook' | 'https://schema.org/Paperback';

export type RouteBookEdition = {
  bookFormat: BookFormat;
  url: string;
  price: string;
  isbn?: string;
  datePublished?: string;
  numberOfPages?: number;
};

export type RouteVideo = {
  src: string;
  poster: string;
  title: string;
  description: string;
  duration: string;
  uploadDate: string;
  width: number;
  height: number;
};

const routes = [
  {
    path: '/', kind: 'home',
    // Aimed at local and branded intent, not the generic "ai consulting" term. On that
    // query the results page is four paid ads, an AI Overview citing McKinsey and EY, and
    // big brands above us at position seven; no title wins that. On the "near me" searches
    // we already rank one to two, so the job of these tags is to be the obvious local
    // choice for someone who has decided to hire somebody nearby.
    title: 'AI Consultant Newcastle | Copilot Training and AI Automation',
    description: 'Newcastle AI consultancy for UK teams: Microsoft 365 Copilot training, AI policy and automation that saves hours. Book a free 20 minute discovery call.',
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
    intro: 'AI Vision Consulting provides practical AI and Microsoft 365 Copilot training for teams in Newcastle upon Tyne and across the North East, in person or online. Team workshops for up to 15 people start at £995 for 90 minutes, and every session uses real tasks such as drafting documents, summarising meetings and researching with source checks.',
    sections: [
      { heading: 'Training built around real work', paragraphs: ['Workshops can focus on everyday uses such as research, drafting, meeting preparation, document summarisation and process improvement. The aim is to help participants understand where AI is useful, where it is unreliable and how to review outputs with human judgement.', 'Content is scoped to the audience, existing confidence level and organisational context. Newcastle delivery can be discussed alongside remote options for teams elsewhere in the UK.'] },
      { heading: 'What a session can cover', paragraphs: ['A discovery conversation identifies the tasks and questions that matter to your group. From there, training can combine demonstrations, guided exercises and reusable working practices. Individuals can choose from thirteen Practical AI topics in one-hour sessions, or a separate Microsoft 365 Copilot for Work route, while organisations can select a focused workshop or a multi-session team programme.'], bullets: ['Choosing and using AI assistants effectively', 'Writing clearer prompts and providing useful context', 'Research, video, image and app-creation tools', 'AI agents, content systems, digital products and freelance services'], links: [{ href: '/copilot-training-newcastle/', label: 'Microsoft 365 Copilot training for Newcastle teams' }] },
      { heading: 'Training already delivered', paragraphs: ['In September 2026, Eric Nwankwo delivered a 90 minute Microsoft 365 Copilot workshop for FDQ Limited (Food and Drink Qualifications) in Leeds, combining live demonstrations, guided exercises and reusable prompt resources. He has also delivered a complete 12 week AI training course for the AI Vision Community.'], links: [{ href: '/case-studies/', label: 'Read about the completed training' }] },
      { heading: 'Who this training is for', paragraphs: ['Training is suitable for businesses, public-facing teams, charities, community organisations and professionals who want a grounded introduction or a more focused practical session.', 'If your requirement spans several teams, the programme can be scoped in stages so that the material reflects different roles without cloning the same session for everyone.'] },
    ],
    faqs: [
      { question: 'Can AI training be delivered in Newcastle?', answer: 'Yes. In-person delivery in Newcastle can be discussed, alongside remote delivery for organisations elsewhere in the UK.' },
      { question: 'Do participants need technical experience?', answer: 'No. Sessions can start with the fundamentals and are scoped around the participants’ current confidence and work.' },
      { question: 'How much does AI training cost?', answer: 'A personal one-hour session is £95. Three sessions are £270, six are £510 and twelve are £900. Private small-group sessions start at £395, and corporate team workshops start at £995. Multi-session bundles are also available.' },
      { question: 'How many people can join a team workshop?', answer: 'A 90 minute team workshop and the six workshop programme take up to 15 people. Half day and full day workshops take up to 20 people. Larger organisations can book additional cohorts.' },
    ],
  },
  {
    path: '/copilot-training-newcastle/', kind: 'service', eyebrow: 'Microsoft 365 Copilot for teams',
    pricingHref: '#workshop-formats-and-prices',
    title: "Microsoft 365 Copilot Training UK | Newcastle Team Workshops",
    description: "Microsoft 365 Copilot training for UK teams, based in Newcastle. Hands on workshops for up to 15 people from £995, in person in the North East or online.",
    h1: "Microsoft 365 Copilot training for teams in Newcastle and across the UK",
    intro: 'AI Vision Consulting runs practical Microsoft 365 Copilot training for teams in Newcastle upon Tyne and across the North East in person, and live online for teams across the UK. A 90 minute team workshop for up to 15 people starts at £995, and every session uses the real tasks your staff already do in Outlook, Teams, Word, Excel and PowerPoint.',
    sections: [
      { heading: 'What Copilot training covers', paragraphs: ['Sessions teach staff to hand Copilot clear, checkable work rather than simply chatting with it. Participants practise a four part brief built on goal, context, sources and expectations, then check the answer against the source before they use it.', 'Exercises are built around the Copilot apps your organisation has approved. We check your licences and employer approved access before the workshop, so nobody is shown a feature they cannot open.'], bullets: ['Writing briefs with goal, context, sources and expectations', 'Custom instructions and a reusable prompt writing agent', 'Email threads in Outlook and meeting actions in Teams', 'Copilot Notebooks grounded in your own documents', 'Checking figures, spotting missing information and handling data safely'] },
      { heading: "Copilot training by role", paragraphs: ["Exercises are built around the work of the people in the room. These are typical starting points, agreed with you before the session."], bullets: ["Executive and personal assistants: triaging Outlook threads, turning Teams meetings into action lists and drafting briefing notes", "Finance and accounting teams: checking Excel data, explaining variances and drafting monthly report commentary, with every figure checked against the source", "Legal and professional services: summarising long documents and correspondence inside approved tools, with confidentiality rules agreed first", "HR teams: drafting policies, job adverts and staff communications without putting personal data into prompts", "Project managers: status updates from meeting notes, risk lists and stakeholder summaries", "Beginners: a first session on writing a clear brief and checking the answer, for staff who have barely opened Copilot"] },
      { heading: 'Delivered for FDQ Limited in September 2026', paragraphs: ['On 3 September 2026, Eric Nwankwo delivered a 90 minute Microsoft 365 Copilot workshop for FDQ Limited (Food and Drink Qualifications), a Leeds based awarding and end point assessment organisation. The session combined live demonstrations with guided practice using workplace examples from qualifications and assessment.', 'Participants received a follow along pack, a prompt pack and a prompt builder guide. The two clips below were filmed during that workshop.'], links: [{ href: '/case-studies/', label: 'Read the FDQ workshop overview' }] },
      { heading: 'Workshop formats and prices', paragraphs: ['A 90 minute Team essentials workshop for up to 15 people starts at £995. A half day workshop for up to 20 people starts at £1,450, and a full day workshop for up to 20 people starts at £2,450. A committed programme of six 90 minute workshops for up to 15 people starts at £4,800, which is £800 per workshop.', 'Prices are per workshop, not per person, and are final because AI Vision Consulting is not VAT registered. Microsoft licences, travel outside Tyne and Wear and venue hire are separate.'] },
      { heading: 'In person in Newcastle or live online', paragraphs: ['Workshops can run at your premises in Newcastle, Gateshead, Sunderland and elsewhere in the North East, or live online for teams anywhere in the UK.', 'A free 20 minute discovery call confirms your team size, the Copilot apps your staff can open and the tasks that matter most, before a format and price are agreed.'] },
    ],
    videosHeading: 'Filmed at the FDQ Copilot workshop',
    videos: [
      { src: '/videos/copilot-workshop-definition-of-done.mp4', poster: '/videos/copilot-workshop-definition-of-done.webp', title: 'Tell Copilot what done looks like.', description: 'Why a vague request such as “summarise this spreadsheet” skips vital rows, and what to say instead.', duration: 'PT28S', uploadDate: '2026-09-15', width: 1280, height: 720 },
      { src: '/videos/copilot-workshop-goal-context-sources.mp4', poster: '/videos/copilot-workshop-goal-context-sources.webp', title: 'Goal and context come first.', description: 'Why giving Copilot enough context now matters more than clever prompt wording.', duration: 'PT26S', uploadDate: '2026-09-15', width: 1280, height: 720 },
    ],
    faqs: [
      { question: 'How much does Copilot training cost in Newcastle?', answer: 'A 90 minute team workshop for up to 15 people starts at £995. Half day workshops start at £1,450 and full day workshops at £2,450, each for up to 20 people. Individual Copilot sessions are £95 for one hour. Prices are per workshop, not per person.' },
      { question: 'How many people can join a Copilot workshop?', answer: 'Up to 15 people for a 90 minute workshop or the six workshop programme, and up to 20 people for a half day or full day workshop. Larger organisations can book additional cohorts.' },
      { question: 'Do staff need a Microsoft 365 Copilot licence?', answer: 'Staff need access to the Copilot apps the session covers. We check which licences and employer approved tools your team can use before the workshop and build the exercises around them. Licences are not included in the price.' },
      { question: 'Can Copilot training be delivered in person in Newcastle?', answer: 'Yes. Workshops can be delivered at your premises in Newcastle and across the North East, or live online for teams elsewhere in the UK.' },
      { question: 'What will staff be able to do after the workshop?', answer: 'Write a clear brief using goal, context, sources and expectations, reuse instructions instead of retyping them, work with Outlook threads and Teams meeting actions, ground answers in their own documents with Notebooks, and check the output before it is shared.' },
      { question: 'Do you offer AI training beyond Copilot?', answer: 'Yes. Practical AI training covers ChatGPT, Claude and other tools across 13 one hour topics, and corporate workshops can combine Copilot with Practical AI content.' },
      { question: "Is there free Copilot training?", answer: "Yes. Microsoft publishes free Copilot learning material on Microsoft Learn, and it is a sensible starting point. A paid workshop adds practice on your own team’s tasks and approved files, live feedback, and clear rules on what data goes into Copilot and how answers are checked." },
      { question: "Do you run Copilot training for specific roles, such as finance or legal teams?", answer: "Yes. Exercises are built around the tasks of the people attending, for example Excel checks and report commentary for finance teams, or document summaries under agreed confidentiality rules for legal and professional services teams." },
      { question: "Is this a Microsoft certification course?", answer: "No. AI Vision Consulting is an independent training provider and is not part of Microsoft. Workshops focus on practical use of Copilot at work rather than preparation for a Microsoft certification exam." },
    ],
  },
  {
    path: '/ai-automation-consultant-newcastle/', kind: 'service', eyebrow: 'Workflow-first automation advice',
    title: "AI Workflow Automation Consultant | Newcastle & North East",
    description: "AI automation and workflow consultant in Newcastle for North East and UK teams. Find where hours go, then automate with human checks. Audits from £950.",
    h1: "AI automation and workflow consulting in Newcastle and the North East",
    intro: "AI Vision Consulting is an AI automation and workflow consultant based in Newcastle upon Tyne, working with organisations across the North East and remotely across the UK. Most projects start with an AI readiness and workflow audit from £950: half a day with the people who do the work, then a written report with costed options. Building the chosen workflow is scoped and priced separately.",
    sections: [
      { heading: "What an AI workflow consultant does", paragraphs: ["The first step is to map how a task works today: who starts it, what information is needed, where decisions happen and what can go wrong. This makes it easier to distinguish a genuine automation opportunity from a task that still needs human attention.", "Recommendations can cover simple rule based automation, AI assisted steps or a combination of both. Some tasks should stay with people, and the review says so."] },
      { heading: "Start with an audit, from £950", paragraphs: ["The AI readiness and workflow audit is the usual first step. The fee is credited in full against any workshop or programme booked within 60 days of the audit."], bullets: ["Half a day on site or online with the people doing the work", "An inventory of repetitive tasks with estimated weekly time costs", "A shortlist scored by potential time saved, error risk and implementation effort", "A recommended first workflow with human checkpoints marked", "A written report with costed options, assumptions and a realistic sequence"], links: [{ href: "/services/ai-workflow-audit/", label: "AI readiness and workflow audit" }] },
      { heading: "A measured route to implementation", paragraphs: ["Small, testable improvements are usually easier to review than a large system introduced all at once. A scoped engagement can document requirements, identify risks and define a pilot before further implementation."], bullets: ["Process and bottleneck review", "Data, privacy and human approval considerations", "Tool and integration options", "Pilot scope and practical handover documentation"] },
      { heading: "A working example you can try", paragraphs: ["The assistant on the AI voice assistant page is a live automation built by AI Vision Consulting. It answers questions using the prices published on this site, checks a real calendar and books real appointments."], links: [{ href: "/ai-voice-assistant/", label: "Try the AI voice assistant" }] },
      { heading: "Newcastle and the North East, and UK wide", paragraphs: ["Work can take place in person in Newcastle, Gateshead, Sunderland, Durham, North Tyneside and South Tyneside, or remotely for organisations anywhere in the UK. Travel outside Tyne and Wear is quoted separately.", "Every project is scoped to the systems and constraints already in place. No outcome is assumed before the process has been reviewed, and estimated savings are recorded as estimates, not results."] },
    ],
    faqs: [
      { question: "What does an AI automation consultant do?", answer: "An AI automation consultant maps how a task is done today, finds the repetitive steps that cost time, and recommends which to automate, which to support with AI and which to leave with people. AI Vision Consulting then scopes a small pilot with human checkpoints before anything larger is built." },
      { question: "How much does AI automation consulting cost?", answer: "Most work starts with an AI readiness and workflow audit from £950, which includes half a day with your team and a written report with costed options. The fee is credited in full against a workshop or programme booked within 60 days. Building a workflow is quoted separately once the scope is agreed." },
      { question: "Do you work with organisations across the North East?", answer: "Yes. AI Vision Consulting is based in Newcastle upon Tyne and works in person across Tyne and Wear and County Durham, and remotely with organisations anywhere in the UK." },
      { question: "Which tools do you use for automation?", answer: "Recommendations start from the systems you already use, such as Microsoft 365, and only add a new tool where it clearly earns its place. The audit report compares costed options, including ongoing costs, before anything is bought." },
      { question: "How do you keep automated work safe?", answer: "Every recommended workflow marks where a person checks the output before it is sent, saved or acted on. Data, privacy and approval requirements are reviewed before a pilot, and personal or confidential data is only used in tools your organisation has approved." },
    ],
  },
  {
    path: '/corporate-ai-training-uk/', kind: 'service', eyebrow: 'Practical capability for UK teams',
    title: "Corporate AI Training UK | AI Workshops for Teams",
    description: "Corporate AI and Microsoft 365 Copilot workshops for UK teams, priced per workshop from £995. Half day, full day and six workshop programmes, online or in person.",
    h1: 'Corporate AI training for UK teams',
    intro: 'Corporate AI training from AI Vision Consulting gives UK teams practical, role specific skills with Microsoft 365 Copilot, ChatGPT and Claude. Workshops are priced per workshop, not per person: £995 for 90 minutes with up to 15 people, or £1,450 for a half day and £2,450 for a full day with up to 20 people.',
    sections: [
      { heading: 'From awareness to useful practice', paragraphs: ['Corporate sessions can begin with a common foundation and move into examples that reflect the work of the people in the room. Participants learn how to give AI useful context, review results and recognise tasks where it should not be relied upon.', 'The content can support an initial awareness session or a more focused programme for particular functions.'] },
      { heading: 'Topics shaped around your organisation', paragraphs: ['A scoping conversation establishes the audience, available tools and internal expectations. Training can then address relevant workflows without asking staff to share confidential information in unsuitable systems.'], bullets: ['Generative AI foundations in plain English', 'Prompting and structured review', 'Responsible use, privacy and human oversight', 'Role-specific exercises and reusable workflows'] },
      { heading: 'Delivery, formats and starting prices', paragraphs: ['Sessions can be delivered remotely across the UK, with in-person delivery discussed where suitable. A 90-minute team workshop for up to 15 people starts at £995, a half-day workshop for up to 20 people at £1,450 and a full-day workshop for up to 20 people at £2,450.', 'Committed multi-session rates: six-workshop capability programmes for up to 15 people start at £4,800 (£800 per workshop). These require booking the full programme. Final pricing reflects group size, preparation, location, additional cohorts and any custom requirements.'], links: [{ href: '/copilot-training-newcastle/', label: 'Microsoft 365 Copilot training for teams' }] },
    ],
    faqs: [
      { question: 'How much does corporate AI training cost?', answer: 'A 90 minute team workshop starts at £995, a half day workshop at £1,450 and a full day workshop at £2,450. A committed programme of six 90 minute workshops starts at £4,800. Prices are per workshop, not per person.' },
      { question: 'How many people can attend a corporate workshop?', answer: 'Up to 15 people for a 90 minute workshop or the six workshop programme, and up to 20 people for a half day or full day workshop. Additional cohorts can be booked for larger teams.' },
      { question: 'Can corporate training focus on Microsoft 365 Copilot?', answer: 'Yes. Workshops can focus entirely on Microsoft 365 Copilot, cover ChatGPT and Claude, or combine them. In September 2026, AI Vision Consulting delivered a 90 minute Copilot workshop for FDQ Limited in Leeds.' },
      { question: "Can you run AI training for one department, such as communications or HR?", answer: "Yes. A scoping call agrees the audience and tasks, so a workshop can focus on one function, such as communications, HR or finance, using examples from that team’s work and the tools it is allowed to use." },
      { question: "Do you run AI workshops for leaders and managers?", answer: "Yes. A session for leaders can focus on where AI fits in the organisation, which tools to approve, how output should be reviewed and what a sensible first pilot looks like. AI policy and governance work is available separately from £1,750." },
      { question: "How do I book AI training for my team?", answer: "Start with a free 20 minute discovery call. It confirms your group size, the tools your staff can use and the tasks that matter most, before a format and price are agreed." },
      { question: "Is corporate AI training available online?", answer: "Yes. Workshops run live online for teams anywhere in the UK, or in person where suitable. Travel outside Tyne and Wear is quoted separately." },
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
      { heading: 'Scoped around your business', paragraphs: ['No two small businesses share exactly the same systems or priorities. A discovery call is used to understand your current workflow before any recommendation is made.', 'A tailored one-hour personal AI or Microsoft 365 Copilot training session is £95. Consulting, automation discovery and implementation are separate services and are quoted according to the workflow, systems and support required.'] },
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
      { heading: 'Training Eric has delivered', paragraphs: ['In September 2026, Eric delivered a 90 minute Microsoft 365 Copilot workshop for FDQ Limited (Food and Drink Qualifications) in Leeds, covering prompt briefs, custom instructions, Outlook and Teams, Copilot Notebooks and safe data handling. He has also delivered a complete 12 week AI training course for the AI Vision Community, one practical topic each week.', 'Eric publishes practical AI explainers on the Eric Explains AI YouTube channel and shares workplace AI guidance on LinkedIn.'], links: [{ href: '/case-studies/', label: 'Completed training in detail' }, { href: '/copilot-training-newcastle/', label: 'Microsoft 365 Copilot training for teams' }] },
      { heading: 'Based in Newcastle, working across the UK', paragraphs: ['AI Vision Consulting is Newcastle-based and supports wider UK audiences through remote delivery. Local in-person work can be discussed according to the engagement.', 'Audiences include businesses, corporate teams, professionals, jobseekers and community or employability organisations.'] },
      { heading: 'Start with a conversation', paragraphs: ['A discovery call is a chance to explain your audience, workflow or training requirement. If there is a suitable next step, the work can then be scoped around the real requirement.', 'You can also explore the service pages to compare team training, automation consulting and community-focused delivery.'] },
    ],
  },
  {
    path: '/case-studies/', kind: 'company', eyebrow: 'Completed training',
    title: 'Completed AI Training | FDQ & AI Vision Community',
    description: 'Explore completed Microsoft 365 Copilot training for FDQ and a full 12-week AI training course delivered by Eric Nwankwo for the AI Vision Community.',
    h1: 'AI training delivered in practice',
    intro: 'Completed training from AI Vision Consulting: Microsoft 365 Copilot for FDQ Limited in Leeds and a full 12-week AI course for the AI Vision Community.',
    sections: [],
  },
  {
    // Each book shows its real status. A book is only described as on sale, priced or linked
    // to Amazon once it is live with an ASIN; until then it says it is in review.
    path: '/books/', kind: 'company', eyebrow: 'Practical guides, written from delivered training',
    title: 'AI and Copilot Books by Eric Nwankwo | AI Vision Consulting',
    description: 'Practical Microsoft 365 Copilot books from Newcastle based trainer Eric Nwankwo. Copilot Prompts and Copilot for Excel are on Amazon now, in Kindle and paperback.',
    h1: 'Practical AI and Copilot books from AI Vision Consulting',
    intro: 'AI Vision Consulting publishes short, practical guides for people who already have AI tools at work and are not yet getting much from them. They are written by Eric Nwankwo, a Newcastle based AI trainer, and built from workshops delivered to real teams. The first title, Copilot Prompts, is on sale on Amazon now as a Kindle eBook and a paperback. The second, Copilot for Excel, is on sale now as a Kindle eBook and a paperback.',
    sections: [
      { heading: 'Copilot Prompts: 100 workplace prompts for Microsoft 365 Copilot', image: { src: '/images/books/copilot-prompts-cover.jpg', alt: 'Front cover of Copilot Prompts by Eric Nwankwo, 100 workplace prompts for Microsoft 365 Copilot', width: 1000, height: 1600 }, paragraphs: ['On sale now on Amazon. The Kindle edition is £4.99 and is also included in Kindle Unlimited. The paperback is £9.99 for 99 pages.', 'Most people type a few words into Copilot, get an average answer and go back to doing the job by hand. The tool is rarely the problem. This book teaches the four part brief used in AI Vision workshops, the check lines that catch quiet errors such as rows skipped in a spreadsheet, and then gives 100 prompts for the work people actually do.', 'Every prompt states when to use it, what to check before trusting the answer, one variation, and whether it works on the free Copilot Chat included with most business Microsoft 365 plans or needs the paid Microsoft 365 Copilot licence.'], bullets: ['Email and Outlook, meetings and Teams, Word, Excel and PowerPoint', 'Grounded research with Copilot Notebooks', 'Planning, reports, and managing people without putting personal data at risk', 'A practice spreadsheet with deliberate faults, so you can see what a careful prompt catches', 'A five day plan for you, and a first month plan for a team'], links: [{ href: 'https://www.amazon.co.uk/dp/B0HKPSH4XB', label: 'Buy the Kindle edition on Amazon, £4.99' }, { href: 'https://www.amazon.co.uk/dp/B0HKRW9JPR', label: 'Buy the paperback on Amazon, £9.99' }, { href: '/copilot-training-newcastle/', label: 'Copilot training for teams in Newcastle' }] },
      { heading: 'Copilot for Excel: 70 prompts for spreadsheets, data checks and monthly reports', image: { src: '/images/books/copilot-for-excel-cover.jpg', alt: 'Front cover of Copilot for Excel by Eric Nwankwo, 70 prompts for spreadsheets, data checks and monthly reports', width: 1000, height: 1600 }, paragraphs: ['On sale now on Amazon. The Kindle edition is £4.99 and is also included in Kindle Unlimited. The paperback is £8.99 for 86 pages.', 'Written for the person who owns a spreadsheet other people depend on, and gets asked to explain the numbers. Copilot will restructure a sheet, write a formula and summarise the result in seconds. It will also do that on a date stored as text and hand back a confident answer that quietly misses a row. This book is built around catching that before a figure leaves your screen.'], bullets: ['What Copilot can see in a workbook, and how to keep it from editing until you have seen its plan', 'Making a file readable first: one header row, a real table, dates as dates', '70 prompts for inherited files, cleaning data, analysis, formulas, pivots, charts and honest forecasts', 'Turning a correct answer into monthly commentary a director will accept, then into a routine somebody else can run', 'A practice workbook with faults planted on purpose, building on the one from Copilot Prompts'], links: [{ href: 'https://www.amazon.co.uk/dp/B0HKSY3F6D', label: 'Buy the Kindle edition on Amazon, £4.99' }, { href: 'https://www.amazon.co.uk/dp/B0HKVL3NGV', label: 'Buy the paperback on Amazon, £8.99' }, { href: '/copilot-training-newcastle/', label: 'Copilot training for teams in Newcastle' }] },
      { heading: 'Written from training that was actually delivered', paragraphs: ['The material comes from workshops run for UK organisations, including a 90 minute Microsoft 365 Copilot workshop delivered for FDQ Limited in September 2026, and a 12 week practical AI course delivered for the AI Vision Community.', 'That is also why the books spend time on checking. In one workshop, Copilot summarised a 350 row spreadsheet and quietly left out a single record, because one date had been typed as text. Nothing was false and nothing was flagged. Knowing how to catch that is worth more than any clever wording.'], links: [{ href: '/case-studies/', label: 'Training delivered in practice' }] },
      { heading: 'The AI Vision Practical Guides series', paragraphs: ['Each guide is short, plain English and built around real tasks rather than product tours. British English, UK workplaces, and no assumption that the reader has a technical background.', 'Further titles are planned on practical AI at work, AI for job seekers and AI for small businesses. Titles and dates are confirmed here when each book is written, not before.'] },
      { heading: 'Buying for a team, or need more than a book', paragraphs: ['If your team needs more than a book, training is the faster route. Workshops run in person across the North East and live online anywhere in the UK, for up to 15 people in a 90 minute session.', 'For questions about the books, or to hear when a new title is published, send a short message through the contact page with the word books.'], links: [{ href: '/contact/', label: 'Contact AI Vision Consulting' }, { href: '/pricing/', label: 'Courses and prices' }] },
    ],
    faqs: [
      { question: 'Where can I buy the books?', answer: 'On Amazon. Copilot Prompts is on sale as a Kindle eBook at £4.99, also in Kindle Unlimited, and as a £9.99 paperback. Copilot for Excel is on sale as a Kindle eBook at £4.99, also in Kindle Unlimited, and as an £8.99 paperback.' },
      { question: 'Are the books in Kindle Unlimited?', answer: 'Yes. Both Kindle editions are enrolled in Kindle Unlimited, so members can read them at no extra cost. Each can also be bought outright for £4.99.' },
      { question: 'Is there a paperback?', answer: 'Yes. Copilot Prompts is a 99 page paperback at £9.99, 6 by 9 inches. Copilot for Excel is an 86 page paperback at £8.99, also 6 by 9 inches.' },
      { question: 'When was Copilot for Excel published?', answer: 'The Kindle edition went on sale on Amazon on 23 September 2026. The 86 page paperback followed on 24 September 2026.' },
      { question: 'Do I need a paid Microsoft 365 Copilot licence to use the prompts?', answer: 'No, not for most of them. Many work with the free Copilot Chat included with most business Microsoft 365 plans, as long as you paste or upload the material yourself. Each prompt says which it needs.' },
      { question: 'Are the books written for UK workplaces?', answer: 'Yes. British English, UK workplace examples, and a clear rule on what should never be put into an AI tool. The author is based in Newcastle upon Tyne and trains teams across the North East and the UK.' },
      { question: 'Can you train my team instead?', answer: 'Yes. AI Vision Consulting runs Microsoft 365 Copilot and practical AI workshops for teams, in person in Newcastle and the North East or live online across the UK, starting at £995 for a 90 minute workshop for up to 15 people.' },
    ],
    relatedLinks: [
      { href: '/copilot-training-newcastle/', label: 'Microsoft 365 Copilot training for teams' },
      { href: '/about-eric-nwankwo/', label: 'About Eric Nwankwo' },
      { href: '/case-studies/', label: 'Completed training' },
    ],
    books: [
      {
        slug: 'copilot-prompts',
        name: 'Copilot Prompts',
        subtitle: '100 Workplace Prompts for Microsoft 365 Copilot, Tested with UK Teams in the North East',
        description: 'A practical guide to briefing Microsoft 365 Copilot at work: the four part brief, the check lines that catch missing data, and 100 prompts for Outlook, Teams, Word, Excel, PowerPoint, Copilot Notebooks, planning and reports.',
        about: ['Microsoft 365 Copilot', 'Prompt writing', 'Workplace productivity', 'Practical artificial intelligence'],
        series: 'AI Vision Practical Guides',
        image: '/images/books/copilot-prompts-cover.jpg',
        datePublished: '2026-09-21',
        editions: [
          { bookFormat: 'https://schema.org/EBook', url: 'https://www.amazon.co.uk/dp/B0HKPSH4XB', price: '4.99', datePublished: '2026-09-22' },
          { bookFormat: 'https://schema.org/Paperback', url: 'https://www.amazon.co.uk/dp/B0HKRW9JPR', isbn: '9798176008395', price: '9.99', datePublished: '2026-09-21', numberOfPages: 99 },
        ],
      },
      {
        slug: 'copilot-for-excel',
        name: 'Copilot for Excel',
        subtitle: '70 Prompts for Spreadsheets, Data Checks and Monthly Reports',
        description: 'A practical guide to Microsoft 365 Copilot in Excel and the monthly reports spreadsheets feed: making a file readable, checking every answer, and 70 prompts for cleaning data, analysis, formulas, pivots, charts, forecasts and report commentary.',
        about: ['Microsoft 365 Copilot', 'Microsoft Excel', 'Data quality', 'Business reporting'],
        series: 'AI Vision Practical Guides',
        image: '/images/books/copilot-for-excel-cover.jpg',
        datePublished: '2026-09-23',
        editions: [
          { bookFormat: 'https://schema.org/EBook', url: 'https://www.amazon.co.uk/dp/B0HKSY3F6D', price: '4.99', datePublished: '2026-09-23' },
          { bookFormat: 'https://schema.org/Paperback', url: 'https://www.amazon.co.uk/dp/B0HKVL3NGV', isbn: '9798176546163', price: '8.99', datePublished: '2026-09-24', numberOfPages: 86 },
        ],
      },
    ],
  },
  {
    path: '/pricing/', kind: 'pricing', eyebrow: 'Clear packages · Sensible scope',
    title: 'AI & Copilot Courses and Prices | AI Vision Consulting',
    description: 'AI and Copilot training from £95 per hour, bundles from £270 and team workshops from £995. Compare scope, free learning and consultancy before booking.',
    h1: 'AI and Copilot courses, with clear prices',
    intro: 'Choose Practical AI or Microsoft 365 Copilot for Work. Individual sessions last one hour and start at £95, with discounted bundles, while corporate training starts at £995. Fixed individual prices and clear team starting points make it easier to identify the right level.',
    sections: [
      { heading: 'Personalised AI training', paragraphs: ['A focused one-hour session is £95. Starter bundles are £270 for three hours, Momentum bundles are £510 for six hours and Complete programmes are £900 for twelve hours. Mix Practical AI and Microsoft 365 Copilot topics to suit your goals.', 'Each option is shaped around a defined learning goal and includes guided practice and relevant follow-up notes or resources.'] },
      { heading: 'Private groups and corporate teams', paragraphs: ['A private 90-minute small-group session for up to six people starts at £395. Corporate workshops start at £995 for 90 minutes with up to 15 people, and £1,450 for a half day or £2,450 for a full day with up to 20 people.', 'Committed multi-session rates: six-workshop programmes start at £4,800 (£800 per workshop). These require booking the full programme.'] },
      { heading: 'Automation and implementation', paragraphs: ['Automation work depends on the current process, systems, integrations, testing and documentation required. Discovery and implementation may be scoped as separate stages.', 'A free discovery call can establish whether a focused consultation or a wider scope is the sensible next step.'] },
    ],
    faqs: [
      ...buyerFaqs,
      { question: 'Can I mix Practical AI and Copilot topics?', answer: 'Yes. Individual bundles can combine either route. Each session lasts one hour and covers one agreed focus. We check your goals and tool access before confirming the plan.' },
      { question: 'Do I need to book a complete programme?', answer: 'No. Start with one session for £95. Three sessions are £270, six are £510 and twelve are £900. You can repeat a topic for more practice rather than covering something new every time.' },
      { question: 'Are software subscriptions included?', answer: 'No. Any paid AI tools, Microsoft licences or agent usage charges are separate. We check what you can access before agreeing the training. Use only tools and data approved by your employer.' },
      { question: 'Why do corporate prices say “from”?', answer: 'The starting prices cover the stated group size, scoping, tailored delivery and participant resources. Travel, extra cohorts, venue hire, third-party software and custom development are quoted separately.' },
      { question: 'Can a small group book without a corporate package?', answer: 'Yes. A private 90-minute group session starts at £395 for up to six people working towards one shared outcome.' },
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

export const siteRoutes: readonly SiteRoute[] = ([...routes, ...courseRoutes, ...consultancyRoutes, freeTrainingRoute] as SiteRoute[]).map((route) => ({
  ...route,
  lastReviewed: contentMetadata[route.path]?.['last-reviewed'] ?? route.lastReviewed,
  description: clarifyVat(route.description),
  intro: clarifyVat(route.intro),
  sections: route.sections.map((section) => ({
    ...section,
    paragraphs: section.paragraphs.map(clarifyVat),
    ...(section.bullets ? { bullets: section.bullets.map(clarifyVat) } : {}),
  })),
  ...(route.faqs ? { faqs: route.faqs.map((faq) => ({ ...faq, answer: clarifyVat(faq.answer) })) } : {}),
}));
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
