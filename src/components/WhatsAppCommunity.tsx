import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';
import { Reveal } from './Reveal';

const communityHighlights = [
  'Free to join, no commitment',
  'Daily AI tips and prompts',
  'Exclusive 30-Day AI Job Challenge',
];

export function WhatsAppCommunity() {
  return (
    <section
      id="whatsapp"
      className="section-wrapper relative overflow-hidden"
      style={{ padding: '8px 0 72px' }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 55% 70% at 50% 50%, rgba(0,255,136,0.16) 0%, rgba(0,255,136,0.04) 38%, transparent 75%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: '28px',
              border: '1px solid rgba(0,255,136,0.22)',
              borderLeft: '6px solid #00FF88',
              background:
                'linear-gradient(135deg, rgba(0,255,136,0.12) 0%, rgba(7,18,31,0.94) 32%, rgba(5,13,26,0.98) 100%)',
              boxShadow:
                '0 24px 80px rgba(0,255,136,0.08), inset 0 1px 0 rgba(255,255,255,0.03)',
              padding: 'clamp(28px, 4vw, 44px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '-20% auto auto 58%',
                width: '260px',
                height: '260px',
                borderRadius: '999px',
                background: 'rgba(0,255,136,0.08)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
              }}
            />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <span
                  className="badge badge-green"
                  style={{ marginBottom: '18px', display: 'inline-flex' }}
                >
                  Free AI Community
                </span>

                <h2
                  className="font-display text-3xl sm:text-4xl md:text-[2.7rem] font-bold tracking-tight text-[#F0F4FF]"
                  style={{ marginBottom: '16px', lineHeight: 1.05 }}
                >
                  Join Our Free AI Community on WhatsApp
                </h2>

                <p
                  className="text-base sm:text-lg text-[#A9B4C3]"
                  style={{ maxWidth: '720px', lineHeight: 1.75, marginBottom: '26px' }}
                >
                  Daily AI tips, live challenges, and resources for job seekers and business builders
                  {' '}
                  completely free.
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {communityHighlights.map(item => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-[rgba(0,255,136,0.14)] bg-[rgba(5,13,26,0.52)] px-4 py-3 backdrop-blur-sm"
                    >
                      <CheckCircle size={18} className="shrink-0 text-[#00FF88]" />
                      <span className="text-sm font-medium text-[#D9E3EE]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full max-w-md shrink-0">
                <div
                  style={{
                    borderRadius: '24px',
                    padding: '24px',
                    background: 'rgba(5,13,26,0.52)',
                    border: '1px solid rgba(0,255,136,0.18)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="flex items-center gap-4" style={{ marginBottom: '22px' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0,255,136,0.14)',
                        border: '1px solid rgba(0,255,136,0.22)',
                      }}
                    >
                      <MessageCircle size={26} color="#00FF88" />
                    </div>

                    <div>
                      <p
                        className="font-display text-lg font-bold text-[#F0F4FF]"
                        style={{ marginBottom: '4px' }}
                      >
                        Practical AI support
                      </p>
                      <p className="text-sm text-[#8899AA]" style={{ lineHeight: 1.6 }}>
                        Learn alongside other job seekers, creators, and business builders every day.
                      </p>
                    </div>
                  </div>

                  <motion.a
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://chat.whatsapp.com/BEGyAx68Y55Ik6d4BDxhxr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display"
                    style={{
                      width: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '16px 20px',
                      borderRadius: '14px',
                      textDecoration: 'none',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#04111D',
                      background: 'linear-gradient(135deg, #00FF88 0%, #00D875 100%)',
                      boxShadow: '0 18px 40px rgba(0,200,100,0.28)',
                    }}
                  >
                    Join the WhatsApp Community <ArrowRight size={18} />
                  </motion.a>

                  <p
                    className="text-center text-sm text-[#7C8898]"
                    style={{ marginTop: '14px' }}
                  >
                    Already 30+ members and growing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
