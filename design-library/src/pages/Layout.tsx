import React from 'react';
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
  className
}) => {
  const pageStyles: React.CSSProperties = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: colors.blackAndWhite.black900,
  };

  const mainContentStyles: React.CSSProperties = {
    flex: 1,
    marginLeft: '220px', // Sidebar width
    backgroundColor: colors.blackAndWhite.white,
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
        width: '220px', 
        zIndex: 1000 
      }}>
        <Sidebar
          onNavigate={onNavigate || (() => {})}
          onInboxClick={onInboxClick || (() => {})}
        />
      </div>

      <div style={mainContentStyles}>
        {/* Fixed Top Navigation */}
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          right: 0, 
          width: 'calc(100% - 220px)', 
          zIndex: 999,
          backgroundColor: colors.blackAndWhite.black900,
          borderRadius: '0 0 12px 12px'
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