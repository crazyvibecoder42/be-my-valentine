/**
 * CelebrationAnimation - Orchestrates multi-layer celebration
 * Coordinates confetti, screen animations, and continuous effects
 */

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CelebrationScreen from './CelebrationScreen';
import { triggerSpectacularCelebration } from '../../utils/celebrationConfig';

/**
 * Main celebration animation orchestrator
 * Executes multi-layer celebration sequence:
 * - Layer 1: Confetti bursts (immediate)
 * - Layer 2: Screen scale-in (800ms)
 * - Layer 3: Text reveal letter-by-letter (1.5s, 50ms stagger)
 * - Layer 4: Continuous sparkle effects
 */
export default function CelebrationAnimation() {
  useEffect(() => {
    // Layer 1: Trigger spectacular confetti sequence immediately
    triggerSpectacularCelebration();

    // Layers 2-4 are handled by CelebrationScreen component
    // with Framer Motion animations:
    // - Scale-in animation starts immediately (celebrationVariants)
    // - Text reveal starts at 1.5s with 50ms stagger (textRevealVariants)
    // - Sparkles animate continuously throughout (sparkleVariants)

    console.log('DEBUG: Celebration animation sequence initiated');

    // Cleanup function (if needed for stopping animations)
    return () => {
      console.log('DEBUG: Celebration animation cleanup');
    };
  }, []);

  return (
    <AnimatePresence>
      <CelebrationScreen />
    </AnimatePresence>
  );
}
