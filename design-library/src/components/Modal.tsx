import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { borderRadius, shadows } from '../tokens';
import { useSemanticColors } from '../tokens/ThemeProvider';
import { CloseMedium } from '../icons';
import { Button } from './Button';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: () => void;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Modal title */
  title?: string;
  /** Modal subtitle */
  subtitle?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Modal width */
  width?: string | number;
  /** Modal max width */
  maxWidth?: string | number;
  /** Modal height */
  height?: string | number;
  /** Modal max height */
  maxHeight?: string | number;
  /** Whether to show backdrop */
  showBackdrop?: boolean;
  /** Backdrop opacity */
  backdropOpacity?: number;
  /** Backdrop color - 'black' or 'white' */
  backdropColor?: 'black' | 'white';
  /** Whether to blur content behind backdrop */
  backdropBlur?: boolean;
  /** Whether to center the modal */
  centered?: boolean;
  /** Custom positioning (overrides centered) */
  position?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  /** Reference to button for positioning relative to button */
  buttonRef?: React.RefObject<HTMLButtonElement>;
  /** Gap from button when using buttonRef positioning */
  buttonGap?: number;
  /** Disable close on backdrop click */
  disableBackdropClose?: boolean;
  /** Custom padding */
  padding?: string;
  /** Additional modal styles */
  modalStyle?: React.CSSProperties;
  /** Additional content styles */
  contentStyle?: React.CSSProperties;
  /** Footer content (typically buttons) */
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  animationDuration = 200,
  title,
  subtitle,
  children,
  width = 'auto',
  maxWidth = '90vw',
  height = 'auto',
  maxHeight = '90vh',
  showBackdrop = false,
  backdropOpacity = 0.5,
  backdropColor = 'black',
  backdropBlur = false,
  centered = true,
  position,
  buttonRef,
  buttonGap = 20,
  disableBackdropClose = false,
  padding = '30px 15px',
  modalStyle,
  contentStyle,
  footer,
}) => {
  const colors = useSemanticColors();
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);
  const [calculatedPosition, setCalculatedPosition] = useState<React.CSSProperties>(() => {
    // Initialize with proper position to avoid flash
    if (position) {
      return {
        position: 'fixed',
        ...position,
        transform: 'none',
      };
    } else if (centered && !buttonRef) {
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }
    // For buttonRef positioning, we need to wait for useEffect
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      opacity: 0, // Hide initially until positioned
    };
  });

  // Handle animation state when isOpen changes
  useEffect(() => {
    if (isOpen) {
      // Opening modal
      setShouldRender(true);
      // Small delay to ensure element is rendered before animation
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      // Closing modal
      setIsAnimating(false);
      // Delay removal until animation completes
      const timer = setTimeout(() => setShouldRender(false), animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, animationDuration]);

  // Calculate position relative to button if buttonRef is provided
  useEffect(() => {
    if (isOpen && buttonRef?.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();

      // Align modal's right edge with button's right edge, offset 10px to the right
      const modalWidth = typeof width === 'string' ?
        parseInt(width) || 670 : width || 670;
      const modalLeft = buttonRect.right - modalWidth + 10;

      // Ensure modal doesn't go off screen
      const minLeft = 20; // 20px margin from screen edge
      const maxLeft = window.innerWidth - modalWidth - 20;
      const finalLeft = Math.max(minLeft, Math.min(modalLeft, maxLeft));

      setCalculatedPosition({
        position: 'fixed',
        top: buttonRect.bottom + buttonGap,
        left: finalLeft,
        transform: 'none',
        opacity: 1, // Make visible once positioned
      });
    } else if (position) {
      setCalculatedPosition({
        position: 'fixed',
        ...position,
        transform: 'none',
        opacity: 1,
      });
    } else if (centered) {
      setCalculatedPosition({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 1,
      });
    }
  }, [isOpen, buttonRef, position, centered, buttonGap]);

  if (!shouldRender) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !disableBackdropClose) {
      onClose();
    }
  };

  const backdropStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: showBackdrop
      ? backdropColor === 'white'
        ? `rgba(255, 255, 255, ${isAnimating ? backdropOpacity : 0})`
        : `rgba(0, 0, 0, ${isAnimating ? backdropOpacity : 0})`
      : 'transparent',
    backdropFilter: showBackdrop && backdropBlur && isAnimating ? 'blur(4px)' : 'none',
    display: 'flex',
    alignItems: centered && !buttonRef && !position ? 'center' : 'flex-start',
    justifyContent: centered && !buttonRef && !position ? 'center' : 'flex-start',
    zIndex: 10000,
    transition: `background-color ${animationDuration}ms ease-out, backdrop-filter ${animationDuration}ms ease-out`,
    // Reset any parent transforms to ensure viewport-relative positioning
    transform: 'none',
  };

  // Parse padding to separate top/left/right from bottom
  const paddingParts = padding.split(' ');
  let topPadding = '30px', rightPadding = '15px', leftPadding = '15px';

  if (paddingParts.length === 1) {
    // Single value: all sides
    topPadding = rightPadding = leftPadding = paddingParts[0];
  } else if (paddingParts.length === 2) {
    // Two values: vertical horizontal
    topPadding = paddingParts[0];
    rightPadding = leftPadding = paddingParts[1];
  } else if (paddingParts.length === 4) {
    // Four values: top right bottom left
    topPadding = paddingParts[0];
    rightPadding = paddingParts[1];
    leftPadding = paddingParts[3];
  }

  const modalStyles: React.CSSProperties = {
    backgroundColor: colors.blackAndWhite.white,
    borderRadius: borderRadius[12],
    boxShadow: shadows.large,
    padding: `${topPadding} ${rightPadding} 0 ${leftPadding}`, // No bottom padding
    width,
    maxWidth,
    height,
    maxHeight,
    overflow: 'auto',
    position: 'relative',
    ...calculatedPosition,
    // Animation styles
    opacity: isAnimating ? 1 : 0,
    transform: `${calculatedPosition.transform || ''} scale(${isAnimating ? 1 : 0.95})`.trim(),
    transition: `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out`,
    ...modalStyle,
  };

  const modalContent = (
    <div style={backdropStyles} onClick={handleBackdropClick}>
      <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1,
          }}
        >
          <Button
            variant="icon"
            color="light"
            shape="square"
            onClick={onClose}
            icon={<CloseMedium color={colors.blackAndWhite.black900} />}
          />
        </div>

        {/* Header section */}
        {(title || subtitle) && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: subtitle ? '16px' : '0',
            marginBottom: '20px',
            paddingRight: '41px', // Space for close button
          }}>
            {title && (
              <div style={{
                textAlign: 'center',
                lineHeight: '1.1',
              }}>
                {typeof title === 'string' ? (
                  <h1 style={{
                    fontSize: '26px',
                    fontFamily: 'Bradford LL, sans-serif',
                    fontWeight: 500,
                    color: colors.blackAndWhite.black900,
                    margin: 0,
                    letterSpacing: '-0.5px',
                  }}>
                    {title}
                  </h1>
                ) : (
                  title
                )}
              </div>
            )}
            {subtitle && (
              <div style={{
                fontSize: '12px',
                fontFamily: 'Söhne, system-ui, sans-serif',
                fontWeight: 500,
                color: colors.blackAndWhite.black500,
                textAlign: 'center',
                lineHeight: '1.3',
              }}>
                {subtitle}
              </div>
            )}
          </div>
        )}

        {/* Content area */}
        <div style={contentStyle}>
          {children}
        </div>

        {/* Footer area */}
        {footer && (
          <div style={{
            marginTop: '20px',
            paddingBottom: '15px', // Add bottom padding here instead of modal
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Render modal in a portal to avoid parent transform issues
  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export default Modal;