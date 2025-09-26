import React, { useState, useEffect } from 'react';
import { TopNav, Sidebar, FormTopNav } from './';
import type { BreadcrumbItem } from './TopNav';
import { colors } from '../tokens';

/**
 * Unified layout component that supports both navigation and form modes
 *
 * Navigation mode: Uses TopNav with breadcrumbs, user profile, and share functionality
 * Form mode: Uses FormTopNav with form title, status, and progress indicators
 *
 * @example Navigation Mode
 * ```tsx
 * <Layout
 *   breadcrumbs={[{label: 'Home', href: '/'}]}
 *   userName="John Doe"
 * >
 *   <div>Content</div>
 * </Layout>
 * ```
 *
 * @example Form Mode
 * ```tsx
 * <Layout
 *   formMode={true}
 *   formTitle="New Transaction"
 *   progress={60}
 *   statusText="draft"
 * >
 *   <div>Form content</div>
 * </Layout>
 * ```
 */
export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  selectedSidebarItem?: string;
  selectedSidebarSubitem?: string;
  tabs?: React.ReactNode; // Optional tabs component to render between TopNav and content
  onNavigate?: (itemId: string, subitemId?: string) => void;
  onInboxClick?: () => void;
  maxWidth?: string; // For form layouts

  // Navigation mode props (regular TopNav)
  breadcrumbs?: BreadcrumbItem[];
  userName?: string;
  userInitials?: string;
  profileColor?: string;
  showShare?: boolean;
  onShareClick?: () => void;
  onUserMenuClick?: () => void;
  onManageAccountClick?: () => void;
  onSettingsClick?: () => void;

  // Form mode props (FormTopNav)
  formMode?: boolean;
  formTitle?: string;
  entryType?: string;
  statusText?: string;
  statusVariant?: 'warning' | 'success' | 'error' | 'info' | 'inactive';
  showStatus?: boolean;
  progress?: number;
  onBackClick?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  selectedSidebarItem,
  selectedSidebarSubitem,
  tabs,
  onNavigate,
  onInboxClick,
  maxWidth = '1200px',

  // Navigation mode props
  breadcrumbs,
  userName = "SARAH JOHNSON",
  userInitials = "SJ",
  profileColor = colors.reports.blue700,
  showShare = false,
  onShareClick,
  onUserMenuClick,
  onManageAccountClick,
  onSettingsClick,

  // Form mode props
  formMode = false,
  formTitle,
  entryType,
  statusText,
  statusVariant,
  showStatus = true,
  progress,
  onBackClick,
}) => {
  // Initialize sidebar state from localStorage
  const [isCompact, setIsCompact] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCompact');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  const [isSidebarHovered, setIsSidebarHovered] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [contentKey, setContentKey] = useState<string>('initial');
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  // Handle sidebar toggle - button controls compact mode instead of viewport
  const handleSidebarToggle = () => {
    const newCompactState = !isCompact;
    setIsCompact(newCompactState);
    // Save to localStorage
    localStorage.setItem('sidebarCompact', JSON.stringify(newCompactState));
  };

  // Detect page changes and trigger animation
  useEffect(() => {
    // Skip animation on first render
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    // Generate a key based on the page content to detect changes
    const newKey = `${selectedSidebarItem}-${selectedSidebarSubitem}-${breadcrumbs?.length || 0}`;

    if (newKey !== contentKey) {
      // Start animation: content scales down and fades slightly
      setIsAnimating(true);
      setContentKey(newKey);

      // After a short delay, end animation to show full content
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 20); // Very short delay to trigger the animation

      return () => clearTimeout(timer);
    }
  }, [selectedSidebarItem, selectedSidebarSubitem, breadcrumbs, contentKey, isFirstRender]);

  // Calculate sidebar width based on compact mode and hover state
  const sidebarWidth = isCompact && !isSidebarHovered ? '80px' : '220px';

  const pageStyles: React.CSSProperties = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: colors.blackAndWhite.black900,
  };

  const mainContentStyles: React.CSSProperties = {
    flex: 1,
    marginLeft: sidebarWidth,
    backgroundColor: colors.blackAndWhite.white,
    transition: 'margin-left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    width: `calc(100vw - ${sidebarWidth})`, // Full width minus sidebar
    overflow: 'hidden', // Contain any overflow
  };

  const contentAreaStyles: React.CSSProperties = {
    backgroundColor: colors.blackAndWhite.white,
    minHeight: 'calc(100vh - 60px)',
    width: '100%', // Fill available width
    margin: formMode ? '60px 0 0 0' : '0', // Form mode: 60px top offset, nav mode: no margins
    padding: formMode ? '40px 50px 60px 50px' : '50px 50px 60px 50px', // Form mode: less top padding
    overflow: 'hidden', // Prevent any content from overflowing
    boxSizing: 'border-box', // Include padding in width calculation
    // Page transition animation - start small and fade in (only in nav mode)
    opacity: (!formMode && isAnimating) ? 0.95 : 1,
    transform: (!formMode && isAnimating) ? 'scale(0.98)' : 'scale(1)',
    transition: !formMode ? 'opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'none',
  };

  return (
    <div style={pageStyles} className={className}>
      {/* Fixed Sidebar */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        height: '100vh', 
        width: sidebarWidth, 
        zIndex: 1000,
        transition: 'width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
      }}>
        <Sidebar
          onNavigate={onNavigate || (() => {})}
          onInboxClick={onInboxClick || (() => {})}
          selectedItem={selectedSidebarItem}
          selectedSubitem={selectedSidebarSubitem}
          onHoverChange={setIsSidebarHovered}
          isCompact={isCompact}
        />
      </div>

      <div style={mainContentStyles}>
        {/* Fixed Top Navigation - Conditional TopNav/FormTopNav */}
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: `calc(100% - ${sidebarWidth})`,
          zIndex: 999,
          backgroundColor: colors.blackAndWhite.black900,
          borderRadius: '0 0 12px 12px',
          transition: 'width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}>
          {formMode ? (
            <FormTopNav
              title={formTitle}
              entryType={entryType}
              statusText={statusText}
              statusVariant={statusVariant}
              showStatus={showStatus}
              progress={progress}
              onBackClick={onBackClick}
              onSidebarToggle={handleSidebarToggle}
              isSidebarCompact={isCompact}
            />
          ) : (
            <TopNav
              breadcrumbs={breadcrumbs || []}
              userName={userName}
              userInitials={userInitials}
              profileColor={profileColor}
              showShare={showShare}
              onShareClick={onShareClick || (() => alert('Share clicked'))}
              onUserMenuClick={onUserMenuClick}
              onManageAccountClick={onManageAccountClick}
              onSettingsClick={onSettingsClick}
              onSidebarToggle={handleSidebarToggle}
              isSidebarCompact={isCompact}
            />
          )}
        </div>

        {/* Optional Tabs - Full width under TopNav */}
        {tabs && (
          <div style={{ 
            position: 'fixed', 
            top: '60px', // Right under TopNav (TopNav height is 60px)
            right: 0, 
            width: `calc(100% - ${sidebarWidth})`, 
            zIndex: 998, // Just below TopNav
            backgroundColor: colors.blackAndWhite.white,
            transition: 'width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
          }}>
            {tabs}
          </div>
        )}

        {/* Main Content Area */}
        <div style={{
          ...contentAreaStyles,
          marginTop: tabs ? '90px' : '60px', // Adjust top margin when tabs are present (60px TopNav + 30px tabs)
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;