import { Briefcase, Bot, TrendingUp, type LucideIcon } from 'lucide-react';

export interface FlagshipItem {
  icon: LucideIcon;
  color: string;
  gradient: string;
  border: string;
  hoverBorder: string;
  title: string;
  desc: string;
  price: string;
  href: string;
}

export const flagshipData: FlagshipItem[] = [
  {
    icon: Briefcase,
    color: '#00D4FF',
    gradient: 'from-[#00D4FF]/10 to-[#0050A0]/10',
    border: 'border-[#00D4FF]/20',
    hoverBorder: 'hover:border-[#00D4FF]/50',
    title: 'AI-Powered Job Hunting',
    desc: 'Transform your CV, LinkedIn, and interview game with AI. Land more interviews, faster.',
    price: 'From £197',
    href: 'courses',
  },
  {
    icon: Bot,
    color: '#FFD700',
    gradient: 'from-[#FFD700]/10 to-[#C86400]/5',
    border: 'border-[#FFD700]/20',
    hoverBorder: 'hover:border-[#FFD700]/50',
    title: 'Business Automation',
    desc: 'Put your admin on autopilot. Save 10+ hours a week with AI tools built for small businesses.',
    price: 'From £297',
    href: 'courses',
  },
  {
    icon: TrendingUp,
    color: '#00FF88',
    gradient: 'from-[#00FF88]/10 to-[#009650]/5',
    border: 'border-[#00FF88]/20',
    hoverBorder: 'hover:border-[#00FF88]/50',
    title: 'AI Consultant Bootcamp',
    desc: 'Go from curious to consulting. Build a profitable AI side hustle with real clients, real income.',
    price: 'From £497',
    href: 'courses',
  },
];
