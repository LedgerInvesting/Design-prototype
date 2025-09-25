import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Layout } from '@design-library/pages';
import { Button, DashboardCard } from '@design-library/components';
import { colors, typography, borderRadius, shadows } from '@design-library/tokens';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { SettingsMedium, DownloadSmall, ArrowUpSmall, ArrowDownSmall, CardsGraph, CardsText, AddMedium } from '@design-library/icons';
import { UploadTrianglesModal } from './UploadTrianglesModal';

// Custom StatusCheck component with proper color support
const StatusCheck: React.FC<{ color: string }> = ({ color }) => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.7998 8.27778L7.94266 10.5L11.7998 6.5" stroke={color} strokeWidth="2"/>
    <circle cx="8.7998" cy="8.5" r="7.5" stroke={color} strokeWidth="2"/>
  </svg>
);

/**
 * Triangle Tooltip Component
 *
 * Custom tooltip wrapper that displays triangle type legend when hovering over StatusCheck icons.
 * This replaces the InfoTooltip component to avoid unwanted "i" icon display.
 *
 * Features:
 * - Mouse-following tooltip positioning
 * - No additional visual elements (triggers directly on children)
 * - Triangle legend with color-coded explanations
 * - Clean hover/leave state management
 */
const TriangleTooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsVisible(true);
    setPosition({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </div>

      {/* Render tooltip in portal to avoid parent transform issues */}
      {isVisible && typeof document !== 'undefined' && createPortal(
        <div
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            backgroundColor: '#17211B',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '10px',
            fontWeight: 500,
            lineHeight: 1.3,
            maxWidth: '280px',
            zIndex: 1000,
            pointerEvents: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #BD8B11', backgroundColor: 'transparent', flexShrink: 0 }} />
              <span>On risk triangle (Accident-quarter)</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #744DEB', backgroundColor: 'transparent', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ whiteSpace: 'pre-line' }}>Loss Development triangle{'\n'}(Accident-quarter)</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #3DA3CB', backgroundColor: 'transparent', flexShrink: 0 }} />
              <span>Policy-Year triangle</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};


// Growth indicator component
interface GrowthIndicatorProps {
  direction: 'up' | 'down';
  percentage: string;
  period: string;
}

const GrowthIndicator: React.FC<GrowthIndicatorProps> = ({ direction, percentage, period }) => {
  const colors = useSemanticColors();
  const isPositive = direction === 'up';
  const color = isPositive ? colors.success.textAndStrokes : colors.error.textAndStrokes;
  const ArrowIcon = isPositive ? ArrowUpSmall : ArrowDownSmall;
  const sign = isPositive ? '+' : '';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: 'Söhne, system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: 500,
      color: colors.blackAndWhite.black900,
    }}>
      <ArrowIcon color={color} />
      <span>{sign} {percentage} in the last {period}</span>
    </div>
  );
};

// Small chart component for metrics
interface SmallChartProps {
  trend: 'up' | 'down';
}

const SmallChart: React.FC<SmallChartProps> = ({ trend }) => {
  const colors = useSemanticColors();
  const circleColor = trend === 'up' ? colors.success.textAndStrokes : colors.error.textAndStrokes;

  return (
    <svg width="106" height="28" viewBox="0 0 106 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 15.5C2.5 15.5 4 14 6 13C8 12 10.5 11 13 10.5C15.5 10 18 9.5 21 9C24 8.5 27.5 8 31 7.5C34.5 7 38.5 6.5 42 6C45.5 5.5 49.5 5 53 4.5C56.5 4 60.5 3.5 64 3C67.5 2.5 71.5 2 75 1.5C78.5 1 82.5 0.5 86 1C89.5 1.5 93.5 2 97 2.5C100.5 3 104.5 3.5 106 4"
        stroke="#17211B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="102"
        cy="4"
        r="4"
        fill={circleColor}
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

interface ValuationDashboardProps {
  onNavigateToPage: (page: string) => void;
  valuationData?: {
    programName: string;
    evaluationDate: string;
    reportedLossRatio: string;
    currentWrittenPremium: string;
  };
}

interface StatusDotProps {
  status: 'reviewed' | 'pending' | 'none';
  position?: 'left' | 'center' | 'right';
}

const StatusDot: React.FC<StatusDotProps> = ({ status, position }) => {
  const getColor = () => {
    if (position) {
      // Triangle icons with specific colors
      switch (position) {
        case 'left': return '#BD8B11';
        case 'center': return '#744DEB';
        case 'right': return '#3DA3CB';
        default: return '#e1eae5';
      }
    } else {
      // Regular status dots
      switch (status) {
        case 'reviewed': return '#74efa3';
        case 'pending': return '#ffdd61';
        case 'none': return '#e1eae5';
        default: return '#e1eae5';
      }
    }
  };

  if (position) {
    // Render StatusCheck icon for triangle columns
    return <StatusCheck color={getColor()} />;
  }

  // Render regular dot for status column
  return (
    <div
      style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: getColor(),
      }}
    />
  );
};

interface StatusRowProps {
  date: string;
  triangleStatuses: ('reviewed' | 'pending' | 'none')[];
  officialStatus: string;
}

const StatusRow: React.FC<StatusRowProps> = ({ date, triangleStatuses, officialStatus }) => {
  const colors = useSemanticColors();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '50px',
          padding: '0 30px',
        }}
      >
        {/* Date Column */}
        <div style={{ width: '107px', padding: '10px 0' }}>
          <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black900 }}>
            {date}
          </div>
        </div>

        {/* Triangles Column */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '8px', marginLeft: '-10px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {triangleStatuses.map((status, index) => {
              const position = index === 0 ? 'left' : index === 1 ? 'center' : 'right';
              return (
                <div key={index} style={{ width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <TriangleTooltip>
                    <StatusDot status={status} position={position} />
                  </TriangleTooltip>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Valuation Column */}
        <div style={{ width: '120px', padding: '10px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <StatusDot status={officialStatus === 'Reviewed' ? 'reviewed' : officialStatus === 'Pending' ? 'pending' : 'none'} />
          <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black700 }}>
            {officialStatus}
          </div>
        </div>

        {/* Download Column */}
        <div style={{ width: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <DownloadSmall color={colors.theme.primary450} />
        </div>
      </div>

      {/* Dashed separator with proper padding */}
      <div style={{
        height: '1px',
        margin: '0 30px',
        borderTop: '1px dashed #e1eae5',
        backgroundColor: 'transparent',
      }} />
    </div>
  );
};

const ChartComponent: React.FC = () => {
  const colors = useSemanticColors();

  return (
    <div style={{
      backgroundColor: colors.blackAndWhite.white,
      borderRadius: borderRadius[12],
      border: `1px solid ${colors.theme.primary400}`,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 30px',
        borderBottom: `1px solid ${colors.theme.primary400}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <div style={{
            width: '14px',
            height: '18px',
            backgroundColor: colors.theme.primary300,
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ width: '6px', height: '6px', backgroundColor: colors.theme.primary700 }} />
          </div>
          <div style={{ ...typography.styles.bodyL, color: colors.blackAndWhite.black900 }}>
            Valuation runs over time
          </div>
        </div>
        <div style={{
          ...typography.styles.bodyM,
          color: colors.blackAndWhite.black500,
          lineHeight: '1.3',
          maxWidth: '904px',
        }}>
          Loss ratio trends for tip-national.ca-truck - TY22 (5 valuation runs) with uncertainty bands (25th-75th and 5th-95th percentiles), including paid and reported loss ratios
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
        height: '50px',
        alignItems: 'center',
      }}>
        {[
          { label: 'Paid Loss Ratio', color: '#8b68f5' },
          { label: 'Reported Loss Ratio', color: '#ffd028' },
          { label: 'Mean Loss Ratio', color: '#0f9342' },
        ].map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width: '6px',
              height: '6px',
              backgroundColor: item.color,
              borderRadius: '50%',
            }} />
            <div style={{ ...typography.styles.captionS, color: colors.blackAndWhite.black500 }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div style={{
        height: '286px',
        position: 'relative',
        margin: '0 50px',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        {/* Y-axis labels */}
        <div style={{
          width: '50px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingRight: '10px',
          paddingTop: '20px',
          paddingBottom: '40px',
        }}>
          {['120%', '100%', '80%', '60%', '40%', '0%'].map((label, index) => (
            <div key={index} style={{ ...typography.styles.captionS, color: colors.blackAndWhite.black500 }}>
              {label}
            </div>
          ))}
        </div>

        {/* Chart body */}
        <div style={{
          flex: 1,
          height: '237px',
          marginBottom: '49px',
          position: 'relative',
          backgroundImage: `
            linear-gradient(to right, transparent 0%, transparent 16.6%, #e1eae5 16.6%, #e1eae5 16.7%, transparent 16.7%, transparent 33.2%, #e1eae5 33.2%, #e1eae5 33.3%, transparent 33.3%, transparent 49.8%, #e1eae5 49.8%, #e1eae5 49.9%, transparent 49.9%, transparent 66.4%, #e1eae5 66.4%, #e1eae5 66.5%, transparent 66.5%, transparent 83%, #e1eae5 83%, #e1eae5 83.1%, transparent 83.1%),
            linear-gradient(to bottom, #e1eae5 0%, #e1eae5 1px, transparent 1px, transparent 20%, #e1eae5 20%, #e1eae5 21%, transparent 21%, transparent 40%, #e1eae5 40%, #e1eae5 41%, transparent 41%, transparent 60%, #e1eae5 60%, #e1eae5 61%, transparent 61%, transparent 80%, #e1eae5 80%, #e1eae5 81%, transparent 81%)
          `,
        }}>
          {/* Mock chart lines */}
          <svg
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            viewBox="0 0 996 237"
          >
            {/* Green uncertainty band */}
            <path
              d="M0,190 L166,185 L332,180 L498,175 L664,170 L830,165 L996,160 L996,120 L830,125 L664,130 L498,135 L332,140 L166,145 L0,150 Z"
              fill="#e9f1ec"
              opacity="0.5"
            />

            {/* Green main line */}
            <path
              d="M0,170 L166,165 L332,160 L498,155 L664,150 L830,145 L996,140"
              stroke="#0f9342"
              strokeWidth="2"
              fill="none"
            />

            {/* Yellow dashed line */}
            <path
              d="M0,200 L166,185 L332,170 L498,155 L664,140 L830,125 L996,110"
              stroke="#ffd028"
              strokeWidth="2"
              strokeDasharray="4,4"
              fill="none"
            />

            {/* Purple line */}
            <path
              d="M0,210 L166,205 L332,200 L498,195 L664,190 L830,185 L996,180"
              stroke="#8b68f5"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Y-axis label (right) */}
        <div style={{
          width: '50px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            ...typography.styles.captionS,
            color: colors.blackAndWhite.black500,
            transform: 'rotate(-90deg)',
            whiteSpace: 'nowrap',
          }}>
            Loss Ratio
          </div>
        </div>
      </div>

      {/* X-axis labels */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 100px 20px 100px',
        ...typography.styles.captionS,
        color: colors.blackAndWhite.black500,
      }}>
        {['Mar 2024', 'May 2024', 'Jul 2024', 'Sep 2024', 'Nov 2024', 'Jan 2025'].map((label, index) => (
          <div key={index}>{label}</div>
        ))}
      </div>

      {/* Bottom label */}
      <div style={{
        textAlign: 'center',
        padding: '10px',
        ...typography.styles.captionS,
        color: colors.blackAndWhite.black500,
      }}>
        Evaluation Date
      </div>
    </div>
  );
};

const ValuationDashboardContent: React.FC<ValuationDashboardProps> = ({
  onNavigateToPage,
  valuationData
}) => {
  const colors = useSemanticColors();

  // Provide default data if valuationData is null or undefined
  const defaultData = {
    programName: 'Aviation Treaty 2023',
    evaluationDate: '2024-12-30',
    reportedLossRatio: '42.2%',
    currentWrittenPremium: '$20,107,359'
  };
  const data = valuationData || defaultData;
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const statusData = [
    { date: 'Jan 30, 2025', triangleStatuses: ['reviewed', 'pending', 'none'], officialStatus: 'Reviewed' },
    { date: 'Dec 31, 2024', triangleStatuses: ['reviewed', 'pending', 'none'], officialStatus: 'Pending' },
    { date: 'Nov 30, 2024', triangleStatuses: ['reviewed', 'none', 'none'], officialStatus: 'No Valuation' },
    { date: 'Oct 31, 2024', triangleStatuses: ['reviewed', 'pending', 'none'], officialStatus: 'Reviewed' },
    { date: 'Sep 30, 2024', triangleStatuses: ['reviewed', 'pending', 'reviewed'], officialStatus: 'Reviewed' },
    { date: 'Aug 31, 2024', triangleStatuses: ['reviewed', 'reviewed', 'reviewed'], officialStatus: 'Reviewed' },
    { date: 'Jul 31, 2024', triangleStatuses: ['reviewed', 'pending', 'none'], officialStatus: 'Pending' },
  ] as const;

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
          { label: data.programName, isActive: true }
        ]}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '40px',
          flexWrap: 'nowrap',
          gap: '20px',
        }}>
          <div>
            <h1 style={{
              ...typography.styles.headlineH2,
              color: colors.blackAndWhite.black900,
              margin: '0 0 8px 0',
              lineHeight: '1.2',
            }}>
              <span style={{ color: colors.blackAndWhite.black500 }}>You're now viewing </span>
              <span>{data.programName}</span>
              <span>.</span>
              <span style={{ color: colors.blackAndWhite.black500 }}> Valuation dashboard</span>
            </h1>
          </div>
          <Button
            variant="primary"
            color="white"
            icon={<SettingsMedium color={colors.blackAndWhite.black900} />}
            onClick={() => onNavigateToPage('valuation-configuration', { programName: data.programName })}
            style={{
              border: `1px solid ${colors.theme.primary400}`,
              minWidth: '200px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              display: 'inline-flex',
              overflow: 'visible',
            }}
          >
            <span style={{ whiteSpace: 'nowrap' }}>Edit Configuration</span>
          </Button>
        </div>

        {/* Cards Container */}
        <div style={{
          display: 'flex',
          gap: '20px',
          width: '100%',
          marginBottom: '40px',
        }}>
          {/* Valuation Summary Card */}
          <DashboardCard
            title="Valuation Summary"
            icon={<CardsGraph color={colors.theme.primary700} />}
            showButton={false}
            width="50%"
            bodyStyle={{ padding: '20px 30px 26px 30px' }}
          >
            {/* Metric 1: Evaluation Date */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{
                fontFamily: 'Söhne, system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.3,
                color: colors.blackAndWhite.black500,
                marginBottom: '15px'
              }}>
                Evaluation Date
              </div>
              <div style={{
                fontFamily: 'Söhne, system-ui, sans-serif',
                lineHeight: 1.3,
                color: colors.blackAndWhite.black900,
                fontSize: '26px',
                fontWeight: 400
              }}>
                {data.evaluationDate}
              </div>
            </div>
            {/* Content-padded separator */}
            <div style={{
              width: '100%',
              height: '1px',
              backgroundColor: colors.theme.primary400,
              margin: '0 0 20px 0'
            }} />
            {/* Metric 2: Reported Loss Ratio */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{
                fontFamily: 'Söhne, system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.3,
                color: colors.blackAndWhite.black500,
                marginBottom: '15px'
              }}>
                Reported Loss Ratio
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}>
                <div style={{
                  fontFamily: 'Söhne, system-ui, sans-serif',
                  lineHeight: 1.3,
                  color: colors.blackAndWhite.black900,
                  fontSize: '26px',
                  fontWeight: 400
                }}>
                  42.2%
                </div>
                <GrowthIndicator direction="up" percentage="7.8%" period="3m" />
              </div>
            </div>
            {/* Content-padded separator */}
            <div style={{
              width: '100%',
              height: '1px',
              backgroundColor: colors.theme.primary400,
              margin: '0 0 20px 0'
            }} />
            {/* Metric 3: Expected Loss Ratio */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{
                fontFamily: 'Söhne, system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.3,
                color: colors.blackAndWhite.black500,
                marginBottom: '15px'
              }}>
                Expected Loss Ratio
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}>
                <div style={{
                  fontFamily: 'Söhne, system-ui, sans-serif',
                  lineHeight: 1.3,
                  color: colors.blackAndWhite.black900,
                  fontSize: '26px',
                  fontWeight: 400
                }}>
                  38.4%
                </div>
                <GrowthIndicator direction="up" percentage="4.2%" period="3m" />
              </div>
            </div>
            {/* Content-padded separator */}
            <div style={{
              width: '100%',
              height: '1px',
              backgroundColor: colors.theme.primary400,
              margin: '0 0 20px 0'
            }} />
            {/* Metric 4: Mean Loss Ratio */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{
                fontFamily: 'Söhne, system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.3,
                color: colors.blackAndWhite.black500,
                marginBottom: '15px'
              }}>
                Mean Loss Ratio
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}>
                <div style={{
                  fontFamily: 'Söhne, system-ui, sans-serif',
                  lineHeight: 1.3,
                  color: colors.blackAndWhite.black900,
                  fontSize: '26px',
                  fontWeight: 400
                }}>
                  35.8%
                </div>
                <GrowthIndicator direction="down" percentage="2.4%" period="3m" />
              </div>
            </div>
            {/* Content-padded separator */}
            <div style={{
              width: '100%',
              height: '1px',
              backgroundColor: colors.theme.primary400,
              margin: '0 0 20px 0'
            }} />
            {/* Metric 5: Current Written Premium */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{
                fontFamily: 'Söhne, system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.3,
                color: colors.blackAndWhite.black500,
                marginBottom: '15px'
              }}>
                Current Written Premium
              </div>
              <div style={{
                fontFamily: 'Söhne, system-ui, sans-serif',
                lineHeight: 1.3,
                color: colors.blackAndWhite.black900,
                fontSize: '26px',
                fontWeight: 400
              }}>
                $20,107,359
              </div>
            </div>
          </DashboardCard>

          {/* Latest Valuation Status Card */}
          <DashboardCard
            title="Latest Valuation Status"
            icon={<CardsText color={colors.theme.primary700} />}
            button={{
              text: "VIEW ALL",
              onClick: () => onNavigateToPage('valuation-status')
            }}
            width="50%"
          >
            {/* Column Headers */}
            <div style={{
              display: 'flex',
              padding: '20px 30px 10px 30px',
            }}>
              <div style={{
                width: '107px',
                ...typography.styles.bodyM,
                color: colors.theme.primary450,
              }}>
                Evaluation Date
              </div>
              <div style={{
                flex: 1,
                ...typography.styles.bodyM,
                color: colors.theme.primary450,
                textAlign: 'center',
                marginLeft: '-10px',
              }}>
                Triangles
              </div>
              <div style={{
                width: '120px',
                ...typography.styles.bodyM,
                color: colors.theme.primary450,
                textAlign: 'left',
              }}>
                official valuation
              </div>
              <div style={{
                width: '70px',
                ...typography.styles.bodyM,
                color: colors.theme.primary450,
                textAlign: 'right',
              }}>
                Cashflow file
              </div>
            </div>

            {/* Status Rows */}
            <div style={{ flex: 1, overflow: 'auto' }}>
              {statusData.map((row, index) => (
                <StatusRow
                  key={index}
                  date={row.date}
                  triangleStatuses={row.triangleStatuses}
                  officialStatus={row.officialStatus}
                />
              ))}
            </div>

            {/* Add New Button */}
            <div style={{ padding: '20px 30px 26px 30px' }}>
              <Button
                variant="primary"
                color="white"
                icon={<AddMedium color={colors.blackAndWhite.black900} />}
                onClick={() => setIsUploadModalOpen(true)}
                style={{
                  border: `1px solid ${colors.theme.primary400}`,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  margin: '0',
                  padding: '12px 20px',
                  maxWidth: 'none',
                  minWidth: '100%',
                }}
              >
                Add New Valuation Data
              </Button>
            </div>
          </DashboardCard>
        </div>

        {/* Chart Section */}
        <ChartComponent />

        {/* Upload Triangles Modal */}
        <UploadTrianglesModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          programName={data.programName}
        />
      </Layout>
  );
};

export const ValuationDashboard: React.FC<ValuationDashboardProps> = (props) => {
  return (
    <ThemeProvider initialTheme="analytics">
      <ValuationDashboardContent {...props} />
    </ThemeProvider>
  );
};