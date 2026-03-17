import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Reveal } from './Reveal';

const testimonials = [
  {
    name: 'Amaka Eze',
    role: 'Job Seeker, Newcastle',
    quote:
      'At the Black Tech session, AI finally stopped feeling like a buzzword. I used the prompts from that evening to rewrite my CV, tighten my LinkedIn, and send applications that actually sounded like me.',
  },
  {
    name: 'Tariq Mensah',
    role: 'Career Switcher, Gateshead',
    quote:
      'What stood out was how practical everything felt. I learned how to turn rough thoughts into polished work, research faster, and walk into interviews with examples that made me sound prepared instead of overwhelmed.',
  },
  {
    name: 'Lena Okoro',
    role: 'Small Business Founder, Sunderland',
    quote:
      'I expected another motivational talk. Instead, I left with a working system. AI now helps me plan client updates, draft workshop notes, and clear admin faster, which means I can spend more time actually growing the business.',
  },
];

export function TestimonialsUpgraded() {
  return (
    <section className="relative z-10" style={{ padding: '80px 24px' }} aria-label="Testimonials">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-block' }}>Real Results</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] tracking-tight">
            People whose lives have <span className="gradient-text-cyan">changed</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={0.12 + index * 0.08}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="testimonial-card relative overflow-hidden"
                style={{
                  height: '100%',
                  background:
                    'linear-gradient(180deg, rgba(10,20,40,0.82) 0%, rgba(7,15,30,0.92) 100%)',
                  border: '1px solid rgba(0,212,255,0.14)',
                  boxShadow: '0 20px 56px rgba(0,0,0,0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-70px',
                    right: '-20px',
                    width: '180px',
                    height: '180px',
                    borderRadius: '999px',
                    background: 'rgba(0,212,255,0.08)',
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                  }}
                />

                <div
                  className="relative"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: '#FFD700',
                    }}
                  >
                    ★★★★★
                  </span>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.12)',
                    }}
                  >
                    <Quote size={16} color="#00D4FF" />
                  </div>
                </div>

                <p
                  className="relative"
                  style={{
                    fontSize: '15px',
                    color: '#D7E2ED',
                    lineHeight: 1.8,
                    marginBottom: '26px',
                    flex: 1,
                  }}
                >
                  "{testimonial.quote}"
                </p>

                <div
                  className="relative"
                  style={{
                    paddingTop: '18px',
                    borderTop: '1px solid rgba(0,212,255,0.08)',
                  }}
                >
                  <div
                    className="font-display"
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#F0F4FF',
                      marginBottom: '4px',
                    }}
                  >
                    {testimonial.name}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: '#8899AA',
                    }}
                  >
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
