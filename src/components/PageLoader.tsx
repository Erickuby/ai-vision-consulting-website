import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';

const MESSAGES = [
  'Initialising AI…',
  'Loading neural network…',
  'Connecting nodes…',
  'Almost there…',
];

export function PageLoader({ onDone }: { onDone: () => void }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Cycle through messages
    const msgTimer = setInterval(() => {
      setMsgIndex(i => Math.min(i + 1, MESSAGES.length - 1));
    }, 450);

    // Animate progress bar
    const startTime = Date.now();
    const duration = 1800;
    const frame = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      setProgress(1 - Math.pow(1 - pct, 3));
      if (pct < 1) requestAnimationFrame(frame);
      else {
        setExiting(true);
        setTimeout(onDone, 600);
      }
    };
    requestAnimationFrame(frame);

    return () => clearInterval(msgTimer);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#050D1A',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
          }}
        >
          {/* Logo mark */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 72, height: 72,
              background: 'linear-gradient(135deg, #00D4FF, #0066AA)',
              borderRadius: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.2)',
            }}
          >
            <Brain size={36} color="#050D1A" />
          </motion.div>

          {/* Brand name */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700,
              color: '#F0F4FF', letterSpacing: '-0.01em',
            }}>
              AI Vision
            </div>
            <div style={{
              fontFamily: 'Space Grotesk', fontSize: 11, fontWeight: 400,
              color: '#00D4FF', letterSpacing: '0.12em', marginTop: 3,
            }}>
              CONSULTING LTD
            </div>
          </div>

          {/* Progress bar */}
          <div style={{
            width: 220, height: 2,
            background: 'rgba(0,212,255,0.12)',
            borderRadius: 2, overflow: 'hidden',
          }}>
            <motion.div
              style={{
                height: '100%',
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, #0066AA, #00D4FF)',
                borderRadius: 2,
                boxShadow: '0 0 8px rgba(0,212,255,0.8)',
              }}
            />
          </div>

          {/* Status message */}
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: 'Plus Jakarta Sans', fontSize: 13,
                color: '#5A6A7A', letterSpacing: '0.02em',
              }}
            >
              {MESSAGES[msgIndex]}
            </motion.p>
          </AnimatePresence>

          {/* Pulsing rings */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: 120 + i * 80,
                height: 120 + i * 80,
                borderRadius: '50%',
                border: '1px solid rgba(0,212,255,0.08)',
                pointerEvents: 'none',
              }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
