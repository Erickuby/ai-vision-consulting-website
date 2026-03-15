import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function AnnouncementBanner() {
  return (
    <section
      className="section-wrapper relative z-20 mt-[70px] w-full border-y border-[rgba(255,215,0,0.28)]"
      style={{
        background:
          'linear-gradient(90deg, rgba(255,186,56,0.92) 0%, rgba(255,215,0,0.88) 48%, rgba(255,191,71,0.92) 100%)',
        boxShadow: '0 10px 40px rgba(255,191,71,0.14)',
      }}
    >
      <div className="mx-auto flex min-h-[52px] max-w-6xl flex-col items-center justify-center gap-2 px-4 py-3 text-center sm:px-6 md:flex-row md:gap-4 md:py-2">
        <p
          className="font-display text-sm font-bold tracking-tight text-[#04111D] sm:text-[15px]"
          style={{ lineHeight: 1.3 }}
        >
          🚀 30-Day AI Job Challenge is LIVE — Free to join. Land your next job using AI.
        </p>

        <motion.a
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="#whatsapp"
          className="font-display inline-flex items-center gap-2 rounded-full border border-[rgba(4,17,29,0.16)] bg-[rgba(4,17,29,0.92)] px-4 py-2 text-sm font-bold text-[#FFD76C] no-underline transition-colors duration-200 hover:bg-[#04111D]"
        >
          Join Free <ArrowRight size={16} />
        </motion.a>
      </div>
    </section>
  );
}
