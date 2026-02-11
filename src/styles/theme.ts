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
