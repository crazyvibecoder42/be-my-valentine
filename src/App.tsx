import { AnimatePresence } from 'framer-motion';
import FloatingHearts from './components/BackgroundHearts/FloatingHearts';
import ButtonContainer from './components/ValentineButtons/ButtonContainer';
import YesButton from './components/ValentineButtons/YesButton';
import NoButton from './components/ValentineButtons/NoButton';
import CelebrationAnimation from './components/CelebrationScreen/CelebrationAnimation';
import MobileBlockerScreen from './components/MobileBlocker/MobileBlockerScreen';
import useCelebration from './hooks/useCelebration';
import { useDeviceDetection } from './hooks/useDeviceDetection';
import { theme } from './styles/theme';

/**
 * Main App Component
 * Valentine's Day website with interactive buttons and celebration
 * Includes mobile/tablet detection to show blocker screen for non-desktop users
 */
export default function App() {
  const { isDesktop } = useDeviceDetection();
  const { showCelebration, triggerCelebration } = useCelebration();

  const handleYesClick = async () => {
    console.log('DEBUG: Yes button clicked in App');
    await triggerCelebration();
  };

  // Early return for mobile/tablet users - show blocker screen
  if (!isDesktop) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: theme.gradients.background,
        }}
      >
        {/* Background floating hearts - maintain Valentine's ambiance */}
        <FloatingHearts />

        {/* Mobile blocker screen */}
        <MobileBlockerScreen />
      </div>
    );
  }

  // Desktop experience - full valentine buttons and celebration
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: theme.gradients.background,
      }}
    >
      {/* Background floating hearts */}
      <FloatingHearts />

      {/* Main content area */}
      <div
        style={{
          position: 'relative',
          zIndex: theme.zIndex.content,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: theme.typography.fonts.heading,
            fontSize: theme.typography.sizes['4xl'],
            color: theme.colors.deepRose,
            marginBottom: theme.spacing['2xl'],
          }}
        >
          Will you be my Valentine?
        </h1>

        {/* Valentine Buttons */}
        <ButtonContainer>
          <YesButton onClick={handleYesClick} />
          <NoButton />
        </ButtonContainer>
      </div>

      {/* Celebration Animation Overlay */}
      <AnimatePresence>
        {showCelebration && <CelebrationAnimation />}
      </AnimatePresence>
    </div>
  );
}
