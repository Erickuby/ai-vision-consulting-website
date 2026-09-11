import type { SiteRoute } from './routes';
import { courseContentFor } from './courseContent';
import { individualSessionRate, trainingCategories, copilotSessions } from './training';

const allTopics = [
  ...trainingCategories.flatMap(category => category.sessions.map(topic => courseContentFor(topic, category.title))),
  ...copilotSessions.map(topic => courseContentFor(topic, 'Microsoft 365 Copilot for work')),
];

export const courseRoutes: SiteRoute[] = allTopics.map((topic) => ({
  path: topic.coursePath,
  kind: 'course',
  title: `${topic.title} | AI Vision Consulting`,
  description: topic.description,
  eyebrow: topic.family,
  h1: topic.title,
  intro: topic.description.includes(topic.limitation) ? topic.description : `${topic.description} ${topic.limitation}`,
  lastReviewed: '2026-09-10',
  course: { corporateOnly: !!topic.corporateOnly, price: topic.corporateOnly ? undefined : individualSessionRate },
  sections: [
    { heading: 'Who this session is for', paragraphs: [topic.audience] },
    { heading: 'What we will work through', paragraphs: topic.practice },
    { heading: 'Before you book', paragraphs: [topic.prerequisites, topic.limitation] },
    { heading: 'You will leave with', paragraphs: [], bullets: topic.outcomes },
  ],
  relatedLinks: [topic.blog],
  faqs: [
    { question: 'How much does this training cost?', answer: topic.corporateOnly
      ? 'This topic is corporate-only and scoped with your IT and information-governance team. Team essentials workshops start at £995 for 90 minutes and up to 15 people; the agreed scope determines the final quote.'
      : 'A focused individual hour is £95. A free discovery call checks your goal and access first. Starter, Momentum and Complete bundles are also available. Software subscriptions and usage credits are separate.' },
    { question: 'Does this include vendor certification?', answer: 'No. This is independent practical training and does not provide vendor certification. Any awarded CPD accreditation would be identified separately on this page.' },
  ],
}));
