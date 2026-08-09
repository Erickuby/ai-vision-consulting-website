import { FileCheck2, MessagesSquare, SearchCheck, ShieldCheck, Workflow, Presentation } from 'lucide-react';
import { Reveal } from './Reveal';

const useCases = [
  { icon: FileCheck2, title: 'Draft and improve documents', text: 'Create clearer first drafts, summaries and reports while keeping a person responsible for the final version.' },
  { icon: MessagesSquare, title: 'Turn meetings into action', text: 'Organise notes, decisions and follow-up tasks without losing the context that matters.' },
  { icon: SearchCheck, title: 'Research with source checks', text: 'Use AI to explore a topic, then verify evidence and recognise confident answers that may be wrong.' },
  { icon: Presentation, title: 'Prepare role-specific content', text: 'Build presentations, training material and communications around the audience and the real task.' },
  { icon: Workflow, title: 'Review repetitive admin', text: 'Map enquiries, hand-offs and routine follow-up before deciding what is safe and useful to automate.' },
  { icon: ShieldCheck, title: 'Use AI responsibly', text: 'Give staff clear working habits for privacy, accuracy, approval and human oversight.' },
];

export function PracticalUseCases() {
  return (
    <section className="section-wrapper relative z-10" style={{ padding: '80px 24px' }} aria-labelledby="use-cases-heading">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center" style={{ marginBottom: '48px' }}>
          <span className="badge badge-green" style={{ display: 'inline-flex', marginBottom: '16px' }}>Practical Use Cases</span>
          <h2 id="use-cases-heading" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] tracking-tight">
            What people can do <span className="gradient-text-cyan">after the training</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8899AA] max-w-3xl mx-auto" style={{ marginTop: '16px' }}>
            Every session is shaped around useful tasks, not a tour of whichever AI tool is fashionable that week.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.05}>
              <article style={{ height: '100%', padding: '24px', borderRadius: '18px', background: 'linear-gradient(180deg, rgba(10,20,40,0.82), rgba(7,15,30,0.92))', border: '1px solid rgba(0,212,255,0.13)', boxShadow: '0 18px 48px rgba(0,0,0,0.18)' }}>
                <div style={{ width: 44, height: 44, display: 'grid', placeItems: 'center', borderRadius: 12, color: '#00D4FF', background: 'rgba(0,212,255,0.09)', border: '1px solid rgba(0,212,255,0.16)', marginBottom: 18 }}><Icon size={21} /></div>
                <h3 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#F0F4FF', marginBottom: '10px' }}>{title}</h3>
                <p style={{ fontSize: '14.5px', color: '#A9B9C9', lineHeight: 1.75 }}>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
