import { useEffect, useRef } from 'react';
import { ArrowRight, Briefcase, Bot, TrendingUp } from 'lucide-react';

const flagship = [
  {
    icon: Briefcase,
    color: '#00D4FF',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,80,160,0.1))',
    title: 'AI-Powered Job Hunting',
    desc: 'Use AI to research roles, tailor truthful applications and prepare for interviews.',
    price: 'Scope on enquiry',
  },
  {
    icon: Bot,
    color: '#FFD700',
    gradient: 'linear-gradient(135deg, rgba(255,215,0,0.12), rgba(200,100,0,0.08))',
    title: 'Business Automation',
    desc: 'Identify repetitive work and explore useful, controlled AI-assisted workflows.',
    price: 'Scope on enquiry',
  },
  {
    icon: TrendingUp,
    color: '#00FF88',
    gradient: 'linear-gradient(135deg, rgba(0,255,136,0.12), rgba(0,150,80,0.08))',
    title: 'AI Consulting Foundations',
    desc: 'Learn how to discover needs, scope responsible solutions and communicate value clearly.',
    price: 'Scope on enquiry',
  },
];

export function FlagshipCourses() {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); },
      { threshold: 0.1 }
    );
    refs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-wrapper" style={{ padding: '0 24px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          ref={el => { refs.current[0] = el; }}
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <p style={{ fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: 600, color: '#00D4FF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
            FLAGSHIP PROGRAMMES
          </p>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: '#F0F4FF' }}>
            Practical programmes for work, careers and responsible AI delivery
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {flagship.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                ref={el => { refs.current[i + 1] = el; }}
                className="reveal"
                href="/#courses"
                style={{
                  background: item.gradient,
                  border: `1px solid ${item.color}25`,
                  borderRadius: '20px',
                  padding: '32px',
                  transition: 'all 0.35s ease',
                  cursor: 'pointer',
                  transitionDelay: `${i * 0.1}s`,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(-6px)';
                  el.style.borderColor = item.color + '55';
                  el.style.boxShadow = `0 20px 60px ${item.color}15, 0 4px 16px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(0)';
                  el.style.borderColor = item.color + '25';
                  el.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: 52, height: 52,
                  background: item.color + '18',
                  border: `1px solid ${item.color}30`,
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <Icon size={26} color={item.color} />
                </div>
                <h3 style={{
                  fontFamily: 'Space Grotesk', fontSize: '19px', fontWeight: 700,
                  color: '#F0F4FF', marginBottom: '10px', letterSpacing: '-0.01em'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#8899AA',
                  lineHeight: 1.7, marginBottom: '20px'
                }}>
                  {item.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 700, color: item.color }}>
                    {item.price}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: 600, color: item.color }}>
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
