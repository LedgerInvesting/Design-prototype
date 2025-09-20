import React, { useState, useEffect } from 'react';
import { Sidebar, FormTopNav } from './';
import type { FormTopNavProps } from './FormTopNav';
import { colors } from '../tokens';

// FormLayout component props
export interface FormLayoutProps {
  children: React.ReactNode;
  formTitle?: string;
  entryType?: string;
  statusText?: string;
  statusVariant?: 'warning' | 'success' | 'error' | 'info' | 'inactive';
  showStatus?: boolean;
  progress?: number; // 0-100
  onBackClick?: () => void;
  onNavigate?: (itemId: string, subitemId?: string) => void;
  onInboxClick?: () => void;
  maxWidth?: string;
  className?: string;
  selectedSidebarItem?: string;
  selectedSidebarSubitem?: string;
  tabs?: React.ReactNode; // Optional tabs component to render between FormTopNav and content
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  formTitle,
  entryType,
  statusText,
  statusVariant,
  showStatus = true,
  progress,
  onBackClick,
  onNavigate,
  onInboxClick,
  maxWidth = '1200px',
  className,
  selectedSidebarItem,
  selectedSidebarSubitem,
  tabs
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
    maxWidth: `calc(100vw - ${sidebarWidth})`, // Prevent expanding beyond viewport minus sidebar
    overflow: 'hidden', // Contain any overflow
  };

  const contentAreaStyles: React.CSSProperties = {
    backgroundColor: colors.blackAndWhite.white,
    minHeight: 'calc(100vh - 60px)',
    maxWidth: `calc(${maxWidth} + 120px)`, // Add padding to ensure content area is exactly maxWidth
    margin: '60px auto 0 auto', // Center horizontally, 60px top offset for FormTopNav
    padding: '40px 60px 60px 60px', // 40px top, 60px left/right, 60px bottom
    overflow: 'hidden', // Prevent any content from overflowing
    boxSizing: 'border-box', // Include padding in width calculation
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
        {/* Fixed Form Top Navigation */}
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          right: 0, 
          width: `calc(100% - ${sidebarWidth})`, 
          zIndex: 999,
          transition: 'width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}>
          <FormTopNav
            title={formTitle}
            entryType={entryType}
            statusText={statusText}
            statusVariant={statusVariant}
            showStatus={showStatus}
            progress={progress}
            onBackClick={onBackClick}
          />
        </div>

        {/* Optional Tabs - Full width under FormTopNav */}
        {tabs && (
          <div style={{ 
            position: 'fixed', 
            top: '60px', // Right under FormTopNav (FormTopNav height is 60px)
            right: 0, 
            width: `calc(100% - ${sidebarWidth})`, 
            zIndex: 998, // Just below FormTopNav
            backgroundColor: colors.blackAndWhite.white,
            transition: 'width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
          }}>
            {tabs}
          </div>
        )}

        {/* Main Content Area */}
        <div style={{
          ...contentAreaStyles,
          marginTop: tabs ? '90px' : '60px', // Adjust top margin when tabs are present (60px FormTopNav + 30px tabs)
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormLayout;