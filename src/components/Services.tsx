import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Compass, Presentation, Workflow } from 'lucide-react';
import { Reveal } from './Reveal';

const services = [
  {
    icon: Compass,
    color: '#00D4FF',
    label: 'A focused starting point',
    title: 'AI Readiness Workshop',
    description: 'A practical session to identify where AI can help, where it should not be used and what your team needs next.',
    points: ['Current confidence and needs review', 'Relevant use cases for real roles', 'Clear priorities and responsible-use actions'],
    cta: 'Discuss a Readiness Workshop',
    ctaHref: '/contact/',
  },
  {
    icon: Presentation,
    color: '#FFD700',
    label: 'Build practical capability',
    title: 'Practical AI Training for Teams',
    description: 'Hands-on training shaped around the work your people do, from first use to safe and repeatable workplace habits.',
    points: ['Half-day, full-day and multi-session options', 'Role-specific exercises and resources', 'Online, on-site or hybrid delivery'],
    cta: 'Explore Team Training',
    ctaHref: '/corporate-ai-training-uk/',
  },
  {
    icon: Workflow,
    color: '#00FF88',
    label: 'Improve one valuable process',
    title: 'AI Workflow Improvement Sprint',
    description: 'A short, structured engagement to map a repetitive workflow and design a sensible improvement or pilot.',
    points: ['Current-process and risk mapping', 'Opportunity assessment and pilot design', 'Testing, documentation and handover plan'],
    cta: 'Discuss a Workflow Sprint',
    ctaHref: '/ai-automation-consultant-newcastle/',
  },
];

export function Services() {
  return (
    <section id="services" className="section-wrapper" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(0,40,80,0.6) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal className="text-center" style={{ marginBottom: '64px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '16px', display: 'inline-block' }}>What We Do</span>
          <h2 style={{
            fontFamily: 'Space Grotesk', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: '#F0F4FF', letterSpacing: '-0.02em', marginBottom: '16px',
          }}>
            Three clear ways to <span className="gradient-text-gold">move forward with AI</span>
          </h2>
          <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '17px', color: '#8899AA', maxWidth: '650px', margin: '0 auto' }}>
            Start with the outcome you need. Each engagement is scoped around your people, work and level of AI confidence.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="glass-card"
                  style={{ borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <div style={{
                    width: 52, height: 52, background: `${service.color}15`, border: `1px solid ${service.color}30`,
                    borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '22px',
                  }}>
                    <Icon size={24} color={service.color} />
                  </div>

                  <p style={{
                    fontFamily: 'Space Grotesk', fontSize: '11px', fontWeight: 700, color: service.color,
                    textTransform: 'uppercase', letterSpacing: '0.11em', marginBottom: '10px',
                  }}>
                    {service.label}
                  </p>

                  <h3 style={{
                    fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 700,
                    color: '#F0F4FF', marginBottom: '12px', letterSpacing: '-0.01em',
                  }}>
                    {service.title}
                  </h3>

                  <p style={{
                    fontFamily: 'Plus Jakarta Sans', fontSize: '14.5px', color: '#8899AA',
                    lineHeight: 1.7, marginBottom: '20px', flex: 1,
                  }}>
                    {service.description}
                  </p>

                  <ul style={{ listStyle: 'none', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                    {service.points.map(point => (
                      <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
                        <CheckCircle2 size={14} color={service.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13.5px', color: '#7A8899' }}>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    whileHover={{ x: 4 }}
                    href={service.ctaHref}
                    data-conversion-placement={`Service package: ${service.title}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Space Grotesk',
                      fontSize: '14px', fontWeight: 600, color: service.color, width: 'fit-content',
                    }}
                    aria-label={service.cta}
                  >
                    {service.cta} <ArrowRight size={15} />
                  </motion.a>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
