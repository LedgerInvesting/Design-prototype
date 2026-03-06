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
- **NEVER add extra padding containers** - Layout handles responsive padding automatically
- **ALWAYS set proper sidebar navigation** with `selectedSidebarItem` and `selectedSidebarSubitem`
- **ALWAYS use navigation utilities** from `@design-library/utils/navigation`
- **ALWAYS implement breadcrumbs** using `createBreadcrumbs` utility

### **3. PAGE NAMING CONVENTION**
**CRITICAL**: All page files and components MUST follow the descriptive naming system that indicates which business section they belong to:

**File naming pattern**: `[BusinessSection][PageName].tsx`
**Component naming pattern**: `[BusinessSection][PageName]`

**Business Sections:**
- **Reports**: `Reports[PageName].tsx` (e.g., `ReportsTransactionManagement.tsx`, `ReportsContractsExplorer.tsx`)
- **Analytics**: `Analytics[PageName].tsx` (e.g., `AnalyticsValuation.tsx`, `AnalyticsValuationDashboard.tsx`)
- **Contracts**: `Contracts[PageName].tsx` (e.g., `ContractsAIExtraction.tsx`)
- **Marketplace**: `Marketplace[PageName].tsx` (e.g., `MarketplaceOfferings.tsx`)

**Examples:**
```tsx
// ✅ CORRECT - Descriptive naming
export const ReportsTransactionManagement: React.FC<Props> = () => { ... }
export const AnalyticsValuationConfiguration: React.FC<Props> = () => { ... }
export const ContractsAIExtraction: React.FC<Props> = () => { ... }

// ❌ INCORRECT - Ambiguous naming
export const TransactionManagement: React.FC<Props> = () => { ... }
export const Contracts: React.FC<Props> = () => { ... }
```

**Why this matters:**
- **Prevents confusion**: Clearly identifies which section a page belongs to
- **Scalability**: Supports multiple pages with similar functionality across different sections
- **Team coordination**: Other team members can instantly understand page organization
- **Navigation consistency**: Aligns with the navigation system's section-based structure

### **4. DESIGN TOKEN USAGE**
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
// Example: ReportsYourPageName.tsx
import { createPageNavigationHandler, createBreadcrumbs, type NavigationHandler } from '@design-library/utils/navigation';

interface ReportsYourPageNameProps {
  onNavigateToPage?: NavigationHandler;
}

export const ReportsYourPageName: React.FC<ReportsYourPageNameProps> = ({ onNavigateToPage }) => {
  const [activeState, setActiveState] = useState('default');

  // Create navigation handler
  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'reports-your-page-name')
    : undefined;

  // Create breadcrumbs - ALWAYS include app name as first item (automatically hidden)
  const breadcrumbs = onNavigateToPage
    ? createBreadcrumbs.reports.yourPageName(onNavigateToPage)
    : [
        { label: 'Reports' },         // App name - hidden automatically
        { label: 'Your Page Name' }   // Main page - SHOWN
      ];
  // Result: "Your Page Name" displays in breadcrumbs

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      pageType="reports"                          // reports, analytics, contracts, marketplace
      onNavigate={navigationHandler}
    >
      {/* Page content goes directly here - NO wrapper with padding */}
      <YourPageContent />
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

### **CRITICAL: Navigation & Breadcrumb Setup**

**Every new page MUST follow these steps:**

### **1. Add Page Type to Navigation Utils**
Update `E:\Ledger design library\design-library\src\utils\navigation.ts`:

```tsx
// Step 1: Add your page type to PageType union
export type PageType =
  | 'existing-pages'
  | 'reports-your-page-name'  // Add your page type here (follows naming convention)
  | 'analytics-your-page';

// Step 2: Add breadcrumb creator - ALWAYS include app name as first item
export const createBreadcrumbs = {
  reports: {
    yourPageName: (onNavigateToPage: NavigationHandler) => [
      { label: 'Reports', isActive: false },  // REQUIRED: App name (first item)
      { label: 'Your Page Name', isActive: true }
    ],
    // For detail pages with navigation back
    yourDetailPage: (itemName: string, onNavigateToPage: NavigationHandler) => [
      { label: 'Reports', isActive: false },  // REQUIRED: App name
      { label: 'Parent Page', onClick: () => onNavigateToPage('reports-parent'), isActive: false },
      { label: itemName, isActive: true }  // Current page
    ]
  },
  analytics: {
    yourPageName: () => [
      { label: 'Analytics', isActive: false },  // REQUIRED: App name
      { label: 'Your Page Name', isActive: true }
    ]
  }
};
```

**Breadcrumb Rules:**
- ✅ **ALWAYS include app name** (Reports, Analytics, Contracts, Marketplace) as first item
- ✅ **App names are automatically hidden** by Breadcrumbs component
- ✅ **Main page names are SHOWN** (e.g., "Insights Explorer", "Transaction Management")
- ✅ **Last item has `isActive: true`** (current page, not clickable, black500)
- ✅ **Intermediate items use `onClick`** for navigation
- ✅ **Chevron separators** automatically added between items
- ✅ **Use `onNavigateToPage` parameter** for type-safe navigation

**Example - Simple Page:**
```tsx
reports: {
  explorer: () => [
    { label: 'Reports', isActive: false },          // App name - hidden automatically
    { label: 'Reports Explorer', isActive: true }   // Main page - SHOWN
  ]
}
// Result: "Reports Explorer" (only)
```

**Example - Two-Level Navigation:**
```tsx
reports: {
  insightsExplorer: () => [
    { label: 'Reports', isActive: false },           // App name - hidden
    { label: 'Insights Explorer', isActive: true }   // Main page - SHOWN
  ]
}
// Result: "Insights Explorer" (only)
```

**Example - Detail Page with Back Navigation:**
```tsx
reports: {
  insightsProgramDetails: (programName: string, onNavigateToPage: NavigationHandler) => [
    { label: 'Reports', isActive: false },  // App name - hidden
    { label: 'Insights Explorer', onClick: () => onNavigateToPage('reports-insights-explorer'), isActive: false },  // Main page - SHOWN & clickable
    { label: programName, isActive: true }  // Current page - SHOWN, not clickable
  ]
}
// Result: "Insights Explorer > Program Name"
```

### **2. Implement Navigation in Your Page Component**

**Template Pattern:**
```tsx
import { createPageNavigationHandler, createBreadcrumbs, type NavigationHandler } from '@design-library/utils/navigation';

interface ReportsYourPageProps {
  onNavigateToPage?: NavigationHandler;
}

export const ReportsYourPage: React.FC<ReportsYourPageProps> = ({ onNavigateToPage }) => {
  // Create navigation handler
  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'reports-your-page')
    : undefined;

  // Create breadcrumbs using utility
  const breadcrumbs = onNavigateToPage
    ? createBreadcrumbs.reports.yourPage(onNavigateToPage)
    : [
        { label: 'Reports' },          // App name (will be hidden)
        { label: 'Your Page Name' }     // Current page
      ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      pageType="reports"
      onNavigate={navigationHandler}
    >
      <YourContent />
    </Layout>
  );
};
```

**For Detail Pages (with dynamic data):**
```tsx
const ReportsDetailPage: React.FC<Props> = ({ itemData, onNavigateToPage }) => {
  const itemName = itemData?.name || 'Default Name';

  const navigationHandler = onNavigateToPage
    ? createPageNavigationHandler(onNavigateToPage, 'reports-detail-page')
    : undefined;

  const breadcrumbs = onNavigateToPage
    ? createBreadcrumbs.reports.detailPage(itemName, onNavigateToPage)
    : [
        { label: 'Reports' },
        { label: 'Parent Page' },
        { label: itemName }
      ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      pageType="reports"
      onNavigate={navigationHandler}
    >
      <YourDetailContent />
    </Layout>
  );
};
```

### **3. Update App.tsx**
Add your page to the main App routing:

```tsx
// In App.tsx
case 'reports-your-page':
  return <ReportsYourPage onNavigateToPage={setPage} />;

// For detail pages with data
case 'reports-detail-page':
  return <ReportsDetailPage itemData={detailData} onNavigateToPage={setPage} />;
```

## 📐 Layout Standards

### **Critical Layout Rules**

#### ✅ **CORRECT - Direct Content in Layout**
```tsx
return (
  <Layout {...navigationProps}>
    {/* Content goes directly here - Layout handles all responsive behavior */}
    <YourPageHeader />
    <YourPageContent />
    <YourPageTable />
  </Layout>
);
```

#### ❌ **INCORRECT - Extra Padding Container**
```tsx
return (
  <Layout {...navigationProps}>
    {/* DON'T DO THIS - Layout already handles responsive padding */}
    <div style={{ padding: spacing[12] }}>
      <YourPageContent />
    </div>
  </Layout>
);
```

### **Page Transition Animation**

**IMPORTANT**: The Layout component automatically handles page transition animations. You do NOT need to implement any animation yourself.

**How it works:**
- When navigating between pages, the Layout component detects the change
- Content starts at **101% scale** (subtle zoom effect)
- Smoothly animates to **100% scale** over 500ms
- Uses `cubic-bezier(0.25, 0.8, 0.25, 1)` for a professional easing effect
- Animation is triggered by changes in `selectedSidebarItem`, `selectedSidebarSubitem`, or `breadcrumbs`
- Double `requestAnimationFrame` ensures smooth rendering without jumps

**What you need to do:**
- **NOTHING!** Just wrap your content in `<Layout>` and the animation happens automatically
- **DO NOT** add custom scale animations to your page content
- **DO NOT** add wrapper divs with transform or animation styles

**Example - Animation Handled Automatically:**
```tsx
// ✅ CORRECT - Layout handles all animations
export const YourPage: React.FC = ({ onNavigateToPage }) => {
  return (
    <Layout
      breadcrumbs={breadcrumbs}
      selectedSidebarItem="reports"
      onNavigate={navigationHandler}
    >
      {/* Your content - no animation styles needed */}
      <YourPageContent />
    </Layout>
  );
};

// ❌ INCORRECT - Don't add custom animations
export const YourPage: React.FC = ({ onNavigateToPage }) => {
  return (
    <Layout {...props}>
      <div style={{
        transform: 'scale(1.01)',  // DON'T DO THIS
        animation: 'fadeIn 0.5s'    // DON'T DO THIS
      }}>
        <YourPageContent />
      </div>
    </Layout>
  );
};
```

**Animation Details (for reference only):**
```tsx
// These styles are already in Layout component - DO NOT duplicate
contentAreaStyles = {
  transform: isAnimating ? 'scale(1.01)' : 'scale(1)', // Subtle zoom out effect
  transformOrigin: 'center center',
  transition: !isAnimating ? 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'none'
};
```

### **Full-Width Layout Pattern**
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
4. **Don't add extra padding containers** - Layout handles responsive padding automatically
5. **Don't use fixed widths** - Let Layout handle responsive behavior
6. **Don't use tertiary buttons** as primary actions - Use primary variant
7. **Don't forget navigation integration** - Always update utilities
8. **Don't mix external libraries** - Stick to design library components

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