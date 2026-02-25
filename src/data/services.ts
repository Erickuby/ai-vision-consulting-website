import { GraduationCap, Cpu, Presentation, HandshakeIcon, type LucideIcon } from 'lucide-react';

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
  {
    icon: GraduationCap,
    slug: 'training',
    color: '#00D4FF',
    title: 'AI Training Programmes',
    description: 'Structured courses for jobseekers, career changers, and business owners. From beginner to practitioner. All levels welcome. Delivered online, in-person, or hybrid across Newcastle and the UK.',
    points: ['6–10 week structured courses', 'Cohort and self-paced options', 'Funded places available for eligible learners'],
    cta: 'Browse Courses',
    ctaHref: 'courses',
  },
  {
    icon: Cpu,
    slug: 'consulting',
    color: '#FFD700',
    title: '1:1 Consulting',
    description: "Work directly with our AI specialist to solve your specific challenges. Whether it's a career pivot, a business automation project, or building an AI side income. We map a clear path forward.",
    points: ['90-minute strategy sessions', 'Custom AI roadmap for your goals', 'Ongoing support available'],
    cta: 'Book a Call',
    ctaHref: 'contact',
  },
  {
    icon: Presentation,
    slug: 'corporate',
    color: '#A78BFA',
    title: 'Corporate Workshops',
    description: 'Half-day to full-day AI literacy and strategy sessions for teams and leadership. We make AI tangible, practical, and immediately useful. No fluff, no jargon.',
    points: ['Executive AI briefings', 'Team upskilling workshops', 'AI policy and readiness audits'],
    cta: 'Enquire Now',
    ctaHref: 'contact',
  },
  {
    icon: HandshakeIcon,
    slug: 'partnerships',
    color: '#00FF88',
    title: 'Community Partnerships',
    description: 'We partner with Jobcentres, churches, community organisations, and local councils to bring free or subsidised AI training to those who need it most. Accessibility is non-negotiable.',
    points: ['DWP / Jobcentre Plus aligned', 'Church and faith group seminars', 'Grant-funded cohorts available'],
    cta: 'Partner With Us',
    ctaHref: 'contact',
  },
];
