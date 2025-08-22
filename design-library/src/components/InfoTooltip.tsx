import React, { useState } from 'react';
import { colors, borderRadius, typography, shadows } from '../tokens';

export interface InfoTooltipSection {
  /** Section title */
  title: string;
  /** Section description */
  description: string;
}

export interface InfoTooltipProps {
  /** Tooltip text content (simple text) */
  text?: string;
  /** Tooltip sections for complex content */
  sections?: InfoTooltipSection[];
  /** Tooltip position relative to the trigger */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-right';
  /** Additional CSS class for the container */
  className?: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  text,
  sections,
  position = 'bottom-right',
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);



  // Tooltip styles
  const getTooltipStyles = () => {
    const baseStyles = {
      position: 'absolute' as const,
      backgroundColor: colors.blackAndWhite.black900,
      color: colors.blackAndWhite.white,
      padding: sections ? '18px 20px' : '8px 12px',
      borderRadius: borderRadius[12],
      boxShadow: shadows.lg,
      zIndex: 1000,
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' as const : 'hidden' as const,
      transition: 'opacity 0.2s ease, visibility 0.2s ease',
      minWidth: sections ? '250px' : '150px',
      maxWidth: sections ? '250px' : '150px',
      whiteSpace: sections ? 'normal' as const : 'normal' as const,
    };

    // Position-specific styles
    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
        };
      case 'bottom':
        return {
          ...baseStyles,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px',
        };
      case 'left':
        return {
          ...baseStyles,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px',
        };
      case 'right':
        return {
          ...baseStyles,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px',
        };
      case 'bottom-right':
        return {
          ...baseStyles,
          top: '100%',
          left: '0',
          marginTop: '8px',
        };
      default:
        return baseStyles;
    }
  };

  const tooltipStyles = getTooltipStyles();

  // Render tooltip content
  const renderTooltipContent = () => {
    if (sections) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {sections.map((section, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  fontFamily: typography.styles.captionS.fontFamily.join(', '),
                  fontSize: typography.styles.captionS.fontSize,
                  fontWeight: typography.styles.captionS.fontWeight,
                  fontStyle: typography.styles.captionS.fontStyle,
                  lineHeight: typography.styles.captionS.lineHeight,
                  letterSpacing: '-0.5px',
                  color: colors.blackAndWhite.white,
                }}
              >
                {section.title}
              </div>
              {/* Separator line */}
              <div
                style={{
                  height: '1px',
                  backgroundColor: colors.blackAndWhite.black700,
                  width: '100%',
                  margin: '0',
                }}
              />
              <div
                style={{
                  fontFamily: typography.styles.bodyS.fontFamily.join(', '),
                  fontSize: typography.styles.bodyS.fontSize,
                  fontWeight: typography.styles.bodyS.fontWeight,
                  lineHeight: typography.styles.bodyS.lineHeight,
                  letterSpacing: '0px',
                  color: colors.blackAndWhite.white,
                }}
              >
                {section.description}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        style={{
          fontSize: typography.styles.bodyS.fontSize,
          fontFamily: typography.styles.bodyS.fontFamily.join(', '),
          lineHeight: typography.styles.bodyS.lineHeight,
        }}
      >
        {text}
      </div>
    );
  };

  // Info icon SVG component
  const InfoIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.6" y="0.6" width="16.8" height="16.8" rx="8.4" fill="white"/>
      <rect x="0.6" y="0.6" width="16.8" height="16.8" rx="8.4" stroke="#E3F0F4" strokeWidth="1.2"/>
      <path d="M9.71609 5.95599C9.42809 5.95599 9.19609 5.86799 9.02009 5.69199C8.85209 5.50799 8.76809 5.27599 8.76809 4.99599C8.76809 4.84399 8.79609 4.70399 8.85209 4.57599C8.91609 4.43999 9.00009 4.32399 9.10409 4.22799C9.20809 4.12399 9.32809 4.04399 9.46409 3.98799C9.60009 3.93199 9.74009 3.90399 9.88409 3.90399C10.1721 3.90399 10.4001 3.99199 10.5681 4.16799C10.7441 4.34399 10.8321 4.57199 10.8321 4.85199C10.8321 5.00399 10.8001 5.14799 10.7361 5.28399C10.6801 5.41999 10.6001 5.53999 10.4961 5.64399C10.3921 5.73999 10.2721 5.81599 10.1361 5.87199C10.0001 5.92799 9.86009 5.95599 9.71609 5.95599ZM8.01209 13C7.72409 13 7.50809 12.92 7.36409 12.76C7.22809 12.592 7.16009 12.392 7.16009 12.16C7.16009 12.008 7.20409 11.808 7.29209 11.56L8.24009 8.91999C8.29609 8.75199 8.32409 8.63199 8.32409 8.55999C8.32409 8.42399 8.25209 8.35599 8.10809 8.35599C8.01209 8.35599 7.90409 8.40799 7.78409 8.51199C7.67209 8.60799 7.52009 8.77999 7.32809 9.02799L6.95609 8.78799C7.07609 8.58799 7.21609 8.37599 7.37609 8.15199C7.54409 7.92799 7.72409 7.72399 7.91609 7.53999C8.11609 7.34799 8.32409 7.19199 8.54009 7.07199C8.75609 6.94399 8.96809 6.87999 9.17609 6.87999C9.44009 6.87999 9.63609 6.94799 9.76409 7.08399C9.89209 7.21999 9.95609 7.39199 9.95609 7.59999C9.95609 7.73599 9.92009 7.91599 9.84809 8.13999L8.90009 11.14C8.88409 11.18 8.87209 11.22 8.86409 11.26C8.85609 11.292 8.85209 11.328 8.85209 11.368C8.85209 11.52 8.93209 11.596 9.09209 11.596C9.25209 11.596 9.41609 11.52 9.58409 11.368C9.75209 11.208 9.90409 11.004 10.0401 10.756L10.4241 11.02C10.2881 11.284 10.1321 11.536 9.95609 11.776C9.78009 12.016 9.58809 12.228 9.38009 12.412C9.18009 12.588 8.96409 12.728 8.73209 12.832C8.50009 12.944 8.26009 13 8.01209 13Z" fill="#17211B"/>
    </svg>
  );

  return (
    <div
      className={className}
      style={{ position: 'relative', display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      role="button"
      aria-label={`Info: ${text || sections?.map(s => s.title).join(', ')}`}
    >
      <InfoIcon />
      <div style={tooltipStyles}>
        {renderTooltipContent()}
      </div>
    </div>
  );
};

export default InfoTooltip;