import { useState } from 'react';
import { copilotSessions, individualTrainingPackages, trainingCategories, type TrainingSession } from '../data/training';

const sessionCounts = [1, 2, 3, 6, 12];

export function TrainingCatalogue() {
  const [selected, setSelected] = useState<string[]>([]);
  const [packageIndex, setPackageIndex] = useState(0);
  const chosenPackage = individualTrainingPackages[packageIndex];
  const toggle = (title: string) => setSelected(current => current.includes(title) ? current.filter(item => item !== title) : [...current, title]);
  const topic = (item: TrainingSession, prefix: string) => {
    const title = prefix + item.title;
    return <li key={title}><label className="topic-choice"><input type="checkbox" checked={selected.includes(title)} onChange={() => toggle(title)} /><span><strong>{item.title}</strong><span>{item.description}</span><small>Individual: £75 for a focused one-hour session, or use a bundle.</small></span></label></li>;
  };
  const enquiry = `I am interested in ${sessionCounts[packageIndex]} one-hour individual session(s), ${chosenPackage.price} total. Topics to discuss: ${selected.length ? selected.join('; ') : 'Please help me choose'}. My main goal is: `;
  return (
    <section className="pricing-section" aria-labelledby="catalogue-heading">
      <div className="seo-container">
        <div className="pricing-section-heading">
          <p className="pricing-kicker">Choose your learning route</p>
          <h2 id="catalogue-heading">Practical AI: twelve topics to pick from</h2>
          <p>Choose a topic, repeat it for more practice or mix routes. Each individual session is 60 minutes. A session covers one agreed task or introduction, not mastery of a whole subject.</p>
          <p>Select any topics that interest you, then send your shortlist below. You do not have to decide before your discovery call.</p>
          <a className="hero-text-link" href="#copilot-training">Looking for Microsoft 365 Copilot? Go to workplace topics →</a>
          <p><a className="hero-text-link" href="#shortlist-heading">Review your shortlist and session total →</a></p>
        </div>
        <div className="training-category-grid">{trainingCategories.map(category => <article className="training-category" key={category.title}><h3>{category.title}</h3><p>{category.strapline}</p><ul className="topic-list">{category.sessions.map(item => topic(item, 'Practical AI: '))}</ul></article>)}</div>
        <div id="copilot-training" className="copilot-catalogue">
          <div className="pricing-section-heading"><p className="pricing-kicker">A separate workplace route</p><h2>Microsoft 365 Copilot for Work</h2><p>For an individual improving their working day, or a company building team confidence. Learn with approved examples from the kinds of work you actually do.</p><p>Choose one focus for £75, two sessions for £140 or three for £195. The same six- and twelve-session bundle discounts apply across both routes.</p></div>
          <ul className="topic-list">{copilotSessions.map(item => topic(item, 'Copilot: '))}</ul>
          <div className="catalogue-guidance"><h3>A useful starting point for workplace productivity</h3><p>For a beginner, start with essentials and prompting. Then choose email and meetings, followed by documents or Excel. Your discovery call checks your goals and access before we agree the sessions.</p><h3>Before you book</h3><p>You need a laptop and basic familiarity with the apps you want to use. Microsoft 365 Copilot, Copilot Chat and personal Copilot accounts do not provide identical features. Availability depends on your licence, app version and organisation settings. Software licences and agent usage charges are not included.</p><p>Use only employer-approved tools and material. We can work with fictional or anonymised examples. We never need your password or confidential workplace files. Every route includes checking outputs, permissions and safe information handling.</p><p>Independent practical training from AI Vision Consulting, not a Microsoft certification course.</p></div>
        </div>
        <div className="training-shortlist" aria-labelledby="shortlist-heading">
          <h2 id="shortlist-heading">Your individual training shortlist</h2>
          <p aria-live="polite">{selected.length ? selected.length + ' topic(s) selected for discussion.' : 'Nothing selected yet. Browse above, or let us help you choose.'}</p>
          {selected.length > 0 && <ul>{selected.map(title => <li key={title}>{title}</li>)}</ul>}
          <label htmlFor="session-package">How many one-hour sessions are you considering?</label>
          <select id="session-package" value={packageIndex} onChange={event => setPackageIndex(Number(event.target.value))}>{individualTrainingPackages.map((item, index) => <option key={item.name} value={index}>{sessionCounts[index]} session{index === 0 ? '' : 's'} · {item.price} total</option>)}</select>
          <p className="shortlist-total" aria-live="polite">{chosenPackage.price} total for {sessionCounts[packageIndex]} hour{packageIndex === 0 ? '' : 's'} of individual training.</p>
          <p>Topic choices are a shortlist, not a promise to cover them all in the chosen hours. We agree the scope, dates and payment arrangements before booking. There is no payment taken here.</p>
          <div className="hero-actions"><a className="btn-primary" href={'/contact/?training=' + encodeURIComponent(enquiry) + '#contact'}>Enquire with this shortlist</a><a className="hero-text-link" href="https://cal.com/eric-nwankwo/ai-discovery-call" target="_blank" rel="noopener noreferrer">Book a free discovery call →</a>{selected.length > 0 && <button className="hero-text-link" onClick={() => setSelected([])}>Clear selection</button>}</div>
          <p>Booking directly through the calendar? Mention your preferred topics during the call; the shortlist is not sent to the calendar automatically.</p>
        </div>
        <div className="catalogue-guidance"><h3>Booking for a company?</h3><p>Corporate training starts at £995 per workshop. Choose a Copilot-focused agenda, a Practical AI workshop or a combination. We scope the roles, licences, examples and group size with you.</p><a className="hero-text-link" href="#team-training">See company workshop formats and prices →</a></div>
      </div>
    </section>
  );
}
