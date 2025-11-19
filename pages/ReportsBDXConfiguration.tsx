import React, { useState } from 'react';
import { Layout } from '@design-library/pages';
import { Button, InfoTooltip, Modal, ButtonSelector, FileUploadBox, colors, typography, useSemanticColors, borderRadius } from '@design-library/components';
import { ThemeProvider } from '@design-library/tokens';
import { CheckExtraSmall, XExtraSmall, WorkbenchLogo, StatusWarning } from '@design-library/icons';
import { createPageNavigationHandler, createBreadcrumbs, type NavigationHandler } from '@design-library/utils/navigation';
import { BDXProcessingModal } from './BDXProcessingModal';

interface ReportsBDXConfigurationProps {
  onNavigateToPage?: NavigationHandler;
  uploadData?: {
    fileName?: string;
    documentType?: string;
    month?: string;
    year?: string;
    openModal?: boolean;
  };
}

// Helper component for metric rows
interface MetricRowProps {
  metricName: string;
  tagging: 'Incremental' | 'Cumulative';
  expenses: 'Included' | 'Excluded';
  recoveries: 'Included' | 'Excluded';
  semanticColors: any;
  showBorder: boolean;
  value?: string;
  isGenerated?: boolean;
  onChange?: (value: string, isManual: boolean) => void;
}

const MetricRow: React.FC<MetricRowProps> = ({
  metricName,
  tagging,
  expenses,
  recoveries,
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

  const tagStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    height: '24px',
    padding: '0 20px',
    borderRadius: '4px',
    width: 'fit-content',
    ...typography.styles.bodyS
  };

  const getTagColors = (type: string, value: string) => {
    if (type === 'tagging') {
      if (value === 'Incremental') {
        return {
          bg: 'rgba(225, 243, 255, 0.6)',
          color: '#1c6297'
        };
      } else {
        return {
          bg: 'rgba(225, 243, 255, 0.5)',
          color: '#1c6297'
        };
      }
    } else if (type === 'expenses' || type === 'recoveries') {
      if (value === 'Included') {
        // Green - analytics green900
        const greenBg = colors.success.fill;
        // Convert hex to rgba with 60% opacity
        const r = parseInt(greenBg.slice(1, 3), 16);
        const g = parseInt(greenBg.slice(3, 5), 16);
        const b = parseInt(greenBg.slice(5, 7), 16);
        return {
          bg: `rgba(${r}, ${g}, ${b}, 0.6)`,
          color: colors.analytics.green900
        };
      } else {
        // Yellow - contracts yellow900
        const yellowBg = colors.warning.fill;
        // Convert hex to rgba with 60% opacity
        const r = parseInt(yellowBg.slice(1, 3), 16);
        const g = parseInt(yellowBg.slice(3, 5), 16);
        const b = parseInt(yellowBg.slice(5, 7), 16);
        return {
          bg: `rgba(${r}, ${g}, ${b}, 0.6)`,
          color: colors.contracts.yellow900
        };
      }
    }
    return { bg: '', color: '' };
  };

  return (
    <div style={{
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 0 0 10px',
      borderBottom: showBorder ? `1px dashed ${semanticColors.theme.primary400}` : 'none'
    }}>
      {/* Left: Metric Name */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '0 10px',
        width: '400px',
        flexShrink: 0
      }}>
        <InfoTooltip
          text={metricName}
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

      {/* Right: Value + Tags */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        flex: 1
      }}>
        {/* Value Input */}
        <div style={{
          width: '200px',
          height: '25px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '10px 0 10px 20px',
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

        {/* Tagging */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          borderLeft: `1px solid ${semanticColors.theme.primary400}`
        }}>
          <div style={{
            ...tagStyle,
            backgroundColor: getTagColors('tagging', tagging).bg,
            color: getTagColors('tagging', tagging).color
          }}>
            {tagging}
          </div>
        </div>

        {/* Expenses */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          borderLeft: `1px solid ${semanticColors.theme.primary400}`
        }}>
          <div style={{
            ...tagStyle,
            backgroundColor: getTagColors('expenses', expenses).bg,
            color: getTagColors('expenses', expenses).color
          }}>
            {expenses === 'Included' ? (
              <CheckExtraSmall color={getTagColors('expenses', expenses).color} />
            ) : (
              <XExtraSmall color={getTagColors('expenses', expenses).color} />
            )}
            {expenses}
          </div>
        </div>

        {/* Recoveries */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          borderLeft: `1px solid ${semanticColors.theme.primary400}`
        }}>
          <div style={{
            ...tagStyle,
            backgroundColor: getTagColors('recoveries', recoveries).bg,
            color: getTagColors('recoveries', recoveries).color
          }}>
            {recoveries === 'Included' ? (
              <CheckExtraSmall color={getTagColors('recoveries', recoveries).color} />
            ) : (
              <XExtraSmall color={getTagColors('recoveries', recoveries).color} />
            )}
            {recoveries}
          </div>
        </div>
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

// Korra Workbench Badge component (similar to ContractsAI badge)
const KorraWorkbenchBadge = React.memo(() => {
  const badgeColors = useSemanticColors();
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '40px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: badgeColors.theme.primary700,
      padding: '5px 6px 5px 5px',
      borderRadius: borderRadius[8],
      zIndex: 2
    }}>
      <div style={{
        width: '16px',
        height: '16px',
        backgroundColor: colors.blackAndWhite.black900,
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '10px',
          height: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <WorkbenchLogo color={badgeColors.theme.primary700} />
        </div>
      </div>
      <span style={{
        ...typography.styles.bodyS,
        color: colors.blackAndWhite.black800,
        fontWeight: 500
      }}>
        Korra Workbench
      </span>
    </div>
  );
});
KorraWorkbenchBadge.displayName = 'KorraWorkbenchBadge';

// Modal Content Wrapper Component to use workbench theme colors
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

export const ReportsBDXConfiguration: React.FC<ReportsBDXConfigurationProps> = ({
  onNavigateToPage,
  uploadData
}) => {
  const semanticColors = useSemanticColors();

  // Modal state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<'policy' | 'claim'>('policy');

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
    ibnr: MetricValue;
    adjustment: MetricValue;
  }>({
    earnedPremium: { value: '', isGenerated: false },
    writtenPremium1: { value: '', isGenerated: false },
    writtenPremium2: { value: '', isGenerated: false },
    paidLoss: { value: '', isGenerated: false },
    reportedLoss: { value: '', isGenerated: false },
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
  const reportedLossNum = parseValue(metrics.reportedLoss.value);
  const ibnrNum = parseValue(metrics.ibnr.value);
  const lossReserves = reportedLossNum - paidLossNum;
  const incurredLoss = reportedLossNum + ibnrNum;

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
    const values = [1250000, 1500000, 1100000, 850000, 200000, 150000, 25000];
    setMetrics({
      earnedPremium: { value: formatInputValue(values[0]), isGenerated: true },
      writtenPremium1: { value: formatInputValue(values[1]), isGenerated: true },
      writtenPremium2: { value: formatInputValue(values[2]), isGenerated: true },
      paidLoss: { value: formatInputValue(values[3]), isGenerated: true },
      reportedLoss: { value: formatInputValue(values[4]), isGenerated: true },
      ibnr: { value: formatInputValue(values[5]), isGenerated: true },
      adjustment: { value: formatInputValue(values[6]), isGenerated: true },
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

  // Open modal if navigated from Add button
  React.useEffect(() => {
    if (uploadData?.openModal) {
      setIsImportModalOpen(true);
    }
  }, [uploadData?.openModal]);

  // Create navigation handler
  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'reports-bdx-configuration')
    : undefined;

  // Create breadcrumbs with back navigation to BDX Upload
  const breadcrumbs = onNavigateToPage
    ? [
        { label: 'Reports', isActive: false },
        { label: 'BDX Upload', onClick: () => onNavigateToPage('reports-bdx-upload'), isActive: false },
        { label: 'Configure Bordereau', isActive: true }
      ]
    : [
        { label: 'Reports' },
        { label: 'BDX Upload' },
        { label: 'Configure Bordereau' }
      ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      pageType="reports-bdx-configuration"
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
                  onNavigateToPage('reports-cession-statement');
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
                  onNavigateToPage('reports-new-transaction-form', { initialTab: 'reporting-config' });
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
                  ...typography.styles.bodyM,
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
            {/* Header Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 0 20px 10px'
            }}>
              {/* Metric name header */}
              <div style={{
                width: '400px',
                padding: '0 10px 0 10px',
                flexShrink: 0
              }}>
                <p style={{
                  ...typography.styles.bodyL,
                  color: semanticColors.blackAndWhite.black900,
                  margin: 0,
                  fontWeight: typography.fontWeight.medium
                }}>
                  Metric name
                </p>
              </div>

              {/* Right: Value + Tags headers */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1
              }}>
                {/* Value header */}
                <div style={{
                  width: '200px',
                  padding: '0 20px 0 20px',
                  flexShrink: 0
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

                {/* Tagging header */}
                <div style={{
                  flex: 1,
                  padding: '0 20px'
                }}>
                  <p style={{
                    ...typography.styles.bodyL,
                    color: semanticColors.blackAndWhite.black900,
                    margin: 0,
                    fontWeight: typography.fontWeight.medium
                  }}>
                    Tagging
                  </p>
                </div>

                {/* Expenses header */}
                <div style={{
                  flex: 1,
                  padding: '0 20px'
                }}>
                  <p style={{
                    ...typography.styles.bodyL,
                    color: semanticColors.blackAndWhite.black900,
                    margin: 0,
                    fontWeight: typography.fontWeight.medium
                  }}>
                    Expenses
                  </p>
                </div>

                {/* Recoveries header */}
                <div style={{
                  flex: 1,
                  padding: '0 20px'
                }}>
                  <p style={{
                    ...typography.styles.bodyL,
                    color: semanticColors.blackAndWhite.black900,
                    margin: 0,
                    fontWeight: typography.fontWeight.medium
                  }}>
                    Recoveries
                  </p>
                </div>
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
                tagging="Incremental"
                expenses="Included"
                recoveries="Excluded"
                semanticColors={semanticColors}
                showBorder={true}
                value={metrics.earnedPremium.value}
                isGenerated={metrics.earnedPremium.isGenerated}
                onChange={(value, isManual) => updateMetric('earnedPremium', value, isManual)}
              />

              {/* Written Premium Row */}
              <MetricRow
                metricName="Written Premium"
                tagging="Cumulative"
                expenses="Excluded"
                recoveries="Included"
                semanticColors={semanticColors}
                showBorder={true}
                value={metrics.writtenPremium1.value}
                isGenerated={metrics.writtenPremium1.isGenerated}
                onChange={(value, isManual) => updateMetric('writtenPremium1', value, isManual)}
              />

              {/* Written Premium Row (duplicate) */}
              <MetricRow
                metricName="Written Premium"
                tagging="Incremental"
                expenses="Included"
                recoveries="Excluded"
                semanticColors={semanticColors}
                showBorder={false}
                value={metrics.writtenPremium2.value}
                isGenerated={metrics.writtenPremium2.isGenerated}
                onChange={(value, isManual) => updateMetric('writtenPremium2', value, isManual)}
              />
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
                tagging="Incremental"
                expenses="Included"
                recoveries="Excluded"
                semanticColors={semanticColors}
                showBorder={true}
                value={metrics.paidLoss.value}
                isGenerated={metrics.paidLoss.isGenerated}
                onChange={(value, isManual) => updateMetric('paidLoss', value, isManual)}
              />

              {/* Reported Loss Row */}
              <MetricRow
                metricName="Reported Loss"
                tagging="Cumulative"
                expenses="Included"
                recoveries="Excluded"
                semanticColors={semanticColors}
                showBorder={true}
                value={metrics.reportedLoss.value}
                isGenerated={metrics.reportedLoss.isGenerated}
                onChange={(value, isManual) => updateMetric('reportedLoss', value, isManual)}
              />

              {/* IBNR Row */}
              <MetricRow
                metricName="IBNR"
                tagging="Incremental"
                expenses="Excluded"
                recoveries="Included"
                semanticColors={semanticColors}
                showBorder={false}
                value={metrics.ibnr.value}
                isGenerated={metrics.ibnr.isGenerated}
                onChange={(value, isManual) => updateMetric('ibnr', value, isManual)}
              />
            </div>

            {/* Loss reserves Container */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              border: `1px solid ${semanticColors.theme.primary400}`,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              width: 'fit-content'
            }}>
              <div style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 0 0 10px'
              }}>
                {/* Left: Metric Name + Formula */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '0 10px',
                  width: '400px',
                  flexShrink: 0
                }}>
                  <InfoTooltip
                    text="Loss reserves"
                    variant="small"
                  />
                  <p style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black800,
                    margin: 0
                  }}>
                    Loss reserves
                  </p>
                  <p style={{
                    ...typography.styles.bodyS,
                    color: semanticColors.blackAndWhite.black500,
                    margin: 0
                  }}>
                    (Reported Loss - Paid Loss)
                  </p>
                </div>

                {/* Value Column */}
                <div style={{
                  width: '200px',
                  height: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px 10px 20px',
                  borderLeft: `1px solid ${semanticColors.theme.primary400}`
                }}>
                  <span style={{ ...typography.styles.bodyS, color: semanticColors.blackAndWhite.black500 }}>$</span>
                  <p style={{
                    ...typography.styles.bodyM,
                    color: lossReserves === 0 ? semanticColors.blackAndWhite.black300 : semanticColors.blackAndWhite.black500,
                    margin: 0,
                    textAlign: 'left'
                  }}>
                    {lossReserves === 0 ? 'Value will be calculated' : formatValue(lossReserves)}
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
              flexDirection: 'column',
              width: 'fit-content'
            }}>
              <div style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 0 0 10px'
              }}>
                {/* Left: Metric Name + Formula */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '0 10px',
                  width: '400px',
                  flexShrink: 0
                }}>
                  <InfoTooltip
                    text="Incurred Loss"
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

                {/* Value Column */}
                <div style={{
                  width: '200px',
                  height: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px 10px 20px',
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
                tagging="Cumulative"
                expenses="Included"
                recoveries="Excluded"
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
            marginTop: '5px',
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
        <ThemeProvider initialTheme="workbench">
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
            {/* Korra Workbench Badge - positioned absolutely relative to modal container */}
            <KorraWorkbenchBadge />
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
        <ThemeProvider initialTheme="workbench">
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
