import React, { useState, useRef, useEffect } from 'react';

// Inject custom scrollbar styles for program list and tooltip animation
const scrollbarStyles = `
  .program-list-scroll::-webkit-scrollbar {
    width: 6px;
  }
  .program-list-scroll::-webkit-scrollbar-track {
    background: #f2f8fb;
  }
  .program-list-scroll::-webkit-scrollbar-thumb {
    background: #000000;
    border-radius: 3px;
  }
  .program-list-scroll::-webkit-scrollbar-thumb:hover {
    background: #000000;
  }
  .program-list-scroll::-webkit-scrollbar-button {
    display: none;
  }

  @keyframes tooltipFadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleId = 'program-list-scrollbar-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = scrollbarStyles;
    document.head.appendChild(style);
  }
}
// Import page components
import { Layout, PageBanner } from '@design-library/pages';

// Import components
import { MenuDropdown, Button } from '@design-library/components';

// Import design tokens
import { useSemanticColors, typography, spacing, borderRadius, colors as staticColors, shadows } from '@design-library/tokens';

// Import navigation utilities
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';

// Import icons
import { SearchMedium } from '@design-library/icons';

// Enhanced program data available directly in component

// Import Recharts
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Import ChartCustomTick for inside axes
import { ChartCustomTick } from '@design-library/components';

interface Program {
  id: string;
  name: string;
  category: 1 | 2 | 3 | 4 | 5;
  currentLossRatio: number;
  quotaSharePremium: number;
  premium: number;
  lossRatio: number;
  quotaShare: number;
  grossWrittenPremium: number;
  grossEarnedPremium: number;
  paidLossRatio: number;
  reportedLossRatio: number;
  ultimateLossRatio: number;
  productLine: string;
}

interface ReportsInsightsExplorerProps {
  onNavigateToPage?: (page: string, data?: any) => void;
}

// Category colors matching Figma design
const categoryColors = {
  1: '#b8ffbe', // Green
  2: '#7dc1eb', // Blue
  3: '#15bf53', // Dark Green
  4: '#ffdd61', // Yellow
  5: '#ff8588', // Red/Pink
};

// Category names - updated to match our enhanced product lines
const categoryNames = {
  1: 'Property & Casualty',
  2: 'Specialty Lines',
  3: 'Energy & Marine',
  4: 'Financial & Professional',
  5: 'Agriculture & Surety',
};

// Product line to category mapping
const getProductLineCategory = (productLine: string): 1 | 2 | 3 | 4 | 5 => {
  const categoryMap: Record<string, 1 | 2 | 3 | 4 | 5> = {
    'Commercial Auto': 1,
    'Property': 1,
    'General Liability': 1,
    'Workers Compensation': 1,
    'Aviation': 2,
    'Cyber': 2,
    'Professional Indemnity': 2,
    'Management Liability': 2,
    'Marine': 3,
    'Energy': 3,
    'Transportation': 3,
    'Environmental': 4,
    'Financial Lines': 4,
    'Life Sciences': 4,
    'Trade Credit': 4,
    'Agriculture': 5,
    'Surety': 5,
    'Casualty': 1,
    'Product Liability': 1,
    'Warranty': 2
  };
  return categoryMap[productLine] || 2; // Default to Specialty Lines
};

// Enhanced program data directly from our 20 programs (same source as useTransactionsStable.ts)
const getAllEnhancedPrograms = (): Program[] => {
  const enhancedPrograms = [
    {
      id: 'prog-001', name: 'Commercial Auto Specialty Lines', quota_share: 27, gross_written_premium: 5920000, gross_earned_premium: 5910000,
      paid_loss_ratio: 58, reported_loss_ratio: 67, ultimate_loss_ratio: 104, product_line: 'Commercial Auto'
    },
    {
      id: 'prog-002', name: 'Workers Compensation Industrial', quota_share: 35, gross_written_premium: 7210000, gross_earned_premium: 7180000,
      paid_loss_ratio: 63, reported_loss_ratio: 75, ultimate_loss_ratio: 112, product_line: 'Workers Compensation'
    },
    {
      id: 'prog-003', name: 'General Liability Manufacturing', quota_share: 30, gross_written_premium: 6180000, gross_earned_premium: 6160000,
      paid_loss_ratio: 55, reported_loss_ratio: 64, ultimate_loss_ratio: 101, product_line: 'General Liability'
    },
    {
      id: 'prog-004', name: 'Property Catastrophe Regional', quota_share: 40, gross_written_premium: 8430000, gross_earned_premium: 8410000,
      paid_loss_ratio: 60, reported_loss_ratio: 72, ultimate_loss_ratio: 110, product_line: 'Property'
    },
    {
      id: 'prog-005', name: 'Marine Cargo International', quota_share: 25, gross_written_premium: 4820000, gross_earned_premium: 4790000,
      paid_loss_ratio: 52, reported_loss_ratio: 63, ultimate_loss_ratio: 99, product_line: 'Marine'
    },
    {
      id: 'prog-006', name: 'Professional Indemnity Technology', quota_share: 33, gross_written_premium: 6430000, gross_earned_premium: 6420000,
      paid_loss_ratio: 59, reported_loss_ratio: 69, ultimate_loss_ratio: 108, product_line: 'Professional Indemnity'
    },
    {
      id: 'prog-007', name: 'Directors Officers Liability', quota_share: 29, gross_written_premium: 5260000, gross_earned_premium: 5250000,
      paid_loss_ratio: 57, reported_loss_ratio: 66, ultimate_loss_ratio: 103, product_line: 'Management Liability'
    },
    {
      id: 'prog-008', name: 'Cyber Security Protection', quota_share: 31, gross_written_premium: 6950000, gross_earned_premium: 6940000,
      paid_loss_ratio: 64, reported_loss_ratio: 73, ultimate_loss_ratio: 115, product_line: 'Cyber'
    },
    {
      id: 'prog-009', name: 'Energy Oil Gas Upstream', quota_share: 37, gross_written_premium: 7820000, gross_earned_premium: 7800000,
      paid_loss_ratio: 61, reported_loss_ratio: 74, ultimate_loss_ratio: 111, product_line: 'Energy'
    },
    {
      id: 'prog-010', name: 'Aviation Hull War Risk', quota_share: 26, gross_written_premium: 5040000, gross_earned_premium: 5020000,
      paid_loss_ratio: 53, reported_loss_ratio: 62, ultimate_loss_ratio: 97, product_line: 'Aviation'
    },
    {
      id: 'prog-011', name: 'Casualty Umbrella Excess', quota_share: 38, gross_written_premium: 7540000, gross_earned_premium: 7530000,
      paid_loss_ratio: 62, reported_loss_ratio: 76, ultimate_loss_ratio: 114, product_line: 'Casualty'
    },
    {
      id: 'prog-012', name: 'Environmental Liability Pollution', quota_share: 22, gross_written_premium: 4460000, gross_earned_premium: 4450000,
      paid_loss_ratio: 49, reported_loss_ratio: 57, ultimate_loss_ratio: 92, product_line: 'Environmental'
    },
    {
      id: 'prog-013', name: 'Product Recall Food Safety', quota_share: 34, gross_written_premium: 7010000, gross_earned_premium: 7000000,
      paid_loss_ratio: 60, reported_loss_ratio: 70, ultimate_loss_ratio: 107, product_line: 'Product Liability'
    },
    {
      id: 'prog-014', name: 'Life Sciences Clinical Trials', quota_share: 20, gross_written_premium: 3920000, gross_earned_premium: 3910000,
      paid_loss_ratio: 47, reported_loss_ratio: 55, ultimate_loss_ratio: 88, product_line: 'Life Sciences'
    },
    {
      id: 'prog-015', name: 'Financial Lines Crime Fidelity', quota_share: 36, gross_written_premium: 8140000, gross_earned_premium: 8120000,
      paid_loss_ratio: 63, reported_loss_ratio: 78, ultimate_loss_ratio: 118, product_line: 'Financial Lines'
    },
    {
      id: 'prog-016', name: 'Trade Credit Political Risk', quota_share: 28, gross_written_premium: 5630000, gross_earned_premium: 5620000,
      paid_loss_ratio: 56, reported_loss_ratio: 65, ultimate_loss_ratio: 102, product_line: 'Trade Credit'
    },
    {
      id: 'prog-017', name: 'Surety Construction Bonds', quota_share: 41, gross_written_premium: 8760000, gross_earned_premium: 8740000,
      paid_loss_ratio: 65, reported_loss_ratio: 79, ultimate_loss_ratio: 120, product_line: 'Surety'
    },
    {
      id: 'prog-018', name: 'Agriculture Crop Livestock', quota_share: 23, gross_written_premium: 4620000, gross_earned_premium: 4600000,
      paid_loss_ratio: 50, reported_loss_ratio: 59, ultimate_loss_ratio: 95, product_line: 'Agriculture'
    },
    {
      id: 'prog-019', name: 'Transportation Motor Fleet', quota_share: 39, gross_written_premium: 7910000, gross_earned_premium: 7900000,
      paid_loss_ratio: 62, reported_loss_ratio: 73, ultimate_loss_ratio: 113, product_line: 'Transportation'
    },
    {
      id: 'prog-020', name: 'Warranty Extended Protection', quota_share: 24, gross_written_premium: 4980000, gross_earned_premium: 4960000,
      paid_loss_ratio: 54, reported_loss_ratio: 64, ultimate_loss_ratio: 100, product_line: 'Warranty'
    }
  ];

  return enhancedPrograms.map((program) => ({
    id: program.id,
    name: program.name,
    category: getProductLineCategory(program.product_line),
    currentLossRatio: program.reported_loss_ratio,
    quotaSharePremium: Math.round(program.gross_earned_premium * (program.quota_share / 100)),
    premium: program.gross_earned_premium,
    lossRatio: program.reported_loss_ratio,
    quotaShare: program.quota_share,
    grossWrittenPremium: program.gross_written_premium,
    grossEarnedPremium: program.gross_earned_premium,
    paidLossRatio: program.paid_loss_ratio,
    reportedLossRatio: program.reported_loss_ratio,
    ultimateLossRatio: program.ultimate_loss_ratio,
    productLine: program.product_line
  }));
};

export const ReportsInsightsExplorer: React.FC<ReportsInsightsExplorerProps> = ({ onNavigateToPage }) => {
  const colors = useSemanticColors();
  const semanticColors = colors; // For chart components
  
  // Get all 20 enhanced programs directly
  const programsData = getAllEnhancedPrograms();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<string>(programsData[0]?.id || 'prog-001');
  const [hoveredProgram, setHoveredProgram] = useState<string | null>(null);
  const [yAxisMetric, setYAxisMetric] = useState('Current Loss Ratio');
  const [xAxisMetric, setXAxisMetric] = useState('Quota Share premium');

  // Custom tooltip modal state management
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number; placement: string } | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringDotRef = useRef<boolean>(false);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  // Filter programs based on search
  const filteredPrograms = programsData.filter(program =>
    program.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Axis options - enhanced with real metrics
  const axisOptions = [
    { value: 'Current Loss Ratio', label: 'Current Loss Ratio' },
    { value: 'Quota Share premium', label: 'Quota Share premium' },
    { value: 'Premium', label: 'Gross Earned Premium' },
    { value: 'Loss Ratio', label: 'Reported Loss Ratio' },
    { value: 'Paid Loss Ratio', label: 'Paid Loss Ratio' },
    { value: 'Ultimate Loss Ratio', label: 'Ultimate Loss Ratio' },
    { value: 'Quota Share', label: 'Quota Share %' }
  ];

  const getMetricValue = (program: Program, metric: string): number => {
    switch (metric) {
      case 'Current Loss Ratio':
        return program.currentLossRatio;
      case 'Quota Share premium':
        return program.quotaSharePremium;
      case 'Premium':
        return program.grossEarnedPremium;
      case 'Loss Ratio':
        return program.reportedLossRatio;
      case 'Paid Loss Ratio':
        return program.paidLossRatio;
      case 'Ultimate Loss Ratio':
        return program.ultimateLossRatio;
      case 'Quota Share':
        return program.quotaShare;
      default:
        return 0;
    }
  };

  // Prepare chart data
  const chartData = programsData.map(program => ({
    ...program,
    x: getMetricValue(program, xAxisMetric),
    y: getMetricValue(program, yAxisMetric),
  }));

  // Custom shape for scatter dots with larger size
  const renderCustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isSelected = payload.id === selectedProgram;
    const isHovered = payload.id === hoveredProgram;
    const shouldShowShadow = isSelected || isHovered;

    return (
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill={categoryColors[payload.category as keyof typeof categoryColors]}
        stroke={staticColors.blackAndWhite.white}
        strokeWidth={4}
        style={{
          cursor: 'pointer',
          filter: shouldShowShadow ? 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15))' : 'none'
        }}
        onClick={() => {
          const programData = programsData.find(p => p.id === payload.id);
          console.log('Dot clicked for:', programData?.name, programData);
          setSelectedProgram(payload.id);
          // Navigate to program details page with program data
          if (onNavigateToPage) {
            console.log('Navigating from dot click with data:', programData);
            onNavigateToPage('reports-insights-program-details', programData);
          }
        }}
        onMouseEnter={(e: any) => {
          // Clear any pending timeout
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
          }
          isHoveringDotRef.current = true;
          setHoveredProgram(payload.id);

          /**
           * Smart tooltip positioning algorithm
           * Calculates the best position for the tooltip based on available space
           * Ensures tooltip stays within chart boundaries with 20px padding
           */
          const dotRect = e.target.getBoundingClientRect();
          const tooltipWidth = 230;
          const tooltipHeight = 400; // Approximate height
          const offset = 25; // Distance from dot (increased to prevent overlap)

          // Get chart container boundaries
          const chartRect = chartContainerRef.current?.getBoundingClientRect();
          if (!chartRect) {
            setTooltipPosition({
              x: dotRect.left + dotRect.width / 2,
              y: dotRect.top,
              placement: 'top'
            });
            return;
          }

          // Calculate available space in each direction
          const spaceTop = dotRect.top - chartRect.top;
          const spaceBottom = chartRect.bottom - dotRect.bottom;
          const spaceLeft = dotRect.left - chartRect.left;
          const spaceRight = chartRect.right - dotRect.right;

          // Determine best vertical placement
          let verticalPlacement = 'top';
          let yPos = dotRect.top;

          if (spaceTop >= tooltipHeight + offset) {
            // Enough space on top
            verticalPlacement = 'top';
            yPos = dotRect.top;
          } else if (spaceBottom >= tooltipHeight + offset) {
            // Not enough space on top, try bottom
            verticalPlacement = 'bottom';
            yPos = dotRect.bottom;
          } else {
            // Not enough vertical space, use top anyway but will be clamped
            verticalPlacement = 'top';
            yPos = dotRect.top;
          }

          // Determine best horizontal placement
          let horizontalPlacement = 'center';
          let xPos = dotRect.left + dotRect.width / 2;

          if (spaceLeft >= tooltipWidth / 2 && spaceRight >= tooltipWidth / 2) {
            // Enough space to center
            horizontalPlacement = 'center';
            xPos = dotRect.left + dotRect.width / 2;
          } else if (spaceRight < tooltipWidth / 2) {
            // Too close to right edge, align to right
            horizontalPlacement = 'right';
            xPos = dotRect.left;
          } else if (spaceLeft < tooltipWidth / 2) {
            // Too close to left edge, align to left
            horizontalPlacement = 'left';
            xPos = dotRect.right;
          }

          setTooltipPosition({
            x: xPos,
            y: yPos,
            placement: `${verticalPlacement}-${horizontalPlacement}`
          });
        }}
        onMouseLeave={() => {
          isHoveringDotRef.current = false;
          // Delay hiding to allow moving to tooltip (increased to 300ms for better UX)
          hoverTimeoutRef.current = setTimeout(() => {
            if (!isHoveringTooltip && !isHoveringDotRef.current) {
              setHoveredProgram(null);
              setTooltipPosition(null);
            }
          }, 300);
        }}
      />
    );
  };

  return (
    <Layout
      pageType="reports-insights-explorer"
      breadcrumbs={createBreadcrumbs.reports.insightsExplorer()}
      selectedSidebarItem="reports"
      selectedSidebarSubitem="insights-explorer"
      onNavigate={createPageNavigationHandler(onNavigateToPage || (() => {}), 'reports-insights-explorer')}
      onInboxClick={() => {
      }}
      onManageAccountClick={undefined}
      onSettingsClick={undefined}
    >
      {/* Header Section */}
      <PageBanner
        title="Insights Explorer"
        subtitle="Explore data-driven insights and analytics for your reinsurance portfolio"
        illustrationSrc="/Insights_illustration.png"
        patternSrc="/pattern_reports.svg"
        illustrationAlt="insights explorer"
      />

      {/* Main Content */}
      <div style={{
        display: 'flex',
        gap: spacing[10],
        marginTop: '60px',
        height: '598px'
      }}>
        {/* Left Sidebar - Program List with internal scroll */}
        <div style={{
          width: '262px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          height: '598px'
        }}>
            {/* Search Input */}
            <div style={{
              backgroundColor: staticColors.reports.dynamic.blue300,
              borderRadius: borderRadius.absolute,
              padding: '10px 17px',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              height: '42px'
            }}>
              <SearchMedium color={staticColors.blackAndWhite.black900} />
              <input
                type="text"
                placeholder="Search for a program"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  width: '100%',
                  ...typography.styles.bodyS,
                  color: staticColors.blackAndWhite.black500
                }}
              />
            </div>

            {/* Spacer */}
            <div style={{ height: '5px' }} />

            {/* Program List - Scrollable */}
            <div
              className="program-list-scroll"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                flex: 1,
                overflowY: 'auto',
                paddingRight: '5px'
              }}>
              {filteredPrograms.map((program) => {
                const isSelected = selectedProgram === program.id;
                const isHovered = hoveredProgram === program.id;
                const backgroundColor = isSelected
                  ? staticColors.reports.blue700
                  : isHovered
                    ? staticColors.reports.dynamic.blue300
                    : staticColors.blackAndWhite.white;

                return (
                  <button
                    key={program.id}
                    onClick={() => setSelectedProgram(program.id)}
                    style={{
                      backgroundColor,
                      padding: '18px 10px',
                      borderRadius: borderRadius[8],
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      ...typography.styles.bodyM,
                      color: staticColors.blackAndWhite.black900,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    onMouseEnter={() => setHoveredProgram(program.id)}
                    onMouseLeave={() => setHoveredProgram(null)}
                  >
                    {program.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side - Scatter Chart - Fixed Height */}
          <div style={{
            flex: 1,
            border: `1px solid ${staticColors.reports.dynamic.blue400}`,
            borderRadius: borderRadius[8],
            padding: 0,
            backgroundColor: staticColors.blackAndWhite.white,
            display: 'flex',
            flexDirection: 'column',
            height: '598px'
          }}>
          {/* Axis Selectors */}
          <div style={{
            display: 'flex',
            gap: spacing[3],
            justifyContent: 'center',
            paddingTop: '0.75rem',
            paddingBottom: spacing[3],
            borderBottom: `1px solid ${staticColors.reports.dynamic.blue400}`
          }}>
            <MenuDropdown
              selectedPrefix="Y-axis"
              value={yAxisMetric}
              options={axisOptions}
              onChange={setYAxisMetric}
              triggerBackgroundColor={staticColors.reports.dynamic.blue300}
              showBorder={false}
            />

            <MenuDropdown
              selectedPrefix="X-axis"
              value={xAxisMetric}
              options={axisOptions}
              onChange={setXAxisMetric}
              triggerBackgroundColor={staticColors.reports.dynamic.blue300}
              showBorder={false}
            />
          </div>

          {/* Chart Container */}
          <div ref={chartContainerRef} style={{ flex: 1, paddingTop: spacing[4], position: 'relative', overflow: 'visible' }}>
            <ResponsiveContainer width="100%" height="90%" style={{ overflow: 'visible' }}>
              <ScatterChart margin={{ top: 0, right: 50, left: -15, bottom: 35 }} style={{ overflow: 'visible' }}>
                <CartesianGrid strokeDasharray="3 3" stroke={staticColors.reports.dynamic.blue400} />
                <XAxis
                  type="number"
                  dataKey="x"
                  name={xAxisMetric}
                  orientation="top"
                  tick={(props) => {
                    // Get total visible ticks to identify last item
                    const visibleTicks = props.visibleTicksCount || 0;
                    return (
                      <ChartCustomTick
                        {...props}
                        isXAxis={true}
                        xAxisInside={true}
                        visibleTicksCount={visibleTicks}
                      />
                    );
                  }}
                  tickFormatter={(value) => {
                    if (xAxisMetric.includes('premium') || xAxisMetric === 'Premium') {
                      if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`;
                      if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
                      return `$${value}`;
                    }
                    return `${value}%`;
                  }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name={yAxisMetric}
                  tick={(props) => (
                    <ChartCustomTick
                      {...props}
                      isXAxis={false}
                      yAxisInside={true}
                      dataLength={chartData.length}
                    />
                  )}
                  tickFormatter={(value) => {
                    if (yAxisMetric.includes('premium') || yAxisMetric === 'Premium') {
                      if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`;
                      if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
                      return `$${value}`;
                    }
                    return `${value}%`;
                  }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={() => null} />
                <Scatter
                  data={chartData}
                  shape={renderCustomDot}
                />
              </ScatterChart>
            </ResponsiveContainer>

            {/* Custom Tooltip Modal */}
            {hoveredProgram && tooltipPosition && (() => {
              const hoveredData = programsData.find(p => p.id === hoveredProgram);
              if (!hoveredData) return null;

              // Get chart container position
              const chartRect = chartContainerRef.current?.getBoundingClientRect();
              if (!chartRect) return null;

              const tooltipWidth = 230;
              const tooltipHeight = 400; // Approximate
              const tooltipOffset = 25; // Distance from dot (must match offset in onMouseEnter)
              const [vertical, horizontal] = tooltipPosition.placement.split('-');

              // Calculate position relative to chart container
              let relativeX = tooltipPosition.x - chartRect.left;
              let relativeY = tooltipPosition.y - chartRect.top;

              // Calculate actual tooltip position based on placement
              let finalX = relativeX;
              let finalY = relativeY;

              // Apply horizontal offset based on alignment
              if (horizontal === 'center') {
                finalX = relativeX - tooltipWidth / 2;
              } else if (horizontal === 'right') {
                finalX = relativeX - tooltipWidth;
              }
              // For 'left', finalX stays as relativeX (0% transform)

              // Apply vertical offset based on alignment
              if (vertical === 'top') {
                finalY = relativeY - tooltipHeight - tooltipOffset;
              } else {
                finalY = relativeY + tooltipOffset;
              }

              // Clamp to chart boundaries
              const padding = 20;
              finalX = Math.max(padding, Math.min(finalX, chartRect.width - tooltipWidth - padding));
              finalY = Math.max(padding, Math.min(finalY, chartRect.height - tooltipHeight - padding));

              return (
                <div
                  style={{
                    position: 'absolute',
                    left: `${finalX}px`,
                    top: `${finalY}px`,
                    backgroundColor: staticColors.blackAndWhite.white,
                    padding: '15px',
                    borderRadius: borderRadius[12],
                    boxShadow: shadows.medium,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    width: '230px',
                    zIndex: 1000,
                    pointerEvents: 'auto',
                    opacity: 1,
                    transform: 'scale(1)',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                    animation: 'tooltipFadeIn 0.2s ease'
                  }}
                  onMouseEnter={() => {
                    // Clear any pending timeout
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                      hoverTimeoutRef.current = null;
                    }
                    setIsHoveringTooltip(true);
                  }}
                  onMouseLeave={() => {
                    setIsHoveringTooltip(false);
                    // Delay hiding to prevent accidental closures
                    hoverTimeoutRef.current = setTimeout(() => {
                      if (!isHoveringTooltip && !isHoveringDotRef.current) {
                        setHoveredProgram(null);
                        setTooltipPosition(null);
                      }
                    }, 150);
                  }}
                >
                  {/* Header with program name */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    height: '20px'
                  }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: categoryColors[hoveredData.category as keyof typeof categoryColors],
                      borderRadius: borderRadius[2],
                      flexShrink: 0
                    }} />
                    <p style={{
                      ...typography.styles.bodyL,
                      color: staticColors.blackAndWhite.black900,
                      margin: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      flex: 1
                    }}>
                      {hoveredData.name}
                    </p>
                  </div>

                  {/* Stats - Using real data from enhanced programs */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Quota Share</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right' }}>{hoveredData.quotaShare}%</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Gross Written Premium</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '60px' }}>
                        ${hoveredData.grossWrittenPremium >= 1000000 
                          ? `${(hoveredData.grossWrittenPremium / 1000000).toFixed(1)}M` 
                          : `${(hoveredData.grossWrittenPremium / 1000).toFixed(0)}k`}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Gross Earned Premium</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '60px' }}>
                        ${hoveredData.grossEarnedPremium >= 1000000 
                          ? `${(hoveredData.grossEarnedPremium / 1000000).toFixed(1)}M` 
                          : `${(hoveredData.grossEarnedPremium / 1000).toFixed(0)}k`}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Paid Loss Ratio</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '60px' }}>{hoveredData.paidLossRatio}%</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Reported Loss Ratio</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '60px' }}>{hoveredData.reportedLossRatio}%</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Ultimate Loss Ratio</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '60px' }}>{hoveredData.ultimateLossRatio}%</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Product Line</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '60px' }}>{hoveredData.productLine}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Quota Share Premium</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '60px' }}>
                        ${hoveredData.quotaSharePremium >= 1000000 
                          ? `${(hoveredData.quotaSharePremium / 1000000).toFixed(1)}M` 
                          : `${(hoveredData.quotaSharePremium / 1000).toFixed(0)}k`}
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <Button
                    variant="small"
                    color="black"
                    showIcon={false}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('View program clicked for:', hoveredData.name, hoveredData);
                      setSelectedProgram(hoveredData.id);
                      // Hide tooltip
                      setHoveredProgram(null);
                      setTooltipPosition(null);
                      setIsHoveringTooltip(false);
                      if (onNavigateToPage) {
                        console.log('Navigating to program details with data:', hoveredData);
                        onNavigateToPage('reports-insights-program-details', hoveredData);
                      }
                    }}
                    style={{ width: '100%' }}
                  >
                    View program
                  </Button>
                </div>
              );
            })()}

            {/* Legend */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '5px',
              padding: spacing[3],
              borderTop: `1px solid ${staticColors.reports.dynamic.blue400}`,
              backgroundColor: staticColors.blackAndWhite.white
            }}>
              {[1, 2, 3, 4, 5].map((category) => (
                <div
                  key={category}
                  style={{
                    backgroundColor: staticColors.blackAndWhite.white,
                    padding: '5px 10px',
                    borderRadius: borderRadius[6],
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing[2]
                  }}
                >
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: categoryColors[category as keyof typeof categoryColors],
                    borderRadius: '2px'
                  }} />
                  <span style={{
                    ...typography.styles.bodyS,
                    color: staticColors.blackAndWhite.black500
                  }}>
                    {categoryNames[category as keyof typeof categoryNames]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsInsightsExplorer;
