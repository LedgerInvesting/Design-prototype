import React, { useState, useEffect } from 'react';
import { spacing } from '../tokens';
import { Calendar } from './Calendar';

export interface DualCalendarProps {
  /** Selected start date */
  startDate?: Date | null;
  /** Selected end date */
  endDate?: Date | null;
  /** Callback when date range is selected */
  onDateRangeSelect: (startDate: Date | null, endDate: Date | null) => void;
  /** Initial month to display (defaults to current month) */
  initialMonth?: Date;
  /** Disable the right calendar */
  rightCalendarDisabled?: boolean;
}

export const DualCalendar: React.FC<DualCalendarProps> = ({
  startDate,
  endDate,
  onDateRangeSelect,
  initialMonth = new Date(),
  rightCalendarDisabled = false,
}) => {
  const [leftMonth, setLeftMonth] = useState(new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1));
  const [rightMonth, setRightMonth] = useState(new Date(initialMonth.getFullYear(), initialMonth.getMonth() + 1, 1));
  const [tempStartDate, setTempStartDate] = useState<Date | null>(startDate || null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate || null);

  // Sync internal state with props when they change
  useEffect(() => {
    // Update internal state when props change (for clear functionality and auto-calculated dates)
    if (!startDate && !endDate) {
      // Clear state
      setTempStartDate(null);
      setTempEndDate(null);
    } else if (startDate && endDate && (!tempStartDate || !tempEndDate)) {
      // Auto-calculated range (like year periods) - update both dates
      setTempStartDate(startDate);
      setTempEndDate(endDate);
    }
  }, [startDate, endDate, tempStartDate, tempEndDate]);

  // Handle date selection for range picking
  const handleDateSelect = (date: Date, isRightCalendar: boolean = false) => {
    // Don't allow selection on right calendar if it's disabled
    if (isRightCalendar && rightCalendarDisabled) {
      return;
    }
    
    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      // First selection or reset
      setTempStartDate(date);
      setTempEndDate(null);
      onDateRangeSelect(date, null);
    } else {
      // Second selection - complete the range
      if (date >= tempStartDate) {
        setTempEndDate(date);
        onDateRangeSelect(tempStartDate, date);
      } else {
        setTempStartDate(date);
        setTempEndDate(tempStartDate);
        onDateRangeSelect(date, tempStartDate);
      }
    }
  };

  // Handle month navigation for left calendar
  const handleLeftMonthChange = (newMonth: Date) => {
    setLeftMonth(newMonth);
    // Ensure right month is always one month ahead
    const nextMonth = new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 1);
    setRightMonth(nextMonth);
  };

  // Handle month navigation for right calendar
  const handleRightMonthChange = (newMonth: Date) => {
    setRightMonth(newMonth);
    // Ensure left month is always one month before
    const prevMonth = new Date(newMonth.getFullYear(), newMonth.getMonth() - 1, 1);
    setLeftMonth(prevMonth);
  };

  return (
    <div style={{
      display: 'flex',
      gap: spacing[4],
      justifyContent: 'center',
    }}>
      {/* Left Calendar */}
      <Calendar
        startDate={tempStartDate}
        endDate={tempEndDate}
        onDateSelect={handleDateSelect}
        currentMonth={leftMonth}
        onMonthChange={handleLeftMonthChange}
        position="left"
      />

      {/* Right Calendar */}
      <div style={{ 
        opacity: rightCalendarDisabled ? 0.5 : 1,
        pointerEvents: rightCalendarDisabled ? 'none' : 'auto',
        transition: 'opacity 0.2s ease'
      }}>
        <Calendar
          startDate={tempStartDate}
          endDate={tempEndDate}
          onDateSelect={(date) => handleDateSelect(date, true)}
          currentMonth={rightMonth}
          onMonthChange={handleRightMonthChange}
          position="right"
        />
      </div>
    </div>
  );
};

export default DualCalendar;