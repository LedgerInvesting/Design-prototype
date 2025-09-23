import React from 'react';
import { typography, useSemanticColors } from '../tokens';
import { Button } from './Button';

// Content element types
export type CustomCellContentType = 'text' | 'icon' | 'button' | 'badge' | 'status';

// Text styling options
export type TextStyle = 'bodyM' | 'bodyS' | 'captionS' | 'dataM' | 'dataS' | 'subheadingS';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextColor = 'black900' | 'black700' | 'black500' | 'primary' | 'success' | 'error' | 'warning';

// Badge styling options
export type BadgeVariant = 'primary' | 'success' | 'error' | 'warning' | 'neutral';

// Status indicator options
export type StatusType = 'active' | 'inactive' | 'pending' | 'complete' | 'error';

// Individual content element interfaces
export interface TextElement {
  type: 'text';
  content: string;
  style?: TextStyle;
  weight?: TextWeight;
  color?: TextColor;
  onClick?: () => void;
  href?: string; // For links
}

export interface IconElement {
  type: 'icon';
  icon: React.ReactNode;
  size?: number;
  color?: string;
  onClick?: () => void;
}

export interface ButtonElement {
  type: 'button';
  text: string;
  variant?: 'primary' | 'small' | 'icon' | 'tertiary';
  color?: 'black' | 'white' | 'main' | 'light' | 'green';
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export interface BadgeElement {
  type: 'badge';
  text: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}

export interface StatusElement {
  type: 'status';
  status: StatusType;
  text?: string;
  showIcon?: boolean;
}

export type CustomCellElement = TextElement | IconElement | ButtonElement | BadgeElement | StatusElement;

// Layout options
export type CellAlignment = 'left' | 'center' | 'right';
export type CellDirection = 'horizontal' | 'vertical';

// Main CustomCell props
export interface CustomCellProps {
  elements: CustomCellElement[];
  alignment?: CellAlignment;
  direction?: CellDirection;
  gap?: number;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const CustomCell: React.FC<CustomCellProps> = ({
  elements,
  alignment = 'left',
  direction = 'horizontal',
  gap = 8,
  onClick,
  className = '',
  style = {},
}) => {
  const colors = useSemanticColors();

  // Color mapping helper
  const getTextColor = (color: TextColor = 'black700') => {
    switch (color) {
      case 'black900': return colors.blackAndWhite.black900;
      case 'black700': return colors.blackAndWhite.black700;
      case 'black500': return colors.blackAndWhite.black500;
      case 'primary': return colors.theme.main;
      case 'success': return colors.success.textAndStrokes;
      case 'error': return colors.error.textAndStrokes;
      case 'warning': return colors.warning.textAndStrokes;
      default: return colors.blackAndWhite.black700;
    }
  };

  // Get typography styles
  const getTypographyStyle = (textStyle: TextStyle = 'bodyM') => {
    const style = typography.styles[textStyle];
    return {
      ...style,
      fontFamily: style.fontFamily.join(', '),
      letterSpacing: style.letterSpacing || typography.letterSpacing.normal,
    };
  };

  // Get font weight
  const getFontWeight = (weight: TextWeight = 'regular') => {
    return typography.fontWeight[weight] || typography.fontWeight.regular;
  };

  // Badge styling
  const getBadgeStyles = (variant: BadgeVariant = 'neutral') => {
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '2px 8px',
      borderRadius: '12px',
      ...typography.styles.bodyS,
      fontFamily: typography.styles.bodyS.fontFamily.join(', '),
      fontSize: '11px',
      fontWeight: typography.fontWeight.medium,
      lineHeight: '1.2',
    };

    const variants = {
      primary: { bg: colors.theme.primary200, color: colors.theme.main },
      success: { bg: colors.success.fill, color: colors.success.textAndStrokes },
      error: { bg: colors.error.fill, color: colors.error.textAndStrokes },
      warning: { bg: colors.warning.fill, color: colors.warning.textAndStrokes },
      neutral: { bg: colors.blackAndWhite.black100, color: colors.blackAndWhite.black700 }
    };

    const selected = variants[variant] || variants.neutral;
    return {
      ...baseStyles,
      backgroundColor: selected.bg,
      color: selected.color,
    };
  };

  // Status indicator styling
  const getStatusStyles = (status: StatusType) => {
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      ...typography.styles.bodyS,
      fontFamily: typography.styles.bodyS.fontFamily.join(', '),
      fontWeight: typography.fontWeight.medium,
    };

    const dotStyles = {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      flexShrink: 0,
    };

    const statusMap = {
      active: colors.success.textAndStrokes,
      pending: colors.warning.textAndStrokes,
      complete: colors.theme.main,
      error: colors.error.textAndStrokes,
      inactive: colors.blackAndWhite.black500
    };

    const statusColor = statusMap[status] || colors.blackAndWhite.black500;
    const dotColor = status === 'inactive' ? colors.blackAndWhite.black300 : statusColor;

    return {
      container: { ...baseStyles, color: statusColor },
      dot: { ...dotStyles, backgroundColor: dotColor },
    };
  };

  // Container styling
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    alignItems: direction === 'vertical' ? (alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start') : 'center',
    justifyContent: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
    gap: `${gap}px`,
    width: '100%',
    height: '100%',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  // Render individual element
  const renderElement = (element: CustomCellElement, index: number) => {
    switch (element.type) {
      case 'text':
        const textStyles = {
          ...getTypographyStyle(element.style),
          fontWeight: getFontWeight(element.weight),
          color: getTextColor(element.color),
          cursor: element.onClick || element.href ? 'pointer' : 'inherit',
          textDecoration: element.href ? 'none' : 'none',
          transition: 'color 0.2s ease',
        };

        const textElement = (
          <span
            key={index}
            style={textStyles}
            onClick={element.onClick}
            onMouseEnter={(e) => {
              if (element.onClick || element.href) {
                (e.target as HTMLElement).style.opacity = '0.8';
              }
            }}
            onMouseLeave={(e) => {
              if (element.onClick || element.href) {
                (e.target as HTMLElement).style.opacity = '1';
              }
            }}
          >
            {element.content}
          </span>
        );

        if (element.href) {
          return (
            <a
              key={index}
              href={element.href}
              style={{ textDecoration: 'none' }}
              onClick={(e) => {
                if (element.onClick) {
                  e.preventDefault();
                  element.onClick();
                }
              }}
            >
              {textElement}
            </a>
          );
        }

        return textElement;

      case 'icon':
        return (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: element.size || 'auto',
              height: element.size || 'auto',
              cursor: element.onClick ? 'pointer' : 'default',
              transition: 'opacity 0.2s ease',
            }}
            onClick={element.onClick}
            onMouseEnter={(e) => {
              if (element.onClick) {
                (e.target as HTMLElement).style.opacity = '0.8';
              }
            }}
            onMouseLeave={(e) => {
              if (element.onClick) {
                (e.target as HTMLElement).style.opacity = '1';
              }
            }}
          >
            {element.icon}
          </div>
        );

      case 'button':
        return (
          <Button
            key={index}
            variant={element.variant || 'small'}
            color={element.color || 'main'}
            onClick={element.onClick}
            disabled={element.disabled}
            icon={element.icon}
            style={element.style}
          >
            {element.text}
          </Button>
        );

      case 'badge':
        return (
          <span key={index} style={getBadgeStyles(element.variant)}>
            {element.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{element.icon}</span>}
            {element.text}
          </span>
        );

      case 'status':
        const statusStyles = getStatusStyles(element.status);
        return (
          <div key={index} style={statusStyles.container}>
            {element.showIcon !== false && <div style={statusStyles.dot} />}
            {element.text && <span>{element.text}</span>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={className}
      style={containerStyles}
      onClick={onClick}
      data-cell-type="custom"
    >
      {elements.map((element, index) => renderElement(element, index))}
    </div>
  );
};

export default CustomCell;