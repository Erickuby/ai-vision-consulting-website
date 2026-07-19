export interface CourseItem {
  id: number;
  category: string;
  tag: string;
  title: string;
  subtitle: string;
  price: string;
  funded: boolean;
  duration: string;
  outcomes: string[];
  image: string;
  color: string;
  ctaHref: string;
}

export const allCourses: CourseItem[] = [
  {
    id: 1,
    category: 'jobseekers',
    tag: 'Career Support',
    title: 'AI-Powered Job Hunting',
    subtitle: 'Truthful applications, research and interview preparation',
    price: 'Scope on enquiry',
    funded: false,
    duration: 'Flexible format',
    outcomes: ['Research roles and employers', 'Tailor evidence without inventing experience', 'Prepare structured interview examples'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=220&fit=crop',
    color: '#00D4FF',
    ctaHref: '#contact',
  },
  {
    id: 7,
    category: 'jobseekers',
    tag: 'Workplace Skills',
    title: 'AI on the Job',
    subtitle: 'Responsible AI support for everyday professional work',
    price: 'Scope on enquiry',
    funded: false,
    duration: 'Flexible format',
    outcomes: ['Research and organise information', 'Draft and review workplace content', 'Recognise when human judgement is essential'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=220&fit=crop',
    color: '#00D4FF',
    ctaHref: '#contact',
  },
  {
    id: 2,
    category: 'business',
    tag: 'Business',
    title: 'AI for Small Business',
    subtitle: 'Practical productivity and workflow discovery',
    price: 'Scope on enquiry',
    funded: false,
    duration: 'Flexible format',
    outcomes: ['Identify suitable AI use cases', 'Improve repeatable content and admin tasks', 'Plan measured automation safely'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=220&fit=crop',
    color: '#FFD700',
    ctaHref: '#contact',
  },
  {
    id: 3,
    category: 'business',
    tag: 'Consulting Skills',
    title: 'AI Consulting Foundations',
    subtitle: 'Discovery, scoping and responsible solution design',
    price: 'Scope on enquiry',
    funded: false,
    duration: 'Flexible format',
    outcomes: ['Discover real client needs', 'Scope a controlled AI solution', 'Communicate assumptions, risks and value'],
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=220&fit=crop',
    color: '#00FF88',
    ctaHref: '#contact',
  },
];

export const courseFilters = [
  { key: 'all', label: 'All Programmes' },
  { key: 'jobseekers', label: 'Jobseekers' },
  { key: 'business', label: 'Business' },
];

export type Course = CourseItem;
