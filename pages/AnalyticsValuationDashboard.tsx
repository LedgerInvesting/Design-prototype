import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Layout } from '@design-library/pages';
import { Button, DashboardCard, ChartTooltip } from '@design-library/components';
import { typography, borderRadius, shadows } from '@design-library/tokens';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { SettingsMedium, DownloadSmall, ArrowUpSmall, ArrowDownSmall, CardsGraph, CardsText, AddMedium, ContractsLogo } from '@design-library/icons';
import { UploadTrianglesModal } from './UploadTrianglesModal';
import { useSettings } from '@design-library/contexts';
import { createPageNavigationHandler } from '@design-library/utils/navigation';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
        <div style={{ width: '120px', padding: '10px 0', display: 'flex', alignItems: 'center', gap: '12px', marginRight: '40px' }}>
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

  // Approximated data from Figma design
  // Uncertainty bands: inner (±5%) and outer (±10%) around mean
  const chartData = [
    {
      month: 'Mar 2024', paid: 0, reported: 30, mean: 65,
      outerBandBase: 55, outerBandHeight: 20, // 55 to 75 (mean ± 10%)
      innerBandBase: 60, innerBandHeight: 10  // 60 to 70 (mean ± 5%)
    },
    {
      month: 'May 2024', paid: 20, reported: 39, mean: 70,
      outerBandBase: 60, outerBandHeight: 20, // 60 to 80
      innerBandBase: 65, innerBandHeight: 10  // 65 to 75
    },
    {
      month: 'Jul 2024', paid: 25, reported: 50, mean: 78,
      outerBandBase: 68, outerBandHeight: 20, // 68 to 88
      innerBandBase: 73, innerBandHeight: 10  // 73 to 83
    },
    {
      month: 'Sep 2024', paid: 25, reported: 65, mean: 90,
      outerBandBase: 80, outerBandHeight: 20, // 80 to 100
      innerBandBase: 85, innerBandHeight: 10  // 85 to 95
    },
    {
      month: 'Nov 2024', paid: 30, reported: 80, mean: 95,
      outerBandBase: 85, outerBandHeight: 20, // 85 to 105
      innerBandBase: 90, innerBandHeight: 10  // 90 to 100
    },
    {
      month: 'Jan 2025', paid: 60, reported: 80, mean: 98,
      outerBandBase: 88, outerBandHeight: 20, // 88 to 108
      innerBandBase: 93, innerBandHeight: 10  // 93 to 103
    },
  ];

  return (
    <div style={{
      backgroundColor: colors.blackAndWhite.white,
      borderRadius: borderRadius[12],
      border: `1px solid ${colors.theme.primary400}`,
      overflow: 'visible',
      outline: 'none',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 30px',
        borderBottom: `1px solid ${colors.theme.primary400}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <CardsGraph color="#8b68f5" />
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

      {/* Chart */}
      <div style={{ height: '550px', overflow: 'visible', outline: 'none' }}>
        <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible', outline: 'none' }}>
          <ComposedChart data={chartData} margin={{ top: 50, right: 50, left: 15, bottom: 30 }} style={{ overflow: 'visible', outline: 'none' }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.theme.primary450} />

            <XAxis
              dataKey="month"
              stroke={colors.theme.primary450}
              axisLine={{ stroke: colors.blackAndWhite.black900 }}
              tick={{ fill: colors.blackAndWhite.black700, ...typography.styles.dataXS }}
              label={{
                value: 'Evaluation Date',
                position: 'insideBottom',
                offset: -10,
                style: { fill: colors.blackAndWhite.black700, ...typography.styles.dataXS }
              }}
            />
            <YAxis
              stroke={colors.theme.primary450}
              axisLine={{ stroke: colors.theme.primary450 }}
              tick={{ fill: colors.blackAndWhite.black700, ...typography.styles.dataXS }}
              tickFormatter={(value) => `${value}%`}
              label={{
                value: 'Loss Ratio',
                angle: -90,
                position: 'insideLeft',
                style: { fill: colors.blackAndWhite.black700, ...typography.styles.dataXS }
              }}
              domain={[0, 120]}
              ticks={[0, 20, 40, 60, 80, 100, 120]}
            />

            {/* Outer uncertainty band (±10%, lighter) */}
            <Area
              type="monotone"
              dataKey="outerBandBase"
              stroke="none"
              fill="transparent"
              stackId="outer"
            />
            <Area
              type="monotone"
              dataKey="outerBandHeight"
              stroke="none"
              fill="#64EF99"
              fillOpacity={0.3}
              stackId="outer"
            />

            {/* Inner uncertainty band (±5%, darker) */}
            <Area
              type="monotone"
              dataKey="innerBandBase"
              stroke="none"
              fill="transparent"
              stackId="inner"
            />
            <Area
              type="monotone"
              dataKey="innerBandHeight"
              stroke="none"
              fill="#64EF99"
              fillOpacity={0.6}
              stackId="inner"
            />

            {/* Lines */}
            <Line
              type="monotone"
              dataKey="mean"
              stroke="#0f9342"
              strokeWidth={2}
              dot={{ fill: '#0f9342', r: 4 }}
              activeDot={{ r: 6, fill: '#0f9342', stroke: colors.blackAndWhite.white, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="reported"
              stroke="#ffd028"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#ffd028', r: 4 }}
              activeDot={{ r: 6, fill: '#ffd028', stroke: colors.blackAndWhite.white, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="paid"
              stroke="#8b68f5"
              strokeWidth={2}
              dot={{ fill: '#8b68f5', r: 4 }}
              activeDot={{ r: 6, fill: '#8b68f5', stroke: colors.blackAndWhite.white, strokeWidth: 2 }}
            />

            <Tooltip content={<ChartTooltip />} cursor={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ValuationDashboardContent: React.FC<ValuationDashboardProps> = ({
  onNavigateToPage,
  valuationData
}) => {
  const colors = useSemanticColors();
  const settings = useSettings();

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
        onNavigate={createPageNavigationHandler(onNavigateToPage, 'analytics-valuation-dashboard')}
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
            {settings.appIntegration.showExtraCardButtons && (
              <div style={{
                marginTop: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: colors.theme.primary200,
                borderRadius: borderRadius[8],
                padding: '8px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = colors.theme.primary300;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = colors.theme.primary200;
              }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  backgroundColor: colors.blackAndWhite.black900,
                  borderRadius: borderRadius[4],
                }}>
                  <ContractsLogo color="#FFE671" />
                </div>
                <span style={{
                  ...typography.styles.bodyM,
                  color: colors.blackAndWhite.black900,
                  fontWeight: 500,
                  backgroundColor: 'transparent',
                }}>
                  Explore associated contracts
                </span>
              </div>
            )}
          </div>
          <Button
            variant="primary"
            color="black"
            icon={<SettingsMedium color={colors.blackAndWhite.white} />}
            onClick={() => onNavigateToPage('analytics-valuation-configuration', { programName: data.programName })}
            style={{
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
              onClick: () => onNavigateToPage('analytics-valuation-status')
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
                color: colors.blackAndWhite.black500,
              }}>
                Evaluation Date
              </div>
              <div style={{
                flex: 1,
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black500,
                textAlign: 'center',
                marginLeft: '-10px',
              }}>
                Triangles
              </div>
              <div style={{
                width: '120px',
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black500,
                textAlign: 'left',
                marginRight: '40px',
              }}>
                official valuation
              </div>
              <div style={{
                width: '70px',
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black500,
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
                variant="tertiary"
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

export const AnalyticsValuationDashboard: React.FC<ValuationDashboardProps> = (props) => {
  return (
    <ThemeProvider initialTheme="analytics">
      <ValuationDashboardContent {...props} />
    </ThemeProvider>
  );
};