import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { colors, typography, spacing, borderRadius, shadows, useSemanticColors } from '../tokens';
import {
  ChevronDownExtraSmall,
  ChevronRightExtraSmall,
  InboxMedium,
  HomeMedium,
  Home14,
  UserSmall,
  SettingsMedium,
  CloseSmall,
  AddSmall,
  KorraLogo,
  KLogo,
  MarketplaceLogo,
  ReportsLogo,
  AnalyticsLogo,
  ContractsLogo,
  PortfolioMedium,
  SearchMedium,
  ReplaceMedium,
  DownloadMedium,
  PieChartMedium,
  GraphArrowMedium,
  DocumentMedium
} from '../icons';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ color?: string; className?: string }>;
  subitems?: { id: string; label: string }[];
}

interface SideNav2Props {
  onNavigate?: (itemId: string, subitemId?: string, pageType?: string) => void;
  onInboxClick?: () => void;
  onHomeClick?: () => void;
  selectedItem?: string;
  selectedSubitem?: string;
  currentPageType?: string; // Full page type (e.g., 'analytics-triangle-dashboard')
  onHoverChange?: (isHovered: boolean) => void;
  isCompact?: boolean; // Controlled compact state from parent
  userName?: string;
  userInitials?: string;
  profileColor?: string;
  onManageAccountClick?: () => void;
  onSettingsClick?: () => void;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'marketplace',
    label: 'Marketplace',
    icon: MarketplaceLogo,
    subitems: [
      { id: 'offerings', label: 'Offerings' }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: ReportsLogo,
    subitems: [
      { id: 'transactions', label: 'Transactions' },
      { id: 'bdx-upload', label: 'BDX upload' },
      { id: 'insights-explorer', label: 'Insights' },
      { id: 'reports-explorer', label: 'Reports explorer' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: AnalyticsLogo,
    subitems: [
      { id: 'valuation', label: 'Valuation' },
      { id: 'triangle', label: 'Triangle' }
    ]
  },
  {
    id: 'contracts',
    label: 'Contracts',
    icon: ContractsLogo,
    subitems: [
      { id: 'transactions', label: 'Transactions' }
    ]
  }
];

export const SideNav2: React.FC<SideNav2Props> = ({
  onNavigate,
  onInboxClick,
  onHomeClick,
  selectedItem: propSelectedItem,
  selectedSubitem: propSelectedSubitem,
  currentPageType,
  onHoverChange,
  isCompact: propIsCompact = false,
  userName = 'Sarah Johnson',
  userInitials = 'SJ',
  profileColor = colors.reports.blue700,
  onManageAccountClick,
  onSettingsClick
}) => {
  const colors = useSemanticColors();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Helper function to get theme 700 colors for compact mode app icons
  const getCompactIconColor = (itemId: string): string => {
    switch (itemId) {
      case 'reports':
        return '#9ad5f7'; // Reports blue 700
      case 'analytics':
        return '#7fe9b2'; // Analytics green 700
      case 'marketplace':
        return '#d4bfff'; // Marketplace violet 700
      case 'contracts':
        return '#ffe17a'; // Contracts yellow 700
      default:
        return colors.blackAndWhite.black700;
    }
  };

  // Helper function to get product icon based on app and subitem
  const getProductIcon = (appId: string, subitemId: string): React.ComponentType<{ color?: string }> => {
    const iconMap: Record<string, Record<string, React.ComponentType<{ color?: string }>>> = {
      marketplace: {
        'offerings': PortfolioMedium
      },
      reports: {
        'reports-explorer': SearchMedium,
        'insights-explorer': PieChartMedium,
        'transactions': ReplaceMedium,
        'bdx-upload': DownloadMedium
      },
      analytics: {
        'valuation': PieChartMedium,
        'triangle': GraphArrowMedium
      },
      contracts: {
        'transactions': ReplaceMedium
      }
    };

    return iconMap[appId]?.[subitemId] || DocumentMedium;
  };
  // Initialize expanded items from localStorage with reports as default
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarExpandedItems');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return new Set(Array.isArray(parsed) ? parsed : ['reports']);
        } catch {
          return new Set(['reports']);
        }
      }
    }
    return new Set(['reports']);
  });

  // Use controlled state if provided, otherwise fall back to internal state
  const [internalSelectedItem, setInternalSelectedItem] = useState<string>('reports');
  const [internalSelectedSubitem, setInternalSelectedSubitem] = useState<string>('reports-explorer');

  const selectedItem = propSelectedItem !== undefined ? propSelectedItem : internalSelectedItem;
  const selectedSubitem = propSelectedSubitem !== undefined ? propSelectedSubitem : internalSelectedSubitem;

  // Derive expandedApp directly from selectedItem to prevent flashing
  const expandedApp = selectedItem && selectedItem !== 'home' ? selectedItem : null;

  // Save expanded items to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarExpandedItems', JSON.stringify([...expandedItems]));
    }
  }, [expandedItems]);

  // Auto-expand the selected item if it has subitems and a subitem is selected
  useEffect(() => {
    if (selectedItem && selectedSubitem) {
      setExpandedItems(prev => new Set([...prev, selectedItem]));
    }
  }, [selectedItem, selectedSubitem]);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Use controlled compact mode from parent
  const isCompact = propIsCompact;

  // Handle hover with proper delays for smooth UX
  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    // Only expand in compact mode, and add a small delay to prevent accidental expansion
    if (isCompact) {
      const timeout = setTimeout(() => {
        setIsHovered(true);
        onHoverChange?.(true); // Notify parent of hover state change
      }, 200); // 200ms delay before expanding
      setHoverTimeout(timeout);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    // Add a longer delay before collapsing to give users time to navigate
    const timeout = setTimeout(() => {
      setIsHovered(false);
      onHoverChange?.(false); // Notify parent of hover state change
    }, 500); // 500ms delay before collapsing
    setHoverTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  // Determine if sidebar should show in full mode (either not compact or hovered)
  const showFullMode = !isCompact || isHovered;

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleMainItemClick = (item: SidebarItem) => {
    // Check localStorage for last visited full page type in this app
    const lastPageKey = `lastPage_${item.id}`;
    const lastVisitedPageType = typeof window !== 'undefined'
      ? localStorage.getItem(lastPageKey)
      : null;

    // Also check for last visited subitem (fallback to old system)
    const lastVisitedKey = `lastVisited_${item.id}`;
    const lastVisitedSubitem = typeof window !== 'undefined'
      ? localStorage.getItem(lastVisitedKey)
      : null;

    // Use last visited subitem if it exists and is valid, otherwise use first subitem
    let targetSubitem = item.subitems?.[0];

    if (lastVisitedSubitem && item.subitems?.some(s => s.id === lastVisitedSubitem)) {
      targetSubitem = item.subitems.find(s => s.id === lastVisitedSubitem);
    }

    if (targetSubitem) {
      // Only update internal state if not controlled
      if (propSelectedItem === undefined) {
        setInternalSelectedItem(item.id);
        setInternalSelectedSubitem(targetSubitem.id);
      }
      // Pass the saved page type if available, otherwise just navigate normally
      onNavigate?.(item.id, targetSubitem.id, lastVisitedPageType || undefined);
    } else {
      // Only update internal state if not controlled
      if (propSelectedItem === undefined) {
        setInternalSelectedItem(item.id);
        setInternalSelectedSubitem('');
      }
      onNavigate?.(item.id, undefined, lastVisitedPageType || undefined);
    }
  };

  const handleCloseApp = () => {
    // Navigate to home when closing an app (this will automatically collapse the app)
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleSubitemClick = (parentId: string, subitemId: string) => {
    // Save the last visited page for this app in localStorage
    // Note: The currentPageType will be saved via useEffect when the page changes
    if (typeof window !== 'undefined') {
      const lastVisitedKey = `lastVisited_${parentId}`;
      localStorage.setItem(lastVisitedKey, subitemId);
    }

    // Only update internal state if not controlled
    if (propSelectedItem === undefined) {
      setInternalSelectedItem(parentId);
      setInternalSelectedSubitem(subitemId);
    }
    onNavigate?.(parentId, subitemId);
  };

  // Save the current page type to localStorage whenever it changes
  useEffect(() => {
    if (currentPageType && propSelectedItem && typeof window !== 'undefined') {
      const lastPageKey = `lastPage_${propSelectedItem}`;
      localStorage.setItem(lastPageKey, currentPageType);
    }
  }, [currentPageType, propSelectedItem]);

  const sidebarStyles: React.CSSProperties = {
    width: showFullMode ? '220px' : '80px',
    minHeight: '100vh',
    backgroundColor: colors.blackAndWhite.black900,
    padding: '0 10px 18px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
    transition: 'width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    overflow: 'hidden',
    position: 'relative',
    zIndex: isHovered && isCompact ? 1000 : 'auto',
    justifyContent: 'space-between'
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: showFullMode ? 'space-between' : 'center',
    alignItems: 'center',
    marginBottom: spacing[8],
    padding: `0 ${spacing[2]}`,
    height: '60px', // Match TopNav height
  };

  const mainItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: `0 ${spacing[4]}`,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: borderRadius[4],
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    textAlign: 'left',
    height: '40px'
  };

  const mainItemHoverStyles: React.CSSProperties = {
    backgroundColor: 'rgba(58, 66, 61, 0.5)' // black800 with 50% alpha
  };

  const mainItemContentStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3], // Keep consistent gap
    justifyContent: showFullMode ? 'flex-start' : 'center', // Center icons in compact mode
    width: '100%',
    position: 'relative' // For absolute positioned text
  };

  const mainItemTextStyles: React.CSSProperties = {
    ...typography.styles.bodyL,
    color: colors.blackAndWhite.white,
    fontFamily: 'Bradford LL, serif',
    fontWeight: 700, // Bold
    fontSize: '14px'
  };

  const subitemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: `${spacing[2]} ${spacing[4]} ${spacing[2]} ${spacing[12]}`,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: borderRadius[4],
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    textAlign: 'left'
  };

  const subitemTextStyles: React.CSSProperties = {
    ...typography.styles.bodyL,
    color: colors.blackAndWhite.black300
  };

  const selectedSubitemStyles: React.CSSProperties = {
    backgroundColor: colors.blackAndWhite.white // Test: white background for selected state
  };

  const selectedSubitemTextStyles: React.CSSProperties = {
    color: colors.blackAndWhite.black900 // Test: black text for white background
  };

  // Click outside handler for user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        profileRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleProfileClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleManageAccount = () => {
    setIsUserMenuOpen(false);
    if (onManageAccountClick) {
      onManageAccountClick();
    }
  };

  const handleSettings = () => {
    setIsUserMenuOpen(false);
    if (onSettingsClick) {
      onSettingsClick();
    }
  };

  // Inject animation keyframes
  useEffect(() => {
    const styleId = 'sidenav2-animations';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes slideToTop {
          from {
            transform: translateY(150px);
            opacity: 0.7;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInContent {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div
      style={sidebarStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header with logo only - hide when app is expanded */}
      {!expandedApp && (
        <div
          style={{
            ...headerStyles,
            cursor: 'pointer'
          }}
          onClick={() => {
            if (onHomeClick) {
              onHomeClick();
            }
            // Also call onNavigate to ensure consistent navigation handling
            if (onNavigate) {
              onNavigate('home');
            }
          }}
        >
          {showFullMode ? (
            <div style={{ marginLeft: '8px' }}>
              <KorraLogo color={colors.blackAndWhite.white} />
            </div>
          ) : (
            <KLogo color={colors.blackAndWhite.white} />
          )}
        </div>
      )}

      {/* Home and Inbox items - hide when app is expanded */}
      {!expandedApp && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: spacing[6] }}>
        <button
          style={{
            ...mainItemStyles,
            ...(selectedItem === 'home' ? { backgroundColor: colors.blackAndWhite.white } : {})
          }}
          onClick={() => {
            if (onHomeClick) {
              onHomeClick();
            }
            // Also call onNavigate to ensure consistent navigation handling
            if (onNavigate) {
              onNavigate('home');
            }
          }}
          onMouseEnter={(e) => {
            if (selectedItem !== 'home') {
              Object.assign(e.currentTarget.style, mainItemHoverStyles);
            }
          }}
          onMouseLeave={(e) => {
            if (selectedItem !== 'home') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <div style={mainItemContentStyles}>
            <Home14 color={selectedItem === 'home' ? colors.blackAndWhite.black900 : colors.blackAndWhite.white} />
            <span style={{
              ...typography.styles.bodyL,
              color: selectedItem === 'home' ? colors.blackAndWhite.black900 : colors.blackAndWhite.black500,
              opacity: showFullMode ? 1 : 0,
              transition: 'opacity 0.2s ease',
              visibility: showFullMode ? 'visible' : 'hidden',
              position: showFullMode ? 'static' : 'absolute'
            }}>Home</span>
          </div>
          {showFullMode && (
            <ChevronRightExtraSmall color={selectedItem === 'home' ? colors.blackAndWhite.black900 : colors.blackAndWhite.black700} />
          )}
        </button>

        {/* Inbox button - Hidden but kept in code for future use */}
        <button
          style={{
            ...mainItemStyles,
            ...(selectedItem === 'inbox' ? { backgroundColor: colors.blackAndWhite.white } : {}),
            display: 'none' // Hidden from view
          }}
          onClick={onInboxClick}
        >
          <div style={mainItemContentStyles}>
            <div style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ transform: 'scale(1.1)' }}>
                <InboxMedium color={colors.blackAndWhite.white} />
              </div>
            </div>
            <span style={{
              ...typography.styles.bodyL,
              color: colors.blackAndWhite.black500,
              opacity: showFullMode ? 1 : 0,
              transition: 'opacity 0.2s ease',
              visibility: showFullMode ? 'visible' : 'hidden',
              position: showFullMode ? 'static' : 'absolute'
            }}>Inbox</span>
          </div>
        </button>
        </div>
      )}

      {/* Top section with navigation */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Compact mode: Show app icon + product icons vertically */}
        {!showFullMode && expandedApp && (
          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* App icon at top - aligned with header */}
            <div style={{
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 0
            }}>
              {sidebarItems.find(i => i.id === expandedApp)?.icon &&
                React.createElement(sidebarItems.find(i => i.id === expandedApp)!.icon, {
                  color: getCompactIconColor(expandedApp)
                })}
            </div>

            {/* Divider line */}
            <div style={{
              borderTop: `1px solid ${colors.blackAndWhite.black800}`,
              marginBottom: '20px'
            }} />

            {/* Spacing to align with Resources/Products label */}
            <div style={{ height: '8px', marginBottom: '8px' }} /> {/* Label space */}

            {/* Product icons below - aligned with where text labels would be */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {sidebarItems.find(i => i.id === expandedApp)?.subitems?.map((subitem) => {
                const IconComponent = getProductIcon(expandedApp, subitem.id);
                const isSelected = selectedItem === expandedApp && selectedSubitem === subitem.id;

                return (
                  <button
                    key={subitem.id}
                    style={{
                      width: '100%',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      borderRadius: borderRadius[4],
                      backgroundColor: isSelected ? colors.blackAndWhite.white : 'transparent',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      padding: 0
                    }}
                    onClick={() => handleSubitemClick(expandedApp, subitem.id)}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'rgba(58, 66, 61, 0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                    title={subitem.label}
                  >
                    <div style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconComponent color={isSelected ? colors.blackAndWhite.black900 : colors.blackAndWhite.white} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Show expanded app view if an app is selected */}
        <div style={{
          display: (showFullMode && expandedApp) ? 'block' : 'none'
        }}>
            {/* App Header with icon, name, and close button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: spacing[4],
              paddingRight: 0,
              marginBottom: 0,
              height: '60px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
                <div style={{
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ transform: 'scale(1.57)', transformOrigin: 'center' }}>
                    {sidebarItems.find(i => i.id === expandedApp)?.icon &&
                      React.createElement(sidebarItems.find(i => i.id === expandedApp)!.icon)}
                  </div>
                </div>
                <span style={{
                  ...typography.styles.bodyL,
                  color: colors.blackAndWhite.white,
                  fontFamily: 'Bradford LL, serif',
                  fontWeight: 700,
                  fontSize: '16px'
                }}>
                  {sidebarItems.find(i => i.id === expandedApp)?.label}
                </span>
              </div>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={handleCloseApp}
                onMouseEnter={(e) => {
                  const circle = e.currentTarget.querySelector('div');
                  if (circle) {
                    (circle as HTMLElement).style.backgroundColor = colors.blackAndWhite.white;
                  }
                  const paths = e.currentTarget.querySelectorAll('path, line, polyline, polygon, circle, rect');
                  paths.forEach(path => {
                    (path as SVGElement).style.transition = 'stroke 0.2s ease';
                    (path as SVGElement).style.stroke = colors.blackAndWhite.black900;
                  });
                }}
                onMouseLeave={(e) => {
                  const circle = e.currentTarget.querySelector('div');
                  if (circle) {
                    (circle as HTMLElement).style.backgroundColor = colors.blackAndWhite.black800;
                  }
                  const paths = e.currentTarget.querySelectorAll('path, line, polyline, polygon, circle, rect');
                  paths.forEach(path => {
                    (path as SVGElement).style.transition = 'stroke 0.2s ease';
                    (path as SVGElement).style.stroke = colors.blackAndWhite.white;
                  });
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  backgroundColor: colors.blackAndWhite.black800,
                  borderRadius: borderRadius.absolute,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s ease'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CloseSmall color={colors.blackAndWhite.white} />
                  </div>
                </div>
              </button>
            </div>

            {/* Divider line */}
            <div style={{
              borderTop: `1px solid ${colors.blackAndWhite.black800}`,
              marginBottom: '20px',
              marginLeft: '17px'
            }} />

            {/* Resources/Explore Section */}
            <div style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              padding: `0 ${spacing[4]}`,
              marginBottom: '8px'
            }}>
              {expandedApp === 'contracts' ? 'Resources' : 'Explore'}
            </div>

            {/* Submenu items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: spacing[4] }}>
              {sidebarItems.find(i => i.id === expandedApp)?.subitems?.map((subitem) => {
                const isSelected = selectedItem === expandedApp && selectedSubitem === subitem.id;
                return (
                  <button
                    key={subitem.id}
                    style={{
                      ...subitemStyles,
                      padding: `0 ${spacing[4]}`,
                      height: '40px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...(isSelected ? selectedSubitemStyles : {})
                    }}
                    onClick={() => handleSubitemClick(expandedApp, subitem.id)}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'rgba(58, 66, 61, 0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span style={{
                      ...typography.styles.bodyL,
                      ...(isSelected ? selectedSubitemTextStyles : { color: colors.blackAndWhite.white })
                    }}>
                      {subitem.label}
                    </span>
                    <ChevronRightExtraSmall color={isSelected ? colors.blackAndWhite.black900 : colors.blackAndWhite.black700} />
                  </button>
                );
              })}
            </div>

          </div>

        {/* Show app icons when no app is expanded */}
        <div style={{
          display: expandedApp ? 'none' : 'block'
        }}>
            {/* Apps Section Title */}
            {showFullMode && (
              <div style={{
                ...typography.styles.bodyM,
                color: colors.blackAndWhite.black500,
                padding: `0 ${spacing[4]}`,
                marginBottom: spacing[3]
              }}>
                Apps
              </div>
            )}

            {/* Navigation items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {sidebarItems.map((item) => {
              return (
                <div key={item.id}>
                  {/* Main navigation item */}
                  <button
                    style={{
                      ...mainItemStyles
                    }}
                    onClick={() => handleMainItemClick(item)}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, mainItemHoverStyles);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={mainItemContentStyles}>
                      <item.icon />
                      <span style={{
                        ...mainItemTextStyles,
                        opacity: showFullMode ? 1 : 0,
                        transition: 'opacity 0.2s ease',
                        visibility: showFullMode ? 'visible' : 'hidden',
                        position: showFullMode ? 'static' : 'absolute'
                      }}>{item.label}</span>
                    </div>
                    {showFullMode && (
                      <ChevronRightExtraSmall color={colors.blackAndWhite.black700} />
                    )}
                  </button>
                </div>
              );
            })}
            </div>
        </div>
      </div>

      {/* User Profile Section at Bottom */}
      <div style={{
        borderTop: `1px solid ${colors.blackAndWhite.black800}`,
        paddingTop: '10px',
        marginLeft: '17px',
        position: 'relative'
      }}>
          <div
            ref={profileRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: showFullMode ? 'flex-start' : 'center',
              gap: spacing[3],
              cursor: 'pointer',
              padding: `6px 10px`,
              borderRadius: borderRadius[8],
              transition: 'background-color 0.15s ease'
            }}
            onClick={handleProfileClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(58, 66, 61, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '40px',
              backgroundColor: profileColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.blackAndWhite.white,
              fontSize: '12px',
              fontWeight: typography.fontWeight.medium,
              flexShrink: 0,
              overflow: 'hidden'
            }}>
              <img
                src="/avatar.png"
                alt={`${userName} avatar`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '40px'
                }}
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.textContent = userInitials;
                    parent.style.display = 'flex';
                    parent.style.alignItems = 'center';
                    parent.style.justifyContent = 'center';
                  }
                }}
              />
            </div>
            {showFullMode && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2]
                }}>
                  <div style={{
                    ...typography.styles.bodyL,
                    color: colors.blackAndWhite.white,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {userName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                  </div>
                  <div style={{
                    transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ChevronDownExtraSmall color={colors.blackAndWhite.white} />
                  </div>
                </div>
                <div style={{
                  ...typography.styles.bodyS,
                  color: colors.blackAndWhite.black500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  korra
                </div>
              </div>
            )}
          </div>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div
              ref={menuRef}
              style={{
                position: 'absolute',
                bottom: '100%',
                left: spacing[4],
                right: spacing[4],
                marginBottom: '8px',
                backgroundColor: colors.blackAndWhite.white,
                borderRadius: borderRadius[8],
                boxShadow: shadows.large,
                zIndex: 1000,
                overflow: 'hidden',
                padding: '5px'
              }}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2],
                  padding: '12px 16px',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: 'transparent',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background-color 0.15s ease',
                  borderRadius: borderRadius[4],
                  ...typography.styles.bodyM,
                  color: colors.blackAndWhite.black900
                }}
                onClick={handleManageAccount}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.blackAndWhite.black100;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <UserSmall color={colors.blackAndWhite.black500} />
                </div>
                Manage account
              </button>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2],
                  padding: '12px 16px',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: 'transparent',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background-color 0.15s ease',
                  borderRadius: borderRadius[4],
                  ...typography.styles.bodyM,
                  color: colors.blackAndWhite.black900
                }}
                onClick={handleSettings}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.blackAndWhite.black100;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <SettingsMedium color={colors.blackAndWhite.black500} />
                </div>
                Settings
              </button>
            </div>
          )}
      </div>
    </div>
  );
};
