// Design tokens extracted from Figma Library 2.0

export const typography = {
  fontFamily: {
    heading: ['Bradford LL', 'serif'],
    body: ['Söhne', 'system-ui', 'sans-serif'],
    mono: ['Söhne Mono', 'monospace'],
  },
  fontSize: {
    // Headlines
    h1: '50px',    // XXL
    h2: '32px',    // XL
    // Subheadings  
    subheadingL: '26px',  // L
    subheadingM: '19px',  // ML
    // Body text
    bodyL: '14px',   // M/sm
    bodyM: '12px',   // S/xsm
    bodyS: '10px',   // XS
    // Navigation
    navM: '12px',    // S
    navS: '10px',    // XS
    // Captions
    captionM: '14px', // M
    captionS: '12px', // S
    // Data
    dataXXL: '26px',  // L
    dataXS: '9px',    // XXS
  },
  fontWeight: {
    light: 400,    // Regular/Buch
    regular: 400,  // Regular
    medium: 500,   // Kräftig/Medium
    bold: 700,     // Bold
  },
  lineHeight: {
    // Headlines
    h1: 1.0,        // 50px/50px = 1.0
    h2: 1.2,        // 38.4px/32px = 1.2
    // Subheadings
    subheadingL: 1.1,   // 28.6px/26px ≈ 1.1
    subheadingM: 1.2,   // 22.8px/19px ≈ 1.2
    // Body
    bodyL: 1.3,     // 18.2px/14px ≈ 1.3
    bodyM: 1.3,     // 15.6px/12px = 1.3
    bodyS: 1.3,     // 13px/10px = 1.3
    // Navigation
    navM: 1.2,      // 14.4px/12px = 1.2
    navS: 1.2,      // 12px/10px = 1.2
    // Captions
    captionM: 1.3,  // 18.2px/14px ≈ 1.3
    captionS: 1.3,  // 15.6px/12px = 1.3
    // Data
    dataXXL: 1.3,   // 33.8px/26px ≈ 1.3
    dataXS: 1.1,    // 9.9px/9px ≈ 1.1
  },
  letterSpacing: {
    tight: '-1px',    // XS
    normal: '-0.5px', // S  
    wide: '0px',      // M
    wider: '0.5px',   // L
    widest: '1px',    // XL
  },
  // Complete typography styles as they appear in Figma
  styles: {
    // Headlines/Title
    headlineH1: {
      fontFamily: ['Bradford LL', 'serif'],
      fontSize: '50px',
      fontWeight: 400,
      lineHeight: 1.0,
      letterSpacing: '-1px',
    },
    headlineH2: {
      fontFamily: ['Bradford LL', 'serif'],
      fontSize: '32px',
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
    },
    // Subtitles
    subheadingL: {
      fontFamily: ['Bradford LL', 'serif'],
      fontSize: '26px',
      fontWeight: 500,
      lineHeight: 1.1,
      letterSpacing: '-0.5px',
    },
    subheadingM: {
      fontFamily: ['Söhne', 'system-ui', 'sans-serif'],
      fontSize: '19px',
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: '0px',
    },
    // Body
    bodyL: {
      fontFamily: ['Söhne', 'system-ui', 'sans-serif'],
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.3,
      letterSpacing: '0px',
    },
    bodyM: {
      fontFamily: ['Söhne', 'system-ui', 'sans-serif'],
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.3,
      letterSpacing: '0px',
    },
    bodyS: {
      fontFamily: ['Söhne', 'system-ui', 'sans-serif'],
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.3,
      letterSpacing: '0px',
    },
    // Navigation
    navM: {
      fontFamily: ['Söhne Mono', 'monospace'],
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: '0.5px',
    },
    navS: {
      fontFamily: ['Söhne Mono', 'monospace'],
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: '0.5px',
    },
    // Caption
    captionM: {
      fontFamily: ['Bradford LL', 'serif'],
      fontSize: '14px',
      fontWeight: 700,
      fontStyle: 'italic',
      lineHeight: 1.3,
      letterSpacing: '0px',
    },
    captionS: {
      fontFamily: ['Bradford LL', 'serif'],
      fontSize: '12px',
      fontWeight: 700,
      fontStyle: 'italic',
      lineHeight: 1.3,
      letterSpacing: '0px',
    },
    // Data
    dataXXL: {
      fontFamily: ['Söhne', 'system-ui', 'sans-serif'],
      fontSize: '26px',
      fontWeight: 400,
      lineHeight: 1.3,
      letterSpacing: '0px',
    },
    dataXS: {
      fontFamily: ['Söhne', 'system-ui', 'sans-serif'],
      fontSize: '9px',
      fontWeight: 500,
      lineHeight: 1.1,
      letterSpacing: '0px',
    },
  },
} as const;

// Color palette from Figma
export const colors = {
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
  // Product color schemes
  // @deprecated Use the Theme System instead: useSemanticColors() hook
  // These are maintained for internal theme system use and backward compatibility
  reports: {
    // Main colors
    blue900: '#1c6297',
    blue800: '#5b9cc7',
    blue700: '#9ad5f7', // main color
    blue600: '#bee4fb',
    blue500: '#e1f3ff',
    blue450: '#b4c2c5',
    // Dynamic colors (correct from Figma)
    dynamic: {
      blue400: '#d9e7ec', // D9E7EC
      blue300: '#e9f3f7', // E9F3F7
      blue200: '#f2f8fb', // F2F8FB
    },
  },
  // @deprecated Use the Theme System instead: useSemanticColors() hook
  marketplace: {
    // Main colors
    violet900: '#643ed8',
    violet800: '#916ff8',
    violet700: '#ceb5fb', // main color
    violet600: '#e0bffb',
    violet500: '#f0c9fc',
    // Dynamic colors (correct from Figma)
    dynamic: {
      violet400: '#d7d7ec', // D7D7EC
      violet300: '#efeffa', // EFEFFA
      violet200: '#f6f6ff', // F6F6FF
    },
  },
  // @deprecated Use the Theme System instead: useSemanticColors() hook
  analytics: {
    // Main colors
    green900: '#0f9342',
    green800: '#42c172',
    green700: '#74efa3', // main color
    green600: '#9df7b2',
    green500: '#c6ffc1',
    // Dynamic colors (correct from Figma)
    dynamic: {
      green400: '#e1eae5', // E1EAE5 (this one was already correct)
      green300: '#e9f1ec', // E9F1EC
      green200: '#f2f7f4', // F2F7F4
    },
  },
  // @deprecated Use the Theme System instead: useSemanticColors() hook
  contracts: {
    // Main colors
    yellow900: '#987c17',
    yellow800: '#caac41',
    yellow600: '#fee68d',
    yellow500: '#ffefb0',
    // Dynamic colors (correct from Figma)
    dynamic: {
      yellow400: '#f0ebe1', // F0EBE1
      yellow300: '#f5f0e8', // F5F0E8
      yellow200: '#f9f6f0', // F9F6F0
    },
  },
  // @deprecated Use the Theme System instead: useSemanticColors() hook
  workbench: {
    // Main colors
    orange700: '#f69e67', // main color
    orange450: '#d2c8bf',
    // Dynamic colors
    dynamic: {
      orange400: '#f0e8e1', // F0E8E1
      orange300: '#f5ede8', // F5EDE8
      orange200: '#f8f3ef', // F8F3EF
    },
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;

export const borderRadius = {
  0: '0px',
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  24: '24px',
  absolute: '9999px', // completely round
} as const;

// Note: strokes token removed - use semantic theme colors instead:
// - For borders/separators: colors.theme.primary400 (theme-aware)
// - For icon content: colors.blackAndWhite.black900 (high contrast)

export const shadows = {
  small: '0px 2px 4px rgba(0, 0, 0, 0.05)',
  base: '0px 4px 6px rgba(0, 0, 0, 0.06)',
  medium: '0px 8px 10px -1px rgba(0, 0, 0, 0.08)',
  large: '0px 10px 12px -1px rgba(0, 0, 0, 0.12)',
  extraLarge: '0px 12px 14px -1px rgba(0, 0, 0, 0.14)',
} as const;

// Export theming system
export * from './theme';
export * from './ThemeProvider';

