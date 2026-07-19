import { motion } from 'framer-motion';
import { GraduationCap, Cpu, Presentation, HandshakeIcon, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

const services = [
  {
    icon: GraduationCap,
    color: '#00D4FF',
    title: 'AI Training Programmes',
    description: 'Practical AI training for individuals, teams and community audiences.',
    points: ['Structured sessions and workshops', 'Content scoped around the audience', 'Online, in-person, or hybrid delivery'],
    cta: 'Learn More',
    ctaHref: '/pricing/#catalogue-heading',
  },
  {
    icon: Cpu,
    color: '#FFD700',
    title: 'Personal AI Training',
    description: 'Tailored 90-minute sessions at £125, with three, six and twelve-session bundles.',
    points: ['Choose from twelve practical topics', 'Personalised learning plan', 'Guided practice and action notes'],
    cta: 'View Pricing',
    ctaHref: '/pricing/',
  },
  {
    icon: Presentation,
    color: '#A78BFA',
    title: 'Corporate Workshops',
    description: 'Practical team workshops from £750, plus half-day, full-day and multi-session programmes.',
    points: ['Tailored to team roles and goals', 'Online, on-site or hybrid delivery', 'Participant resources included'],
    cta: 'View Pricing',
    ctaHref: '/pricing/',
  },
  {
    icon: HandshakeIcon,
    color: '#00FF88',
    title: 'Community Partnerships',
    description: 'Accessible AI skills sessions for employability providers and community organisations.',
    points: ['Employability-focused AI skills', 'Community seminars and workshops', 'Delivery scoped with each partner'],
    cta: 'Learn More',
    ctaHref: '#contact',
  },
];

export function Services() {
  return (
    <section id="services" className="section-wrapper" style={{ padding: '100px 24px', position: 'relative' }}>
      {/* BG accent */}
      <div style={{
        position: 'absolute', top: '0', right: '0', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(0,40,80,0.6) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <Reveal className="text-center" style={{ marginBottom: '64px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '16px', display: 'inline-block' }}>What We Do</span>
          <h2 style={{
            fontFamily: 'Space Grotesk', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: '#F0F4FF', letterSpacing: '-0.02em', marginBottom: '16px'
          }}>
            Services built for <span className="gradient-text-gold">real-world outcomes</span>
          </h2>
          <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '17px', color: '#8899AA', maxWidth: '520px', margin: '0 auto' }}>
            Whether you're an individual, a business, or a community organisation, there's a path designed for you.
          </p>
        </Reveal>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
                  style={{
                    borderRadius: '20px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 52, height: 52,
                    background: `${service.color}15`,
                    border: `1px solid ${service.color}30`,
                    borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '24px',
                  }}>
                    <Icon size={24} color={service.color} />
                  </div>

                  <h3 style={{
                    fontFamily: 'Space Grotesk', fontSize: '19px', fontWeight: 700,
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

                  <ul style={{ listStyle: 'none', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {service.points.map(p => (
                      <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <div style={{
                          width: 5, height: 5, borderRadius: '50%',
                          background: service.color, marginTop: '7px', flexShrink: 0,
                        }} />
                        <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13.5px', color: '#7A8899' }}>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    whileHover={{ x: 4 }}
                    href={service.ctaHref}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600,
                      color: service.color, background: 'none', border: 'none',
                      cursor: 'pointer', padding: 0,
                      width: 'fit-content',
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
