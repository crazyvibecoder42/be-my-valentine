import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

/**
 * useMousePosition - Tracks global mouse position at 60 FPS
 * Uses requestAnimationFrame for smooth, performant updates
 */
export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const latestMousePositionRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Store latest mouse position
      latestMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const updateMousePosition = () => {
      // Update state with latest mouse position
      setMousePosition(latestMousePositionRef.current);

      // Schedule next update (60 FPS)
      animationFrameRef.current = requestAnimationFrame(updateMousePosition);
    };

    // Add mousemove listener
    window.addEventListener('mousemove', handleMouseMove);

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(updateMousePosition);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return mousePosition;
}
