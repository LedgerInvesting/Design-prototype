import React from 'react';
import { borderRadius, shadows, typography, spacing, useSemanticColors } from '../tokens';
import { Button } from '../components';

export interface PageBannerProps {
  /** Main title text */
  title: string;
  /** Subtitle text below the title */
  subtitle: string;
  /** Source path for the left illustration image */
  illustrationSrc: string;
  /** Source path for the background pattern image */
  patternSrc: string;
  /** Text for the action button */
  buttonText: string;
  /** Click handler for the action button */
  onButtonClick: () => void;
  /** Optional icon for the button */
  buttonIcon?: React.ReactNode;
  /** Maximum width for text content (e.g., '450px') */
  maxTextWidth?: string;
  /** Alternative illustration alt text */
  illustrationAlt?: string;
  /** Custom button variant */
  buttonVariant?: 'primary' | 'small' | 'icon' | 'tertiary' | 'secondary';
  /** Custom button color */
  buttonColor?: 'black' | 'white' | 'main' | 'light' | 'green' | 'primary200';
}

/**
 * PageBanner Component
 *
 * Standardized banner layout used across Reports, Analytics, Marketplace, and Contracts pages.
 * Features theme-aware styling, consistent layout structure, and configurable content.
 *
 * Common usage pattern:
 * - Left side: Illustration (150x150px) + Title/Subtitle text (black900)
 * - Right side: Action button in white container
 * - Background: Theme primary700 color with 500-variant pattern overlay
 *
 * @example
 * ```tsx
 * <PageBanner
 *   title="Transaction Management"
 *   subtitle="Manage your reinsurance transactions and workflow progress"
 *   illustrationSrc="/transaction header icon.png"
 *   patternSrc="/pattern_reports.svg"
 *   buttonText="New Transaction"
 *   buttonIcon={<span style={{ color: colors.theme.primary700 }}>+</span>}
 *   onButtonClick={() => console.log('New transaction')}
 * />
 * ```
 */
export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  illustrationSrc,
  patternSrc,
  buttonText,
  onButtonClick,
  buttonIcon,
  maxTextWidth,
  illustrationAlt,
  buttonVariant = 'primary',
  buttonColor = 'black',
}) => {
  const colors = useSemanticColors();

  const headerStyles: React.CSSProperties = {
    backgroundColor: colors.theme.primary700,
    padding: `0 ${spacing[10]}`,  // 0 2.5rem (40px)
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius[16],
    height: '250px',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    backgroundImage: `url('${patternSrc}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top right',
    backgroundSize: '33%',
    boxShadow: shadows.base,
  };

  const leftContentStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[10],  // 2.5rem (40px)
    position: 'relative',
    zIndex: 1,
  };

  const illustrationContainerStyles: React.CSSProperties = {
    width: '150px',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textContentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],  // 0.5rem (8px)
    ...(maxTextWidth && { maxWidth: maxTextWidth }),
  };

  const titleStyles: React.CSSProperties = {
    ...typography.styles.headlineH2,
    fontSize: '2.25rem',  // 36px
    color: colors.blackAndWhite.black900,
    margin: 0,
  };

  const subtitleStyles: React.CSSProperties = {
    ...typography.styles.bodyL,
    color: colors.blackAndWhite.black900,
    margin: 0,
    opacity: 0.9,
  };

  const buttonContainerStyles: React.CSSProperties = {
    backgroundColor: colors.blackAndWhite.white,
    padding: spacing[3],  // 0.75rem (12px) - closest to 10px
    borderRadius: borderRadius[8], // Changed from 16 to 8px
    boxShadow: shadows.base,
    width: '260px',
    display: 'flex',
    gap: '0',
  };

  return (
    <div style={headerStyles}>
      <div style={leftContentStyles}>
        <div style={illustrationContainerStyles}>
          <img
            src={illustrationSrc}
            alt={illustrationAlt || title.toLowerCase()}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
        <div style={textContentStyles}>
          <h1 style={titleStyles}>{title}</h1>
          <p style={subtitleStyles}>{subtitle}</p>
        </div>
      </div>

      <div style={buttonContainerStyles}>
        <Button
          variant={buttonVariant}
          color={buttonColor}
          onClick={onButtonClick}
          icon={buttonIcon}
          style={{ width: '100%' }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PageBanner;