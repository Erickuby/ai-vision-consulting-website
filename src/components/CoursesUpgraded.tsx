import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Reveal } from './Reveal';
import { allCourses } from '../data/courses';

function CourseCard({ course, index }: { course: typeof allCourses[0]; index: number }) {
  const scrollTo = (href: string) => {
    document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="course-card"
        style={{ overflow: 'hidden', height: '100%' }}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', height: '176px' }}>
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={course.image}
            alt={course.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent, transparent, rgba(5,13,26,0.9))',
          }} />

          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 10px',
              borderRadius: '100px',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              fontFamily: 'Space Grotesk, sans-serif',
              background: `${course.color}22`,
              border: `1px solid ${course.color}55`,
              color: course.color,
            }}>
              {course.tag}
            </span>
          </div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{
              position: 'absolute', top: '12px', right: '12px',
              width: '32px', height: '32px', borderRadius: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              background: 'rgba(0,212,255,0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(0,212,255,0.3)',
            }}
          >
            <Play size={12} color="#00D4FF" fill="#00D4FF" />
          </motion.div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          <h3
            className="font-display"
            style={{
              fontSize: '17px', fontWeight: 700, color: '#F0F4FF',
              letterSpacing: '-0.01em', marginBottom: '4px',
            }}
          >
            {course.title}
          </h3>
          <p style={{ fontSize: '13px', color: '#8899AA', marginBottom: '16px' }}>
            {course.subtitle}
          </p>

          {/* Outcomes */}
          <ul style={{ listStyle: 'none', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {course.outcomes.slice(0, 3).map(o => (
              <li key={o} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle size={13} color={course.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '12.5px', color: '#8899AA' }}>{o}</span>
              </li>
            ))}
          </ul>

          {/* Meta */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            marginBottom: '16px', paddingTop: '14px',
            borderTop: '1px solid rgba(0,212,255,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={12} color="#8899AA" />
              <span style={{ fontSize: '12px', color: '#8899AA' }}>{course.duration}</span>
            </div>
          </div>

          {/* Price + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              className="font-display"
              style={{
                fontSize: '18px', fontWeight: 700,
                color: course.funded ? '#00C864' : '#F0F4FF',
              }}
            >
              {course.price}
            </span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('contact')}
              className="font-display"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '8px',
                color: '#00D4FF', fontSize: '13px', fontWeight: 600,
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))',
                border: '1px solid rgba(0,212,255,0.35)',
                cursor: 'pointer',
              }}
              aria-label={`Enrol in ${course.title}`}
            >
              Enrol Now <ArrowRight size={13} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function CoursesUpgraded() {
  const [activeTab, setActiveTab] = useState('individuals');

  const scrollTo = (href: string) => {
    document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const individualCourses = allCourses.filter(c => [1, 2, 3].includes(c.id));

  return (
    <section
      id="courses"
      className="section-wrapper relative"
      style={{ padding: '96px 24px' }}
    >
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,30,60,0.5) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal style={{ marginBottom: '64px', textAlign: 'center' }}>
          <span
            className="badge badge-cyan"
            style={{ marginBottom: '16px', display: 'inline-block' }}
          >
            Our Programmes
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] tracking-tight"
            style={{ marginBottom: '16px' }}
          >
            Courses built for <span className="gradient-text-cyan">real-world outcomes</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8899AA] max-w-xl mx-auto">
            Every programme is practical, outcome-focused, and taught by a working AI practitioner, not a classroom theorist.
          </p>
        </Reveal>

        {/* Tabs */}
        <Reveal
          delay={0.1}
          style={{
            display: 'flex', gap: '10px',
            justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          {[
            { id: 'individuals', label: 'For Individuals' },
            { id: 'businesses', label: 'For Businesses' },
            { id: 'funded', label: 'Funded Programmes' }
          ].map(t => (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(t.id)}
              className={`filter-btn ${activeTab === t.id ? 'active' : ''}`}
            >
              {t.label}
            </motion.button>
          ))}
        </Reveal>

        {/* Content Area */}
        <motion.div layout>
          {activeTab === 'individuals' && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                justifyContent: 'center',
              }}
            >
              {individualCourses.map((course, i) => (
                <div
                  key={course.id}
                  style={{ flex: '1 1 280px', maxWidth: '360px', minWidth: '280px' }}
                >
                  <CourseCard course={course} index={i} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'businesses' && (
            <Reveal>
              <div className="glass-panel p-8 md:p-12 text-center" style={{ maxWidth: '800px', margin: '0 auto', borderRadius: '24px', border: '1px solid rgba(0,212,255,0.2)' }}>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F0F4FF] mb-4">
                  Bespoke Corporate AI Training
                </h3>
                <p className="text-[#8899AA] text-lg mb-8 leading-relaxed">
                  Tailored AI training workshops and staff development programmes for teams of all sizes. Half-day, full-day, and multi-week programmes available. CPD-structured delivery.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-10">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#00D4FF]" />
                    <span className="text-[#8899AA]">Tailored to your industry and team size</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#00D4FF]" />
                    <span className="text-[#8899AA]">Delivered online, on-site or hybrid</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#00D4FF]" />
                    <span className="text-[#8899AA]">Includes team workbooks and resources</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#00D4FF]" />
                    <span className="text-[#8899AA]">Post-training support available</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo('contact')}
                  className="btn-primary glow-cyan mx-auto flex items-center justify-center p-3 rounded"
                >
                  Request a Corporate Quote <ArrowRight className="ml-2" size={16} />
                </motion.button>
              </div>
            </Reveal>
          )}

          {activeTab === 'funded' && (
            <Reveal>
              <div className="glass-panel p-8 md:p-12 text-center" style={{ maxWidth: '800px', margin: '0 auto', borderRadius: '24px', border: '1px solid rgba(0,255,136,0.2)' }}>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F0F4FF] mb-4">
                  Jobcentre and Community Funded Training
                </h3>
                <p className="text-[#8899AA] text-lg mb-8 leading-relaxed">
                  Partnering with Jobcentres, local authorities and community organisations to deliver AI skills training for jobseekers and underrepresented communities.
                </p>
                <div className="grid grid-cols-1 gap-4 text-left max-w-lg mx-auto mb-10">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#00FF88]" />
                    <span className="text-[#8899AA]">AI skills for employment and career change</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#00FF88]" />
                    <span className="text-[#8899AA]">Delivered in partnership with local organisations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#00FF88]" />
                    <span className="text-[#8899AA]">Suitable for Jobcentre referrals and DWP contracts</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo('contact')}
                  className="btn-primary mx-auto flex items-center justify-center p-3 rounded"
                  style={{ background: 'linear-gradient(135deg, #00FF88, #00CC6A)', color: '#050D1A' }}
                >
                  Enquire About Partnership <ArrowRight className="ml-2" size={16} />
                </motion.button>
              </div>
            </Reveal>
          )}
        </motion.div>
      </div>
    </section>
  );
}
