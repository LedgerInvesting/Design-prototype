# Library Usage Guide

**Quick reference for using the Ledger Design Library components, tokens, and patterns.**

> 📘 **Note:** This is the quick reference guide with practical examples and common patterns. For detailed component architecture, complete prop APIs, and design decisions, see [COMPONENTS.md](./COMPONENTS.md).

---

## 🎨 Design Tokens

### Colors

#### Static Colors (Always Available)
```tsx
import { colors } from '@design-library/tokens';

colors.blackAndWhite.black900  // #000000
colors.blackAndWhite.black800  // #3a423d
colors.blackAndWhite.black700  // #626962
colors.blackAndWhite.black500  // #92938f
colors.blackAndWhite.black300  // #c1c2bf
colors.blackAndWhite.black200  // #d0d1cf
colors.blackAndWhite.black100  // #e8e9e8
colors.blackAndWhite.black50   // #f5f5f5
colors.blackAndWhite.white     // #ffffff

colors.error.textAndStrokes    // #e72b2b
colors.error.fill              // #ffc7c7
colors.warning.textAndStrokes  // #ff9900
colors.warning.fill            // #ffe17a
colors.success.textAndStrokes  // #2fa915
colors.success.fill            // #7fffb0
```

#### Product Colors (Theme-Specific)

**Reports (Blue):**
```tsx
// Main colors (direct access)
colors.reports.blue900  // #1c6297
colors.reports.blue800  // #5b9cc7
colors.reports.blue700  // #9ad5f7 (MAIN)
colors.reports.blue600  // #bee4fb
colors.reports.blue500  // #e1f3ff

// Dynamic colors (nested under .dynamic)
colors.reports.dynamic.blue400  // #d9e7ec
colors.reports.dynamic.blue300  // #e9f3f7
colors.reports.dynamic.blue200  // #f2f8fb
```

**Analytics (Green):**
```tsx
colors.analytics.green900  // #0f9342
colors.analytics.green700  // #74efa3 (MAIN)

colors.analytics.dynamic.green400  // #e1eae5
colors.analytics.dynamic.green300  // #e9f1ec
colors.analytics.dynamic.green200  // #f4f8f6
```

**Marketplace (Violet):**
```tsx
colors.marketplace.violet900  // #643ed8
colors.marketplace.violet700  // #ceb5fb (MAIN)

colors.marketplace.dynamic.violet400  // #d7d7ec
colors.marketplace.dynamic.violet300  // #efeffa
colors.marketplace.dynamic.violet200  // #f6f6ff
```

**Contracts (Yellow):**
```tsx
colors.contracts.yellow900  // #987c17
colors.contracts.yellow700  // #ffe17a (MAIN)

colors.contracts.dynamic.yellow400  // #e9e7dc
colors.contracts.dynamic.yellow300  // #f3f1ea
colors.contracts.dynamic.yellow200  // #f9f8f3
```

#### Theme-Aware Colors (Use with useSemanticColors())

```tsx
// ✅ CORRECT - Import from tokens
import { useSemanticColors } from '@design-library/tokens';

// ❌ WRONG - Not available in hooks
import { useSemanticColors } from '@design-library/hooks';

const PageComponent = () => {
  const colors = useSemanticColors();

  // These automatically adapt to current theme (reports/analytics/marketplace)
  colors.theme.main         // Primary brand color (blue700/green700/violet700)
  colors.theme.primary700   // Same as main
  colors.theme.primary500   // Lighter shade
  colors.theme.primary400   // Dynamic 400
  colors.theme.primary300   // Dynamic 300
  colors.theme.primary200   // Dynamic 200
};
```

**⚠️ IMPORTANT:**
- `useSemanticColors` is imported from `@design-library/tokens`, NOT `@design-library/hooks`
- `colors.theme.*` only works inside components wrapped with `<ThemeProvider>` and using `useSemanticColors()` hook.

---

### Typography

```tsx
import { typography } from '@design-library/tokens';

// Headline styles
typography.styles.headlineH1  // 56px/60px, Bradford Bold
typography.styles.headlineH2  // 32px/38px, Bradford Bold
typography.styles.headlineH3  // 24px/29px, Bradford Bold

// Subheading styles
typography.styles.subheadingXL  // 32px/38px, Inter Medium
typography.styles.subheadingL   // 24px/29px, Inter Medium
typography.styles.subheadingM   // 20px/24px, Inter Medium
typography.styles.subheadingS   // 18px/22px, Inter Medium

// Body styles
typography.styles.bodyL   // 16px/24px, Inter Regular
typography.styles.bodyM   // 14px/20px, Inter Regular
typography.styles.bodyS   // 12px/16px, Inter Regular

// Navigation & UI
typography.styles.navM    // 14px/17px, Inter Medium
typography.styles.navS    // 12px/14px, Inter Medium

// Data & Captions
typography.styles.dataXXL   // 40px/48px, Inter Medium
typography.styles.dataXL    // 28px/34px, Inter Medium
typography.styles.dataL     // 20px/24px, Inter Medium
typography.styles.dataM     // 14px/17px, Inter Medium
typography.styles.captionL  // 14px/17px, Inter Regular
typography.styles.captionM  // 12px/14px, Inter Regular
typography.styles.captionS  // 10px/12px, Inter Regular

// Font weights
typography.fontWeight.regular  // 400
typography.fontWeight.medium   // 500
typography.fontWeight.bold     // 700

// Font families
typography.fontFamily.headline  // ['Bradford LL', 'serif']
typography.fontFamily.body      // ['Inter', 'sans-serif']
```

**✅ CORRECT Usage:**
```tsx
<h2 style={{
  ...typography.styles.headlineH2,
  color: colors.blackAndWhite.black900,
  marginBottom: spacing[4]
}}>
```

**❌ WRONG - Don't override font properties:**
```tsx
<h2 style={{
  ...typography.styles.headlineH2,
  fontSize: '32px',      // ❌ Already in headlineH2
  fontWeight: 700,       // ❌ Already in headlineH2
}}>
```

---

### Spacing

```tsx
import { spacing } from '@design-library/tokens';

spacing[0]   // 0
spacing[1]   // 0.25rem (4px)
spacing[2]   // 0.5rem (8px)
spacing[3]   // 0.75rem (12px)
spacing[4]   // 1rem (16px)
spacing[5]   // 1.25rem (20px)
spacing[6]   // 1.5rem (24px)
spacing[8]   // 2rem (32px)
spacing[10]  // 2.5rem (40px)
spacing[12]  // 3rem (48px)
spacing[16]  // 4rem (64px)
spacing[20]  // 5rem (80px)
spacing[24]  // 6rem (96px)
```

---

### Border Radius

```tsx
import { borderRadius } from '@design-library/tokens';

borderRadius[0]        // 0px
borderRadius[4]        // 4px
borderRadius[8]        // 8px
borderRadius[12]       // 12px
borderRadius[16]       // 16px
borderRadius[24]       // 24px
borderRadius.absolute  // 9999px (fully round)
```

---

### Shadows

```tsx
import { shadows } from '@design-library/tokens';

shadows.base    // 0 1px 3px rgba(0, 0, 0, 0.1)
shadows.medium  // 0 4px 6px rgba(0, 0, 0, 0.1)
shadows.large   // 0 10px 15px rgba(0, 0, 0, 0.1)
```

---

## 🧩 Components

> 💡 **Quick examples below.** For complete feature lists, all variants, and integration details, see [COMPONENTS.md](./COMPONENTS.md).

### Button

> 📖 [Detailed Button documentation in COMPONENTS.md](./COMPONENTS.md#button)

```tsx
import { Button } from '@design-library/components';

// Basic usage
<Button variant="primary" color="black">
  Click me
</Button>

// Props
variant?: 'primary' | 'small' | 'icon' | 'tertiary'
color?: 'black' | 'white' | 'blue' | 'green' | 'violet' | 'yellow'
showIcon?: boolean  // Default: true (show arrow icon)
onClick?: () => void
disabled?: boolean
```

**Common patterns:**
```tsx
// Hide the arrow icon
<Button variant="primary" color="black" showIcon={false}>
  No Arrow
</Button>

// Small button
<Button variant="small" color="blue">
  Small
</Button>

// Icon-only button
<Button variant="icon" color="black">
  Icon
</Button>
```

---

### Modal

> 📖 [Detailed Modal documentation in COMPONENTS.md](./COMPONENTS.md#modal)

```tsx
import { Modal } from '@design-library/components';

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Modal Title"
  width="600px"
  showCloseButton={true}
  showBackdrop={true}
  backdropColor="white"
  backdropOpacity={0.8}
>
  <div>Modal content</div>
</Modal>

// Props
isOpen: boolean              // NOT 'open' or 'visible'
onClose: () => void
title?: string
width?: string               // Default: '500px'
showCloseButton?: boolean    // Default: false
showBackdrop?: boolean       // Default: true
backdropColor?: string       // Default: 'black'
backdropOpacity?: number     // Default: 0.5 (0-1)
position?: 'center' | 'top'  // Default: 'center'
```

---

### Status

> 📖 [Detailed Status documentation in COMPONENTS.md](./COMPONENTS.md#status)

```tsx
import { Status } from '@design-library/components';

<Status
  variant="warning"
  options={['draft', 'pending', 'approved']}
  selectedOption="draft"
  onSelect={(option) => console.log(option)}
/>

// Props
variant: 'warning' | 'success' | 'error' | 'info' | 'inactive'
options: string[]
selectedOption: string
onSelect: (option: string) => void
```

**⚠️ Note:** Status has a built-in dropdown. Don't wrap it in extra containers.

---

### Input

```tsx
import { Input } from '@design-library/components';

<Input
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter email"
  state="default"
  leftSymbol="$"
  infoTooltipContent="Helper text"
/>

// Props
label?: string
value: string
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
placeholder?: string
state?: 'default' | 'hover' | 'active' | 'filled' | 'error' | 'disabled'
leftSymbol?: string
infoTooltipContent?: string
disabled?: boolean
type?: string
```

---

### Dropdowns

**Two dropdown variants: MenuDropdown (inline/menu) and FormDropdown (form fields)**

#### MenuDropdown (Inline/Menu Style)

```tsx
import { MenuDropdown } from '@design-library/components';

// For inline placement in filters, toolbars, menus
<MenuDropdown
  selectedPrefix="Year"
  options={yearOptions}
  value={selectedYear}
  onChange={setSelectedYear}
/>

// Without border (clean inline look)
<MenuDropdown
  selectedPrefix="Metric"
  options={metricOptions}
  value={selectedMetric}
  onChange={setSelectedMetric}
  showBorder={false}
/>

// Props
label?: string
showLabel?: boolean              // Default: false
options: DropdownOption[]        // { value: string; label: string; disabled?: boolean }[]
value: string
onChange: (value: string) => void
state?: 'default' | 'hover' | 'active' | 'filled' | 'error' | 'disabled'
placeholder?: string
disabled?: boolean
selectedPrefix?: string          // Default: 'Option' (e.g., 'Year:', 'Metric:')
triggerBackgroundColor?: string  // Custom background color
showBorder?: boolean             // Default: false
```

**Key Features:**
- **Dynamic Width**: Automatically adapts to content size (uses `fit-content`)
- **Two-Color Display**: Prefix in black500, value in black900 for visual hierarchy
- **Customizable Prefix**: Context-aware labels like "Year:", "Metric:", "Filter:"
- **Scrollbar Spacing**: 10px margin when >5 options to prevent overlap
- **Theme-Aware**: Adapts to current product theme
- **Use Cases**: Insights Explorer filters, chart controls, inline menus

#### FormDropdown (Form Field Style)

```tsx
import { FormDropdown } from '@design-library/components';

// For forms and modals (matches Input field styling)
<FormDropdown
  label="Select Option"
  options={[
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' }
  ]}
  value={selectedOption}
  onChange={(value) => setSelectedOption(value)}
  state="default"
/>

// Props
label?: string
options: DropdownOption[]
value: string
onChange: (value: string) => void
state?: 'default' | 'hover' | 'active' | 'filled' | 'error' | 'disabled'
placeholder?: string
disabled?: boolean
```

**Key Features:**
- **Form Field Design**: White background, border, consistent with Input component
- **Full Width**: Fits standard form layouts
- **Validation States**: Error, warning, filled states with helper text
- **Use Cases**: Transaction forms, modal dialogs, settings pages

---

### Selector (Checkbox/Radio)

```tsx
import { Selector } from '@design-library/components';

// Checkbox
<Selector
  variant="checkbox"
  label="Accept terms"
  checked={isChecked}
  onChange={(checked) => setIsChecked(checked)}
/>

// Radio
<Selector
  variant="radio"
  label="Option A"
  checked={isSelected}
  onChange={(checked) => setIsSelected(checked)}
/>

// Props
variant: 'checkbox' | 'radio'  // NOT 'type'
label: string
checked: boolean               // NOT 'selected' or 'value'
onChange: (checked: boolean) => void
disabled?: boolean
```

---

### Table

> 📖 [Detailed Table documentation in COMPONENTS.md](./COMPONENTS.md#table)

```tsx
import { Table } from '@design-library/components';

<Table
  columns={[
    {
      header: 'Name',
      key: 'name',
      align: 'left',        // Cell alignment
      headerAlign: 'left'   // Header alignment
    },
    {
      header: 'Amount',
      key: 'amount',
      align: 'right',
      headerAlign: 'right'
    }
  ]}
  data={tableData}
  onRowClick={(row) => console.log(row)}
  showPagination={true}
  itemsPerPage={10}
  currentPage={1}
  onPageChange={(page) => setCurrentPage(page)}
/>

// Column alignment pattern:
// - First column (labels): align: 'left', headerAlign: 'left'
// - Data columns (numbers): align: 'right', headerAlign: 'right'
// - Center when appropriate: align: 'center', headerAlign: 'center'
```

---

### Card

```tsx
import { Card } from '@design-library/components';

<Card
  title="Card Title"
  subtitle="Optional subtitle"
  onAction={() => console.log('Action clicked')}
  actionText="View Details"
>
  <div>Card content</div>
</Card>
```

---

### Tabs

```tsx
import { Tabs } from '@design-library/components';

const tabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' }
];

<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={(tabId) => setActiveTab(tabId)}
/>

// Props
tabs: Array<{ id: string; label: string }>
activeTab: string
onTabChange: (tabId: string) => void
```

---

## 🎭 Icons

### Importing Icons

```tsx
import {
  // Size tiers
  ChevronDownExtraSmall,     // 8x8px
  AddSmall,                  // 12x12px
  HomeMedium,                // 22x22px
  ArrangeTable,              // 24x24px (table icons)

  // Logos
  KLogo,                     // Compact K
  KorraLogo,                 // Full Korra text
  ReportsLogo,
  AnalyticsLogo,
  MarketplaceLogo,
  ContractsLogo,

  // Card icons
  CardIcon                   // 15x18px
} from '@design-library/icons';

// Usage
<HomeMedium color={colors.blackAndWhite.black900} />
<S1ArrowRightMedium color={colors.reports.blue700} />
```

### Icon Size Reference
- **Extra Small**: 8x8px (chevrons, close buttons)
- **Small**: 12x12px (UI elements)
- **Medium**: 22x22px (navigation, buttons)
- **Table**: 24x24px (table actions)
- **Card**: 15x18px (beside card titles)
- **Logo**: Variable (navigation logos)

---

## 📐 Layout Components

### Layout (Main Page Container)

```tsx
import { Layout } from '@design-library/pages';

// Navigation mode (default)
<Layout
  breadcrumbs={breadcrumbs}
  selectedSidebarItem="reports"
  selectedSidebarSubitem="transactions"
  onNavigate={navigationHandler}
>
  <YourPageContent />
</Layout>

// Form mode
<Layout
  formMode={true}
  formTitle="New Transaction"
  entryType="SURPLUS SHARE"
  statusText="draft"
  statusVariant="warning"
  progress={60}
  onBackClick={() => goBack()}
>
  <YourFormContent />
</Layout>

// Props
breadcrumbs?: BreadcrumbItem[]
selectedSidebarItem?: string
selectedSidebarSubitem?: string
onNavigate?: (itemId: string, subitemId?: string) => void
formMode?: boolean
formTitle?: string
entryType?: string
statusText?: string
statusVariant?: 'warning' | 'success' | 'error' | 'info' | 'inactive'
progress?: number
onBackClick?: () => void
```

---

## 🎨 Common Patterns

### Theme System

**1. Wrap your page with ThemeProvider:**
```tsx
import { ThemeProvider } from '@design-library/tokens';

export const MyPage = () => {
  return (
    <ThemeProvider initialTheme="reports">
      <Layout>
        <PageContent />
      </Layout>
    </ThemeProvider>
  );
};
```

**2. Use semantic colors inside components:**
```tsx
import { useSemanticColors } from '@design-library/tokens';

const PageContent = () => {
  const colors = useSemanticColors();

  return (
    <div style={{
      backgroundColor: colors.theme.primary200,
      color: colors.theme.main
    }}>
      Content adapts to current theme!
    </div>
  );
};
```

**Available themes:**
- `"reports"` - Blue theme
- `"analytics"` - Green theme
- `"marketplace"` - Violet theme
- `"contracts"` - Yellow theme

---

### PageHeader

```tsx
import { PageHeader } from '@design-library/pages';

// Simple title with primary action
<PageHeader
  title="Valuation Dashboard"
  primaryAction={{ label: 'Edit Configuration', onClick: handleEdit }}
/>

// Two-color title pattern (important text in black900, regular text in black500)
<PageHeader
  title={[
    { text: "You're now viewing the ", important: false },
    { text: 'Program ABC', important: true },
    { text: ' valuation dashboard', important: false }
  ]}
  primaryAction={{ label: 'Save', onClick: handleSave }}
  secondaryAction={{ label: 'Cancel', onClick: handleCancel }}
/>

// Hide buttons by passing false
<PageHeader
  title="Program Details"
  primaryAction={false}
  secondaryAction={false}
/>

// Props
title: string | TitlePart[] | React.ReactNode
subtitle?: string
primaryAction?: { label: string; onClick: () => void } | false
secondaryAction?: { label: string; onClick: () => void } | false
spacing?: 'normal' | 'compact'  // Default: 'normal'
```

**Important notes:**
- **Title width**: Takes 80% width when buttons are hidden (leaves 20% empty space)
- **Both buttons have same height** (44px) for consistent alignment
- **Primary button**: Black variant with arrow icon
- **Secondary button**: White variant with no border and no icon
- **Two-color pattern**: Use `important: true` for black900, `important: false` for black500
- **Button order**: Secondary (left), Primary (right)

---

### Navigation

```tsx
import {
  createPageNavigationHandler,
  createBreadcrumbs,
  type NavigationHandler
} from '@design-library/utils/navigation';

// In your page component
const MyPage = ({ onNavigateToPage }) => {
  const navigationHandler = createPageNavigationHandler(
    onNavigateToPage,
    'reports-explorer'  // Current page identifier
  );

  const breadcrumbs = createBreadcrumbs.reports.explorer();

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      onNavigate={navigationHandler}
    >
      {/* Content */}
    </Layout>
  );
};
```

**Page Type Reference:**
- `'home'`
- `'reports-explorer'`
- `'reports-transaction-management'`
- `'reports-new-transaction-form'`
- `'reports-bdx-upload'`
- `'analytics-valuation'`
- `'analytics-valuation-dashboard'`
- `'contracts-ai-extraction'`
- `'marketplace-offerings'`

---

### Creating Breadcrumbs

```tsx
// Simple breadcrumb
const breadcrumbs = createBreadcrumbs.reports.explorer();

// Breadcrumb with navigation
const breadcrumbs = createBreadcrumbs.analytics.dashboard(
  'Program Name',
  onNavigateToPage
);

// Custom breadcrumb
const breadcrumbs = [
  {
    label: 'Reports Explorer',
    onClick: () => onNavigateToPage('reports-explorer'),
    isActive: false
  },
  {
    label: 'Current Page',
    isActive: true
  }
];
```

---

## ⚠️ Common Mistakes to Avoid

### ❌ Wrong Import Paths
```tsx
// ❌ WRONG - useSemanticColors is NOT in hooks
import { useSemanticColors } from '@design-library/hooks';

// ✅ CORRECT - Import from tokens
import { useSemanticColors } from '@design-library/tokens';
```

### ❌ Wrong Color Paths
```tsx
// ❌ WRONG
colors.reports.blue300        // Doesn't exist!
colors.theme.primary200       // Only works with useSemanticColors()

// ✅ CORRECT
colors.reports.dynamic.blue300
```

### ❌ Overriding Typography Tokens
```tsx
// ❌ WRONG - font properties already in token
<h2 style={{
  ...typography.styles.headlineH2,
  fontSize: '32px',
  fontWeight: 700
}}>

// ✅ CORRECT
<h2 style={{
  ...typography.styles.headlineH2,
  color: colors.blackAndWhite.black900
}}>
```

### ❌ Wrong Component Prop Names
```tsx
// ❌ WRONG
<Modal open={true} />              // Use 'isOpen'
<Button hideIcon={true} />         // Use 'showIcon={false}'
<Selector type="checkbox" />       // Use 'variant'
<Selector selected={true} />       // Use 'checked'

// ✅ CORRECT
<Modal isOpen={true} />
<Button showIcon={false} />
<Selector variant="checkbox" />
<Selector checked={true} />
```

---

## 📋 Quick Checklist

Before using any token or component:

1. ✅ Check this file first
2. ✅ Verify exact property paths (especially for colors)
3. ✅ Use Grep to find existing usage examples
4. ✅ Check TypeScript interfaces for prop names
5. ✅ Test with actual values before assuming structure

---

## 🔄 Updates

**Last Updated:** October 2025

When adding new components or changing APIs, update this file to keep it accurate!
