export type CaseStudy = {
  id: string;
  title: string;
  delivery: string;
  paragraphs: string[];
  topics?: string[];
  resources?: string;
  client?: typeof fdqClient;
};

export const fdqClient = {
  name: 'FDQ Limited',
  description: 'Food and Drink Qualifications',
  website: 'https://www.fdq.org.uk/',
  logo: '/images/clients/fdq-logo.png',
  logoAlt: 'FDQ Limited — Food and Drink Qualifications',
};

// Completed training confirmed by Eric for publication on 11 September 2026.
export const caseStudies: CaseStudy[] = [
  {
    id: 'fdq-microsoft-365-copilot',
    title: 'Microsoft 365 Copilot training for FDQ Limited',
    client: fdqClient,
    delivery: 'Completed workshop · Leeds · 3 September 2026 · 90 minutes',
    paragraphs: [
      'FDQ Limited (Food and Drink Qualifications) is a Leeds-based awarding and end-point assessment organisation specialising in the food and drink industry.',
      'Eric delivered “Practical AI for Everyday FDQ Work”, a 90-minute Microsoft 365 Copilot workshop on 3 September 2026. The session combined live demonstrations with guided practice using workplace examples from qualifications and assessment.',
    ],
    topics: [
      'Writing clear prompts using goal, context, sources and expectations',
      'Reusing custom instructions and building a prompt-writing agent',
      'Working with email threads in Outlook and meeting actions in Teams',
      'Using Copilot Notebooks with relevant documents and source references',
      'Checking figures, spotting missing information and handling data safely',
    ],
    resources: 'Workshop resources included a follow-along pack, participant prompt pack and prompt-builder guide, with demonstration spreadsheets and an observation report.',

  },
  {
    id: 'ai-vision-community-training',
    title: 'A complete 12-week AI training course',
    delivery: 'Completed programme · AI Vision Community',
    paragraphs: [
      'Eric delivered a complete 12-week AI training course for the AI Vision Community.',
      'The live programme brought practical AI learning into a community setting, alongside Eric’s individual and corporate training.',
    ],
  },
];
