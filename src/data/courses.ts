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
    category: 'individuals',
    tag: '1-to-1 Training',
    title: 'Focused AI Session',
    subtitle: 'One topic tailored to a practical goal',
    price: '£125',
    funded: false,
    duration: '90 minutes',
    outcomes: ['Choose from twelve practical topics', 'Work through your own goal live', 'Leave with clear action notes'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=220&fit=crop',
    color: '#00D4FF',
    ctaHref: '/pricing/#individual-training',
  },
  {
    id: 7,
    category: 'individuals',
    tag: 'Starter Bundle',
    title: 'Three-Session Plan',
    subtitle: 'Build confidence across three connected topics',
    price: '£330',
    funded: false,
    duration: '4.5 hours total',
    outcomes: ['Personalised learning plan', 'Practice between sessions', 'Save £45 against single sessions'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=220&fit=crop',
    color: '#00D4FF',
    ctaHref: '/pricing/#individual-training',
  },
  {
    id: 2,
    category: 'individuals',
    tag: 'Growth Bundle',
    title: 'Six-Session Plan',
    subtitle: 'Connect several AI skills into useful workflows',
    price: '£600',
    funded: false,
    duration: '9 hours total',
    outcomes: ['Progress reviews', 'Reusable prompts and workflow notes', 'Save £150 against single sessions'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=220&fit=crop',
    color: '#FFD700',
    ctaHref: '/pricing/#individual-training',
  },
  {
    id: 3,
    category: 'individuals',
    tag: 'Complete Programme',
    title: 'Twelve-Session Programme',
    subtitle: 'From AI foundations to practical creation and services',
    price: '£1,080',
    funded: false,
    duration: '18 hours total',
    outcomes: ['All twelve training topics', 'Structured learning roadmap', 'Save £420 against single sessions'],
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=220&fit=crop',
    color: '#00FF88',
    ctaHref: '/pricing/#individual-training',
  },
];

export const courseFilters = [
  { key: 'all', label: 'All Programmes' },
  { key: 'individuals', label: 'Individuals' },
];

export type Course = CourseItem;
