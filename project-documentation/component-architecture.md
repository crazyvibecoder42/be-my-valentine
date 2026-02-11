# Component Architecture

This document provides a comprehensive overview of the system architecture, including the component tree, state flow, props interfaces, hook dependencies, event flow, and file organization.

## System Overview

The Valentine's Day website follows a component-based architecture with clear separation of concerns:

- **Components**: UI rendering and user interaction
- **Hooks**: Business logic and state management
- **Utils**: Pure functions for calculations
- **Styles**: Design system and animation presets

## Component Tree Structure

```
App (Root Component)
├── FloatingHearts (Background)
│   └── [20 × motion.div (Heart particles)]
│
└── Main Content Container
    ├── <h1> "Will you be my Valentine?"
    │
    └── ButtonContainer
        ├── YesButton
        │   ├── motion.button (Main button)
        │   ├── motion.div (Glow effect)
        │   └── <span> (Text content)
        │
        └── NoButton
            └── motion.button (Evading button)
```

### Visual Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│ App (Background gradient)                                │
│                                                          │
│  ❤️ ❤️ ❤️ FloatingHearts (z-index: 0) ❤️ ❤️ ❤️          │
│                                                          │
│  ┌────────────────────────────────────────────┐         │
│  │ Main Content (z-index: 10)                  │        │
│  │                                             │         │
│  │     Will you be my Valentine?               │         │
│  │                                             │         │
│  │  ┌─────────────────────────────────┐       │         │
│  │  │ ButtonContainer (z-index: 20)    │      │         │
│  │  │                                  │       │         │
│  │  │  ┌──────────────────────────┐   │       │         │
│  │  │  │ YesButton (Large, Center)│   │       │         │
│  │  │  └──────────────────────────┘   │       │         │
│  │  │                                  │       │         │
│  │  │         ┌────────┐               │       │         │
│  │  │         │NoButton│ ← Moves!      │       │         │
│  │  │         └────────┘               │       │         │
│  │  └──────────────────────────────────┘       │         │
│  └────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────┘
```

### Z-Index Layers

```typescript
// theme.ts
export const zIndex = {
  background: 0,      // FloatingHearts
  content: 10,        // Main content area
  buttons: 20,        // ButtonContainer
  celebration: 100,   // CelebrationScreen (future)
  confetti: 200,      // Confetti particles (future)
} as const;
```

## Component Specifications

### App Component

**File**: `src/App.tsx`

**Responsibility**: Root component, layout orchestration, celebration trigger

**Structure**:
```typescript
export default function App() {
  const handleYesClick = () => {
    // TODO: Trigger celebration (Phase 5)
    console.log('Yes clicked!');
  };

  return (
    <div style={/* Full viewport container */}>
      <FloatingHearts />
      <div style={/* Content area */}>
        <h1>Will you be my Valentine?</h1>
        <ButtonContainer>
          <YesButton onClick={handleYesClick} />
          <NoButton />
        </ButtonContainer>
      </div>
    </div>
  );
}
```

**Key Features**:
- Full viewport flexbox layout (centers content)
- Background gradient from theme
- Manages celebration trigger (future)

**No State**: Stateless orchestrator (state lives in child components)

---

### FloatingHearts Component

**File**: `src/components/BackgroundHearts/FloatingHearts.tsx`

**Responsibility**: Render animated heart particles in the background

**Props**: None (self-contained)

**Internal State**:
```typescript
const hearts = useMemo<Heart[]>(() => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,        // 20-60px
    left: `${Math.random() * 100}%`,      // Random X position
    top: `${Math.random() * 100}%`,       // Random Y position
    delay: Math.random() * 5,             // 0-5s delay
    duration: Math.random() * 3 + 4,      // 4-7s duration
    opacity: Math.random() * 0.3 + 0.1,   // 0.1-0.4 opacity
  }));
}, []); // Memoized - never regenerates
```

**Animation**:
- Floating motion: vertical (-30px up and down)
- Horizontal drift: 15px left-right
- Rotation: 8° clockwise and counter-clockwise
- Infinite loop with individual timing per heart

**Performance Optimization**:
- `useMemo` prevents heart array regeneration on re-renders
- `pointer-events: none` prevents mouse interaction interference
- Fixed positioning prevents layout calculations

---

### ButtonContainer Component

**File**: `src/components/ValentineButtons/ButtonContainer.tsx`

**Responsibility**: Layout container for buttons, provides structure and spacing

**Props**:
```typescript
interface ButtonContainerProps {
  children: ReactNode;
}
```

**Structure**:
```typescript
export default function ButtonContainer({ children }: ButtonContainerProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: theme.spacing.xl,        // 32px gap between buttons
      position: 'relative',
      zIndex: theme.zIndex.buttons,
      minHeight: '200px',           // Ensures space for button evasion
      padding: theme.spacing['2xl'], // 48px padding
    }}>
      {children}
    </div>
  );
}
```

**Layout Strategy**:
- Flexbox column layout (vertical stacking)
- Center alignment for buttons
- Relative positioning context for absolute children
- Minimum height ensures evasion space

---

### YesButton Component

**File**: `src/components/ValentineButtons/YesButton.tsx`

**Responsibility**: Primary CTA button with hover effects and breathing animation

**Props**:
```typescript
interface YesButtonProps {
  onClick: () => void;
}
```

**Structure**:
```typescript
export default function YesButton({ onClick }: YesButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      variants={buttonVariants}
      initial="initial"
      animate="pulse"           // Continuous breathing
      whileHover="hover"        // Scale up on hover
      whileTap="tap"            // Scale down on click
      style={{
        width: '300px',
        height: '80px',
        background: theme.gradients.yesButton,
        // ... more styles
      }}
    >
      {/* Glow overlay */}
      <motion.div
        style={{ /* Glow effect styling */ }}
        whileHover={{
          opacity: 0.6,
          scale: 1.5,
        }}
      />

      <span>Yes I will be your valentine ❤️</span>
    </motion.button>
  );
}
```

**Animations**:
1. **Pulse** (breathing): Continuous 1-1.02-1 scale over 2s
2. **Hover**: Scale to 1.05 with gentle spring
3. **Tap**: Scale to 0.95 with snappy spring
4. **Glow**: Overlay fades in and scales up on hover

**No Internal State**: Pure presentational component

---

### NoButton Component

**File**: `src/components/ValentineButtons/NoButton.tsx`

**Responsibility**: Small button that evades mouse cursor

**Props**: None

**Internal Logic**:
```typescript
export default function NoButton() {
  // Hook provides evasion position
  const position = useButtonEvasion({
    buttonSize: { width: 120, height: 50 },
  });

  return (
    <motion.button
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300,
      }}
      // ... more props
    >
      No
    </motion.button>
  );
}
```

**Key Features**:
- Absolute positioning allows free movement
- Position driven by `useButtonEvasion` hook
- Spring animation for smooth movement
- Smaller size (120×50) vs Yes button (300×80)

---

## State Flow Diagram

```
User Moves Mouse
       ↓
window.mousemove event
       ↓
useMousePosition: Store in ref
       ↓
requestAnimationFrame (60 FPS)
       ↓
useMousePosition: Update state
       ↓
useButtonEvasion: Receives mousePosition
       ↓
Calculate distance to button
       ↓
Distance < 150px?
       ↓ YES                    ↓ NO
Calculate escape vector    Do nothing
       ↓
Constrain to viewport
       ↓
Update buttonPosition state
       ↓
NoButton re-renders with new position
       ↓
Framer Motion animates button
       ↓
User sees smooth evasion


User Clicks Yes Button
       ↓
YesButton onClick prop
       ↓
App handleYesClick
       ↓
Trigger celebration (future Phase 5)
       ↓
Show CelebrationScreen
       ↓
Launch confetti bursts
       ↓
Display success message
```

## Hook Architecture

### useMousePosition Hook

**File**: `src/hooks/useMousePosition.ts`

**Purpose**: Track global mouse position at 60 FPS

**Interface**:
```typescript
interface MousePosition {
  x: number;
  y: number;
}

function useMousePosition(): MousePosition
```

**Returns**: Current mouse position `{ x, y }`

**Side Effects**:
- Adds `mousemove` listener to window
- Starts `requestAnimationFrame` loop
- Cleans up on unmount

**Dependencies**: None (self-contained)

**Used By**: `useButtonEvasion`

---

### useButtonEvasion Hook

**File**: `src/hooks/useButtonEvasion.ts`

**Purpose**: Calculate button evasion position using vector math

**Interface**:
```typescript
interface ButtonSize {
  width: number;
  height: number;
}

interface ButtonPosition {
  x: number;
  y: number;
}

interface UseButtonEvasionOptions {
  buttonSize: ButtonSize;
  evasionRadius?: number;        // Default: 150
  initialPosition?: ButtonPosition; // Default: { x: 0, y: 0 }
}

function useButtonEvasion(options: UseButtonEvasionOptions): ButtonPosition
```

**Returns**: Current button position `{ x, y }`

**Dependencies**:
- **Hook**: `useMousePosition` (mouse tracking)
- **Utils**: `calculateDistance`, `calculateEscapeVector`, `constrainToViewport`

**Internal State**: `buttonPosition` (updated when evasion needed)

**Used By**: `NoButton`

---

### Hook Dependency Graph

```
useMousePosition (base hook, no dependencies)
       ↓
useButtonEvasion
    ├─ useMousePosition
    ├─ calculateDistance (util)
    ├─ calculateEscapeVector (util)
    └─ constrainToViewport (util)
       ↓
NoButton (component)
```

---

## Utility Functions

### evasionLogic.ts

**File**: `src/utils/evasionLogic.ts`

**Exports**:

1. **calculateDistance**
   ```typescript
   function calculateDistance(point1: Point, point2: Point): number
   ```
   - Euclidean distance using Pythagorean theorem
   - Pure function (no side effects)
   - Used to check if mouse is within evasion radius

2. **calculateEscapeVector**
   ```typescript
   function calculateEscapeVector(
     mousePos: Point,
     buttonPos: Point,
     evasionRadius: number
   ): Point
   ```
   - Vector math to calculate escape direction
   - Returns new position outside evasion radius
   - Pure function (no side effects)

3. **constrainToViewport**
   ```typescript
   function constrainToViewport(
     position: Point,
     buttonSize: ButtonSize,
     padding: number
   ): Point
   ```
   - Ensures button stays within viewport bounds
   - Accounts for button size and padding
   - Pure function (no side effects)

**Constants**:
```typescript
export const EVASION_RADIUS = 150;
export const VIEWPORT_PADDING = 20;
```

---

### celebrationConfig.ts

**File**: `src/utils/celebrationConfig.ts`

**Purpose**: Confetti configuration and celebration sequences

**Exports**:
- `centerExplosion()`: Main burst (300 particles)
- `sideCannons()`: Left/right cannons (400 particles)
- `heartRain()`: Continuous heart shower (5s)
- `sparkleBurst()`: Gold accents (100 particles)
- `fireworksSequence()`: Staggered bursts
- `triggerSpectacularCelebration()`: Master sequence

**Dependencies**: `canvas-confetti` library

**Used By**: CelebrationScreen component (future Phase 5)

---

## Style System

### theme.ts

**File**: `src/styles/theme.ts`

**Purpose**: Centralized design tokens

**Exports**:
```typescript
export const theme = {
  colors: {
    deepRose: '#E63946',
    softPink: '#FFB3C1',
    creamWhite: '#FFF5F7',
    gold: '#FFD700',
    magenta: '#D90368',
    // + semantic names + alpha functions
  },
  gradients: {
    background: '...',
    celebration: '...',
    yesButton: '...',
    glow: '...',
  },
  typography: {
    fonts: { heading, body },
    sizes: { xs, sm, base, ..., '5xl' },
    weights: { light, normal, ..., bold },
  },
  spacing: { xs, sm, md, ..., '4xl' },
  shadows: { sm, md, lg, xl, glow, goldGlow },
  breakpoints: { desktop, minDesktop },
  zIndex: { background, content, buttons, celebration, confetti },
} as const;
```

**Usage**: Import and reference in components
```typescript
import { theme } from '../../styles/theme';

style={{
  color: theme.colors.deepRose,
  background: theme.gradients.yesButton,
  fontSize: theme.typography.sizes['2xl'],
}}
```

---

### animations.ts

**File**: `src/styles/animations.ts`

**Purpose**: Reusable Framer Motion animation presets

**Exports**:
- `springs`: Spring configurations (gentle, bouncy, smooth, snappy)
- `easings`: Easing functions (easeOut, easeIn, easeInOut, anticipate)
- `buttonVariants`: Button animation states (initial, hover, tap, pulse)
- `celebrationVariants`: Celebration screen animations
- `textRevealVariants`: Letter-by-letter reveal
- `floatingHeartVariants`: Heart floating animation
- `sparkleVariants`: Sparkle effects
- `fadeVariants`: Fade in/out
- `slideUpVariants`: Slide up transition
- `containerVariants`: Stagger children

**Usage**:
```typescript
import { buttonVariants, springs } from '../../styles/animations';

<motion.button
  variants={buttonVariants}
  whileHover="hover"
  transition={springs.gentle}
/>
```

---

## Event Flow

### Mouse Move Event Flow

```
1. User moves mouse
   ↓
2. Browser fires mousemove event
   ↓
3. useMousePosition handleMouseMove stores position in ref
   ↓
4. requestAnimationFrame callback fires (60 FPS)
   ↓
5. useMousePosition updates state
   ↓
6. useButtonEvasion receives new mousePosition
   ↓
7. useButtonEvasion calculates if evasion needed
   ↓
8. If needed: calculate new position
   ↓
9. Update buttonPosition state
   ↓
10. NoButton re-renders with new position prop
    ↓
11. Framer Motion interpolates to new position
    ↓
12. Browser paints smooth animation
```

### Button Click Event Flow

```
1. User clicks Yes button
   ↓
2. YesButton onClick event fires
   ↓
3. Call onClick prop from App
   ↓
4. App handleYesClick executes
   ↓
5. [Future] Set celebration state
   ↓
6. [Future] CelebrationScreen mounts
   ↓
7. [Future] Trigger confetti bursts
   ↓
8. [Future] Animate message reveal
```

## File Organization Rationale

### Directory Structure

```
src/
├── components/              # UI components (grouped by feature)
│   ├── BackgroundHearts/
│   │   └── FloatingHearts.tsx
│   ├── ValentineButtons/
│   │   ├── ButtonContainer.tsx
│   │   ├── YesButton.tsx
│   │   └── NoButton.tsx
│   └── CelebrationScreen/   # (Future Phase 5)
│
├── hooks/                   # Custom React hooks (business logic)
│   ├── useMousePosition.ts
│   ├── useButtonEvasion.ts
│   └── useCelebration.ts    # (Future Phase 5)
│
├── utils/                   # Pure functions (calculations)
│   ├── evasionLogic.ts
│   └── celebrationConfig.ts
│
├── styles/                  # Design system
│   ├── theme.ts             # Design tokens
│   ├── animations.ts        # Animation presets
│   └── GlobalStyles.tsx     # Global CSS (future)
│
├── types/                   # Shared TypeScript types
│   └── index.ts
│
├── App.tsx                  # Root component
└── main.tsx                 # Entry point
```

### Why This Organization?

**Feature-Based Component Grouping**:
- Related components live together (`ValentineButtons/`)
- Easy to locate and modify features
- Clear component ownership

**Separate Hooks Directory**:
- Business logic separated from UI
- Hooks are testable independently
- Reusable across components

**Separate Utils Directory**:
- Pure functions are easiest to test
- No React dependencies
- Can be used in hooks or components

**Centralized Styles**:
- Single source of truth for design tokens
- Easy to maintain consistency
- Reusable animation presets

**Flat Structure**:
- No deep nesting (max 2 levels)
- Easy navigation
- Clear file purposes

---

## Component Communication Patterns

### Parent → Child (Props)

```typescript
// App passes callback to YesButton
<YesButton onClick={handleYesClick} />

// YesButton receives and uses prop
function YesButton({ onClick }: YesButtonProps) {
  return <button onClick={onClick}>...</button>;
}
```

### Child → Parent (Callback Props)

```typescript
// YesButton notifies parent via callback
const handleClick = () => {
  onClick(); // Call parent's function
};
```

### Sibling Communication (Lifted State)

```typescript
// State lives in common parent (App)
const [isCelebrating, setIsCelebrating] = useState(false);

// Both siblings can access state
<YesButton onClick={() => setIsCelebrating(true)} />
<CelebrationScreen show={isCelebrating} />
```

### Global State (Hooks)

```typescript
// useMousePosition provides global mouse state
function NoButton() {
  const mousePosition = useMousePosition(); // Same instance across app
  // ...
}
```

---

## Performance Considerations

### Render Optimization

1. **Memoization**:
   - `FloatingHearts`: Memoize hearts array
   - Prevents regeneration on every render

2. **Ref Usage**:
   - `useMousePosition`: Store raw position in ref
   - Only update state at 60 FPS

3. **Pure Components**:
   - `YesButton`: No internal state, pure presentation
   - React can optimize re-renders

### Animation Performance

1. **GPU Acceleration**:
   - Use `transform` properties (x, y, scale)
   - Avoid layout-triggering properties (width, height, left, right)

2. **RequestAnimationFrame**:
   - Sync updates with browser paint cycle
   - Prevents dropped frames

3. **Spring Physics**:
   - Framer Motion uses optimized spring calculations
   - Runs on GPU via transform properties

---

## Testing Strategy

### Component Testing

Each component should be testable via Playwright:

1. **FloatingHearts**: Verify 20 hearts render
2. **ButtonContainer**: Check layout and spacing
3. **YesButton**: Test click handler, hover effects
4. **NoButton**: Test evasion behavior

### Hook Testing

Hooks are tested indirectly via components:

1. **useMousePosition**: Test via mouse movement in browser
2. **useButtonEvasion**: Test via NoButton evasion behavior

### Integration Testing

Full user flows:
1. Hover over Yes button → glow appears
2. Move mouse near No button → button evades
3. Click Yes button → celebration triggers

---

## Future Architecture Enhancements

### Phase 5: Celebration Screen

**New Components**:
```
└── CelebrationScreen/
    ├── CelebrationScreen.tsx      # Container
    ├── CelebrationAnimation.tsx   # Confetti wrapper
    └── MessageReveal.tsx          # Text animation
```

**New Hooks**:
```typescript
// useCelebration.ts
export function useCelebration() {
  const [isCelebrating, setIsCelebrating] = useState(false);

  const celebrate = () => {
    setIsCelebrating(true);
    triggerSpectacularCelebration();
  };

  return { isCelebrating, celebrate };
}
```

**Integration**:
```typescript
// App.tsx
const { isCelebrating, celebrate } = useCelebration();

<YesButton onClick={celebrate} />
{isCelebrating && <CelebrationScreen />}
```

### Potential Improvements

1. **Context API**: If state grows complex, use React Context
2. **Lazy Loading**: Code-split CelebrationScreen
3. **Error Boundaries**: Catch animation errors gracefully
4. **Performance Monitoring**: Track FPS and render times
5. **A/B Testing**: Different animation configurations

---

**Summary**: The component architecture follows React best practices with clear separation between UI (components), logic (hooks), and calculations (utils). State flows unidirectionally from hooks to components. Event handling uses callbacks. The structure is simple, testable, and ready for future enhancements.
