/**
 * Utility for injecting global CSS styles into the document head
 * Prevents duplicate style injection by checking for existing style elements
 */
export const injectGlobalStyles = (styleId: string, css: string): void => {
  // Check if style already exists to prevent duplicates
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
  }
};

/**
 * Pre-configured style injections for common component needs
 */
export const commonStyles = {
  hideNumberSpinners: (componentPrefix: string) => injectGlobalStyles(
    `${componentPrefix}-hide-spinners`,
    `
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
    `
  ),

  customScrollbar: (componentPrefix: string) => injectGlobalStyles(
    `${componentPrefix}-scrollbar`,
    `
    .${componentPrefix}-dropdown-list::-webkit-scrollbar {
      width: 4px;
    }
    .${componentPrefix}-dropdown-list::-webkit-scrollbar-track {
      background: transparent;
    }
    .${componentPrefix}-dropdown-list::-webkit-scrollbar-thumb {
      background-color: #1a1e1b;
      border-radius: 2px;
    }
    .${componentPrefix}-dropdown-list::-webkit-scrollbar-button {
      display: none;
    }
    `
  )
};