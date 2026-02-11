import { ReactNode } from 'react';
import { theme } from '../../styles/theme';

interface ButtonContainerProps {
  children: ReactNode;
}

/**
 * ButtonContainer - Layout container for Valentine buttons
 * Provides flexbox positioning and z-index management
 */
export default function ButtonContainer({ children }: ButtonContainerProps) {
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
      {children}
    </div>
  );
}
