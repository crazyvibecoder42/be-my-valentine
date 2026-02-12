import { type ReactNode, cloneElement, isValidElement } from 'react';
import { theme } from '../../styles/theme';
import { useButtonGrowth } from '../../hooks/useButtonGrowth';
import type { ValentineStage } from '../../hooks/useMultiStageValentine';

interface ButtonContainerProps {
  children: ReactNode;
  stage: ValentineStage;
  onYesButtonFull: () => void;
}

/**
 * ButtonContainer - Layout container for Valentine buttons
 * Provides flexbox positioning, z-index management, and button growth coordination
 * Uses useButtonGrowth hook to animate buttons when stage is 'buttons-growing'
 */
export default function ButtonContainer({
  children,
  stage,
  onYesButtonFull,
}: ButtonContainerProps) {
  // Use button growth hook - only enabled during 'buttons-growing' stage
  const { yesScale, noScale } = useButtonGrowth({
    enabled: stage === 'buttons-growing',
    onFull: onYesButtonFull,
  });

  // Clone children and inject scale props
  const childrenWithScale = Array.isArray(children)
    ? children.map((child, index) => {
        if (!isValidElement(child)) return child;

        // Inject scale prop based on button type
        if (child.type && typeof child.type === 'function') {
          const componentName = child.type.name;
          if (componentName === 'YesButton') {
            return cloneElement(child, { key: `yes-${index}`, scale: yesScale } as any);
          }
          if (componentName === 'NoButton') {
            return cloneElement(child, { key: `no-${index}`, scale: noScale } as any);
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
