import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import { Reveal } from './Reveal';

const reviews = [
  {
    name: 'Tolulola Adebiyi',
    text: 'Well equipped to train people in the use of AI.',
  },
  {
    name: 'Toluwalope Opadeyi',
    text: 'Lovely session and well explained. Thanks Eric.',
  },
  {
    name: 'Alexandrai Ishiekwene',
    text: 'Thank you for your selfless teachings Eric.',
  },
];

export function TestimonialsUpgraded() {
  return (
    <section className="relative z-10" style={{ padding: '72px 24px' }} aria-label="Google reviews">
      <div className="max-w-6xl mx-auto">
        <Reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-block' }}>Client Feedback</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] tracking-tight">
            Trusted for clear, <span className="gradient-text-cyan">practical teaching</span>
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '18px', color: '#FFD700' }}>
            <span aria-hidden="true" style={{ display: 'inline-flex', gap: 2 }}>{[0, 1, 2, 3, 4].map((item) => <Star key={item} size={18} fill="currentColor" />)}</span>
            <span style={{ color: '#D7E2ED', fontWeight: 700 }}>Rated 5.0 on Google</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={0.12 + index * 0.08}>
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
                <div aria-hidden="true" style={{ display: 'flex', gap: 3, color: '#FFD700', marginBottom: '20px' }}>{[0, 1, 2, 3, 4].map((item) => <Star key={item} size={16} fill="currentColor" />)}</div>
                <h3 className="font-display" style={{ fontSize: '19px', fontWeight: 700, color: '#F0F4FF', marginBottom: '12px' }}>
                  {review.name}
                </h3>
                <p style={{ fontSize: '15px', color: '#D7E2ED', lineHeight: 1.8 }}>
                  “{review.text}”
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal style={{ textAlign: 'center', marginTop: '32px' }}>
          <a href="https://www.google.com/search?q=AI+Vision+Consulting+Newcastle" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Read Google Reviews <ExternalLink size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
