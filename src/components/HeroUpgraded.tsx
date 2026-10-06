export function HeroUpgraded() {
  return (
    <section id="home" className="editorial-hero section-wrapper">
      <div className="editorial-hero-grid">
        <div>
          <p className="eyebrow">Newcastle based · Corporate AI training across the UK</p>
          <h1 aria-label="Your team has Copilot. Make it earn its keep."><DancingLetters text="Your team has Copilot." />{' '}<DancingLetters text="Make it earn its keep." className="hero-heading-accent" /></h1>
          <p className="hero-intro">Microsoft 365 Copilot training for UK organisations, taught on your own work rather than on demo data. Teams leave able to build their own agents, ground answers in their own documents and hand the repeat work to a schedule. Workshops from £995, no VAT added.</p>
          <div className="hero-actions">
            <a className="btn-primary" href="https://cal.com/eric-nwankwo/ai-discovery-call" target="_blank" rel="noopener noreferrer" data-conversion-placement="Home hero: discovery call">Book a free discovery call <span aria-hidden="true">↗</span></a>
            <a className="hero-text-link" href="/corporate-ai-training-uk/">Corporate training <span aria-hidden="true">→</span></a>
            <a className="hero-text-link" href="/pricing/#individual-training">Training for individuals <span aria-hidden="true">→</span></a>
          </div>
          <p className="hero-delivery">Microsoft 365 Copilot · ChatGPT · Claude<br /><span>In person across the North East, live online anywhere in the UK.</span></p>
        </div>
        <div className="hero-person">
          <div className="portrait-depth" aria-hidden="true" />
          <figure>
            <img src="/profile-clean-v2.webp" alt="Eric Nwankwo, founder and AI trainer" width="1254" height="1254" fetchPriority="high" />
            <figcaption><strong>Eric Nwankwo</strong><span>Your trainer. From first question to practical application.</span></figcaption>
          </figure>
          <a className="hero-fieldnote" href="#workshop-in-practice"><span className="eyebrow">From the training room</span><strong>Putting Microsoft 365 Copilot to work</strong><span>Explore a delivered workshop <span aria-hidden="true">↗</span></span></a>
        </div>
      </div>
      <div className="hero-principles"><span>Clear teaching</span><span>Role-specific exercises</span><span>Human judgement throughout</span><a href="https://www.google.com/search?q=AI+Vision+Consulting+Newcastle" target="_blank" rel="noopener noreferrer">Read Google reviews ↗</a></div>
    </section>
  );
}
import DancingLetters from './ui/dancing-letters';
