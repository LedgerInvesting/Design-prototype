import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import { Button, InfoTooltip, Modal, ButtonSelector, FileUploadBox, colors, typography, useSemanticColors, borderRadius } from '@design-library/components';
import { ThemeProvider } from '@design-library/tokens';
import { CheckExtraSmall, XExtraSmall, IncrementalExtraSmall, CumulativeExtraSmall, WorkbenchLogo, StatusWarning } from '@design-library/icons';
import { createPageNavigationHandler, createBreadcrumbs, type NavigationHandler } from '@design-library/utils/navigation';
import { BDXProcessingModal } from './BDXProcessingModal';

interface ReportsCessionSummaryGenerationProps {
  onNavigateToPage?: NavigationHandler;
  uploadData?: {
    fileName?: string;
    documentType?: string;
    month?: string;
    year?: string;
    openModal?: boolean;
    premiumTagging?: 'incremental' | 'cumulative';
    lossesTagging?: 'incremental' | 'cumulative';
    lossesExpenses?: 'included' | 'excluded';
    lossesRecoveries?: 'included' | 'excluded';
  };
}

// Helper component for metric rows
interface MetricRowProps {
  metricName: string;
  tooltipText: string;
  semanticColors: any;
  showBorder: boolean;
  value?: string;
  isGenerated?: boolean;
  onChange?: (value: string, isManual: boolean) => void;
}

const MetricRow: React.FC<MetricRowProps> = ({
  metricName,
  tooltipText,
  semanticColors,
  showBorder,
  value = '',
  isGenerated = false,
  onChange
}) => {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers, commas, and periods
    const newValue = e.target.value.replace(/[^0-9.,]/g, '');
    if (onChange) {
      onChange(newValue, true); // true means manually entered
    }
  };

  return (
    <div style={{
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px',
      borderBottom: showBorder ? `1px dashed ${semanticColors.theme.primary400}` : 'none'
    }}>
      {/* Left: Metric Name */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flex: 1
      }}>
        <InfoTooltip
          text={tooltipText}
          variant="small"
        />
        <p style={{
          ...typography.styles.bodyM,
          color: semanticColors.blackAndWhite.black800,
          margin: 0
        }}>
          {metricName}
        </p>
      </div>

      {/* Right: Value Input */}
      <div style={{
        minWidth: '200px',
        height: '25px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '0 20px',
        borderLeft: `1px solid ${semanticColors.theme.primary400}`
      }}>
        <span style={{
          ...typography.styles.bodyS,
          color: isGenerated ? semanticColors.blackAndWhite.black700 : semanticColors.blackAndWhite.black900
        }}>$</span>
        <input
          type="text"
          value={value}
          onChange={handleValueChange}
          placeholder="Type value"
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            ...typography.styles.bodyM,
            color: isGenerated ? semanticColors.blackAndWhite.black700 : semanticColors.blackAndWhite.black900,
            width: '100%',
            textAlign: 'left'
          }}
          className="metric-value-input"
        />
      </div>
    </div>
  );
};

// Helper component for calculated rows (no input, just display)
interface CalculatedRowProps {
  metricName: string;
  formula: string;
  semanticColors: any;
}

const CalculatedRow: React.FC<CalculatedRowProps> = ({
  metricName,
  formula,
  semanticColors
}) => {
  return (
    <div style={{
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 0 0 10px'
    }}>
      {/* Left: Metric Name + Formula */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '0 10px',
        width: '30%',
        flexShrink: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        border: `1px solid ${semanticColors.theme.primary400}`,
        borderRadius: '4px 0 0 4px',
        borderRight: 'none',
        height: '100%'
      }}>
        <InfoTooltip
          text={metricName}
          variant="small"
        />
        <p style={{
          fontSize: '12px',
          fontWeight: 500,
          color: semanticColors.blackAndWhite.black800,
          margin: 0,
          whiteSpace: 'nowrap'
        }}>
          {metricName}
        </p>
        <p style={{
          fontSize: '12px',
          fontWeight: 500,
          color: semanticColors.blackAndWhite.black500,
          margin: 0,
          whiteSpace: 'nowrap'
        }}>
          {formula}
        </p>
      </div>

      {/* Right: Value + Empty columns to match MetricRow structure */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        flex: 1
      }}>
        {/* Value Column */}
        <div style={{
          width: '20%',
          height: '25px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '10px 0 10px 20px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          border: `1px solid ${semanticColors.theme.primary400}`,
          borderRadius: '0 4px 4px 0',
          borderLeft: `1px solid ${semanticColors.theme.primary400}`
        }}>
          <span style={{ fontSize: '12px', fontWeight: 500, color: semanticColors.blackAndWhite.black500 }}>$</span>
          <p style={{
            fontSize: '14px',
            fontWeight: 500,
            color: semanticColors.blackAndWhite.black300,
            margin: 0,
            fontFamily: 'Söhne',
            textAlign: 'left'
          }}>
            Value is calculated
          </p>
        </div>

        {/* Empty Tagging Column */}
        <div style={{
          flex: 1
        }} />

        {/* Empty Expenses Column */}
        <div style={{
          flex: 1
        }} />

        {/* Empty Recoveries Column */}
        <div style={{
          flex: 1
        }} />
      </div>
    </div>
  );
};

// Modal Content Wrapper Component
const ModalContentWrapper: React.FC<{
  selectedFile: File | null;
  handleFileSelect: (file: File) => void;
  setSelectedFile: (file: File | null) => void;
}> = ({ selectedFile, handleFileSelect, setSelectedFile }) => {
  const modalColors = useSemanticColors();

  return (
    <div>
      {/* Upload Container */}
      <div style={{
        backgroundColor: modalColors.theme.primary200,
        padding: '20px',
        borderRadius: borderRadius[8],
        marginBottom: '12px'
      }}>
        {/* File Upload Box */}
        <FileUploadBox
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
          onFileRemove={() => setSelectedFile(null)}
          acceptedFileTypes=".xlsx,.csv,.xls"
          showFilePreview={true}
          placeholderText="Drag and drop your file here or click to"
          minHeight="120px"
          showFileSpecs={true}
          fileSpecs={[
            ['Accepted formats: .xlsx, .csv, .xls', 'Maximum file size: 10MB'],
            ['File must contain all required metric columns']
          ]}
        />
      </div>
    </div>
  );
};

export const ReportsCessionSummaryGeneration: React.FC<ReportsCessionSummaryGenerationProps> = ({
  onNavigateToPage,
  uploadData
}) => {
  const semanticColors = useSemanticColors();

  // Modal state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<'policy' | 'claim'>('policy');

  // Aggregated configuration settings from localStorage
  const [config, setConfig] = useState<{
    premiumTagging: 'incremental' | 'cumulative';
    lossesTagging: 'incremental' | 'cumulative';
    lossesExpenses: 'included' | 'excluded';
    lossesRecoveries: 'included' | 'excluded';
  }>({
    premiumTagging: 'incremental',
    lossesTagging: 'cumulative',
    lossesExpenses: 'included',
    lossesRecoveries: 'excluded',
  });

  // Metric values state - stores value and whether it's generated or manual
  interface MetricValue {
    value: string;
    isGenerated: boolean;
  }

  const [metrics, setMetrics] = useState<{
    earnedPremium: MetricValue;
    writtenPremium1: MetricValue;
    writtenPremium2: MetricValue;
    paidLoss: MetricValue;
    reportedLoss: MetricValue;
    expenses: MetricValue;
    recoveries: MetricValue;
    ibnr: MetricValue;
    adjustment: MetricValue;
  }>({
    earnedPremium: { value: '', isGenerated: false },
    writtenPremium1: { value: '', isGenerated: false },
    writtenPremium2: { value: '', isGenerated: false },
    paidLoss: { value: '', isGenerated: false },
    reportedLoss: { value: '', isGenerated: false },
    expenses: { value: '', isGenerated: false },
    recoveries: { value: '', isGenerated: false },
    ibnr: { value: '', isGenerated: false },
    adjustment: { value: '', isGenerated: false },
  });

  // Helper to parse value string to number
  const parseValue = (value: string): number => {
    if (!value) return 0;
    const cleaned = value.replace(/,/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Calculated values based on metrics
  const paidLossNum = parseValue(metrics.paidLoss.value);
  const lossReservesNum = parseValue(metrics.reportedLoss.value); // This field stores Loss Reserves
  const ibnrNum = parseValue(metrics.ibnr.value);
  const reportedLoss = paidLossNum + lossReservesNum; // Reported Loss = Paid Loss + Loss Reserves
  const incurredLoss = reportedLoss + ibnrNum;

  // Format number for display
  const formatValue = (value: number): string => {
    if (value === 0) return '';
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Format number with commas for input fields
  const formatInputValue = (value: number): string => {
    return value.toLocaleString('en-US');
  };

  // Update individual metric
  const updateMetric = (field: keyof typeof metrics, value: string, isManual: boolean) => {
    setMetrics(prev => ({
      ...prev,
      [field]: {
        value,
        isGenerated: !isManual // If manually entered, it's no longer generated
      }
    }));
  };

  // Populate all metrics with generated values
  const populateGeneratedValues = () => {
    const values = [1250000, 1500000, 1100000, 850000, 200000, 150000, 75000, 50000, 25000];
    setMetrics({
      earnedPremium: { value: formatInputValue(values[0]), isGenerated: true },
      writtenPremium1: { value: formatInputValue(values[1]), isGenerated: true },
      writtenPremium2: { value: formatInputValue(values[2]), isGenerated: true },
      paidLoss: { value: formatInputValue(values[3]), isGenerated: true },
      reportedLoss: { value: formatInputValue(values[4]), isGenerated: true },
      expenses: { value: formatInputValue(values[5]), isGenerated: true },
      recoveries: { value: formatInputValue(values[6]), isGenerated: true },
      ibnr: { value: formatInputValue(values[7]), isGenerated: true },
      adjustment: { value: formatInputValue(values[8]), isGenerated: true },
    });
  };

  // Clear all generated values
  const clearGeneratedValues = () => {
    setMetrics({
      earnedPremium: { value: '', isGenerated: false },
      writtenPremium1: { value: '', isGenerated: false },
      writtenPremium2: { value: '', isGenerated: false },
      paidLoss: { value: '', isGenerated: false },
      reportedLoss: { value: '', isGenerated: false },
      expenses: { value: '', isGenerated: false },
      recoveries: { value: '', isGenerated: false },
      ibnr: { value: '', isGenerated: false },
      adjustment: { value: '', isGenerated: false },
    });
    setUploadedFileName(null);
  };

  // Track uploaded file name for display
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Check if all fields are filled
  const allFieldsFilled = Object.values(metrics).every(metric => metric.value !== '');

  // File handling function
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  // Add CSS for placeholder styling
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .metric-value-input::placeholder {
        color: ${semanticColors.blackAndWhite.black300};
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [semanticColors]);

  // Load configuration from localStorage on mount
  React.useEffect(() => {
    const savedSettings = localStorage.getItem('cucumber-gl-seasonal-settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setConfig({
          premiumTagging: settings.premiumTagging || 'incremental',
          lossesTagging: settings.lossesTagging || 'cumulative',
          lossesExpenses: settings.lossesExpenses || 'included',
          lossesRecoveries: settings.lossesRecoveries || 'excluded',
        });
      } catch (e) {
        console.error('Error loading settings:', e);
      }
    }
  }, []);

  // Open modal if navigated from Add button (only once)
  React.useEffect(() => {
    if (uploadData?.openModal) {
      setIsImportModalOpen(true);
      // Clear the openModal flag after opening to prevent reopening on navigation back
      if (uploadData) {
        uploadData.openModal = false;
      }
    }
  }, []); // Empty dependency array so it only runs once on mount

  // Create navigation handler
  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'reports-cession-summary-generation')
    : undefined;

  // Create breadcrumbs with back navigation to BDX Upload
  const breadcrumbs = onNavigateToPage
    ? [
        { label: 'Reports', isActive: false },
        { label: 'BDX Upload', onClick: () => onNavigateToPage('reports-bdx-upload'), isActive: false },
        { label: 'Cession Summary Generation', isActive: true }
      ]
    : [
        { label: 'Reports' },
        { label: 'BDX Upload' },
        { label: 'Cession Summary Generation' }
      ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      pageType="reports-cession-summary-generation"
      selectedSidebarItem="reports"
      selectedSidebarSubitem="bdx-upload"
      onNavigate={navigationHandler}
      isSubPage={true}
      onBackClick={() => {
        if (onNavigateToPage) {
          onNavigateToPage('reports-bdx-upload');
        }
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        {/* Header Section - Title and Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '10px'
        }}>
          {/* Title */}
          <h2 style={{
            ...typography.styles.headlineH2,
            color: semanticColors.blackAndWhite.black900,
            margin: 0,
            maxWidth: '788px'
          }}>
            <span style={{ color: semanticColors.blackAndWhite.black500 }}>
              You're now reviewing cession statement for
              <br />
            </span>
            Transaction name
            <span style={{ color: semanticColors.blackAndWhite.black500 }}> within </span>
            Cucumber GL Seasonal
          </h2>

          {/* Buttons - Stacked Vertically */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'flex-start'
          }}>
            <Button
              variant="primary"
              color="black"
              showIcon={false}
              disabled={!allFieldsFilled}
              style={{
                width: '187px',
                justifyContent: 'center'
              }}
              onClick={() => {
                console.log('Generate Cession clicked, all fields filled:', allFieldsFilled);
                if (onNavigateToPage) {
                  // Pass the metrics values to the cession statement page
                  onNavigateToPage('reports-cession-statement', {
                    generatedValues: {
                      earnedPremium: metrics.earnedPremium.value,
                      writtenPremium1: metrics.writtenPremium1.value,
                      writtenPremium2: metrics.writtenPremium2.value,
                      paidLoss: metrics.paidLoss.value,
                      reportedLoss: metrics.reportedLoss.value,
                      ibnr: metrics.ibnr.value,
                      adjustment: metrics.adjustment.value,
                    }
                  });
                }
              }}
            >
              Generate Cession
            </Button>
            <Button
              variant="small"
              color="white"
              showIcon={false}
              style={{
                width: '187px',
                justifyContent: 'center'
              }}
              onClick={() => {
                if (onNavigateToPage) {
                  onNavigateToPage('reports-new-transaction-form', {
                    initialTab: 'reporting-config',
                    mode: 'edit',
                    programName: 'Cucumber GL Seasonal'
                  });
                }
              }}
            >
              Reporting Parameters
            </Button>
          </div>
        </div>

        {/* Data Detail Level */}
        <p style={{
          ...typography.styles.bodyL,
          margin: 0
        }}>
          <span style={{ color: semanticColors.blackAndWhite.black500 }}>Data detail level — </span>
          <span style={{ color: semanticColors.blackAndWhite.black900 }}>Aggregated</span>
        </p>

        {/* Configuration Form */}
        <div style={{
          backgroundColor: semanticColors.theme.primary200,
          borderRadius: '12px',
          padding: '30px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Header with Import Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <p style={{
              ...typography.styles.bodyL,
              color: semanticColors.blackAndWhite.black500,
              margin: 0
            }}>
              You can complete this form manually or upload a file to populate the fields automatically
            </p>
            {!uploadedFileName ? (
              <div
                onClick={() => setIsImportModalOpen(true)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '10px',
                  border: `1px solid ${semanticColors.theme.primary400}`,
                  backgroundColor: semanticColors.blackAndWhite.white,
                  borderRadius: borderRadius[4],
                  padding: '8px 20px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  width: 'fit-content'
                }}
              >
                <img
                  src="/excel.png"
                  alt="Excel"
                  style={{ width: '20px', height: '17px', flexShrink: 0 }}
                />
                <span style={{
                  fontFamily: typography.fontFamily.mono.join(', '),
                  fontSize: typography.styles.bodyS.fontSize,
                  fontWeight: typography.styles.bodyS.fontWeight,
                  lineHeight: typography.styles.bodyS.lineHeight,
                  letterSpacing: typography.letterSpacing.widest,
                  textTransform: 'uppercase',
                  color: semanticColors.blackAndWhite.black900
                }}>
                  Import values from file
                </span>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                border: `1px solid ${semanticColors.theme.primary400}`,
                backgroundColor: semanticColors.blackAndWhite.white,
                borderRadius: borderRadius[4],
                padding: '8px 12px',
                whiteSpace: 'nowrap',
                width: 'fit-content'
              }}>
                <img
                  src="/excel.png"
                  alt="Excel"
                  style={{ width: '20px', height: '17px', flexShrink: 0 }}
                />
                <span style={{
                  ...typography.styles.bodyM,
                  color: semanticColors.blackAndWhite.black900
                }}>
                  {uploadedFileName}
                </span>
                <div
                  onClick={clearGeneratedValues}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px',
                    backgroundColor: semanticColors.theme.primary200,
                    borderRadius: borderRadius[4]
                  }}
                >
                  <XExtraSmall color={semanticColors.blackAndWhite.black700} />
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            backgroundColor: semanticColors.theme.primary400,
            width: '100%'
          }} />

          {/* Form Content - Starting with Premium section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            paddingTop: '10px'
          }}>
            {/* Premium Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 0 10px 0'
            }}>
              {/* Left: Premium Title and Tags */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flex: 1
              }}>
                <p style={{
                  ...typography.styles.bodyL,
                  color: semanticColors.blackAndWhite.black900,
                  margin: 0,
                  fontWeight: typography.fontWeight.medium
                }}>
                  Premium
                </p>

                {/* Premium Tags */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black700
                  }}>
                    Tagging:
                  </span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    height: '17px',
                    padding: '5px 4px',
                    borderRadius: '4px',
                    backgroundColor: colors.reports.blue600,
                    color: '#1c6297',
                    ...typography.styles.bodyS
                  }}>
                    {config.premiumTagging === 'incremental' ? (
                      <>
                        <IncrementalExtraSmall color="#1c6297" />
                        Incremental
                      </>
                    ) : (
                      <>
                        <CumulativeExtraSmall color="#1c6297" />
                        Cumulative
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Value Title - aligned with border division */}
              <div style={{
                minWidth: '200px',
                display: 'flex',
                alignItems: 'center',
                borderLeft: `1px solid transparent`
              }}>
                <p style={{
                  ...typography.styles.bodyL,
                  color: semanticColors.blackAndWhite.black900,
                  margin: 0,
                  fontWeight: typography.fontWeight.medium
                }}>
                  Value
                </p>
              </div>
            </div>

            {/* Premium Container */}
            <div style={{
              backgroundColor: semanticColors.blackAndWhite.white,
              border: `1px solid ${semanticColors.theme.primary400}`,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Earned Premium Row */}
              <MetricRow
                metricName="Earned Premium"
                tooltipText="Premium earned during the reporting period"
                semanticColors={semanticColors}
                showBorder={true}
                value={metrics.earnedPremium.value}
                isGenerated={metrics.earnedPremium.isGenerated}
                onChange={(value, isManual) => updateMetric('earnedPremium', value, isManual)}
              />

              {/* Written Premium Row */}
              <MetricRow
                metricName="Written Premium"
                tooltipText="Total premium written during the reporting period"
                semanticColors={semanticColors}
                showBorder={true}
                value={metrics.writtenPremium1.value}
                isGenerated={metrics.writtenPremium1.isGenerated}
                onChange={(value, isManual) => updateMetric('writtenPremium1', value, isManual)}
              />

              {/* Collected Premium Row */}
              <MetricRow
                metricName="Collected Premium"
                tooltipText="Premium collected during the reporting period"
                semanticColors={semanticColors}
                showBorder={false}
                value={metrics.writtenPremium2.value}
                isGenerated={metrics.writtenPremium2.isGenerated}
                onChange={(value, isManual) => updateMetric('writtenPremium2', value, isManual)}
              />
            </div>

            {/* Losses Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px 0 10px 0'
            }}>
              {/* Left: Losses Title and Tags */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flex: 1,
                flexWrap: 'wrap'
              }}>
                <p style={{
                  ...typography.styles.bodyL,
                  color: semanticColors.blackAndWhite.black900,
                  margin: 0,
                  fontWeight: typography.fontWeight.medium
                }}>
                  Losses
                </p>

                {/* Losses Tags */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  {/* Tagging */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{
                      ...typography.styles.bodyM,
                      color: semanticColors.blackAndWhite.black700
                    }}>
                      Tagging:
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      height: '17px',
                      padding: '5px 4px',
                      borderRadius: '4px',
                      backgroundColor: colors.reports.blue600,
                      color: '#1c6297',
                      ...typography.styles.bodyS
                    }}>
                      {config.lossesTagging === 'incremental' ? (
                        <>
                          <IncrementalExtraSmall color="#1c6297" />
                          Incremental
                        </>
                      ) : (
                        <>
                          <CumulativeExtraSmall color="#1c6297" />
                          Cumulative
                        </>
                      )}
                    </div>
                  </div>

                  {/* Expenses */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{
                      ...typography.styles.bodyM,
                      color: semanticColors.blackAndWhite.black700
                    }}>
                      Expenses:
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      height: '17px',
                      padding: '5px 4px',
                      borderRadius: '4px',
                      backgroundColor: config.lossesExpenses === 'included'
                        ? 'rgba(198, 255, 193, 0.5)'
                        : 'rgba(255, 239, 176, 0.5)',
                      color: config.lossesExpenses === 'included'
                        ? colors.analytics.green900
                        : colors.contracts.yellow900,
                      ...typography.styles.bodyS
                    }}>
                      {config.lossesExpenses === 'included' ? (
                        <>
                          <CheckExtraSmall color={colors.analytics.green900} />
                          Included
                        </>
                      ) : (
                        <>
                          <XExtraSmall color={colors.contracts.yellow900} />
                          Excluded
                        </>
                      )}
                    </div>
                  </div>

                  {/* Recoveries */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{
                      ...typography.styles.bodyM,
                      color: semanticColors.blackAndWhite.black700
                    }}>
                      Recoveries:
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      height: '17px',
                      padding: '5px 4px',
                      borderRadius: '4px',
                      backgroundColor: config.lossesRecoveries === 'included'
                        ? 'rgba(198, 255, 193, 0.5)'
                        : 'rgba(255, 239, 176, 0.5)',
                      color: config.lossesRecoveries === 'included'
                        ? colors.analytics.green900
                        : colors.contracts.yellow900,
                      ...typography.styles.bodyS
                    }}>
                      {config.lossesRecoveries === 'included' ? (
                        <>
                          <CheckExtraSmall color={colors.analytics.green900} />
                          Included
                        </>
                      ) : (
                        <>
                          <XExtraSmall color={colors.contracts.yellow900} />
                          Excluded
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Value Title - aligned with border division */}
              <div style={{
                minWidth: '200px',
                display: 'flex',
                alignItems: 'center',
                borderLeft: `1px solid transparent`
              }}>
                <p style={{
                  ...typography.styles.bodyL,
                  color: semanticColors.blackAndWhite.black900,
                  margin: 0,
                  fontWeight: typography.fontWeight.medium
                }}>
                  Value
                </p>
              </div>
            </div>

            {/* Losses Container */}
            <div style={{
              backgroundColor: semanticColors.blackAndWhite.white,
              border: `1px solid ${semanticColors.theme.primary400}`,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Paid Loss Row */}
              <MetricRow
                metricName="Paid Loss"
                tooltipText="Losses actually paid out during the reporting period"
                semanticColors={semanticColors}
                showBorder={true}
                value={metrics.paidLoss.value}
                isGenerated={metrics.paidLoss.isGenerated}
                onChange={(value, isManual) => updateMetric('paidLoss', value, isManual)}
              />

              {/* Loss Reserves Row */}
              <MetricRow
                metricName="Loss Reserves"
                tooltipText="Reserved amount for known and reported losses"
                semanticColors={semanticColors}
                showBorder={true}
                value={metrics.reportedLoss.value}
                isGenerated={metrics.reportedLoss.isGenerated}
                onChange={(value, isManual) => updateMetric('reportedLoss', value, isManual)}
              />

              {/* Conditional Expenses Row */}
              {config.lossesExpenses === 'excluded' && (
                <MetricRow
                  metricName="Expenses"
                  tooltipText="Expenses excluded from losses"
                  semanticColors={semanticColors}
                  showBorder={true}
                  value={metrics.expenses.value}
                  isGenerated={metrics.expenses.isGenerated}
                  onChange={(value, isManual) => updateMetric('expenses', value, isManual)}
                />
              )}

              {/* Conditional Recoveries Row */}
              {config.lossesRecoveries === 'excluded' && (
                <MetricRow
                  metricName="Recoveries"
                  tooltipText="Recoveries excluded from losses"
                  semanticColors={semanticColors}
                  showBorder={true}
                  value={metrics.recoveries.value}
                  isGenerated={metrics.recoveries.isGenerated}
                  onChange={(value, isManual) => updateMetric('recoveries', value, isManual)}
                />
              )}

              {/* IBNR Row */}
              <MetricRow
                metricName="IBNR"
                tooltipText="Incurred But Not Reported loss reserves"
                semanticColors={semanticColors}
                showBorder={false}
                value={metrics.ibnr.value}
                isGenerated={metrics.ibnr.isGenerated}
                onChange={(value, isManual) => updateMetric('ibnr', value, isManual)}
              />
            </div>

            {/* Reported Loss Container */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              border: `1px solid ${semanticColors.theme.primary400}`,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px'
              }}>
                {/* Left: Metric Name + Formula */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flex: 1
                }}>
                  <InfoTooltip
                    text="Total losses reported (Paid Loss + Loss Reserves)"
                    variant="small"
                  />
                  <p style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black800,
                    margin: 0
                  }}>
                    Reported Loss
                  </p>
                  <p style={{
                    ...typography.styles.bodyS,
                    color: semanticColors.blackAndWhite.black500,
                    margin: 0
                  }}>
                    (Paid Loss + Loss Reserves)
                  </p>
                </div>

                {/* Right: Value Display */}
                <div style={{
                  minWidth: '200px',
                  height: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0 20px',
                  borderLeft: `1px solid ${semanticColors.theme.primary400}`
                }}>
                  <span style={{ ...typography.styles.bodyS, color: semanticColors.blackAndWhite.black500 }}>$</span>
                  <p style={{
                    ...typography.styles.bodyM,
                    color: reportedLoss === 0 ? semanticColors.blackAndWhite.black300 : semanticColors.blackAndWhite.black500,
                    margin: 0,
                    textAlign: 'left'
                  }}>
                    {reportedLoss === 0 ? 'Value will be calculated' : formatValue(reportedLoss)}
                  </p>
                </div>
              </div>
            </div>

            {/* Incurred Loss Container */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              border: `1px solid ${semanticColors.theme.primary400}`,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px'
              }}>
                {/* Left: Metric Name + Formula */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flex: 1
                }}>
                  <InfoTooltip
                    text="Total incurred losses (Reported Loss + IBNR)"
                    variant="small"
                  />
                  <p style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black800,
                    margin: 0
                  }}>
                    Incurred Loss
                  </p>
                  <p style={{
                    ...typography.styles.bodyS,
                    color: semanticColors.blackAndWhite.black500,
                    margin: 0
                  }}>
                    (Reported Loss + IBNR)
                  </p>
                </div>

                {/* Right: Value Display */}
                <div style={{
                  minWidth: '200px',
                  height: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0 20px',
                  borderLeft: `1px solid ${semanticColors.theme.primary400}`
                }}>
                  <span style={{ ...typography.styles.bodyS, color: semanticColors.blackAndWhite.black500 }}>$</span>
                  <p style={{
                    ...typography.styles.bodyM,
                    color: incurredLoss === 0 ? semanticColors.blackAndWhite.black300 : semanticColors.blackAndWhite.black500,
                    margin: 0,
                    textAlign: 'left'
                  }}>
                    {incurredLoss === 0 ? 'Value will be calculated' : formatValue(incurredLoss)}
                  </p>
                </div>
              </div>
            </div>

            {/* Adjustments Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px 0 10px 0'
            }}>
              {/* Left: Adjustments Title */}
              <div style={{
                flex: 1
              }}>
                <p style={{
                  ...typography.styles.bodyL,
                  color: semanticColors.blackAndWhite.black900,
                  margin: 0,
                  fontWeight: typography.fontWeight.medium
                }}>
                  Adjustments
                </p>
              </div>

              {/* Right: Value Title - aligned with border division */}
              <div style={{
                minWidth: '200px',
                display: 'flex',
                alignItems: 'center',
                borderLeft: `1px solid transparent`
              }}>
                <p style={{
                  ...typography.styles.bodyL,
                  color: semanticColors.blackAndWhite.black900,
                  margin: 0,
                  fontWeight: typography.fontWeight.medium
                }}>
                  Value
                </p>
              </div>
            </div>

            {/* Adjustments Container */}
            <div style={{
              backgroundColor: semanticColors.blackAndWhite.white,
              border: `1px solid ${semanticColors.theme.primary400}`,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Adjustment Row */}
              <MetricRow
                metricName="Adjustement"
                tooltipText="Any adjustments or corrections to reported values"
                semanticColors={semanticColors}
                showBorder={false}
                value={metrics.adjustment.value}
                isGenerated={metrics.adjustment.isGenerated}
                onChange={(value, isManual) => updateMetric('adjustment', value, isManual)}
              />
            </div>
          </div>
        </div>

        {/* AI Generated Values Message */}
        {Object.values(metrics).some(metric => metric.isGenerated) && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '-30px',
            backgroundColor: colors.warning.fillLight,
            padding: '12px 16px',
            borderRadius: borderRadius[8]
          }}>
            <StatusWarning color={colors.warning.textAndStrokes} />
            <p style={{
              ...typography.styles.bodyM,
              color: semanticColors.blackAndWhite.black700,
              margin: 0
            }}>
              Validation requirement — Review and configure the extracted metrics. Override values as needed
            </p>
          </div>
        )}
      </div>

      {/* Import File Modal */}
      {isImportModalOpen && (
        <ThemeProvider initialTheme="reports">
          <Modal
            isOpen={isImportModalOpen}
            onClose={() => {
              setIsImportModalOpen(false);
              setSelectedFile(null);
              setDocumentType('policy');
            }}
            title={
              <div>
                <div style={{
                  ...typography.styles.subheadingL,
                }}>
                  <span style={{ color: colors.blackAndWhite.black900 }}>Import Bordereau</span><br/>
                  <span style={{ color: colors.blackAndWhite.black500 }}>Data From File</span>
                </div>
                <div style={{
                  ...typography.styles.bodyM,
                  color: colors.blackAndWhite.black500,
                  marginTop: '8px'
                }}>
                  Upload a file to import aggregated Bordereau data
                </div>
              </div>
            }
            width="560px"
            maxWidth="90vw"
            showBackdrop={true}
            backdropOpacity={0.5}
            backdropColor="white"
            centered={true}
            footer={
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%'
              }}>
                <Button
                  variant="primary"
                  color="black"
                  showIcon={false}
                  disabled={!selectedFile}
                  onClick={() => {
                    // Handle import
                    if (selectedFile) {
                      console.log('Importing file:', selectedFile.name);
                      // Close import modal and open processing modal
                      setIsImportModalOpen(false);
                      setIsProcessingModalOpen(true);
                    }
                  }}
                  style={{ width: '100%' }}
                >
                  Upload & extract metrics
                </Button>
                <Button
                  variant="primary"
                  color="white"
                  showIcon={false}
                  onClick={() => {
                    // Handle manual entry
                    setIsImportModalOpen(false);
                    setSelectedFile(null);
                  }}
                  style={{ width: '100%' }}
                >
                  Or enter metrics manually
                </Button>
              </div>
            }
          >
            <ModalContentWrapper
              selectedFile={selectedFile}
              handleFileSelect={handleFileSelect}
              setSelectedFile={setSelectedFile}
            />
          </Modal>
        </ThemeProvider>
      )}

      {/* BDX Processing Modal */}
      {isProcessingModalOpen && selectedFile && (
        <ThemeProvider initialTheme="reports">
          <BDXProcessingModal
            isOpen={isProcessingModalOpen}
            fileName={selectedFile.name}
            onContinue={() => {
              // Close processing modal
              setIsProcessingModalOpen(false);
              // Store file name for display
              setUploadedFileName(selectedFile.name);
              setSelectedFile(null);
              // Populate form with generated values
              populateGeneratedValues();
            }}
          />
        </ThemeProvider>
      )}
    </Layout>
  );
};
