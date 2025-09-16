import React, { useState } from 'react';
import { typography, borderRadius, shadows, useSemanticColors, colors as staticColors } from '../tokens';
import { CheckSmall, UploadSmall, ConfigSmall, CalculatorSmall } from '../icons';

export type ActionType = 'upload' | 'validate' | 'generate' | 'setup';

interface ActionConfig {
  icon: React.ReactNode;
  text: string;
}

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
  const colors = useSemanticColors();
  
  const actionConfigs: Record<ActionType, ActionConfig> = {
    upload: {
      icon: <UploadSmall color={colors.success.textAndStrokes} />,
      text: 'Upload'
    },
    validate: {
      icon: <CheckSmall color={colors.theme.main} />,
      text: 'Validate'
    },
    generate: {
      icon: <CalculatorSmall color={colors.theme.main} />,
      text: 'Generate'
    },
    setup: {
      icon: <ConfigSmall color={colors.theme.main} />,
      text: 'Setup'
    }
  };
  
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
    backgroundColor: isHovered ? colors.theme.primary200 : colors.blackAndWhite.white, // White background, theme primary200 on hover
    border: `1px solid ${colors.theme.primary400}`, // Use theme primary400 stroke color
    boxShadow: shadows.small, // Small shadow
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    height: '32px', // Fill more of the cell height (cell is ~45px, padding is 6px top/bottom = 33px available)
    width: '100%',
    boxSizing: 'border-box' as const,
  };

  const iconContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22px',
    height: '22px',
    backgroundColor: actionType === 'upload' ? '#C6FFC1' : staticColors.reports.blue500, // Light green for upload, blue500 for others
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