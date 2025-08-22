# Design Library 2.0

A functional design library built from Figma Library 2.0 with React components, design tokens, icons, and CSS utilities.

## Features

- 🎨 **Design Tokens** - Typography, colors, spacing, and more extracted from Figma
- 🧩 **React Components** - Button, Input, Card components with TypeScript support
- 🎯 **Icons** - SVG icon library with consistent styling
- 📚 **Storybook** - Component documentation and development
- 🎭 **CSS Utilities** - Base styles and utility classes
- 📦 **Build System** - Rollup configuration for library distribution

## Typography System (from Figma)

### Font Families
- **Heading**: Bradford LL (serif)
- **Body**: Söhne (sans-serif) 
- **Mono**: Söhne Mono (monospace)

### Text Styles
- Headlines: H1 (50px), H2 (32px)
- Subheadings: Large (26px), Medium (19px)
- Body: Large (14px), Medium (12px), Small (10px)
- Navigation: Medium (12px), Small (10px)
- Captions: Medium (14px), Small (12px) - italic, bold
- Data: XXL (26px), XS (9px)

## Installation

```bash
npm install
```

## Development

```bash
# Start Storybook
npm run storybook

# Build library
npm run build

# Development mode
npm run dev
```

## Usage

```tsx
import { Button, Input, Card, typography, colors } from '@mylib/design-system';

// Use components
<Button variant="primary" size="md">
  Click me
</Button>

<Input 
  label="Email"
  placeholder="Enter email"
  leftIcon={<SearchIcon />}
/>

<Card variant="elevated" padding="lg">
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Use design tokens
const headingStyle = {
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.h1,
  color: colors.primary[600]
};
```

## Components

### Button
- Variants: primary, secondary, outline, ghost
- Sizes: sm, md, lg
- States: loading, disabled

### Input
- Variants: default, filled
- Features: label, helper text, error states, icons
- Types: all HTML input types supported

### Card
- Variants: default, outlined, elevated
- Sections: CardHeader, CardContent, CardFooter
- Padding options: none, sm, md, lg

## Design Tokens

All design tokens are available as both CSS custom properties and JavaScript/TypeScript exports:

```css
/* CSS */
.my-component {
  font-family: var(--font-heading);
  font-size: var(--fs-h1);
  color: var(--color-primary-600);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
}
```

```tsx
// TypeScript
import { typography, colors, spacing } from '@mylib/design-system';

const styles = {
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.h1,
  color: colors.primary[600],
  padding: spacing[4]
};
```

## Icons

```tsx
import { SearchIcon, CheckIcon, LoadingIcon } from '@mylib/design-system';

<SearchIcon size={24} color="currentColor" />
```

## File Structure

```
src/
├── components/          # React components
│   ├── Button/
│   ├── Input/
│   ├── Card/
│   └── index.ts
├── tokens/              # Design tokens
│   └── index.ts
├── icons/               # Icon library
│   └── index.ts
├── styles/              # CSS utilities
│   └── base.css
└── index.ts             # Main export
```

## Storybook

View and interact with components:

```bash
npm run storybook
```

Components are documented with:
- Interactive controls
- Multiple variants
- Usage examples
- Props documentation

## Build Output

The library builds to multiple formats:
- `dist/index.js` - CommonJS
- `dist/index.esm.js` - ES Modules  
- `dist/index.d.ts` - TypeScript definitions
- `dist/index.css` - Bundled styles

## Contributing

1. Add new components in `src/components/`
2. Export from `src/components/index.ts`
3. Create Storybook stories
4. Update this README

## License

MIT