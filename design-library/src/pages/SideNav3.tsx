import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { colors, typography, spacing, borderRadius, shadows, useSemanticColors } from '../tokens';
import {
  ChevronDownExtraSmall,
  ChevronRightExtraSmall,
  ChevronLeftExtraSmall,
  ChevronLeftSmall,
  InboxMedium,
  HomeMedium,
  Home14,
  UserSmall,
  SettingsMedium,
  CloseSmall,
  ArrowLeftExtraSmall,
  AddSmall,
  KorraLogo,
  KLogo,
  HideShowSidebarMedium,
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
  DocumentMedium,
  ListMedium,
  BellMedium,
  AppsMedium,
  DocumentTable
} from '../icons';

/**
 * SideNav3 - Transaction-Centric Navigation Component
 *
 * This is a customizable version of SideNav2 designed for the new transaction-centric
 * browsing approach. Instead of splitting transaction data across apps (Reports, Analytics,
 * Contracts), this navigation will allow users to browse by transaction with all related
 * information unified in one place.
 *
 * TODO: Customize navigation structure for transaction-based browsing
 * - Consider organizing by transaction ID/name instead of app sections
 * - May need to add transaction-specific filters and categories
 * - Theme system can be adapted for transaction-centric view
 */

interface SideNav3Props {
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
  isSubPage?: boolean; // Whether current page is a detail/sub page
  onBackClick?: () => void; // Handler for back button on sub pages
  onNewTransactionClick?: () => void; // Handler for New Transaction button
  onSidebarToggle?: () => void; // Handler for sidebar toggle button
}

export const SideNav3: React.FC<SideNav3Props> = ({
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
  onSettingsClick,
  isSubPage = false,
  onBackClick,
  onNewTransactionClick,
  onSidebarToggle
}) => {
  const colors = useSemanticColors();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Use controlled state if provided, otherwise fall back to internal state
  const [internalSelectedItem, setInternalSelectedItem] = useState<string>(''); // Default to nothing highlighted

  const selectedItem = propSelectedItem !== undefined ? propSelectedItem : internalSelectedItem;

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isLogoHovered, setIsLogoHovered] = useState<boolean>(false);

  // Open transactions state - load from sessionStorage
  const [openTransactions, setOpenTransactions] = useState<Array<{ id: string; name: string }>>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('openTransactions');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Error parsing openTransactions:', e);
        }
      }
    }
    // No default transactions - start with empty list
    return [];
  });

  const [selectedTransactionId, setSelectedTransactionId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('selectedTransactionId');
      if (stored) return stored;
    }
    return '';
  });

  const [hoveredTransactionId, setHoveredTransactionId] = useState<string | null>(null);

  // Track previous current transaction to detect changes
  const previousCurrentTransactionRef = useRef<string>('');

  // Save openTransactions to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('openTransactions', JSON.stringify(openTransactions));
    }
  }, [openTransactions]);

  // Save selectedTransactionId to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedTransactionId', selectedTransactionId);
    }
  }, [selectedTransactionId]);

  // Sync selectedTransactionId with currentTransaction when on transaction pages
  useEffect(() => {
    const isTransactionPage = currentPageType === 'transaction-dashboard' || currentPageType === 'transaction-detail';
    if (isTransactionPage && typeof window !== 'undefined') {
      const currentTransaction = sessionStorage.getItem('currentTransaction');
      if (currentTransaction) {
        try {
          const transaction = JSON.parse(currentTransaction);
          const currentTransactionId = transaction.id || '';

          // Only update if the transaction has actually changed
          if (currentTransactionId && currentTransactionId !== previousCurrentTransactionRef.current) {
            previousCurrentTransactionRef.current = currentTransactionId;
            setSelectedTransactionId(currentTransactionId);
          }
        } catch (e) {
          console.error('Error parsing currentTransaction for sync:', e);
        }
      }
    }
  });

  // Use controlled compact mode from parent
  const isCompact = propIsCompact;

  // Handle hover with proper delays for smooth UX (DISABLED - no auto-expand on hover)
  const handleMouseEnter = () => {
    // Auto-expand on hover disabled - user must click K logo to expand
  };

  const handleMouseLeave = () => {
    // Auto-expand on hover disabled - user must click K logo to expand
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
    marginBottom: '15px', // Reduced from spacing[8] to 15px
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
    const styleId = 'sidenav3-animations';
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
      {/* Header with logo and toggle button */}
      <div style={{
        ...headerStyles,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing[2]
      }}>
        {/* Logo - clickable to go home (or expand sidebar when compact) */}
        <div
          style={{
            cursor: 'pointer',
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: showFullMode ? 'flex-start' : 'center'
          }}
          onClick={() => {
            // When compact, toggle sidebar instead of navigating home
            if (isCompact && onSidebarToggle) {
              onSidebarToggle();
            } else {
              // Clear selected transaction when navigating to Home
              setSelectedTransactionId('');
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('selectedTransactionId', '');
              }
              if (onHomeClick) {
                onHomeClick();
              }
              // Also call onNavigate to ensure consistent navigation handling
              if (onNavigate) {
                onNavigate('home');
              }
            }
          }}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          {showFullMode ? (
            <div style={{ marginLeft: '8px' }}>
              <KorraLogo color={colors.blackAndWhite.white} />
            </div>
          ) : (
            <>
              {/* Show expand icon on hover when compact, otherwise show K logo */}
              {isLogoHovered && isCompact ? (
                <HideShowSidebarMedium color={colors.blackAndWhite.white} />
              ) : (
                <KLogo color={colors.blackAndWhite.white} />
              )}
            </>
          )}
        </div>

        {/* Sidebar Toggle Button - only show when expanded (not compact) */}
        {!isCompact && onSidebarToggle && (
          <button
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: borderRadius[8],
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
              marginRight: '0'
            }}
            onClick={onSidebarToggle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            title="Toggle Sidebar"
          >
            <div style={{
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HideShowSidebarMedium color={colors.blackAndWhite.white} />
            </div>
          </button>
        )}
      </div>

      {/* Transaction-centric navigation items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '15px' }}>
        {/* All Transactions */}
        <button
          style={{
            ...mainItemStyles,
            ...(selectedItem === 'all-transactions' ? { backgroundColor: colors.blackAndWhite.white } : {})
          }}
          onClick={() => {
            // Clear selected transaction when navigating to All Transactions
            setSelectedTransactionId('');
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('selectedTransactionId', '');
            }
            if (onNavigate) {
              onNavigate('all-transactions');
            }
          }}
          onMouseEnter={(e) => {
            if (selectedItem !== 'all-transactions') {
              Object.assign(e.currentTarget.style, mainItemHoverStyles);
            }
          }}
          onMouseLeave={(e) => {
            if (selectedItem !== 'all-transactions') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <div style={mainItemContentStyles}>
            <ListMedium color={selectedItem === 'all-transactions' ? colors.blackAndWhite.black900 : colors.blackAndWhite.white} />
            <span style={{
              ...typography.styles.bodyL,
              color: selectedItem === 'all-transactions' ? colors.blackAndWhite.black900 : colors.blackAndWhite.white,
              opacity: showFullMode ? 1 : 0,
              transition: 'opacity 0.2s ease',
              visibility: showFullMode ? 'visible' : 'hidden',
              position: showFullMode ? 'static' : 'absolute'
            }}>All Transactions</span>
          </div>
        </button>

        {/* Notifications */}
        <button
          style={{
            ...mainItemStyles,
            ...(selectedItem === 'notifications' ? { backgroundColor: colors.blackAndWhite.white } : {})
          }}
          onClick={() => {
            // TODO: Will open notifications modal in the future
            console.log('Notifications clicked');
          }}
          onMouseEnter={(e) => {
            if (selectedItem !== 'notifications') {
              Object.assign(e.currentTarget.style, mainItemHoverStyles);
            }
          }}
          onMouseLeave={(e) => {
            if (selectedItem !== 'notifications') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <div style={mainItemContentStyles}>
            <BellMedium color={selectedItem === 'notifications' ? colors.blackAndWhite.black900 : colors.blackAndWhite.white} />
            <span style={{
              ...typography.styles.bodyL,
              color: selectedItem === 'notifications' ? colors.blackAndWhite.black900 : colors.blackAndWhite.white,
              opacity: showFullMode ? 1 : 0,
              transition: 'opacity 0.2s ease',
              visibility: showFullMode ? 'visible' : 'hidden',
              position: showFullMode ? 'static' : 'absolute'
            }}>Notifications</span>
          </div>
        </button>

        {/* Apps */}
        <button
          style={{
            ...mainItemStyles,
            ...(selectedItem === 'apps' ? { backgroundColor: colors.blackAndWhite.white } : {})
          }}
          onClick={() => {
            // TODO: Will open apps modal in the future
            console.log('Apps clicked');
          }}
          onMouseEnter={(e) => {
            if (selectedItem !== 'apps') {
              Object.assign(e.currentTarget.style, mainItemHoverStyles);
            }
          }}
          onMouseLeave={(e) => {
            if (selectedItem !== 'apps') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <div style={mainItemContentStyles}>
            <AppsMedium color={selectedItem === 'apps' ? colors.blackAndWhite.black900 : colors.blackAndWhite.white} />
            <span style={{
              ...typography.styles.bodyL,
              color: selectedItem === 'apps' ? colors.blackAndWhite.black900 : colors.blackAndWhite.white,
              opacity: showFullMode ? 1 : 0,
              transition: 'opacity 0.2s ease',
              visibility: showFullMode ? 'visible' : 'hidden',
              position: showFullMode ? 'static' : 'absolute'
            }}>Apps</span>
          </div>
        </button>
      </div>

      {/* Transactions Section Title */}
      {showFullMode && (
        <div style={{
          ...typography.styles.bodyM,
          color: colors.blackAndWhite.black500,
          padding: `0 ${spacing[4]}`,
          marginBottom: spacing[3]
        }}>
          Transactions
        </div>
      )}

      {/* Open Transactions List */}
      {showFullMode && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: spacing[4] }}>
          {openTransactions.map((transaction) => {
            const isSelected = transaction.id === selectedTransactionId;
            const isHoveredTrans = transaction.id === hoveredTransactionId;

            return (
              <button
                key={transaction.id}
                style={{
                  ...mainItemStyles,
                  ...(isSelected ? { backgroundColor: colors.blackAndWhite.white } : {})
                }}
                onClick={() => {
                  setSelectedTransactionId(transaction.id);
                  // Always navigate to transaction-dashboard when clicking a transaction
                  // This ensures navigation works even when clicking the same transaction from a sub-page
                  if (typeof window !== 'undefined') {
                    const existingTransaction = sessionStorage.getItem('currentTransaction');
                    if (existingTransaction) {
                      try {
                        const existing = JSON.parse(existingTransaction);
                        if (existing.id !== transaction.id) {
                          // Different transaction - update with minimal data (full data will be loaded from database when needed)
                          sessionStorage.setItem('currentTransaction', JSON.stringify({
                            id: transaction.id,
                            name: transaction.name
                          }));
                          // Dispatch event to notify dashboard to reload
                          window.dispatchEvent(new Event('sessionStorageChange'));
                        }
                        // If same transaction, preserve existing full data but still navigate
                      } catch (e) {
                        // If parse error, set new transaction
                        sessionStorage.setItem('currentTransaction', JSON.stringify({
                          id: transaction.id,
                          name: transaction.name
                        }));
                        window.dispatchEvent(new Event('sessionStorageChange'));
                      }
                    } else {
                      // No existing transaction - set new one
                      sessionStorage.setItem('currentTransaction', JSON.stringify({
                        id: transaction.id,
                        name: transaction.name
                      }));
                      window.dispatchEvent(new Event('sessionStorageChange'));
                    }
                  }
                  // Always call onNavigate to ensure navigation works
                  if (onNavigate) {
                    onNavigate('transaction-dashboard', undefined, 'transaction-dashboard');
                  }
                }}
                onMouseEnter={(e) => {
                  setHoveredTransactionId(transaction.id);
                  if (!isSelected) {
                    Object.assign(e.currentTarget.style, mainItemHoverStyles);
                  }
                }}
                onMouseLeave={(e) => {
                  setHoveredTransactionId(null);
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{
                  ...mainItemContentStyles,
                  flex: 1,
                  minWidth: 0
                }}>
                  <DocumentTable color={isSelected ? colors.blackAndWhite.black900 : colors.blackAndWhite.white} />
                  <span style={{
                    ...typography.styles.bodyL,
                    color: isSelected ? colors.blackAndWhite.black900 : colors.blackAndWhite.white,
                    opacity: showFullMode ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    visibility: showFullMode ? 'visible' : 'hidden',
                    position: showFullMode ? 'static' : 'absolute',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    minWidth: 0
                  }}>
                    {transaction.name}
                  </span>
                </div>
                {showFullMode && isHoveredTrans && (
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenTransactions(prev => prev.filter(t => t.id !== transaction.id));

                      // If this is the last transaction, navigate to "all-transactions"
                      if (openTransactions.length === 1) {
                        setSelectedTransactionId('');
                        if (typeof window !== 'undefined') {
                          sessionStorage.setItem('selectedTransactionId', '');
                        }
                        if (onNavigate) {
                          onNavigate('all-transactions');
                        }
                      } else if (transaction.id === selectedTransactionId) {
                        // If closing the selected transaction, select the first remaining one
                        const remaining = openTransactions.filter(t => t.id !== transaction.id);
                        setSelectedTransactionId(remaining[0].id);
                      }
                    }}
                  >
                    <CloseSmall color={isSelected ? colors.blackAndWhite.black900 : colors.blackAndWhite.black700} />
                  </button>
                )}
              </button>
            );
          })}

          {/* New Transaction Button */}
          <button
            style={{
              ...mainItemStyles,
              marginTop: spacing[2]
            }}
            onClick={() => {
              // Call parent handler if provided, otherwise navigate to form
              if (onNewTransactionClick) {
                onNewTransactionClick();
              } else if (onNavigate) {
                onNavigate('reports-new-transaction-form');
              }
            }}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, mainItemHoverStyles);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div style={{
              ...mainItemContentStyles,
              flex: 1,
              minWidth: 0
            }}>
              {/* Icon with green600 background */}
              <div style={{
                backgroundColor: colors.analytics.green600,
                borderRadius: borderRadius[4],
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <AddSmall color={colors.blackAndWhite.black900} />
              </div>
              <span style={{
                ...typography.styles.bodyL,
                color: colors.blackAndWhite.white,
                opacity: showFullMode ? 1 : 0,
                transition: 'opacity 0.2s ease',
                visibility: showFullMode ? 'visible' : 'hidden',
                position: showFullMode ? 'static' : 'absolute',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
                minWidth: 0
              }}>
                New Transaction
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

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
