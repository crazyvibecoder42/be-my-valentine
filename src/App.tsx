import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import FloatingHearts from './components/BackgroundHearts/FloatingHearts';
import ButtonContainer from './components/ValentineButtons/ButtonContainer';
import YesButton from './components/ValentineButtons/YesButton';
import NoButton from './components/ValentineButtons/NoButton';
import CelebrationAnimation from './components/CelebrationScreen/CelebrationAnimation';
import BalloonPopAnimation from './components/BalloonPop/BalloonPopAnimation';
import MobileBlockerScreen from './components/MobileBlocker/MobileBlockerScreen';
import { useMultiStageValentine } from './hooks/useMultiStageValentine';
import { useDeviceDetection } from './hooks/useDeviceDetection';
import { theme } from './styles/theme';

// Lazy load marble screen to reduce initial bundle size
const MarbleSecondChanceScreen = lazy(() => import('./components/MarbleScreen/MarbleSecondChanceScreen'));

/**
 * Main App Component
 * Valentine's Day website with interactive buttons and celebration
 * Includes mobile/tablet detection to show blocker screen for non-desktop users
 * Uses multi-stage state machine for coordinating Valentine experience
 */
export default function App() {
  const { isDesktop } = useDeviceDetection();
  const {
    stage,
    handleAllHeartsPoppedCallback,
    handleNoButtonVanishedCallback,
    handleYesButtonFullCallback,
    handleBalloonPopComplete,
    handleMarbleYesClick,
    handleMarbleNoClick,
  } = useMultiStageValentine();

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
        <FloatingHearts onAllHeartsPoppedCallback={handleAllHeartsPoppedCallback} />

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
      <FloatingHearts onAllHeartsPoppedCallback={handleAllHeartsPoppedCallback} />

      {/* Main content area - Multi-stage conditional rendering */}
      <AnimatePresence mode="wait">
        {/* Initial stage: Show normal buttons */}
        {stage === 'initial' && (
          <div
            key="initial-stage"
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

            {/* Valentine Buttons - Normal state */}
            <ButtonContainer
              stage={stage}
              onNoButtonVanished={handleNoButtonVanishedCallback}
              onYesButtonFull={handleYesButtonFullCallback}
            >
              <YesButton onClick={() => {}} />
              <NoButton />
            </ButtonContainer>
          </div>
        )}

        {/* Animation stages: No button shrinking, then Yes button growing */}
        {(stage === 'no-shrinking' || stage === 'yes-growing') && (
          <div
            key="initial-stage"
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

            {/* Valentine Buttons - Sequential animation */}
            <ButtonContainer
              stage={stage}
              onNoButtonVanished={handleNoButtonVanishedCallback}
              onYesButtonFull={handleYesButtonFullCallback}
            >
              <YesButton onClick={() => {}} />
              <NoButton />
            </ButtonContainer>
          </div>
        )}

        {/* Balloon pop animation */}
        {stage === 'yes-popped' && (
          <BalloonPopAnimation
            key="balloon-pop"
            onComplete={handleBalloonPopComplete}
          />
        )}

        {/* Marble second chance screen - lazy loaded */}
        {stage === 'marble-screen' && (
          <Suspense fallback={<div style={{ display: 'none' }} />}>
            <MarbleSecondChanceScreen
              key="marble-screen"
              onYesClick={handleMarbleYesClick}
              onNoClick={handleMarbleNoClick}
            />
          </Suspense>
        )}

        {/* Final celebration */}
        {stage === 'celebrating' && (
          <CelebrationAnimation key="celebration" />
        )}
      </AnimatePresence>
    </div>
  );
}
