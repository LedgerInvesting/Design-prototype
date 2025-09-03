import React, { useState, useEffect } from 'react';
import { Button, Selector } from '@design-library/components';
import { colors, typography, borderRadius, shadows, spacing } from '@design-library/tokens';
import { AddMedium, ReloadMedium, CloseMedium } from '@design-library/icons';

export interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (transactionType: 'brand-new' | 'renewal') => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  buttonRef,
}) => {
  const [selectedType, setSelectedType] = useState<'brand-new' | 'renewal' | null>(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });

  // Calculate button position when modal opens
  useEffect(() => {
    if (isOpen && buttonRef?.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: buttonRect.bottom + 10, // 10px gap below button
        right: window.innerWidth - buttonRect.right, // Distance from right edge
      });
    }
  }, [isOpen, buttonRef]);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (selectedType) {
      onContinue(selectedType);
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
    position: 'fixed',
    top: `${buttonPosition.top}px`,
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
    justifyContent: 'flex-end',
  };

  return (
    <>
      <div style={backdropStyles} onClick={onClose} />
      <div style={modalPositionStyles}>
        <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={headerStyles}>
          <h2 style={titleStyles}>Create New Reinsurance Transaction</h2>
          <p style={subtitleStyles}>What type of transaction would you like to create?</p>
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
            {/* Brand New Transaction */}
            <div 
              style={optionCardStyles(selectedType === 'brand-new')}
              onClick={() => setSelectedType('brand-new')}
              onMouseEnter={(e) => {
                if (selectedType !== 'brand-new') {
                  e.currentTarget.style.borderColor = colors.blackAndWhite.black500;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedType !== 'brand-new') {
                  e.currentTarget.style.borderColor = colors.reports.dynamic.blue400;
                }
              }}
            >
              {/* Radio Button */}
              <div style={selectorStyles}>
                <Selector
                  variant="radio"
                  checked={selectedType === 'brand-new'}
                  onChange={() => setSelectedType('brand-new')}
                />
              </div>
              
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: borderRadius[8],
                backgroundColor: '#e1f3ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <span style={{color: colors.blackAndWhite.black900, fontSize: '18px', fontWeight: 'bold'}}>+</span>
              </div>
              <h3 style={optionTitleStyles}>Brand New Transaction</h3>
              <p style={optionDescriptionStyles}>
                Create a completely new reinsurance transaction with fresh terms and conditions. You'll be able to enter contract details manually or upload PDF documents for automatic extraction.
              </p>
            </div>

            {/* Renewal Transaction */}
            <div 
              style={optionCardStyles(selectedType === 'renewal')}
              onClick={() => setSelectedType('renewal')}
              onMouseEnter={(e) => {
                if (selectedType !== 'renewal') {
                  e.currentTarget.style.borderColor = colors.blackAndWhite.black500;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedType !== 'renewal') {
                  e.currentTarget.style.borderColor = colors.reports.dynamic.blue400;
                }
              }}
            >
              {/* Radio Button */}
              <div style={selectorStyles}>
                <Selector
                  variant="radio"
                  checked={selectedType === 'renewal'}
                  onChange={() => setSelectedType('renewal')}
                />
              </div>
              
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: borderRadius[8],
                backgroundColor: colors.success.fill,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <ReloadMedium color={colors.blackAndWhite.black900} />
              </div>
              <h3 style={optionTitleStyles}>Renewal Transaction</h3>
              <p style={optionDescriptionStyles}>
                Renew an existing transaction with updated terms or continue with existing terms. Select from your existing transactions and the basic information will be pre-populated.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={footerStyles}>
          <Button
            variant="primary"
            color="black"
            onClick={handleContinue}
            disabled={!selectedType}
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

export default NewTransactionModal;