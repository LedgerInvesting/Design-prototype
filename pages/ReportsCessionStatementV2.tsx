import React, { useState, useRef } from 'react';

// Import page components
import { Layout } from '@design-library/pages';

// Import design tokens
import { typography, borderRadius, shadows, useSemanticColors, colors as staticColors } from '@design-library/tokens';

// Import components
import { InfoTooltip, ChartTooltip, ButtonSelector, FormDropdown } from '@design-library/components';

// Import icons
import { ChevronDownExtraSmall, ChevronRightExtraSmall, S2ArrowRightSmall, S2ArrowRightMedium, ChevronLeftSmall, ChevronRightSmall } from '@design-library/icons';

// Import navigation utilities
import { createPageNavigationHandler } from '@design-library/utils/navigation';

// Import Recharts
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Import visx Sankey
import { Sankey, sankeyJustify, sankeyLinkHorizontal } from '@visx/sankey';
import { Group } from '@visx/group';

// Import prototype settings

/**
 * Chart colors for Sources and Uses of Cash
 *
 * INFLOWS (lighter colors) - money coming INTO the trust (positive values):
 * - Premium: light blue - from risk originators (Cedent / blue)
 * - Capital: light yellow - from investors (Reinsurer / orange)
 *
 * OUTFLOWS (darker colors) - money going OUT of the trust (negative values):
 * - Claims Paid: dark blue - paid to policyholders (Cedent / blue)
 * - Profit Commission: medium blue - paid when profitable (Cedent / blue)
 * - Investment Income: yellow - paid out to investors (Reinsurer / yellow)
 * - Dividends: gold - paid to investors (Reinsurer / yellow)
 */
const chartColors = {
  // INFLOWS (Cedent = blues, Reinsurer = yellows)
  premium:          { fill: '#E3F4FF', stroke: '#B8D9EE' },
  capital:          { fill: '#FFFDDD', stroke: '#E6E2B0' },

  // OUTFLOWS (Cedent = blues, Reinsurer = yellows)
  claimsPaid:       { fill: '#79CAFB', stroke: '#5AA8D8' },
  profitCommission: { fill: '#B5E3FF', stroke: '#8EC5DD' },
  investmentIncome: { fill: '#FFF4A5', stroke: '#E0D580' },
  dividends:        { fill: '#FFD666', stroke: '#D9B24A' },

  // Reference line
  expectedLoss: '#0F9342',
};

/**
 * Generate Sources and Uses of Cash data for a reinsurance trust account.
 *
 * VISUALIZATION APPROACH:
 * - All values are POSITIVE (nothing goes below zero)
 * - Inflows stack upward from the bottom
 * - Outflows stack on top of the remaining balance
 * - The gap between cumulative inflows and outflows = trust balance
 *
 * Lifecycle:
 * 1. Early: Premium & Capital flow in (balance builds)
 * 2. Middle: Balance peaks, claims begin
 * 3. Late: Claims & Dividends flow out (balance depletes)
 * 4. Final: Balance reaches exactly zero
 */
type ScenarioType = 'base' | 'conservative' | 'aggressive';

const scenarioParams: Record<ScenarioType, {
  totalPremium: number;
  totalCapital: number;
  totalClaimsPaid: number;
  totalProfitCommission: number;
  totalInvestmentIncome: number;
  totalDividends: number;
  expectedLossBase: number;
  expectedLossAmplitude: number;
}> = {
  base: {
    totalPremium: 50, totalCapital: 40,
    totalClaimsPaid: 50, totalProfitCommission: 8,
    totalInvestmentIncome: 10, totalDividends: 22,
    expectedLossBase: 30, expectedLossAmplitude: 12,
  },
  conservative: {
    totalPremium: 45, totalCapital: 35,
    totalClaimsPaid: 60, totalProfitCommission: 4,
    totalInvestmentIncome: 6, totalDividends: 10,
    expectedLossBase: 45, expectedLossAmplitude: 8,
  },
  aggressive: {
    totalPremium: 60, totalCapital: 50,
    totalClaimsPaid: 40, totalProfitCommission: 14,
    totalInvestmentIncome: 16, totalDividends: 40,
    expectedLossBase: 20, expectedLossAmplitude: 15,
  },
};

const generateChartData = (scenario: ScenarioType = 'base') => {
  const months = 24;
  const data = [];

  const params = scenarioParams[scenario];

  // Total amounts (inflows = outflows for zero final balance)
  const totalPremium = params.totalPremium;
  const totalCapital = params.totalCapital;

  const totalClaimsPaid = params.totalClaimsPaid;
  const totalProfitCommission = params.totalProfitCommission;
  const totalInvestmentIncome = params.totalInvestmentIncome;
  const totalDividends = params.totalDividends;

  // Verify: 50 + 40 = 90 inflows = 50 + 8 + 10 + 22 = 90 outflows ✓

  for (let month = 0; month <= months; month++) {
    const t = month / months; // Progress 0 to 1

    // === CUMULATIVE INFLOWS (all positive) ===

    // Premium: front-loaded, 90% collected by month 12
    const premiumCurve = 1 - Math.pow(1 - Math.min(t * 2, 1), 3);
    const premium = totalPremium * premiumCurve;

    // Capital: very front-loaded, 95% by month 6
    const capitalCurve = 1 - Math.pow(1 - Math.min(t * 4, 1), 4);
    const capital = totalCapital * capitalCurve;

    // Investment Income: accumulates steadily, slightly front-loaded (reaches total at t=1)
    const investmentIncome = totalInvestmentIncome * (1 - Math.pow(1 - t, 1.8));

    // === CUMULATIVE OUTFLOWS (all positive values) ===

    // Claims Paid: starts slow at 15%, accelerates, back-loaded
    const claimsStart = 0.15;
    const claimsT = Math.max(0, (t - claimsStart) / (1 - claimsStart));
    const claimsPaid = totalClaimsPaid * Math.pow(claimsT, 1.8);

    // Profit Commission: starts at 35%, moderate pace
    const commissionStart = 0.35;
    const commissionT = Math.max(0, (t - commissionStart) / (1 - commissionStart));
    const profitCommission = totalProfitCommission * Math.pow(commissionT, 2);

    // Dividends: starts at 45%, back-loaded
    const dividendStart = 0.45;
    const dividendT = Math.max(0, (t - dividendStart) / (1 - dividendStart));
    const dividends = totalDividends * Math.pow(dividendT, 2.5);

    // Calculate totals
    const totalInflowsValue = premium + capital;
    const totalOutflowsValue = claimsPaid + profitCommission + investmentIncome + dividends;
    const trustBalance = totalInflowsValue - totalOutflowsValue;

    // Expected ultimate loss reference line
    const expectedLoss = params.expectedLossBase + Math.sin(t * Math.PI * 0.7) * params.expectedLossAmplitude;

    // Format date
    const monthNum = (month % 12) + 1;
    const year = 2024 + Math.floor(month / 12);

    data.push({
      month,
      date: `${String(monthNum).padStart(2, '0')}/${String(year).slice(-2)}`,

      // INFLOWS - cumulative positive values (stack from bottom)
      premium: Math.round(premium * 10) / 10,
      capital: Math.round(capital * 10) / 10,

      // OUTFLOWS - cumulative positive values (for separate display)
      claimsPaid: Math.round(claimsPaid * 10) / 10,
      profitCommission: Math.round(profitCommission * 10) / 10,
      investmentIncome: Math.round(investmentIncome * 10) / 10,
      dividends: Math.round(dividends * 10) / 10,

      // Totals for tooltip and visualization
      totalInflows: Math.round(totalInflowsValue * 10) / 10,
      totalOutflows: Math.round(totalOutflowsValue * 10) / 10,
      trustBalance: Math.round(trustBalance * 10) / 10,
      expectedLoss: Math.round(expectedLoss * 10) / 10,
    });
  }

  return data;
};

// Pre-generate chart data for all scenarios
const chartDataByScenario: Record<ScenarioType, ReturnType<typeof generateChartData>> = {
  base: generateChartData('base'),
  conservative: generateChartData('conservative'),
  aggressive: generateChartData('aggressive'),
};

/**
 * Sankey node color mapping - reuses existing chartColors
 */
const sankeyNodeColors: Record<string, { fill: string; stroke: string }> = {
  'Premium':            chartColors.premium,
  'Capital':            chartColors.capital,
  'Trust Account':      { fill: '#D6EDFF', stroke: '#8EC5DD' },
  'Claims Paid':        chartColors.claimsPaid,
  'Profit Commission':  chartColors.profitCommission,
  'Investment Income':  chartColors.investmentIncome,
  'Dividends':          chartColors.dividends,
};

/**
 * Generate Sankey data from chart data for a specific period.
 *
 * Structure:
 *   Premium ----\                    /---- Claims Paid
 *                >-- Trust Account --<--- Profit Commission
 *   Capital ----/                    \---- Investment Income
 *                                     \--- Dividends
 */
const generateSankeyData = (
  periodMonth: number,
  periodYear: number,
  showTrustAccount: boolean,
  showCedent: boolean,
  showReinsurer: boolean,
) => {
  const periodIndex = periodToIndex(periodMonth, periodYear);
  const baseData = chartDataByScenario.base;
  const clampedIndex = Math.max(0, Math.min(baseData.length - 1, periodIndex));
  const dataPoint = baseData[clampedIndex];

  const nodes: Array<{ name: string }> = [
    { name: 'Premium' },            // 0
    { name: 'Capital' },            // 1
    { name: 'Trust Account' },      // 2
    { name: 'Claims Paid' },        // 3
    { name: 'Profit Commission' },  // 4
    { name: 'Investment Income' },  // 5
    { name: 'Dividends' },          // 6
  ];

  const links: Array<{ source: number; target: number; value: number }> = [];

  // Inflows -> Trust Account
  if (showTrustAccount || showCedent) {
    if (dataPoint.premium > 0) {
      links.push({ source: 0, target: 2, value: dataPoint.premium });
    }
  }
  if (showTrustAccount || showReinsurer) {
    if (dataPoint.capital > 0) {
      links.push({ source: 1, target: 2, value: dataPoint.capital });
    }
  }

  // Trust Account -> Outflows
  if (showCedent) {
    if (dataPoint.claimsPaid > 0) {
      links.push({ source: 2, target: 3, value: dataPoint.claimsPaid });
    }
    if (dataPoint.profitCommission > 0) {
      links.push({ source: 2, target: 4, value: dataPoint.profitCommission });
    }
  }
  if (showReinsurer) {
    if (dataPoint.investmentIncome > 0) {
      links.push({ source: 2, target: 5, value: dataPoint.investmentIncome });
    }
    if (dataPoint.dividends > 0) {
      links.push({ source: 2, target: 6, value: dataPoint.dividends });
    }
  }

  return { nodes, links };
};

/**
 * Sankey chart component for Sources and Uses of Cash
 */
interface CessionSankeyChartProps {
  currentPeriod: { month: number; year: number };
  showTrustAccount: boolean;
  showCedent: boolean;
  showReinsurer: boolean;
}

const SANKEY_HEIGHT = 320;
const SANKEY_MARGIN = { top: 10, right: 120, bottom: 10, left: 120 };

const CessionSankeyChart: React.FC<CessionSankeyChartProps> = ({
  currentPeriod,
  showTrustAccount,
  showCedent,
  showReinsurer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(900);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    setContainerWidth(containerRef.current.offsetWidth);
    return () => observer.disconnect();
  }, []);

  const sankeyData = generateSankeyData(
    currentPeriod.month,
    currentPeriod.year,
    showTrustAccount,
    showCedent,
    showReinsurer,
  );

  if (sankeyData.links.length === 0) {
    return (
      <div ref={containerRef} style={{
        height: SANKEY_HEIGHT,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          ...typography.styles.bodyM,
          color: staticColors.blackAndWhite.black500,
        }}>
          No flow data for the selected filters
        </span>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <svg width={containerWidth} height={SANKEY_HEIGHT}>
        <Sankey
          root={sankeyData}
          size={[
            containerWidth - SANKEY_MARGIN.left - SANKEY_MARGIN.right,
            SANKEY_HEIGHT - SANKEY_MARGIN.top - SANKEY_MARGIN.bottom,
          ]}
          nodeAlign={sankeyJustify}
          nodePadding={16}
          nodeWidth={20}
        >
          {({ graph, createPath }) => (
            <Group top={SANKEY_MARGIN.top} left={SANKEY_MARGIN.left}>
              {/* Links */}
              {graph.links.map((link, i) => {
                const sourceName = (link.source as any).name || '';
                const targetName = (link.target as any).name || '';
                const linkColor = sourceName === 'Trust Account'
                  ? (sankeyNodeColors[targetName]?.fill || '#ccc')
                  : (sankeyNodeColors[sourceName]?.fill || '#ccc');

                return (
                  <path
                    key={`link-${i}`}
                    d={createPath(link) || ''}
                    fill="none"
                    stroke={linkColor}
                    strokeWidth={Math.max(1, link.width || 0)}
                    strokeOpacity={0.6}
                    style={{ transition: 'stroke-opacity 0.2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.strokeOpacity = '0.85'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.strokeOpacity = '0.6'; }}
                  />
                );
              })}

              {/* Nodes */}
              {graph.nodes.map((node, i) => {
                const name = (node as any).name || '';
                const x0 = node.x0 || 0;
                const x1 = node.x1 || 0;
                const y0 = node.y0 || 0;
                const y1 = node.y1 || 0;
                const width = x1 - x0;
                const height = y1 - y0;

                if (height < 1) return null;

                const nodeColor = sankeyNodeColors[name] || { fill: '#ccc', stroke: '#999' };
                const isInflow = name === 'Premium' || name === 'Capital';
                const isCenterNode = name === 'Trust Account';
                const nodeValue = (node as any).value || 0;

                return (
                  <g key={`node-${i}`}>
                    <rect
                      x={x0}
                      y={y0}
                      width={width}
                      height={height}
                      fill={nodeColor.fill}
                      stroke={nodeColor.stroke}
                      strokeWidth={1}
                      rx={4}
                      ry={4}
                    />
                    <text
                      x={isInflow ? x0 - 8 : isCenterNode ? x0 + width / 2 : x1 + 8}
                      y={y0 + height / 2 - 8}
                      textAnchor={isInflow ? 'end' : isCenterNode ? 'middle' : 'start'}
                      dominantBaseline="central"
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        fill: staticColors.blackAndWhite.black900,
                      }}
                    >
                      {name}
                    </text>
                    <text
                      x={isInflow ? x0 - 8 : isCenterNode ? x0 + width / 2 : x1 + 8}
                      y={y0 + height / 2 + 8}
                      textAnchor={isInflow ? 'end' : isCenterNode ? 'middle' : 'start'}
                      dominantBaseline="central"
                      style={{
                        fontSize: '10px',
                        fill: staticColors.blackAndWhite.black500,
                      }}
                    >
                      ${nodeValue.toFixed(1)}M
                    </text>
                  </g>
                );
              })}
            </Group>
          )}
        </Sankey>
      </svg>
    </div>
  );
};

/**
 * Chart legend item
 */
interface LegendItemProps {
  color: string;
  label: string;
  isDashed?: boolean;
}

const LegendItem: React.FC<LegendItemProps> = ({ color, label, isDashed }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    {isDashed ? (
      <div style={{
        width: '16px',
        height: '2px',
        backgroundImage: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 4px, transparent 4px, transparent 8px)`,
      }} />
    ) : (
      <div style={{
        width: '12px',
        height: '12px',
        backgroundColor: color,
        borderRadius: '2px',
      }} />
    )}
    <span style={{
      ...typography.styles.bodyS,
      color: staticColors.blackAndWhite.black700,
    }}>
      {label}
    </span>
  </div>
);

/**
 * Convert a period {month, year} to a chart index (0-24)
 */
const CHART_MONTHS = 24;
const CHART_START_YEAR = 2024;

const periodToIndex = (month: number, year: number): number => {
  return (year - CHART_START_YEAR) * 12 + (month - 1);
};

const indexToPeriod = (index: number): { month: number; year: number } => {
  const clamped = Math.max(0, Math.min(CHART_MONTHS, Math.round(index)));
  return {
    month: (clamped % 12) + 1,
    year: CHART_START_YEAR + Math.floor(clamped / 12),
  };
};

/**
 * Period scrubber component (draggable circle with chevrons)
 */
interface PeriodScrubberProps {
  currentPeriod: { month: number; year: number };
  onPeriodChange: (period: { month: number; year: number }) => void;
  onDragStateChange?: (isDragging: boolean) => void;
}

const PeriodScrubber: React.FC<PeriodScrubberProps> = ({ currentPeriod, onPeriodChange, onDragStateChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Derive position from current period
  const position = (periodToIndex(currentPeriod.month, currentPeriod.year) / CHART_MONTHS) * 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    onDragStateChange?.(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const index = (percentage / 100) * CHART_MONTHS;
    onPeriodChange(indexToPeriod(index));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onDragStateChange?.(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 72,
        right: 30,
        bottom: 35,
        pointerEvents: 'none',
      }}
    >
      {/* Vertical indicator line - constrained to chart plot area */}
      <div style={{
        position: 'absolute',
        left: `${position}%`,
        top: 20,
        bottom: 30,
        width: '1.5px',
        backgroundColor: staticColors.blackAndWhite.black900,
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} />
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          left: `${position}%`,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '36px',
          height: '36px',
          backgroundColor: staticColors.blackAndWhite.white,
          borderRadius: '50%',
          boxShadow: shadows.medium,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'ew-resize',
          pointerEvents: 'auto',
          zIndex: 10,
        }}
      >
        <span style={{ display: 'flex', transform: 'rotate(180deg)' }}><ChevronRightExtraSmall color={staticColors.blackAndWhite.black900} /></span>
        <ChevronRightExtraSmall color={staticColors.blackAndWhite.black900} />
      </div>
    </div>
  );
};

/**
 * Period navigation component
 */
interface PeriodNavigationProps {
  currentPeriod: { month: number; year: number };
  onPrevious: () => void;
  onNext: () => void;
}

const PeriodNavigation: React.FC<PeriodNavigationProps> = ({ currentPeriod, onPrevious, onNext }) => {
  const formattedPeriod = `${String(currentPeriod.month).padStart(2, '0')}/${String(currentPeriod.year).slice(-2)}`;

  const iconButtonStyle: React.CSSProperties = {
    background: staticColors.blackAndWhite.white,
    border: 'none',
    borderRadius: borderRadius[8],
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: shadows.small,
    transition: 'transform 0.1s ease',
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <button
        onClick={onPrevious}
        style={iconButtonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <div style={{ transform: 'rotate(180deg)', display: 'flex' }}>
          <S2ArrowRightSmall color={staticColors.blackAndWhite.black900} />
        </div>
      </button>
      <span style={{
        ...typography.styles.headlineH2,
        color: staticColors.blackAndWhite.black900,
        minWidth: '80px',
        textAlign: 'center',
      }}>
        {formattedPeriod}
      </span>
      <button
        onClick={onNext}
        style={iconButtonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <S2ArrowRightSmall color={staticColors.blackAndWhite.black900} />
      </button>
    </div>
  );
};

/**
 * Calculation breakdown line item
 */
interface CalculationLine {
  lineNumber: number;
  variable: string;
  value: string;
  source?: string;
  isFinal?: boolean;
}

/**
 * Accordion row data
 */
interface AccordionRowData {
  id: string;
  variable: string;
  priorPeriod: number;
  currentPeriod: number;
  change: number;
  tooltipContent?: string;
  calculationBreakdown?: CalculationLine[];
  group: 'grouped' | 'white';
  groupIndex: number; // 1, 2, 3, or 4
  isSpecial?: boolean; // For the final "Payment Due" row
}

/**
 * Accordion row component
 */
interface AccordionRowProps {
  data: AccordionRowData;
  isExpanded: boolean;
  onToggle: () => void;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
  showTopDivider?: boolean;
}

const AccordionRow: React.FC<AccordionRowProps> = ({
  data,
  isExpanded,
  onToggle,
  isFirstInGroup,
  isLastInGroup,
  showTopDivider,
}) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatChangeValue = (value: number) => {
    const absValue = Math.abs(value);
    return absValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getChangePrefix = (value: number) => {
    if (value > 0) return '+';
    if (value < 0) return '-';
    return '';
  };

  const getPrefixColor = (value: number) => {
    if (value > 0) return staticColors.analytics.green900;
    if (value < 0) return staticColors.error.textAndStrokes;
    return staticColors.blackAndWhite.black800;
  };

  const getValueColor = (value: number) => {
    if (value === 0) return staticColors.blackAndWhite.black800;
    return staticColors.blackAndWhite.black800;
  };

  // Use #FBFBFB for grouped rows, white for standalone
  const groupedBackground = '#FBFBFB';
  const backgroundColor = data.group === 'grouped'
    ? groupedBackground
    : staticColors.blackAndWhite.white;

  // Special row (last item) has white background with border and shadow
  const specialBackground = data.isSpecial
    ? staticColors.blackAndWhite.white
    : backgroundColor;

  // Border radius for grouped rows
  const getBorderRadius = () => {
    if (data.isSpecial) return borderRadius[12];
    if (isFirstInGroup && isLastInGroup) return borderRadius[12];
    if (isFirstInGroup) return `${borderRadius[12]} ${borderRadius[12]} 0 0`;
    if (isLastInGroup) return `0 0 ${borderRadius[12]} ${borderRadius[12]}`;
    return '0';
  };

  return (
    <div style={{
      backgroundColor: specialBackground,
      borderRadius: getBorderRadius(),
      overflow: 'hidden',
      ...(data.isSpecial && {
        border: '1px solid #EDF2F4',
        boxShadow: shadows.small,
      }),
    }}>
      {/* Divider line between items in the same group */}
      {showTopDivider && (
        <div style={{
          height: '1px',
          backgroundColor: '#EDF2F4',
          margin: '0 24px',
        }} />
      )}
      {/* Main row */}
      <div
        onClick={onToggle}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 180px 180px 180px 40px',
          alignItems: 'center',
          padding: '20px 24px',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (!data.isSpecial) {
            e.currentTarget.style.backgroundColor = '#F5F5F5';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {/* Variable name with tooltip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            ...typography.styles.bodyM,
            color: staticColors.blackAndWhite.black900,
          }}>
            {data.variable}
          </span>
          <InfoTooltip text={data.tooltipContent || "Additional information about this value"} />
        </div>

        {/* Prior Period */}
        <span style={{
          ...typography.styles.bodyS,
          color: staticColors.blackAndWhite.black500,
          textAlign: 'right',
        }}>
          {formatCurrency(data.priorPeriod)}
        </span>

        {/* Current Period */}
        <span style={{
          ...typography.styles.bodyS,
          color: staticColors.blackAndWhite.black500,
          textAlign: 'right',
        }}>
          {formatCurrency(data.currentPeriod)}
        </span>

        {/* Change */}
        <div style={{
          ...typography.styles.bodyL,
          textAlign: 'right',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '4px',
        }}>
          {getChangePrefix(data.change) && (
            <span style={{ color: getPrefixColor(data.change) }}>
              {getChangePrefix(data.change)}
            </span>
          )}
          <span style={{ color: getValueColor(data.change) }}>
            {formatChangeValue(data.change)}
          </span>
        </div>

        {/* Expand/Collapse arrow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease',
          transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
        }}>
          <ChevronDownExtraSmall color={staticColors.blackAndWhite.black900} />
        </div>
      </div>

      {/* Expanded calculation breakdown */}
      {isExpanded && data.calculationBreakdown && (
        <div style={{
          padding: '0 24px 20px 24px',
        }}>
          <div style={{
            backgroundColor: staticColors.blackAndWhite.white,
            borderRadius: borderRadius[8],
            padding: '16px',
            boxShadow: shadows.small,
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}>
            <thead>
              <tr>
                <th style={{
                  ...typography.styles.bodyM,
                  color: staticColors.blackAndWhite.black800,
                  textAlign: 'left',
                  padding: '8px 12px',
                }}>
                  Variable
                </th>
                <th style={{
                  ...typography.styles.bodyM,
                  color: staticColors.blackAndWhite.black800,
                  textAlign: 'right',
                  padding: '8px 12px',
                  width: '180px',
                }}>
                  Value
                </th>
                <th style={{
                  ...typography.styles.bodyM,
                  color: staticColors.blackAndWhite.black800,
                  textAlign: 'right',
                  padding: '8px 12px',
                  width: '372px',
                }}>
                  Source
                </th>
              </tr>
            </thead>
            <tbody>
              {data.calculationBreakdown.map((line, idx) => (
                <tr key={line.lineNumber} style={{
                  borderTop: idx > 0 ? '1px solid #EDF2F4' : 'none',
                }}>
                  <td style={{
                    ...typography.styles.bodyM,
                    color: staticColors.blackAndWhite.black500,
                    padding: '13px 12px',
                  }}>
                    {line.variable}
                  </td>
                  <td style={{
                    ...typography.styles.bodyM,
                    color: staticColors.blackAndWhite.black500,
                    padding: '13px 12px',
                    textAlign: 'right',
                  }}>
                    {line.value}
                  </td>
                  <td style={{
                    ...typography.styles.bodyM,
                    color: staticColors.blackAndWhite.black500,
                    padding: '13px 12px',
                    textAlign: 'right',
                  }}>
                    {line.source || ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Reports Cession Statement V2 page props
 */
interface CessionStatementV2Props {
  onNavigateToPage?: (page: string, data?: any) => void;
  entityData?: {
    id: string;
    name: string;
    type: string;
    path: string;
  } | null;
  source?: 'bdx-upload' | 'reports-explorer';
}

// Row metadata (static info that doesn't change with period)
interface RowMetadata {
  id: string;
  variable: string;
  tooltipContent: string;
  groupIndex: number; // 1, 2, 3, or 4 (standalone)
  isSpecial?: boolean;
}

const rowMetadata: RowMetadata[] = [
  // Group 1 - First 5 items
  { id: '1', variable: 'Reinsurance Premium', tooltipContent: 'Total premium ceded to reinsurer after commissions and fees', groupIndex: 1 },
  { id: '2', variable: 'Reinsured Paid Claims', tooltipContent: 'Total claims paid by the reinsurer', groupIndex: 1 },
  { id: '3', variable: 'Reinsured Loss Adjustment Expense', tooltipContent: 'Expenses incurred in adjusting and settling claims', groupIndex: 1 },
  { id: '4', variable: 'Reinsurance Loss Adjustment Expense', tooltipContent: 'Reinsurer share of loss adjustment expenses', groupIndex: 1 },
  { id: '5', variable: 'Profit Commission', tooltipContent: 'Commission paid based on profitability of the business', groupIndex: 1 },
  // Group 2 - Next 2 items
  { id: '6', variable: 'Net Reinsurance Settlement', tooltipContent: 'Net amount after all premium and claim transactions', groupIndex: 2 },
  { id: '7', variable: 'Manual Adjustment', tooltipContent: 'Manual adjustments made to the settlement', groupIndex: 2 },
  // Group 3 - Next 2 items
  { id: '8', variable: 'Net Reinsurance Settlement Adjustment', tooltipContent: 'Net settlement after manual adjustments', groupIndex: 3 },
  { id: '9', variable: 'Net Settlement Actual', tooltipContent: 'Actual settlement amount transferred', groupIndex: 3 },
  // Group 4 - Standalone final item
  { id: '10', variable: 'Payment Due from (to) Cedent', tooltipContent: 'Final balance due from or to the cedent', groupIndex: 4, isSpecial: true },
];

// Monthly data type
interface MonthlyData {
  [rowId: string]: number;
}

// Generate fake data for different months (key format: "MM/YYYY")
const generateMonthlyData = (): Record<string, MonthlyData> => {
  const data: Record<string, MonthlyData> = {};

  // Base values that will be varied per month
  const baseValues: MonthlyData = {
    '1': 13400000,  // Reinsurance Premium
    '2': 4000000,   // Reinsured Paid Claims
    '3': 640000,    // Reinsured Loss Adjustment Expense
    '4': 1000000,   // Reinsurance Loss Adjustment Expense
    '5': 480000,    // Profit Commission
    '6': 7280000,   // Net Reinsurance Settlement
    '7': 1000000,   // Manual Adjustment
    '8': 6280000,   // Net Reinsurance Settlement Adjustment
    '9': 5000000,   // Net Settlement Actual
    '10': 1280000,  // Payment Due from (to) Cedent
  };

  // Generate data for 24 months (2024-2025)
  for (let year = 2024; year <= 2025; year++) {
    for (let month = 1; month <= 12; month++) {
      const key = `${month}/${year}`;
      const monthData: MonthlyData = {};

      // Add some variation based on month and year
      const seasonalFactor = 1 + (Math.sin((month - 1) * Math.PI / 6) * 0.15); // Seasonal variation
      const yearFactor = year === 2025 ? 1.08 : 1; // 8% growth in 2025
      const randomFactor = 0.95 + (Math.random() * 0.1); // Small random variation

      Object.keys(baseValues).forEach(id => {
        const base = baseValues[id];
        let value = Math.round(base * seasonalFactor * yearFactor * randomFactor);

        // Some specific adjustments
        if (id === '5') { // Profit Commission - sometimes zero
          value = month % 3 === 0 ? value : Math.round(value * 0.3);
        }
        if (id === '7') { // Manual Adjustment - often stable
          value = Math.round(baseValues['7'] * (0.9 + Math.random() * 0.2));
        }

        monthData[id] = value;
      });

      data[key] = monthData;
    }
  }

  return data;
};

const monthlyDataStore = generateMonthlyData();

// Get data for a specific period
const getDataForPeriod = (month: number, year: number): AccordionRowData[] => {
  const currentKey = `${month}/${year}`;
  const priorMonth = month === 1 ? 12 : month - 1;
  const priorYear = month === 1 ? year - 1 : year;
  const priorKey = `${priorMonth}/${priorYear}`;

  const currentData = monthlyDataStore[currentKey] || monthlyDataStore['8/2025'];
  const priorData = monthlyDataStore[priorKey] || monthlyDataStore['7/2025'];

  return rowMetadata.map((meta, index) => {
    const currentValue = currentData[meta.id] || 0;
    const priorValue = priorData[meta.id] || 0;
    const change = currentValue - priorValue;

    // Determine group type for styling
    const groupType: 'grouped' | 'white' = meta.groupIndex <= 3 ? 'grouped' : 'white';

    // Build calculation breakdown for first two rows as examples
    let calculationBreakdown: CalculationLine[] | undefined;

    if (meta.id === '1') {
      const grossPremium = Math.round(currentValue * 7.46);
      const limitedPremium = Math.round(grossPremium * 0.99);
      const premiumLimit = 80000000;
      const cededPremium = Math.round(currentValue * 1.49);
      calculationBreakdown = [
        { lineNumber: 1, variable: 'sum of [Gross Collected Premium] by policy', value: grossPremium.toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Insurance Data' },
        { lineNumber: 2, variable: 'sum of [Gross Collected Premium Limited] by policy', value: limitedPremium.toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Insurance Data' },
        { lineNumber: 3, variable: 'Premium Limit', value: premiumLimit.toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Contract Data' },
        { lineNumber: 4, variable: 'Quota Share %', value: '20%', source: 'Contract Data' },
        { lineNumber: 5, variable: 'Ceded Collected Premium', value: cededPremium.toLocaleString('en-US', { minimumFractionDigits: 2 }) },
        { lineNumber: 6, variable: 'Ceding Commission', value: '32%', source: 'Contract Data' },
        { lineNumber: 7, variable: 'FET', value: '1%', source: 'Contract Data' },
        { lineNumber: 8, variable: 'Reinsurance Premium', value: currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 }), isFinal: true },
      ];
    } else if (meta.id === '2') {
      const totalClaims = Math.round(currentValue * 5);
      calculationBreakdown = [
        { lineNumber: 1, variable: 'sum of [Paid Claims] by policy', value: totalClaims.toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Insurance Data' },
        { lineNumber: 2, variable: 'Quota Share %', value: '20%', source: 'Contract Data' },
        { lineNumber: 3, variable: 'Reinsured Paid Claims', value: currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 }), isFinal: true },
      ];
    } else if (meta.id === '3') {
      const totalLAE = Math.round(currentValue * 5);
      calculationBreakdown = [
        { lineNumber: 1, variable: 'sum of [Loss Adjustment Expenses] by policy', value: totalLAE.toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Insurance Data' },
        { lineNumber: 2, variable: 'Quota Share %', value: '20%', source: 'Contract Data' },
        { lineNumber: 3, variable: 'Reinsured Loss Adjustment Expense', value: currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 }), isFinal: true },
      ];
    } else if (meta.id === '4') {
      const totalReinsLAE = Math.round(currentValue * 5);
      calculationBreakdown = [
        { lineNumber: 1, variable: 'sum of [Reinsurance LAE] by policy', value: totalReinsLAE.toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Insurance Data' },
        { lineNumber: 2, variable: 'Quota Share %', value: '20%', source: 'Contract Data' },
        { lineNumber: 3, variable: 'Reinsurance Loss Adjustment Expense', value: currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 }), isFinal: true },
      ];
    } else if (meta.id === '5') {
      const netPremium = currentData['1'] || 0;
      const lossRatio = Math.round(((currentData['2'] || 0) / netPremium) * 100);
      calculationBreakdown = [
        { lineNumber: 1, variable: 'Net Reinsurance Premium', value: netPremium.toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Row 1' },
        { lineNumber: 2, variable: 'Loss Ratio', value: `${lossRatio}%`, source: 'Calculated' },
        { lineNumber: 3, variable: 'Profit Commission Rate', value: '25%', source: 'Contract Data' },
        { lineNumber: 4, variable: 'Profit Commission', value: currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 }), isFinal: true },
      ];
    } else if (meta.id === '6') {
      calculationBreakdown = [
        { lineNumber: 1, variable: 'Reinsurance Premium', value: (currentData['1'] || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Row 1' },
        { lineNumber: 2, variable: 'Less: Reinsured Paid Claims', value: (currentData['2'] || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Row 2' },
        { lineNumber: 3, variable: 'Less: Reinsured LAE', value: (currentData['3'] || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Row 3' },
        { lineNumber: 4, variable: 'Less: Reinsurance LAE', value: (currentData['4'] || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Row 4' },
        { lineNumber: 5, variable: 'Less: Profit Commission', value: (currentData['5'] || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Row 5' },
        { lineNumber: 6, variable: 'Net Reinsurance Settlement', value: currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 }), isFinal: true },
      ];
    } else if (meta.id === '7') {
      calculationBreakdown = [
        { lineNumber: 1, variable: 'Adjustment Reference', value: 'ADJ-2025-001', source: 'Settlement System' },
        { lineNumber: 2, variable: 'Adjustment Type', value: 'Premium Correction', source: 'Settlement System' },
        { lineNumber: 3, variable: 'Manual Adjustment', value: currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 }), isFinal: true },
      ];
    } else if (meta.id === '8') {
      calculationBreakdown = [
        { lineNumber: 1, variable: 'Net Reinsurance Settlement', value: (currentData['6'] || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Row 6' },
        { lineNumber: 2, variable: 'Less: Manual Adjustment', value: (currentData['7'] || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Row 7' },
        { lineNumber: 3, variable: 'Net Reinsurance Settlement Adjustment', value: currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 }), isFinal: true },
      ];
    } else if (meta.id === '9') {
      calculationBreakdown = [
        { lineNumber: 1, variable: 'Settlement Reference', value: 'STL-2025-0842', source: 'Settlement System' },
        { lineNumber: 2, variable: 'Settlement Date', value: `${String(month).padStart(2, '0')}/15/${year}`, source: 'Settlement System' },
        { lineNumber: 3, variable: 'Net Settlement Actual', value: currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 }), isFinal: true },
      ];
    } else if (meta.id === '10') {
      calculationBreakdown = [
        { lineNumber: 1, variable: 'Net Reinsurance Settlement Adjustment', value: (currentData['8'] || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Row 8' },
        { lineNumber: 2, variable: 'Less: Net Settlement Actual', value: (currentData['9'] || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }), source: 'Row 9' },
        { lineNumber: 3, variable: 'Payment Due from (to) Cedent', value: currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 }), isFinal: true },
      ];
    }

    return {
      id: meta.id,
      variable: meta.variable,
      priorPeriod: priorValue,
      currentPeriod: currentValue,
      change,
      tooltipContent: meta.tooltipContent,
      calculationBreakdown,
      group: groupType,
      groupIndex: meta.groupIndex,
      isSpecial: meta.isSpecial,
    };
  });
};

export const ReportsCessionStatementV2: React.FC<CessionStatementV2Props> = ({ onNavigateToPage, entityData, source = 'bdx-upload' }) => {
  const colors = useSemanticColors();
  const [scenario, setScenario] = useState<ScenarioType>('base');
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [currentPeriod, setCurrentPeriod] = useState({ month: 8, year: 2025 });

  // Chart filter state - radio selection (one at a time, or all)
  const [chartFilter, setChartFilter] = useState<'all' | 'trust-account' | 'cedent' | 'reinsurer'>('all');

  // Derive visibility from selected filter
  const showTrustAccount = chartFilter === 'all' || chartFilter === 'trust-account';
  const showCedent = chartFilter === 'all' || chartFilter === 'cedent';
  const showReinsurer = chartFilter === 'all' || chartFilter === 'reinsurer';

  // Get data for the current period
  const periodData = getDataForPeriod(currentPeriod.month, currentPeriod.year);

  // Determine if coming from BDX upload flow or Reports Explorer
  const isFromBDXUpload = source === 'bdx-upload';

  // Use entity data passed from Reports Explorer, fallback to default
  const currentEntity = (entityData && entityData.name) ? entityData : {
    id: '',
    name: 'Cucumber GL Seasonal',
    type: 'Program',
    path: 'Cucumber GL Seasonal'
  };

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Reports', isActive: false },
    { label: currentEntity.name, isActive: false },
    { label: 'CESSION STATEMENT', isActive: true }
  ];

  // Back navigation
  const handleBackClick = () => {
    if (onNavigateToPage) {
      if (isFromBDXUpload) {
        onNavigateToPage('reports-cession-summary-generation');
      } else {
        onNavigateToPage('reports-explorer');
      }
    }
  };

  // Period navigation handlers
  const handlePreviousPeriod = () => {
    setCurrentPeriod(prev => {
      const idx = periodToIndex(prev.month, prev.year);
      if (idx <= 0) return prev;
      return indexToPeriod(idx - 1);
    });
  };

  const handleNextPeriod = () => {
    setCurrentPeriod(prev => {
      const idx = periodToIndex(prev.month, prev.year);
      if (idx >= CHART_MONTHS) return prev;
      return indexToPeriod(idx + 1);
    });
  };

  // Toggle row expansion
  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Group rows by their groupIndex for proper border radius
  const getGroupInfo = (index: number): { isFirst: boolean; isLast: boolean } => {
    const currentGroupIndex = periodData[index].groupIndex;
    const currentIsSpecial = periodData[index].isSpecial;

    // Standalone items (group 4) get their own rounding
    if (currentIsSpecial || currentGroupIndex === 4) {
      return { isFirst: true, isLast: true };
    }

    const prevGroupIndex = index > 0 ? periodData[index - 1].groupIndex : null;
    const nextGroupIndex = index < periodData.length - 1 ? periodData[index + 1].groupIndex : null;

    const isFirst = prevGroupIndex !== currentGroupIndex;
    const isLast = nextGroupIndex !== currentGroupIndex;

    return { isFirst, isLast };
  };

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      selectedSidebarItem="reports"
      selectedSidebarSubitem={isFromBDXUpload ? 'bdx-upload' : 'reports-explorer'}
      onNavigate={createPageNavigationHandler(onNavigateToPage!, 'reports-cession-statement-v2')}
      onInboxClick={() => {
        console.log('Inbox clicked');
      }}
      onBackClick={handleBackClick}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {/* Blue container for header, arrows and chart */}
        <div style={{
          backgroundColor: '#B3E5FF',
          borderRadius: borderRadius[12],
          padding: '40px 10px 10px 10px',
        }}>
          {/* Header with title and period navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            padding: '0 20px',
          }}>
            <h2 style={{
              ...typography.styles.headlineH2,
              color: staticColors.blackAndWhite.black900,
              margin: 0,
            }}>
              Cession Statement
            </h2>
            <PeriodNavigation
              currentPeriod={currentPeriod}
              onPrevious={handlePreviousPeriod}
              onNext={handleNextPeriod}
            />
          </div>

          {/* Chart section */}
          <div style={{
            backgroundColor: staticColors.blackAndWhite.white,
            borderRadius: borderRadius[12],
            padding: '24px',
          }}>
            {/* Filter toggles + chart mode toggle */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}>
              {/* Left: filter buttons */}
              <div style={{ display: 'flex', gap: '5px' }}>
                <ButtonSelector
                  label="All"
                  selectorType="radio"
                  name="chart-filter"
                  checked={chartFilter === 'all'}
                  onChange={() => setChartFilter('all')}
                />
                <ButtonSelector
                  label="Trust account"
                  selectorType="radio"
                  name="chart-filter"
                  checked={chartFilter === 'trust-account'}
                  onChange={() => setChartFilter('trust-account')}
                />
                <ButtonSelector
                  label="Cedent"
                  selectorType="radio"
                  name="chart-filter"
                  checked={chartFilter === 'cedent'}
                  onChange={() => setChartFilter('cedent')}
                />
                <ButtonSelector
                  label="Reinsurer"
                  selectorType="radio"
                  name="chart-filter"
                  checked={chartFilter === 'reinsurer'}
                  onChange={() => setChartFilter('reinsurer')}
                />
              </div>

              {/* Right: scenario dropdown */}
              <div style={{ width: '220px' }}>
                <FormDropdown
                  label="Scenario"
                  labelPosition="left"
                  showTooltip={false}
                  value={scenario}
                  options={[
                    { value: 'base', label: 'Base Case', description: 'Expected scenario with balanced inflows and outflows' },
                    { value: 'conservative', label: 'Conservative', description: 'Higher claims, lower dividends and profit commission' },
                    { value: 'aggressive', label: 'Aggressive', description: 'Lower claims, higher returns and capital deployment' },
                  ]}
                  onChange={(value) => setScenario(value as ScenarioType)}
                />
              </div>
            </div>

            {/* Divider between filters and legend */}
            <div style={{ height: '1px', backgroundColor: colors.theme.primary400 }} />

            {/* Legend */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '16px',
              alignItems: 'center',
              padding: '30px 30px 0 30px',
            }}>
              {/* Left: Party color key + Expected Loss */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, backgroundColor: chartColors.premium.fill }} />
                    <div style={{ flex: 1, backgroundColor: chartColors.profitCommission.fill }} />
                    <div style={{ flex: 1, backgroundColor: chartColors.claimsPaid.fill }} />
                  </div>
                  <span style={{ ...typography.styles.bodyS, color: staticColors.blackAndWhite.black500, fontWeight: 600 }}>Cedent</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, backgroundColor: chartColors.capital.fill }} />
                    <div style={{ flex: 1, backgroundColor: chartColors.investmentIncome.fill }} />
                    <div style={{ flex: 1, backgroundColor: chartColors.dividends.fill }} />
                  </div>
                  <span style={{ ...typography.styles.bodyS, color: staticColors.blackAndWhite.black500, fontWeight: 600 }}>Reinsurer</span>
                </div>
                {/* Reference */}
                <LegendItem color={chartColors.expectedLoss} label="Expected Loss" isDashed />
              </div>

              {/* Right: Inflows, Outflows */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {/* Inflows group */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ ...typography.styles.bodyS, color: staticColors.blackAndWhite.black300, fontWeight: 600 }}>Inflows:</span>
                  <LegendItem color={chartColors.premium.fill} label="Premium" />
                  <LegendItem color={chartColors.capital.fill} label="Capital" />
                </div>

                {/* Outflows group */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ ...typography.styles.bodyS, color: staticColors.blackAndWhite.black300, fontWeight: 600 }}>Outflows:</span>
                  <LegendItem color={chartColors.claimsPaid.fill} label="Claims" />
                  <LegendItem color={chartColors.profitCommission.fill} label="Commission" />
                  <LegendItem color={chartColors.investmentIncome.fill} label="Investment" />
                  <LegendItem color={chartColors.dividends.fill} label="Dividends" />
                </div>
              </div>
            </div>

            {/* Chart - Sources and Uses of Cash */}
            <div style={{ height: '350px', position: 'relative', overflow: 'visible' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartDataByScenario[scenario]}
                  margin={{ top: 20, right: 30, left: 10, bottom: 35 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={staticColors.blackAndWhite.black300} vertical={false} />

                  {/* === INFLOWS (stacked from bottom - light colors) === */}
                  {/* These represent cumulative money coming into the trust */}

                  {/* Premium - Cedent side inflow (blue), also part of Trust account */}
                  {(showTrustAccount || showCedent) && (
                    <Area
                      type="monotone"
                      dataKey="premium"
                      stackId="inflows"
                      stroke={chartColors.premium.stroke}
                      strokeWidth={1}
                      fill={chartColors.premium.fill}
                      fillOpacity={0.9}
                      name="Premium"
                    />
                  )}

                  {/* Capital - Reinsurer side inflow (orange), also part of Trust account */}
                  {(showTrustAccount || showReinsurer) && (
                    <Area
                      type="monotone"
                      dataKey="capital"
                      stackId="inflows"
                      stroke={chartColors.capital.stroke}
                      strokeWidth={1}
                      fill={chartColors.capital.fill}
                      fillOpacity={0.9}
                      name="Capital"
                    />
                  )}

                  {/* === OUTFLOWS (stacked separately - darker colors) === */}
                  {/* These represent cumulative money leaving the trust */}

                  {/* Claims & Commission - Cedent side outflows (blue) */}
                  {showCedent && (
                    <>
                      <Area
                        type="monotone"
                        dataKey="claimsPaid"
                        stackId="outflows"
                        stroke={chartColors.claimsPaid.stroke}
                        strokeWidth={1}
                        fill={chartColors.claimsPaid.fill}
                        fillOpacity={0.85}
                        name="Claims Paid"
                      />
                      <Area
                        type="monotone"
                        dataKey="profitCommission"
                        stackId="outflows"
                        stroke={chartColors.profitCommission.stroke}
                        strokeWidth={1}
                        fill={chartColors.profitCommission.fill}
                        fillOpacity={0.85}
                        name="Profit Commission"
                      />
                    </>
                  )}

                  {/* Investment, Dividends & Reserves - Reinsurer side outflows (orange) */}
                  {showReinsurer && (
                    <>
                      <Area
                        type="monotone"
                        dataKey="investmentIncome"
                        stackId="outflows"
                        stroke={chartColors.investmentIncome.stroke}
                        strokeWidth={1}
                        fill={chartColors.investmentIncome.fill}
                        fillOpacity={0.85}
                        name="Investment Income"
                      />
                      <Area
                        type="monotone"
                        dataKey="dividends"
                        stackId="outflows"
                        stroke={chartColors.dividends.stroke}
                        strokeWidth={1}
                        fill={chartColors.dividends.fill}
                        fillOpacity={0.85}
                        name="Dividends"
                      />
                    </>
                  )}

                  {/* Expected ultimate loss reference line */}
                  <Line
                    type="monotone"
                    dataKey="expectedLoss"
                    stroke={chartColors.expectedLoss}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Expected Ultimate Loss"
                  />

                  <XAxis
                    dataKey="date"
                    axisLine={{ stroke: staticColors.blackAndWhite.black900 }}
                    tickLine={{ stroke: staticColors.blackAndWhite.black300 }}
                    tick={{ fill: staticColors.blackAndWhite.black700, ...typography.styles.bodyS }}
                    interval={2}
                    label={{
                      value: 'X: Evaluation Date',
                      position: 'insideBottom',
                      offset: -25,
                      style: { fill: staticColors.blackAndWhite.black700, ...typography.styles.bodyS }
                    }}
                  />
                  <YAxis
                    axisLine={{ stroke: staticColors.blackAndWhite.black300 }}
                    tickLine={{ stroke: staticColors.blackAndWhite.black300 }}
                    tick={{ fill: staticColors.blackAndWhite.black700, ...typography.styles.bodyS }}
                    tickFormatter={(value) => `$${value}M`}
                    domain={[0, 'auto']}
                    label={{
                      value: 'Cumulative Cash ($M)',
                      angle: -90,
                      position: 'insideLeft',
                      offset: 0,
                      style: { fill: staticColors.blackAndWhite.black700, ...typography.styles.bodyS }
                    }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && !isScrubbing && payload && payload.length) {
                        const data = payload[0]?.payload;
                        const tooltipItems = [
                          { label: 'Premium', value: data?.premium, color: chartColors.premium.fill },
                          { label: 'Capital', value: data?.capital, color: chartColors.capital.fill },
                          { label: 'Claims', value: data?.claimsPaid, color: chartColors.claimsPaid.fill },
                          { label: 'Commission', value: data?.profitCommission, color: chartColors.profitCommission.fill },
                          { label: 'Investment', value: data?.investmentIncome, color: chartColors.investmentIncome.fill },
                          { label: 'Dividends', value: data?.dividends, color: chartColors.dividends.fill },
                        ];
                        return (
                          <div style={{
                            backgroundColor: colors.blackAndWhite.white,
                            padding: '12px',
                            borderRadius: borderRadius[8],
                            border: `1px solid ${colors.theme.primary400}`,
                            boxShadow: shadows.medium,
                          }}>
                            <p style={{
                              ...typography.styles.bodyM,
                              color: colors.blackAndWhite.black900,
                              margin: '0 0 8px 0',
                              fontWeight: 600,
                            }}>
                              {label}
                            </p>
                            {tooltipItems.map((item, index) => (
                              <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: index < tooltipItems.length - 1 ? '4px' : 0,
                              }}>
                                <div style={{
                                  width: '10px',
                                  height: '10px',
                                  backgroundColor: item.color,
                                  borderRadius: '2px',
                                }} />
                                <p style={{
                                  ...typography.styles.bodyM,
                                  color: colors.blackAndWhite.black500,
                                  margin: 0,
                                }}>
                                  {item.label}: ${item.value}M
                                </p>
                              </div>
                            ))}
                            {/* Expected Loss */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginTop: '8px',
                              paddingTop: '8px',
                              borderTop: `1px solid ${colors.blackAndWhite.black200}`,
                            }}>
                              <div style={{
                                width: '10px',
                                height: '2px',
                                backgroundImage: `repeating-linear-gradient(90deg, ${chartColors.expectedLoss} 0px, ${chartColors.expectedLoss} 3px, transparent 3px, transparent 6px)`,
                              }} />
                              <p style={{
                                ...typography.styles.bodyM,
                                color: chartColors.expectedLoss,
                                margin: 0,
                              }}>
                                Expected Loss: {data?.expectedLoss}%
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                    cursor={false}
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Period scrubber */}
              <PeriodScrubber
                currentPeriod={currentPeriod}
                onPeriodChange={setCurrentPeriod}
                onDragStateChange={setIsScrubbing}
              />
            </div>
          </div>
        </div>

        {/* Table section - outside blue box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 180px 180px 180px 40px',
            alignItems: 'center',
            padding: '12px 24px',
          }}>
            <span style={{
              ...typography.styles.bodyM,
              color: staticColors.blackAndWhite.black900,
            }}>
              Variable
            </span>
            <span style={{
              ...typography.styles.bodyM,
              color: staticColors.blackAndWhite.black900,
              textAlign: 'right',
            }}>
              Prior Period
            </span>
            <span style={{
              ...typography.styles.bodyM,
              color: staticColors.blackAndWhite.black900,
              textAlign: 'right',
            }}>
              Current Period
            </span>
            <span style={{
              ...typography.styles.bodyM,
              color: staticColors.blackAndWhite.black900,
              textAlign: 'right',
            }}>
              Change
            </span>
            <span></span>
          </div>

          {/* Accordion rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '8px' }}>
            {periodData.map((row, index) => {
              const { isFirst, isLast } = getGroupInfo(index);
              // Add margin top for first item of each group (except first group)
              const needsTopMargin = isFirst && index > 0;
              // Show divider between items in the same group (not on first item of group)
              const showTopDivider = !isFirst;
              return (
                <div key={row.id} style={{ marginTop: needsTopMargin ? '12px' : '0' }}>
                  <AccordionRow
                    data={row}
                    isExpanded={expandedRows.has(row.id)}
                    onToggle={() => toggleRow(row.id)}
                    isFirstInGroup={isFirst}
                    isLastInGroup={isLast}
                    showTopDivider={showTopDivider}
                  />
                </div>
              );
            })}
          </div>

          {/* Currency footer */}
          <div style={{
            marginTop: '16px',
            padding: '0 24px',
          }}>
            <span style={{
              ...typography.styles.captionS,
              color: staticColors.blackAndWhite.black500,
            }}>
              Currency: USD
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsCessionStatementV2;
