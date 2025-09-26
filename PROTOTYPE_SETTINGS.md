# Prototype Settings System Documentation

## Overview

The Prototype Settings System is a feature toggle framework that allows dynamic enabling/disabling of experimental features during demos and development. It provides a live settings modal accessible through the user menu and persists preferences across browser sessions.

## 🎯 Use Cases

- **Live Demos**: Toggle features on/off during presentations to stakeholders
- **A/B Testing**: Compare different UI configurations instantly
- **Development**: Test experimental features without code changes
- **Stakeholder Feedback**: Allow clients to try different feature combinations

## 🏗️ Architecture

### Core Components

1. **PrototypeSettingsContext** - React context for global state management
2. **Settings Modal** - UI interface in TopNav user menu
3. **localStorage Persistence** - Settings survive browser sessions
4. **TypeScript Interfaces** - Full type safety for all settings

### File Structure
```
design-library/src/
├── contexts/
│   ├── PrototypeSettingsContext.tsx  # Main context implementation
│   └── index.ts                       # Context exports
├── pages/
│   └── TopNav.tsx                     # Settings modal UI
└── index.ts                           # Design library exports
```

## 🔧 Implementation Guide

### 1. Setting Up the Provider

The system is already integrated into the main app. The provider wraps the entire application:

```tsx
// pages/App.tsx
import { PrototypeSettingsProvider } from '@design-library/contexts';

function App() {
  return (
    <PrototypeSettingsProvider>
      <ThemeProvider initialTheme={getThemeForPage(currentPage)}>
        {/* Your app content */}
      </ThemeProvider>
    </PrototypeSettingsProvider>
  );
}
```

### 2. Using Settings in Components

#### Method 1: Get All Settings
```tsx
import { useSettings } from '@design-library/contexts';

const MyComponent = () => {
  const settings = useSettings();

  return (
    <div>
      {settings.appIntegration.showExtraCardButtons && (
        <Button>Extra Button</Button>
      )}
    </div>
  );
};
```

#### Method 2: Full Context Access
```tsx
import { usePrototypeSettings } from '@design-library/contexts';

const MyComponent = () => {
  const { settings, updateSetting, resetSettings } = usePrototypeSettings();

  const handleToggle = () => {
    updateSetting('appIntegration', 'showExtraCardButtons', !settings.appIntegration.showExtraCardButtons);
  };

  return (
    <button onClick={handleToggle}>
      Toggle Extra Buttons
    </button>
  );
};
```

### 3. Adding New Settings Categories

To add a new category, update the interface in `PrototypeSettingsContext.tsx`:

```tsx
export interface PrototypeSettings {
  // Existing category
  appIntegration: {
    showExtraCardButtons: boolean;
    enableAdvancedFilters: boolean;
    showIntegrationBadges: boolean;
    useEnhancedNavigation: boolean;
  };

  // NEW CATEGORY
  uiExperiments: {
    newSidebarDesign: boolean;
    enhancedTableView: boolean;
    modernCardLayout: boolean;
  };
}

// Update defaults
const defaultSettings: PrototypeSettings = {
  appIntegration: {
    showExtraCardButtons: false,
    enableAdvancedFilters: false,
    showIntegrationBadges: false,
    useEnhancedNavigation: false,
  },
  uiExperiments: {
    newSidebarDesign: false,
    enhancedTableView: false,
    modernCardLayout: false,
  },
};
```

### 4. Adding Settings to the Modal

Update the settings modal in `TopNav.tsx`:

```tsx
{/* Add new section after App Integration */}
<div style={{ marginBottom: '24px' }}>
  <div style={{
    ...typography.styles.subheadingM,
    color: colors.blackAndWhite.black900,
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: `1px solid ${colors.blackAndWhite.black100}`,
  }}>
    UI Experiments
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Selector
      variant="checkbox"
      label="New sidebar design"
      checked={settings.uiExperiments.newSidebarDesign}
      onChange={(checked) => updateSetting('uiExperiments', 'newSidebarDesign', checked)}
    />

    <Selector
      variant="checkbox"
      label="Enhanced table view"
      checked={settings.uiExperiments.enhancedTableView}
      onChange={(checked) => updateSetting('uiExperiments', 'enhancedTableView', checked)}
    />
  </div>
</div>
```

## 📋 Current Settings Reference

### App Integration Category

| Setting | Description | Example Usage |
|---------|-------------|---------------|
| `showExtraCardButtons` | Shows additional action buttons in cards/headers | Transaction Management header buttons |
| `enableAdvancedFilters` | Enables advanced filtering UI components | Table filters, search enhancements |
| `showIntegrationBadges` | Displays integration status badges | API connection indicators |
| `useEnhancedNavigation` | Activates improved navigation patterns | Breadcrumb enhancements, menu changes |

## 🚀 Working Examples

### Example 1: Transaction Management Extra Buttons

**Location**: `pages/TransactionManagement.tsx`

**Implementation**:
```tsx
const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  onNewTransactionClick,
  buttonRef,
  showExtraButtons = false
}) => {
  return (
    <div style={{
      width: showExtraButtons ? '400px' : '260px',
      display: 'flex',
      gap: showExtraButtons ? '8px' : '0',
    }}>
      <Button>New Transaction</Button>

      {showExtraButtons && (
        <>
          <Button variant="tertiary">Export</Button>
          <Button variant="tertiary">Analytics</Button>
        </>
      )}
    </div>
  );
};

// Usage in main component
const settings = useSettings();

<TransactionHeader
  showExtraButtons={settings.appIntegration.showExtraCardButtons}
  // ... other props
/>
```

**Result**: When enabled, header shows 3 buttons instead of 1.

### Example 2: Conditional Table Features

```tsx
const MyTable = () => {
  const settings = useSettings();

  return (
    <Table
      // ... standard props
      showAdvancedFilters={settings.appIntegration.enableAdvancedFilters}
      showIntegrationBadges={settings.appIntegration.showIntegrationBadges}
    />
  );
};
```

## 🎨 Best Practices

### 1. Naming Conventions
- Use descriptive, action-oriented names: `showExtraButtons` not `extraButtons`
- Group related settings in logical categories
- Use camelCase for all setting keys

### 2. Default Values
- Always default new settings to `false` (disabled)
- Ensure the default experience is the stable version
- Progressive enhancement: add features, don't remove core functionality

### 3. UI Implementation Patterns
- Use conditional rendering: `{setting && <Component />}`
- Adjust container sizes when showing/hiding elements
- Provide visual feedback when features are enabled
- Use consistent styling and spacing

### 4. Testing Strategy
- Test both enabled and disabled states
- Verify localStorage persistence works
- Check that reset functionality works correctly
- Test across different pages and components

## 🔍 Debugging Guide

### Common Issues

1. **Settings not persisting**:
   - Check localStorage in dev tools
   - Verify PrototypeSettingsProvider wraps your app
   - Look for console errors in useEffect

2. **Modal not showing settings**:
   - Ensure TopNav has access to usePrototypeSettings
   - Check that the context is properly imported
   - Verify modal is inside the Provider wrapper

3. **Component not updating**:
   - Confirm you're using `useSettings()` hook
   - Check that the setting key matches exactly
   - Verify the component re-renders on setting changes

### Development Tools

1. **Browser localStorage**:
   ```javascript
   // View current settings
   JSON.parse(localStorage.getItem('prototypeSettings'))

   // Clear settings
   localStorage.removeItem('prototypeSettings')
   ```

2. **React DevTools**: Look for `PrototypeSettingsContext.Provider` in component tree

## 🚀 Future Enhancements

### Planned Features
- **Import/Export Settings**: Share configurations via JSON
- **Preset Configurations**: Quick-load common demo setups
- **Setting Descriptions**: Tooltips explaining each feature
- **Conditional Settings**: Settings that depend on other settings
- **Analytics Tracking**: Track which features are used most

### Integration Opportunities
- **Storybook Integration**: Control story variants via settings
- **URL Parameters**: Load settings from query parameters
- **Team Sync**: Share settings across team members
- **Environment Configs**: Different defaults per environment

## 📞 Support

For questions about implementing new features or troubleshooting:

1. Check this documentation first
2. Look at existing examples in TransactionManagement.tsx
3. Review the TypeScript interfaces in PrototypeSettingsContext.tsx
4. Test in isolation before integrating into complex components

---

**Last Updated**: September 2025
**Version**: 1.0
**Status**: Production Ready ✅