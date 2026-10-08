import type { SiteRoute } from './routes';
import { courseContentFor } from './courseContent';
import { individualSessionRate, trainingCategories, copilotSessions } from './training';

const allTopics = [
  ...trainingCategories.flatMap(category => category.sessions.map(topic => courseContentFor(topic, category.title))),
  ...copilotSessions.map(topic => courseContentFor(topic, 'Microsoft 365 Copilot for work')),
];

// A course belongs to a track: the part of its family before the qualifier, so
// "Microsoft 365 Copilot for Work · Leadership and finance" sits with the rest of the
// Copilot track rather than alone.
const trackOf = (family: string) => family.split('·')[0].trim().toLowerCase();

// Each course page used to be reachable from a single place, which is how a dozen of them
// ended up discovered by Google and never crawled. Linking the siblings in a track gives
// every session several routes in and gives a reader somewhere sensible to go next.
// Taking the first four of a track would link the same four every time and leave the
// rest of a long track with nothing pointing at them. Walking forward from each course
// and wrapping round means every session is linked by its neighbours.
const siblingsFor = (topic: (typeof allTopics)[number]) => {
  const track = allTopics.filter((other) => trackOf(other.family) === trackOf(topic.family));
  const start = track.findIndex((other) => other.coursePath === topic.coursePath);
  return Array.from({ length: Math.min(4, track.length - 1) }, (_, step) => track[(start + step + 1) % track.length])
    .map((other) => ({ href: other.coursePath, label: other.title }));
};

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
  relatedCourses: siblingsFor(topic),
  faqs: [
    { question: 'How much does this training cost?', answer: topic.corporateOnly
      ? 'This topic is corporate-only and scoped with your IT and information-governance team. Team essentials workshops start at £995 for 90 minutes and up to 15 people; the agreed scope determines the final quote.'
      : 'A focused individual hour is £95. A free discovery call checks your goal and access first. Starter, Momentum and Complete bundles are also available. Software subscriptions and usage credits are separate.' },
    { question: 'Does this include vendor certification?', answer: 'No. This is independent practical training and does not provide vendor certification. Any awarded CPD accreditation would be identified separately on this page.' },
  ],
}));
