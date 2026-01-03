import React, { useState, useRef, useEffect } from 'react';
import { Layout, type StepConfig } from '@design-library/pages';
import { Button, InfoTooltip, FormDropdown, colors, typography, useSemanticColors, borderRadius, shadows, spacing } from '@design-library/components';
import { DownloadMedium, ChevronDownExtraSmall } from '@design-library/icons';
import { createPageNavigationHandler, type NavigationHandler } from '@design-library/utils/navigation';

interface ReportsCashSettlementProps {
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
  flowType?: 'detail' | 'aggregated'; // Track which BDX flow (detail or aggregated)
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
    // Only allow editing March (last month)
    if (month !== 'March') return;

    // Only allow numbers, commas, and periods
    const newValue = e.target.value.replace(/[^0-9.,]/g, '');
    onChangeMonth(month, newValue);
  };

  const renderInputField = (month: string, isFirst: boolean) => {
    const isEditable = month === 'March';
    const textColor = isEditable ? semanticColors.blackAndWhite.black900 : semanticColors.blackAndWhite.black500;

    return (
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
            color: textColor
          }}>$</span>
          <input
            type="text"
            value={monthValues[month] || ''}
            onChange={(e) => handleValueChange(e, month)}
            placeholder="Type value"
            readOnly={!isEditable}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              ...typography.styles.bodyM,
              color: textColor,
              width: '100%',
              textAlign: 'left',
              cursor: isEditable ? 'text' : 'default'
            }}
            className="metric-value-input"
          />
        </div>
      </div>
    );
  };

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

export const ReportsCashSettlement: React.FC<ReportsCashSettlementProps> = ({
  onNavigateToPage,
  cessionData,
  flowType = 'detail'
}) => {
  const semanticColors = useSemanticColors();
  const isAggregatedFlow = flowType === 'aggregated';
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
  const downloadDropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Month columns - using 6 months to force horizontal scrolling
  const months = ['October', 'November', 'December', 'January', 'February', 'March'];

  // Initialize metrics with month-based values
  // March (last column) should have values from previous screen, others have fake data
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

    // Generate fake data for previous months based on March values
    // Each month has slight variations to make it realistic
    const generateMonthData = (baseValue: string | undefined, monthIndex: number) => {
      if (!baseValue) return '';
      const numValue = parseFloat(baseValue.replace(/,/g, ''));
      if (isNaN(numValue)) return baseValue;

      // Vary the value by month (earlier months have slightly different values)
      const variance = [0.85, 0.88, 0.92, 0.95, 0.97, 1.0]; // October to March
      const adjustedValue = numValue * variance[monthIndex];
      return adjustedValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const monthlyData: { [key: string]: string } = {};
    months.forEach((month, index) => {
      monthlyData[month] = month === 'March' ? '' : '';
    });

    return {
      earnedPremium: {
        'October': generateMonthData(generatedValues?.earnedPremium, 0),
        'November': generateMonthData(generatedValues?.earnedPremium, 1),
        'December': generateMonthData(generatedValues?.earnedPremium, 2),
        'January': generateMonthData(generatedValues?.earnedPremium, 3),
        'February': generateMonthData(generatedValues?.earnedPremium, 4),
        'March': generatedValues?.earnedPremium || ''
      },
      writtenPremium1: {
        'October': generateMonthData(generatedValues?.writtenPremium1, 0),
        'November': generateMonthData(generatedValues?.writtenPremium1, 1),
        'December': generateMonthData(generatedValues?.writtenPremium1, 2),
        'January': generateMonthData(generatedValues?.writtenPremium1, 3),
        'February': generateMonthData(generatedValues?.writtenPremium1, 4),
        'March': generatedValues?.writtenPremium1 || ''
      },
      writtenPremium2: {
        'October': generateMonthData(generatedValues?.writtenPremium2, 0),
        'November': generateMonthData(generatedValues?.writtenPremium2, 1),
        'December': generateMonthData(generatedValues?.writtenPremium2, 2),
        'January': generateMonthData(generatedValues?.writtenPremium2, 3),
        'February': generateMonthData(generatedValues?.writtenPremium2, 4),
        'March': generatedValues?.writtenPremium2 || ''
      },
      paidLoss: {
        'October': generateMonthData(generatedValues?.paidLoss, 0),
        'November': generateMonthData(generatedValues?.paidLoss, 1),
        'December': generateMonthData(generatedValues?.paidLoss, 2),
        'January': generateMonthData(generatedValues?.paidLoss, 3),
        'February': generateMonthData(generatedValues?.paidLoss, 4),
        'March': generatedValues?.paidLoss || ''
      },
      reportedLoss: {
        'October': generateMonthData(generatedValues?.reportedLoss, 0),
        'November': generateMonthData(generatedValues?.reportedLoss, 1),
        'December': generateMonthData(generatedValues?.reportedLoss, 2),
        'January': generateMonthData(generatedValues?.reportedLoss, 3),
        'February': generateMonthData(generatedValues?.reportedLoss, 4),
        'March': generatedValues?.reportedLoss || ''
      },
      ibnr: {
        'October': generateMonthData(generatedValues?.ibnr, 0),
        'November': generateMonthData(generatedValues?.ibnr, 1),
        'December': generateMonthData(generatedValues?.ibnr, 2),
        'January': generateMonthData(generatedValues?.ibnr, 3),
        'February': generateMonthData(generatedValues?.ibnr, 4),
        'March': generatedValues?.ibnr || ''
      },
      adjustment: {
        'October': generateMonthData(generatedValues?.adjustment, 0),
        'November': generateMonthData(generatedValues?.adjustment, 1),
        'December': generateMonthData(generatedValues?.adjustment, 2),
        'January': generateMonthData(generatedValues?.adjustment, 3),
        'February': generateMonthData(generatedValues?.adjustment, 4),
        'March': generatedValues?.adjustment || ''
      },
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

  // Scroll to the last month (March) when page loads
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Scroll to the far right to show the last month
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, []);

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

  // Stepper configuration - different based on flow type
  // This is the FINAL step for aggregated, but detail flow has one more step (Summary)
  const stepper: StepConfig[] = isAggregatedFlow
    ? [
        // Aggregated flow: 3 steps (this is the final step - completed)
        {
          label: 'Add data',
          status: 'completed',
          onClick: () => onNavigateToPage?.('transaction-bdx-aggregated-mapping')
        },
        {
          label: 'Cession statement',
          status: 'completed',
          onClick: () => onNavigateToPage?.('reports-cession-statement')
        },
        {
          label: 'Cash settlement',
          status: 'completed' // Final step in aggregated flow - mark as completed
        }
      ]
    : [
        // Detail flow: 4 steps
        {
          label: 'Upload file',
          status: 'completed',
          onClick: () => onNavigateToPage?.('reports-bdx-detail-mapping')
        },
        {
          label: 'Cession statement',
          status: 'completed',
          onClick: () => onNavigateToPage?.('reports-cession-statement')
        },
        {
          label: 'Cash settlement',
          status: 'completed'
        },
        {
          label: 'Summary',
          status: 'active'
        }
      ];

  // Form tags for the topnav
  const configurationType = isAggregatedFlow ? 'aggregated' : 'detail';
  const formTags = [
    <div key="config-tag" style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '3px',
      padding: '0 5px',
      backgroundColor: configurationType === 'detail'
        ? colors.analytics.green600
        : colors.reports.dynamic.blue200,
      borderRadius: '4px',
      height: '20px',
      fontFamily: typography.styles.bodyS.fontFamily.join(', '),
      fontSize: typography.styles.bodyS.fontSize,
      fontWeight: typography.styles.bodyS.fontWeight,
      lineHeight: typography.styles.bodyS.lineHeight,
      letterSpacing: typography.letterSpacing.wide,
      color: colors.blackAndWhite.black700,
      whiteSpace: 'nowrap' as const,
    }}>
      {configurationType.charAt(0).toUpperCase() + configurationType.slice(1)}
    </div>
  ];

  // Create breadcrumbs
  const breadcrumbs = onNavigateToPage
    ? [
        { label: 'Reports', isActive: false },
        { label: 'BDX Upload', onClick: () => onNavigateToPage('reports-bdx-upload'), isActive: false },
        { label: 'Cession Summary Generation', onClick: () => onNavigateToPage('reports-cession-summary-generation'), isActive: false },
        { label: 'Cession Statement', onClick: () => onNavigateToPage('reports-cession-statement'), isActive: false },
        { label: 'CASH SETTLEMENT', isActive: true }
      ]
    : [
        { label: 'Reports' },
        { label: 'BDX Upload' },
        { label: 'Cession Summary Generation' },
        { label: 'Cession Statement' },
        { label: 'CASH SETTLEMENT' }
      ];

  // Handle back click - return to transaction dashboard
  const handleBackClick = () => {
    if (onNavigateToPage) {
      // Set the active tab to bdx-upload in sessionStorage
      if (typeof window !== 'undefined') {
        const storedTransaction = sessionStorage.getItem('currentTransaction');
        if (storedTransaction) {
          try {
            const transaction = JSON.parse(storedTransaction);
            const savedTabs = sessionStorage.getItem('transactionTabs');
            let tabsMap: { [key: string]: string } = {};

            if (savedTabs) {
              try {
                tabsMap = JSON.parse(savedTabs);
              } catch (e) {
                console.error('Error parsing transaction tabs:', e);
              }
            }

            tabsMap[transaction.id] = 'bdx-upload';
            sessionStorage.setItem('transactionTabs', JSON.stringify(tabsMap));
          } catch (e) {
            console.error('Error setting active tab:', e);
          }
        }
      }

      // Navigate back to transaction dashboard
      onNavigateToPage('transaction-dashboard');
    }
  };

  return (
    <Layout
      formMode={true}
      formTitle="BDX UPLOAD"
      formTags={formTags}
      showSidebarToggle={false}
      backButtonText="Close"
      breadcrumbs={breadcrumbs}
      pageType="reports-cash-settlement"
      selectedSidebarItem="reports"
      selectedSidebarSubitem="bdx-upload"
      onNavigate={navigationHandler}
      isSubPage={true}
      onBackClick={handleBackClick}
      stepper={stepper}
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
              You're now reviewing cession statement from
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
                gap: '12px',
                padding: '8px 22px 8px 20px',
                height: '44px',
                width: 'fit-content',
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
                width: '1px',
                height: '24px',
                backgroundColor: semanticColors.blackAndWhite.black800,
                flexShrink: 0
              }} />
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
            gap: '0'
          }}>
            {/* Left: Fixed Metrics Column */}
            <div style={{
              width: '400px',
              minWidth: '400px',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              paddingTop: '4px'
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
                borderRight: 'none',
                borderRadius: '4px 0 0 4px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px 0 20px',
                  borderBottom: `1px dashed ${semanticColors.theme.primary400}`,
                  position: 'relative'
                }}>
                  <InfoTooltip
                    text="Premium earned during the reporting period"
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
                    Earned Premium
                  </p>
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '10px',
                    bottom: '10px',
                    width: '1px',
                    backgroundColor: semanticColors.theme.primary400
                  }} />
                </div>
                <div style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px 0 20px',
                  borderBottom: `1px dashed ${semanticColors.theme.primary400}`,
                  position: 'relative'
                }}>
                  <InfoTooltip
                    text="Total premium written during the reporting period"
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
                    Written Premium
                  </p>
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '10px',
                    bottom: '10px',
                    width: '1px',
                    backgroundColor: semanticColors.theme.primary400
                  }} />
                </div>
                <div style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px 0 20px',
                  position: 'relative'
                }}>
                  <InfoTooltip
                    text="Total premium written during the reporting period"
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
                    Written Premium
                  </p>
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '10px',
                    bottom: '10px',
                    width: '1px',
                    backgroundColor: semanticColors.theme.primary400
                  }} />
                </div>
              </div>

              {/* Loss Metrics */}
              <div style={{
                backgroundColor: semanticColors.blackAndWhite.white,
                border: `1px solid ${semanticColors.theme.primary400}`,
                borderRight: 'none',
                borderRadius: '4px 0 0 4px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px 0 20px',
                  borderBottom: `1px dashed ${semanticColors.theme.primary400}`,
                  position: 'relative'
                }}>
                  <InfoTooltip
                    text="Losses actually paid out during the reporting period"
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
                    Paid Loss
                  </p>
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '10px',
                    bottom: '10px',
                    width: '1px',
                    backgroundColor: semanticColors.theme.primary400
                  }} />
                </div>
                <div style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px 0 20px',
                  borderBottom: `1px dashed ${semanticColors.theme.primary400}`,
                  position: 'relative'
                }}>
                  <InfoTooltip
                    text="Losses reported but not yet paid during the period"
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
                    Reported Loss
                  </p>
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '10px',
                    bottom: '10px',
                    width: '1px',
                    backgroundColor: semanticColors.theme.primary400
                  }} />
                </div>
                <div style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px 0 20px',
                  position: 'relative'
                }}>
                  <InfoTooltip
                    text="Incurred But Not Reported loss reserves"
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
                    IBNR
                  </p>
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '10px',
                    bottom: '10px',
                    width: '1px',
                    backgroundColor: semanticColors.theme.primary400
                  }} />
                </div>
              </div>

              {/* Calculated Metrics (Loss reserves + Incurred Loss) */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                border: `1px solid ${semanticColors.theme.primary400}`,
                borderRight: 'none',
                borderRadius: '4px 0 0 4px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Loss reserves */}
                <div style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px 0 20px',
                  borderBottom: `1px dashed ${semanticColors.theme.primary400}`,
                  position: 'relative'
                }}>
                  <InfoTooltip
                    text="Reserved amount for known and reported losses"
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
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '10px',
                    bottom: '10px',
                    width: '1px',
                    backgroundColor: semanticColors.theme.primary400
                  }} />
                </div>

                {/* Incurred Loss */}
                <div style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px 0 20px',
                  position: 'relative'
                }}>
                  <InfoTooltip
                    text="Total incurred losses (Paid Loss + Loss Reserves + IBNR)"
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
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '10px',
                    bottom: '10px',
                    width: '1px',
                    backgroundColor: semanticColors.theme.primary400
                  }} />
                </div>
              </div>

              {/* Adjustment Metric */}
              <div style={{
                backgroundColor: semanticColors.blackAndWhite.white,
                border: `1px solid ${semanticColors.theme.primary400}`,
                borderRight: 'none',
                borderRadius: '4px 0 0 4px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px 0 20px',
                  position: 'relative'
                }}>
                  <InfoTooltip
                    text="Any adjustments or corrections to reported values"
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
                    Adjustment
                  </p>
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '10px',
                    bottom: '10px',
                    width: '1px',
                    backgroundColor: semanticColors.theme.primary400
                  }} />
                </div>
              </div>
            </div>

            {/* Right: Scrollable Months Column */}
            <div
              ref={scrollContainerRef}
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
                {months.map((month, index) => (
                  <div key={month} style={{
                    minWidth: '200px',
                    width: '200px',
                    padding: '0 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <p style={{
                      ...typography.styles.bodyL,
                      color: semanticColors.blackAndWhite.black900,
                      margin: 0,
                      fontWeight: typography.fontWeight.medium
                    }}>
                      {month}
                    </p>
                    <span style={{
                      ...typography.styles.bodyS,
                      color: index === months.length - 1 ? colors.analytics.green900 : semanticColors.blackAndWhite.black700,
                      padding: '4px 6px',
                      border: `1px solid ${index === months.length - 1 ? colors.analytics.green700 : semanticColors.theme.primary400}`,
                      borderRadius: borderRadius[4],
                      whiteSpace: 'nowrap',
                      backgroundColor: index === months.length - 1 ? colors.analytics.green500 : 'transparent'
                    }}>
                      {index === months.length - 1 ? 'Current' : 'Historical Data'}
                    </span>
                  </div>
                ))}
              </div>

            {/* Premium Container */}
            <div style={{
              backgroundColor: semanticColors.blackAndWhite.white,
              border: `1px solid ${semanticColors.theme.primary400}`,
              borderLeft: 'none',
              borderRadius: '0 4px 4px 0',
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
              borderLeft: 'none',
              borderRadius: '0 4px 4px 0',
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
              borderLeft: 'none',
              borderRadius: '0 4px 4px 0',
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
                  const isEditable = month === 'March';

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
                  const isEditable = month === 'March';

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
              borderLeft: 'none',
              borderRadius: '0 4px 4px 0',
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

export default ReportsCashSettlement;
