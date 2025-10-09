import React from 'react';
import { colors, typography, spacing, borderRadius, shadows } from '../tokens';
import { ChevronRightExtraSmall, HideShowSidebarMedium } from '../icons';
import { Button } from '../components/Button';
import { AppActionButton } from '../components/AppActionButton';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePrototypeSettings } from '../contexts/PrototypeSettingsContext';
import type { BreadcrumbItem, AppActionConfig } from './TopNav';

export interface TopNav2Props {
  breadcrumbs: BreadcrumbItem[];
  showShare?: boolean;
  onShareClick?: () => void;
  onSidebarToggle?: () => void;
  onNavigate?: (itemId: string, subitemId?: string) => void;
  appAction?: AppActionConfig; // Optional context-aware app action button
  isSidebarCompact?: boolean; // Track sidebar state for icon color
  className?: string;
  style?: React.CSSProperties;
}

/**
 * TopNav2 - Test navigation component without user profile
 * Used when "Alt Nav Layout (Home + Products)" is enabled in prototype settings
 */
export const TopNav2: React.FC<TopNav2Props> = ({
  breadcrumbs = [],
  showShare = false,
  onShareClick,
  onSidebarToggle,
  onNavigate,
  appAction,
  isSidebarCompact = false,
  className,
  style,
}) => {
  const { settings: prototypeSettings } = usePrototypeSettings();

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '60px',
    backgroundColor: colors.blackAndWhite.white,
    padding: '0 60px',
    borderTopLeftRadius: '10px',
    boxShadow: shadows.base,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxSizing: 'border-box',
    ...style,
  };

  const leftSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4],
  };

  const breadcrumbsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  };

  const breadcrumbItemStyles: React.CSSProperties = {
    ...typography.styles.navM,
    color: colors.blackAndWhite.black900,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.15s ease',
    padding: '8px',
    borderRadius: borderRadius[4],
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '12px',
    lineHeight: '1.2',
  };

  const activeBreadcrumbStyles: React.CSSProperties = {
    ...breadcrumbItemStyles,
    color: colors.blackAndWhite.black500,
  };

  const separatorStyles: React.CSSProperties = {
    width: '1px',
    height: '23px',
    backgroundColor: '#d9e7ec',
  };

  const rightSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4],
  };

  const sidebarToggleButtonStyles: React.CSSProperties = {
    width: '40px',
    height: '40px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: borderRadius[8],
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
  };

  return (
    <nav className={className} style={containerStyles}>
      {/* Left Section - Sidebar Toggle + Breadcrumbs */}
      <div style={leftSectionStyles}>
        {/* Sidebar Toggle Button */}
        {onSidebarToggle && (
          <>
            <button
              style={sidebarToggleButtonStyles}
              onClick={onSidebarToggle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.blackAndWhite.black50;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              title="Toggle Sidebar"
            >
              <div style={{
                width: '18px',
                height: '18px',
                padding: '1px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <HideShowSidebarMedium color={isSidebarCompact ? colors.blackAndWhite.black500 : colors.blackAndWhite.black900} />
              </div>
            </button>

            {/* Separator */}
            <div style={separatorStyles} />
          </>
        )}

        <Breadcrumbs
          items={breadcrumbs.map(item => ({
            label: item.label,
            path: item.href,
            onClick: item.onClick
          }))}
        />
      </div>

      {/* Right Section - Share Button + App Action Button (No Profile) */}
      <div style={rightSectionStyles}>
        {/* Share Button */}
        {showShare && (
          <Button
            variant="small"
            color="black"
            onClick={onShareClick}
            showIcon={false}
          >
            share
          </Button>
        )}

        {/* App Action Button - Context-aware cross-app navigation */}
        {prototypeSettings.appIntegration.showExtraCardButtons && appAction && (
          <AppActionButton
            app={appAction.app}
            actionText={appAction.actionText}
            onClick={appAction.onClick}
          />
        )}
      </div>
    </nav>
  );
};

export default TopNav2;
