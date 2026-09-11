import { VatNotice, FreeTrainingComparison } from './PricingContext';
import { pricingPolicy } from '../data/pricingPolicy';
import { useEffect, useRef, useState } from 'react';
import { copilotSessions, trainingCategories, individualSessionRate, type TrainingSession } from '../data/training';
import { trainingTotal, trainingBookingUrl } from '../data/trainingSelection';

export function TrainingCatalogue() {
  const [selected, setSelected] = useState<string[]>([]);
  const selectionBar = useRef<HTMLElement>(null);
  useEffect(() => {
    const bar = selectionBar.current;
    if (!bar) return;
    const update = () => document.documentElement.style.setProperty('--training-bar-height', `${bar.getBoundingClientRect().height}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    return () => { observer.disconnect(); document.documentElement.style.removeProperty('--training-bar-height'); };
  }, [selected.length]);
  const total = trainingTotal(selected.length);
  const price = '£' + total.toLocaleString('en-GB');
  const toggle = (title: string) => setSelected(current => current.includes(title) ? current.filter(item => item !== title) : [...current, title]);
  const topic = (item: TrainingSession, prefix: string) => {
    const title = prefix + item.title;
    if (item.corporateOnly) return <li key={title}><strong>{item.title}</strong><p>{item.description}</p><p>Corporate only. Scoped with IT and information governance; individual session prices do not apply.</p><a className="hero-text-link" href={item.coursePath}>View workshop details →</a></li>;
    return <li key={title}><label className="topic-choice"><input type="checkbox" checked={selected.includes(title)} onChange={() => toggle(title)} /><span><strong>{item.title}</strong><span>{item.description}</span><small>Individual: £{individualSessionRate} for a focused one-hour session, or use a bundle. {pricingPolicy.vatShort}</small></span></label>{item.coursePath && <a className="hero-text-link" href={item.coursePath}>View session details →</a>}</li>;
  };
  const enquiry = selected.length ? `Individual AI training enquiry\n\nSelected courses:\n${selected.map((title, index) => `${index + 1}. ${title}`).join('\n')}\n\n${selected.length} one-hour sessions (one per selected topic).\nTotal: ${price}, including applicable bundle discounts. No VAT added.\nScope and dates to agree during the free discovery call.\n\nMy main goal is: ` : 'I would like help choosing AI training topics. My main goal is: ';
  const bookingUrl = trainingBookingUrl(enquiry);
  return (
    <section className="pricing-section" aria-labelledby="catalogue-heading">
      <div className="seo-container">
        <div className="pricing-section-heading">
          <p className="pricing-kicker">Choose your learning route</p>
          <h2 id="catalogue-heading">Practical AI: thirteen topics to pick from</h2>
          <p>Choose a topic, repeat it for more practice or mix routes. Each individual session is 60 minutes. A session covers one agreed task or introduction, not mastery of a whole subject.</p>
          <p>Tick the topics you want to learn. Each adds one hour of individual training. Your selected courses and total update automatically, with bundle discounts applied. You can discuss or adjust the plan during a free discovery call.</p>
          <a className="hero-text-link" href="#copilot-training">Looking for Microsoft 365 Copilot? Go to workplace topics →</a>
          <p><a className="hero-text-link" href="#shortlist-heading">Review your shortlist and session total →</a></p>
        </div>
        <FreeTrainingComparison condensed />
        <div className="training-category-grid">{trainingCategories.map(category => <article className="training-category" key={category.title}><h3>{category.title}</h3><p>{category.strapline}</p><ul className="topic-list">{category.sessions.map(item => topic(item, 'Practical AI: '))}</ul></article>)}</div>
        <div className="catalogue-guidance">
          <h3>Choosing an AI video tool in 2026</h3>
          <p>Start with <a href="https://deepmind.google/models/veo/" target="_blank" rel="noopener noreferrer">Google Veo 3.1</a> for realistic short clips with native audio. Compare Runway Gen-4.5 for generation and editing in one workspace, Kling 3.0 for short social clips, and Seedance 2.0 for video guided by images, audio or reference clips. We choose the tool around the result you need.</p>
          <p>Veo access includes Google AI Pro, with limits that depend on the plan and product. Software subscriptions and generation credits are separate from the training price. Check the current commercial-use terms, upload permissions and export limits for your chosen plan. A free tier or paid subscription does not automatically clear third-party rights.</p>
          <p>A focused hour covers one short clip and a repeatable prompt, not a complete campaign or guaranteed production-ready footage. You will leave with a draft clip, your prompt and a checklist for reviewing quality, consent and usage rights.</p>
        </div>
        <div id="copilot-training" className="copilot-catalogue">
          <div className="pricing-section-heading"><p className="pricing-kicker">A separate workplace route</p><h2>Microsoft 365 Copilot for Work</h2><p>For an individual improving their working day, or a company building team confidence. Learn with approved examples from the kinds of work you actually do.</p><p>Choose one focus for £95, three sessions for £270, six for £510 or twelve for £900. You can mix individual topics from both routes. No VAT is added.</p></div>
          <ul className="topic-list">{copilotSessions.map(item => topic(item, 'Copilot: '))}</ul>
          <div className="catalogue-guidance"><h3>A useful starting point for workplace productivity</h3><p>For a beginner, start with essentials and prompting. Then choose email and meetings, followed by documents or Excel. Your discovery call checks your goals and access before we agree the sessions.</p><h3>Before you book</h3><p>You need a laptop and basic familiarity with the apps you want to use. Microsoft 365 Copilot, Copilot Chat and personal Copilot accounts do not provide identical features. Availability depends on your licence, app version and organisation settings. Software licences and agent usage charges are not included.</p><p>Use only employer-approved tools and material. We can work with fictional or anonymised examples. We never need your password or confidential workplace files. Every route includes checking outputs, permissions and safe information handling.</p><p>Independent practical training from AI Vision Consulting, not a Microsoft certification course.</p></div>
        </div>
        <div className="training-shortlist" aria-labelledby="shortlist-heading">
          <h2 id="shortlist-heading">Your individual training shortlist</h2>
          <p aria-live="polite">{selected.length ? selected.length + ' topic(s) selected for discussion.' : 'Nothing selected yet. Browse above, or let us help you choose.'}</p>
          {selected.length > 0 && <ul>{selected.map(title => <li key={title}>{title}</li>)}</ul>}
          <p className="shortlist-total" aria-live="polite">{price} total for {selected.length} one-hour session{selected.length === 1 ? '' : 's'}.</p>
          {selected.length * individualSessionRate > total && <p>Save £{selected.length * individualSessionRate - total} compared with separate £{individualSessionRate} sessions. We combine the published bundles to give your selection the lowest total.</p>}
          <VatNotice />
          <p>One session introduces a topic or focuses on one agreed task. More complex goals may need extra practice. We agree the scope, dates and payment arrangements before confirming training. No payment is taken here.</p>
          <div className="hero-actions"><a className="btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">Discuss my courses on a free call</a><a className="hero-text-link" href={'/contact/?training=' + encodeURIComponent(enquiry) + '#contact'}>Send an enquiry instead →</a>{selected.length > 0 && <button className="hero-text-link" onClick={() => setSelected([])}>Clear selection</button>}</div>
          <p>Your course list, session count and total are added to the booking notes. Review them and add your goal before confirming the call.</p>
        </div>
        <div className="catalogue-guidance"><h3>Booking for a company?</h3><p>Corporate training starts at £995 per workshop. No VAT is added. Choose a Copilot-focused agenda, a Practical AI workshop or a combination. We scope the roles, licences, examples and group size with you.</p><a className="hero-text-link" href="#team-training">See company workshop formats and prices →</a></div>
      </div>
      {selected.length > 0 && <aside ref={selectionBar} className="selection-bar" aria-label="Selected training summary"><span aria-live="polite">{selected.length} course{selected.length === 1 ? '' : 's'} · {selected.length} hour{selected.length === 1 ? '' : 's'} · <strong>{price}</strong> · No VAT added</span><a href="#shortlist-heading">View selected courses</a><a href={bookingUrl} target="_blank" rel="noopener noreferrer">Discuss on a free call →</a></aside>}
    </section>
  );
}
