import React from 'react';
import { ThemeProvider, ProductTheme } from '../src/tokens/ThemeProvider';
import type { Decorator } from '@storybook/react';

// Global decorator that wraps all stories with ThemeProvider
export const withThemeProvider: Decorator = (Story, context) => {
  // Get theme from story parameters, globals, or use default
  const theme: ProductTheme = context.globals?.theme || context.parameters?.theme || 'reports';
  
  return (
    <ThemeProvider initialTheme={theme}>
      <div style={{ padding: context.parameters?.layout === 'fullscreen' ? 0 : '1rem' }}>
        <Story />
      </div>
    </ThemeProvider>
  );
};