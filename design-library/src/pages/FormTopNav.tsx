import React from 'react';
import { Button, Status } from '../components';
import { AppActionButton } from '../components/AppActionButton';
import { colors, typography, spacing, borderRadius, shadows, useSemanticColors } from '../tokens';
import { HideShowSidebarMedium, CheckSmall } from '../icons';
import { usePrototypeSettings } from '../contexts/PrototypeSettingsContext';

export interface AppActionConfig {
  app: 'marketplace' | 'reports' | 'analytics' | 'contracts';
  actionText: string;
  onClick: () => void;
}

export interface StepConfig {
  label: string;
  status: 'completed' | 'active' | 'disabled';
  onClick?: () => void;
}

export interface FormTopNavProps {
  title?: string;
  entryType?: string;
  statusText?: string;
  statusVariant?: 'warning' | 'success' | 'error' | 'info' | 'inactive';
  showStatus?: boolean;
  progress?: number; // 0-100
  onBackClick?: () => void;
  backButtonText?: string; // Optional custom text for back button (default: "Back to Dashboard")
  onSidebarToggle?: () => void;
  isSidebarCompact?: boolean; // Track sidebar state for icon color
  appAction?: AppActionConfig; // Optional context-aware app action button
  className?: string;
  style?: React.CSSProperties;
  tags?: React.ReactNode[]; // Flexible tags/pills beside title (replaces entryType and status when provided)
  showSidebarToggle?: boolean; // Control sidebar toggle visibility (default: true)
  stepper?: StepConfig[]; // Optional stepper configuration
}

export const FormTopNav: React.FC<FormTopNavProps> = ({
  title = "NEW TRANSACTION WORKFLOW",
  entryType = "Manual Entry",
  statusText = "draft",
  statusVariant = "warning",
  showStatus = true,
  progress = 0,
  onBackClick,
  backButtonText = "Back to Dashboard",
  onSidebarToggle,
  isSidebarCompact = false,
  appAction,
  className,
  style,
  tags,
  showSidebarToggle = true,
  stepper
}) => {
  const { settings: prototypeSettings } = usePrototypeSettings();
  const semanticColors = useSemanticColors();
  // Using same base container styles as default TopNav
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '60px',
    backgroundColor: colors.blackAndWhite.white,
    padding: '0 60px', // Same as default TopNav
    borderTopLeftRadius: '10px', // Same as default TopNav
    boxShadow: shadows.base, // Same as default TopNav
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxSizing: 'border-box',
    ...style,
  };

  // Left section styles - similar to default TopNav breadcrumbs section
  const leftSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // 10px distance between pills
  };

  const titleStyles: React.CSSProperties = {
    ...typography.styles.navM, // Using same typography as default TopNav breadcrumbs
    color: colors.blackAndWhite.black500,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '12px',
    lineHeight: '1.2',
    margin: 0,
  };


  // Right section styles - similar to default TopNav right section
  const rightSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4], // Same as default TopNav
  };

  const progressContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2], // 8px gap between progress bar and text
  };

  const progressBarStyles: React.CSSProperties = {
    width: '70px', // Updated to 70px as requested
    height: '4px', // Updated to 4px as requested
    backgroundColor: colors.reports.blue500, // Updated to blue500 as requested
    borderRadius: borderRadius.absolute,
    overflow: 'hidden',
    position: 'relative',
  };

  const progressFillStyles: React.CSSProperties = {
    width: `${progress}%`,
    height: '100%',
    backgroundColor: colors.reports.blue700,
    borderRadius: borderRadius.absolute,
    transition: 'width 0.3s ease',
  };

  const progressTextStyles: React.CSSProperties = {
    ...typography.styles.bodyL, // Using bodyL as requested
    color: colors.blackAndWhite.black500,
    margin: 0,
    whiteSpace: 'nowrap',
  };

  const separatorStyles: React.CSSProperties = {
    width: '1px',
    height: '23px',
    backgroundColor: '#d9e7ec',
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
      {/* Left Section - Title and Tags */}
      <div style={leftSectionStyles}>
        <span style={titleStyles}>{title}</span>

        {/* Flexible tags if provided, otherwise default entryType and status */}
        {tags ? (
          <>
            {tags.map((tag, index) => (
              <React.Fragment key={index}>{tag}</React.Fragment>
            ))}
          </>
        ) : !stepper ? (
          <>
            {/* Entry Type Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              padding: '0 5px',
              backgroundColor: colors.reports.dynamic.blue200,
              borderRadius: borderRadius[4],
              height: '20px',
              fontFamily: typography.styles.bodyS.fontFamily.join(', '),
              fontSize: typography.styles.bodyS.fontSize,
              fontWeight: typography.styles.bodyS.fontWeight,
              lineHeight: typography.styles.bodyS.lineHeight,
              letterSpacing: typography.letterSpacing.wide,
              color: colors.blackAndWhite.black700,
              whiteSpace: 'nowrap',
            }}>
              {entryType}
            </div>
            {showStatus && (
              <Status
                variant={statusVariant}
                size="small"
              >
                {statusText}
              </Status>
            )}
          </>
        ) : null}
      </div>

      {/* Center Section - Stepper (if provided) */}
      {stepper && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          {stepper.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step */}
              <div
                onClick={step.onClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: step.onClick ? 'pointer' : 'default',
                  opacity: 1,
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (step.onClick) {
                    e.currentTarget.style.opacity = '0.7';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                {/* Check icon for completed steps */}
                {step.status === 'completed' && (
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: colors.analytics.green600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <CheckSmall color={colors.blackAndWhite.black900} />
                    </div>
                  </div>
                )}

                {/* Step label */}
                <span style={{
                  ...typography.styles.bodyM,
                  color: step.status === 'disabled'
                    ? colors.blackAndWhite.black300
                    : colors.blackAndWhite.black700,
                  whiteSpace: 'nowrap',
                }}>
                  {step.label}
                </span>
              </div>

              {/* Arrow between steps (not after last step) */}
              {index < stepper.length - 1 && (
                <span style={{
                  ...typography.styles.bodyM,
                  color: semanticColors.theme.primary450,
                }}>
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Right Section: Progress or App Action + Button */}
      <div style={rightSectionStyles}>
        {/* Show AppActionButton if setting is enabled and appAction is provided */}
        {prototypeSettings.appIntegration.showExtraCardButtons && appAction ? (
          <AppActionButton
            app={appAction.app}
            actionText={appAction.actionText}
            onClick={appAction.onClick}
          />
        ) : showSidebarToggle ? (
          /* Show progress bar only when sidebar toggle is visible (not third variation) */
          <div style={progressContainerStyles}>
            <div style={progressBarStyles}>
              <div style={progressFillStyles} />
            </div>
            <span style={progressTextStyles}>{progress}% Complete</span>
          </div>
        ) : null}

        <Button
          variant="primary"
          color="white"
          onClick={onBackClick}
          style={{ height: '37px' }} // Custom height as requested
          showIcon={false} // No icon variant
        >
          {backButtonText}
        </Button>
      </div>
    </nav>
  );
};

export default FormTopNav;