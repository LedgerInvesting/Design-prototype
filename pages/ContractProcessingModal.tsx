import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { Modal, Button, ThemeProvider } from '@design-library/components';
import { useSemanticColors, typography, borderRadius } from '@design-library/tokens';
import { ContractsLogo } from '@design-library/icons';
import animationData from './product-illustration.json';

export interface ContractProcessingModalProps {
  isOpen: boolean;
  fileName: string;
  transactionName: string;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

type ProcessStep = 'uploading' | 'analyzing' | 'extracting' | 'creating' | 'completed';

interface StepProgress {
  step: ProcessStep;
  label: string;
  status: 'completed' | 'running' | 'waiting';
  statusText: string;
  progress: number; // 0-100
}

export const ContractProcessingModal: React.FC<ContractProcessingModalProps> = ({
  isOpen,
  fileName,
  transactionName,
  buttonRef,
}) => {
  const [steps, setSteps] = useState<StepProgress[]>([
    { step: 'uploading', label: 'Uploading file', status: 'running', statusText: 'Running', progress: 0 },
    { step: 'analyzing', label: 'AI analysis', status: 'waiting', statusText: 'Waiting...', progress: 0 },
    { step: 'extracting', label: 'Key terms extraction', status: 'waiting', statusText: 'Waiting...', progress: 0 },
    { step: 'creating', label: 'Creating transaction', status: 'waiting', statusText: 'Waiting...', progress: 0 },
  ]);
  const [allComplete, setAllComplete] = useState(false);

  // Loading simulation
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

  // Animated dot for running state (white with theme border)
  const AnimatedDot: React.FC = () => {
    const colors = useSemanticColors();
    return (
      <div
        style={{
          position: 'absolute',
          right: '-6px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: colors.blackAndWhite.white,
          border: `2px solid ${colors.theme.primary700}`,
          animation: 'pulse 1.5s ease-in-out infinite',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      />
    );
  };

  // Inject pulse animation
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
        50% { opacity: 0.8; transform: translateY(-50%) scale(1.1); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Progress bar component
  const ProgressBar: React.FC<{ stepData: StepProgress }> = ({ stepData }) => {
    const colors = useSemanticColors();

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
          backgroundColor: colors.theme.primary300,
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
            backgroundColor: colors.theme.primary700,
            borderRadius: borderRadius[12],
            transition: 'width 0.3s ease',
          }} />

          {/* Animated Dot for running state */}
          {stepData.status === 'running' && <AnimatedDot />}
        </div>

        {/* Labels */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
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
          }}>
            {stepData.statusText}
          </div>
        </div>
      </div>
    );
  };

  // Modal content with contracts theme
  const ModalContent: React.FC = () => {
    const colors = useSemanticColors();

    return (
      <>
        {/* Yellow Header with Animation */}
        <div style={{
          backgroundColor: colors.theme.primary700,
          height: '150px',
          borderRadius: borderRadius[8],
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
        }}>
          {/* Lottie Animation - Left Side */}
          <div style={{
            width: '160px',
            height: '160px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '-16px',
          }}>
            <Lottie
              animationData={animationData}
              loop={true}
              style={{
                width: '160px',
                height: '160px',
              }}
            />
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
              color: colors.blackAndWhite.black900,
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
                backgroundColor: colors.blackAndWhite.black900,
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
                color: colors.blackAndWhite.black800,
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
  };


  return (
    <ThemeProvider currentProduct="contracts">
      <Modal
        isOpen={isOpen}
        onClose={() => {}} // No close functionality
        buttonRef={buttonRef}
        showBackdrop={true}
        backdropColor="white"
        backdropBlur={false}
        backdropOpacity={0.6}
        width="670px"
        padding="15px"
        disableBackdropClose={true}
        showCloseButton={false}
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
              onClick={() => {}}
              disabled={!allComplete}
              showIcon={false}
              style={{ width: '140px' }}
            >
              Continue
            </Button>
          </div>
        }
      >
        <ModalContent />
      </Modal>
    </ThemeProvider>
  );
};

export default ContractProcessingModal;
