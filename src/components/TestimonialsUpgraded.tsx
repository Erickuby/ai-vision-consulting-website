import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Reveal } from './Reveal';

const principles = [
  {
    title: 'Start with the real task',
    text: 'Training and consulting begin with the work people actually need to complete, not a generic list of AI tools.',
  },
  {
    title: 'Keep people in control',
    text: 'Participants learn to review outputs, protect sensitive information and recognise decisions that require human judgement.',
  },
  {
    title: 'Measure before scaling',
    text: 'Automation opportunities are scoped around evidence, ownership and a clear way to judge whether the change is useful.',
  },
];

export function TestimonialsUpgraded() {
  return (
    <section className="relative z-10" style={{ padding: '80px 24px' }} aria-label="How we work">
      <div className="max-w-6xl mx-auto">
        <Reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-block' }}>How We Work</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] tracking-tight">
            Practical delivery without <span className="gradient-text-cyan">inflated promises</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delay={0.12 + index * 0.08}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="testimonial-card relative overflow-hidden"
                style={{
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(10,20,40,0.82) 0%, rgba(7,15,30,0.92) 100%)',
                  border: '1px solid rgba(0,212,255,0.14)',
                  boxShadow: '0 20px 56px rgba(0,0,0,0.2)',
                }}
              >
                <CheckCircle size={22} color="#00D4FF" style={{ marginBottom: '20px' }} />
                <h3 className="font-display" style={{ fontSize: '19px', fontWeight: 700, color: '#F0F4FF', marginBottom: '12px' }}>
                  {principle.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#D7E2ED', lineHeight: 1.8 }}>
                  {principle.text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
