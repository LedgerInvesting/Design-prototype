import React, { useState } from 'react';
import { colors, typography, spacing, borderRadius, shadows, useSemanticColors } from '../tokens';
import { Button } from '../components/Button';
import { AppActionButton } from '../components/AppActionButton';
import { Tabs } from '../components/Tabs';
import { usePrototypeSettings } from '../contexts/PrototypeSettingsContext';
import type { AppActionConfig } from './TopNav';
import { ConfigSmall } from '../icons';

export interface TopNav3Props {
  showShare?: boolean;
  onShareClick?: () => void;
  onNavigate?: (itemId: string, subitemId?: string) => void;
  appAction?: AppActionConfig; // Optional context-aware app action button
  showAskQuill?: boolean; // Show "Ask Quill" button on home page
  onAskQuillClick?: () => void;
  activeTab?: string; // Currently active tab
  onTabChange?: (tabId: string) => void; // Tab change handler
  pageTitle?: string; // If provided, shows page title instead of tabs (for home/all transactions)
  onTransactionSettingsClick?: () => void; // Transaction Settings button handler (navigates to transaction settings)
  className?: string;
  style?: React.CSSProperties;
}

/**
 * TopNav3 - Navigation component for transaction-centric view
 * Customizable version for the new transaction browsing approach
 */
export const TopNav3: React.FC<TopNav3Props> = ({
  showShare = false,
  onShareClick,
  onNavigate,
  appAction,
  showAskQuill = false,
  onAskQuillClick,
  activeTab = 'dashboard',
  onTabChange,
  pageTitle,
  onTransactionSettingsClick,
  className,
  style,
}) => {
  const { settings: prototypeSettings } = usePrototypeSettings();
  const semanticColors = useSemanticColors();

  // Define tabs
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'insights', label: 'Insights' },
    { id: 'bdx-upload', label: 'BDX Upload' },
    { id: 'valuations', label: 'Valuations' },
    { id: 'triangles', label: 'Triangles' },
    { id: 'files', label: 'Files' },
  ];

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
    flex: 1,
    minWidth: 0,
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
    flexShrink: 0,
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
    <>
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <nav className={className} style={containerStyles}>
      {/* Left Section - Page Title or Tabs */}
      <div style={leftSectionStyles}>
        {pageTitle ? (
          // Page Title variant (for Home and All Transactions)
          <h1 style={{
            ...typography.styles.navM,
            color: colors.blackAndWhite.black700,
            margin: 0,
            textTransform: 'uppercase',
          }}>
            {pageTitle}
          </h1>
        ) : (
          // Tabs variant (for Transaction Detail)
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
            variant="medium"
          />
        )}
      </div>

      {/* Right Section - Ask Quill (for page title variant) or Share/App Action buttons (for tabs variant) */}
      <div style={rightSectionStyles}>
        {pageTitle ? (
          // Page Title variant - Only show "Have questions? Ask Quill"
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{
              fontFamily: 'Söhne',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: 1.3,
              color: colors.blackAndWhite.black700
            }}>
              Have questions?
            </span>
            <button
              onClick={onAskQuillClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                backgroundColor: colors.blackAndWhite.white,
                border: `1px solid ${colors.contracts.dynamic.yellow400}`,
                borderRadius: borderRadius[24],
                cursor: 'pointer',
                fontFamily: 'Söhne',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: 1.3,
                color: colors.blackAndWhite.black900,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.blackAndWhite.black50;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.blackAndWhite.white;
              }}
            >
              <img
                src="/quill.png"
                alt="Quill"
                style={{
                  width: '16px',
                  height: '16px',
                  animation: 'spin 10s linear infinite'
                }}
              />
              Ask Quill
            </button>
          </div>
        ) : (
          // Tabs variant - Show Share, App Action, and optionally Ask Quill
          <>
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

            {/* Ask Quill Button - AI Assistant */}
            {showAskQuill && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{
                  fontFamily: 'Söhne',
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: colors.blackAndWhite.black700
                }}>
                  Have a question?
                </span>
                <button
                  onClick={onAskQuillClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    backgroundColor: colors.blackAndWhite.white,
                    border: `1px solid ${colors.contracts.dynamic.yellow400}`,
                    borderRadius: borderRadius[24],
                    cursor: 'pointer',
                    fontFamily: 'Söhne',
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: colors.blackAndWhite.black900,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.blackAndWhite.black50;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.blackAndWhite.white;
                  }}
                >
                  <img
                    src="/quill.png"
                    alt="Quill"
                    style={{
                      width: '16px',
                      height: '16px',
                      animation: 'spin 10s linear infinite'
                    }}
                  />
                  Ask Quill
                </button>
              </div>
            )}

            {/* Settings Button - Navigate to transaction settings */}
            {onTransactionSettingsClick && (
              <button
                onClick={onTransactionSettingsClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: colors.blackAndWhite.white,
                  border: `1px solid ${semanticColors.theme.primary400}`,
                  borderRadius: borderRadius[8],
                  cursor: 'pointer',
                  fontFamily: typography.styles.navM.fontFamily.join(', '),
                  fontSize: typography.styles.navM.fontSize,
                  fontWeight: typography.styles.navM.fontWeight,
                  lineHeight: typography.styles.navM.lineHeight,
                  letterSpacing: typography.letterSpacing.widest,
                  textTransform: 'uppercase',
                  color: colors.blackAndWhite.black700,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.blackAndWhite.black50;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.blackAndWhite.white;
                }}
              >
                <ConfigSmall color={colors.blackAndWhite.black700} />
                Settings
              </button>
            )}
          </>
        )}
      </div>
    </nav>
    </>
  );
};

export default TopNav3;
