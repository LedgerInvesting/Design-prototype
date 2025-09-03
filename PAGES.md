# Pages Documentation

This document provides detailed information about all pages in the external testing environment (`/pages` folder) and the Layout component system.

## Layout System

### Layout Component
The **Layout** component is the unified page wrapper that combines TopNav and Sidebar components for consistent page structure across all pages.

**Key Features:**
- Centralized navigation handling and breadcrumb management
- Responsive behavior with configurable `maxWidth` (default: 1200px)
- Automatic import of base styles including custom selection colors
- Fixed positioning for sidebar (220px width) and top navigation
- White background content area with proper spacing

**Usage:**
```tsx
import { Layout } from '@design-library/pages';
import type { BreadcrumbItem } from '@design-library/pages';

const breadcrumbs: BreadcrumbItem[] = [
  { label: 'YOUR PAGE TITLE', isActive: true }
];

<Layout
  breadcrumbs={breadcrumbs}
  maxWidth="1200px"
  onNavigate={(itemId, subitemId) => {
    // Handle navigation logic
  }}
  onInboxClick={() => {
    // Handle inbox click
  }}
>
  {/* Your page content here */}
</Layout>
```

## Current Pages

### 1. TransactionManagement.tsx
**Purpose:** Complete transaction management interface with advanced table functionality and modal system.

**Key Features:**
- **Header Section:** Blue header with SVG background pattern, document icon, and "New Transaction" button
- **Transaction Stats:** Custom MetricCard components showing transaction count and total premium
- **Advanced Data Table:** 8-column table with intelligent column sizing, tabs, pagination, and search
- **Modal System:** NewTransactionModal for transaction type selection and BrandNewTransactionModal for input methods
- **Responsive Design:** Mobile-optimized header, responsive stats cards, horizontal table scrolling

**Layout Configuration:**
- MaxWidth: 1200px
- Breadcrumb: "TRANSACTION MANAGEMENT"
- Navigation: Links to Reports > Insights Explorer

**Components Used:**
- Layout, Button, Card, Table, Modal components
- Custom MetricCard, TransactionHeader, TransactionStats, TransactionTable components
- Design tokens for colors, typography, spacing, shadows

---

### 2. ReportNavigation.tsx (Default Page)
**Purpose:** Advanced report navigation interface with program management and insights visualization.

**Key Features:**
- **Program Selector:** Card with dropdown functionality for program selection
- **Program Relationships:** Pills showing hierarchical program connections
- **Metrics Cards:** Cession & Collateral and Data Validation cards with sophisticated charts
- **Insights Chart:** Full-width loss ratio chart with multi-line trends and alert indicators
- **Interactive Elements:** Explore buttons with blue200 background styling

**Layout Configuration:**
- MaxWidth: 1200px (responsive design)
- Breadcrumb: "INSIGHTS EXPLORER"
- Navigation: Default landing page

**Components Used:**
- Layout, Card, Button components
- Custom chart components (SmallChart, DataValidationChart)
- Custom MetricCard with growth indicators and trend visualization

---

### 3. CashSettlement.tsx
**Purpose:** Comprehensive financial dashboard demonstrating design system integration and data visualization.

**Key Features:**
- **Financial Metrics:** MetricCard components with dataXXL typography for large numbers
- **Navigation Integration:** Complete sidebar and top navigation demonstration
- **Grid Layout:** Responsive grid system for financial data visualization
- **Design Token Usage:** Complete implementation of typography tokens (dataXXL, bodyM, bodyL)

**Layout Configuration:**
- MaxWidth: 1200px
- Breadcrumb: "CASH SETTLEMENT"
- Navigation: Accessible from main navigation menu

**Components Used:**
- Layout, Grid, Container components
- Custom MetricCard components using design tokens
- Complete typography system demonstration

---

## Development Workflow

### Adding New Pages

1. **Create Page File:**
   ```bash
   # Create new .tsx file in /pages folder
   touch pages/YourNewPage.tsx
   ```

2. **Import Layout Component:**
   ```tsx
   import { Layout } from '@design-library/pages';
   import type { BreadcrumbItem } from '@design-library/pages';
   ```

3. **Import Design Tokens:**
   ```tsx
   import { colors, typography, spacing, borderRadius } from '@design-library/tokens';
   ```

4. **Implement Page Structure:**
   ```tsx
   export const YourNewPage: React.FC = () => {
     return (
       <Layout
         breadcrumbs={[{ label: 'YOUR PAGE TITLE', isActive: true }]}
         maxWidth="1200px"
         onNavigate={(itemId, subitemId) => {
           // Handle navigation
         }}
         onInboxClick={() => {
           // Handle inbox
         }}
       >
         {/* Your content */}
       </Layout>
     );
   };
   ```

5. **Add to App.tsx:**
   ```tsx
   // Import your component and add to navigation logic
   ```

6. **Automatic Features:**
   - Text selection will use blue700 (#9ad5f7) via base.css
   - Responsive behavior inherited from Layout component
   - Consistent navigation and breadcrumb system

### Testing Your Pages

**Development Server:**
```bash
cd "E:\Ledger design library\pages"
npm run dev  # Starts on http://localhost:5173
```

**Build and Preview:**
```bash
npm run build
npm run preview
```

## Design System Integration

### Responsive Design
All pages feature mobile-first responsive design with consistent breakpoints:
- **Desktop:** Full layout with 1200px max-width
- **Tablet:** Responsive grid layouts and flexible components  
- **Mobile:** Stacked layouts, horizontal scrolling tables, optimized headers

### Global Styling
- **Text Selection:** Blue700 (#9ad5f7) background with black text
- **Typography:** Complete design token usage across all components
- **Colors:** Consistent color palette from design system
- **Spacing:** Standardized spacing scale throughout all layouts

### Component Architecture
- **Layout Component:** Unified page structure and navigation
- **Responsive Components:** All components adapt to screen size changes
- **Design Token Integration:** Colors, typography, and spacing use centralized tokens
- **Cross-browser Compatibility:** Tested across Chrome, Firefox, Safari

## Technical Notes

### File Structure
```
pages/
├── App.tsx                    # Main application with page routing
├── TransactionManagement.tsx  # Transaction management page
├── ReportNavigation.tsx       # Insights explorer (default)
├── CashSettlement.tsx         # Financial dashboard
├── NewTransactionModal.tsx    # Transaction selection modal
├── BrandNewTransactionModal.tsx # Input method modal
├── index.tsx                  # React entry point
├── package.json              # Dependencies and scripts
└── vite.config.ts            # Vite configuration
```

### Dependencies
- **React 18** with TypeScript support
- **Vite** for fast development and building
- **Design Library** components via `@design-library` imports
- **Hot Module Replacement** for instant development updates

### Path Aliases
```typescript
// vite.config.ts configures these aliases:
'@design-library/components' // Component imports
'@design-library/tokens'     // Design token imports  
'@design-library/pages'      // Layout and page components
'@design-library/icons'      // Icon imports
'@design-library/styles'     // Global styles
```