# Testing Strategy

This document explains the testing approach for the Valentine's Day website, including Playwright MCP integration, test scenarios, coverage targets, and testing philosophy.

## Testing Philosophy

### Behavior-Driven Testing

**Principle**: Test what users experience, not implementation details.

**Focus Areas**:
- User interactions (clicks, hovers, mouse movement)
- Visual appearance (colors, sizes, layout)
- Animation behavior (smoothness, timing)
- Functional outcomes (button evasion, celebration triggers)

**What We Test**:
✅ Does the Yes button appear with correct styling?
✅ Does the No button move away from the mouse?
✅ Does clicking Yes trigger the celebration?
✅ Are animations smooth and properly timed?

**What We Don't Test**:
❌ Internal React state implementation
❌ Specific hook function calls
❌ Component render count
❌ Implementation details of vector math (tested indirectly)

### User-Centric Approach

**Core Principle**: If a user can't see or interact with it, it doesn't need a dedicated test.

**Example**:
- Don't test: "Does `useMousePosition` update state?"
- Do test: "Does the No button move when the mouse approaches?"

The second test covers the first implicitly through actual user experience.

---

## Playwright MCP Integration

### Why Playwright MCP?

**Decision**: Use Playwright exclusively via MCP tools, no manual testing.

**Advantages**:
1. **Automation**: Tests run via tools, ensuring repeatability
2. **Real Browser**: Tests in actual Chromium, not a simulator
3. **Visual Testing**: Can verify layout, colors, animations
4. **Tool Integration**: Leverages Claude MCP capabilities
5. **CI/CD Ready**: Can be integrated into deployment pipeline

**Limitations**:
- Requires dev server to be running
- MCP tools must be available in environment
- Cannot test production deploy directly (must use preview)

### How MCP Testing Works

**Process**:
1. Start dev server (`npm run dev`)
2. Use MCP Playwright tools to navigate to `http://localhost:5173`
3. Execute test scenarios via MCP tool calls
4. Verify results using snapshots, screenshots, or assertions
5. Repeat for all test scenarios

**MCP Tools Used**:
- `browser_navigate`: Navigate to app URL
- `browser_snapshot`: Capture accessibility tree
- `browser_click`: Interact with buttons
- `browser_hover`: Test hover effects
- `browser_take_screenshot`: Visual verification
- `browser_evaluate`: Run JavaScript for assertions

---

## Test Organization

### Test File Structure

```
tests/
└── e2e/
    ├── button-interaction.spec.ts     # Basic button functionality
    ├── evasion-behavior.spec.ts       # Mouse evasion (CRITICAL)
    └── celebration.spec.ts            # Celebration animations
```

### Why This Structure?

**Feature-Based Organization**:
- Each file focuses on one major feature
- Easy to locate relevant tests
- Clear test ownership

**e2e Directory**:
- All tests are end-to-end (full browser)
- No unit tests needed for this project
- Simple, flat structure

---

## Test Scenarios

### 1. Button Interaction Tests

**File**: `tests/e2e/button-interaction.spec.ts`

**Purpose**: Verify basic button rendering, styling, and hover effects

#### Test Cases

**1.1: Both Buttons Render**
```typescript
test('Yes and No buttons are visible', async () => {
  // Navigate to app
  // Take snapshot
  // Verify "Yes I will be your valentine" button exists
  // Verify "No" button exists
});
```

**Expected**:
- Yes button with text "Yes I will be your valentine ❤️"
- No button with text "No"
- Both buttons visible in viewport

---

**1.2: Button Sizes Are Correct**
```typescript
test('Yes button is larger than No button', async () => {
  // Get Yes button dimensions
  // Get No button dimensions
  // Assert Yes button width > No button width
  // Assert Yes button height > No button height
});
```

**Expected**:
- Yes button: 300px × 80px
- No button: 120px × 50px
- Yes button clearly larger and more prominent

---

**1.3: Button Colors Are Correct**
```typescript
test('Buttons have correct color styling', async () => {
  // Get Yes button computed styles
  // Verify gradient background (deep rose to magenta)
  // Verify white text color

  // Get No button computed styles
  // Verify soft pink background
  // Verify deep rose text color
});
```

**Expected**:
- Yes button: Gradient background, white text
- No button: Soft pink background, deep rose text
- Colors match theme configuration

---

**1.4: Yes Button Hover Effect**
```typescript
test('Yes button shows glow effect on hover', async () => {
  // Hover over Yes button
  // Wait for animation
  // Verify scale increase (1.05)
  // Verify glow overlay appears
});
```

**Expected**:
- Button scales up slightly (1.05)
- Gold glow effect becomes visible
- Transition is smooth (no jank)

---

**1.5: Heading Text Displays**
```typescript
test('Main heading is visible', async () => {
  // Verify heading text "Will you be my Valentine?"
  // Verify deep rose color
  // Verify correct font (Pacifico)
});
```

**Expected**:
- Heading visible and centered
- Correct romantic text
- Proper styling

---

### 2. Evasion Behavior Tests ⭐ CRITICAL

**File**: `tests/e2e/evasion-behavior.spec.ts`

**Purpose**: Verify the core feature - button evasion using vector math

**Why Critical**: This is the signature feature of the entire project.

#### Test Cases

**2.1: No Button Moves When Mouse Approaches**
```typescript
test('No button evades mouse cursor', async () => {
  // Get initial No button position
  // Move mouse to within 150px of button center
  // Wait for animation
  // Get new No button position
  // Assert position has changed
  // Assert button moved away from mouse
});
```

**Expected**:
- Button detects mouse within 150px
- Button moves away from mouse cursor
- Movement direction is away from mouse (vector math correct)
- Animation completes smoothly

**Math Verification**:
```
distance = √[(mouseX - buttonX)² + (mouseY - buttonY)²]

If distance < 150px:
  Calculate escape vector
  Move button to new position
```

---

**2.2: No Button Stays Within Viewport**
```typescript
test('No button never escapes viewport boundaries', async () => {
  // Move mouse to top-left corner
  // Verify button position >= 20px from edges

  // Move mouse to top-right corner
  // Verify button position >= 20px from edges

  // Move mouse to bottom-left corner
  // Verify button position >= 20px from edges

  // Move mouse to bottom-right corner
  // Verify button position >= 20px from edges
});
```

**Expected**:
- Button maintains 20px padding from all edges
- Even when "cornered", button stays visible
- No clipping or escaping viewport

**Boundary Formula**:
```
maxX = window.innerWidth - buttonWidth - padding
maxY = window.innerHeight - buttonHeight - padding

constrainedX = max(padding, min(x, maxX))
constrainedY = max(padding, min(y, maxY))
```

---

**2.3: Evasion Animation Is Smooth (60 FPS)**
```typescript
test('Button evasion animation is smooth', async () => {
  // Set up frame timing measurement
  // Move mouse in circular pattern around button
  // Record animation frame timestamps
  // Calculate average FPS
  // Assert FPS >= 55 (allowing 5 frame variance)
});
```

**Expected**:
- Consistent 60 FPS (or close, 55+ acceptable)
- No frame drops during rapid movement
- Spring animation feels natural

---

**2.4: Evasion Distance Is Correct**
```typescript
test('Button maintains safe distance from cursor', async () => {
  // Position mouse at known location
  // Wait for button to evade
  // Calculate distance from mouse to button center
  // Assert distance >= 150px
});
```

**Expected**:
- Button moves to at least 150px away
- Actually moves to ~180px (150 × 1.2 multiplier)
- Creates comfortable "chase" feel

---

**2.5: Multiple Rapid Evasions Work**
```typescript
test('Button handles rapid mouse movements', async () => {
  // Move mouse rapidly in zigzag pattern
  // Verify button continues to evade
  // No lag or stuck states
  // Animation remains smooth
});
```

**Expected**:
- Button responds to all movements
- No performance degradation
- Smooth continuous evasion

---

### 3. Celebration Tests

**File**: `tests/e2e/celebration.spec.ts`

**Purpose**: Verify celebration animations trigger correctly

**Note**: These tests will be fully implemented in Phase 5

#### Test Cases

**3.1: Clicking Yes Triggers Celebration Screen**
```typescript
test('Celebration screen appears on Yes click', async () => {
  // Click Yes button
  // Wait for animation
  // Verify CelebrationScreen is visible
  // Verify buttons are hidden
});
```

**Expected**:
- Celebration screen scales in (0 → 1)
- Takes ~800ms to fully appear
- Buttons disappear or become non-interactive

---

**3.2: Confetti Animations Execute**
```typescript
test('Confetti particles appear and animate', async () => {
  // Click Yes button
  // Wait 100ms
  // Verify confetti canvas exists
  // Verify particles are animating
  // Wait 5 seconds
  // Verify confetti completes
});
```

**Expected**:
- Confetti bursts immediately
- Multiple burst patterns execute
- Heart rain continues for 5 seconds
- Particles fall with gravity

---

**3.3: Success Message Displays**
```typescript
test('Success message reveals correctly', async () => {
  // Click Yes button
  // Wait for celebration screen
  // Verify message text: "You will get your gift soon"
  // Verify letter-by-letter animation
});
```

**Expected**:
- Message appears on celebration screen
- Letters reveal one by one (50ms stagger)
- Complete message visible after ~1.5s
- Text is readable (contrast sufficient)

---

**3.4: All Animations Complete Successfully**
```typescript
test('Celebration sequence completes without errors', async () => {
  // Click Yes button
  // Monitor console for errors
  // Wait for full sequence (6+ seconds)
  // Verify no JavaScript errors
  // Verify all animations complete
});
```

**Expected**:
- No console errors
- All animations complete
- UI remains responsive
- Memory doesn't leak

---

## Test Coverage Targets

### Feature Coverage: 100%

**All User Interactions**:
- [x] Yes button hover
- [x] Yes button click
- [x] No button evasion
- [x] Mouse tracking
- [x] Celebration trigger
- [x] Confetti animations

### Component Coverage

```
Component              | Tests | Critical
-----------------------|-------|----------
YesButton              | 3     | Yes
NoButton               | 5     | Yes (CORE)
ButtonContainer        | 1     | No
FloatingHearts         | 1     | No
CelebrationScreen      | 4     | Yes
App                    | 1     | No
-----------------------|-------|----------
Total                  | 15    | 9 critical
```

### Line Coverage: Not Measured

**Why**: Behavior-driven testing focuses on outcomes, not code coverage metrics.

**Alternative**: Verify all user-facing features work correctly.

---

## Running Tests

### Prerequisites

1. **Development Server Running**:
   ```bash
   npm run dev
   # Server starts at http://localhost:5173
   ```

2. **MCP Playwright Available**:
   - Playwright MCP plugin must be configured
   - Browser binaries installed

### Execution via MCP

**Basic Test Run**:
```
1. Use browser_navigate to go to http://localhost:5173
2. Use browser_snapshot to capture initial state
3. Execute test interactions (click, hover, etc.)
4. Use browser_evaluate to check results
5. Use browser_take_screenshot for visual verification
```

**Example Workflow**:
```typescript
// Navigate to app
await browser_navigate({ url: 'http://localhost:5173' });

// Take initial snapshot
await browser_snapshot();

// Test button interaction
await browser_click({ ref: 'yes-button-ref' });

// Verify result
await browser_evaluate({
  function: '() => document.querySelector(".celebration")?.style.display'
});

// Screenshot for visual verification
await browser_take_screenshot({ filename: 'celebration.png' });
```

### Test Timing Considerations

**Recommended Timeouts**:
- Page load: 3 seconds
- Button render: 1 second
- Evasion animation: 500ms per movement
- Celebration animation: 6 seconds (full sequence)
- Confetti completion: 7 seconds

---

## CI/CD Integration (Future)

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Build
        run: npm run build

      - name: Preview build
        run: npm run preview &

      - name: Wait for server
        run: npx wait-on http://localhost:4173

      - name: Run tests
        run: npx playwright test

      - name: Upload screenshots
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: test-screenshots
          path: tests/screenshots/
```

### Deployment Verification

**Pre-Deploy Checks**:
1. All tests pass on preview build
2. Visual regression tests pass
3. Performance metrics within targets (60 FPS)
4. Bundle size < 150KB gzipped

**Post-Deploy Smoke Tests**:
1. Navigate to production URL
2. Verify buttons render
3. Test one evasion interaction
4. Verify page loads in < 3 seconds

---

## Debugging Failed Tests

### Common Issues

**Issue 1: Button Not Found**
```
Error: Selector 'button:has-text("Yes")' not found
```

**Solutions**:
- Verify dev server is running
- Check button renders in manual browser test
- Ensure correct selector syntax
- Wait for page load before interacting

---

**Issue 2: Evasion Not Working**
```
Error: Expected button position to change, but it didn't
```

**Solutions**:
- Verify mouse position is within 150px of button
- Check button dimensions match expectations (120×50)
- Ensure adequate wait time for animation
- Verify `useMousePosition` hook is active

---

**Issue 3: Animations Appear Janky**
```
Error: FPS measured at 45, expected >= 55
```

**Solutions**:
- Check for console errors during test
- Verify GPU acceleration is enabled in test browser
- Ensure no background processes consuming CPU
- Test on more powerful hardware

---

**Issue 4: Confetti Doesn't Appear**
```
Error: Expected confetti canvas, but none found
```

**Solutions**:
- Verify `canvas-confetti` loaded correctly
- Check for JavaScript errors in console
- Ensure celebration trigger actually fired
- Verify z-index layering is correct

---

### Debug Techniques

**1. Screenshot at Failure**
```typescript
try {
  await performTest();
} catch (error) {
  await browser_take_screenshot({ filename: 'failure.png' });
  throw error;
}
```

**2. Console Logs**
```typescript
await browser_console_messages({ level: 'error' });
```

**3. Network Inspection**
```typescript
await browser_network_requests({ includeStatic: false });
```

**4. Visual Snapshot**
```typescript
await browser_snapshot({ filename: 'debug-state.md' });
```

---

## Performance Testing

### Metrics to Track

**1. Animation FPS**
- Target: 60 FPS
- Minimum: 55 FPS
- Critical: Evasion animation smoothness

**2. Initial Load Time**
- Target: < 2 seconds
- Measurement: Time to interactive

**3. Bundle Size**
- Target: < 150KB gzipped
- Check: `npm run build` output

**4. Memory Usage**
- No memory leaks during celebration
- Confetti particles clean up properly

### Performance Test Example

```typescript
test('Evasion maintains 60 FPS', async () => {
  const frames = [];

  // Start monitoring
  await browser_evaluate({
    function: `() => {
      window.frames = [];
      const measure = () => {
        window.frames.push(performance.now());
        requestAnimationFrame(measure);
      };
      measure();
    }`
  });

  // Trigger evasion for 3 seconds
  // Move mouse in pattern

  // Calculate FPS
  await browser_evaluate({
    function: `() => {
      const times = window.frames;
      const fps = times.length / 3; // 3 seconds
      return fps;
    }`
  });

  // Assert FPS >= 55
});
```

---

## Test Maintenance

### When to Update Tests

**Trigger Events**:
1. **Feature Changes**: Update affected tests
2. **UI Changes**: Update selectors, expected values
3. **Animation Changes**: Update timing expectations
4. **Bug Fixes**: Add regression test

### Test Review Checklist

Before deploying:
- [ ] All tests pass on local machine
- [ ] All tests pass on CI (if configured)
- [ ] No flaky tests (run 3 times to verify)
- [ ] Test timing is realistic (not too slow/fast)
- [ ] Screenshots are captured for visual verification
- [ ] Error messages are clear and actionable

---

## Best Practices

### 1. Test User Behavior, Not Implementation

**Good**:
```typescript
test('Button moves away from mouse', async () => {
  await moveMouseNearButton();
  expect(buttonPosition).toHaveChanged();
});
```

**Bad**:
```typescript
test('useButtonEvasion calls calculateDistance', async () => {
  // Don't test internal function calls
});
```

---

### 2. Use Realistic Timing

**Good**:
```typescript
await page.waitForTimeout(500); // Matches actual animation duration
```

**Bad**:
```typescript
await page.waitForTimeout(50); // Too short, will fail
await page.waitForTimeout(5000); // Unnecessarily long
```

---

### 3. Avoid Brittle Selectors

**Good**:
```typescript
await page.getByRole('button', { name: 'Yes I will be your valentine' });
await page.locator('[data-testid="no-button"]');
```

**Bad**:
```typescript
await page.locator('div > div > button:nth-child(2)');
await page.locator('.css-abc123-button');
```

---

### 4. Test One Thing Per Test

**Good**:
```typescript
test('Yes button shows glow on hover');
test('Yes button scales up on hover');
```

**Bad**:
```typescript
test('Yes button hover effects and click handler and color changes');
```

---

### 5. Provide Clear Error Messages

**Good**:
```typescript
expect(buttonMoved).toBe(true,
  `Expected button to move away from mouse at ${mousePosition}, ` +
  `but button stayed at ${buttonPosition}`
);
```

**Bad**:
```typescript
expect(buttonMoved).toBe(true);
```

---

## Testing Tools Reference

### MCP Playwright Tools

**Navigation**:
- `browser_navigate`: Go to URL
- `browser_navigate_back`: Go back

**Interaction**:
- `browser_click`: Click element
- `browser_hover`: Hover over element
- `browser_type`: Type text
- `browser_press_key`: Press keyboard key

**Inspection**:
- `browser_snapshot`: Capture accessibility tree
- `browser_take_screenshot`: Capture visual screenshot
- `browser_evaluate`: Run JavaScript
- `browser_console_messages`: Get console logs
- `browser_network_requests`: Get network activity

**Control**:
- `browser_wait_for`: Wait for condition
- `browser_resize`: Change viewport size
- `browser_close`: Close browser

---

## Summary

**Testing Philosophy**: Behavior-driven, user-centric testing that focuses on what users see and experience.

**Coverage**: 100% of user interactions and critical features (evasion, celebration).

**Tools**: Playwright via MCP for automated, repeatable testing in real browsers.

**Critical Tests**: Button evasion (vector math, boundaries, smoothness) is the most important feature to test thoroughly.

**Future**: CI/CD integration, visual regression testing, performance monitoring.

**Remember**: Tests should give confidence that the site creates a delightful experience, not just that code runs without errors.
