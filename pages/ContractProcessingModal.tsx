import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { Modal, Button } from '@design-library/components';
import { useSemanticColors, typography, borderRadius, colors } from '@design-library/tokens';
import { ContractsLogo } from '@design-library/icons';
import animationData from './product-illustration.json';

/**
 * Memoized Lottie animation component to prevent re-renders during step updates.
 * Uses product illustration animation with fixed dimensions.
 */
const ContractAnimation = React.memo(() => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice'
      }}
      style={{
        width: '160px',
        height: '160px',
      }}
    />
  );
});
ContractAnimation.displayName = 'ContractAnimation';

/**
 * Inner modal content component that accesses theme colors from Modal's ThemeProvider context.
 * Includes yellow header with Lottie animation and progress bars for each processing step.
 */
const ModalContentInner: React.FC<{
  transactionName: string;
  steps: Array<{
    step: string;
    label: string;
    status: 'completed' | 'running' | 'waiting';
    statusText: string;
    progress: number;
  }>;
}> = React.memo(({ transactionName, steps }) => {
  const semanticColors = useSemanticColors();

  /**
   * Animated dot that moves along the progress bar during running state.
   * Features pulse animation and follows progress percentage.
   */
  const AnimatedDot: React.FC<{ progress: number }> = ({ progress }) => {
    return (
      <div
        style={{
          position: 'absolute',
          left: `calc(${progress}% - 6px)`,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: colors.blackAndWhite.white,
          border: `4px solid ${semanticColors.theme.primary700}`,
          animation: 'pulse 1.5s ease-in-out infinite',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'left 0.3s ease',
        }}
      />
    );
  };

  /**
   * Individual progress bar component showing step label, progress fill, and status.
   * Displays animated dot when status is 'running' and blinks status text.
   */
  const ProgressBar: React.FC<{ stepData: typeof steps[0] }> = ({ stepData }) => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        flex: 1,
        minWidth: 0,
      }}>
        {/* Progress Bar */}
        <div style={{
          position: 'relative',
          height: '6px',
          backgroundColor: semanticColors.theme.primary300,
          borderRadius: borderRadius[12],
          overflow: 'visible',
        }}>
          {/* Filled Progress */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${stepData.progress}%`,
            backgroundColor: semanticColors.theme.primary700,
            borderRadius: borderRadius[12],
            transition: 'width 0.3s ease',
          }} />

          {/* Animated Dot for running state */}
          {stepData.status === 'running' && <AnimatedDot progress={stepData.progress} />}
        </div>

        {/* Labels */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1px',
          width: '146px',
        }}>
          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black800,
            fontWeight: 500,
          }}>
            {stepData.label}
          </div>
          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black500,
            fontWeight: 500,
            animation: stepData.status === 'running' ? 'blink 1.0s ease-in-out infinite' : 'none',
          }}>
            {stepData.statusText}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Yellow Header with Animation */}
      <div style={{
        backgroundColor: semanticColors.theme.primary700,
        height: '160px',
        borderRadius: borderRadius[8],
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        paddingLeft: '54px', // Move content 30px to the right (24px + 30px)
      }}>
        {/* Lottie Animation - Left Side */}
        <div style={{
          width: '160px',
          height: '150px', // Reduced to prevent overflow (was 160px)
          flexShrink: 0,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginLeft: '-16px',
          marginTop: '20px',
          overflow: 'hidden', // Clip animation within this container
        }}>
          <div style={{
            marginTop: '10px', // Push animation down 10px to crop top
          }}>
            <ContractAnimation />
          </div>
        </div>

        {/* Text Content - Right Side */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          flex: 1,
          marginLeft: '24px',
        }}>
          {/* Processing Title */}
          <div style={{
            ...typography.styles.subheadingM,
            color: semanticColors.blackAndWhite.black900,
            fontWeight: 500,
          }}>
            Processing {transactionName}
          </div>

          {/* Powered by ContractsAI */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: semanticColors.blackAndWhite.black900,
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ContractsLogo color="#FFDB57" />
              </div>
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: semanticColors.blackAndWhite.black800,
              fontWeight: 500,
            }}>
              Powered by korra ContractsAI
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bars Section */}
      <div style={{
        display: 'flex',
        gap: '6px',
        width: '100%',
        marginTop: '30px',
      }}>
        {steps.map((stepData, index) => (
          <ProgressBar key={index} stepData={stepData} />
        ))}
      </div>
    </>
  );
});
ModalContentInner.displayName = 'ModalContentInner';

/**
 * Props for ContractProcessingModal component
 */
export interface ContractProcessingModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Name of the uploaded file (unused but kept for API consistency) */
  fileName: string;
  /** Transaction name to display in header */
  transactionName: string;
  /** Description of the transaction (unused but kept for API consistency) */
  description: string;
  /** Optional button reference for positioning */
  buttonRef?: React.RefObject<HTMLButtonElement>;
  /** Callback when Continue button is clicked after processing completes */
  onContinue?: () => void;
}

/** Available processing steps */
type ProcessStep = 'uploading' | 'analyzing' | 'extracting' | 'creating';

/** Progress state for each processing step */
interface StepProgress {
  step: ProcessStep;
  label: string;
  status: 'completed' | 'running' | 'waiting';
  statusText: string;
  progress: number; // 0-100
}

/**
 * Contract Processing Modal
 *
 * Displays AI-powered contract processing with animated progress tracking.
 * Shows 4 sequential steps: uploading, AI analysis, key terms extraction, and transaction creation.
 * Uses contracts theme (yellow) regardless of parent page theme.
 *
 * Features:
 * - Lottie animation in header (cropped for visual effect)
 * - Real-time progress bars with animated dots
 * - Blinking "Running" status text
 * - Simulated 20-second processing sequence
 * - Disabled Continue button until all steps complete
 */
export const ContractProcessingModal: React.FC<ContractProcessingModalProps> = ({
  isOpen,
  transactionName,
  buttonRef,
  onContinue,
}) => {
  const [steps, setSteps] = useState<StepProgress[]>([
    { step: 'uploading', label: 'Uploading file', status: 'running', statusText: 'Running', progress: 0 },
    { step: 'analyzing', label: 'AI analysis', status: 'waiting', statusText: 'Waiting...', progress: 0 },
    { step: 'extracting', label: 'Key terms extraction', status: 'waiting', statusText: 'Waiting...', progress: 0 },
    { step: 'creating', label: 'Creating transaction', status: 'waiting', statusText: 'Waiting...', progress: 0 },
  ]);
  const [allComplete, setAllComplete] = useState(false);

  /**
   * Simulates 4-step processing sequence with progress animations
   * Total duration: ~20 seconds (8s + 4s + 4s + 4s)
   */
  useEffect(() => {
    if (!isOpen) return;

    // Reset state when modal opens
    setSteps([
      { step: 'uploading', label: 'Uploading file', status: 'running', statusText: 'Running', progress: 0 },
      { step: 'analyzing', label: 'AI analysis', status: 'waiting', statusText: 'Waiting...', progress: 0 },
      { step: 'extracting', label: 'Key terms extraction', status: 'waiting', statusText: 'Waiting...', progress: 0 },
      { step: 'creating', label: 'Creating transaction', status: 'waiting', statusText: 'Waiting...', progress: 0 },
    ]);
    setAllComplete(false);

    // Step 1: Uploading (8 seconds)
    const step1Progress = setInterval(() => {
      setSteps(prev => {
        const newSteps = [...prev];
        if (newSteps[0].progress < 100) {
          newSteps[0].progress = Math.min(newSteps[0].progress + 2.5, 100);
        }
        return newSteps;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(step1Progress);
      setSteps(prev => {
        const newSteps = [...prev];
        newSteps[0] = { ...newSteps[0], status: 'completed', statusText: 'Completed', progress: 100 };
        newSteps[1] = { ...newSteps[1], status: 'running', statusText: 'Running' };
        return newSteps;
      });

      // Step 2: AI analysis (4 seconds)
      const step2Progress = setInterval(() => {
        setSteps(prev => {
          const newSteps = [...prev];
          if (newSteps[1].progress < 100) {
            newSteps[1].progress = Math.min(newSteps[1].progress + 5, 100);
          }
          return newSteps;
        });
      }, 200);

      setTimeout(() => {
        clearInterval(step2Progress);
        setSteps(prev => {
          const newSteps = [...prev];
          newSteps[1] = { ...newSteps[1], status: 'completed', statusText: 'Completed', progress: 100 };
          newSteps[2] = { ...newSteps[2], status: 'running', statusText: 'Running' };
          return newSteps;
        });

        // Step 3: Key terms extraction (4 seconds)
        const step3Progress = setInterval(() => {
          setSteps(prev => {
            const newSteps = [...prev];
            if (newSteps[2].progress < 100) {
              newSteps[2].progress = Math.min(newSteps[2].progress + 5, 100);
            }
            return newSteps;
          });
        }, 200);

        setTimeout(() => {
          clearInterval(step3Progress);
          setSteps(prev => {
            const newSteps = [...prev];
            newSteps[2] = { ...newSteps[2], status: 'completed', statusText: 'Completed', progress: 100 };
            newSteps[3] = { ...newSteps[3], status: 'running', statusText: 'Running' };
            return newSteps;
          });

          // Step 4: Creating transaction (4 seconds)
          const step4Progress = setInterval(() => {
            setSteps(prev => {
              const newSteps = [...prev];
              if (newSteps[3].progress < 100) {
                newSteps[3].progress = Math.min(newSteps[3].progress + 5, 100);
              }
              return newSteps;
            });
          }, 200);

          setTimeout(() => {
            clearInterval(step4Progress);
            setSteps(prev => {
              const newSteps = [...prev];
              newSteps[3] = { ...newSteps[3], status: 'completed', statusText: 'Completed', progress: 100 };
              return newSteps;
            });
            setAllComplete(true);
          }, 4000);
        }, 4000);
      }, 4000);
    }, 8000);
  }, [isOpen]);

  /**
   * Injects keyframe animations for pulse (progress dot) and blink (status text)
   */
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
        50% { opacity: 0.8; transform: translateY(-50%) scale(1.1); }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}} // No close functionality
      buttonRef={buttonRef}
      showBackdrop={true}
      backdropColor="white"
      backdropBlur={false}
      backdropOpacity={0.6}
      width="630px"
      padding="15px"
      disableBackdropClose={true}
      showCloseButton={false}
      theme="contracts"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            variant="primary"
            color="white"
            onClick={() => {}}
            disabled={true}
            showIcon={false}
            style={{ width: '140px' }}
          >
            Back
          </Button>
          <Button
            variant="primary"
            color="black"
            onClick={onContinue}
            disabled={!allComplete}
            showIcon={false}
            style={{ width: '140px' }}
          >
            Continue
          </Button>
        </div>
      }
    >
      <ModalContentInner
        transactionName={transactionName}
        steps={steps}
      />
    </Modal>
  );
};

export default ContractProcessingModal;
