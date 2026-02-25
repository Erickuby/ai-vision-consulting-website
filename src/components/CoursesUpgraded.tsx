import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Reveal } from './Reveal';
import { allCourses, courseFilters as filters } from '../data/courses';

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
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? allCourses
    : allCourses.filter(c => c.category === filter || (filter === 'funded' && c.funded));

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
            Every programme is practical, outcome-focused, and taught by a working AI practitioner — not a classroom theorist.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal
          delay={0.1}
          style={{
            display: 'flex', gap: '10px',
            justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          {filters.map(f => (
            <motion.button
              key={f.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.key)}
              className={`filter-btn ${filter === f.key ? 'active' : ''}`}
              aria-pressed={filter === f.key}
            >
              {f.label}
            </motion.button>
          ))}
        </Reveal>

        {/* Card grid — flex + justify-center so partial rows centre-align */}
        <motion.div
          layout
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'center',
          }}
        >
          {filtered.map((course, i) => (
            <div
              key={course.id}
              style={{ flex: '1 1 280px', maxWidth: '360px', minWidth: '280px' }}
            >
              <CourseCard course={course} index={i} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
