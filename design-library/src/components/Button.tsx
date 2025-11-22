import React, { useState, useEffect } from 'react';
import { typography, borderRadius, useSemanticColors, useTheme } from '../tokens';
import { icons } from '../icons';

export type ButtonVariant = 'primary' | 'small' | 'icon' | 'tertiary' | 'secondary';
export type PrimaryColor = 'black' | 'white' | 'invisible' | 'main' | 'light' | 'green';
export type SmallColor = 'black' | 'white' | 'invisible' | 'main' | 'light' | 'green';
export type IconColor = 'black' | 'main' | 'light' | 'green' | 'white' | 'invisible' | 'primary200';
export type TertiaryColor = 'white';
export type SecondaryColor = 'black' | 'white' | 'primary200';
export type ButtonShape = 'circle' | 'square';
export type IconPosition = 'left' | 'right';

// Base interface
interface BaseButtonProps {
  /** Button text content (not used for icon variant) */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

// All possible color values
export type ButtonColor = PrimaryColor | SmallColor | IconColor | TertiaryColor | SecondaryColor;

// Unified Button interface
export interface ButtonProps extends BaseButtonProps {
  /** Button variant type */
  variant?: ButtonVariant;
  /** Button color variant (available colors depend on variant) */
  color?: ButtonColor;
  /** Icon component */
  icon?: React.ReactNode;
  /** Icon position (primary variant only) */
  iconPosition?: IconPosition;
  /** Show/hide icon (primary variant only) */
  showIcon?: boolean;
  /** Button shape (icon variant only) */
  shape?: ButtonShape;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    disabled = false,
    onClick,
    className,
    style,
  } = props;

  const [isHovered, setIsHovered] = useState(false);
  const colors = useSemanticColors();

  // Get current theme, with fallback for when not in ThemeProvider
  let currentTheme = 'reports';
  try {
    const theme = useTheme();
    currentTheme = theme.currentTheme;
  } catch (error) {
    // Outside ThemeProvider, use default theme
  }

  // Extract variant-specific props with defaults
  const variant = props.variant || 'primary';
  const color = props.color || (variant === 'primary' ? 'black' : variant === 'small' ? 'main' : variant === 'tertiary' ? 'white' : variant === 'secondary' ? 'primary200' : 'main');

  // Reset hover state when key props change (fixes Storybook control issues)
  useEffect(() => {
    setIsHovered(false);
  }, [variant, color]);
  const iconPosition = 'iconPosition' in props ? props.iconPosition || 'left' : 'left';
  const showIcon = 'showIcon' in props ? props.showIcon !== false : true;
  const shape = 'shape' in props ? props.shape || 'circle' : 'circle';
  const icon = 'icon' in props ? props.icon : undefined;
  // Get the appropriate arrow icon for primary buttons
  const ArrowIcon = icons.medium.s1ArrowRight;

  // Get hover color for sweep animation
  const getHoverColor = (colorKey: string) => {
    switch (colorKey) {
      case 'black':
        return 'rgba(255, 255, 255, 0.15)'; // White with 15% opacity
      case 'black900':
        return 'rgba(255, 255, 255, 0.15)'; // White with 15% opacity for secondary black
      case 'main':
        return 'rgba(255, 255, 255, 0.15)'; // White with 15% opacity
      case 'light':
        return 'rgba(255, 255, 255, 0.15)'; // White with 15% opacity
      case 'green':
        return 'rgba(255, 255, 255, 0.15)'; // White with 15% opacity
      case 'white':
        return colors.theme.primary200; // Primary200 solid color
      case 'invisible':
        return colors.theme.primary200; // Primary200 solid color
      case 'primary200':
        return colors.theme.primary300; // Theme 300 solid color for secondary buttons
      default:
        return 'rgba(255, 255, 255, 0.15)';
    }
  };

  // Get simple hover background (no sweep animation for now)
  const getSimpleBackground = (normalColor: string, colorKey: string) => {
    if (disabled) {
      return { backgroundColor: normalColor };
    }

    if (isHovered) {
      const hoverColor = getHoverColor(colorKey);
      // For white, invisible, and primary200 buttons, use solid hover color
      if (colorKey === 'white' || colorKey === 'invisible' || colorKey === 'primary200') {
        return { backgroundColor: hoverColor };
      }
      // For others (including black900), blend the colors
      return {
        backgroundColor: normalColor,
        boxShadow: `inset 0 0 0 1000px ${hoverColor}`,
      };
    }

    return {
      backgroundColor: normalColor,
      transition: 'all 0.2s ease',
    };
  };

  // Primary button styles
  const getPrimaryStyles = () => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px',
      padding: '12px 20px',
      borderRadius: borderRadius[4],
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: typography.styles.bodyL.fontFamily.join(', '),
      fontSize: typography.styles.bodyL.fontSize,
      fontWeight: typography.styles.bodyL.fontWeight,
      lineHeight: typography.styles.bodyL.lineHeight,
      letterSpacing: typography.styles.bodyL.letterSpacing,
    };

    switch (color) {
      case 'black':
        const blackBg = disabled ? colors.blackAndWhite.black500 : colors.blackAndWhite.black900;
        return {
          ...baseStyles,
          ...getSimpleBackground(blackBg, 'black'),
          color: colors.blackAndWhite.white,
        };
      case 'main':
        const mainBg = disabled ? colors.theme.primary200 : colors.theme.primary700;
        return {
          ...baseStyles,
          ...getSimpleBackground(mainBg, 'main'),
          color: disabled ? colors.theme.primary400 : colors.blackAndWhite.black900,
        };
      case 'light':
        return {
          ...baseStyles,
          ...getSimpleBackground(colors.theme.primary300, 'light'),
          color: colors.blackAndWhite.black900,
        };
      case 'green':
        return {
          ...baseStyles,
          ...getSimpleBackground(colors.success.fill, 'green'),
          color: colors.blackAndWhite.black900,
        };
      case 'white':
        return {
          ...baseStyles,
          ...getSimpleBackground(colors.blackAndWhite.white, 'white'),
          color: disabled ? colors.blackAndWhite.black500 : colors.blackAndWhite.black900,
          border: `1px solid ${disabled ? '#dfdfdf' : colors.theme.primary400}`,
        };
      case 'invisible':
        return {
          ...baseStyles,
          ...getSimpleBackground(colors.blackAndWhite.white, 'invisible'),
          color: disabled ? colors.blackAndWhite.black500 : colors.blackAndWhite.black900,
        };
      default:
        return baseStyles;
    }
  };

  // Small button styles
  const getSmallStyles = () => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: showIcon && icon ? '10px' : '0px', // Only add gap when icon is actually shown
      height: '30px', // Fixed height of 30px
      padding: '0 12px', // Remove vertical padding since we have fixed height
      borderRadius: borderRadius[4],
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: typography.styles.bodyM.fontFamily.join(', '),
      fontSize: typography.styles.bodyM.fontSize,
      fontWeight: typography.styles.bodyM.fontWeight,
      lineHeight: typography.styles.bodyM.lineHeight,
      letterSpacing: typography.styles.bodyM.letterSpacing,
    };

    switch (color) {
      case 'black':
        const smallBlackBg = disabled ? colors.blackAndWhite.black300 : colors.blackAndWhite.black900;
        return {
          ...baseStyles,
          ...getSimpleBackground(smallBlackBg, 'black'),
          color: colors.blackAndWhite.white,
        };
      case 'main':
        const smallMainBg = disabled ? colors.theme.primary200 : colors.theme.primary700;
        return {
          ...baseStyles,
          ...getSimpleBackground(smallMainBg, 'main'),
          color: disabled ? colors.theme.primary400 : colors.blackAndWhite.black900,
        };
      case 'light':
        return {
          ...baseStyles,
          ...getSimpleBackground(colors.theme.primary300, 'light'),
          color: colors.blackAndWhite.black900,
        };
      case 'green':
        return {
          ...baseStyles,
          ...getSimpleBackground(colors.success.fill, 'green'),
          color: colors.blackAndWhite.black900,
        };
      case 'white':
        return {
          ...baseStyles,
          ...getSimpleBackground(colors.blackAndWhite.white, 'white'),
          color: disabled ? colors.blackAndWhite.black500 : colors.blackAndWhite.black900,
          border: `1px solid ${disabled ? colors.blackAndWhite.black100 : colors.theme.primary400}`,
        };
      case 'invisible':
        return {
          ...baseStyles,
          ...getSimpleBackground(colors.blackAndWhite.white, 'invisible'),
          color: disabled ? colors.blackAndWhite.black500 : colors.blackAndWhite.black900,
        };
      default:
        return baseStyles;
    }
  };

  // Tertiary button styles
  const getTertiaryStyles = () => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      padding: '10px 20px',
      borderRadius: borderRadius[8],
      border: `1px solid ${colors.theme.primary400}`,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: typography.styles.bodyM.fontFamily.join(', '),
      fontSize: typography.styles.bodyM.fontSize,
      fontWeight: typography.styles.bodyM.fontWeight,
      lineHeight: typography.styles.bodyM.lineHeight,
      letterSpacing: typography.styles.bodyM.letterSpacing,
    };

    return {
      ...baseStyles,
      ...getSimpleBackground(colors.blackAndWhite.white, 'white'),
      color: disabled ? colors.blackAndWhite.black500 : colors.blackAndWhite.black800,
    };
  };

  // Secondary button styles
  const getSecondaryStyles = () => {
    const secondaryColor = variant === 'secondary' ? (color as SecondaryColor) || 'primary200' : 'primary200';

    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px', // Add gap for icon support
      padding: '6px 12px',
      borderRadius: borderRadius.absolute, // Round corners
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: typography.styles.bodyS.fontFamily.join(', '),
      fontSize: typography.styles.bodyS.fontSize,
      fontWeight: 600,
      lineHeight: typography.styles.bodyS.lineHeight,
      letterSpacing: '1px', // 1px letter spacing
      textTransform: 'uppercase' as const, // All caps
    };

    // Determine background and text color based on secondaryColor
    switch (secondaryColor) {
      case 'black':
        return {
          ...baseStyles,
          ...getSimpleBackground(colors.blackAndWhite.black900, 'black900'),
          color: disabled ? colors.blackAndWhite.black500 : colors.blackAndWhite.white,
        };
      case 'white':
        return {
          ...baseStyles,
          ...getSimpleBackground(colors.blackAndWhite.white, 'white'),
          color: disabled ? colors.blackAndWhite.black500 : colors.blackAndWhite.black900,
        };
      case 'primary200':
      default:
        return {
          ...baseStyles,
          ...getSimpleBackground(colors.theme.primary200, 'primary200'),
          color: disabled ? colors.blackAndWhite.black500 : colors.blackAndWhite.black900,
        };
    }
  };

  // Icon button styles
  const getIconStyles = () => {
    const baseStyles = {
      width: '26px',
      height: '26px',
      padding: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      opacity: disabled ? 0.5 : 1,
      overflow: 'hidden',
      border: 'none',
    };

    const shapeStyles = shape === 'circle'
      ? { borderRadius: borderRadius.absolute }
      : { borderRadius: borderRadius[8] };

    switch (color) {
      case 'black':
        return {
          ...baseStyles,
          ...shapeStyles,
          ...getSimpleBackground(colors.blackAndWhite.black900, 'black'),
        };
      case 'main':
        return {
          ...baseStyles,
          ...shapeStyles,
          ...getSimpleBackground(colors.theme.primary700, 'main'),
        };
      case 'light':
        return {
          ...baseStyles,
          ...shapeStyles,
          ...getSimpleBackground(colors.theme.primary300, 'light'),
        };
      case 'green':
        return {
          ...baseStyles,
          ...shapeStyles,
          ...getSimpleBackground(colors.success.fill, 'green'),
        };
      case 'white':
        return {
          ...baseStyles,
          ...shapeStyles,
          ...getSimpleBackground(colors.blackAndWhite.white, 'white'),
          border: `1px solid ${colors.theme.primary400}`,
        };
      case 'invisible':
        return {
          ...baseStyles,
          ...shapeStyles,
          ...getSimpleBackground(colors.blackAndWhite.white, 'invisible'),
        };
      case 'primary200':
        return {
          ...baseStyles,
          ...shapeStyles,
          ...getSimpleBackground(colors.theme.primary200, 'primary200'),
          color: colors.blackAndWhite.black900,
        };
      default:
        return {
          ...baseStyles,
          ...shapeStyles,
          ...getSimpleBackground(colors.theme.primary700, 'main'),
        };
    }
  };

  // Get icon color for primary buttons
  const getPrimaryIconColor = () => {
    if (disabled) {
      switch (color) {
        case 'black':
          return colors.theme.primary700;
        case 'main':
          return colors.theme.primary400;
        case 'light':
          return colors.blackAndWhite.black900;
        case 'green':
          return colors.blackAndWhite.black900;
        case 'white':
          return colors.blackAndWhite.black500;
        case 'invisible':
          return colors.blackAndWhite.black500;
        default:
          return 'currentColor';
      }
    }

    switch (color) {
      case 'black':
        return colors.theme.primary700;
      case 'main':
        return colors.blackAndWhite.black900;
      case 'light':
        return colors.blackAndWhite.black900;
      case 'green':
        return colors.blackAndWhite.black900;
      case 'white':
        // Use green900 for analytics theme to ensure proper contrast
        return currentTheme === 'analytics' ? colors.analytics.green900 : colors.theme.primary700;
      case 'invisible':
        // Use green900 for analytics theme to ensure proper contrast
        return currentTheme === 'analytics' ? colors.analytics.green900 : colors.theme.primary700;
      default:
        return 'currentColor';
    }
  };

  // Get icon color for icon buttons
  const getIconColor = () => {
    switch (color) {
      case 'black':
        return colors.theme.primary700;
      case 'white':
        // Use green900 for analytics theme to ensure proper contrast
        return currentTheme === 'analytics' ? colors.analytics.green900 : colors.theme.primary700;
      case 'invisible':
        // Use green900 for analytics theme to ensure proper contrast
        return currentTheme === 'analytics' ? colors.analytics.green900 : colors.theme.primary700;
      case 'primary200':
        return colors.theme.primary200;
      default:
        return colors.blackAndWhite.black900;
    }
  };

  // Get icon color for small buttons
  const getSmallIconColor = () => {
    if (disabled) {
      switch (color) {
        case 'black':
          return colors.theme.primary400;
        case 'main':
          return colors.theme.primary400;
        case 'light':
          return colors.blackAndWhite.black900;
        case 'green':
          return colors.blackAndWhite.black900;
        case 'white':
          return colors.blackAndWhite.black500;
        case 'invisible':
          return colors.blackAndWhite.black500;
        default:
          return colors.theme.primary400;
      }
    }

    switch (color) {
      case 'black':
        return colors.theme.primary700; // Updated to blue700
      case 'main':
        return colors.blackAndWhite.black900;
      case 'light':
        return colors.blackAndWhite.black900;
      case 'green':
        return colors.blackAndWhite.black900;
      case 'white':
        // Use green900 for analytics theme to ensure proper contrast
        return currentTheme === 'analytics' ? colors.analytics.green900 : colors.theme.primary700;
      case 'invisible':
        // Use green900 for analytics theme to ensure proper contrast
        return currentTheme === 'analytics' ? colors.analytics.green900 : colors.theme.primary700;
      default:
        return colors.blackAndWhite.black900;
    }
  };

  // Get styles based on variant
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return getPrimaryStyles();
      case 'small':
        return getSmallStyles();
      case 'icon':
        return getIconStyles();
      case 'tertiary':
        return getTertiaryStyles();
      case 'secondary':
        return getSecondaryStyles();
      default:
        return getPrimaryStyles();
    }
  };

  // Render icon for primary buttons
  const renderPrimaryIcon = () => {
    if (!showIcon || variant !== 'primary') return null;

    if (icon) {
      // Clone the icon and pass the color prop
      const iconColor = getPrimaryIconColor();
      return (
        <span style={{ display: 'flex', alignItems: 'center', color: iconColor }}>
          {React.cloneElement(icon as React.ReactElement, { color: iconColor })}
        </span>
      );
    }

    return <ArrowIcon color={getPrimaryIconColor()} />;
  };

  // Render icon for small buttons
  const renderSmallIcon = () => {
    if (!showIcon || variant !== 'small') return null;

    if (icon) {
      // Clone the icon and pass the color prop
      const iconColor = getSmallIconColor();
      return (
        <span style={{ display: 'flex', alignItems: 'center', color: iconColor }}>
          {React.cloneElement(icon as React.ReactElement, { color: iconColor })}
        </span>
      );
    }

    // No default icon - only show icon when explicitly provided
    return null;
  };

  // Render icon for tertiary buttons
  const renderTertiaryIcon = () => {
    if (variant !== 'tertiary') return null;

    const defaultIcon = <icons.medium.add color={colors.blackAndWhite.black900} />;
    const iconToRender = icon || defaultIcon;

    return (
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: borderRadius[8],
        backgroundColor: colors.theme.primary700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {React.cloneElement(iconToRender as React.ReactElement, {
          color: colors.blackAndWhite.black900,
          style: { width: '12px', height: '12px' }
        })}
      </div>
    );
  };

  // Render content based on variant
  const renderContent = () => {
    if (variant === 'icon') {
      const defaultIcon = <icons.small.s1ArrowRight color={getIconColor()} />;
      return icon || defaultIcon;
    }

    if (variant === 'primary') {
      return (
        <>
          {iconPosition === 'left' && renderPrimaryIcon()}
          <span>{children}</span>
          {iconPosition === 'right' && renderPrimaryIcon()}
        </>
      );
    }

    if (variant === 'small') {
      return (
        <>
          {iconPosition === 'left' && renderSmallIcon()}
          <span>{children}</span>
          {iconPosition === 'right' && renderSmallIcon()}
        </>
      );
    }

    if (variant === 'tertiary') {
      return (
        <>
          {renderTertiaryIcon()}
          <span>{children}</span>
        </>
      );
    }

    if (variant === 'secondary') {
      // Render icon if provided
      if (icon) {
        return (
          <>
            {icon}
            <span>{children}</span>
          </>
        );
      }
      return <span>{children}</span>;
    }

    // Fallback
    return <span>{children}</span>;
  };

  const buttonStyles = getButtonStyles();

  // Merge external styles with button styles, giving priority to external styles
  const finalStyles = { ...buttonStyles, ...style };

  return (
    <button
      ref={ref}
      style={finalStyles}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      disabled={disabled}
      className={className}
      type="button"
    >
      {renderContent()}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;