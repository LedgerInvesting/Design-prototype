import React from 'react';
import { typography, useSemanticColors } from '../tokens';

/**
 * Custom Tick Component for Recharts
 *
 * Provides smart positioning for inside axes:
 * - X-axis: Labels at top, last item positioned left to stay inside
 * - Y-axis: Labels on left, last item (bottom) positioned down to stay inside
 * - White backgrounds for X-axis labels for visibility
 * - No backgrounds for Y-axis labels
 *
 * @example
 * ```tsx
 * <XAxis tick={(props) => <ChartCustomTick {...props} isXAxis={true} xAxisInside={true} dataLength={data.length} />} />
 * <YAxis tick={(props) => <ChartCustomTick {...props} isXAxis={false} yAxisInside={true} />} />
 * ```
 */
interface ChartCustomTickProps {
  x?: number;
  y?: number;
  payload?: { value: any };
  isXAxis: boolean;
  index?: number;
  visibleTicksCount?: number;
  xAxisInside?: boolean;
  yAxisInside?: boolean;
  dataLength?: number;
}

export const ChartCustomTick: React.FC<ChartCustomTickProps> = ({
  x = 0,
  y = 0,
  payload,
  isXAxis,
  index = 0,
  visibleTicksCount,
  xAxisInside = false,
  yAxisInside = false,
  dataLength = 0,
}) => {
  const colors = useSemanticColors();

  // Check if this is the last item for X-axis
  const isLastXItem = isXAxis && dataLength > 0 && index === dataLength - 1;
  // Check if this is the last item for Y-axis (bottom of chart)
  const isLastYItem = !isXAxis && visibleTicksCount && index === visibleTicksCount - 1;

  const offset = isXAxis
    ? { dx: xAxisInside ? (isLastXItem ? -25 : 25) : 0, dy: xAxisInside ? 15 : 0 }
    : { dx: yAxisInside ? 10 : 0, dy: yAxisInside ? (isLastYItem ? 15 : -15) : 0 };

  const textAnchor = isXAxis ? 'middle' : 'start';
  const dominantBaseline = isXAxis ? 'hanging' : 'middle';

  return (
    <g>
      {/* Background rectangle for X-axis labels only */}
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
        fill={colors.blackAndWhite.black700}
        style={{
          ...typography.styles.dataXS,
          pointerEvents: 'none',
        }}
        textAnchor={textAnchor}
        dominantBaseline={dominantBaseline}
      >
        {payload?.value}
      </text>
    </g>
  );
};
