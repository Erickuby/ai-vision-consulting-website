import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Reveal } from './Reveal';

const audienceColumns = [
  [
    'Nigerians and Africans in the UK navigating the job market',
    'Job seekers who want an edge in a competitive market',
    'Career changers starting fresh and using AI as their advantage',
    'Professionals wanting to stay relevant and use AI at work',
  ],
  [
    'Entrepreneurs and side-hustlers building with AI tools',
    'Small business owners wanting to automate and grow',
    'HR teams and companies wanting to upskill their staff',
    'Community organisations looking for practical AI training',
  ],
];

export function WhoThisIsFor() {
  return (
    <section
      className="section-wrapper relative overflow-hidden"
      style={{ padding: '0 24px 92px' }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 55% 60% at 50% 35%, rgba(0,255,136,0.08) 0%, rgba(0,255,136,0.03) 38%, transparent 75%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <Reveal className="text-center" style={{ marginBottom: '48px' }}>
          <span
            className="badge badge-green"
            style={{ display: 'inline-flex', marginBottom: '16px' }}
          >
            Who This Is For
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] tracking-tight"
            style={{ marginBottom: '16px' }}
          >
            Who AI Vision Consulting Is For
          </h2>
          <p className="text-base sm:text-lg text-[#8899AA] max-w-3xl mx-auto">
            We built this for people who want to use AI in practical ways to move forward.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {audienceColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="grid gap-4">
              {column.map((item, itemIndex) => (
                <Reveal
                  key={item}
                  delay={columnIndex * 0.08 + itemIndex * 0.05}
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="flex items-start gap-3 rounded-2xl"
                    style={{
                      padding: '18px 20px',
                      background: 'rgba(10,20,40,0.74)',
                      border: '1px solid rgba(0,255,136,0.12)',
                      boxShadow: '0 18px 46px rgba(0,0,0,0.18)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                  >
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        flexShrink: 0,
                        borderRadius: '999px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0,255,136,0.12)',
                        border: '1px solid rgba(0,255,136,0.18)',
                        marginTop: '2px',
                      }}
                    >
                      <CheckCircle size={16} color="#00FF88" />
                    </div>

                    <p
                      className="text-sm sm:text-[15px] text-[#D9E4EF]"
                      style={{ lineHeight: 1.7 }}
                    >
                      {item}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
