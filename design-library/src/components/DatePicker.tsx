import React, { forwardRef, useState, useEffect } from 'react';
import { colors, borderRadius, typography, spacing } from '../tokens';
import { icons } from '../icons';
import { InfoTooltip, InfoTooltipSection } from './InfoTooltip';
import { DatePickerModal } from './DatePickerModal';

export interface DatePickerProps {
  /** DatePicker label */
  label?: string;
  /** DatePicker placeholder text */
  placeholder?: string;
  /** DatePicker value */
  value?: string;
  /** DatePicker state */
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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Focus handler */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Blur handler */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Additional CSS class */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Calendar icon click handler */
  onCalendarClick?: () => void;
  /** End date value for range picker */
  endDate?: string;
  /** Date range selection handler */
  onDateRangeChange?: (startDate: string, endDate: string) => void;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({
  label = 'Label',
  placeholder = 'Select date range',
  value = '',
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
  onCalendarClick,
  endDate = '',
  onDateRangeChange,
}, ref) => {
  const [internalState, setInternalState] = useState<'default' | 'active' | 'filled'>(state === 'active' ? 'active' : 'default');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal handlers
  const handleOpenModal = () => {
    setIsModalOpen(true);
    if (onCalendarClick) {
      onCalendarClick();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDateRangeApply = (startDate: string, endDate: string) => {
    if (onDateRangeChange) {
      onDateRangeChange(startDate, endDate);
    }
    
    // Format dates for display in the input field (avoiding timezone issues)
    const formatDateForDisplay = (dateStr: string): string => {
      if (!dateStr) return '';
      try {
        // Parse date string manually to avoid timezone issues
        const parts = dateStr.split('-');
        if (parts.length === 3) {
          const year = parseInt(parts[0]);
          const month = parseInt(parts[1]);
          const day = parseInt(parts[2]);
          return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        }
        // Fallback to original method if not in expected format
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        const dayVal = date.getDate().toString().padStart(2, '0');
        const monthVal = (date.getMonth() + 1).toString().padStart(2, '0');
        const yearVal = date.getFullYear();
        return `${dayVal}/${monthVal}/${yearVal}`;
      } catch {
        return dateStr;
      }
    };

    // Create the display format
    const formattedStartDate = formatDateForDisplay(startDate);
    
    let dateDisplay = '';
    if (endDate) {
      // Date range format: "DD/MM/YYYY to DD/MM/YYYY"
      const formattedEndDate = formatDateForDisplay(endDate);
      dateDisplay = `${formattedStartDate} to ${formattedEndDate}`;
    } else {
      // Single date format for "current" period: "From DD/MM/YYYY"
      dateDisplay = `From ${formattedStartDate}`;
    }
    
    // Update the input field with the formatted display
    if (onChange) {
      onChange({ target: { value: dateDisplay } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDateRangeClear = () => {
    if (onDateRangeChange) {
      onDateRangeChange('', '');
    }
    if (onChange) {
      onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  
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
          borderColor: colors.reports.dynamic.blue400,
        };
      case 'disabled':
        return {
          ...baseStyles,
          borderColor: colors.reports.dynamic.blue400,
          opacity: 0.6,
        };
      default:
        return {
          ...baseStyles,
          borderColor: colors.reports.dynamic.blue400,
        };
    }
  };

  const getInputStyles = () => {
    return {
      flex: 1,
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      fontFamily: typography.styles.bodyM.fontFamily.join(', '),
      fontSize: typography.styles.bodyM.fontSize,
      fontWeight: typography.styles.bodyM.fontWeight,
      lineHeight: typography.styles.bodyM.lineHeight,
      color: actualState === 'disabled' ? colors.blackAndWhite.black500 : colors.blackAndWhite.black900,
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

      {/* Input container */}
      <div style={containerStyles}>

        {/* Input field */}
        <input
          ref={ref}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onClick={handleOpenModal}
          onFocus={(e) => {
            if (!disabled && state !== 'error' && state !== 'warning') {
              setInternalState('active');
            }
            handleOpenModal();
            onFocus?.(e);
          }}
          onBlur={(e) => {
            if (!disabled && state !== 'error' && state !== 'warning') {
              setInternalState(value ? 'filled' : 'default');
            }
            onBlur?.(e);
          }}
          disabled={disabled}
          readOnly={true}
          style={{
            ...inputStyles,
            cursor: disabled ? 'default' : 'pointer',
          }}
        />

        {/* Calendar icon */}
        <button
          type="button"
          disabled={disabled}
          onClick={handleOpenModal}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: disabled ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: disabled ? 0.4 : 1,
          }}
        >
          <icons.medium.calendar 
            color={colors.blackAndWhite.black900}
          />
        </button>

      </div>

      {/* Helper text */}
      {helperText && (
        <div style={helperTextStyles}>
          {helperText}
        </div>
      )}

      {/* DatePicker Modal */}
      <DatePickerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        startDate={value}
        endDate={endDate}
        onApply={handleDateRangeApply}
        onClear={handleDateRangeClear}
      />
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;