import { useRef } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { buttonVariants } from '../../styles/animations';
import { useButtonEvasion } from '../../hooks/useButtonEvasion';

// Button dimensions for evasion calculations
const BUTTON_WIDTH = 120;
const BUTTON_HEIGHT = 50;

/**
 * NoButton - Small "No" button that evades the mouse cursor
 * Uses vector math and Framer Motion for smooth, playful evasion behavior
 * Tracks real DOM position for accurate distance calculations
 */
export default function NoButton() {
  // Create ref for button element to track real position
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Get evasion position from hook
  const position = useButtonEvasion({
    buttonRef,
    buttonSize: { width: BUTTON_WIDTH, height: BUTTON_HEIGHT },
  });

  return (
    <motion.button
      ref={buttonRef}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300,
      }}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      style={{
        width: `${BUTTON_WIDTH}px`,
        height: `${BUTTON_HEIGHT}px`,
        background: theme.colors.softPink,
        color: theme.colors.deepRose,
        fontSize: theme.typography.sizes.base,
        fontWeight: theme.typography.weights.medium,
        borderRadius: '25px',
        border: `2px solid ${theme.colors.deepRoseAlpha(0.2)}`,
        cursor: 'pointer',
        boxShadow: theme.shadows.sm,
        fontFamily: theme.typography.fonts.body,
        position: 'relative',
      }}
    >
      No
    </motion.button>
  );
}
