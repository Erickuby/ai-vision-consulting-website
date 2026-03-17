import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Calendar, CheckCircle, AlertCircle, Linkedin, Instagram, Youtube } from 'lucide-react';
import { TikTokIcon } from './TikTokIcon';
import { Reveal } from './Reveal';

export function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', enquiryType: '', message: '', website: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = new URLSearchParams({
        name: form.name.trim(),
        email: form.email.trim(),
        enquiryType: form.enquiryType,
        message: form.message.trim(),
        website: form.website.trim(),
      });

      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: payload.toString(),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        throw new Error(result?.message || 'Something went wrong.');
      }

      setSubmitted(true);
      setForm({ name: '', email: '', enquiryType: '', message: '', website: '' });
    } catch {
      setError('Something went wrong. Please try emailing us directly at eric@aivisionconsulting.co.uk');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-wrapper" style={{ padding: '100px 24px 60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <Reveal className="text-center" style={{ marginBottom: '64px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '16px', display: 'inline-block' }}>Get In Touch</span>
          <h2 style={{
            fontFamily: 'Space Grotesk', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: '#F0F4FF', letterSpacing: '-0.02em', marginBottom: '16px'
          }}>
            Your AI journey starts with a <span className="gradient-text-gold">conversation</span>
          </h2>
          <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '17px', color: '#8899AA', maxWidth: '520px', margin: '0 auto' }}>
            Book your free 15-minute AI assessment or send us a message. No hard sell, just honest advice on where AI can help you most.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'start' }}>
          {/* Left: Info */}
          <Reveal>
            <div>
              {/* Calendly CTA */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,100,200,0.08))',
                  border: '1px solid rgba(0,212,255,0.2)',
                  borderRadius: '20px', padding: '32px', marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: 44, height: 44,
                    background: 'rgba(0,212,255,0.15)', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Calendar size={22} color="#00D4FF" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 700, color: '#F0F4FF' }}>
                      Free 15-Min AI Assessment
                    </div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', color: '#8899AA' }}>
                      Calendly booking · No commitment
                    </div>
                  </div>
                </div>
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#8899AA', marginBottom: '20px', lineHeight: 1.7 }}>
                  Spend 15 minutes with our AI specialist. We'll identify your biggest opportunity and map out your next step: a course, consulting, or a community programme.
                </p>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://calendly.com/ericcnwankwo/30min?month=2026-03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  aria-label="Book free AI assessment via Calendly"
                >
                  <Calendar size={16} />
                  Book on Calendly
                </motion.a>
              </motion.div>

              {/* Contact details */}
              <div style={{
                background: 'rgba(10,20,40,0.6)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(0,212,255,0.1)',
                borderRadius: '20px', padding: '28px',
              }}>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 700, color: '#F0F4FF', marginBottom: '20px' }}>
                  Contact Details
                </h3>
                {[
                  { icon: MapPin, label: 'Newcastle upon Tyne, UK', sub: 'Serving the UK · Remote & In-Person' },
                  { icon: Mail, label: 'eric@aivisionconsulting.co.uk', sub: 'We respond within 24 hours' },
                  { icon: Phone, label: '+447341183915', sub: 'Mon-Fri, 9am-6pm' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} style={{ display: 'flex', gap: '14px', marginBottom: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '9px',
                      background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      <Icon size={15} color="#00D4FF" />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#F0F4FF', fontWeight: 500 }}>{label}</div>
                      <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', color: '#8899AA' }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Follow */}
              <div style={{
                background: 'rgba(10,20,40,0.6)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(0,212,255,0.1)',
                borderRadius: '20px', padding: '24px', marginTop: '16px',
              }}>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 700, color: '#F0F4FF', marginBottom: '14px' }}>
                  Follow Us
                </h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[
                    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/eric-nwankwo/' },
                    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/aivisionconsulting/' },
                    { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@EricExplainsAI' },
                    { icon: TikTokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@aivisionconsultingltd' },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        width: 40, height: 40, borderRadius: '10px',
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
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Form */}
          <Reveal delay={0.15}>
            <div style={{
              background: 'rgba(10,20,40,0.7)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0,212,255,0.12)',
              borderRadius: '20px', padding: '36px',
            }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '40px 0' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                    style={{
                      width: 64, height: 64, borderRadius: '50%',
                      background: 'rgba(0,200,100,0.15)', border: '2px solid rgba(0,200,100,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 20px',
                    }}
                  >
                    <CheckCircle size={28} color="#00C864" />
                  </motion.div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '22px', fontWeight: 700, color: '#F0F4FF', marginBottom: '10px' }}>
                    Message Received!
                  </h3>
                  <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '15px', color: '#8899AA' }}>
                    We'll be in touch within 24 hours. In the meantime, why not browse our courses?
                  </p>
                  <button
                    onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-secondary"
                    style={{ marginTop: '24px' }}
                  >
                    Browse Courses
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      overflow: 'hidden',
                    }}
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      value={form.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 700, color: '#F0F4FF', marginBottom: '24px' }}>
                    Send us a message
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: 600, color: '#8899AA', display: 'block', marginBottom: '6px' }} htmlFor="name">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Jane Smith"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: 600, color: '#8899AA', display: 'block', marginBottom: '6px' }} htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="jane@example.com"
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: 600, color: '#8899AA', display: 'block', marginBottom: '6px' }} htmlFor="enquiryType">
                      I am a... *
                    </label>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      required
                      value={form.enquiryType}
                      onChange={handleChange}
                      className="form-input"
                      aria-required="true"
                    >
                      <option value="" disabled>Select your situation</option>
                      <option value="jobseeker">Jobseeker</option>
                      <option value="professional">Professional looking to upskill</option>
                      <option value="business">Small business owner</option>
                      <option value="corporate">Corporate / HR enquiry</option>
                      <option value="partner">Community or Jobcentre partner</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: 600, color: '#8899AA', display: 'block', marginBottom: '6px' }} htmlFor="message">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Tell us about your situation and what you're hoping to achieve with AI..."
                      style={{ resize: 'vertical' }}
                      aria-required="true"
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                        background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.25)',
                        borderRadius: '10px', padding: '12px 14px', marginBottom: '16px',
                      }}
                    >
                      <AlertCircle size={16} color="#FF6B6B" style={{ flexShrink: 0, marginTop: 1 }} />
                      <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px', color: '#FF9999', margin: 0 }}>
                        {error}
                      </p>
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                    disabled={loading}
                    aria-label="Send message"
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: 16, height: 16, border: '2px solid rgba(5,13,26,0.3)',
                          borderTopColor: '#050D1A', borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite', display: 'inline-block'
                        }} />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </motion.button>

                  <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', color: '#5A6A7A', textAlign: 'center', marginTop: '12px' }}>
                    By submitting, you agree to our <a href="#/privacy-policy" style={{ color: '#8899AA' }}>Privacy Policy</a>. We never share your data.
                  </p>

                  <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid rgba(0,212,255,0.1)', paddingTop: '24px' }}>
                    <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#8899AA', marginBottom: '16px' }}>
                      Or book a free 15-minute AI assessment call directly &rarr;
                    </p>
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://calendly.com/ericcnwankwo/30min?month=2026-03"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
                    >
                      <Calendar size={16} /> Book on Calendly
                    </motion.a>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
