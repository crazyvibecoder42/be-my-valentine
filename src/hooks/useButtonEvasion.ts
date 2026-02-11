import { useState, useEffect, type RefObject } from 'react';
import { useMousePosition } from './useMousePosition';
import {
  calculateDistance,
  calculateEscapeVector,
  constrainToViewport,
  EVASION_RADIUS,
} from '../utils/evasionLogic';

interface ButtonPosition {
  x: number;
  y: number;
}

interface ButtonSize {
  width: number;
  height: number;
}

interface UseButtonEvasionOptions {
  buttonRef: RefObject<HTMLButtonElement | null>;
  buttonSize: ButtonSize;
  evasionRadius?: number;
}

/**
 * useButtonEvasion - Main hook for button evasion behavior
 * Calculates button position to evade mouse cursor using vector math
 * Uses getBoundingClientRect() to get accurate screen position
 *
 * @param options - Configuration for button evasion
 * @returns Current button position transform offset for animation
 */
export function useButtonEvasion({
  buttonRef,
  buttonSize,
  evasionRadius = EVASION_RADIUS,
}: UseButtonEvasionOptions): ButtonPosition {
  const mousePosition = useMousePosition();
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>({ x: 0, y: 0 });

  useEffect(() => {
    // Get button element reference
    if (!buttonRef.current) return;

    // Get actual screen position of button using getBoundingClientRect
    const rect = buttonRef.current.getBoundingClientRect();

    // Calculate button center position (real screen coordinates)
    const buttonCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    // Calculate distance from mouse to button center
    const distance = calculateDistance(mousePosition, buttonCenter);

    // Only evade if mouse is within evasion radius
    if (distance < evasionRadius) {
      // Calculate escape vector (new center position in screen coordinates)
      const escapedCenter = calculateEscapeVector(
        mousePosition,
        buttonCenter,
        evasionRadius
      );

      // Convert center position back to top-left corner
      const escapedTopLeft = {
        x: escapedCenter.x - buttonSize.width / 2,
        y: escapedCenter.y - buttonSize.height / 2,
      };

      // Constrain to viewport to prevent button from escaping screen
      const constrainedTopLeft = constrainToViewport(escapedTopLeft, buttonSize);

      // Calculate transform offset from original position
      // This is the offset that Framer Motion will apply
      const transformOffset = {
        x: constrainedTopLeft.x - rect.left,
        y: constrainedTopLeft.y - rect.top,
      };

      // Update button position (as transform offset)
      setButtonPosition(transformOffset);
    }
    // Note: buttonSize and evasionRadius omitted from deps - they're constants
    // Including them would cause infinite re-renders due to object literal recreation
  }, [mousePosition, buttonRef]);

  return buttonPosition;
}
