/**
 * CelebrationScreen - Full viewport overlay with animated gradient and text
 * Displays "You will get your gift soon" with spectacular styling
 */

import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { celebrationVariants, textRevealVariants } from '../../styles/animations';

/**
 * Sparkle component - animated gold sparkles around text
 */
const Sparkle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: '20px',
      height: '20px',
      color: theme.colors.gold,
      fontSize: '20px',
      pointerEvents: 'none',
    }}
  >
    ✨
  </motion.div>
);

export default function CelebrationScreen() {
  const message = 'You will get your gift soon';
  const letters = message.split('');

  // Sparkle positions around the text
  const sparklePositions = [
    { x: 10, y: 20, delay: 0 },
    { x: 90, y: 25, delay: 0.3 },
    { x: 15, y: 70, delay: 0.6 },
    { x: 85, y: 75, delay: 0.9 },
    { x: 50, y: 10, delay: 1.2 },
    { x: 50, y: 85, delay: 1.5 },
    { x: 5, y: 45, delay: 0.2 },
    { x: 95, y: 50, delay: 0.5 },
  ];

  return (
    <motion.div
      variants={celebrationVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: theme.zIndex.celebration,
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background with pulse effect */}
      <motion.div
        animate={{
          background: [
            `linear-gradient(135deg, ${theme.colors.magenta} 0%, ${theme.colors.deepRose} 50%, ${theme.colors.gold} 100%)`,
            `linear-gradient(135deg, ${theme.colors.deepRose} 0%, ${theme.colors.gold} 50%, ${theme.colors.magenta} 100%)`,
            `linear-gradient(135deg, ${theme.colors.gold} 0%, ${theme.colors.magenta} 50%, ${theme.colors.deepRose} 100%)`,
            `linear-gradient(135deg, ${theme.colors.magenta} 0%, ${theme.colors.deepRose} 50%, ${theme.colors.gold} 100%)`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* Gold glow overlay */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '60%',
          background: theme.gradients.glow,
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Main text container */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: theme.spacing['2xl'],
        }}
      >
        {/* Letter-by-letter animated text */}
        <motion.h1
          style={{
            fontFamily: theme.typography.fonts.heading,
            fontSize: theme.typography.sizes['4xl'],
            color: 'white',
            textShadow: theme.shadows.goldGlow,
            margin: 0,
            lineHeight: 1.4,
            letterSpacing: '2px',
          }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 1.5 + index * 0.05, // Start after 1.5s, stagger 50ms
                duration: 0.3,
              }}
              style={{
                display: letter === ' ' ? 'inline' : 'inline-block',
                whiteSpace: 'pre',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Sparkles around the text */}
        {sparklePositions.map((pos, index) => (
          <Sparkle key={index} delay={pos.delay} x={pos.x} y={pos.y} />
        ))}
      </div>

      {/* Additional floating hearts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: theme.spacing['4xl'],
          fontSize: theme.typography.sizes['3xl'],
          zIndex: 2,
        }}
      >
        <motion.span
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          💝
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
