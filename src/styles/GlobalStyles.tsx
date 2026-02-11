import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

/**
 * Global styles for Valentine's Day website
 * Includes CSS reset, font imports, and base styles
 */

const GlobalStyles = createGlobalStyle`
  /* Import Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:wght@300;400;500;600;700&display=swap');

  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${theme.typography.fonts.body};
    font-size: ${theme.typography.sizes.base};
    font-weight: ${theme.typography.weights.normal};
    line-height: 1.6;
    color: ${theme.colors.deepRose};
    background: ${theme.gradients.background};
    min-height: 100vh;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.fonts.heading};
    font-weight: ${theme.typography.weights.normal};
    line-height: 1.2;
  }

  /* Button reset */
  button {
    font-family: inherit;
    border: none;
    cursor: pointer;
    background: none;
    padding: 0;
  }

  /* Remove default focus outline and add custom */
  *:focus-visible {
    outline: 3px solid ${theme.colors.deepRoseAlpha(0.5)};
    outline-offset: 2px;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Selection styling */
  ::selection {
    background: ${theme.colors.deepRoseAlpha(0.3)};
    color: ${theme.colors.deepRose};
  }
`;

export default GlobalStyles;
