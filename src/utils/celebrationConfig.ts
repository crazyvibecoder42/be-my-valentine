/**
 * Canvas Confetti Configuration
 * Spectacular multi-burst celebration patterns
 */

import confetti from 'canvas-confetti';

// Valentine color palette for confetti
const CELEBRATION_COLORS = ['#E63946', '#FFB3C1', '#FFD700', '#D90368'];

/**
 * Center explosion - massive burst in all directions
 */
export const centerExplosion = () => {
  confetti({
    particleCount: 300,
    spread: 360,
    origin: { x: 0.5, y: 0.5 },
    colors: CELEBRATION_COLORS,
    shapes: ['circle', 'square'],
    scalar: 1.5, // Larger particles
    gravity: 0.8, // Slower fall
    ticks: 300, // Longer duration
    startVelocity: 45,
  });
};

/**
 * Side cannons - bursts from left and right edges
 */
export const sideCannons = () => {
  // Left cannon
  confetti({
    particleCount: 200,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.6 },
    colors: CELEBRATION_COLORS,
    shapes: ['circle', 'square'],
    scalar: 1.3,
    gravity: 0.8,
    ticks: 300,
    startVelocity: 55,
  });

  // Right cannon
  confetti({
    particleCount: 200,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.6 },
    colors: CELEBRATION_COLORS,
    shapes: ['circle', 'square'],
    scalar: 1.3,
    gravity: 0.8,
    ticks: 300,
    startVelocity: 55,
  });
};

/**
 * Heart rain - continuous shower of hearts from top
 */
export const heartRain = () => {
  const duration = 5000; // 5 seconds
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 90,
      spread: 45,
      origin: { x: Math.random(), y: 0 },
      colors: ['#E63946', '#FFB3C1', '#D90368'],
      shapes: ['circle'],
      scalar: 2, // Extra large hearts
      gravity: 0.6, // Very slow fall
      ticks: 400,
      startVelocity: 15,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

/**
 * Sparkle burst - small gold particles for accent
 */
export const sparkleBurst = () => {
  confetti({
    particleCount: 100,
    spread: 360,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#FFD700', '#FFA500'],
    shapes: ['circle'],
    scalar: 0.8,
    gravity: 0.5,
    ticks: 200,
    startVelocity: 35,
  });
};

/**
 * Fireworks sequence - staggered bursts at different positions
 */
export const fireworksSequence = () => {
  const positions = [
    { x: 0.2, y: 0.3 },
    { x: 0.8, y: 0.3 },
    { x: 0.5, y: 0.2 },
    { x: 0.3, y: 0.5 },
    { x: 0.7, y: 0.5 },
  ];

  positions.forEach((pos, index) => {
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: pos,
        colors: CELEBRATION_COLORS,
        shapes: ['circle', 'square'],
        scalar: 1.2,
        gravity: 0.8,
        ticks: 250,
        startVelocity: 35,
      });
    }, index * 200); // Stagger by 200ms
  });
};

/**
 * Execute the complete spectacular celebration sequence
 */
export const triggerSpectacularCelebration = () => {
  // Immediate: Center explosion
  centerExplosion();

  // 100ms: Side cannons
  setTimeout(sideCannons, 100);

  // 300ms: Sparkle burst
  setTimeout(sparkleBurst, 300);

  // 500ms: Start heart rain (continuous for 5 seconds)
  setTimeout(heartRain, 500);

  // 700ms: Fireworks sequence
  setTimeout(fireworksSequence, 700);
};
