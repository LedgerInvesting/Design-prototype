import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { colors, typography, spacing, borderRadius, useSemanticColors } from '../tokens';
import { 
  ChevronDownExtraSmall, 
  ChevronRightExtraSmall,
  InboxMedium,
  KorraLogo,
  KLogo,
  MarketplaceLogo,
  ReportsLogo,
  AnalyticsLogo,
  ContractsLogo
} from '../icons';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ color?: string; className?: string }>;
  subitems?: { id: string; label: string }[];
}

interface SidebarProps {
  onNavigate?: (itemId: string, subitemId?: string) => void;
  onInboxClick?: () => void;
  selectedItem?: string;
  selectedSubitem?: string;
  onHoverChange?: (isHovered: boolean) => void;
  isCompact?: boolean; // Controlled compact state from parent
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
      { id: 'reports-explorer', label: 'Reports Explorer' },
      { id: 'transactions', label: 'Transactions' },
      { id: 'bdx-upload', label: 'BDX Upload' }
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
    icon: ContractsLogo
  }
];

export const Sidebar: React.FC<SidebarProps> = ({
  onNavigate,
  onInboxClick,
  selectedItem: propSelectedItem,
  selectedSubitem: propSelectedSubitem,
  onHoverChange,
  isCompact: propIsCompact = false
}) => {
  const colors = useSemanticColors();

  // Helper function to get theme 900 colors for compact mode icons
  const getCompactIconColor = (itemId: string): string => {
    switch (itemId) {
      case 'reports':
        return '#1c6297'; // Reports blue 900
      case 'analytics':
        return '#0f9342'; // Analytics green 900
      case 'marketplace':
        return '#643ed8'; // Marketplace violet 900
      case 'contracts':
        return colors.blackAndWhite.black700; // Default for contracts
      default:
        return colors.blackAndWhite.black700;
    }
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
    if (item.subitems && item.subitems.length > 0) {
      toggleExpanded(item.id);
    } else {
      // Only update internal state if not controlled
      if (propSelectedItem === undefined) {
        setInternalSelectedItem(item.id);
        setInternalSelectedSubitem('');
      }
      onNavigate?.(item.id);
    }
  };

  const handleSubitemClick = (parentId: string, subitemId: string) => {
    // Only update internal state if not controlled
    if (propSelectedItem === undefined) {
      setInternalSelectedItem(parentId);
      setInternalSelectedSubitem(subitemId);
    }
    onNavigate?.(parentId, subitemId);
  };

  const sidebarStyles: React.CSSProperties = {
    width: showFullMode ? '220px' : '80px',
    minHeight: '100vh',
    backgroundColor: colors.blackAndWhite.black900,
    padding: `${spacing[4]} ${spacing[4]}`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
    transition: 'width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    overflow: 'hidden',
    position: 'relative',
    zIndex: isHovered && isCompact ? 1000 : 'auto'
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: showFullMode ? 'space-between' : 'center',
    alignItems: 'center',
    marginBottom: spacing[8],
    padding: `0 ${spacing[2]}`,
    minHeight: '32px', // Ensure consistent height for both modes
  };

  const mainItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: `${spacing[3]} ${spacing[4]}`,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: borderRadius[4],
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    textAlign: 'left',
    minHeight: '48px' // Fixed height to prevent collapse
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

  return (
    <div 
      style={sidebarStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header with logo and inbox button */}
      <div style={headerStyles}>
        {showFullMode ? (
          <>
            <KorraLogo color={colors.blackAndWhite.white} />
            <div style={{ position: 'relative' }}>
              <button
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: colors.blackAndWhite.black800,
                  borderRadius: borderRadius[4],
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s ease'
                }}
                onClick={onInboxClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.blackAndWhite.black700;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.blackAndWhite.black800;
                }}
              >
                <div style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <InboxMedium color={colors.blackAndWhite.white} />
                </div>
              </button>
              {/* Notification badge */}
              <div
                style={{
                  position: 'absolute',
                  top: -7,
                  right: -10,
                  minWidth: '18px',
                  height: '16px',
                  backgroundColor: colors.success.fill,
                  borderRadius: borderRadius.absolute,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: colors.blackAndWhite.black900,
                  padding: '0 8px'
                }}
              >
                3
              </div>
            </div>
          </>
        ) : (
          <KLogo color={colors.blackAndWhite.white} />
        )}
      </div>

      {/* Navigation items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
        {sidebarItems.map((item) => {
          const isExpanded = expandedItems.has(item.id);
          const hasSubitems = item.subitems && item.subitems.length > 0;

          return (
            <div key={item.id}>
              {/* Main navigation item */}
              <button
                style={{
                  ...mainItemStyles,
                  // In full mode: only highlight if no subitem is selected
                  // In compact mode: highlight if item is selected (regardless of subitem)
                  ...((selectedItem === item.id && (!showFullMode || !selectedSubitem)) ? { backgroundColor: colors.blackAndWhite.white } : {})
                }}
                onClick={() => handleMainItemClick(item)}
                onMouseEnter={(e) => {
                  const isMainItemSelected = selectedItem === item.id && (!showFullMode || !selectedSubitem);
                  if (!isMainItemSelected) {
                    Object.assign(e.currentTarget.style, mainItemHoverStyles);
                  }
                }}
                onMouseLeave={(e) => {
                  const isMainItemSelected = selectedItem === item.id && (!showFullMode || !selectedSubitem);
                  if (!isMainItemSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={mainItemContentStyles}>
                  <item.icon color={!showFullMode && selectedItem === item.id ? getCompactIconColor(item.id) : undefined} />
                  <span style={{
                    ...mainItemTextStyles,
                    opacity: showFullMode ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    visibility: showFullMode ? 'visible' : 'hidden',
                    position: showFullMode ? 'static' : 'absolute'
                  }}>{item.label}</span>
                </div>
                {hasSubitems && (
                  <div style={{
                    opacity: showFullMode ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    visibility: showFullMode ? 'visible' : 'hidden',
                    position: showFullMode ? 'static' : 'absolute'
                  }}>
                    {isExpanded ? (
                      <ChevronDownExtraSmall color={colors.blackAndWhite.black700} />
                    ) : (
                      <ChevronRightExtraSmall color={colors.blackAndWhite.black700} />
                    )}
                  </div>
                )}
              </button>

              {/* Subitems - only show in full mode */}
              {showFullMode && hasSubitems && isExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {item.subitems!.map((subitem) => {
                    const isSelected = selectedItem === item.id && selectedSubitem === subitem.id;
                    
                    return (
                      <button
                        key={subitem.id}
                        style={{
                          ...subitemStyles,
                          ...(isSelected ? selectedSubitemStyles : {})
                        }}
                        onClick={() => handleSubitemClick(item.id, subitem.id)}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'rgba(58, 66, 61, 0.5)'; // black800 with 50% alpha
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <span
                          style={{
                            ...subitemTextStyles,
                            ...(isSelected ? selectedSubitemTextStyles : {})
                          }}
                        >
                          {subitem.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};