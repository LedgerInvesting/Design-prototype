import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { borderRadius, spacing, shadows, typography, useSemanticColors } from '../tokens';
import { icons } from '../icons';
import { InfoTooltip, InfoTooltipSection } from './InfoTooltip';
import { commonStyles } from '../utils/styleInjection';
import { commonTypographyStyles } from '../utils/typography';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { CustomScroll } from './CustomScroll';
import type { DropdownOption } from './MenuDropdown';

export interface FormDropdownProps {
  /** Dropdown label */
  label?: string;
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
  /** Label position - 'top' (default) or 'left' */
  labelPosition?: 'top' | 'left';
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
}

export const FormDropdown = forwardRef<HTMLDivElement, FormDropdownProps>(({
  label = 'Label',
  placeholder = 'Select an option...',
  value = '',
  options = [],
  state = 'default',
  showTooltip = false,
  tooltipText,
  tooltipSections,
  helperText,
  labelPosition = 'top',
  onChange,
  onFocus,
  onBlur,
  className,
  disabled = false,
}, ref) => {
  const [internalState, setInternalState] = useState<'default' | 'active' | 'filled'>(state === 'active' ? 'active' : 'default');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const colors = useSemanticColors();

  // Initialize scrollbar styles
  useEffect(() => {
    commonStyles.customScrollbar('dropdown');
  }, []);

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
      display: 'flex',
      alignItems: 'center',
      height: '34px',
      padding: '8px 10px 10px 12px',
      borderRadius: borderRadius[4],
      backgroundColor: colors.blackAndWhite.white,
      border: '1px solid',
      gap: spacing[2],
      position: 'relative' as const,
      cursor: disabled ? 'default' : 'pointer',
    };

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
      flex: 1,
      ...commonTypographyStyles.field(),
      color: value
        ? (actualState === 'disabled' ? colors.blackAndWhite.black500 : colors.blackAndWhite.black900)
        : colors.blackAndWhite.black500,
      userSelect: 'none' as const,
    };
  };

  const getDropdownListStyles = () => {
    return {
      position: 'absolute' as const,
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: colors.blackAndWhite.white,
      border: `1px solid ${colors.theme.primary400}`,
      borderRadius: borderRadius[8],
      marginTop: spacing[1],
      zIndex: 1000,
      boxShadow: shadows.md,
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
  const displayText = selectedOption ? selectedOption.label : placeholder;

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
    <div className={className} style={{
      display: 'flex',
      flexDirection: labelPosition === 'left' ? 'row' : 'column',
      alignItems: labelPosition === 'left' ? 'center' : 'stretch',
      gap: labelPosition === 'left' ? spacing[3] : '0'
    }}>
      {/* Label with optional tooltip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[2],
        marginBottom: labelPosition === 'left' ? '0' : spacing[1],
        height: '20px',
        flexShrink: 0
      }}>
        <label style={{
          ...commonTypographyStyles.label(),
          color: colors.blackAndWhite.black900,
          whiteSpace: 'nowrap'
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

      {/* Dropdown container */}
      <div ref={dropdownRef} style={{ position: 'relative', flex: labelPosition === 'left' ? 1 : 'initial' }}>
        <div
          ref={ref}
          style={containerStyles}
          onClick={handleDropdownClick}
        >
          {/* Display text */}
          <div style={displayTextStyles}>
            {displayText}
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
              <CustomScroll maxHeight="200px" scrollClassName="dropdown-forms-scroll">
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

FormDropdown.displayName = 'FormDropdown';

export default FormDropdown;
