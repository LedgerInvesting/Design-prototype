import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '@design-library/pages';
import { Button, InfoTooltip, FormDropdown, colors, typography, useSemanticColors, borderRadius } from '@design-library/components';
import { createPageNavigationHandler, type NavigationHandler } from '@design-library/utils/navigation';

interface ReportsCashSettlementDetailProps {
  onNavigateToPage?: NavigationHandler;
  cessionData?: any;
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

export const ReportsCashSettlementDetail: React.FC<ReportsCashSettlementDetailProps> = ({
  onNavigateToPage,
  cessionData,
  flowType = 'detail'
}) => {
  const semanticColors = useSemanticColors();
  const isAggregatedFlow = flowType === 'aggregated';
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Month columns - using 6 months to force horizontal scrolling
  const months = ['October', 'November', 'December', 'January', 'February', 'March'];

  // Initialize metrics with month-based values
  // March (last column) should have values from previous screen, others have fake data
  const [metrics, setMetrics] = useState<{
    beginningBalance: { [key: string]: string };
    cedantCashflow1: { [key: string]: string };
    cedantCashflow2: { [key: string]: string };
    reinsurerCashflow1: { [key: string]: string };
    reinsurerCashflow2: { [key: string]: string };
    gainsLosses1: { [key: string]: string };
    gainsLosses2: { [key: string]: string };
    newBalance: { [key: string]: string };
  }>(() => {
    // Initialize empty values for all months
    const emptyMonthData: { [key: string]: string } = {};
    months.forEach((month) => {
      emptyMonthData[month] = '';
    });

    return {
      beginningBalance: { ...emptyMonthData },
      cedantCashflow1: { ...emptyMonthData },
      cedantCashflow2: { ...emptyMonthData },
      reinsurerCashflow1: { ...emptyMonthData },
      reinsurerCashflow2: { ...emptyMonthData },
      gainsLosses1: { ...emptyMonthData },
      gainsLosses2: { ...emptyMonthData },
      newBalance: { ...emptyMonthData },
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
      .income-input::placeholder {
        color: ${semanticColors.blackAndWhite.black300};
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [semanticColors]);

  // Create navigation handler
  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'reports-cash-settlement-detail')
    : undefined;

  // Determine configuration type - use same logic as detail mapping
  const transactionName = typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('currentTransaction') || '{}')?.name || 'Commercial Auto Specialty Lines Q1'
    : 'Commercial Auto Specialty Lines Q1';
  const isDetailMapping = transactionName.toLowerCase().includes('commercial auto');
  const configurationType = isDetailMapping ? 'detail' : 'aggregated';

  // Create tags for FormTopNav
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
      borderRadius: borderRadius[4],
      height: '20px',
      fontFamily: typography.styles.bodyS.fontFamily.join(', '),
      fontSize: typography.styles.bodyS.fontSize,
      fontWeight: typography.styles.bodyS.fontWeight,
      lineHeight: typography.styles.bodyS.lineHeight,
      letterSpacing: typography.letterSpacing.wide,
      color: colors.blackAndWhite.black700,
      whiteSpace: 'nowrap' as const,
    }}>
      {configurationType === 'detail' ? 'Detail' : 'Aggregated'}
    </div>
  ];

  // Stepper configuration - different based on flow type
  const stepper = isAggregatedFlow
    ? [
        // Aggregated flow: 3 steps (final step is Cash settlement)
        {
          label: 'Add data',
          status: 'completed' as const,
          onClick: () => onNavigateToPage?.('transaction-bdx-aggregated-mapping')
        },
        {
          label: 'Cession statement',
          status: 'completed' as const,
          onClick: () => onNavigateToPage?.('reports-cession-statement')
        },
        {
          label: 'Cash settlement',
          status: 'active' as const,
          onClick: () => {} // Current page, no action needed
        }
      ]
    : [
        // Detail flow: 4 steps
        {
          label: 'Upload file',
          status: 'completed' as const,
          onClick: () => onNavigateToPage?.('reports-bdx-detail-mapping')
        },
        {
          label: 'Cession statement',
          status: 'completed' as const,
          onClick: () => onNavigateToPage?.('reports-cession-statement')
        },
        {
          label: 'Cash settlement',
          status: 'active' as const,
          onClick: () => {} // Current page, no action needed
        },
        {
          label: 'Summary',
          status: 'disabled' as const
        }
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
      pageType="reports-cash-settlement-detail"
      selectedSidebarItem="reports"
      selectedSidebarSubitem="bdx-upload"
      onNavigate={navigationHandler}
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

          {/* Generate Button */}
          <Button
            variant="primary"
            color="black"
            showIcon={false}
            onClick={() => {
              if (onNavigateToPage) {
                onNavigateToPage('reports-cell-level-summary');
              }
            }}
          >
            Generate cell-level summary
          </Button>
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
                  Trust account information
                </p>
              </div>

              {/* Beginning Trust Account Balance */}
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
                    text="Trust account balance at the beginning of the period"
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
                    Beginning Trust Account Balance
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

              {/* Cedant Cashflow */}
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
                    text="Cashflow from cedant to trust account"
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
                    Cedant Cashflow
                  </p>
                  <span style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black800,
                    backgroundColor: colors.reports.blue500,
                    padding: '3px 5px',
                    marginLeft: '8px',
                    borderRadius: borderRadius[4]
                  }}>
                    in
                  </span>
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
                    text="Cashflow from cedant to trust account"
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
                    Cedant Cashflow
                  </p>
                  <span style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black800,
                    backgroundColor: colors.contracts.yellow500,
                    padding: '3px 5px',
                    marginLeft: '8px',
                    borderRadius: borderRadius[4]
                  }}>
                    out
                  </span>
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

              {/* Reinsurer Cashflow */}
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
                    text="Cashflow from trust account to reinsurer"
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
                    Reinsurer Cashflow
                  </p>
                  <span style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black800,
                    backgroundColor: colors.reports.blue500,
                    padding: '3px 5px',
                    marginLeft: '8px',
                    borderRadius: borderRadius[4]
                  }}>
                    in
                  </span>
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
                    text="Cashflow from trust account to reinsurer"
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
                    Reinsurer Cashflow
                  </p>
                  <span style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black800,
                    backgroundColor: colors.contracts.yellow500,
                    padding: '3px 5px',
                    marginLeft: '8px',
                    borderRadius: borderRadius[4]
                  }}>
                    out
                  </span>
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

              {/* Gains / Losses */}
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
                    text="Gains or losses during the period"
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
                    Gains / Losses
                  </p>
                  <span style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black800,
                    backgroundColor: colors.reports.blue500,
                    padding: '3px 5px',
                    marginLeft: '8px',
                    borderRadius: borderRadius[4]
                  }}>
                    in
                  </span>
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
                    text="Gains or losses during the period"
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
                    Gains / Losses
                  </p>
                  <span style={{
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black800,
                    backgroundColor: colors.contracts.yellow500,
                    padding: '3px 5px',
                    marginLeft: '8px',
                    borderRadius: borderRadius[4]
                  }}>
                    out
                  </span>
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

              {/* New Trust Account Balance */}
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
                    text="Trust account balance at the end of the period"
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
                    New Trust Account Balance
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

            {/* Beginning Trust Account Balance Container */}
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
                monthValues={metrics.beginningBalance}
                onChangeMonth={(month, value) => updateMetric('beginningBalance', month, value)}
                months={months}
              />
            </div>

            {/* Cedant Cashflow Container */}
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
                monthValues={metrics.cedantCashflow1}
                onChangeMonth={(month, value) => updateMetric('cedantCashflow1', month, value)}
                months={months}
              />
              <CessionMetricRow
                semanticColors={semanticColors}
                showBorder={false}
                monthValues={metrics.cedantCashflow2}
                onChangeMonth={(month, value) => updateMetric('cedantCashflow2', month, value)}
                months={months}
              />
            </div>

            {/* Reinsurer Cashflow Container */}
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
                monthValues={metrics.reinsurerCashflow1}
                onChangeMonth={(month, value) => updateMetric('reinsurerCashflow1', month, value)}
                months={months}
              />
              <CessionMetricRow
                semanticColors={semanticColors}
                showBorder={false}
                monthValues={metrics.reinsurerCashflow2}
                onChangeMonth={(month, value) => updateMetric('reinsurerCashflow2', month, value)}
                months={months}
              />
            </div>

            {/* Gains / Losses Container */}
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
                monthValues={metrics.gainsLosses1}
                onChangeMonth={(month, value) => updateMetric('gainsLosses1', month, value)}
                months={months}
              />
              <CessionMetricRow
                semanticColors={semanticColors}
                showBorder={false}
                monthValues={metrics.gainsLosses2}
                onChangeMonth={(month, value) => updateMetric('gainsLosses2', month, value)}
                months={months}
              />
            </div>

            {/* New Trust Account Balance Container */}
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
                monthValues={metrics.newBalance}
                onChangeMonth={(month, value) => updateMetric('newBalance', month, value)}
                months={months}
              />
            </div>
            </div>
          </div>
        </div>

        {/* Income Account Information */}
        <div style={{
          backgroundColor: semanticColors.theme.primary200,
          borderRadius: borderRadius[12],
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          {/* Title */}
          <p style={{
            ...typography.styles.bodyL,
            color: semanticColors.blackAndWhite.black900,
            margin: 0,
            fontWeight: typography.fontWeight.medium
          }}>
            Income Account information
          </p>

          {/* Input Fields Row */}
          <div style={{
            display: 'flex',
            gap: '20px',
            width: '100%'
          }}>
            {/* Income Account Balance */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '20px'
              }}>
                <p style={{
                  ...typography.styles.bodyS,
                  color: semanticColors.blackAndWhite.black800,
                  margin: 0
                }}>
                  Income Account Balance
                </p>
                <InfoTooltip
                  text="Beginning income account balance"
                  variant="small"
                />
              </div>
              <div style={{
                backgroundColor: semanticColors.blackAndWhite.white,
                border: `1px solid ${semanticColors.theme.primary400}`,
                borderRadius: borderRadius[4],
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 10px 10px 20px'
              }}>
                <span style={{
                  ...typography.styles.bodyS,
                  color: semanticColors.blackAndWhite.black900
                }}>
                  $
                </span>
                <input
                  type="text"
                  placeholder="Add Income Account Balance"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black900
                  }}
                  className="income-input"
                />
              </div>
            </div>

            {/* Interest Income */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '20px'
              }}>
                <p style={{
                  ...typography.styles.bodyS,
                  color: semanticColors.blackAndWhite.black800,
                  margin: 0
                }}>
                  Interest Income
                </p>
                <InfoTooltip
                  text="Interest income earned"
                  variant="small"
                />
              </div>
              <div style={{
                backgroundColor: semanticColors.blackAndWhite.white,
                border: `1px solid ${semanticColors.theme.primary400}`,
                borderRadius: borderRadius[4],
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 10px 10px 20px'
              }}>
                <span style={{
                  ...typography.styles.bodyS,
                  color: semanticColors.blackAndWhite.black900
                }}>
                  $
                </span>
                <input
                  type="text"
                  placeholder="Add Interest Income"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black900
                  }}
                  className="income-input"
                />
              </div>
            </div>

            {/* Income Distributed Cumulative */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '20px'
              }}>
                <p style={{
                  ...typography.styles.bodyS,
                  color: semanticColors.blackAndWhite.black800,
                  margin: 0
                }}>
                  Income Distributed Cumulative
                </p>
                <InfoTooltip
                  text="Cumulative distributed income"
                  variant="small"
                />
              </div>
              <div style={{
                backgroundColor: semanticColors.blackAndWhite.white,
                border: `1px solid ${semanticColors.theme.primary400}`,
                borderRadius: borderRadius[4],
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 10px 10px 20px'
              }}>
                <span style={{
                  ...typography.styles.bodyS,
                  color: semanticColors.blackAndWhite.black900
                }}>
                  $
                </span>
                <input
                  type="text"
                  placeholder="Income Distributed Cumulative"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    ...typography.styles.bodyM,
                    color: semanticColors.blackAndWhite.black900
                  }}
                  className="income-input"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsCashSettlementDetail;
