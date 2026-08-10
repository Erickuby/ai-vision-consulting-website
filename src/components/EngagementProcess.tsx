import { ArrowRight, ClipboardCheck, Layers3, Presentation, Wrench } from 'lucide-react';
import { Reveal } from './Reveal';

const steps = [
  {
    number: '01',
    title: 'Understand',
    text: 'We clarify the people, tasks, constraints and result that matter before recommending a format or tool.',
    icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'Design',
    text: 'We shape the workshop, training programme or workflow around your real context and confidence level.',
    icon: Layers3,
  },
  {
    number: '03',
    title: 'Deliver',
    text: 'People work through practical examples, guided exercises or a focused pilot with clear human oversight.',
    icon: Presentation,
  },
  {
    number: '04',
    title: 'Embed',
    text: 'You leave with useful resources, agreed next actions and support for applying the learning after delivery.',
    icon: Wrench,
  },
];

export function EngagementProcess() {
  return (
    <section className="section-wrapper" aria-labelledby="engagement-process-heading" style={{ padding: '24px 24px 100px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <div style={{
            padding: 'clamp(28px, 5vw, 56px)', borderRadius: '28px',
            background: 'linear-gradient(145deg, rgba(8,24,44,0.94), rgba(5,13,26,0.96))',
            border: '1px solid rgba(0,212,255,0.16)', boxShadow: '0 28px 80px rgba(0,0,0,0.28)',
            overflow: 'hidden', position: 'relative',
          }}>
            <div aria-hidden="true" style={{
              position: 'absolute', width: '360px', height: '360px', right: '-160px', top: '-180px',
              borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.16), transparent 68%)',
            }} />

            <div className="engagement-process-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.6fr)', gap: 'clamp(32px, 6vw, 72px)', alignItems: 'start' }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-block' }}>How We Work</span>
                <h2 id="engagement-process-heading" style={{
                  fontFamily: 'Space Grotesk', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.08,
                  fontWeight: 700, color: '#F0F4FF', letterSpacing: '-0.025em', marginBottom: '18px',
                }}>
                  A clear route from <span className="gradient-text-cyan">idea to useful action</span>
                </h2>
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '16px', lineHeight: 1.75, color: '#94A5B8', marginBottom: '24px' }}>
                  No generic demonstrations and no tool-first recommendations. The work starts with what people need to do better.
                </p>
                <a href="/contact/" className="btn-secondary" data-conversion-placement="Engagement process">
                  Discuss your requirement <ArrowRight size={16} />
                </a>
              </div>

              <ol style={{ listStyle: 'none', display: 'grid', gap: '12px', margin: 0, padding: 0 }}>
                {steps.map(({ number, title, text, icon: Icon }) => (
                  <li key={title} style={{
                    display: 'grid', gridTemplateColumns: '52px minmax(0, 1fr)', gap: '16px', padding: '20px',
                    borderRadius: '18px', background: 'rgba(5,13,26,0.68)', border: '1px solid rgba(0,212,255,0.11)',
                  }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: '15px', display: 'grid', placeItems: 'center',
                      background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.18)',
                      color: '#00D4FF', position: 'relative',
                    }}>
                      <Icon size={20} aria-hidden="true" />
                      <span style={{ position: 'absolute', right: '-7px', top: '-8px', fontFamily: 'Space Grotesk', fontSize: '9px', fontWeight: 700, color: '#FFD700' }}>{number}</span>
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'Space Grotesk', color: '#F0F4FF', fontSize: '17px', fontWeight: 700, marginBottom: '5px' }}>{title}</h3>
                      <p style={{ fontFamily: 'Plus Jakarta Sans', color: '#8899AA', fontSize: '13.5px', lineHeight: 1.65, margin: 0 }}>{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
