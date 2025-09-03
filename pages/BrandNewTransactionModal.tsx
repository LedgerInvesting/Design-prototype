import React, { useState, useEffect } from 'react';
import { Button, Selector } from '@design-library/components';
import { colors, typography, borderRadius, shadows, spacing } from '@design-library/tokens';
import { AddMedium, ReloadMedium, CloseMedium, ContractsLogo, UploadSmall } from '@design-library/icons';

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
  const [selectedMethod, setSelectedMethod] = useState<'upload-pdf' | 'enter-manually' | null>(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });

  // Calculate button position when modal opens
  useEffect(() => {
    if (isOpen && buttonRef?.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: buttonRect.bottom + 20, // 20px gap below button (relative to viewport)
        right: window.innerWidth - buttonRect.right, // Distance from right edge
      });
    }
  }, [isOpen, buttonRef]);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (selectedMethod) {
      onContinue(selectedMethod);
      onClose();
    }
  };

  // Modal backdrop styles
  const backdropStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1000,
    pointerEvents: 'none', // Allow clicks to pass through backdrop
  };

  // Modal positioning styles
  const modalPositionStyles: React.CSSProperties = {
    position: 'absolute',
    top: `${buttonPosition.top + window.scrollY}px`, // Add scroll offset
    right: `${buttonPosition.right}px`,
    zIndex: 1001,
    pointerEvents: 'auto', // Re-enable clicks on modal
  };

  // Modal container styles
  const modalStyles: React.CSSProperties = {
    position: 'relative',
    backgroundColor: colors.blackAndWhite.white,
    borderRadius: borderRadius[12],
    boxShadow: shadows.extraLarge,
    width: '670px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  // Header styles
  const headerStyles: React.CSSProperties = {
    padding: '30px 30px 0px 30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const titleStyles: React.CSSProperties = {
    ...typography.styles.subheadingL,
    color: colors.blackAndWhite.black900,
    margin: 0,
    textAlign: 'center',
  };

  const subtitleStyles: React.CSSProperties = {
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black700,
    margin: '8px 0 0 0',
    textAlign: 'center',
  };

  const closeButtonContainerStyles: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
  };

  // Content styles
  const contentStyles: React.CSSProperties = {
    padding: '20px 30px 0px 30px',
  };

  const optionsContainerStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '275px 275px',
    gap: '20px',
    marginTop: '20px',
    justifyContent: 'center',
  };

  const optionCardStyles = (isSelected: boolean): React.CSSProperties => ({
    border: isSelected 
      ? `1px solid #9ad5f7` 
      : `1px solid ${colors.reports.dynamic.blue400}`,
    borderRadius: borderRadius[12],
    padding: '20px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    backgroundColor: isSelected 
      ? colors.reports.dynamic.blue50 
      : colors.blackAndWhite.white,
    position: 'relative',
  });

  const selectorStyles: React.CSSProperties = {
    position: 'absolute',
    top: '16px',
    left: '16px',
  };

  const iconContainerStyles = (isSelected: boolean, color: string): React.CSSProperties => ({
    width: '30px',
    height: '30px',
    borderRadius: borderRadius[8],
    backgroundColor: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  });

  const optionTitleStyles: React.CSSProperties = {
    ...typography.styles.bodyL,
    fontWeight: 600,
    color: colors.blackAndWhite.black900,
    margin: '0 0 8px 0',
  };

  const optionDescriptionStyles: React.CSSProperties = {
    ...typography.styles.bodyS,
    color: colors.blackAndWhite.black700,
    lineHeight: '20px',
  };

  const footerStyles: React.CSSProperties = {
    padding: '20px 50px 30px 50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <>
      <div style={backdropStyles} onClick={onClose} />
      <div style={modalPositionStyles}>
        <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={headerStyles}>
          <h2 style={titleStyles}>Contract Terms Input Method</h2>
          <p style={subtitleStyles}>how would you like to enter the contract terms for your new transaction?</p>
        </div>
        {/* Close Button */}
        <div style={closeButtonContainerStyles}>
          <Button
            variant="icon"
            color="light"
            shape="square"
            onClick={onClose}
            icon={<CloseMedium color={colors.blackAndWhite.black900} />}
          />
        </div>

        {/* Content */}
        <div style={contentStyles}>
          <div style={optionsContainerStyles}>
            {/* Upload PDF Contracts */}
            <div 
              style={optionCardStyles(selectedMethod === 'upload-pdf')}
              onClick={() => setSelectedMethod('upload-pdf')}
              onMouseEnter={(e) => {
                if (selectedMethod !== 'upload-pdf') {
                  e.currentTarget.style.borderColor = colors.blackAndWhite.black500;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedMethod !== 'upload-pdf') {
                  e.currentTarget.style.borderColor = colors.reports.dynamic.blue400;
                }
              }}
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
                borderRadius: borderRadius[8],
                backgroundColor: '#FFF493', // Yellow background
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
                backgroundColor: '#FFF493',
                borderRadius: borderRadius[4],
                padding: '4px 8px',
                marginTop: '12px',
                fontSize: '10px',
                fontWeight: 500,
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: colors.blackAndWhite.black900,
                  borderRadius: borderRadius[4],
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
              onMouseEnter={(e) => {
                if (selectedMethod !== 'enter-manually') {
                  e.currentTarget.style.borderColor = colors.blackAndWhite.black500;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedMethod !== 'enter-manually') {
                  e.currentTarget.style.borderColor = colors.reports.dynamic.blue400;
                }
              }}
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
                borderRadius: borderRadius[8],
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
        </div>

        {/* Footer */}
        <div style={footerStyles}>
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
        </div>
      </div>
    </>
  );
};

export default BrandNewTransactionModal;