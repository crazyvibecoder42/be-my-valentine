import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { buttonVariants } from '../../styles/animations';

interface YesButtonProps {
  onClick: () => void;
}

/**
 * YesButton - Large "Yes I will be your valentine" button
 * Features hover effects, breathing animation, and celebration trigger
 */
export default function YesButton({ onClick }: YesButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      variants={buttonVariants}
      initial="initial"
      animate="pulse"
      whileHover="hover"
      whileTap="tap"
      style={{
        width: '300px',
        height: '80px',
        background: theme.gradients.yesButton,
        color: 'white',
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.semibold,
        borderRadius: '40px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: theme.shadows.lg,
        fontFamily: theme.typography.fonts.body,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow effect on hover */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          background: theme.gradients.glow,
          opacity: 0,
          pointerEvents: 'none',
        }}
        whileHover={{
          opacity: 0.6,
          scale: 1.5,
        }}
        transition={{
          duration: 0.3,
        }}
      />

      <span style={{ position: 'relative', zIndex: 1 }}>
        Yes I will be your valentine ❤️
      </span>
    </motion.button>
  );
}
