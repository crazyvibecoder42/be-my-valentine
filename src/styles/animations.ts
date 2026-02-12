/**
 * Framer Motion animation presets
 * Reusable animation variants and spring configurations
 */

// Spring configurations
export const springs = {
  gentle: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300,
  },
  bouncy: {
    type: 'spring' as const,
    damping: 15,
    stiffness: 400,
  },
  smooth: {
    type: 'spring' as const,
    damping: 25,
    stiffness: 200,
  },
  snappy: {
    type: 'spring' as const,
    damping: 30,
    stiffness: 500,
  },
} as const;

// Easing functions
export const easings = {
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],
  anticipate: [0.6, -0.28, 0.735, 0.045],
} as const;

// Button animations
export const buttonVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: springs.gentle,
  },
  tap: {
    scale: 0.95,
    transition: springs.snappy,
  },
  pulse: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easings.easeInOut,
    },
  },
};

// Celebration screen animations
export const celebrationVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 300,
    },
  },
};

// Text reveal animations
export const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// Floating heart animations
export const floatingHeartVariants = {
  float: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: easings.easeInOut,
    },
  },
};

// Sparkle animations
export const sparkleVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: easings.easeInOut,
    },
  },
};

// Fade in/out
export const fadeVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Slide up
export const slideUpVariants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: springs.smooth,
  },
};

// Stagger children animation
export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

// Helper function for letter-by-letter animation
export const getLetterAnimation = (index: number) => ({
  delay: index * 0.05,
  duration: 0.3,
  ease: easings.easeOut,
});

/**
 * Marble Theme Animations
 * Gentle, graceful spring physics for sophisticated aesthetic
 */

// Marble spring configuration - slower and more graceful
export const marbleSpring = {
  type: 'spring' as const,
  damping: 30,
  stiffness: 200,
} as const;

// Marble animation variants
export const marbleVariants = {
  // Fade in animation
  fadeIn: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easings.easeOut,
      },
    },
  },

  // Scale in animation
  scaleIn: {
    hidden: {
      scale: 0.9,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: marbleSpring,
    },
  },

  // Slide up animation
  slideUp: {
    hidden: {
      y: 40,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: marbleSpring,
    },
  },

  // Gentle button hover
  button: {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.02,
      transition: marbleSpring,
    },
    tap: {
      scale: 0.98,
      transition: marbleSpring,
    },
  },

  // Glass panel entrance
  glassPanel: {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ...marbleSpring,
        duration: 1.2,
      },
    },
  },

  // Graceful container stagger
  container: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },
} as const;
