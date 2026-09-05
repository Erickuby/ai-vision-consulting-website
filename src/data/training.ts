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
        description: 'Compare ChatGPT, Claude, Gemini, Qwen and DeepSeek against your tasks, privacy needs and budget.',
      },
      {
        number: 2,
        title: 'Prompting for better results',
        description: 'Write clear instructions for research, planning, writing, problem-solving and day-to-day work.',
      },
      {
        number: 3,
        title: 'Claude Code for non-coders',
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

export const individualTrainingPackages: TrainingPackage[] = [
  {
    "name": "Focused session",
    "price": "£75",
    "format": "One 60-minute session",
    "description": "Choose one focused task or an introduction to a topic.",
    "features": [
      "Personal goal check",
      "Live guided practice",
      "Relevant prompts and action notes"
    ]
  },
  {
    "name": "Two-session bundle",
    "price": "£140",
    "format": "Two 60-minute sessions · £70 per hour",
    "description": "Explore two priorities or build on your first session.",
    "features": [
      "Save £10 against single sessions",
      "Mix Practical AI and Copilot topics",
      "Practice between sessions"
    ]
  },
  {
    "name": "Three-session bundle",
    "price": "£195",
    "format": "Three 60-minute sessions · £65 per hour",
    "description": "Build confidence through three linked sessions shaped around your work.",
    "features": [
      "Save £30 against single sessions",
      "Personal learning plan",
      "Review your own examples"
    ],
    "badge": "A useful starting point"
  },
  {
    "name": "Six-session bundle",
    "price": "£360",
    "format": "Six 60-minute sessions · £60 per hour",
    "description": "Develop wider skills or spend more time on complex tasks.",
    "features": [
      "Save £90 against single sessions",
      "Mix topics from either route",
      "Progress review"
    ],
    "highlight": true
  },
  {
    "name": "Twelve-session programme",
    "price": "£720",
    "format": "Twelve 60-minute sessions · £60 per hour",
    "description": "Follow all twelve Practical AI topics, or agree a personalised mix with Copilot.",
    "features": [
      "Save £180 against single sessions",
      "Twelve hours of guided learning",
      "Personal implementation review"
    ]
  }
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
    price: 'From £995',
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
