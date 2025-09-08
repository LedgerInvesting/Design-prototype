import { useEffect, RefObject } from 'react';

/**
 * Custom hook for handling clicks outside a referenced element
 * Commonly used for closing dropdowns, modals, and tooltips
 * 
 * @param ref - React ref object pointing to the element to monitor
 * @param callback - Function to call when outside click is detected
 */
export const useOutsideClick = (
  ref: RefObject<HTMLElement>, 
  callback: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};