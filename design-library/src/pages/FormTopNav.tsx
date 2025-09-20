import React from 'react';
import { Button, Status } from '../components';
import { colors, typography, spacing, borderRadius, shadows } from '../tokens';

export interface FormTopNavProps {
  title?: string;
  entryType?: string;
  statusText?: string;
  statusVariant?: 'warning' | 'success' | 'error' | 'info' | 'inactive';
  showStatus?: boolean;
  progress?: number; // 0-100
  onBackClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const FormTopNav: React.FC<FormTopNavProps> = ({
  title = "NEW TRANSACTION WORKFLOW",
  entryType = "Manual Entry",
  statusText = "draft",
  statusVariant = "warning",
  showStatus = true,
  progress = 0,
  onBackClick,
  className,
  style
}) => {
  // Using same base container styles as default TopNav
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '60px',
    backgroundColor: colors.blackAndWhite.white,
    padding: '0 50px', // Same as default TopNav
    borderTopLeftRadius: '10px', // Same as default TopNav
    boxShadow: shadows.base, // Same as default TopNav
    position: 'sticky',
    top: 0,
    zIndex: 100,
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


  return (
    <nav className={className} style={containerStyles}>
      {/* Left Section: Title + Entry Type + Status */}
      <div style={leftSectionStyles}>
        <span style={titleStyles}>{title}</span>
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
      </div>

      {/* Right Section: Progress + Button */}
      <div style={rightSectionStyles}>
        <div style={progressContainerStyles}>
          <div style={progressBarStyles}>
            <div style={progressFillStyles} />
          </div>
          <span style={progressTextStyles}>{progress}% Complete</span>
        </div>
        
        <Button
          variant="primary"
          color="white"
          onClick={onBackClick}
          style={{ height: '37px' }} // Custom height as requested
          showIcon={false} // No icon variant
        >
          Back to Dashboard
        </Button>
      </div>
    </nav>
  );
};

export default FormTopNav;