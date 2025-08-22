# Ledger Design Library - Example Pages

This folder contains example pages built using the Ledger Design Library components and tokens.

## Files

### `ReportNavigation.tsx` (Default Page)
An advanced report navigation interface featuring:
- **Program selector card** with dropdown functionality
- **Program relationship pills** showing hierarchical connections
- **Sophisticated metric cards** with custom charts and growth indicators
- **Data validation metrics** with status indicators and validation charts
- **Advanced SVG components** (SmallChart, DataValidationChart) with trend visualization
- **Full navigation integration** with page-to-page routing

### `CashSettlement.tsx`
A comprehensive financial dashboard page showcasing:
- **Sidebar navigation** using the `Sidebar` component
- **Top navigation** using the `TopNav` component with breadcrumbs
- **Financial metrics cards** with custom styling using design tokens
- **Responsive grid layout** with proper spacing and shadows
- **Interactive elements** with click handlers
- **Back navigation** to Report Navigation page

### `App.tsx`
Main React application wrapper with navigation state management between ReportNavigation and CashSettlement pages.

## Usage

### Development Server
Start the development server to see all pages in action:
```bash
cd "E:\Ledger design library\pages"
npm run dev  # Runs on http://localhost:5173
```

### Component Integration
```tsx
import React from 'react';
import { ReportNavigation } from './ReportNavigation';
import { CashSettlement } from './CashSettlement';

function App() {
  return (
    <div>
      {/* Default landing page */}
      <ReportNavigation onNavigateToPage={handleNavigation} />
      
      {/* Secondary dashboard page */}
      <CashSettlement onNavigateToPage={handleNavigation} />
    </div>
  );
}
```

## Design Library Integration

Both pages properly import and use components from the design library:

```tsx
// Page components
import { TopNav, Sidebar } from '@design-library/pages';

// Base components  
import { Card, Button, Stack, Grid, Container } from '@design-library/components';

// Design tokens
import { colors, typography, spacing, borderRadius, shadows } from '@design-library/tokens';

// Icons
import { ArrowUpSmall, ArrowDownSmall } from '@design-library/icons';
```

## Features Demonstrated

### ReportNavigation (Primary)
- ✅ **Advanced Chart Components** - Custom SVG-based SmallChart and DataValidationChart
- ✅ **Sophisticated Metrics** - Growth indicators with directional arrows and trend visualization
- ✅ **Interactive Cards** - Program selector with dropdown functionality
- ✅ **Status Visualization** - Color-coded validation charts with status rectangles
- ✅ **Navigation Integration** - Seamless page-to-page routing with EXPLORE buttons
- ✅ **Design System Compliance** - Comprehensive use of design tokens and spacing

### CashSettlement (Secondary)
- ✅ **Component Reuse** - TopNav and Sidebar from library
- ✅ **Design Token Integration** - All colors, typography, spacing
- ✅ **Custom Components** - MetricCard built with design tokens
- ✅ **Layout System** - Grid, spacing, and responsive design
- ✅ **Interactive Elements** - Breadcrumb navigation, buttons, profile menu
- ✅ **Back Navigation** - Return to Report Navigation functionality

### Shared Features
- ✅ **Consistent Layout Structure** - Sidebar + TopNav + Content pattern
- ✅ **Real-time Development** - Hot module reloading with Vite
- ✅ **TypeScript Support** - Full type safety with design library components
- ✅ **Visual Hierarchy** - Cards, shadows, borders, typography scales

## Navigation Flow

1. **Default Landing**: ReportNavigation page loads by default
2. **EXPLORE Actions**: Click EXPLORE buttons to navigate to CashSettlement
3. **Back Navigation**: Use back button in CashSettlement to return to ReportNavigation
4. **Test Navigation**: Development navigation buttons for easy page switching

## Next Steps

Use these pages as templates for building more complex applications with the Ledger Design Library. The components demonstrate proper integration patterns, advanced chart implementations, and best practices for using the design system in real-world scenarios.