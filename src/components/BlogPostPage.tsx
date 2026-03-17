import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock3, Tag } from 'lucide-react';
import { Reveal } from './Reveal';
import type { BlogPost } from '../data/blog';
import { navigateToPath, shouldHandleClientNavigation } from '../lib/navigation';

const siteUrl = 'https://aivisionconsulting.co.uk';

const defaultSeo = {
  title: 'AI Vision Consulting Ltd | AI Skills for Jobs, Business & Financial Freedom',
  description:
    'Newcastle-based AI training and consulting. Practical AI skills for jobseekers, small business owners, and community groups. Book your free AI assessment today.',
  keywords: 'AI training Newcastle, AI skills jobseekers, AI consulting UK, AI for small business, career change AI',
  ogTitle: 'AI Vision Consulting Ltd | AI Skills for Financial Freedom',
  ogDescription:
    'Practical AI training for jobseekers, small businesses, and communities in Newcastle and across the UK.',
  canonical: `${siteUrl}/`,
  ogType: 'website',
};

function upsertMeta(selector: string, attributes: Record<string, string>, content: string) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function upsertStructuredData(id: string, data: Record<string, unknown>) {
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.id = id;
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

function removeStructuredData(id: string) {
  document.getElementById(id)?.remove();
}

function removeMeta(selector: string) {
  document.head.querySelector(selector)?.remove();
}

function restoreDefaultSeo() {
  document.title = defaultSeo.title;
  upsertMeta('meta[name="description"]', { name: 'description' }, defaultSeo.description);
  upsertMeta('meta[name="keywords"]', { name: 'keywords' }, defaultSeo.keywords);
  upsertMeta('meta[property="og:title"]', { property: 'og:title' }, defaultSeo.ogTitle);
  upsertMeta('meta[property="og:description"]', { property: 'og:description' }, defaultSeo.ogDescription);
  upsertMeta('meta[property="og:type"]', { property: 'og:type' }, defaultSeo.ogType);
  upsertMeta('meta[property="og:url"]', { property: 'og:url' }, defaultSeo.canonical);
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, defaultSeo.ogTitle);
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, defaultSeo.ogDescription);
  upsertLink('canonical', defaultSeo.canonical);
  removeMeta('meta[property="og:image"]');
  removeMeta('meta[name="twitter:image"]');
  removeMeta('meta[property="article:published_time"]');
  removeMeta('meta[property="article:modified_time"]');
  removeStructuredData('blog-post-schema');
  removeStructuredData('blog-faq-schema');
}

function applyBlogSeo(post: BlogPost) {
  if (!post.content) {
    return restoreDefaultSeo;
  }

  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;

  document.title = post.metaTitle;
  upsertMeta('meta[name="description"]', { name: 'description' }, post.metaDescription);
  upsertMeta('meta[name="keywords"]', { name: 'keywords' }, post.keywords.join(', '));
  upsertMeta('meta[property="og:title"]', { property: 'og:title' }, post.metaTitle);
  upsertMeta('meta[property="og:description"]', { property: 'og:description' }, post.metaDescription);
  upsertMeta('meta[property="og:type"]', { property: 'og:type' }, 'article');
  upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
  upsertMeta('meta[property="og:image"]', { property: 'og:image' }, post.image);
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, post.metaTitle);
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, post.metaDescription);
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, post.image);
  upsertMeta('meta[property="article:published_time"]', { property: 'article:published_time' }, post.publishedAt);
  upsertMeta('meta[property="article:modified_time"]', { property: 'article:modified_time' }, post.updatedAt);
  upsertLink('canonical', canonicalUrl);

  upsertStructuredData('blog-post-schema', {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: [post.image],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: canonicalUrl,
    author: {
      '@type': 'Person',
      name: post.authorName,
      jobTitle: post.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Vision Consulting Ltd',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    url: canonicalUrl,
  });

  upsertStructuredData('blog-faq-schema', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.content.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  });

  return restoreDefaultSeo;
}

function MetaRow({ post }: { post: BlogPost }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '18px',
        color: '#8899AA',
        fontSize: '14px',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'Space Grotesk',
          fontWeight: 600,
          color: '#F0F4FF',
        }}
      >
        {post.authorName}
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <CalendarDays size={15} color={post.categoryColor} />
        {post.date}
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <Clock3 size={15} color={post.categoryColor} />
        {post.readTime}
      </span>
    </div>
  );
}

export function BlogPostPage({ post }: { post?: BlogPost }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (!post) {
      document.title = 'Article Not Found | AI Vision Consulting';
      return restoreDefaultSeo;
    }

    return applyBlogSeo(post);
  }, [post]);

  if (!post || !post.content) {
    return (
      <main className="section-wrapper" style={{ padding: '140px 24px 100px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div
            style={{
              background: 'rgba(10, 20, 40, 0.72)',
              border: '1px solid rgba(0,212,255,0.14)',
              borderRadius: '24px',
              padding: '40px',
              textAlign: 'center',
            }}
          >
            <span className="badge badge-cyan" style={{ marginBottom: '18px' }}>
              Resources & Insights
            </span>
            <h1
              style={{
                fontFamily: 'Space Grotesk',
                fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                marginBottom: '14px',
              }}
            >
              Article not found
            </h1>
            <p
              style={{
                maxWidth: '560px',
                margin: '0 auto 28px',
                color: '#8899AA',
                fontSize: '16px',
                lineHeight: 1.8,
              }}
            >
              This post is not live yet, but you can head back to the homepage and browse the latest AI resources and
              training options.
            </p>
            <a
              href="/#blog"
              className="btn-secondary"
              onClick={(event) => {
                if (!shouldHandleClientNavigation(event)) {
                  return;
                }
                event.preventDefault();
                navigateToPath('/#blog');
              }}
            >
              <ArrowLeft size={16} />
              Back to insights
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section-wrapper" style={{ padding: '120px 24px 100px', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '900px',
          background: 'radial-gradient(circle, rgba(0,30,60,0.22) 0%, transparent 72%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <article style={{ maxWidth: '980px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <a
            href="/#blog"
            onClick={(event) => {
              if (!shouldHandleClientNavigation(event)) {
                return;
              }
              event.preventDefault();
              navigateToPath('/#blog');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#00D4FF',
              textDecoration: 'none',
              fontFamily: 'Space Grotesk',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '24px',
            }}
          >
            <ArrowLeft size={15} />
            Back to Resources & Insights
          </a>
        </Reveal>

        <Reveal>
          <div
            style={{
              background: 'rgba(10, 20, 40, 0.72)',
              border: '1px solid rgba(0,212,255,0.14)',
              borderRadius: '28px',
              padding: 'clamp(28px, 4vw, 48px)',
              marginBottom: '32px',
            }}
          >
            <nav
              aria-label="Breadcrumb"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                color: '#5A6A7A',
                fontSize: '13px',
                marginBottom: '18px',
              }}
            >
              <a
                href="/"
                style={{ color: '#8899AA', textDecoration: 'none' }}
                onClick={(event) => {
                  if (!shouldHandleClientNavigation(event)) {
                    return;
                  }
                  event.preventDefault();
                  navigateToPath('/');
                }}
              >
                Home
              </a>
              <span>/</span>
              <a
                href="/#blog"
                style={{ color: '#8899AA', textDecoration: 'none' }}
                onClick={(event) => {
                  if (!shouldHandleClientNavigation(event)) {
                    return;
                  }
                  event.preventDefault();
                  navigateToPath('/#blog');
                }}
              >
                Resources & Insights
              </a>
              <span>/</span>
              <span style={{ color: '#F0F4FF' }}>{post.title}</span>
            </nav>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: `${post.categoryColor}18`,
                border: `1px solid ${post.categoryColor}40`,
                color: post.categoryColor,
                borderRadius: '999px',
                fontFamily: 'Space Grotesk',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                marginBottom: '18px',
              }}
            >
              <Tag size={12} />
              {post.category}
            </span>

            <h1
              style={{
                fontFamily: 'Space Grotesk',
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                lineHeight: 1.06,
                fontWeight: 700,
                letterSpacing: '-0.04em',
                maxWidth: '900px',
                marginBottom: '18px',
              }}
            >
              {post.title}
            </h1>

            <p
              style={{
                maxWidth: '760px',
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                lineHeight: 1.85,
                color: '#A8B6C8',
                marginBottom: '24px',
              }}
            >
              {post.excerpt}
            </p>

            <MetaRow post={post} />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '22px' }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '999px',
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.18)',
                    color: '#C9D8E8',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <figure
            style={{
              marginBottom: '32px',
              borderRadius: '28px',
              overflow: 'hidden',
              border: '1px solid rgba(0,212,255,0.12)',
              background: 'rgba(10, 20, 40, 0.68)',
            }}
          >
            <img
              src={post.image}
              alt={post.imageAlt}
              style={{ width: '100%', display: 'block', aspectRatio: '16 / 9', objectFit: 'cover' }}
              loading="eager"
            />
            <figcaption
              style={{
                padding: '14px 18px',
                borderTop: '1px solid rgba(0,212,255,0.08)',
                color: '#5A6A7A',
                fontSize: '13px',
              }}
            >
              Practical AI explained for beginners, job seekers, and business owners.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                background: 'rgba(10, 20, 40, 0.72)',
                border: '1px solid rgba(0,212,255,0.14)',
                borderRadius: '24px',
                padding: '28px',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Space Grotesk',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  marginBottom: '18px',
                }}
              >
                In simple terms
              </h2>
              <div style={{ display: 'grid', gap: '14px' }}>
                {post.content.introduction.map((paragraph) => (
                  <p key={paragraph} style={{ color: '#A8B6C8', lineHeight: 1.85, fontSize: '15.5px' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div
              style={{
                background: 'linear-gradient(180deg, rgba(0,212,255,0.08), rgba(10,20,40,0.72))',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: '24px',
                padding: '28px',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Space Grotesk',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  marginBottom: '18px',
                }}
              >
                Key takeaways
              </h2>
              <div style={{ display: 'grid', gap: '14px' }}>
                {post.content.keyTakeaways.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} color="#00D4FF" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <p style={{ color: '#D9E6F4', lineHeight: 1.75, fontSize: '15px' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <div style={{ display: 'grid', gap: '24px', marginBottom: '40px' }}>
          {post.content.sections.map((section) => (
            <Reveal key={section.heading}>
              <section
                style={{
                  background: 'rgba(10, 20, 40, 0.72)',
                  border: '1px solid rgba(0,212,255,0.12)',
                  borderRadius: '24px',
                  padding: 'clamp(24px, 4vw, 34px)',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'Space Grotesk',
                    fontSize: 'clamp(1.35rem, 2.5vw, 2rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    marginBottom: '18px',
                  }}
                >
                  {section.heading}
                </h2>

                <div style={{ display: 'grid', gap: '16px' }}>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} style={{ color: '#B3C0D1', fontSize: '16px', lineHeight: 1.9 }}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && (
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'grid',
                      gap: '14px',
                      marginTop: '22px',
                    }}
                  >
                    {section.bullets.map((bullet) => (
                      <li key={bullet} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span
                          style={{
                            width: '9px',
                            height: '9px',
                            borderRadius: '999px',
                            background: post.categoryColor,
                            boxShadow: `0 0 18px ${post.categoryColor}55`,
                            marginTop: '10px',
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ color: '#D9E6F4', fontSize: '15.5px', lineHeight: 1.8 }}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.promptText && (
                  <div
                    style={{
                      marginTop: '24px',
                      borderRadius: '20px',
                      border: '1px solid rgba(255,215,0,0.22)',
                      background: 'linear-gradient(180deg, rgba(255,215,0,0.09), rgba(8,16,30,0.92))',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        padding: '12px 18px',
                        borderBottom: '1px solid rgba(255,215,0,0.16)',
                        fontFamily: 'Space Grotesk',
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        color: '#FFD700',
                        textTransform: 'uppercase',
                      }}
                    >
                      {section.promptLabel ?? 'Prompt'}
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        padding: '18px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        color: '#E9F0F8',
                        fontFamily: 'Plus Jakarta Sans',
                        fontSize: '14px',
                        lineHeight: 1.85,
                      }}
                    >
                      {section.promptText}
                    </pre>
                  </div>
                )}

                {section.note && (
                  <p
                    style={{
                      marginTop: '18px',
                      padding: '14px 16px',
                      borderRadius: '16px',
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.14)',
                      color: '#D9E6F4',
                      fontSize: '14px',
                      lineHeight: 1.8,
                    }}
                  >
                    {section.note}
                  </p>
                )}
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <section
            style={{
              background: 'rgba(10, 20, 40, 0.72)',
              border: '1px solid rgba(0,212,255,0.12)',
              borderRadius: '24px',
              padding: 'clamp(24px, 4vw, 34px)',
              marginBottom: '32px',
            }}
          >
            <h2
              style={{
                fontFamily: 'Space Grotesk',
                fontSize: 'clamp(1.35rem, 2.5vw, 2rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: '18px',
              }}
            >
              Frequently asked questions about AI
            </h2>

            <div style={{ display: 'grid', gap: '16px' }}>
              {post.content.faqs.map((item) => (
                <div
                  key={item.question}
                  style={{
                    borderRadius: '18px',
                    border: '1px solid rgba(0,212,255,0.1)',
                    background: 'rgba(6, 15, 30, 0.6)',
                    padding: '20px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'Space Grotesk',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      marginBottom: '10px',
                    }}
                  >
                    {item.question}
                  </h3>
                  <p style={{ color: '#A8B6C8', lineHeight: 1.8, fontSize: '15px' }}>{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(10,20,40,0.8))',
              border: '1px solid rgba(0,212,255,0.18)',
              borderRadius: '24px',
              padding: 'clamp(24px, 4vw, 34px)',
            }}
          >
            <h2
              style={{
                fontFamily: 'Space Grotesk',
                fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                fontWeight: 700,
                marginBottom: '12px',
              }}
            >
              {post.content.ctaTitle}
            </h2>
            <p style={{ color: '#D9E6F4', lineHeight: 1.8, fontSize: '16px', maxWidth: '680px', marginBottom: '24px' }}>
              {post.content.ctaText}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <motion.a
                whileHover={{ y: -2 }}
                href={post.content.ctaPrimaryHref}
                className="btn-primary"
                onClick={(event) => {
                  if (!shouldHandleClientNavigation(event)) {
                    return;
                  }
                  event.preventDefault();
                  navigateToPath(post.content?.ctaPrimaryHref ?? '/#contact');
                }}
              >
                {post.content.ctaPrimaryLabel}
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href={post.content.ctaSecondaryHref}
                className="btn-secondary"
                onClick={(event) => {
                  if (!shouldHandleClientNavigation(event)) {
                    return;
                  }
                  event.preventDefault();
                  navigateToPath(post.content?.ctaSecondaryHref ?? '/#courses');
                }}
              >
                {post.content.ctaSecondaryLabel}
              </motion.a>
            </div>
          </section>
        </Reveal>
      </article>
    </main>
  );
}
