import React, { useState } from 'react';
import { Button, Selector, Modal } from '@design-library/components';
import { useSemanticColors } from '@design-library/tokens';
import { UploadSmall, ContractsLogo, ReloadMedium } from '@design-library/icons';

export interface BrandNewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (inputMethod: 'upload-pdf' | 'enter-manually') => void;
  onBack?: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

export const BrandNewTransactionModal: React.FC<BrandNewTransactionModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  onBack,
  buttonRef,
}) => {
  const colors = useSemanticColors();
  const [selectedMethod, setSelectedMethod] = useState<'upload-pdf' | 'enter-manually' | null>(null);

  const handleContinue = () => {
    if (selectedMethod) {
      onContinue(selectedMethod);
      // Don't close here - let parent handle modal flow
    }
  };

  // Shared styles for modal option cards
  const optionsContainerStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginTop: '20px',
    width: '100%',
  };

  const optionCardStyles = (isSelected: boolean): React.CSSProperties => ({
    border: isSelected
      ? `1px solid ${colors.theme.primary700}`
      : `1px solid ${colors.theme.primary400}`,
    borderRadius: '12px',
    padding: '20px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    backgroundColor: isSelected
      ? colors.theme.primary200
      : colors.blackAndWhite.white,
    position: 'relative',
  });

  const selectorStyles: React.CSSProperties = {
    position: 'absolute',
    top: '16px',
    left: '16px',
  };

  const optionTitleStyles: React.CSSProperties = {
    fontSize: '16px',
    fontFamily: 'Söhne, system-ui, sans-serif',
    fontWeight: 600,
    color: colors.blackAndWhite.black900,
    margin: '0 0 8px 0',
  };

  const optionDescriptionStyles: React.CSSProperties = {
    fontSize: '14px',
    fontFamily: 'Söhne, system-ui, sans-serif',
    fontWeight: 400,
    color: colors.blackAndWhite.black700,
    lineHeight: '20px',
  };

  const handleCardHover = (
    e: React.MouseEvent<HTMLDivElement>,
    isSelected: boolean,
    isEntering: boolean
  ) => {
    if (!isSelected) {
      e.currentTarget.style.borderColor = isEntering
        ? colors.blackAndWhite.black500
        : colors.theme.primary400;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Contract Terms Input Method"
      subtitle="how would you like to enter the contract terms for your new transaction?"
      buttonRef={buttonRef}
      showBackdrop={true}
      backdropColor="white"
      backdropBlur={false}
      backdropOpacity={0.6}
      width="670px"
      theme="contracts"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="primary"
            color="white"
            onClick={onBack || onClose}
            showIcon={false}
          >
            Back
          </Button>
          <Button
            variant="primary"
            color="black"
            onClick={handleContinue}
            disabled={!selectedMethod}
            showIcon={false}
          >
            Continue
          </Button>
        </div>
      }
    >
      <div style={optionsContainerStyles}>
            {/* Upload PDF Contracts */}
            <div
              style={optionCardStyles(selectedMethod === 'upload-pdf')}
              onClick={() => setSelectedMethod('upload-pdf')}
              onMouseEnter={(e) => handleCardHover(e, selectedMethod === 'upload-pdf', true)}
              onMouseLeave={(e) => handleCardHover(e, selectedMethod === 'upload-pdf', false)}
            >
              {/* Radio Button */}
              <div style={selectorStyles}>
                <Selector
                  variant="radio"
                  checked={selectedMethod === 'upload-pdf'}
                  onChange={() => setSelectedMethod('upload-pdf')}
                />
              </div>
              
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                backgroundColor: '#fcdc6a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <div style={{ 
                  width: '18px', 
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <UploadSmall color={colors.blackAndWhite.black900} />
                </div>
              </div>
              <h3 style={optionTitleStyles}>Upload PDF Contracts</h3>
              <p style={optionDescriptionStyles}>
                Upload PDF copies of your contract documents and let our AI extract the terms and conditions automatically. Perfect for when you have signed contracts ready to process.
              </p>
              
              {/* AI Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fcdc6a',
                borderRadius: '4px',
                padding: '4px 8px',
                marginTop: '12px',
                fontSize: '10px',
                fontWeight: 500,
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: colors.blackAndWhite.black900,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '4px',
                }}>
                  <div style={{ 
                    width: '10px', 
                    height: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ContractsLogo color="#FFDB57" />
                  </div>
                </div>
                <span style={{color: colors.blackAndWhite.black900}}>powered by korra ContractsAI</span>
              </div>
            </div>

            {/* Enter Terms Manually */}
            <div
              style={optionCardStyles(selectedMethod === 'enter-manually')}
              onClick={() => setSelectedMethod('enter-manually')}
              onMouseEnter={(e) => handleCardHover(e, selectedMethod === 'enter-manually', true)}
              onMouseLeave={(e) => handleCardHover(e, selectedMethod === 'enter-manually', false)}
            >
              {/* Radio Button */}
              <div style={selectorStyles}>
                <Selector
                  variant="radio"
                  checked={selectedMethod === 'enter-manually'}
                  onChange={() => setSelectedMethod('enter-manually')}
                />
              </div>
              
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                backgroundColor: '#C084FC', // Purple background
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <div style={{ 
                  width: '18px', 
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ReloadMedium color={colors.blackAndWhite.black900} />
                </div>
              </div>
              <h3 style={optionTitleStyles}>Enter Terms Manually</h3>
              <p style={optionDescriptionStyles}>
                Fill out all contract terms and details manually through guided forms. Ideal for new contracts or when you prefer to enter information step by step.
              </p>
            </div>
          </div>
    </Modal>
  );
};

export default BrandNewTransactionModal;