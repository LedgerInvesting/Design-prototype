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
 * Chart component props interface
 */
export interface ChartProps {
  /** Array of data objects to display in the chart */
  data: any[];
  /** Type of chart to render */
  type?: 'line' | 'area' | 'bar';
  /** Key for the data values to display */
  dataKey: string;
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

  /**
   * Custom tick component with background for inside axes
   */
  const CustomTick = ({ x, y, payload, isXAxis, index, visibleTicksCount }: any) => {
    // Check if this is the last item for X-axis
    const isLastXItem = isXAxis && index === data.length - 1;
    // Check if this is the last item for Y-axis (bottom of chart)
    const isLastYItem = !isXAxis && visibleTicksCount && index === visibleTicksCount - 1;

    const offset = isXAxis
      ? { dx: xAxisInside ? (isLastXItem ? -15 : 15) : 0, dy: xAxisInside ? 5 : 0 }
      : { dx: yAxisInside ? 0 : 0, dy: yAxisInside ? (isLastYItem ? 10 : -10) : 0 };

    const textAnchor = isXAxis ? 'middle' : 'start';
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

  // Optimal margins to achieve ~50px visual spacing accounting for Recharts' auto spacing
  // Left and bottom are smaller because Recharts adds space for tick labels automatically
  const commonProps = {
    data,
    margin: {
      top: 50,
      right: 50,
      left: xAxisLabel || yAxisLabel ? 15 : 5,  // More space if we have axis labels
      bottom: xAxisLabel || yAxisLabel ? 30 : 20  // More space if we have axis labels
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
              label={xAxisLabel ? {
                value: xAxisLabel,
                position: 'insideBottom',
                offset: -35,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              } : undefined}
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
              tick={(props) => <CustomTick {...props} isXAxis={false} />}
              tickLine={false}
              label={yAxisLabel ? {
                value: yAxisLabel,
                angle: -90,
                position: 'insideLeft',
                offset: -35,
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
              label={xAxisLabel ? {
                value: xAxisLabel,
                position: 'insideBottom',
                offset: -35,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              } : undefined}
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
              tick={(props) => <CustomTick {...props} isXAxis={false} />}
              tickLine={false}
              label={yAxisLabel ? {
                value: yAxisLabel,
                angle: -90,
                position: 'insideLeft',
                offset: -35,
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
              label={xAxisLabel ? {
                value: xAxisLabel,
                position: 'insideBottom',
                offset: -35,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              } : undefined}
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
              tick={(props) => <CustomTick {...props} isXAxis={false} />}
              tickLine={false}
              label={yAxisLabel ? {
                value: yAxisLabel,
                angle: -90,
                position: 'insideLeft',
                offset: -35,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              } : undefined}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors.theme.main}
              strokeWidth={2}
              dot={{ fill: colors.theme.main, r: 4 }}
              activeDot={{ r: 6, fill: colors.theme.primary200, stroke: colors.theme.main, strokeWidth: 2 }}
            />
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
