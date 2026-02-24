import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Reveal } from './Reveal';
import { testimonialsData as testimonials } from '../data/testimonials';

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFD700" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsUpgraded() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 px-6 relative z-10" aria-label="Testimonials">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal className="text-center mb-14">
          <span className="badge badge-cyan mb-4 inline-block">Real Results</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] tracking-tight">
            People whose lives have <span className="gradient-text-cyan">changed</span>
          </h2>
        </Reveal>

        {/* Carousel */}
        <Reveal delay={0.2}>
          <div
            className="overflow-hidden"
            ref={emblaRef}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="flex">
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 px-2"
                  role="group"
                  aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
                >
                  <div
                    className="rounded-3xl p-8 sm:p-12 md:p-14 max-w-4xl mx-auto"
                    style={{
                      background: 'rgba(10,20,40,0.7)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(0,212,255,0.12)',
                    }}
                  >
                    <Quote size={40} color="rgba(0,212,255,0.15)" className="mb-6" />

                    <p className="text-base sm:text-lg text-[#C8D8E8] leading-relaxed mb-8 italic min-h-[100px]">
                      "{t.quote}"
                    </p>

                    <div className="flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        style={{ border: '2px solid rgba(0,212,255,0.3)' }}
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <div className="font-display text-base font-bold text-[#F0F4FF]">{t.name}</div>
                        <div className="text-[13px] text-[#8899AA]">{t.role} · {t.location}</div>
                      </div>
                      <StarRating count={t.rating} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 max-w-4xl mx-auto px-2">
            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scrollTo(i)}
                  role="tab"
                  aria-selected={i === selectedIndex}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="h-2 rounded transition-all"
                  style={{
                    width: i === selectedIndex ? 24 : 8,
                    background: i === selectedIndex ? '#00D4FF' : 'rgba(0,212,255,0.2)',
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,212,255,0.18)' }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollPrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[#00D4FF] transition-colors"
                style={{
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.2)',
                }}
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,212,255,0.18)' }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[#00D4FF] transition-colors"
                style={{
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.2)',
                }}
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
