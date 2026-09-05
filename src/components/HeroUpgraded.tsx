export function HeroUpgraded() {
  return (
    <section id="home" className="editorial-hero section-wrapper">
      <div className="editorial-hero-grid">
        <div>
          <p className="eyebrow">Newcastle based · Training across the UK</p>
          <h1>Practical AI skills.<br /><span>Put them to work.</span></h1>
          <p className="hero-intro">Practical AI training for teams, professionals and people taking their next career step. Clear explanations, guided practice and tools you can use with confidence.</p>
          <div className="hero-actions">
            <a className="btn-primary" href="/contact/">Discuss a workshop <span aria-hidden="true">↗</span></a>
            <a className="hero-text-link" href="/pricing/">Explore training & prices <span aria-hidden="true">→</span></a>
          </div>
          <p className="hero-delivery">Microsoft 365 Copilot · ChatGPT · Claude<br /><span>Online and in person. Built around the work you do.</span></p>
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
