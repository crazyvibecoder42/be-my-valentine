/**
 * Valentine's Day Theme Configuration
 * 2026 Valentine color trends with romantic palette
 */

export const colors = {
  // Primary Valentine colors
  deepRose: '#E63946',
  softPink: '#FFB3C1',
  creamWhite: '#FFF5F7',
  gold: '#FFD700',
  magenta: '#D90368',

  // Semantic colors
  primary: '#E63946',
  secondary: '#FFB3C1',
  accent: '#D90368',
  background: '#FFF5F7',
  celebration: '#FFD700',

  // Transparency variants
  deepRoseAlpha: (opacity: number) => `rgba(230, 57, 70, ${opacity})`,
  softPinkAlpha: (opacity: number) => `rgba(255, 179, 193, ${opacity})`,
  goldAlpha: (opacity: number) => `rgba(255, 215, 0, ${opacity})`,
} as const;

export const gradients = {
  background: `linear-gradient(135deg, ${colors.creamWhite} 0%, ${colors.softPinkAlpha(0.3)} 100%)`,
  celebration: `linear-gradient(135deg, ${colors.magenta} 0%, ${colors.deepRose} 50%, ${colors.gold} 100%)`,
  yesButton: `linear-gradient(135deg, ${colors.deepRose} 0%, ${colors.magenta} 100%)`,
  glow: `radial-gradient(circle, ${colors.goldAlpha(0.4)} 0%, transparent 70%)`,
} as const;

export const typography = {
  fonts: {
    heading: "'Pacifico', cursive",
    body: "'Poppins', sans-serif",
  },
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
    '5xl': '96px',
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
} as const;

export const shadows = {
  sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
  md: '0 4px 8px rgba(0, 0, 0, 0.12)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
  xl: '0 12px 24px rgba(0, 0, 0, 0.18)',
  glow: `0 0 20px ${colors.deepRoseAlpha(0.5)}`,
  goldGlow: `0 0 30px ${colors.goldAlpha(0.6)}`,
} as const;

export const breakpoints = {
  desktop: '1920px',
  minDesktop: '1280px',
} as const;

export const zIndex = {
  background: 0,
  content: 10,
  buttons: 20,
  celebration: 100,
  mobileBlocker: 150,
  confetti: 200,
} as const;

export const theme = {
  colors,
  gradients,
  typography,
  spacing,
  shadows,
  breakpoints,
  zIndex,
} as const;

export type Theme = typeof theme;

/**
 * Marble Theme Configuration
 * Sophisticated, muted aesthetic with glassmorphism
 */
export const marbleTheme = {
  colors: {
    // Marble color palette - sophisticated and muted
    ivory: '#F8F6F3',
    pearl: '#E8E5E1',
    mist: '#D4D1CC',
    dustyRose: '#D4B5B0',
    sageGreen: '#B8C5B3',
    opalBlue: '#C8D9E6',
    champagne: '#E5DDD3',
    charcoal: '#4A4745',
    smoke: '#8B8883',

    // Semantic mappings
    primary: '#D4B5B0', // dustyRose
    secondary: '#C8D9E6', // opalBlue
    accent: '#B8C5B3', // sageGreen
    background: '#F8F6F3', // ivory
    text: '#4A4745', // charcoal
    textMuted: '#8B8883', // smoke

    // Transparency variants for glassmorphism
    ivoryAlpha: (opacity: number) => `rgba(248, 246, 243, ${opacity})`,
    pearlAlpha: (opacity: number) => `rgba(232, 229, 225, ${opacity})`,
    charcoalAlpha: (opacity: number) => `rgba(74, 71, 69, ${opacity})`,
    dustyRoseAlpha: (opacity: number) => `rgba(212, 181, 176, ${opacity})`,
  },

  gradients: {
    // Marble gradients - subtle and sophisticated
    marble: 'linear-gradient(135deg, #F8F6F3 0%, #E8E5E1 50%, #D4D1CC 100%)',
    opal: 'linear-gradient(120deg, #C8D9E6 0%, #E5DDD3 50%, #D4B5B0 100%)',
    subtle: 'linear-gradient(135deg, #F8F6F3 0%, #E5DDD3 100%)',
    muted: 'linear-gradient(135deg, #D4D1CC 0%, #B8C5B3 100%)',
  },

  glass: {
    // Glassmorphism effects
    primary: {
      background: 'rgba(248, 246, 243, 0.65)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(232, 229, 225, 0.3)',
      boxShadow: '0 8px 32px rgba(74, 71, 69, 0.1)',
    },
    secondary: {
      background: 'rgba(232, 229, 225, 0.5)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(212, 209, 204, 0.3)',
      boxShadow: '0 4px 16px rgba(74, 71, 69, 0.08)',
    },
    accent: {
      background: 'rgba(212, 181, 176, 0.4)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(212, 181, 176, 0.4)',
      boxShadow: '0 4px 16px rgba(212, 181, 176, 0.2)',
    },
  },

  shadows: {
    // Soft, subtle shadows for marble aesthetic
    sm: '0 2px 8px rgba(74, 71, 69, 0.08)',
    md: '0 4px 16px rgba(74, 71, 69, 0.1)',
    lg: '0 8px 32px rgba(74, 71, 69, 0.12)',
    xl: '0 12px 48px rgba(74, 71, 69, 0.15)',
    glow: '0 0 24px rgba(212, 181, 176, 0.3)',
    inner: 'inset 0 2px 8px rgba(74, 71, 69, 0.05)',
  },

  typography: {
    fonts: {
      heading: "'Playfair Display', serif",
      subheading: "'Cormorant Garamond', serif",
      body: "'Inter', sans-serif",
    },
    sizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '20px',
      xl: '24px',
      '2xl': '32px',
      '3xl': '48px',
      '4xl': '64px',
      '5xl': '96px',
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
  },

  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },

  breakpoints: {
    desktop: '1920px',
    minDesktop: '1280px',
  },

  zIndex: {
    background: 0,
    content: 10,
    buttons: 20,
    celebration: 100,
    mobileBlocker: 150,
    confetti: 200,
  },
} as const;

export type MarbleTheme = typeof marbleTheme;
