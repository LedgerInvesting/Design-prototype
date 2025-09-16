import React from 'react';
import { spacing, useSemanticColors } from '../tokens';

export interface SeparatorProps {
  /** Separator variant - fullWidth spans entire container, content respects horizontal padding */
  variant?: 'fullWidth' | 'content';
  /** Horizontal margin for content variant (defaults to spacing[4] = 1rem) */
  margin?: keyof typeof spacing;
  /** Custom color override (defaults to theme.primary400) */
  color?: string;
  /** Custom thickness (defaults to 1px) */
  thickness?: string;
  /** Additional CSS class */
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  variant = 'fullWidth',
  margin = '4',
  color,
  thickness = '1px',
  className = '',
}) => {
  const colors = useSemanticColors();
  const defaultColor = color || colors.theme.primary400;
  const baseStyles: React.CSSProperties = {
    height: thickness,
    backgroundColor: defaultColor,
    border: 'none',
    margin: 0,
  };

  const variantStyles: React.CSSProperties = variant === 'content' 
    ? {
        marginLeft: spacing[margin],
        marginRight: spacing[margin],
      }
    : {};

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles,
  };

  return (
    <hr 
      className={`separator separator--${variant} ${className}`}
      style={combinedStyles}
    />
  );
};

export default Separator;