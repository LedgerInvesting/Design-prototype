import React, { useState, useRef, useEffect } from 'react';
import { colors, typography, spacing, borderRadius, shadows, useSemanticColors } from '../tokens';
import { ChevronRightExtraSmall, ChevronDownExtraSmall, ExternalLinkSmall, HideShowSidebarMedium, UserSmall, SettingsMedium } from '../icons';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Selector } from '../components/Selector';
import { usePrototypeSettings } from '../contexts/PrototypeSettingsContext';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface TopNavProps {
  breadcrumbs: BreadcrumbItem[];
  userName: string;
  userInitials?: string;
  profileColor?: string;
  showShare?: boolean;
  onShareClick?: () => void;
  onUserMenuClick?: () => void;
  onManageAccountClick?: () => void;
  onSettingsClick?: () => void;
  onSidebarToggle?: () => void;
  isSidebarCompact?: boolean; // Track sidebar state for icon color
  className?: string;
  style?: React.CSSProperties;
}

export const TopNav: React.FC<TopNavProps> = ({
  breadcrumbs = [],
  userName,
  userInitials = 'DL',
  profileColor = colors.reports.blue700,
  showShare = false,
  onShareClick,
  onUserMenuClick,
  onManageAccountClick,
  onSettingsClick,
  onSidebarToggle,
  isSidebarCompact = false,
  className,
  style,
}) => {
  const semanticColors = useSemanticColors();
  const { settings, updateSetting, resetSettings } = usePrototypeSettings();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '60px',
    backgroundColor: colors.blackAndWhite.white,
    padding: '0 50px',
    borderTopLeftRadius: '10px',
    boxShadow: shadows.base,
    position: 'sticky',
    top: 0,
    zIndex: 100,
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

  const profileSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    cursor: 'pointer',
    padding: `${spacing[2]} ${spacing[3]}`,
    borderRadius: borderRadius[8],
    transition: 'all 0.15s ease',
    border: `1px solid transparent`,
  };

  const profileAvatarStyles: React.CSSProperties = {
    width: '36px',
    height: '36px',
    borderRadius: '40px',
    backgroundColor: profileColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.blackAndWhite.white,
    fontSize: '14px',
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.body.join(', '),
    flexShrink: 0,
    overflow: 'hidden',
  };

  const avatarImageStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '40px',
  };

  const userNameStyles: React.CSSProperties = {
    ...typography.styles.navM,
    color: colors.blackAndWhite.black900,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '12px',
    lineHeight: '1.2',
  };

  const handleProfileHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    if (isEntering) {
      e.currentTarget.style.backgroundColor = colors.blackAndWhite.black50;
      e.currentTarget.style.borderColor = colors.blackAndWhite.black200;
    } else {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.borderColor = 'transparent';
    }
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

  // User menu dropdown styles
  const userMenuStyles: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '8px',
    width: '180px',
    backgroundColor: colors.blackAndWhite.white,
    borderRadius: borderRadius[8],
    boxShadow: shadows.large,
    zIndex: 1000,
    overflow: 'hidden',
    padding: '5px',
  };

  const menuItemStyles: React.CSSProperties = {
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
    color: colors.blackAndWhite.black900,
  };

  // Click outside handler
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

  // Handle profile click
  const handleProfileClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    // Only call legacy onUserMenuClick if no new menu callbacks are provided
    if (onUserMenuClick && !onManageAccountClick && !onSettingsClick) {
      onUserMenuClick();
    }
  };

  // Handle menu item clicks
  const handleManageAccountClick = () => {
    setIsUserMenuOpen(false);
    if (onManageAccountClick) {
      onManageAccountClick();
    }
  };

  const handleSettingsClick = () => {
    setIsUserMenuOpen(false);
    setIsSettingsModalOpen(true);
    if (onSettingsClick) {
      onSettingsClick();
    }
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

        <div style={breadcrumbsStyles}>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {(item.href || item.onClick) && !item.isActive ? (
                <a
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  style={breadcrumbItemStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.blackAndWhite.black900;
                    e.currentTarget.style.backgroundColor = colors.blackAndWhite.black50;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.blackAndWhite.black600;
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <span style={item.isActive ? activeBreadcrumbStyles : breadcrumbItemStyles}>
                  {item.label}
                </span>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRightExtraSmall color={colors.blackAndWhite.black300} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right Section - Share Button + Profile */}
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

        {/* Separator - Always visible to separate page content from account */}
        <div style={separatorStyles} />

        {/* Profile Section with Dropdown */}
        <div style={{ position: 'relative' }}>
          <div
            ref={profileRef}
            style={profileSectionStyles}
            onClick={handleProfileClick}
            onMouseEnter={(e) => handleProfileHover(e, true)}
            onMouseLeave={(e) => handleProfileHover(e, false)}
          >
            <div style={profileAvatarStyles}>
              <img
                src="/avatar.png"
                alt={`${userName} avatar`}
                style={avatarImageStyles}
                onError={(e) => {
                  // Fallback to initials if image fails to load
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
            <span style={userNameStyles}>
              {userName}
            </span>
            <ChevronDownExtraSmall color={colors.blackAndWhite.black500} />
          </div>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div ref={menuRef} style={userMenuStyles}>
              <button
                style={menuItemStyles}
                onClick={handleManageAccountClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = semanticColors.theme.primary300;
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
                style={menuItemStyles}
                onClick={handleSettingsClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = semanticColors.theme.primary300;
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

      {/* Settings Modal */}
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
          {/* App Integration Section */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              ...typography.styles.subheadingM,
              color: colors.blackAndWhite.black900,
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: `1px solid ${colors.blackAndWhite.black100}`,
            }}>
              App Integration
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Selector
                variant="checkbox"
                label="Show extra card buttons"
                checked={settings.appIntegration.showExtraCardButtons}
                onChange={(checked) => updateSetting('appIntegration', 'showExtraCardButtons', checked)}
              />

              <Selector
                variant="checkbox"
                label="Enable advanced filters"
                checked={settings.appIntegration.enableAdvancedFilters}
                onChange={(checked) => updateSetting('appIntegration', 'enableAdvancedFilters', checked)}
              />

              <Selector
                variant="checkbox"
                label="Show integration badges"
                checked={settings.appIntegration.showIntegrationBadges}
                onChange={(checked) => updateSetting('appIntegration', 'showIntegrationBadges', checked)}
              />

              <Selector
                variant="checkbox"
                label="Use enhanced navigation"
                checked={settings.appIntegration.useEnhancedNavigation}
                onChange={(checked) => updateSetting('appIntegration', 'useEnhancedNavigation', checked)}
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
    </nav>
  );
};