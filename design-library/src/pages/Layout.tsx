import React, { useState, useEffect } from 'react';
import { TopNav, TopNav2, Sidebar, SideNav2, FormTopNav } from './';
import type { BreadcrumbItem, AppActionConfig } from './TopNav';
import { colors, typography } from '../tokens';
import { useSettings } from '../contexts';
import { Modal } from '../components/Modal';
import { Selector } from '../components/Selector';
import { Button } from '../components/Button';
import { usePrototypeSettings } from '../contexts/PrototypeSettingsContext';

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
  pageType?: string; // Full page type for localStorage (e.g., 'analytics-triangle-dashboard')
  selectedSidebarItem?: string;
  selectedSidebarSubitem?: string;
  tabs?: React.ReactNode; // Optional tabs component to render between TopNav and content
  onNavigate?: (itemId: string, subitemId?: string, pageType?: string) => void;
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
  appAction?: AppActionConfig; // Optional context-aware app action button
  showAskQuill?: boolean; // Show "Ask Quill" button on home page
  onAskQuillClick?: () => void;

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
  pageType,
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
  appAction,
  showAskQuill = false,
  onAskQuillClick,

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
  // Get prototype settings
  const settings = useSettings();
  const useSideNav2 = settings.uiExperiments.sidenavTest;

  // Prototype settings modal state
  const { settings: prototypeSettings, updateSetting, resetSettings } = usePrototypeSettings();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Handle settings click - open modal and call parent callback
  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
    if (onSettingsClick) {
      onSettingsClick();
    }
  };

  // Initialize sidebar state from localStorage
  const [isCompact, setIsCompact] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCompact');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  // When SideNav test is enabled, ensure sidebar is expanded (only on initial enable)
  useEffect(() => {
    if (useSideNav2 && isCompact) {
      setIsCompact(false);
      localStorage.setItem('sidebarCompact', JSON.stringify(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useSideNav2]); // Only run when useSideNav2 changes, not when isCompact changes
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
    overflow: 'hidden', // Contain any overflow
  };

  const contentAreaStyles: React.CSSProperties = {
    backgroundColor: colors.blackAndWhite.white,
    minHeight: 'calc(100vh - 60px)',
    width: '100%', // Fill available width
    margin: formMode ? '60px 0 0 0' : '0', // Form mode: 60px top offset, nav mode: no margins
    padding: formMode ? '40px 60px 60px 60px' : '40px 60px 60px 60px', // Standard padding (will be overridden by inline marginTop)
    overflow: 'hidden', // Prevent any content from overflowing
    boxSizing: 'border-box', // Include padding in width calculation
    // Page transition animation - start slightly larger and zoom in (only in nav mode)
    opacity: (!formMode && isAnimating) ? 1 : 0.95,
    transform: (!formMode && isAnimating) ? 'scale(1)' : 'scale(1.02)',
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
        {useSideNav2 ? (
          <SideNav2
            onNavigate={onNavigate || (() => {})}
            onInboxClick={onInboxClick || (() => {})}
            onHomeClick={() => {
              // Navigate to home when Home is clicked
              if (onNavigate) {
                onNavigate('home');
              }
            }}
            selectedItem={selectedSidebarItem}
            selectedSubitem={selectedSidebarSubitem}
            currentPageType={pageType}
            onHoverChange={setIsSidebarHovered}
            isCompact={isCompact}
            userName={userName}
            userInitials={userInitials}
            profileColor={profileColor}
            onManageAccountClick={onManageAccountClick}
            onSettingsClick={handleSettingsClick}
          />
        ) : (
          <Sidebar
            onNavigate={onNavigate || (() => {})}
            onInboxClick={onInboxClick || (() => {})}
            selectedItem={selectedSidebarItem}
            selectedSubitem={selectedSidebarSubitem}
            onHoverChange={setIsSidebarHovered}
            isCompact={isCompact}
          />
        )}
      </div>

      <div style={mainContentStyles}>
        {/* Fixed Top Navigation - Conditional TopNav/FormTopNav */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: sidebarWidth,
          right: 0,
          zIndex: 999,
          backgroundColor: colors.blackAndWhite.black900,
          borderRadius: '0 0 12px 12px',
          transition: 'left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          overflow: 'visible'
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
          ) : useSideNav2 ? (
            <TopNav2
              breadcrumbs={breadcrumbs || []}
              showShare={showShare}
              onShareClick={onShareClick || (() => alert('Share clicked'))}
              onSidebarToggle={handleSidebarToggle}
              onNavigate={onNavigate}
              appAction={appAction}
              showAskQuill={showAskQuill}
              onAskQuillClick={onAskQuillClick}
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
              onSettingsClick={handleSettingsClick}
              onSidebarToggle={handleSidebarToggle}
              onNavigate={onNavigate}
              appAction={appAction}
              showAskQuill={showAskQuill}
              onAskQuillClick={onAskQuillClick}
              isSidebarCompact={isCompact}
            />
          )}
        </div>

        {/* Optional Tabs - Full width under TopNav */}
        {tabs && (
          <div style={{
            position: 'fixed',
            top: '60px', // Right under TopNav (TopNav height is 60px)
            left: sidebarWidth,
            right: 0,
            zIndex: 998, // Just below TopNav
            backgroundColor: colors.blackAndWhite.white,
            transition: 'left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
          }}>
            {tabs}
          </div>
        )}

        {/* Main Content Area */}
        <div style={{
          ...contentAreaStyles,
          marginTop: tabs ? '150px' : '120px', // TopNav (60px) + desired gap (60px) = 120px total
          padding: '0 60px 60px 60px', // Remove top padding since marginTop handles the gap
        }}>
          {children}
        </div>
      </div>

      {/* Settings Modal - Shared between TopNav and SideNav2 */}
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="Prototype Settings"
        width="520px"
        showCloseButton={true}
        showBackdrop={true}
        backdropColor="white"
        backdropOpacity={0.8}
      >
        <div style={{ padding: '0 0 20px 0' }}>
          {/* UI Experiments Section */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              ...typography.styles.subheadingM,
              color: colors.blackAndWhite.black900,
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: `1px solid ${colors.blackAndWhite.black100}`,
            }}>
              UI Experiments
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Selector
                variant="checkbox"
                label="Show apps integration buttons"
                checked={prototypeSettings.appIntegration.showExtraCardButtons}
                onChange={(checked) => updateSetting('appIntegration', 'showExtraCardButtons', checked)}
              />

              <Selector
                variant="checkbox"
                label="Navigation v1 (Legacy)"
                checked={!prototypeSettings.uiExperiments.sidenavTest}
                onChange={(checked) => {
                  updateSetting('uiExperiments', 'sidenavTest', !checked);
                  // Navigate and close modal when toggling
                  if (onNavigate) {
                    setIsSettingsModalOpen(false);
                    if (checked) {
                      // When enabling Navigation v1, navigate to offerings
                      onNavigate('marketplace', 'offerings');
                    } else {
                      // When disabling Navigation v1, navigate to home
                      onNavigate('home');
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            paddingTop: '16px',
            borderTop: `1px solid ${colors.blackAndWhite.black100}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Button
              variant="primary"
              color="white"
              onClick={resetSettings}
              showIcon={false}
            >
              Reset All Settings
            </Button>
            <Button
              variant="primary"
              color="black"
              onClick={() => setIsSettingsModalOpen(false)}
              showIcon={false}
            >
              Apply
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Layout;