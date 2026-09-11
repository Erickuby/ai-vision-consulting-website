import { trainingCategories } from './training';
import { coursePathFor } from './courseContent';

export type CaseStudy = {
  id: string;
  title: string;
  delivery: string;
  paragraphs: string[];
  topics?: string[];
  weeks?: ProgrammeWeek[];
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
export type ProgrammeWeek = { number: number; title: string; href: string };

// The twelve weekly topics are sessions 1 to 12 of the Practical AI route, in the order
// they were taught. Derived rather than retyped so renaming a session on the pricing page
// updates the case study with it, and so the programme can never advertise a topic that is
// no longer sold.
//
// Session 13, Connecting AI to your other tools, is deliberately excluded: it is a later
// addition to the catalogue and was not part of the twelve weeks delivered.
export const programmeWeeks: ProgrammeWeek[] = trainingCategories
  .flatMap(category => category.sessions)
  .filter(session => session.number <= 12)
  .sort((a, b) => a.number - b.number)
  .map(session => ({ number: session.number, title: session.title, href: coursePathFor(session) }));

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
      'One topic a week, in the order below. Each was taught as a live session with practice and questions, and each is available now as a standalone one-hour session or as part of a bundle.',
    ],
    weeks: programmeWeeks,
  },
];
