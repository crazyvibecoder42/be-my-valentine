// Evasion configuration constants
export const EVASION_RADIUS = 150; // Distance at which button starts evading (pixels)
export const VIEWPORT_PADDING = 20; // Minimum distance from viewport edges (pixels)

interface Point {
  x: number;
  y: number;
}

interface ButtonSize {
  width: number;
  height: number;
}

/**
 * Calculate Euclidean distance between two points using Pythagorean theorem
 */
export function calculateDistance(point1: Point, point2: Point): number {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate escape vector for button to move away from mouse
 * Returns a new position for the button that is outside the evasion radius
 *
 * @param mousePos - Current mouse position
 * @param buttonPos - Current button center position
 * @param evasionRadius - Distance at which to evade (default: EVASION_RADIUS)
 * @returns New position for button to escape to
 */
export function calculateEscapeVector(
  mousePos: Point,
  buttonPos: Point,
  evasionRadius: number = EVASION_RADIUS
): Point {
  // Calculate direction vector from mouse to button
  const dx = buttonPos.x - mousePos.x;
  const dy = buttonPos.y - mousePos.y;

  // Calculate current distance
  const distance = Math.sqrt(dx * dx + dy * dy);

  // If button is far enough, no need to move
  if (distance >= evasionRadius) {
    return buttonPos;
  }

  // Normalize direction vector
  const normalizedDx = dx / distance;
  const normalizedDy = dy / distance;

  // Calculate escape distance (move much further away for dramatic effect)
  // Instead of just outside the radius, move 3-4x the radius for playful evasion
  const escapeDistance = evasionRadius * 3.5;

  // Calculate new position
  return {
    x: mousePos.x + normalizedDx * escapeDistance,
    y: mousePos.y + normalizedDy * escapeDistance,
  };
}

/**
 * Constrain button position to stay within viewport boundaries
 * Accounts for button size and padding to prevent clipping
 *
 * @param position - Desired button position (top-left corner)
 * @param buttonSize - Width and height of button
 * @param padding - Minimum distance from edges (default: VIEWPORT_PADDING)
 * @returns Constrained position that fits within viewport
 */
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
