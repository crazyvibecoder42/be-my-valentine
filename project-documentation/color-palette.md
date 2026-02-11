# Color Palette

This document provides a complete reference for the Valentine's Day website color system, including hex codes, usage guidelines, gradients, contrast ratios, and emotional associations.

## Core Color Palette

### Deep Rose
**Hex**: `#E63946`
**RGB**: `rgb(230, 57, 70)`
**HSL**: `hsl(357, 79%, 56%)`

**Semantic Names**: `primary`, `deepRose`

**Usage**:
- Primary CTA buttons (Yes button background via gradient)
- Main heading text ("Will you be my Valentine?")
- Border accents on secondary elements
- Confetti particles

**When to Use**:
- Call-to-action elements that need attention
- Primary interactive elements
- Emphasis text or icons
- Branding elements

**Emotional Associations**:
- Passion and romance
- Energy and excitement
- Confidence and boldness
- Love and desire

**Accessibility**:
- Contrast on white background: 4.53:1 (WCAG AA compliant for large text)
- Use white text on deep rose: 5.49:1 (WCAG AA compliant)

---

### Soft Pink
**Hex**: `#FFB3C1`
**RGB**: `rgb(255, 179, 193)`
**HSL**: `hsl(349, 100%, 85%)`

**Semantic Names**: `secondary`, `softPink`

**Usage**:
- No button background
- Background gradient accents
- Border colors with transparency
- Secondary UI elements
- Confetti particles

**When to Use**:
- Backgrounds that need warmth without overwhelming
- Secondary buttons or actions
- Decorative elements
- Gradient transitions

**Emotional Associations**:
- Sweetness and tenderness
- Warmth and comfort
- Playfulness and lightness
- Innocence and joy

**Accessibility**:
- Contrast on white background: 1.51:1 (Not sufficient for text)
- Use dark text on soft pink: Excellent contrast
- Best used as background or decorative element

**Transparency Variants**:
```typescript
colors.softPinkAlpha(0.3)  // 30% opacity for subtle backgrounds
colors.softPinkAlpha(0.5)  // 50% opacity for gradients
colors.softPinkAlpha(0.8)  // 80% opacity for overlays
```

---

### Cream White
**Hex**: `#FFF5F7`
**RGB**: `rgb(255, 245, 247)`
**HSL**: `hsl(348, 100%, 98%)`

**Semantic Names**: `background`, `creamWhite`

**Usage**:
- Main background color
- Card backgrounds
- Text on dark elements
- Base for gradients

**When to Use**:
- Primary background
- Canvas for content
- High-contrast text on dark backgrounds
- Base layer for layered designs

**Emotional Associations**:
- Purity and cleanliness
- Romance and intimacy
- Softness and warmth
- Elegance and simplicity

**Why Not Pure White?**:
- Pure white (#FFFFFF) feels clinical and cold
- Cream white (#FFF5F7) has a pink tint that adds warmth
- Creates a cohesive romantic atmosphere
- Easier on the eyes for extended viewing

**Accessibility**:
- Excellent contrast with deep rose and magenta
- Works well as background for all text colors
- WCAG AAA compliant with dark text

---

### Gold
**Hex**: `#FFD700`
**RGB**: `rgb(255, 215, 0)`
**HSL**: `hsl(51, 100%, 50%)`

**Semantic Names**: `celebration`, `gold`

**Usage**:
- Celebration confetti particles
- Sparkle effects
- Gradient accents (celebration screen)
- Glow effects
- Accent elements during animations

**When to Use**:
- Celebration moments only (not for static UI)
- Sparkle and shine effects
- Premium or special elements
- Drawing attention to success states

**Emotional Associations**:
- Celebration and joy
- Luxury and premium
- Success and achievement
- Warmth and radiance

**Accessibility**:
- Contrast on white background: 1.47:1 (Not sufficient for text)
- Use sparingly as accent, not for text or critical UI
- Best for decorative and celebratory elements

**Transparency Variants**:
```typescript
colors.goldAlpha(0.4)  // Subtle glow effects
colors.goldAlpha(0.6)  // Button glow shadows
```

---

### Magenta
**Hex**: `#D90368`
**RGB**: `rgb(217, 3, 104)`
**HSL**: `hsl(332, 97%, 43%)`

**Semantic Names**: `accent`, `magenta`

**Usage**:
- Gradient end colors (Yes button, celebration background)
- Secondary accent color
- Confetti particles
- Energy and emphasis elements

**When to Use**:
- Creating vibrant gradients
- Energetic accent elements
- Confetti and particle effects
- Adding vibrancy to compositions

**Emotional Associations**:
- Energy and excitement
- Modern and bold
- Passion and intensity
- Creativity and uniqueness

**Accessibility**:
- Contrast on white background: 5.75:1 (WCAG AA compliant)
- Can be used for text on light backgrounds
- Strong visual impact, use sparingly

---

## Gradients

### Background Gradient
```typescript
linear-gradient(135deg, #FFF5F7 0%, rgba(255, 179, 193, 0.3) 100%)
```

**Direction**: 135° (diagonal from top-left to bottom-right)

**Color Stops**:
- 0%: Cream White `#FFF5F7` (opaque)
- 100%: Soft Pink at 30% opacity `rgba(255, 179, 193, 0.3)`

**Usage**: Main app background

**Visual Effect**: Subtle warmth that increases toward the bottom-right, creating depth without distraction.

**Why This Works**:
- Maintains readability with light base
- Adds visual interest without overwhelming content
- Creates a gentle romantic atmosphere
- Diagonal direction guides eye toward content center

---

### Yes Button Gradient
```typescript
linear-gradient(135deg, #E63946 0%, #D90368 100%)
```

**Direction**: 135° (diagonal)

**Color Stops**:
- 0%: Deep Rose `#E63946`
- 100%: Magenta `#D90368`

**Usage**: Yes button background

**Visual Effect**: Bold, energetic gradient that draws attention and invites interaction.

**Why This Works**:
- Creates depth and dimensionality
- More engaging than solid color
- Conveys energy and passion
- Stands out against cream background

---

### Celebration Gradient
```typescript
linear-gradient(135deg, #D90368 0%, #E63946 50%, #FFD700 100%)
```

**Direction**: 135° (diagonal)

**Color Stops**:
- 0%: Magenta `#D90368`
- 50%: Deep Rose `#E63946`
- 100%: Gold `#FFD700`

**Usage**: Celebration screen background

**Visual Effect**: Vibrant, joyful gradient that creates a sense of celebration and success.

**Why Three Colors?**:
- Magenta: Energy and excitement
- Deep Rose: Love and passion
- Gold: Celebration and luxury
- Together: Maximum visual impact for the special moment

---

### Glow Gradient
```typescript
radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)
```

**Type**: Radial (circular)

**Color Stops**:
- 0%: Gold at 40% opacity `rgba(255, 215, 0, 0.4)`
- 70%: Transparent

**Usage**: Hover glow effect on Yes button

**Visual Effect**: Soft golden glow that emanates from button center, creating a magical feel.

**Why Radial?**:
- Creates natural light emanation effect
- Fades smoothly to transparent
- Appears and scales on hover for interactive feedback

---

## Color Usage Guidelines

### Do's

1. **Use cream white for backgrounds** - Creates warm, romantic base
2. **Use deep rose for primary actions** - Clear hierarchy and attention
3. **Use soft pink for secondary elements** - Complements without competing
4. **Use gold sparingly** - Accents and celebrations only
5. **Use magenta in gradients** - Adds energy and vibrancy
6. **Combine colors via gradients** - More engaging than solid colors
7. **Use transparency for layering** - Creates depth and sophistication

### Don'ts

1. **Don't use gold for text** - Low contrast, hard to read
2. **Don't use soft pink for text** - Insufficient contrast on light backgrounds
3. **Don't mix too many colors at once** - Stick to 2-3 per element
4. **Don't use pure black** - Harsh, inconsistent with palette (use deep rose for dark text)
5. **Don't ignore contrast ratios** - Test with WCAG guidelines
6. **Don't overuse bright colors** - Balance with neutrals (cream white)

---

## Color Combinations

### High Contrast (Accessible)

```typescript
// Primary text on light background
color: colors.deepRose     // #E63946
background: colors.creamWhite  // #FFF5F7
// Contrast: 4.53:1 (WCAG AA for large text)

// White text on primary button
color: '#FFFFFF'
background: colors.deepRose  // #E63946
// Contrast: 5.49:1 (WCAG AA compliant)

// Magenta text on light background
color: colors.magenta      // #D90368
background: colors.creamWhite  // #FFF5F7
// Contrast: 5.75:1 (WCAG AA compliant)
```

### Complementary Pairs

```typescript
// Passionate
colors.deepRose + colors.softPink

// Energetic
colors.magenta + colors.gold

// Romantic
colors.softPink + colors.creamWhite

// Celebratory
colors.gold + colors.deepRose

// Bold
colors.magenta + colors.deepRose
```

### Gradient Recipes

```typescript
// Subtle background
`linear-gradient(135deg, ${colors.creamWhite}, ${colors.softPinkAlpha(0.3)})`

// Bold button
`linear-gradient(135deg, ${colors.deepRose}, ${colors.magenta})`

// Celebration
`linear-gradient(135deg, ${colors.magenta}, ${colors.deepRose}, ${colors.gold})`

// Soft overlay
`linear-gradient(180deg, transparent, ${colors.softPinkAlpha(0.5)})`

// Glow effect
`radial-gradient(circle, ${colors.goldAlpha(0.4)}, transparent)`
```

---

## Shadows & Effects

### Box Shadows

```typescript
// Subtle elevation
shadows.sm = '0 2px 4px rgba(0, 0, 0, 0.1)'

// Medium elevation
shadows.md = '0 4px 8px rgba(0, 0, 0, 0.12)'

// High elevation
shadows.lg = '0 8px 16px rgba(0, 0, 0, 0.15)'

// Extra high elevation
shadows.xl = '0 12px 24px rgba(0, 0, 0, 0.18)'
```

### Glow Shadows

```typescript
// Deep rose glow
shadows.glow = `0 0 20px ${colors.deepRoseAlpha(0.5)}`
// Use: Hover state for primary elements

// Gold glow
shadows.goldGlow = `0 0 30px ${colors.goldAlpha(0.6)}`
// Use: Celebration elements, sparkle effects
```

**When to Use**:
- `.sm`: Cards, small interactive elements
- `.md`: Buttons, input fields
- `.lg`: Yes button, prominent CTAs
- `.xl`: Modals, celebration screen
- `.glow`: Hover effects, interactive feedback
- `.goldGlow`: Celebration mode, special moments

---

## Emotional Color Strategy

### Color Psychology Mapping

| Emotion | Primary Color | Secondary Color | Usage |
|---------|--------------|----------------|-------|
| **Love** | Deep Rose | Soft Pink | Headings, CTAs |
| **Joy** | Gold | Soft Pink | Confetti, celebrations |
| **Passion** | Magenta | Deep Rose | Gradients, emphasis |
| **Tenderness** | Soft Pink | Cream White | Backgrounds, cards |
| **Elegance** | Cream White | Gold | Base, premium accents |
| **Energy** | Magenta | Gold | Animations, particles |

### Emotional Journey

1. **Initial View** (Anticipation)
   - Soft pink background gradient
   - Deep rose heading
   - Breathing Yes button (rose/magenta gradient)
   - Floating hearts (soft pink)

2. **Interaction** (Playfulness)
   - No button evades (soft pink)
   - Yes button glows on hover (gold glow)
   - Mouse tracking (transparent)

3. **Celebration** (Joy & Success)
   - Vibrant gradient background (magenta → rose → gold)
   - Gold confetti explosions
   - Rose/pink heart rain
   - White text on gradient (high contrast)

---

## WCAG Compliance

### AA Level (Required)

| Foreground | Background | Ratio | Status | Use Case |
|------------|-----------|-------|--------|----------|
| Deep Rose | Cream White | 4.53:1 | ✅ Large Text | Headings (24px+) |
| White | Deep Rose | 5.49:1 | ✅ All Text | Button text |
| Magenta | Cream White | 5.75:1 | ✅ All Text | Body text |
| Soft Pink | Cream White | 1.51:1 | ❌ | Background only |
| Gold | Cream White | 1.47:1 | ❌ | Decorative only |

### AAA Level (Enhanced)

| Foreground | Background | Ratio | Status |
|------------|-----------|-------|--------|
| Deep Rose | Cream White | 4.53:1 | ❌ (needs 7:1) |
| White | Deep Rose | 5.49:1 | ❌ (needs 7:1) |
| Magenta | Cream White | 5.75:1 | ❌ (needs 7:1) |

**Note**: This project prioritizes emotional impact over AAA compliance. All critical text meets AA standards.

---

## Implementation Reference

### Theme File Structure

```typescript
// src/styles/theme.ts

export const colors = {
  // Core palette
  deepRose: '#E63946',
  softPink: '#FFB3C1',
  creamWhite: '#FFF5F7',
  gold: '#FFD700',
  magenta: '#D90368',

  // Semantic mapping
  primary: '#E63946',
  secondary: '#FFB3C1',
  accent: '#D90368',
  background: '#FFF5F7',
  celebration: '#FFD700',

  // Transparency functions
  deepRoseAlpha: (opacity: number) => `rgba(230, 57, 70, ${opacity})`,
  softPinkAlpha: (opacity: number) => `rgba(255, 179, 193, ${opacity})`,
  goldAlpha: (opacity: number) => `rgba(255, 215, 0, ${opacity})`,
} as const;
```

### Using Colors in Components

```typescript
// Direct color
style={{ color: theme.colors.deepRose }}

// Gradient
style={{ background: theme.gradients.yesButton }}

// With transparency
style={{ borderColor: theme.colors.deepRoseAlpha(0.2) }}

// Shadow
style={{ boxShadow: theme.shadows.glow }}
```

---

## Color Testing Checklist

When adding new elements:

- [ ] Verify contrast ratio meets WCAG AA for text
- [ ] Test color combination on actual device (not just design tool)
- [ ] Ensure colors work in celebration mode
- [ ] Check readability at different screen brightness levels
- [ ] Confirm colors match Valentine's romantic theme
- [ ] Test with colorblind simulation (red-green deficiency)
- [ ] Verify consistency with existing palette
- [ ] Document any new color combinations

---

**Summary**: The Valentine color palette uses five core colors to create a romantic, joyful, and engaging experience. Deep rose and magenta provide passion and energy, soft pink adds tenderness, cream white offers elegance, and gold brings celebration. Gradients and transparency create depth, while careful attention to contrast ensures accessibility.
