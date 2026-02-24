import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
}

function Counter({ end, prefix = '', suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const spring = useSpring(0, { damping: 50, stiffness: 100 });
  const display = useTransform(spring, (value) => 
    `${prefix}${Math.floor(value).toLocaleString()}${suffix}`
  );

  useEffect(() => {
    if (isInView) {
      spring.set(end);
    }
  }, [isInView, end, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const trustSignals = [
  'CPD Accredited Provider',
  'Partnered with Jobcentre Plus',
  '100+ Professionals Trained',
];

const stats = [
  { end: 50, suffix: '+', label: 'Jobs Secured', prefix: '' },
  { end: 50, suffix: 'k+', label: 'in Side Income Generated', prefix: '£' },
  { end: 100, suffix: '+', label: 'People Trained', prefix: '' },
  { end: 12, suffix: '', label: 'Community Workshops', prefix: '' },
];

export function HeroUpgraded() {
  const scrollTo = (href: string) => {
    document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 relative z-10"
    >
      {/* Deep gradient overlay */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,40,80,0.8) 0%, rgba(5,13,26,0.4) 70%)',
        }}
      />

      <div className="max-w-4xl w-full text-center">
        {/* Pre-badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}
        >
          <span className="badge badge-cyan">
            <Sparkles size={12} />
            Newcastle upon Tyne, UK · Practical AI Training
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
          style={{ color: '#F0F4FF', marginBottom: '24px' }}
        >
          Unlock AI Skills for{' '}
          <span className="gradient-text-gold">Financial Freedom</span>{' '}
          — Starting Today
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#8899AA] leading-relaxed max-w-2xl mx-auto"
          style={{ marginBottom: '40px' }}
        >
          From job hunting to AI consulting: practical training that gets real results.
          Based in Newcastle, serving jobseekers, small businesses, and communities across the UK.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo('contact')}
            className="btn-primary glow-gold"
            aria-label="Book your free AI assessment"
          >
            <Sparkles size={16} />
            Book Free AI Assessment
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo('courses')}
            className="btn-secondary"
            aria-label="Browse our courses"
          >
            Browse Courses
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '44px' }}
        >
          {trustSignals.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <CheckCircle size={14} color="#00D4FF" />
              <span className="text-xs sm:text-sm text-[#8899AA] font-medium">{t}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4"
          style={{
            gap: '24px',
            padding: '32px',
            borderRadius: '24px',
            background: 'rgba(10,20,40,0.6)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0,212,255,0.12)',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="text-center"
            >
              <div className="stat-number">
                <Counter end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-[#8899AA] font-medium" style={{ marginTop: '6px' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div
          className="w-6 h-9 border-2 rounded-xl flex justify-center p-1"
          style={{ borderColor: 'rgba(0,212,255,0.3)' }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-sm"
            style={{ background: '#00D4FF' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
