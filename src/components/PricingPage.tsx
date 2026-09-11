import { VatNotice, FreeTrainingComparison } from './PricingContext';
import { consultancyOffers } from '../data/serviceOffers';
import { TrainingCatalogue } from './TrainingCatalogue';
import { ArrowRight, Calendar, Check, Users } from 'lucide-react';
import type { SiteRoute } from '../data/routes';
import {
  corporateTrainingPackages,
  individualTrainingPackages,
  privateGroupPackage,
  type TrainingPackage,
} from '../data/training';
import { Breadcrumbs } from './SeoLandingPage';
import { PageHeroArtwork } from './PageHeroArtwork';

function PriceCard({ item }: { item: TrainingPackage }) {
  return (
    <article className={`pricing-card${item.highlight ? ' pricing-card-featured' : ''}`}>
      <div className="pricing-option-summary">
      {item.badge && <span className="pricing-card-badge">{item.badge}</span>}
      <h3>{item.name}</h3>
      <p className="pricing-card-price">{item.price}</p>
      <VatNotice />
      <p className="pricing-card-format">{item.format}</p>
      </div>
      <div className="pricing-option-detail">
      <p className="pricing-card-description">{item.description}</p>
      <ul>
        {item.features.map((feature) => <li key={feature}><Check size={15} aria-hidden="true" />{feature}</li>)}
      </ul>
      <a href={item.href ?? '/contact/'} className="pricing-card-link" data-conversion-placement={`Pricing: ${item.name}`}>
        {item.href ? 'View service details' : 'Discuss this option'} <ArrowRight size={15} aria-hidden="true" />
      </a>
      </div>
    </article>
  );
}

export function PricingPage({ route }: { route: SiteRoute }) {
  return (
    <main id="main-content" className="seo-page pricing-page">
      <section className="seo-hero">
        <div className="seo-container">
          <Breadcrumbs current={route.h1} />
          <div className="page-hero-layout"><div className="page-hero-copy">
          <span className="badge badge-cyan">{route.eyebrow}</span>
          <h1>{route.h1}</h1>
          <p className="seo-lead">{route.intro}</p>
          <VatNotice full />
          <div className="seo-actions">
            <a className="btn-primary" href="#individual-training">View individual prices <ArrowRight size={16} /></a>
            <a className="btn-secondary" href="#catalogue-heading">Browse course topics</a><a className="hero-text-link" href="#team-training">Company pricing from £995, no VAT added →</a>
          </div>
          </div><PageHeroArtwork path={route.path} /></div>
        </div>
      </section>

      <section className="pricing-section" id="individual-training" aria-labelledby="individual-heading">
        <div className="seo-container">
          <div className="pricing-section-heading">
            <span className="pricing-kicker">For individuals</span>
            <h2 id="individual-heading">Personalised 1-to-1 AI training</h2>
            <p>Single sessions are £95 for a focused hour, with no VAT added. Start with a free discovery call. If you are working towards something bigger, a bundle gives you a lower rate and a personalised learning plan.</p>
          </div>
          <div className="pricing-grid pricing-grid-four">
            {individualTrainingPackages.map((item) => <PriceCard item={item} key={item.name} />)}
          </div>
          <p className="pricing-scope-note">Bundles include a personalised learning plan, session notes and a prompt library built around your own work. Sessions remain valid for twelve months from purchase. Mix individual Practical AI and Copilot topics or repeat a topic for more practice.</p>
        </div>
      </section>

      <FreeTrainingComparison />
      <TrainingCatalogue />

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
            <p>Choose Microsoft 365 Copilot, Practical AI or a mixed agenda. Single workshops and committed multi-session programmes have separate rates. These starting prices include a scoping conversation, tailored delivery and participant resources. Programmes can be delivered remotely across the UK or in person where suitable.</p>
          </div>
          <div className="pricing-grid pricing-grid-corporate">
            {corporateTrainingPackages.map((item) => <PriceCard item={item} key={item.name} />)}
          </div>
          <div className="catalogue-guidance">
            <h3>How our corporate pricing compares</h3>
            <p>We publish prices so you can compare before booking a call. Our half day starts at £1,450 and our full day at £2,450, each for up to twenty people. No VAT is added.</p>
            <p>For a specific North East comparison, <a href="https://www.theoxfordaischool.com/ai-training-north-east" target="_blank" rel="noopener noreferrer">The Oxford AI School</a> lists a half-day basics session at £1,499 + VAT virtually or £1,599 + VAT in person. Its full-day policy workshop is £2,499 + VAT virtually or £2,599 + VAT in person, for up to ten people. These are different programmes: compare the agenda, group cap, delivery format and final tax-inclusive quote, as well as the price. Checked September 2026.</p>
            <p>Every corporate quote includes a discovery call, tailored materials and a written summary of recommended next steps. Travel outside Tyne and Wear and software licences are quoted separately.</p>
          </div>
        </div>
      </section>

      <section className="pricing-section" aria-labelledby="consultancy-heading">
        <div className="seo-container">
          <div className="pricing-section-heading"><span className="pricing-kicker">Focused consultancy</span><h2 id="consultancy-heading">Agree the rules or choose the first workflow</h2><p>Start with a scoped piece of work and a practical written output.</p></div>
          <div className="pricing-grid">{consultancyOffers.map((item) => <PriceCard item={item} key={item.name} />)}</div>
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
          <p className="pricing-scope-note">Individual training packages are fixed at the published prices. Private-group and corporate figures are starting points; the final quote depends on the audience, delivery location, preparation, group size and any custom materials required. Software subscriptions, venue hire, custom tool development and travel outside Tyne and Wear are quoted separately. Community and employability programmes can be scoped around cohort needs and available funding.</p>
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
          <a className="btn-primary" href="https://cal.com/eric-nwankwo/ai-discovery-call" target="_blank" rel="noopener noreferrer" data-conversion-placement="Pricing: discovery call"><Calendar size={16} />Book a discovery call</a>
        </div>
      </section>
    </main>
  );
}
