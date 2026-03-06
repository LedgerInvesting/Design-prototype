import React, { createContext, useContext, ReactNode } from 'react';
import { ProductTheme, ThemeColors, getThemeColors, createSemanticColors } from './theme';

interface ThemeContextValue {
  currentTheme: ProductTheme;
  themeColors: ThemeColors;
  colors: ReturnType<typeof createSemanticColors>;
  setTheme: (theme: ProductTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ProductTheme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'reports'
}) => {
  const [currentTheme, setCurrentTheme] = React.useState<ProductTheme>(initialTheme);

  // Update theme when initialTheme prop changes (for Storybook integration)
  React.useEffect(() => {
    setCurrentTheme(initialTheme);
  }, [initialTheme]);

  const themeColors = getThemeColors(currentTheme);
  const colors = createSemanticColors(currentTheme);

  // Update CSS custom properties for theme colors
  React.useEffect(() => {
    document.documentElement.style.setProperty('--theme-selection-color', themeColors.primary700);
  }, [themeColors.primary700]);

  const contextValue: ThemeContextValue = {
    currentTheme,
    themeColors,
    colors,
    setTheme: setCurrentTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme in components
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Hook to get current theme colors (most common use case)
export const useThemeColors = (): ThemeColors => {
  const { themeColors } = useTheme();
  return themeColors;
};

// Hook to get semantic colors (includes theme + all base colors)
export const useSemanticColors = () => {
  const context = useContext(ThemeContext);
  
  // If not within a ThemeProvider, return default colors with reports theme
  if (context === undefined) {
    console.warn('useSemanticColors used outside ThemeProvider, falling back to reports theme');
    return createSemanticColors('reports');
  }
  
  return context.colors;
};