import React from 'react';
import { colors, typography, spacing, borderRadius, shadows } from '../tokens';
import { ChevronRightExtraSmall, ChevronDownExtraSmall, ExternalLinkSmall, HideShowSidebarMedium } from '../icons';
import { Button } from '../components/Button';

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
  onSidebarToggle,
  isSidebarCompact = false,
  className,
  style,
}) => {
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

        {/* Profile Section */}
        <div
          style={profileSectionStyles}
          onClick={onUserMenuClick}
          onMouseEnter={(e) => handleProfileHover(e, true)}
          onMouseLeave={(e) => handleProfileHover(e, false)}
        >
          <div style={profileAvatarStyles}>
            {userInitials}
          </div>
          <span style={userNameStyles}>
            {userName}
          </span>
          <ChevronDownExtraSmall color={colors.blackAndWhite.black500} />
        </div>
      </div>
    </nav>
  );
};