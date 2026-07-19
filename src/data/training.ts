export type TrainingSession = {
  number: number;
  title: string;
  description: string;
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
};

export const trainingCategories: TrainingCategory[] = [
  {
    title: 'AI foundations',
    strapline: 'Choose tools confidently and get consistently useful results.',
    sessions: [
      {
        number: 1,
        title: 'Choosing the right AI tools',
        description: 'Compare tools such as ChatGPT, Claude and Gemini, then choose the right assistant for each task.',
      },
      {
        number: 2,
        title: 'Prompting for better results',
        description: 'Write clear instructions for research, planning, writing, problem-solving and day-to-day work.',
      },
      {
        number: 3,
        title: 'AI-assisted coding for non-coders',
        description: 'Use tools such as Claude Code to create simple websites, mini-apps and useful business tools.',
      },
      {
        number: 4,
        title: 'AI agents and workflow automation',
        description: 'Identify repetitive work and design practical AI-assisted workflows with sensible human checks.',
      },
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
        description: 'Create useful videos for presentations, training, social media and internal communication.',
      },
      {
        number: 7,
        title: 'AI image generation',
        description: 'Create professional concepts, graphics, social visuals and other practical creative assets.',
      },
      {
        number: 8,
        title: 'Build simple apps with AI',
        description: 'Turn an idea into a working webpage, internal tool or simple app through guided AI-assisted development.',
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

export const individualTrainingPackages: TrainingPackage[] = [
  {
    name: 'Focused session',
    price: '£125',
    format: 'One 90-minute session',
    description: 'Choose one topic and apply it to a clear work, business or personal goal.',
    features: ['Pre-session goal check', 'Live guided practice', 'Personalised action notes'],
  },
  {
    name: 'Starter bundle',
    price: '£330',
    format: 'Three 90-minute sessions',
    description: 'Build a useful foundation across three topics selected around your priorities.',
    features: ['Save £45 against single sessions', 'Personalised learning plan', 'Practice tasks between sessions'],
    badge: 'Best starting point',
  },
  {
    name: 'Growth bundle',
    price: '£600',
    format: 'Six 90-minute sessions',
    description: 'Develop broader confidence and connect several tools into a practical way of working.',
    features: ['Save £150 against single sessions', 'Progress reviews', 'Reusable prompts and workflow notes'],
    highlight: true,
    badge: 'Broader development',
  },
  {
    name: 'Complete programme',
    price: '£1,080',
    format: 'All twelve sessions · 18 hours',
    description: 'Work through the complete programme from AI foundations to creating and selling practical services.',
    features: ['Save £420 against single sessions', 'Structured learning roadmap', 'Final implementation review'],
  },
];

export const privateGroupPackage: TrainingPackage = {
  name: 'Private small-group session',
  price: 'From £325',
  format: '90 minutes · up to six people',
  description: 'A practical session for founders, colleagues, friends or a small team choosing a topic from the training catalogue.',
  features: ['One shared topic and outcome', 'Guided group exercises', 'Shared follow-up resources'],
};

export const corporateTrainingPackages: TrainingPackage[] = [
  {
    name: 'Team essentials workshop',
    price: 'From £750',
    format: '90 minutes · up to 15 people',
    description: 'A focused introduction or role-relevant workshop designed around one agreed team objective.',
    features: ['Scoping call', 'Tailored examples', 'Slides and participant resources'],
  },
  {
    name: 'Half-day workshop',
    price: 'From £1,250',
    format: 'Up to 3.5 hours · up to 20 people',
    description: 'A deeper practical workshop combining shared foundations, demonstrations and guided exercises.',
    features: ['Role-relevant agenda', 'Interactive practice', 'Follow-up resource pack'],
    badge: 'Extended team workshop',
  },
  {
    name: 'Full-day workshop',
    price: 'From £2,000',
    format: 'Up to 7 hours · up to 20 people',
    description: 'A complete training day with time for practice, discussion and workflow planning.',
    features: ['Pre-workshop discovery', 'Multiple practical modules', 'Next-step recommendations'],
  },
  {
    name: 'Team development bundle',
    price: 'From £2,100',
    format: 'Three 90-minute workshops · up to 15 people',
    description: 'Build capability over time rather than trying to cover everything in one session.',
    features: ['Three linked workshops', 'Between-session practice', 'Progress and priority review'],
    highlight: true,
    badge: 'Best for sustained adoption',
  },
  {
    name: 'AI capability programme',
    price: 'From £3,900',
    format: 'Six 90-minute workshops · up to 15 people',
    description: 'A structured programme that moves a team from shared foundations into selected role-specific workflows.',
    features: ['Six tailored workshops', 'Reusable working resources', 'Final action and adoption review'],
  },
];
