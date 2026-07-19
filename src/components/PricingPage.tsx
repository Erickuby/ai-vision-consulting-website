import { ArrowRight, Calendar, Check, Users } from 'lucide-react';
import type { SiteRoute } from '../data/routes';
import {
  corporateTrainingPackages,
  individualTrainingPackages,
  privateGroupPackage,
  trainingCategories,
  type TrainingPackage,
} from '../data/training';
import { Breadcrumbs } from './SeoLandingPage';

function PriceCard({ item }: { item: TrainingPackage }) {
  return (
    <article className={`pricing-card${item.highlight ? ' pricing-card-featured' : ''}`}>
      {item.badge && <span className="pricing-card-badge">{item.badge}</span>}
      <h3>{item.name}</h3>
      <p className="pricing-card-price">{item.price}</p>
      <p className="pricing-card-format">{item.format}</p>
      <p className="pricing-card-description">{item.description}</p>
      <ul>
        {item.features.map((feature) => <li key={feature}><Check size={15} aria-hidden="true" />{feature}</li>)}
      </ul>
      <a href="/contact/" className="pricing-card-link" data-conversion-placement={`Pricing — ${item.name}`}>
        Discuss this option <ArrowRight size={15} aria-hidden="true" />
      </a>
    </article>
  );
}

export function PricingPage({ route }: { route: SiteRoute }) {
  return (
    <main id="main-content" className="seo-page pricing-page">
      <section className="seo-hero">
        <div className="seo-container">
          <Breadcrumbs current={route.h1} />
          <span className="badge badge-cyan">{route.eyebrow}</span>
          <h1>{route.h1}</h1>
          <p className="seo-lead">{route.intro}</p>
          <div className="seo-actions">
            <a className="btn-primary" href="#individual-training">View individual training <ArrowRight size={16} /></a>
            <a className="btn-secondary" href="#team-training">View team pricing</a>
          </div>
        </div>
      </section>

      <section className="pricing-section" id="individual-training" aria-labelledby="individual-heading">
        <div className="seo-container">
          <div className="pricing-section-heading">
            <span className="pricing-kicker">For individuals</span>
            <h2 id="individual-heading">Personalised 1-to-1 AI training</h2>
            <p>Each session lasts 90 minutes and is tailored to a practical goal. Choose one topic or combine several into a structured learning plan.</p>
          </div>
          <div className="pricing-grid pricing-grid-four">
            {individualTrainingPackages.map((item) => <PriceCard item={item} key={item.name} />)}
          </div>
        </div>
      </section>

      <section className="pricing-section pricing-section-tonal" aria-labelledby="catalogue-heading">
        <div className="seo-container">
          <div className="pricing-section-heading">
            <span className="pricing-kicker">Twelve practical sessions</span>
            <h2 id="catalogue-heading">Build a programme around what you need</h2>
            <p>Sessions are selected after a short goal check. The plan can start with foundations, focus on a specific tool or connect several skills into one practical workflow.</p>
          </div>
          <div className="training-category-grid">
            {trainingCategories.map((category) => (
              <article className="training-category" key={category.title}>
                <h3>{category.title}</h3>
                <p>{category.strapline}</p>
                <ol>
                  {category.sessions.map((session) => (
                    <li key={session.number}>
                      <span className="training-session-number">{String(session.number).padStart(2, '0')}</span>
                      <div><h4>{session.title}</h4><p>{session.description}</p></div>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-section" aria-labelledby="private-group-heading">
        <div className="seo-container private-group-layout">
          <div className="pricing-section-heading">
            <span className="pricing-kicker">For small groups</span>
            <h2 id="private-group-heading">Learn together without buying a corporate programme</h2>
            <p>This option suits a small group working towards one shared outcome. It uses a topic from the catalogue with light tailoring rather than a full organisational discovery process.</p>
          </div>
          <PriceCard item={privateGroupPackage} />
        </div>
      </section>

      <section className="pricing-section pricing-section-tonal" id="team-training" aria-labelledby="team-heading">
        <div className="seo-container">
          <div className="pricing-section-heading pricing-heading-split">
            <div>
              <span className="pricing-kicker">For organisations</span>
              <h2 id="team-heading">Corporate and team AI training</h2>
            </div>
            <p>These starting prices include a scoping conversation, tailored delivery and participant resources. Programmes can be delivered remotely across the UK or in person where suitable.</p>
          </div>
          <div className="pricing-grid pricing-grid-corporate">
            {corporateTrainingPackages.map((item) => <PriceCard item={item} key={item.name} />)}
          </div>
        </div>
      </section>

      <section className="pricing-section" aria-labelledby="included-heading">
        <div className="seo-container pricing-scope-panel">
          <div>
            <span className="pricing-kicker">Clear scope</span>
            <h2 id="included-heading">What the published prices include</h2>
          </div>
          <div className="pricing-scope-grid">
            <div><Check size={18} /><span>Pre-session or pre-programme scoping</span></div>
            <div><Check size={18} /><span>Training tailored to agreed goals and confidence levels</span></div>
            <div><Check size={18} /><span>Live demonstrations and guided practice</span></div>
            <div><Check size={18} /><span>Relevant slides, prompts, exercises or action notes</span></div>
          </div>
          <p className="pricing-scope-note">Individual training packages are fixed at the published prices. Private-group and corporate figures are starting points; the final quote depends on the audience, delivery location, preparation, group size and any custom materials required. Software subscriptions, venue hire, custom tool development and travel beyond Newcastle are quoted separately. Community and employability programmes can be scoped around cohort needs and available funding.</p>
        </div>
      </section>

      {route.faqs && route.faqs.length > 0 && (
        <section className="seo-content-section" aria-labelledby="faq-heading">
          <div className="seo-container">
            <h2 id="faq-heading">Pricing questions</h2>
            <div className="seo-faqs">
              {route.faqs.map((item) => <details key={item.question} open><summary>{item.question}</summary><p>{item.answer}</p></details>)}
            </div>
          </div>
        </section>
      )}

      <section className="pricing-cta" aria-labelledby="pricing-cta-heading">
        <div className="seo-container pricing-cta-inner">
          <Users size={28} aria-hidden="true" />
          <div><span className="pricing-kicker">Not sure where to start?</span><h2 id="pricing-cta-heading">Choose the outcome before the package</h2><p>Explain who the training is for and what you want people to do differently afterwards. We will recommend the smallest useful option.</p></div>
          <a className="btn-primary" href="https://cal.com/eric-nwankwo/ai-discovery-call" target="_blank" rel="noopener noreferrer" data-conversion-placement="Pricing — discovery call"><Calendar size={16} />Book a discovery call</a>
        </div>
      </section>
    </main>
  );
}
