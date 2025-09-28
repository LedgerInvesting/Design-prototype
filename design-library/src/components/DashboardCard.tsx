import React from 'react';
import { borderRadius, typography, useSemanticColors } from '../tokens';
import { Button } from './Button';

export interface DashboardCardProps {
  /** Card title displayed in the header */
  title: string;
  /** Optional icon to display next to the title */
  icon?: React.ReactNode;
  /** Whether to show the icon (default: true) */
  showIcon?: boolean;
  /** Optional button in the header */
  button?: {
    text: string;
    onClick: () => void;
  };
  /** Whether to show the button (default: true) */
  showButton?: boolean;
  /** Card content */
  children: React.ReactNode;
  /** Card width - '50%' or '100%' (default: '50%') */
  width?: '50%' | '100%';
  /** Optional click handler for the entire card */
  onClick?: () => void;
  /** Additional styles for the card container */
  style?: React.CSSProperties;
  /** Additional styles for the body content */
  bodyStyle?: React.CSSProperties;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  showIcon = true,
  button,
  showButton = true,
  children,
  width = '50%',
  onClick,
  style,
  bodyStyle,
}) => {
  const colors = useSemanticColors();

  const cardStyles: React.CSSProperties = {
    backgroundColor: colors.blackAndWhite.white,
    borderRadius: borderRadius[12],
    border: `1px solid ${colors.theme.primary400}`,
    width: width,
    flex: width === '50%' ? '1' : 'none',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  const headerStyles: React.CSSProperties = {
    padding: '16px 30px',
    borderBottom: `1px solid ${colors.theme.primary400}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '56px', // Fixed height to prevent shrinking when button is hidden
  };

  const titleSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const titleStyles: React.CSSProperties = {
    ...typography.styles.bodyL,
    color: colors.blackAndWhite.black900,
  };


  const bodyStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    ...bodyStyle,
  };

  return (
    <div style={cardStyles} onClick={onClick}>
      {/* Header */}
      <div style={headerStyles}>
        <div style={titleSectionStyles}>
          {showIcon && icon && icon}
          <div style={titleStyles}>
            {title}
          </div>
        </div>
        {showButton && button && (
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when button is clicked
              button.onClick();
            }}
          >
            {button.text}
          </Button>
        )}
      </div>

      {/* Body */}
      <div style={bodyStyles}>
        {children}
      </div>
    </div>
  );
};