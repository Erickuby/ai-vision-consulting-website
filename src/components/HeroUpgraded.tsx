import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  startDelay?: number;
}

function Counter({ end, prefix = '', suffix = '', startDelay = 0 }: CounterProps) {
  const spring = useSpring(0, { damping: 30, stiffness: 70, restDelta: 0.5 });
  const display = useTransform(spring, (value) =>
    `${prefix}${Math.floor(value).toLocaleString()}${suffix}`
  );

  useEffect(() => {
    const timer = window.setTimeout(() => spring.set(end), startDelay);
    return () => window.clearTimeout(timer);
  }, [end, spring, startDelay]);

  return <motion.span>{display}</motion.span>;
}

function MagneticButton({ children, onClick, className, ariaLabel }: {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.18, y: y * 0.28 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.4 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}

const trustSignals = [
  'Newcastle-based AI Trainer',
  'BlackTech North East Training Partner',
];

const stats = [
  { end: 20, suffix: '+', label: 'AI Career Changes Supported', prefix: '' },
  { end: 100, suffix: '+', label: 'Professionals Trained', prefix: '' },
  { label: 'Training Partner', prefix: '', suffix: '', valueText: 'BlackTech North East' },
];

function TiltCard({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 140, damping: 18, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 140, damping: 18, mass: 0.5 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(-py * 6);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        ...style,
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroUpgraded() {
  const scrollTo = (href: string) => {
    document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative z-10"
      style={{ paddingTop: '48px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px' }}
    >
      {/* Deep gradient overlay */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,40,80,0.8) 0%, rgba(5,13,26,0.4) 70%)',
        }}
      />

      <div className="max-w-4xl w-full text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
          style={{ color: '#F0F4FF', marginBottom: '24px' }}
        >
          Build AI Skills for{' '}
          <span className="gradient-text-gold-shimmer">Financial Freedom</span>{' '}
          Starting Today
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#8899AA] leading-relaxed max-w-2xl mx-auto"
          style={{ marginBottom: '40px' }}
        >
          Practical AI training that turns into interviews, income and time back — for jobseekers, small businesses, and community partners across the UK.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}
        >
          <MagneticButton
            onClick={() => scrollTo('contact')}
            className="btn-primary glow-gold"
            ariaLabel="Book your free AI assessment"
          >
            <Sparkles size={16} />
            Book Free AI Assessment
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo('courses')}
            className="btn-secondary"
            ariaLabel="Browse our courses"
          >
            Browse Courses
            <ArrowRight size={16} />
          </MagneticButton>
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
        >
        <TiltCard
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: '24px',
            padding: '32px',
            borderRadius: '24px',
            background: 'rgba(10,20,40,0.6)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0,212,255,0.12)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
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
              {'valueText' in stat ? (
                <div
                  className="font-display text-lg sm:text-xl md:text-2xl font-bold text-[#00D4FF]"
                  style={{ lineHeight: 1.2 }}
                >
                  {stat.valueText}
                </div>
              ) : (
                <div className="stat-number">
                  <Counter end={stat.end} prefix={stat.prefix} suffix={stat.suffix} startDelay={700 + i * 120} />
                </div>
              )}
              <div className="text-xs sm:text-sm text-[#8899AA] font-medium" style={{ marginTop: '6px' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </TiltCard>
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
