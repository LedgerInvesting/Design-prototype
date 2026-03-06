import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  /** Custom content for the tooltip */
  children?: React.ReactNode;
  /** Tooltip position relative to the trigger */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-right' | 'follow-mouse';
  /** Additional CSS class for the container */
  className?: string;
  /** Custom easing factor for follow-mouse mode (0.01-0.5, default: 0.15) */
  easingFactor?: number;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  text,
  sections,
  children,
  position = 'bottom-right',
  className,
  easingFactor = 0.15,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // This function is no longer needed as we handle transforms in each position case
  // const getPositionTransform = (pos: string) => { ... }

  // Mouse-following animation effect
  useEffect(() => {
    if (!isVisible || position !== 'follow-mouse') return;

    const animatePosition = () => {
      setMousePosition(current => {
        const dx = targetPosition.x - current.x;
        const dy = targetPosition.y - current.y;

        return {
          x: current.x + (dx * easingFactor),
          y: current.y + (dy * easingFactor)
        };
      });
    };

    const animationFrame = requestAnimationFrame(animatePosition);
    const interval = setInterval(animatePosition, 16); // ~60fps

    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(interval);
    };
  }, [targetPosition, isVisible, position, easingFactor]);

  // Calculate tooltip position relative to viewport
  const getTooltipStyles = () => {
    // Determine padding based on content type
    const getPadding = () => {
      if (children) return '15px'; // Custom content gets medium padding
      if (sections) return '18px 20px'; // Complex content gets large padding
      return '8px 12px'; // Simple text gets small padding
    };

    // Determine size constraints based on content type
    const getSizeConstraints = () => {
      if (children) {
        return {
          minWidth: '200px',
          maxWidth: '400px',
        };
      }
      if (sections) {
        return {
          minWidth: '250px',
          maxWidth: '250px',
        };
      }
      return {
        minWidth: '200px',
        maxWidth: '200px',
      };
    };

    const baseStyles = {
      position: 'fixed' as const, // Always use fixed positioning for portal
      backgroundColor: colors.blackAndWhite.black900,
      color: colors.blackAndWhite.white,
      padding: getPadding(),
      borderRadius: borderRadius[12],
      boxShadow: shadows.large,
      zIndex: 1000,
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' as const : 'hidden' as const,
      transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      whiteSpace: 'normal' as const,
      pointerEvents: 'none' as const, // Prevent tooltip from interfering with mouse events
      ...getSizeConstraints(),
    };

    if (!triggerRect) {
      return {
        ...baseStyles,
        top: '0px',
        left: '0px',
        transform: `${isVisible ? 'scale(1)' : 'scale(0.95)'}`,
      };
    }

    // Position-specific styles based on trigger element's viewport position
    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          top: `${triggerRect.top - 8}px`,
          left: `${triggerRect.left + triggerRect.width / 2}px`,
          transform: `translateX(-50%) translateY(-100%) ${isVisible ? 'scale(1)' : 'scale(0.95)'}`,
        };
      case 'bottom':
        return {
          ...baseStyles,
          top: `${triggerRect.bottom + 8}px`,
          left: `${triggerRect.left + triggerRect.width / 2}px`,
          transform: `translateX(-50%) ${isVisible ? 'scale(1)' : 'scale(0.95)'}`,
        };
      case 'left':
        return {
          ...baseStyles,
          top: `${triggerRect.top + triggerRect.height / 2}px`,
          left: `${triggerRect.left - 8}px`,
          transform: `translateX(-100%) translateY(-50%) ${isVisible ? 'scale(1)' : 'scale(0.95)'}`,
        };
      case 'right':
        return {
          ...baseStyles,
          top: `${triggerRect.top + triggerRect.height / 2}px`,
          left: `${triggerRect.right + 8}px`,
          transform: `translateY(-50%) ${isVisible ? 'scale(1)' : 'scale(0.95)'}`,
        };
      case 'follow-mouse':
        return {
          ...baseStyles,
          left: `${mousePosition.x + 10}px`,
          top: `${mousePosition.y + 10}px`,
          transform: `${isVisible ? 'scale(1)' : 'scale(0.95)'}`,
        };
      case 'bottom-right':
        return {
          ...baseStyles,
          top: `${triggerRect.bottom + 8}px`,
          left: `${triggerRect.left}px`,
          transform: `${isVisible ? 'scale(1)' : 'scale(0.95)'}`,
        };
      default:
        return baseStyles;
    }
  };

  const tooltipStyles = getTooltipStyles();

  // Render tooltip content
  const renderTooltipContent = () => {
    // Priority: children > sections > text
    if (children) {
      return children;
    }

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

  // Update trigger position when tooltip becomes visible
  useEffect(() => {
    if (isVisible && triggerRef.current && position !== 'follow-mouse') {
      const rect = triggerRef.current.getBoundingClientRect();
      setTriggerRect(rect);
      // Debug: log the rect to see if it's being calculated correctly
      // console.log('Trigger rect:', rect);
    }
  }, [isVisible, position]);

  // Event handlers
  const handleMouseEnter = (e: React.MouseEvent) => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    setIsVisible(true);
    if (position === 'follow-mouse') {
      const pos = { x: e.clientX, y: e.clientY };
      setMousePosition(pos);
      setTargetPosition(pos);
    } else if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTriggerRect(rect);
      // Debug: log the rect immediately on hover
      // console.log('Immediate trigger rect:', rect);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (position === 'follow-mouse') {
      setTargetPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    // Add a small delay to prevent flickering when moving between icon and tooltip
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // Track mouse position globally to detect when mouse leaves the icon area
  useEffect(() => {
    if (!isVisible || !triggerRef.current) return;

    const handleDocumentMouseMove = (e: MouseEvent) => {
      if (!triggerRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      const buffer = 20; // Add a small buffer zone

      const isOutside = (
        e.clientX < rect.left - buffer ||
        e.clientX > rect.right + buffer ||
        e.clientY < rect.top - buffer ||
        e.clientY > rect.bottom + buffer
      );

      if (isOutside) {
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 100);
      } else {
        // Mouse is back in the icon area, cancel hide
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
      }
    };

    document.addEventListener('mousemove', handleDocumentMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
    };
  }, [isVisible]);

  // Create tooltip content
  const tooltipContent = isVisible && (
    <div style={tooltipStyles}>
      {renderTooltipContent()}
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={className}
        style={{ position: 'relative', display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        tabIndex={0}
        role="button"
        aria-label={`Info: ${text || sections?.map(s => s.title).join(', ') || 'Custom tooltip'}`}
      >
        <InfoIcon />
      </div>
      {/* Render tooltip in portal to avoid parent transform issues */}
      {typeof document !== 'undefined' && tooltipContent && createPortal(tooltipContent, document.body)}
    </>
  );
};

export default InfoTooltip;