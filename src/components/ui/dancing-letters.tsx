import { motion, useScroll, useTransform, type TargetAndTransition } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Adapted from the supplied DancingLetters component. Keep displacement bounded
// so the long headline remains legible and neighbouring lines do not collide.
const dances: TargetAndTransition[] = [
  { scaleX: [1, 1.18, .88, 1.06, 1], scaleY: [1, .88, 1.12, .96, 1] },
  { rotate: [0, 18, -8, 4, 0], y: [0, 4, -2, 0] },
  { scaleY: [1, .85, 1.1, 1], y: [0, 3, -10, 0] },
  { rotateX: [0, 35, -15, 6, 0] },
  { x: [0, -6, 4, -2, 0] },
  { rotate: [0, -5, 5, -2, 0], x: [0, -2, 2, 0] },
  { scale: [1, 1.15, 1] },
  { y: [0, -10, 0], scale: [1, 1.04, 1] },
];
const resting = { x: 0, y: 0, rotate: 0, rotateX: 0, scale: 1, scaleX: 1, scaleY: 1 };

function Letter({ letter, index, enabled }: { letter: string; index: number; enabled: boolean }) {
  const [active, setActive] = useState(false);
  useEffect(() => { if (!enabled) setActive(false); }, [enabled]);
  return <motion.span
    className="dancing-letter"
    initial={false}
    animate={!enabled ? resting : active ? { ...resting, ...dances[index % dances.length] } : resting}
    transition={{ duration: enabled ? .6 : 0, ease: 'easeOut' }}
    onPointerEnter={event => { if (enabled && event.pointerType === 'mouse') setActive(true); }}
    onPointerDown={() => { if (enabled) setActive(true); }}
    onAnimationComplete={() => setActive(false)}
  >{letter}</motion.span>;
}

export default function DancingLetters({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const lift = useTransform(scrollYProgress, [0, 1], [0, -12]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      let override = false;
      try { override = window.localStorage.getItem('avc-motion-preference') === 'enabled'; } catch { /* Private browsing can restrict storage. */ }
      setEnabled(!media.matches || override);
    };
    update();
    media.addEventListener('change', update);
    window.addEventListener('avc-motion-change', update);
    return () => { media.removeEventListener('change', update); window.removeEventListener('avc-motion-change', update); };
  }, []);
  let index = 0;
  return <motion.span ref={ref} className={`dancing-line ${className}`} aria-hidden="true" style={{ y: enabled ? lift : 0 }}>
    {text.split(/(\s+)/).map((word, wordIndex) => /^\s+$/.test(word) ? word : <motion.span
      className="dancing-word" key={wordIndex} initial={false}
      animate={enabled ? { rotateX: [12, 0], y: [6, 0] } : { rotateX: 0, y: 0 }}
      transition={{ duration: enabled ? .55 : 0, delay: enabled ? wordIndex * .035 : 0, ease: 'easeOut' }}
    >{Array.from(word).map(letter => { const letterIndex = index++; return <Letter key={letterIndex} letter={letter} index={letterIndex} enabled={enabled} />; })}</motion.span>)}
  </motion.span>;
}
