import React, { useState, useEffect } from 'react';
import { TopNav, Sidebar } from './';
import type { BreadcrumbItem } from './TopNav';
import { colors } from '../tokens';

// Layout component props
export interface LayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  userName?: string;
  userInitials?: string;
  profileColor?: string;
  onShareClick?: () => void;
  onUserMenuClick?: () => void;
  onNavigate?: (itemId: string, subitemId?: string) => void;
  onInboxClick?: () => void;
  maxWidth?: string;
  className?: string;
  selectedSidebarItem?: string;
  selectedSidebarSubitem?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  breadcrumbs,
  userName = "ALEC WHITTEN",
  userInitials = "AW",
  profileColor = colors.reports.blue700,
  onShareClick,
  onUserMenuClick,
  onNavigate,
  onInboxClick,
  maxWidth = '1200px',
  className,
  selectedSidebarItem,
  selectedSidebarSubitem
}) => {
  const [isCompact, setIsCompact] = useState<boolean>(false);

  // Check viewport width and update compact mode
  useEffect(() => {
    const checkViewportWidth = () => {
      setIsCompact(window.innerWidth <= 1650);
    };

    checkViewportWidth(); // Check on mount
    window.addEventListener('resize', checkViewportWidth);
    return () => window.removeEventListener('resize', checkViewportWidth);
  }, []);

  // Calculate sidebar width based on compact mode
  const sidebarWidth = isCompact ? '80px' : '220px';

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
  };

  const contentAreaStyles: React.CSSProperties = {
    backgroundColor: colors.blackAndWhite.white,
    marginTop: '60px', // TopNav height
    padding: '40px 60px 60px 60px', // 40px top, 60px left/right, 60px bottom
    minHeight: 'calc(100vh - 60px)',
    maxWidth,
    margin: '60px auto 0 auto', // Center horizontally, 60px top offset for TopNav
    paddingLeft: '60px', // Left margin as requested
    paddingRight: '60px', // Right margin as requested
    paddingTop: '40px', // Top margin as requested
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
        />
      </div>

      <div style={mainContentStyles}>
        {/* Fixed Top Navigation */}
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
          <TopNav
            breadcrumbs={breadcrumbs || []}
            userName={userName}
            userInitials={userInitials}
            profileColor={profileColor}
            onShareClick={onShareClick || (() => alert('Share clicked'))}
            onUserMenuClick={onUserMenuClick || (() => alert('User menu clicked'))}
          />
        </div>

        {/* Main Content Area */}
        <div style={contentAreaStyles}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;