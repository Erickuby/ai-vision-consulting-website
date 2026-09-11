import { fdqClient } from '../data/caseStudies';

export function WorkshopEvidence() {
  return (
    <section id="workshop-in-practice" className="workshop-evidence section-wrapper" aria-labelledby="workshop-title">
      <div className="workshop-layout">
        <div>
          <a className="client-logo" href={fdqClient.website} target="_blank" rel="noopener noreferrer"><img src={fdqClient.logo} alt={fdqClient.logoAlt} width="490" height="289" loading="lazy" /></a>
          <p className="eyebrow">Completed training · Leeds · 3 September 2026</p>
          <h2 id="workshop-title">Copilot training,<br />grounded in everyday work.</h2>
          <p>Eric delivered a 90-minute Microsoft 365 Copilot workshop for FDQ Limited (Food and Drink Qualifications), the Leeds-based awarding and end-point assessment organisation. It combined live demonstrations, practical exercises and reusable prompt resources. The focus: give the tool useful context, work from relevant sources and check what comes back.</p>
          <a href="/case-studies/" className="hero-text-link">Read the workshop overview <span aria-hidden="true">→</span></a>
        </div>
        <div className="workshop-notes">
          <p className="eyebrow">Inside the session</p>
          <ol>
            <li><span>01</span><div><h3>Start with a clear brief</h3><p>Set the task, audience, source material and expected format before asking for an output.</p></div></li>
            <li><span>02</span><div><h3>Build a repeatable approach</h3><p>Explore prompts, agents and notebooks in the context of workplace tasks.</p></div></li>
            <li><span>03</span><div><h3>Keep a person in charge</h3><p>Check accuracy, question the answer and consider whether information is safe to share.</p></div></li>
          </ol>
          <p className="workshop-note">Delivered for FDQ Limited by Eric Nwankwo, AI Vision Consulting.</p>
        </div>
      </div>
    </section>
  );
}
