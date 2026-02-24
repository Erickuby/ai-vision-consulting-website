import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past hero (roughly 100vh)
      if (window.scrollY > window.innerHeight * 0.8 && !dismissed) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          style={{ pointerEvents: 'all' }}
        >
          {/* Dismiss button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDismissed(true)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
            aria-label="Dismiss floating CTA"
          >
            <X size={16} />
          </motion.button>

          {/* Main CTA */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(255,215,0,0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToContact}
            className="px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              color: '#050D1A',
              fontFamily: 'Space Grotesk',
            }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles size={16} />
            </motion.div>
            Book Free Assessment
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
