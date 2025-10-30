import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Layout, PageHeader } from '@design-library/pages';
import { Button, DashboardCard, ChartTooltip } from '@design-library/components';
import { typography, borderRadius, useSemanticColors, shadows, spacing } from '@design-library/tokens';
import { ThemeProvider } from '@design-library/tokens/ThemeProvider';
import { createPageNavigationHandler, createBreadcrumbs, type NavigationHandler } from '@design-library/utils/navigation';
import { ChevronRightSmall, ChevronDownExtraSmall, AddMedium, CardsGraph, DownloadSmall, CollapseSmall, ExpandSmall, ConfigSmall, MoreSmall } from '@design-library/icons';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
} from 'recharts';

/**
 * Props for the AnalyticsTriangleDashboard component
 */
interface AnalyticsTriangleDashboardProps {
  /** Optional navigation handler for page transitions */
  onNavigateToPage?: NavigationHandler;
  /** The name/ID of the selected triangle */
  triangleName?: string;
}

/**
 * AnalyticsTriangleDashboard Page Component - Content Section
 *
 * Displays detailed dashboard view for a selected triangle with:
 * - Triangle name in page header
 * - Dashboard metrics and visualizations
 * - Configuration and analysis tools
 *
 * @component
 * @example
 * ```tsx
 * <AnalyticsTriangleDashboard
 *   onNavigateToPage={handleNavigation}
 *   triangleName="cd12345e-6789-012b-345c-6d7cd12345e-6789-01..."
 * />
 * ```
 */
const AnalyticsTriangleDashboardContent: React.FC<AnalyticsTriangleDashboardProps> = ({
  onNavigateToPage,
  triangleName = 'cd12345e-6789-012b-345c-6d7cd12345e-6789-01...'
}) => {
  const colors = useSemanticColors();
  const [selectedChart1, setSelectedChart1] = useState('data-completeness');
  const [selectedChart2, setSelectedChart2] = useState('right-edge');
  const [isCard1Expanded, setIsCard1Expanded] = useState(false);
  const [isCard2Expanded, setIsCard2Expanded] = useState(false);
  const [isChart1MenuOpen, setIsChart1MenuOpen] = useState(false);
  const [isChart2MenuOpen, setIsChart2MenuOpen] = useState(false);
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
  const [chart1MenuPosition, setChart1MenuPosition] = useState({ top: 0, left: 0 });
  const [chart2MenuPosition, setChart2MenuPosition] = useState({ top: 0, left: 0 });

  // Refs for menu dropdowns to handle outside clicks
  const chart1MenuRef = useRef<HTMLDivElement>(null);
  const chart2MenuRef = useRef<HTMLDivElement>(null);
  const chart1ButtonRef = useRef<HTMLDivElement>(null);
  const chart2ButtonRef = useRef<HTMLDivElement>(null);
  const downloadDropdownRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chart1MenuRef.current && !chart1MenuRef.current.contains(event.target as Node)) {
        setIsChart1MenuOpen(false);
      }
      if (chart2MenuRef.current && !chart2MenuRef.current.contains(event.target as Node)) {
        setIsChart2MenuOpen(false);
      }
      if (downloadDropdownRef.current && !downloadDropdownRef.current.contains(event.target as Node)) {
        setIsDownloadDropdownOpen(false);
      }
    };

    if (isChart1MenuOpen || isChart2MenuOpen || isDownloadDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChart1MenuOpen, isChart2MenuOpen, isDownloadDropdownOpen]);

  // All available chart options
  const allChartOptions = [
    { value: 'data-completeness', label: 'Data Completeness' },
    { value: 'right-edge', label: 'Right Edge' },
    { value: 'heatmap', label: 'Heatmap' },
    { value: 'triangle-mountain', label: 'Triangle Mountain' },
    { value: 'histogram', label: 'Histogram' },
    { value: 'ballistic', label: 'Ballistic' },
    { value: 'age-to-age-factors', label: 'Age-to-Age Factors' },
    { value: 'growth-curve', label: 'Growth Curve' },
  ];

  // Data Completeness chart data - triangular pattern
  // Y-axis: 07-23 (index 0, top) to 04-24 (index 9, bottom)
  // Using numeric indices for proper scatter chart rendering
  const dataCompletenessData = [
    // 07-23 (index 0): 8 dots
    { x: 0, y: 0 },
    { x: 3, y: 0 },
    { x: 6, y: 0 },
    { x: 9, y: 0 },
    { x: 12, y: 0 },
    { x: 15, y: 0 },
    { x: 18, y: 0 },
    { x: 21, y: 0 },

    // 10-23 (index 3): 8 dots
    { x: 0, y: 3 },
    { x: 3, y: 3 },
    { x: 6, y: 3 },
    { x: 9, y: 3 },
    { x: 12, y: 3 },
    { x: 15, y: 3 },
    { x: 18, y: 3 },
    { x: 21, y: 3 },

    // 01-24 (index 6): 6 dots
    { x: 0, y: 6 },
    { x: 3, y: 6 },
    { x: 6, y: 6 },
    { x: 9, y: 6 },
    { x: 12, y: 6 },
    { x: 15, y: 6 },

    // 04-24 (index 9): 5 dots
    { x: 0, y: 9 },
    { x: 3, y: 9 },
    { x: 6, y: 9 },
    { x: 9, y: 9 },
    { x: 12, y: 9 },
  ];

  console.log('Data Completeness Points:', dataCompletenessData.length); // Should be 27 total dots

  // Right Edge chart data
  const rightEdgeData = [
    { period: "Jan 18", premium: 6.0, ratioA: 60, ratioB: 58 },
    { period: "Jul 18", premium: 6.5, ratioA: 30, ratioB: 28 },
    { period: "Jan 19", premium: 6.2, ratioA: 90, ratioB: 88 },
    { period: "Jul 19", premium: 6.0, ratioA: 50, ratioB: 48 },
    { period: "Jan 20", premium: 6.3, ratioA: 45, ratioB: 42 },
    { period: "Jul 20", premium: 6.7, ratioA: 70, ratioB: 68 },
    { period: "Jan 21", premium: 6.8, ratioA: 35, ratioB: 30 },
    { period: "Jul 21", premium: 7.0, ratioA: 55, ratioB: 50 },
    { period: "Jan 22", premium: 7.0, ratioA: 40, ratioB: 35 },
    { period: "Jul 22", premium: 6.5, ratioA: 45, ratioB: 40 },
    { period: "Jan 23", premium: 8.5, ratioA: 35, ratioB: 30 },
    { period: "Jul 23", premium: 9.0, ratioA: 20, ratioB: 10 },
  ];

  // Render Data Completeness chart
  const renderDataCompletenessChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 40, bottom: 40, left: 40 }}>
        <defs>
          <filter id="dropShadowSmall" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.05" />
          </filter>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={true}
          horizontal={true}
          stroke={colors.theme.primary400}
        />
        <XAxis
          type="number"
          dataKey="x"
          name="Dev Lag (months)"
          domain={[0, 21]}
          ticks={[0, 3, 6, 9, 12, 15, 18, 21]}
          axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
          tickLine={false}
          tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
          label={{
            value: "Dev Lag (months)",
            position: "bottom",
            style: { ...typography.styles.dataXS, fill: colors.blackAndWhite.black500 }
          }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Period Start"
          domain={[-1, 10]}
          ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          tickFormatter={(value) => {
            const labels = ["07-23", "08-23", "09-23", "10-23", "11-23", "12-23", "01-24", "02-24", "03-24", "04-24"];
            return labels[value] || "";
          }}
          reversed
          axisLine={false}
          tickLine={false}
          tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
          label={{
            value: "Period Start",
            angle: -90,
            position: "insideLeft",
            style: { ...typography.styles.dataXS, fill: colors.blackAndWhite.black500 }
          }}
        />
        <Tooltip
          content={<ChartTooltip />}
          cursor={false}
          isAnimationActive={false}
        />
        <Scatter
          name="Points"
          data={dataCompletenessData}
          fill={colors.theme.main}
          stroke={colors.blackAndWhite.white}
          strokeWidth={2}
          style={{ filter: 'url(#dropShadowSmall)' }}
          shape={<circle r={7} />}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );

  // Render Right Edge chart
  const renderRightEdgeChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={rightEdgeData} margin={{ top: 20, right: 60, left: 20, bottom: 20 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={true}
          horizontal={true}
          stroke={colors.theme.primary400}
        />
        <XAxis
          dataKey="period"
          axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
          tickLine={false}
          tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          tickFormatter={(v) => `${v.toFixed(1)}M`}
          axisLine={false}
          tickLine={false}
          tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
          label={{
            value: "Earned Premium",
            angle: -90,
            position: "insideLeft",
            style: { ...typography.styles.dataXS, fill: colors.blackAndWhite.black500 }
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={(v) => `${v}%`}
          axisLine={false}
          tickLine={false}
          tick={{ fill: colors.blackAndWhite.black500, fontSize: 10, fontFamily: 'Söhne' }}
          label={{
            value: "Loss ratio",
            angle: 90,
            position: "insideRight",
            style: { ...typography.styles.dataXS, fill: colors.blackAndWhite.black500 }
          }}
        />
        <Tooltip content={<ChartTooltip />} cursor={false} />
        <Bar
          yAxisId="left"
          dataKey="premium"
          fill={colors.theme.primary200}
          fillOpacity={0.4}
          barSize={40}
          radius={[4, 4, 0, 0]}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="ratioA"
          stroke="#F0C32E"
          strokeWidth={3}
          dot={{ r: 5, fill: colors.blackAndWhite.white, strokeWidth: 3, stroke: "#F0C32E" }}
          activeDot={{ r: 6 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="ratioB"
          stroke="#42C172"
          strokeWidth={3}
          dot={{ r: 5, fill: colors.blackAndWhite.white, strokeWidth: 3, stroke: "#42C172" }}
          activeDot={{ r: 6 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );

  // Render chart based on selection
  const renderChart = (chartType: string) => {
    switch (chartType) {
      case 'data-completeness':
        return renderDataCompletenessChart();
      case 'right-edge':
        return renderRightEdgeChart();
      default:
        return (
          <div style={{ padding: '20px 30px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{
              ...typography.styles.bodyL,
              color: colors.blackAndWhite.black500,
              margin: 0
            }}>
              {chartType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} chart will be added here
            </p>
          </div>
        );
    }
  };

  // Render chart action menu using portals
  const renderChartMenu = (
    isOpen: boolean,
    menuRef: React.RefObject<HTMLDivElement>,
    position: { top: number; left: number },
    chartName: string,
    onClose: () => void
  ) => {
    if (!isOpen) return null;

    const menuContent = (
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          top: `${position.top}px`,
          left: `${position.left}px`,
          backgroundColor: colors.blackAndWhite.white,
          borderRadius: borderRadius[8],
          boxShadow: shadows.medium,
          padding: '10px',
          zIndex: 9999,
          minWidth: '200px',
        }}
      >
        {[
          { label: 'Download as PNG', onClick: () => console.log(`Download ${chartName} as PNG`) },
          { label: 'Download as SVG', onClick: () => console.log(`Download ${chartName} as SVG`) },
          { label: 'Delete graph', onClick: () => console.log(`Delete ${chartName}`) },
        ].map((option, index) => (
          <div
            key={index}
            onClick={() => {
              option.onClick();
              onClose();
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = colors.theme.primary200;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
            }}
            style={{
              padding: '12px 10px',
              borderRadius: borderRadius[4],
              fontFamily: typography.styles.bodyM.fontFamily.join(', '),
              fontSize: typography.styles.bodyM.fontSize,
              fontWeight: typography.styles.bodyM.fontWeight,
              lineHeight: typography.styles.bodyM.lineHeight,
              color: colors.blackAndWhite.black900,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    );

    return createPortal(menuContent, document.body);
  };

  // Create navigation handler
  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'analytics-triangle-dashboard')
    : undefined;

  // Create breadcrumbs
  const breadcrumbs = onNavigateToPage
    ? createBreadcrumbs.analytics.triangleDashboard(triangleName, onNavigateToPage)
    : [
        { label: 'Analytics', isActive: false },
        { label: 'Triangle', isActive: false },
        { label: triangleName, isActive: true }
      ];

  return (
    <Layout
      pageType="analytics-triangle-dashboard"
      selectedSidebarItem="analytics"
      selectedSidebarSubitem="triangle"
      onNavigate={navigationHandler}
      breadcrumbs={breadcrumbs}
    >
      {/* Page Header */}
      <PageHeader
        title={[
          { text: triangleName, important: true },
          { text: ' Triangle Dashboard', important: false }
        ]}
        actions={[
          // Triangle Settings Button
          <Button
            key="settings"
            variant="primary"
            color="invisible"
            showIcon={false}
            onClick={() => console.log('Triangle Settings clicked')}
          >
            Triangle Settings
          </Button>,
          // Download Dropdown
          <div key="download" ref={downloadDropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsDownloadDropdownOpen(!isDownloadDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                padding: '8px 12px 8px 20px',
                height: '44px',
                minWidth: '120px',
                backgroundColor: colors.blackAndWhite.black900,
                border: 'none',
                borderRadius: borderRadius[4],
                cursor: 'pointer',
                ...typography.styles.bodyL,
                color: colors.blackAndWhite.white,
              }}
            >
              <span>Download</span>
              <div style={{
                transform: isDownloadDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                display: 'flex',
                alignItems: 'center',
              }}>
                <ChevronDownExtraSmall color={colors.theme.primary700} />
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
                    console.log('Download as PNG clicked');
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
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.theme.primary200}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Download as .PNG
                </div>
                <div
                  onClick={() => {
                    console.log('Download as TRIB clicked');
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
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.theme.primary200}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Download as .TRIB
                </div>
                <div
                  onClick={() => {
                    console.log('Download as SVG clicked');
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
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.theme.primary200}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Download as .SVG
                </div>
              </div>
            )}
          </div>
        ]}
      />

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '40px'
      }}>
        <button
          onClick={() => console.log('Aggregate clicked')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '10px 20px',
            borderRadius: borderRadius[8],
            border: `1px dotted ${colors.theme.primary400}`,
            backgroundColor: colors.blackAndWhite.white,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: typography.styles.bodyM.fontFamily.join(', '),
            fontSize: typography.styles.bodyM.fontSize,
            fontWeight: typography.styles.bodyM.fontWeight,
            lineHeight: typography.styles.bodyM.lineHeight,
            letterSpacing: typography.styles.bodyM.letterSpacing,
            color: colors.blackAndWhite.black700,
          }}
          type="button"
        >
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: borderRadius[8],
            backgroundColor: colors.theme.primary200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <AddMedium color={colors.blackAndWhite.black900} style={{ width: '12px', height: '12px' }} />
          </div>
          <span>Aggregate with another triangle</span>
        </button>

        <button
          onClick={() => console.log('Compare clicked')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '10px 20px',
            borderRadius: borderRadius[8],
            border: `1px dotted ${colors.theme.primary400}`,
            backgroundColor: colors.blackAndWhite.white,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: typography.styles.bodyM.fontFamily.join(', '),
            fontSize: typography.styles.bodyM.fontSize,
            fontWeight: typography.styles.bodyM.fontWeight,
            lineHeight: typography.styles.bodyM.lineHeight,
            letterSpacing: typography.styles.bodyM.letterSpacing,
            color: colors.blackAndWhite.black700,
          }}
          type="button"
        >
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: borderRadius[8],
            backgroundColor: colors.theme.primary200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <AddMedium color={colors.blackAndWhite.black900} style={{ width: '12px', height: '12px' }} />
          </div>
          <span>Compare with another triangle</span>
        </button>
      </div>

      {/* Chart Cards */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        width: '100%'
      }}>
        {/* First Chart Card */}
        <div style={{
          position: 'relative',
          width: isCard1Expanded ? '100%' : 'calc(50% - 20px)',
          transition: 'width 0.3s ease'
        }}>
          <DashboardCard
            titleDropdown={{
              options: allChartOptions.filter(option => option.value !== selectedChart2),
              value: selectedChart1,
              onChange: (value) => setSelectedChart1(value),
              placeholder: 'Chart'
            }}
            icon={<CardsGraph />}
            actions={[
              {
                type: 'icon',
                icon: isCard1Expanded
                  ? <CollapseSmall color={colors.blackAndWhite.black900} />
                  : <ExpandSmall color={colors.blackAndWhite.black900} />,
                onClick: () => setIsCard1Expanded(!isCard1Expanded),
                color: 'primary200'
              },
              {
                type: 'separator'
              },
              {
                type: 'icon',
                icon: <div ref={chart1ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart1ButtonRef.current) {
                    const rect = chart1ButtonRef.current.getBoundingClientRect();
                    setChart1MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200, // Align right edge of menu with button
                    });
                  }
                  setIsChart1MenuOpen(!isChart1MenuOpen);
                },
                color: 'invisible'
              }
            ]}
            width="100%"
          >
            {renderChart(selectedChart1)}
          </DashboardCard>
          {renderChartMenu(
            isChart1MenuOpen,
            chart1MenuRef,
            chart1MenuPosition,
            selectedChart1,
            () => setIsChart1MenuOpen(false)
          )}
        </div>

        {/* Second Chart Card */}
        <div style={{
          position: 'relative',
          width: isCard2Expanded ? '100%' : 'calc(50% - 20px)',
          transition: 'width 0.3s ease'
        }}>
          <DashboardCard
            titleDropdown={{
              options: allChartOptions.filter(option => option.value !== selectedChart1),
              value: selectedChart2,
              onChange: (value) => setSelectedChart2(value),
              placeholder: 'Chart'
            }}
            icon={<CardsGraph />}
            actions={[
              {
                type: 'icon',
                icon: isCard2Expanded
                  ? <CollapseSmall color={colors.blackAndWhite.black900} />
                  : <ExpandSmall color={colors.blackAndWhite.black900} />,
                onClick: () => setIsCard2Expanded(!isCard2Expanded),
                color: 'primary200'
              },
              {
                type: 'separator'
              },
              {
                type: 'icon',
                icon: <div ref={chart2ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart2ButtonRef.current) {
                    const rect = chart2ButtonRef.current.getBoundingClientRect();
                    setChart2MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200, // Align right edge of menu with button
                    });
                  }
                  setIsChart2MenuOpen(!isChart2MenuOpen);
                },
                color: 'invisible'
              }
            ]}
            width="100%"
          >
            {renderChart(selectedChart2)}
          </DashboardCard>
          {renderChartMenu(
            isChart2MenuOpen,
            chart2MenuRef,
            chart2MenuPosition,
            selectedChart2,
            () => setIsChart2MenuOpen(false)
          )}
        </div>

        {/* Add Another Graph Button */}
        <Button
          variant="tertiary"
          onClick={() => console.log('Add another graph clicked')}
          style={{
            width: '100%',
            height: '44px'
          }}
        >
          Add another Graph
        </Button>
      </div>
    </Layout>
  );
};

/**
 * AnalyticsTriangleDashboard Page Component - Wrapped with ThemeProvider
 *
 * Main export that wraps the content with Analytics theme
 */
export const AnalyticsTriangleDashboard: React.FC<AnalyticsTriangleDashboardProps> = (props) => {
  return (
    <ThemeProvider initialTheme="analytics">
      <AnalyticsTriangleDashboardContent {...props} />
    </ThemeProvider>
  );
};
