import React, { useState } from 'react';
import { colors, typography, borderRadius, shadows } from '../tokens';
import { DocumentTable, DownloadSmall, ConfigSmall } from '../icons';

export interface DocumentCellProps {
  filename: string;
  onDownload?: (filename: string) => void;
  className?: string;
  align?: 'left' | 'center' | 'right';
  hoverIcon?: 'download' | 'config';
}

export const DocumentCell: React.FC<DocumentCellProps> = ({
  filename,
  onDownload,
  className = '',
  align = 'left',
  hoverIcon = 'download',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onDownload) {
      onDownload(filename);
    }
  };

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    borderRadius: borderRadius[4],
    backgroundColor: isHovered ? colors.reports.dynamic.blue300 : colors.reports.dynamic.blue200, // Blue200 default, Blue300 hover
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '32px',
    width: '100%',
    boxSizing: 'border-box' as const,
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
    fontFamily: typography.styles.bodyM.fontFamily.join(', '),
    fontSize: typography.styles.bodyM.fontSize,
    fontWeight: typography.styles.bodyM.fontWeight,
    lineHeight: typography.styles.bodyM.lineHeight,
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
    boxShadow: shadows.sm, // Small shadow from library
    padding: '6px', // Small padding around the icon
    width: '24px', // Fixed size for consistent appearance
    height: '24px',
    boxSizing: 'border-box' as const,
  };

  return (
    <div
      className={className}
      style={containerStyles}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div style={leftSectionStyles}>
        <DocumentTable color={colors.blackAndWhite.black700} />
        <span style={textStyles}>{filename}</span>
      </div>
      
      <div style={downloadIconStyles}>
        {hoverIcon === 'config' ? (
          <ConfigSmall color={colors.blackAndWhite.black700} />
        ) : (
          <DownloadSmall color={colors.blackAndWhite.black700} />
        )}
      </div>
    </div>
  );
};

export default DocumentCell;