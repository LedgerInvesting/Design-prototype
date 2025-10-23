import React, { useState } from 'react';
import { Layout, PageHeader } from '@design-library/pages';
import { Button, DashboardCard } from '@design-library/components';
import { typography, borderRadius, useSemanticColors } from '@design-library/tokens';
import { ThemeProvider } from '@design-library/tokens/ThemeProvider';
import { createPageNavigationHandler, createBreadcrumbs, type NavigationHandler } from '@design-library/utils/navigation';
import { ChevronRightSmall, AddMedium, CardsGraph, DownloadMedium } from '@design-library/icons';
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
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Points" data={dataCompletenessData} fill={colors.theme.main} />
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
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
        />
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
      pageType="analytics"
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
          <Button
            key="settings"
            variant="primary"
            color="white"
            onClick={() => console.log('Triangle Settings clicked')}
            showIcon={false}
            style={{ border: 'none', height: '44px' }}
          >
            Triangle Settings
          </Button>,
          <Button
            key="download"
            variant="primary"
            color="black"
            onClick={() => console.log('Download clicked')}
            icon={<ChevronRightSmall color={colors.theme.primary700} />}
            style={{ height: '44px' }}
          >
            Download
          </Button>
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
        flexDirection: 'column',
        gap: '40px',
        width: '100%'
      }}>
        {/* First Chart Card */}
        <DashboardCard
          titleDropdown={{
            options: [
              { value: 'data-completeness', label: 'Data Completeness' },
              { value: 'right-edge', label: 'Right Edge' },
              { value: 'heatmap', label: 'Heatmap' },
              { value: 'triangle-mountain', label: 'Triangle Mountain' }
            ],
            value: selectedChart1,
            onChange: (value) => setSelectedChart1(value),
            placeholder: 'Chart'
          }}
          icon={<CardsGraph />}
          actions={[
            {
              type: 'icon',
              icon: <DownloadMedium />,
              onClick: () => console.log(`Downloading ${selectedChart1} chart...`),
              color: 'primary200'
            }
          ]}
          width="100%"
        >
          {renderChart(selectedChart1)}
        </DashboardCard>

        {/* Second Chart Card */}
        <DashboardCard
          titleDropdown={{
            options: [
              { value: 'data-completeness', label: 'Data Completeness' },
              { value: 'right-edge', label: 'Right Edge' },
              { value: 'heatmap', label: 'Heatmap' },
              { value: 'triangle-mountain', label: 'Triangle Mountain' }
            ],
            value: selectedChart2,
            onChange: (value) => setSelectedChart2(value),
            placeholder: 'Chart'
          }}
          icon={<CardsGraph />}
          actions={[
            {
              type: 'icon',
              icon: <DownloadMedium />,
              onClick: () => console.log(`Downloading ${selectedChart2} chart...`),
              color: 'primary200'
            }
          ]}
          width="100%"
        >
          {renderChart(selectedChart2)}
        </DashboardCard>
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
