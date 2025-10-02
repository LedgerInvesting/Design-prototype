import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { typography, useSemanticColors } from '../tokens';
import { ChartTooltip } from './ChartTooltip';

/**
 * Line configuration for multi-line charts
 */
export interface LineConfig {
  /** Key for the data values to display */
  dataKey: string;
  /** Color for this line (if not provided, uses theme colors) */
  color?: string;
  /** Label for the line in legend */
  label?: string;
}

/**
 * Chart component props interface
 */
export interface ChartProps {
  /** Array of data objects to display in the chart */
  data: any[];
  /** Type of chart to render */
  type?: 'line' | 'area' | 'bar';
  /** Key for the data values to display (single line mode) */
  dataKey?: string;
  /** Array of line configurations (multi-line mode) */
  lines?: LineConfig[];
  /** Key for the x-axis labels */
  xAxisKey?: string;
  /** Height of the chart in pixels */
  height?: number;
  /** Whether to show the grid lines */
  showGrid?: boolean;
  /** Whether to show tooltips on hover */
  showTooltip?: boolean;
  /** Whether to show the legend */
  showLegend?: boolean;
  /** Whether to show Y-axis inside the chart */
  yAxisInside?: boolean;
  /** Whether to show X-axis inside the chart */
  xAxisInside?: boolean;
  /** Label for the X-axis */
  xAxisLabel?: string;
  /** Label for the Y-axis */
  yAxisLabel?: string;
}

/**
 * Chart Component
 *
 * A flexible chart component built on Recharts with full design system integration.
 * Automatically adapts to the current theme (Reports blue, Analytics green, Marketplace violet).
 *
 * @example
 * ```tsx
 * const data = [
 *   { month: 'Jan', revenue: 4000 },
 *   { month: 'Feb', revenue: 3000 },
 *   { month: 'Mar', revenue: 5000 },
 * ];
 *
 * <Chart
 *   data={data}
 *   type="line"
 *   dataKey="revenue"
 *   xAxisKey="month"
 *   height={300}
 * />
 * ```
 */
export const Chart: React.FC<ChartProps> = ({
  data,
  type = 'line',
  dataKey,
  lines,
  xAxisKey = 'name',
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  yAxisInside = false,
  xAxisInside = false,
  xAxisLabel,
  yAxisLabel,
}) => {
  const colors = useSemanticColors();

  // Use lines mode if lines array is provided, otherwise single line mode
  const isMultiLine = lines && lines.length > 0;
  const lineConfigs = isMultiLine ? lines : (dataKey ? [{ dataKey, color: colors.theme.main }] : []);

  /**
   * Custom tick component with background for inside axes
   */
  const CustomTick = ({ x, y, payload, isXAxis, index, visibleTicksCount, dx: propDx }: any) => {
    // Check if this is the last item for X-axis
    const isLastXItem = isXAxis && index === data.length - 1;
    // Check if this is the last item for Y-axis (bottom of chart)
    const isLastYItem = !isXAxis && visibleTicksCount && index === visibleTicksCount - 1;

    const offset = isXAxis
      ? { dx: xAxisInside ? (isLastXItem ? -15 : 15) : 0, dy: xAxisInside ? 5 : 5 }
      : { dx: propDx !== undefined ? propDx : (yAxisInside ? 0 : 0), dy: yAxisInside ? (isLastYItem ? 10 : -10) : 0 };

    const textAnchor = isXAxis ? 'middle' : 'end';
    const dominantBaseline = isXAxis ? 'hanging' : 'middle';

    return (
      <g>
        {/* Background rectangle for X-axis labels only when inside */}
        {isXAxis && xAxisInside && (
          <rect
            x={x + offset.dx - 15}
            y={y + offset.dy - 6}
            width={30}
            height={12}
            fill={colors.blackAndWhite.white}
            opacity={0.9}
          />
        )}
        <text
          x={x + offset.dx}
          y={y + offset.dy}
          fill={colors.blackAndWhite.black500}
          style={{
            fontFamily: typography.styles.dataXS.fontFamily.join(', '),
            fontSize: typography.styles.dataXS.fontSize,
            fontWeight: typography.styles.dataXS.fontWeight,
            lineHeight: typography.styles.dataXS.lineHeight,
            letterSpacing: typography.styles.dataXS.letterSpacing,
            pointerEvents: 'none',
          }}
          textAnchor={textAnchor}
          dominantBaseline={dominantBaseline}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  // 50px padding around the graph from the graph lines to the border
  // Left and bottom margins are smaller to account for axis labels and values space
  const commonProps = {
    data,
    margin: {
      top: 40,
      right: 50,
      left: 5,
      bottom: 35
    },
  };

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.theme.primary450}
              />
            )}
            <XAxis
              dataKey={xAxisKey}
              stroke={colors.theme.primary450}
              axisLine={xAxisInside ? false : { stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
              orientation={xAxisInside ? 'top' : 'bottom'}
              mirror={xAxisInside}
              tick={(props) => <CustomTick {...props} isXAxis={true} />}
              tickLine={false}
              label={xAxisLabel && xAxisInside ? {
                value: xAxisLabel,
                position: 'insideBottom',
                offset: -10,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              } : (xAxisLabel ? {
                value: xAxisLabel,
                position: 'bottom',
                offset: 8,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              } : undefined)}
            />
            {xAxisInside && (
              <XAxis
                xAxisId="baseline"
                dataKey={xAxisKey}
                stroke={colors.theme.primary450}
                axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
                orientation="bottom"
                tick={false}
                tickLine={false}
              />
            )}
            <YAxis
              stroke={colors.theme.primary450}
              axisLine={false}
              orientation="left"
              mirror={yAxisInside}
              tick={(props) => <CustomTick {...props} isXAxis={false} dx={0} />}
              tickLine={false}
              label={yAxisLabel ? {
                value: yAxisLabel,
                angle: -90,
                position: yAxisInside ? 'insideRight' : 'insideLeft',
                offset: yAxisInside ? 10 : 20,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              } : undefined}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={colors.theme.main}
              fill={colors.theme.primary200}
            />
            {showTooltip && <Tooltip content={<ChartTooltip />} cursor={false} />}
            {showLegend && <Legend wrapperStyle={{
              fontFamily: typography.styles.bodyS.fontFamily.join(', '),
              fontSize: typography.styles.bodyS.fontSize,
              fontWeight: typography.styles.bodyS.fontWeight,
              lineHeight: typography.styles.bodyS.lineHeight,
              letterSpacing: typography.styles.bodyS.letterSpacing,
            }} />}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.theme.primary450}
              />
            )}
            <XAxis
              dataKey={xAxisKey}
              stroke={colors.theme.primary450}
              axisLine={xAxisInside ? false : { stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
              orientation={xAxisInside ? 'top' : 'bottom'}
              mirror={xAxisInside}
              tick={(props) => <CustomTick {...props} isXAxis={true} />}
              tickLine={false}
              label={xAxisLabel && xAxisInside ? {
                value: xAxisLabel,
                position: 'insideBottom',
                offset: -10,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              } : (xAxisLabel ? {
                value: xAxisLabel,
                position: 'bottom',
                offset: 8,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              } : undefined)}
            />
            {xAxisInside && (
              <XAxis
                xAxisId="baseline"
                dataKey={xAxisKey}
                stroke={colors.theme.primary450}
                axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
                orientation="bottom"
                tick={false}
                tickLine={false}
              />
            )}
            <YAxis
              stroke={colors.theme.primary450}
              axisLine={false}
              orientation="left"
              mirror={yAxisInside}
              tick={(props) => <CustomTick {...props} isXAxis={false} dx={0} />}
              tickLine={false}
              label={yAxisLabel ? {
                value: yAxisLabel,
                angle: -90,
                position: yAxisInside ? 'insideRight' : 'insideLeft',
                offset: yAxisInside ? 10 : 20,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              } : undefined}
            />
            <Bar
              dataKey={dataKey}
              fill={colors.theme.main}
            />
            {showTooltip && <Tooltip content={<ChartTooltip />} cursor={false} />}
            {showLegend && <Legend wrapperStyle={{
              fontFamily: typography.styles.bodyS.fontFamily.join(', '),
              fontSize: typography.styles.bodyS.fontSize,
              fontWeight: typography.styles.bodyS.fontWeight,
              lineHeight: typography.styles.bodyS.lineHeight,
              letterSpacing: typography.styles.bodyS.letterSpacing,
            }} />}
          </BarChart>
        );

      default: // line
        return (
          <LineChart {...commonProps}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.theme.primary450}
              />
            )}
            <XAxis
              dataKey={xAxisKey}
              stroke={colors.theme.primary450}
              axisLine={xAxisInside ? false : { stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
              orientation={xAxisInside ? 'top' : 'bottom'}
              mirror={xAxisInside}
              tick={(props) => <CustomTick {...props} isXAxis={true} />}
              tickLine={false}
              label={xAxisLabel && xAxisInside ? {
                value: xAxisLabel,
                position: 'insideBottom',
                offset: -10,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              } : (xAxisLabel ? {
                value: xAxisLabel,
                position: 'bottom',
                offset: 8,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              } : undefined)}
            />
            {xAxisInside && (
              <XAxis
                xAxisId="baseline"
                dataKey={xAxisKey}
                stroke={colors.theme.primary450}
                axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
                orientation="bottom"
                tick={false}
                tickLine={false}
              />
            )}
            <YAxis
              stroke={colors.theme.primary450}
              axisLine={false}
              orientation="left"
              mirror={yAxisInside}
              tick={(props) => <CustomTick {...props} isXAxis={false} dx={0} />}
              tickLine={false}
              label={yAxisLabel ? {
                value: yAxisLabel,
                angle: -90,
                position: yAxisInside ? 'insideRight' : 'insideLeft',
                offset: yAxisInside ? 10 : 20,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              } : undefined}
            />
            {/* Render multiple lines */}
            {lineConfigs.map((lineConfig, index) => (
              <Line
                key={lineConfig.dataKey}
                type="monotone"
                dataKey={lineConfig.dataKey}
                stroke={lineConfig.color || colors.theme.main}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: colors.theme.primary200, stroke: lineConfig.color || colors.theme.main, strokeWidth: 2 }}
                name={lineConfig.label || lineConfig.dataKey}
              />
            ))}
            {showTooltip && <Tooltip content={<ChartTooltip />} cursor={false} />}
            {showLegend && <Legend wrapperStyle={{
              fontFamily: typography.styles.bodyS.fontFamily.join(', '),
              fontSize: typography.styles.bodyS.fontSize,
              fontWeight: typography.styles.bodyS.fontWeight,
              lineHeight: typography.styles.bodyS.lineHeight,
              letterSpacing: typography.styles.bodyS.letterSpacing,
            }} />}
          </LineChart>
        );
    }
  };

  return (
    <ResponsiveContainer width="100%" height={height} style={{ overflow: 'visible', outline: 'none' }}>
      {renderChart()}
    </ResponsiveContainer>
  );
};
