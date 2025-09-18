import React, { useState, useEffect } from 'react';
import { Button, Input, Dropdown, DropdownOption } from '@design-library/components';
import { colors, typography, borderRadius, shadows } from '@design-library/tokens';
import { useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { CloseMedium } from '@design-library/icons';

export interface NewValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateValuation: (formData: ValuationFormData) => void;
  onNavigateToPage?: (page: string, data?: any) => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

export interface ValuationFormData {
  policyGroup: string;
  riskPeriod: string;
  expectedLossRatio: string;
  lossRatioStandardDeviation: string;
  expectedPremium: string;
  premiumCap: string;
}

export const NewValuationModal: React.FC<NewValuationModalProps> = ({
  isOpen,
  onClose,
  onCreateValuation,
  onNavigateToPage,
  buttonRef,
}) => {
  const semanticColors = useSemanticColors();
  const [formData, setFormData] = useState<ValuationFormData>({
    policyGroup: '',
    riskPeriod: '',
    expectedLossRatio: '',
    lossRatioStandardDeviation: '',
    expectedPremium: '',
    premiumCap: '',
  });
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

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        policyGroup: '',
        riskPeriod: '',
        expectedLossRatio: '',
        lossRatioStandardDeviation: '',
        expectedPremium: '',
        premiumCap: '',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof ValuationFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateValuation = () => {
    onCreateValuation(formData);
    onClose();

    // Navigate to the new valuation dashboard with the created data
    if (onNavigateToPage) {
      const valuationData = {
        programName: formData.policyGroup,
        evaluationDate: new Date().toISOString().split('T')[0],
        reportedLossRatio: formData.expectedLossRatio || '42.2%',
        currentWrittenPremium: formData.expectedPremium || '$20,107,359'
      };
      onNavigateToPage('valuation-dashboard', valuationData);
    }
  };

  const isFormValid = Object.values(formData).every(value => value && value.trim() !== '');

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
    width: '730px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  // Header styles
  const headerStyles: React.CSSProperties = {
    padding: '30px 30px 20px 30px',
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

  const closeButtonContainerStyles: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
  };

  // Content styles
  const contentStyles: React.CSSProperties = {
    padding: '0 30px',
  };

  const formContainerStyles: React.CSSProperties = {
    backgroundColor: semanticColors.theme.primary200,
    borderRadius: borderRadius[8],
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  };

  // Footer styles
  const footerStyles: React.CSSProperties = {
    padding: '20px 50px 30px 50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };

  // Policy Group options
  const policyGroupOptions: DropdownOption[] = [
    { value: 'Aviation Treaty 2023', label: 'Aviation Treaty 2023' },
    { value: 'Cyber Treaty 2024', label: 'Cyber Treaty 2024' },
    { value: 'Health Insurance Stop Loss Cover', label: 'Health Insurance Stop Loss Cover' },
    { value: 'Liability Excess of Loss Treaty', label: 'Liability Excess of Loss Treaty' },
    { value: 'Property Catastrophe Treaty', label: 'Property Catastrophe Treaty' },
    { value: 'Marine Cargo Treaty', label: 'Marine Cargo Treaty' },
  ];

  // Risk Period options
  const riskPeriodOptions: DropdownOption[] = [
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: 'TY23', label: 'TY23' },
    { value: 'TY24', label: 'TY24' },
    { value: 'TY25', label: 'TY25' },
  ];

  return (
    <>
      <div style={backdropStyles} onClick={onClose} />
      <div style={modalPositionStyles}>
        <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div style={headerStyles}>
            <h2 style={titleStyles}>Create New Valuation</h2>
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
            <div style={formContainerStyles}>
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Policy Group */}
                <Dropdown
                  label="Policy group"
                  value={formData.policyGroup}
                  onChange={(value) => handleInputChange('policyGroup', value)}
                  options={policyGroupOptions}
                  placeholder="Select Policy group"
                />

                {/* Expected Loss Ratio */}
                <Input
                  label="Expected Loss Ratio"
                  value={formData.expectedLossRatio}
                  onChange={(e) => handleInputChange('expectedLossRatio', e.target.value)}
                  placeholder="Enter Expected Loss Ratio"
                  type="text"
                />

                {/* Expected Premium */}
                <Input
                  label="Expected Premium"
                  value={formData.expectedPremium}
                  onChange={(e) => handleInputChange('expectedPremium', e.target.value)}
                  placeholder="Enter Expected Premium"
                  type="text"
                />
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Risk Period */}
                <Dropdown
                  label="Risk Period"
                  value={formData.riskPeriod}
                  onChange={(value) => handleInputChange('riskPeriod', value)}
                  options={riskPeriodOptions}
                  placeholder="Select Risk Period"
                />

                {/* Loss Ratio Standard Deviation */}
                <Input
                  label="Loss Ratio Standard Deviation"
                  value={formData.lossRatioStandardDeviation}
                  onChange={(e) => handleInputChange('lossRatioStandardDeviation', e.target.value)}
                  placeholder="Enter Loss Ratio Standard Deviation"
                  type="text"
                />

                {/* Premium Cap */}
                <Input
                  label="Premium Cap"
                  value={formData.premiumCap}
                  onChange={(e) => handleInputChange('premiumCap', e.target.value)}
                  placeholder="enter Premium Cap"
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={footerStyles}>
            <Button
              variant="primary"
              color="black"
              onClick={handleCreateValuation}
              disabled={!isFormValid}
              showIcon={false}
            >
              Create Valuation
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewValuationModal;