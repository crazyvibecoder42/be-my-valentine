import { type ReactNode, cloneElement, isValidElement } from 'react';
import { theme } from '../../styles/theme';
import { useButtonGrowth } from '../../hooks/useButtonGrowth';
import type { ValentineStage } from '../../hooks/useMultiStageValentine';

interface ButtonContainerProps {
  children: ReactNode;
  stage: ValentineStage;
  onNoButtonVanished: () => void;
  onYesButtonFull: () => void;
}

/**
 * ButtonContainer - Layout container for Valentine buttons
 * Provides flexbox positioning, z-index management, and button growth coordination
 * Uses useButtonGrowth hook to animate buttons sequentially:
 * 1. No button shrinks and vanishes
 * 2. Yes button grows to fill screen
 */
export default function ButtonContainer({
  children,
  stage,
  onNoButtonVanished,
  onYesButtonFull,
}: ButtonContainerProps) {
  // Determine animation stage for button growth hook
  const growthStage =
    stage === 'no-shrinking' ? 'no-shrinking' :
    stage === 'yes-growing' ? 'yes-growing' :
    'other';

  // Use button growth hook for sequential animations
  const { yesScale, noScale } = useButtonGrowth({
    stage: growthStage,
    onNoVanished: onNoButtonVanished,
    onYesFull: onYesButtonFull,
  });

  // Clone children and inject scale props
  const childrenWithScale = Array.isArray(children)
    ? children.map((child, index) => {
        if (!isValidElement(child)) return child;

        // Inject scale and stage props based on button type
        if (child.type && typeof child.type === 'function') {
          const componentName = child.type.name;
          if (componentName === 'YesButton') {
            return cloneElement(child, { key: `yes-${index}`, scale: yesScale, stage } as any);
          }
          if (componentName === 'NoButton') {
            return cloneElement(child, { key: `no-${index}`, scale: noScale, stage } as any);
          }
        }

        return child;
      })
    : children;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing.xl,
        position: 'relative',
        zIndex: theme.zIndex.buttons,
        minHeight: '200px',
        padding: theme.spacing['2xl'],
      }}
    >
      {childrenWithScale}
    </div>
  );
}
