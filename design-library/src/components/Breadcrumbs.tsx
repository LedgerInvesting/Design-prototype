import React from 'react';
import { colors, typography, spacing, borderRadius } from '../tokens';
import { ChevronRightExtraSmall } from '../icons';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  /**
   * Array of breadcrumb items. Last item is automatically treated as current page.
   */
  items: BreadcrumbItem[];
}

const APP_NAMES = ['Reports', 'Analytics', 'Marketplace', 'Contracts'];

/**
 * Breadcrumbs component for navigation hierarchy
 *
 * Rules:
 * - Hides ONLY app name (Reports, Analytics, Marketplace, Contracts) from first item
 * - Shows all other breadcrumbs including main page name
 * - Last item (current page) is black500 and not clickable
 * - Other items are black900 and clickable with hover state
 * - Uses chevron separator between items
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
}) => {
  // Filter out only the app name (Reports, Analytics, Marketplace, Contracts)
  const displayItems = items.filter(item => !APP_NAMES.includes(item.label));

  const breadcrumbItemStyles: React.CSSProperties = {
    ...typography.styles.navM,
    color: colors.blackAndWhite.black900,
    textDecoration: 'none',
    padding: `${spacing[2]} ${spacing[3]}`,
    borderRadius: borderRadius[8],
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.15s ease',
  };

  const activeBreadcrumbStyles: React.CSSProperties = {
    ...breadcrumbItemStyles,
    color: colors.blackAndWhite.black500,
    cursor: 'default',
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
  };

  return (
    <div style={containerStyles}>
      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1;

        return (
          <React.Fragment key={index}>
            {isLast ? (
              // Current page - not clickable, black500
              <span style={activeBreadcrumbStyles}>
                {item.label}
              </span>
            ) : (
              // Clickable breadcrumb - black900 with hover
              <a
                href={item.path || '#'}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                style={breadcrumbItemStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.blackAndWhite.black900;
                  e.currentTarget.style.backgroundColor = colors.blackAndWhite.black50;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.blackAndWhite.black900;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {item.label}
              </a>
            )}
            {!isLast && <ChevronRightExtraSmall color={colors.blackAndWhite.black300} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};
