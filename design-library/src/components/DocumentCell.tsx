import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { typography, borderRadius, shadows, useSemanticColors } from '../tokens';
import { DocumentTable, DownloadSmall, ConfigSmall, ChevronRightSmall } from '../icons';

export interface DocumentCellProps {
  filename: string;
  onDownload?: (filename: string) => void;
  className?: string;
  align?: 'left' | 'center' | 'right';
  hoverIcon?: 'download' | 'config' | 'open';
  interactive?: boolean; // Controls background and hover effects
}

export const DocumentCell: React.FC<DocumentCellProps> = ({
  filename,
  onDownload,
  className = '',
  align = 'left',
  hoverIcon = 'download',
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const colors = useSemanticColors();

  const handleClick = () => {
    if (onDownload) {
      onDownload(filename);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Get tooltip text based on hover icon type
  const getTooltipText = () => {
    switch (hoverIcon) {
      case 'download':
        return 'Download document';
      case 'config':
        return 'Config document';
      case 'open':
        return 'Go to dashboard';
      default:
        return 'Download document';
    }
  };

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '6px',
    padding: '4px 4px 4px 8px',
    borderRadius: interactive ? borderRadius[4] : 0,
    backgroundColor: interactive ? (isHovered ? colors.theme.primary300 : colors.theme.primary200) : 'transparent',
    cursor: interactive ? 'pointer' : 'default',
    transition: interactive ? 'all 0.2s ease' : 'none',
    minHeight: '21px', // Adjust for the margin
    width: 'calc(100% - 12px)', // Account for left and right margin
    boxSizing: 'border-box' as const,
    position: 'relative' as const,
  };

  const tooltipStyles = {
    position: 'fixed' as const,
    top: `${mousePosition.y + 10}px`, // 10px below mouse cursor
    left: `${mousePosition.x + 10}px`, // 10px to the right of mouse cursor
    backgroundColor: colors.blackAndWhite.black900,
    color: colors.blackAndWhite.white,
    padding: '6px 12px',
    borderRadius: borderRadius[8],
    fontSize: typography.styles.bodyS.fontSize,
    fontFamily: typography.styles.bodyS.fontFamily.join(', '),
    fontWeight: typography.styles.bodyS.fontWeight,
    whiteSpace: 'nowrap' as const,
    opacity: showTooltip ? 1 : 0,
    visibility: showTooltip ? 'visible' as const : 'hidden' as const,
    transition: 'opacity 0.2s ease, visibility 0.2s ease',
    zIndex: 1000,
    boxShadow: shadows.base,
    pointerEvents: 'none' as const,
  };

  const leftSectionStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
    minWidth: 0, // Allow text to truncate
    justifyContent: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
  };

  const textStyles = {
    fontFamily: typography.styles.bodyL.fontFamily.join(', '),
    fontSize: typography.styles.bodyL.fontSize,
    fontWeight: typography.styles.bodyL.fontWeight,
    lineHeight: typography.styles.bodyL.lineHeight,
    color: colors.blackAndWhite.black900,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
  };

  const downloadIconStyles = {
    flexShrink: 0,
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blackAndWhite.white, // White background from library
    borderRadius: borderRadius[8], // 8px border radius from library
    boxShadow: shadows.base, // Base shadow from library for better visibility
    border: `1px solid ${colors.theme.primary400}`, // Add theme 400 border
    padding: '6px', // Small padding around the icon
    width: '24px', // Fixed size for consistent appearance
    height: '24px',
    boxSizing: 'border-box' as const,
  };

  // Create tooltip content
  const tooltipContent = showTooltip && (
    <div style={tooltipStyles}>
      {getTooltipText()}
    </div>
  );

  return (
    <>
      <div
        className={className}
        style={containerStyles}
        onClick={interactive ? handleClick : undefined}
        onMouseEnter={interactive ? () => {
          setIsHovered(true);
          setShowTooltip(true);
        } : undefined}
        onMouseLeave={interactive ? () => {
          setIsHovered(false);
          setShowTooltip(false);
        } : undefined}
        onMouseMove={interactive ? handleMouseMove : undefined}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={interactive ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        } : undefined}
      >
        <div style={leftSectionStyles}>
          <DocumentTable color={colors.theme.primary450} />
          <span style={textStyles}>{filename}</span>
        </div>

        {interactive && (
          <div style={downloadIconStyles}>
            {hoverIcon === 'config' ? (
              <ConfigSmall color={colors.blackAndWhite.black900} />
            ) : hoverIcon === 'open' ? (
              <ChevronRightSmall color={colors.blackAndWhite.black900} />
            ) : (
              <DownloadSmall color={colors.blackAndWhite.black900} />
            )}
          </div>
        )}
      </div>
      {/* Render tooltip in portal to avoid parent transform issues */}
      {interactive && typeof document !== 'undefined' && tooltipContent && createPortal(tooltipContent, document.body)}
    </>
  );
};

export default DocumentCell;