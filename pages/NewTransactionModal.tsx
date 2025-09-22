import React, { useState } from 'react';
import { Button, Selector, Modal } from '@design-library/components';
import { useSemanticColors } from '@design-library/tokens';
import { AddMedium, ReloadMedium } from '@design-library/icons';

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
  const colors = useSemanticColors();
  const [selectedType, setSelectedType] = useState<'brand-new' | 'renewal' | null>(null);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (selectedType) {
      onContinue(selectedType);
      onClose();
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
      ? `1px solid #9ad5f7`
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

  // Content styles
  const contentStyles: React.CSSProperties = {
    padding: '0', // Remove extra padding since Modal component handles this
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Reinsurance Transaction"
      subtitle="What type of transaction would you like to create?"
      buttonRef={buttonRef}
      showBackdrop={true}
      backdropColor="white"
      backdropBlur={false}
      backdropOpacity={0.6}
      width="670px"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
      }
    >

        {/* Content */}
        <div style={contentStyles}>
          <div style={optionsContainerStyles}>
            {/* Brand New Transaction */}
            <div
              style={optionCardStyles(selectedType === 'brand-new')}
              onClick={() => setSelectedType('brand-new')}
              onMouseEnter={(e) => handleCardHover(e, selectedType === 'brand-new', true)}
              onMouseLeave={(e) => handleCardHover(e, selectedType === 'brand-new', false)}
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
                borderRadius: '8px',
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
              onMouseEnter={(e) => handleCardHover(e, selectedType === 'renewal', true)}
              onMouseLeave={(e) => handleCardHover(e, selectedType === 'renewal', false)}
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
                borderRadius: '8px',
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
    </Modal>
  );
};

export default NewTransactionModal;