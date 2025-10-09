import React from 'react';
import { colors, typography, spacing, borderRadius, useSemanticColors } from '../tokens';
import { MarketplaceLogo, ReportsLogo, AnalyticsLogo, ContractsLogo } from '../icons';

export interface AppActionButtonProps {
  /** The app/product to show icon for */
  app: 'marketplace' | 'reports' | 'analytics' | 'contracts';
  /** The action text to display */
  actionText: string;
  /** Click handler */
  onClick?: () => void;
  /** Optional className */
  className?: string;
  /** Optional custom styles */
  style?: React.CSSProperties;
}

/**
 * AppActionButton - Displays an app icon with action text
 * Used in TopNav to show cross-app actions (e.g., "Review contract" with Contracts icon)
 *
 * @example
 * ```tsx
 * <AppActionButton
 *   app="contracts"
 *   actionText="Review contract"
 *   onClick={() => console.log('Navigate to contracts')}
 * />
 * ```
 */
export const AppActionButton: React.FC<AppActionButtonProps> = ({
  app,
  actionText,
  onClick,
  className,
  style,
}) => {
  const semanticColors = useSemanticColors();

  // Map app to icon component
  const getAppIcon = () => {
    switch (app) {
      case 'marketplace':
        return MarketplaceLogo;
      case 'reports':
        return ReportsLogo;
      case 'analytics':
        return AnalyticsLogo;
      case 'contracts':
        return ContractsLogo;
      default:
        return ReportsLogo;
    }
  };

  // Get app-specific color (700 shade)
  const getAppColor = () => {
    switch (app) {
      case 'marketplace':
        return colors.marketplace.violet700;
      case 'reports':
        return colors.reports.blue700;
      case 'analytics':
        return colors.analytics.green700;
      case 'contracts':
        return colors.contracts.yellow700;
      default:
        return colors.reports.blue700;
    }
  };

  const IconComponent = getAppIcon();
  const appColor = getAppColor();

  const buttonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: '5px 10px 5px 5px',
    backgroundColor: 'transparent',
    border: `1px solid ${semanticColors.theme.primary400}`,
    borderRadius: borderRadius[4],
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    ...style,
  };

  const iconBoxStyles: React.CSSProperties = {
    width: '20px',
    height: '20px',
    backgroundColor: colors.blackAndWhite.black900,
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const textStyles: React.CSSProperties = {
    ...typography.styles.bodyS,
    color: colors.blackAndWhite.black700,
    whiteSpace: 'nowrap',
  };

  return (
    <button
      className={className}
      style={buttonStyles}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = semanticColors.theme.primary300;
        e.currentTarget.style.borderColor = semanticColors.theme.primary400;
        e.currentTarget.style.boxShadow = `inset 0 0 0 2px ${colors.blackAndWhite.white}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.borderColor = semanticColors.theme.primary400;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={iconBoxStyles}>
        <IconComponent color={appColor} />
      </div>
      <span style={textStyles}>{actionText}</span>
    </button>
  );
};

export default AppActionButton;
