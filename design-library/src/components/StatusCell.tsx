import React from 'react';
import { typography, useSemanticColors } from '../tokens';

/**
 * StatusCell component for table status indicators
 *
 * Displays status text with a colored circle indicator on the left.
 * Circle has a 6px diameter with a 4px stroke.
 */

export type StatusType = 'ready' | 'processing' | 'error' | 'done';

export interface StatusCellProps {
  /** The status type to display */
  status: StatusType;
  /** Optional custom text to display (defaults to capitalized status) */
  text?: string;
}

// Status color mappings
const statusColors: Record<StatusType, { fill: string; stroke: string }> = {
  ready: {
    fill: '#9AD5F7',
    stroke: '#E1F3FF',
  },
  processing: {
    fill: '#F49E0E',
    stroke: '#FFF493',
  },
  error: {
    fill: '#F07275',
    stroke: '#FFC7BE',
  },
  done: {
    fill: '#42C172',
    stroke: '#C6FFC1',
  },
};

export const StatusCell: React.FC<StatusCellProps> = ({
  status,
  text,
}) => {
  const colors = useSemanticColors();
  const { fill, stroke } = statusColors[status];

  // Default text is capitalized status
  const displayText = text || status.charAt(0).toUpperCase() + status.slice(1);

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    height: '100%',
  };

  const circleContainerStyles: React.CSSProperties = {
    width: '18px', // 6px circle + 6px stroke on each side = 18px total
    height: '18px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textStyles: React.CSSProperties = {
    ...typography.styles.bodyL,
    color: colors.blackAndWhite.black700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <div style={containerStyles}>
      <div style={circleContainerStyles}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer stroke circle (6px stroke width) */}
          <circle
            cx="9"
            cy="9"
            r="9"
            fill={stroke}
          />
          {/* Inner fill circle (6px diameter = 3px radius) */}
          <circle
            cx="9"
            cy="9"
            r="3"
            fill={fill}
          />
        </svg>
      </div>
      <span style={textStyles}>{displayText}</span>
    </div>
  );
};

export default StatusCell;
