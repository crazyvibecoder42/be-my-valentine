import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { theme } from '../../styles/theme';
import { centerExplosion, sideCannons, sparkleBurst } from '../../utils/celebrationConfig';

interface BalloonPopAnimationProps {
  onComplete: () => void;
}

/**
 * Plays the balloon pop sound from audio file
 */
const playPopSound = () => {
  try {
    const audio = new Audio('/pop-sound.mp3');
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch(error => {
      console.warn('Failed to play pop sound:', error);
    });
  } catch (error) {
    console.warn('Audio playback not supported:', error);
  }
};

/**
 * BalloonPopAnimation - Spectacular transition from grown Yes button to marble screen
 *
 * Animation sequence (1200ms total):
 * 1. Play pop sound immediately
 * 2. Full-screen confetti explosion (700+ particles, multi-layer bursts)
 *    - Center explosion (immediate)
 *    - Side cannons (100ms delay)
 *    - Sparkle burst (300ms delay)
 * 3. Fade to marble background (600ms, delay 800ms)
 * 4. Call completion callback
 */
export default function BalloonPopAnimation({ onComplete }: BalloonPopAnimationProps) {
  // Trigger spectacular full-screen glitter explosion
  useEffect(() => {
    playPopSound();

    // Layer 1: Center explosion (immediate)
    centerExplosion();

    // Layer 2: Side cannons (100ms delay)
    setTimeout(sideCannons, 100);

    // Layer 3: Sparkle burst (300ms delay)
    setTimeout(sparkleBurst, 300);
  }, []);

  // Call onComplete after full glitter sequence (1200ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1200); // Increased from 600 to allow glitter to settle

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: theme.zIndex.celebration,
        pointerEvents: 'none',
      }}
    >
      {/* Fade to marble background overlay */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: theme.gradients.background,
          zIndex: -1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.8, // Start fade after glitter peaks
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
