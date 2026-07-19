import { ArrowRight, Calendar } from 'lucide-react';
import type { SiteRoute } from '../data/routes';
import { Contact } from './Contact';

const serviceLinks = [
  ['/ai-training-newcastle/', 'AI training Newcastle'],
  ['/ai-automation-consultant-newcastle/', 'AI automation consulting'],
  ['/corporate-ai-training-uk/', 'Corporate AI training'],
  ['/small-business-ai-automation/', 'Small-business automation'],
  ['/community-employability-ai-training/', 'Community AI training'],
] as const;

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="seo-breadcrumbs">
      <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">{current}</span>
    </nav>
  );
}

export function SeoLandingPage({ route }: { route: SiteRoute }) {
  const showContact = route.kind === 'contact';

  return (
    <main id="main-content" className="seo-page">
      <section className="seo-hero">
        <div className="seo-container">
          <Breadcrumbs current={route.h1} />
          <span className="badge badge-cyan">{route.eyebrow}</span>
          <h1>{route.h1}</h1>
          <p className="seo-lead">{route.intro}</p>
          <div className="seo-actions">
            <a className="btn-primary" href={showContact ? 'https://cal.com/eric-nwankwo/ai-discovery-call' : '/contact/'} target={showContact ? '_blank' : undefined} rel={showContact ? 'noopener noreferrer' : undefined}>
              {showContact ? <Calendar size={16} /> : null}{showContact ? 'Book on Cal.com' : 'Discuss your requirement'}
              {!showContact ? <ArrowRight size={16} /> : null}
            </a>
            {route.path !== '/pricing/' && <a className="btn-secondary" href="/pricing/">View pricing</a>}
          </div>
        </div>
      </section>

      {route.sections.map((section, index) => (
        <section className="seo-content-section" key={section.heading}>
          <div className="seo-container seo-copy-card">
            <span className="seo-section-number">0{index + 1}</span>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </div>
        </section>
      ))}

      {route.faqs && route.faqs.length > 0 && (
        <section className="seo-content-section" aria-labelledby="faq-heading">
          <div className="seo-container">
            <h2 id="faq-heading">Frequently asked questions</h2>
            <div className="seo-faqs">
              {route.faqs.map((item) => (
                <details key={item.question} open><summary>{item.question}</summary><p>{item.answer}</p></details>
              ))}
            </div>
          </div>
        </section>
      )}

      {showContact && <Contact source="Contact page form" />}

      <section className="seo-content-section" aria-labelledby="explore-heading">
        <div className="seo-container seo-link-panel">
          <h2 id="explore-heading">Explore practical AI support</h2>
          <div className="seo-link-grid">
            {serviceLinks.filter(([href]) => href !== route.path).map(([href, label]) => <a href={href} key={href}>{label}<ArrowRight size={15} /></a>)}
            <a href="/about-eric-nwankwo/">About Eric Nwankwo<ArrowRight size={15} /></a>
            <a href="/case-studies/">Engagement examples<ArrowRight size={15} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}

export function NotFoundPage() {
  return (
    <main id="main-content" className="seo-page">
      <section className="seo-hero"><div className="seo-container">
        <Breadcrumbs current="Page not found" />
        <span className="badge badge-cyan">404 error</span>
        <h1>Page not found</h1>
        <p className="seo-lead">The page may have moved or the address may be incorrect. Choose a useful destination below.</p>
        <div className="seo-actions"><a className="btn-primary" href="/">Return home</a><a className="btn-secondary" href="/contact/">Contact us</a></div>
        <div className="seo-link-grid seo-not-found-links">
          {serviceLinks.slice(0, 3).map(([href, label]) => <a href={href} key={href}>{label}<ArrowRight size={15} /></a>)}
          <a href="/pricing/">Pricing<ArrowRight size={15} /></a>
        </div>
      </div></section>
    </main>
  );
}
