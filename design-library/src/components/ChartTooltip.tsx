import React from 'react';
import { typography, useSemanticColors, borderRadius, shadows } from '../tokens';

/**
 * Chart Tooltip Component
 *
 * Reusable tooltip component for all Recharts charts with design token integration.
 * Displays all data values with their respective colors.
 *
 * @example
 * ```tsx
 * import { ChartTooltip } from '@design-library/components';
 *
 * <Tooltip content={<ChartTooltip />} />
 * ```
 */
export const ChartTooltip: React.FC<any> = ({ active, payload, label }) => {
  const colors = useSemanticColors();

  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: colors.blackAndWhite.white,
        padding: '12px',
        borderRadius: borderRadius[8],
        border: `1px solid ${colors.theme.primary400}`,
        boxShadow: shadows.medium,
      }}>
        {label && (
          <p style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black900,
            margin: '0 0 8px 0',
            fontWeight: 600,
          }}>
            {label}
          </p>
        )}
        {payload
          // Filter to only show the 3 main data series, exclude uncertainty bands
          .filter((entry: any) => ['mean', 'reported', 'paid'].includes(entry.dataKey))
          .map((entry: any, index: number) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: index < 2 ? '4px' : 0, // Adjust for filtered length
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                backgroundColor: entry.color,
                borderRadius: '2px',
              }} />
              <p style={{
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black500,
                margin: 0,
              }}>
                {entry.name}: {entry.value}%
              </p>
            </div>
          ))}
        {/* 
        Commented out uncertainty band values for cleaner tooltip:
        - outerBandBase, outerBandHeight (outer uncertainty band)
        - innerBandBase, innerBandHeight (inner uncertainty band)
        
        TODO: Consider better way to display these confidence intervals
        */}
      </div>
    );
  }
  return null;
};
