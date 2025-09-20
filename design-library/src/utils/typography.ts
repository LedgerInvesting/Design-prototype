import { typography } from '../tokens';

/**
 * Utility function to apply typography styles consistently across components
 * Eliminates repetitive typography style object creation
 */
export const applyTypographyStyle = (styleKey: keyof typeof typography.styles) => {
  const style = typography.styles[styleKey];
  
  return {
    fontFamily: style.fontFamily.join(', '),
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    lineHeight: style.lineHeight,
  };
};

/**
 * Common typography style combinations used across components
 */
export const commonTypographyStyles = {
  // Input/form labels
  label: () => applyTypographyStyle('bodyM'),
  
  // Input/form field text
  field: () => applyTypographyStyle('bodyM'),
  
  // Helper text and descriptions
  helper: () => applyTypographyStyle('bodyS'),
  
  // Button text
  button: () => applyTypographyStyle('bodyM'),
  
  // Caption text
  caption: () => applyTypographyStyle('captionS'),
  
  // Data display
  data: () => applyTypographyStyle('dataL'),
  
  // Headers
  heading: () => applyTypographyStyle('headingM'),
  subheading: () => applyTypographyStyle('subheadingM'),
};