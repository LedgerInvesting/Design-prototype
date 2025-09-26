/**
 * Marketplace Offerings Page
 *
 * Comprehensive marketplace interface for insurance risk investment opportunities.
 * Features animated data visualizations, detailed financial metrics, and responsive design.
 *
 * Key Components:
 * - ResponsiveChartUI: Reusable chart background with grid lines
 * - AnimatedCashFlowChart: Yellow animated cash flow visualization
 * - AnimatedEarnedPremiumChart: Green animated premium bars with overlay architecture
 * - OfferingCard: Complete card layout with 4-column data presentation
 * - MarketplaceBanner: Header banner with theme-aware styling
 *
 * Technical Features:
 * - Lottie animations triggered by scroll intersection
 * - 120% height scaling solution for chart bottom alignment
 * - Theme-aware semantic colors (marketplace violet scheme)
 * - CSS Grid responsive layout with fixed card dimensions
 * - Performance-optimized scroll event handling
 *
 * @author Claude (Anthropic)
 * @version 2.0
 * @since 2024
 */

import React, { useState, useEffect, useRef } from 'react';

// Import page components
import { Layout } from '@design-library/pages';

// Import base components
import { Button, Status, Tabs } from '@design-library/components';

// Import design tokens
import { typography, borderRadius, shadows, useSemanticColors } from '@design-library/tokens';

// Import navigation utilities
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';

// Import icons
import { ChevronRightSmall } from '@design-library/icons';

// Import Lottie for animated charts
import Lottie from 'lottie-react';

/**
 * Responsive Chart UI Component
 *
 * Creates a responsive chart background with grid lines and baseline for data visualization.
 * Features:
 * - 5 horizontal dotted grid lines at fixed percentages (26%, 39%, 52%, 65%, 78%)
 * - Solid baseline at 13% from bottom in black900
 * - Placeholder bars for alignment reference
 * - Scales to 120% height for proper bottom alignment
 * - Theme-aware colors using semantic color tokens
 *
 * Used as background for animated chart overlays in marketplace offering cards.
 */
const ResponsiveChartUI: React.FC = () => {
  const colors = useSemanticColors();

  const chartContainerStyles: React.CSSProperties = {
    width: '100%',
    height: '120%',
    minHeight: '60px',
    position: 'relative',
    backgroundColor: 'transparent',
    padding: '0',
    boxSizing: 'border-box'
  };

  const baselineStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: '13%',
    left: '0',
    right: '0',
    height: '1px',
    backgroundColor: colors.blackAndWhite.black900,
  };

  const gridLineStyles: React.CSSProperties = {
    position: 'absolute',
    left: '0',
    right: '0',
    height: '1px',
    borderTop: `1px dotted ${colors.theme.primary400}`,
    backgroundColor: 'transparent',
  };

  const barContainerStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: '13%',
    left: '0',
    right: '0',
    height: '67%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '2px'
  };

  const barStyles: React.CSSProperties = {
    width: '8px',
    backgroundColor: colors.blackAndWhite.black200,
    borderRadius: '2px 2px 0 0',
    minHeight: '2px'
  };

  // Sample bar heights for the static chart structure
  const barHeights = [15, 25, 35, 20, 40, 18, 32, 28, 38, 22, 30];

  return (
    <div style={chartContainerStyles}>
      {/* Grid lines - 5 dotted lines evenly spaced */}
      <div style={{ ...gridLineStyles, bottom: '26%' }}></div>
      <div style={{ ...gridLineStyles, bottom: '39%' }}></div>
      <div style={{ ...gridLineStyles, bottom: '52%' }}></div>
      <div style={{ ...gridLineStyles, bottom: '65%' }}></div>
      <div style={{ ...gridLineStyles, bottom: '78%' }}></div>

      {/* Baseline - bottom line (black900) */}
      <div style={baselineStyles}></div>

      {/* Bar container - this will be where animated bars overlay */}
      <div style={barContainerStyles} id="animated-bars-container">
        {/* Static placeholder bars - will be hidden when animation plays */}
        {barHeights.map((height, index) => (
          <div
            key={index}
            style={{
              ...barStyles,
              height: `${(height / 40) * 100}%`, // Convert to percentage
              opacity: 0.3 // Light placeholder until animation loads
            }}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Animated Cash Flow Chart Component
 *
 * Displays an animated yellow cash flow chart using Lottie animation.
 * Features:
 * - Loads graph-2.json animation data containing yellow cash flow visualization
 * - Scroll-triggered animation plays once when 50% visible
 * - Non-looping animation for single-play experience
 * - Intersection Observer for performance-optimized scroll detection
 * - Automatic cleanup of observers and state on unmount
 *
 * Animation Details:
 * - Color: Yellow ([0.98, 0.812, 0.2]) identifying it as cash flow data
 * - Duration: Approximately 4 seconds
 * - Format: Lottie JSON animation exported from design tools
 */
const AnimatedCashFlowChart: React.FC = () => {
  const [animationData, setAnimationData] = useState<any>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);

  // Load animation data
  useEffect(() => {
    setIsMounted(true);
    const loadAnimation = async () => {
      try {
        const response = await fetch('/graph-2.json');
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Error loading cash flow animation:', error);
      }
    };

    if (isMounted) {
      loadAnimation();
    }

    return () => setIsMounted(false);
  }, [isMounted]);

  // Intersection observer for scroll-triggered animation
  useEffect(() => {
    if (!chartRef.current || !animationData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed && lottieRef.current) {
            lottieRef.current.play();
            setHasPlayed(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(chartRef.current);

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, [animationData, hasPlayed]);

  return (
    <div ref={chartRef} style={{ height: '100%', width: '100%', position: 'relative' }}>
      {animationData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      )}
    </div>
  );
};

/**
 * Animated Earned Premium Chart Component
 *
 * Complex dual-layer chart combining responsive static UI with animated bar overlay.
 * Features:
 * - ResponsiveChartUI background providing grid lines and baseline structure
 * - Green bar animation overlay (green-graph.json) triggered by scroll
 * - Scroll-triggered animation plays once when 50% visible
 * - Precise alignment using 120% height scaling and translateY adjustment
 * - Layered architecture for independent UI and animation control
 *
 * Technical Implementation:
 * - Static UI: ResponsiveChartUI component with 120% height for bottom alignment
 * - Animation Layer: Lottie animation positioned with bottom: 13% and translateY(25%)
 * - Intersection Observer: 0.5 threshold for scroll triggering
 * - State Management: Prevents replay with hasPlayed flag
 */
const AnimatedEarnedPremiumChart: React.FC = () => {
  const [animationData, setAnimationData] = useState<any>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);

  // Load animation data
  useEffect(() => {
    setIsMounted(true);
    const loadAnimation = async () => {
      try {
        const response = await fetch('/green-graph.json');
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Error loading bar animation:', error);
      }
    };

    if (isMounted) {
      loadAnimation();
    }

    return () => setIsMounted(false);
  }, [isMounted]);

  // Intersection observer for scroll-triggered animation
  useEffect(() => {
    if (!chartRef.current || !animationData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed && lottieRef.current) {
            lottieRef.current.play();
            setHasPlayed(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(chartRef.current);

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, [animationData, hasPlayed]);

  return (
    <div ref={chartRef} style={{ height: '100%', width: '100%', position: 'relative' }}>
      {/* Background chart UI */}
      <ResponsiveChartUI />

      {/* Animated bars overlay */}
      {animationData && (
        <div style={{
          position: 'absolute',
          bottom: '13%',
          left: '0',
          right: '0',
          height: '67%',
          pointerEvents: 'none'
        }}>
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={false}
            autoplay={false}
            style={{
              width: '100%',
              height: '100%',
              transform: 'translateY(25%)'
            }}
          />
        </div>
      )}
    </div>
  );
};

/**
 * Props interface for the main MarketplaceOfferings page component
 */
interface MarketplaceOfferingsProps {
  /** Optional navigation handler for programmatic page routing */
  onNavigateToPage?: (page: string, data?: any) => void;
}

/**
 * Marketplace Banner Component
 *
 * Header banner for the marketplace page featuring gradient background,
 * transaction icon, title, subtitle, and status card with monthly metrics.
 *
 * Features:
 * - Theme-aware gradient background (marketplace violet theme)
 * - Responsive layout with illustration and text content
 * - Status card showing monthly transaction volume
 * - Design consistent with other page banners (Reports, Analytics)
 *
 * @note Consider extracting to shared banner component to reduce duplication
 * across TransactionManagement, ReportsExplorer, and MarketplaceOfferings
 */
const MarketplaceBanner: React.FC = () => {
  const colors = useSemanticColors();

  const headerStyles: React.CSSProperties = {
    backgroundColor: colors.theme.primary700, // Uses marketplace theme primary700 (violet)
    padding: 'clamp(20px, 3vw, 40px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius[16],
    height: 'clamp(200px, 25vh, 250px)',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    backgroundImage: `url('/pattern_marketplace.svg')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top right',
    backgroundSize: 'clamp(25%, 5vw, 33%)',
    boxShadow: shadows.base,
  };

  const leftContentStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    position: 'relative',
    zIndex: 1,
  };

  const illustrationContainerStyles: React.CSSProperties = {
    width: '150px',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textContentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const titleStyles: React.CSSProperties = {
    ...typography.styles.headlineH2,
    fontSize: '36px',
    color: colors.blackAndWhite.black900,
    margin: 0,
  };

  const subtitleStyles: React.CSSProperties = {
    ...typography.styles.bodyL,
    color: colors.blackAndWhite.black900,
    margin: 0,
  };

  return (
    <div style={headerStyles}>
      <div style={leftContentStyles}>
        <div style={illustrationContainerStyles}>
          <img
            src="/transaction header icon.png"
            alt="marketplace"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
        <div style={textContentStyles}>
          <h1 style={titleStyles}>Marketplace</h1>
          <p style={subtitleStyles}>Explore opportunities to invest in casualty insurance risk</p>
        </div>
      </div>
      <div style={{
        backgroundColor: colors.blackAndWhite.white,
        padding: '10px',
        borderRadius: borderRadius[16],
        boxShadow: shadows.base,
        width: '260px',
        display: 'flex',
        gap: '0',
        position: 'relative',
        zIndex: 1,
      }}>
        <Button
          variant="primary"
          color="black"
          icon={<span style={{ color: colors.theme.primary700 }}>+</span>}
          onClick={() => alert('Start investing clicked (prototype)')}
          style={{ width: '100%' }}
        >
          Start Investing
        </Button>
      </div>
    </div>
  );
};


// Offering card component
/**
 * Props interface for individual marketplace offering cards
 *
 * Defines the data structure for insurance risk investment opportunities
 * displayed in the marketplace. Each offering represents a specific
 * insurance program with financial metrics and risk characteristics.
 */
interface OfferingCardProps {
  /** Primary offering name (e.g., "Vacation Homes GL 2024") */
  title: string;
  /** Insurance line type (e.g., "General Liability", "Commercial Auto") */
  subtitle: string;
  /** Detailed description of the insurance program and target market */
  description: string;
  /** Current status of the offering (Active, Pending, Closed) */
  status: string;
  /** Coverage period in human-readable format */
  riskPeriod: string;
  /** Total premium amount formatted as currency string */
  grossPremium: string;
  /** Percentage of risk being shared (e.g., "25%") */
  quotaShare: string;
  /** Required investment amount formatted as currency string */
  commitment: string;
  /** Internal Rate of Return percentage (e.g., "18.7%") */
  irr: string;
  /** Multiple of Invested Capital ratio (e.g., "1.42") */
  moic: string;
  /** Weighted Average Life in years (e.g., "2.9 Y") */
  wal: string;
  /** Path to earned premium graph SVG (legacy, replaced by animation) */
  earnedPremiumGraph: string;
  /** Path to cash flow graph SVG (legacy, used for reference line positioning) */
  cashFlowGraph: string;
  /** Path to loss ratio graph SVG (legacy, used for reference line positioning) */
  lossRatioGraph: string;
}

/**
 * Marketplace Offering Card Component
 *
 * Displays detailed information about insurance risk investment opportunities.
 * Features a comprehensive layout with multiple data visualization sections:
 *
 * Layout Structure (380px total height):
 * - Header (80px): Title, subtitle, and explore button with theme background
 * - Content (300px): 4-column grid layout with dividers
 *   1. Description column: Program details and target market info
 *   2. Financial metrics: Status, risk period, premiums, and returns (IRR, MOIC, WAL)
 *   3. Earned Premium: Animated chart with responsive grid lines and baseline
 *   4. Cash Flow & Loss Ratio: Two stacked animated/static charts with reference lines
 *
 * Interactive Features:
 * - Animated charts triggered by scroll intersection
 * - Hover tooltips on action buttons
 * - Theme-aware colors adapting to marketplace (violet) theme
 * - Dotted reference lines aligned with numerical indicators
 *
 * Technical Implementation:
 * - Fixed card dimensions for consistent grid layout
 * - CSS Grid for responsive column management
 * - Semantic color tokens for theme consistency
 * - Intersection Observer for performance-optimized animations
 */
const OfferingCard: React.FC<OfferingCardProps> = ({
  title,
  subtitle,
  description,
  status,
  riskPeriod,
  grossPremium,
  quotaShare,
  commitment,
  irr,
  moic,
  wal,
  earnedPremiumGraph,
  cashFlowGraph,
  lossRatioGraph,
}) => {
  const colors = useSemanticColors();

  const cardStyles: React.CSSProperties = {
    backgroundColor: colors.blackAndWhite.white,
    borderRadius: borderRadius[16],
    padding: '0',
    border: `1px solid ${colors.theme.primary400}`,
    marginBottom: '24px',
    height: '380px',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
    padding: '0 32px',
    borderBottom: `1px solid ${colors.theme.primary400}`,
    marginBottom: '0',
    flexShrink: 0,
  };

  const titleContainerStyles: React.CSSProperties = {
    flex: 1,
  };

  const titleStyles: React.CSSProperties = {
    ...typography.styles.subheadingM,
    color: colors.blackAndWhite.black900,
    margin: '0 0 4px 0',
  };

  const subtitleStyles: React.CSSProperties = {
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black500,
    margin: 0,
  };

  // Using design library Button component instead of custom styling

  const contentStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr auto minmax(120px, 1fr) auto minmax(120px, 1fr)',
    gap: 'clamp(8px, 2vw, 32px)',
    alignItems: 'stretch',
    padding: 'clamp(16px, 2vw, 32px)',
    height: '300px',
  };

  const dividerStyles: React.CSSProperties = {
    width: '0px',
    borderLeft: `1px solid ${colors.theme.primary400}`,
    alignSelf: 'stretch',
    flexShrink: 0,
  };

  const descriptionStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const descriptionTextStyles: React.CSSProperties = {
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black700,
    lineHeight: '1.5',
    margin: 0,
  };

  const dataTableStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const dataRowStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: `1px dotted ${colors.blackAndWhite.black100}`,
  };

  const dataLabelStyles: React.CSSProperties = {
    ...typography.styles.bodyS,
    color: colors.blackAndWhite.black500,
  };

  const dataValueStyles: React.CSSProperties = {
    ...typography.styles.bodyS,
    color: colors.blackAndWhite.black900,
    fontWeight: typography.fontWeight.medium,
  };


  const earnedPremiumColumnStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const cashFlowLossRatioColumnStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const chartHeaderStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  };

  const chartLabelStyles: React.CSSProperties = {
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black900,
  };

  const chartValueStyles: React.CSSProperties = {
    ...typography.styles.bodyS,
    color: colors.blackAndWhite.black900,
    fontWeight: typography.fontWeight.medium,
  };

  const chartIconButtonStyles: React.CSSProperties = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: colors.blackAndWhite.white,
    border: `1px solid ${colors.blackAndWhite.black300}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  const horizontalDividerStyles: React.CSSProperties = {
    height: '0px',
    borderTop: `1px solid ${colors.theme.primary400}`,
    width: '100%',
    margin: '16px 0',
    flexShrink: 0,
  };

  return (
    <div style={cardStyles}>
      <div style={headerStyles}>
        <div style={titleContainerStyles}>
          <h3 style={titleStyles}>{title}</h3>
          <p style={subtitleStyles}>{subtitle}</p>
        </div>
        <button
          style={{
            backgroundColor: colors.theme.primary200,
            border: 'none',
            borderRadius: borderRadius.absolute,
            padding: '6px 12px',
            ...typography.styles.bodyS,
            fontWeight: 600,
            color: colors.blackAndWhite.black900,
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
          onClick={() => alert('Explore clicked (prototype)')}
        >
          EXPLORE
        </button>
      </div>

      <div style={contentStyles}>
        {/* Column 1: Description */}
        <div style={descriptionStyles}>
          <p style={descriptionTextStyles}>{description}</p>
        </div>

        {/* Divider 1 */}
        <div style={dividerStyles}></div>

        {/* Column 2: List of values */}
        <div style={dataTableStyles}>
          <div style={dataRowStyles}>
            <span style={dataLabelStyles}>Status</span>
            <Status variant="success" label={status} />
          </div>
          <div style={dataRowStyles}>
            <span style={dataLabelStyles}>Risk Period</span>
            <span style={dataValueStyles}>{riskPeriod}</span>
          </div>
          <div style={dataRowStyles}>
            <span style={dataLabelStyles}>Gross Premium</span>
            <span style={dataValueStyles}>{grossPremium}</span>
          </div>
          <div style={dataRowStyles}>
            <span style={dataLabelStyles}>Quota Share %</span>
            <span style={dataValueStyles}>{quotaShare}</span>
          </div>
          <div style={dataRowStyles}>
            <span style={dataLabelStyles}>Commitment</span>
            <span style={dataValueStyles}>{commitment}</span>
          </div>
          <div style={dataRowStyles}>
            <span style={dataLabelStyles}>IRR</span>
            <span style={dataValueStyles}>{irr}</span>
          </div>
          <div style={dataRowStyles}>
            <span style={dataLabelStyles}>MOIC</span>
            <span style={dataValueStyles}>{moic}</span>
          </div>
          <div style={{...dataRowStyles, borderBottom: 'none'}}>
            <span style={dataLabelStyles}>WAL</span>
            <span style={dataValueStyles}>{wal}</span>
          </div>
        </div>

        {/* Divider 2 */}
        <div style={dividerStyles}></div>

        {/* Column 3: Earned Premium */}
        <div style={earnedPremiumColumnStyles}>
          <div style={chartHeaderStyles}>
            <span style={chartLabelStyles}>Earned Premium</span>
            <button style={chartIconButtonStyles} onClick={() => alert('Earned Premium details (prototype)')}>
              <ChevronRightSmall color={colors.blackAndWhite.black700} />
            </button>
          </div>
          <div style={{ width: '100%', height: '200px', position: 'relative' }}>
            <AnimatedEarnedPremiumChart />
          </div>
        </div>

        {/* Divider 3 */}
        <div style={dividerStyles}></div>

        {/* Column 4: Cash Flow (top) and Loss Ratio (bottom) */}
        <div style={cashFlowLossRatioColumnStyles}>
          <div style={{ position: 'relative' }}>
            <div style={chartHeaderStyles}>
              <span style={chartLabelStyles}>Cash Flow</span>
              <button style={chartIconButtonStyles} onClick={() => alert('Cash Flow details (prototype)')}>
                <ChevronRightSmall color={colors.blackAndWhite.black700} />
              </button>
            </div>
            <div style={{ width: '100%', height: '80px', position: 'relative' }}>
              <AnimatedCashFlowChart />
              {/* Dotted reference line aligned with 8M */}
              <div style={{
                position: 'absolute',
                top: '65%',
                left: '0',
                right: '20px',
                height: '1px',
                borderTop: `1px dotted ${colors.theme.primary400}`,
                pointerEvents: 'none',
                transform: 'translateY(-50%)'
              }}></div>
              <span style={{
                position: 'absolute',
                top: '65%',
                right: '0',
                ...typography.styles.bodyS,
                color: colors.blackAndWhite.black900,
                fontWeight: typography.fontWeight.medium,
                fontSize: 'clamp(8px, 1.2vw, 10px)',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>8M</span>
            </div>
          </div>

          <div style={horizontalDividerStyles}></div>

          <div style={{ position: 'relative' }}>
            <div style={chartHeaderStyles}>
              <span style={chartLabelStyles}>Loss Ratio</span>
              <button style={chartIconButtonStyles} onClick={() => alert('Loss Ratio details (prototype)')}>
                <ChevronRightSmall color={colors.blackAndWhite.black700} />
              </button>
            </div>
            <img src={lossRatioGraph} alt="Loss Ratio" style={{ width: '100%', height: '80px', objectFit: 'contain' }} />
            {/* Dotted reference line aligned with 9M */}
            <div style={{
              position: 'absolute',
              top: '85%',
              left: '0',
              right: '20px',
              height: '1px',
              borderTop: `1px dotted ${colors.theme.primary400}`,
              pointerEvents: 'none',
              transform: 'translateY(-50%)'
            }}></div>
            <span style={{
              position: 'absolute',
              top: '85%',
              right: '0',
              ...typography.styles.bodyS,
              color: colors.blackAndWhite.black900,
              fontWeight: typography.fontWeight.medium,
              fontSize: 'clamp(8px, 1.2vw, 10px)',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}>9M</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Marketplace Offerings Page Component
 *
 * Main page displaying insurance risk investment opportunities in a marketplace format.
 * Provides investors with detailed information about available insurance programs
 * including financial metrics, risk characteristics, and interactive data visualizations.
 *
 * Page Structure:
 * - MarketplaceBanner: Header with branding and monthly metrics
 * - Tab Navigation: Primary/Secondary market selection
 * - Offering Cards Grid: 4 insurance opportunities with animated charts
 *
 * Key Features:
 * - Real-world insurance data (General Liability, Commercial Auto, Professional Liability, Coastal Property)
 * - Interactive animated charts for Earned Premium and Cash Flow
 * - Theme-aware design using marketplace violet color scheme
 * - Scroll-triggered animations for enhanced user engagement
 * - Comprehensive financial metrics (IRR, MOIC, WAL, premiums)
 *
 * Data Sources:
 * - Static offering data representing various insurance lines
 * - Lottie animations for chart visualizations
 * - SVG graphics for reference line positioning
 *
 * @param onNavigateToPage Optional navigation callback for programmatic routing
 */
export const MarketplaceOfferings: React.FC<MarketplaceOfferingsProps> = ({ onNavigateToPage }) => {
  const [activeTab, setActiveTab] = useState<string>('primary');

  // Insurance offering data representing different risk categories
  const offerings = [
    {
      title: "Vacation Homes GL 2024",
      subtitle: "General Liability",
      description: "The non-standard auto (NSA) market is generally described as auto insurance policies that provide the minimum liability limits required by the state, it is a $47 billion market nationally and is generally resilient to economic cycles and highly fragmented.",
      status: "Active",
      riskPeriod: "July 1, 2023 - Jun 30, 2024",
      grossPremium: "$62,000,000",
      quotaShare: "30%",
      commitment: "$8,425,000",
      irr: "18.7%",
      moic: "1.42",
      wal: "2.5 Y",
      earnedPremiumGraph: "/graph1.svg",
      cashFlowGraph: "/graph2.svg",
      lossRatioGraph: "/graph3.svg",
    },
    {
      title: "Commercial Auto FL 2024",
      subtitle: "Commercial Auto",
      description: "Commercial auto insurance coverage for fleet vehicles and commercial transportation businesses operating in high-risk metropolitan areas. This program focuses on established operators with strong safety records and modern vehicle fleets.",
      status: "Active",
      riskPeriod: "Jan 1, 2024 - Dec 31, 2024",
      grossPremium: "$45,800,000",
      quotaShare: "25%",
      commitment: "$6,200,000",
      irr: "21.3%",
      moic: "1.38",
      wal: "3.1 Y",
      earnedPremiumGraph: "/graph1.svg",
      cashFlowGraph: "/graph2.svg",
      lossRatioGraph: "/graph3.svg",
    },
    {
      title: "Professional Liability TX 2024",
      subtitle: "Professional Liability",
      description: "Professional liability coverage for technology companies and consulting firms, targeting mid-market businesses with established revenue streams. Focus on cyber liability and errors & omissions protection.",
      status: "Active",
      riskPeriod: "Oct 1, 2023 - Sep 30, 2024",
      grossPremium: "$38,500,000",
      quotaShare: "40%",
      commitment: "$9,850,000",
      irr: "16.9%",
      moic: "1.51",
      wal: "2.8 Y",
      earnedPremiumGraph: "/graph1.svg",
      cashFlowGraph: "/graph2.svg",
      lossRatioGraph: "/graph3.svg",
    },
    {
      title: "Coastal Property CA 2024",
      subtitle: "Property Insurance",
      description: "Coastal property insurance for high-value residential and commercial properties in California. Comprehensive coverage including earthquake and wildfire protection with enhanced risk assessment protocols.",
      status: "Active",
      riskPeriod: "Apr 1, 2024 - Mar 31, 2025",
      grossPremium: "$78,200,000",
      quotaShare: "35%",
      commitment: "$12,750,000",
      irr: "19.4%",
      moic: "1.46",
      wal: "2.2 Y",
      earnedPremiumGraph: "/graph1.svg",
      cashFlowGraph: "/graph2.svg",
      lossRatioGraph: "/graph3.svg",
    }
  ];

  return (
    <Layout
      selectedSidebarItem="marketplace"
      selectedSidebarSubitem="offerings"
      onNavigate={createPageNavigationHandler(onNavigateToPage, 'marketplace-offerings')}
      breadcrumbs={createBreadcrumbs.marketplace.offerings()}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(16px, 3vw, 32px)'
      }}>
          <MarketplaceBanner />

          <div style={{ marginTop: '50px' }}>
            <div style={{ paddingBottom: '50px' }}>
              <Tabs
                tabs={[
                  { id: 'primary', label: 'Primary Market' },
                  { id: 'secondary', label: 'Secondary Market' }
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>

            {offerings.map((offering, index) => (
              <OfferingCard
                key={index}
                {...offering}
              />
            ))}
          </div>
      </div>
    </Layout>
  );
};

export default MarketplaceOfferings;