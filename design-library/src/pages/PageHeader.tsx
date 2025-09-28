import React from 'react';
import { typography, useSemanticColors } from '../tokens';

export interface PageHeaderProps {
  /** Main title content - can be string or JSX for complex titles */
  title: string | React.ReactNode;
  /** Optional subtitle text below the title */
  subtitle?: string;
  /** Array of action elements (buttons, etc.) displayed on the right */
  actions: React.ReactNode[];
  /** Spacing variant for bottom margin */
  spacing?: 'normal' | 'compact';
  /** Custom styles for the header container */
  style?: React.CSSProperties;
  /** Custom styles for the title section */
  titleStyle?: React.CSSProperties;
  /** Custom styles for the actions section */
  actionsStyle?: React.CSSProperties;
}

/**
 * PageHeader Component
 *
 * Standardized header layout for pages that need title + action button(s).
 * Provides consistent spacing, typography, and responsive behavior.
 *
 * Common usage pattern:
 * - Left side: Title (with optional subtitle)
 * - Right side: Action buttons
 * - Flexible layout that adapts to content width
 *
 * @example
 * ```tsx
 * // Simple title with single action
 * <PageHeader
 *   title="Valuation Dashboard"
 *   actions={[
 *     <Button variant="primary" color="white" onClick={handleEdit}>
 *       Edit Configuration
 *     </Button>
 *   ]}
 * />
 *
 * // Complex title with multiple actions
 * <PageHeader
 *   title={
 *     <span>
 *       Program ABC. <span style={{ color: colors.blackAndWhite.black500 }}>
 *         Valuation dashboard
 *       </span>
 *     </span>
 *   }
 *   actions={[
 *     <Button variant="small" color="white" onClick={handleCancel}>Cancel</Button>,
 *     <Button variant="primary" color="main" onClick={handleSave}>Save</Button>
 *   ]}
 * />
 * ```
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  spacing = 'normal',
  style,
  titleStyle,
  actionsStyle,
}) => {
  const colors = useSemanticColors();

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing === 'normal' ? '40px' : '20px',
    flexWrap: 'nowrap',
    gap: '20px',
    ...style,
  };

  const titleSectionStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
    minWidth: 0, // Allow text to truncate if needed
    ...titleStyle,
  };

  const titleStyles: React.CSSProperties = {
    ...typography.styles.headlineH2,
    color: colors.blackAndWhite.black900,
    margin: 0,
    lineHeight: 1.2,
  };

  const subtitleStyles: React.CSSProperties = {
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black500,
    margin: 0,
  };

  const actionsContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    flexShrink: 0,
    ...actionsStyle,
  };

  return (
    <div style={headerStyles}>
      <div style={titleSectionStyles}>
        {typeof title === 'string' ? (
          <h1 style={titleStyles}>{title}</h1>
        ) : (
          <h1 style={titleStyles}>{title}</h1>
        )}
        {subtitle && (
          <p style={subtitleStyles}>{subtitle}</p>
        )}
      </div>

      {actions.length > 0 && (
        <div style={actionsContainerStyles}>
          {actions.map((action, index) => (
            <React.Fragment key={index}>
              {action}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageHeader;