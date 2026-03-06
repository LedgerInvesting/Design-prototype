import { colors, borderRadius, spacing } from '../tokens';

/**
 * Common styling utility functions used across multiple components
 * Helps maintain consistency and reduce code duplication
 */

/**
 * Flex center alignment - used frequently across components
 */
export const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

/**
 * Flex alignment with custom justify content
 */
export const flexAlign = (justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' = 'flex-start') => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent,
} as const);

/**
 * Apply border radius using design tokens
 */
export const applyBorderRadius = (radiusKey: keyof typeof borderRadius) => ({
  borderRadius: borderRadius[radiusKey],
});

/**
 * Color with opacity utility
 */
export const colorWithOpacity = (color: string, opacity: number) => {
  // Handle hex colors
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  // Handle rgb colors by converting to rgba
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
  }
  
  // Return as is for rgba or other color formats
  return color;
};

/**
 * Standard transition for smooth animations
 */
export const standardTransition = (property: string = 'all', duration: string = '0.2s', easing: string = 'ease') => ({
  transition: `${property} ${duration} ${easing}`,
});

/**
 * Common hover effects
 */
export const hoverEffects = {
  // Subtle background color change
  backgroundHover: (baseColor: string, hoverColor: string) => ({
    backgroundColor: baseColor,
    '&:hover': {
      backgroundColor: hoverColor,
    },
    ...standardTransition('background-color'),
  }),
  
  // Scale effect on hover
  scaleHover: (scale: number = 1.05) => ({
    ...standardTransition('transform'),
    '&:hover': {
      transform: `scale(${scale})`,
    },
  }),
  
  // Opacity change on hover
  opacityHover: (baseOpacity: number = 1, hoverOpacity: number = 0.8) => ({
    opacity: baseOpacity,
    '&:hover': {
      opacity: hoverOpacity,
    },
    ...standardTransition('opacity'),
  }),
};

/**
 * Common container styles
 */
export const containerStyles = {
  // Standard card container
  card: {
    backgroundColor: colors.blackAndWhite.white,
    border: `1px solid ${colors.blackAndWhite.black200}`,
    ...applyBorderRadius(8),
    padding: spacing[4],
  },
  
  // Input/form field container
  field: {
    border: `1px solid ${colors.blackAndWhite.black400}`,
    ...applyBorderRadius(4),
    ...standardTransition('border-color'),
  },
  
  // Button container base
  button: {
    border: 'none',
    cursor: 'pointer',
    ...flexCenter,
    ...standardTransition(),
  },
};