import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Layout } from '@design-library/pages';
import { Button, DashboardCard, ChartTooltip, AppActionButton } from '@design-library/components';
import { Dropdown } from '@design-library/components/Dropdown';
import { typography, borderRadius, shadows } from '@design-library/tokens';
import { ThemeProvider, useSemanticColors } from '@design-library/tokens/ThemeProvider';
import { SettingsMedium, DownloadSmall, ArrowUpSmall, ArrowDownSmall, CardsGraph, CardsText, AddMedium, ContractsLogo, StatusAddTable, ListMedium, StatusProgressTable, EditSmall, ChevronLeftSmall, ChevronRightSmall } from '@design-library/icons';
import { UploadTrianglesModal } from './UploadTrianglesModal';
import { AddTriangleModal } from './AddTriangleModal';
import { useSettings } from '@design-library/contexts';
import { createPageNavigationHandler } from '@design-library/utils/navigation';
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
 *
 * Custom tooltip wrapper that displays triangle type legend when hovering over status icons.
 * This replaces the InfoTooltip component to avoid unwanted "i" icon display.
 *
 * Features:
 * - Mouse-following tooltip positioning
 * - No additional visual elements (triggers directly on children)
 * - Triangle legend with color-coded explanations
 * - Clean hover/leave state management
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

      {/* Render tooltip in portal to avoid parent transform issues */}
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
 *
 * A lightweight tooltip wrapper that displays a text message when hovering over its children.
 * Does not add any visual elements - only shows tooltip on hover.
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

      {/* Render tooltip in portal */}
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

interface ValuationDashboardProps {
  onNavigateToPage: (page: string) => void;
  valuationData?: {
    programName: string;
    evaluationDate: string;
    reportedLossRatio: string;
    currentWrittenPremium: string;
  };
}

/**
 * Status Dot Component
 *
 * Displays status indicators for triangle uploads and official valuations.
 * - Triangle icons (when position is set): StatusCheck for reviewed, StatusProgressTable for pending review
 * - Status dots (when position is not set): colored dots for reviewed/pending/none states
 */
interface StatusDotProps {
  status: 'reviewed' | 'pending' | 'none' | 'add' | 'pending-review';
  position?: 'left' | 'center' | 'right';
}

const StatusDot: React.FC<StatusDotProps> = ({ status, position }) => {
  const getColor = () => {
    if (position) {
      // Triangle icons with specific colors
      switch (position) {
        case 'left': return '#BD8B11';
        case 'center': return '#744DEB';
        case 'right': return '#3DA3CB';
        default: return '#e1eae5';
      }
    } else {
      // Regular status dots
      switch (status) {
        case 'reviewed': return '#74efa3';
        case 'pending': return '#ffdd61';
        case 'none': return '#ff8588';
        default: return '#ff8588';
      }
    }
  };

  if (position) {
    // Render StatusProgressTable icon for triangles pending review, StatusCheck for reviewed
    if (status === 'pending-review') {
      return <StatusProgressTable color={getColor()} />;
    }
    return <StatusCheck color={getColor()} />;
  }

  // Render regular dot for status column
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
            onClick={() => console.log('Download clicked')}
            shape="square"
          />
        </div>
      </div>

      {/* Dashed separator with proper padding */}
      <div style={{
        height: '1px',
        margin: '0 30px',
        borderTop: '1px dashed #e1eae5',
        backgroundColor: 'transparent',
      }} />
    </div>
  );
};


const ChartComponent: React.FC = () => {
  const colors = useSemanticColors();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [monthlyOffset, setMonthlyOffset] = useState(0); // Initialize to 0, will be set correctly in useEffect
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // For Complete History hover

  // Complete historical data - extends back to Jan 2022 for extensive scrolling
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
    
    // 2024 data (current year)
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
    
    // Future placeholder
    { month: 'New', paid: null, reported: null, mean: null, outerBandBase: null, outerBandHeight: null, innerBandBase: null, innerBandHeight: null }
  ];

  // Set correct initial position after component mounts
  useEffect(() => {
    // Always start with the most recent data visible on the right
    const initialOffset = Math.max(0, completeHistoryData.length - 9); // Show last 8 months + "New" section
    setMonthlyOffset(initialOffset);
  }, []); // Only run once on mount

  // Handle drag functionality for Monthly and Annual Views
  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedPeriod !== 'monthly' && selectedPeriod !== 'annual') return;
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || (selectedPeriod !== 'monthly' && selectedPeriod !== 'annual')) return;
    const deltaX = e.clientX - dragStart;
    const sensitivity = 30; // Increase sensitivity for smoother scrolling
    
    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? -1 : 1; // Right drag = go back in time
      
      // Different max offsets for different views
      let maxOffset;
      if (selectedPeriod === 'monthly') {
        maxOffset = completeHistoryData.length - 9; // Reserve space for 8 months + New
      } else if (selectedPeriod === 'annual') {
        maxOffset = completeHistoryData.length - 13; // Reserve space for 12 months + New
      }
      
      const newOffset = Math.max(0, Math.min(maxOffset, monthlyOffset + direction));
      
      if (newOffset !== monthlyOffset) {
        setMonthlyOffset(newOffset);
        setDragStart(e.clientX);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Get current data based on selected period and offset
  let finalChartData, finalButtonData, finalDataLength, finalAddButtonIndex;
  
  if (selectedPeriod === 'monthly') {
    // Monthly View: Show 8 months of data in space for 6, creating cropped overflow effect
    const startIndex = monthlyOffset;
    const endIndex = Math.min(startIndex + 8, completeHistoryData.length - 1); // Show 8 months instead of 6
    const monthlyData = completeHistoryData.slice(startIndex, endIndex);
    
    // Add "New" section if we're showing the latest data (near the end)
    if (endIndex >= completeHistoryData.length - 1) {
      monthlyData.push(completeHistoryData[completeHistoryData.length - 1]); // Add "New"
    }
    
    finalChartData = monthlyData;
    finalButtonData = monthlyData.slice(1); // Skip first for buttons
    finalDataLength = monthlyData.length;
    finalAddButtonIndex = monthlyData.length - 2; // Second to last is "New" for buttons
  } else if (selectedPeriod === 'annual') {
    // Annual Summary: Show 12 months of data, draggable through history
    const startIndex = monthlyOffset;
    const endIndex = Math.min(startIndex + 12, completeHistoryData.length - 1); // Show exactly 12 months
    const annualData = completeHistoryData.slice(startIndex, endIndex);
    
    // Add "New" section if we're showing the latest data (near the end)
    if (endIndex >= completeHistoryData.length - 1) {
      annualData.push(completeHistoryData[completeHistoryData.length - 1]); // Add "New"
    }
    
    finalChartData = annualData;
    finalButtonData = annualData.slice(1);
    finalDataLength = annualData.length;
    finalAddButtonIndex = annualData.length - 2;
  } else if (selectedPeriod === 'complete') {
    // Complete History: Show all data
    finalChartData = completeHistoryData;
    finalButtonData = completeHistoryData.slice(1);
    finalDataLength = completeHistoryData.length;
    finalAddButtonIndex = completeHistoryData.length - 2;
  }

  return (
    <div style={{
      backgroundColor: colors.blackAndWhite.white,
      borderRadius: borderRadius[12],
      border: `1px solid ${colors.theme.primary400}`,
      overflow: 'visible',
      outline: 'none',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 30px',
        borderBottom: `1px solid ${colors.theme.primary400}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CardsGraph color="#8b68f5" />
          <div style={{ ...typography.styles.bodyL, color: colors.blackAndWhite.black900 }}>
            Valuation runs over time
          </div>
        </div>
      </div>

      {/* Legend and Time Period Controls */}
      <div style={{
        padding: '20px 30px',
        paddingBottom: '50px', // Add extra 30px spacing to the chart below
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Color Legend */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          {/* Expected loss ratio */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#0f9342',
              borderRadius: '50%'
            }} />
            <span style={{
              ...typography.styles.bodyS,
              color: colors.blackAndWhite.black700
            }}>
              Expected loss ratio
            </span>
          </div>
          
          {/* Reported Loss Ratio */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#ffd028',
              borderRadius: '50%'
            }} />
            <span style={{
              ...typography.styles.bodyS,
              color: colors.blackAndWhite.black700
            }}>
              Reported Loss Ratio
            </span>
          </div>
          
          {/* Paid Loss Ratio */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#8b68f5',
              borderRadius: '50%'
            }} />
            <span style={{
              ...typography.styles.bodyS,
              color: colors.blackAndWhite.black700
            }}>
              Paid Loss Ratio
            </span>
          </div>
        </div>

        {/* Time Period Dropdown and Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Dropdown
            showLabel={false}
            value={selectedPeriod}
            selectedPrefix="View as"
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annual', label: 'Annually' }
            ]}
            onChange={(value) => {
              setSelectedPeriod(value);
              // Reset to show newest data when changing view
              if (value === 'monthly') {
                setMonthlyOffset(Math.max(0, completeHistoryData.length - 9)); // Last 8 months + "New"
              } else if (value === 'annual') {
                setMonthlyOffset(Math.max(0, completeHistoryData.length - 13)); // Last 12 months + "New"
              } else {
                setMonthlyOffset(0); // Complete history starts from beginning
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
          userSelect: 'none' // Prevent text selection during drag
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves chart
      >
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
            margin={{ top: 50, right: 50, left: 15, bottom: 30 }} 
            style={{ 
              overflow: 'visible', 
              outline: 'none',
              cursor: (selectedPeriod === 'monthly' || selectedPeriod === 'annual') ? (isDragging ? 'grabbing' : 'move') : 'default'
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={colors.theme.primary450} />

            <XAxis
              dataKey="month"
              stroke={colors.theme.primary450}
              axisLine={{ stroke: colors.blackAndWhite.black900, strokeWidth: 2 }}
              tickLine={{ stroke: colors.theme.primary450, strokeWidth: 1 }}
              tickSize={4}
              tick={{ fontSize: 0 }}
              interval={0}
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
            />

            {/* Outer uncertainty band (±10%, lighter) */}
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

            {/* Inner uncertainty band (±5%, darker) */}
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
              dot={{ fill: '#0f9342', r: 4, stroke: colors.blackAndWhite.white, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#0f9342', stroke: colors.blackAndWhite.white, strokeWidth: 4, filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15))' }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="reported"
              stroke="#ffd028"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#ffd028', r: 4, stroke: colors.blackAndWhite.white, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#ffd028', stroke: colors.blackAndWhite.white, strokeWidth: 4, filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15))' }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="paid"
              stroke="#8b68f5"
              strokeWidth={2}
              dot={{ fill: '#8b68f5', r: 4, stroke: colors.blackAndWhite.white, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#8b68f5', stroke: colors.blackAndWhite.white, strokeWidth: 4, filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15))' }}
              connectNulls={false}
            />

            <Tooltip content={<ChartTooltip />} cursor={false} />
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* Date labels and Edit/Download buttons positioned above chart data */}
        <div style={{
          position: 'absolute',
          top: '-5px', // Back to original position above chart
          left: '75px', // Same alignment as chart data
          right: '50px', // Same alignment as chart data
          height: '55px', // More height for date + buttons
          display: 'flex',
          zIndex: 2
        }}>
          {finalButtonData.map((dataPoint, index) => (
            <div
              key={index}
              style={{
                flex: selectedPeriod === 'complete' ? (hoveredIndex === index ? 3 : 0.5) : 1, // Expand hovered section, compact others
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
                gap: '4px',
                borderRight: `1px dashed ${colors.theme.primary450}`,
                borderLeft: index === 0 ? `1px dashed ${colors.theme.primary450}` : 'none', // Add left border to first button section
                paddingRight: '8px',
                minHeight: '55px', // Ensure consistent height
                position: 'relative',
                transition: selectedPeriod === 'complete' ? 'flex 0.3s ease, opacity 0.2s ease' : 'opacity 0.2s ease', // Smooth expansion
                overflow: 'hidden' // Prevent content overflow during transitions
              }}
              onMouseEnter={() => selectedPeriod === 'complete' ? setHoveredIndex(index) : null}
              onMouseLeave={() => selectedPeriod === 'complete' ? setHoveredIndex(null) : null}
            >
              {/* Date label - Show always for Monthly/Annual, only on hover for Complete */}
              <div style={{
                ...typography.styles.dataXS,
                color: colors.blackAndWhite.black900,
                fontSize: '10px',
                marginTop: '-6px',
                opacity: selectedPeriod === 'complete' ? (hoveredIndex === index ? 1 : 0) : 1,
                transition: 'opacity 0.2s ease'
              }}>
                {dataPoint.month}
              </div>
              
              {/* Buttons - Show always for Monthly/Annual, only on hover for Complete */}
              <div style={{
                display: 'flex',
                gap: '2px',
                opacity: selectedPeriod === 'complete' ? (hoveredIndex === index ? 1 : 0) : 1,
                transition: 'opacity 0.2s ease'
              }}>
                {dataPoint.month === 'New' ? (
                  // Last data month - Single add button without text
                  <Button
                    variant="icon"
                    color="white"
                    icon={<AddMedium color={colors.blackAndWhite.black900} />}
                    onClick={() => window.location.hash = '#analytics-add-valuation-data'}
                    shape="square"
                    style={{
                      width: '24px',
                      height: '24px',
                      padding: '4px',
                      backgroundColor: colors.theme.primary700,
                      border: 'none'
                    }}
                  />
                ) : (
                  // Other months - Edit/Download buttons
                  <>
                    <SimpleTooltip text="Edit valuation">
                      <Button
                        variant="icon"
                        color="white"
                        icon={<EditSmall color={colors.blackAndWhite.black900} />}
                        onClick={() => console.log(`Edit ${dataPoint.month}`)}
                        shape="square"
                        style={{
                          width: '24px',
                          height: '24px',
                          padding: '4px',
                          border: `1px solid ${colors.theme.primary400}`
                        }}
                      />
                    </SimpleTooltip>
                    <SimpleTooltip text="Download valuation files">
                      <Button
                        variant="icon"
                        color="white"
                        icon={<DownloadSmall color={colors.blackAndWhite.black900} />}
                        onClick={() => console.log(`Download ${dataPoint.month}`)}
                        shape="square"
                        style={{
                          width: '24px',
                          height: '24px',
                          padding: '4px',
                          border: `1px solid ${colors.theme.primary400}`
                        }}
                      />
                    </SimpleTooltip>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
      
      {/* Valuation Data Table */}
      <div style={{
        padding: '0'
      }}>
        {/* Separator with margins */}
        <div style={{
          borderTop: `1px dotted ${colors.theme.primary400}`,
          margin: '0 50px'
        }} />
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 120px',
          gap: '16px',
          padding: '16px 0',
          margin: '0 50px',
          backgroundColor: colors.blackAndWhite.white,
          borderBottom: `1px solid ${colors.theme.primary400}`
        }}>
          <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black500, fontWeight: 500 }}>Date</div>
          <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black500, fontWeight: 500 }}>Loss modeling</div>
          <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black500, fontWeight: 500 }}>Paid Loss Ratio</div>
          <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black500, fontWeight: 500 }}>Reported Loss Ratio</div>
          <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black500, fontWeight: 500 }}>Expected loss ratio</div>
          <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black500, fontWeight: 500 }}>Current Written Premium</div>
          <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black500, fontWeight: 500, textAlign: 'right' }}>Actions</div>
        </div>
        
        {/* Table Rows */}
        {[
          { date: 'Jan, 2025', paid: '75%', reported: '62%', expected: '112%', premium: '$20,107,359' },
          { date: 'Dec, 2024', paid: '89%', reported: '45%', expected: '103%', premium: '$21,542,987' },
          { date: 'Nov, 2024', paid: '89%', reported: '45%', expected: '103%', premium: '$19,876,421' },
          { date: 'Oct, 2024', paid: '89%', reported: '45%', expected: '103%', premium: '$22,345,789' },
          { date: 'Sep, 2024', paid: '89%', reported: '45%', expected: '103%', premium: '$18,901,234' },
          { date: 'Aug, 2024', paid: '89%', reported: '45%', expected: '103%', premium: '$20,456,890' },
          { date: 'Jul, 2024', paid: '89%', reported: '45%', expected: '103%', premium: '$21,123,567' },
          { date: 'Jun, 2024', paid: '89%', reported: '45%', expected: '103%', premium: '$19,567,234' },
          { date: 'May, 2024', paid: '89%', reported: '45%', expected: '103%', premium: '$22,789,654' },
          { date: 'Apr, 2024', paid: '89%', reported: '45%', expected: '103%', premium: '$18,234,901' }
        ].map((row, index) => (
          <div key={index} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 120px',
            gap: '16px',
            padding: '16px 0',
            margin: '0 50px',
            backgroundColor: colors.blackAndWhite.white,
            borderBottom: index < 9 ? `1px solid ${colors.theme.primary400}` : 'none',
            alignItems: 'center'
          }}>
            {/* Date */}
            <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black900 }}>
              {row.date}
            </div>
            
            {/* Loss modeling */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: colors.theme.primary400
              }} />
              <span style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black700 }}>
                Complete
              </span>
            </div>
            
            {/* Paid Loss Ratio */}
            <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black700 }}>
              {row.paid}
            </div>
            
            {/* Reported Loss Ratio */}
            <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black700 }}>
              {row.reported}
            </div>
            
            {/* Expected Loss Ratio */}
            <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black700 }}>
              {row.expected}
            </div>
            
            {/* Current Written Premium */}
            <div style={{ ...typography.styles.bodyM, color: colors.blackAndWhite.black700 }}>
              {row.premium}
            </div>
            
            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button
                variant="icon"
                color="white"
                icon={<DownloadSmall color={colors.blackAndWhite.black900} />}
                onClick={() => console.log(`Download ${row.date}`)}
                shape="square"
                style={{
                  minWidth: 'auto',
                  width: '32px',
                  height: '32px',
                  padding: '6px',
                  backgroundColor: colors.blackAndWhite.white,
                  border: `1px solid ${colors.theme.primary400}`,
                  borderRadius: borderRadius[8],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
              <Button
                variant="small"
                color="white"
                showIcon={false}
                onClick={() => console.log(`Edit ${row.date}`)}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
        
        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '20px 0',
          margin: '0 50px',
          backgroundColor: colors.blackAndWhite.white,
          gap: '12px',
          borderTop: `1px solid ${colors.blackAndWhite.black100}`
        }}>
          <div style={{ ...typography.styles.captionS, color: colors.blackAndWhite.black700 }}>
            10 of 43 Valuations
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant="icon"
              color="white"
              icon={<ChevronLeftSmall color={colors.blackAndWhite.black700} />}
              onClick={() => console.log('Previous page')}
              shape="square"
              style={{ width: '24px', height: '24px', padding: '4px' }}
            />
            <Button
              variant="icon"
              color="white"
              icon={<ChevronRightSmall color={colors.blackAndWhite.black700} />}
              onClick={() => console.log('Next page')}
              shape="square"
              style={{ width: '24px', height: '24px', padding: '4px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ValuationDashboardContent: React.FC<ValuationDashboardProps> = ({
  onNavigateToPage,
  valuationData
}) => {
  const colors = useSemanticColors();
  const settings = useSettings();

  // Provide default data if valuationData is null or undefined
  const defaultData = {
    programName: 'Aviation Treaty 2023',
    evaluationDate: '2024-12-30',
    reportedLossRatio: '42.2%',
    currentWrittenPremium: '$20,107,359'
  };
  const data = valuationData || defaultData;
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedTriangleType, setSelectedTriangleType] = useState<'on-risk-aqt' | 'development-fit' | 'on-risk-pyt' | null>(null);
  const [statusData, setStatusData] = useState([
    { id: '1', date: 'Jan 30, 2025', triangleStatuses: ['reviewed', 'pending', 'add'], officialStatus: 'Reviewed' },
    { id: '2', date: 'Dec 31, 2024', triangleStatuses: ['reviewed', 'add', 'none'], officialStatus: 'Pending' },
    { id: '3', date: 'Nov 30, 2024', triangleStatuses: ['reviewed', 'none', 'none'], officialStatus: 'No Valuation' },
    { id: '4', date: 'Oct 31, 2024', triangleStatuses: ['reviewed', 'pending', 'add'], officialStatus: 'Reviewed' },
    { id: '5', date: 'Sep 30, 2024', triangleStatuses: ['reviewed', 'pending', 'reviewed'], officialStatus: 'Reviewed' },
    { id: '6', date: 'Aug 31, 2024', triangleStatuses: ['reviewed', 'reviewed', 'reviewed'], officialStatus: 'Reviewed' },
    { id: '7', date: 'Jul 31, 2024', triangleStatuses: ['reviewed', 'add', 'none'], officialStatus: 'Pending' },
  ]);
  const [currentRowId, setCurrentRowId] = useState<string | null>(null);

  const handleAddTriangleClick = (rowId: string, position: 'left' | 'center' | 'right') => {
    // Map position to triangle type
    const triangleTypeMap = {
      'left': 'on-risk-aqt' as const,
      'center': 'development-fit' as const,
      'right': 'on-risk-pyt' as const,
    };

    setCurrentRowId(rowId);
    setSelectedTriangleType(triangleTypeMap[position]);
    setIsUploadModalOpen(true);
  };

  /**
   * Handle Triangle Upload Success
   *
   * Updates triangle status from 'add' to 'pending-review' after successful upload.
   * The triangle will show an animated progress icon until it's reviewed and approved.
   */
  const handleTriangleAdded = () => {
    if (!currentRowId || !selectedTriangleType) return;

    // Update the status data to change 'add' to 'pending-review' for the specific triangle
    setStatusData(prevData =>
      prevData.map(row => {
        if (row.id === currentRowId) {
          const newStatuses = [...row.triangleStatuses];
          const positionIndex = selectedTriangleType === 'on-risk-aqt' ? 0 :
                                selectedTriangleType === 'development-fit' ? 1 : 2;
          if (newStatuses[positionIndex] === 'add') {
            newStatuses[positionIndex] = 'pending-review';
          }
          return { ...row, triangleStatuses: newStatuses };
        }
        return row;
      })
    );

    setIsUploadModalOpen(false);
    setSelectedTriangleType(null);
    setCurrentRowId(null);
  };

  return (
      <Layout
        pageType="analytics-valuation-dashboard"
        selectedSidebarItem="analytics"
        selectedSidebarSubitem="valuation"
        onNavigate={createPageNavigationHandler(onNavigateToPage, 'analytics-valuation-dashboard')}
        breadcrumbs={[
          { label: 'Valuation', onClick: () => onNavigateToPage?.('analytics-valuation'), isActive: false },
          { label: data.programName, isActive: true }
        ]}
        appAction={{
          app: 'contracts',
          actionText: 'Explore contract',
          onClick: () => {
            console.log(`Navigate to contract for ${data.programName}`);
            onNavigateToPage?.('contracts-ai-extraction');
          }
        }}
        onBackClick={() => {
          // Navigate back to analytics valuation
          onNavigateToPage?.('analytics-valuation');
        }}
      >
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
                <span style={{ color: colors.blackAndWhite.black900 }}>{data.programName}</span>
                <span style={{ color: colors.blackAndWhite.black500 }}> valuation.</span>
              </div>
              <div style={{ color: colors.blackAndWhite.black500 }}>Review and <span style={{ color: colors.blackAndWhite.black900 }}>edit</span> the monthly values.</div>
            </h1>
          </div>
          <Button
            variant="primary"
            color="invisible"
            showIcon={false}
            onClick={() => onNavigateToPage('analytics-valuation-configuration', { programName: data.programName })}
            style={{
              minWidth: '200px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              display: 'inline-flex',
              overflow: 'visible',
            }}
          >
            <span style={{ whiteSpace: 'nowrap' }}>Configuration</span>
          </Button>
        </div>

        {/* Chart Section */}
        <ChartComponent />
      </Layout>
  );
};

export const AnalyticsValuationDashboard: React.FC<ValuationDashboardProps> = (props) => {
  return (
    <ThemeProvider initialTheme="analytics">
      <ValuationDashboardContent {...props} />
    </ThemeProvider>
  );
};