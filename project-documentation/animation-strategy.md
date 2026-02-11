# Animation Strategy

This document provides a deep technical dive into the animation implementation for the Valentine's Day website, including the evasion algorithm, vector math, performance optimizations, and celebration sequences.

## Mouse Tracking System

### Implementation Overview

The mouse tracking system forms the foundation for button evasion, providing global cursor position updates at 60 FPS.

**Hook**: `useMousePosition.ts`

```typescript
export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const latestMousePositionRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      latestMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const updateMousePosition = () => {
      setMousePosition(latestMousePositionRef.current);
      animationFrameRef.current = requestAnimationFrame(updateMousePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return mousePosition;
}
```

### Technical Details

**Two-Phase Approach**:
1. **Event Listener**: Captures raw mouse events and stores position in a ref (no state update).
2. **Animation Frame**: Updates state at 60 FPS using the latest stored position.

**Why This Works**:
- Mouse events fire irregularly (can be faster or slower than 60 FPS).
- Storing in a ref prevents excessive re-renders from mouse event spam.
- `requestAnimationFrame` ensures updates sync with browser paint cycles.
- State updates happen at a consistent 60 FPS regardless of mouse movement speed.

**Performance Benefits**:
- Decouples event frequency from render frequency
- Prevents dropped frames during rapid mouse movement
- Guarantees consistent animation timing
- GPU-accelerated via `requestAnimationFrame`

## Button Evasion Algorithm

### Vector Math Breakdown

The evasion system uses 2D vector mathematics to calculate button movement away from the cursor.

#### Distance Calculation

**Formula**: Euclidean distance using the Pythagorean theorem

```
distance = √[(x₂ - x₁)² + (y₂ - y₁)²]
```

**Implementation**:
```typescript
export function calculateDistance(point1: Point, point2: Point): number {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
```

**Usage**: Determines if the mouse is within the evasion radius (150px) of the button.

#### Escape Vector Calculation

**Algorithm**:
1. Calculate direction vector from mouse to button center
2. Normalize the direction vector (make length = 1)
3. Scale the normalized vector by escape distance
4. Add scaled vector to mouse position to get new button position

**Mathematical Breakdown**:

```
Step 1: Direction Vector
dx = buttonX - mouseX
dy = buttonY - mouseY

Step 2: Normalize
length = √(dx² + dy²)
normalizedDx = dx / length
normalizedDy = dy / length

Step 3: Calculate Escape Position
escapeDistance = evasionRadius × 1.2
newX = mouseX + (normalizedDx × escapeDistance)
newY = mouseY + (normalizedDy × escapeDistance)
```

**Implementation**:
```typescript
export function calculateEscapeVector(
  mousePos: Point,
  buttonPos: Point,
  evasionRadius: number = EVASION_RADIUS
): Point {
  // Direction from mouse to button
  const dx = buttonPos.x - mousePos.x;
  const dy = buttonPos.y - mousePos.y;

  // Current distance
  const distance = Math.sqrt(dx * dx + dy * dy);

  // No need to move if far enough
  if (distance >= evasionRadius) {
    return buttonPos;
  }

  // Normalize direction
  const normalizedDx = dx / distance;
  const normalizedDy = dy / distance;

  // Calculate escape distance (20% beyond evasion radius)
  const escapeDistance = evasionRadius * 1.2;

  // New position
  return {
    x: mousePos.x + normalizedDx * escapeDistance,
    y: mousePos.y + normalizedDy * escapeDistance,
  };
}
```

**Key Parameters**:
- **Evasion Radius**: 150px (when mouse gets this close, button moves)
- **Escape Multiplier**: 1.2× (button moves 20% beyond evasion radius for smooth feel)

**Why 1.2× Multiplier?**:
- 1.0× would place button exactly on the evasion radius edge (feels too close)
- 1.2× provides comfortable buffer, making button feel "playfully elusive"
- Higher values would make button move too far, breaking the playful chase

### Boundary Constraint Logic

**Problem**: Escape vector might place button outside viewport bounds.

**Solution**: Constrain button position to stay within viewport with padding.

**Formula**:
```
constrainedX = max(padding, min(x, viewportWidth - buttonWidth - padding))
constrainedY = max(padding, min(y, viewportHeight - buttonHeight - padding))
```

**Implementation**:
```typescript
export function constrainToViewport(
  position: Point,
  buttonSize: ButtonSize,
  padding: number = VIEWPORT_PADDING
): Point {
  const maxX = window.innerWidth - buttonSize.width - padding;
  const maxY = window.innerHeight - buttonSize.height - padding;

  return {
    x: Math.max(padding, Math.min(position.x, maxX)),
    y: Math.max(padding, Math.min(position.y, maxY)),
  };
}
```

**Parameters**:
- **Viewport Padding**: 20px (prevents button from touching edges)
- **Button Size**: Accounted for when calculating max position

**Edge Case Handling**:
- If escape vector points outside viewport, button moves to nearest valid position
- Button never escapes or gets cut off
- Maintains playful behavior even at screen edges

### Complete Evasion Flow

**Hook**: `useButtonEvasion.ts`

```typescript
export function useButtonEvasion({
  buttonSize,
  evasionRadius = EVASION_RADIUS,
  initialPosition = { x: 0, y: 0 },
}: UseButtonEvasionOptions): ButtonPosition {
  const mousePosition = useMousePosition();
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>(initialPosition);

  useEffect(() => {
    // Calculate button center (position is top-left corner)
    const buttonCenter = {
      x: buttonPosition.x + buttonSize.width / 2,
      y: buttonPosition.y + buttonSize.height / 2,
    };

    // Check distance from mouse to button
    const distance = calculateDistance(mousePosition, buttonCenter);

    // Only evade if within evasion radius
    if (distance < evasionRadius) {
      // Calculate escape position (center)
      const escapedCenter = calculateEscapeVector(
        mousePosition,
        buttonCenter,
        evasionRadius
      );

      // Convert center back to top-left
      const escapedTopLeft = {
        x: escapedCenter.x - buttonSize.width / 2,
        y: escapedCenter.y - buttonSize.height / 2,
      };

      // Constrain to viewport
      const constrainedPosition = constrainToViewport(escapedTopLeft, buttonSize);

      // Update position
      setButtonPosition(constrainedPosition);
    }
  }, [mousePosition, buttonPosition, buttonSize, evasionRadius]);

  return buttonPosition;
}
```

**Flow Diagram**:
```
Mouse Move Event
    ↓
Store Position in Ref
    ↓
requestAnimationFrame (60 FPS)
    ↓
Update mousePosition State
    ↓
useButtonEvasion Effect Triggers
    ↓
Calculate Button Center
    ↓
Calculate Distance to Mouse
    ↓
Distance < Evasion Radius?
    ↓ YES              ↓ NO
Calculate Escape    Do Nothing
    ↓
Convert to Top-Left
    ↓
Constrain to Viewport
    ↓
Update Button Position State
    ↓
Framer Motion Animates Transition
```

## Framer Motion Integration

### Spring Physics

Framer Motion uses spring physics to create natural, organic motion for button evasion.

**Spring Configuration**:
```typescript
transition={{
  type: 'spring',
  damping: 20,
  stiffness: 300,
}}
```

**Parameters Explained**:
- **type**: 'spring' (physics-based rather than duration-based)
- **damping**: 20 (controls "bounciness" - higher = less bounce)
- **stiffness**: 300 (controls "speed" - higher = faster movement)

**Why These Values?**:
- **Damping 20**: Provides smooth movement without excessive bounce (playful but not cartoonish)
- **Stiffness 300**: Fast enough to feel responsive, slow enough to track visually
- Together they create a "gentle" spring that feels natural

**Alternative Spring Presets** (defined in `animations.ts`):
```typescript
export const springs = {
  gentle: { damping: 20, stiffness: 300 },   // Button evasion
  bouncy: { damping: 15, stiffness: 400 },   // Playful elements
  smooth: { damping: 25, stiffness: 200 },   // Fade-ins
  snappy: { damping: 30, stiffness: 500 },   // Tap feedback
};
```

### Button Animation Variants

**Yes Button** - Breathing Animation:
```typescript
animate="pulse"

variants={{
  pulse: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}}
```
- Continuously pulses to draw attention
- 2-second cycle feels calming and inviting
- Scale 1.02 is subtle (not distracting)

**No Button** - Evasion Animation:
```typescript
<motion.button
  animate={{ x: position.x, y: position.y }}
  transition={{
    type: 'spring',
    damping: 20,
    stiffness: 300,
  }}
/>
```
- Position updates trigger smooth spring animation
- Absolute positioning allows movement anywhere on screen
- Spring physics make movement feel "alive"

## Celebration Animation Layers

The celebration consists of multiple synchronized animation layers for maximum impact.

### Layer 1: Confetti Bursts (Immediate)

**Center Explosion**:
```typescript
confetti({
  particleCount: 300,
  spread: 360,
  origin: { x: 0.5, y: 0.5 },
  colors: ['#E63946', '#FFB3C1', '#FFD700', '#D90368'],
  shapes: ['circle', 'square'],
  scalar: 1.5,
  gravity: 0.8,
  ticks: 300,
  startVelocity: 45,
});
```

**Parameters**:
- **particleCount**: 300 (spectacular density)
- **spread**: 360° (full circle explosion)
- **origin**: Center of screen (x: 0.5, y: 0.5)
- **scalar**: 1.5 (50% larger particles)
- **gravity**: 0.8 (slower fall for longer visibility)
- **ticks**: 300 (longer duration before particles disappear)
- **startVelocity**: 45 (moderate initial speed)

### Layer 2: Side Cannons (+100ms)

**Left & Right Cannons**:
```typescript
// Left
confetti({
  particleCount: 200,
  angle: 60,      // Aim right-upward
  spread: 55,
  origin: { x: 0, y: 0.6 },
  startVelocity: 55,
});

// Right
confetti({
  particleCount: 200,
  angle: 120,     // Aim left-upward
  spread: 55,
  origin: { x: 1, y: 0.6 },
  startVelocity: 55,
});
```

**Why Cannons?**:
- Creates a "fountain" effect from sides
- Fills screen from multiple directions
- Adds depth and dimensionality

### Layer 3: Sparkle Burst (+300ms)

**Gold Sparkles**:
```typescript
confetti({
  particleCount: 100,
  spread: 360,
  origin: { x: 0.5, y: 0.5 },
  colors: ['#FFD700', '#FFA500'],
  shapes: ['circle'],
  scalar: 0.8,    // Smaller particles
  gravity: 0.5,   // Very slow fall
  ticks: 200,
  startVelocity: 35,
});
```

**Purpose**: Add shimmer and luxury with gold accents

### Layer 4: Heart Rain (+500ms, Continuous 5s)

**Continuous Heart Shower**:
```typescript
const heartRain = () => {
  const duration = 5000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 90,
      spread: 45,
      origin: { x: Math.random(), y: 0 },
      colors: ['#E63946', '#FFB3C1', '#D90368'],
      shapes: ['circle'],
      scalar: 2,      // Large hearts
      gravity: 0.6,   // Gentle fall
      ticks: 400,
      startVelocity: 15,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};
```

**Technical Details**:
- Uses `requestAnimationFrame` for smooth continuous bursts
- Random x-origin creates natural spread
- 3 particles per frame keeps density manageable
- 5-second duration ensures prolonged celebration

### Layer 5: Fireworks Sequence (+700ms)

**Staggered Bursts at Multiple Points**:
```typescript
const positions = [
  { x: 0.2, y: 0.3 },  // Top-left
  { x: 0.8, y: 0.3 },  // Top-right
  { x: 0.5, y: 0.2 },  // Top-center
  { x: 0.3, y: 0.5 },  // Mid-left
  { x: 0.7, y: 0.5 },  // Mid-right
];

positions.forEach((pos, index) => {
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: pos,
      colors: CELEBRATION_COLORS,
    });
  }, index * 200); // 200ms stagger
});
```

**Timing Diagram**:
```
T=0ms:    Center explosion (300 particles)
T=100ms:  Side cannons (400 particles total)
T=300ms:  Sparkle burst (100 particles)
T=500ms:  Heart rain begins (continuous)
T=700ms:  Fireworks position 1
T=900ms:  Fireworks position 2
T=1100ms: Fireworks position 3
T=1300ms: Fireworks position 5
T=1500ms: Fireworks position 5
T=5500ms: Heart rain ends
```

### Celebration Screen Animation

**Scale-In Transition**:
```typescript
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
        duration: 0.8,
      },
    },
  }}
>
```

**Text Reveal** (Letter-by-Letter):
```typescript
const text = "You will get your gift soon";
const letters = text.split('');

letters.map((letter, index) => (
  <motion.span
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: index * 0.05,  // 50ms stagger
      duration: 0.3,
      ease: [0.0, 0.0, 0.2, 1],
    }}
  >
    {letter}
  </motion.span>
))
```

## Performance Optimization Techniques

### 60 FPS Target

**Strategies**:
1. **GPU Acceleration**: All animations use `transform` and `opacity` (GPU-accelerated properties)
2. **requestAnimationFrame**: Syncs updates with browser paint cycles
3. **Avoid Layout Thrashing**: No style reads during animation loops
4. **Minimal Re-renders**: Refs for intermediate values, state only for render-critical data

### Bundle Size Optimization

**Lazy Loading**:
```typescript
// Load confetti only when needed
const confetti = await import('canvas-confetti');
```

**Tree Shaking**:
- Import only used Framer Motion features
- No unused animation variants in production bundle

**Code Splitting**:
- Celebration animations loaded on demand
- Initial bundle contains only core functionality

### Memory Management

**Cleanup**:
```typescript
useEffect(() => {
  // Setup
  const animationFrameRef = requestAnimationFrame(update);

  // Cleanup
  return () => {
    cancelAnimationFrame(animationFrameRef);
  };
}, []);
```

**Memoization**:
```typescript
// FloatingHearts: Generate hearts once, not on every render
const hearts = useMemo(() => generateHearts(), []);
```

## Animation Best Practices

1. **Use springs for organic motion** - Duration-based animations feel robotic
2. **Stagger sequences for richness** - Simultaneous animations look flat
3. **Respect the 60 FPS target** - Janky animations ruin the experience
4. **Clean up effects** - Cancel animation frames, remove listeners
5. **Test on target hardware** - Desktop can handle more than mobile
6. **Layer animations** - Multiple subtle effects > one complex effect
7. **Use GPU-accelerated properties** - `transform`, `opacity` only
8. **Provide visual feedback** - Every interaction should have a response

---

**Summary**: The animation system combines mathematical precision (vector calculations), physics realism (spring animations), and artistic timing (multi-layer sequences) to create a smooth, delightful, and memorable experience. Performance optimizations ensure consistent 60 FPS across all interactions.
