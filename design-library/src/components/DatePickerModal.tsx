import React, { useState, useEffect } from 'react';
import { colors, borderRadius, typography, spacing } from '../tokens';
import { DualCalendar } from './DualCalendar';
import { Calendar } from './Calendar';
import { Button } from './Button';
import { Input } from './Input';

export interface DatePickerModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: () => void;
  /** Selected start date */
  startDate?: string;
  /** Selected end date */
  endDate?: string;
  /** Callback when date range is applied */
  onApply: (startDate: string, endDate: string) => void;
  /** Callback when selection is cleared */
  onClear: () => void;
}

type TimePeriod = 'custom' | 'current' | '1year' | '2years' | '3years' | '5years';

const TIME_PERIODS: { value: TimePeriod; label: string }[] = [
  { value: 'custom', label: 'Custom' },
  { value: 'current', label: 'Current' },
  { value: '1year', label: '1 Year' },
  { value: '2years', label: '2 Years' },
  { value: '3years', label: '3 Years' },
  { value: '5years', label: '5 Years' },
];

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isOpen,
  onClose,
  startDate = '',
  endDate = '',
  onApply,
  onClear,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('custom');
  const [internalStartDate, setInternalStartDate] = useState(startDate);
  const [internalEndDate, setInternalEndDate] = useState(endDate);
  const [currentMonth, setCurrentMonth] = useState(new Date(2022, 8)); // September 2022
  
  // Helper function to format date for display (DD/MM/YYYY)
  const formatDateForDisplay = (dateStr: string): string => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr; // Return original if invalid
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr; // Return original if conversion fails
    }
  };

  // Helper function to convert display format (DD/MM/YYYY) back to ISO format (YYYY-MM-DD)
  const parseDisplayDate = (displayDate: string): string => {
    if (!displayDate) return '';
    const parts = displayDate.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      if (day && month && year && day.length <= 2 && month.length <= 2 && year.length === 4) {
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }
    return displayDate; // Return original if not in expected format
  };

  // Convert internal dates for display
  const displayStartDate = formatDateForDisplay(internalStartDate);
  const displayEndDate = formatDateForDisplay(internalEndDate);
  
  // Convert string dates to Date objects for calendar (avoiding timezone issues)
  const startDateObj = internalStartDate ? (() => {
    const parts = internalStartDate.split('-');
    if (parts.length === 3) {
      return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }
    return new Date(internalStartDate);
  })() : null;
  
  const endDateObj = internalEndDate ? (() => {
    const parts = internalEndDate.split('-');
    if (parts.length === 3) {
      return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }
    return new Date(internalEndDate);
  })() : null;
  
  // Show apply button based on period type
  const showApplyButton = selectedPeriod === 'current' 
    ? internalStartDate  // For current period, only need start date
    : internalStartDate && internalEndDate; // For others, need both dates
    
  // Determine if we should show single or dual calendar
  const showSingleCalendar = selectedPeriod === 'current';
  
  // Determine if end date should be disabled (auto-calculated)
  const isEndDateDisabled = ['1year', '2years', '3years', '5years'].includes(selectedPeriod);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Modal overlay styles
  const overlayStyles = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    cursor: 'pointer',
  };

  // Modal container styles - adjust width based on calendar type
  const modalStyles = {
    backgroundColor: colors.blackAndWhite.white,
    borderRadius: borderRadius[12],
    padding: spacing[6],
    minWidth: showSingleCalendar ? '420px' : '680px', // Wider for dual calendar to prevent button text wrapping
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    cursor: 'default',
  };

  // Handle time period selection
  const handlePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
    // Auto-calculate date ranges for predefined periods
    if (period !== 'custom') {
      const today = new Date();
      let startDate = '';
      let endDate = '';
      
      switch (period) {
        case 'current':
          // For current period, don't auto-set dates - let user pick start date
          // No end date needed as it's ongoing
          startDate = '';
          endDate = ''; // No end date for current period
          break;
        case '1year':
          // For 1 year mode, don't auto-set dates - let user pick start date
          // End date will be auto-calculated when start date is selected
          startDate = '';
          endDate = '';
          break;
        case '2years':
          // For 2 years mode, don't auto-set dates - let user pick start date
          // End date will be auto-calculated when start date is selected
          startDate = '';
          endDate = '';
          break;
        case '3years':
          // For 3 years mode, don't auto-set dates - let user pick start date
          // End date will be auto-calculated when start date is selected
          startDate = '';
          endDate = '';
          break;
        case '5years':
          // For 5 years mode, don't auto-set dates - let user pick start date
          // End date will be auto-calculated when start date is selected
          startDate = '';
          endDate = '';
          break;
      }
      
      setInternalStartDate(startDate);
      setInternalEndDate(endDate);
    }
  };

  // Helper function to format date in UTC to avoid timezone issues
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle apply button click
  const handleApply = () => {
    // For current period, pass only start date (end date will be empty)
    onApply(internalStartDate, internalEndDate);
    onClose();
  };

  // Handle clear button click
  const handleClear = () => {
    setInternalStartDate('');
    setInternalEndDate('');
    // Don't change the selected period - keep the user in the same mode
    onClear();
  };

  // Handle calendar date range selection
  const handleCalendarDateRangeSelect = (start: Date | null, end: Date | null) => {
    // Create date strings using exact date components to avoid timezone issues
    const startStr = start ? `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}` : '';
    let endStr = end ? `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}` : '';
    
    // For year periods, auto-calculate end date when start date is selected
    if (['1year', '2years', '3years', '5years'].includes(selectedPeriod) && start) {
      let yearsToAdd = 1;
      
      switch (selectedPeriod) {
        case '1year': yearsToAdd = 1; break;
        case '2years': yearsToAdd = 2; break;
        case '3years': yearsToAdd = 3; break;
        case '5years': yearsToAdd = 5; break;
      }
      
      // Create end date using exact date components to avoid timezone issues
      const endYear = start.getFullYear() + yearsToAdd;
      const endMonth = start.getMonth() + 1; // getMonth() returns 0-based, we need 1-based
      const endDay = start.getDate();
      endStr = `${endYear}-${String(endMonth).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`;
    }
    
    setInternalStartDate(startStr);
    setInternalEndDate(endStr);
    
    // If we have both dates and not in year period mode, set to custom period
    if (start && end && !['1year', '2years', '3years', '5years'].includes(selectedPeriod)) {
      setSelectedPeriod('custom');
    }
  };

  // Handle manual input changes
  const handleStartDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const displayValue = e.target.value;
    const isoDate = parseDisplayDate(displayValue);
    setInternalStartDate(isoDate);
    
    // Auto-calculate end date for year periods
    if (['1year', '2years', '3years', '5years'].includes(selectedPeriod) && isoDate) {
      try {
        const startDate = new Date(isoDate);
        let yearsToAdd = 1;
        
        switch (selectedPeriod) {
          case '1year': yearsToAdd = 1; break;
          case '2years': yearsToAdd = 2; break;
          case '3years': yearsToAdd = 3; break;
          case '5years': yearsToAdd = 5; break;
        }
        
        // Create end date using exact date components to avoid timezone issues
        const endYear = startDate.getFullYear() + yearsToAdd;
        const endMonth = startDate.getMonth() + 1;
        const endDay = startDate.getDate();
        setInternalEndDate(`${endYear}-${String(endMonth).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`);
      } catch {
        // If date parsing fails, clear end date
        setInternalEndDate('');
      }
    } else if (!['1year', '2years', '3years', '5years'].includes(selectedPeriod)) {
      setSelectedPeriod('custom');
    }
  };

  const handleEndDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const displayValue = e.target.value;
    const isoDate = parseDisplayDate(displayValue);
    setInternalEndDate(isoDate);
    setSelectedPeriod('custom');
  };

  // Handle modal backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on the backdrop, not on modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle mouse down on backdrop (alternative approach)
  const handleBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent modal content clicks from bubbling up
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div 
      style={overlayStyles} 
      onClick={handleBackdropClick}
      onMouseDown={handleBackdropMouseDown}
    >
      <div style={modalStyles} onClick={handleModalClick}>
        
        {/* 1. Time Period Selector */}
        <div style={{ marginBottom: spacing[6] }}>
          <h3 style={{
            ...typography.styles.bodyL,
            fontFamily: typography.styles.bodyL.fontFamily.join(', '),
            color: colors.blackAndWhite.black900,
            margin: `0 0 ${spacing[4]} 0`,
          }}>
            Time period
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: showSingleCalendar ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
            gap: spacing[2],
            maxWidth: showSingleCalendar ? '380px' : '640px',
          }}>
            {TIME_PERIODS.map((period) => {
              const isSelected = selectedPeriod === period.value;
              return (
                <Button
                  key={period.value}
                  variant="small"
                  color={isSelected ? "dark" : "white"}
                  onClick={() => handlePeriodChange(period.value)}
                >
                  {period.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* 2. Date Input Fields */}
        <div style={{ 
          display: 'flex', 
          gap: spacing[4], 
          marginBottom: spacing[6],
        }}>
          <div style={{ flex: 1 }}>
            <Input
              label="Start Date"
              placeholder="DD/MM/YYYY"
              value={displayStartDate}
              onChange={handleStartDateInputChange}
              type="text"
            />
          </div>
          
          {/* Only show end date input for non-current periods */}
          {!showSingleCalendar && (
            <div style={{ flex: 1 }}>
              <Input
                label="End date"
                placeholder="DD/MM/YYYY"
                value={displayEndDate}
                onChange={handleEndDateInputChange}
                type="text"
                disabled={isEndDateDisabled}
                helperText={isEndDateDisabled ? (() => {
                  switch (selectedPeriod) {
                    case '1year': return 'Auto-calculated (+1 year)';
                    case '2years': return 'Auto-calculated (+2 years)';
                    case '3years': return 'Auto-calculated (+3 years)';
                    case '5years': return 'Auto-calculated (+5 years)';
                    default: return 'Auto-calculated';
                  }
                })() : undefined}
              />
            </div>
          )}
        </div>

        {/* 3. Calendar Section */}
        <div style={{ marginBottom: spacing[4] }}>
          {showSingleCalendar ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Calendar
                startDate={startDateObj}
                endDate={null}
                onDateSelect={(date) => {
                  // Create a date string using the exact date components to avoid timezone issues
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, '0');
                  const day = String(date.getDate()).padStart(2, '0');
                  const dateStr = `${year}-${month}-${day}`;
                  setInternalStartDate(dateStr);
                  setInternalEndDate(''); // Clear end date for current period
                }}
                currentMonth={currentMonth}
                onMonthChange={setCurrentMonth}
              />
            </div>
          ) : (
            <DualCalendar
              startDate={startDateObj}
              endDate={endDateObj}
              onDateRangeSelect={handleCalendarDateRangeSelect}
              initialMonth={currentMonth}
              rightCalendarDisabled={isEndDateDisabled}
            />
          )}
        </div>

        {/* 4. Action Buttons - Only show when both dates are selected */}
        {showApplyButton && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Button
              variant="small"
              color="white"
              onClick={handleClear}
            >
              Clear
            </Button>

            <Button
              variant="small"
              color="main"
              onClick={handleApply}
            >
              apply
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default DatePickerModal;