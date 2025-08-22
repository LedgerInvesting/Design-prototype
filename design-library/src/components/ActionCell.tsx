import React, { useState } from 'react';
import { colors, typography, borderRadius, shadows } from '../tokens';
import { EditSmall, AddSmall, PlusSmall } from '../icons';

export type ActionIcon = 'edit' | 'add' | 'plus';

export interface ActionCellProps {
  text: string;
  icon?: ActionIcon;
  onClick?: (text: string) => void;
  className?: string;
}

export const ActionCell: React.FC<ActionCellProps> = ({
  text,
  icon = 'edit',
  onClick,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(text);
    }
  };

  const renderIcon = () => {
    const iconColor = colors.blackAndWhite.black700;
    switch (icon) {
      case 'add':
        return <AddSmall color={iconColor} />;
      case 'plus':
        return <PlusSmall color={iconColor} />;
      case 'edit':
      default:
        return <EditSmall color={iconColor} />;
    }
  };

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px', // Space between text and icon
    padding: '8px 12px',
    borderRadius: borderRadius[4],
    backgroundColor: isHovered ? colors.reports.dynamic.blue300 : 'transparent', // Blue300 on hover, transparent default
    border: isHovered ? 'none' : `1px solid ${colors.reports.dynamic.blue400}`, // Blue400 border default, none on hover
    boxShadow: isHovered ? 'none' : shadows.sm, // Small shadow default, none on hover
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '32px',
    width: '100%',
    boxSizing: 'border-box' as const,
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
      title={text} // Tooltip for full text if truncated
    >
      <span style={textStyles}>{text}</span>
      {renderIcon()}
    </div>
  );
};

export default ActionCell;