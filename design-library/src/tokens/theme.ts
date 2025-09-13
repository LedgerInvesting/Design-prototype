// Theming system for product-specific color switching
// Import colors directly to avoid circular dependency
const colors = {
  blackAndWhite: {
    white: '#ffffff',
    black100: '#dfdfdf',
    black300: '#babdbb', 
    black500: '#8b908d',
    black700: '#5d6460',
    black800: '#3a423d',
    black900: '#17211b',
  },
  error: {
    darkBorders: '#8a2628',
    textAndStrokes: '#db2d31',
    fill: '#ff8588',
    fillLight: '#fee7e7',
  },
  warning: {
    dark: '#d5a701',
    textAndStrokes: '#ffdd61',
    fill: '#ffdd61',
    fillLight: '#fffbee',
  },
  success: {
    textAndStrokes: '#2fa915',
    fill: '#7fffb0',
  },
  reports: {
    blue900: '#1c6297',
    blue800: '#5b9cc7',
    blue700: '#9ad5f7',
    blue600: '#bee4fb',
    blue500: '#e1f3ff',
    blue450: '#b4c2c5',
    dynamic: {
      blue400: '#d9e7ec', // D9E7EC
      blue300: '#e9f3f7', // E9F3F7
      blue200: '#f2f8fb', // F2F8FB
    },
  },
  marketplace: {
    violet900: '#643ed8',
    violet800: '#916ff8',
    violet700: '#ceb5fb',
    violet600: '#e0bffb',
    violet500: '#f0c9fc',
    dynamic: {
      violet400: '#d1d1ec', // D1D1EC
      violet300: '#efeffa', // EFEFFA
      violet200: '#f6f6ff', // F6F6FF
    },
  },
  analytics: {
    green900: '#0f9342',
    green800: '#42c172',
    green700: '#74efa3',
    green600: '#9df7b2',
    green500: '#c6ffc1',
    dynamic: {
      green400: '#e1eae5', // E1EAE5 (was correct)
      green300: '#e9f1ec', // E9F1EC
      green200: '#f2f7f4', // F2F7F4
    },
  },
} as const;

export type ProductTheme = 'reports' | 'marketplace' | 'analytics';

export interface ThemeColors {
  // Main product colors
  primary900: string;
  primary800: string;
  primary700: string; // main color
  primary600: string;
  primary500: string;
  primary450?: string; // only available for reports
  // Dynamic colors (used for UI elements)
  primary400: string;
  primary300: string;
  primary200: string;
}

// Theme color mappings for each product
const themeColorMappings: Record<ProductTheme, ThemeColors> = {
  reports: {
    primary900: colors.reports.blue900,
    primary800: colors.reports.blue800,
    primary700: colors.reports.blue700,
    primary600: colors.reports.blue600,
    primary500: colors.reports.blue500,
    primary450: colors.reports.blue450,
    primary400: colors.reports.dynamic.blue400,
    primary300: colors.reports.dynamic.blue300,
    primary200: colors.reports.dynamic.blue200,
  },
  marketplace: {
    primary900: colors.marketplace.violet900,
    primary800: colors.marketplace.violet800,
    primary700: colors.marketplace.violet700,
    primary600: colors.marketplace.violet600,
    primary500: colors.marketplace.violet500,
    primary400: colors.marketplace.dynamic.violet400,
    primary300: colors.marketplace.dynamic.violet300,
    primary200: colors.marketplace.dynamic.violet200,
  },
  analytics: {
    primary900: colors.analytics.green900,
    primary800: colors.analytics.green800,
    primary700: colors.analytics.green700,
    primary600: colors.analytics.green600,
    primary500: colors.analytics.green500,
    primary400: colors.analytics.dynamic.green400,
    primary300: colors.analytics.dynamic.green300,
    primary200: colors.analytics.dynamic.green200,
  },
};

// Function to get theme colors for a specific product
export function getThemeColors(theme: ProductTheme): ThemeColors {
  return themeColorMappings[theme];
}

// Function to resolve a semantic color token to actual color value
export function resolveThemeColor(
  colorToken: keyof ThemeColors, 
  theme: ProductTheme
): string {
  const themeColors = getThemeColors(theme);
  return themeColors[colorToken] || colors.blackAndWhite.black900; // fallback
}

// Semantic color tokens that automatically resolve to current theme
export function createSemanticColors(theme: ProductTheme) {
  const themeColors = getThemeColors(theme);
  
  return {
    // Semantic tokens that map to current product theme
    theme: {
      ...themeColors,
      // Common semantic uses
      stroke: themeColors.primary400,     // Used for borders, separators, outlines
      background: themeColors.primary200, // Used for light backgrounds  
      hover: themeColors.primary300,      // Used for hover states
      main: themeColors.primary700,       // Main brand color for the product
    },
    // Original color structure remains intact
    ...colors,
  };
}

export default themeColorMappings;