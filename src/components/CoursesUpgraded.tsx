import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star, ArrowRight, Play, CheckCircle } from 'lucide-react';
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
        className="course-card overflow-hidden"
      >
        {/* Image */}
        <div className="relative overflow-hidden h-44">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050D1A]/90" />
          
          <div className="absolute top-3 left-3">
            <span 
              className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider font-display"
              style={{
                background: `${course.color}22`,
                border: `1px solid ${course.color}55`,
                color: course.color,
              }}
            >
              {course.tag}
            </span>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background: 'rgba(0,212,255,0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(0,212,255,0.3)',
            }}
          >
            <Play size={12} color="#00D4FF" fill="#00D4FF" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-[17px] font-bold text-[#F0F4FF] mb-1 tracking-tight">
            {course.title}
          </h3>
          <p className="text-[13px] text-[#8899AA] mb-4">
            {course.subtitle}
          </p>

          {/* Outcomes */}
          <ul className="list-none mb-4 flex flex-col gap-1.5">
            {course.outcomes.slice(0, 3).map(o => (
              <li key={o} className="flex items-start gap-2">
                <CheckCircle size={13} color={course.color} className="flex-shrink-0 mt-0.5" />
                <span className="text-[12.5px] text-[#8899AA]">{o}</span>
              </li>
            ))}
          </ul>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-4 pt-3.5 border-t border-[rgba(0,212,255,0.08)]">
            <div className="flex items-center gap-1.5">
              <Clock size={12} color="#8899AA" />
              <span className="text-xs text-[#8899AA]">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={12} color="#8899AA" />
              <span className="text-xs text-[#8899AA]">{course.students} enrolled</span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <Star size={12} color="#FFD700" fill="#FFD700" />
              <span className="text-xs text-[#FFD700] font-semibold font-display">{course.rating}</span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <span 
              className="font-display text-lg font-bold"
              style={{ color: course.funded ? '#00C864' : '#F0F4FF' }}
            >
              {course.price}
            </span>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('contact')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#00D4FF] text-[13px] font-semibold font-display"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))',
                border: '1px solid rgba(0,212,255,0.35)',
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
    <section id="courses" className="section-wrapper py-24 px-6 relative">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,30,60,0.5) 0%, transparent 70%)',
        }}
      />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal className="mb-16 text-center">
          <span className="badge badge-cyan mb-4 inline-block">Our Programmes</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] tracking-tight mb-4">
            Courses built for <span className="gradient-text-cyan">real-world outcomes</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8899AA] max-w-xl mx-auto">
            Every programme is practical, outcome-focused, and taught by a working AI practitioner — not a classroom theorist.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.1} className="flex gap-2.5 justify-center flex-wrap mb-12">
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

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
