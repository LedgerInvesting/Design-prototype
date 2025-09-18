import React, { forwardRef, useState, useEffect } from 'react';
import { borderRadius, spacing, useSemanticColors } from '../tokens';
import { icons } from '../icons';
import { InfoTooltip, InfoTooltipSection } from './InfoTooltip';
import { commonStyles } from '../utils/styleInjection';
import { commonTypographyStyles } from '../utils/typography';
import { standardTransition } from '../utils/commonStyles';

export interface InputProps {
  /** Input label */
  label?: string;
  /** Input placeholder text */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Input type */
  type?: 'text' | 'number' | 'email' | 'password';
  /** Input state */
  state?: 'default' | 'active' | 'filled' | 'warning' | 'error' | 'disabled';
  /** Left symbol ($ or %) */
  leftSymbol?: '$' | '%' | null;
  /** Show info tooltip */
  showTooltip?: boolean;
  /** Tooltip text content */
  tooltipText?: string;
  /** Tooltip sections for complex content */
  tooltipSections?: InfoTooltipSection[];
  /** Error/warning message */
  helperText?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Focus handler */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Blur handler */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Additional CSS class */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Field is optional */
  isOptional?: boolean;
  /** Field is required */
  required?: boolean;
  /** Show calendar icon */
  showCalendarIcon?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label = 'Label',
  placeholder = '',
  value = '',
  type = 'text',
  state = 'default',
  leftSymbol = null,
  showTooltip = false,
  tooltipText,
  tooltipSections,
  helperText,
  onChange,
  onFocus,
  onBlur,
  className,
  disabled = false,
  isOptional = false,
  required = false,
  showCalendarIcon = false,
}, ref) => {
  const [internalState, setInternalState] = useState<'default' | 'active' | 'filled'>(state === 'active' ? 'active' : 'default');
  const colors = useSemanticColors();
  
  // Initialize number input styles
  useEffect(() => {
    commonStyles.hideNumberSpinners('input');
  }, []);
  
  // Determine actual state - prioritize error/warning, then check if filled, then use internal state
  const actualState = disabled ? 'disabled' : 
    (state === 'error' || state === 'warning') ? state : 
    (value && internalState !== 'active') ? 'filled' : internalState;
  const isError = state === 'error';
  const isWarning = state === 'warning';
  const isActive = state === 'active';
  
  // Get styles based on state
  const getInputContainerStyles = () => {
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
        };
      default:
        return {
          ...baseStyles,
          borderColor: colors.theme.primary400,
        };
    }
  };

  const getInputStyles = () => {
    return {
      flex: 1,
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      ...commonTypographyStyles.field(),
      color: actualState === 'disabled' ? colors.blackAndWhite.black500 : colors.blackAndWhite.black900,
    };
  };

  const getHelperTextStyles = () => {
    return {
      ...commonTypographyStyles.helper(),
      marginTop: spacing[2],
      color: isError ? colors.error.darkBorders : isWarning ? colors.warning.dark : colors.blackAndWhite.black500,
    };
  };

  const containerStyles = getInputContainerStyles();
  const inputStyles = getInputStyles();
  const helperTextStyles = getHelperTextStyles();


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
          ...commonTypographyStyles.label(),
          color: colors.blackAndWhite.black900,
        }}>
          {label}
          {required && <span style={{ color: colors.blackAndWhite.black900 }}>*</span>}
          {isOptional && <span style={{ color: colors.blackAndWhite.black500, marginLeft: spacing[1] }}>(Optional)</span>}
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

      {/* Input container */}
      <div style={containerStyles}>
        {/* Left symbol */}
        {leftSymbol && (
          <div style={{
            width: spacing[6],
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            ...commonTypographyStyles.field(),
            lineHeight: 1.5,
            color: colors.blackAndWhite.black900,
          }}>
            {leftSymbol}
          </div>
        )}

        {/* Input field */}
        <input
          ref={ref}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={(e) => {
            if (!disabled && state !== 'error' && state !== 'warning') {
              setInternalState('active');
            }
            onFocus?.(e);
          }}
          onBlur={(e) => {
            if (!disabled && state !== 'error' && state !== 'warning') {
              setInternalState(value ? 'filled' : 'default');
            }
            onBlur?.(e);
          }}
          disabled={disabled}
          style={{
            ...inputStyles,
            ...(type === 'number' && {
              MozAppearance: 'textfield',
            })
          }}
          className={type === 'number' ? 'hide-number-spinners' : undefined}
        />

        {/* Calendar icon */}
        {showCalendarIcon && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '22px',
            height: '22px',
            marginLeft: spacing[1],
            cursor: 'pointer',
          }}>
            <icons.small.calendar color={colors.blackAndWhite.black900} />
          </div>
        )}

        {/* Custom number input controls */}
        {type === 'number' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            marginLeft: spacing[1],
          }}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                if (ref && 'current' in ref && ref.current) {
                  ref.current.stepUp();
                  const event = new Event('input', { bubbles: true });
                  ref.current.dispatchEvent(event);
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '2px',
                cursor: disabled ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: disabled ? 0.4 : 1,
              }}
            >
              <icons.extraSmall.chevronUp 
                color={colors.blackAndWhite.black700}
              />
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                if (ref && 'current' in ref && ref.current) {
                  ref.current.stepDown();
                  const event = new Event('input', { bubbles: true });
                  ref.current.dispatchEvent(event);
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '2px',
                cursor: disabled ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: disabled ? 0.4 : 1,
              }}
            >
              <icons.extraSmall.chevronDown color={colors.blackAndWhite.black700} />
            </button>
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

Input.displayName = 'Input';

export default Input;