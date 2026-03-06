import React from 'react';
import { useSemanticColors } from '../tokens';
import { typography, borderRadius, shadows } from '../tokens';

export interface ThemedCardProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'filled';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Example component showing how to use the theming system.
 * This card automatically adapts its colors based on the current product theme.
 */
export const ThemedCard: React.FC<ThemedCardProps> = ({
  title,
  children,
  variant = 'default',
  className,
  style,
}) => {
  const { colors } = useSemanticColors();

  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: 'white',
          border: `1px solid ${colors.theme.stroke}`, // Uses theme.primary400
        };
      case 'filled':
        return {
          backgroundColor: colors.theme.background, // Uses theme.primary200
          border: `1px solid ${colors.theme.stroke}`,
        };
      default:
        return {
          backgroundColor: 'white',
          border: `1px solid ${colors.blackAndWhite.black300}`,
        };
    }
  };

  const cardStyles: React.CSSProperties = {
    borderRadius: borderRadius[8],
    padding: '24px',
    boxShadow: shadows.small,
    ...getVariantStyles(),
    ...style,
  };

  const titleStyles: React.CSSProperties = {
    ...typography.styles.subheadingM,
    color: colors.theme.main, // Uses theme.primary700 (main color)
    marginBottom: '16px',
    margin: '0 0 16px 0',
  };

  const contentStyles: React.CSSProperties = {
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black700,
    lineHeight: 1.5,
  };

  return (
    <div className={className} style={cardStyles}>
      {title && <h3 style={titleStyles}>{title}</h3>}
      <div style={contentStyles}>{children}</div>
    </div>
  );
};

export default ThemedCard;