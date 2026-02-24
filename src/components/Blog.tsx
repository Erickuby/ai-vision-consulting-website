import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag, Mail } from 'lucide-react';
import { Reveal } from './Reveal';

const articles = [
  {
    title: 'How AI Got Me My Dream Job in 6 Weeks',
    excerpt: "Marcus had never written a prompt in his life. Eight weeks after joining our AI Job Hunting course, he had a £38k offer on the table. Here's exactly how he used AI to transform his job search.",
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=480&h=260&fit=crop',
    category: 'Success Story',
    categoryColor: '#00D4FF',
    readTime: '5 min read',
    date: '12 Jan 2026',
  },
  {
    title: '5 AI Prompts Every Jobseeker Needs Right Now',
    excerpt: "Stop submitting generic CVs. These five prompts will help you tailor your application, write a punchy cover letter, prepare for competency interviews, and negotiate a better salary — all in under an hour.",
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=480&h=260&fit=crop',
    category: 'Practical Guide',
    categoryColor: '#FFD700',
    readTime: '4 min read',
    date: '3 Feb 2026',
  },
  {
    title: 'Start Your AI Side Hustle in 30 Days',
    excerpt: "You don't need a degree in computer science. You need a process, a niche, and a few paying clients. This is the exact roadmap our students use to go from zero to their first £1,000 in consulting fees.",
    image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=480&h=260&fit=crop',
    category: 'Business',
    categoryColor: '#00FF88',
    readTime: '7 min read',
    date: '18 Feb 2026',
  },
  {
    title: 'AI for Small Business: Where to Start in 2026',
    excerpt: "Most small business owners are overwhelmed by AI hype. Here's a no-nonsense breakdown of the tools that actually save time, what they cost, and how to implement them without a technical team.",
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=480&h=260&fit=crop',
    category: 'Business',
    categoryColor: '#00FF88',
    readTime: '6 min read',
    date: '5 Mar 2026',
  },
];

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  return (
    <Reveal delay={index * 0.1}>
      <motion.article
        whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.35)', boxShadow: '0 12px 40px rgba(0,212,255,0.08)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="blog-card"
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={article.image}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(5,13,26,0.9) 100%)' }} />
          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '4px 10px',
              background: article.categoryColor + '20',
              border: `1px solid ${article.categoryColor}40`,
              color: article.categoryColor,
              borderRadius: '100px', fontSize: '11px', fontWeight: 700,
              fontFamily: 'Space Grotesk', letterSpacing: '0.05em'
            }}>
              <Tag size={10} />
              {article.category}
            </span>
          </div>
        </div>

        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Plus Jakarta Sans', fontSize: '12px', color: '#5A6A7A' }}>
              <Clock size={11} /> {article.readTime}
            </span>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', color: '#5A6A7A' }}>{article.date}</span>
          </div>

          <h3 style={{
            fontFamily: 'Space Grotesk', fontSize: '17px', fontWeight: 700,
            color: '#F0F4FF', marginBottom: '10px', letterSpacing: '-0.01em', lineHeight: 1.3
          }}>
            {article.title}
          </h3>

          <p style={{
            fontFamily: 'Plus Jakarta Sans', fontSize: '13.5px', color: '#8899AA',
            lineHeight: 1.7, marginBottom: '20px', flex: 1
          }}>
            {article.excerpt}
          </p>

          <motion.a
            whileHover={{ x: 4 }}
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: 600,
              color: '#00D4FF', textDecoration: 'none',
            }}
          >
            Read Article <ArrowRight size={13} />
          </motion.a>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function Blog() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <section id="blog" className="section-wrapper" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(0,30,60,0.5) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <Reveal style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '56px' }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-block' }}>Resources & Insights</span>
            <h2 style={{
              fontFamily: 'Space Grotesk', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700, color: '#F0F4FF', letterSpacing: '-0.02em', marginBottom: '12px'
            }}>
              Practical AI. <span className="gradient-text-cyan">No hype.</span>
            </h2>
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '16px', color: '#8899AA', maxWidth: '420px' }}>
              Real guides, success stories, and tools you can use today — written for humans, not AI researchers.
            </p>
          </div>

          {/* Newsletter */}
          <div style={{
            background: 'rgba(10,20,40,0.7)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,212,255,0.15)',
            borderRadius: '16px', padding: '24px', minWidth: '280px', maxWidth: '320px', flex: '1',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Mail size={16} color="#00D4FF" />
              <span style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 700, color: '#F0F4FF' }}>
                Weekly AI Tips
              </span>
            </div>
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12.5px', color: '#8899AA', marginBottom: '14px' }}>
              Free practical AI tips for jobseekers and business owners. No spam.
            </p>
            {submitted ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px', color: '#00D4FF', fontWeight: 600 }}
              >
                ✓ You're in! Check your inbox.
              </motion.p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="form-input"
                  style={{ flex: 1, fontSize: '13px', padding: '10px 12px' }}
                  aria-label="Email for newsletter"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '10px 14px', fontSize: '13px', flexShrink: 0 }}
                  aria-label="Subscribe to newsletter"
                >
                  Join
                </motion.button>
              </form>
            )}
          </div>
        </Reveal>

        {/* Articles Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {articles.map((article, i) => (
            <ArticleCard key={article.title} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
