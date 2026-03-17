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
    slug: '8-ai-prompts-every-job-seeker-needs-right-now',
    title: '8 AI Prompts Every Job Seeker Needs Right Now',
    excerpt:
      'Use these 8 practical AI prompts to match your experience to jobs, rewrite your CV, beat ATS filters, and create a tailored application faster.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=480&h=260&fit=crop',
    imageAlt: 'A laptop, notebook, and coffee on a work desk for a jobseeker guide about AI prompts.',
    category: 'Practical Guide',
    categoryColor: '#FFD700',
    readTime: '12 min read',
    date: '17 Mar 2026',
    publishedAt: '2026-03-17',
    updatedAt: '2026-03-17',
    authorName: 'Eric Nwankwo',
    authorRole: 'Founder, AI Vision Consulting',
    tags: ['AI Prompts', 'Job Search', 'CV Writing', 'ATS', 'Career Change'],
    metaTitle:
      '8 AI Prompts for Job Seekers to Tailor CVs, Pass ATS and Land Interviews | AI Vision Consulting',
    metaDescription:
      'Learn 8 detailed AI prompts job seekers can use to analyse job descriptions, rewrite CV bullets, improve ATS performance and build stronger job applications.',
    keywords: [
      'AI prompts for job seekers',
      'ChatGPT prompts for CV writing',
      'ATS CV prompts',
      'career transition CV prompts',
      'AI prompts for job applications',
      'how to use AI for job search',
    ],
    content: {
      introduction: [
        'A lot of job seekers use AI in the wrong order. They open ChatGPT, ask it to write a CV from scratch, and end up with something that sounds polished but generic. That is why so many AI-assisted applications feel empty, repetitive, or obviously written by a bot.',
        'A better approach is to use AI as a career strategy assistant, not just a writing machine. That means starting with job matching, then pulling out the right keywords, then rewriting bullet points truthfully, then testing for ATS issues, and only at the end generating a tailored CV for a specific role.',
        'The eight prompts below are designed to follow that logic. They help career changers, job seekers, and professionals moving into a new role use AI more intelligently. If you use them in order, you can move from confusion to a targeted, evidence-based application that reads clearly and reflects your real experience.',
      ],
      keyTakeaways: [
        'Do not start by asking AI to write your whole CV from nothing. Start with job matching and keyword analysis first.',
        'The strongest AI job-search workflows are truthful, evidence-based, and tied to a specific job description.',
        'You can use these prompts to identify transferable skills, rewrite CV bullets, test ATS compatibility, and build a tailored final CV.',
        'AI should reframe your experience, not invent experience you do not have.',
        'Using these prompts in sequence creates a far better application than using random one-off prompts.',
      ],
      sections: [
        {
          heading: 'Why this article matters if you are applying for jobs in 2026',
          paragraphs: [
            'Job searching is more competitive, more automated, and more keyword-driven than it used to be. Many employers now rely on Applicant Tracking Systems to sort CVs before a recruiter even sees them. At the same time, hiring managers still want evidence, clarity, and relevance. That creates a challenge for candidates who know they can do the job but struggle to present their experience in the right way.',
            'This is where AI can help. Used well, it can speed up job analysis, highlight transferable skills, improve phrasing, clean up formatting, and turn a broad CV into a targeted application. Used badly, it creates vague language, fake sounding achievements, and keyword stuffing that weakens your credibility.',
            'These eight prompts are built to help you use AI the right way. They are especially useful for career changers, people returning to work, professionals moving sectors, and applicants who know they have relevant experience but need help making that relevance obvious.',
          ],
        },
        {
          heading: 'How to use these prompts without hurting your application',
          paragraphs: [
            'Before you paste any prompt into ChatGPT or another AI tool, keep one rule in mind: the AI is there to organise, reframe, and sharpen your experience, not replace your judgment. Every output should be checked by you before it goes into a real application.',
            'The most effective job seekers use AI as an editor and strategist. They paste in their genuine work history, job descriptions they really want, and keywords taken from real roles. They then review the result, correct anything inaccurate, and make sure the final wording still sounds human and honest.',
          ],
          bullets: [
            'Always paste real experience, not what you wish you had done.',
            'Check any suggested metrics before you submit them.',
            'Keep the final language natural so it still sounds like you.',
            'Use one target role at a time for the best results.',
          ],
          note:
            'The prompts below work best when you save your outputs in a document and build from one step to the next, rather than starting fresh every time.',
        },
        {
          heading: 'Prompt 1: Check your real match before you apply',
          paragraphs: [
            'This first prompt is powerful because it stops you from guessing. Instead of blindly applying to roles that only partly fit, you ask AI to review your existing experience against multiple job descriptions and score the match based on transferable skills.',
            'That matters most for career changers. A lot of candidates look at a job title, assume they are not qualified, and move on. In reality, they may already have the right evidence in a different setting. Organisation can become project coordination. Customer handling can become stakeholder management. Admin can become reporting, scheduling, and cross-team support.',
            'Use this prompt before rewriting your CV. It helps you choose the strongest target role, spot the skills that already overlap, and identify role titles that may suit you even better.',
          ],
          bullets: [
            'Best for: career changers, people applying across multiple related roles, and job seekers unsure where they fit best.',
            'Expected output: match scores, transferable skills, adjacent job titles, and practical next steps.',
            'Why it helps: it gives your job search direction before you start editing your CV.',
          ],
          promptLabel: 'Prompt 1',
          promptText:
            'Act as a career transition specialist. I have this current work experience: [PASTE YOUR CV BULLETS]. Here are 3 job descriptions I am interested in: [PASTE JOB DESCRIPTIONS].\nFor each job:\nGive me a Match Score out of 100 based on transferable skills\nList the TOP 5 skills from the job description that already exist in my experience (even if phrased differently)\nSuggest 3 specific roles/titles at similar level that would be even better matches\nList 3 action steps showing how my current experience proves I can do this job\nBe brutally honest but focus on real transferable skills like organisation, stakeholder management, problem-solving, team coordination, reporting, working under pressure.',
        },
        {
          heading: 'Prompt 2: Rewrite your best bullet points using the XYZ formula',
          paragraphs: [
            'Once you know which role you are targeting, the next step is to rewrite your bullet points so they sound outcome-focused and ATS-friendly. The XYZ formula works well because it forces clarity: what you accomplished, how it was measured, and what you did to make it happen.',
            'Most CV bullet points are too soft. They say someone supported a team, managed admin, or helped customers, but they do not show impact. This prompt helps you keep the truth while making the result more credible and more compelling.',
            'It is also helpful because it encourages keyword usage without turning your CV into a copy-and-paste of the job description. That balance matters if you want to satisfy both ATS software and human recruiters.',
          ],
          bullets: [
            'Best for: improving weak CV bullets fast.',
            'Expected output: stronger action-led bullets that reflect your real work.',
            'Why it helps: it turns generic tasks into evidence of performance.',
          ],
          promptLabel: 'Prompt 2',
          promptText:
            'Act as an elite CV writer specialising in career transitions. Here are my current CV bullet points: [PASTE BULLETS]. I am applying for this role: [PASTE JOB DESCRIPTION]. Rewrite each bullet using the XYZ formula: Accomplished X as measured by Y by doing Z. Naturally include these keywords from the job description: [PASTE TOP 5 KEYWORDS FROM YOUR DAY 2 MATCH]. Do not invent experience. Reframe what I genuinely did in the most impactful and ATS-friendly way. For any bullet where a metric is unclear, suggest a realistic estimate I can verify and adjust.',
        },
        {
          heading: 'Prompt 3: Upgrade your full experience section, not just one role',
          paragraphs: [
            'A common mistake is improving one recent role and leaving the rest of the CV weak. Recruiters do not read in isolation. They scan the whole document to see whether your career story holds together. That is why your full experience section needs consistency.',
            'This prompt expands the previous step by applying the same logic to every role on your CV. It is especially useful when your older jobs still contain proof of planning, communication, reporting, or leadership, but the wording is too passive to help you.',
            'The truthfulness instruction is important here. If the AI assumes a number or scale, it should flag that assumption for you to verify. That protects you from accidentally submitting inflated claims.',
          ],
          bullets: [
            'Best for: full CV rewrites before applying to several similar roles.',
            'Expected output: consistent, impact-led bullet points across your whole career history.',
            'Why it helps: it makes your CV feel coherent instead of patched together.',
          ],
          promptLabel: 'Prompt 3',
          promptText:
            'Now I am going to share my complete work history below. For each role, rewrite all bullet points using the XYZ formula. Prioritise impact, metrics, and these keywords: [PASTE YOUR KEYWORD LIST FROM DAY 2]. Maintain truthfulness throughout. Flag any bullet where you have assumed a metric so I can verify it before submitting.',
        },
        {
          heading: 'Prompt 4: Fix formatting problems that can break ATS parsing',
          paragraphs: [
            'Even a well-written CV can fail if the layout is too fancy. Tables, text boxes, graphics, icons, sidebars, unusual fonts, and photo-heavy templates can all confuse Applicant Tracking Systems. If the system cannot read your content cleanly, your keywords and experience may never reach the recruiter properly.',
            'This prompt is practical because it asks the AI to act like an ATS formatting reviewer. Instead of only improving language, it checks the structure itself and points out where data might be lost or scrambled.',
            'For many job seekers, this is the missing piece. They assume they are being rejected because of experience, when the real problem is that their CV template is hard for software to parse correctly.',
          ],
          bullets: [
            'Best for: people using Canva templates, columns, sidebars, icons, or decorative formatting.',
            'Expected output: a simplified single-column layout and a list of risky formatting choices.',
            'Why it helps: it protects your CV from being unreadable to screening software.',
          ],
          promptLabel: 'Prompt 4',
          promptText:
            'I need you to act as an Applicant Tracking System (ATS) parsing specialist. I will paste the text and describe the layout of my CV. Your job is to:\nIdentify anything in my CV that could break ATS parsing (tables, columns, headers/footers, text boxes, icons, unusual fonts, graphics).\nTell me what data might be lost or scrambled (contact details, dates, job titles, bullet points).\nRecommend a clean, ATS-friendly structure and formatting, including: font types, font sizes, headings, bullet styles, date format and file type.\nRewrite my CV layout into a simple, single-column text version that preserves all content but removes risky formatting, ready for me to copy into Word/Google Docs.\nBe specific when you describe your layout. For example: Two columns, photo in top left, contact details in a coloured bar at the side, skills in a table, dates aligned on the right in a separate column.',
        },
        {
          heading: 'Prompt 5: Test what an ATS would actually detect in your CV',
          paragraphs: [
            'Prompt 4 focuses on layout risk. Prompt 5 goes one step further by asking AI to behave like a parser and tell you what information it can actually detect. This gives you a reality check before you submit your application.',
            'You can use it to see whether your section headings are clear, whether important keywords from the job description are visible in the text, and whether there are any structural issues that might reduce your chances of making it through screening.',
            'This prompt is especially useful if you have rewritten your CV and want a final ATS confidence check before applying.',
          ],
          bullets: [
            'Best for: final checks before you submit a CV.',
            'Expected output: parsing feedback, keyword visibility, and structural warnings.',
            'Why it helps: it shows you what the software is likely to see, not what you hope it sees.',
          ],
          promptLabel: 'Prompt 5',
          promptText:
            'Act as an ATS parser. Here is my CV text. Tell me:\nHow you would detect my name, contact details, job titles, companies and dates.\nWhether my section headings are clear enough (PROFILE, SKILLS, EXPERIENCE, EDUCATION).\nWhich keywords from this target job description [PASTE JD] you can see in my CV text.\nAny technical issues that might cause parsing errors.',
        },
        {
          heading: 'Prompt 6: Decode the job description like a hiring manager',
          paragraphs: [
            'One of the biggest reasons applications fail is that the candidate never really understood the job description. They read it quickly, pull out a few obvious phrases, and miss the deeper themes that shape the hiring decision.',
            'This prompt helps you slow down and read the role properly. It asks AI to list the core responsibilities in plain language, identify the most important keywords, group them into themes, and explain what kind of person the employer is really looking for.',
            'That last part is key. Great job applications do not just mirror keywords. They show that you understand the shape of the role and can present yourself accordingly.',
          ],
          bullets: [
            'Best for: understanding what the employer actually values before tailoring your CV.',
            'Expected output: plain-language responsibilities, keywords, themes, and a recruiter-style summary.',
            'Why it helps: it gives you a clearer targeting strategy.',
          ],
          promptLabel: 'Prompt 6',
          promptText:
            'I am applying for this job role attached here:\nAct as a hiring manager for this role and:\nList the top 10 responsibilities in plain language.\nList the top 10 skills/keywords that appear most often or seem most important.\nGroup these into 3-4 themes (for example: Coordination and Scheduling, Stakeholder Communication, Reporting and Administration, Problem-solving and Initiative).\nTell me, in 3-4 sentences, what kind of person they are really looking for.',
        },
        {
          heading: 'Prompt 7: Pull out the strongest proof from your experience',
          paragraphs: [
            'Now that you know the themes of the role, you need evidence. This prompt connects the employer themes to your actual experience. Instead of writing in broad claims, you make each theme visible through the strongest bullet points and roles you already have.',
            'This is where many career changers gain confidence. They discover that they do not need identical job titles to prove fit. They need strong evidence tied to the right themes. If the role values coordination, reporting, and stakeholder communication, the question becomes: where have you already done that, even under a different title?',
            'It also helps identify gaps. If one theme from the job description has weak evidence in your CV, you can address that in your profile, cover letter, or interview preparation.',
          ],
          bullets: [
            'Best for: mapping job-description themes to real evidence in your CV.',
            'Expected output: strongest proof points, the best bullets to emphasise, and visible gaps.',
            'Why it helps: it turns vague suitability into specific proof.',
          ],
          promptLabel: 'Prompt 7',
          promptText:
            'Now here is my Experience section from my CV, attached here:\nAct as a career transition coach. For each of the themes you listed (for example Coordination, Stakeholder Communication, Reporting, Problem-solving):\nPull out the strongest evidence from my Experience that proves I can do this.\nSuggest which job and which bullet point I should emphasise for each theme.\nTell me if there are any themes from the job description that my CV does NOT currently support well.',
        },
        {
          heading: 'Prompt 8: Build the final tailored CV for the exact role',
          paragraphs: [
            'This is the final assembly prompt. By the time you use it, you should already know your match score, strongest keywords, strongest evidence, formatting risks, and role themes. That means the AI has context, and your final output is far more likely to be strong.',
            'This prompt is powerful because it brings everything together into a focused, single-column, ATS-friendly CV. It also forces the profile and key-skills section to reflect the job description and the evidence in your experience, rather than generic claims.',
            'Do not skip the earlier prompts and jump straight here. If you do, the CV will usually be weaker. This prompt works best when it is the last step, not the first.',
          ],
          bullets: [
            'Best for: creating the final role-specific CV version you will actually submit.',
            'Expected output: a complete tailored CV in clean ATS-friendly format.',
            'Why it helps: it combines strategy, keywords, evidence, and structure in one final draft.',
          ],
          promptLabel: 'Prompt 8',
          promptText:
            'Using the job description and my Experience above, create a tailored CV for this specific role.\nRules:\nUse an ATS-friendly single-column format.\nSections: Name + Contact, Profile, Key Skills, Experience, Education, Certifications (if relevant).\nIn the Profile, summarise me in 3-4 lines as a career-changer into Project Coordinator using the themes from the job description.\nIn Key Skills, list 8-12 skills/keywords that match the job description and are genuinely supported by my Experience.\nIn Experience, rewrite my bullet points using the XYZ formula (accomplished X, as measured by Y, by doing Z), prioritising evidence that proves I can do this specific role.\nDo NOT invent new experience. Only reframe what I have done.\nUse a simple, readable date format and clear role/company headings.',
        },
        {
          heading: 'The smartest order to use these eight prompts',
          paragraphs: [
            'If you want the strongest result, do not use these prompts randomly. Treat them as a workflow. Start with job-match analysis, then move into bullet rewriting, then full experience optimisation, then formatting and ATS checks, then job-description analysis, then evidence mapping, and finally the tailored CV build.',
            'That order works because each step improves the quality of the next one. By the time you reach the final prompt, the AI has a stronger understanding of your target role, your supporting evidence, your keywords, and your formatting needs.',
          ],
          bullets: [
            'Use Prompt 1 to choose the right role and identify transferable skills.',
            'Use Prompts 2 and 3 to rewrite your bullet points truthfully and strategically.',
            'Use Prompts 4 and 5 to make sure your CV is ATS-safe and readable.',
            'Use Prompts 6 and 7 to connect the job description directly to your evidence.',
            'Use Prompt 8 to produce the final tailored version for submission.',
          ],
        },
        {
          heading: 'Common mistakes job seekers make when using AI prompts',
          paragraphs: [
            'The first mistake is copying outputs without checking them. AI can make your CV look more professional, but it can also introduce vague claims, over-polished language, or made-up metrics if you are not paying attention.',
            'The second mistake is using one generic prompt for every application. Strong applications are role-specific. The best outputs come when you give AI a real job description, your actual experience, and clear instructions about truthfulness and ATS formatting.',
            'The third mistake is focusing only on wording. Better phrasing helps, but job search success also depends on targeting the right roles, understanding what employers care about, and using evidence that maps clearly to the job.',
          ],
          bullets: [
            'Do not let AI invent achievements or qualifications.',
            'Do not keyword-stuff your CV until it sounds unnatural.',
            'Do not apply the same tailored CV to ten very different roles.',
            'Do not ignore formatting and ATS structure.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Can I use these prompts in ChatGPT for free?',
          answer:
            'Yes, you can use these prompts in free and paid AI tools, although paid tools often handle longer CVs and longer job descriptions more reliably. The quality of your inputs still matters more than the tool itself.',
        },
        {
          question: 'Will recruiters know if I used AI on my CV?',
          answer:
            'Recruiters are more likely to notice poor AI use than good AI use. If your CV is truthful, specific, relevant, and written in a natural voice, AI can help improve it without making it feel fake.',
        },
        {
          question: 'Should I use all eight prompts for every job application?',
          answer:
            'Not always. If you already have a strong ATS-friendly base CV, you may use only the job-description analysis, evidence mapping, and final tailored CV prompts. But if you are career changing or rebuilding your CV from scratch, using all eight in sequence is usually worth it.',
        },
        {
          question: 'What if I do not have metrics for my CV bullet points?',
          answer:
            'Use the AI to suggest realistic places where a metric might exist, then verify it yourself. If you cannot verify it, do not include it. Strong wording with honest evidence is better than inflated numbers.',
        },
        {
          question: 'Are these prompts only for project coordinator roles?',
          answer:
            'No. One example prompt mentions Project Coordinator, but the workflow applies to many roles. You can swap in the real job title and job description you are targeting and use the same process.',
        },
      ],
      ctaTitle: 'Want help applying these prompts to your own CV?',
      ctaText:
        'If you want practical support tailoring your CV, improving your ATS chances, or using AI more confidently in your job search, book a free 15-minute AI assessment or explore our AI job-focused training.',
      ctaPrimaryLabel: 'Book Free Assessment',
      ctaPrimaryHref: '/#contact',
      ctaSecondaryLabel: 'Browse Courses',
      ctaSecondaryHref: '/#courses',
    },
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
