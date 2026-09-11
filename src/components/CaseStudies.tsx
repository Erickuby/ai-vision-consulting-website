import { caseStudies } from '../data/caseStudies';

export function CaseStudies() {
  return <section className="seo-content-section" aria-labelledby="completed-training"><div className="seo-container seo-article-copy">
    <h2 id="completed-training">Completed training</h2>
    {caseStudies.map(study => <article key={study.id} className="case-study-card">
      {study.client && <a className="client-logo" href={study.client.website} target="_blank" rel="noopener noreferrer"><img src={study.client.logo} alt={study.client.logoAlt} width="490" height="289" loading="lazy" /></a>}
      <p className="eyebrow">{study.delivery}</p>
      <h3>{study.title}</h3>
      {study.paragraphs.map(text => <p key={text}>{text}</p>)}
      {study.topics && <><h4>What the workshop covered</h4><ul>{study.topics.map(topic => <li key={topic}>{topic}</li>)}</ul></>}
      {study.resources && <><h4>Practical resources</h4><p>{study.resources}</p></>}
    </article>)}
  </div></section>;
}
