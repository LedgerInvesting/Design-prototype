import React, { useState, useEffect } from 'react';
import { typography, borderRadius, useSemanticColors } from '../tokens';
import { SearchMedium } from '../icons';

export interface SearchBarProps {
  /** Current search value */
  value?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Disabled state */
  disabled?: boolean;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>((props, ref) => {
  const {
    value = '',
    onChange,
    placeholder = 'Search...',
    className,
    style,
    disabled = false,
    ...restProps
  } = props;

  const colors = useSemanticColors();

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        ...style
      }}
      className={className}
    >
      <div
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <SearchMedium color={colors.blackAndWhite.black500} />
      </div>

      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: '100%',
          height: '40px',
          backgroundColor: colors.theme.primary200,
          border: 'none',
          borderRadius: borderRadius[24],
          paddingLeft: '44px', // Space for search icon
          paddingRight: '16px',
          ...typography.styles.bodyM,
          color: colors.blackAndWhite.black900,
          outline: 'none',
          cursor: disabled ? 'not-allowed' : 'text',
          opacity: disabled ? 0.6 : 1,
          '::placeholder': {
            color: colors.blackAndWhite.black500
          }
        }}
        {...restProps}
      />
    </div>
  );
});

SearchBar.displayName = 'SearchBar';