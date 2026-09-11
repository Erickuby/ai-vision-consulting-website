import { detailedTopics, type DetailedTopic } from './trainingDetails';

type CourseSupplement = Pick<DetailedTopic, 'audience' | 'practice' | 'limitation' | 'outcomes' | 'blog'>;
const reading = (slug: string, label: string) => ({ href: `/blog/${slug}.html`, label });

export const courseSupplements: Record<string, CourseSupplement> = {
  'Prompting for better results': {
    audience: 'People who use an AI assistant but spend too long correcting vague or inconsistent answers.',
    practice: ['Bring one recurring writing, planning or research task. We build a brief with a clear goal, useful context, approved sources and a definition of a good answer.', 'We compare two versions, check unsupported claims and keep the instructions that improve the result.'],
    limitation: 'A clear prompt cannot guarantee a factual answer. You must verify claims and references before using the output.',
    outcomes: ['A reusable prompt for your chosen task', 'A before-and-after example with review notes', 'A checklist for facts, missing context and tone'],
    blog: reading('what-is-ai', 'Understand what AI can and cannot do'),
  },
  'AI agents and workflow automation': {
    audience: 'Business owners and professionals with one repetitive process they want to simplify.',
    practice: ['We map the trigger, inputs, decisions and output of one process. You identify which steps follow fixed rules and which need human judgement.', 'We sketch a small automation and test one step with approved sample data, including a failure and a handover to a person.'],
    limitation: 'One hour covers a workflow plan and a small test. A reliable live integration needs separate setup, monitoring and permission checks.',
    outcomes: ['A map of one workflow', 'A tested sample step and its inputs', 'A list of approval points, failure cases and next actions'],
    blog: reading('what-to-automate-first-small-business', 'Choose a sensible first automation'),
  },
  'NotebookLM for research and knowledge work': {
    audience: 'People who need to compare documents, prepare briefings or study a set of trusted sources.',
    practice: ['We organise a small approved source pack, ask focused questions and trace answers back to the original passages.', 'You turn the findings into a briefing outline and record contradictions and unanswered questions.'],
    limitation: 'Answers can omit context or misread a source. Check citations in the original documents; a notebook is not an independent fact-checker.',
    outcomes: ['An organised notebook using your approved sources', 'A source-linked briefing outline', 'An evidence checklist and unanswered-question log'],
    blog: reading('ai-hallucination-and-rag', 'Why source-grounded answers still need checking'),
  },
  'AI video creation': {
    audience: 'Creators and small teams planning one short clip for a specific audience and purpose.',
    practice: ['We agree the message, shot and intended use, then create a short draft using the available tool and credits. We compare the result with the brief and refine one version.', 'We record the prompt, export settings and checks for visual errors, audio, consent and usage rights.'],
    limitation: 'One hour covers a draft clip, not a finished campaign. Generation can fail or use extra credits; commercial rights depend on the plan and your source material.',
    outcomes: ['A short draft clip, subject to tool access and generation availability', 'A reusable shot prompt', 'A quality, consent and usage-rights checklist'],
    blog: reading('how-to-start-an-ai-side-hustle', 'Turn a practical creative skill into a scoped service'),
  },
  'AI image generation': {
    audience: 'Professionals and creators who need a visual concept for a page, presentation or social post.',
    practice: ['We define the audience, composition and visual constraints, generate a small set of options and refine one concept.', 'You inspect text, anatomy, logos and consistency, then record what needs manual editing before use.'],
    limitation: 'Generated images can contain visual errors and cannot guarantee originality or rights clearance. Human review and permission checks are required.',
    outcomes: ['A selected visual concept', 'The prompt and editing notes used to create it', 'An export and rights-review checklist'],
    blog: reading('how-to-start-an-ai-side-hustle', 'Package a useful creative service'),
  },
  'Build simple apps with AI': {
    audience: 'Beginners who want to test how a small webpage or app could solve a particular problem.',
    practice: ['We turn an idea into a small interface and a set of example inputs and outputs. You practise requesting a change and checking that existing behaviour still works.', 'We test the prototype and identify the work needed before it could be used by real customers. This session focuses on prototyping; the separate working-tool session covers a pre-agreed small deployment.'],
    limitation: 'A prototype is not a production service. Payments, private data, security review and ongoing hosting need separate work.',
    outcomes: ['A small interactive prototype', 'A feature brief and sample test cases', 'A list of gaps to resolve before launch'],
    blog: reading('how-to-start-an-ai-side-hustle', 'Start with a problem worth solving'),
  },
  'Content creation and social media systems': {
    audience: 'People who want a repeatable way to turn their expertise into useful posts.',
    practice: ['We select one audience problem and turn your own notes into a core piece and two shorter drafts.', 'You set a voice checklist, organise a manageable publishing plan and check that each claim has evidence.'],
    limitation: 'AI cannot supply your experience or guarantee reach. You must check facts, permissions and whether the draft sounds like you before publishing.',
    outcomes: ['A core content draft and two repurposed drafts', 'A reusable voice and fact-checking checklist', 'A practical content schedule template'],
    blog: reading('get-found-in-ai-search-local-business', 'Make your business information useful and findable'),
  },
  'Creating digital products with AI': {
    audience: 'Professionals and freelancers with knowledge they want to turn into a useful small product.',
    practice: ['We narrow the audience and problem, outline a minimum useful product and draft one representative part.', 'You define what a buyer receives, how to test usefulness and what evidence you need before writing a sales promise.'],
    limitation: 'One hour develops a product sample and plan, not a complete product business. AI cannot validate demand or guarantee sales.',
    outcomes: ['A defined buyer and product brief', 'One product sample', 'A quality checklist and launch action plan'],
    blog: reading('how-to-start-an-ai-side-hustle', 'Validate a useful offer before building more'),
  },
  'AI avatars and presenter videos': {
    audience: 'People making short training or explainer content using their own likeness or an authorised avatar.',
    practice: ['We prepare a short script and choose an authorised presenter and voice. You create a sample and check pronunciation, pacing and the accuracy of the message.', 'We agree where synthetic presentation should be disclosed and record consent and platform usage restrictions.'],
    limitation: 'Use only a likeness and voice you have permission to use. Avatar output can mispronounce or misrepresent the script and needs review before sharing.',
    outcomes: ['A short presenter-video sample, subject to account access', 'An edited script and pronunciation notes', 'A consent, disclosure and publishing checklist'],
    blog: reading('how-to-start-an-ai-side-hustle', 'Define a responsible creative service'),
  },
  'Building an AI-powered freelance service': {
    audience: 'Freelancers and professionals choosing a specific service they can deliver responsibly.',
    practice: ['We select a customer problem you understand, define the deliverable and separate your judgement from tasks AI can assist with.', 'You draft a scope, estimate delivery effort and create a quality check and client handover plan.'],
    limitation: 'This session does not promise clients or income. You must validate demand, check your competence and protect client information.',
    outcomes: ['A one-page service offer', 'A delivery checklist and scope boundaries', 'A client discovery brief and next-step plan'],
    blog: reading('how-to-start-an-ai-side-hustle', 'Build an AI-assisted freelance offer'),
  },
  'Copilot essentials and better prompts': {
    audience: 'Microsoft 365 users starting with the Copilot features their organisation makes available.',
    practice: ['We check which Copilot experience you have, then practise one approved task using a goal, context, sources and expected format.', 'You compare the answer with the source and record which instructions and review steps you can reuse.'],
    limitation: 'Copilot features vary by licence and organisation settings. A fluent answer still needs checking against the source.',
    outcomes: ['A prompt template for one workplace task', 'A reviewed example answer', 'A note of your available features and information-handling rules'],
    blog: reading('why-copilot-rollouts-stall', 'Start Copilot adoption with a real task'),
  },
  'Outlook and Teams: email, meetings and actions': {
    audience: 'People who handle long email threads or need to follow through on meeting decisions.',
    practice: ['Using approved examples, we draft a thread summary, prepare a reply and turn meeting material into an action list.', 'We check names, dates and decisions against the original material, and distinguish confirmed actions from suggestions.'],
    limitation: 'Meeting features depend on permissions, settings and transcript availability. Verify owners and deadlines; do not send a draft without review.',
    outcomes: ['A reviewed email reply template', 'A meeting action tracker', 'A source-checking routine for decisions and deadlines'],
    blog: reading('why-copilot-rollouts-stall', 'Make Copilot useful in everyday work'),
  },
  'Word: useful documents and clear summaries': {
    audience: 'People who write reports, briefings and summaries from approved workplace sources.',
    practice: ['We build a document outline from a short source pack, draft one section and improve its structure and tone.', 'You inspect quotations, remove unsupported claims and mark information that still needs an answer.'],
    limitation: 'Copilot can omit context or invent a detail. Verify statements and quotations against approved sources before distributing the document.',
    outcomes: ['A structured document draft', 'A reusable briefing prompt', 'A claims and source-review checklist'],
    blog: reading('copilot-agent-mode-word-excel-powerpoint', 'Review Copilot edits in Office apps'),
  },
  'Excel: make sense of your data': {
    audience: 'People who use spreadsheets and want help exploring a clean, approved sample workbook.',
    practice: ['We inspect the headings and data types, choose one useful question and work through a formula, summary or chart.', 'You compare a result with a hand-worked example and record exclusions, blanks and assumptions.'],
    limitation: 'AI-generated formulas and charts can be wrong. Check totals and representative rows; a training example is not a financial audit.',
    outcomes: ['A sample workbook with a reviewed formula or summary', 'A worked validation example', 'A data-quality and formula-checking checklist'],
    blog: reading('copilot-agent-mode-word-excel-powerpoint', 'Check Copilot changes in spreadsheets'),
  },
  'PowerPoint: from a brief to a presentation': {
    audience: 'People preparing a short workplace presentation from an approved brief or report.',
    practice: ['We define the audience and decision, create a narrative outline and draft a small set of slides.', 'You remove unsupported claims, simplify crowded slides and inspect images, reading order and speaker notes.'],
    limitation: 'A first draft still needs factual, visual and accessibility review. Available generation and editing features depend on your licence and app.',
    outcomes: ['A presentation outline and draft slides', 'A source and visual-editing checklist', 'A reusable presentation brief'],
    blog: reading('copilot-agent-mode-word-excel-powerpoint', 'Use Agent Mode with review checkpoints'),
  },
  'Research, files and Copilot Notebooks': {
    audience: 'People who need to answer a focused question using approved files and research sources.',
    practice: ['We gather a small source collection, organise it around a question and draft a source-linked answer.', 'You inspect citations, compare conflicting evidence and record what the available sources cannot establish.'],
    limitation: 'Research output may miss sources or repeat outdated information. Check citations, access permissions and dates before relying on it.',
    outcomes: ['An organised source collection or notebook', 'A draft briefing with checked references', 'A list of evidence gaps and follow-up questions'],
    blog: reading('copilot-notebooks-and-memory', 'Organise Copilot sources and context'),
  },
  'Reusable instructions, agents and repeat tasks': {
    audience: 'Confident Copilot users with a recurring task and approval to use the relevant features.',
    practice: ['We define a narrow assistant role or reusable instruction set, using the features available in your account.', 'You test a normal request, a missing-information request and a request outside scope, then define when a person must take over.'],
    limitation: 'Agent access and usage charges vary. One session does not deliver organisation-wide deployment, and actions need explicit permission and review.',
    outcomes: ['A bounded instruction set or sample agent configuration', 'Three recorded test cases', 'A permissions, cost and human-handover checklist'],
    blog: reading('copilot-researcher-and-analyst-agents', 'Understand bounded Copilot agents'),
  },
  'Your personal Copilot workflow': {
    audience: 'People who want to make one approved recurring workplace task more consistent.',
    practice: ['We map your current steps, select where Copilot can help and run a sample from input to reviewed output.', 'You keep the useful prompts, record failure cases and decide which parts should stay manual.'],
    limitation: 'This covers one bounded workflow. Tool access, data quality and human checks limit what can be automated, and time savings must be measured in your work.',
    outcomes: ['A repeatable workflow checklist', 'A prompt pack and reviewed sample output', 'A simple before-and-after timing sheet'],
    blog: reading('why-copilot-rollouts-stall', 'Build adoption around a repeatable task'),
  },
};

export function coursePathFor(topic: { title: string; coursePath?: string }) {
  return topic.coursePath ?? `/courses/${topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}/`;
}

export function courseContentFor(topic: { title: string; description: string; coursePath?: string }, family: string): DetailedTopic {
  const existing = Object.values(detailedTopics).find(item => item.title === topic.title);
  if (existing) return existing;
  const supplement = courseSupplements[topic.title];
  if (!supplement) throw new Error(`Missing course content: ${topic.title}`);
  return {
    ...topic, ...supplement, description: topic.description.replace(supplement.limitation, '').trim(), family, coursePath: coursePathFor(topic),
    prerequisites: family.includes('Copilot')
      ? 'Bring a laptop, access to your organisation-approved Microsoft 365 account and fictional or approved anonymised material. We check the required licence, app and permissions before booking. Licences and usage charges are separate.'
      : 'Bring a laptop, a tightly scoped task and public, fictional or approved anonymised examples. We agree the tool and required account before booking. Software subscriptions and usage credits are separate.',
  };
}
