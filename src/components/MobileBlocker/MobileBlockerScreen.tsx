/**
 * MobileBlockerScreen - Full viewport overlay for mobile/tablet users
 * Displays a beautiful message encouraging users to open on desktop
 */

import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { celebrationVariants, textRevealVariants } from '../../styles/animations';

/**
 * Sparkle component - animated gold sparkles around content
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

export default function MobileBlockerScreen() {
  const mainMessage = 'Great Rewards Await You';
  const secondaryMessage = 'But you need to open this in a browser on your Desktop';
  const mainLetters = mainMessage.split('');

  // Sparkle positions around the content
  const sparklePositions = [
    { x: 10, y: 15, delay: 0 },
    { x: 90, y: 20, delay: 0.3 },
    { x: 15, y: 75, delay: 0.6 },
    { x: 85, y: 80, delay: 0.9 },
    { x: 50, y: 5, delay: 1.2 },
    { x: 50, y: 90, delay: 1.5 },
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
        zIndex: theme.zIndex.mobileBlocker,
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background with color cycling */}
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

      {/* Gold glow overlay with breathing effect */}
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

      {/* Main content container */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: theme.spacing['2xl'],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: theme.spacing.xl,
        }}
      >
        {/* Desktop icon with pulse animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: [1, 1.08, 1],
          }}
          transition={{
            opacity: { delay: 0.5, duration: 0.5 },
            scale: {
              delay: 0.5,
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          style={{
            fontSize: theme.typography.sizes['5xl'],
            marginBottom: theme.spacing.md,
          }}
        >
          💻
        </motion.div>

        {/* Main message - letter-by-letter reveal */}
        <motion.h1
          style={{
            fontFamily: theme.typography.fonts.heading,
            fontSize: theme.typography.sizes['3xl'],
            color: 'white',
            textShadow: theme.shadows.goldGlow,
            margin: 0,
            lineHeight: 1.4,
            letterSpacing: '2px',
          }}
        >
          {mainLetters.map((letter, index) => (
            <motion.span
              key={index}
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 1.0 + index * 0.05, // Start after 1s, stagger 50ms
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

        {/* Secondary message - fade in as whole block */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 2.5,
            duration: 0.8,
          }}
          style={{
            fontFamily: theme.typography.fonts.body,
            fontSize: theme.typography.sizes.xl,
            color: 'white',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            margin: 0,
            maxWidth: '600px',
            lineHeight: 1.6,
            fontWeight: theme.typography.weights.medium,
          }}
        >
          {secondaryMessage}
        </motion.p>

        {/* Sparkles around the content */}
        {sparklePositions.map((pos, index) => (
          <Sparkle key={index} delay={pos.delay} x={pos.x} y={pos.y} />
        ))}
      </div>
    </motion.div>
  );
}
