/**
 * MarbleSecondChanceScreen - Full viewport overlay for second chance prompt
 * Features marble gradient background with glassmorphism card and button swap
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import { marbleTheme } from '../../styles/theme';
import MarbleGlassCard from './MarbleGlassCard';
import MarbleButton from './MarbleButton';

interface MarbleSecondChanceScreenProps {
  onYesClick: () => void;
  onNoClick: () => void;
}

export default function MarbleSecondChanceScreen({
  onYesClick,
  onNoClick,
}: MarbleSecondChanceScreenProps) {
  const [buttonPosition, setButtonPosition] = useState<'normal' | 'swapped'>('normal');

  const handleNoHover = () => {
    // Swap button positions when hovering over No
    setButtonPosition((prev) => (prev === 'normal' ? 'swapped' : 'normal'));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
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
        zIndex: marbleTheme.zIndex.celebration,
        overflow: 'hidden',
      }}
    >
      {/* Marble gradient background */}
      <motion.div
        animate={{
          background: [
            marbleTheme.gradients.marble,
            marbleTheme.gradients.opal,
            marbleTheme.gradients.subtle,
            marbleTheme.gradients.marble,
          ],
        }}
        transition={{
          duration: 8,
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

      {/* Subtle veining overlay */}
      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(45deg, transparent 40%, ${marbleTheme.colors.charcoalAlpha(0.1)} 50%, transparent 60%)`,
          backgroundSize: '200% 200%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Main glass card */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <MarbleGlassCard>
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: marbleTheme.typography.fonts.heading,
              fontSize: marbleTheme.typography.sizes['3xl'],
              color: marbleTheme.colors.charcoal,
              textAlign: 'center',
              marginBottom: marbleTheme.spacing.xl,
              lineHeight: marbleTheme.typography.lineHeights.tight,
              fontWeight: marbleTheme.typography.weights.bold,
            }}
          >
            Please Please be my valentine again
          </motion.h1>

          {/* Buttons container with swap functionality */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: marbleTheme.spacing.lg,
              marginTop: marbleTheme.spacing['2xl'],
            }}
          >
            {/* Yes Button */}
            <motion.div
              layout
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              style={{
                order: buttonPosition === 'normal' ? 1 : 2,
              }}
            >
              <MarbleButton
                label="Yes"
                onClick={onYesClick}
                variant="primary"
              />
            </motion.div>

            {/* No Button */}
            <motion.div
              layout
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              onHoverStart={handleNoHover}
              style={{
                order: buttonPosition === 'normal' ? 2 : 1,
              }}
            >
              <MarbleButton
                label="No"
                onClick={onNoClick}
                variant="secondary"
              />
            </motion.div>
          </motion.div>

          {/* Subtle hint text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              fontFamily: marbleTheme.typography.fonts.body,
              fontSize: marbleTheme.typography.sizes.sm,
              color: marbleTheme.colors.textMuted,
              textAlign: 'center',
              marginTop: marbleTheme.spacing.lg,
              fontStyle: 'italic',
              letterSpacing: '0.5px',
            }}
          >
            Choose wisely...
          </motion.p>
        </MarbleGlassCard>
      </div>
    </motion.div>
  );
}
