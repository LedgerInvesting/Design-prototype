import React, { useState } from 'react';
import { borderRadius, typography, useSemanticColors } from '../tokens';

export type SelectorVariant = 'checkbox' | 'radio';

export interface SelectorProps {
  /** Selector variant */
  variant?: SelectorVariant;
  /** Label text for the selector */
  label?: string;
  /** Whether the selector is checked/selected */
  checked?: boolean;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Callback when selector state changes */
  onChange?: (checked: boolean) => void;
  /** Additional CSS class for the container */
  className?: string;
  /** Name attribute for form handling */
  name?: string;
  /** ID for the selector input */
  id?: string;
  /** Value for the selector (used in radio groups) */
  value?: string;
  /** Size of the checkbox/radio (default: 18) */
  size?: number;
}

export const Selector: React.FC<SelectorProps> = ({
  variant = 'checkbox',
  label,
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  className,
  name,
  id,
  value,
  size = 18,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const colors = useSemanticColors();

  // Use controlled value if provided, otherwise use internal state
  const isSelected = checked !== undefined ? checked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked);
  };

  // Determine current state for styling (only default and filled)
  const getState = () => {
    if (disabled) return 'disabled';
    if (isSelected) return 'filled';
    return 'default';
  };

  const state = getState();

  // Selector visual styles based on variant and state
  const getSelectorStyles = () => {
    const baseStyles = {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: variant === 'radio' ? borderRadius.absolute : borderRadius[4],
      border: '1px solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      position: 'relative' as const,
    };

    switch (state) {
      case 'default':
        return {
          ...baseStyles,
          borderColor: colors.theme.primary400,
          backgroundColor: colors.blackAndWhite.white,
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
            : colors.blackAndWhite.white,
          opacity: 0.5,
        };
      default:
        return baseStyles;
    }
  };

  // Checkmark icon (used for both checkbox and radio when selected)
  const checkmarkSize = Math.round(size * 0.67); // 67% of the selector size
  const CheckmarkIcon = () => (
    <svg
      width={checkmarkSize}
      height={checkmarkSize}
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

  const selectorStyles = getSelectorStyles();

  // Label styles using design tokens
  const labelStyles = {
    fontFamily: typography.styles.bodyM.fontFamily.join(', '),
    fontSize: typography.styles.bodyM.fontSize,
    fontWeight: typography.styles.bodyM.fontWeight,
    lineHeight: typography.styles.bodyM.lineHeight,
    letterSpacing: typography.styles.bodyM.letterSpacing,
    color: disabled ? colors.blackAndWhite.black500 : colors.blackAndWhite.black900,
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none' as const,
  };

  return (
    <label
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      htmlFor={id}
    >
      <div style={{ position: 'relative' }}>
        <input
          type={variant}
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
      {label && <span style={labelStyles}>{label}</span>}
    </label>
  );
};

export default Selector;