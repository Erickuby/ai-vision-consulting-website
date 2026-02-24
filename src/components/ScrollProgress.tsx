import { useScroll, useSpring, motion } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: 'left center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, #0066AA, #00D4FF, #FFD700)',
        zIndex: 9998,
        boxShadow: '0 0 8px rgba(0,212,255,0.6)',
        pointerEvents: 'none',
      }}
    />
  );
}
