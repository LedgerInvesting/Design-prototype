import React, { useState } from 'react';
import { borderRadius, typography, useSemanticColors } from '../tokens';
import { Button } from './Button';
import { MenuDropdown } from './MenuDropdown';
import type { DropdownOption } from './MenuDropdown';

export interface DashboardCardAction {
  /** Type of action button */
  type: 'text' | 'icon';
  /** Button label (for text buttons) */
  label?: string;
  /** Icon component (for icon buttons) */
  icon?: React.ReactNode;
  /** Click handler */
  onClick: () => void;
  /** Button variant (optional) */
  variant?: 'primary' | 'small' | 'icon' | 'secondary';
  /** Button color (optional) */
  color?: string;
}

export interface DashboardCardDropdown {
  /** Dropdown options */
  options: DropdownOption[];
  /** Currently selected value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
}

export interface DashboardCardProps {
  /** Card title displayed in the header (use either title or titleDropdown) */
  title?: string;
  /** Dropdown selector instead of title (for switching views/graphs) */
  titleDropdown?: DashboardCardDropdown;
  /** Optional icon to display next to the title */
  icon?: React.ReactNode;
  /** Whether to show the icon (default: true) */
  showIcon?: boolean;
  /** Optional button in the header (legacy - use actions instead) */
  button?: {
    text: string;
    onClick: () => void;
  };
  /** Whether to show the button (default: true) */
  showButton?: boolean;
  /** Action buttons (1-3 buttons, can be text or icon) */
  actions?: DashboardCardAction[];
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
  titleDropdown,
  icon,
  showIcon = true,
  button,
  showButton = true,
  actions,
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

  const actionsContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const renderActions = () => {
    // Use new actions prop if provided
    if (actions && actions.length > 0) {
      return (
        <div style={actionsContainerStyles}>
          {actions.map((action, index) => {
            if (action.type === 'icon') {
              return (
                <Button
                  key={index}
                  variant="icon"
                  color={action.color || 'primary200'}
                  icon={action.icon}
                  onClick={(e) => {
                    e?.stopPropagation?.(); // Prevent card click
                    action.onClick();
                  }}
                  shape="circle"
                />
              );
            } else {
              // Text button
              return (
                <Button
                  key={index}
                  variant={action.variant || 'secondary'}
                  onClick={(e) => {
                    e?.stopPropagation?.(); // Prevent card click
                    action.onClick();
                  }}
                >
                  {action.label}
                </Button>
              );
            }
          })}
        </div>
      );
    }

    // Fallback to legacy button prop
    if (showButton && button) {
      return (
        <Button
          variant="secondary"
          onClick={(e) => {
            e?.stopPropagation?.(); // Prevent card click when button is clicked
            button.onClick();
          }}
        >
          {button.text}
        </Button>
      );
    }

    return null;
  };

  const renderTitle = () => {
    // If titleDropdown is provided, render dropdown instead of title
    if (titleDropdown) {
      return (
        <MenuDropdown
          options={titleDropdown.options}
          value={titleDropdown.value}
          onChange={titleDropdown.onChange}
          placeholder={titleDropdown.placeholder}
          selectedPrefix=""
          dropdownListMinWidth="400px"
        />
      );
    }

    // Otherwise render regular title
    return (
      <div style={titleStyles}>
        {title}
      </div>
    );
  };

  return (
    <div style={cardStyles} onClick={onClick}>
      {/* Header */}
      <div style={headerStyles}>
        <div style={titleSectionStyles}>
          {showIcon && icon && icon}
          {renderTitle()}
        </div>
        {renderActions()}
      </div>

      {/* Body */}
      <div style={bodyStyles}>
        {children}
      </div>
    </div>
  );
};