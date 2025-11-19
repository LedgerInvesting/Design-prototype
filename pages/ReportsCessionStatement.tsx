import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '@design-library/pages';
import { Button, InfoTooltip, FormDropdown, colors, typography, useSemanticColors, borderRadius, shadows, spacing } from '@design-library/components';
import { DownloadMedium, ChevronDownExtraSmall } from '@design-library/icons';
import { createPageNavigationHandler, type NavigationHandler } from '@design-library/utils/navigation';

interface ReportsCessionStatementProps {
  onNavigateToPage?: NavigationHandler;
}

// Helper component for metric rows with input fields
interface CessionMetricRowProps {
  metricName: string;
  semanticColors: any;
  showBorder: boolean;
  valueColumn1?: string;
  valueColumn2?: string;
  valueColumn3?: string;
  onChangeColumn1?: (value: string) => void;
  onChangeColumn2?: (value: string) => void;
  onChangeColumn3?: (value: string) => void;
}

const CessionMetricRow: React.FC<CessionMetricRowProps> = ({
  metricName,
  semanticColors,
  showBorder,
  valueColumn1 = '',
  valueColumn2 = '',
  valueColumn3 = '',
  onChangeColumn1,
  onChangeColumn2,
  onChangeColumn3
}) => {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, column: 1 | 2 | 3) => {
    // Only allow numbers, commas, and periods
    const newValue = e.target.value.replace(/[^0-9.,]/g, '');
    if (column === 1 && onChangeColumn1) onChangeColumn1(newValue);
    if (column === 2 && onChangeColumn2) onChangeColumn2(newValue);
    if (column === 3 && onChangeColumn3) onChangeColumn3(newValue);
  };

  const renderInputField = (value: string, column: 1 | 2 | 3) => (
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      borderLeft: `1px solid ${semanticColors.theme.primary400}`
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        width: '100%'
      }}>
        <span style={{
          ...typography.styles.bodyS,
          color: semanticColors.blackAndWhite.black900
        }}>$</span>
        <input
          type="text"
          value={value}
          onChange={(e) => handleValueChange(e, column)}
          placeholder="Type value"
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            ...typography.styles.bodyM,
            color: semanticColors.blackAndWhite.black900,
            width: '100%',
            textAlign: 'left'
          }}
          className="metric-value-input"
        />
      </div>
    </div>
  );

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

      {/* Right: Three Input Fields */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        flex: 1
      }}>
        {renderInputField(valueColumn1, 1)}
        {renderInputField(valueColumn2, 2)}
        {renderInputField(valueColumn3, 3)}
      </div>
    </div>
  );
};

export const ReportsCessionStatement: React.FC<ReportsCessionStatementProps> = ({
  onNavigateToPage
}) => {
  const semanticColors = useSemanticColors();

  // Period selection state
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Month');

  // Download dropdown state
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
  const downloadDropdownRef = useRef<HTMLDivElement>(null);

  // Metric values state
  const [metrics, setMetrics] = useState<{
    earnedPremium: { col1: string; col2: string; col3: string };
    writtenPremium1: { col1: string; col2: string; col3: string };
    writtenPremium2: { col1: string; col2: string; col3: string };
    paidLoss: { col1: string; col2: string; col3: string };
    reportedLoss: { col1: string; col2: string; col3: string };
    ibnr: { col1: string; col2: string; col3: string };
    adjustment: { col1: string; col2: string; col3: string };
  }>({
    earnedPremium: { col1: '', col2: '', col3: '' },
    writtenPremium1: { col1: '', col2: '', col3: '' },
    writtenPremium2: { col1: '', col2: '', col3: '' },
    paidLoss: { col1: '', col2: '', col3: '' },
    reportedLoss: { col1: '', col2: '', col3: '' },
    ibnr: { col1: '', col2: '', col3: '' },
    adjustment: { col1: '', col2: '', col3: '' },
  });

  // Update individual metric column
  const updateMetric = (
    field: keyof typeof metrics,
    column: 'col1' | 'col2' | 'col3',
    value: string
  ) => {
    setMetrics(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [column]: value
      }
    }));
  };

  // Check if all fields are filled
  const allFieldsFilled = Object.values(metrics).every(
    metric => metric.col1 && metric.col2 && metric.col3
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadDropdownRef.current && !downloadDropdownRef.current.contains(event.target as Node)) {
        setIsDownloadDropdownOpen(false);
      }
    };

    if (isDownloadDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDownloadDropdownOpen]);

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

  // Create navigation handler
  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'reports-cession-statement')
    : undefined;

  // Create breadcrumbs
  const breadcrumbs = onNavigateToPage
    ? [
        { label: 'Reports', isActive: false },
        { label: 'BDX Upload', onClick: () => onNavigateToPage('reports-bdx-upload'), isActive: false },
        { label: 'Cession Statement', isActive: true }
      ]
    : [
        { label: 'Reports' },
        { label: 'BDX Upload' },
        { label: 'Cession Statement' }
      ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      pageType="reports-cession-statement"
      selectedSidebarItem="reports"
      selectedSidebarSubitem="bdx-upload"
      onNavigate={navigationHandler}
      isSubPage={true}
      onBackClick={() => {
        if (onNavigateToPage) {
          onNavigateToPage('reports-bdx-configuration');
        }
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {/* Header Section - Title and Button */}
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

          {/* Download Dropdown */}
          <div ref={downloadDropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => !allFieldsFilled ? null : setIsDownloadDropdownOpen(!isDownloadDropdownOpen)}
              disabled={!allFieldsFilled}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                padding: '8px 12px 8px 20px',
                height: '44px',
                minWidth: '187px',
                backgroundColor: !allFieldsFilled ? semanticColors.blackAndWhite.black300 : semanticColors.blackAndWhite.black900,
                border: 'none',
                borderRadius: borderRadius[4],
                cursor: !allFieldsFilled ? 'not-allowed' : 'pointer',
                ...typography.styles.bodyL,
                color: semanticColors.blackAndWhite.white,
                opacity: !allFieldsFilled ? 0.6 : 1,
              }}
            >
              <span>Download</span>
              <div style={{
                transform: isDownloadDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                display: 'flex',
                alignItems: 'center',
              }}>
                <ChevronDownExtraSmall color={semanticColors.theme.primary700} />
              </div>
            </button>
            {isDownloadDropdownOpen && allFieldsFilled && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                minWidth: '200px',
                width: 'fit-content',
                backgroundColor: colors.blackAndWhite.white,
                border: 'none',
                borderRadius: borderRadius[8],
                marginTop: spacing[1],
                zIndex: 1000,
                boxShadow: shadows.medium,
                padding: '10px',
              }}>
                <div
                  onClick={() => {
                    window.open('/PDF.pdf', '_blank');
                    setIsDownloadDropdownOpen(false);
                  }}
                  style={{
                    padding: '12px 10px',
                    cursor: 'pointer',
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    borderRadius: borderRadius[4],
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = semanticColors.theme.primary200}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Download as PDF
                </div>
                <div
                  onClick={() => {
                    window.open('https://docs.google.com/spreadsheets/d/1bviXCfE9z115ZbpHiBUdH9BPlVXj5648i_v9cYorydE/edit?gid=879068275#gid=879068275', '_blank');
                    setIsDownloadDropdownOpen(false);
                  }}
                  style={{
                    padding: '12px 10px',
                    cursor: 'pointer',
                    ...typography.styles.bodyM,
                    color: colors.blackAndWhite.black900,
                    borderRadius: borderRadius[4],
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = semanticColors.theme.primary200}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Download as Excel
                </div>
              </div>
            )}
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
          {/* Header with Period Dropdown */}
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
              Enter trust account values for comprehensive reconciliation and auditability across periods.
            </p>
            <div style={{ width: '300px' }}>
              <FormDropdown
                label="Period selector"
                labelPosition="left"
                options={[
                  { value: 'month', label: 'Month' },
                  { value: 'quarter', label: 'Quarter' }
                ]}
                value={selectedPeriod}
                onChange={(value) => setSelectedPeriod(value)}
                placeholder="Select period"
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            backgroundColor: semanticColors.theme.primary400,
            width: '100%'
          }} />

          {/* Form Content */}
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

              {/* Right: Column headers */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1
              }}>
                {/* Column 1 header */}
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
                    Column 1
                  </p>
                </div>

                {/* Column 2 header */}
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
                    Column 2
                  </p>
                </div>

                {/* Column 3 header */}
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
                    Column 3
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
              <CessionMetricRow
                metricName="Earned Premium"
                semanticColors={semanticColors}
                showBorder={true}
                valueColumn1={metrics.earnedPremium.col1}
                valueColumn2={metrics.earnedPremium.col2}
                valueColumn3={metrics.earnedPremium.col3}
                onChangeColumn1={(value) => updateMetric('earnedPremium', 'col1', value)}
                onChangeColumn2={(value) => updateMetric('earnedPremium', 'col2', value)}
                onChangeColumn3={(value) => updateMetric('earnedPremium', 'col3', value)}
              />

              {/* Written Premium Row */}
              <CessionMetricRow
                metricName="Written Premium"
                semanticColors={semanticColors}
                showBorder={true}
                valueColumn1={metrics.writtenPremium1.col1}
                valueColumn2={metrics.writtenPremium1.col2}
                valueColumn3={metrics.writtenPremium1.col3}
                onChangeColumn1={(value) => updateMetric('writtenPremium1', 'col1', value)}
                onChangeColumn2={(value) => updateMetric('writtenPremium1', 'col2', value)}
                onChangeColumn3={(value) => updateMetric('writtenPremium1', 'col3', value)}
              />

              {/* Written Premium Row (duplicate) */}
              <CessionMetricRow
                metricName="Written Premium"
                semanticColors={semanticColors}
                showBorder={false}
                valueColumn1={metrics.writtenPremium2.col1}
                valueColumn2={metrics.writtenPremium2.col2}
                valueColumn3={metrics.writtenPremium2.col3}
                onChangeColumn1={(value) => updateMetric('writtenPremium2', 'col1', value)}
                onChangeColumn2={(value) => updateMetric('writtenPremium2', 'col2', value)}
                onChangeColumn3={(value) => updateMetric('writtenPremium2', 'col3', value)}
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
              <CessionMetricRow
                metricName="Paid Loss"
                semanticColors={semanticColors}
                showBorder={true}
                valueColumn1={metrics.paidLoss.col1}
                valueColumn2={metrics.paidLoss.col2}
                valueColumn3={metrics.paidLoss.col3}
                onChangeColumn1={(value) => updateMetric('paidLoss', 'col1', value)}
                onChangeColumn2={(value) => updateMetric('paidLoss', 'col2', value)}
                onChangeColumn3={(value) => updateMetric('paidLoss', 'col3', value)}
              />

              {/* Reported Loss Row */}
              <CessionMetricRow
                metricName="Reported Loss"
                semanticColors={semanticColors}
                showBorder={true}
                valueColumn1={metrics.reportedLoss.col1}
                valueColumn2={metrics.reportedLoss.col2}
                valueColumn3={metrics.reportedLoss.col3}
                onChangeColumn1={(value) => updateMetric('reportedLoss', 'col1', value)}
                onChangeColumn2={(value) => updateMetric('reportedLoss', 'col2', value)}
                onChangeColumn3={(value) => updateMetric('reportedLoss', 'col3', value)}
              />

              {/* IBNR Row */}
              <CessionMetricRow
                metricName="IBNR"
                semanticColors={semanticColors}
                showBorder={false}
                valueColumn1={metrics.ibnr.col1}
                valueColumn2={metrics.ibnr.col2}
                valueColumn3={metrics.ibnr.col3}
                onChangeColumn1={(value) => updateMetric('ibnr', 'col1', value)}
                onChangeColumn2={(value) => updateMetric('ibnr', 'col2', value)}
                onChangeColumn3={(value) => updateMetric('ibnr', 'col3', value)}
              />
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
              <CessionMetricRow
                metricName="Adjustement"
                semanticColors={semanticColors}
                showBorder={false}
                valueColumn1={metrics.adjustment.col1}
                valueColumn2={metrics.adjustment.col2}
                valueColumn3={metrics.adjustment.col3}
                onChangeColumn1={(value) => updateMetric('adjustment', 'col1', value)}
                onChangeColumn2={(value) => updateMetric('adjustment', 'col2', value)}
                onChangeColumn3={(value) => updateMetric('adjustment', 'col3', value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsCessionStatement;
