import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { colors, borderRadius, typography, spacing, shadows } from '../tokens';
import { icons } from '../icons';
import { InfoTooltip, InfoTooltipSection } from './InfoTooltip';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
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

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({
  label = 'Label',
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
}, ref) => {
  const [internalState, setInternalState] = useState<'default' | 'active' | 'filled'>(state === 'active' ? 'active' : 'default');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Add CSS for custom scrollbar
  useEffect(() => {
    const styleId = 'dropdown-scrollbar';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .dropdown-list::-webkit-scrollbar {
          width: 6px;
        }
        .dropdown-list::-webkit-scrollbar-track {
          background: transparent;
        }
        .dropdown-list::-webkit-scrollbar-thumb {
          background-color: ${colors.blackAndWhite.black900};
          border-radius: 3px;
        }
        .dropdown-list::-webkit-scrollbar-thumb:hover {
          background-color: ${colors.blackAndWhite.black700};
        }
        .dropdown-list::-webkit-scrollbar-button {
          display: none;
        }
        .dropdown-list {
          scrollbar-width: thin;
          scrollbar-color: ${colors.blackAndWhite.black900} transparent;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Determine actual state - prioritize error/warning, then check if filled, then use internal state
  const actualState = disabled ? 'disabled' : 
    (state === 'error' || state === 'warning') ? state : 
    (value && internalState !== 'active') ? 'filled' : internalState;

  const isError = state === 'error';
  const isWarning = state === 'warning';
  const isActive = actualState === 'active';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (!disabled && state !== 'error' && state !== 'warning') {
          setInternalState(value ? 'filled' : 'default');
        }
        onBlur?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, disabled, state, value, onBlur]);

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
          borderColor: colors.reports.dynamic.blue400,
        };
      case 'disabled':
        return {
          ...baseStyles,
          borderColor: colors.reports.dynamic.blue400,
          opacity: 0.6,
          cursor: 'default',
        };
      default:
        return {
          ...baseStyles,
          borderColor: colors.reports.dynamic.blue400,
        };
    }
  };

  const getDisplayTextStyles = () => {
    return {
      flex: 1,
      fontFamily: typography.styles.bodyM.fontFamily.join(', '),
      fontSize: typography.styles.bodyM.fontSize,
      fontWeight: typography.styles.bodyM.fontWeight,
      lineHeight: typography.styles.bodyM.lineHeight,
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
      border: `1px solid ${colors.reports.dynamic.blue400}`,
      borderRadius: borderRadius[8],
      marginTop: spacing[1],
      maxHeight: '200px',
      overflowY: 'auto' as const,
      zIndex: 1000,
      boxShadow: shadows.md,
      padding: '10px',
    };
  };

  const getOptionStyles = (option: DropdownOption, isHovered: boolean) => {
    return {
      padding: '12px 10px',
      borderRadius: borderRadius[4],
      fontFamily: typography.styles.bodyM.fontFamily.join(', '),
      fontSize: typography.styles.bodyM.fontSize,
      fontWeight: typography.styles.bodyM.fontWeight,
      lineHeight: typography.styles.bodyM.lineHeight,
      color: option.disabled 
        ? colors.blackAndWhite.black500 
        : colors.blackAndWhite.black900,
      backgroundColor: isHovered && !option.disabled 
        ? colors.reports.dynamic.blue200 
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
    <div className={className} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Label with optional tooltip */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: spacing[2], 
        marginBottom: spacing[1],
        height: '20px'
      }}>
        <label style={{
          fontFamily: typography.styles.bodyM.fontFamily.join(', '),
          fontSize: typography.styles.bodyM.fontSize,
          fontWeight: typography.styles.bodyM.fontWeight,
          lineHeight: typography.styles.bodyM.lineHeight,
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

      {/* Dropdown container */}
      <div ref={dropdownRef} style={{ position: 'relative' }}>
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
            {options.map((option, index) => (
              <div
                key={option.value}
                style={getOptionStyles(option, false)}
                onClick={() => handleOptionClick(option.value)}
                onMouseEnter={(e) => {
                  if (!option.disabled) {
                    (e.target as HTMLElement).style.backgroundColor = colors.reports.dynamic.blue200;
                  }
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                {option.label}
              </div>
            ))}
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

Dropdown.displayName = 'Dropdown';

export default Dropdown;