import { useState } from 'react';

/**
 * Custom hook for managing hover state consistently across components
 * Provides hover handlers and state management
 * 
 * @param initialState - Initial hover state (default: false)
 * @returns Object with hover state and handlers
 */
export const useHoverState = (initialState: boolean = false) => {
  const [isHovered, setIsHovered] = useState(initialState);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    // For direct state management if needed
    setIsHovered,
  };
};