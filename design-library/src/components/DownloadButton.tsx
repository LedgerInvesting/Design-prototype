import React, { useState, useRef, useEffect } from 'react';
import { typography, borderRadius, shadows, useSemanticColors } from '../tokens';
import { ChevronDownExtraSmall } from '../icons';

export interface DownloadOption {
  label: string;
  onClick: () => void;
}

export interface DownloadButtonProps {
  /** Download options to display in dropdown */
  options: DownloadOption[];
  /** Button text */
  text?: string;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  options,
  text = 'Download',
  className = '',
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const colors = useSemanticColors();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const buttonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 22px 8px 20px',
    height: '44px',
    width: 'fit-content',
    backgroundColor: colors.blackAndWhite.black900,
    border: 'none',
    borderRadius: borderRadius[4],
    cursor: 'pointer',
    fontFamily: typography.fontFamily.mono.join(', '),
    fontSize: '12px',
    fontWeight: typography.styles.bodyL.fontWeight,
    lineHeight: typography.styles.bodyL.lineHeight,
    letterSpacing: typography.letterSpacing.widest,
    textTransform: 'uppercase',
    color: colors.blackAndWhite.white,
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
    ...style,
  };

  const dividerStyles: React.CSSProperties = {
    width: '1px',
    height: '24px',
    backgroundColor: colors.blackAndWhite.black800,
    flexShrink: 0,
  };

  const chevronContainerStyles: React.CSSProperties = {
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
    display: 'flex',
    alignItems: 'center',
  };

  const dropdownStyles: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    right: 0,
    minWidth: '200px',
    width: 'fit-content',
    backgroundColor: colors.blackAndWhite.white,
    border: 'none',
    borderRadius: borderRadius[8],
    marginTop: '8px',
    zIndex: 1000,
    boxShadow: shadows.medium,
    padding: '10px',
  };

  const optionBaseStyles: React.CSSProperties = {
    padding: '12px 10px',
    cursor: 'pointer',
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black900,
    borderRadius: borderRadius[4],
    whiteSpace: 'nowrap',
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }} className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={buttonStyles}
        type="button"
      >
        <span>{text}</span>
        <div style={dividerStyles} />
        <div style={chevronContainerStyles}>
          <ChevronDownExtraSmall color={colors.theme.primary700} />
        </div>
      </button>

      {isOpen && (
        <div style={dropdownStyles}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
              style={optionBaseStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.theme.primary200;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
