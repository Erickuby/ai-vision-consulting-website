import { GraduationCap, Cpu, Presentation, HandshakeIcon, type LucideIcon } from 'lucide-react';
import { consultancyOffers } from './serviceOffers';
import { clarifyVat } from './pricingPolicy';

export interface ServiceItem {
  icon: LucideIcon;
  slug: string;
  color: string;
  title: string;
  description: string;
  points: string[];
  cta: string;
  ctaHref: string;
}

export const servicesData: ServiceItem[] = [
  ...consultancyOffers.map((offer) => ({ icon: HandshakeIcon, slug: offer.href.split('/').filter(Boolean).at(-1)!, color: '#00D4FF', title: offer.name, description: clarifyVat(`${offer.description} ${offer.price}.`), points: offer.features, cta: 'View service details', ctaHref: offer.href })),
  {
    icon: GraduationCap,
    slug: 'training',
    color: '#00D4FF',
    title: 'AI Training Programmes',
    description: 'Structured courses for jobseekers, career changers, and business owners. From beginner to practitioner. All levels welcome. Delivered online, in-person, or hybrid across Newcastle and the UK.',
    points: ['Practical structured sessions', 'Cohort and workshop options', 'Formats scoped around the audience'],
    cta: 'Browse Courses',
    ctaHref: 'courses',
  },
  {
    icon: Cpu,
    slug: 'consulting',
    color: '#FFD700',
    title: '1:1 Consulting',
    description: "Work directly with our AI specialist to solve your specific challenges. Whether it's a career pivot, a business automation project, or building an AI side income. We map a clear path forward.",
    points: ['Scoped discovery and advice', 'Custom AI roadmap for your goals', 'Ongoing support available'],
    cta: 'Book a Call',
    ctaHref: 'contact',
  },
  {
    icon: Presentation,
    slug: 'corporate',
    color: '#A78BFA',
    title: 'Corporate Workshops',
    description: 'Half-day to full-day AI literacy and strategy sessions for teams and leadership. We keep the training practical, clear, and easy to apply.',
    points: ['Executive AI briefings', 'Team upskilling workshops', 'AI policy and readiness audits'],
    cta: 'Enquire Now',
    ctaHref: 'contact',
  },
  {
    icon: HandshakeIcon,
    slug: 'partnerships',
    color: '#00FF88',
    title: 'Community Partnerships',
    description: 'We shape accessible AI training for charities, employability providers, community organisations and public-service partners.',
    points: ['Employability-focused AI skills', 'Community and faith-group sessions', 'Delivery scoped with each partner'],
    cta: 'Partner With Us',
    ctaHref: 'contact',
  },
];
