import React, { useState, useRef, useEffect } from 'react';
import { colors, typography, borderRadius, spacing, shadows } from '../tokens';
import { ChevronDownExtraSmall, XExtraSmall } from '../icons';

export interface StatusProps {
  variant?: 'warning' | 'success' | 'error' | 'info' | 'inactive';
  size?: 'small' | 'medium' | 'large';
  text?: string;
  showDot?: boolean;
  showChevron?: boolean;
  options?: string[];
  onSelect?: (option: string) => void;
  disabled?: boolean;
  className?: string;
}

export const Status: React.FC<StatusProps> = ({
  variant = 'warning',
  size = 'small',
  text = 'Status',
  showDot = true,
  showChevron = true,
  options = ['Active', 'Inactive', 'Pending', 'Completed'],
  onSelect,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(text);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // Size configurations
  const sizeConfig = {
    small: {
      fontSize: typography.styles.bodyS.fontSize, // 10px
      lineHeight: typography.styles.bodyS.lineHeight, // 1.3
      padding: '0 5px', // 0 5px as per design spec
      gap: '3px', // 3px as per design
      dotSize: '6px', // 1.5 * 4 = 6px
      height: '20px', // Estimated from design
    },
    medium: {
      fontSize: typography.styles.bodyM.fontSize, // 12px
      lineHeight: typography.styles.bodyM.lineHeight, // 1.3
      padding: '0 6px', // 0 6px as per design spec
      gap: '3px', // 3px as per design
      dotSize: '6px',
      height: '24px',
    },
    large: {
      fontSize: typography.styles.bodyM.fontSize, // 12px
      lineHeight: typography.styles.bodyM.lineHeight, // 1.3
      padding: `${spacing[1]} ${spacing[2]}`, // 4px 8px
      gap: spacing[1], // 4px (5px in design, but using token)
      dotSize: '6px',
      height: '28px',
    },
  };

  // Color configurations based on design tokens
  const colorConfig = {
    warning: {
      background: colors.warning.fill, // #ffdd61
      text: colors.blackAndWhite.black900, // #17211b
      dot: colors.warning.dark, // #d5a701 - Warning Dark
      chevron: colors.blackAndWhite.black900,
    },
    success: {
      background: colors.success.fill, // #7fffb0
      text: colors.blackAndWhite.black900,
      dot: colors.success.textAndStrokes, // #2fa915
      chevron: colors.blackAndWhite.black900,
    },
    error: {
      background: colors.error.fill, // #ff8588
      text: colors.blackAndWhite.black900,
      dot: colors.error.textAndStrokes, // #db2d31
      chevron: colors.blackAndWhite.black900,
    },
    info: {
      background: colors.reports.blue500, // #e1f3ff
      text: colors.blackAndWhite.black900,
      dot: colors.reports.blue800, // #83c9ed (estimated)
      chevron: colors.blackAndWhite.black900,
    },
    inactive: {
      background: '#e9f3f7', // Custom light gray from design
      text: colors.blackAndWhite.black500, // #8b908d
      dot: colors.blackAndWhite.black500,
      chevron: colors.blackAndWhite.black500,
    },
  };

  const config = sizeConfig[size];
  const colorScheme = colorConfig[variant];

  const containerStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: config.gap,
    padding: config.padding,
    backgroundColor: colorScheme.background,
    borderRadius: borderRadius.absolute, // Fully rounded pill shape
    height: config.height,
    cursor: onSelect ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    fontFamily: typography.styles.bodyM.fontFamily.join(', '),
    fontSize: config.fontSize,
    fontWeight: typography.styles.bodyM.fontWeight,
    lineHeight: config.lineHeight,
    letterSpacing: typography.letterSpacing.wide, // 0px
    border: 'none',
    outline: 'none',
  };

  const dotStyles = {
    width: config.dotSize,
    height: config.dotSize,
    borderRadius: borderRadius.absolute,
    backgroundColor: colorScheme.dot,
    flexShrink: 0,
  };

  const textStyles = {
    color: colorScheme.text,
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
  };

  const handleClick = () => {
    if (disabled) return;
    if (onSelect) {
      setIsOpen(!isOpen);
    }
  };
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };
  
  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const content = (
    <>
      {/* Optional status dot */}
      {showDot && <div style={dotStyles} />}
      
      {/* Text */}
      <span style={textStyles}>{selectedOption}</span>
      
      {/* Optional chevron */}
      {showChevron && onSelect && (
        <ChevronDownExtraSmall 
          color={colorScheme.chevron} 
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
        />
      )}
    </>
  );

  const statusButton = onSelect ? (
    <button
      style={{
        ...containerStyles,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      onClick={handleClick}
      className={className}
      type="button"
      disabled={disabled}
    >
      {content}
    </button>
  ) : (
    <div
      style={containerStyles}
      className={className}
    >
      {content}
    </div>
  );
  
  if (onSelect) {
    return (
      <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
        {statusButton}
        
        {/* Dropdown Menu */}
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              zIndex: 1000,
              marginTop: '4px',
              backgroundColor: colors.blackAndWhite.white,
              borderRadius: '10px',
              boxShadow: shadows.lg,
              padding: '12px',
              minWidth: '140px',
              maxWidth: '200px'
            }}
          >
            {/* Close button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '8px'
              }}
            >
              <button
                onClick={handleCloseMenu}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <XExtraSmall color={colors.blackAndWhite.black900} />
              </button>
            </div>
            
            {/* Menu options */}
            {options.map((option, index) => (
              <StatusMenuItem
                key={index}
                text={option}
                isSelected={option === selectedOption}
                onClick={() => handleOptionSelect(option)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return statusButton;
};

// Status Menu Item Component
interface StatusMenuItemProps {
  text: string;
  isSelected?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const StatusMenuItem: React.FC<StatusMenuItemProps> = ({
  text,
  isSelected = false,
  onClick,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const itemStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '6px 10px',
    borderRadius: (isSelected || isHovered) ? borderRadius.absolute : '4px',
    backgroundColor: isSelected ? colors.reports.dynamic.blue300 : (isHovered && !disabled ? `${colors.reports.dynamic.blue200}80` : 'transparent'),
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '2px',
    opacity: disabled ? 0.4 : 1,
    fontFamily: typography.styles.bodyM.fontFamily.join(', '),
    fontSize: '12px',
    fontWeight: typography.styles.bodyM.fontWeight,
    lineHeight: '1.3',
    color: disabled ? colors.blackAndWhite.black300 : colors.blackAndWhite.black900,
    border: 'none',
    outline: 'none',
    width: '100%',
    textAlign: 'left' as const
  };
  
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };
  
  return (
    <button
      style={itemStyles}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Status;

// Keep backward compatibility
export const Chips = Status;