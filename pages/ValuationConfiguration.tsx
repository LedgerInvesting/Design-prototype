import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import { Button, Input, InfoTooltip } from '@design-library/components';
import { colors, typography, borderRadius } from '@design-library/tokens';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens/ThemeProvider';

interface ValuationConfigurationProps {
  onNavigateToPage: (page: string) => void;
  programName?: string;
  valuationData?: any;
}

const ValuationConfigurationContent: React.FC<ValuationConfigurationProps> = ({
  onNavigateToPage,
  programName = 'XPT Commercial Auto TY23',
  valuationData
}) => {
  // Use the program name from valuationData if available, otherwise use the prop or default
  const displayProgramName = valuationData?.programName || programName;
  const colors = useSemanticColors();

  // Form state
  const [formData, setFormData] = useState({
    lossRatioMean: '53.2',
    lossRatioStdDev: '10.0',
    estimatedPremium: '20,107,359',
    premiumCap: '20,107,359',
    paidWeight: '20.0',
    paidCLCutoff: '66.7',
    reportedCLCutoff: '66.7',
    bfParameters: '1.500'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    onNavigateToPage('valuation-dashboard');
  };

  const handleSave = () => {
    // Here you would save the configuration data
    console.log('Saving configuration:', formData);
    onNavigateToPage('valuation-dashboard');
  };

  return (
    <Layout
      selectedSidebarItem="analytics"
      selectedSidebarSubitem="valuation"
      onNavigate={(itemId, subitemId) => {
        if (itemId === 'analytics' && subitemId === 'valuation') {
          onNavigateToPage('analytics-valuation');
        } else if (itemId === 'reports') {
          if (subitemId === 'transactions') {
            onNavigateToPage('transaction-management');
          } else if (subitemId === 'reports-explorer') {
            onNavigateToPage('report-navigation');
          } else if (subitemId === 'bdx-upload') {
            onNavigateToPage('bdx-upload');
          }
        } else if (itemId === 'contracts') {
          onNavigateToPage('contracts-explorer');
        }
      }}
      breadcrumbs={[
        { label: 'Valuation', onClick: () => onNavigateToPage?.('analytics-valuation'), isActive: false },
        { label: displayProgramName, onClick: () => onNavigateToPage?.('valuation-dashboard'), isActive: false },
        { label: 'Configuration', isActive: true }
      ]}
    >
      {/* Header Section */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '40px',
      }}>
        <div>
          <h1 style={{
            ...typography.styles.headlineH2,
            color: colors.blackAndWhite.black900,
            margin: '0 0 8px 0',
            lineHeight: '1.2',
          }}>
            <span>{displayProgramName}</span>
            <span>.</span>
          </h1>
          <p style={{
            ...typography.styles.headlineH2,
            color: colors.blackAndWhite.black500,
            margin: 0,
            lineHeight: '1.2',
          }}>
            Valuation configuration
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
        }}>
          <Button
            variant="primary"
            color="white"
            showIcon={false}
            onClick={handleCancel}
            style={{
              border: `1px solid ${colors.theme.primary400}`,
              minWidth: '196px',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            color="main"
            showIcon={false}
            onClick={handleSave}
            style={{
              minWidth: '196px',
              backgroundColor: colors.blackAndWhite.black300, // Disabled state
              color: colors.blackAndWhite.white,
              cursor: 'not-allowed',
            }}
            disabled
          >
            Save
          </Button>
        </div>
      </div>

      {/* Form Sections */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
      }}>
        {/* First Financial Parameters Section */}
        <div style={{
          backgroundColor: colors.theme.primary200,
          padding: '40px',
          borderRadius: borderRadius[8],
        }}>
          <h2 style={{
            ...typography.styles.subheadingM,
            color: colors.blackAndWhite.black900,
            margin: '0 0 40px 0',
          }}>
            Financial Parameters
          </h2>

          <div style={{
            display: 'flex',
            gap: '20px',
            width: '100%',
          }}>
            {/* Left Column */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <Input
                label="Loss Ratio Mean"
                leftSymbol="%"
                value={formData.lossRatioMean}
                onChange={(e) => handleInputChange('lossRatioMean', e.target.value)}
                tooltip={<InfoTooltip text="Expected loss ratio percentage for this valuation" position="right" />}
              />
              <Input
                label="Estimated Premium"
                leftSymbol="$"
                value={formData.estimatedPremium}
                onChange={(e) => handleInputChange('estimatedPremium', e.target.value)}
                tooltip={<InfoTooltip text="Total estimated premium amount for this period" position="right" />}
              />
            </div>

            {/* Right Column */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <Input
                label="Loss Ratio Std Dev"
                leftSymbol="%"
                value={formData.lossRatioStdDev}
                onChange={(e) => handleInputChange('lossRatioStdDev', e.target.value)}
                tooltip={<InfoTooltip text="Standard deviation for loss ratio calculations" position="right" />}
              />
              <Input
                label="Premium Cap"
                leftSymbol="$"
                value={formData.premiumCap}
                onChange={(e) => handleInputChange('premiumCap', e.target.value)}
                tooltip={<InfoTooltip text="Maximum premium amount for this valuation" position="right" />}
              />
            </div>
          </div>
        </div>

        {/* Second Financial Parameters Section */}
        <div style={{
          backgroundColor: colors.theme.primary200,
          padding: '40px',
          borderRadius: borderRadius[8],
        }}>
          <h2 style={{
            ...typography.styles.subheadingM,
            color: colors.blackAndWhite.black900,
            margin: '0 0 40px 0',
          }}>
            Financial Parameters
          </h2>

          <div style={{
            display: 'flex',
            gap: '20px',
            width: '100%',
          }}>
            {/* Left Column */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <Input
                label="Paid Weight"
                leftSymbol="%"
                value={formData.paidWeight}
                onChange={(e) => handleInputChange('paidWeight', e.target.value)}
                tooltip={<InfoTooltip text="Weight applied to paid loss data in calculations" position="right" />}
              />
              <Input
                label="Reported CL Cutoff"
                leftSymbol="%"
                value={formData.reportedCLCutoff}
                onChange={(e) => handleInputChange('reportedCLCutoff', e.target.value)}
                tooltip={<InfoTooltip text="Cutoff percentage for reported case loss calculations" position="right" />}
              />
            </div>

            {/* Right Column */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <Input
                label="Paid CL Cutoff"
                leftSymbol="%"
                value={formData.paidCLCutoff}
                onChange={(e) => handleInputChange('paidCLCutoff', e.target.value)}
                tooltip={<InfoTooltip text="Cutoff percentage for paid case loss calculations" position="right" />}
              />
              <Input
                label="BF parameters"
                value={formData.bfParameters}
                onChange={(e) => handleInputChange('bfParameters', e.target.value)}
                tooltip={<InfoTooltip text="Bornhuetter-Ferguson method parameters for loss projections" position="right" />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated Footer */}
      <div style={{
        marginTop: '40px',
        ...typography.styles.bodyL,
        color: colors.blackAndWhite.black500,
      }}>
        Last updated Jun 30, 2023
      </div>
    </Layout>
  );
};

export const ValuationConfiguration: React.FC<ValuationConfigurationProps> = (props) => {
  return (
    <ThemeProvider initialTheme="analytics">
      <ValuationConfigurationContent {...props} />
    </ThemeProvider>
  );
};