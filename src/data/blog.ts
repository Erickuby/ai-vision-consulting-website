export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
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

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-is-ai',
    title: 'What is AI? The Simplest Explanation You Will Ever Read',
    excerpt:
      'Everything you need to know about Artificial Intelligence without the technical jargon or Silicon Valley hype.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&h=900&fit=crop',
    imageAlt:
      'A small humanoid robot sitting at a desk, representing artificial intelligence explained in a simple way.',
    category: 'Fundamentals',
    categoryColor: '#00D4FF',
    readTime: '8 min read',
    date: '17 Mar 2026',
    publishedAt: '2026-03-17',
    updatedAt: '2026-03-17',
    authorName: 'Eric Nwankwo',
    authorRole: 'Founder, AI Vision Consulting',
    tags: ['Artificial Intelligence', 'AI Explained', 'AI for Beginners', 'Job Seekers', 'Small Business'],
    metaTitle:
      'What Is AI? A Simple Explanation for Beginners, Job Seekers and Business Owners | AI Vision Consulting',
    metaDescription:
      'Learn what AI is in plain English, how it works, where it shows up in daily life, and how job seekers and business owners can start using it today.',
    keywords: [
      'what is AI',
      'artificial intelligence explained simply',
      'AI for beginners',
      'how AI works',
      'AI for job seekers',
      'AI for business owners',
    ],
    content: {
      introduction: [
        'Artificial Intelligence, usually shortened to AI, is one of those terms people hear everywhere but often struggle to define clearly. Some people imagine robots taking over offices. Others think it is just ChatGPT. The truth is much simpler and much more useful.',
        'In plain English, AI is software that learns patterns from data and uses those patterns to make predictions, generate content, or help people make decisions faster. It is not magic. It is not all-knowing. It is a tool that can be powerful when you understand what it does well and where it still needs human judgment.',
        'If you are a job seeker, a working professional, or a business owner, AI matters because it can help you save time, improve the quality of your work, and open up new ways to earn. Once you stop treating it like science fiction, it becomes much easier to use it practically.',
      ],
      keyTakeaways: [
        'AI is software that spots patterns and turns them into useful outputs like predictions, summaries, recommendations, or drafts.',
        'Most AI tools people use today are narrow tools built for specific tasks, not human-level intelligence.',
        'AI can speed up research, writing, planning, and analysis, but it still needs a human to check for mistakes and context.',
        'You do not need to learn coding before you start using AI for your career or your business.',
      ],
      sections: [
        {
          heading: 'What AI actually means',
          paragraphs: [
            'The easiest way to understand AI is to think of it as pattern-recognition software. A traditional computer program follows fixed instructions. AI systems go further by learning from examples and using that learning to produce new answers.',
            'For example, if you show an AI system thousands of strong CVs, job descriptions, interview answers, or customer messages, it can begin to recognise common structures and useful patterns. That is why AI can help draft a cover letter, summarise notes, suggest ideas, or organise information quickly.',
            'So when someone asks, "What is AI?", a practical answer is this: AI is technology that helps machines perform tasks that normally need human judgment, language, or decision-making.',
          ],
        },
        {
          heading: 'How AI works in plain English',
          paragraphs: [
            'You do not need a computer science degree to understand the basics. Most modern AI tools follow a simple flow:',
          ],
          bullets: [
            'Data goes in: the system learns from text, images, numbers, audio, or user behaviour.',
            'Patterns are learned: the model finds relationships, similarities, and likely next steps.',
            'A prompt or request is given: you ask a question, upload a document, or set a task.',
            'An output is created: the tool responds with text, ideas, summaries, classifications, or predictions.',
            'A human reviews the result: the best outcomes happen when a person checks accuracy, tone, and relevance.',
          ],
        },
        {
          heading: 'The three types of AI most people run into',
          paragraphs: [
            'A lot of confusion comes from using one phrase, AI, to describe different tools. In real life, most people meet AI in three forms:',
          ],
          bullets: [
            'Automation tools: systems that follow rules to save time, such as scheduling, workflows, or sorting enquiries.',
            'Predictive AI: systems that use past data to forecast what might happen next, such as fraud alerts, recommendations, or demand forecasts.',
            'Generative AI: tools like ChatGPT that create new text, images, summaries, or drafts based on a prompt.',
          ],
        },
        {
          heading: 'Where you already see AI every day',
          paragraphs: [
            'AI is already woven into normal life, even for people who say they never use it. If your email filters spam, your phone predicts the next word, your bank flags unusual spending, or Netflix recommends what to watch, you are already seeing AI at work.',
            'At work, AI shows up in meeting summaries, grammar tools, customer support chat, document search, image generation, analytics dashboards, and recruitment software. In business, it helps with content drafting, proposal writing, customer segmentation, stock forecasting, and admin tasks that used to eat up hours.',
            'This matters because AI is no longer just a topic for tech companies. It is becoming part of how ordinary people search for jobs, do their jobs, and grow their businesses.',
          ],
        },
        {
          heading: 'What AI is good at and where it still struggles',
          paragraphs: [
            'AI is useful, but it is not trustworthy by default. The smartest way to use it is to know where it shines and where it can go badly wrong.',
          ],
          bullets: [
            'AI is strong at brainstorming, summarising, drafting, translating, categorising, comparing options, and speeding up repetitive work.',
            'AI is weaker at deep context, emotional nuance, fact-checking, legal certainty, and understanding the full consequences of a decision.',
            'AI can sound confident even when it is wrong, outdated, or missing important details.',
            'The best users do not ask AI to think for them. They use it to think faster, then apply their own judgment.',
          ],
        },
        {
          heading: 'Why AI matters for job seekers, professionals, and business owners',
          paragraphs: [
            'For job seekers, AI can help turn a slow, frustrating search into a more strategic process. It can help tailor CVs, improve LinkedIn profiles, identify missing keywords in job adverts, prepare interview answers, and organise applications without starting from scratch every time.',
            'For professionals, AI can help you learn a role faster, draft reports more clearly, prepare presentations, and handle repetitive admin with less stress. Used well, it helps you look sharper and move faster without cutting corners.',
            'For business owners, AI can help with content planning, customer research, email drafting, process documentation, proposal writing, and automation. That does not mean replacing your team. It means helping your team spend more time on high-value work.',
          ],
          bullets: [
            'Job seekers use AI to improve applications and interview prep.',
            'Employees use AI to learn faster, communicate better, and save time.',
            'Business owners use AI to automate routine work and scale small teams more effectively.',
          ],
        },
        {
          heading: 'How to start using AI today without getting overwhelmed',
          paragraphs: [
            'The biggest mistake beginners make is trying too many tools at once. A better approach is to start with one problem and one useful workflow.',
          ],
          bullets: [
            'Pick one real task you already do every week, such as writing emails, tailoring CVs, or summarising meetings.',
            'Choose one tool and learn it properly before chasing the next shiny platform.',
            'Give AI context in your prompt, including your goal, audience, tone, and any useful examples.',
            'Edit the output so it sounds like you and fits the real situation.',
            'Save your best prompts so you can reuse what works instead of starting from zero each time.',
          ],
        },
        {
          heading: 'The most important thing to remember',
          paragraphs: [
            'AI is not a shortcut to avoiding effort. It is a multiplier for clear thinking. If you know what you want, what good looks like, and how to review the result, AI can make you much more effective.',
            'That is why the people getting the best results with AI are not always the most technical. They are usually the people who understand their field, ask better questions, and treat AI as a practical assistant instead of a magic button.',
            'If you remember one sentence from this guide, make it this: AI is a tool for better work, not a replacement for human judgment.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Is AI the same as ChatGPT?',
          answer:
            'No. ChatGPT is one example of generative AI, but AI is a wider category that also includes recommendation systems, image recognition, forecasting tools, spam filters, and automation systems.',
        },
        {
          question: 'Do I need to know how to code before I use AI?',
          answer:
            'No. Many of the most useful AI tools for job seekers, professionals, and small businesses are designed for non-technical users. The more important skill is learning how to ask clear questions and review the output properly.',
        },
        {
          question: 'Will AI replace jobs completely?',
          answer:
            'AI will change jobs more often than it removes them entirely. In many roles, the people who learn how to use AI well become more productive and more valuable than those who ignore it.',
        },
        {
          question: 'Can AI give wrong answers?',
          answer:
            'Yes. AI can be inaccurate, incomplete, biased, or overconfident. That is why it should support your work, not replace checking, critical thinking, or professional judgment.',
        },
        {
          question: 'What is the best first step for a beginner?',
          answer:
            'Start with one useful use case, like improving your CV, planning content, or summarising notes. Use the same tool for a week, refine your prompts, and review what saved you time or improved quality.',
        },
      ],
      ctaTitle: 'Ready to use AI for real results?',
      ctaText:
        'If you want practical help using AI for job hunting, work, or business growth, start with a free 15-minute AI assessment or explore our courses.',
      ctaPrimaryLabel: 'Book Free Assessment',
      ctaPrimaryHref: '/#contact',
      ctaSecondaryLabel: 'Browse Courses',
      ctaSecondaryHref: '/#courses',
    },
  },
  {
    slug: '5-ai-prompts-every-jobseeker-needs-right-now',
    title: '5 AI Prompts Every Jobseeker Needs Right Now',
    excerpt:
      'Stop submitting generic CVs. Learn how to use AI to tailor your application, write a punchy cover letter, and prep for interviews.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=480&h=260&fit=crop',
    imageAlt: 'A laptop, notebook, and coffee on a work desk for a jobseeker guide about AI prompts.',
    category: 'Practical Guide',
    categoryColor: '#FFD700',
    readTime: '4 min read',
    date: 'Coming Soon',
    publishedAt: '',
    updatedAt: '',
    authorName: 'AI Vision Consulting',
    authorRole: 'Editorial Team',
    tags: ['AI Prompts', 'Job Search', 'CV Writing'],
    metaTitle: '5 AI Prompts Every Jobseeker Needs Right Now | AI Vision Consulting',
    metaDescription:
      'Learn the AI prompts that help job seekers tailor CVs, prep for interviews, and improve applications faster.',
    keywords: ['AI prompts for jobseekers', 'AI CV prompts', 'AI interview prep'],
    comingSoon: true,
  },
  {
    slug: 'how-to-start-an-ai-side-hustle-from-scratch-in-2026',
    title: 'How to Start an AI Side Hustle From Scratch in 2026',
    excerpt:
      "You don't need a degree in computer science. You need a process, a niche, and a few paying clients. Here is the exact roadmap.",
    image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=480&h=260&fit=crop',
    imageAlt: 'A business planning desk with charts and a smartphone for an AI side hustle article.',
    category: 'Business',
    categoryColor: '#00FF88',
    readTime: '7 min read',
    date: 'Coming Soon',
    publishedAt: '',
    updatedAt: '',
    authorName: 'AI Vision Consulting',
    authorRole: 'Editorial Team',
    tags: ['AI Side Hustle', 'Business Growth', 'Consulting'],
    metaTitle: 'How to Start an AI Side Hustle From Scratch in 2026 | AI Vision Consulting',
    metaDescription:
      'A practical guide to starting an AI side hustle, finding a niche, and getting your first paying clients.',
    keywords: ['AI side hustle', 'AI business ideas', 'AI consulting for beginners'],
    comingSoon: true,
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostHref(post: BlogPost) {
  return `/blog/${post.slug}`;
}

export function isLiveBlogPost(post: BlogPost) {
  return !post.comingSoon && Boolean(post.content);
}
