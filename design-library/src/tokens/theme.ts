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
      violet400: '#d7d7ec', // D7D7EC
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
  contracts: {
    yellow900: '#987c17',
    yellow800: '#caac41',
    yellow600: '#fee68d',
    yellow500: '#ffefb0',
    dynamic: {
      yellow400: '#e5ded2', // E5DED2
      yellow300: '#f0ebe1', // F0EBE1
      yellow200: '#f9f6f0', // F9F6F0
    },
  },
} as const;

export type ProductTheme = 'reports' | 'marketplace' | 'analytics' | 'contracts';

export interface ThemeColors {
  // Essential theme colors only (the ones that need to adapt per product)
  primary700: string; // main color
  primary450: string; // column headers, icons
  primary400: string; // strokes (borders, separators)
  primary300: string; // hover states
  primary200: string; // background (light backgrounds)
}

// Theme color mappings for each product (only essential colors)
const themeColorMappings: Record<ProductTheme, ThemeColors> = {
  reports: {
    primary700: colors.reports.blue700,
    primary450: colors.reports.blue450,
    primary400: colors.reports.dynamic.blue400,
    primary300: colors.reports.dynamic.blue300,
    primary200: colors.reports.dynamic.blue200,
  },
  marketplace: {
    primary700: colors.marketplace.violet700,
    primary450: '#c1c1d5', // Custom color for marketplace dark strokes
    primary400: colors.marketplace.dynamic.violet400,
    primary300: colors.marketplace.dynamic.violet300,
    primary200: colors.marketplace.dynamic.violet200,
  },
  analytics: {
    primary700: colors.analytics.green700,
    primary450: '#B4C5BC', // Custom color for analytics column headers
    primary400: colors.analytics.dynamic.green400,
    primary300: colors.analytics.dynamic.green300,
    primary200: colors.analytics.dynamic.green200,
  },
  contracts: {
    primary700: '#fcdc6a', // main color (yellow700)
    primary450: '#d2cbbf', // Custom color for contracts dark strokes
    primary400: colors.contracts.dynamic.yellow400,
    primary300: colors.contracts.dynamic.yellow300,
    primary200: colors.contracts.dynamic.yellow200,
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
      // Common semantic uses (renamed to match Figma)
      'primary700 (main)': themeColors.primary700,       // Main brand color for the product
      'primary450 (headers)': themeColors.primary450,    // Used for column headers, icons
      'primary400 (strokes)': themeColors.primary400,    // Used for borders, separators, outlines
      'primary300 (hover)': themeColors.primary300,      // Used for hover states
      'primary200 (background)': themeColors.primary200, // Used for light backgrounds
      // Backward compatibility aliases
      stroke: themeColors.primary400,
      background: themeColors.primary200,
      hover: themeColors.primary300,
      main: themeColors.primary700,
      headers: themeColors.primary450,
    },
    // Original color structure remains intact
    ...colors,
  };
}

export default themeColorMappings;