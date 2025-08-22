# Storybook Layout Standards

This document contains the standardized guidelines and requirements for Storybook stories in the Ledger Design Library.

## Storybook Layout Standards

**IMPORTANT**: All component stories MUST follow this exact format for consistency:

### Required Story Structure:
```typescript
const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName', // or 'Layout/ComponentName'
  component: ComponentName,
  parameters: {
    layout: 'centered', // ALWAYS use 'centered' - never 'padded'
    docs: {
      description: {
        component: 'Concise component description explaining main features and use cases.',
      },
    },
  },
  argTypes: {
    propName: {
      description: 'Clear description of what this prop does', // Description FIRST
      control: 'text', // Then control type
      options: ['option1', 'option2'], // If applicable
    },
    // More props following same pattern...
  },
};

// ALWAYS include Default story with args for interactive controls
export const Default: Story = {
  args: {
    propName: 'default value',
    // Set reasonable defaults for all key props
  },
};
```

### Layout Requirements:
- **Layout**: ALWAYS use `layout: 'centered'` - components appear horizontally and vertically centered
- **argTypes**: Description first, then control - provides better documentation
- **Controls**: Use 'radio' instead of 'select' for better UX where applicable
- **Default Story**: Must have args object for interactive controls panel

### Documentation Standards:
- **Component Description**: Concise, focus on main features and use cases
- **Prop Descriptions**: Clear, actionable descriptions explaining what each prop does
- **Story Names**: Use PascalCase (Default, AllStates, ComplexExample)
- **Categories**: 'Components/' for UI components, 'Layout/' for layout components

### Visual Presentation:
- Component preview appears centered in viewport
- Interactive controls panel appears at bottom
- Users can modify props in real-time
- Consistent professional appearance across all components

**Remember**: This format ensures all components have the same professional layout and user experience in Storybook.

## Storybook Experience
- **Interactive Controls**: All components feature comprehensive argTypes with real-time prop controls
- **Consistent Layout**: Component preview centered in viewport, interactive controls panel at bottom for all components
- **Professional Documentation**: Detailed descriptions, usage examples, and comprehensive story variations
- **Real-time Updates**: Modify props and see instant component updates without page reload
- **Complete Coverage**: All 14+ components have Default stories with args for full interactivity
- **Centered Presentation**: All components use `layout: 'centered'` for professional appearance

## Control Types Reference

### Common Control Types:
- `control: 'text'` - Text input for strings
- `control: 'boolean'` - Toggle for boolean values
- `control: 'radio'` - Radio buttons for select options (preferred over 'select')
- `control: 'select'` - Dropdown for select options
- `control: 'range'` - Slider for numeric values
- `control: 'color'` - Color picker for color values
- `control: 'object'` - Object editor for complex objects
- `control: 'array'` - Array editor for arrays

### argTypes Structure:
```typescript
argTypes: {
  propName: {
    description: 'What this prop does and how it affects the component',
    control: 'radio',
    options: ['option1', 'option2', 'option3'],
  },
  booleanProp: {
    description: 'Controls whether this feature is enabled',
    control: 'boolean',
  },
  numericProp: {
    description: 'Sets the size or amount for this property',
    control: { type: 'range', min: 0, max: 100, step: 1 },
  },
}
```

## Story Categories

### Components/
Use for all UI components:
- Button
- Input
- DatePicker
- Dropdown
- Selector
- ButtonSelector
- Status
- InfoTooltip
- Table

### Layout/
Use for layout and structural components:
- Stack
- Grid
- Container
- Spacer

### Tokens/
Use for design system documentation:
- DesignTokens
- Colors
- Typography
- Spacing

## Best Practices

### Story Naming:
- `Default` - Main interactive story with comprehensive controls
- `AllStates` - Shows all possible states of a component
- `WithIcons` - Demonstrates icon integration
- `ComplexExample` - Real-world usage example
- `Playground` - Extensive customization example

### Args Best Practices:
- Set reasonable default values that showcase the component well
- Include all major props in the Default story
- Use realistic content (not "lorem ipsum" unless necessary)
- Ensure disabled/loading states are easily accessible

### Documentation:
- Keep component descriptions concise but informative
- Focus on what the component does and when to use it
- Prop descriptions should explain the effect, not just repeat the prop name
- Include usage notes for complex interactions

## Implementation Checklist

For each new component story:
- [ ] Uses `layout: 'centered'`
- [ ] Has comprehensive argTypes with descriptions first
- [ ] Includes Default story with args
- [ ] Uses appropriate category (Components/ or Layout/)
- [ ] Has clear, actionable prop descriptions
- [ ] Shows real-world usage examples
- [ ] Interactive controls work properly
- [ ] Follows PascalCase naming for stories