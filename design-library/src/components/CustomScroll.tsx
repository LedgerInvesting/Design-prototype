import React, { useEffect } from 'react';
import { useSemanticColors } from '../tokens';

export interface CustomScrollProps {
  /** Child elements to be scrolled */
  children: React.ReactNode;
  /** Maximum height for the scroll container */
  maxHeight?: string;
  /** Additional CSS class */
  className?: string;
  /** Custom scroll class name for unique styling */
  scrollClassName?: string;
  /** Custom track background color (defaults to theme.primary200) */
  trackColor?: string;
  /** Custom thumb background color (defaults to black900) */
  thumbColor?: string;
  /** Scroll width in pixels (default: 6) */
  scrollWidth?: number;
  /** Thumb border radius in pixels (default: 3) */
  thumbBorderRadius?: number;
}

/**
 * CustomScroll component with styled scrollbar
 * Based on the Insights Explorer program list scroll design
 */
export const CustomScroll: React.FC<CustomScrollProps> = ({
  children,
  maxHeight = '200px',
  className = '',
  scrollClassName = 'custom-scroll',
  trackColor,
  thumbColor,
  scrollWidth = 6,
  thumbBorderRadius = 3,
}) => {
  const colors = useSemanticColors();

  // Use theme colors as defaults
  const finalTrackColor = trackColor || colors.theme.primary200;
  const finalThumbColor = thumbColor || colors.blackAndWhite.black900;

  useEffect(() => {
    // Inject custom scrollbar styles
    const styleId = `${scrollClassName}-styles`;

    if (!document.getElementById(styleId)) {
      const scrollbarStyles = `
        .${scrollClassName}::-webkit-scrollbar {
          width: ${scrollWidth}px;
        }
        .${scrollClassName}::-webkit-scrollbar-track {
          background: ${finalTrackColor};
        }
        .${scrollClassName}::-webkit-scrollbar-thumb {
          background: ${finalThumbColor};
          border-radius: ${thumbBorderRadius}px;
        }
        .${scrollClassName}::-webkit-scrollbar-thumb:hover {
          background: ${finalThumbColor};
        }
        .${scrollClassName}::-webkit-scrollbar-button {
          display: none;
        }
      `;

      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = scrollbarStyles;
      document.head.appendChild(style);
    }
  }, [scrollClassName, finalTrackColor, finalThumbColor, scrollWidth, thumbBorderRadius]);

  return (
    <div
      className={`${scrollClassName} ${className}`}
      style={{
        maxHeight,
        overflowY: 'scroll',
      }}
    >
      {children}
    </div>
  );
};

export default CustomScroll;
