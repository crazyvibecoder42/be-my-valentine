import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { theme } from '../../styles/theme';

interface Heart {
  id: number;
  size: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
  opacity: number;
  uniqueKey: string; // For AnimatePresence tracking
}

interface FloatingHeartsProps {
  onAllHeartsPoppedCallback?: () => void;
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
 * FloatingHearts - Ambient heart particles in the background
 * Creates 20 randomly positioned hearts with gentle floating animation
 * One heart pops like a balloon every 4 seconds with sound (disappears permanently)
 *
 * @param onAllHeartsPoppedCallback - Called when all hearts have been popped
 */
export default function FloatingHearts({ onAllHeartsPoppedCallback }: FloatingHeartsProps = {}) {
  // Generate initial hearts
  const [hearts, setHearts] = useState<Heart[]>(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 40 + 20, // 20-60px
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4, // 4-7s
      opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
      uniqueKey: `${i}-${Date.now()}-${Math.random()}`,
    }))
  );

  const [poppingId, setPoppingId] = useState<number | null>(null);
  const [allPoppedCallbackFired, setAllPoppedCallbackFired] = useState(false);

  // Pop a random heart every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(currentHearts => {
        // Stop if no hearts left
        if (currentHearts.length === 0) {
          return currentHearts;
        }

        const randomIndex = Math.floor(Math.random() * currentHearts.length);
        const heartToPop = currentHearts[randomIndex];

        setPoppingId(heartToPop.id);

        // Play pop sound
        playPopSound();

        // After pop animation completes (600ms), remove the heart permanently
        setTimeout(() => {
          setHearts(prevHearts => prevHearts.filter(h => h.id !== heartToPop.id));
          setPoppingId(null);
        }, 600);

        return currentHearts;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Trigger callback when all hearts are popped (separate effect to avoid render-during-render)
  useEffect(() => {
    if (hearts.length === 0 && !allPoppedCallbackFired) {
      console.log('[FloatingHearts] All hearts popped! Triggering callback');
      setAllPoppedCallbackFired(true);
      onAllHeartsPoppedCallback?.();
    }
  }, [hearts.length, allPoppedCallbackFired, onAllHeartsPoppedCallback]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: theme.zIndex.background,
        overflow: 'hidden',
      }}
    >
      <AnimatePresence mode="popLayout">
        {hearts.map((heart) => {
          const isPopping = poppingId === heart.id;

          return (
            <div
              key={heart.uniqueKey}
              style={{
                position: 'absolute',
                left: heart.left,
                top: heart.top,
              }}
            >
              <motion.div
                style={{
                  fontSize: `${heart.size}px`,
                  opacity: heart.opacity,
                  position: 'relative',
                }}
                initial={{ scale: 1, opacity: heart.opacity }}
                animate={
                  isPopping
                    ? {
                        scale: [1, 1.3, 1.6, 0.2],
                        opacity: [heart.opacity, 0.9, 1, 0],
                        rotate: [0, -5, 5, 0],
                      }
                    : {
                        y: [0, -30, 0],
                        x: [0, 15, 0],
                        rotate: [0, 8, 0, -8, 0],
                        scale: 1,
                      }
                }
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: { duration: 0.1 },
                }}
                transition={
                  isPopping
                    ? {
                        duration: 0.5,
                        times: [0, 0.3, 0.6, 1],
                        ease: [0.65, 0, 0.35, 1],
                      }
                    : {
                        duration: heart.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: heart.delay,
                      }
                }
              >
                ❤️
              </motion.div>

              {/* Burst particles when popping */}
              {isPopping && (
                <>
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 360) / 8;
                    const rad = (angle * Math.PI) / 180;
                    const distance = 50;

                    return (
                      <motion.div
                        key={`particle-${i}`}
                        style={{
                          position: 'absolute',
                          fontSize: `${heart.size * 0.3}px`,
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                        initial={{
                          x: 0,
                          y: 0,
                          opacity: 1,
                          scale: 1,
                        }}
                        animate={{
                          x: Math.cos(rad) * distance,
                          y: Math.sin(rad) * distance,
                          opacity: 0,
                          scale: 0.5,
                          rotate: 360,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3,
                          ease: 'easeOut',
                        }}
                      >
                        💕
                      </motion.div>
                    );
                  })}
                </>
              )}
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
