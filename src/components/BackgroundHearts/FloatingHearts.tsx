import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { theme } from '../../styles/theme';

interface Heart {
  id: number;
  size: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
  opacity: number;
}

/**
 * FloatingHearts - Ambient heart particles in the background
 * Creates 20 randomly positioned hearts with gentle floating animation
 */
export default function FloatingHearts() {
  // Generate random hearts - memoized to prevent re-generation on re-renders
  const hearts = useMemo<Heart[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 40 + 20, // 20-60px
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4, // 4-7s
      opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
    }));
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: theme.zIndex.background,
        overflow: 'hidden',
      }}
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          style={{
            position: 'absolute',
            left: heart.left,
            top: heart.top,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 8, 0, -8, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: heart.delay,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
