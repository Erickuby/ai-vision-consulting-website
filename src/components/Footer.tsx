import { useState } from 'react';
import { Linkedin, Youtube, Instagram, ArrowRight, Mail } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: 'home' },
  { label: 'Courses', href: 'courses' },
  { label: 'About', href: 'about' },
  { label: 'Services', href: 'services' },
  { label: 'Blog', href: 'blog' },
  { label: 'Contact', href: 'contact' },
];

const courses = [
  'AI-Powered Job Hunting',
  'AI for Small Business',
  'AI Consulting Bootcamp',
  'AI for Career Changers',
  'AI Essentials (Free)',
];

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/eric-nwankwo/' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/aivisionconsulting/' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@aivisionconsulting' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#/privacy-policy' },
  { label: 'Terms of Service', href: '#/terms-of-service' },
  { label: 'Cookie Policy', href: '#/cookie-policy' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const scrollTo = (href: string) => {
    document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setDone(true); setEmail(''); }
  };

  return (
    <footer style={{
      position: 'relative', zIndex: 10,
      background: 'rgba(5,10,20,0.95)', backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(0,212,255,0.08)',
      padding: '72px 24px 32px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '64px',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img
                src="/logo.svg"
                width={36}
                height={36}
                alt="AI Vision Consulting logo"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.35))' }}
              />
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '15px', color: '#F0F4FF', lineHeight: 1 }}>
                  AI Vision
                </div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 400, fontSize: '10px', color: '#00D4FF', letterSpacing: '0.08em', lineHeight: 1, marginTop: 2 }}>
                  CONSULTING LTD
                </div>
              </div>
            </div>
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13.5px', color: '#8899AA', lineHeight: 1.7, marginBottom: '20px', maxWidth: '220px' }}>
              Making AI Accessible for Everyone.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 36, height: 36, borderRadius: '9px',
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#8899AA', textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#00D4FF';
                    e.currentTarget.style.color = '#00D4FF';
                    e.currentTarget.style.background = 'rgba(0,212,255,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)';
                    e.currentTarget.style.color = '#8899AA';
                    e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: 700, color: '#F0F4FF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#8899AA',
                      textDecoration: 'none', padding: 0, transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#F0F4FF'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#8899AA'; }}
                    aria-label={`Navigate to ${link.label}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: 700, color: '#F0F4FF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Our Courses
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {courses.map(course => (
                <li key={course}>
                  <button
                    onClick={() => scrollTo('courses')}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#8899AA',
                      padding: 0, transition: 'color 0.2s ease', textAlign: 'left',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#F0F4FF'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#8899AA'; }}
                  >
                    {course}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: 700, color: '#F0F4FF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Weekly AI Tips
            </h4>
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13.5px', color: '#8899AA', lineHeight: 1.7, marginBottom: '16px' }}>
              Free practical tips for jobseekers and business owners. Join 500+ readers.
            </p>
            {done ? (
              <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px', color: '#00D4FF', fontWeight: 600 }}>
                ✓ Subscribed! Welcome aboard.
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(10,20,40,0.8)', border: '1.5px solid rgba(0,212,255,0.15)', borderRadius: '8px', padding: '4px 4px 4px 12px' }}>
                  <Mail size={14} color="#5A6A7A" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    style={{
                      flex: 1, background: 'none', border: 'none', outline: 'none',
                      fontFamily: 'Plus Jakarta Sans', fontSize: '13px', color: '#F0F4FF',
                    }}
                    aria-label="Email for newsletter signup"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    style={{
                      width: 32, height: 32, borderRadius: '6px',
                      background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                      border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                  >
                    <ArrowRight size={14} color="#050D1A" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(0,212,255,0.06)',
          paddingTop: '28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px'
        }}>
          <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px', color: '#5A6A7A' }}>
            © 2026 AI Vision Consulting. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {legalLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: 'Plus Jakarta Sans', fontSize: '13px', color: '#5A6A7A',
                  textDecoration: 'none', transition: 'color 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#8899AA'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#5A6A7A'; }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
