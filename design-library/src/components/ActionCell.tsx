import React, { useState } from 'react';
import { colors, typography, borderRadius, shadows } from '../tokens';
import { CheckSmall, UploadSmall, ConfigSmall, CalculatorSmall } from '../icons';

export type ActionType = 'upload' | 'validate' | 'generate' | 'setup';

interface ActionConfig {
  icon: React.ReactNode;
  text: string;
}

const actionConfigs: Record<ActionType, ActionConfig> = {
  upload: {
    icon: <UploadSmall color={colors.success.textAndStrokes} />,
    text: 'Upload'
  },
  validate: {
    icon: <CheckSmall color={colors.reports.blue900} />,
    text: 'Validate'
  },
  generate: {
    icon: <CalculatorSmall color={colors.reports.blue900} />,
    text: 'Generate'
  },
  setup: {
    icon: <ConfigSmall color={colors.reports.blue900} />,
    text: 'Setup'
  }
};

export interface ActionCellProps {
  actionType: ActionType;
  onClick?: (actionType: ActionType, text: string) => void;
  className?: string;
}

export const ActionCell: React.FC<ActionCellProps> = ({
  actionType,
  onClick,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const actionConfig = actionConfigs[actionType];
  
  const handleClick = () => {
    if (onClick) {
      onClick(actionType, actionConfig.text);
    }
  };

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between text (left) and icon container (right)
    padding: '6px 3px 6px 6px', // 6px top/bottom/left, 3px right
    borderRadius: borderRadius[4],
    backgroundColor: isHovered ? 'rgba(244, 249, 255, 0.5)' : colors.blackAndWhite.white, // White background, blue200 with 50% alpha on hover
    border: `1px solid ${colors.reports.dynamic.blue400}`, // Always use 400 stroke color
    boxShadow: shadows.small, // Small shadow
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    height: '29px', // Fixed height to fit within 45px table row (45px - 2*8px padding = 29px)
    width: '100%',
    boxSizing: 'border-box' as const,
  };

  const iconContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22px',
    height: '22px',
    backgroundColor: actionType === 'upload' ? '#C6FFC1' : colors.reports.blue500, // Light green for upload, blue500 for others
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
      title={actionConfig.text} // Tooltip for full text if truncated
    >
      <span style={textStyles}>{actionConfig.text}</span>
      <div style={iconContainerStyles}>
        {actionConfig.icon}
      </div>
    </div>
  );
};

export default ActionCell;