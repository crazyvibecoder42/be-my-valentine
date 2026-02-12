/**
 * MarbleButton - Glass button with elegant hover states
 * Supports primary and secondary variants
 */

import { motion } from 'framer-motion';
import { marbleTheme } from '../../styles/theme';

interface MarbleButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function MarbleButton({
  label,
  onClick,
  variant = 'primary',
  className = '',
}: MarbleButtonProps) {
  const isPrimary = variant === 'primary';

  const buttonStyles = {
    primary: {
      background: marbleTheme.glass.accent.background,
      border: marbleTheme.glass.accent.border,
      boxShadow: marbleTheme.glass.accent.boxShadow,
      color: marbleTheme.colors.charcoal,
    },
    secondary: {
      background: marbleTheme.glass.secondary.background,
      border: marbleTheme.glass.secondary.border,
      boxShadow: marbleTheme.glass.secondary.boxShadow,
      color: marbleTheme.colors.smoke,
    },
  };

  const currentStyle = buttonStyles[variant];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        boxShadow: isPrimary
          ? marbleTheme.shadows.glow
          : marbleTheme.shadows.md,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1], // cubic-bezier easing
      }}
      style={{
        background: currentStyle.background,
        backdropFilter: marbleTheme.glass.primary.backdropFilter,
        WebkitBackdropFilter: marbleTheme.glass.primary.backdropFilter,
        border: currentStyle.border,
        borderRadius: marbleTheme.borderRadius.full,
        boxShadow: currentStyle.boxShadow,
        color: currentStyle.color,
        padding: `${marbleTheme.spacing.md} ${marbleTheme.spacing.xl}`,
        fontSize: marbleTheme.typography.sizes.base,
        fontFamily: marbleTheme.typography.fonts.body,
        fontWeight: marbleTheme.typography.weights.semibold,
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        cursor: 'pointer',
        outline: 'none',
        minWidth: '140px',
      }}
      className={className}
    >
      {label}
    </motion.button>
  );
}
