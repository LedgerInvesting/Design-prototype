import React from 'react';
import { spacing } from '../tokens';

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto' | 'fit';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';
export type GridJustify = 'start' | 'center' | 'end' | 'stretch';
export type GridGap = keyof typeof spacing;

export interface GridProps {
  /** Number of columns or 'auto' for auto-fit */
  columns?: GridColumns;
  /** Gap between items using design tokens */
  gap?: GridGap;
  /** Minimum column width (used with 'fit' columns) */
  minColumnWidth?: string;
  /** Align items in their grid areas */
  alignItems?: GridAlign;
  /** Justify items in their grid areas */
  justifyItems?: GridJustify;
  /** Children elements */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

export const Grid: React.FC<GridProps> = ({
  columns = 'auto',
  gap = '4',
  minColumnWidth = '250px',
  alignItems = 'stretch',
  justifyItems = 'stretch',
  children,
  className,
  as: Component = 'div',
}) => {
  // Get grid template columns based on columns prop
  const getGridTemplateColumns = () => {
    if (columns === 'auto') {
      return `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`;
    }
    if (columns === 'fit') {
      return `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`;
    }
    if (typeof columns === 'number') {
      return `repeat(${columns}, 1fr)`;
    }
    return 'none';
  };

  // Map align values to CSS
  const getAlignItems = () => {
    switch (alignItems) {
      case 'start':
        return 'start';
      case 'center':
        return 'center';
      case 'end':
        return 'end';
      case 'stretch':
        return 'stretch';
      default:
        return 'stretch';
    }
  };

  // Map justify values to CSS
  const getJustifyItems = () => {
    switch (justifyItems) {
      case 'start':
        return 'start';
      case 'center':
        return 'center';
      case 'end':
        return 'end';
      case 'stretch':
        return 'stretch';
      default:
        return 'stretch';
    }
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: getGridTemplateColumns(),
    gap: spacing[gap],
    alignItems: getAlignItems(),
    justifyItems: getJustifyItems(),
  };

  return (
    <Component style={gridStyles} className={className}>
      {children}
    </Component>
  );
};

export default Grid;