import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button, DashboardCard, ChartTooltip, AppActionButton, Table, DownloadButton } from '@design-library/components';
import { Dropdown } from '@design-library/components/Dropdown';
import { typography, borderRadius, shadows } from '@design-library/tokens';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { SettingsMedium, DownloadSmall, ArrowUpSmall, ArrowDownSmall, CardsGraph, CardsText, AddMedium, ContractsLogo, StatusAddTable, ListMedium, StatusProgressTable, EditSmall, ChevronLeftSmall, ChevronRightSmall, CalendarTable, StatusTable, AmmountTable, ChevronRightExtraSmall } from '@design-library/icons';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Custom StatusCheck component with proper color support
const StatusCheck: React.FC<{ color: string }> = ({ color }) => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.7998 8.27778L7.94266 10.5L11.7998 6.5" stroke={color} strokeWidth="2"/>
    <circle cx="8.7998" cy="8.5" r="7.5" stroke={color} strokeWidth="2"/>
  </svg>
);

/**
 * Triangle Tooltip Component
 */
const TriangleTooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsVisible(true);
    setPosition({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </div>

      {isVisible && typeof document !== 'undefined' && createPortal(
        <div
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            backgroundColor: '#17211B',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '10px',
            fontWeight: 500,
            lineHeight: 1.3,
            maxWidth: '280px',
            zIndex: 1000,
            pointerEvents: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #BD8B11', backgroundColor: 'transparent', flexShrink: 0 }} />
              <span>On risk triangle (Accident-quarter)</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #744DEB', backgroundColor: 'transparent', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ whiteSpace: 'pre-line' }}>Loss Development triangle{'\n'}(Accident-quarter)</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #3DA3CB', backgroundColor: 'transparent', flexShrink: 0 }} />
              <span>Policy-Year triangle</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

/**
 * Simple Tooltip Component
 */
const SimpleTooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
  const colors = useSemanticColors();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsVisible(true);
    setPosition({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer', display: 'inline-flex' }}
      >
        {children}
      </div>

      {isVisible && typeof document !== 'undefined' && createPortal(
        <div
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            backgroundColor: colors.blackAndWhite.black900,
            color: colors.blackAndWhite.white,
            padding: '8px 12px',
            borderRadius: '12px',
            fontSize: '14px',
            lineHeight: '20px',
            zIndex: 1000,
            pointerEvents: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </div>,
        document.body
      )}
    </>
  );
};

// Growth indicator component
interface GrowthIndicatorProps {
  direction: 'up' | 'down';
  percentage: string;
  period: string;
}

const GrowthIndicator: React.FC<GrowthIndicatorProps> = ({ direction, percentage, period }) => {
  const colors = useSemanticColors();
  const isPositive = direction === 'up';
  const color = isPositive ? colors.success.textAndStrokes : colors.error.textAndStrokes;
  const ArrowIcon = isPositive ? ArrowUpSmall : ArrowDownSmall;
  const sign = isPositive ? '+' : '';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: 'Söhne, system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: 500,
      color: colors.blackAndWhite.black900,
    }}>
      <ArrowIcon color={color} />
      <span>{sign} {percentage} in the last {period}</span>
    </div>
  );
};

// Small chart component for metrics
interface SmallChartProps {
  trend: 'up' | 'down';
}

const SmallChart: React.FC<SmallChartProps> = ({ trend }) => {
  const colors = useSemanticColors();
  const circleColor = trend === 'up' ? colors.success.textAndStrokes : colors.error.textAndStrokes;

  return (
    <svg width="106" height="28" viewBox="0 0 106 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 15.5C2.5 15.5 4 14 6 13C8 12 10.5 11 13 10.5C15.5 10 18 9.5 21 9C24 8.5 27.5 8 31 7.5C34.5 7 38.5 6.5 42 6C45.5 5.5 49.5 5 53 4.5C56.5 4 60.5 3.5 64 3C67.5 2.5 71.5 2 75 1.5C78.5 1 82.5 0.5 86 1C89.5 1.5 93.5 2 97 2.5C100.5 3 104.5 3.5 106 4"
        stroke="#17211B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="102"
        cy="4"
        r="4"
        fill={circleColor}
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

interface TransactionValuationProps {
  transactionName?: string;
}

/**
 * Status Dot Component
 */
interface StatusDotProps {
  status: 'reviewed' | 'pending' | 'none' | 'add' | 'pending-review';
  position?: 'left' | 'center' | 'right';
}

const StatusDot: React.FC<StatusDotProps> = ({ status, position }) => {
  const getColor = () => {
    if (position) {
      switch (position) {
        case 'left': return '#BD8B11';
        case 'center': return '#744DEB';
        case 'right': return '#3DA3CB';
        default: return '#e1eae5';
      }
    } else {
      switch (status) {
        case 'reviewed': return '#74efa3';
        case 'pending': return '#ffdd61';
        case 'none': return '#ff8588';
        default: return '#ff8588';
      }
    }
  };

  if (position) {
    if (status === 'pending-review') {
      return <StatusProgressTable color={getColor()} />;
    }
    return <StatusCheck color={getColor()} />;
  }

  return (
    <div
      style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: getColor(),
      }}
    />
  );
};

interface StatusRowProps {
  id: string;
  date: string;
  triangleStatuses: ('reviewed' | 'pending' | 'none' | 'add' | 'pending-review')[];
  officialStatus: string;
  onAddTriangleClick: (rowId: string, position: 'left' | 'center' | 'right') => void;
}

const StatusRow: React.FC<StatusRowProps> = ({ id, date, triangleStatuses, officialStatus, onAddTriangleClick }) => {
  const colors = useSemanticColors();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '50px',
          padding: '0 30px',
        }}
      >
        {/* Date Column */}
        <div style={{ width: '107px', padding: '10px 0' }}>
          <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black900 }}>
            {date}
          </div>
        </div>

        {/* Triangles Column */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '8px', marginLeft: '-10px', minWidth: 0 }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {triangleStatuses.map((status, index) => {
              const position = index === 0 ? 'left' : index === 1 ? 'center' : 'right';
              return (
                <div key={index} style={{ width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {status === 'add' ? (
                    <Button
                      variant="icon"
                      color="white"
                      icon={
                        <div style={{ transform: 'scale(0.944)' }}>
                          <StatusAddTable color={colors.theme.main} />
                        </div>
                      }
                      onClick={() => onAddTriangleClick(id, position)}
                      shape="square"
                      style={{
                        boxShadow: shadows.small,
                        transform: 'scale(1)',
                        transition: 'transform 0.2s ease',
                        width: '28px',
                        height: '28px',
                        padding: '4px',
                      }}
                    />
                  ) : (
                    <TriangleTooltip>
                      <StatusDot status={status} position={position} />
                    </TriangleTooltip>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Valuation Column */}
        <div style={{ width: '160px', padding: '10px 0', paddingLeft: '20px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <StatusDot status={officialStatus === 'Reviewed' ? 'reviewed' : officialStatus === 'Pending' ? 'pending' : 'none'} />
          <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black700 }}>
            {officialStatus}
          </div>
        </div>

        {/* Download Column */}
        <div style={{ width: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
          <Button
            variant="icon"
            color="light"
            icon={<DownloadSmall color={colors.blackAndWhite.black900} />}
            onClick={() => {}} // TODO: Implement download functionality
            shape="square"
          />
        </div>
      </div>

      {/* Dashed separator */}
      <div style={{
        height: '1px',
        margin: '0 30px',
        borderTop: '1px dashed #e1eae5',
        backgroundColor: 'transparent',
      }} />
    </div>
  );
};

interface ChartComponentProps {
  onNavigateToPage?: (page: string) => void;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ onNavigateToPage }) => {
  const colors = useSemanticColors();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [monthlyOffset, setMonthlyOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<{ month: string; type: 'edit' | 'download'; position: { x: number; y: number } } | null>(null);
  const [expandedValuation, setExpandedValuation] = useState<number | null>(null);

  // Complete historical data
  const completeHistoryData = [
    // 2022 data
    { month: 'Jan 2022', paid: 0, reported: 8, mean: 45, outerBandBase: 35, outerBandHeight: 20, innerBandBase: 40, innerBandHeight: 10 },
    { month: 'Feb 2022', paid: 2, reported: 12, mean: 48, outerBandBase: 38, outerBandHeight: 20, innerBandBase: 43, innerBandHeight: 10 },
    { month: 'Mar 2022', paid: 3, reported: 15, mean: 50, outerBandBase: 40, outerBandHeight: 20, innerBandBase: 45, innerBandHeight: 10 },
    { month: 'Apr 2022', paid: 5, reported: 18, mean: 52, outerBandBase: 42, outerBandHeight: 20, innerBandBase: 47, innerBandHeight: 10 },
    { month: 'May 2022', paid: 8, reported: 22, mean: 54, outerBandBase: 44, outerBandHeight: 20, innerBandBase: 49, innerBandHeight: 10 },
    { month: 'Jun 2022', paid: 10, reported: 25, mean: 56, outerBandBase: 46, outerBandHeight: 20, innerBandBase: 51, innerBandHeight: 10 },
    { month: 'Jul 2022', paid: 12, reported: 28, mean: 58, outerBandBase: 48, outerBandHeight: 20, innerBandBase: 53, innerBandHeight: 10 },
    { month: 'Aug 2022', paid: 15, reported: 32, mean: 60, outerBandBase: 50, outerBandHeight: 20, innerBandBase: 55, innerBandHeight: 10 },
    { month: 'Sep 2022', paid: 18, reported: 35, mean: 62, outerBandBase: 52, outerBandHeight: 20, innerBandBase: 57, innerBandHeight: 10 },
    { month: 'Oct 2022', paid: 20, reported: 38, mean: 64, outerBandBase: 54, outerBandHeight: 20, innerBandBase: 59, innerBandHeight: 10 },
    { month: 'Nov 2022', paid: 22, reported: 42, mean: 66, outerBandBase: 56, outerBandHeight: 20, innerBandBase: 61, innerBandHeight: 10 },
    { month: 'Dec 2022', paid: 25, reported: 45, mean: 68, outerBandBase: 58, outerBandHeight: 20, innerBandBase: 63, innerBandHeight: 10 },

    // 2023 data
    { month: 'Jan 2023', paid: 28, reported: 48, mean: 70, outerBandBase: 60, outerBandHeight: 20, innerBandBase: 65, innerBandHeight: 10 },
    { month: 'Feb 2023', paid: 30, reported: 52, mean: 72, outerBandBase: 62, outerBandHeight: 20, innerBandBase: 67, innerBandHeight: 10 },
    { month: 'Mar 2023', paid: 32, reported: 55, mean: 74, outerBandBase: 64, outerBandHeight: 20, innerBandBase: 69, innerBandHeight: 10 },
    { month: 'Apr 2023', paid: 35, reported: 58, mean: 76, outerBandBase: 66, outerBandHeight: 20, innerBandBase: 71, innerBandHeight: 10 },
    { month: 'May 2023', paid: 38, reported: 62, mean: 78, outerBandBase: 68, outerBandHeight: 20, innerBandBase: 73, innerBandHeight: 10 },
    { month: 'Jun 2023', paid: 40, reported: 65, mean: 80, outerBandBase: 70, outerBandHeight: 20, innerBandBase: 75, innerBandHeight: 10 },
    { month: 'Jul 2023', paid: 42, reported: 68, mean: 82, outerBandBase: 72, outerBandHeight: 20, innerBandBase: 77, innerBandHeight: 10 },
    { month: 'Aug 2023', paid: 45, reported: 72, mean: 84, outerBandBase: 74, outerBandHeight: 20, innerBandBase: 79, innerBandHeight: 10 },
    { month: 'Sep 2023', paid: 48, reported: 75, mean: 86, outerBandBase: 76, outerBandHeight: 20, innerBandBase: 81, innerBandHeight: 10 },
    { month: 'Oct 2023', paid: 50, reported: 78, mean: 88, outerBandBase: 78, outerBandHeight: 20, innerBandBase: 83, innerBandHeight: 10 },
    { month: 'Nov 2023', paid: 52, reported: 82, mean: 90, outerBandBase: 80, outerBandHeight: 20, innerBandBase: 85, innerBandHeight: 10 },
    { month: 'Dec 2023', paid: 55, reported: 85, mean: 92, outerBandBase: 82, outerBandHeight: 20, innerBandBase: 87, innerBandHeight: 10 },

    // 2024 data
    { month: 'Jan 2024', paid: 0, reported: 15, mean: 58, outerBandBase: 48, outerBandHeight: 20, innerBandBase: 53, innerBandHeight: 10 },
    { month: 'Feb 2024', paid: 5, reported: 22, mean: 62, outerBandBase: 52, outerBandHeight: 20, innerBandBase: 57, innerBandHeight: 10 },
    { month: 'Mar 2024', paid: 8, reported: 30, mean: 65, outerBandBase: 55, outerBandHeight: 20, innerBandBase: 60, innerBandHeight: 10 },
    { month: 'Apr 2024', paid: 12, reported: 35, mean: 68, outerBandBase: 58, outerBandHeight: 20, innerBandBase: 63, innerBandHeight: 10 },
    { month: 'May 2024', paid: 20, reported: 39, mean: 70, outerBandBase: 60, outerBandHeight: 20, innerBandBase: 65, innerBandHeight: 10 },
    { month: 'Jun 2024', paid: 22, reported: 45, mean: 74, outerBandBase: 64, outerBandHeight: 20, innerBandBase: 69, innerBandHeight: 10 },
    { month: 'Jul 2024', paid: 25, reported: 50, mean: 78, outerBandBase: 68, outerBandHeight: 20, innerBandBase: 73, innerBandHeight: 10 },
    { month: 'Aug 2024', paid: 23, reported: 58, mean: 82, outerBandBase: 72, outerBandHeight: 20, innerBandBase: 77, innerBandHeight: 10 },
    { month: 'Sep 2024', paid: 25, reported: 65, mean: 85, outerBandBase: 75, outerBandHeight: 20, innerBandBase: 80, innerBandHeight: 10 },
    { month: 'Oct 2024', paid: 28, reported: 72, mean: 88, outerBandBase: 78, outerBandHeight: 20, innerBandBase: 83, innerBandHeight: 10 },
    { month: 'Nov 2024', paid: 30, reported: 78, mean: 92, outerBandBase: 82, outerBandHeight: 20, innerBandBase: 87, innerBandHeight: 10 },
    { month: 'Dec 2024', paid: 35, reported: 80, mean: 95, outerBandBase: 85, outerBandHeight: 20, innerBandBase: 90, innerBandHeight: 10 },
    { month: 'Jan 2025', paid: 60, reported: 80, mean: 98, outerBandBase: 88, outerBandHeight: 20, innerBandBase: 93, innerBandHeight: 10 },
    { month: 'Feb 2025', paid: 65, reported: 85, mean: 100, outerBandBase: 90, outerBandHeight: 20, innerBandBase: 95, innerBandHeight: 10 },
    { month: 'Mar 2025', paid: 70, reported: 88, mean: 102, outerBandBase: 92, outerBandHeight: 20, innerBandBase: 97, innerBandHeight: 10 },
    { month: 'Apr 2025', paid: 78, reported: 92, mean: 106, outerBandBase: 96, outerBandHeight: 20, innerBandBase: 101, innerBandHeight: 10 },
    { month: 'May 2025', paid: 80, reported: 93, mean: 107, outerBandBase: 97, outerBandHeight: 20, innerBandBase: 102, innerBandHeight: 10 },
    { month: 'Jun 2025', paid: 92, reported: 99, mean: 113, outerBandBase: 103, outerBandHeight: 20, innerBandBase: 108, innerBandHeight: 10 },

    { month: 'New', paid: null, reported: null, mean: null, outerBandBase: null, outerBandHeight: null, innerBandBase: null, innerBandHeight: null }
  ];

  // Set initial position
  useEffect(() => {
    const uniqueMonths = Array.from(new Set(completeHistoryData.map(d => d.month)));
    const initialOffset = Math.max(0, uniqueMonths.length - 7);
    setMonthlyOffset(initialOffset);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown) {
        setOpenDropdown(null);
        setExpandedValuation(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  // Handle drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedPeriod !== 'monthly' && selectedPeriod !== 'annual') return;
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || (selectedPeriod !== 'monthly' && selectedPeriod !== 'annual')) return;
    const deltaX = e.clientX - dragStart;
    const sensitivity = 30;

    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? -1 : 1;

      let maxOffset;
      const uniqueMonths = Array.from(new Set(completeHistoryData.map(d => d.month)));
      if (selectedPeriod === 'monthly') {
        maxOffset = uniqueMonths.length - 7;
      } else if (selectedPeriod === 'annual') {
        maxOffset = uniqueMonths.length - 13;
      }

      const newOffset = Math.max(0, Math.min(maxOffset!, monthlyOffset + direction));

      if (newOffset !== monthlyOffset) {
        setMonthlyOffset(newOffset);
        setDragStart(e.clientX);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Helper function to process chart data
  const processChartData = (data: typeof completeHistoryData) => {
    const monthLastIndex = new Map<string, number>();
    data.forEach((item, index) => {
      monthLastIndex.set(item.month, index);
    });

    return data.map((item, index) => {
      const isLastOfMonth = monthLastIndex.get(item.month) === index;
      return {
        ...item,
        displayMonth: isLastOfMonth ? item.month : '',
        isLastOfMonth
      };
    });
  };

  // Get current data based on selected period
  let finalChartData, finalButtonData, finalDataLength, finalAddButtonIndex;

  if (selectedPeriod === 'monthly') {
    const uniqueMonths = Array.from(new Set(completeHistoryData.map(d => d.month)));
    const startMonthIndex = Math.max(0, Math.min(monthlyOffset, uniqueMonths.length - 7));
    const endMonthIndex = Math.min(startMonthIndex + 6, uniqueMonths.length - 1);

    const monthsToShow = uniqueMonths.slice(startMonthIndex, endMonthIndex + 1);
    if (endMonthIndex >= uniqueMonths.length - 1 && !monthsToShow.includes('New')) {
      monthsToShow.push('New');
    }

    const monthlyData = completeHistoryData.filter(d => monthsToShow.includes(d.month));

    const processedData = processChartData(monthlyData);
    finalChartData = processedData;
    finalButtonData = processedData.slice(1);
    finalDataLength = processedData.length;
    finalAddButtonIndex = processedData.length - 2;
  } else if (selectedPeriod === 'annual') {
    const uniqueMonths = Array.from(new Set(completeHistoryData.map(d => d.month)));
    const startMonthIndex = Math.max(0, Math.min(monthlyOffset, uniqueMonths.length - 13));
    const endMonthIndex = Math.min(startMonthIndex + 12, uniqueMonths.length - 1);

    const monthsToShow = uniqueMonths.slice(startMonthIndex, endMonthIndex + 1);
    if (endMonthIndex >= uniqueMonths.length - 1 && !monthsToShow.includes('New')) {
      monthsToShow.push('New');
    }

    const annualData = completeHistoryData.filter(d => monthsToShow.includes(d.month));

    const processedData = processChartData(annualData);
    finalChartData = processedData;
    finalButtonData = processedData.slice(1);
    finalDataLength = processedData.length;
    finalAddButtonIndex = processedData.length - 2;
  } else if (selectedPeriod === 'all-data') {
    const processedData = processChartData(completeHistoryData);
    const chartData = processedData.filter(item => item.month !== 'New');
    finalChartData = chartData;

    const buttonData = chartData.slice(1).map((item, index) => {
      const currentYear = item.month.split(' ')[1];
      const nextYear = index < chartData.length - 2 ? chartData[index + 2].month.split(' ')[1] : null;
      return {
        ...item,
        isYearBoundary: currentYear !== nextYear
      };
    });
    finalButtonData = buttonData;
    finalDataLength = chartData.length;
    finalAddButtonIndex = -1;
  } else if (selectedPeriod === 'complete') {
    const processedData = processChartData(completeHistoryData);
    finalChartData = processedData;
    finalButtonData = processedData.slice(1);
    finalDataLength = processedData.length;
    finalAddButtonIndex = processedData.length - 2;
  }

  // Helper function for date labels
  const generateDateLabel = (monthStr: string, index: number, total: number) => {
    const parts = monthStr.split(' ');
    const monthName = parts[0];
    const year = parts[1];

    const daysInMonth: { [key: string]: number } = {
      'Jan': 31, 'Feb': 28, 'Mar': 31, 'Apr': 30, 'May': 31, 'Jun': 30,
      'Jul': 31, 'Aug': 31, 'Sep': 30, 'Oct': 31, 'Nov': 30, 'Dec': 31
    };

    const maxDay = daysInMonth[monthName] || 30;
    const day = Math.floor((index * maxDay) / total) + 1;

    const daySuffix = (d: number) => {
      if (d >= 11 && d <= 13) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${daySuffix(day)} ${monthName}`;
  };

  return (
    <div style={{
      backgroundColor: colors.blackAndWhite.white,
      borderRadius: borderRadius[12],
      border: `1px solid ${colors.theme.primary400}`,
      overflow: 'visible',
      outline: 'none',
    }}>
      {/* Legend and Time Period Controls */}
      <div style={{
        padding: '20px 30px 20px 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${colors.theme.primary400}`,
      }}>
        {/* Color Legend */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#0f9342', borderRadius: '50%' }} />
            <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black700 }}>
              Expected loss ratio
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#ffd028', borderRadius: '50%' }} />
            <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black700 }}>
              Reported Loss Ratio
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#8b68f5', borderRadius: '50%' }} />
            <span style={{ ...typography.styles.bodyS, color: colors.blackAndWhite.black700 }}>
              Paid Loss Ratio
            </span>
          </div>
        </div>

        {/* Time Period Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Dropdown
            showLabel={false}
            value={selectedPeriod}
            selectedPrefix="View as"
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annual', label: 'Annually' },
              { value: 'all-data', label: 'All Data' }
            ]}
            onChange={(value) => {
              setSelectedPeriod(value);
              const uniqueMonths = Array.from(new Set(completeHistoryData.map(d => d.month)));
              if (value === 'monthly') {
                setMonthlyOffset(Math.max(0, uniqueMonths.length - 7));
              } else if (value === 'annual') {
                setMonthlyOffset(Math.max(0, uniqueMonths.length - 13));
              } else {
                setMonthlyOffset(0);
              }
            }}
            state="filled"
          />
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          height: '421px',
          overflow: 'visible',
          outline: 'none',
          position: 'relative',
          cursor: (selectedPeriod === 'monthly' || selectedPeriod === 'annual') ? (isDragging ? 'grabbing' : 'move') : 'default',
          userSelect: 'none',
          paddingTop: '30px'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Diagonal line pattern for "New" section */}
        {finalChartData!.some(d => d.month === 'New') && (
          <div style={{
            position: 'absolute',
            top: '80px',
            left: '15px',
            right: '50px',
            bottom: '60px',
            pointerEvents: 'none',
            zIndex: 0,
            display: 'flex'
          }}>
            {finalChartData!.slice(0, -1).map((_, index) => (
              <div key={`spacer-${index}`} style={{ flexGrow: 1, flexShrink: 0, flexBasis: 0 }} />
            ))}
            <div style={{
              flexGrow: 1,
              flexShrink: 0,
              flexBasis: 0,
              background: `repeating-linear-gradient(
                45deg,
                ${colors.theme.primary450},
                ${colors.theme.primary450} 1px,
                transparent 1px,
                transparent 4px
              )`,
              opacity: 0.3
            }} />
          </div>
        )}

        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{
            overflow: 'visible',
            outline: 'none',
            cursor: (selectedPeriod === 'monthly' || selectedPeriod === 'annual') ? (isDragging ? 'grabbing' : 'move') : 'default'
          }}
        >
          <ComposedChart
            data={finalChartData}
            margin={{ top: 50, right: selectedPeriod === 'all-data' ? 40 : 50, left: 15, bottom: 30 }}
            style={{
              overflow: 'visible',
              outline: 'none',
              cursor: (selectedPeriod === 'monthly' || selectedPeriod === 'annual') ? (isDragging ? 'grabbing' : 'move') : 'default'
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={colors.theme.primary450} />

            <XAxis
              dataKey="displayMonth"
              stroke={colors.theme.primary450}
              axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
              tickLine={{ stroke: colors.theme.primary450, strokeWidth: 1 }}
              tickSize={4}
              tick={{ fontSize: 0 }}
              interval={0}
              type="category"
              label={{
                value: 'Evaluation Date',
                position: 'insideBottom',
                offset: 0,
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              }}
            />
            <YAxis
              stroke={colors.theme.primary450}
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }}
              tickFormatter={(value) => `${value}%`}
              label={{
                value: 'Loss Ratio',
                angle: -90,
                position: 'insideLeft',
                style: { fill: colors.blackAndWhite.black500, ...typography.styles.dataXS }
              }}
              domain={[0, 120]}
              ticks={[0, 20, 40, 60, 80, 100, 120]}
              allowDataOverflow={true}
            />

            {/* Outer uncertainty band */}
            <Area
              type="monotone"
              dataKey="outerBandBase"
              stroke="none"
              fill="transparent"
              stackId="outer"
              isAnimationActive={false}
              activeDot={false}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="outerBandHeight"
              stroke="none"
              fill="#64EF99"
              fillOpacity={0.3}
              stackId="outer"
              isAnimationActive={false}
              activeDot={false}
              connectNulls={false}
            />

            {/* Inner uncertainty band */}
            <Area
              type="monotone"
              dataKey="innerBandBase"
              stroke="none"
              fill="transparent"
              stackId="inner"
              isAnimationActive={false}
              activeDot={false}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="innerBandHeight"
              stroke="none"
              fill="#64EF99"
              fillOpacity={0.6}
              stackId="inner"
              isAnimationActive={false}
              activeDot={false}
              connectNulls={false}
            />

            {/* Lines */}
            <Line
              type="monotone"
              dataKey="mean"
              stroke="#0f9342"
              strokeWidth={2}
              dot={{ fill: '#0f9342', r: 6, stroke: colors.blackAndWhite.white, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#0f9342', stroke: colors.blackAndWhite.white, strokeWidth: 2, filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15))' }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="reported"
              stroke="#ffd028"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#ffd028', r: 6, stroke: colors.blackAndWhite.white, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#ffd028', stroke: colors.blackAndWhite.white, strokeWidth: 2, filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15))' }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="paid"
              stroke="#8b68f5"
              strokeWidth={2}
              dot={{ fill: '#8b68f5', r: 6, stroke: colors.blackAndWhite.white, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#8b68f5', stroke: colors.blackAndWhite.white, strokeWidth: 2, filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15))' }}
              connectNulls={false}
            />

            <Tooltip content={<ChartTooltip />} cursor={false} />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Date labels and buttons */}
        <div style={{
          position: 'absolute',
          top: '25px',
          left: '75px',
          right: selectedPeriod === 'all-data' ? '40px' : '50px',
          height: '55px',
          display: 'flex',
          zIndex: 2
        }}>
          {finalButtonData!.map((dataPoint: any, index) => {
            let showMonthLabel, showButtons, displayLabel;

            if (selectedPeriod === 'all-data') {
              const isYearBoundary = (dataPoint as any).isYearBoundary;
              showMonthLabel = isYearBoundary;
              showButtons = isYearBoundary;
              displayLabel = isYearBoundary ? dataPoint.month.split(' ')[1] : '';
            } else {
              showMonthLabel = dataPoint.isLastOfMonth || dataPoint.month === 'New';
              showButtons = dataPoint.isLastOfMonth || dataPoint.month === 'New';
              displayLabel = dataPoint.month;
            }

            const monthValuations = finalChartData!.filter(d => d.month === dataPoint.month && d.month !== 'New');
            const hasMultipleValuations = monthValuations.length > 1;

            return (
              <div
                key={index}
                style={{
                  flexGrow: selectedPeriod === 'complete'
                    ? (hoveredIndex === index ? 3 : 0.5)
                    : selectedPeriod === 'all-data' && dataPoint.month === 'New'
                      ? 0
                      : 1, // All months including "New" get equal width in monthly/annual views
                  flexShrink: 0, // Prevent shrinking to ensure equal widths
                  flexBasis: 0, // Start from zero and grow equally
                  width: 0, // Force width calculation by flex
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  gap: '7px',
                  borderRight: showMonthLabel ? `1px dashed ${colors.theme.primary450}` : 'none',
                  borderLeft: index === 0 ? `1px dashed ${colors.theme.primary450}` : 'none',
                  paddingRight: '8px',
                  minHeight: '55px',
                  position: 'relative',
                  transition: selectedPeriod === 'complete' ? 'flex 0.3s ease, opacity 0.2s ease' : 'opacity 0.2s ease',
                  overflow: showButtons ? 'visible' : 'hidden'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Date label */}
                {showMonthLabel && (
                  <div style={{
                    ...typography.styles.dataXS,
                    color: colors.blackAndWhite.black900,
                    fontSize: '10px',
                    marginTop: '-6px',
                    opacity: selectedPeriod === 'complete' ? (hoveredIndex === index ? 1 : 0) : 1,
                    transition: 'opacity 0.2s ease'
                  }}>
                    {displayLabel}
                  </div>
                )}

                {/* Buttons */}
                {showButtons && (
                  <div style={{
                    display: 'flex',
                    gap: '2px',
                    opacity: selectedPeriod === 'complete' ? (hoveredIndex === index ? 1 : 0) : 1,
                    transition: 'opacity 0.2s ease'
                  }}>
                    {dataPoint.month === 'New' ? (
                      <Button
                        variant="icon"
                        color="white"
                        icon={<AddMedium color={colors.blackAndWhite.black900} />}
                        onClick={() => {}} // TODO: Implement add valuation
                        shape="square"
                        style={{
                          width: '29px',
                          height: '29px',
                          padding: '4px',
                          backgroundColor: colors.theme.primary700,
                          border: 'none',
                          borderRadius: borderRadius[4]
                        }}
                      />
                    ) : (
                      <>
                        <SimpleTooltip text="Edit valuation">
                          <div style={{ position: 'relative' }}>
                            <div
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.border = `1px solid ${colors.theme.primary450}`;
                                (e.currentTarget as HTMLElement).style.boxShadow = shadows.small;
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.border = `1px solid ${colors.theme.primary400}`;
                                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                              }}
                              style={{
                                display: 'inline-flex',
                                borderRadius: '4px',
                                border: `1px solid ${colors.theme.primary400}`,
                                padding: '2px',
                                transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                              }}
                            >
                              <Button
                                variant="icon"
                                color="white"
                                icon={<EditSmall color={colors.blackAndWhite.black900} />}
                                onClick={() => {}} // TODO: Implement edit valuation
                                shape="square"
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  padding: '4px',
                                  border: 'none',
                                  borderRadius: '2px'
                                }}
                              />
                            </div>
                          </div>
                        </SimpleTooltip>
                        <SimpleTooltip text="Download valuation files">
                          <div style={{ position: 'relative' }}>
                            <div
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.border = `1px solid ${colors.theme.primary450}`;
                                (e.currentTarget as HTMLElement).style.boxShadow = shadows.small;
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.border = `1px solid ${colors.theme.primary400}`;
                                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                              }}
                              style={{
                                display: 'inline-flex',
                                borderRadius: '4px',
                                border: `1px solid ${colors.theme.primary400}`,
                                padding: '2px',
                                transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                              }}
                            >
                              <Button
                                variant="icon"
                                color="white"
                                icon={<DownloadSmall color={colors.blackAndWhite.black900} />}
                                onClick={() => {}} // TODO: Implement download valuation
                                shape="square"
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  padding: '4px',
                                  border: 'none',
                                  borderRadius: '2px'
                                }}
                              />
                            </div>
                          </div>
                        </SimpleTooltip>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const TransactionValuationContent: React.FC<TransactionValuationProps> = ({ transactionName }) => {
  const colors = useSemanticColors();

  return (
    <>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '40px',
        flexWrap: 'nowrap',
        gap: '20px',
      }}>
        <div>
          <h1 style={{
            ...typography.styles.headlineH2,
            color: colors.blackAndWhite.black900,
            margin: '0 0 8px 0',
            lineHeight: '1.2',
          }}>
            <div>
              <span style={{ color: colors.blackAndWhite.black900 }}>{transactionName || 'Transaction'}</span>
              <span style={{ color: colors.blackAndWhite.black500 }}> valuation.</span>
            </div>
            <div style={{ color: colors.blackAndWhite.black500 }}>Review and <span style={{ color: colors.blackAndWhite.black500 }}>edit</span> the monthly values.</div>
          </h1>
        </div>
      </div>

      {/* Chart Section */}
      <ChartComponent />

      {/* Valuation Data Table */}
      <div style={{ marginTop: '40px' }}>
        <Table
          title={
            <>
              All Valuations <span style={{ color: '#0f9342' }}>(10)</span>
            </>
          }
          showSearch={false}
          showHeader={true}
          columns={[
            {
              key: 'date',
              title: 'Date',
              icon: <CalendarTable color={colors.theme.primary450} />,
              align: 'left',
              render: (value) => (
                <span style={{ color: colors.blackAndWhite.black900 }}>{value}</span>
              )
            },
            {
              key: 'lossModeling',
              title: 'Loss modeling',
              icon: <StatusTable color={colors.theme.primary450} />,
              align: 'left',
              cellType: 'status'
            },
            {
              key: 'paidLossRatio',
              title: 'Paid Loss Ratio',
              icon: <AmmountTable color={colors.theme.primary450} />,
              align: 'left'
            },
            {
              key: 'reportedLossRatio',
              title: 'Reported Loss Ratio',
              icon: <AmmountTable color={colors.theme.primary450} />,
              align: 'left'
            },
            {
              key: 'expectedLossRatio',
              title: 'Expected loss ratio',
              icon: <AmmountTable color={colors.theme.primary450} />,
              align: 'left'
            },
            {
              key: 'currentWrittenPremium',
              title: 'Current Written Premium',
              icon: <AmmountTable color={colors.theme.primary450} />,
              align: 'left'
            },
            {
              key: 'actions',
              title: 'Actions',
              align: 'left',
              headerAlign: 'left',
              cellType: 'action' as const,
              actionType: 'custom' as const,
              actionCellProps: {
                icon: <EditSmall color={colors.blackAndWhite.black900} />,
                text: 'Edit',
                iconBackgroundColor: colors.theme.primary500,
                iconColor: colors.blackAndWhite.black900,
                showSecondaryMenu: true,
                secondaryActions: [
                  {
                    label: 'Download as Format 1',
                    onClick: () => {} // TODO: Download as format 1
                  },
                  {
                    label: 'Download as Format 2',
                    onClick: () => {} // TODO: Download as format 2
                  }
                ]
              },
              onAction: (actionType: string, text: string) => {
                // TODO: Implement edit action
              }
            }
          ]}
          data={[
            { date: 'Jan, 2025', lossModeling: 'Complete', paidLossRatio: '75%', reportedLossRatio: '62%', expectedLossRatio: '103%', currentWrittenPremium: '$20,107,359', actions: 'custom' },
            { date: 'Dec, 2024', lossModeling: 'Complete', paidLossRatio: '89%', reportedLossRatio: '45%', expectedLossRatio: '103%', currentWrittenPremium: '$21,542,987', actions: 'custom' },
            { date: 'Nov, 2024', lossModeling: 'Complete', paidLossRatio: '89%', reportedLossRatio: '45%', expectedLossRatio: '103%', currentWrittenPremium: '$19,876,421', actions: 'custom' },
            { date: 'Oct, 2024', lossModeling: 'Complete', paidLossRatio: '89%', reportedLossRatio: '45%', expectedLossRatio: '103%', currentWrittenPremium: '$22,345,789', actions: 'custom' },
            { date: 'Sep, 2024', lossModeling: 'Complete', paidLossRatio: '89%', reportedLossRatio: '45%', expectedLossRatio: '103%', currentWrittenPremium: '$18,901,234', actions: 'custom' },
            { date: 'Aug, 2024', lossModeling: 'Complete', paidLossRatio: '89%', reportedLossRatio: '45%', expectedLossRatio: '103%', currentWrittenPremium: '$20,456,890', actions: 'custom' },
            { date: 'Jul, 2024', lossModeling: 'Complete', paidLossRatio: '89%', reportedLossRatio: '45%', expectedLossRatio: '103%', currentWrittenPremium: '$21,123,567', actions: 'custom' },
            { date: 'Jun, 2024', lossModeling: 'Complete', paidLossRatio: '89%', reportedLossRatio: '45%', expectedLossRatio: '103%', currentWrittenPremium: '$19,567,234', actions: 'custom' },
            { date: 'May, 2024', lossModeling: 'Complete', paidLossRatio: '89%', reportedLossRatio: '45%', expectedLossRatio: '103%', currentWrittenPremium: '$22,789,654', actions: 'custom' },
            { date: 'Apr, 2024', lossModeling: 'Complete', paidLossRatio: '89%', reportedLossRatio: '45%', expectedLossRatio: '103%', currentWrittenPremium: '$18,234,901', actions: 'custom' }
          ]}
          showFooterPagination={true}
          onPageChange={(page) => {}} // TODO: Implement pagination
        />
      </div>
    </>
  );
};

export const TransactionValuation: React.FC<TransactionValuationProps> = (props) => {
  return (
    <ThemeProvider initialTheme="analytics">
      <TransactionValuationContent {...props} />
    </ThemeProvider>
  );
};
