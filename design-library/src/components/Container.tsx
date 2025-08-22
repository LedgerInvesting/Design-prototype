import React from 'react';
import { spacing } from '../tokens';

export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
export type ContainerPadding = keyof typeof spacing;

export interface ContainerProps {
  /** Maximum width of the container */
  maxWidth?: ContainerMaxWidth | string;
  /** Horizontal padding using design tokens */
  padding?: ContainerPadding;
  /** Center the container */
  center?: boolean;
  /** Children elements */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

export const Container: React.FC<ContainerProps> = ({
  maxWidth = 'lg',
  padding = '4',
  center = true,
  children,
  className,
  as: Component = 'div',
}) => {
  // Map maxWidth values to CSS values
  const getMaxWidth = () => {
    if (typeof maxWidth === 'string' && !['sm', 'md', 'lg', 'xl', '2xl', 'full'].includes(maxWidth)) {
      return maxWidth; // Custom value like '800px'
    }

    switch (maxWidth) {
      case 'sm':
        return '640px';
      case 'md':
        return '768px';
      case 'lg':
        return '1024px';
      case 'xl':
        return '1280px';
      case '2xl':
        return '1536px';
      case 'full':
        return '100%';
      default:
        return '1024px'; // Default to lg
    }
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: getMaxWidth(),
    width: '100%',
    paddingLeft: spacing[padding],
    paddingRight: spacing[padding],
    marginLeft: center ? 'auto' : undefined,
    marginRight: center ? 'auto' : undefined,
  };

  return (
    <Component style={containerStyles} className={className}>
      {children}
    </Component>
  );
};

export default Container;