import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag, Mail } from 'lucide-react';
import { Reveal } from './Reveal';
import { blogPosts, getBlogPostHref, isLiveBlogPost, type BlogPost } from '../data/blog';
import { shouldHandleClientNavigation } from '../lib/navigation';
import { submitWebsiteLead, trackConversion } from '../lib/leadCapture';

function localAssetPath(url: string) {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function ArticleCard({ article, index }: { article: BlogPost; index: number }) {
  const isLive = isLiveBlogPost(article);
  const articleHref = isLive ? getBlogPostHref(article) : '#contact';

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Live posts are standalone, prerendered documents rather than React routes.
    // Let the browser load them normally instead of routing the SPA to a 404.
    if (isLive || !shouldHandleClientNavigation(event)) {
      return;
    }

    event.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Reveal delay={index * 0.1}>
      <motion.article
        whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.35)', boxShadow: '0 12px 40px rgba(0,212,255,0.08)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="blog-card"
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16 / 9', background: '#07101c' }}>
          <motion.img
            src={localAssetPath(article.image)}
            alt={article.imageAlt}
            width={1600}
            height={900}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            loading="lazy"
            decoding="async"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 50%, rgba(5,13,26,0.9) 100%)',
            }}
          />

          {article.comingSoon && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                padding: '6px 12px',
                background: 'rgba(5, 13, 26, 0.8)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${article.categoryColor}40`,
                color: '#F0F4FF',
                borderRadius: '100px',
                fontSize: '11px',
                fontWeight: 600,
                fontFamily: 'Space Grotesk',
                letterSpacing: '0.05em',
              }}
            >
              Coming Soon
            </div>
          )}
        </div>

        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontFamily: 'Space Grotesk', fontSize: '12px', fontWeight: 700, color: article.categoryColor }}>
              <Tag size={11} /> {article.category}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'Plus Jakarta Sans',
                fontSize: '12px',
                color: '#8899AA',
              }}
            >
              <Clock size={11} /> {article.readTime}
            </span>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', color: '#8899AA' }}>{article.date}</span>
          </div>

          <h3
            style={{
              fontFamily: 'Space Grotesk',
              fontSize: '17px',
              fontWeight: 700,
              color: '#F0F4FF',
              marginBottom: '10px',
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
            }}
          >
            {article.title}
          </h3>

          <p
            style={{
              fontFamily: 'Plus Jakarta Sans',
              fontSize: '13.5px',
              color: '#8899AA',
              lineHeight: 1.7,
              marginBottom: '20px',
              flex: 1,
            }}
          >
            {article.excerpt}
          </p>

          <motion.a
            whileHover={{ x: 4 }}
            href={articleHref}
            onClick={handleClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'Space Grotesk',
              fontSize: '13px',
              fontWeight: 600,
              color: '#00D4FF',
              textDecoration: 'none',
            }}
          >
            {isLive ? 'Read Article' : 'Get Notified'} <ArrowRight size={13} />
          </motion.a>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function Blog() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleNewsletterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || newsletterLoading) return;
    setNewsletterLoading(true);
    setNewsletterError('');
    try {
      await submitWebsiteLead({
        lead_type: 'newsletter',
        email: email.trim(),
        source: 'Resources newsletter signup',
      });
      trackConversion('Newsletter Signup', { placement: 'resources' });
      setSubmitted(true);
      setEmail('');
    } catch {
      setNewsletterError('Could not subscribe right now. Please try again.');
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <section id="blog" className="section-wrapper" style={{ padding: '100px 24px', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0,30,60,0.5) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '56px',
          }}
        >
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-block' }}>
              Resources & Insights
            </span>
            <h2
              style={{
                fontFamily: 'Space Grotesk',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 700,
                color: '#F0F4FF',
                letterSpacing: '-0.02em',
                marginBottom: '12px',
              }}
            >
              Practical AI, <span className="gradient-text-cyan">clearly explained.</span>
            </h2>
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '16px', color: '#8899AA', maxWidth: '420px' }}>
              Practical guides and tools you can use today, written in plain English for real people.
            </p>
          </div>

          <div
            style={{
              background: 'rgba(10,20,40,0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,212,255,0.15)',
              borderRadius: '16px',
              padding: '24px',
              minWidth: '280px',
              maxWidth: '320px',
              flex: '1',
            }}
          >
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
                Thanks, you're in.
              </motion.p>
            ) : (
              <div>
                <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Your email"
                    required
                    className="form-input"
                    style={{ flex: 1, fontSize: '13px', padding: '10px 12px' }}
                    aria-label="Email for newsletter"
                  />
                  <motion.button
                    whileHover={{ scale: newsletterLoading ? 1 : 1.05 }}
                    whileTap={{ scale: newsletterLoading ? 1 : 0.95 }}
                    type="submit"
                    disabled={newsletterLoading}
                    className="btn-primary"
                    style={{ padding: '10px 14px', fontSize: '13px', flexShrink: 0, opacity: newsletterLoading ? 0.65 : 1 }}
                  >
                    {newsletterLoading ? 'Joining…' : 'Join'}
                  </motion.button>
                </form>
                {newsletterError && (
                  <p role="alert" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', color: '#FF6B6B', marginTop: '8px' }}>
                    {newsletterError}
                  </p>
                )}
              </div>
            )}
          </div>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {[...blogPosts]
            .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
            .map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
}
