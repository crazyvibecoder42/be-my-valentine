# Valentine's Day Website - Project Requirements

## Project Overview

An interactive Valentine's Day website to ask your wife to be your valentine. The experience centers around two buttons with playful interaction patterns and spectacular celebration animations.

## Target Experience

- **Platform**: Desktop-only (optimized for mouse interaction at 1920x1080)
- **Deployment**: Vercel for easy sharing via link
- **Core Interaction**:
  - Large "Yes I will be your valentine" button with hover effects
  - Small "No" button that playfully evades the mouse cursor
  - When "Yes" is clicked: spectacular celebration with message "you will get your gift soon"

## Technology Stack

### Core Framework
- **Vite** - Lightning-fast build tool with HMR
- **React 18+** - Component-based UI
- **TypeScript** - Type safety with strict mode enabled
- **Node.js v20+ LTS**

### Animation Libraries
- **Framer Motion** - Declarative animations with gesture detection
- **canvas-confetti** - Spectacular confetti effects

### Code Quality
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript strict mode** - Maximum type safety

### Testing
- **Playwright** - Automated browser testing via MCP
- **NO manual tests** - All testing through Playwright MCP tools

### Deployment
- **Vercel** - Zero-config deployment with automatic HTTPS

## Development Commands

```bash
# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint
```

## Testing Strategy

### Automated Testing with Playwright MCP
All testing is done via Playwright MCP tools - NO manual testing required.

**Test Coverage:**
1. **Button Interaction Tests** (`tests/e2e/button-interaction.spec.ts`)
   - Both buttons render with correct sizes
   - Yes button hover effects work
   - Buttons have correct colors and styling

2. **Evasion Behavior Tests** (`tests/e2e/evasion-behavior.spec.ts`) ⭐ CRITICAL
   - No button moves when mouse approaches
   - Button stays within viewport boundaries
   - Evasion animation is smooth (60 FPS)
   - Vector math calculations are correct

3. **Celebration Tests** (`tests/e2e/celebration.spec.ts`)
   - Clicking Yes triggers celebration screen
   - Confetti animations execute
   - Text displays correctly: "You will get your gift soon"
   - All animations complete successfully

**Running Tests:**
Use Playwright MCP tools to navigate to http://localhost:5173 and execute test scenarios.

## Guidelines

### TypeScript Usage
- **Always use TypeScript strict mode**
- Define interfaces for all props and state
- Avoid `any` type - use proper typing
- Use type inference where obvious

### Component Architecture
- **Component-based structure** - One component per file
- **Hooks for logic** - Separate business logic from UI
- **Reusable utilities** - Shared logic in utils/
- **Clear separation** - Components, hooks, utils, styles

### Animation Principles
- **60 FPS target** - Smooth, performant animations
- **Spring physics** - Natural, organic motion (Framer Motion springs)
- **Responsive feedback** - Immediate visual response to interactions
- **Layered effects** - Multiple animation layers for richness

### Code Style
- Use functional components with hooks
- Prefer `const` over `let`
- Use arrow functions for callbacks
- Keep components small and focused
- Extract reusable logic into custom hooks

### Performance
- Lazy load heavy dependencies (canvas-confetti)
- Use `requestAnimationFrame` for mouse tracking (60 FPS)
- Optimize re-renders with proper dependencies
- Keep bundle size < 150KB gzipped

### Deployment
- Build locally and test with `npm run preview` before deploying
- Deploy to Vercel via git push or Vercel CLI
- Verify HTTPS works on production URL
- Test all functionality on deployed site before final reveal

## Critical Features

### 1. Mouse Tracking System
- **Global mouse position tracker** at 60 FPS
- Uses `requestAnimationFrame` for smooth updates
- Clean up event listeners on unmount

### 2. Button Evasion Logic ⭐ MOST IMPORTANT
- **Vector math** for calculating escape direction
- **Evasion radius**: 150px (customizable)
- **Smooth animation** via Framer Motion springs
- **Boundary constraints** - Button never escapes viewport
- **Natural movement** - Feels playful, not robotic

### 3. Celebration Animation
- **Multi-layer approach**:
  - Layer 1: Confetti bursts (immediate)
  - Layer 2: Celebration screen scale-in (800ms)
  - Layer 3: Text reveal letter-by-letter (1.5s, stagger 50ms)
  - Layer 4: Continuous sparkle effects
- **Over-the-top spectacular** - 300+ confetti particles
- **Multiple burst patterns** - Center explosion, side cannons, heart rain

### 4. Valentine Theme
- **Color Palette** (2026 Valentine trends):
  - Deep Rose (#E63946) - Passion, main CTAs
  - Soft Pink (#FFB3C1) - Sweetness, backgrounds
  - Cream White (#FFF5F7) - Purity, base
  - Gold (#FFD700) - Celebration, sparkle accents
  - Magenta (#D90368) - Energy, secondary accents
- **Visual elements**:
  - Floating heart particles in background
  - Soft glow effects on buttons
  - Romantic gradient backgrounds
  - Gold sparkle accents

## File Structure

```
valentine/
├── src/
│   ├── components/
│   │   ├── ValentineButtons/
│   │   │   ├── YesButton.tsx
│   │   │   ├── NoButton.tsx
│   │   │   └── ButtonContainer.tsx
│   │   ├── CelebrationScreen/
│   │   │   ├── CelebrationScreen.tsx
│   │   │   └── CelebrationAnimation.tsx
│   │   └── BackgroundHearts/
│   │       └── FloatingHearts.tsx
│   ├── hooks/
│   │   ├── useMousePosition.ts          ⭐ CRITICAL
│   │   ├── useButtonEvasion.ts          ⭐ CRITICAL
│   │   └── useCelebration.ts
│   ├── utils/
│   │   ├── evasionLogic.ts              ⭐ CRITICAL
│   │   └── celebrationConfig.ts
│   ├── styles/
│   │   ├── theme.ts
│   │   ├── GlobalStyles.tsx
│   │   └── animations.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   └── e2e/
│       ├── button-interaction.spec.ts
│       ├── evasion-behavior.spec.ts     ⭐ CRITICAL
│       └── celebration.spec.ts
└── project-documentation/
    ├── design-decisions.md
    ├── animation-strategy.md
    ├── color-palette.md
    ├── component-architecture.md
    └── testing-strategy.md
```

## Success Criteria

✅ Desktop website deployed to Vercel
✅ Large "Yes" button with hover effects and breathing animation
✅ Small "No" button that smoothly evades mouse cursor
✅ No button stays within viewport boundaries
✅ Valentine theme with romantic colors and floating hearts
✅ Spectacular celebration on "Yes" click with 300+ confetti particles
✅ Message displays: "You will get your gift soon"
✅ All Playwright MCP tests pass
✅ Smooth 60 FPS animations throughout
✅ Bundle size < 150KB gzipped
✅ Ready to share with your wife! 💕

## Agent Team Structure

When working on this project, agents should focus on:

- **Team Lead**: Coordination, integration, deployment
- **Frontend Developer**: Components, layout, styling
- **Animation Specialist**: Mouse tracking, evasion logic, Framer Motion
- **Testing Agent**: Playwright tests via MCP

## Performance Targets

- **Initial Load**: < 2 seconds
- **Time to Interactive**: < 3 seconds
- **Animation FPS**: Consistent 60 FPS
- **Bundle Size**: < 150KB gzipped
- **No layout shifts**: CLS = 0
- **Smooth evasion**: No frame drops during mouse tracking

## Next Steps

1. Implement theme system and foundation (Phase 2)
2. Create button components (Phase 3)
3. Implement mouse tracking and evasion logic (Phase 4)
4. Build celebration animations (Phase 5)
5. Write Playwright tests (Phase 6)
6. Deploy to Vercel (Phase 7)
7. Complete documentation (Phase 8)

---

**Remember**: This is a romantic gesture - make it spectacular, smooth, and memorable! 💝
