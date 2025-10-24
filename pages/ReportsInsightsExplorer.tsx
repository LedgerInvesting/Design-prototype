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

// Category names
const categoryNames = {
  1: 'Private Passenger Auto',
  2: 'Motor',
  3: 'Workers\' Compensation',
  4: 'General Liability',
  5: 'Commercial Auto',
};

// Sample program data
const programsData: Program[] = [
  { id: '1', name: 'Appalachian.wc-companionTY21', category: 2, currentLossRatio: 75, quotaSharePremium: 250000, premium: 250000, lossRatio: 75 },
  { id: '2', name: 'Appalachian.wc-companionTY22', category: 1, currentLossRatio: 100, quotaSharePremium: 1400000, premium: 1400000, lossRatio: 100 },
  { id: '3', name: 'Appalachian.gl-contractorTY22', category: 1, currentLossRatio: 98, quotaSharePremium: 1500000, premium: 1500000, lossRatio: 98 },
  { id: '4', name: 'Rms.gl-hospitalityTY21', category: 3, currentLossRatio: 95, quotaSharePremium: 1600000, premium: 1600000, lossRatio: 95 },
  { id: '5', name: 'Trinity.ca-towingTY21', category: 2, currentLossRatio: 0, quotaSharePremium: 1300000, premium: 1300000, lossRatio: 0 },
  { id: '6', name: 'Atllas.wc-ilsTY23', category: 2, currentLossRatio: 40, quotaSharePremium: 350000, premium: 350000, lossRatio: 40 },
  { id: '7', name: 'Cornerstone.gl-snow-iceTY21', category: 5, currentLossRatio: 40, quotaSharePremium: 2700000, premium: 2700000, lossRatio: 40 },
  { id: '8', name: 'Cardigan.ca-nemt-admittedTY22', category: 4, currentLossRatio: 60, quotaSharePremium: 1100000, premium: 1100000, lossRatio: 60 },
  { id: '9', name: 'cardigan.ca-nemt-nonadmittedTY22', category: 1, currentLossRatio: 30, quotaSharePremium: 900000, premium: 900000, lossRatio: 30 },
  { id: '10', name: 'rms.gl-hospitalityTY22', category: 4, currentLossRatio: 100, quotaSharePremium: 1800000, premium: 1800000, lossRatio: 100 },
  { id: '11', name: 'rms.gl-hospitalityTY23', category: 3, currentLossRatio: 100, quotaSharePremium: 2000000, premium: 2000000, lossRatio: 100 },
  { id: '12', name: 'Xpt.ca-truckTY23', category: 1, currentLossRatio: -5, quotaSharePremium: 500000, premium: 500000, lossRatio: -5 },
  { id: '13', name: 'Cornerstone.gl-snow-iceTY22', category: 5, currentLossRatio: 85, quotaSharePremium: 3500000, premium: 3500000, lossRatio: 85 },
  { id: '14', name: 'Paragon.ca-yellow-busTY22', category: 3, currentLossRatio: 91, quotaSharePremium: 2200000, premium: 2200000, lossRatio: 91 },
  { id: '15', name: 'Summit.wc-manufacturingTY23', category: 1, currentLossRatio: 55, quotaSharePremium: 1750000, premium: 1750000, lossRatio: 55 },
  { id: '16', name: 'Pinnacle.gl-retailTY21', category: 4, currentLossRatio: 70, quotaSharePremium: 980000, premium: 980000, lossRatio: 70 },
  { id: '17', name: 'Horizon.ca-deliveryTY22', category: 2, currentLossRatio: 45, quotaSharePremium: 1250000, premium: 1250000, lossRatio: 45 },
  { id: '18', name: 'Nexus.wc-constructionTY23', category: 5, currentLossRatio: 110, quotaSharePremium: 2100000, premium: 2100000, lossRatio: 110 },
  { id: '19', name: 'Frontier.gl-restaurantTY21', category: 3, currentLossRatio: 88, quotaSharePremium: 1450000, premium: 1450000, lossRatio: 88 },
  { id: '20', name: 'Meridian.ca-rideshare-TY22', category: 1, currentLossRatio: 35, quotaSharePremium: 820000, premium: 820000, lossRatio: 35 },
  { id: '21', name: 'Beacon.wc-healthcareTY23', category: 2, currentLossRatio: 65, quotaSharePremium: 1900000, premium: 1900000, lossRatio: 65 },
  { id: '22', name: 'Vanguard.gl-entertainmentTY21', category: 4, currentLossRatio: 78, quotaSharePremium: 1350000, premium: 1350000, lossRatio: 78 },
  { id: '23', name: 'Crest.ca-logisticsTY22', category: 3, currentLossRatio: 92, quotaSharePremium: 1680000, premium: 1680000, lossRatio: 92 },
  { id: '24', name: 'Liberty.wc-educationTY23', category: 1, currentLossRatio: 25, quotaSharePremium: 750000, premium: 750000, lossRatio: 25 },
];

export const ReportsInsightsExplorer: React.FC<ReportsInsightsExplorerProps> = ({ onNavigateToPage }) => {
  const colors = useSemanticColors();
  const semanticColors = colors; // For chart components
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<string>('6'); // Atllas.wc-ilsTY23
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

  // Axis options
  const axisOptions = [
    { value: 'Current Loss Ratio', label: 'Current Loss Ratio' },
    { value: 'Quota Share premium', label: 'Quota Share premium' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Loss Ratio', label: 'Loss Ratio' },
    { value: 'Combined Ratio', label: 'Combined Ratio' }
  ];

  const getMetricValue = (program: Program, metric: string): number => {
    switch (metric) {
      case 'Current Loss Ratio':
        return program.currentLossRatio;
      case 'Quota Share premium':
        return program.quotaSharePremium;
      case 'Premium':
        return program.premium;
      case 'Loss Ratio':
        return program.lossRatio;
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
                    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`;
                    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
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
                  tickFormatter={(value) => `${value}%`}
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

                  {/* Stats */}
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
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right' }}>17.5%</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Gross Written Premium</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '38px' }}>$11M</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Gross Earned Premium</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '38px' }}>$11M</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Paid Loss Ratio</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '38px' }}>45%</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Reported Loss Ratio</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '38px' }}>68%</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Ultimate Loss Ratio</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '38px' }}>80%</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Current Loss Ratio Delta from Initial</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '38px' }}>18%</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...typography.styles.bodyS
                    }}>
                      <span style={{ color: staticColors.blackAndWhite.black500 }}>Current Loss Ratio 6-Month Delta</span>
                      <span style={{ color: staticColors.blackAndWhite.black900, textAlign: 'right', width: '38px' }}>-1%</span>
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
