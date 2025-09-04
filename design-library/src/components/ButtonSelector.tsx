import React, { useState } from 'react';
import { colors, borderRadius, typography } from '../tokens';

export type ButtonSelectorType = 'checkbox' | 'radio';

export interface ButtonSelectorProps {
  /** Button text/label */
  label: string;
  /** Type of selector - checkbox or radio */
  selectorType?: ButtonSelectorType;
  /** Whether the selector is checked/selected */
  checked?: boolean;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Whether the button selector is disabled */
  disabled?: boolean;
  /** Callback when selector state changes */
  onChange?: (checked: boolean) => void;
  /** Additional CSS class for the container */
  className?: string;
  /** Name attribute for form handling */
  name?: string;
  /** ID for the input */
  id?: string;
  /** Value for the input (used in radio groups) */
  value?: string;
}

export const ButtonSelector: React.FC<ButtonSelectorProps> = ({
  label,
  selectorType = 'checkbox',
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  className,
  name,
  id,
  value,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // Use controlled value if provided, otherwise use internal state
  const isSelected = checked !== undefined ? checked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked);
  };

  // Determine current state for styling (3 states: default, active, filled)
  const getState = () => {
    if (disabled) return 'disabled';
    if (isSelected) return 'filled';
    return 'default';
  };

  const state = getState();

  // Button container styles based on state
  const getButtonStyles = () => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: borderRadius[8],
      border: '1.5px solid',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: typography.styles.bodyM.fontFamily.join(', '),
      fontSize: typography.styles.bodyM.fontSize,
      fontWeight: typography.styles.bodyM.fontWeight,
      lineHeight: typography.styles.bodyM.lineHeight,
      letterSpacing: typography.styles.bodyM.letterSpacing,
      userSelect: 'none' as const,
      minHeight: '44px',
    };

    switch (state) {
      case 'default':
        return {
          ...baseStyles,
          borderColor: colors.reports.dynamic.blue400,
          backgroundColor: colors.blackAndWhite.white,
          color: colors.blackAndWhite.black900,
          borderWidth: '1px',
        };
      case 'filled':
        return {
          ...baseStyles,
          borderColor: colors.reports.dynamic.blue400,
          backgroundColor: colors.blackAndWhite.white,
          color: colors.blackAndWhite.black900,
          borderWidth: '1px',
        };
      case 'disabled':
        return {
          ...baseStyles,
          borderColor: colors.blackAndWhite.black100,
          backgroundColor: colors.blackAndWhite.white,
          color: colors.blackAndWhite.black500,
          opacity: 0.6,
          borderWidth: '1px',
        };
      default:
        return baseStyles;
    }
  };

  // Selector visual styles based on type and state
  const getSelectorStyles = () => {
    const baseStyles = {
      width: '18px',
      height: '18px',
      borderRadius: selectorType === 'radio' ? borderRadius.absolute : borderRadius[4],
      border: '1px solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      flexShrink: 0,
    };

    switch (state) {
      case 'default':
        return {
          ...baseStyles,
          borderColor: colors.reports.dynamic.blue400,
          backgroundColor: selectorType === 'radio' ? 'transparent' : colors.blackAndWhite.white,
        };
      case 'filled':
        return {
          ...baseStyles,
          border: '1px solid transparent',
          backgroundColor: colors.blackAndWhite.black900,
        };
      case 'disabled':
        return {
          ...baseStyles,
          borderColor: colors.blackAndWhite.black100,
          backgroundColor: isSelected 
            ? colors.blackAndWhite.black100 
            : (selectorType === 'radio' ? 'transparent' : colors.blackAndWhite.white),
        };
      default:
        return baseStyles;
    }
  };

  // Checkmark icon (used for both checkbox and radio when selected)
  const CheckmarkIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 6L4.5 8.5L10 3"
        stroke={state === 'disabled' ? colors.blackAndWhite.black500 : colors.success.fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const buttonStyles = getButtonStyles();
  const selectorStyles = getSelectorStyles();

  return (
    <label
      className={className}
      style={buttonStyles}
      htmlFor={id}
    >
      <div style={{ position: 'relative' }}>
        <input
          type={selectorType}
          id={id}
          name={name}
          value={value}
          checked={isSelected}
          disabled={disabled}
          onChange={handleChange}
          style={{
            position: 'absolute',
            opacity: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        />
        <div style={selectorStyles}>
          {isSelected && <CheckmarkIcon />}
        </div>
      </div>
      <span style={{ flex: 1 }}>{label}</span>
    </label>
  );
};

export default ButtonSelector;