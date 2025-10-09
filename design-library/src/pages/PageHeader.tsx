import React from 'react';
import { typography, useSemanticColors } from '../tokens';
import { Button } from '../components/Button';

export interface TitlePart {
  text: string;
  /** If true, renders in black900 (important). If false, renders in black500 (not important) */
  important?: boolean;
}

export interface PageHeaderProps {
  /** Main title content - can be string, array of TitlePart objects, or JSX for complex titles */
  title: string | TitlePart[] | React.ReactNode;
  /** Optional subtitle text below the title */
  subtitle?: string;
  /** Array of action elements (buttons, etc.) displayed on the right */
  actions?: React.ReactNode[];
  /** Primary action button text - renders as black variant */
  primaryAction?: {
    label: string;
    onClick: () => void;
  } | false;
  /** Secondary action button text - renders as white no-border variant */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  } | false;
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
 * // Simple title with primary action
 * <PageHeader
 *   title="Valuation Dashboard"
 *   primaryAction={{ label: 'Edit Configuration', onClick: handleEdit }}
 * />
 *
 * // Two-color title pattern (important/not important)
 * <PageHeader
 *   title={[
 *     { text: 'You are now viewing the ', important: false },
 *     { text: 'Program ABC', important: true },
 *     { text: ' valuation dashboard', important: false }
 *   ]}
 *   primaryAction={{ label: 'Save', onClick: handleSave }}
 *   secondaryAction={{ label: 'Cancel', onClick: handleCancel }}
 * />
 *
 * // Custom JSX title
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
 *     <Button variant="primary" color="black" onClick={handleSave}>Save</Button>
 *   ]}
 * />
 * ```
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  primaryAction,
  secondaryAction,
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

  // Render title based on type
  const renderTitle = () => {
    if (typeof title === 'string') {
      return <h1 style={titleStyles}>{title}</h1>;
    } else if (Array.isArray(title)) {
      // Two-color title pattern
      return (
        <h1 style={titleStyles}>
          {title.map((part, index) => (
            <span
              key={index}
              style={{
                color: part.important !== false ? colors.blackAndWhite.black900 : colors.blackAndWhite.black500
              }}
            >
              {part.text}
            </span>
          ))}
        </h1>
      );
    } else {
      // JSX title
      return <h1 style={titleStyles}>{title}</h1>;
    }
  };

  // Render actions (either custom actions or primary/secondary buttons)
  const renderActions = () => {
    const hasCustomActions = actions && actions.length > 0;
    const hasButtonActions = (primaryAction && primaryAction !== false) || (secondaryAction && secondaryAction !== false);

    if (!hasCustomActions && !hasButtonActions) {
      return null;
    }

    return (
      <div style={actionsContainerStyles}>
        {/* Secondary button comes first (left) */}
        {secondaryAction && secondaryAction !== false && (
          <Button
            variant="primary"
            color="white"
            onClick={secondaryAction.onClick}
            showIcon={false}
            style={{ border: 'none', height: '44px' }}
          >
            {secondaryAction.label}
          </Button>
        )}

        {/* Primary button comes second (right) */}
        {primaryAction && primaryAction !== false && (
          <Button
            variant="primary"
            color="black"
            onClick={primaryAction.onClick}
            style={{ height: '44px' }}
          >
            {primaryAction.label}
          </Button>
        )}

        {/* Custom actions */}
        {hasCustomActions && actions!.map((action, index) => (
          <React.Fragment key={index}>
            {action}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Check if we have any actions
  const hasCustomActions = actions && actions.length > 0;
  const hasButtonActions = (primaryAction && primaryAction !== false) || (secondaryAction && secondaryAction !== false);
  const hasActions = hasCustomActions || hasButtonActions;

  return (
    <div style={headerStyles}>
      <div style={{
        ...titleSectionStyles,
        width: hasActions ? undefined : '80%'
      }}>
        {renderTitle()}
        {subtitle && (
          <p style={subtitleStyles}>{subtitle}</p>
        )}
      </div>

      {renderActions()}
    </div>
  );
};

export default PageHeader;