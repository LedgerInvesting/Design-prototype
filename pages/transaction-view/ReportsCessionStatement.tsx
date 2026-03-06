import React from 'react';
import { createPortal } from 'react-dom';

// Import page components
import { Layout, PageHeader } from '@design-library/pages';

// Import design tokens
import { typography, spacing, borderRadius, shadows, useSemanticColors, colors as staticColors } from '@design-library/tokens';

// Import components
import { InfoTooltip } from '@design-library/components';

// Import icons
import { DownloadMedium, DocumentMedium, HelpMedium } from '@design-library/icons';

// Import navigation utilities
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';

/**
 * First item box component (most important item)
 */
interface FirstItemBoxProps {
  number: number;
  title: string;
  description: string;
  value: string;
  hasUnderline?: boolean;
  tooltipContent?: string;
}

const FirstItemBox: React.FC<FirstItemBoxProps> = ({ number, title, description, value, hasUnderline, tooltipContent }) => (
  <div style={{
    backgroundColor: staticColors.blackAndWhite.white,
    border: `1px solid ${staticColors.reports.dynamic.blue400}`,
    borderRadius: borderRadius[12],
    padding: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
      {/* White color bar (not visible but keeps spacing consistent) */}
      <div style={{
        width: '5px',
        height: '18px',
        borderRadius: borderRadius[4],
        backgroundColor: staticColors.blackAndWhite.white,
        flexShrink: 0,
      }} />
      <InfoTooltip text={tooltipContent || "Additional information"} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{
          ...typography.styles.bodyL,
          color: staticColors.blackAndWhite.black900,
        }}>
          {number}. {title}
        </span>
        <span style={{
          ...typography.styles.bodyL,
          color: staticColors.blackAndWhite.black500,
        }}>
          {hasUnderline ? (
            <>
              According to{' '}
              <span style={{ textDecoration: 'underline' }}>
                {description.replace('According to ', '')}
              </span>
            </>
          ) : (
            description
          )}
        </span>
      </div>
    </div>
    <div style={{
      ...typography.styles.dataXXL,
      color: staticColors.blackAndWhite.black900,
      letterSpacing: '0.5px',
    }}>
      {value}
    </div>
  </div>
);

/**
 * Summary list item component
 */
interface SummaryListItemProps {
  number: number;
  title: string;
  description: string;
  value: string;
  barColor: string;
  hasBottomBorder?: boolean;
  hasUnderline?: boolean;
  isHighlighted?: boolean;
  tooltipContent?: string;
}

const SummaryListItem: React.FC<SummaryListItemProps> = ({
  number,
  title,
  description,
  value,
  barColor,
  hasBottomBorder = true,
  hasUnderline = false,
  isHighlighted = false,
  tooltipContent,
}) => (
  <div style={{
    borderBottom: hasBottomBorder ? `1px dashed ${staticColors.reports.dynamic.blue400}` : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    minHeight: '55px',
    backgroundColor: isHighlighted ? staticColors.reports.dynamic.blue300 : 'transparent',
    transition: 'background-color 0.2s ease',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
      {/* Colored bar */}
      <div style={{
        width: '5px',
        height: '18px',
        borderRadius: borderRadius[4],
        backgroundColor: barColor,
        flexShrink: 0,
      }} />
      <InfoTooltip text={tooltipContent || "Additional information"} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{
          ...typography.styles.bodyL,
          color: staticColors.blackAndWhite.black900,
        }}>
          {number}. {title}
        </span>
        <span style={{
          ...typography.styles.bodyL,
          color: staticColors.blackAndWhite.black500,
        }}>
          {hasUnderline ? (
            <>
              According to{' '}
              <span style={{ textDecoration: 'underline' }}>
                {description.replace('According to ', '')}
              </span>
            </>
          ) : (
            description
          )}
        </span>
      </div>
    </div>
    <span style={{
      ...typography.styles.bodyL,
      color: staticColors.blackAndWhite.black900,
      textAlign: 'right',
    }}>
      {value}
    </span>
  </div>
);

/**
 * Final summary item component (larger, special formatting)
 */
interface FinalSummaryItemProps {
  number: number;
  title: string;
  formula: string;
  value: string;
  barColor: string;
  isHighlighted?: boolean;
  tooltipContent?: string;
}

const FinalSummaryItem: React.FC<FinalSummaryItemProps> = ({ number, title, formula, value, barColor, isHighlighted = false, tooltipContent }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    minHeight: '80px',
    backgroundColor: isHighlighted ? staticColors.reports.dynamic.blue300 : 'transparent',
    transition: 'background-color 0.2s ease',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
      {/* Colored bar */}
      <div style={{
        width: '5px',
        height: '18px',
        borderRadius: borderRadius[4],
        backgroundColor: barColor,
        flexShrink: 0,
      }} />
      <InfoTooltip text={tooltipContent || "Additional information"} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{
          ...typography.styles.bodyL,
          color: staticColors.blackAndWhite.black900,
        }}>
          {number}. {title}
        </span>
        <span style={{
          ...typography.styles.captionS,
          color: staticColors.blackAndWhite.black500,
        }}>
          {formula}
        </span>
      </div>
    </div>
    <div style={{
      ...typography.styles.dataXXL,
      color: staticColors.blackAndWhite.black900,
      letterSpacing: '0.5px',
    }}>
      {value}
    </div>
  </div>
);

/**
 * Premium Allocation Breakdown component
 * Shows the breakdown of item 1 (total) into components 2-10
 * Each segment represents the percentage of that item relative to item 1
 */
interface PremiumAllocationBarProps {
  onSegmentHover: (itemNumber: number | null) => void;
}

const PremiumAllocationBar: React.FC<PremiumAllocationBarProps> = ({ onSegmentHover }) => {
  const [hoveredSegment, setHoveredSegment] = React.useState<number | null>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  // Calculate tooltip position to prevent overflow
  const getTooltipPosition = () => {
    const tooltipWidth = 250;
    const offset = 10;

    let x = mousePosition.x + offset;

    // Check if tooltip would overflow on the right
    if (x + tooltipWidth > window.innerWidth) {
      x = mousePosition.x - tooltipWidth - offset;
    }

    return { x, y: mousePosition.y + offset };
  };

  // Item 1 total: $12,154,200 (this is 100%)
  // Calculate percentages for each item:
  const total = 12154200;

  const segments = [
    { itemNumber: 2, name: 'Remittance Basis Premium', color: '#eac5fb', amount: 5156920, percentage: (5156920 / total) * 100 },
    { itemNumber: 3, name: 'Quota Share Premium', color: '#c09cfa', amount: 1352913, percentage: (1352913 / total) * 100 },
    { itemNumber: 4, name: 'Gross Paid Loss', color: '#ea6b6e', amount: 4588175, percentage: (4588175 / total) * 100 },
    { itemNumber: 5, name: 'Quota Share Paid Loss', color: '#ad3f51', amount: 492311, percentage: (492311 / total) * 100 },
    { itemNumber: 6, name: 'Base Ceding Commission', color: '#2577a7', amount: 577694, percentage: (577694 / total) * 100 },
    { itemNumber: 7, name: 'Quota Share Reinsurance Premium', color: '#643ed8', amount: 775219, percentage: (775219 / total) * 100 },
    { itemNumber: 8, name: 'FET', color: '#addfff', amount: 13529, percentage: (13529 / total) * 100 },
    { itemNumber: 9, name: 'Profit Commission', color: '#fcdc6a', amount: 0, percentage: 0 },
    { itemNumber: 10, name: 'Net Amount Due to Reinsurer', color: '#d2c8bf', amount: 269379, percentage: (269379 / total) * 100 },
  ];

  const formatCurrency = (value: number) => {
    return '$' + value.toLocaleString('en-US');
  };

  const handleSegmentHover = (segment: typeof segments[0] | null) => {
    if (segment) {
      setHoveredSegment(segment.itemNumber);
      onSegmentHover(segment.itemNumber);
    } else {
      setHoveredSegment(null);
      onSegmentHover(null);
    }
  };

  return (
    <div style={{
      border: `1.207px solid ${staticColors.reports.dynamic.blue400}`,
      borderRadius: borderRadius[12],
      padding: '40px 29px',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
      position: 'relative',
    }}>
      <h3 style={{
        ...typography.styles.subheadingM,
        color: staticColors.blackAndWhite.black900,
        margin: 0,
      }}>
        Premium Allocation Breakdown
      </h3>
      <div style={{
        display: 'flex',
        gap: '6px',
        height: '7px',
        borderRadius: borderRadius[4],
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
      }}>
        {segments.map((segment, index) => (
          segment.percentage > 0 && (
            <div
              key={index}
              onMouseEnter={() => handleSegmentHover(segment)}
              onMouseLeave={() => handleSegmentHover(null)}
              onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
              style={{
                backgroundColor: segment.color,
                width: `${segment.percentage}%`,
                borderRadius: borderRadius[8],
                cursor: 'pointer',
              }}
            />
          )
        ))}
      </div>

      {/* Tooltip with section format - rendered as portal */}
      {hoveredSegment !== null && typeof document !== 'undefined' && (() => {
        const tooltipPos = getTooltipPosition();
        return createPortal(
          <div style={{
            position: 'fixed',
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            backgroundColor: staticColors.blackAndWhite.black900,
            color: staticColors.blackAndWhite.white,
            padding: '18px 20px',
            borderRadius: borderRadius[12],
            boxShadow: shadows.large,
            zIndex: 10000,
            pointerEvents: 'none',
            minWidth: '250px',
            maxWidth: '250px',
          }}>
            {segments.find(s => s.itemNumber === hoveredSegment) && (() => {
              const seg = segments.find(s => s.itemNumber === hoveredSegment)!;
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{
                    fontFamily: typography.styles.captionS.fontFamily.join(', '),
                    fontSize: typography.styles.captionS.fontSize,
                    fontWeight: typography.styles.captionS.fontWeight,
                    fontStyle: typography.styles.captionS.fontStyle,
                    lineHeight: typography.styles.captionS.lineHeight,
                    letterSpacing: '-0.5px',
                    color: staticColors.blackAndWhite.white,
                  }}>
                    {seg.name} ({seg.percentage.toFixed(1)}%)
                  </div>
                  <div style={{
                    height: '1px',
                    backgroundColor: staticColors.blackAndWhite.black700,
                    width: '100%',
                    margin: '0',
                  }} />
                  <div style={{
                    fontFamily: typography.styles.bodyS.fontFamily.join(', '),
                    fontSize: typography.styles.bodyS.fontSize,
                    fontWeight: typography.styles.bodyS.fontWeight,
                    lineHeight: typography.styles.bodyS.lineHeight,
                    letterSpacing: '0px',
                    color: staticColors.blackAndWhite.white,
                  }}>
                    {formatCurrency(seg.amount)}
                  </div>
                </div>
              );
            })()}
          </div>,
          document.body
        );
      })()}
    </div>
  );
};

/**
 * Export & Documentation section component
 */
const ExportDocumentationSection: React.FC = () => {
  const exportButtons = [
    { label: 'PDF Report', icon: <DownloadMedium color={staticColors.blackAndWhite.black900} /> },
    { label: 'Excel Workbook', icon: <DocumentMedium color={staticColors.blackAndWhite.black900} /> },
    { label: 'Validation Report', icon: <HelpMedium color={staticColors.blackAndWhite.black900} /> },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      <h3 style={{
        ...typography.styles.bodyL,
        color: staticColors.blackAndWhite.black900,
        margin: 0,
      }}>
        Export & Documentation
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
      }}>
        {exportButtons.map((button, index) => (
          <button
            key={index}
            style={{
              backgroundColor: staticColors.blackAndWhite.white,
              border: `1px solid ${staticColors.reports.dynamic.blue400}`,
              borderRadius: borderRadius[8],
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = staticColors.blackAndWhite.black900;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = staticColors.reports.dynamic.blue400;
            }}
          >
            <div style={{ width: '24px', height: '24px' }}>
              {button.icon}
            </div>
            <span style={{
              ...typography.styles.bodyM,
              color: staticColors.blackAndWhite.black900,
            }}>
              {button.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * Reports Cession Statement page props
 * Displays cession statement details for selected entity from Reports Explorer
 */
interface CessionStatementProps {
  onNavigateToPage?: (page: string, data?: any) => void;
  entityData?: {
    id: string;
    name: string;
    type: string;
    path: string;
    financialData?: {
      grossWrittenPremium: number;
      cededBasisPremium: number;
      quotaShareCededBasisPremium: number;
      cedingCommission: number;
      netCededBasicPremium: number;
      paidLoss: number;
      profitCommission: number;
      brokerageFee: number;
      totalCededToTrust: number;
    };
  } | null;
  source?: 'bdx-upload' | 'reports-explorer'; // Track navigation source
  flowType?: 'detail' | 'aggregated'; // Track which BDX flow (detail or aggregated)
}

export const ReportsCessionStatement: React.FC<CessionStatementProps> = ({ onNavigateToPage, entityData, source = 'bdx-upload', flowType = 'detail' }) => {
  const colors = useSemanticColors();
  const [hoveredItem, setHoveredItem] = React.useState<number | null>(null);

  // Determine if coming from BDX upload flow or Reports Explorer
  const isFromBDXUpload = source === 'bdx-upload';
  const isAggregatedFlow = flowType === 'aggregated';

  // Use entity data passed from Reports Explorer, fallback to default
  const currentEntity = (entityData && entityData.name) ? entityData : {
    id: '',
    name: 'Cucumber GL Seasonal',
    type: 'Program',
    path: 'Cucumber GL Seasonal'
  };

  // Summary list items data (items 2-9)
  const summaryItems = [
    {
      number: 2,
      title: 'Remittance Basis Premium',
      description: 'Collected Premium as per contract, according to {eval_date} BDX',
      value: '$5,156,920',
      barColor: '#eac5fb', // violet-01
      tooltipContent: 'Premium collected from policyholders according to contract terms. Calculated from bordereaux file evaluation date.',
    },
    {
      number: 3,
      title: 'Quota Share Premium',
      description: 'Applying 10.73% quota share to (1)',
      value: '$1,352,913',
      barColor: '#c09cfa', // violet-05
      tooltipContent: 'Formula: Remittance Basis Premium × Quota Share %\nCalculation: $12,608,692 × 10.73% = $1,352,913',
    },
    {
      number: 4,
      title: 'Gross Paid Loss',
      description: '2024-06-30 BDX',
      value: '$4,588,175',
      barColor: '#ea6b6e', // red-09
      hasUnderline: true,
      tooltipContent: 'Direct value from bordereaux file dated 2024-06-30. Total loss payments made before quota share application.',
    },
    {
      number: 5,
      title: 'Quota Share Paid Loss',
      description: 'Applying 10.73% quota share to (4)',
      value: '$492,311',
      barColor: '#ad3f51', // red-12
      tooltipContent: 'Formula: Gross Paid Loss × Quota Share %\nCalculation: $4,588,175 × 10.73% = $492,311',
    },
    {
      number: 6,
      title: 'Base Ceding Commission',
      description: 'Base ceding commission of 42.70% applied to (3)',
      value: '($577,694)',
      barColor: '#2577a7', // blue-12
      tooltipContent: 'Formula: Quota Share Premium × Ceding Commission %\nCalculation: $1,352,913 × 42.70% = $577,694\nNote: Shown as negative because it reduces the reinsurer\'s obligation',
    },
    {
      number: 7,
      title: 'Quota Share Reinsurance Premium',
      description: '= (3) + (6)',
      value: '$775,219',
      barColor: '#643ed8', // purple
      tooltipContent: 'Formula: Quota Share Premium + Base Ceding Commission\nCalculation: $1,352,913 + ($577,694) = $775,219\nRepresents net premium after commission',
    },
    {
      number: 8,
      title: 'FET',
      description: 'FET of 1.0% applied to (3)',
      value: '($13,529)',
      barColor: '#addfff', // blue-04
      tooltipContent: 'Formula: Quota Share Premium × FET Rate\nCalculation: $1,352,913 × 1.0000% = $13,529\nFederal Excise Tax on reinsurance premium',
    },
    {
      number: 9,
      title: 'Profit Commission',
      description: 'Profit commission payout based on gross loss ratio of 68.74%',
      value: '--',
      barColor: '#fcdc6a', // yellow
      hasBottomBorder: false,
      tooltipContent: 'Formula: Based on Loss Ratio performance vs. sliding scale\nCurrent Gross Loss Ratio: 68.74%\nNo profit commission due as loss ratio exceeds threshold\nProfit commission applies when actual losses are below expected',
    },
  ];

  // Dynamic back navigation based on source
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
        ? staticColors.analytics.green600
        : staticColors.reports.dynamic.blue200,
      borderRadius: borderRadius[4],
      height: '20px',
      fontFamily: typography.styles.bodyS.fontFamily.join(', '),
      fontSize: typography.styles.bodyS.fontSize,
      fontWeight: typography.styles.bodyS.fontWeight,
      lineHeight: typography.styles.bodyS.lineHeight,
      letterSpacing: typography.letterSpacing.wide,
      color: staticColors.blackAndWhite.black700,
      whiteSpace: 'nowrap' as const,
    }}>
      {configurationType === 'detail' ? 'Detail' : 'Aggregated'}
    </div>
  ];

  // Stepper configuration - different based on flow type
  const stepper = isAggregatedFlow
    ? [
        // Aggregated flow: 3 steps
        {
          label: 'Add data',
          status: 'completed' as const,
          onClick: () => onNavigateToPage?.('transaction-bdx-aggregated-mapping')
        },
        {
          label: 'Cession statement',
          status: 'active' as const,
          onClick: () => {} // Current page (cession statement), no action needed
        },
        {
          label: 'Cash settlement',
          status: 'disabled' as const
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
          status: 'active' as const,
          onClick: () => {} // Current page, no action needed
        },
        {
          label: 'Cash settlement',
          status: 'disabled' as const
        },
        {
          label: 'Summary',
          status: 'disabled' as const
        }
      ];

  return (
    <Layout
      formMode={true}
      formTitle="BDX UPLOAD"
      formTags={formTags}
      showSidebarToggle={false}
      backButtonText="Close"
      pageType="reports-cession-statement"
      selectedSidebarItem="reports"
      selectedSidebarSubitem="bdx-upload"
      onNavigate={createPageNavigationHandler(onNavigateToPage!, 'reports-cession-statement')}
      onBackClick={handleBackClick}
      stepper={stepper}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {/* Page Header */}
        <PageHeader
          title={
            <>
              <span style={{ color: staticColors.blackAndWhite.black500 }}>
                You're now reviewing Reinsurance Settlement Summary
                <br />
                {' for '}
              </span>
              Transaction name
              <span style={{ color: staticColors.blackAndWhite.black500 }}> within</span>{' '}
              <span style={{ color: staticColors.blackAndWhite.black900 }}>{currentEntity.name}</span>
            </>
          }
          primaryAction={isFromBDXUpload ? {
            label: 'Proceed to Cash Settlement',
            onClick: () => {
              if (onNavigateToPage) {
                // Check if coming from detail mapping flow (has financialData)
                if (entityData?.financialData) {
                  // Navigate to detail cash settlement with entity data and flow type
                  onNavigateToPage('reports-cash-settlement-detail', {
                    ...entityData,
                    flowType: flowType
                  });
                } else {
                  // Navigate to regular cash settlement (aggregated flow) with flowType
                  onNavigateToPage('reports-cash-settlement', {
                    flowType: flowType
                  });
                }
              }
            }
          } : false}
          spacing="normal"
        />

        {/* Summary Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* First Item (Most Important) */}
          <FirstItemBox
            number={1}
            title="Gross Written Premium"
            description="According to 2025-01-31BDX"
            value="$12,154,200"
            hasUnderline={true}
            tooltipContent="Direct value from bordereaux file dated 2024-06-30. Represents the total premium written before any adjustments."
          />

          {/* Summary List (Items 2-9) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 15px',
          }}>
            {summaryItems.map((item) => (
              <SummaryListItem
                key={item.number}
                number={item.number}
                title={item.title}
                description={item.description}
                value={item.value}
                barColor={item.barColor}
                hasBottomBorder={item.hasBottomBorder}
                hasUnderline={item.hasUnderline}
                isHighlighted={hoveredItem === item.number}
                tooltipContent={item.tooltipContent}
              />
            ))}

            {/* Separator Line */}
            <div style={{
              height: '1px',
              borderTop: `1px dashed ${staticColors.blackAndWhite.black900}`,
              margin: '0',
            }} />

            {/* Final Summary Item (Item 10) */}
            <FinalSummaryItem
              number={10}
              title="Net Amount Due to Reinsurer"
              formula="= (5) + (7) + (8) + (9)"
              value="$269,379"
              barColor="#d2c8bf"
              isHighlighted={hoveredItem === 10}
              tooltipContent="Formula: Quota Share Paid Loss + Quota Share Reinsurance Premium + FET + Profit Commission\nCalculation: $492,311 + $775,219 + ($13,529) + 0 = $269,379\nFinal settlement amount"
            />
          </div>

          {/* Premium Allocation Breakdown */}
          <PremiumAllocationBar onSegmentHover={setHoveredItem} />

          {/* Export & Documentation Section */}
          <ExportDocumentationSection />
        </div>
      </div>
    </Layout>
  );
};

export default ReportsCessionStatement;
