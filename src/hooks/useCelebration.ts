/**
 * useCelebration Hook
 * Manages celebration state and coordinates animation triggering
 */

import { useState, useCallback } from 'react';

interface UseCelebrationReturn {
  showCelebration: boolean;
  triggerCelebration: () => Promise<void>;
}

/**
 * Custom hook for managing celebration animations
 *
 * @returns {UseCelebrationReturn} Celebration state and trigger function
 *
 * Usage:
 * const { showCelebration, triggerCelebration } = useCelebration();
 *
 * // Trigger celebration
 * await triggerCelebration();
 *
 * // Conditionally render celebration screen
 * {showCelebration && <CelebrationAnimation />}
 */
export default function useCelebration(): UseCelebrationReturn {
  const [showCelebration, setShowCelebration] = useState(false);

  /**
   * Triggers the celebration sequence
   * Lazy loads canvas-confetti and displays celebration screen
   */
  const triggerCelebration = useCallback(async () => {
    console.log('DEBUG: triggerCelebration called');

    try {
      // Lazy load canvas-confetti to reduce initial bundle size
      // This dynamically imports the library only when needed
      const confettiModule = await import('canvas-confetti');
      console.log('DEBUG: canvas-confetti loaded successfully', confettiModule);

      // Show celebration screen
      // The CelebrationAnimation component will handle the actual
      // confetti triggering via celebrationConfig.ts
      setShowCelebration(true);
      console.log('DEBUG: showCelebration set to true');
    } catch (error) {
      console.error('CRITICAL: Failed to load canvas-confetti:', error);
      // Even if confetti fails, show the celebration screen
      setShowCelebration(true);
    }
  }, []);

  return {
    showCelebration,
    triggerCelebration,
  };
}
