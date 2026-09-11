import { regionalSources } from '../data/regional';

export function NorthEastContext() {
  return <section className="seo-content-section" aria-labelledby="north-east-heading"><div className="seo-container seo-article-copy">
    <span className="badge badge-cyan">Practical skills for our region</span>
    <h2 id="north-east-heading">Why this matters in the North East</h2>
    <p>The North East AI Growth Zone includes data-centre sites at Blyth and Cobalt Park. The government’s launch announcement projected more than 5,000 jobs and up to £30 billion of potential private investment. These are projections, not jobs already created or investment already delivered. <a href={regionalSources.growthZone} target="_blank" rel="noopener noreferrer">Read the government announcement.</a></p>
    <p>A separate government-backed pilot is planned for early 2027, offering AI work placements for eligible young people aged 18 to 24 who are out of education and employment, with Accenture, Microsoft and Sage. <a href={regionalSources.youthPilot} target="_blank" rel="noopener noreferrer">Read the pilot plans.</a></p>
    <p>Infrastructure alone does not give a local team the skills to use AI well. We help businesses, charities, public-sector teams and individuals practise useful tasks, check the results and build confidence with the tools they can actually access.</p>
    <a className="hero-text-link" href="/free-ai-training-north-east/">Explore free and funded training in the North East →</a>
  </div></section>;
}
