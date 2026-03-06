# Product Theming System

The Ledger Design Library includes a comprehensive theming system that allows components to automatically adapt their colors based on the current product context (Reports, Marketplace, or Analytics).

## Overview

Instead of hardcoding product-specific colors like `colors.reports.blue400`, components use semantic color tokens like `colors.theme.stroke` that automatically resolve to the correct product colors based on the current theme.

## Key Concepts

### Semantic Color Tokens
- `colors.theme.primary700` - Main brand color (blue700/violet700/green700)
- `colors.theme.primary400` - Stroke color for borders and separators
- `colors.theme.primary300` - Hover states
- `colors.theme.primary200` - Light backgrounds
- `colors.theme.stroke` - Alias for primary400 (most common use)
- `colors.theme.background` - Alias for primary200
- `colors.theme.hover` - Alias for primary300
- `colors.theme.main` - Alias for primary700

### Theme Mapping
| Token | Reports | Marketplace | Analytics |
|-------|---------|-------------|-----------|
| `primary700` | blue700 (#9ad5f7) | violet700 (#ceb5fb) | green700 (#74efa3) |
| `primary400` | blue400 (#D9E7EC) | violet400 (#e8d4fd) | green400 (#e1eae5) |
| `primary300` | blue300 (#e8f4fe) | violet300 (#f0e6fe) | green300 (#e9f3f7) |
| `primary200` | blue200 (#f4f9ff) | violet200 (#f8f3ff) | green200 (#f2f8fb) |

## Implementation

### 1. Component Setup
```typescript
import { useSemanticColors } from '@design-library/tokens';

const MyComponent: React.FC = () => {
  const { colors } = useSemanticColors();
  
  return (
    <div style={{
      border: `1px solid ${colors.theme.stroke}`,     // Adaptive border
      backgroundColor: colors.theme.background,        // Adaptive background
      color: colors.theme.main,                       // Adaptive text color
    }}>
      Themed content
    </div>
  );
};
```

### 2. App-Level Setup
Wrap your app with the ThemeProvider:

```typescript
import { ThemeProvider } from '@design-library/tokens';

function App() {
  return (
    <ThemeProvider initialTheme="reports">
      <YourAppContent />
    </ThemeProvider>
  );
}
```

### 3. Theme Switching
```typescript
import { useTheme } from '@design-library/tokens';

const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  
  return (
    <select 
      value={currentTheme} 
      onChange={(e) => setTheme(e.target.value as ProductTheme)}
    >
      <option value="reports">Reports</option>
      <option value="marketplace">Marketplace</option>
      <option value="analytics">Analytics</option>
    </select>
  );
};
```

## Migration Guide

### Before (Hardcoded)
```typescript
// ❌ Hardcoded to Reports colors
import { colors } from '@design-library/tokens';

const oldStyle = {
  border: `1px solid ${colors.reports.dynamic.blue400}`,
  backgroundColor: colors.reports.dynamic.blue200,
  '&:hover': {
    backgroundColor: colors.reports.dynamic.blue300,
  },
};
```

### After (Themed)
```typescript
// ✅ Adaptive to current theme
import { useSemanticColors } from '@design-library/tokens';

const MyComponent = () => {
  const { colors } = useSemanticColors();
  
  const themedStyle = {
    border: `1px solid ${colors.theme.stroke}`,      // Auto-adapts
    backgroundColor: colors.theme.background,         // Auto-adapts
    '&:hover': {
      backgroundColor: colors.theme.hover,           // Auto-adapts
    },
  };
  
  return <div style={themedStyle}>Content</div>;
};
```

## Common Patterns

### 1. Form Input with Theme
```typescript
const ThemedInput = () => {
  const { colors } = useSemanticColors();
  
  return (
    <input
      style={{
        border: `1px solid ${colors.theme.stroke}`,
        borderRadius: '4px',
        padding: '8px 12px',
        '&:focus': {
          borderColor: colors.theme.main,
          outline: `2px solid ${colors.theme.main}20`, // 20% opacity
        },
      }}
    />
  );
};
```

### 2. Card with Theme
```typescript
const ThemedCard = ({ children }) => {
  const { colors } = useSemanticColors();
  
  return (
    <div
      style={{
        backgroundColor: colors.theme.background,
        border: `1px solid ${colors.theme.stroke}`,
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      {children}
    </div>
  );
};
```

### 3. Button with Theme
```typescript
const ThemedButton = ({ children }) => {
  const { colors } = useSemanticColors();
  
  return (
    <button
      style={{
        backgroundColor: colors.theme.main,
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 16px',
        '&:hover': {
          backgroundColor: colors.theme.primary800, // Darker variant
        },
      }}
    >
      {children}
    </button>
  );
};
```

## Available Hooks

### `useTheme()`
Returns the full theme context including current theme and setter function.

```typescript
const { currentTheme, setTheme, themeColors, colors } = useTheme();
```

### `useThemeColors()`
Returns just the current theme color mappings.

```typescript
const themeColors = useThemeColors();
// themeColors.primary700, themeColors.primary400, etc.
```

### `useSemanticColors()`
Returns the complete color object including theme colors and base colors.

```typescript
const { colors } = useSemanticColors();
// colors.theme.main, colors.blackAndWhite.black700, etc.
```

## Best Practices

1. **Always use semantic tokens** for UI elements that should adapt between products
2. **Use base colors** for elements that should remain consistent (like black text)
3. **Wrap your app early** with ThemeProvider at the top level
4. **Test across themes** to ensure components work in all product contexts
5. **Use meaningful aliases** like `theme.stroke` instead of `theme.primary400` when possible

## Storybook Integration

View the interactive theme demo in Storybook:
- **Design System/Theme System** - Interactive theme switcher
- See how components automatically adapt colors when switching themes

## TypeScript Support

The theming system is fully typed:

```typescript
import type { ProductTheme, ThemeColors } from '@design-library/tokens';

const theme: ProductTheme = 'analytics'; // reports | marketplace | analytics
const colors: ThemeColors = getThemeColors(theme);
```