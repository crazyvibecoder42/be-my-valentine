import { useState, useEffect, useRef } from 'react';

interface ButtonGrowthState {
  yesScale: number;
  noScale: number;
  isFull: boolean;
}

interface UseButtonGrowthOptions {
  enabled: boolean;
  onFull?: () => void;
}

/**
 * useButtonGrowth - Animates button growth/shrink at 60 FPS
 * Uses requestAnimationFrame for smooth, performant updates
 *
 * Growth formulas:
 * - Yes button: Exponential growth `1 + Math.pow(elapsedSeconds * 1.5, 1.8)`
 * - No button: Linear shrink `Math.max(0.3, 1 - (elapsedSeconds * 0.15))`
 *
 * Triggers callback when Yes button reaches ~20 scale (fills viewport)
 */
export function useButtonGrowth({
  enabled,
  onFull
}: UseButtonGrowthOptions): ButtonGrowthState {
  const [growthState, setGrowthState] = useState<ButtonGrowthState>({
    yesScale: 1,
    noScale: 1,
    isFull: false,
  });

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasTriggeredFullRef = useRef<boolean>(false);

  useEffect(() => {
    // Only run animation when enabled
    if (!enabled) {
      // Reset state when disabled
      setGrowthState({
        yesScale: 1,
        noScale: 1,
        isFull: false,
      });
      startTimeRef.current = null;
      hasTriggeredFullRef.current = false;
      return;
    }

    const updateGrowth = (timestamp: number) => {
      // Initialize start time on first frame
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      // Calculate elapsed time in seconds
      const elapsedSeconds = (timestamp - startTimeRef.current) / 1000;

      // Calculate scales using growth formulas
      const yesScale = 1 + Math.pow(elapsedSeconds * 1.5, 1.8);
      const noScale = Math.max(0.3, 1 - (elapsedSeconds * 0.15));

      // Check if Yes button has reached full screen (~20 scale)
      const isFull = yesScale >= 20;

      // Trigger callback once when reaching full screen
      if (isFull && !hasTriggeredFullRef.current && onFull) {
        hasTriggeredFullRef.current = true;
        onFull();
      }

      // Update state
      setGrowthState({
        yesScale,
        noScale,
        isFull,
      });

      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(updateGrowth);
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(updateGrowth);

    // Cleanup
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, onFull]);

  return growthState;
}
