import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '@design-library/pages';
import { Button, InfoTooltip, FormDropdown, colors, typography, useSemanticColors, borderRadius, shadows, spacing } from '@design-library/components';
import { DownloadMedium, ChevronDownExtraSmall } from '@design-library/icons';
import { createPageNavigationHandler, type NavigationHandler } from '@design-library/utils/navigation';

interface ReportsCessionStatementProps {
  onNavigateToPage?: NavigationHandler;
  cessionData?: {
    generatedValues?: {
      earnedPremium: string;
      writtenPremium1: string;
      writtenPremium2: string;
      paidLoss: string;
      reportedLoss: string;
      ibnr: string;
      adjustment: string;
    };
  };
}

// Helper component for metric name cells (left column)
interface CessionMetricNameCellProps {
  metricName: string;
  semanticColors: any;
  showBorder: boolean;
}

const CessionMetricNameCell: React.FC<CessionMetricNameCellProps> = ({
  metricName,
  semanticColors,
  showBorder
}) => {
  return (
    <div style={{
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px 0 20px',
      borderBottom: showBorder ? `1px dashed ${semanticColors.theme.primary400}` : 'none'
    }}>
      <InfoTooltip
        text={metricName}
        variant="small"
      />
      <p style={{
        ...typography.styles.bodyM,
        color: semanticColors.blackAndWhite.black800,
        margin: 0,
        marginLeft: '10px',
        whiteSpace: 'nowrap',
        fontWeight: typography.fontWeight.medium
      }}>
        {metricName}
      </p>
    </div>
  );
};

// Helper component for month value rows (right column)
interface CessionMetricRowProps {
  semanticColors: any;
  showBorder: boolean;
  monthValues: { [key: string]: string };
  onChangeMonth: (month: string, value: string) => void;
  months: string[];
}

const CessionMetricRow: React.FC<CessionMetricRowProps> = ({
  semanticColors,
  showBorder,
  monthValues,
  onChangeMonth,
  months
}) => {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, month: string) => {
    // Only allow numbers, commas, and periods
    const newValue = e.target.value.replace(/[^0-9.,]/g, '');
    onChangeMonth(month, newValue);
  };

  const renderInputField = (month: string, isFirst: boolean) => (
    <div style={{
      minWidth: '200px',
      width: '200px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      height: '100%',
      position: 'relative'
    }}>
      {!isFirst && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: '10px',
          bottom: '10px',
          width: '1px',
          backgroundColor: semanticColors.theme.primary400
        }} />
      )}
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
          value={monthValues[month] || ''}
          onChange={(e) => handleValueChange(e, month)}
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
      borderBottom: showBorder ? `1px dashed ${semanticColors.theme.primary400}` : 'none'
    }}>
      {months.map((month, index) => (
        <React.Fragment key={month}>
          {renderInputField(month, index === 0)}
        </React.Fragment>
      ))}
    </div>
  );
};

export const ReportsCessionStatement: React.FC<ReportsCessionStatementProps> = ({
  onNavigateToPage,
  cessionData
}) => {
  const semanticColors = useSemanticColors();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
  const downloadDropdownRef = useRef<HTMLDivElement>(null);

  // Month columns - using 6 months to force horizontal scrolling
  const months = ['October', 'November', 'December', 'January', 'February', 'March'];

  // Initialize metrics with month-based values
  // March (last column) should have values from previous screen
  const [metrics, setMetrics] = useState<{
    earnedPremium: { [key: string]: string };
    writtenPremium1: { [key: string]: string };
    writtenPremium2: { [key: string]: string };
    paidLoss: { [key: string]: string };
    reportedLoss: { [key: string]: string };
    ibnr: { [key: string]: string };
    adjustment: { [key: string]: string };
  }>(() => {
    // Populate March (last column) with generated values from previous screen
    const generatedValues = cessionData?.generatedValues;
    const emptyMonths: { [key: string]: string } = {};
    months.forEach(month => {
      emptyMonths[month] = month === 'March' ? '' : '';
    });

    return {
      earnedPremium: { ...emptyMonths, 'March': generatedValues?.earnedPremium || '' },
      writtenPremium1: { ...emptyMonths, 'March': generatedValues?.writtenPremium1 || '' },
      writtenPremium2: { ...emptyMonths, 'March': generatedValues?.writtenPremium2 || '' },
      paidLoss: { ...emptyMonths, 'March': generatedValues?.paidLoss || '' },
      reportedLoss: { ...emptyMonths, 'March': generatedValues?.reportedLoss || '' },
      ibnr: { ...emptyMonths, 'March': generatedValues?.ibnr || '' },
      adjustment: { ...emptyMonths, 'March': generatedValues?.adjustment || '' },
    };
  });

  // Update individual metric for a specific month
  const updateMetric = (
    field: keyof typeof metrics,
    month: string,
    value: string
  ) => {
    setMetrics(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [month]: value
      }
    }));
  };

  // Check if all fields are filled (all metrics for all months)
  const allFieldsFilled = Object.values(metrics).every(
    metricMonths => months.every(month => metricMonths[month])
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

  // Add CSS for placeholder styling and custom horizontal scrollbar
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .metric-value-input::placeholder {
        color: ${semanticColors.blackAndWhite.black300};
        opacity: 1;
      }
      .custom-horizontal-scroll::-webkit-scrollbar {
        height: 6px;
      }
      .custom-horizontal-scroll::-webkit-scrollbar-track {
        background: ${semanticColors.theme.primary200};
      }
      .custom-horizontal-scroll::-webkit-scrollbar-thumb {
        background: ${semanticColors.blackAndWhite.black900};
        border-radius: 3px;
      }
      .custom-horizontal-scroll::-webkit-scrollbar-thumb:hover {
        background: ${semanticColors.blackAndWhite.black900};
      }
      .custom-horizontal-scroll::-webkit-scrollbar-button {
        display: none;
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
        { label: 'Cession Summary Generation', onClick: () => onNavigateToPage('reports-bdx-configuration'), isActive: false },
        { label: 'Cession statement', isActive: true }
      ]
    : [
        { label: 'Reports' },
        { label: 'BDX Upload' },
        { label: 'Cession Summary Generation' },
        { label: 'Cession statement' }
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
        gap: '40px'
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
              onClick={() => setIsDownloadDropdownOpen(!isDownloadDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                padding: '8px 12px 8px 20px',
                height: '44px',
                minWidth: '187px',
                backgroundColor: semanticColors.blackAndWhite.black900,
                border: 'none',
                borderRadius: borderRadius[4],
                cursor: 'pointer',
                ...typography.styles.bodyL,
                color: semanticColors.blackAndWhite.white,
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
            {isDownloadDropdownOpen && (
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

        {/* Stats Card */}
        <div style={{
          backgroundColor: semanticColors.blackAndWhite.white,
          border: `1px solid ${semanticColors.theme.primary400}`,
          borderRadius: borderRadius[12],
          padding: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          height: '105px'
        }}>
          {/* Reporting Period November 2025 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '180px',
            flexShrink: 0
          }}>
            <p style={{
              ...typography.styles.bodyS,
              color: semanticColors.blackAndWhite.black500,
              margin: 0
            }}>
              Reporting Period
            </p>
            <p style={{
              fontSize: '26px',
              fontWeight: typography.fontWeight.regular,
              lineHeight: '1.3',
              color: semanticColors.blackAndWhite.black900,
              margin: 0,
              whiteSpace: 'nowrap'
            }}>
              November 2025
            </p>
          </div>

          {/* Divider */}
          <div style={{
            width: '1px',
            height: '45px',
            backgroundColor: semanticColors.theme.primary400,
            flexShrink: 0
          }} />

          {/* Written Premium */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '180px',
            flexShrink: 0
          }}>
            <p style={{
              ...typography.styles.bodyS,
              color: semanticColors.blackAndWhite.black500,
              margin: 0
            }}>
              Written Premium
            </p>
            <p style={{
              fontSize: '26px',
              fontWeight: typography.fontWeight.regular,
              lineHeight: '1.3',
              color: semanticColors.blackAndWhite.black900,
              margin: 0,
              whiteSpace: 'nowrap'
            }}>
              $1,500,000
            </p>
          </div>

          {/* Divider */}
          <div style={{
            width: '1px',
            height: '45px',
            backgroundColor: semanticColors.theme.primary400,
            flexShrink: 0
          }} />

          {/* Incurred Loss */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '180px',
            flexShrink: 0
          }}>
            <p style={{
              ...typography.styles.bodyS,
              color: semanticColors.blackAndWhite.black500,
              margin: 0
            }}>
              Incurred Loss
            </p>
            <p style={{
              fontSize: '26px',
              fontWeight: typography.fontWeight.regular,
              lineHeight: '1.3',
              color: semanticColors.blackAndWhite.black900,
              margin: 0,
              whiteSpace: 'nowrap'
            }}>
              $1,325,000
            </p>
          </div>

          {/* Divider */}
          <div style={{
            width: '1px',
            height: '45px',
            backgroundColor: semanticColors.theme.primary400,
            flexShrink: 0
          }} />

          {/* Loss Ratio */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '180px',
            flexShrink: 0
          }}>
            <p style={{
              ...typography.styles.bodyS,
              color: semanticColors.blackAndWhite.black500,
              margin: 0
            }}>
              Loss Ratio
            </p>
            <p style={{
              fontSize: '26px',
              fontWeight: typography.fontWeight.regular,
              lineHeight: '1.3',
              color: semanticColors.blackAndWhite.black900,
              margin: 0,
              whiteSpace: 'nowrap'
            }}>
              88.33%
            </p>
          </div>
        </div>

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

          {/* Table Container */}
          <div style={{
            paddingTop: '10px',
            display: 'flex',
            gap: '5px'
          }}>
            {/* Left: Fixed Metrics Column */}
            <div style={{
              width: '400px',
              minWidth: '400px',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}>
              {/* Metric name header */}
              <div style={{
                padding: '0 10px 0 20px',
                paddingBottom: '20px'
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

              {/* Premium Metrics */}
              <div style={{
                backgroundColor: semanticColors.blackAndWhite.white,
                border: `1px solid ${semanticColors.theme.primary400}`,
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CessionMetricNameCell metricName="Earned Premium" semanticColors={semanticColors} showBorder={true} />
                <CessionMetricNameCell metricName="Written Premium" semanticColors={semanticColors} showBorder={true} />
                <CessionMetricNameCell metricName="Written Premium" semanticColors={semanticColors} showBorder={false} />
              </div>

              {/* Loss Metrics */}
              <div style={{
                backgroundColor: semanticColors.blackAndWhite.white,
                border: `1px solid ${semanticColors.theme.primary400}`,
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CessionMetricNameCell metricName="Paid Loss" semanticColors={semanticColors} showBorder={true} />
                <CessionMetricNameCell metricName="Reported Loss" semanticColors={semanticColors} showBorder={true} />
                <CessionMetricNameCell metricName="IBNR" semanticColors={semanticColors} showBorder={false} />
              </div>

              {/* Calculated Metrics (Loss reserves + Incurred Loss) */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                border: `1px solid ${semanticColors.theme.primary400}`,
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Loss reserves */}
                <div style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px 0 20px',
                  borderBottom: `1px dashed ${semanticColors.theme.primary400}`
                }}>
                  <InfoTooltip
                    text="Loss reserves"
                    variant="small"
                  />
                  <p style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black800,
                    margin: 0,
                    marginLeft: '10px',
                    whiteSpace: 'nowrap',
                    fontWeight: typography.fontWeight.medium
                  }}>
                    Loss reserves
                  </p>
                  <p style={{
                    ...typography.styles.bodyS,
                    color: semanticColors.blackAndWhite.black500,
                    margin: 0,
                    marginLeft: '8px',
                    whiteSpace: 'nowrap'
                  }}>
                    (Reported Loss - Paid Loss)
                  </p>
                </div>

                {/* Incurred Loss */}
                <div style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px 0 20px'
                }}>
                  <InfoTooltip
                    text="Incurred Loss"
                    variant="small"
                  />
                  <p style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black800,
                    margin: 0,
                    marginLeft: '10px',
                    whiteSpace: 'nowrap',
                    fontWeight: typography.fontWeight.medium
                  }}>
                    Incurred Loss
                  </p>
                  <p style={{
                    ...typography.styles.bodyS,
                    color: semanticColors.blackAndWhite.black500,
                    margin: 0,
                    marginLeft: '8px',
                    whiteSpace: 'nowrap'
                  }}>
                    (Reported Loss + IBNR)
                  </p>
                </div>
              </div>

              {/* Adjustment Metric */}
              <div style={{
                backgroundColor: semanticColors.blackAndWhite.white,
                border: `1px solid ${semanticColors.theme.primary400}`,
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CessionMetricNameCell metricName="Adjustment" semanticColors={semanticColors} showBorder={false} />
              </div>
            </div>

            {/* Right: Scrollable Months Column */}
            <div
              className="custom-horizontal-scroll"
              style={{
                flex: 1,
                overflowX: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                paddingBottom: '10px'
              }}
            >
              {/* Month headers */}
              <div style={{
                display: 'flex',
                paddingBottom: '20px',
                minWidth: `${months.length * 200}px`
              }}>
                {months.map((month) => (
                  <div key={month} style={{
                    minWidth: '200px',
                    width: '200px',
                    padding: '0 20px'
                  }}>
                    <p style={{
                      ...typography.styles.bodyL,
                      color: semanticColors.blackAndWhite.black900,
                      margin: 0,
                      fontWeight: typography.fontWeight.medium
                    }}>
                      {month}
                    </p>
                  </div>
                ))}
              </div>

            {/* Premium Container */}
            <div style={{
              backgroundColor: semanticColors.blackAndWhite.white,
              border: `1px solid ${semanticColors.theme.primary400}`,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              minWidth: `${months.length * 200}px`
            }}>
              <CessionMetricRow
                semanticColors={semanticColors}
                showBorder={true}
                monthValues={metrics.earnedPremium}
                onChangeMonth={(month, value) => updateMetric('earnedPremium', month, value)}
                months={months}
              />
              <CessionMetricRow
                semanticColors={semanticColors}
                showBorder={true}
                monthValues={metrics.writtenPremium1}
                onChangeMonth={(month, value) => updateMetric('writtenPremium1', month, value)}
                months={months}
              />
              <CessionMetricRow
                semanticColors={semanticColors}
                showBorder={false}
                monthValues={metrics.writtenPremium2}
                onChangeMonth={(month, value) => updateMetric('writtenPremium2', month, value)}
                months={months}
              />
            </div>

            {/* Losses Container */}
            <div style={{
              backgroundColor: semanticColors.blackAndWhite.white,
              border: `1px solid ${semanticColors.theme.primary400}`,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              minWidth: `${months.length * 200}px`
            }}>
              <CessionMetricRow
                semanticColors={semanticColors}
                showBorder={true}
                monthValues={metrics.paidLoss}
                onChangeMonth={(month, value) => updateMetric('paidLoss', month, value)}
                months={months}
              />
              <CessionMetricRow
                semanticColors={semanticColors}
                showBorder={true}
                monthValues={metrics.reportedLoss}
                onChangeMonth={(month, value) => updateMetric('reportedLoss', month, value)}
                months={months}
              />
              <CessionMetricRow
                semanticColors={semanticColors}
                showBorder={false}
                monthValues={metrics.ibnr}
                onChangeMonth={(month, value) => updateMetric('ibnr', month, value)}
                months={months}
              />
            </div>

            {/* Calculated Metrics Container (Loss reserves + Incurred Loss) */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              border: `1px solid ${semanticColors.theme.primary400}`,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              minWidth: `${months.length * 200}px`
            }}>
              {/* Loss reserves row */}
              <div style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                borderBottom: `1px dashed ${semanticColors.theme.primary400}`
              }}>
                {months.map((month, index) => {
                  const reportedLoss = parseFloat(metrics.reportedLoss[month]?.replace(/,/g, '') || '0');
                  const paidLoss = parseFloat(metrics.paidLoss[month]?.replace(/,/g, '') || '0');
                  const lossReserves = reportedLoss - paidLoss;
                  const hasValue = reportedLoss > 0 || paidLoss > 0;

                  return (
                    <div key={month} style={{
                      width: '200px',
                      minWidth: '200px',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '0 20px',
                      position: 'relative'
                    }}>
                      {index !== 0 && (
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: '10px',
                          bottom: '10px',
                          width: '1px',
                          backgroundColor: semanticColors.theme.primary400
                        }} />
                      )}
                      <span style={{ ...typography.styles.bodyS, color: semanticColors.blackAndWhite.black500 }}>$</span>
                      <p style={{
                        ...typography.styles.bodyM,
                        color: hasValue ? semanticColors.blackAndWhite.black500 : semanticColors.blackAndWhite.black300,
                        margin: 0,
                        textAlign: 'left'
                      }}>
                        {hasValue ? lossReserves.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Value will be calculated'}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Incurred Loss row */}
              <div style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center'
              }}>
                {months.map((month, index) => {
                  const reportedLoss = parseFloat(metrics.reportedLoss[month]?.replace(/,/g, '') || '0');
                  const ibnr = parseFloat(metrics.ibnr[month]?.replace(/,/g, '') || '0');
                  const incurredLoss = reportedLoss + ibnr;
                  const hasValue = reportedLoss > 0 || ibnr > 0;

                  return (
                    <div key={month} style={{
                      width: '200px',
                      minWidth: '200px',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '0 20px',
                      position: 'relative'
                    }}>
                      {index !== 0 && (
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: '10px',
                          bottom: '10px',
                          width: '1px',
                          backgroundColor: semanticColors.theme.primary400
                        }} />
                      )}
                      <span style={{ ...typography.styles.bodyS, color: semanticColors.blackAndWhite.black500 }}>$</span>
                      <p style={{
                        ...typography.styles.bodyM,
                        color: hasValue ? semanticColors.blackAndWhite.black500 : semanticColors.blackAndWhite.black300,
                        margin: 0,
                        textAlign: 'left'
                      }}>
                        {hasValue ? incurredLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Value will be calculated'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Adjustment Container */}
            <div style={{
              backgroundColor: semanticColors.blackAndWhite.white,
              border: `1px solid ${semanticColors.theme.primary400}`,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              minWidth: `${months.length * 200}px`
            }}>
              <CessionMetricRow
                semanticColors={semanticColors}
                showBorder={false}
                monthValues={metrics.adjustment}
                onChangeMonth={(month, value) => updateMetric('adjustment', month, value)}
                months={months}
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsCessionStatement;
