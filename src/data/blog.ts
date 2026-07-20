export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  promptLabel?: string;
  promptText?: string;
  note?: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogContent {
  introduction: string[];
  keyTakeaways: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  ctaTitle: string;
  ctaText: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: string;
  categoryColor: string;
  readTime: string;
  date: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  authorRole: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  comingSoon?: boolean;
  content?: BlogContent;
}

const author = {
  authorName: 'Eric Nwankwo',
  authorRole: 'Founder and AI Trainer, AI Vision Consulting',
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-is-ai',
    title: 'What Is AI? A Simple Explanation for Beginners',
    excerpt: 'A plain-English introduction to artificial intelligence, how AI systems are developed, common uses, and their limitations.',
    image: 'https://aivisionconsulting.co.uk/images/blog/what-is-ai.png',
    imageAlt: 'A plain-English visual guide to artificial intelligence, showing connected ideas around a human learner.',
    category: 'Fundamentals',
    categoryColor: '#00D4FF',
    readTime: '8 min read',
    date: '17 Mar 2026',
    publishedAt: '2026-03-17',
    updatedAt: '2026-07-20',
    ...author,
    tags: ['Artificial Intelligence', 'AI for Beginners', 'Responsible AI'],
    metaTitle: 'What Is AI? A Simple Explanation for Beginners',
    metaDescription: 'Learn what AI means, how machine-learning systems are trained, where AI appears in daily life, and why human review and data protection matter.',
    keywords: ['what is AI', 'AI explained simply', 'AI for beginners'],
  },
  {
    slug: '8-ai-prompts-every-job-seeker-needs-right-now',
    title: '8 AI Prompts for a More Focused Job Search',
    excerpt: 'Use these eight practical prompts to compare roles, strengthen truthful CV evidence, prepare for interviews and keep your own voice.',
    image: 'https://aivisionconsulting.co.uk/images/blog/8-ai-prompts-every-job-seeker-needs-right-now.png',
    imageAlt: 'Eight practical AI prompts arranged as a focused job-search toolkit.',
    category: 'Practical Guide',
    categoryColor: '#FFD700',
    readTime: '12 min read',
    date: '17 Mar 2026',
    publishedAt: '2026-03-17',
    updatedAt: '2026-07-20',
    ...author,
    tags: ['Job Search', 'CV Writing', 'AI Prompts'],
    metaTitle: '8 AI Prompts for a More Focused Job Search',
    metaDescription: 'Use eight practical AI prompts to analyse job descriptions, improve truthful CV evidence, prepare interviews and create more focused applications.',
    keywords: ['AI prompts for job seekers', 'AI CV prompts', 'AI job application prompts'],
  },
  {
    slug: 'use-ai-civil-service-application',
    title: 'How to Use AI in a Civil Service Application Without Losing Your Voice',
    excerpt: 'A practical guide to using AI as a planning and review tool while keeping your Civil Service application truthful, specific and recognisably yours.',
    image: 'https://aivisionconsulting.co.uk/images/blog/use-ai-civil-service-application.png',
    imageAlt: 'A Civil Service application document with a human-review check mark.',
    category: 'Careers and Employability',
    categoryColor: '#FFD700',
    readTime: '9 min read',
    date: '20 Jul 2026',
    publishedAt: '2026-07-20',
    updatedAt: '2026-07-20',
    ...author,
    tags: ['Civil Service Applications', 'Success Profiles', 'Responsible AI'],
    metaTitle: 'Use AI in a Civil Service Application Without Losing Your Voice',
    metaDescription: 'Learn how to use AI for Civil Service application planning, evidence review and editing while keeping every example accurate, personal and authentic.',
    keywords: ['AI Civil Service application', 'AI personal statement', 'Civil Service Success Profiles'],
  },
  {
    slug: 'ai-training-for-employees',
    title: 'What Should Practical AI Training for Employees Include?',
    excerpt: "A buyer's guide to AI training that helps employees practise useful tasks while handling data, risk and quality responsibly.",
    image: 'https://aivisionconsulting.co.uk/images/blog/ai-training-for-employees.png',
    imageAlt: 'A practical workplace AI training session with three employees.',
    category: 'AI Training',
    categoryColor: '#C084FC',
    readTime: '8 min read',
    date: '20 Jul 2026',
    publishedAt: '2026-07-20',
    updatedAt: '2026-07-20',
    ...author,
    tags: ['Employee AI Training', 'Responsible AI', 'Workplace Skills'],
    metaTitle: 'Practical AI Training for Employees: What to Include',
    metaDescription: 'Learn what practical employee AI training should cover, from role-based tasks and data handling to prompt skills, fact-checking, policy and measurement.',
    keywords: ['AI training for employees', 'workplace AI training', 'corporate AI workshop'],
  },
  {
    slug: 'what-to-automate-first-small-business',
    title: 'What Should a Small Business Automate First? A Practical UK Guide',
    excerpt: 'A practical method for choosing a first automation that saves useful time without creating unnecessary risk or complexity.',
    image: 'https://aivisionconsulting.co.uk/images/blog/what-to-automate-first-small-business.png',
    imageAlt: 'A simple small-business workflow showing which task to automate first.',
    category: 'AI Automation',
    categoryColor: '#00D4FF',
    readTime: '9 min read',
    date: '20 Jul 2026',
    publishedAt: '2026-07-20',
    updatedAt: '2026-07-20',
    ...author,
    tags: ['Small Business Automation', 'Workflow Design', 'Responsible AI'],
    metaTitle: 'What Should a Small Business Automate First? UK Guide',
    metaDescription: 'Learn which small business task to automate first using a practical scorecard covering time, frequency, errors, customer impact and data sensitivity.',
    keywords: ['what to automate first', 'small business automation UK', 'AI workflow automation'],
  },
  {
    slug: 'whatsapp-lead-automation-small-business',
    title: 'WhatsApp Lead Automation for Small Businesses: What to Automate and What to Keep Human',
    excerpt: 'A practical guide to building a WhatsApp lead workflow that responds quickly, hands off clearly and respects customer choice.',
    image: 'https://aivisionconsulting.co.uk/images/blog/whatsapp-lead-automation-small-business.png',
    imageAlt: 'Customer message bubbles moving from automation to a human handoff.',
    category: 'AI Automation',
    categoryColor: '#00D4FF',
    readTime: '9 min read',
    date: '20 Jul 2026',
    publishedAt: '2026-07-20',
    updatedAt: '2026-07-20',
    ...author,
    tags: ['WhatsApp Automation', 'Lead Handling', 'Customer Service'],
    metaTitle: 'WhatsApp Lead Automation for Small Businesses',
    metaDescription: 'Learn how small businesses can automate WhatsApp enquiries, qualification, booking and reminders while keeping consent, data and judgement human.',
    keywords: ['WhatsApp lead automation', 'WhatsApp bot small business', 'automated lead qualification'],
  },
  {
    slug: 'ai-chatbot-for-your-website',
    title: 'Does Your Website Need an AI Chatbot? A Practical Checklist',
    excerpt: 'A practical guide to deciding whether an AI chatbot, FAQ page or contact form is the right fit for your website.',
    image: 'https://aivisionconsulting.co.uk/images/blog/ai-chatbot-for-your-website.png',
    imageAlt: 'A website chatbot interface with routes to automated and human support.',
    category: 'AI Automation',
    categoryColor: '#00D4FF',
    readTime: '8 min read',
    date: '20 Jul 2026',
    publishedAt: '2026-07-20',
    updatedAt: '2026-07-20',
    ...author,
    tags: ['AI Chatbots', 'Website Support', 'Small Business'],
    metaTitle: 'Does Your Website Need an AI Chatbot? Checklist',
    metaDescription: 'Use this practical checklist to decide whether your website needs an AI chatbot, what to prepare, how to manage risk and what to measure before buying.',
    keywords: ['does my website need an AI chatbot', 'AI chatbot for website', 'document chatbot'],
  },
  {
    slug: 'how-to-start-an-ai-side-hustle',
    title: 'How to Start an AI Side Hustle Without Selling Empty Promises',
    excerpt: 'A grounded guide to turning an existing skill into a small AI-assisted service that solves a real problem and sets honest expectations.',
    image: 'https://aivisionconsulting.co.uk/images/blog/how-to-start-an-ai-side-hustle.png',
    imageAlt: 'A focused freelance service moving from a real problem to a useful solution.',
    category: 'AI for Business',
    categoryColor: '#F4B400',
    readTime: '9 min read',
    date: '20 Jul 2026',
    publishedAt: '2026-07-20',
    updatedAt: '2026-07-20',
    ...author,
    tags: ['AI Side Hustle', 'Freelancing', 'Service Business'],
    metaTitle: 'How to Start an AI Side Hustle Without Empty Promises',
    metaDescription: 'Build an honest AI side hustle around a real customer problem, a small service, clear scope, careful quality checks and practical UK business basics.',
    keywords: ['how to start an AI side hustle', 'AI freelance services', 'AI side hustle UK'],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostHref(post: BlogPost) {
  return post.comingSoon ? '#resources' : `/blog/${post.slug}`;
}

export function isLiveBlogPost(post: BlogPost) {
  return !post.comingSoon;
}
