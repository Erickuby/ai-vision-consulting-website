import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Building2, Target, TrendingUp } from 'lucide-react';
import { Reveal } from './Reveal';

const journeySteps = [
  {
    step: 'Step 1',
    title: 'Get the Job',
    description:
      'Use AI to write your CV, optimise your LinkedIn, find the right roles and land interviews.',
    icon: Target,
    color: '#FFD700',
  },
  {
    step: 'Step 2',
    title: 'Excel at the Job',
    description:
      'Use AI to learn your new role faster, upskill on the job and stand out from day one.',
    icon: Briefcase,
    color: '#00D4FF',
  },
  {
    step: 'Step 3',
    title: 'Grow Your Career or Business',
    description:
      'Master AI tools, automate your work and build skills that open new income streams.',
    icon: TrendingUp,
    color: '#00FF88',
  },
  {
    step: 'Step 4',
    title: 'Go Corporate or Consult',
    description:
      'Train teams, advise businesses and charge for your AI expertise.',
    icon: Building2,
    color: '#FF8A3D',
  },
];

export function AIJourney() {
  return (
    <section
      className="section-wrapper relative overflow-hidden"
      style={{ padding: '12px 24px 88px' }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 55% 55% at 50% 40%, rgba(0,212,255,0.08) 0%, rgba(0,212,255,0.03) 40%, transparent 75%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <Reveal style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span
            className="badge badge-cyan"
            style={{ display: 'inline-flex', marginBottom: '16px' }}
          >
            Your AI Journey
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] tracking-tight"
            style={{ marginBottom: '16px' }}
          >
            Your AI Journey — From Job Seeker to AI Leader
          </h2>
          <p className="text-base sm:text-lg text-[#8899AA] max-w-2xl mx-auto">
            Wherever you're starting, there's a clear path forward.
          </p>
        </Reveal>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-4">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Fragment key={step.title}>
                <Reveal
                  delay={index * 0.08}
                  className="flex-1"
                  style={{ display: 'flex' }}
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    className="w-full"
                    style={{
                      minHeight: '100%',
                      borderRadius: '24px',
                      padding: '28px 24px',
                      background:
                        'linear-gradient(180deg, rgba(10,20,40,0.88) 0%, rgba(7,15,30,0.92) 100%)',
                      border: `1px solid ${step.color}25`,
                      boxShadow: '0 22px 60px rgba(0,0,0,0.22)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                    }}
                  >
                    <div
                      className="flex items-center justify-between"
                      style={{ marginBottom: '24px' }}
                    >
                      <span
                        className="font-display"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '42px',
                          height: '42px',
                          borderRadius: '999px',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#04111D',
                          background: step.color,
                          boxShadow: `0 10px 24px ${step.color}33`,
                        }}
                      >
                        {index + 1}
                      </span>

                      <div
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `${step.color}14`,
                          border: `1px solid ${step.color}2F`,
                        }}
                      >
                        <Icon size={24} color={step.color} />
                      </div>
                    </div>

                    <p
                      className="font-display"
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: step.color,
                        marginBottom: '10px',
                      }}
                    >
                      {step.step}
                    </p>

                    <h3
                      className="font-display text-xl sm:text-2xl font-bold text-[#F0F4FF]"
                      style={{ lineHeight: 1.15, marginBottom: '14px' }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="text-sm sm:text-[15px] text-[#98A7B8]"
                      style={{ lineHeight: 1.75 }}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                </Reveal>

                {index < journeySteps.length - 1 && (
                  <div
                    className="hidden lg:flex items-center justify-center"
                    aria-hidden="true"
                    style={{ color: step.color, minWidth: '24px' }}
                  >
                    <ArrowRight size={24} />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
