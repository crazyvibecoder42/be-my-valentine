import { useState, useCallback, useEffect } from 'react';

/**
 * Stage definitions for the multi-stage Valentine experience
 * Flow: initial → no-shrinking → yes-growing → yes-popped → marble-screen → celebrating
 */
export type ValentineStage =
  | 'initial'           // Starting state with normal buttons
  | 'no-shrinking'      // No button shrinking and vanishing
  | 'yes-growing'       // Yes button growing (after No vanishes)
  | 'yes-popped'        // Yes button reached full size and popped
  | 'marble-screen'     // Showing marble second chance screen
  | 'celebrating';      // Final celebration screen

interface UseMultiStageValentineReturn {
  stage: ValentineStage;
  handleAllHeartsPoppedCallback: () => void;
  handleNoButtonVanishedCallback: () => void;
  handleYesButtonFullCallback: () => void;
  handleBalloonPopComplete: () => void;
  handleMarbleYesClick: () => void;
  handleMarbleNoClick: () => void;
}

/**
 * Central state machine for managing the multi-stage Valentine experience.
 * Coordinates transitions between initial state, button growth, balloon pop,
 * marble screen, and final celebration.
 *
 * @returns Stage state and transition callbacks
 */
export const useMultiStageValentine = (): UseMultiStageValentineReturn => {
  const [stage, setStage] = useState<ValentineStage>('initial');
  const [delayTimer, setDelayTimer] = useState<number | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (delayTimer) {
        clearTimeout(delayTimer);
      }
    };
  }, [delayTimer]);

  /**
   * Called when all floating hearts have been popped
   * Immediately starts No button shrinking animation
   */
  const handleAllHeartsPoppedCallback = useCallback(() => {
    console.log('[State Machine] All hearts popped, starting No button shrink');
    setStage('no-shrinking');
  }, []);

  /**
   * Called when No button finishes shrinking and vanishes
   * Starts Yes button growth animation
   */
  const handleNoButtonVanishedCallback = useCallback(() => {
    console.log('[State Machine] No button vanished, starting Yes button growth');
    setStage('yes-growing');
  }, []);

  /**
   * Called when Yes button reaches full screen size
   * Triggers balloon pop animation sequence
   */
  const handleYesButtonFullCallback = useCallback(() => {
    console.log('[State Machine] Yes button reached full size, triggering pop');
    setStage('yes-popped');
  }, []);

  /**
   * Called when balloon pop animation completes
   * Transitions to marble second chance screen
   */
  const handleBalloonPopComplete = useCallback(() => {
    console.log('[State Machine] Balloon pop complete, showing marble screen');
    setStage('marble-screen');
  }, []);

  /**
   * Called when user clicks Yes on marble screen
   * Transitions to final celebration
   */
  const handleMarbleYesClick = useCallback(() => {
    console.log('[State Machine] Marble Yes clicked, starting celebration');
    setStage('celebrating');
  }, []);

  /**
   * Called when user clicks No on marble screen
   * This is handled internally by MarbleScreen component (button swap)
   * No stage transition needed
   */
  const handleMarbleNoClick = useCallback(() => {
    console.log('[State Machine] Marble No clicked, buttons will swap');
    // No stage change - handled by component internally
  }, []);

  return {
    stage,
    handleAllHeartsPoppedCallback,
    handleNoButtonVanishedCallback,
    handleYesButtonFullCallback,
    handleBalloonPopComplete,
    handleMarbleYesClick,
    handleMarbleNoClick,
  };
};
