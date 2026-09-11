import { pricingPolicy } from '../data/pricingPolicy';

export function VatNotice({ full = false }: { full?: boolean }) {
  return <p className="pricing-scope-note">{full ? pricingPolicy.vatStatement : pricingPolicy.vatShort}</p>;
}

export function FreeTrainingComparison({ condensed = false }: { condensed?: boolean }) {
  if (condensed) return (
    <div className="catalogue-guidance">
      <h3>Start with free foundation training if it meets your needs</h3>
      <p>Free foundation training is available to UK adults through the government’s <a href="https://aiskillshub.org.uk/" target="_blank" rel="noopener noreferrer">AI Skills Hub</a>, and we recommend it as a starting point. A paid session works with your own approved files, licence and role, with live feedback as you practise.</p>
    </div>
  );
  return (
    <section className="pricing-section pricing-section-tonal" aria-labelledby="free-training-heading">
      <div className="seo-container seo-article-copy">
        <p className="pricing-kicker">Choose what meets your needs</p>
        <h2 id="free-training-heading">Should you pay for this when the government offers free AI training?</h2>
        <p>A fair question, and one we would rather answer directly.</p>
        <p>The government’s <a href="https://aiskillshub.org.uk/" target="_blank" rel="noopener noreferrer">AI Skills Hub</a> offers free online training to UK adults. Selected courses meet Skills England’s foundation-skills benchmark and lead to a virtual AI foundations badge. If you want a structured introduction at your own pace, start there.</p>
        <p>Here is what a paid session with us adds.</p>
        <ul>
          <li><strong>Your files.</strong> Practise with your own approved documents, inbox examples or reporting pack. Use anonymised material wherever appropriate.</li>
          <li><strong>Your licence.</strong> Microsoft 365 Copilot, Copilot Chat and personal Copilot accounts behave differently. We check what you can actually access.</li>
          <li><strong>Your role.</strong> A bid writer, housing officer and finance manager need different prompts, checks and information-handling rules.</li>
          <li><strong>Live supervised practice.</strong> Work through the task while someone watches, answers questions and helps you correct mistakes.</li>
          <li><strong>The awkward questions.</strong> Decide what can go into the tool, what must stay out, who approves the result and how to respond when it is wrong.</li>
        </ul>
        <p>Choose paid support when you need help applying the learning to your work.</p>
      </div>
    </section>
  );
}
