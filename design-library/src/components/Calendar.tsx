import React, { useState, useEffect, useRef } from 'react';
import { borderRadius, typography, spacing, useSemanticColors } from '../tokens';
import { icons } from '../icons';

export interface CalendarProps {
  /** Selected start date */
  startDate?: Date | null;
  /** Selected end date */
  endDate?: Date | null;
  /** Callback when date is selected */
  onDateSelect: (date: Date) => void;
  /** Callback when date range is selected */
  onDateRangeSelect?: (startDate: Date, endDate: Date) => void;
  /** Current month to display */
  currentMonth: Date;
  /** Callback when month changes */
  onMonthChange: (date: Date) => void;
  /** Whether this is the left or right calendar in dual view */
  position?: 'left' | 'right';
}

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const Calendar: React.FC<CalendarProps> = ({
  startDate,
  endDate,
  onDateSelect,
  onDateRangeSelect,
  currentMonth,
  onMonthChange,
  position = 'left',
}) => {
  const colors = useSemanticColors();
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const monthDropdownRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target as Node)) {
        setShowMonthDropdown(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setShowYearDropdown(false);
      }
    };

    if (showMonthDropdown || showYearDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showMonthDropdown, showYearDropdown]);

  // Generate month options for dropdown
  const monthOptions = MONTHS.map((month, index) => ({
    value: index.toString(),
    label: month,
  }));

  // Generate year options (current year ± 10 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear - 10; year <= currentYear + 10; year++) {
    yearOptions.push({
      value: year.toString(),
      label: year.toString(),
    });
  }

  // Get the first day of the month and calculate calendar grid
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
  const daysInMonth = lastDayOfMonth.getDate();

  // Generate calendar days
  const calendarDays: (Date | null)[] = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  }

  // Navigation handlers
  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    onMonthChange(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    onMonthChange(nextMonth);
  };

  // Handle month selection
  const handleMonthSelect = (monthIndex: number) => {
    const newMonth = new Date(currentMonth.getFullYear(), monthIndex, 1);
    onMonthChange(newMonth);
    setShowMonthDropdown(false);
  };

  // Handle year selection
  const handleYearSelect = (year: number) => {
    const newMonth = new Date(year, currentMonth.getMonth(), 1);
    onMonthChange(newMonth);
    setShowYearDropdown(false);
  };

  // Date selection logic
  const handleDateClick = (date: Date) => {
    // Always call onDateSelect for single date selection
    onDateSelect(date);
    
    // Only call onDateRangeSelect if it exists and we want range selection
    if (onDateRangeSelect) {
      if (!startDate || (startDate && endDate)) {
        // First selection or reset selection - don't call range select for single calendar
        // Only call if we actually want range behavior
        if (endDate !== null) {
          onDateRangeSelect(date, date);
        }
      } else if (startDate && !endDate) {
        // Second selection - complete the range
        if (date >= startDate) {
          onDateRangeSelect(startDate, date);
        } else {
          onDateRangeSelect(date, startDate);
        }
      }
    }
  };

  // Check if date is selected
  const isDateSelected = (date: Date): boolean => {
    if (!startDate) return false;
    if (!endDate) return date.getTime() === startDate.getTime();
    return date >= startDate && date <= endDate;
  };

  // Check if date is in range (for hover effect)
  const isDateInRange = (date: Date): boolean => {
    if (!startDate || endDate || !hoverDate) return false;
    const min = startDate < hoverDate ? startDate : hoverDate;
    const max = startDate > hoverDate ? startDate : hoverDate;
    return date >= min && date <= max;
  };

  // Check if date is start or end of selection (compare by date only, not time)
  const isDateStart = (date: Date): boolean => {
    if (!startDate) return false;
    return date.getFullYear() === startDate.getFullYear() &&
           date.getMonth() === startDate.getMonth() &&
           date.getDate() === startDate.getDate();
  };

  const isDateEnd = (date: Date): boolean => {
    if (!endDate) return false;
    return date.getFullYear() === endDate.getFullYear() &&
           date.getMonth() === endDate.getMonth() &&
           date.getDate() === endDate.getDate();
  };

  // Check if this is a single selected date (no range)
  const isSingleSelected = (date: Date): boolean => {
    if (!startDate || endDate) return false;
    return date.getFullYear() === startDate.getFullYear() &&
           date.getMonth() === startDate.getMonth() &&
           date.getDate() === startDate.getDate();
  };

  // Get date cell styles
  const getDateCellStyles = (date: Date | null) => {
    if (!date) return { visibility: 'hidden' as const };

    const isSelected = isDateSelected(date);
    const isInRange = isDateInRange(date);
    const isStart = isDateStart(date);
    const isEnd = isDateEnd(date);
    const isSingle = isSingleSelected(date);
    const isToday = new Date().toDateString() === date.toDateString();

    return {
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      borderRadius: borderRadius[4],
      ...typography.styles.bodyL,
      fontFamily: typography.styles.bodyL.fontFamily.join(', '),
      backgroundColor: (isStart || isEnd || isSingle)
        ? colors.blackAndWhite.black900 
        : (isSelected || isInRange)
          ? colors.theme.primary300
          : 'transparent',
      color: (isStart || isEnd || isSingle)
        ? colors.theme.primary700 
        : colors.blackAndWhite.black900,
      border: isToday 
        ? `1px solid ${colors.blackAndWhite.black700}` 
        : '1px solid transparent',
      transition: 'all 0.2s ease',
    };
  };

  return (
    <div style={{ 
      width: '280px',
    }}>
      {/* Calendar Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing[4],
        height: '32px',
        position: 'relative' as const,
      }}>
        <button
          onClick={goToPreviousMonth}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            borderRadius: borderRadius[4],
          }}
        >
          <icons.small.chevronLeft color={colors.blackAndWhite.black700} />
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[1],
        }}>
          {/* Month with chevron */}
          <div ref={monthDropdownRef} style={{ position: 'relative' as const }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <span style={{
                ...typography.styles.bodyL,
                fontFamily: typography.styles.bodyL.fontFamily.join(', '),
                color: colors.blackAndWhite.black900,
              }}>
                {MONTHS[currentMonth.getMonth()]}
              </span>
              <button
                onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <icons.extraSmall.chevronDown 
                  color={colors.blackAndWhite.black700}
                  style={{ width: '12px', height: '12px' }}
                />
              </button>
            </div>

            {/* Month Dropdown List */}
            {showMonthDropdown && (
              <div style={{
                position: 'absolute' as const,
                top: '100%',
                left: 0,
                zIndex: 1000,
                backgroundColor: colors.blackAndWhite.white,
                border: `1px solid ${colors.theme.primary400}`,
                borderRadius: borderRadius[8],
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                maxHeight: '200px',
                overflowY: 'auto' as const,
                minWidth: '120px',
                marginTop: '4px',
              }}>
                {MONTHS.map((month, index) => (
                  <div
                    key={month}
                    onClick={() => handleMonthSelect(index)}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      ...typography.styles.bodyM,
                      fontFamily: typography.styles.bodyM.fontFamily.join(', '),
                      color: colors.blackAndWhite.black900,
                      backgroundColor: index === currentMonth.getMonth() ? colors.theme.primary300 : 'transparent',
                      ':hover': {
                        backgroundColor: colors.theme.primary200,
                      },
                    }}
                    onMouseEnter={(e) => {
                      if (index !== currentMonth.getMonth()) {
                        (e.target as HTMLElement).style.backgroundColor = colors.theme.primary200;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (index !== currentMonth.getMonth()) {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {month}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Year with chevron */}
          <div ref={yearDropdownRef} style={{ position: 'relative' as const }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <span style={{
                ...typography.styles.bodyL,
                fontFamily: typography.styles.bodyL.fontFamily.join(', '),
                color: colors.blackAndWhite.black900,
              }}>
                {currentMonth.getFullYear()}
              </span>
              <button
                onClick={() => setShowYearDropdown(!showYearDropdown)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <icons.extraSmall.chevronDown 
                  color={colors.blackAndWhite.black700}
                  style={{ width: '12px', height: '12px' }}
                />
              </button>
            </div>

            {/* Year Dropdown List */}
            {showYearDropdown && (
              <div style={{
                position: 'absolute' as const,
                top: '100%',
                right: 0,
                zIndex: 1000,
                backgroundColor: colors.blackAndWhite.white,
                border: `1px solid ${colors.theme.primary400}`,
                borderRadius: borderRadius[8],
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                maxHeight: '200px',
                overflowY: 'auto' as const,
                minWidth: '80px',
                marginTop: '4px',
              }}>
                {yearOptions.map((yearOption) => {
                  const year = parseInt(yearOption.value);
                  return (
                    <div
                      key={year}
                      onClick={() => handleYearSelect(year)}
                      style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                        ...typography.styles.bodyM,
                        fontFamily: typography.styles.bodyM.fontFamily.join(', '),
                        color: colors.blackAndWhite.black900,
                        backgroundColor: year === currentMonth.getFullYear() ? colors.theme.primary300 : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (year !== currentMonth.getFullYear()) {
                          (e.target as HTMLElement).style.backgroundColor = colors.theme.primary200;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (year !== currentMonth.getFullYear()) {
                          (e.target as HTMLElement).style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {year}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={goToNextMonth}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            borderRadius: borderRadius[4],
          }}
        >
          <icons.small.chevronRight color={colors.blackAndWhite.black700} />
        </button>
      </div>

      {/* Days of Week Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: spacing[1],
        marginBottom: spacing[2],
      }}>
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              ...typography.styles.navS,
              fontFamily: typography.styles.navS.fontFamily.join(', '),
              color: colors.blackAndWhite.black500,
              padding: spacing[1],
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: spacing[1],
      }}>
        {calendarDays.map((date, index) => (
          <div
            key={index}
            style={getDateCellStyles(date)}
            onClick={() => date && handleDateClick(date)}
            onMouseEnter={() => date && setHoverDate(date)}
            onMouseLeave={() => setHoverDate(null)}
          >
            {date?.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;