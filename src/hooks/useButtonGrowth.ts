import { useState, useEffect, useRef } from 'react';

interface ButtonGrowthState {
  yesScale: number;
  noScale: number;
  isFull: boolean;
}

interface UseButtonGrowthOptions {
  stage: 'no-shrinking' | 'yes-growing' | 'other';
  onNoVanished?: () => void;
  onYesFull?: () => void;
}

/**
 * useButtonGrowth - Animates button growth/shrink at 60 FPS
 * Uses requestAnimationFrame for smooth, performant updates
 *
 * Sequential animation:
 * 1. 'no-shrinking': No button shrinks from 1 to 0 (2 seconds)
 * 2. 'yes-growing': Yes button grows exponentially to ~20 scale
 *
 * Triggers callbacks:
 * - onNoVanished: when No button reaches scale 0
 * - onYesFull: when Yes button reaches ~20 scale (fills viewport)
 */
export function useButtonGrowth({
  stage,
  onNoVanished,
  onYesFull
}: UseButtonGrowthOptions): ButtonGrowthState {
  const [growthState, setGrowthState] = useState<ButtonGrowthState>({
    yesScale: 1,
    noScale: 1,
    isFull: false,
  });

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasTriggeredNoVanishedRef = useRef<boolean>(false);
  const hasTriggeredYesFullRef = useRef<boolean>(false);

  useEffect(() => {
    // Reset state when not in animation stages
    if (stage === 'other') {
      setGrowthState({
        yesScale: 1,
        noScale: 1,
        isFull: false,
      });
      startTimeRef.current = null;
      hasTriggeredNoVanishedRef.current = false;
      hasTriggeredYesFullRef.current = false;
      return;
    }

    const updateGrowth = (timestamp: number) => {
      // Initialize start time on first frame
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      // Calculate elapsed time in seconds
      const elapsedSeconds = (timestamp - startTimeRef.current) / 1000;

      let yesScale = 1;
      let noScale = 1;
      let isFull = false;

      if (stage === 'no-shrinking') {
        // No button shrinks from 1 to 0 over 2 seconds
        noScale = Math.max(0, 1 - (elapsedSeconds / 2));
        yesScale = 1; // Yes button stays normal

        // Trigger callback when No button vanishes
        if (noScale === 0 && !hasTriggeredNoVanishedRef.current && onNoVanished) {
          hasTriggeredNoVanishedRef.current = true;
          onNoVanished();
        }
      } else if (stage === 'yes-growing') {
        // No button stays vanished
        noScale = 0;

        // Yes button grows exponentially
        yesScale = 1 + Math.pow(elapsedSeconds * 1.5, 1.8);

        // Check if Yes button has reached full screen (~20 scale)
        isFull = yesScale >= 20;

        // Trigger callback once when reaching full screen
        if (isFull && !hasTriggeredYesFullRef.current && onYesFull) {
          hasTriggeredYesFullRef.current = true;
          onYesFull();
        }
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
  }, [stage, onNoVanished, onYesFull]);

  return growthState;
}
