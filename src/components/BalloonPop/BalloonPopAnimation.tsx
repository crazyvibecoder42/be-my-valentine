import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { theme } from '../../styles/theme';

interface BalloonPopAnimationProps {
  onComplete: () => void;
}

/**
 * Plays the balloon pop sound from audio file
 * Reused from FloatingHearts.tsx (lines 19-29)
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
 * BalloonPopAnimation - Transition animation from grown Yes button to marble screen
 *
 * Animation sequence (600ms total):
 * 1. Button inflates slightly (scale 1.1, 200ms)
 * 2. Button pops with burst particles (8 particles radiating outward, 400ms)
 * 3. Play pop sound from /public/pop-sound.mp3
 * 4. Fade to marble background (400ms, delay 200ms)
 * 5. Call completion callback
 */
export default function BalloonPopAnimation({ onComplete }: BalloonPopAnimationProps) {
  // Play pop sound when animation starts (at 200ms - when pop begins)
  useEffect(() => {
    const timer = setTimeout(() => {
      playPopSound();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Call onComplete after full animation sequence (600ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 600);

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
      {/* Balloon (Yes button representation) */}
      <motion.div
        style={{
          fontSize: '120px',
          position: 'relative',
        }}
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: [1, 1.1, 1.1, 1.4, 0.2],
          opacity: [1, 1, 1, 1, 0],
        }}
        transition={{
          duration: 0.6,
          times: [0, 0.33, 0.33, 0.67, 1],
          ease: [0.65, 0, 0.35, 1],
        }}
      >
        🎈
      </motion.div>

      {/* Burst particles (8 particles radiating at 45-degree intervals) */}
      {[...Array(8)].map((_, i) => {
        const angle = i * 45; // 0, 45, 90, 135, 180, 225, 270, 315 degrees
        const rad = (angle * Math.PI) / 180;
        const distance = 100;

        return (
          <motion.div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              fontSize: '36px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 1,
            }}
            animate={{
              x: Math.cos(rad) * distance,
              y: Math.sin(rad) * distance,
              opacity: [0, 1, 0],
              scale: [1, 1.2, 0.5],
              rotate: 360,
            }}
            transition={{
              duration: 0.4,
              delay: 0.2, // Start when pop begins
              ease: 'easeOut',
            }}
          >
            💕
          </motion.div>
        );
      })}

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
          duration: 0.4,
          delay: 0.4, // Start after pop completes (200ms inflate + 200ms delay)
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
