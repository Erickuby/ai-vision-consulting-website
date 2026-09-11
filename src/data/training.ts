import { detailedTopics } from './trainingDetails';
import { courseContentFor, coursePathFor } from './courseContent';

export type TrainingSession = {
  number: number;
  title: string;
  description: string;
  coursePath?: string;
  corporateOnly?: boolean;
};

export type TrainingCategory = {
  title: string;
  strapline: string;
  sessions: TrainingSession[];
};

export type TrainingPackage = {
  name: string;
  price: string;
  format: string;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  href?: string;
};

export const trainingCategories: TrainingCategory[] = [
  {
    title: 'AI foundations',
    strapline: 'Choose tools confidently and get consistently useful results.',
    sessions: [
      {
        number: 1,
        ...detailedTopics['choosing-ai-tools'],
      },
      {
        number: 2,
        title: 'Prompting for better results',
        description: 'Write clear instructions for research, planning, writing, problem-solving and day-to-day work.',
      },
      {
        number: 3,
        ...detailedTopics['build-working-tool'],
      },
      {
        number: 4,
        title: 'AI agents and workflow automation',
        description: 'Identify repetitive work and design practical AI-assisted workflows with sensible human checks.',
      },
      { number: 13, ...detailedTopics['connecting-ai-tools'] },
    ],
  },
  {
    title: 'AI power tools',
    strapline: 'Research, create and turn ideas into working assets.',
    sessions: [
      {
        number: 5,
        title: 'NotebookLM for research and knowledge work',
        description: 'Work from your own documents, notes and trusted sources to understand information and develop ideas.',
      },
      {
        number: 6,
        title: 'AI video creation',
        description: 'Create a short video with Google Veo 3.1, including native audio. Compare Runway Gen-4.5, Kling 3.0 and Seedance 2.0 for your task, budget and editing needs. Check the current plan, usage limits and commercial licence before choosing a tool.',
      },
      {
        number: 7,
        title: 'AI image generation',
        description: 'Create professional concepts, graphics, social visuals and other practical creative assets.',
      },
      {
        number: 8,
        title: 'Build simple apps with AI',
        description: 'Prototype a simple webpage or app with AI. Learn how to test it and recognise when technical help is needed.',
      },
    ],
  },
  {
    title: 'Create, grow and monetise',
    strapline: 'Apply AI to visibility, products and client services.',
    sessions: [
      {
        number: 9,
        title: 'Content creation and social media systems',
        description: 'Plan, draft, repurpose and organise content without losing your own judgement or voice.',
      },
      {
        number: 10,
        title: 'Creating digital products with AI',
        description: 'Develop an idea, create the product, prepare its sales page and build a practical launch plan.',
      },
      {
        number: 11,
        title: 'AI avatars and presenter videos',
        description: 'Create avatar-led and talking-head-style videos for training, communication and digital products.',
      },
      {
        number: 12,
        title: 'Building an AI-powered freelance service',
        description: 'Choose a valuable service, package the outcome, find suitable clients and define a responsible delivery process.',
      },
    ],
  },
];

export const individualSessionRate = 95;
export const individualRates = [
  { sessions: 1, price: 95, name: 'Focused session' },
  { sessions: 3, price: 270, name: 'Starter bundle' },
  { sessions: 6, price: 510, name: 'Momentum bundle' },
  { sessions: 12, price: 900, name: 'Complete programme' },
] as const;

export const individualTrainingPackages: TrainingPackage[] = individualRates.map((rate) => {
  const saving = rate.sessions * individualSessionRate - rate.price;
  const pounds = (value: number) => '£' + value.toLocaleString('en-GB');
  return {
    name: rate.name,
    price: pounds(rate.price),
    format: rate.sessions === 1 ? 'One 60-minute session' : `${rate.sessions} one-hour sessions · ${pounds(rate.price / rate.sessions)} per session`,
    description: rate.sessions === 1
      ? 'Choose one focused task or an introduction to a topic. Start with a free discovery call.'
      : 'Build towards an agreed outcome with a personalised learning plan. Mix Practical AI and Copilot topics or repeat a topic for more practice.',
    features: rate.sessions === 1
      ? ['Personal goal check', 'Live guided practice', 'Relevant prompts and action notes']
      : [`Save ${pounds(saving)} (approximately ${Math.round(saving / (rate.sessions * individualSessionRate) * 100)}%) against single sessions`, 'Personalised learning plan and session notes', 'Prompt library built around your own work', 'Use your sessions within twelve months of purchase'],
    highlight: rate.sessions === 6,
    ...(rate.sessions === 3 ? { badge: 'A useful starting point' } : {}),
  };
});

export const privateGroupPackage: TrainingPackage = {
  name: 'Private small-group session',
  price: 'From £395',
  format: '90 minutes · up to six people',
  description: 'A practical session for founders, colleagues, friends or a small team choosing a topic from the training catalogue.',
  features: ['One shared topic and outcome', 'Guided group exercises', 'Shared follow-up resources'],
};

export const corporateTrainingPackages: TrainingPackage[] = [
  {
    name: 'Team essentials workshop',
    price: 'From £995',
    format: '90 minutes · up to 15 people',
    description: 'A focused introduction or role-relevant workshop designed around one agreed team objective.',
    features: ['Scoping call', 'Tailored examples', 'Slides and participant resources'],
  },
  {
    name: 'Half-day workshop',
    price: 'From £1,450',
    format: 'Up to 3.5 hours · up to 20 people',
    description: 'A deeper practical workshop combining shared foundations, demonstrations and guided exercises.',
    features: ['Role-relevant agenda', 'Interactive practice', 'Follow-up resource pack'],
    badge: 'Extended team workshop',
  },
  {
    name: 'Full-day workshop',
    price: 'From £2,450',
    format: 'Up to 7 hours · up to 20 people',
    description: 'A complete training day with time for practice, discussion and workflow planning.',
    features: ['Pre-workshop discovery', 'Multiple practical modules', 'Next-step recommendations'],
  },
  {
    name: 'AI capability programme',
    price: 'From £4,800',
    format: 'Committed programme: six 90-minute workshops · up to 15 people · £800 per workshop',
    description: 'A structured programme that moves a team from shared foundations into selected role-specific workflows.',
    features: ['Save £1,170 against six separate Team essentials workshops', 'Six tailored workshops and reusable resources', 'Final action and adoption review'],
  },
];
export const copilotSessions: TrainingSession[] = [
  {
    "number": 1,
    "title": "Copilot essentials and better prompts",
    "description": "Understand your available tools. Practise a brief with goal, context, sources and expectations, then check the answer."
  },
  {
    "number": 2,
    "title": "Outlook and Teams: email, meetings and actions",
    "description": "Summarise threads, draft replies and turn meeting material into actions. Meeting features depend on permissions, settings and transcript availability."
  },
  {
    "number": 3,
    "title": "Word: useful documents and clear summaries",
    "description": "Turn approved source material into a report or briefing. Check quotations, missing information and unsupported claims."
  },
  {
    "number": 4,
    "title": "Excel: make sense of your data",
    "description": "Explore formulas, trends, charts or trackers using a sample workbook. Check totals, exclusions and a worked example by hand."
  },
  {
    "number": 5,
    "title": "PowerPoint: from a brief to a presentation",
    "description": "Create an outline and first-draft slides from an approved document. Improve structure and accuracy before sharing."
  },
  {
    "number": 6,
    "title": "Research, files and Copilot Notebooks",
    "description": "Organise relevant documents and ask evidence-based questions. Review citations and spot gaps or outdated information."
  },
  {
    "number": 7,
    "title": "Reusable instructions, agents and repeat tasks",
    "description": "Explore a bounded assistant or reusable prompt for one recurring job, with permissions and human review. Availability and usage charges vary."
  },
  {
    "number": 8,
    "title": "Your personal Copilot workflow",
    "description": "Bring one approved workplace task. Connect the steps, test the output and leave with a repeatable routine and checking checklist."
  }
];

copilotSessions.push(
  { number: 9, ...detailedTopics['copilot-cowork-agent-mode'] },
  { number: 10, ...detailedTopics['copilot-costs'] },
  { number: 11, ...detailedTopics['agent-365-governance'] },
);

// The catalogue, detail pages and generated assistant notes share scope limits.
for (const session of [...trainingCategories.flatMap(category => category.sessions), ...copilotSessions]) {
  const content = courseContentFor(session, 'Practical AI');
  session.coursePath = coursePathFor(session);
  if (!session.description.includes(content.limitation)) session.description += ` ${content.limitation}`;
}
