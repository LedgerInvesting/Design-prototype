import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { typography, borderRadius, shadows, useSemanticColors, colors as staticColors } from '../tokens';
import { CheckSmall, UploadSmall, ConfigSmall, CalculatorSmall, DownloadSmall, AddSmall, PlaySmall } from '../icons';

export type ActionType = 'upload' | 'validate' | 'generate' | 'setup' | 'download' | 'add-data' | 'run-valuation' | 'open' | 'custom';

interface ActionConfig {
  icon: React.ReactNode;
  text: string;
}

export interface SecondaryAction {
  label: string;
  onClick: () => void;
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
  // Secondary actions menu
  showSecondaryMenu?: boolean;
  secondaryActions?: SecondaryAction[];
}

export const ActionCell: React.FC<ActionCellProps> = ({
  actionType = 'custom',
  onClick,
  className = '',
  icon: customIcon,
  text: customText,
  iconBackgroundColor: customIconBg,
  iconColor: customIconColor,
  showSecondaryMenu = false,
  secondaryActions = [],
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const dotsRef = useRef<HTMLDivElement>(null);
  const colors = useSemanticColors();

  // Update menu position when it opens
  useEffect(() => {
    if (isMenuOpen && dotsRef.current) {
      const rect = dotsRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.right - 180 // Align right edge of menu with right edge of dots
      });
    }
  }, [isMenuOpen]);

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
    'open': {
      icon: <PlaySmall color={colors.success.textAndStrokes} />,
      text: 'Open'
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
    flex: 1, // Take available space
    boxSizing: 'border-box' as const,
  };

  // Determine icon background color
  const getIconBackgroundColor = () => {
    if (customIconBg) return customIconBg;
    if (actionType === 'upload' || actionType === 'add-data' || actionType === 'run-valuation' || actionType === 'open') {
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

  const handleSecondaryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const threeDotStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22px',
    height: '22px',
    cursor: 'pointer',
    flexShrink: 0,
  };

  const dotStyles = {
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    backgroundColor: colors.blackAndWhite.black900,
    margin: '0 1px',
  };

  const menuStyles: React.CSSProperties = {
    position: 'fixed' as const,
    top: `${menuPosition.top}px`,
    left: `${menuPosition.left}px`,
    backgroundColor: colors.blackAndWhite.white,
    border: 'none',
    borderRadius: borderRadius[8],
    boxShadow: shadows.medium,
    zIndex: 10000,
    minWidth: '180px',
    padding: '10px',
  };

  const menuItemStyles = {
    padding: '12px 10px',
    cursor: 'pointer',
    borderRadius: borderRadius[4],
    fontFamily: typography.styles.bodyM.fontFamily.join(', '),
    fontSize: typography.styles.bodyM.fontSize,
    fontWeight: typography.styles.bodyM.fontWeight,
    lineHeight: typography.styles.bodyM.lineHeight,
    color: colors.blackAndWhite.black900,
    transition: 'background-color 0.2s ease',
  };

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', gap: '8px' }}>
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

      {/* 3-dot menu button - outside main button */}
      {showSecondaryMenu && (
        <div
          ref={dotsRef}
          style={threeDotStyles}
          onClick={handleSecondaryClick}
          role="button"
          tabIndex={0}
        >
          <div style={dotStyles} />
          <div style={dotStyles} />
          <div style={dotStyles} />
        </div>
      )}

      {/* Dropdown menu - rendered in portal */}
      {isMenuOpen && showSecondaryMenu && typeof document !== 'undefined' && createPortal(
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
            }}
            onClick={() => setIsMenuOpen(false)}
          />
          <div style={menuStyles}>
            {secondaryActions.map((action, index) => (
              <div
                key={index}
                style={menuItemStyles}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                  setIsMenuOpen(false);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.theme.primary200;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {action.label}
              </div>
            ))}
          </div>
        </>,
        document.body
      )}
    </div>
  );
};

export default ActionCell;