import { motion } from 'framer-motion';
import { Award, BookOpen, Globe, Target, User } from 'lucide-react';
import { Reveal } from './Reveal';

const credentials = [
  { icon: Award, label: 'CPD Accreditation in progress' },
  { icon: BookOpen, label: 'Community Educator' },
  { icon: Globe, label: 'Portfolio Manager & AI Specialist' },
  { icon: Target, label: '100+ Professionals Trained' },
];

export function AboutUpgraded() {
  return (
    <section id="about" className="section-wrapper" style={{ padding: '96px 24px' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image + particles */}
          <Reveal>
            <div className="relative flex justify-center">
              <div className="relative max-w-[380px] w-full">
                {/* Glow ring */}
                <motion.div
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -inset-5 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
                  }}
                />

                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl overflow-hidden relative z-10"
                  style={{
                    border: '1px solid rgba(0,212,255,0.2)',
                    boxShadow: '0 0 40px rgba(0,212,255,0.1)',
                  }}
                >
                  <div className="w-full bg-[#050D1A] flex items-center justify-center pt-28 pb-16">
                    <User size={120} color="rgba(0,212,255,0.4)" strokeWidth={1} style={{ opacity: 0.5 }} />
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      padding: '24px',
                      paddingTop: '32px',
                      background: 'linear-gradient(transparent, rgba(5,13,26,0.95))',
                    }}
                  >
                    <div className="font-display text-lg font-bold text-[#F0F4FF]">
                      Eric Nwankwo
                    </div>
                    <div className="text-[13px] text-[#00D4FF]" style={{ marginTop: '4px' }}>
                      Digital Portfolio Manager & AI Specialist
                    </div>
                  </div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-5 -right-5 z-20 rounded-xl"
                  style={{
                    padding: '12px',
                    background: 'rgba(10,20,40,0.9)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(0,212,255,0.25)',
                  }}
                >
                  <div className="font-display text-2xl font-bold text-[#00D4FF]">5★</div>
                  <div className="text-[11px] text-[#8899AA]">Client Rating</div>
                </motion.div>
              </div>
            </div>
          </Reveal>

          {/* Right: Story */}
          <div>
            <Reveal>
              <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-block' }}>Our Story</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] tracking-tight leading-tight" style={{ marginBottom: '24px' }}>
                No one left behind in the{' '}
                <span className="gradient-text-cyan">AI revolution.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-base text-[#8899AA] leading-relaxed" style={{ marginBottom: '32px' }}>
                AI Vision Consulting was founded to make artificial intelligence practical, accessible and profitable for everyone — from jobseekers in Newcastle to businesses across the UK. We believe AI is not just for Silicon Valley. It is for you, right here, right now.
              </p>
            </Reveal>

            {/* Credentials grid */}
            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-3">
                {credentials.map(({ icon: Icon, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{
                      borderColor: 'rgba(0,212,255,0.35)',
                      backgroundColor: 'rgba(0,212,255,0.06)',
                    }}
                    className="flex items-center gap-2.5 rounded-lg transition-colors"
                    style={{
                      padding: '12px',
                      background: 'rgba(10,20,40,0.6)',
                      border: '1px solid rgba(0,212,255,0.1)',
                    }}
                  >
                    <Icon size={15} color="#00D4FF" className="flex-shrink-0" />
                    <span className="text-[13px] text-[#C8D8E8] font-medium">{label}</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
