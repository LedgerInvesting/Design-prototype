import React from 'react';
import { spacing } from '../tokens';

export type SpacerSize = keyof typeof spacing;

export interface SpacerProps {
  /** Fixed size using design tokens (overrides flex grow) */
  size?: SpacerSize;
  /** Whether to grow to fill available space */
  grow?: boolean;
  /** Direction of the spacer (for fixed size) */
  direction?: 'horizontal' | 'vertical';
  /** Additional CSS class */
  className?: string;
}

export const Spacer: React.FC<SpacerProps> = ({
  size,
  grow = true,
  direction = 'horizontal',
  className,
}) => {
  const getSpacerStyles = (): React.CSSProperties => {
    // If size is specified, use fixed dimensions
    if (size) {
      const spacingValue = spacing[size];
      
      if (direction === 'horizontal') {
        return {
          width: spacingValue,
          height: '1px',
          flexShrink: 0,
        };
      } else {
        return {
          width: '1px',
          height: spacingValue,
          flexShrink: 0,
        };
      }
    }
    
    // Default behavior: grow to fill space
    if (grow) {
      return {
        flex: 1,
        minWidth: 0,
        minHeight: 0,
      };
    }
    
    // Fallback
    return {
      width: '1px',
      height: '1px',
    };
  };

  return <div style={getSpacerStyles()} className={className} />;
};

export default Spacer;