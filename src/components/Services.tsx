import { consultancyOffers } from '../data/serviceOffers';
import { clarifyVat } from '../data/pricingPolicy';

const services = [
  { title: 'Find your starting point', href: '/contact/', cta: 'AI readiness workshop', description: 'Identify where AI could help your team, what needs human judgement and which skills to build first.', points: ['Review current confidence and needs', 'Prioritise relevant use cases', 'Agree responsible-use actions'] },
  { title: 'Build everyday confidence', href: '/corporate-ai-training-uk/', cta: 'Practical training for teams', description: 'Work through useful tasks together, with clear teaching and guided practice shaped around your people.', points: ['Focused, half-day and full-day formats', 'Role-specific exercises and resources', 'Online or on-site delivery'] },
  { title: 'Improve a recurring task', href: '/ai-automation-consultant-newcastle/', cta: 'Workflow improvement sprint', description: 'Map a repetitive process and design a small, testable improvement with the right checks and handover.', points: ['Current-process and risk mapping', 'Pilot scope and testing', 'Documentation and human approval'] },
  ...consultancyOffers.map((offer) => ({ title: offer.name, href: offer.href, cta: 'View scope and price', description: clarifyVat(`${offer.description} ${offer.price}.`), points: offer.features })),
];
export function Services() {
  return <section id="services" className="service-editorial section-wrapper" aria-labelledby="services-heading">
    <p className="eyebrow">Work with AI Vision Consulting</p>
    <h2 id="services-heading">Start with what you need to do better.</h2>
    {services.map((service, index) => <article className="service-row" key={service.title}>
      <span aria-hidden="true">0{index + 1}</span>
      <div><h3>{service.title}</h3><a className="hero-text-link" href={service.href}>{service.cta} <span aria-hidden="true">↗</span></a></div>
      <div><p>{service.description}</p><ul>{service.points.map(point => <li key={point}>{point}</li>)}</ul></div>
    </article>)}
  </section>;
}
