/**
 * MarbleGlassCard - Reusable glassmorphism card component
 * Features sophisticated glass effect with backdrop blur
 */

import { motion } from 'framer-motion';
import { marbleTheme } from '../../styles/theme';
import type { ReactNode } from 'react';

interface MarbleGlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function MarbleGlassCard({ children, className = '' }: MarbleGlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1], // Custom spring easing
      }}
      style={{
        background: marbleTheme.glass.primary.background,
        backdropFilter: `${marbleTheme.glass.primary.backdropFilter} saturate(180%)`,
        WebkitBackdropFilter: `${marbleTheme.glass.primary.backdropFilter} saturate(180%)`,
        border: marbleTheme.glass.primary.border,
        borderRadius: marbleTheme.borderRadius.xl,
        boxShadow: marbleTheme.glass.primary.boxShadow,
        padding: marbleTheme.spacing['3xl'],
        maxWidth: '600px',
        width: '90%',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
