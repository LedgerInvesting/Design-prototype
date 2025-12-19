import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Layout, PageHeader } from '@design-library/pages';
import { Button, DashboardCard, ChartTooltip, Input, CustomScroll, DownloadButton } from '@design-library/components';
import { typography, borderRadius, useSemanticColors, shadows, spacing } from '@design-library/tokens';
import { ThemeProvider } from '@design-library/tokens/ThemeProvider';
import { createPageNavigationHandler, createBreadcrumbs, type NavigationHandler } from '@design-library/utils/navigation';
import { ChevronRightSmall, ChevronDownExtraSmall, AddMedium, CardsGraph, DownloadSmall, CollapseSmall, ExpandSmall, ConfigSmall, MoreSmall, CloseSmall } from '@design-library/icons';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  ReferenceLine,
} from 'recharts';
import { AxisBottom, AxisLeft, AxisRight } from '@visx/axis';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear, scalePower, scaleTime } from '@visx/scale';
import { AreaClosed, Circle, Line as VisxLine, LinePath } from '@visx/shape';
import { Grid } from '@visx/grid';
import { useTooltip } from '@visx/tooltip';
import { BoxPlot } from '@visx/stats';
import { triangleRepository } from './database/mockData';

/**
 * Props for the AnalyticsTriangleDashboard component
 */
interface AnalyticsTriangleDashboardProps {
  /** Optional navigation handler for page transitions */
  onNavigateToPage?: NavigationHandler;
  /** The name/ID of the selected triangle */
  triangleName?: string;
}

/**
 * AnalyticsTriangleDashboard Page Component - Content Section
 *
 * Displays detailed dashboard view for a selected triangle with:
 * - Triangle name in page header
 * - Dashboard metrics and visualizations
 * - Configuration and analysis tools
 *
 * @component
 * @example
 * ```tsx
 * <AnalyticsTriangleDashboard
 *   onNavigateToPage={handleNavigation}
 *   triangleName="cd12345e-6789-012b-345c-6d7cd12345e-6789-01..."
 * />
 * ```
 */
const AnalyticsTriangleDashboardContent: React.FC<AnalyticsTriangleDashboardProps> = ({
  onNavigateToPage,
  triangleName = 'cd12345e-6789-012b-345c-6d7cd12345e-6789-01...'
}) => {
  const colors = useSemanticColors();
  const [selectedChart1, setSelectedChart1] = useState('data-completeness');
  const [selectedChart2, setSelectedChart2] = useState('right-edge');
  const [selectedChart3, setSelectedChart3] = useState('heatmap');
  const [selectedChart4, setSelectedChart4] = useState('growth-curve');
  const [selectedChart5, setSelectedChart5] = useState('mountain');
  const [selectedChart6, setSelectedChart6] = useState('age-to-age');
  const [isCard1Expanded, setIsCard1Expanded] = useState(false);
  const [isCard2Expanded, setIsCard2Expanded] = useState(false);
  const [isCard3Expanded, setIsCard3Expanded] = useState(false);
  const [isCard4Expanded, setIsCard4Expanded] = useState(false);
  const [isCard5Expanded, setIsCard5Expanded] = useState(false);
  const [isCard6Expanded, setIsCard6Expanded] = useState(false);
  const [isCard1Visible, setIsCard1Visible] = useState(true);
  const [isCard2Visible, setIsCard2Visible] = useState(true);
  const [isCard3Visible, setIsCard3Visible] = useState(true);
  const [isCard4Visible, setIsCard4Visible] = useState(true);
  const [isCard5Visible, setIsCard5Visible] = useState(false);
  const [isCard6Visible, setIsCard6Visible] = useState(false);
  const [isChart1MenuOpen, setIsChart1MenuOpen] = useState(false);
  const [isChart2MenuOpen, setIsChart2MenuOpen] = useState(false);
  const [isChart3MenuOpen, setIsChart3MenuOpen] = useState(false);
  const [isChart4MenuOpen, setIsChart4MenuOpen] = useState(false);
  const [isChart5MenuOpen, setIsChart5MenuOpen] = useState(false);
  const [isChart6MenuOpen, setIsChart6MenuOpen] = useState(false);
  const [chart1MenuPosition, setChart1MenuPosition] = useState({ top: 0, left: 0 });
  const [chart2MenuPosition, setChart2MenuPosition] = useState({ top: 0, left: 0 });
  const [chart3MenuPosition, setChart3MenuPosition] = useState({ top: 0, left: 0 });
  const [chart4MenuPosition, setChart4MenuPosition] = useState({ top: 0, left: 0 });
  const [chart5MenuPosition, setChart5MenuPosition] = useState({ top: 0, left: 0 });
  const [chart6MenuPosition, setChart6MenuPosition] = useState({ top: 0, left: 0 });
  const [hoveredHeatmapCell, setHoveredHeatmapCell] = useState<{ lag: number; period: string; value: number } | null>(null);

  // Container width tracking for responsive charts
  const [chart1Width, setChart1Width] = useState(600);
  const [chart2Width, setChart2Width] = useState(600);
  const [chart3Width, setChart3Width] = useState(600);
  const [chart4Width, setChart4Width] = useState(600);
  const [chart5Width, setChart5Width] = useState(600);
  const [chart6Width, setChart6Width] = useState(600);

  // Comparison triangle state
  const [comparisonTriangle, setComparisonTriangle] = useState('');
  const [comparisonSearchQuery, setComparisonSearchQuery] = useState('');
  const [isComparisonDropdownOpen, setIsComparisonDropdownOpen] = useState(false);
  const comparisonInputRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Triangle data from database
  const [currentTriangleData, setCurrentTriangleData] = useState<any>(null);
  const [comparisonTriangleData, setComparisonTriangleData] = useState<any>(null);
  const [availableTriangles, setAvailableTriangles] = useState<{ value: string; label: string }[]>([]);

  // Load current triangle data and available triangles on mount
  useEffect(() => {
    const loadTriangleData = async () => {
      try {
        // Load current triangle data
        const currentTriangle = await triangleRepository.findByName(triangleName);
        if (currentTriangle) {
          setCurrentTriangleData(currentTriangle.data_json);
        }

        // Load available triangles for comparison (excluding current)
        const allTriangles = await triangleRepository.findAllCompleted();
        setAvailableTriangles(allTriangles.filter(t => t.value !== triangleName));
      } catch (error) {
        console.error('Error loading triangle data:', error);
      }
    };

    loadTriangleData();
  }, [triangleName]);

  // Load comparison triangle data when selected
  useEffect(() => {
    const loadComparisonData = async () => {
      if (comparisonTriangle) {
        try {
          const triangle = await triangleRepository.findByName(comparisonTriangle);
          if (triangle) {
            setComparisonTriangleData(triangle.data_json);
          }
        } catch (error) {
          console.error('Error loading comparison triangle data:', error);
        }
      } else {
        setComparisonTriangleData(null);
      }
    };

    loadComparisonData();
  }, [comparisonTriangle]);


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comparisonInputRef.current && !comparisonInputRef.current.contains(event.target as Node)) {
        setIsComparisonDropdownOpen(false);
        setComparisonSearchQuery('');
      }
    };

    if (isComparisonDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isComparisonDropdownOpen]);

  // Auto-focus input when dropdown opens
  useEffect(() => {
    if (isComparisonDropdownOpen && searchInputRef.current) {
      // Small delay to ensure the input is rendered
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isComparisonDropdownOpen]);

  // Tooltip hooks for @visx charts
  const {
    tooltipData: heatmapTooltipData,
    tooltipLeft: heatmapTooltipLeft,
    tooltipTop: heatmapTooltipTop,
    tooltipOpen: heatmapTooltipOpen,
    showTooltip: showHeatmapTooltip,
    hideTooltip: hideHeatmapTooltip,
  } = useTooltip<{ lag: number; period: string; value: number }>();

  const {
    tooltipData: growthTooltipData,
    tooltipLeft: growthTooltipLeft,
    tooltipTop: growthTooltipTop,
    tooltipOpen: growthTooltipOpen,
    showTooltip: showGrowthTooltip,
    hideTooltip: hideGrowthTooltip,
  } = useTooltip<{ period: string; lag: number; lossRatio: number }>();

  const {
    tooltipData: mountainTooltipData,
    tooltipLeft: mountainTooltipLeft,
    tooltipTop: mountainTooltipTop,
    tooltipOpen: mountainTooltipOpen,
    showTooltip: showMountainTooltip,
    hideTooltip: hideMountainTooltip,
  } = useTooltip<{ period: string; lag: number; value: number }>();

  const {
    tooltipData: ageToAgeTooltipData,
    tooltipLeft: ageToAgeTooltipLeft,
    tooltipTop: ageToAgeTooltipTop,
    tooltipOpen: ageToAgeTooltipOpen,
    showTooltip: showAgeToAgeTooltip,
    hideTooltip: hideAgeToAgeTooltip,
  } = useTooltip<{ period: string; lag: number; factor: number }>();

  const {
    tooltipData: dataCompletenessTooltipData,
    tooltipLeft: dataCompletenessTooltipLeft,
    tooltipTop: dataCompletenessTooltipTop,
    tooltipOpen: dataCompletenessTooltipOpen,
    showTooltip: showDataCompletenessTooltip,
    hideTooltip: hideDataCompletenessTooltip,
  } = useTooltip<{ x: number; y: number }>();

  const {
    tooltipData: rightEdgeTooltipData,
    tooltipLeft: rightEdgeTooltipLeft,
    tooltipTop: rightEdgeTooltipTop,
    tooltipOpen: rightEdgeTooltipOpen,
    showTooltip: showRightEdgeTooltip,
    hideTooltip: hideRightEdgeTooltip,
  } = useTooltip<{ period: string; premium: number; ratioA: number; ratioB: number }>();

  // Refs for menu dropdowns to handle outside clicks
  const chart1MenuRef = useRef<HTMLDivElement>(null);
  const chart2MenuRef = useRef<HTMLDivElement>(null);
  const chart3MenuRef = useRef<HTMLDivElement>(null);
  const chart4MenuRef = useRef<HTMLDivElement>(null);
  const chart5MenuRef = useRef<HTMLDivElement>(null);
  const chart6MenuRef = useRef<HTMLDivElement>(null);
  const chart1ButtonRef = useRef<HTMLDivElement>(null);
  const chart2ButtonRef = useRef<HTMLDivElement>(null);
  const chart3ButtonRef = useRef<HTMLDivElement>(null);
  const chart4ButtonRef = useRef<HTMLDivElement>(null);
  const chart5ButtonRef = useRef<HTMLDivElement>(null);
  const chart6ButtonRef = useRef<HTMLDivElement>(null);

  // Refs for chart containers to measure width
  const chart1ContainerRef = useRef<HTMLDivElement>(null);
  const chart2ContainerRef = useRef<HTMLDivElement>(null);
  const chart3ContainerRef = useRef<HTMLDivElement>(null);
  const chart4ContainerRef = useRef<HTMLDivElement>(null);
  const chart5ContainerRef = useRef<HTMLDivElement>(null);
  const chart6ContainerRef = useRef<HTMLDivElement>(null);

  // Refs for card wrappers to scroll to when expanded
  const card1WrapperRef = useRef<HTMLDivElement>(null);
  const card2WrapperRef = useRef<HTMLDivElement>(null);
  const card3WrapperRef = useRef<HTMLDivElement>(null);
  const card4WrapperRef = useRef<HTMLDivElement>(null);
  const card5WrapperRef = useRef<HTMLDivElement>(null);
  const card6WrapperRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chart1MenuRef.current && !chart1MenuRef.current.contains(event.target as Node)) {
        setIsChart1MenuOpen(false);
      }
      if (chart2MenuRef.current && !chart2MenuRef.current.contains(event.target as Node)) {
        setIsChart2MenuOpen(false);
      }
      if (chart3MenuRef.current && !chart3MenuRef.current.contains(event.target as Node)) {
        setIsChart3MenuOpen(false);
      }
      if (chart4MenuRef.current && !chart4MenuRef.current.contains(event.target as Node)) {
        setIsChart4MenuOpen(false);
      }
      if (chart5MenuRef.current && !chart5MenuRef.current.contains(event.target as Node)) {
        setIsChart5MenuOpen(false);
      }
      if (chart6MenuRef.current && !chart6MenuRef.current.contains(event.target as Node)) {
        setIsChart6MenuOpen(false);
      }
    };

    if (isChart1MenuOpen || isChart2MenuOpen || isChart3MenuOpen || isChart4MenuOpen || isChart5MenuOpen || isChart6MenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChart1MenuOpen, isChart2MenuOpen, isChart3MenuOpen, isChart4MenuOpen, isChart5MenuOpen, isChart6MenuOpen]);

  // Track container widths for responsive charts
  useEffect(() => {
    const observeContainer = (ref: React.RefObject<HTMLDivElement>, setWidth: (width: number) => void) => {
      if (!ref.current) return;

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          // Subtract padding (60px total: 30px on each side from DashboardCard)
          const width = entry.contentRect.width - 60;
          setWidth(Math.max(width, 300)); // Minimum width of 300px
        }
      });

      resizeObserver.observe(ref.current);
      return resizeObserver;
    };

    const observer1 = observeContainer(chart1ContainerRef, setChart1Width);
    const observer2 = observeContainer(chart2ContainerRef, setChart2Width);
    const observer3 = observeContainer(chart3ContainerRef, setChart3Width);
    const observer4 = observeContainer(chart4ContainerRef, setChart4Width);
    const observer5 = observeContainer(chart5ContainerRef, setChart5Width);
    const observer6 = observeContainer(chart6ContainerRef, setChart6Width);

    return () => {
      observer1?.disconnect();
      observer2?.disconnect();
      observer3?.disconnect();
      observer4?.disconnect();
      observer5?.disconnect();
      observer6?.disconnect();
    };
  }, [isCard1Expanded, isCard2Expanded, isCard3Expanded, isCard4Expanded, isCard5Expanded, isCard6Expanded, isCard1Visible, isCard2Visible, isCard3Visible, isCard4Visible, isCard5Visible, isCard6Visible]);

  // Scroll to card when expanded - force center alignment
  useEffect(() => {
    if (isCard1Expanded && card1WrapperRef.current) {
      // Add delay to allow expansion animation to complete
      setTimeout(() => {
        const element = card1WrapperRef.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          const absoluteTop = window.pageYOffset + rect.top;
          const middle = absoluteTop - (window.innerHeight / 2) + (rect.height / 2);
          window.scrollTo({ top: middle, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [isCard1Expanded]);

  useEffect(() => {
    if (isCard2Expanded && card2WrapperRef.current) {
      setTimeout(() => {
        const element = card2WrapperRef.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          const absoluteTop = window.pageYOffset + rect.top;
          const middle = absoluteTop - (window.innerHeight / 2) + (rect.height / 2);
          window.scrollTo({ top: middle, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [isCard2Expanded]);

  useEffect(() => {
    if (isCard3Expanded && card3WrapperRef.current) {
      setTimeout(() => {
        const element = card3WrapperRef.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          const absoluteTop = window.pageYOffset + rect.top;
          const middle = absoluteTop - (window.innerHeight / 2) + (rect.height / 2);
          window.scrollTo({ top: middle, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [isCard3Expanded]);

  useEffect(() => {
    if (isCard4Expanded && card4WrapperRef.current) {
      setTimeout(() => {
        const element = card4WrapperRef.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          const absoluteTop = window.pageYOffset + rect.top;
          const middle = absoluteTop - (window.innerHeight / 2) + (rect.height / 2);
          window.scrollTo({ top: middle, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [isCard4Expanded]);

  useEffect(() => {
    if (isCard5Expanded && card5WrapperRef.current) {
      setTimeout(() => {
        const element = card5WrapperRef.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          const absoluteTop = window.pageYOffset + rect.top;
          const middle = absoluteTop - (window.innerHeight / 2) + (rect.height / 2);
          window.scrollTo({ top: middle, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [isCard5Expanded]);

  useEffect(() => {
    if (isCard6Expanded && card6WrapperRef.current) {
      setTimeout(() => {
        const element = card6WrapperRef.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          const absoluteTop = window.pageYOffset + rect.top;
          const middle = absoluteTop - (window.innerHeight / 2) + (rect.height / 2);
          window.scrollTo({ top: middle, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [isCard6Expanded]);

  // All available chart options
  const allChartOptions = [
    { value: 'data-completeness', label: 'Data Completeness' },
    { value: 'right-edge', label: 'Right Edge' },
    { value: 'heatmap', label: 'Heatmap' },
    { value: 'mountain', label: 'Mountain' },
    { value: 'age-to-age', label: 'Age-to-Age Factors' },
    { value: 'growth-curve', label: 'Growth Curve' },
  ];

  // Get currently selected charts (only visible ones)
  const getSelectedCharts = () => {
    const selected: string[] = [];
    if (isCard1Visible) selected.push(selectedChart1);
    if (isCard2Visible) selected.push(selectedChart2);
    if (isCard3Visible) selected.push(selectedChart3);
    if (isCard4Visible) selected.push(selectedChart4);
    if (isCard5Visible) selected.push(selectedChart5);
    if (isCard6Visible) selected.push(selectedChart6);
    return selected;
  };

  // Count visible charts
  const getVisibleChartCount = () => {
    let count = 0;
    if (isCard1Visible) count++;
    if (isCard2Visible) count++;
    if (isCard3Visible) count++;
    if (isCard4Visible) count++;
    if (isCard5Visible) count++;
    if (isCard6Visible) count++;
    return count;
  };

  // Get next available chart option (prioritize charts not already displayed)
  const getNextAvailableChart = () => {
    const selectedCharts = getSelectedCharts();
    // First try to find a chart that's not currently displayed
    const availableChart = allChartOptions.find(option => !selectedCharts.includes(option.value));
    // If all charts are displayed, just use the first option
    return availableChart ? availableChart.value : allChartOptions[0].value;
  };

  // Handle adding another graph
  const handleAddAnotherGraph = () => {
    // Don't add if all 6 cards are already visible
    if (isCard1Visible && isCard2Visible && isCard3Visible && isCard4Visible && isCard5Visible && isCard6Visible) {
      return;
    }

    const nextChart = getNextAvailableChart();

    // Find first hidden card and show it with next available chart
    if (!isCard1Visible) {
      setIsCard1Visible(true);
      setSelectedChart1(nextChart);
    } else if (!isCard2Visible) {
      setIsCard2Visible(true);
      setSelectedChart2(nextChart);
    } else if (!isCard3Visible) {
      setIsCard3Visible(true);
      setSelectedChart3(nextChart);
    } else if (!isCard4Visible) {
      setIsCard4Visible(true);
      setSelectedChart4(nextChart);
    } else if (!isCard5Visible) {
      setIsCard5Visible(true);
      setSelectedChart5(nextChart);
    } else if (!isCard6Visible) {
      setIsCard6Visible(true);
      setSelectedChart6(nextChart);
    }
  };

  // Heatmap data - development lag vs period with loss ratio values
  const heatmapData = [
    // Period: 07-23
    { period: '07-23', periodIndex: 0, lag: 0, value: 45.2 },
    { period: '07-23', periodIndex: 0, lag: 3, value: 52.8 },
    { period: '07-23', periodIndex: 0, lag: 6, value: 58.3 },
    { period: '07-23', periodIndex: 0, lag: 9, value: 62.1 },
    { period: '07-23', periodIndex: 0, lag: 12, value: 64.5 },
    { period: '07-23', periodIndex: 0, lag: 15, value: 65.8 },
    { period: '07-23', periodIndex: 0, lag: 18, value: 66.2 },
    { period: '07-23', periodIndex: 0, lag: 21, value: 66.5 },

    // Period: 10-23
    { period: '10-23', periodIndex: 1, lag: 0, value: 48.1 },
    { period: '10-23', periodIndex: 1, lag: 3, value: 54.9 },
    { period: '10-23', periodIndex: 1, lag: 6, value: 60.2 },
    { period: '10-23', periodIndex: 1, lag: 9, value: 63.8 },
    { period: '10-23', periodIndex: 1, lag: 12, value: 66.1 },
    { period: '10-23', periodIndex: 1, lag: 15, value: 67.3 },
    { period: '10-23', periodIndex: 1, lag: 18, value: 67.8 },
    { period: '10-23', periodIndex: 1, lag: 21, value: 68.0 },

    // Period: 01-24
    { period: '01-24', periodIndex: 2, lag: 0, value: 50.3 },
    { period: '01-24', periodIndex: 2, lag: 3, value: 56.7 },
    { period: '01-24', periodIndex: 2, lag: 6, value: 61.8 },
    { period: '01-24', periodIndex: 2, lag: 9, value: 65.2 },
    { period: '01-24', periodIndex: 2, lag: 12, value: 67.4 },
    { period: '01-24', periodIndex: 2, lag: 15, value: 68.5 },

    // Period: 04-24
    { period: '04-24', periodIndex: 3, lag: 0, value: 52.8 },
    { period: '04-24', periodIndex: 3, lag: 3, value: 58.9 },
    { period: '04-24', periodIndex: 3, lag: 6, value: 63.5 },
    { period: '04-24', periodIndex: 3, lag: 9, value: 66.7 },
    { period: '04-24', periodIndex: 3, lag: 12, value: 68.8 },
  ];

  // Helper function to interpolate color based on value
  const getHeatmapColor = (value: number): string => {
    const minValue = Math.min(...heatmapData.map(d => d.value));
    const maxValue = Math.max(...heatmapData.map(d => d.value));

    // Normalize value between 0 and 1
    const normalized = (value - minValue) / (maxValue - minValue);

    // Analytics green gradient - from light to dark
    const greenColors = [
      '#e8fcf1', // Lightest green (analytics primary200)
      '#c3f8db', // Light green
      '#7fe9b2', // Medium green (analytics primary700)
      '#42c172', // analytics primary900
      '#0f9342', // Darkest green
    ];

    // Determine which two colors to interpolate between
    const colorIndex = normalized * (greenColors.length - 1);
    const lowerIndex = Math.floor(colorIndex);
    const upperIndex = Math.ceil(colorIndex);
    const fraction = colorIndex - lowerIndex;

    if (lowerIndex === upperIndex) {
      return greenColors[lowerIndex];
    }

    // Simple linear interpolation between two colors
    return greenColors[lowerIndex]; // For simplicity, just return the lower color
  };

  // Growth Curve data - loss ratio development over time for different periods
  const growthCurveData = [
    // Period 07-23
    { period: '07-23', lag: 0, lossRatio: 45.2, color: '#0f9342' },
    { period: '07-23', lag: 3, lossRatio: 52.8, color: '#0f9342' },
    { period: '07-23', lag: 6, lossRatio: 58.3, color: '#0f9342' },
    { period: '07-23', lag: 9, lossRatio: 62.1, color: '#0f9342' },
    { period: '07-23', lag: 12, lossRatio: 64.5, color: '#0f9342' },
    { period: '07-23', lag: 15, lossRatio: 65.8, color: '#0f9342' },
    { period: '07-23', lag: 18, lossRatio: 66.2, color: '#0f9342' },
    { period: '07-23', lag: 21, lossRatio: 66.5, color: '#0f9342' },

    // Period 10-23
    { period: '10-23', lag: 0, lossRatio: 48.1, color: '#42c172' },
    { period: '10-23', lag: 3, lossRatio: 54.9, color: '#42c172' },
    { period: '10-23', lag: 6, lossRatio: 60.2, color: '#42c172' },
    { period: '10-23', lag: 9, lossRatio: 63.8, color: '#42c172' },
    { period: '10-23', lag: 12, lossRatio: 66.1, color: '#42c172' },
    { period: '10-23', lag: 15, lossRatio: 67.3, color: '#42c172' },
    { period: '10-23', lag: 18, lossRatio: 67.8, color: '#42c172' },
    { period: '10-23', lag: 21, lossRatio: 68.0, color: '#42c172' },

    // Period 01-24
    { period: '01-24', lag: 0, lossRatio: 50.3, color: '#7fe9b2' },
    { period: '01-24', lag: 3, lossRatio: 56.7, color: '#7fe9b2' },
    { period: '01-24', lag: 6, lossRatio: 61.8, color: '#7fe9b2' },
    { period: '01-24', lag: 9, lossRatio: 65.2, color: '#7fe9b2' },
    { period: '01-24', lag: 12, lossRatio: 67.4, color: '#7fe9b2' },
    { period: '01-24', lag: 15, lossRatio: 68.5, color: '#7fe9b2' },
  ];

  // Group data by period for rendering
  const groupedGrowthData = {
    '07-23': growthCurveData.filter(d => d.period === '07-23'),
    '10-23': growthCurveData.filter(d => d.period === '10-23'),
    '01-24': growthCurveData.filter(d => d.period === '01-24'),
  };

  // Mountain chart data - showing development lag curves over time
  const mountainChartData = [
    // Lag 0 months
    { period: new Date('2023-07-01').getTime(), lag: 0, value: 45.2 },
    { period: new Date('2023-10-01').getTime(), lag: 0, value: 48.5 },
    { period: new Date('2024-01-01').getTime(), lag: 0, value: 52.8 },
    { period: new Date('2024-04-01').getTime(), lag: 0, value: 50.1 },

    // Lag 3 months
    { period: new Date('2023-07-01').getTime(), lag: 3, value: 52.8 },
    { period: new Date('2023-10-01').getTime(), lag: 3, value: 55.2 },
    { period: new Date('2024-01-01').getTime(), lag: 3, value: 58.9 },
    { period: new Date('2024-04-01').getTime(), lag: 3, value: 56.4 },

    // Lag 6 months
    { period: new Date('2023-07-01').getTime(), lag: 6, value: 58.3 },
    { period: new Date('2023-10-01').getTime(), lag: 6, value: 60.5 },
    { period: new Date('2024-01-01').getTime(), lag: 6, value: 63.5 },
    { period: new Date('2024-04-01').getTime(), lag: 6, value: 61.2 },

    // Lag 9 months
    { period: new Date('2023-07-01').getTime(), lag: 9, value: 62.1 },
    { period: new Date('2023-10-01').getTime(), lag: 9, value: 64.2 },
    { period: new Date('2024-01-01').getTime(), lag: 9, value: 66.7 },
    { period: new Date('2024-04-01').getTime(), lag: 9, value: 64.9 },

    // Lag 12 months
    { period: new Date('2023-07-01').getTime(), lag: 12, value: 64.5 },
    { period: new Date('2023-10-01').getTime(), lag: 12, value: 66.3 },
    { period: new Date('2024-01-01').getTime(), lag: 12, value: 68.8 },
    { period: new Date('2024-04-01').getTime(), lag: 12, value: 67.1 },

    // Lag 15 months
    { period: new Date('2023-07-01').getTime(), lag: 15, value: 65.8 },
    { period: new Date('2023-10-01').getTime(), lag: 15, value: 67.5 },
    { period: new Date('2024-01-01').getTime(), lag: 15, value: 69.9 },

    // Lag 18 months
    { period: new Date('2023-07-01').getTime(), lag: 18, value: 66.8 },
    { period: new Date('2023-10-01').getTime(), lag: 18, value: 68.2 },

    // Lag 21 months
    { period: new Date('2023-07-01').getTime(), lag: 21, value: 67.5 },
  ];

  // Group mountain data by lag for rendering
  const groupedMountainData: Record<number, typeof mountainChartData> = {};
  mountainChartData.forEach(point => {
    if (!groupedMountainData[point.lag]) {
      groupedMountainData[point.lag] = [];
    }
    groupedMountainData[point.lag].push(point);
  });

  // Age-to-Age chart data - age-to-age factors by development lag
  // Multiple observations per lag to show distribution via box plots
  const ageToAgeData = [
    // Lag 3 months (high variation early)
    { lag: 3, factor: 1.45, period: '07-23' },
    { lag: 3, factor: 1.52, period: '10-23' },
    { lag: 3, factor: 1.38, period: '01-24' },
    { lag: 3, factor: 1.48, period: '04-24' },
    { lag: 3, factor: 1.41, period: '07-24' },
    { lag: 3, factor: 1.55, period: '10-24' },

    // Lag 6 months (decreasing variation)
    { lag: 6, factor: 1.28, period: '07-23' },
    { lag: 6, factor: 1.32, period: '10-23' },
    { lag: 6, factor: 1.25, period: '01-24' },
    { lag: 6, factor: 1.30, period: '04-24' },
    { lag: 6, factor: 1.27, period: '07-24' },
    { lag: 6, factor: 1.33, period: '10-24' },

    // Lag 9 months
    { lag: 9, factor: 1.18, period: '07-23' },
    { lag: 9, factor: 1.22, period: '10-23' },
    { lag: 9, factor: 1.16, period: '01-24' },
    { lag: 9, factor: 1.20, period: '04-24' },
    { lag: 9, factor: 1.19, period: '07-24' },
    { lag: 9, factor: 1.21, period: '10-24' },

    // Lag 12 months (approaching 1.0)
    { lag: 12, factor: 1.12, period: '07-23' },
    { lag: 12, factor: 1.15, period: '10-23' },
    { lag: 12, factor: 1.10, period: '01-24' },
    { lag: 12, factor: 1.13, period: '04-24' },
    { lag: 12, factor: 1.11, period: '07-24' },
    { lag: 12, factor: 1.14, period: '10-24' },

    // Lag 15 months (stabilizing)
    { lag: 15, factor: 1.08, period: '07-23' },
    { lag: 15, factor: 1.10, period: '10-23' },
    { lag: 15, factor: 1.06, period: '01-24' },
    { lag: 15, factor: 1.09, period: '04-24' },
    { lag: 15, factor: 1.07, period: '07-24' },

    // Lag 18 months (very stable)
    { lag: 18, factor: 1.04, period: '07-23' },
    { lag: 18, factor: 1.06, period: '10-23' },
    { lag: 18, factor: 1.03, period: '01-24' },
    { lag: 18, factor: 1.05, period: '04-24' },

    // Lag 21 months (minimal change)
    { lag: 21, factor: 1.02, period: '07-23' },
    { lag: 21, factor: 1.03, period: '10-23' },
    { lag: 21, factor: 1.01, period: '01-24' },
  ];

  // Group age-to-age data by lag for box plot calculations
  const groupedAgeToAgeData: Record<number, typeof ageToAgeData> = {};
  ageToAgeData.forEach(point => {
    if (!groupedAgeToAgeData[point.lag]) {
      groupedAgeToAgeData[point.lag] = [];
    }
    groupedAgeToAgeData[point.lag].push(point);
  });

  // Data Completeness chart data - triangular pattern
  // Y-axis: 07-23 (index 0, top) to 04-24 (index 9, bottom)
  // Using numeric indices for proper scatter chart rendering
  const dataCompletenessData = [
    // 07-23 (index 0): 8 dots
    { x: 0, y: 0 },
    { x: 3, y: 0 },
    { x: 6, y: 0 },
    { x: 9, y: 0 },
    { x: 12, y: 0 },
    { x: 15, y: 0 },
    { x: 18, y: 0 },
    { x: 21, y: 0 },

    // 10-23 (index 3): 8 dots
    { x: 0, y: 3 },
    { x: 3, y: 3 },
    { x: 6, y: 3 },
    { x: 9, y: 3 },
    { x: 12, y: 3 },
    { x: 15, y: 3 },
    { x: 18, y: 3 },
    { x: 21, y: 3 },

    // 01-24 (index 6): 6 dots
    { x: 0, y: 6 },
    { x: 3, y: 6 },
    { x: 6, y: 6 },
    { x: 9, y: 6 },
    { x: 12, y: 6 },
    { x: 15, y: 6 },

    // 04-24 (index 9): 5 dots
    { x: 0, y: 9 },
    { x: 3, y: 9 },
    { x: 6, y: 9 },
    { x: 9, y: 9 },
    { x: 12, y: 9 },
  ];

  // Right Edge chart data
  const rightEdgeData = [
    { period: "Jan 18", premium: 6.0, ratioA: 60, ratioB: 58 },
    { period: "Jul 18", premium: 6.5, ratioA: 30, ratioB: 28 },
    { period: "Jan 19", premium: 6.2, ratioA: 90, ratioB: 88 },
    { period: "Jul 19", premium: 6.0, ratioA: 50, ratioB: 48 },
    { period: "Jan 20", premium: 6.3, ratioA: 45, ratioB: 42 },
    { period: "Jul 20", premium: 6.7, ratioA: 70, ratioB: 68 },
    { period: "Jan 21", premium: 6.8, ratioA: 35, ratioB: 30 },
    { period: "Jul 21", premium: 7.0, ratioA: 55, ratioB: 50 },
    { period: "Jan 22", premium: 7.0, ratioA: 40, ratioB: 35 },
    { period: "Jul 22", premium: 6.5, ratioA: 45, ratioB: 40 },
    { period: "Jan 23", premium: 8.5, ratioA: 35, ratioB: 30 },
    { period: "Jul 23", premium: 9.0, ratioA: 20, ratioB: 10 },
  ];

  // Render Data Completeness chart (visx)
  const renderDataCompletenessChart = (containerWidth: number = 600, useComparisonData: boolean = false) => {
    // Use comparison data if specified, otherwise use current triangle data
    const dataSource = useComparisonData ? comparisonTriangleData : currentTriangleData;
    const chartData = dataSource?.data_completeness || dataCompletenessData;

    const width = containerWidth;
    const height = 400;
    const margin = { top: 20, right: 40, bottom: 70, left: 70 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const lagScale = scaleLinear<number>({
      domain: [0, 21],
      range: [0, innerWidth],
    });

    const periodLabels = ["07-23", "08-23", "09-23", "10-23", "11-23", "12-23", "01-24", "02-24", "03-24", "04-24"];
    const periodScale = scaleBand<number>({
      domain: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      range: [0, innerHeight],
      padding: 0.1,
    });

    return (
      <div style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <svg width={width} height={height}>
          <Group left={margin.left} top={margin.top}>
            {/* Grid */}
            <Grid
              xScale={lagScale}
              yScale={periodScale}
              width={innerWidth}
              height={innerHeight}
              stroke={colors.theme.primary400}
              strokeDasharray="3,3"
            />

            {/* Data points */}
            {dataCompletenessData.map((point, i) => (
              <Circle
                key={i}
                cx={lagScale(point.x)}
                cy={periodScale(point.y)! + periodScale.bandwidth() / 2}
                r={7}
                fill={colors.theme.main}
                stroke={colors.blackAndWhite.white}
                strokeWidth={2}
                onMouseEnter={(event) => {
                  const svgRect = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  const circleRect = event.currentTarget.getBoundingClientRect();
                  if (svgRect) {
                    showDataCompletenessTooltip({
                      tooltipData: { x: point.x, y: point.y },
                      tooltipLeft: circleRect.left - svgRect.left + circleRect.width / 2,
                      tooltipTop: circleRect.top - svgRect.top,
                    });
                  }
                }}
                onMouseLeave={() => hideDataCompletenessTooltip()}
                style={{ cursor: 'pointer' }}
              />
            ))}

            {/* X Axis */}
            <AxisBottom
              scale={lagScale}
              top={innerHeight}
              stroke={colors.blackAndWhite.black900}
              strokeWidth={2}
              tickStroke="transparent"
              tickLabelProps={() => ({
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              })}
              label="Dev Lag (months)"
              labelProps={{
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              }}
              labelOffset={15}
              tickValues={[0, 3, 6, 9, 12, 15, 18, 21]}
            />

            {/* Y Axis */}
            <AxisLeft
              scale={periodScale}
              stroke="transparent"
              tickStroke="transparent"
              tickLabelProps={() => ({
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'end',
                dx: -10,
              })}
              tickFormat={(value) => periodLabels[value as number] || ""}
              label="Period Start"
              labelProps={{
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              }}
              labelOffset={53}
            />
          </Group>
        </svg>
        {dataCompletenessTooltipOpen && dataCompletenessTooltipData && (
          <div
            style={{
              position: 'absolute',
              top: (dataCompletenessTooltipTop || 0) - 10,
              left: (dataCompletenessTooltipLeft || 0),
              transform: 'translate(-50%, -100%)',
              backgroundColor: colors.blackAndWhite.white,
              padding: '12px',
              borderRadius: borderRadius[8],
              border: `1px solid ${colors.theme.primary400}`,
              boxShadow: shadows.medium,
              pointerEvents: 'none',
              zIndex: 1000,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              margin: '0 0 8px 0',
              fontWeight: 600,
            }}>
              Data Point
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: '0 0 4px 0',
            }}>
              Dev Lag: {dataCompletenessTooltipData.x} months
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: 0,
            }}>
              Period: {periodLabels[dataCompletenessTooltipData.y]}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Right Edge chart (visx)
  const renderRightEdgeChart = (containerWidth: number = 600, useComparisonData: boolean = false) => {
    const dataSource = useComparisonData ? comparisonTriangleData : currentTriangleData;
    const chartData = dataSource?.right_edge || rightEdgeData;

    const width = containerWidth;
    const height = 400;
    const margin = { top: 20, right: 70, bottom: 70, left: 70 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const periodScale = scaleBand<string>({
      domain: chartData.map(d => d.period),
      range: [0, innerWidth],
      padding: 0.3,
    });

    const premiumScale = scaleLinear<number>({
      domain: [0, Math.max(...chartData.map(d => d.premium))],
      range: [innerHeight, 0],
      nice: true,
    });

    const ratioScale = scaleLinear<number>({
      domain: [0, Math.max(...chartData.map(d => Math.max(d.ratioA, d.ratioB)))],
      range: [innerHeight, 0],
      nice: true,
    });

    return (
      <div style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <svg width={width} height={height}>
          <Group left={margin.left} top={margin.top}>
            {/* Grid */}
            <Grid
              xScale={periodScale}
              yScale={premiumScale}
              width={innerWidth}
              height={innerHeight}
              stroke={colors.theme.primary400}
              strokeDasharray="3,3"
            />

            {/* Bars */}
            {chartData.map((d, i) => (
              <rect
                key={i}
                x={periodScale(d.period)}
                y={premiumScale(d.premium)}
                width={periodScale.bandwidth()}
                height={innerHeight - premiumScale(d.premium)}
                fill={colors.theme.primary200}
                opacity={0.4}
                rx={4}
                onMouseEnter={(event) => {
                  const svgRect = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  const barRect = event.currentTarget.getBoundingClientRect();
                  if (svgRect) {
                    showRightEdgeTooltip({
                      tooltipData: d,
                      tooltipLeft: barRect.left - svgRect.left + barRect.width / 2,
                      tooltipTop: barRect.top - svgRect.top,
                    });
                  }
                }}
                onMouseLeave={() => hideRightEdgeTooltip()}
                style={{ cursor: 'pointer' }}
              />
            ))}

            {/* Line ratioA */}
            <LinePath
              data={chartData}
              x={d => (periodScale(d.period) || 0) + periodScale.bandwidth() / 2}
              y={d => ratioScale(d.ratioA)}
              stroke="#F0C32E"
              strokeWidth={3}
            />

            {/* Line ratioB */}
            <LinePath
              data={chartData}
              x={d => (periodScale(d.period) || 0) + periodScale.bandwidth() / 2}
              y={d => ratioScale(d.ratioB)}
              stroke="#42C172"
              strokeWidth={3}
            />

            {/* Dots for ratioA */}
            {chartData.map((d, i) => (
              <Circle
                key={`a-${i}`}
                cx={(periodScale(d.period) || 0) + periodScale.bandwidth() / 2}
                cy={ratioScale(d.ratioA)}
                r={5}
                fill={colors.blackAndWhite.white}
                stroke="#F0C32E"
                strokeWidth={3}
                onMouseEnter={(event) => {
                  const svgRect = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  const circleRect = event.currentTarget.getBoundingClientRect();
                  if (svgRect) {
                    showRightEdgeTooltip({
                      tooltipData: d,
                      tooltipLeft: circleRect.left - svgRect.left + circleRect.width / 2,
                      tooltipTop: circleRect.top - svgRect.top,
                    });
                  }
                }}
                onMouseLeave={() => hideRightEdgeTooltip()}
                style={{ cursor: 'pointer' }}
              />
            ))}

            {/* Dots for ratioB */}
            {chartData.map((d, i) => (
              <Circle
                key={`b-${i}`}
                cx={(periodScale(d.period) || 0) + periodScale.bandwidth() / 2}
                cy={ratioScale(d.ratioB)}
                r={5}
                fill={colors.blackAndWhite.white}
                stroke="#42C172"
                strokeWidth={3}
                onMouseEnter={(event) => {
                  const svgRect = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  const circleRect = event.currentTarget.getBoundingClientRect();
                  if (svgRect) {
                    showRightEdgeTooltip({
                      tooltipData: d,
                      tooltipLeft: circleRect.left - svgRect.left + circleRect.width / 2,
                      tooltipTop: circleRect.top - svgRect.top,
                    });
                  }
                }}
                onMouseLeave={() => hideRightEdgeTooltip()}
                style={{ cursor: 'pointer' }}
              />
            ))}

            {/* X Axis */}
            <AxisBottom
              scale={periodScale}
              top={innerHeight}
              stroke={colors.blackAndWhite.black900}
              strokeWidth={2}
              tickStroke="transparent"
              tickLabelProps={() => ({
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              })}
              labelOffset={15}
            />

            {/* Left Y Axis (Premium) */}
            <AxisLeft
              scale={premiumScale}
              stroke="transparent"
              tickStroke="transparent"
              tickLabelProps={() => ({
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'end',
                dx: -10,
              })}
              tickFormat={(value) => `${(value as number).toFixed(1)}M`}
              label="Earned Premium"
              labelProps={{
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              }}
              labelOffset={53}
            />

            {/* Right Y Axis (Loss Ratio) */}
            <AxisRight
              scale={ratioScale}
              left={innerWidth}
              stroke="transparent"
              tickStroke="transparent"
              tickLabelProps={() => ({
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'start',
                dx: 10,
              })}
              tickFormat={(value) => `${value}%`}
              label="Loss ratio"
              labelProps={{
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              }}
              labelOffset={53}
            />
          </Group>
        </svg>
        {rightEdgeTooltipOpen && rightEdgeTooltipData && (
          <div
            style={{
              position: 'absolute',
              top: (rightEdgeTooltipTop || 0) - 10,
              left: (rightEdgeTooltipLeft || 0),
              transform: 'translate(-50%, -100%)',
              backgroundColor: colors.blackAndWhite.white,
              padding: '12px',
              borderRadius: borderRadius[8],
              border: `1px solid ${colors.theme.primary400}`,
              boxShadow: shadows.medium,
              pointerEvents: 'none',
              zIndex: 1000,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              margin: '0 0 8px 0',
              fontWeight: 600,
            }}>
              {rightEdgeTooltipData.period}
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: '0 0 4px 0',
            }}>
              Premium: ${rightEdgeTooltipData.premium.toFixed(1)}M
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: '0 0 4px 0',
            }}>
              Ratio A: {rightEdgeTooltipData.ratioA}%
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: 0,
            }}>
              Ratio B: {rightEdgeTooltipData.ratioB}%
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Heatmap chart using @visx
  const renderHeatmapChart = (containerWidth: number, useComparisonData: boolean = false) => {
    const dataSource = useComparisonData ? comparisonTriangleData : currentTriangleData;
    const chartData = dataSource?.heatmap || heatmapData;

    // Helper function to interpolate color based on value for this specific dataset
    const getLocalHeatmapColor = (value: number): string => {
      const minValue = Math.min(...chartData.map(d => d.value));
      const maxValue = Math.max(...chartData.map(d => d.value));

      // Normalize value between 0 and 1
      const normalized = (value - minValue) / (maxValue - minValue);

      // Analytics green gradient - from light to dark
      const greenColors = [
        '#e8fcf1', // Lightest green (analytics primary200)
        '#c3f8db', // Light green
        '#7fe9b2', // Medium green (analytics primary700)
        '#42c172', // analytics primary900
        '#0f9342', // Darkest green
      ];

      // Determine which two colors to interpolate between
      const colorIndex = normalized * (greenColors.length - 1);
      const lowerIndex = Math.floor(colorIndex);
      const upperIndex = Math.ceil(colorIndex);

      if (lowerIndex === upperIndex) {
        return greenColors[lowerIndex];
      }

      // Return the lower color for simplicity
      return greenColors[lowerIndex];
    };

    const width = containerWidth;
    const height = 400;
    const margin = { top: 20, right: 40, bottom: 70, left: 70 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const lagScale = scaleBand<number>({
      domain: [0, 3, 6, 9, 12, 15, 18, 21],
      range: [0, innerWidth],
      padding: 0.1,
    });

    const periodScale = scaleBand<string>({
      domain: ["07-23", "10-23", "01-24", "04-24"],
      range: [0, innerHeight],
      padding: 0.1,
    });

    return (
      <div style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <svg width={width} height={height}>
          <Group left={margin.left} top={margin.top}>
            {/* Hover reference lines */}
            {hoveredHeatmapCell && (
              <>
                <line
                  x1={lagScale(hoveredHeatmapCell.lag)}
                  x2={lagScale(hoveredHeatmapCell.lag)}
                  y1={0}
                  y2={innerHeight}
                  stroke={colors.theme.primary450}
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  pointerEvents="none"
                />
                <line
                  x1={0}
                  x2={innerWidth}
                  y1={periodScale(hoveredHeatmapCell.period)}
                  y2={periodScale(hoveredHeatmapCell.period)}
                  stroke={colors.theme.primary450}
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  pointerEvents="none"
                />
              </>
            )}

            {/* Heatmap cells */}
            {chartData.map((cell) => (
              <rect
                key={`cell-${cell.period}-${cell.lag}`}
                x={lagScale(cell.lag)}
                y={periodScale(cell.period)}
                width={lagScale.bandwidth()}
                height={periodScale.bandwidth()}
                fill={getLocalHeatmapColor(cell.value)}
                rx={4}
                onMouseEnter={(event) => {
                  const svgRect = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  const cellRect = event.currentTarget.getBoundingClientRect();
                  if (svgRect) {
                    setHoveredHeatmapCell({ lag: cell.lag, period: cell.period, value: cell.value });
                    showHeatmapTooltip({
                      tooltipData: { lag: cell.lag, period: cell.period, value: cell.value },
                      tooltipLeft: cellRect.left - svgRect.left + cellRect.width / 2,
                      tooltipTop: cellRect.top - svgRect.top,
                    });
                  }
                }}
                onMouseLeave={() => {
                  setHoveredHeatmapCell(null);
                  hideHeatmapTooltip();
                }}
                style={{ cursor: 'pointer' }}
              />
            ))}

            {/* X Axis */}
            <AxisBottom
              top={innerHeight}
              scale={lagScale}
              stroke={colors.blackAndWhite.black900}
              strokeWidth={2}
              tickStroke="transparent"
              tickLabelProps={() => ({
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              })}
              label="Dev Lag (months)"
              labelProps={{
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              }}
              labelOffset={15}
            />

            {/* Y Axis */}
            <AxisLeft
              scale={periodScale}
              stroke="transparent"
              tickStroke="transparent"
              tickLabelProps={() => ({
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'end',
                dx: -10,
              })}
              label="Period Start"
              labelProps={{
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              }}
              labelOffset={53}
            />
          </Group>
        </svg>
        {heatmapTooltipOpen && heatmapTooltipData && (
          <div
            style={{
              position: 'absolute',
              top: (heatmapTooltipTop || 0) - 10,
              left: (heatmapTooltipLeft || 0),
              transform: 'translate(-50%, -100%)',
              backgroundColor: colors.blackAndWhite.white,
              padding: '12px',
              borderRadius: borderRadius[8],
              border: `1px solid ${colors.theme.primary400}`,
              boxShadow: shadows.medium,
              pointerEvents: 'none',
              zIndex: 1000,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              margin: '0 0 8px 0',
              fontWeight: 600,
            }}>
              {heatmapTooltipData.period}
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: '0 0 4px 0',
            }}>
              Lag: {heatmapTooltipData.lag} months
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: 0,
            }}>
              Value: {heatmapTooltipData.value.toFixed(1)}%
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Growth Curve chart using @visx
  const renderGrowthCurveChart = (containerWidth: number, useComparisonData: boolean = false) => {
    const dataSource = useComparisonData ? comparisonTriangleData : currentTriangleData;
    const chartData = dataSource?.growth_curve || growthCurveData;

    // Group data by period for rendering
    const groupedData = {
      '07-23': chartData.filter(d => d.period === '07-23'),
      '10-23': chartData.filter(d => d.period === '10-23'),
      '01-24': chartData.filter(d => d.period === '01-24'),
    };

    const width = containerWidth;
    const height = 400;
    const margin = { top: 20, right: 40, bottom: 70, left: 70 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const lagScale = scaleLinear<number>({
      domain: [0, 21],
      range: [0, innerWidth],
      nice: true,
    });

    const lossRatioScale = scaleLinear<number>({
      domain: [40, 70],
      range: [innerHeight, 0],
      nice: true,
    });

    return (
      <div style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <svg width={width} height={height}>
          <Group left={margin.left} top={margin.top}>
            {/* Grid */}
            <Grid
              xScale={lagScale}
              yScale={lossRatioScale}
              width={innerWidth}
              height={innerHeight}
              stroke={colors.theme.primary400}
              strokeDasharray="3 3"
            />

            {/* Lines for each period */}
            {Object.entries(groupedData).map(([period, data]) => (
              <LinePath
                key={period}
                data={data}
                x={(d) => lagScale(d.lag)}
                y={(d) => lossRatioScale(d.lossRatio)}
                stroke={data[0].color}
                strokeWidth={3}
              />
            ))}

            {/* Points for each data point */}
            {chartData.map((point, i) => (
              <Circle
                key={`point-${point.period}-${point.lag}`}
                cx={lagScale(point.lag)}
                cy={lossRatioScale(point.lossRatio)}
                r={5}
                fill={point.color}
                stroke={colors.blackAndWhite.white}
                strokeWidth={2}
                onMouseEnter={(event) => {
                  const svgRect = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  const circleRect = event.currentTarget.getBoundingClientRect();
                  if (svgRect) {
                    showGrowthTooltip({
                      tooltipData: { period: point.period, lag: point.lag, lossRatio: point.lossRatio },
                      tooltipLeft: circleRect.left - svgRect.left + circleRect.width / 2,
                      tooltipTop: circleRect.top - svgRect.top,
                    });
                  }
                }}
                onMouseLeave={() => {
                  hideGrowthTooltip();
                }}
                style={{ cursor: 'pointer' }}
              />
            ))}

            {/* Baseline - 2px black900 line at bottom */}
            <VisxLine
              from={{ x: 0, y: innerHeight }}
              to={{ x: innerWidth, y: innerHeight }}
              stroke={colors.blackAndWhite.black900}
              strokeWidth={2}
            />

            {/* X Axis */}
            <AxisBottom
              top={innerHeight}
              scale={lagScale}
              stroke="transparent"
              tickStroke="transparent"
              tickLabelProps={() => ({
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              })}
              label="Dev Lag (months)"
              labelProps={{
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              }}
              labelOffset={15}
            />

            {/* Y Axis */}
            <AxisLeft
              scale={lossRatioScale}
              stroke="transparent"
              tickStroke="transparent"
              tickLabelProps={() => ({
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'end',
                dx: -10,
              })}
              tickFormat={(value) => `${value}%`}
              label="Loss Ratio"
              labelProps={{
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              }}
              labelOffset={53}
            />
          </Group>
        </svg>
        {growthTooltipOpen && growthTooltipData && (
          <div
            style={{
              position: 'absolute',
              top: (growthTooltipTop || 0) - 10,
              left: (growthTooltipLeft || 0),
              transform: 'translate(-50%, -100%)',
              backgroundColor: colors.blackAndWhite.white,
              padding: '12px',
              borderRadius: borderRadius[8],
              border: `1px solid ${colors.theme.primary400}`,
              boxShadow: shadows.medium,
              pointerEvents: 'none',
              zIndex: 1000,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              margin: '0 0 8px 0',
              fontWeight: 600,
            }}>
              {growthTooltipData.period}
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: '0 0 4px 0',
            }}>
              Lag: {growthTooltipData.lag} months
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: 0,
            }}>
              Loss Ratio: {growthTooltipData.lossRatio.toFixed(1)}%
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Mountain chart using @visx
  const renderMountainChart = (containerWidth: number, useComparisonData: boolean = false) => {
    const dataSource = useComparisonData ? comparisonTriangleData : currentTriangleData;
    const chartData = dataSource?.mountain || mountainChartData;

    // Group mountain data by lag for rendering
    const groupedData: Record<number, typeof chartData> = {};
    chartData.forEach(point => {
      if (!groupedData[point.lag]) {
        groupedData[point.lag] = [];
      }
      groupedData[point.lag].push(point);
    });

    const width = containerWidth;
    const height = 400;
    const margin = { top: 20, right: 40, bottom: 70, left: 70 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const periodScale = scaleTime<number>({
      domain: [
        Math.min(...chartData.map(d => d.period)),
        Math.max(...chartData.map(d => d.period)),
      ],
      range: [0, innerWidth],
      nice: true,
    });

    const valueScale = scaleLinear<number>({
      domain: [0, Math.max(...chartData.map(d => d.value))],
      range: [innerHeight, 0],
      nice: true,
    });

    // Color scale for different lags
    const colorScale = scaleLinear<string>({
      domain: [
        Math.min(...chartData.map(d => d.lag)),
        Math.max(...chartData.map(d => d.lag)),
      ],
      range: ['#e8fcf1', '#0f9342'], // Light green to dark green
    });

    // Format date for display
    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    };

    // Find terminal points (last point in each lag series)
    const terminalPoints = Object.entries(groupedData).map(([lag, points]) => {
      const sortedPoints = [...points].sort((a, b) => a.period - b.period);
      return sortedPoints[sortedPoints.length - 1];
    });

    return (
      <div style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <svg width={width} height={height}>
          <Group left={margin.left} top={margin.top}>
            {/* Grid */}
            <Grid
              xScale={periodScale}
              yScale={valueScale}
              width={innerWidth}
              height={innerHeight}
              stroke={colors.theme.primary400}
              strokeDasharray="3 3"
            />

            {/* Lines for each lag */}
            {Object.entries(groupedData).map(([lag, points]) => {
              const sortedPoints = [...points].sort((a, b) => a.period - b.period);
              return (
                <LinePath
                  key={lag}
                  data={sortedPoints}
                  x={(d) => periodScale(d.period)}
                  y={(d) => valueScale(d.value)}
                  stroke={colorScale(Number(lag))}
                  strokeWidth={2}
                />
              );
            })}

            {/* Terminal points with circles */}
            {terminalPoints.map((point) => (
              <Circle
                key={`terminal-${point.lag}-${point.period}`}
                cx={periodScale(point.period)}
                cy={valueScale(point.value)}
                r={5}
                fill={colorScale(point.lag)}
                stroke={colors.blackAndWhite.white}
                strokeWidth={2}
                onMouseEnter={(event) => {
                  const svgRect = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  const circleRect = event.currentTarget.getBoundingClientRect();
                  if (svgRect) {
                    showMountainTooltip({
                      tooltipData: {
                        period: formatDate(point.period),
                        lag: point.lag,
                        value: point.value,
                      },
                      tooltipLeft: circleRect.left - svgRect.left + circleRect.width / 2,
                      tooltipTop: circleRect.top - svgRect.top,
                    });
                  }
                }}
                onMouseLeave={() => {
                  hideMountainTooltip();
                }}
                style={{ cursor: 'pointer' }}
              />
            ))}

            {/* Baseline - 2px black900 line at bottom */}
            <VisxLine
              from={{ x: 0, y: innerHeight }}
              to={{ x: innerWidth, y: innerHeight }}
              stroke={colors.blackAndWhite.black900}
              strokeWidth={2}
            />

            {/* X Axis */}
            <AxisBottom
              top={innerHeight}
              scale={periodScale}
              stroke="transparent"
              tickStroke="transparent"
              tickLabelProps={() => ({
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              })}
              tickFormat={(value) => formatDate(value as number)}
              label="Experience Period"
              labelProps={{
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              }}
              labelOffset={15}
            />

            {/* Y Axis */}
            <AxisLeft
              scale={valueScale}
              stroke="transparent"
              tickStroke="transparent"
              tickLabelProps={() => ({
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'end',
                dx: -10,
              })}
              tickFormat={(value) => `${value}%`}
              label="Loss Ratio"
              labelProps={{
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              }}
              labelOffset={53}
            />
          </Group>
        </svg>
        {mountainTooltipOpen && mountainTooltipData && (
          <div
            style={{
              position: 'absolute',
              top: (mountainTooltipTop || 0) - 10,
              left: (mountainTooltipLeft || 0),
              transform: 'translate(-50%, -100%)',
              backgroundColor: colors.blackAndWhite.white,
              padding: '12px',
              borderRadius: borderRadius[8],
              border: `1px solid ${colors.theme.primary400}`,
              boxShadow: shadows.medium,
              pointerEvents: 'none',
              zIndex: 1000,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              margin: '0 0 8px 0',
              fontWeight: 600,
            }}>
              {mountainTooltipData.period}
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: '0 0 4px 0',
            }}>
              Dev Lag: {mountainTooltipData.lag} months
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: 0,
            }}>
              Loss Ratio: {mountainTooltipData.value.toFixed(1)}%
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Age-to-Age chart using @visx
  const renderAgeToAgeChart = (containerWidth: number, useComparisonData: boolean = false) => {
    const dataSource = useComparisonData ? comparisonTriangleData : currentTriangleData;
    const chartData = dataSource?.age_to_age || ageToAgeData;

    // Group data by lag for box plot rendering
    const groupedData: Record<number, typeof chartData> = {};
    chartData.forEach(point => {
      if (!groupedData[point.lag]) {
        groupedData[point.lag] = [];
      }
      groupedData[point.lag].push(point);
    });

    const width = containerWidth;
    const height = 400;
    const margin = { top: 20, right: 40, bottom: 70, left: 70 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Get unique lags and sort them
    const uniqueLags = Array.from(new Set(chartData.map(d => d.lag))).sort((a, b) => a - b);

    // Scales
    const lagScale = scaleBand<number>({
      domain: uniqueLags,
      range: [0, innerWidth],
      padding: 0.2,
    });

    const factorScale = scalePower<number>({
      domain: [0, Math.max(...chartData.map(d => d.factor))],
      range: [innerHeight, 0],
      nice: true,
      exponent: 0.2,
    });

    // Helper function to calculate quartiles
    const calculateQuartiles = (values: number[]) => {
      const sorted = [...values].sort((a, b) => a - b);
      const q25Index = Math.floor(sorted.length * 0.25);
      const q50Index = Math.floor(sorted.length * 0.5);
      const q75Index = Math.floor(sorted.length * 0.75);
      return {
        min: Math.max(Math.min(...sorted), 0),
        max: Math.max(...sorted),
        q25: sorted[q25Index],
        q50: sorted[q50Index],
        q75: sorted[q75Index],
      };
    };

    return (
      <div style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <svg width={width} height={height}>
          <Group left={margin.left} top={margin.top}>
            {/* Grid */}
            <Grid
              xScale={lagScale}
              yScale={factorScale}
              width={innerWidth}
              height={innerHeight}
              stroke={colors.theme.primary400}
              strokeDasharray="3 3"
            />

            {/* Scatter points for all data */}
            {chartData.map((point, i) => (
              <Circle
                key={`point-${point.lag}-${point.period}-${i}`}
                cx={(lagScale(point.lag) || 0) + lagScale.bandwidth() / 2}
                cy={factorScale(point.factor)}
                r={3}
                fill={colors.analytics.green500}
                opacity={0.5}
                onMouseEnter={(event) => {
                  const svgRect = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  const circleRect = event.currentTarget.getBoundingClientRect();
                  if (svgRect) {
                    showAgeToAgeTooltip({
                      tooltipData: {
                        period: point.period,
                        lag: point.lag,
                        factor: point.factor,
                      },
                      tooltipLeft: circleRect.left - svgRect.left + circleRect.width / 2,
                      tooltipTop: circleRect.top - svgRect.top,
                    });
                  }
                }}
                onMouseLeave={() => {
                  hideAgeToAgeTooltip();
                }}
                style={{ cursor: 'pointer' }}
              />
            ))}

            {/* Box plots for each lag */}
            {Object.entries(groupedData).map(([lag, points]) => {
              const factors = points.map(p => p.factor);
              const stats = calculateQuartiles(factors);

              return (
                <BoxPlot
                  key={lag}
                  valueScale={factorScale}
                  left={lagScale(Number(lag))}
                  min={stats.min}
                  max={stats.max}
                  firstQuartile={stats.q25}
                  median={stats.q50}
                  thirdQuartile={stats.q75}
                  boxWidth={lagScale.bandwidth()}
                  fill={colors.analytics.green300}
                  fillOpacity={0.3}
                  stroke={colors.analytics.green900}
                  strokeWidth={2}
                />
              );
            })}

            {/* Reference line at 1.0 */}
            <VisxLine
              from={{ x: 0, y: factorScale(1.0) }}
              to={{ x: innerWidth, y: factorScale(1.0) }}
              stroke={colors.blackAndWhite.black900}
              strokeWidth={1}
              strokeDasharray="3,3"
            />

            {/* Baseline - 2px black900 line at bottom */}
            <VisxLine
              from={{ x: 0, y: innerHeight }}
              to={{ x: innerWidth, y: innerHeight }}
              stroke={colors.blackAndWhite.black900}
              strokeWidth={2}
            />

            {/* X Axis */}
            <AxisBottom
              top={innerHeight}
              scale={lagScale}
              stroke="transparent"
              tickStroke="transparent"
              tickLabelProps={() => ({
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              })}
              label="Development Lag (months)"
              labelProps={{
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              }}
              labelOffset={15}
            />

            {/* Y Axis */}
            <AxisLeft
              scale={factorScale}
              stroke="transparent"
              tickStroke="transparent"
              tickLabelProps={() => ({
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'end',
                dx: -10,
              })}
              tickFormat={(value) => value.toFixed(1)}
              label="Age-to-Age Factor"
              labelProps={{
                ...typography.styles.dataXS,
                fill: colors.blackAndWhite.black500,
                textAnchor: 'middle',
              }}
              labelOffset={53}
            />
          </Group>
        </svg>
        {ageToAgeTooltipOpen && ageToAgeTooltipData && (
          <div
            style={{
              position: 'absolute',
              top: (ageToAgeTooltipTop || 0) - 10,
              left: (ageToAgeTooltipLeft || 0),
              transform: 'translate(-50%, -100%)',
              backgroundColor: colors.blackAndWhite.white,
              padding: '12px',
              borderRadius: borderRadius[8],
              border: `1px solid ${colors.theme.primary400}`,
              boxShadow: shadows.medium,
              pointerEvents: 'none',
              zIndex: 1000,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black900,
              margin: '0 0 8px 0',
              fontWeight: 600,
            }}>
              {ageToAgeTooltipData.period}
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: '0 0 4px 0',
            }}>
              Dev Lag: {ageToAgeTooltipData.lag} months
            </div>
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: 0,
            }}>
              Factor: {ageToAgeTooltipData.factor.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Helper function to generate varied data for different triangles
  const getTriangleDataModifier = (triangleId: string) => {
    // Generate a consistent seed from the triangle ID
    const hash = triangleId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seed = hash % 100;

    return {
      // Multiplier for values (0.6 to 1.4 range)
      valueMultiplier: 0.6 + (seed % 80) / 100,
      // Offset for values (-20 to +20)
      valueOffset: (seed % 40) - 20,
      // Pattern shift (0 to 5)
      patternShift: seed % 6,
    };
  };

  // Get modified data based on triangle ID - this simulates different triangles having different data
  const getModifiedChartData = (baseData: any[], triangleId: string, dataType: 'value' | 'percentage' | 'factor' = 'value') => {
    const modifier = getTriangleDataModifier(triangleId);

    return baseData.map(item => {
      const modifiedItem = { ...item };

      // Modify numeric values based on data type
      if (dataType === 'percentage') {
        // For percentages (0-100), apply gentler modifications
        if ('completeness' in modifiedItem) modifiedItem.completeness = Math.min(100, Math.max(0, modifiedItem.completeness * modifier.valueMultiplier));
        if ('value' in modifiedItem && typeof modifiedItem.value === 'number') {
          modifiedItem.value = Math.min(100, Math.max(0, modifiedItem.value * modifier.valueMultiplier));
        }
      } else if (dataType === 'factor') {
        // For factors, keep them reasonable
        if ('factor' in modifiedItem) modifiedItem.factor = Math.max(0.5, Math.min(2.5, modifiedItem.factor * modifier.valueMultiplier));
      } else {
        // For regular values
        if ('value' in modifiedItem && typeof modifiedItem.value === 'number') {
          modifiedItem.value = Math.max(0, Math.round(modifiedItem.value * modifier.valueMultiplier + modifier.valueOffset));
        }
        if ('paid' in modifiedItem) modifiedItem.paid = Math.max(0, Math.round(modifiedItem.paid * modifier.valueMultiplier));
        if ('incurred' in modifiedItem) modifiedItem.incurred = Math.max(0, Math.round(modifiedItem.incurred * modifier.valueMultiplier));
      }

      return modifiedItem;
    });
  };

  // Render chart based on selection
  const renderChart = (chartType: string, containerWidth: number = 600, useComparisonData: boolean = false) => {
    switch (chartType) {
      case 'data-completeness':
        return renderDataCompletenessChart(containerWidth, useComparisonData);
      case 'right-edge':
        return renderRightEdgeChart(containerWidth, useComparisonData);
      case 'heatmap':
        return renderHeatmapChart(containerWidth, useComparisonData);
      case 'growth-curve':
        return renderGrowthCurveChart(containerWidth, useComparisonData);
      case 'mountain':
        return renderMountainChart(containerWidth, useComparisonData);
      case 'age-to-age':
        return renderAgeToAgeChart(containerWidth, useComparisonData);
      default:
        return (
          <div style={{ padding: '20px 30px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{
              ...typography.styles.bodyL,
              color: colors.blackAndWhite.black500,
              margin: 0
            }}>
              {chartType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} chart will be added here
            </p>
          </div>
        );
    }
  };

  // Render chart action menu using portals
  const renderChartMenu = (
    isOpen: boolean,
    menuRef: React.RefObject<HTMLDivElement>,
    position: { top: number; left: number },
    chartName: string,
    chartId: number,
    onClose: () => void
  ) => {
    if (!isOpen) return null;

    const visibleCount = getVisibleChartCount();
    const canDelete = visibleCount > 1;

    const handleRemoveChart = () => {
      if (!canDelete) return; // Prevent deletion if only one chart left
      // Hide the card
      if (chartId === 1) setIsCard1Visible(false);
      else if (chartId === 2) setIsCard2Visible(false);
      else if (chartId === 3) setIsCard3Visible(false);
      else if (chartId === 4) setIsCard4Visible(false);
      else if (chartId === 5) setIsCard5Visible(false);
      else if (chartId === 6) setIsCard6Visible(false);
    };

    const menuContent = (
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          top: `${position.top}px`,
          left: `${position.left}px`,
          backgroundColor: colors.blackAndWhite.white,
          borderRadius: borderRadius[8],
          boxShadow: shadows.medium,
          padding: '10px',
          zIndex: 9999,
          minWidth: '200px',
        }}
      >
        {[
          { label: 'Download as .trib', onClick: () => console.log(`Download ${chartName} as .trib`), disabled: false },
          { label: 'Download as .csv', onClick: () => console.log(`Download ${chartName} as .csv`), disabled: false },
          { label: 'Download as .json', onClick: () => console.log(`Download ${chartName} as .json`), disabled: false },
          { label: 'Delete graph', onClick: handleRemoveChart, disabled: !canDelete },
        ].map((option, index) => (
          <div
            key={index}
            onClick={() => {
              if (!option.disabled) {
                option.onClick();
                onClose();
              }
            }}
            onMouseEnter={(e) => {
              if (!option.disabled) {
                (e.target as HTMLElement).style.backgroundColor = colors.theme.primary200;
              }
            }}
            onMouseLeave={(e) => {
              if (!option.disabled) {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
              }
            }}
            style={{
              padding: '12px 10px',
              borderRadius: borderRadius[4],
              fontFamily: typography.styles.bodyM.fontFamily.join(', '),
              fontSize: typography.styles.bodyM.fontSize,
              fontWeight: typography.styles.bodyM.fontWeight,
              lineHeight: typography.styles.bodyM.lineHeight,
              color: option.disabled ? colors.blackAndWhite.black300 : colors.blackAndWhite.black900,
              cursor: option.disabled ? 'not-allowed' : 'pointer',
              opacity: option.disabled ? 0.5 : 1,
              transition: 'background-color 0.2s ease',
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    );

    return createPortal(menuContent, document.body);
  };

  // Create navigation handler
  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'analytics-triangle-dashboard')
    : undefined;

  // Create breadcrumbs
  const breadcrumbs = onNavigateToPage
    ? createBreadcrumbs.analytics.triangleDashboard(triangleName, onNavigateToPage)
    : [
        { label: 'Analytics', isActive: false },
        { label: 'Triangle', isActive: false },
        { label: triangleName, isActive: true }
      ];

  return (
    <Layout
      pageType="analytics-triangle-dashboard"
      selectedSidebarItem="analytics"
      selectedSidebarSubitem="triangle"
      onNavigate={navigationHandler}
      breadcrumbs={breadcrumbs}
    >
      {/* Page Header */}
      <PageHeader
        title={[
          { text: triangleName, important: true },
          { text: ' Triangle Dashboard', important: false }
        ]}
        actions={[
          // Triangle Settings Button
          <Button
            key="settings"
            variant="primary"
            color="invisible"
            showIcon={false}
            onClick={() => console.log('Triangle Settings clicked')}
          >
            Settings
          </Button>,
          // Download Dropdown
          <DownloadButton
            key="download"
            options={[
              {
                label: 'Download as .trib',
                onClick: () => console.log('Download as .trib clicked'),
              },
              {
                label: 'Download as .csv',
                onClick: () => console.log('Download as .csv clicked'),
              },
              {
                label: 'Download as .json',
                onClick: () => console.log('Download as .json clicked'),
              },
            ]}
          />
        ]}
      />

      {/* Comparison Header Section */}
      {comparisonTriangle ? (
        // Comparison mode - show both triangle names
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '40px',
          gap: '40px',
          padding: '0 2px', // Add slight padding to prevent border clipping
        }}>
          {/* Left side - Current triangle name */}
          <div style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black500,
            fontWeight: typography.fontWeight.medium,
            width: 'calc(50% - 20px)', // Match chart card width
          }}>
            {triangleName}
          </div>

          {/* Right side - Comparison triangle with X button */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '5px 5px 5px 15px',
            borderRadius: borderRadius[8],
            backgroundColor: colors.blackAndWhite.white,
            width: 'calc(50% - 20px)', // Match chart card width
            border: `1px dashed ${colors.blackAndWhite.black500}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
              <span style={{
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black500,
              }}>
                Comparing with:
              </span>
              <span style={{
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black900,
              }}>
                {availableTriangles.find(t => t.value === comparisonTriangle)?.label || comparisonTriangle}
              </span>
            </div>
            <button
              onClick={() => {
                setComparisonTriangle('');
                setComparisonSearchQuery('');
              }}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: borderRadius[8],
                backgroundColor: colors.theme.primary200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              type="button"
            >
              <CloseSmall color={colors.blackAndWhite.black900} />
            </button>
          </div>
        </div>
      ) : (
        // Normal mode - show action buttons
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '40px'
        }}>
        <button
          onClick={() => console.log('Aggregate clicked')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '5px 15px 5px 5px',
            borderRadius: borderRadius[8],
            border: `1px dashed ${colors.theme.primary400}`,
            backgroundColor: colors.blackAndWhite.white,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: typography.styles.bodyM.fontFamily.join(', '),
            fontSize: typography.styles.bodyM.fontSize,
            fontWeight: typography.styles.bodyM.fontWeight,
            lineHeight: typography.styles.bodyM.lineHeight,
            letterSpacing: typography.styles.bodyM.letterSpacing,
            color: colors.blackAndWhite.black700,
          }}
          type="button"
        >
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: borderRadius[8],
            backgroundColor: colors.theme.primary200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <AddMedium color={colors.blackAndWhite.black900} style={{ width: '12px', height: '12px' }} />
          </div>
          <span>Aggregate with another triangle</span>
        </button>

        {/* Comparison Triangle Button/Input */}
        <div
          ref={comparisonInputRef}
          style={{
            position: 'relative',
            width: isComparisonDropdownOpen ? '400px' : 'auto',
            maxWidth: '100%',
            transition: 'width 0.3s ease'
          }}
        >
          {!isComparisonDropdownOpen ? (
            // Button state
            <button
              onClick={() => setIsComparisonDropdownOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '5px 15px 5px 5px',
                borderRadius: borderRadius[8],
                border: `1px dashed ${colors.theme.primary400}`,
                backgroundColor: colors.blackAndWhite.white,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: typography.styles.bodyM.fontFamily.join(', '),
                fontSize: typography.styles.bodyM.fontSize,
                fontWeight: typography.styles.bodyM.fontWeight,
                lineHeight: typography.styles.bodyM.lineHeight,
                letterSpacing: typography.styles.bodyM.letterSpacing,
                color: colors.blackAndWhite.black700,
              }}
              type="button"
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: borderRadius[8],
                backgroundColor: colors.theme.primary200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <AddMedium color={colors.blackAndWhite.black900} style={{ width: '12px', height: '12px' }} />
              </div>
              <span>Compare with another triangle</span>
            </button>
          ) : (
            // Input state
            <div style={{ position: 'relative', marginTop: '-24px' }}>
              <Input
                ref={searchInputRef}
                label=""
                placeholder="Select a triangle to compare..."
                value={comparisonSearchQuery}
                onChange={(e) => {
                  setComparisonSearchQuery(e.target.value);
                }}
                onFocus={() => setIsComparisonDropdownOpen(true)}
                state="active"
              />
            </div>
          )}

          {/* Dropdown List */}
          {isComparisonDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: colors.blackAndWhite.white,
              border: `1px solid ${colors.theme.primary400}`,
              borderRadius: borderRadius[8],
              marginTop: spacing[1],
              zIndex: 1000,
              boxShadow: shadows.md,
              padding: '10px',
              maxHeight: '300px',
              overflow: 'hidden'
            }}>
              <CustomScroll maxHeight="280px" scrollClassName="comparison-dropdown-scroll">
                {availableTriangles
                  .filter(triangle =>
                    triangle.label.toLowerCase().includes(comparisonSearchQuery.toLowerCase())
                  )
                  .map((triangle) => (
                    <div
                      key={triangle.value}
                      onClick={() => {
                        setComparisonTriangle(triangle.value);
                        setComparisonSearchQuery('');
                        setIsComparisonDropdownOpen(false);
                        console.log('Selected triangle for comparison:', triangle.value);
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = colors.theme.primary200;
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      }}
                      style={{
                        padding: '12px 10px',
                        borderRadius: borderRadius[4],
                        fontFamily: typography.styles.bodyM.fontFamily.join(', '),
                        fontSize: typography.styles.bodyM.fontSize,
                        fontWeight: typography.styles.bodyM.fontWeight,
                        lineHeight: typography.styles.bodyM.lineHeight,
                        color: colors.blackAndWhite.black900,
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      {triangle.label}
                    </div>
                  ))}
              </CustomScroll>
            </div>
          )}
        </div>
        </div>
      )}

      {/* Chart Cards */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        width: '100%',
        boxSizing: 'border-box',
        alignItems: 'flex-start',
      }}>
        {/* Left side - Current triangle charts */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          width: comparisonTriangle ? 'calc(50% - 20px)' : '100%',
          transition: 'width 0.3s ease',
        }}>
        {/* First Chart Card */}
        {isCard1Visible && (
          <div
            ref={card1WrapperRef}
            style={{
              position: 'relative',
              width: isCard1Expanded ? '100%' : (comparisonTriangle ? '100%' : 'calc(50% - 20px)'),
              transition: 'width 0.3s ease'
            }}
          >
          <DashboardCard
            titleDropdown={{
              options: allChartOptions,
              value: selectedChart1,
              onChange: (value) => {
                // Check if the selected chart is already displayed in another visible card
                if (isCard2Visible && value === selectedChart2) {
                  setSelectedChart2(selectedChart1);
                } else if (isCard3Visible && value === selectedChart3) {
                  setSelectedChart3(selectedChart1);
                } else if (isCard4Visible && value === selectedChart4) {
                  setSelectedChart4(selectedChart1);
                } else if (isCard5Visible && value === selectedChart5) {
                  setSelectedChart5(selectedChart1);
                } else if (isCard6Visible && value === selectedChart6) {
                  setSelectedChart6(selectedChart1);
                }
                setSelectedChart1(value);
              },
              placeholder: 'Chart'
            }}
            icon={<CardsGraph />}
            actions={comparisonTriangle ? [
              // Hide expand button in comparison mode
              {
                type: 'icon',
                icon: <div ref={chart1ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart1ButtonRef.current) {
                    const rect = chart1ButtonRef.current.getBoundingClientRect();
                    setChart1MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200,
                    });
                  }
                  setIsChart1MenuOpen(!isChart1MenuOpen);
                },
                color: 'invisible'
              }
            ] : [
              {
                type: 'icon',
                icon: isCard1Expanded
                  ? <CollapseSmall color={colors.blackAndWhite.black900} />
                  : <ExpandSmall color={colors.blackAndWhite.black900} />,
                onClick: () => setIsCard1Expanded(!isCard1Expanded),
                color: 'primary200'
              },
              {
                type: 'separator'
              },
              {
                type: 'icon',
                icon: <div ref={chart1ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart1ButtonRef.current) {
                    const rect = chart1ButtonRef.current.getBoundingClientRect();
                    setChart1MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200, // Align right edge of menu with button
                    });
                  }
                  setIsChart1MenuOpen(!isChart1MenuOpen);
                },
                color: 'invisible'
              }
            ]}
            width="100%"
          >
            <div ref={chart1ContainerRef} style={{ width: '100%' }}>
              {renderChart(selectedChart1, chart1Width)}
            </div>
          </DashboardCard>
          {renderChartMenu(
            isChart1MenuOpen,
            chart1MenuRef,
            chart1MenuPosition,
            selectedChart1,
            1,
            () => setIsChart1MenuOpen(false)
          )}
        </div>
        )}

        {/* Second Chart Card */}
        {isCard2Visible && (
          <div
          ref={card2WrapperRef}
          style={{
            position: 'relative',
            width: isCard2Expanded ? '100%' : (comparisonTriangle ? '100%' : 'calc(50% - 20px)'),
            transition: 'width 0.3s ease'
          }}
        >
          <DashboardCard
            titleDropdown={{
              options: allChartOptions,
              value: selectedChart2,
              onChange: (value) => {
                // Check if the selected chart is already displayed in another visible card
                if (isCard1Visible && value === selectedChart1) {
                  setSelectedChart1(selectedChart2);
                } else if (isCard3Visible && value === selectedChart3) {
                  setSelectedChart3(selectedChart2);
                } else if (isCard4Visible && value === selectedChart4) {
                  setSelectedChart4(selectedChart2);
                } else if (isCard5Visible && value === selectedChart5) {
                  setSelectedChart5(selectedChart2);
                } else if (isCard6Visible && value === selectedChart6) {
                  setSelectedChart6(selectedChart2);
                }
                setSelectedChart2(value);
              },
              placeholder: 'Chart'
            }}
            icon={<CardsGraph />}
            actions={comparisonTriangle ? [
              {
                type: 'icon',
                icon: <div ref={chart2ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart2ButtonRef.current) {
                    const rect = chart2ButtonRef.current.getBoundingClientRect();
                    setChart2MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200,
                    });
                  }
                  setIsChart2MenuOpen(!isChart2MenuOpen);
                },
                color: 'invisible'
              }
            ] : [
              {
                type: 'icon',
                icon: isCard2Expanded
                  ? <CollapseSmall color={colors.blackAndWhite.black900} />
                  : <ExpandSmall color={colors.blackAndWhite.black900} />,
                onClick: () => setIsCard2Expanded(!isCard2Expanded),
                color: 'primary200'
              },
              {
                type: 'separator'
              },
              {
                type: 'icon',
                icon: <div ref={chart2ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart2ButtonRef.current) {
                    const rect = chart2ButtonRef.current.getBoundingClientRect();
                    setChart2MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200, // Align right edge of menu with button
                    });
                  }
                  setIsChart2MenuOpen(!isChart2MenuOpen);
                },
                color: 'invisible'
              }
            ]}
            width="100%"
          >
            <div ref={chart2ContainerRef} style={{ width: '100%' }}>
              {renderChart(selectedChart2, chart2Width)}
            </div>
          </DashboardCard>
          {renderChartMenu(
            isChart2MenuOpen,
            chart2MenuRef,
            chart2MenuPosition,
            selectedChart2,
            2,
            () => setIsChart2MenuOpen(false)
          )}
        </div>
        )}

        {/* Third Chart Card */}
        {isCard3Visible && (
          <div
          ref={card3WrapperRef}
          style={{
            position: 'relative',
            width: isCard3Expanded ? '100%' : (comparisonTriangle ? '100%' : 'calc(50% - 20px)'),
            transition: 'width 0.3s ease'
          }}
        >
          <DashboardCard
            titleDropdown={{
              options: allChartOptions,
              value: selectedChart3,
              onChange: (value) => {
                // Check if the selected chart is already displayed in another visible card
                if (isCard1Visible && value === selectedChart1) {
                  setSelectedChart1(selectedChart3);
                } else if (isCard2Visible && value === selectedChart2) {
                  setSelectedChart2(selectedChart3);
                } else if (isCard4Visible && value === selectedChart4) {
                  setSelectedChart4(selectedChart3);
                } else if (isCard5Visible && value === selectedChart5) {
                  setSelectedChart5(selectedChart3);
                } else if (isCard6Visible && value === selectedChart6) {
                  setSelectedChart6(selectedChart3);
                }
                setSelectedChart3(value);
              },
              placeholder: 'Chart'
            }}
            icon={<CardsGraph />}
            actions={comparisonTriangle ? [
              {
                type: 'icon',
                icon: <div ref={chart3ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart3ButtonRef.current) {
                    const rect = chart3ButtonRef.current.getBoundingClientRect();
                    setChart3MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200,
                    });
                  }
                  setIsChart3MenuOpen(!isChart3MenuOpen);
                },
                color: 'invisible'
              }
            ] : [
              {
                type: 'icon',
                icon: isCard3Expanded
                  ? <CollapseSmall color={colors.blackAndWhite.black900} />
                  : <ExpandSmall color={colors.blackAndWhite.black900} />,
                onClick: () => setIsCard3Expanded(!isCard3Expanded),
                color: 'primary200'
              },
              {
                type: 'separator'
              },
              {
                type: 'icon',
                icon: <div ref={chart3ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart3ButtonRef.current) {
                    const rect = chart3ButtonRef.current.getBoundingClientRect();
                    setChart3MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200,
                    });
                  }
                  setIsChart3MenuOpen(!isChart3MenuOpen);
                },
                color: 'invisible'
              }
            ]}
            width="100%"
          >
            <div ref={chart3ContainerRef} style={{ width: '100%' }}>
              {renderChart(selectedChart3, chart3Width)}
            </div>
          </DashboardCard>
          {renderChartMenu(
            isChart3MenuOpen,
            chart3MenuRef,
            chart3MenuPosition,
            selectedChart3,
            3,
            () => setIsChart3MenuOpen(false)
          )}
        </div>
        )}

        {/* Fourth Chart Card */}
        {isCard4Visible && (
          <div
          ref={card4WrapperRef}
          style={{
            position: 'relative',
            width: isCard4Expanded ? '100%' : (comparisonTriangle ? '100%' : 'calc(50% - 20px)'),
            transition: 'width 0.3s ease'
          }}
        >
          <DashboardCard
            titleDropdown={{
              options: allChartOptions,
              value: selectedChart4,
              onChange: (value) => {
                // Check if the selected chart is already displayed in another visible card
                if (isCard1Visible && value === selectedChart1) {
                  setSelectedChart1(selectedChart4);
                } else if (isCard2Visible && value === selectedChart2) {
                  setSelectedChart2(selectedChart4);
                } else if (isCard3Visible && value === selectedChart3) {
                  setSelectedChart3(selectedChart4);
                } else if (isCard5Visible && value === selectedChart5) {
                  setSelectedChart5(selectedChart4);
                } else if (isCard6Visible && value === selectedChart6) {
                  setSelectedChart6(selectedChart4);
                }
                setSelectedChart4(value);
              },
              placeholder: 'Chart'
            }}
            icon={<CardsGraph />}
            actions={comparisonTriangle ? [
              {
                type: 'icon',
                icon: <div ref={chart4ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart4ButtonRef.current) {
                    const rect = chart4ButtonRef.current.getBoundingClientRect();
                    setChart4MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200,
                    });
                  }
                  setIsChart4MenuOpen(!isChart4MenuOpen);
                },
                color: 'invisible'
              }
            ] : [
              {
                type: 'icon',
                icon: isCard4Expanded
                  ? <CollapseSmall color={colors.blackAndWhite.black900} />
                  : <ExpandSmall color={colors.blackAndWhite.black900} />,
                onClick: () => setIsCard4Expanded(!isCard4Expanded),
                color: 'primary200'
              },
              {
                type: 'separator'
              },
              {
                type: 'icon',
                icon: <div ref={chart4ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart4ButtonRef.current) {
                    const rect = chart4ButtonRef.current.getBoundingClientRect();
                    setChart4MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200,
                    });
                  }
                  setIsChart4MenuOpen(!isChart4MenuOpen);
                },
                color: 'invisible'
              }
            ]}
            width="100%"
          >
            <div ref={chart4ContainerRef} style={{ width: '100%' }}>
              {renderChart(selectedChart4, chart4Width)}
            </div>
          </DashboardCard>
          {renderChartMenu(
            isChart4MenuOpen,
            chart4MenuRef,
            chart4MenuPosition,
            selectedChart4,
            4,
            () => setIsChart4MenuOpen(false)
          )}
        </div>
        )}

        {/* Fifth Chart Card */}
        {isCard5Visible && (
          <div
          ref={card5WrapperRef}
          style={{
            position: 'relative',
            width: isCard5Expanded ? '100%' : (comparisonTriangle ? '100%' : 'calc(50% - 20px)'),
            transition: 'width 0.3s ease'
          }}
        >
          <DashboardCard
            titleDropdown={{
              options: allChartOptions,
              value: selectedChart5,
              onChange: (value) => {
                // Check if the selected chart is already displayed in another visible card
                if (isCard1Visible && value === selectedChart1) {
                  setSelectedChart1(selectedChart5);
                } else if (isCard2Visible && value === selectedChart2) {
                  setSelectedChart2(selectedChart5);
                } else if (isCard3Visible && value === selectedChart3) {
                  setSelectedChart3(selectedChart5);
                } else if (isCard4Visible && value === selectedChart4) {
                  setSelectedChart4(selectedChart5);
                } else if (isCard6Visible && value === selectedChart6) {
                  setSelectedChart6(selectedChart5);
                }
                setSelectedChart5(value);
              },
              placeholder: 'Chart'
            }}
            icon={<CardsGraph />}
            actions={comparisonTriangle ? [
              {
                type: 'icon',
                icon: <div ref={chart5ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart5ButtonRef.current) {
                    const rect = chart5ButtonRef.current.getBoundingClientRect();
                    setChart5MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200,
                    });
                  }
                  setIsChart5MenuOpen(!isChart5MenuOpen);
                },
                color: 'invisible'
              }
            ] : [
              {
                type: 'icon',
                icon: isCard5Expanded
                  ? <CollapseSmall color={colors.blackAndWhite.black900} />
                  : <ExpandSmall color={colors.blackAndWhite.black900} />,
                onClick: () => setIsCard5Expanded(!isCard5Expanded),
                color: 'primary200'
              },
              {
                type: 'separator'
              },
              {
                type: 'icon',
                icon: <div ref={chart5ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart5ButtonRef.current) {
                    const rect = chart5ButtonRef.current.getBoundingClientRect();
                    setChart5MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200,
                    });
                  }
                  setIsChart5MenuOpen(!isChart5MenuOpen);
                },
                color: 'invisible'
              }
            ]}
            width="100%"
          >
            <div ref={chart5ContainerRef} style={{ width: '100%' }}>
              {renderChart(selectedChart5, chart5Width)}
            </div>
          </DashboardCard>
          {renderChartMenu(
            isChart5MenuOpen,
            chart5MenuRef,
            chart5MenuPosition,
            selectedChart5,
            5,
            () => setIsChart5MenuOpen(false)
          )}
        </div>
        )}

        {/* Sixth Chart Card */}
        {isCard6Visible && (
          <div
          ref={card6WrapperRef}
          style={{
            position: 'relative',
            width: isCard6Expanded ? '100%' : (comparisonTriangle ? '100%' : 'calc(50% - 20px)'),
            transition: 'width 0.3s ease'
          }}
        >
          <DashboardCard
            titleDropdown={{
              options: allChartOptions,
              value: selectedChart6,
              onChange: (value) => {
                // Check if the selected chart is already displayed in another visible card
                if (isCard1Visible && value === selectedChart1) {
                  setSelectedChart1(selectedChart6);
                } else if (isCard2Visible && value === selectedChart2) {
                  setSelectedChart2(selectedChart6);
                } else if (isCard3Visible && value === selectedChart3) {
                  setSelectedChart3(selectedChart6);
                } else if (isCard4Visible && value === selectedChart4) {
                  setSelectedChart4(selectedChart6);
                } else if (isCard5Visible && value === selectedChart5) {
                  setSelectedChart5(selectedChart6);
                }
                setSelectedChart6(value);
              },
              placeholder: 'Chart'
            }}
            icon={<CardsGraph />}
            actions={comparisonTriangle ? [
              {
                type: 'icon',
                icon: <div ref={chart6ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart6ButtonRef.current) {
                    const rect = chart6ButtonRef.current.getBoundingClientRect();
                    setChart6MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200,
                    });
                  }
                  setIsChart6MenuOpen(!isChart6MenuOpen);
                },
                color: 'invisible'
              }
            ] : [
              {
                type: 'icon',
                icon: isCard6Expanded
                  ? <CollapseSmall color={colors.blackAndWhite.black900} />
                  : <ExpandSmall color={colors.blackAndWhite.black900} />,
                onClick: () => setIsCard6Expanded(!isCard6Expanded),
                color: 'primary200'
              },
              {
                type: 'separator'
              },
              {
                type: 'icon',
                icon: <div ref={chart6ButtonRef}><MoreSmall color={colors.blackAndWhite.black900} /></div>,
                onClick: () => {
                  if (chart6ButtonRef.current) {
                    const rect = chart6ButtonRef.current.getBoundingClientRect();
                    setChart6MenuPosition({
                      top: rect.bottom + 8,
                      left: rect.right - 200,
                    });
                  }
                  setIsChart6MenuOpen(!isChart6MenuOpen);
                },
                color: 'invisible'
              }
            ]}
            width="100%"
          >
            <div ref={chart6ContainerRef} style={{ width: '100%' }}>
              {renderChart(selectedChart6, chart6Width)}
            </div>
          </DashboardCard>
          {renderChartMenu(
            isChart6MenuOpen,
            chart6MenuRef,
            chart6MenuPosition,
            selectedChart6,
            6,
            () => setIsChart6MenuOpen(false)
          )}
        </div>
        )}

        {/* Add Another Graph Button - disable when all 6 cards are visible */}
        {!comparisonTriangle && (
          <Button
            variant="tertiary"
            onClick={handleAddAnotherGraph}
            disabled={isCard1Visible && isCard2Visible && isCard3Visible && isCard4Visible && isCard5Visible && isCard6Visible}
            style={{
              width: '100%',
              height: '44px'
            }}
          >
            Add another Graph
          </Button>
        )}
        </div>

        {/* Right side - Comparison triangle charts */}
        {comparisonTriangle && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            width: 'calc(50% - 20px)',
            transition: 'width 0.3s ease',
          }}>
            {/* Comparison Chart 1 */}
            {isCard1Visible && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  transition: 'width 0.3s ease'
                }}
              >
                <DashboardCard
                  titleDropdown={{
                    options: allChartOptions,
                    value: selectedChart1,
                    onChange: () => {}, // Read-only for comparison
                    placeholder: 'Chart'
                  }}
                  icon={<CardsGraph />}
                  actions={[]}
                  width="100%"
                  style={{
                    border: `1px dashed ${colors.blackAndWhite.black500}`,
                  }}
                >
                  <div style={{ width: '100%' }}>
                    {renderChart(selectedChart1, chart1Width, true)}
                  </div>
                </DashboardCard>
              </div>
            )}

            {/* Comparison Chart 2 */}
            {isCard2Visible && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  transition: 'width 0.3s ease'
                }}
              >
                <DashboardCard
                  titleDropdown={{
                    options: allChartOptions,
                    value: selectedChart2,
                    onChange: () => {},
                    placeholder: 'Chart'
                  }}
                  icon={<CardsGraph />}
                  actions={[]}
                  width="100%"
                  style={{
                    border: `1px dashed ${colors.blackAndWhite.black500}`,
                  }}
                >
                  <div style={{ width: '100%' }}>
                    {renderChart(selectedChart2, chart2Width, true)}
                  </div>
                </DashboardCard>
              </div>
            )}

            {/* Comparison Chart 3 */}
            {isCard3Visible && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  transition: 'width 0.3s ease'
                }}
              >
                <DashboardCard
                  titleDropdown={{
                    options: allChartOptions,
                    value: selectedChart3,
                    onChange: () => {},
                    placeholder: 'Chart'
                  }}
                  icon={<CardsGraph />}
                  actions={[]}
                  width="100%"
                  style={{
                    border: `1px dashed ${colors.blackAndWhite.black500}`,
                  }}
                >
                  <div style={{ width: '100%' }}>
                    {renderChart(selectedChart3, chart3Width, true)}
                  </div>
                </DashboardCard>
              </div>
            )}

            {/* Comparison Chart 4 */}
            {isCard4Visible && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  transition: 'width 0.3s ease'
                }}
              >
                <DashboardCard
                  titleDropdown={{
                    options: allChartOptions,
                    value: selectedChart4,
                    onChange: () => {},
                    placeholder: 'Chart'
                  }}
                  icon={<CardsGraph />}
                  actions={[]}
                  width="100%"
                  style={{
                    border: `1px dashed ${colors.blackAndWhite.black500}`,
                  }}
                >
                  <div style={{ width: '100%' }}>
                    {renderChart(selectedChart4, chart4Width, true)}
                  </div>
                </DashboardCard>
              </div>
            )}

            {/* Comparison Chart 5 */}
            {isCard5Visible && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  transition: 'width 0.3s ease'
                }}
              >
                <DashboardCard
                  titleDropdown={{
                    options: allChartOptions,
                    value: selectedChart5,
                    onChange: () => {},
                    placeholder: 'Chart'
                  }}
                  icon={<CardsGraph />}
                  actions={[]}
                  width="100%"
                  style={{
                    border: `1px dashed ${colors.blackAndWhite.black500}`,
                  }}
                >
                  <div style={{ width: '100%' }}>
                    {renderChart(selectedChart5, chart5Width, true)}
                  </div>
                </DashboardCard>
              </div>
            )}

            {/* Comparison Chart 6 */}
            {isCard6Visible && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  transition: 'width 0.3s ease'
                }}
              >
                <DashboardCard
                  titleDropdown={{
                    options: allChartOptions,
                    value: selectedChart6,
                    onChange: () => {},
                    placeholder: 'Chart'
                  }}
                  icon={<CardsGraph />}
                  actions={[]}
                  width="100%"
                  style={{
                    border: `1px dashed ${colors.blackAndWhite.black500}`,
                  }}
                >
                  <div style={{ width: '100%' }}>
                    {renderChart(selectedChart6, chart6Width, true)}
                  </div>
                </DashboardCard>
              </div>
            )}
          </div>
        )}

        {/* Add Another Graph Button - spans full width in comparison mode */}
        {comparisonTriangle && (
          <div style={{ width: '100%' }}>
            <Button
              variant="tertiary"
              onClick={handleAddAnotherGraph}
              disabled={isCard1Visible && isCard2Visible && isCard3Visible && isCard4Visible && isCard5Visible && isCard6Visible}
              style={{
                width: '100%',
                height: '44px'
              }}
            >
              Add another Graph
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

/**
 * AnalyticsTriangleDashboard Page Component - Wrapped with ThemeProvider
 *
 * Main export that wraps the content with Analytics theme
 */
export const AnalyticsTriangleDashboard: React.FC<AnalyticsTriangleDashboardProps> = (props) => {
  return (
    <ThemeProvider initialTheme="analytics">
      <AnalyticsTriangleDashboardContent {...props} />
    </ThemeProvider>
  );
};
