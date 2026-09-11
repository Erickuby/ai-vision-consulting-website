import { caseStudies, caseStudyReady } from '../data/caseStudies';

export function CaseStudies() {
  return <section className="seo-content-section" aria-labelledby="measured-case-studies"><div className="seo-container seo-article-copy">
    <h2 id="measured-case-studies">Measured case studies</h2>
    <p>These three entries are being prepared. Client details, timings and quotations will appear only after the evidence and permission to publish have been confirmed.</p>
    {caseStudies.map((study, index) => <article key={study.id} className="case-study-card">
      <h3>{caseStudyReady(study) ? `${study.sector}: ${study.task}` : `Case study ${index + 1}: awaiting verified details`}</h3>
      {caseStudyReady(study) ? <>
        <p>Sector: {study.sector} | Size: {study.organisationSize} | Delivered: {study.delivered}</p>
        <h4>The problem</h4>{study.problem.map(text => <p key={text}>{text}</p>)}
        <h4>What we did</h4>{study.work.map(text => <p key={text}>{text}</p>)}
        <h4>Measured result</h4><p>{study.task} went from {study.beforeMinutes} minutes to {study.afterMinutes} minutes, across {study.peopleTrained} people doing it {study.frequency}. That is approximately {study.monthlyHoursReturned} hours a month returned to the team.</p><p>Measurement: {study.measurementMethod}</p>
        <h4>What did not work</h4><p>{study.whatDidNotWork}</p>
        <h4>In their words</h4><blockquote>{study.quote}</blockquote>
      </> : <dl>
        <dt>Sector, organisation size and delivery date</dt><dd>Awaiting client details.</dd>
        <dt>The problem</dt><dd>Awaiting a two-sentence account of the original task and difficulty.</dd>
        <dt>What we did</dt><dd>Awaiting a three-sentence account of the work delivered.</dd>
        <dt>Measured result</dt><dd>Awaiting the task, before and after times, number of people trained, task frequency, monthly hours returned and measurement method.</dd>
        <dt>What did not work</dt><dd>Awaiting one honest limitation from the engagement.</dd>
        <dt>In their words</dt><dd>Awaiting a client quotation and permission to publish.</dd>
      </dl>}
    </article>)}
  </div></section>;
}
