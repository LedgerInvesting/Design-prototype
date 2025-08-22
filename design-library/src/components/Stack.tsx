import React from 'react';
import { spacing } from '../tokens';

export type StackDirection = 'horizontal' | 'vertical';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type StackGap = keyof typeof spacing;

export interface StackProps {
  /** Stack direction */
  direction?: StackDirection;
  /** Gap between items using design tokens */
  gap?: StackGap;
  /** Align items (cross-axis) */
  align?: StackAlign;
  /** Justify content (main-axis) */
  justify?: StackJustify;
  /** Wrap items */
  wrap?: boolean;
  /** Children elements */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

export const Stack: React.FC<StackProps> = ({
  direction = 'vertical',
  gap = '4',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  children,
  className,
  as: Component = 'div',
}) => {
  // Map align values to CSS align-items
  const getAlignItems = () => {
    switch (align) {
      case 'start':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'end':
        return 'flex-end';
      case 'stretch':
        return 'stretch';
      default:
        return 'stretch';
    }
  };

  // Map justify values to CSS justify-content
  const getJustifyContent = () => {
    switch (justify) {
      case 'start':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'end':
        return 'flex-end';
      case 'between':
        return 'space-between';
      case 'around':
        return 'space-around';
      case 'evenly':
        return 'space-evenly';
      default:
        return 'flex-start';
    }
  };

  const stackStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'horizontal' ? 'row' : 'column',
    gap: spacing[gap],
    alignItems: getAlignItems(),
    justifyContent: getJustifyContent(),
    flexWrap: wrap ? 'wrap' : 'nowrap',
  };

  return (
    <Component style={stackStyles} className={className}>
      {children}
    </Component>
  );
};

export default Stack;