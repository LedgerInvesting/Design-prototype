import React, { useState } from 'react';
import { typography, borderRadius, shadows, useSemanticColors, colors as staticColors } from '../tokens';
import { CheckSmall, UploadSmall, ConfigSmall, CalculatorSmall, DownloadSmall, AddSmall, PlaySmall } from '../icons';

export type ActionType = 'upload' | 'validate' | 'generate' | 'setup' | 'download' | 'add-data' | 'run-valuation' | 'custom';

interface ActionConfig {
  icon: React.ReactNode;
  text: string;
}

export interface ActionCellProps {
  actionType?: ActionType;
  onClick?: (actionType: ActionType, text: string) => void;
  className?: string;
  // New flexible props
  icon?: React.ReactNode;
  text?: string;
  iconBackgroundColor?: string;
  iconColor?: string;
}

export const ActionCell: React.FC<ActionCellProps> = ({
  actionType = 'custom',
  onClick,
  className = '',
  icon: customIcon,
  text: customText,
  iconBackgroundColor: customIconBg,
  iconColor: customIconColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = useSemanticColors();

  const actionConfigs: Record<ActionType, ActionConfig> = {
    upload: {
      icon: <UploadSmall color={colors.success.textAndStrokes} />,
      text: 'Upload'
    },
    validate: {
      icon: <CheckSmall color={staticColors.reports.blue900} />,
      text: 'Validate'
    },
    generate: {
      icon: <CalculatorSmall color={staticColors.reports.blue900} />,
      text: 'Generate'
    },
    setup: {
      icon: <ConfigSmall color={staticColors.reports.blue900} />,
      text: 'Setup'
    },
    download: {
      icon: <DownloadSmall color={staticColors.reports.blue900} />,
      text: 'Download Cashflow'
    },
    'add-data': {
      icon: <AddSmall color={colors.success.textAndStrokes} />,
      text: 'Add data'
    },
    'run-valuation': {
      icon: <PlaySmall color={colors.success.textAndStrokes} />,
      text: 'Run valuation'
    },
    custom: {
      icon: customIcon || <AddSmall color={colors.success.textAndStrokes} />,
      text: customText || 'Action'
    }
  };

  const actionConfig = actionConfigs[actionType];
  const displayIcon = customIcon || actionConfig.icon;
  const displayText = customText || actionConfig.text;

  const handleClick = () => {
    if (onClick) {
      onClick(actionType, displayText);
    }
  };

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between text (left) and icon container (right)
    padding: '6px 3px 6px 6px', // 6px top/bottom/left, 3px right
    borderRadius: borderRadius[4],
    backgroundColor: isHovered ? colors.theme.primary200 : colors.blackAndWhite.white, // White background, theme primary200 on hover
    border: `1px solid ${colors.theme.primary400}`, // Use theme primary400 stroke color
    boxShadow: shadows.small, // Small shadow
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    height: '32px', // Fill more of the cell height (cell is ~45px, padding is 6px top/bottom = 33px available)
    width: '100%',
    boxSizing: 'border-box' as const,
  };

  // Determine icon background color
  const getIconBackgroundColor = () => {
    if (customIconBg) return customIconBg;
    if (actionType === 'upload' || actionType === 'add-data' || actionType === 'run-valuation') {
      return '#C6FFC1'; // Light green
    }
    return staticColors.reports.blue500; // Blue for others
  };

  const iconContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22px',
    height: '22px',
    backgroundColor: getIconBackgroundColor(),
    borderRadius: borderRadius[4],
    flexShrink: 0, // Don't shrink the icon container
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
    textAlign: 'left' as const, // Left-aligned text
    flex: 1, // Take available space
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
      title={displayText} // Tooltip for full text if truncated
    >
      <span style={textStyles}>{displayText}</span>
      <div style={iconContainerStyles}>
        {displayIcon}
      </div>
    </div>
  );
};

export default ActionCell;