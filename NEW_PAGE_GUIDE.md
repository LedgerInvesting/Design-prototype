# New Page Creation Guide

This document provides a comprehensive guide for creating new pages in the Ledger Design Library, ensuring consistency with existing patterns and proper integration with the design system.

## 🚨 Critical Rules - Always Follow

### **1. NEVER CREATE EXTERNAL DEPENDENCIES**
- **NEVER create custom SVG icons** - Always use icons from `@design-library/icons`
- **NEVER use external libraries** for icons, colors, typography, or spacing
- **NEVER hardcode colors, fonts, or spacing** - Always use design tokens
- **ALWAYS import from the design library**: components, icons, colors, typography, spacing, etc.

### **2. LAYOUT & NAVIGATION REQUIREMENTS**
- **ALWAYS use the Layout component** from `@design-library/pages`
- **ALWAYS set proper sidebar navigation** with `selectedSidebarItem` and `selectedSidebarSubitem`
- **ALWAYS use navigation utilities** from `@design-library/utils/navigation`
- **ALWAYS implement breadcrumbs** using `createBreadcrumbs` utility

### **3. DESIGN TOKEN USAGE**
- **ALWAYS use `useSemanticColors()` hook** for theme-aware colors
- **ALWAYS use typography tokens** (never override font properties)
- **ALWAYS use spacing tokens** from the design system
- **ALWAYS use design system components** instead of custom elements

## 📋 Page Template Structure

### **Required Imports**
```tsx
import React, { useState } from 'react';
// Import page components
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';

// Import base components
import { Button, Card, Table, Status, Modal } from '@design-library/components';

// Import design tokens
import { typography, spacing, borderRadius, shadows, useSemanticColors } from '@design-library/tokens';

// Import navigation utilities
import { createPageNavigationHandler, createBreadcrumbs } from '@design-library/utils/navigation';

// Import icons (ONLY from design library)
import { AddSmall, ChevronRightSmall, DocumentTable } from '@design-library/icons';
```

### **Page Component Structure**
```tsx
interface YourPageProps {
  onNavigateToPage?: (page: string, data?: any) => void;
}

export const YourPage: React.FC<YourPageProps> = ({ onNavigateToPage }) => {
  const [activeState, setActiveState] = useState('default');

  return (
    <Layout
      selectedSidebarItem="your-section"          // reports, analytics, marketplace
      selectedSidebarSubitem="your-page"          // transactions, valuation, offerings
      onNavigate={createPageNavigationHandler(onNavigateToPage, 'your-page-type')}
      breadcrumbs={createBreadcrumbs.yourSection.yourPage()}
    >
      {/* Page content goes here */}
    </Layout>
  );
};
```

## 🎨 Component Standards

### **Button Usage Guidelines**
- **Primary CTA buttons**: `variant="primary"` with `color="black"`
- **Secondary actions**: `variant="small"` with `color="white"`
- **Icon-only buttons**: `variant="icon"` with appropriate color
- **AVOID tertiary buttons** unless specifically needed for secondary actions

**Examples:**
```tsx
// ✅ Primary CTA (preferred)
<Button variant="primary" color="black" onClick={handleAction}>
  Create New
</Button>

// ✅ Secondary action
<Button variant="small" color="white" onClick={handleSecondary}>
  Export
</Button>

// ❌ Avoid tertiary unless necessary
<Button variant="tertiary" color="black">
  Less Preferred
</Button>
```

### **Color Usage Standards**
```tsx
const YourComponent: React.FC = () => {
  const colors = useSemanticColors(); // ALWAYS use this hook

  const styles: React.CSSProperties = {
    // Theme-aware colors (adapts to Reports/Analytics/Marketplace themes)
    backgroundColor: colors.theme.primary700,
    borderColor: colors.theme.primary400,
    color: colors.blackAndWhite.black900,

    // Static colors for consistent elements
    backgroundColor: colors.blackAndWhite.white,
    borderColor: colors.blackAndWhite.black300,
  };

  return <div style={styles}>Content</div>;
};
```

### **Typography Standards**
```tsx
// ✅ CORRECT: Use typography tokens
const titleStyles: React.CSSProperties = {
  ...typography.styles.headlineH2,
  color: colors.blackAndWhite.black900,
  margin: '0 0 12px 0', // Only override non-font properties
};

// ❌ WRONG: Never override font properties
const badStyles: React.CSSProperties = {
  ...typography.styles.headlineH2,
  fontSize: '32px',        // DON'T DO THIS
  fontWeight: 600,         // DON'T DO THIS
  fontFamily: 'Arial',     // DON'T DO THIS
};
```

## 🎯 Page Type Patterns

### **1. Dashboard/Explorer Pages**
- Use **banner component** with theme colors
- Include **data cards** or **summary statistics**
- Implement **tables** for data display
- Add **primary action buttons** in banner

**Example Structure:**
```tsx
const DashboardPage = () => (
  <Layout selectedSidebarItem="reports" selectedSidebarSubitem="dashboard">
    <YourBanner />
    <YourDataCards />
    <YourDataTable />
  </Layout>
);
```

### **2. Form Pages**
- Use **form layout** components
- Implement **validation** and state management
- Include **save/submit** actions with proper button variants
- Add **navigation breadcrumbs**

### **3. Detail/Configuration Pages**
- Use **section-based layout**
- Include **action buttons** for editing/saving
- Implement **modal dialogs** for complex actions
- Add **status indicators** where appropriate

## 🔧 Navigation Integration

### **1. Add Page to Navigation Utils**
Update `E:\Ledger design library\design-library\src\utils\navigation.ts`:

```tsx
export type PageType =
  | 'existing-pages'
  | 'your-new-page'; // Add your page type here

// Add breadcrumb creator
export const createBreadcrumbs = {
  yourSection: {
    yourPage: (): BreadcrumbItem[] => [
      { label: 'YOUR SECTION', href: '/your-section' },
      { label: 'YOUR PAGE', isActive: true }
    ]
  }
};
```

### **2. Update Sidebar Configuration**
Ensure your sidebar items exist in the Layout component's navigation structure.

### **3. Update App.tsx**
Add your page to the main App routing if needed:

```tsx
// In App.tsx
case 'your-page':
  return <YourPage onNavigateToPage={setCurrentPage} />;
```

## 📐 Layout Standards

### **Full-Width Layout (Recommended)**
```tsx
return (
  <Layout {...navigationProps}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[32]
    }}>
      {/* Page content - uses full available width */}
    </div>
  </Layout>
);
```

### **Banner Component Pattern**
```tsx
const YourBanner: React.FC = () => {
  const colors = useSemanticColors();

  const headerStyles: React.CSSProperties = {
    backgroundColor: colors.theme.primary700, // Auto-adapts to theme
    padding: '0 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius[16],
    height: '250px',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    backgroundImage: `url('/pattern_your_theme.svg')`, // Use theme-specific pattern
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top right',
    backgroundSize: '33%',
    boxShadow: shadows.base,
  };

  return (
    <div style={headerStyles}>
      {/* Banner content */}
    </div>
  );
};
```

## 🎨 Theme Integration

### **Theme-Aware Patterns**
Each theme has its own background pattern:
- **Reports**: `/pattern_reports.svg` (Blue theme)
- **Analytics**: `/pattern_analytics.svg` (Green theme)
- **Marketplace**: `/pattern_marketplace.svg` (Violet theme)

### **Theme Color Usage**
```tsx
const colors = useSemanticColors();

// These automatically adapt to current theme:
colors.theme.primary200  // Light theme color
colors.theme.primary400  // Medium theme color
colors.theme.primary700  // Dark theme color
colors.theme.main        // Primary brand color

// These remain static across themes:
colors.blackAndWhite.black900
colors.blackAndWhite.white
colors.error.error500
```

## 📊 Common Component Patterns

### **Data Tables**
```tsx
<Table
  columns={[
    { key: 'name', label: 'Name', align: 'left' },
    { key: 'value', label: 'Value', align: 'right' },
    { key: 'actions', label: 'Actions', align: 'center' }
  ]}
  data={yourData}
  pagination={{ enabled: true, pageSize: 10 }}
/>
```

### **Status Indicators**
```tsx
<Status
  variant="success"  // success, error, warning, info, neutral
  label="Active"
/>
```

### **Cards for Data Display**
```tsx
<Card>
  <CardHeader>
    <h3 style={titleStyles}>Card Title</h3>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
  <CardFooter>
    <Button variant="primary" color="black">Action</Button>
  </CardFooter>
</Card>
```

## ✅ Checklist for New Pages

### **Before Creating:**
- [ ] Page name and purpose defined
- [ ] Navigation structure planned
- [ ] Theme section identified (Reports/Analytics/Marketplace)

### **During Development:**
- [ ] Using Layout component from `@design-library/pages`
- [ ] All imports from design library only
- [ ] `useSemanticColors()` hook implemented
- [ ] Typography tokens used correctly
- [ ] Spacing tokens used throughout
- [ ] Button variants follow standards (primary/small preferred)
- [ ] Navigation properly configured

### **After Development:**
- [ ] Navigation utilities updated
- [ ] App.tsx routing added (if needed)
- [ ] Breadcrumbs working correctly
- [ ] Theme adaptation tested
- [ ] Responsive behavior verified
- [ ] No hardcoded colors/fonts/spacing

## 🚫 Common Mistakes to Avoid

1. **Don't create custom SVG icons** - Use design library icons
2. **Don't hardcode colors** - Use semantic color tokens
3. **Don't override typography properties** - Use complete typography tokens
4. **Don't use fixed widths** - Let Layout handle responsive behavior
5. **Don't use tertiary buttons** as primary actions - Use primary variant
6. **Don't forget navigation integration** - Always update utilities
7. **Don't mix external libraries** - Stick to design library components

## 📚 Reference Files

For detailed examples, study these well-implemented pages:
- **TransactionManagement.tsx** - Dashboard pattern with banner
- **AnalyticsValuation.tsx** - Theme integration example
- **MarketplaceOfferings.tsx** - Full-width layout pattern
- **NewTransactionForm.tsx** - Form layout pattern

## 🔄 Maintenance

When updating pages:
1. Keep navigation utilities in sync
2. Update breadcrumbs if page structure changes
3. Ensure theme compatibility across all updates
4. Test responsive behavior after changes

---

**Remember**: Consistency is key. When in doubt, follow the patterns established in existing pages and always use design library components and tokens.