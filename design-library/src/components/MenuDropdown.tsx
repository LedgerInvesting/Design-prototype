import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { borderRadius, spacing, shadows, typography, useSemanticColors } from '../tokens';
import { icons } from '../icons';
import { InfoTooltip, InfoTooltipSection } from './InfoTooltip';
import { commonTypographyStyles } from '../utils/typography';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { CustomScroll } from './CustomScroll';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MenuDropdownProps {
  /** Dropdown label */
  label?: string;
  /** Show label (default: true) */
  showLabel?: boolean;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Selected value */
  value?: string;
  /** Available options */
  options?: DropdownOption[];
  /** Dropdown state */
  state?: 'default' | 'active' | 'filled' | 'warning' | 'error' | 'disabled';
  /** Show info tooltip */
  showTooltip?: boolean;
  /** Tooltip text content */
  tooltipText?: string;
  /** Tooltip sections for complex content */
  tooltipSections?: InfoTooltipSection[];
  /** Error/warning message */
  helperText?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Focus handler */
  onFocus?: () => void;
  /** Blur handler */
  onBlur?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Custom trigger background color */
  triggerBackgroundColor?: string;
  /** Show border (default: true) */
  showBorder?: boolean;
  /** Selected value prefix (default: 'Option') */
  selectedPrefix?: string;
}

export const MenuDropdown = forwardRef<HTMLDivElement, MenuDropdownProps>(({
  label = 'Label',
  showLabel = false,
  placeholder = 'Select an option...',
  value = '',
  options = [],
  state = 'default',
  showTooltip = false,
  tooltipText,
  tooltipSections,
  helperText,
  onChange,
  onFocus,
  onBlur,
  className,
  disabled = false,
  triggerBackgroundColor,
  showBorder = false,
  selectedPrefix = 'Option',
}, ref) => {
  const [internalState, setInternalState] = useState<'default' | 'active' | 'filled'>(state === 'active' ? 'active' : 'default');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const colors = useSemanticColors();

  // Determine actual state - prioritize error/warning, then check if filled, then use internal state
  const actualState = disabled ? 'disabled' :
    (state === 'error' || state === 'warning') ? state :
    (value && internalState !== 'active') ? 'filled' : internalState;

  const isError = state === 'error';
  const isWarning = state === 'warning';
  const isActive = actualState === 'active';

  // Handle outside clicks
  useOutsideClick(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
      if (!disabled && state !== 'error' && state !== 'warning') {
        setInternalState(value ? 'filled' : 'default');
      }
      onBlur?.();
    }
  });

  // Get styles based on state
  const getDropdownContainerStyles = () => {
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      height: '34px',
      padding: '10px 15px 10px 15px',
      borderRadius: borderRadius.absolute,
      backgroundColor: triggerBackgroundColor || colors.theme.primary200,
      border: showBorder ? '1px solid' : 'none',
      gap: spacing[2],
      position: 'relative' as const,
      cursor: disabled ? 'default' : 'pointer',
      minWidth: 'fit-content',
      width: 'fit-content',
    };

    // If custom background is provided, use simple styling
    if (triggerBackgroundColor) {
      return {
        ...baseStyles,
        borderColor: showBorder ? colors.theme.primary400 : 'transparent',
      };
    }

    // Default state-based styling
    switch (actualState) {
      case 'error':
        return {
          ...baseStyles,
          backgroundColor: colors.error.fillLight,
          borderColor: colors.error.darkBorders,
        };
      case 'warning':
        return {
          ...baseStyles,
          backgroundColor: colors.warning.fillLight,
          borderColor: colors.warning.dark,
        };
      case 'active':
        return {
          ...baseStyles,
          borderColor: colors.blackAndWhite.black700,
        };
      case 'filled':
        return {
          ...baseStyles,
          borderColor: colors.theme.primary400,
        };
      case 'disabled':
        return {
          ...baseStyles,
          borderColor: colors.theme.primary400,
          opacity: 0.6,
          cursor: 'default',
        };
      default:
        return {
          ...baseStyles,
          borderColor: colors.theme.primary400,
        };
    }
  };

  const getDisplayTextStyles = () => {
    return {
      ...commonTypographyStyles.field(),
      userSelect: 'none' as const,
      whiteSpace: 'nowrap' as const,
    };
  };

  const getDropdownListStyles = () => {
    return {
      position: 'absolute' as const,
      top: '100%',
      left: 0,
      right: 0,
      minWidth: '100%',
      width: 'fit-content',
      backgroundColor: colors.blackAndWhite.white,
      border: 'none',
      borderRadius: borderRadius[8],
      marginTop: spacing[1],
      zIndex: 1000,
      boxShadow: shadows.medium,
      padding: '10px',
    };
  };

  const getOptionStyles = (option: DropdownOption, isHovered: boolean, hasScrollbar: boolean) => {
    return {
      padding: hasScrollbar ? '12px 10px 12px 10px' : '12px 10px',
      paddingRight: hasScrollbar ? '10px' : '10px',
      marginRight: hasScrollbar ? '10px' : '0',
      borderRadius: borderRadius[4],
      fontFamily: typography.styles.bodyM.fontFamily.join(', '),
      fontSize: typography.styles.bodyM.fontSize,
      fontWeight: typography.styles.bodyM.fontWeight,
      lineHeight: typography.styles.bodyM.lineHeight,
      color: option.disabled
        ? colors.blackAndWhite.black500
        : colors.blackAndWhite.black900,
      backgroundColor: isHovered && !option.disabled
        ? colors.theme.primary200
        : 'transparent',
      cursor: option.disabled ? 'default' : 'pointer',
    };
  };

  const getHelperTextStyles = () => {
    return {
      fontFamily: typography.styles.bodyS.fontFamily.join(', '),
      fontSize: typography.styles.bodyS.fontSize,
      fontWeight: typography.styles.bodyS.fontWeight,
      lineHeight: typography.styles.bodyS.lineHeight,
      marginTop: spacing[2],
      color: isError ? colors.error.darkBorders : isWarning ? colors.warning.dark : colors.blackAndWhite.black500,
    };
  };

  const containerStyles = getDropdownContainerStyles();
  const displayTextStyles = getDisplayTextStyles();
  const dropdownListStyles = getDropdownListStyles();
  const helperTextStyles = getHelperTextStyles();

  const selectedOption = options.find(option => option.value === value);

  const handleDropdownClick = () => {
    if (disabled) return;

    if (!isOpen) {
      setIsOpen(true);
      if (state !== 'error' && state !== 'warning') {
        setInternalState('active');
      }
      onFocus?.();
    }
  };

  const handleOptionClick = (optionValue: string) => {
    if (disabled) return;

    const option = options.find(opt => opt.value === optionValue);
    if (option && !option.disabled) {
      onChange?.(optionValue);
      setIsOpen(false);
      if (state !== 'error' && state !== 'warning') {
        setInternalState('filled');
      }
    }
  };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Label with optional tooltip */}
      {showLabel && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          marginBottom: spacing[1],
          height: '20px'
        }}>
          <label style={{
            ...commonTypographyStyles.label(),
            color: colors.blackAndWhite.black900,
          }}>
            {label}
          </label>
          {showTooltip && (
            <InfoTooltip
              text={tooltipText}
              sections={tooltipSections}
              position="bottom-right"
              size="small"
            />
          )}
        </div>
      )}

      {/* Dropdown container */}
      <div ref={dropdownRef} style={{ position: 'relative' }}>
        <div
          ref={ref}
          style={containerStyles}
          onClick={handleDropdownClick}
        >
          {/* Display text */}
          <div style={displayTextStyles}>
            {selectedOption ? (
              <>
                {selectedPrefix && (
                  <span style={{ color: colors.blackAndWhite.black500 }}>
                    {selectedPrefix}:{' '}
                  </span>
                )}
                <span style={{
                  color: actualState === 'disabled'
                    ? colors.blackAndWhite.black500
                    : colors.blackAndWhite.black900
                }}>
                  {selectedOption.label}
                </span>
              </>
            ) : (
              <span style={{ color: colors.blackAndWhite.black500 }}>
                {placeholder}
              </span>
            )}
          </div>

          {/* Chevron icon */}
          <div style={{
            width: '8px',
            height: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}>
            <icons.extraSmall.chevronDown color={colors.blackAndWhite.black700} />
          </div>
        </div>

        {/* Dropdown list */}
        {isOpen && !disabled && (
          <div style={dropdownListStyles} className="dropdown-list">
            {options.length > 5 ? (
              <CustomScroll maxHeight="200px" scrollClassName="dropdown-scroll">
                {options.map((option, index) => (
                  <div
                    key={option.value}
                    style={getOptionStyles(option, false, true)}
                    onClick={() => handleOptionClick(option.value)}
                    onMouseEnter={(e) => {
                      if (!option.disabled) {
                        (e.target as HTMLElement).style.backgroundColor = colors.theme.primary200;
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </CustomScroll>
            ) : (
              <>
                {options.map((option, index) => (
                  <div
                    key={option.value}
                    style={getOptionStyles(option, false, false)}
                    onClick={() => handleOptionClick(option.value)}
                    onMouseEnter={(e) => {
                      if (!option.disabled) {
                        (e.target as HTMLElement).style.backgroundColor = colors.theme.primary200;
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Helper text */}
      {helperText && (
        <div style={helperTextStyles}>
          {helperText}
        </div>
      )}
    </div>
  );
});

MenuDropdown.displayName = 'MenuDropdown';

export default MenuDropdown;
