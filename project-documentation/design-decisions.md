# Design Decisions

This document explains the key technology and design choices made for the Valentine's Day website project.

## Technology Stack

### Framer Motion over GSAP

**Decision**: Use Framer Motion as the primary animation library.

**Rationale**:
- **Declarative API**: Framer Motion's declarative approach aligns perfectly with React's component model. Animations are defined as props rather than imperative commands.
- **React Integration**: Built specifically for React with first-class hooks support (`motion` components, `useAnimation`, etc.).
- **Bundle Size**: Smaller bundle size (~35KB gzipped) compared to GSAP (~70KB+ gzipped), crucial for keeping the project under the 150KB target.
- **Spring Physics**: Superior spring-based animations out of the box, perfect for the organic, playful feel needed for button evasion.
- **Gesture Support**: Built-in gesture detection (`whileHover`, `whileTap`) simplifies interaction handling.
- **TypeScript Support**: Excellent TypeScript definitions for type safety.

**Trade-offs**:
- GSAP has more advanced timeline features, but we don't need complex sequential animations.
- GSAP has broader browser support, but we're targeting modern desktop browsers only.

### React over Vanilla JavaScript

**Decision**: Use React 19 as the framework.

**Rationale**:
- **Component Architecture**: Component-based structure makes the codebase maintainable and testable.
- **Team Familiarity**: React is widely known and well-documented, making it easier for future developers to work with.
- **State Management**: React's hooks (`useState`, `useEffect`, `useRef`) provide clean state management for mouse tracking and button positions.
- **Reusability**: Custom hooks (`useMousePosition`, `useButtonEvasion`) encapsulate complex logic and can be reused or tested independently.
- **Developer Experience**: Fast refresh with Vite provides instant feedback during development.
- **Ecosystem**: Rich ecosystem of tools (TypeScript integration, ESLint, Prettier) for code quality.

**Trade-offs**:
- Vanilla JS would have a smaller bundle, but at the cost of maintainability and development speed.
- React adds ~50KB to the bundle, but the benefits in code organization outweigh the cost.

### Vite over Create React App

**Decision**: Use Vite as the build tool.

**Rationale**:
- **Lightning-fast HMR**: Instant hot module replacement during development.
- **Modern Architecture**: Native ES modules in development, optimized Rollup builds for production.
- **Simple Configuration**: Minimal config required compared to Webpack-based tools.
- **Fast Builds**: Production builds complete in seconds, not minutes.
- **Official React Plugin**: `@vitejs/plugin-react` provides excellent React support.

### TypeScript Strict Mode

**Decision**: Enable TypeScript strict mode for maximum type safety.

**Rationale**:
- **Early Error Detection**: Catch bugs at compile time rather than runtime.
- **Better IDE Support**: Enhanced autocomplete and inline documentation.
- **Maintainability**: Type definitions serve as self-documenting code.
- **Confidence in Refactoring**: Type checking ensures changes don't break the application.

**Implementation**:
```typescript
// All components, hooks, and utilities have explicit interfaces
interface MousePosition {
  x: number;
  y: number;
}

interface ButtonSize {
  width: number;
  height: number;
}
```

## Design Choices

### Color Palette - 2026 Valentine's Day Trends

**Decision**: Use a modern Valentine color palette with five core colors.

**Rationale**:
- **Deep Rose (#E63946)**: Bold, passionate primary color that commands attention without being overwhelming. Used for CTAs and primary interactions.
- **Soft Pink (#FFB3C1)**: Balances the intensity of deep rose with sweetness and warmth. Used for backgrounds and secondary elements.
- **Cream White (#FFF5F7)**: Warm white base that's softer than pure white, creating a romantic, intimate feel.
- **Gold (#FFD700)**: Represents celebration, luxury, and joy. Used sparingly for confetti and sparkle accents.
- **Magenta (#D90368)**: Energetic accent color that adds vibrancy to gradients and animations.

**Emotional Impact**:
- The palette evokes romance, warmth, celebration, and playfulness.
- Gradients (rose to magenta, cream to soft pink) create depth and visual interest.
- Gold accents provide moments of delight during celebrations.

**Alternatives Considered**:
- Traditional red/pink scheme (too predictable and dated)
- Pastel-only palette (too soft, lacks impact)
- Dark romantic theme (not appropriate for a joyful proposal)

### Desktop-Only Decision

**Decision**: Optimize exclusively for desktop at 1920x1080 resolution.

**Rationale**:
- **Mouse-Based Interaction**: The core feature (button evasion) requires precise mouse tracking and cursor positioning, which doesn't translate well to touch interfaces.
- **Optimal Sharing**: Desktop provides the best experience for sharing via link (user can control the reveal moment, show the site on a computer together).
- **Simpler Development**: No need for responsive breakpoints, touch gesture handling, or mobile-specific optimizations.
- **Performance**: Desktop browsers are more powerful, allowing for more ambitious animations without performance concerns.
- **Viewing Distance**: The celebratory animations are best viewed on a larger screen from a comfortable distance.

**Minimum Resolution**: 1280px width to ensure the buttons have enough space to evade.

### Over-the-Top Animation Approach

**Decision**: Make animations spectacular and over-the-top rather than subtle and minimal.

**Rationale**:
- **Romantic Gesture**: This is a marriage proposal moment that deserves grand, theatrical animations.
- **Memorable Experience**: The goal is to create an unforgettable moment, not just a functional interaction.
- **Emotional Impact**: Spectacular animations amplify the emotional significance of the "Yes" response.
- **Playfulness**: Playful evasion and exuberant celebration match the lighthearted, romantic tone.

**Implementation**:
- 300+ confetti particles in multiple burst patterns
- 5-second continuous heart rain
- Staggered fireworks sequence
- Gold sparkle bursts
- Multiple animation layers with careful timing

**Alternative Approaches**:
- Minimal animations (doesn't match the emotional weight of the moment)
- Subtle transitions (too understated for a proposal)
- Medium-level animations (considered but decided to go all-in)

## Architecture Decisions

### Component-Based Structure

**Decision**: Organize code by feature with clear separation of concerns.

**Structure**:
```
src/
├── components/          # UI components
│   ├── ValentineButtons/
│   ├── CelebrationScreen/
│   └── BackgroundHearts/
├── hooks/              # Business logic
│   ├── useMousePosition.ts
│   ├── useButtonEvasion.ts
│   └── useCelebration.ts
├── utils/              # Pure functions
│   ├── evasionLogic.ts
│   └── celebrationConfig.ts
└── styles/             # Design system
    ├── theme.ts
    ├── animations.ts
    └── GlobalStyles.tsx
```

**Rationale**:
- **Clear Boundaries**: Components handle UI, hooks handle logic, utils handle calculations.
- **Testability**: Each layer can be tested independently.
- **Reusability**: Hooks and utils can be used across multiple components.
- **Maintainability**: Easy to locate and modify specific functionality.

### Custom Hooks for Logic Separation

**Decision**: Extract business logic into custom hooks rather than keeping it in components.

**Examples**:
- `useMousePosition`: Global mouse tracking at 60 FPS
- `useButtonEvasion`: Vector math calculations and position updates
- `useCelebration`: Celebration state and confetti triggers

**Rationale**:
- **Separation of Concerns**: Components focus on rendering, hooks focus on logic.
- **Testability**: Logic can be tested without rendering components.
- **Reusability**: Same hook can be used by multiple components.
- **Clean Components**: Component files remain focused and readable.

### Performance-First Approach

**Decision**: Prioritize 60 FPS animations and fast load times from the start.

**Implementation**:
- `requestAnimationFrame` for mouse tracking (not event throttling)
- Framer Motion springs for GPU-accelerated animations
- Lazy loading for `canvas-confetti` (only loaded when needed)
- Memoization of static data (hearts array in `FloatingHearts`)
- Optimized bundle size (target < 150KB gzipped)

**Rationale**:
- **Smooth Experience**: Janky animations ruin the magic of the interaction.
- **Fast Load**: User won't wait long for the page to load.
- **Professional Feel**: Performance issues make the site feel cheap.
- **Mobile-First Practice**: Even though desktop-only, good performance habits prevent issues.

## Testing Strategy

### Playwright MCP Integration

**Decision**: Use Playwright exclusively via MCP tools, no manual testing.

**Rationale**:
- **Automation**: Tests run via tools, ensuring consistency and repeatability.
- **Integration Testing**: Tests the full user experience in a real browser.
- **Visual Verification**: Can test animations, layout, and visual appearance.
- **Confidence**: Automated tests provide confidence that changes don't break functionality.
- **CI/CD Ready**: Tests are ready to be integrated into a deployment pipeline.

**Coverage**:
- Button interaction tests (rendering, styling, hover effects)
- Evasion behavior tests (movement, boundaries, vector math)
- Celebration tests (confetti, text, animations)

## Deployment

### Vercel Platform

**Decision**: Deploy to Vercel for hosting.

**Rationale**:
- **Zero Configuration**: Automatic builds and deployments from Git.
- **HTTPS by Default**: Free SSL certificates for secure sharing.
- **Fast CDN**: Global edge network for fast load times.
- **Easy Sharing**: Simple URL that can be shared via any channel.
- **Preview Deployments**: Test changes before going live.
- **Free Tier**: More than sufficient for a personal project.

## Future Considerations

### Potential Enhancements

If expanding the project in the future:

1. **Mobile Version**: Create a separate touch-based interaction for mobile devices.
2. **Personalization**: Add name customization, date selection, or message editing.
3. **Analytics**: Track interactions to see how users engage with the site.
4. **Themes**: Multiple color themes for different occasions.
5. **Multilingual**: Support for multiple languages.
6. **Accessibility**: Screen reader support, keyboard navigation.

### Why Not Implemented Now

These features add complexity and are not necessary for the core goal: creating a memorable proposal moment. The current implementation focuses on doing one thing exceptionally well.

---

**Summary**: Every decision was made to create a smooth, memorable, and maintainable experience. Technology choices favor modern best practices and developer experience. Design choices prioritize emotional impact and playfulness. Architecture choices ensure the codebase remains clean and testable.
